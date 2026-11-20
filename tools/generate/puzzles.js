// Generates src/lib/data/puzzles-generated.yaml from the No Man's Sky community wiki (CC BY-SA):
// - "Secure Sites/Puzzles": the datamined Manufacturing Facility / Operations Centre puzzle tables and their reward table.
// - The Gek/Korvax/Vy'keen Observatory puzzle pages and the Transmission Tower puzzle page.
// The `rule` of each code puzzle is worked out here from the sequence itself (the wiki explains them in prose).
//
// Usage: node tools/generate/puzzles.js [--check] [--refresh]
import { wikitextMany } from './lib/wiki.js';
import { loadCorrections, applyCorrections } from './lib/corrections.js';
import { writeData } from './lib/output.js';

const SECURE = 'Secure Sites/Puzzles';
const OBSERVATORIES = { Gek: 'Gek Observatory puzzle', Korvax: 'Korvax Observatory puzzle', "Vy'keen": "Vy'keen Observatory puzzle" };
const TOWER = 'Transmission Tower puzzle';

const settings = loadCorrections('puzzles-generated');
const pages = await wikitextMany([SECURE, ...Object.values(OBSERVATORIES), TOWER]);
for (const [t, text] of pages) if (text == null) throw new Error(`Wiki page not found: ${t}`);

const decode = (s) => s.replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
/** Wiki prose → one line: entities decoded, line breaks and paragraph gaps collapsed to single spaces. */
const clean = (s) => decode(s).replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------------------------------------------------------
// Wikitable parsing. Rows are separated by "|-"; each cell starts on a new line with "|" (or "!" for headers) and may
// run over several lines. A leading `rowspan="n" id="…" |` attribute part is kept separately so rowspans can be
// followed: a cell with rowspan n covers this row and the next n-1 rows, which then lack that column.

