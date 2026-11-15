// Frigates & fleet expeditions. Source: No Man's Sky community wiki (Frigate, Frigate Expedition, Fleet Command Room,
// consumable item pages), Nov 2026. Expedition loot table from game files (v3.75) via the wiki.

export const frigateTypes = [
  { type: 'Combat', bonus: '+15 Combat', passive: 'Warps in to help you in space fights (highest-Combat frigate in the system).', classes: ['Interstellar Frigate', 'Interstellar Corvette', 'Interstellar Battleship', 'Interstellar Dreadnought'] },
  { type: 'Exploration', bonus: '+15 Exploration', passive: 'Artifact scanner: marks an Ancient Ruin in the current system.', classes: ['Science Vessel', 'Expeditionary Cruiser', 'Deep Space Surveyor', 'Data Harvesting Platform'] },
  { type: 'Industrial', bonus: '+15 Industry', passive: 'Makes 2 Magnetised Ferrite every 30 s (max 100) — board it to collect.', classes: ['Mining Vessel', 'Industrial Hauler', 'Industrial Galleon', 'Orbital Factory Platform'] },
  { type: 'Trade', bonus: '+15 Trading', passive: 'Makes 1,000 units every 30 s (max 125,000) — board it to collect.', classes: ['Merchant Vessel', 'Trade Clipper', 'Merchant Cruiser', 'Trade Galleon'] },
  { type: 'Support', bonus: '−15 expedition fuel', passive: 'Makes 2 Condensed Carbon every 30 s (max 100). Uses very little fuel.', classes: ['Supply Vessel', 'Fuel Bulker', 'Mobile Supply Platform', 'Advanced Outfitting Platform'] },
];

export const expeditionTypes = [
  { type: 'Combat', rewards: 'Units, Magnetised Ferrite, Chromatic Metal, Indium, Geodesite, Iridesite.' },
  { type: 'Exploration', rewards: 'Units, nanites, Antimatter, race curiosities (Relic, Casing, Effigy), Vortex Cubes, Gravitino Balls, Albumen Pearls, artifacts.' },
  { type: 'Industrial', rewards: 'Units, Activated stellar metals, alloys and gas products (Hot Ice, Semiconductor…), trade commodities, Lost Artifacts, Storage Augmentations, Salvaged Frigate Modules.' },
  { type: 'Trade', rewards: 'Units, GekNip, Convergence Cubes and other curiosities, Cryo-Pumps, Superconductors, Fusion Accelerants, Storage Augmentations.' },
  { type: 'Balanced', rewards: 'A mix of all the above — a mixed fleet suits these.' },
];

export const boosters = [
  { name: 'Explosive Drones', effect: '+10 Combat', cost: [['Walker Brain', 1], ['Gold', 50]] },
  { name: 'Holographic Analyser', effect: '+10 Exploration', cost: [['Quantum Computer', 1], ['Gold', 50]] },
  { name: 'Mineral Compressor', effect: '+10 Industry', cost: [['Hydraulic Wiring', 1], ['Gold', 50]] },
  { name: 'Mind Control Device', effect: '+10 Trading', cost: [['Solar Mirror', 1], ['Gold', 50]] },
  { name: 'Fuel Oxidiser', effect: 'Shorter expedition', cost: [['Quad Servo', 2], ['Gold', 50]] },
];

export const fuelItems = [
  { name: 'Frigate Fuel (50 Tonnes)', tonnes: 50, cost: [['Di-hydrogen', 50], ['Tritium', 50]] },
  { name: 'Frigate Fuel (100 Tonnes)', tonnes: 100, cost: [['Di-hydrogen', 100], ['Tritium', 100]] },
  { name: 'Frigate Fuel (200 Tonnes)', tonnes: 200, cost: [['Di-hydrogen', 200], ['Tritium', 200]] },
];

// Expedition counts at which a frigate ranks up.
export const rankUps = [4, 8, 15, 25, 30, 35, 40, 45, 50, 55];

