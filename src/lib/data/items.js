// Builds a single index of every item mentioned anywhere on the site, so each item gets
// one page that gathers everything about it (where to buy it, how to make it, what uses it).
import { economies, tierValues, tradeGoodAliases, smuggledGoods } from './economy.js';
import { production } from './settlements.js';
import { resources } from './resources.js';
import { crafted } from './crafting.js';
import { refinerRecipes } from './refiner.js';
import { dishes } from './cooking.js';
import { technology } from './tech.js';

const aliasToName = {};
for (const [name, list] of Object.entries(tradeGoodAliases)) {
  for (const a of list) aliasToName[a.toLowerCase()] = name;
}

/** Map any alias to the canonical item name. */
export function canonical(name) {
  return aliasToName[name.toLowerCase()] || name;
}

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

export const allItems = [...items.values()].sort((a, b) => a.name.localeCompare(b.name));

export function findItem(name) {
  return items.get(canonical(name));
}

export function aliasesOf(name) {
  return tradeGoodAliases[name] || [];
}
