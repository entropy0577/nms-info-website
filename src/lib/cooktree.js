// Full recipe trees for cooked dishes: expand every cooked ingredient down to raw ingredients.
// A dish can have several recipes and each slot several interchangeable ingredients, so the tree follows the
// simplest route: the recipe/ingredient choices with the fewest cooking steps. The other options are kept as `alts`.
import { dishes } from './data/cooking.yaml';

const byName = new Map(dishes.map((d) => [d.name, d]));

// Fewest cooking steps to make each dish (raw ingredient = 0). Relaxed until stable, which handles recipes that loop
// back on themselves (a dish only reachable through a loop stays at Infinity).
const steps = new Map(dishes.map((d) => [d.name, Infinity]));
const stepsOf = (name) => (byName.has(name) ? steps.get(name) : 0);
const recipeSteps = (rec) => 1 + rec.reduce((sum, slot) => sum + Math.min(...slot.map(stepsOf)), 0);
for (let changed = true; changed; ) {
  changed = false;
  for (const d of dishes) {
    const best = Math.min(...d.recipes.map(recipeSteps));
    if (best < steps.get(d.name)) { steps.set(d.name, best); changed = true; }
  }
}

/**
 * Tree node: { name, cooked, process, steps, alts, children }.
 * `alts` lists the other ingredients that fit the same slot. Children always need fewer steps than their parent,
 * so the tree is finite.
 */
function build(name, alts = []) {
  const d = byName.get(name);
  if (!d || !Number.isFinite(steps.get(name))) return { name, cooked: !!d, process: null, steps: 0, alts, children: [] };
  const rec = d.recipes.reduce((best, r) => (recipeSteps(r) < recipeSteps(best) ? r : best));
  const children = rec.map((slot) => {
    const pick = slot.reduce((best, i) => (stepsOf(i) < stepsOf(best) ? i : best));
    return build(pick, slot.filter((i) => i !== pick));
  });
  return { name, cooked: true, process: d.process, steps: steps.get(name), alts, children };
}

const cache = new Map();
export function recipeTree(name) {
  if (!cache.has(name)) cache.set(name, build(name));
  return cache.get(name);
}

/** Raw ingredients needed for one of the dish via its tree, most first: [[name, count], …]. */
export function rawShoppingList(tree) {
  const counts = new Map();
  const walk = (n) => (n.children.length ? n.children.forEach(walk) : counts.set(n.name, (counts.get(n.name) || 0) + 1));
  walk(tree);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