export const repairs = [
  ['Cooling System', 'Gold ×20, Oxygen ×5'], ['Master Circuit', 'Platinum ×5'], ['Photovoltaic Panel', 'Gold ×20, Sodium Nitrate ×10'],
  ['Power Distributor', 'Gold ×10, Silver ×20'], ['Pressure Chamber', 'Silver ×50'], ['Servo Arm', 'Pure Ferrite ×25'],
  ['Solenoid', 'Silver ×25, Ferrite Dust ×10'], ['Thermoregulator', 'Gold ×20'], ['Tiny Motor', 'Platinum ×5'], ['Transmission Box', 'Tritium ×15'],
];

export const expeditionFacts = [
  'You need a freighter with a Fleet Command Room (from the "Freighter Command" mission; costs Silver ×120, Gold ×40, Tritium ×10). Each room runs one expedition.',
  'Talk to the Navigator on the bridge to start one. Five new expeditions appear every day at 00:00 UTC; each takes up to 5 frigates.',
  'With 3 or fewer frigates, expeditions are short (about 1–4.5 h) and pay less. From your 4th frigate they get longer and pay more.',
  'Up to 3 booster items can be added per expedition.',
  'Any expedition can throw in encounters of other types, so avoid sending a fleet with a big hole in one stat.',
  'Mid-expedition, crews may call you with a choice — your answer changes the rewards. Some calls ask you to fly over and help.',
  'Debrief the captain in the Fleet Command Room to collect rewards. Three-star expeditions can include a corrupted log that gives the Dream Aerial (needed to find Organic Frigates).',
];

export const safety = [
  { rating: 'Fleet 2+ stars above the expedition', result: 'Safe — the wiki’s Frigate Expedition page says this guarantees no damage.' },
  { rating: 'Fleet 1 star above', result: 'Usually fine (recommended minimum on the Frigate page).' },
  { rating: 'Fleet equal to expedition', result: 'Chance of damage.' },
  { rating: 'Fleet below expedition', result: 'Damage very likely; a frigate that is damaged twice is destroyed.' },
];

export const damageFacts = [
  'A damaged frigate is shown with a hammer icon and "Critically Damaged". Sending it out again unrepaired can destroy it.',
  'To repair: land on it (or use the Frigate Teleporter from Manage Fleet). The captain marks the damaged components to fix.',
  'When a crew reports damage mid-expedition you can recall the frigate or carry on.',
  'Damaged frigates can gain negative traits, and lower-class frigates get damaged more often.',
];

export const organicFacts = [
  'Organic (living) frigates are found with the Dream Aerial (from a three-star expedition’s corrupted log), then later with the Anomaly Detector.',
  'They appear as a space encounter that asks questions — your answers shape its stats. They cost a lot (from about 1 billion units).',
  'They can never be destroyed on expeditions and bring back Psychonic Eggs (living ship upgrades) or Spawning Sacs (living ship slots).',
];

export const buyingTips = [
  'Frigates cost roughly 1.5M–12.5M units. Hire one by hailing its captain when the frigate shows as available. Max fleet: 30.',
  'Check base stats before buying (use the checker below): the difference between the best and worst frigate is 15+ points, and some burn up to 50% more fuel.',
  'A frigate with negative base stats, or an expedition count exactly on a rank-up number (4, 8, 15, 25, 30…), is bugged and missed a rank-up — avoid it.',
  'Frigates rank up with expeditions; each rank-up adds 6 stat points and can remove a bad trait or add a good one. They reach S-class with 5 net good traits and max out at 55 expeditions.',
];

