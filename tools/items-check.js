// Cross-file item check: every item name used in a recipe, cost, production row, reward or <ItemLink name="…"> must be
// an item that some data file defines. That catches typos and items renamed or removed in a game update — which
// would otherwise quietly create a second, empty item page.
//
// Defined items: trade goods and smuggled goods (economy), resources, crafted products, dishes and raw ingredients
// (cooking), Nutrient Ingestor foods and fish (ingest), and otherItems (items.yaml: real items with no data of their own).
// Names are matched after alias resolution (economy tradeGoodAliases + items itemAliases), case-sensitively.
import { makeCanonical } from '../src/lib/item-index.js';

/** Settlement rows can carry a size in brackets, e.g. "Frigate Fuel (50 Tonnes)"; the item page groups them. */
const baseName = (n) => n.replace(/ \(.*\)$/, '');
/** Expedition reward entries that aren't items (shown as plain text on the Frigates page). */
const notAnItem = (n) => n === 'Units' || n === 'Nanites' || n.startsWith('Random');

function distance(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

/**
 * @param {Record<string, any>} data parsed data files by file name ('cooking.yaml' → its exports)
 * @param {{file: string, source: string}[]} svelteFiles page/component sources, for <ItemLink name="…"> literals
 * @returns {{file: string, path?: (string|number)[], line?: number, message: string}[]}
 */
export function checkItems(data, svelteFiles) {
  const d = (f) => data[f] || {};
  const { tradeGoodAliases = {} } = d('economy.yaml');
  const { otherItems = [], itemAliases = {}, placeholders = [] } = d('items.yaml');
  const { canonical } = makeCanonical(tradeGoodAliases, itemAliases);
  const errors = [];

  // ── What exists ──
  const defined = new Set();
  const define = (n) => defined.add(canonical(n));
  for (const e of d('economy.yaml').economies || []) e.goods.forEach(define);
  (d('economy.yaml').smuggledGoods || []).forEach(define);
  for (const r of d('resources.yaml').resources || []) define(r.name);
  for (const c of d('crafting.yaml').crafted || []) define(c.name);
  for (const x of d('cooking.yaml').dishes || []) define(x.name);
  for (const x of d('cooking.yaml').rawIngredients || []) define(x.name);
  for (const x of d('ingest.yaml').ingestEffects || []) define(x.name);
  otherItems.forEach(define);
  const sorted = [...defined].sort();

  const unknown = (name) => {
    const best = sorted.map((n) => [distance(name, n), n]).sort((a, b) => a[0] - b[0])[0];
    const hint = best && best[0] <= Math.max(2, Math.floor(name.length / 5)) ? ` Did you mean "${best[1]}"?` : '';
    return `"${name}" is not a known item.${hint}`;
  };
  const ref = (file, path, name, { allowPlaceholder = false } = {}) => {
    if (allowPlaceholder && placeholders.includes(name)) return;
    if (!defined.has(canonical(name))) errors.push({ file, path, message: unknown(name) });
  };
  const costs = (file, key, rows, field = 'cost') => rows?.forEach((r, i) => r[field].forEach(([n], j) => ref(file, [key, i, field, j, 0], n)));

  // ── items.yaml itself ──
  for (const [name, list] of Object.entries(itemAliases)) {
    if (!defined.has(name)) errors.push({ file: 'items.yaml', path: ['itemAliases', name], message: unknown(name) });
    list.forEach((a, i) => {
      if (defined.has(a) && a !== name) errors.push({ file: 'items.yaml', path: ['itemAliases', name, i], message: `"${a}" is an item of its own, so it can't also be an alias of "${name}".` });
    });
  }

  // ── Everything that names an item ──
  costs('crafting.yaml', 'crafted', d('crafting.yaml').crafted, 'in');
  d('refiner.yaml').refinerRecipes?.forEach((r, i) => {
    ref('refiner.yaml', ['refinerRecipes', i, 'out'], r.out);
    r.in.forEach(([n], j) => ref('refiner.yaml', ['refinerRecipes', i, 'in', j, 0], n));
  });
  d('cooking.yaml').dishes?.forEach((x, i) => x.recipes.forEach((rec, a) => rec.forEach((slot, b) => slot.forEach((n, c) => {
    ref('cooking.yaml', ['dishes', i, 'recipes', a, b, c], n, { allowPlaceholder: true });
  }))));
  for (const [sp, rows] of Object.entries(d('settlements.yaml').production || {})) {
    rows.forEach((r, i) => ref('settlements.yaml', ['production', sp, i, 'item'], baseName(r.item)));
  }
  costs('tech.yaml', 'technology', d('tech.yaml').technology);
  costs('base.yaml', 'generators', d('base.yaml').generators);
  costs('base.yaml', 'productionParts', d('base.yaml').productionParts);
  costs('expeditions.yaml', 'boosters', d('expeditions.yaml').boosters);
  costs('expeditions.yaml', 'fuelItems', d('expeditions.yaml').fuelItems);
  d('expeditions.yaml').boosters?.forEach((b, i) => ref('expeditions.yaml', ['boosters', i, 'name'], b.name));
  for (const [type, pools] of Object.entries(d('expedition-rewards.yaml').expeditionRewards || {})) {
    for (const size of ['normal', 'small']) {
      pools[size].forEach((pool, p) => pool.forEach((r, i) => {
        if (!notAnItem(r.item)) ref('expedition-rewards.yaml', ['expeditionRewards', type, size, p, i, 'item'], r.item);
      }));
    }
  }
  d('explore.yaml').starColours?.forEach((s, i) => {
    ref('explore.yaml', ['starColours', i, 'metal'], s.metal);
    ref('explore.yaml', ['starColours', i, 'activated'], s.activated);
  });
  const dishNames = new Set((d('cooking.yaml').dishes || []).map((x) => x.name));
  d('ingest.yaml').ingestEffects?.forEach((e, i) => {
    if (e.dish && !dishNames.has(e.dish)) errors.push({ file: 'ingest.yaml', path: ['ingestEffects', i, 'dish'], message: `"${e.dish}" is not a dish in cooking.yaml.` });
    e.recipes?.forEach((r, a) => r.in.forEach((slot, b) => slot.forEach((n, c) => ref('ingest.yaml', ['ingestEffects', i, 'recipes', a, 'in', b, c], n))));
  });

  // ── <ItemLink name="…"> written directly in pages and components ──
  for (const { file, source } of svelteFiles) {
    for (const m of source.matchAll(/<ItemLink\s+name="([^"{}]+)"/g)) {
      if (!defined.has(canonical(m[1]))) errors.push({ file, line: source.slice(0, m.index).split('\n').length, message: unknown(m[1]) });
    }
  }
  return errors;
}
