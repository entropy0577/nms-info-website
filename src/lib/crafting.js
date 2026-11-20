// Crafting helpers (data in data/crafting.yaml).
import { crafted } from './data/crafting.yaml';

export const craftByName = Object.fromEntries(crafted.map((c) => [c.name, c]));

/** Flatten a recipe down to raw (non-craftable) ingredients. */
export function rawTotals(name, mult = 1, acc = {}) {
  const recipe = craftByName[name];
  if (!recipe) {
    acc[name] = (acc[name] || 0) + mult;
    return acc;
  }
  for (const [ing, n] of recipe.in) rawTotals(ing, n * mult, acc);
  return acc;
}
