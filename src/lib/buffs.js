// Helpers for Nutrient Ingestor buffs (data in data/ingest.yaml). Shared by the Cooking and Units & Nanites pages.
import { ingestEffects } from './data/ingest.yaml';
import { dishes } from './data/cooking.yaml';

// Buff stats grouped by what you'd use them for. Every stat in ingest.yaml appears exactly once.
export const buffGroups = [
  { id: 'money', label: 'Units & Nanites', stats: ['Fauna Analysis Rewards', 'Flora Analysis Rewards', 'Mineral Analysis Rewards', 'Resources Mined', 'Mining Speed'] },
  { id: 'survival', label: 'Survival', stats: ['Hazard Protection Battery', 'Life Support Tanks', 'Breathing Efficiency', 'Heat Resistance', 'Cold Resistance', 'Toxic Resistance', 'Radiation Resistance', 'Shield Strength'] },
  { id: 'movement', label: 'Movement', stats: ['Jetpack Tanks', 'Sprint Distance', 'Sprint Recovery Time'] },
  { id: 'utility', label: 'Utility', stats: ['Solar Panel Power', 'Recharge Time', 'Words Translated'] },
];

// What each money buff actually pays out, for the "what is this for" column.
export const statNotes = {
  'Fauna Analysis Rewards': 'Units for scanning creatures',
  'Flora Analysis Rewards': 'Units for scanning plants',
  'Mineral Analysis Rewards': 'Units for scanning rocks & minerals',
  'Resources Mined': 'Extra yield from the Mining Beam (Runaway Mould → Nanites)',
  'Mining Speed': 'Mine faster',
  'Recharge Time': 'Lower is better',
};

export const buffSlug = (stat) => stat.toLowerCase().replace(/[^a-z]+/g, '-');
export const statBySlug = (slug) => buffGroups.flatMap((g) => g.stats).find((s) => buffSlug(s) === slug) ?? null;

/** "+64% Resources Mined", "-39% Recharge Time", "+2 Words Translated" */
export const effectLabel = (e) => `${e.amount > 0 ? '+' : '−'}${Math.abs(e.amount).toLocaleString('en-GB')}${e.unit} ${e.stat}`;

/** Duration "m:ss" → seconds, for sorting. */
export const durSeconds = (d) => (d ? d.split(':').reduce((a, n) => a * 60 + Number(n), 0) : 0);

// Recipes in the Cooking page's format (list of slots, each slot a list of interchangeable ingredients).
const dishByName = new Map(dishes.map((d) => [d.name, d]));
export function recipesFor(e) {
  if (e.dish) return dishByName.get(e.dish)?.recipes ?? [];
  if (e.recipes) return e.recipes.map((r) => r.in);
  return [];
}

// Strongest first. For Recharge Time a bigger reduction is better, so compare absolute size.
export const strongest = (a, b) => Math.abs(b.amount) - Math.abs(a.amount) || durSeconds(b.dur) - durSeconds(a.dur);

export const effectsByStat = (stat) => ingestEffects.filter((e) => e.stat === stat).sort(strongest);
export const bestFor = (stat) => effectsByStat(stat)[0];

/** Ingestor effect for a food name (dish names in cooking.yaml can differ slightly, e.g. quotes). */
const byName = new Map();
for (const e of ingestEffects) {
  byName.set(e.name, e);
  if (e.dish) byName.set(e.dish, e);
}
export const effectFor = (name) => byName.get(name) ?? null;

export { ingestEffects };
