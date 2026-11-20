// Sidebar structure. Order here also drives the previous / next links at the bottom of each page.
export const navGroups = [
  {
    title: 'Trade & Money',
    pages: [
      { path: '/economies', title: 'Economies & Trade Goods', blurb: 'What each economy sells, who buys it, and how to read the Galactic Map.' },
      { path: '/settlements', title: 'Settlements', blurb: 'Production options by species and building, plus how to run a settlement.' },
      { path: '/money', title: 'Units & Nanites', blurb: 'The best ways to earn money and nanites at each stage.' },
    ],
  },
  {
    title: 'Materials',
    pages: [
      { path: '/resources', title: 'Resources', blurb: 'Every raw element, where to find it and what it is for.' },
      { path: '/refiner', title: 'Refiner Recipes', blurb: 'Search 350+ refiner recipes by input or output.' },
      { path: '/crafting', title: 'Crafting & Profit Chains', blurb: 'Key recipes and the high-value crafting chains, with raw totals.' },
    ],
  },
  {
    title: 'Building & Survival',
    pages: [
      { path: '/base', title: 'Base Building & Power', blurb: 'Generators, power planning, hotspots, extractors, farms and base specialists.' },
      { path: '/technology', title: 'Technology & Blueprints', blurb: 'Every installable tech: build cost, recharge and where to get the blueprint.' },
      { path: '/cooking', title: 'Cooking', blurb: '320+ Nutrient Processor recipes, searchable by dish or ingredient.' },
    ],
  },
  {
    title: 'Exploration',
    pages: [
      { path: '/stars', title: 'Stars & Biomes', blurb: 'Star colours and warp drives; what each biome offers.' },
      { path: '/companions', title: 'Companions & Holo-Arena', blurb: 'Battle stats explained, affinity chart, and a team optimiser for the Holo-Arena.' },
      { path: '/poi', title: 'Points of Interest', blurb: 'Every planet building and site: how to find it and what it gives.' },
      { path: '/poi-puzzles', title: 'POI Puzzles', blurb: 'Search answers for monoliths, facilities, observatories and towers.' },
      { path: '/portals', title: 'Portals & Glyphs', blurb: 'Glyph names and how portal addresses work.' },
    ],
  },
  {
    title: 'Ships & Gear',
    pages: [
      { path: '/starships', title: 'Starships', blurb: 'Ship types, class bonuses and where to find S-class.' },
      { path: '/exocraft', title: 'Exocraft', blurb: 'Every vehicle compared, plus how to unlock and summon them.' },
      { path: '/multitools', title: 'Multi-Tools', blurb: 'Every multi-tool type and what it is best at.' },
      { path: '/voltaic-staff', title: 'Voltaic Staff', blurb: 'Unlocking, parts and Void Mote prices, and how to hunt an S-class Autophage staff.' },
      { path: '/x-modules', title: 'X-Class Module Rolls', blurb: 'For every upgrade: X-class vs S-class roll ranges, and which X rolls are worth keeping.' },
      { path: '/frigates', title: 'Frigates & Expeditions', blurb: 'Fleet expeditions, rewards, a fuel calculator, frigate checker and trait lookup.' },
      { path: '/sentinels', title: 'Sentinels', blurb: 'Wanted levels and how to handle them.' },
    ],
  },
];

export const pages = navGroups.flatMap((g) => g.pages);