/** Split the body of every `{| … |}` table in the text into arrays of rows of {attrs, text} cells (header/caption lines dropped). */
function tables(wikitext) {
  return [...wikitext.matchAll(/^\{\|.*\n([\s\S]*?)^\|\}/gm)].map((m) =>
    m[1]
      .split(/^\|-\s*$/m)
      .map((row) =>
        row
          .split(/^(?=[|!])/m)
          .filter((c) => c.startsWith('|') && !c.startsWith('|+'))
          .map((c) => {
            const body = c.slice(1);
            const attr = body.match(/^\s*((?:\w+="[^"]*"\s*)+)\|(?!\])/);
            return { attrs: attr ? attr[1] : '', text: (attr ? body.slice(attr[0].length) : body).trim() };
          }),
      )
      .filter((r) => r.length),
  );
}
const rowspan = (cell) => Number(cell.attrs.match(/rowspan="(\d+)"/)?.[1] ?? 1);
/** Comma-separated cell entries, in order: `[[#ID|ID]]` anchor links as {id}, anything else as {text}. */
const entries = (text) =>
  text.split(',').map((s) => s.trim()).filter(Boolean).map((s) => {
    const id = s.match(/^\[\[#([^|\]]+)/)?.[1];
    return id ? { id: id.replace(/^\?/, '') } : { text: clean(s) };
  });

// ---------------------------------------------------------------------------------------------------------------
// Secure site puzzles.

const secureText = pages.get(SECURE);
const [rewardTable] = tables(secureText.slice(secureText.indexOf('== Rewards ==')));
const puzzleTables = tables(secureText.slice(0, secureText.indexOf('== Rewards ==')));

// Reward id → the reward table's first description line (enough to label the simple rewards).
const rewardText = new Map();
for (const row of rewardTable) if (row[0]?.attrs.includes('id=')) rewardText.set(row[0].text, { text: clean(row[2].text.split('\n')[0]), rows: rowspan(row[0]) });

const RACE_OF_GUILD = { EXP: 'Korvax', TRA: 'Gek', WAR: "Vy'keen" };
const RACE_OF_FACTION = { Explorers: 'Korvax', Traders: 'Gek', Warriors: "Vy'keen" };
const num = (n) => Number(n).toLocaleString('en-US');

/** Short label for a reward id: from the settings' rewardLabels, else derived from the wiki's reward table. */
function rewardLabel(id) {
  if (settings.rewardLabels?.[id]) return settings.rewardLabels[id];
  const r = rewardText.get(id);
  if (!r) throw new Error(`Reward ${id} is not in the wiki's reward table — add it to rewardLabels.`);
  let m;
  if ((m = r.text.match(/^(-?)1 standing change with (\w+)$/))) return `${m[1] ? '−' : '+'}${RACE_OF_FACTION[m[2]]} standing`;
  if ((m = r.text.match(/^Between (\d+) & (\d+) (Nanites|Units)$/))) return `${num(m[1])}–${num(m[2])} ${m[3].toLowerCase()}`;
  if ((m = r.text.match(/^Between (\d+) & (\d+) of .* substances$/))) return `${num(m[1])}–${num(m[2])} resources`;
  if (/^Learn 1 word/.test(r.text)) return `New ${RACE_OF_GUILD[id.split('_').pop()]} word`;
  if ((m = r.text.match(/^1 (.+)$/)) && r.rows === 1) return m[1];
  throw new Error(`No label for reward ${id} ("${r.text}") — add it to rewardLabels.`);
}

/** Site and race from a puzzle id such as EXP_FACTORY7 / WAR_HARV_3 (?ALL_FACT_REWARD is the shared final screen). */
function siteRace(id) {
  if (id === 'ALL_FACT_REWARD') return { site: 'Final reward screen', race: 'Any' };
  const [guild, kind] = id.split('_');
  return { site: kind.startsWith('FACTORY') ? 'Manufacturing Facility' : 'Operations Centre', race: RACE_OF_GUILD[guild] };
}

// Columns: Puzzle | Biome | Flow (text) | Option | Mood | Cost | Rewards | Next iteration. Puzzle spans all its rows;
// Biome and Flow span one biome variant's option rows. A puzzle with biome variants (BiomeHot, BiomeCold, …) keeps the
// first variant's text (always BiomeHot on the wiki) and lists every variant's options in page order.
const securePuzzles = [];
for (const table of puzzleTables) {
  let puzzle, biomeLeft = 0;
  for (const row of table) {
    let cells = row;
    if (cells.length === 8) {
      const id = cells[0].text.replace(/^\?/, '');
      puzzle = { id, ...siteRace(id), hot: cells[1].text === 'BiomeHot', text: clean(cells[2].text), options: [] };
      securePuzzles.push(puzzle);
      cells = cells.slice(1);
    }
    if (cells.length === 7) [biomeLeft, cells] = [rowspan(cells[0]), cells.slice(2)];
    if (cells.length !== 5 || biomeLeft-- <= 0) throw new Error(`Unexpected row in ${puzzle?.id}: ${JSON.stringify(row)}`);
    const [opt, mood, , rewards, next] = cells.map((c) => c.text);
    const nextId = entries(next)[0]?.id;
    puzzle.options.push({
      opt: clean(opt),
      mood: mood.toLowerCase(),
      rewards: [...new Set(entries(rewards).map((e) => e.text ?? rewardLabel(e.id)))], // a reward listed twice shows once
      then: !nextId ? '' : nextId === 'ALL_FACT_REWARD' ? 'Final reward screen' : 'Follow-up puzzle',
    });
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Observatory and Transmission Tower code puzzles. Each "==Puzzle n==" section has optional <blockquote> flavour text,
// the sequence in <big>…</big> and the options as a numbered list with the answer in '''bold'''.

const rotl = (s) => s.slice(1) + s[0];
const rotr = (s) => s.at(-1) + s.slice(0, -1);
const steps = (xs, f) => xs.slice(1).map((x, i) => f(xs[i], x));
const isRun = (xs, step) => xs.every((x, i) => i === 0 || x === xs[i - 1] + step);
const list = (xs) => xs.join(', ');

/** Plain-English rule for a sequence, checked against the wiki's answer. `codes` are the terms plus the answer, as strings. */
function ruleFor(codes) {
  const all = codes.map(Number);
  const a = all.at(-1);
  const rotates = (f) => codes.every((d, i) => i === 0 || d === f(codes[i - 1]));
  const rules = [
    // Observatories: four-digit codes rotated one place (compared as strings: codes can start with 0).
    () => codes[0].length === 4 && rotates(rotl) && 'Move the first digit to the end.',
    () => codes[0].length === 4 && rotates(rotr) && 'Move the last digit to the front.',
    // Each term is the sum of the previous two.
    () => all.slice(2).every((x, i) => x === all[i] + all[i + 1]) && `Add the previous two numbers (${all.at(-3)} + ${all.at(-2)} = ${a}).`,
    // Two interleaved sequences with the same step.
    () => {
      const [odd, even] = [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)];
      const d = odd[1] - odd[0];
      return all.length >= 6 && d > 0 && isRun(odd, d) && isRun(even, d) && `Two sequences interleaved, each going up by ${d}: ${list(odd)} and ${list(even)}.`;
    },
    // a(n+1) = m·a(n) − c with constant m and c.
    () => {
      const m = (all[2] - all[1]) / (all[1] - all[0]);
      const c = m * all[0] - all[1];
      return Number.isInteger(m) && m > 1 && c > 0 && all.every((x, i) => i === 0 || x === m * all[i - 1] - c) && `Multiply by ${m}, then subtract ${c}.`;
    },
    // Multiplied or divided by a factor that grows or shrinks by one each step.
    () => {
      const f = steps(all, (x, y) => y / x);
      return f.every(Number.isInteger) && isRun(f, 1) && `Multiply by ${list(f.slice(0, -1))}… next is ×${f.at(-1)}.`;
    },
    () => {
      const f = steps(all, (x, y) => x / y);
      return f.every(Number.isInteger) && isRun(f, -1) && `Divide by ${list(f.slice(0, -1))}… next is ÷${f.at(-1)}.`;
    },
    // Added or subtracted amount that changes by one each step.
    () => {
      const d = steps(all, (x, y) => y - x);
      if (d.every((x) => x > 0) && isRun(d, 1)) return `Add ${list(d.slice(0, -1))}… next is +${d.at(-1)}.`;
      if (d.every((x) => x < 0) && isRun(d, 1)) return `Subtract ${list(d.slice(0, -1).map((x) => -x))}… next is −${-d.at(-1)}.`;
    },
  ];
  for (const r of rules) {
    const rule = r();
    if (rule) return rule;
  }
  throw new Error(`No rule found for ${codes.join(' – ')} (last is the wiki's answer) — add a rule or a correction.`);
}

/** Puzzles of one wiki page, as codePuzzles records. */
function codePage(wikitext, site, race) {
  return wikitext.split(/^==\s*Puzzle \d+\s*==\s*$/m).slice(1).map((s) => {
    const options = [...s.matchAll(/^#\s*(.+)$/gm)].map((m) => m[1].trim());
    const answer = options.find((o) => o.startsWith("'''")).replace(/'''/g, '');
    // "1 - 3 - 4 - 7 -11 - 18 - XX": the unknown is written as **** or XX.
    const terms = s.match(/<big>(.*?)<\/big>/)[1].split('-').map((t) => t.trim()).filter((t) => !/^[*X]+$/.test(t));
    return {
      site,
      race,
      sequence: [...terms, '?'].join(' – '),
      options: options.map((o) => o.replace(/'''/g, '')),
      answer,
      text: clean(s.match(/<blockquote>([\s\S]*?)<\/blockquote>/)?.[1] ?? ''),
      rule: ruleFor([...terms, answer]),
    };
  });
}

const codePuzzles = [
  ...Object.entries(OBSERVATORIES).flatMap(([race, title]) => codePage(pages.get(title), 'Observatory', race)),
  ...codePage(pages.get(TOWER), 'Transmission Tower', null),
];

// ---------------------------------------------------------------------------------------------------------------

const corrected = applyCorrections(codePuzzles, settings.corrections);

writeData(
  'puzzles-generated',
  [
    "POI puzzle data. Generated by tools/generate/puzzles.js from the No Man's Sky community wiki (CC BY-SA), Nov 2026:",
    '- Secure Sites/Puzzles (datamined Manufacturing Facility & Operations Centre puzzles, game v2.61 tables)',
    "- Gek/Korvax/Vy'keen Observatory puzzle and Transmission Tower puzzle pages.",
    'Hand corrections and reward labels: tools/generate/corrections/puzzles-generated.yaml.',
    'mood: positive = good outcome, negative = bad, neutral/sad = no gain.',
  ],
  { securePuzzles, codePuzzles: corrected },
);
