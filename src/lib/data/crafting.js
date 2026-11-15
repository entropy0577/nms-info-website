// Crafting recipes for commonly needed and high-value products.
// Source: Fandom wiki item pages ({{Craft}} templates and infobox values), Nov 2026.
// in = [[ingredient, amount], ...]; value = base sell value in units.

export const crafted = [
  // ── Everyday essentials ──
  { name: 'Metal Plating', value: 800, group: 'Essentials', in: [['Ferrite Dust', 50]] },
  { name: 'Carbon Nanotubes', value: 500, group: 'Essentials', in: [['Carbon', 50]] },
  { name: 'Di-hydrogen Jelly', value: 200, group: 'Essentials', in: [['Di-hydrogen', 40]] },
  { name: 'Life Support Gel', value: 200, group: 'Essentials', in: [['Di-hydrogen Jelly', 1], ['Carbon', 20]] },
  { name: 'Ion Battery', value: 200, group: 'Essentials', in: [['Ferrite Dust', 5], ['Cobalt', 10]] },
  { name: 'Starship Launch Fuel', value: 450, group: 'Essentials', in: [['Di-hydrogen', 40], ['Metal Plating', 1]] },
  { name: 'Hermetic Seal', value: 800, group: 'Essentials', in: [['Condensed Carbon', 30]] },
  { name: 'Microprocessor', value: 2000, group: 'Essentials', in: [['Chromatic Metal', 40], ['Carbon Nanotubes', 1]] },
  { name: 'Antimatter', value: 5233, group: 'Essentials', in: [['Chromatic Metal', 25], ['Condensed Carbon', 20]] },
  { name: 'Antimatter Housing', value: 6500, group: 'Essentials', in: [['Oxygen', 30], ['Ferrite Dust', 50]] },
  { name: 'Warp Cell', value: 46750, group: 'Essentials', in: [['Antimatter Housing', 1], ['Antimatter', 1]] },
  { name: 'Warp Hypercore', value: 46750, group: 'Essentials', in: [['Antimatter', 1], ['Storm Crystal', 1]] },
  { name: 'Unstable Plasma', value: 5750, group: 'Essentials', in: [['Oxygen', 50], ['Metal Plating', 1]] },

  // ── Tech repair components ──
  { name: 'Quantum Computer', value: 4200, group: 'Components', in: [['Microprocessor', 1], ['Antimatter', 1], ['Chromatic Metal', 25]] },
  { name: 'Magnetic Resonator', value: 6150, group: 'Components', in: [['Magnetised Ferrite', 40], ['Ionised Cobalt', 40]] },
  { name: 'Solar Mirror', value: 6150, group: 'Components', in: [['Gold', 40], ['Silver', 30], ['Chromatic Metal', 25]] },
  { name: 'Hydraulic Wiring', value: 3600, group: 'Components', in: [['Carbon Nanotubes', 2], ['Salt', 20], ['Di-hydrogen', 40]] },
  { name: 'Amino Chamber', value: 12300, group: 'Components', in: [['Metal Plating', 1], ['Chlorine', 20], ['Condensed Carbon', 25]] },
  { name: 'Explosive Drones', value: 75000, group: 'Components', in: [['Walker Brain', 1], ['Gold', 50]] },

  // ── Farming chain (plants → high value) ──
  { name: 'Glass', value: 200, group: 'Farming chain', in: [['Frost Crystal', 40]] },
  { name: 'Unstable Gel', value: 50000, group: 'Farming chain', in: [['Cactus Flesh', 200]] },
  { name: 'Acid', value: 188000, group: 'Farming chain', in: [['Mordite', 25], ['Fungal Mould', 600]] },
  { name: 'Lubricant', value: 110000, group: 'Farming chain', in: [['Faecium', 50], ['Gamma Root', 400]] },
  { name: 'Poly Fibre', value: 130000, group: 'Farming chain', in: [['Cactus Flesh', 100], ['Star Bulb', 200]] },
  { name: 'Heat Capacitor', value: 180000, group: 'Farming chain', in: [['Frost Crystal', 100], ['Solanium', 200]] },
  { name: 'Living Glass', value: 566000, group: 'Farming chain', in: [['Lubricant', 1], ['Glass', 5]] },
  { name: 'Liquid Explosive', value: 800500, group: 'Farming chain', in: [['Acid', 1], ['Unstable Gel', 1]] },
  { name: 'Circuit Board', value: 916250, group: 'Farming chain', in: [['Heat Capacitor', 1], ['Poly Fibre', 1]] },

  // ── Gas chain (Atmosphere Harvesters → high value) ──
  { name: 'Thermic Condensate', value: 50000, group: 'Gas chain', in: [['Sulphurine', 250], ['Condensed Carbon', 50]] },
  { name: 'Enriched Carbon', value: 50000, group: 'Gas chain', in: [['Radon', 250], ['Condensed Carbon', 50]] },
  { name: 'Nitrogen Salt', value: 50000, group: 'Gas chain', in: [['Nitrogen', 250], ['Condensed Carbon', 50]] },
  { name: 'Semiconductor', value: 320000, group: 'Gas chain', in: [['Thermic Condensate', 1], ['Nitrogen Salt', 1]] },
  { name: 'Organic Catalyst', value: 320000, group: 'Gas chain', in: [['Thermic Condensate', 1], ['Enriched Carbon', 1]] },
  { name: 'Hot Ice', value: 320000, group: 'Gas chain', in: [['Enriched Carbon', 1], ['Nitrogen Salt', 1]] },
  { name: 'Superconductor', value: 1500000, group: 'Gas chain', in: [['Enriched Carbon', 1], ['Semiconductor', 1]] },
  { name: 'Fusion Accelerant', value: 1500000, group: 'Gas chain', in: [['Organic Catalyst', 1], ['Nitrogen Salt', 1]] },
  { name: 'Cryo-Pump', value: 1500000, group: 'Gas chain', in: [['Hot Ice', 1], ['Thermic Condensate', 1]] },

  // ── Combined top tier ──
  { name: 'Quantum Processor', value: 4400000, group: 'Top tier', in: [['Circuit Board', 1], ['Superconductor', 1]] },
  { name: 'Portable Reactor', value: 4200000, group: 'Top tier', in: [['Liquid Explosive', 1], ['Fusion Accelerant', 1]] },
  { name: 'Cryogenic Chamber', value: 3800000, group: 'Top tier', in: [['Living Glass', 1], ['Cryo-Pump', 1]] },
  { name: 'Fusion Ignitor', value: 15600000, group: 'Top tier', in: [['Portable Reactor', 1], ['Quantum Processor', 1], ['Geodesite', 1]] },
  { name: 'Stasis Device', value: 15600000, group: 'Top tier', in: [['Quantum Processor', 1], ['Cryogenic Chamber', 1], ['Iridesite', 1]] },

  // ── Alloys (localised minerals → Geodesite / Iridesite) ──
  { name: 'Dirty Bronze', value: 25000, group: 'Alloys', in: [['Pyrite', 50], ['Pure Ferrite', 100]] },
  { name: 'Herox', value: 25000, group: 'Alloys', in: [['Ammonia', 50], ['Ionised Cobalt', 50]] },
  { name: 'Lemmium', value: 25000, group: 'Alloys', in: [['Uranium', 50], ['Pure Ferrite', 100]] },
  { name: 'Aronium', value: 25000, group: 'Alloys', in: [['Paraffinium', 50], ['Ionised Cobalt', 50]] },
  { name: 'Magno-Gold', value: 25000, group: 'Alloys', in: [['Ionised Cobalt', 50], ['Phosphorus', 50]] },
  { name: 'Grantine', value: 25000, group: 'Alloys', in: [['Ionised Cobalt', 50], ['Dioxite', 50]] },
  { name: 'Geodesite', value: 150000, group: 'Alloys', in: [['Dirty Bronze', 1], ['Herox', 1], ['Lemmium', 1]] },
  { name: 'Iridesite', value: 150000, group: 'Alloys', in: [['Aronium', 1], ['Magno-Gold', 1], ['Grantine', 1]] },
];

export const craftGroups = ['Essentials', 'Components', 'Farming chain', 'Gas chain', 'Alloys', 'Top tier'];

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
