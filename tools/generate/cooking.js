// Generates src/lib/data/cooking.yaml from the No Man's Sky community wiki (CC BY-SA):
//   - the "Cooking" page: one table per Nutrient Processor section ("07 - Component Churn - Butters"), listing each
//     dish with its ingredient slots and consume bonus, plus the three raw-ingredient tables (Feed / Kill Fauna, Plants);
//   - each item's own page for its value (the {{Product infobox}} "value" field).
// Hand corrections live in tools/generate/corrections/cooking.yaml.
// Usage: node tools/generate/cooking.js [--check] [--refresh]
import { wikitext, wikitextMany } from './lib/wiki.js';
import { loadCorrections, applyCorrections } from './lib/corrections.js';
import { writeData } from './lib/output.js';

const LINK = /\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g;
/** Link targets in a piece of wikitext, in order. */
const links = (s) => [...s.matchAll(LINK)].map((m) => m[1].trim());
/** Wikitext → plain text: links become their label, <br> a space. External links ([url label]) are kept as written. */
const plain = (s) => s.replace(LINK, (_, t, l) => l ?? t).replace(/<br\s*\/?>/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Parse a wikitable into a grid of cell strings (rowspan/colspan expanded). Cells may span several lines
 * (bullet lists, wrapped lists), may be split with "||", and may carry attributes before a single "|".
 */
function parseTable(src) {
  const rows = [];
  let cur = null;
  let cell = null;
  for (const line of src.split('\n')) {
    if (/^\s*\|-/.test(line)) { cur = []; rows.push(cur); cell = null; continue; }
    if (!cur || /^\s*(\|\}|\|\+|!)/.test(line)) { cell = null; continue; }
    if (/^\s*\|/.test(line)) {
      // A stray doubled "||" at the start of a line is treated like a single "|".
      for (const raw of line.replace(/^\s*\|\|?/, '').split('||')) {
        // "attrs | content": the attribute part has no link brackets and contains "=".
        const m = raw.match(/^([^[|]*=[^[|]*)\|(?!\|)(.*)$/);
        const attrs = m ? m[1] : '';
        cell = {
          text: (m ? m[2] : raw).trim(),
          rowspan: +(attrs.match(/rowspan="?(\d+)/)?.[1] || 1),
          colspan: +(attrs.match(/colspan="?(\d+)/)?.[1] || 1),
        };
        cur.push(cell);
      }
    } else if (cell) cell.text += '\n' + line.trim(); // continuation of the previous cell
  }
  // Expand spans into a plain grid.
  const grid = [];
  const pending = []; // column → {text, left}
  for (const r of rows.filter((r) => r.length)) {
    const out = [];
    const take = () => {
      while (pending[out.length]?.left > 0) { pending[out.length].left--; out.push(pending[out.length].text); }
    };
    take();
    for (const c of r) {
      for (let k = 0; k < c.colspan; k++) {
        if (c.rowspan > 1) pending[out.length] = { text: c.text, left: c.rowspan - 1 };
        out.push(c.text);
      }
      take();
    }
    grid.push(out);
  }
  return grid;
}

/** The Cooking page split into its "NN - Process - Category" sections, each with its table grid. */
function sections(page) {
  const out = [];
  const parts = page.split(/^===\s*(\d+ - [^=]+?)\s*===\s*$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const [, process, cat = process] = parts[i].split(' - ').map((s) => s.trim());
    const body = parts[i + 1].split(/^==[^=]/m)[0];
    const table = body.slice(body.indexOf('{|'));
    out.push({ process, cat, grid: parseTable(table) });
  }
  return out;
}

/**
 * One ingredient cell → slots. A bulleted cell has one slot per bullet; otherwise the cell is one slot.
 * A slot lists its options separated by ";", "," or " or ". Options are usually links, but some are plain text
 * ("Any [[Fish]] or cooked seafood" → "Any Fish", "cooked seafood"). Separators inside links ("Thick, Sweet Batter")
 * are protected by swapping each link for a placeholder before splitting.
 */
function slots(cell) {
  const t = cell.trim();
  if (!t || t === '-') return [];
  const parts = /^\s*\*/m.test(t) ? t.split(/^\s*\*/m).filter((p) => p.trim()) : [t];
  return parts.map((p) => {
    const targets = links(p);
    return p.replace(LINK, (_, t) => `\u0000${targets.indexOf(t.trim())}\u0000`)
      .replace(/<br\s*\/?>/g, ' ')
      .split(/;|,| or /)
      .map((o) => o.replace(/\u0000(\d+)\u0000/g, (_, i) => targets[i]).replace(/\s+/g, ' ').trim())
      .filter(Boolean);
  });
}

/** Value from a {{Product infobox}} ("value = 28,000"), or null. */
function value(text) {
  const m = text?.match(/\|\s*value\s*=\s*([\d,]+)/);
  return m ? +m[1].replace(/,/g, '') : null;
}

const page = await wikitext('Cooking');
const dishes = [];
const raw = [];
for (const s of sections(page)) {
  if (s.process === 'Raw Ingredients') {
    // Columns: Title | How To Get (colspan 3 in two of the tables) | Consume Bonus. Raw ingredients are named by
    // their link target — the item's page title and in-game name, which the recipes also use — not the link label
    // ("[[Sticky 'Honey'|Sticky Honey]]" → Sticky 'Honey'), so they match their recipe uses and their page's value.
    for (const row of s.grid) {
      const name = row[0].match(/\[\[([^\]|]+)/)?.[1].trim() ?? plain(row[0]);
      raw.push({ name, how: plain(row[1]), bonus: plain(row.at(-1)), source: s.cat });
    }
    continue;
  }
  // Columns: Title | ingredient column(s) | Consume Bonus (the Baits table has no bonus column).
  const hasBonus = s.process !== 'Prepare Baits';
  for (const row of s.grid) {
    const name = links(row[0])[0];
    const ing = hasBonus ? row.slice(1, -1) : row.slice(1);
    const recipe = ing.flatMap(slots);
    // Rows for the same dish (rowspan, or the same dish listed again under another process) add recipes to one record.
    let d = dishes.find((x) => x.name === name);
    if (!d) {
      d = { name, value: null, bonus: hasBonus ? plain(row.at(-1)) : '', process: s.process, cat: s.cat, recipes: [] };
      dishes.push(d);
    }
    if (recipe.length) d.recipes.push(recipe);
  }
}

// Values from each item's own page. Raw ingredients are looked up by the name shown on the Cooking page.
const pages = await wikitextMany([...new Set([...dishes, ...raw].map((r) => r.name))]);
for (const r of [...dishes, ...raw]) r.value = value(pages.get(r.name));

const corr = loadCorrections('cooking');
// Misspelt ingredient names in the Cooking table (corrections file `renames:`), applied before the corrections.
for (const r of corr.renames || []) {
  let hits = 0;
  for (const d of dishes) d.recipes = d.recipes.map((rec) => rec.map((slot) => slot.map((n) => (n === r.from ? (hits++, r.to) : n))));
  if (!hits) throw new Error(`Rename "${r.from}" → "${r.to}" matches no ingredient (fixed on the wiki? remove it).`);
}

const header = [
  "Cooking (Nutrient Processor) recipes. Generated by tools/generate/cooking.js from the No Man's Sky community wiki",
  '"Cooking" page and item pages (CC BY-SA), Nov 2026.',
  'recipes: each entry is one way to cook the dish = list of ingredient slots; each slot lists interchangeable ingredients.',
  'A dish the wiki lists under two processes is one record with the first one (Horrifying Mush: its Seafood Assembly recipe',
  'from Abyssal Horror Egg is listed with the Bind Proteins one).',
  'Hand corrections: tools/generate/corrections/cooking.yaml (applied by tools/generate/cooking.js).',
];
writeData('cooking', header, { dishes: applyCorrections(dishes, corr.corrections), rawIngredients: raw });
