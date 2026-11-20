// Vite plugin for the site's data (src/lib/data/*.yaml):
//
// 1. Compiles each YAML file into a plain ES module at build time: every top-level key becomes a named export
//    (`import { dishes } from '../lib/data/cooking.yaml'`). YAML never reaches the browser.
// 2. Checks the data and fails the build (or shows the error overlay in dev) on any problem, with file and line:
//    YAML syntax errors and duplicate keys, a file without a schema, schema errors (tools/schemas.js: missing fields,
//    wrong types, unknown keys) and unknown item names (tools/items-check.js).
// 3. Serves two small build-time modules so the app shell doesn't have to load all the data:
//    - virtual:nms-search — the names the search box needs (items with kinds and aliases, technology, economy names)
//    - virtual:nms-stats  — the counts shown on the home page
import fs from 'node:fs';
import path from 'node:path';
import { parseDocument, LineCounter } from 'yaml';
import { validateFile } from './schema.js';
import { schemas } from './schemas.js';
import { checkItems } from './items-check.js';
import { buildItemIndex } from '../src/lib/item-index.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'lib', 'data');
const SRC_DIR = path.join(ROOT, 'src');
const VIRTUAL = ['virtual:nms-search', 'virtual:nms-stats'];
const MAX_ERRORS = 30;

const rel = (file) => path.relative(ROOT, file);
const isDataFile = (id) => /\.ya?ml$/.test(id) && path.dirname(id) === DATA_DIR;

/** Parse one YAML file. Returns { data, doc, lines } or throws with file:line on a syntax problem. */
function parseYaml(file, code) {
  const lines = new LineCounter();
  const doc = parseDocument(code, { prettyErrors: true, uniqueKeys: true, lineCounter: lines });
  const problem = doc.errors[0] || doc.warnings[0];
  if (problem) {
    const at = problem.linePos?.[0];
    throw new Error(`${rel(file)}${at ? `:${at.line}:${at.col}` : ''}\n${problem.message}`);
  }
  const data = doc.toJS();
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`${rel(file)}: the top level must be a mapping (each key becomes a named export).`);
  }
  for (const key of Object.keys(data)) {
    if (!/^[A-Za-z_$][\w$]*$/.test(key)) throw new Error(`${rel(file)}: top-level key "${key}" is not a valid JS export name.`);
  }
  return { data, doc, lines };
}

/** "dishes[3].recipes[0][1]" */
const showPath = (p) => p.map((k) => (typeof k === 'number' ? `[${k}]` : /^[A-Za-z_$][\w$]*$/.test(k) ? `.${k}` : `["${k}"]`)).join('').replace(/^\./, '');

/** Line number of the YAML node at `p` (or its nearest existing parent). */
function lineOf(parsed, p) {
  for (let i = p.length; i >= 0; i--) {
    const node = parsed.doc.getIn(p.slice(0, i), true);
    const offset = node?.range?.[0] ?? (i === 0 ? 0 : undefined);
    if (offset !== undefined) return parsed.lines.linePos(offset).line;
  }
  return 1;
}

/** Schema errors for one parsed file, formatted. */
function schemaErrors(name, parsed) {
  const entry = schemas[name];
  if (!entry) return [`src/lib/data/${name}: no schema — add one to tools/schemas.js.`];
  const errors = validateFile(parsed.data, entry.schema);
  if (!errors.length && entry.check) entry.check(parsed.data, (p, message) => errors.push({ path: p, message }));
  return errors.map((e) => `src/lib/data/${name}:${lineOf(parsed, e.path)} ${showPath(e.path) || '(top level)'}: ${e.message}`);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.svelte')) out.push(p);
  }
  return out;
}

/** Parse every data file and run all checks. Returns { files, errors }. */
export function loadAll() {
  const files = {};
  const errors = [];
  for (const name of fs.readdirSync(DATA_DIR).sort()) {
    const file = path.join(DATA_DIR, name);
    if (!/\.ya?ml$/.test(name)) {
      errors.push(`${rel(file)}: only YAML data files belong in src/lib/data/ — put code in src/lib/.`);
      continue;
    }
    try {
      files[name] = parseYaml(file, fs.readFileSync(file, 'utf8'));
      errors.push(...schemaErrors(name, files[name]));
    } catch (e) {
      errors.push(e.message);
    }
  }
  for (const name of Object.keys(schemas)) {
    if (!fs.existsSync(path.join(DATA_DIR, name))) errors.push(`tools/schemas.js has a schema for ${name}, but src/lib/data/${name} doesn't exist.`);
  }
  // Item names only mean something once every file is valid.
  if (!errors.length) {
    const data = Object.fromEntries(Object.entries(files).map(([n, f]) => [n, f.data]));
    const svelte = walk(SRC_DIR).map((f) => ({ file: rel(f), source: fs.readFileSync(f, 'utf8') }));
    for (const e of checkItems(data, svelte)) {
      const where = e.path ? `src/lib/data/${e.file}:${lineOf(files[e.file], e.path)} ${showPath(e.path)}` : `${e.file}:${e.line}`;
      errors.push(`${where}: ${e.message}`);
    }
  }
  return { files, errors };
}

