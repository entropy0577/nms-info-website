// Starships, multi-tools, frigates, sentinels. Source: Fandom wiki pages of the same names, Nov 2026.

export const shipClasses = [
  { cls: 'C', bonus: 'Up to 20%', slots: 'Fewest slots' },
  { cls: 'B', bonus: '20%+', slots: 'Near the top of the size tier' },
  { cls: 'A', bonus: '35%+', slots: 'Max or one below max' },
  { cls: 'S', bonus: '50%+', slots: 'Not always max; can expand to 60 tech slots' },
];

export const shipSpawnByEconomy = [
  { economy: 'Weak (★)', C: '60%', B: '30%', A: '10%', S: '0%' },
  { economy: 'Average (★★)', C: '49%', B: '35%', A: '15%', S: '1%' },
  { economy: 'Strong (★★★)', C: '30%', B: '40%', A: '28%', S: '2%' },
  { economy: 'Outlaw (☠)', C: '85%', B: '5%', A: '5%', S: '5%' },
];

export const shipTypes = [
  { name: 'Shuttle', strength: 'Balanced, cheap', bonus: 'Low, balanced', launch: '16.7%', handling: 'Medium', notes: 'No large size tier. Good, cheap starter ship.' },
  { name: 'Fighter', strength: 'Combat', bonus: 'Damage', launch: '25%', handling: 'Very high', notes: 'Pirate favourite; great in dogfights.' },
  { name: 'Explorer', strength: 'Travel', bonus: 'Hyperdrive range', launch: '12.5%', handling: 'High', notes: 'Longest warp range, cheapest launches.' },
  { name: 'Hauler', strength: 'Cargo & toughness', bonus: 'Shields', launch: '25%', handling: 'Low', notes: 'Largest cargo inventories.' },
  { name: 'Exotic', strength: 'All-rounder', bonus: 'High, balanced', launch: '25%', handling: 'High', notes: 'Always S-class. One design per system, any economy.' },
  { name: 'Solar', strength: 'Pulse speed', bonus: 'Damage (lower shield/warp)', launch: '25%', handling: 'High', notes: 'Vesper Sail boosts pulse and recharges launch thrusters. Common in outlaw systems.' },
  { name: 'Living Ship', strength: 'Bio-tech', bonus: 'Damage & warp', launch: '25%', handling: 'Low', notes: 'From a Void Egg quest; later ones cost 10,000 Nanites. Upgrades come from space encounters.' },
  { name: 'Interceptor (Salvaged)', strength: 'Sentinel tech', bonus: 'High DPS', launch: '12.5%', handling: 'Medium', notes: 'Rebuilt Sentinel ships. Can hover. Anti-Gravity Well & Crimson Core.' },
  { name: 'Corvette', strength: 'Custom-built', bonus: '—', launch: '25%', handling: '—', notes: 'Build at a Corvette Workshop on any station. Walk inside; beam to the surface.' },
];

export const multiToolTypes = [
  { name: 'Pistol', role: 'Gathering', notes: 'High mining speed and scan range, weak combat. The starter type.' },
  { name: 'Rifle', role: 'Combat', notes: 'Good damage, weakest mining and scanning. Easy to find.' },
  { name: 'Experimental', role: 'Scanning', notes: 'Rare. Highest scan range; better than a Pistol all round.' },
  { name: 'Alien', role: 'Combat + scanning', notes: 'Rare. High damage and scan bonuses.' },
  { name: 'Royal (Exotic)', role: 'Scanning', notes: 'Only from Sentinel Pillars. Same stats as Experimental.' },
  { name: 'Sentinel', role: 'Combat', notes: 'Highest damage bonus. Free (damaged) from Harmonic Camps. Comes with the Hijacked Laser.' },
  { name: 'Atlantid', role: 'Gathering', notes: 'Highest mining speed, decent damage; mining beam rarely overheats.' },
  { name: 'Voltaic Staff', role: 'Combat', notes: 'Built at the Autophage Synthesis Terminal ("They Who Returned"). Customisable look.' },
];

