// Generates src/lib/data/tech.yaml from the No Man's Sky community wiki (nomanssky.fandom.com, CC BY-SA).
//
// The wiki "Technology" page gives the list: device (== Exosuit Technology == …), group (=== sub-heading ===), name,
// description, and upgrades as nested bullets (`** [[Upgrade]] - desc` under `* [[Base tech]] - desc`).
// Each technology's own page gives the build cost ({{Craft|Item,qty;…}}), the infobox `recharge` and the blueprint source.
//
// Usage: node tools/generate/tech.js [--check] [--refresh]
import { wikitext, wikitextMany } from './lib/wiki.js';
import { loadCorrections, applyCorrections } from './lib/corrections.js';
import { writeData } from './lib/output.js';

/** Wiki links to plain text: [[Page|label]] → label, [[Page]] → Page. */
const unlink = (s) => s.replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1');

/** Where a blueprint usually comes from when the page doesn't say (shown on the site as "Usually: …"). */
const USUAL_SOURCE = {
  Exosuit: 'Space Anomaly (nanites)',
  'Multi-Tool': 'Space Anomaly (nanites)',
  Starship: 'Space Anomaly (nanites)',
  Exocraft: 'Space Anomaly (exocraft tech)',
  Freighter: 'Freighter Upgrade Control (Salvaged Frigate Modules)',
};

/** The technology list from the "Technology" page, in page order. */
function parseList(text, ungrouped) {
  const list = [];
  let device = null, group = '', parent = null;
  for (const line of text.split('\n')) {
    let m;
    if ((m = line.match(/^==\s*([^=].*?)\s*==\s*$/))) {
      // Device sections are "== Exosuit Technology ==" etc.; other sections (Summary, Storage…) hold no list.
      device = /^(.+) Technology$/.exec(m[1])?.[1] ?? null;
      group = '';
    } else if ((m = line.match(/^===\s*(.+?)\s*===\s*$/))) {
      group = ungrouped.includes(m[1]) ? '' : m[1].replace(`${device} - `, ''); // "Multi-Tool - Mining" → "Mining"
    } else if (device && (m = line.match(/^(\*+)\s*\[\[([^\]|]+)[^\]]*\]\]\s*(?:-\s*)?(.*)$/))) {
      // A few entries omit the " - " between the link and the description.
      const name = m[2].trim();
      if (m[1].length === 1) parent = name;
      list.push({ name, device, group, upgradeOf: m[1].length === 1 ? null : parent, desc: unlink(m[3]).trim() });
    }
  }
  return list;
}

/** Build cost from the first {{Craft|…}} template ({{CraftObsolete}} = no longer buildable → no cost). */
function parseCost(page) {
  const m = page.match(/\{\{Craft\|(?:1=)?([^|}]*)/);
  if (!m) return [];
  return m[1].split(';').filter((s) => s.trim()).map((s) => {
    const i = s.lastIndexOf(',');
    return [s.slice(0, i).trim(), Number(s.slice(i + 1))];
  });
}

/** The infobox `| recharge = …` value, links removed. */
const parseRecharge = (page) => unlink(page.match(/^\|\s*recharge\s*=(.*)$/m)?.[1] ?? '').trim();

/**
 * Blueprint source from the first sentence that mentions a blueprint in one of the recognised phrasings:
 *   "…from a [[Technology Merchant]] for 120 {{nanites}}"          → Technology Merchant (120 nanites)
 *   "…from [[Iteration: Selene]] on the [[Space Anomaly]] for 90…"  → Space Anomaly — Iteration: Selene (90 nanites)
 *   "…from the [[Exosuit]] upgrade merchant on the [[Space Anomaly]]" → Space Anomaly — exosuit tech merchant
 *   "…purchased in the [[Space Anomaly]] for 80 [[Nanite Cluster]]s" → Space Anomaly (80 nanites)
 *   "The … questline / Expedition / vendor …"                       → the sentence itself
 *   "The blueprint can be researched at the [[Upgrade Control]] terminal for four [[Salvaged Frigate Module]]s"
 *                                                                    → Freighter Upgrade Control (4 Salvaged Frigate Modules)
 *   "The blueprint is known from the start of the game"             → Starting gear / early story
 * Sentences without the word "blueprint" count only when they say how the technology is acquired:
 *   "This technology can be acquired from [[Iteration: Hyperion]] onboard the Space Anomaly for 240 Nanites."
 * Anything else → null, i.e. the usual source is shown.
 */
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 };
/** "four" / "12" → 4 / 12 (throws on anything else, so a new phrasing is noticed). */
function count(word) {
  const n = /^\d+$/.test(word) ? Number(word) : WORDS[word.toLowerCase()];
  if (!n) throw new Error(`Unrecognised number "${word}" in a Salvaged Frigate Module cost`);
  return n;
}

function parseSource(page) {
  const nanites = (s) => {
    const n = s.match(/for (\d+)\s*(?:\{\{nanites\}\}|nanites?\b|\[\[Nanite Cluster\]\]s)/i)?.[1];
    return n ? ` (${n} nanites)` : '';
  };
  const sentences = page.split('\n').flatMap((l) => l.replace(/^[*:#\s]+/, '').split(/(?<=\.)\s+(?=[A-Z])/));
  for (const s of sentences) {
    if (!/blueprint|technology can be acquired/i.test(s)) continue;
    let m;
    if (/known from the start of the game/.test(s)) return 'Starting gear / early story';
    if ((m = s.match(/\[\[Upgrade Control\]\] terminal for (?:x\s*)?(\w+) \[\[Salvaged Frigate Module/))) {
      return `Freighter Upgrade Control (${count(m[1])} Salvaged Frigate Modules)`;
    }
    if ((m = s.match(/\[\[Technology Merchant\]\] for (\d+)/))) return `Technology Merchant (${m[1]} nanites)`;
    if ((m = s.match(/\[\[Iteration: ([^\]|]+)\]\]/))) return `Space Anomaly — Iteration: ${m[1]}${nanites(s)}`;
    if (/upgrade merchant on the \[\[Space Anomaly\]\]/.test(s)) return 'Space Anomaly — exosuit tech merchant';
    if (/\[\[Space Anomaly\]\]/.test(s)) return `Space Anomaly${nanites(s)}`;
    if (/^The\b.*\b(questline|Expedition|vendor)\b/.test(s)) return unlink(s).trim();
  }
  return null;
}

const { corrections, startingGear = [], ungroupedSections = [] } = loadCorrections('tech');
const list = parseList(await wikitext('Technology'), ungroupedSections);
const pages = await wikitextMany(list.map((t) => t.name));

const records = list.map((t) => {
  const page = pages.get(t.name);
  if (page == null) throw new Error(`Wiki page not found: ${t.name}`);
  const start = startingGear.includes(t.name);
  const source = start ? 'Starting gear / early story' : parseSource(page);
  return {
    ...t,
    cost: parseCost(page),
    recharge: parseRecharge(page),
    source: source ?? USUAL_SOURCE[t.device],
    guess: source == null,
  };
});

writeData(
  'tech',
  [
    `Installable technology. Generated by tools/generate/tech.js from the No Man's Sky community wiki (nomanssky.fandom.com, CC BY-SA)`,
    `"Technology" page and each tech's page (build cost, recharge, blueprint source), Nov 2026;`,
    `hand corrections and settings live in tools/generate/corrections/tech.yaml.`,
    `guess: true = the wiki page doesn't state the blueprint source; shown as the usual source.`,
  ],
  { technology: applyCorrections(records, corrections) },
);
