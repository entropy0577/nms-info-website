// Applies hand corrections (tools/generate/corrections/<name>.yaml) on top of generated records, so regenerating
// a file never silently loses a fix. Each correction must match exactly one record, or the generator stops — that
// way a correction that no longer matches (a rename) gets noticed; a `set` that no longer changes anything (the wiki
// was fixed) stops the generator too.
//
// Corrections file format — a list under `corrections:`, applied in order:
//   - why: Stellar Custard needs both ingredients, the wiki table merges them into one slot.   (required)
//     match: {name: Stellar Custard}          # every listed field must equal the record's field
//     set: {recipes: [[[Cream], [Sweetroot]]]} # replace these fields
//   - why: …
//     match: {name: Something}
//     remove: true                             # drop the record
//   - why: …
//     add: {name: New thing, …}                # insert a record…
//     after: {name: Previous thing}            # …after this one (omit to append at the end)
//   - why: …
//     match: {name: X}
//     move_after: {name: Y}                    # reorder a record (keeps generated order stable)
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const DIR = path.join(import.meta.dirname, '..', 'corrections');

const matches = (rec, m) => Object.entries(m).every(([k, v]) => JSON.stringify(rec[k]) === JSON.stringify(v));

function findOne(records, m, why) {
  const hits = records.filter((r) => matches(r, m));
  if (hits.length !== 1) throw new Error(`Correction "${why}": match ${JSON.stringify(m)} found ${hits.length} records (expected exactly 1).`);
  return records.indexOf(hits[0]);
}

/** Load corrections/<name>.yaml (an empty list if the file doesn't exist). Extra top-level keys are allowed for generator-specific settings. */
export function loadCorrections(name) {
  const file = path.join(DIR, name + '.yaml');
  if (!fs.existsSync(file)) return { corrections: [] };
  const doc = parse(fs.readFileSync(file, 'utf8'), { uniqueKeys: true }) || {};
  doc.corrections ||= [];
  for (const c of doc.corrections) if (!c.why) throw new Error(`${file}: every correction needs a "why".`);
  return doc;
}

/** Apply a list of corrections to an array of records (returns a new array). */
export function applyCorrections(records, corrections) {
  const out = records.slice();
  for (const c of corrections) {
    if (c.add) {
      const at = c.after ? findOne(out, c.after, c.why) + 1 : out.length;
      out.splice(at, 0, structuredClone(c.add));
      continue;
    }
    if (!c.match) throw new Error(`Correction "${c.why}" needs match or add.`);
    const i = findOne(out, c.match, c.why);
    if (c.remove) out.splice(i, 1);
    else if (c.move_after) {
      const [rec] = out.splice(i, 1);
      out.splice(findOne(out, c.move_after, c.why) + 1, 0, rec);
    } else if (c.set) {
      const next = { ...out[i], ...structuredClone(c.set) };
      // A correction that changes nothing means the source now agrees — it should be removed, not kept silently.
      if (JSON.stringify(next) === JSON.stringify(out[i])) throw new Error(`Correction "${c.why}" no longer changes anything (the source now agrees) — remove it.`);
      out[i] = next;
    }
    else throw new Error(`Correction "${c.why}" has nothing to do (set, remove or move_after).`);
  }
  return out;
}
