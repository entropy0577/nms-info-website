// Base building & power. Source: No Man's Sky community wiki (Power, Base building, Hotspot and individual part pages), Nov 2026.

export const generators = [
  { name: 'Biofuel Reactor', output: '50 kPs', fuel: 'Carbon / Condensed Carbon / other organics', cost: [['Metal Plating', 1], ['Oxygen', 25]], blueprint: 'Construction Research (Space Anomaly)', notes: 'Fixed 50 kPs for up to 50 hours on a full tank (≈30 Carbon), whatever the demand. Good for tiny bases and teleport outposts.' },
  { name: 'Solar Panel', output: '50 kPs day · 25 kPs dawn/dusk · 0 night', fuel: 'None', cost: [['Metal Plating', 1], ['Chromatic Metal', 50], ['Gold', 30]], blueprint: '8 Salvaged Data (Construction Research)', notes: 'Works indoors, in caves and underwater. Near a pole it gives a steady 25 kPs all day and night.' },
  { name: 'Battery', output: 'Stores 45,000 kP · discharges up to 50 kPs', fuel: '—', cost: [['Magnetised Ferrite', 60], ['Condensed Carbon', 100]], blueprint: '3 Salvaged Data (Construction Research)', notes: 'Charges from spare power and runs the base when generators are off (e.g. solar at night).' },
  { name: 'Electromagnetic Generator', output: '150 / 220 / 250 / 300 kPs (C / B / A / S hotspot)', fuel: 'None', cost: [['Metal Plating', 2], ['Magnetised Ferrite', 60], ['Chromatic Metal', 75]], blueprint: '10 Salvaged Data (Construction Research)', notes: 'Must sit on an Electromagnetic Power Hotspot (find with the Survey Device). Unlimited generators per hotspot; output drops away from the centre — stack them.' },
];

export const consumption = [
  ['Mineral Extractor', 50], ['Gas Extractor', 50], ['Bio-Dome', 50], ['Appearance Modifier', 50],
  ['Large Hydroponic Tray', 20], ['Livestock Unit', 20], ['Automated Feeder', 20], ['Base Teleport Module', 20],
  ['Galactic Trade Terminal', 15], ['Health Station', 10], ['Hazard Protection Unit', 10], ['Cylindrical Room', 10], ['Square Room', 10],
  ['Hydroponic Tray', 5], ['Storage Container', 5], ['Cuboid Room', 5], ['Curved Cuboid Wall', 5],
  ['ByteBeat Device', 3], ['Lights, doors, corridors', 1],
];

export const powerRecipes = [
  { need: 'Up to 50 kPs (small base)', setup: '2 Solar Panels + 1 Battery — or 1 Biofuel Reactor if you visit often.' },
  { need: 'Every extra 50 kPs', setup: 'Add 2 more Solar Panels + 1 more Battery.' },
  { need: 'Big farm / extractor base', setup: 'Electromagnetic Generators on a power hotspot — no fuel, no batteries needed.' },
  { need: 'Freighter base', setup: 'Built-in 10,000 kPs from the bridge; power flows through connected rooms and corridors.' },
];

export const powerTips = [
  'Connect generators and machines with Electrical Wiring. Prefab rooms and corridors conduct power, so one wire into a building powers everything attached.',
  'If demand exceeds supply (and batteries are empty), the whole grid blacks out at once — not just the biggest consumers.',
  'Wires reach at most 200u; use any powered part as a "pole" to relay further.',
  'Save power with Proximity or Floor Switches on teleporters, health stations, trade terminals and storage — they only draw power while you\'re near.',
  'You can teleport TO an unpowered Base Teleport Module; it only needs power to teleport FROM it.',
];

export const hotspots = [
  { type: 'Electromagnetic Power', use: 'Electromagnetic Generators', yields: '150 / 220 / 250 / 300 kPs per generator (C / B / A / S)' },
  { type: 'Deep-Level Mineral Deposit', use: 'Mineral Extractor (50 kPs) + Supply Depots', yields: 'Up to 250 / 375 / 500 / 625 per cycle per extractor (C / B / A / S)' },
  { type: 'Concentrated Gas Cloud', use: 'Gas Extractor (50 kPs) + Supply Depots', yields: 'Up to 250 / 375 / 500 / 625 per cycle per extractor (C / B / A / S)' },
];

