// Ways to earn Units and Nanites. Source: Fandom wiki "Units", "Nanite Cluster", "Nutrient Ingestor",
// "Suspicious Module" and "Suspicious Packet" pages, plus community farming guides, Nov 2026.

export const unitMethods = [
  { name: 'Scanning with food buffs', stage: 'Mid–late', how: 'Feed baked goods into a Nutrient Ingestor for +4,000–6,500% Flora, Fauna or Mineral Analysis Rewards, then scan with the Analysis Visor. With scanner upgrades, one new animal can pay millions. See Food buffs below.', link: '/money?food-buffs' },
  { name: 'Settlements', stage: 'Mid–late', how: 'Clear the debt, upgrade Warehouses to S-class, then produce Quantum Processors (Korvax) or Portable Reactors (Vy\'keen). See Settlements.', link: '/settlements' },
  { name: 'Crafting chains', stage: 'Mid–late', how: 'Farm plants or harvest gases at a base, then craft up the chain. Fusion Ignitors and Stasis Devices sell for 15.6M each.', link: '/crafting' },
  { name: 'Trade routes & surges', stage: 'Mid', how: 'Buy trade goods cheaply in a strong economy (low buy %), sell in the economy that wants them (high sell %). Use the Economy Scanner to find trade surges, which pay extra for scarce goods for a limited time.', link: '/economies?surges' },
  { name: 'Frigate expeditions', stage: 'Mid–late', how: 'Send Trade/Exploration frigates on expeditions; collect units and goods when they return.', link: '/frigates' },
  { name: 'Mining Activated Indium', stage: 'Early', how: 'Find an extreme-weather blue-star planet and mine Activated Indium deposits; sell or refine to Chromatic Metal.', link: '/stars' },
  { name: 'Mineral Extractors on hotspots', stage: 'Early–mid', how: 'Use the Survey Device to find mineral hotspots, build a base with extractors and storage. Silver and Gold sell best.', link: null },
  { name: 'Storm Crystals', stage: 'Early', how: 'Appear during storms on extreme-weather planets. High base value.', link: null },
  { name: 'Hunting & scanning', stage: 'Early', how: 'Sell Meaty Chunks and other drops; scan new flora/fauna for units.', link: null },
  { name: 'Selling salvage', stage: 'Any', how: 'Artifacts, crashed-freighter loot and canister goods all sell at Trade Terminals. Planetary Trade Outposts pay better than space stations.', link: null },
];

export const naniteMethods = [
  { name: 'Scrapping starships', rate: 'Very high (~30,000/h)', how: 'Buy cheap ships at a station in a wealthy system, scrap them, sell the upgrade modules to Tech Merchants for Nanites. Needs plenty of units.' },
  { name: 'Runaway Mould + Stellarator', rate: 'Very high', how: 'Mine Curious Deposits for Runaway Mould and refine 5 Mould → 1 Nanite. Feed The Stellarator (+64% Resources Mined) into a Nutrient Ingestor first to multiply the yield. See the Stellarator section above.' },
  { name: 'Sentinel farming', rate: 'High', how: 'Hold Wanted level 3 with two summoner drones alive; loot Combat Supplies. In space, shoot Interceptors for Hyaline Brains.' },
  { name: 'Salvaged Data', rate: '~1,000/h', how: 'Dig up Buried Technology (Analysis Visor). Refine 1 Salvaged Data → 15 Nanites.' },
  { name: 'Cooking for Cronus', rate: 'High', how: 'Present cooked dishes to Iteration: Cronus on the Space Anomaly. High-grade dishes pay 50–320 Nanites each.' },
  { name: 'Chewy Wires farming', rate: '~9,000 per 20 min', how: 'Base with Livestock Unit + Automated Feeder near synthetic creatures. Consume Chewy Wires for Nanites.' },
  { name: 'Discoveries', rate: 'Steady', how: 'Upload every discovery. Finding all fauna on a planet pays a large bonus (avg ~2,000).' },
  { name: 'X-class module flipping', rate: 'Very high (limited by units)', how: 'Buy Suspicious Packets (Tech/Arms) with units in pirate or Outlaw systems, open them, and sell the X-class (Suspicious) modules to a Technology Merchant for Nanites. Pairs well with food-buffed scanning for the units. See X-class flipping below.' },
  { name: 'Upgrade modules', rate: 'Steady', how: 'Sell unneeded upgrade modules to Technology Merchants. Uninstalled modules sell; installed ones are lost when removed.' },
  { name: 'Releasing fish', rate: 'Low', how: 'Release caught fish from your inventory while standing in water.' },
  { name: 'Refining Platinum', rate: 'Low', how: '35 Platinum → 1 Nanite, or 25 Platinum + 15 Gold + 15 Silver → 1 Nanite.' },
];

// Converting units into nanites with X-class (Suspicious) modules.
// Packet prices from the wiki's Suspicious Packet pages; sell prices vary by module and update, so they are given as a range.
export const packets = [
  { name: 'Suspicious Packet (Tech)', where: 'Pirate-controlled systems (~74,000 units) or the Scrap Dealer (~320 Tainted Metal)', gives: 'Exosuit, Multi-Tool scanner/mining and starship modules' },
  { name: 'Suspicious Packet (Arms)', where: 'Outlaw systems (~130,000 units), Scrap Dealer (~300 Tainted Metal), or loot from pirates', gives: 'Weapon modules, occasionally a Lost Artifact' },
];
