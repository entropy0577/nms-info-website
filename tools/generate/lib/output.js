// Writes a generated data file to src/lib/data/<name>.yaml in the house style, or (with --check) compares the
// generated data with the committed file and reports the differences without writing anything.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const DATA = path.join(import.meta.dirname, '..', '..', '..', 'src', 'lib', 'data');
const CHECK = process.argv.includes('--check');

/** Style rules shared by every data file: short collections on one line, table-like lists one record per line. */
function style(node, depth) {
  if (!(YAML.isMap(node) || YAML.isSeq(node))) return;
  const js = JSON.stringify(node.toJSON());
  const items = YAML.isMap(node) ? node.items.map((p) => p.value) : node.items;
  const allScalar = items.every((n) => YAML.isScalar(n));
  const tuples = YAML.isSeq(node) && items.every((n) => YAML.isScalar(n) || (YAML.isSeq(n) && n.items.every(YAML.isScalar)));
  if (depth > 0 && (js.length <= 110 || (YAML.isSeq(node) && allScalar && js.length <= 400) || (tuples && js.length <= 400))) {
    node.flow = true;
    return;
  }
  if (YAML.isSeq(node) && items.length && items.every(YAML.isMap)) {
    const fits = (n) => JSON.stringify(n.toJSON()).length <= 200;
    const table = items.filter(fits).length >= items.length * 0.9;
    for (const n of items) {
      if (table && fits(n)) n.flow = true;
      else for (const p of n.items) style(p.value, depth + 2);
    }
    return;
  }
  for (const n of items) style(n, depth + 1);
}

/** Serialise `data` ({exportName: value}) with a `#` header (array of lines) in the house style. */
export function toYaml(header, data) {
  const doc = new YAML.Document({});
  for (const [k, v] of Object.entries(data)) {
    const pair = doc.createPair(k, v);
    style(pair.value, 1);
    doc.contents.items.push(pair);
  }
  // Quote time-like strings (9:00) so YAML 1.1 tools don't read them as base-60 numbers.
  YAML.visit(doc, { Scalar(_, n) { if (typeof n.value === 'string' && /^\d+(:\d+)+$/.test(n.value)) n.type = 'QUOTE_DOUBLE'; } });
  const body = doc.toString({ lineWidth: 0, flowCollectionPadding: false }).trimEnd().split('\n');
  const res = [...header.map((l) => ('# ' + l).trimEnd()), ''];
  body.forEach((l, i) => {
    if (i > 0 && /^[A-Za-z_]\w*:/.test(l) && body[i - 1] !== '') res.push('');
    res.push(l);
  });
  return res.join('\n') + '\n';
}

function diff(a, b, at, out) {
  if (out.length >= 25) return;
  if (JSON.stringify(a) === JSON.stringify(b)) return;
  if (a && b && typeof a === 'object' && typeof b === 'object' && Array.isArray(a) === Array.isArray(b)) {
    if (Array.isArray(a) && a.length !== b.length) out.push(`${at}: length ${a.length} (committed) → ${b.length} (generated)`);
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diff(a[k], b[k], `${at}${Array.isArray(a) ? `[${k}]` : `.${k}`}`, out);
    return;
  }
  out.push(`${at}: ${JSON.stringify(a)?.slice(0, 160)} (committed) → ${JSON.stringify(b)?.slice(0, 160)} (generated)`);
}

/**
 * Write (or with --check, compare) src/lib/data/<name>.yaml.
 * @param {string} name file name without extension
 * @param {string[]} header comment lines (source, date, field meanings) without the leading '#'
 * @param {Record<string, unknown>} data top-level exports
 */
export function writeData(name, header, data) {
  const file = path.join(DATA, name + '.yaml');
  if (CHECK) {
    const committed = YAML.parse(fs.readFileSync(file, 'utf8'));
    const out = [];
    diff(committed, JSON.parse(JSON.stringify(data)), name, out);
    if (!out.length) console.log(`✓ ${name}.yaml: generated data matches the committed file.`);
    else {
      console.log(`✗ ${name}.yaml differs from the generated data (first ${out.length} differences):\n  ` + out.join('\n  '));
      process.exitCode = 1;
    }
    return;
  }
  fs.writeFileSync(file, toYaml(header, data));
  console.log(`Wrote ${path.relative(process.cwd(), file)} — review the changes with git diff before committing.`);
}