export const traits = [
{
"trait": "Ablative Armor",
"value": "+4",
"group": "Combat +",
"good": true
},
{
"trait": "Aggressive Probes",
"value": "+1",
"group": "Combat +",
"good": true
},
{
"trait": "Ammo Fabricators",
"value": "+2",
"group": "Combat +",
"good": true
},
{
"trait": "Angry Captain",
"value": "+2",
"group": "Combat +",
"good": true
},
{
"trait": "Cloaking Device",
"value": "+6",
"group": "Combat +",
"good": true
},
{
"trait": "Experimental Weaponry",
"value": "+4",
"group": "Combat +",
"good": true
},
{
"trait": "Fauna Analysis Device",
"value": "+1",
"group": "Combat +",
"good": true
},
{
"trait": "Harvester Drones",
"value": "+1",
"group": "Combat +",
"good": true
},
{
"trait": "Hidden Weaponry",
"value": "+1",
"group": "Combat +",
"good": true
},
{
"trait": "Interstellar Signal Array",
"value": "+4",
"group": "Combat +",
"good": true
},
{
"trait": "Massive Guns",
"value": "+2",
"group": "Combat +",
"good": true
},
{
"trait": "Retrofitted Turrets",
"value": "+3",
"group": "Combat +",
"good": true
},
{
"trait": "Tractor Beam",
"value": "+4",
"group": "Combat +",
"good": true
},
{
"trait": "Tremendous Cannons",
"value": "+6",
"group": "Combat +",
"good": true
},
{
"trait": "Ultrasonic Weapons",
"value": "+2",
"group": "Combat +",
"good": true
},
{
"trait": "Cowardly Gunners",
"value": "-2",
"group": "Combat −",
"good": false
},
{
"trait": "Low-Energy Shields",
"value": "-4",
"group": "Combat −",
"good": false
},
{
"trait": "Fragile Hull",
"value": "-2",
"group": "Combat −",
"good": false
},
{
"trait": "Second-Hand Rockets",
"value": "-4",
"group": "Combat −",
"good": false
},
{
"trait": "Cartography Drones",
"value": "+6",
"group": "Exploration +",
"good": true
},
{
"trait": "Gravitational Visualiser",
"value": "+4",
"group": "Exploration +",
"good": true
},
{
"trait": "Holographic Displays",
"value": "+2",
"group": "Exploration +",
"good": true
},
{
"trait": "Long-Distance Sensors",
"value": "+3",
"group": "Exploration +",
"good": true
},
{
"trait": "Planetary Data Scoop",
"value": "+1",
"group": "Exploration +",
"good": true
},
{
"trait": "Radio Telescopes",
"value": "+3",
"group": "Exploration +",
"good": true
},
{
"trait": "Realtime Archival Device",
"value": "+2",
"group": "Exploration +",
"good": true
},
{
"trait": "Stowaway Botanist",
"value": "+2",
"group": "Exploration +",
"good": true
},
{
"trait": "Haunted Radar",
"value": "-2",
"group": "Exploration −",
"good": false
},
{
"trait": "Misaligned Sensors",
"value": "-4",
"group": "Exploration −",
"good": false
},
{
"trait": "Outdated Maps",
"value": "-4",
"group": "Exploration −",
"good": false
},
{
"trait": "Uncalibrated Warp Drive",
"value": "-6",
"group": "Exploration −",
"good": false
},
{
"trait": "Wandering Compass",
"value": "-2",
"group": "Exploration −",
"good": false
},
{
"trait": "Asteroid Scanner",
"value": "+3",
"group": "Industry +",
"good": true
},
{
"trait": "Asteroid Vaporizer",
"value": "+6",
"group": "Industry +",
"good": true
},
{
"trait": "Extendable Drills",
"value": "+2",
"group": "Industry +",
"good": true
},
{
"trait": "Laser Drill Array",
"value": "+2",
"group": "Industry +",
"good": true
},
{
"trait": "Metal Detector",
"value": "+2",
"group": "Industry +",
"good": true
},
{
"trait": "Mineral Extractors",
"value": "+1",
"group": "Industry +",
"good": true
},
{
"trait": "Remote Mining Unit",
"value": "+3",
"group": "Industry +",
"good": true
},
{
"trait": "Terraforming Beams",
"value": "+4",
"group": "Industry +",
"good": true
},
{
"trait": "Clumsy Drill Operator",
"value": "-6",
"group": "Industry −",
"good": false
},
{
"trait": "Lazy Crew",
"value": "-2",
"group": "Industry −",
"good": false
},
{
"trait": "Malfunctioning Drones",
"value": "-2",
"group": "Industry −",
"good": false
},
{
"trait": "Small Hoppers",
"value": "-4",
"group": "Industry −",
"good": false
},
{
"trait": "Underpowered Lasers",
"value": "-4",
"group": "Industry −",
"good": false
},
{
"trait": "AutoTranslator",
"value": "+1",
"group": "Trading +",
"good": true
},
{
"trait": "Economy Scanner",
"value": "+1",
"group": "Trading +",
"good": true
},
{
"trait": "HypnoDrones",
"value": "+2",
"group": "Trading +",
"good": true
},
{
"trait": "Mind Control Device",
"value": "+6",
"group": "Trading +",
"good": true
},
{
"trait": "Negotiation Module",
"value": "+2",
"group": "Trading +",
"good": true
},
{
"trait": "Propaganda Device",
"value": "+4",
"group": "Trading +",
"good": true
},
{
"trait": "Remote Market Analyser",
"value": "+2",
"group": "Trading +",
"good": true
},
{
"trait": "Robot Butlers",
"value": "+3",
"group": "Trading +",
"good": true
},
{
"trait": "Teleportation Device",
"value": "+6",
"group": "Trading +",
"good": true
},
{
"trait": "Trade Analysis Computer",
"value": "+2",
"group": "Trading +",
"good": true
},
{
"trait": "Well-Groomed Crew",
"value": "+3",
"group": "Trading +",
"good": true
},
{
"trait": "Automatic Investment Engine",
"value": "+4",
"group": "Trading +",
"good": true
},
{
"trait": "Badly Painted",
"value": "-2",
"group": "Trading −",
"good": false
},
{
"trait": "Roach Infestation",
"value": "-6",
"group": "Trading −",
"good": false
},
{
"trait": "Rude Captain",
"value": "-2",
"group": "Trading −",
"good": false
},
{
"trait": "Small Hold",
"value": "-4",
"group": "Trading −",
"good": false
},
{
"trait": "Thief On Board",
"value": "-4",
"group": "Trading −",
"good": false
},
{
"trait": "Advanced Power Distributor",
"value": "-6",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Antimatter Cycler",
"value": "-3",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Efficient Warp Drive",
"value": "-4",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Generator Grid",
"value": "-9",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Large Tanks",
"value": "-3",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Overclocked Power Distributor",
"value": "-4",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Oxygen Recycler",
"value": "-2",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Photon Sails",
"value": "-2",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Portable Fusion Ignitor",
"value": "-9",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Robot Crew",
"value": "-6",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Solar Panels",
"value": "-6",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Tuned Engines",
"value": "-4",
"group": "Expedition Fuel Cost +",
"good": true
},
{
"trait": "Inefficient Engine",
"value": "+2",
"group": "Cost Per Warp −",
"good": false
},
{
"trait": "Leaky Fuel Tubes",
"value": "+4",
"group": "Cost Per Warp −",
"good": false
},
{
"trait": "Oil Burner",
"value": "+1",
"group": "Cost Per Warp −",
"good": false
},
{
"trait": "Poorly-Aligned Ballast",
"value": "+2",
"group": "Cost Per Warp −",
"good": false
},
{
"trait": "Thirsty Crew",
"value": "+1",
"group": "Cost Per Warp −",
"good": false
},
{
"trait": "Alcubierre Drive",
"value": "-2%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Dynamic Ballast",
"value": "-2%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Expert Navigator",
"value": "-2%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Experimental Impulse Drive",
"value": "-3%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Local Time Dilator",
"value": "-1%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Mass Driver",
"value": "-1%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Motivated Crew",
"value": "-2%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Wormhole Generator",
"value": "-3%",
"group": "Expedition Duration +",
"good": true
},
{
"trait": "Advanced Maintenance Drones",
"value": "",
"group": "Damage Reduction +",
"good": true
},
{
"trait": "Holographic Components",
"value": "",
"group": "Damage Reduction +",
"good": true
},
{
"trait": "Self-Repairing Hull",
"value": "",
"group": "Damage Reduction +",
"good": true
}
];