export function report(errors) {
  const shown = errors.slice(0, MAX_ERRORS).map((e) => '  ✗ ' + e.replace(/\n/g, '\n    '));
  const more = errors.length > MAX_ERRORS ? `\n  …and ${errors.length - MAX_ERRORS} more.` : '';
  const hint = errors.some((e) => e.includes('is not a known item'))
    ? '\n  Unknown item: fix the spelling, or if it is a real in-game item with no data of its own, add it to otherItems in' +
      '\n  src/lib/data/items.yaml (itemAliases if it is another name for an existing item).'
    : '';
  return `Data check failed (${errors.length} problem${errors.length === 1 ? '' : 's'}):\n${shown.join('\n')}${more}${hint}`;
}

/** Source of the virtual modules, built from the parsed data. */
function virtualModule(id, files) {
  const d = (f) => files[f].data;
  const index = buildItemIndex({
    ...d('economy.yaml'), ...d('settlements.yaml'), ...d('resources.yaml'), ...d('crafting.yaml'), ...d('refiner.yaml'),
    ...d('cooking.yaml'), ...d('tech.yaml'), ...d('items.yaml'),
  });
  if (id === 'virtual:nms-search') {
    const search = {
      items: index.allItems.map((it) => [it.name, [...it.kinds].join(' · '), index.aliasesOf(it.name)]),
      technology: d('tech.yaml').technology.map((t) => [t.name, t.device]),
      economies: d('economy.yaml').economies.map((e) => [e.id, e.name, e.aliases]),
      strengths: d('economy.yaml').strengths.map((s) => [s.level, s.stars, s.names]),
    };
    return Object.entries(search).map(([k, v]) => `export const ${k} = ${JSON.stringify(v)};`).join('\n');
  }
  const stats = {
    items: index.allItems.length,
    refinerRecipes: d('refiner.yaml').refinerRecipes.length,
    dishes: d('cooking.yaml').dishes.length,
    technology: d('tech.yaml').technology.length,
  };
  return `export const stats = ${JSON.stringify(stats)};`;
}

export default function nmsData() {
  let state = null; // { files, errors } — reset whenever a data or page file changes

  const current = () => (state ??= loadAll());

  return {
    name: 'nms-data',

    buildStart() {
      const { errors } = current();
      if (errors.length) this.error(report(errors));
    },

    resolveId(id) {
      if (VIRTUAL.includes(id)) return '\0' + id;
    },

    load(id) {
      if (!id.startsWith('\0virtual:nms-')) return null;
      const { files, errors } = current();
      if (errors.length) this.error(report(errors));
      for (const f of Object.keys(files)) this.addWatchFile(path.join(DATA_DIR, f));
      return virtualModule(id.slice(1), files);
    },

    transform(code, id) {
      if (!isDataFile(id)) return null;
      const name = path.basename(id);
      let parsed;
      try {
        parsed = parseYaml(id, code);
      } catch (e) {
        this.error(e.message);
      }
      const errors = schemaErrors(name, parsed);
      if (errors.length) this.error(report(errors));
      const lines = Object.entries(parsed.data).map(([key, value]) => `export const ${key} = ${JSON.stringify(value)};`);
      return { code: lines.join('\n'), map: { mappings: '' } };
    },

    // Dev server: re-check on every data or page change, show problems in the error overlay, refresh the virtual modules.
    configureServer(server) {
      const onChange = (file) => {
        if (!(isDataFile(file) || (file.endsWith('.svelte') && file.startsWith(SRC_DIR)))) return;
        state = null;
        for (const v of VIRTUAL) {
          const mod = server.moduleGraph.getModuleById('\0' + v);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
        const { errors } = current();
        if (errors.length) {
          server.config.logger.error(report(errors), { timestamp: true });
          server.ws.send({ type: 'error', err: { message: report(errors), stack: '', plugin: 'nms-data' } });
        } else if (isDataFile(file)) server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('change', onChange);
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
    },
  };
}