export const sentinelLevels = [
  { level: 1, ground: '2 heavy drones, 1 repair, 1 summoner', space: '1 Sentinel starship' },
  { level: 2, ground: '2 heavy drones, 2 repair, 1 summoner', space: '2 Sentinel starships' },
  { level: 3, ground: '3 heavy drones, 2 repair, 2 summoners, 1 Quad', space: 'More interceptors' },
  { level: 4, ground: '2 heavy drones, 3 repair, 2 summoners, 1 Mech', space: 'More interceptors' },
  { level: 5, ground: '2 heavy drones, 4 repair, 3 summoners, 1 Mech, 1 Walker', space: 'Up to 16 interceptors' },
];

export const sentinelTips = [
  'Mining heavily, harming fauna, or damaging Sentinels raises your Wanted level. Aggressive Sentinel planets attack on sight.',
  'Break line of sight and wait out the "Sentinels Searching" timer to escape. Leaving the planet early can carry a Level 1 into space.',
  'Clearing Level 5 calms that planet\'s Sentinels for a while.',
  'Drones drop Pugneum and Combat Supplies (Nanites, Salvaged Glass). Interceptors can drop Hyaline Brains (230 Nanites when refined).',
];

// Exocraft. Source: Fandom wiki "Exocraft" page, Nov 2026. Speeds in u/s: base → fully upgraded → boosting with supercharged engine.
export const exocraft = [
  { name: 'Pilgrim', kind: 'Motorbike', tech: 26, cargo: 30, speed: '18.8 → 34.5 → 55', bestFor: 'Fastest on land; climbs hills well', notes: 'Hard to control on rough ground. Best pick on dry planets.' },
  { name: 'Nomad', kind: 'Hovercraft', tech: 26, cargo: 30, speed: '17.7 → 33.7 → 44.6', bestFor: 'Fast travel that also crosses water', notes: 'Best pick on watery planets. Careful: its cannon can hit you at close range.' },
  { name: 'Roamer', kind: 'Buggy', tech: 28, cargo: 40, speed: '16.0 → 30 → 40', bestFor: 'First, general-purpose vehicle', notes: 'Heavy; slows going uphill. No standout strengths.' },
  { name: 'Colossus', kind: 'Eight-wheel hauler', tech: 30, cargo: 50, speed: '11.9 → 22.8 → 40', bestFor: 'Mining and mobile storage', notes: 'Biggest inventory. Mining laser pre-installed; can fit a Mineral Processing Rig (mobile refiner). Flatbed/Furnace chassis for industrial waste.' },
  { name: 'Nautilon', kind: 'Submarine', tech: 28, cargo: 40, speed: '17.0 → 29.2 → 46.8', bestFor: 'Underwater exploration', notes: 'Water only. Needs the Humboldt Drive (Space Anomaly). Runs on Hydrothermal Fuel Cells (Salt, Cyto-Phosphate, Carbon). Its sonar is the only radar that finds underwater sites.' },
  { name: 'Minotaur', kind: 'Mech', tech: 28, cargo: 40, speed: 'Walk 2–4, fly 21–31.5', bestFor: 'Combat, rough terrain, hazards', notes: 'Short jet flights. Protects against all four hazards. AI Pilot lets it fight alongside you on foot. Can collect Storm Crystals without getting out.' },
];

export const exocraftTips = [
  'Unlock geobay blueprints with Salvaged Data at the Space Anomaly or an Exocraft Terminal, then build the geobay at a base to summon the vehicle.',
  'Missions "Exocraft Technician", "Dreams of the Deep" and "A Trace of Metal" give most geobays for free; "A Trace of Metal" has Minotaur gear you can\'t get elsewhere.',
  'To summon anywhere: the Exocraft Summoning Station (same system), the Orbital Exocraft Materialiser (freighter in system), or the Exocraft Summoning Unit exosuit tech (anywhere in the galaxy; needs purple-system materials).',
  'Land exocraft run on Carbon, Oxygen and other organic elements. They take no fall damage and smash through flora — but smashing gives no resources.',
  'Fit the Exocraft Mining Laser (upgradeable to advanced) for very fast mining; resources go straight into the vehicle\'s inventory.',
  'Exocraft Radar finds points of interest. Hazard protection modules are needed on most vehicles, except the Minotaur.',
  'Supercharged slots work immediately, so exocraft can be fully upgraded quickly once you have modules.',
  'Your exocraft and exosuit share health — if the vehicle is destroyed, you die.',
];
