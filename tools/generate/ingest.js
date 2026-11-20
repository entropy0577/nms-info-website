// Generates src/lib/data/ingest.yaml from the No Man's Sky community wiki (CC BY-SA):
//   - the "Nutrient Ingestor" page's ingestion-effects table (food → effect → duration per unit);
//   - the "Fish" page's list of fishes (class, biome, conditions) for rows that are caught by fishing;
//   - an item's own page ({{Cook}} template) for cooked products that cooking.yaml doesn't have.
// Rows are linked to cooking.yaml (dishes and raw ingredients), so run tools/generate/cooking.js first.
// Hand corrections live in tools/generate/corrections/ingest.yaml.
// Usage: node tools/generate/ingest.js [--check] [--refresh]
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { wikitext, wikitextMany } from './lib/wiki.js';
import { loadCorrections, applyCorrections } from './lib/corrections.js';
import { writeData } from './lib/output.js';

const LINK = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/;
/** Link target of a cell, with runs of spaces collapsed as MediaWiki does for titles ("Thick,  Sweet Batter"). */
const target = (cell) => cell.match(LINK)?.[1].replace(/\s+/g, ' ').trim();

/** Rows of the first wikitable in `text`: each row is its list of cell strings (one "|" cell per line; blank lines skipped). */
function tableRows(text) {
  const table = text.slice(text.indexOf('{|'), text.indexOf('\n|}'));
  return table.split(/\n\|-[^\n]*/).slice(1).map((row) =>
    row.split('\n').filter((l) => /^\s*\|/.test(l)).map((l) => {
      const cell = l.replace(/^\s*\|/, '');
      // Drop a leading attribute part ('data-sort-value="…" | +64% …', 'style="…" |[[…]]').
      return cell.replace(/^[^[|]*=[^[|]*\|/, '').trim();
    })).filter((r) => r.length); // a doubled "|-" leaves an empty row
}

const corr = loadCorrections('ingest');

// Fish list: Icon | Name | Rarity ({{Class|A}}, or "Flotsam" for junk catches) | Size | Biome | Conditions | Value |
// Nanites. The list's links don't always match the in-game spelling used elsewhere ("[[Mother-Of-Quicksilver]]",
// "[[De-pressurized Blob]]", "[[Stargazer (Fish)|Stargazer]]"), so fish are looked up by a loose key — ignoring case,
// a "(Fish)" disambiguation and -ized/-ised — on both the link target and its label. `fishAliases` in the corrections
// file covers real spelling differences.
const fishKey = (s) => s.toLowerCase().replace(/\s*\(fish\)$/, '').replace(/ized\b/g, 'ised');
const fishText = await wikitext('Fish');
const fish = new Map();
for (const [, name, rarity, , biome, when] of tableRows(fishText.slice(fishText.indexOf('==List of Fishes==')))) {
  const cls = rarity.match(/\{\{Class\|(\w+)\}\}/)?.[1];
  if (!cls) continue;
  const label = name.match(/\[\[[^\]|]+\|([^\]]+)\]\]/)?.[1];
  for (const n of [target(name), label]) if (n) fish.set(fishKey(n), { cls, biome, when });
}
const fishAlias = new Map(Object.entries(corr.fishAliases || {}).map(([name, a]) => [name, a.listedAs]));
const fishOf = (name) => fish.get(fishKey(fishAlias.get(name) ?? name));

