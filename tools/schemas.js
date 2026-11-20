// Schemas for every data file in src/lib/data/. The build fails if a file has no entry here, if a top-level key or a
// record field is missing or unknown, or if a value has the wrong type. `check` adds rules that need more than one
// field (ids that must exist elsewhere in the same file, names that must be unique…).
// Item names that point at other files (recipe ingredients, costs, rewards…) are checked by items-check.js.
//
// Building blocks (see schema.js): text = non-empty string, str = any string (may be ""), count = whole number ≥ 0,
// num = any number, bool, oneOf(...values), nullable(x), optional(x) = the field may be left out, list(x),
// tuple(a, b), obj({...}) = exactly these fields, record(x) = free-form keys, cost = [[item, amount], ...].
import { str, text, num, count, bool, oneOf, nullable, optional, list, tuple, obj, record, cost } from './schema.js';

const CLASSES = ['S', 'A', 'B', 'C'];
const SPECIES = ['Gek', 'Korvax', "Vy'keen"];

/** Error helpers for `check` functions: err(path, message). */
function unique(rows, field, path, err) {
  const seen = new Set();
  rows.forEach((r, i) => {
    if (seen.has(r[field])) err([...path, i, field], `duplicate ${field} "${r[field]}"`);
    seen.add(r[field]);
  });
}
function within(value, allowed, path, err, what) {
  if (!allowed.includes(value)) err(path, `"${value}" is not ${what} (${allowed.join(', ')})`);
}

