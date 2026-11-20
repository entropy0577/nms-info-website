// `npm run generate -- <name…|all> [--check] [--refresh]`
// Regenerates data files from their sources (see each script's header):
//   cooking, ingest, tech, refiner → community wiki; puzzles → wiki puzzle pages; expedition-rewards → game reward table.
//   --check    compare with the committed data instead of writing (exit code 1 if it differs)
//   --refresh  ignore the download cache in tools/generate/.cache/
// After writing, review `git diff src/lib/data/` and run `npm run check`.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const dir = import.meta.dirname;
const available = fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'run.js').map((f) => f.slice(0, -3)).sort();
const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith('--'));
let names = args.filter((a) => !a.startsWith('--'));
if (names.includes('all')) names = available;

const unknown = names.filter((n) => !available.includes(n));
if (!names.length || unknown.length) {
  if (unknown.length) console.error(`Unknown generator: ${unknown.join(', ')}`);
  console.error(`Usage: npm run generate -- <${available.join('|')}|all> [--check] [--refresh]`);
  process.exit(1);
}

let failed = false;
for (const n of names) {
  console.log(`\n▸ ${n}`);
  const r = spawnSync(process.execPath, [path.join(dir, n + '.js'), ...flags], { stdio: 'inherit' });
  if (r.status !== 0) failed = true;
}
process.exit(failed ? 1 : 0);
