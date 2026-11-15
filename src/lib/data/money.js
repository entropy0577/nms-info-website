// Ways to earn Units and Nanites. Source: Fandom wiki "Units" and "Nanite Cluster" pages, Nov 2026.

export const unitMethods = [
  { name: 'Settlements', stage: 'Mid–late', how: 'Clear the debt, upgrade Warehouses to S-class, then produce Quantum Processors (Korvax) or Portable Reactors (Vy\'keen). See Settlements.', link: '/settlements' },
  { name: 'Crafting chains', stage: 'Mid–late', how: 'Farm plants or harvest gases at a base, then craft up the chain. Fusion Ignitors and Stasis Devices sell for 15.6M each.', link: '/crafting' },
  { name: 'Trade routes', stage: 'Mid', how: 'Buy trade goods cheaply in a strong economy (low buy %), sell in the economy that wants them (high sell %).', link: '/economies' },
  { name: 'Frigate expeditions', stage: 'Mid–late', how: 'Send Trade/Exploration frigates on expeditions; collect units and goods when they return.', link: '/frigates' },
  { name: 'Mining Activated Indium', stage: 'Early', how: 'Find an extreme-weather blue-star planet and mine Activated Indium deposits; sell or refine to Chromatic Metal.', link: '/stars' },
  { name: 'Mineral Extractors on hotspots', stage: 'Early–mid', how: 'Use the Survey Device to find mineral hotspots, build a base with extractors and storage. Silver and Gold sell best.', link: null },
  { name: 'Storm Crystals', stage: 'Early', how: 'Appear during storms on extreme-weather planets. High base value.', link: null },
  { name: 'Hunting & scanning', stage: 'Early', how: 'Sell Meaty Chunks and other drops; scan new flora/fauna for units.', link: null },
  { name: 'Selling salvage', stage: 'Any', how: 'Artifacts, crashed-freighter loot and canister goods all sell at Trade Terminals. Planetary Trade Outposts pay better than space stations.', link: null },
];

export const naniteMethods = [
  { name: 'Scrapping starships', rate: 'Very high (~30,000/h)', how: 'Buy cheap ships at a station in a wealthy system, scrap them, sell the upgrade modules to Tech Merchants for Nanites. Needs plenty of units.' },
  { name: 'Runaway Mould deposits', rate: 'Very high', how: 'Find a Curious Deposit of Runaway Mould, mine it, and refine 5 Runaway Mould → 1 Nanite.' },
  { name: 'Sentinel farming', rate: 'High', how: 'Hold Wanted level 3 with two summoner drones alive; loot Combat Supplies. In space, shoot Interceptors for Hyaline Brains.' },
  { name: 'Salvaged Data', rate: '~1,000/h', how: 'Dig up Buried Technology (Analysis Visor). Refine 1 Salvaged Data → 15 Nanites.' },
  { name: 'Cooking for Cronus', rate: 'High', how: 'Present cooked dishes to Iteration: Cronus on the Space Anomaly. High-grade dishes pay 50–320 Nanites each.' },
  { name: 'Chewy Wires farming', rate: '~9,000 per 20 min', how: 'Base with Livestock Unit + Automated Feeder near synthetic creatures. Consume Chewy Wires for Nanites.' },
  { name: 'Discoveries', rate: 'Steady', how: 'Upload every discovery. Finding all fauna on a planet pays a large bonus (avg ~2,000).' },
  { name: 'Upgrade modules', rate: 'Steady', how: 'Sell unneeded upgrade modules to Technology Merchants.' },
  { name: 'Releasing fish', rate: 'Low', how: 'Release caught fish from your inventory while standing in water.' },
  { name: 'Refining Platinum', rate: 'Low', how: '35 Platinum → 1 Nanite, or 25 Platinum + 15 Gold + 15 Silver → 1 Nanite.' },
];