export const schemas = {
  'base.yaml': {
    schema: {
      generators: list(obj({ name: text, output: text, fuel: text, cost, blueprint: text, notes: text })),
      consumption: list(tuple(text, count)), // [part, kPs]
      powerRecipes: list(obj({ need: text, setup: text })),
      powerTips: list(text),
      hotspots: list(obj({ type: text, use: text, yields: text })),
      hotspotResources: list(tuple(text, text)), // [planet type, resources]
      productionParts: list(obj({ name: text, cost, power: count, notes: text })),
      specialists: list(obj({ role: text, terminal: text, unlocks: text })),
      baseFacts: list(text),
    },
  },

  'companions.yaml': {
    schema: {
      affinities: list(text, { min: 1 }),
      affinityInfo: record(obj({ colour: text, biome: text, plant: text })),
      chart: record(obj({ atkStrong: text, atkWeak: text, defStrong: text, defWeak: text })),
      stats: list(obj({ name: text, what: text, priority: count })),
      classMeaning: list(obj({ cls: oneOf(...CLASSES), text })),
      temperaments: list(obj({ name: text, battle: text, confirmed: bool })),
      abilityKinds: list(text),
      arenaFacts: list(text),
      mutagens: list(obj({
        item: text,
        pair: oneOf('Aggression/Gentleness', 'Independence/Devotion', 'Playfulness/Helpfulness'),
        outcome: oneOf('Gentleness', 'Aggression', 'Independence', 'Devotion', 'Playfulness', 'Helpfulness'),
        pct: num,
        full: str, // "" when no full-dose count is known
      })),
    },
    check(d, err) {
      for (const key of ['affinityInfo', 'chart']) {
        for (const a of d.affinities) if (!(a in d[key])) err([key], `missing affinity "${a}"`);
        for (const a of Object.keys(d[key])) within(a, d.affinities, [key, a], err, 'one of the affinities');
      }
      for (const [a, row] of Object.entries(d.chart)) {
        for (const [k, v] of Object.entries(row)) within(v, d.affinities, ['chart', a, k], err, 'one of the affinities');
      }
      d.mutagens.forEach((m, i) => {
        if (!m.pair.split('/').includes(m.outcome)) err(['mutagens', i, 'outcome'], `"${m.outcome}" is not part of the pair "${m.pair}"`);
      });
    },
  },

  'cooking.yaml': {
    schema: {
      dishes: list(obj({
        name: text,
        value: count,
        bonus: str, // "" when the dish gives no listed bonus
        process: text,
        cat: text,
        recipes: list(list(list(text, { min: 1 }), { min: 1 }), { min: 1 }), // recipes → slots → interchangeable ingredients
      })),
      rawIngredients: list(obj({
        name: text,
        how: text,
        bonus: text,
        source: oneOf('Feed Fauna', 'Kill Fauna', 'Plants'),
        value: nullable(count),
      })),
    },
    check(d, err) {
      unique(d.dishes, 'name', ['dishes'], err);
      unique(d.rawIngredients, 'name', ['rawIngredients'], err);
    },
  },

  'crafting.yaml': {
    schema: {
      crafted: list(obj({ name: text, value: count, group: text, in: cost })),
      craftGroups: list(text, { min: 1 }),
    },
    check(d, err) {
      unique(d.crafted, 'name', ['crafted'], err);
      d.crafted.forEach((c, i) => within(c.group, d.craftGroups, ['crafted', i, 'group'], err, 'listed in craftGroups'));
    },
  },

  'economy.yaml': {
    schema: {
      economies: list(obj({
        id: text,
        name: text,
        colour: text,
        mapColour: text,
        route: oneOf('A', 'B'),
        aliases: list(text, { min: 1 }),
        category: text,
        sellsTo: text,
        goods: list(text),
      })),
      tierValues: list(count),
      tierStrength: list(obj({ min: oneOf(1, 2, 3), sometimes: nullable(oneOf(1, 2, 3)) })),
      tradeGoodAliases: record(list(text, { min: 1 })),
      strengths: list(obj({ level: text, stars: oneOf(1, 2, 3), names: list(text), note: text })),
      smuggledGoods: list(text),
    },
    check(d, err) {
      unique(d.economies, 'id', ['economies'], err);
      const ids = d.economies.map((e) => e.id);
      d.economies.forEach((e, i) => {
        within(e.sellsTo, ids, ['economies', i, 'sellsTo'], err, 'an economy id');
        if (e.goods.length !== d.tierValues.length) err(['economies', i, 'goods'], `expected ${d.tierValues.length} goods (one per tier), got ${e.goods.length}`);
      });
      if (d.tierStrength.length !== d.tierValues.length) err(['tierStrength'], `expected ${d.tierValues.length} rows (one per tier)`);
    },
  },

  'expedition-rewards.yaml': {
    schema: {
      // expedition type → normal/small pools → pool → rewards
      expeditionRewards: record(obj({
        normal: list(list(obj({ item: text, chance: count, min: nullable(count), max: nullable(count) }))),
        small: list(list(obj({ item: text, chance: count, min: nullable(count), max: nullable(count) }))),
      })),
    },
  },

  'expeditions.yaml': {
    schema: {
      frigateTypes: list(obj({ type: text, bonus: text, passive: text, classes: list(text) })),
      expeditionTypes: list(obj({ type: text, rewards: text })),
      boosters: list(obj({ name: text, effect: text, cost })),
      fuelItems: list(obj({ name: text, tonnes: count, cost })),
      rankUps: list(count),
      repairs: list(tuple(text, text)), // [damaged part, repair cost]
      expeditionFacts: list(text),
      safety: list(obj({ rating: text, result: text })),
      damageFacts: list(text),
      organicFacts: list(text),
      buyingTips: list(text),
      traits: list(obj({ trait: text, value: str, group: text, good: bool })),
    },
  },

  'explore.yaml': {
    schema: {
      starColours: list(obj({
        colour: text, swatch: text, classes: text, drive: text, driveNeeds: text, metal: text, activated: text, notes: text,
      })),
      biomes: list(obj({ name: text, hazard: text, plant: text, mineral: text, gas: text, protection: text, notes: text })),
      glyphs: list(obj({ hex: text, name: text, title: str })),
    },
  },

  'gear.yaml': {
    schema: {
      shipClasses: list(obj({ cls: oneOf(...CLASSES), bonus: text, slots: text })),
      shipSpawnByEconomy: list(obj({ economy: text, C: text, B: text, A: text, S: text })),
      shipTypes: list(obj({ name: text, strength: text, bonus: text, launch: text, handling: text, notes: text })),
      multiToolTypes: list(obj({ name: text, role: text, notes: text })),
      sentinelLevels: list(obj({ level: count, ground: text, space: text })),
      sentinelTips: list(text),
      exocraft: list(obj({ name: text, kind: text, tech: count, cargo: count, speed: text, bestFor: text, notes: text })),
      exocraftTips: list(text),
    },
  },

  'ingest.yaml': {
    schema: {
      ingestEffects: list(obj({
        name: text,
        stat: text,
        amount: num,
        unit: oneOf('%', ''),
        dur: text, // m:ss
        dish: optional(text), // name of the recipe in cooking.yaml…
        src: optional(oneOf('fish', 'raw', 'cooked', 'other')), // …or where it comes from
        fish: optional(obj({ cls: oneOf(...CLASSES), biome: text, when: oneOf('Any', 'Day', 'Night', 'Storm') })),
        recipes: optional(list(obj({ in: list(list(text, { min: 1 }), { min: 1 }), process: text }))),
      })),
    },
    check(d, err) {
      d.ingestEffects.forEach((e, i) => {
        if (!/^\d+:[0-5]\d$/.test(e.dur)) err(['ingestEffects', i, 'dur'], `expected minutes:seconds like "7:30", got "${e.dur}"`);
        if (!e.dish === !e.src) err(['ingestEffects', i], 'needs exactly one of "dish" or "src"');
        if (e.fish && e.src !== 'fish') err(['ingestEffects', i, 'fish'], 'catch info is only for src: fish');
      });
    },
  },

  'items.yaml': {
    schema: {
      otherItems: list(text),
      itemAliases: record(list(text, { min: 1 })),
      placeholders: list(text),
    },
    check(d, err) {
      d.otherItems.forEach((n, i) => {
        if (d.otherItems.indexOf(n) !== i) err(['otherItems', i], `duplicate item "${n}"`);
      });
    },
  },

  'money.yaml': {
    schema: {
      unitMethods: list(obj({ name: text, stage: text, how: text, link: nullable(text) })),
      naniteMethods: list(obj({ name: text, rate: text, how: text })),
      packets: list(obj({ name: text, where: text, gives: text })),
    },
  },

  'monoliths.yaml': {
    schema: {
      monoliths: list(obj({
        race: oneOf(...SPECIES, 'Any'),
        text,
        options: list(obj({ opt: text, result: str, best: bool }), { min: 1 }),
        incomplete: optional(bool),
      })),
      monolithTips: list(text),
    },
  },

  'poi.yaml': {
    schema: {
      poiGroups: list(text, { min: 1 }),
      pois: list(obj({
        name: text,
        group: text,
        // id of the section on the POI Puzzles page
        puzzle: nullable(oneOf('monoliths', 'plaques', 'secure', 'observatory', 'tower', 'harmonic')),
        puzzleType: optional(text),
        find: text,
        inside: text,
        rewards: text,
        link: optional(text),
      })),
      plaqueChoice: list(obj({ opt: text, result: text })),
      harmonicSteps: list(text),
      terminalInteractions: list(obj({ text, options: list(obj({ opt: text, best: optional(bool) }), { min: 1 }) })),
    },
    check(d, err) {
      unique(d.pois, 'name', ['pois'], err);
      d.pois.forEach((p, i) => within(p.group, d.poiGroups, ['pois', i, 'group'], err, 'listed in poiGroups'));
    },
  },

  'puzzles-generated.yaml': {
    schema: {
      securePuzzles: list(obj({
        id: text,
        site: oneOf('Final reward screen', 'Manufacturing Facility', 'Operations Centre'),
        race: oneOf(...SPECIES, 'Any'),
        hot: bool,
        text,
        options: list(obj({
          opt: text,
          mood: oneOf('positive', 'negative', 'neutral', 'sad'),
          rewards: list(text),
          then: str, // "" or the puzzle/screen that follows
        }), { min: 1 }),
      })),
      codePuzzles: list(obj({
        site: oneOf('Observatory', 'Transmission Tower'),
        race: nullable(oneOf(...SPECIES)),
        sequence: text,
        options: list(text, { min: 2 }),
        answer: text,
        text: str,
        rule: text,
      })),
    },
    check(d, err) {
      unique(d.securePuzzles, 'id', ['securePuzzles'], err);
      d.codePuzzles.forEach((p, i) => {
        if (!p.options.includes(p.answer)) err(['codePuzzles', i, 'answer'], `answer "${p.answer}" is not one of the options`);
      });
    },
  },

  'refiner.yaml': {
    schema: {
      refinerRecipes: list(obj({ out: text, qty: count, in: list(tuple(text, count), { min: 1 }), name: text })),
    },
    check(d, err) {
      d.refinerRecipes.forEach((r, i) => {
        if (r.in.length > 3) err(['refinerRecipes', i, 'in'], `a refiner takes at most 3 inputs, got ${r.in.length}`);
      });
    },
  },

  'resources.yaml': {
    schema: {
      resources: list(obj({ name: text, sym: text, group: text, value: num, found: text, use: text })),
    },
    check(d, err) {
      unique(d.resources, 'name', ['resources'], err);
    },
  },

  'settlements.yaml': {
    schema: {
      species: list(text, { min: 1 }),
      categories: list(obj({ id: text, name: text, building: text, note: str })),
      production: record(list(obj({
        cat: text,
        cls: oneOf('-', ...CLASSES),
        item: text,
        qty: count,
        value: nullable(count),
        gpt: optional(count),
      }))),
      claimCost: record(text),
      buildings: list(obj({ name: text, role: text, effect: text })),
      officeSteps: list(text),
      settlementTips: list(text),
    },
    check(d, err) {
      const cats = d.categories.map((c) => c.id);
      for (const key of ['production', 'claimCost']) {
        for (const sp of Object.keys(d[key])) within(sp, d.species, [key, sp], err, 'listed in species');
      }
      for (const [sp, rows] of Object.entries(d.production)) {
        rows.forEach((r, i) => within(r.cat, cats, ['production', sp, i, 'cat'], err, 'a category id'));
      }
    },
  },

  'tech.yaml': {
    schema: {
      technology: list(obj({
        name: text,
        device: oneOf('Exosuit', 'Multi-Tool', 'Starship', 'Exocraft', 'Freighter'),
        group: str,
        upgradeOf: nullable(text),
        desc: str,
        cost,
        recharge: str,
        source: text,
        guess: bool,
      })),
    },
    check(d, err) {
      const names = d.technology.map((t) => t.name);
      d.technology.forEach((t, i) => {
        if (t.upgradeOf) within(t.upgradeOf, names, ['technology', i, 'upgradeOf'], err, 'a technology in this file');
      });
    },
  },

  'voltaic.yaml': {
    schema: {
      staffStats: list(obj({
        cls: oneOf(...CLASSES), damage: tuple(count, count), mining: tuple(count, count), scan: tuple(count, count),
      })),
      staffSets: list(obj({
        set: text,
        note: optional(text),
        parts: list(obj({ name: text, slot: oneOf('Head', 'Core', 'Pole'), price: nullable(count) }), { min: 1 }),
      })),
      staffFacts: list(text),
      unlockSteps: list(obj({ step: text, detail: text, link: optional(text) })),
      staffMechanics: list(obj({ title: text, text })),
      secondarySteps: list(text),
      huntSteps: list(text),
      voidMoteSources: list(obj({ source: text, amount: text })),
      unconfirmed: text,
    },
  },

  'xmodules.yaml': {
    schema: {
      xFamilies: list(obj({
        name: text,
        device: oneOf('Starship', 'Multi-Tool', 'Exosuit'),
        packet: nullable(oneOf('Tech', 'Arms')),
        drawn: obj({ s: text, x: text }), // how many stats are rolled, S vs X
        stats: list(obj({
          stat: text,
          unit: optional(str), // shown after the number; % when left out
          s: optional(tuple(num, num)), // [min, max]; left out when there is no S-class version
          x: tuple(num, num),
          key: optional(bool),
          dir: optional(oneOf('less')),
        }), { min: 1 }),
        note: optional(text),
        xOnly: optional(bool),
      })),
      xNoVersion: list(text),
      xSources: list(text),
      xRollTips: list(text),
    },
    check(d, err) {
      d.xFamilies.forEach((f, i) => f.stats.forEach((s, j) => {
        for (const k of ['s', 'x']) if (s[k] && s[k][0] > s[k][1]) err(['xFamilies', i, 'stats', j, k], `min ${s[k][0]} is above max ${s[k][1]}`);
      }));
    },
  },
};
