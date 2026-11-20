// Builds a single index of every item mentioned anywhere on the site, so each item gets one page that gathers
// everything about it (where to buy it, how to make it, what uses it). Pure functions with no imports, so the same
// code runs in the browser (src/lib/items.js) and at build time (tools/vite-plugin-data.js: search data, item check).

/**
 * Alias → canonical name lookup. Each argument maps a canonical name to its other names,
 * e.g. { '5D Torus': ['Five Dimensional Torus'] }.
 */
export function makeCanonical(...aliasMaps) {
  const aliasToName = {};
  const aliasesByName = {};
  for (const map of aliasMaps) {
    for (const [name, list] of Object.entries(map)) {
      aliasesByName[name] = [...(aliasesByName[name] || []), ...list];
      for (const a of list) aliasToName[a.toLowerCase()] = name;
    }
  }
  return {
    /** Map any alias to the canonical item name. */
    canonical: (name) => aliasToName[name.toLowerCase()] || name,
    /** Other names for a canonical item name. */
    aliasesOf: (name) => aliasesByName[name] || [],
  };
}

/** Build the item index from the data files' exports. */
export function buildItemIndex({
  economies, tierValues, tradeGoodAliases, smuggledGoods, production, resources, crafted, refinerRecipes, dishes, technology,
  otherItems, itemAliases,
}) {
  const { canonical, aliasesOf } = makeCanonical(tradeGoodAliases, itemAliases);

  /** @type {Map<string, any>} */
  const items = new Map();

  function get(name) {
    name = canonical(name);
    if (!items.has(name)) {
      items.set(name, {
        name,
        kinds: new Set(),
        value: null,
        tradeGood: null,
        resource: null,
        craft: null,
        usedIn: [],
        refinedFrom: [],
        refinesInto: [],
        settlement: [],
        cook: null,
        usedInCooking: [],
        usedInTech: [],
      });
    }
    return items.get(name);
  }

  for (const e of economies) {
    e.goods.forEach((g, i) => {
      const it = get(g);
      it.kinds.add('Trade good');
      it.value = tierValues[i];
      it.tradeGood = { economy: e, tier: i + 1 };
    });
  }

  for (const s of smuggledGoods) get(s).kinds.add('Smuggled good');

  for (const r of resources) {
    const it = get(r.name);
    it.kinds.add('Resource');
    it.value ??= r.value;
    it.resource = r;
  }

  for (const c of crafted) {
    const it = get(c.name);
    it.kinds.add('Crafted');
    it.value ??= c.value;
    it.craft = c;
    for (const [ing, n] of c.in) get(ing).usedIn.push({ product: c.name, amount: n });
  }

  for (const r of refinerRecipes) {
    get(r.out).refinedFrom.push(r);
    get(r.out).kinds.add('Refinable');
    const seen = new Set();
    for (const [ing] of r.in) {
      if (seen.has(ing)) continue;
      seen.add(ing);
      get(ing).refinesInto.push(r);
    }
  }

  for (const [sp, rows] of Object.entries(production)) {
    for (const row of rows) {
      const name = row.item.replace(/ \(.*\)$/, '');
      const it = get(name);
      it.kinds.add('Settlement product');
      it.settlement.push({ species: sp, ...row });
    }
  }

  for (const d of dishes) {
    const it = get(d.name);
    it.kinds.add('Food');
    it.value ??= d.value;
    it.cook = d;
    const seen = new Set();
    for (const rec of d.recipes) for (const slot of rec) for (const ing of slot) {
      if (seen.has(ing)) continue;
      seen.add(ing);
      const ingItem = get(ing);
      ingItem.usedInCooking.push(d.name);
      ingItem.kinds.add('Cooking ingredient');
    }
  }

  for (const t of technology) {
    for (const [ing, n] of t.cost) get(ing).usedInTech.push({ tech: t.name, device: t.device, amount: n });
  }

  // Items that have no data of their own (data/items.yaml) still get a page, so links to them never dead-end.
  for (const n of otherItems) get(n);

  const allItems = [...items.values()].sort((a, b) => a.name.localeCompare(b.name));
  return { allItems, findItem: (name) => items.get(canonical(name)), canonical, aliasesOf };
}