const cooking = parse(fs.readFileSync(path.join(import.meta.dirname, '..', '..', 'src', 'lib', 'data', 'cooking.yaml'), 'utf8'));
// Dish names are matched ignoring single quotes: the table links "'Legs-in-Pastry'" as [[Legs-in-Pastry]].
const unquote = (s) => s.replace(/'/g, '');
const dishes = new Map(cooking.dishes.map((d) => [unquote(d.name), d.name]));
const raw = new Set(cooking.rawIngredients.map((r) => r.name));

// Ingestion table: Nutrition Source | Effect ("+64% Breathing Efficiency", "−3% Solar Panel Power",
// "+2 Words Translated") | Duration per unit ("09:00").
const page = await wikitext('Nutrient Ingestor');
const rename = new Map((corr.renames || []).map((r) => [r.from, r.to]));
const renamed = new Set();
const rows = [];
for (const [src, effect, dur] of tableRows(page.slice(page.indexOf('=== Ingestion effects ===')))) {
  const m = effect.match(/^([+−-])([\d,.]+)(%?)\s+(.+)$/);
  if (!m) throw new Error(`Unrecognised effect "${effect}"`);
  const [, sign, num, unit, stat] = m;
  // "-100% Unspecified" rows are raw seafood/catnip placeholders with no real effect.
  if (stat === 'Unspecified') continue;
  if (rename.has(target(src))) renamed.add(target(src));
  rows.push({
    name: rename.get(target(src)) ?? target(src),
    stat,
    amount: (sign === '+' ? 1 : -1) * Number(num.replace(/,/g, '')),
    unit,
    dur: dur ? dur.replace(/^0(\d:)/, '$1') : null,
  });
}

// Cooked products cooking.yaml lacks: recipes from their own page's {{Cook}} template, one "|" line per recipe
// ("Gelatinous Membrane,1;Larval Core,1;1;2.5%Preserve Flesh" = ingredients with amounts; output amount; time%process).
// {{CookObsolete}} (recipes removed from the game) doesn't count.
function cookRecipes(text) {
  const t = text?.match(/\{\{Cook\s*\|([\s\S]*?)\}\}/)?.[1];
  if (!t) return null;
  return t.split('\n|').map((line) => {
    const parts = line.trim().split(';');
    const process = parts.pop().replace(/^[\d.]+%/, '');
    return { in: parts.slice(0, -1).map((p) => [p.split(',')[0].trim()]), process };
  });
}
for (const from of rename.keys()) if (!renamed.has(from)) throw new Error(`Rename "${from}" matches no row (fixed on the wiki? remove it).`);

for (const [name, a] of fishAlias) {
  if (!fish.has(fishKey(a))) throw new Error(`fishAliases: "${a}" (for ${name}) is not in the Fish list any more — remove it.`);
}

const others = rows.filter((r) => !dishes.has(unquote(r.name)) && !fishOf(r.name) && !raw.has(r.name)).map((r) => r.name);
const pages = await wikitextMany([...new Set(others)]);

const effects = rows.map((r) => {
  if (dishes.has(unquote(r.name))) return { ...r, dish: dishes.get(unquote(r.name)) };
  if (fishOf(r.name)) return { ...r, src: 'fish', fish: fishOf(r.name) };
  if (raw.has(r.name)) return { ...r, src: 'raw' };
  const recipes = cookRecipes(pages.get(r.name));
  return recipes ? { ...r, recipes, src: 'cooked' } : { ...r, src: 'other' };
});

const header = [
  "Nutrient Ingestor effects: what each food or fish does when fed into the Exosuit's Nutrient Ingestor (Worlds Part II+).",
  "Generated by tools/generate/ingest.js from the No Man's Sky community wiki \"Nutrient Ingestor\" ingestion-effects table,",
  '"Fish" list and item pages (CC BY-SA), Nov 2026. Hand corrections: tools/generate/corrections/ingest.yaml.',
  "  amount + unit = the bonus shown in game (64, '%' = \"+64% Resources Mined\"); negative = reduced (e.g. Recharge Time).",
  '  dur  = buff time added per unit fed in (m:ss); null where the wiki lists no time.',
  "  dish = name of the matching recipe in cooking.yaml. Otherwise src: 'fish' (caught by fishing), 'raw' (raw ingredient),",
  "         'cooked' (cooked product missing from cooking.yaml; recipes taken from its own wiki page), or 'other'.",
  'Rows the wiki lists as "-100% Unspecified" (raw seafood/catnip placeholders with no real effect) are left out.',
];
writeData('ingest', header, { ingestEffects: applyCorrections(effects, corr.corrections) });