export const hotspotResources = [
  ['Star colour', 'Yellow: Copper · Red: Cadmium · Green: Emeril · Blue: Indium · Purple: Quartzite (plus Activated versions)'],
  ['Lush', 'Paraffinium, Nitrogen, Oxygen'], ['Barren', 'Pyrite, Sulphurine, Oxygen'], ['Frozen', 'Dioxite, Radon, Oxygen'],
  ['Toxic', 'Ammonia, Nitrogen, Oxygen'], ['Scorched', 'Phosphorus, Sulphurine, Oxygen'], ['Irradiated', 'Uranium, Radon, Oxygen'],
  ['Dead', 'Rusted Metal'], ['Volcanic', 'Pyrite, Basalt, Sulphurine'], ['Marsh', 'Mordite, Faecium'],
  ['Gas Giant', 'Crystallised Helium, Methane'], ['Waterworld', 'Lithium, Methane'],
];

export const productionParts = [
  { name: 'Mineral Extractor', cost: [['Metal Plating', 5], ['Chromatic Metal', 100]], power: 50, notes: 'On a mineral hotspot. Holds 250; add Supply Depots. Several extractors close together give diminishing returns.' },
  { name: 'Gas Extractor', cost: [['Metal Plating', 5], ['Chromatic Metal', 100]], power: 50, notes: 'On a gas hotspot. Holds 250; add Supply Depots.' },
  { name: 'Supply Depot', cost: [['Metal Plating', 10]], power: 0, notes: '+1,000 storage for connected extractors. Connect with Supply Pipes — can be far from the extractors.' },
  { name: 'Atmosphere Harvester', cost: [['Ammonia', 100], ['Metal Plating', 2], ['Hermetic Seal', 2]], power: 0, notes: 'Collects the biome gas (Nitrogen, Sulphurine or Radon). Portable; max 3 per planet. Blueprint from the Scientist missions.' },
  { name: 'Autonomous Mining Unit', cost: [['Uranium', 100], ['Metal Plating', 2], ['Ion Battery', 1]], power: 0, notes: 'Place on any resource deposit; no base or power needed. Mark it with a beacon — it has no compass marker.' },
  { name: 'Hydroponic Tray', cost: [['Pure Ferrite', 30], ['Metal Plating', 2], ['Carbon', 20]], power: 5, notes: 'One plant, indoors.' },
  { name: 'Large Hydroponic Tray', cost: [['Pure Ferrite', 60], ['Metal Plating', 4], ['Carbon', 50]], power: 20, notes: 'Four plants. Can go outdoors in suitable conditions.' },
  { name: 'Bio-Dome', cost: [['Magnetised Ferrite', 25], ['Glass', 5]], power: 50, notes: '16 plants; harvest them all from the ceiling panels.' },
  { name: 'Storage Container', cost: [['Magnetised Ferrite', 35], ['Sodium', 20]], power: 5, notes: 'Extra base storage; accessible from anywhere via the inventory screen.' },
];

export const specialists = [
  { role: 'Overseer (Construction)', terminal: 'Construction Terminal', unlocks: 'Agricultural, Science, Weapons and Exocraft terminals; Autonomous Mining Unit, Storage Container, Landing Pad, Galactic Trade Terminal, Cuboid Room, Save Beacon, decals.' },
  { role: 'Scientist', terminal: 'Science Terminal', unlocks: 'Atmosphere Harvester and other technology blueprints.' },
  { role: 'Farmer', terminal: 'Agricultural Terminal', unlocks: 'Planting blueprints for the farmable crops and the farming products (Living Glass, Circuit Board…).' },
  { role: 'Weapons Specialist', terminal: 'Weapons Terminal', unlocks: 'Multi-Tool weapon blueprints.' },
  { role: 'Exocraft Technician', terminal: 'Exocraft Terminal', unlocks: 'Exocraft geobays and exocraft tech.' },
];

export const baseFacts = [
  'Place a Base Computer anywhere to claim a base. The build area starts at 300u around it.',
  'Grow the area 50u at a time by placing structure or technology parts at the edge (not furniture or decals) — handy for reaching a nearby hotspot.',
  'You can\'t build within 300u of another player\'s uploaded base.',
  'Up to 400 planetary bases per save. Bases of 3,000 parts or fewer can be uploaded for others to see (one per planet shows to other players).',
  'Deleting a base puts a share of its materials into a Base Salvage Capsule for recovery.',
  'Base specialists are recruited from space stations after you build their terminal; their missions unlock most farming and tech blueprints.',
];
