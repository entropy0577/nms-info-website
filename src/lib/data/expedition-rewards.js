// Frigate expedition reward pools, from the game's EXPEDITIONREWARDTABLE (game version 3.10, unmodded extract published in the
// csakypeter/NMS-BetterRewards repository). Its contents match the community wiki's loot summary (from the 3.75 files).
// Each expedition type has several reward pools; "small" pools appear to be used for small fleets (1–3 frigates).
// chance = % chance that item is included when that pool pays out; min/max = amount.
export const expeditionRewards = {
 "Trade": {
  "normal": [
   [
    {
     "item": "Storage Augmentation",
     "chance": 66,
     "min": 1,
     "max": 1
    },
    {
     "item": "Gek Relic",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "GekNip",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Vy'keen Effigy",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Vy'keen Dagger",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Korvax Casing",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Units",
     "chance": 50,
     "min": 250000,
     "max": 350000
    },
    {
     "item": "Korvax Convergence Cube",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Cryo-Pump",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Superconductor",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Fusion Accelerant",
     "chance": 100,
     "min": 1,
     "max": 3
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 350000
    }
   ]
  ],
  "small": [
   [
    {
     "item": "Gek Relic",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "GekNip",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Vy'keen Effigy",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Vy'keen Dagger",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Korvax Casing",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Units",
     "chance": 50,
     "min": 25000,
     "max": 35000
    },
    {
     "item": "Korvax Convergence Cube",
     "chance": 100,
     "min": 1,
     "max": 2
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 35000
    }
   ]
  ]
 },
 "Combat": {
  "normal": [
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 200000,
     "max": 350000
    }
   ],
   [
    {
     "item": "Chromatic Metal",
     "chance": 100,
     "min": 500,
     "max": 500
    },
    {
     "item": "Indium",
     "chance": 100,
     "min": 500,
     "max": 500
    },
    {
     "item": "Magnetised Ferrite",
     "chance": 100,
     "min": 500,
     "max": 500
    },
    {
     "item": "Geodesite",
     "chance": 100,
     "min": 5,
     "max": 5
    },
    {
     "item": "Iridesite",
     "chance": 100,
     "min": 5,
     "max": 5
    },
    {
     "item": "Units",
     "chance": 50,
     "min": 200000,
     "max": 350000
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ]
  ],
  "small": [
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 20000,
     "max": 35000
    }
   ],
   [
    {
     "item": "Chromatic Metal",
     "chance": 100,
     "min": 50,
     "max": 50
    },
    {
     "item": "Indium",
     "chance": 100,
     "min": 50,
     "max": 50
    },
    {
     "item": "Magnetised Ferrite",
     "chance": 100,
     "min": 50,
     "max": 50
    },
    {
     "item": "Geodesite",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Iridesite",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Units",
     "chance": 50,
     "min": 20000,
     "max": 35000
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ]
  ]
 },
 "Exploration": {
  "normal": [
   [
    {
     "item": "Antimatter",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Nanites",
     "chance": 100,
     "min": 200,
     "max": 250
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ],
   [
    {
     "item": "Random artifact / curiosity",
     "chance": 100,
     "min": null,
     "max": null
    },
    {
     "item": "NipNip Buds",
     "chance": 10,
     "min": 5,
     "max": 10
    },
    {
     "item": "Korvax Casing",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Vy'keen Effigy",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Gek Relic",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Sac Venom",
     "chance": 50,
     "min": 5,
     "max": 10
    },
    {
     "item": "Albumen Pearl",
     "chance": 50,
     "min": 5,
     "max": 10
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ],
   [
    {
     "item": "Random artifact / curiosity",
     "chance": 100,
     "min": null,
     "max": null
    },
    {
     "item": "Thermic Condensate",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Enriched Carbon",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Nitrogen Salt",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Sac Venom",
     "chance": 50,
     "min": 5,
     "max": 10
    },
    {
     "item": "Albumen Pearl",
     "chance": 50,
     "min": 5,
     "max": 10
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ],
   [
    {
     "item": "Random artifact / curiosity",
     "chance": 100,
     "min": null,
     "max": null
    },
    {
     "item": "Korvax Casing",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Vy'keen Effigy",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Gek Relic",
     "chance": 20,
     "min": 5,
     "max": 10
    },
    {
     "item": "Vortex Cube",
     "chance": 50,
     "min": 5,
     "max": 10
    },
    {
     "item": "Gravitino Ball",
     "chance": 50,
     "min": 5,
     "max": 10
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ]
  ],
  "small": [
   [
    {
     "item": "Antimatter",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Nanites",
     "chance": 100,
     "min": 20,
     "max": 25
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ],
   [
    {
     "item": "Random artifact / curiosity",
     "chance": 100,
     "min": null,
     "max": null
    },
    {
     "item": "NipNip Buds",
     "chance": 10,
     "min": 1,
     "max": 2
    },
    {
     "item": "Korvax Casing",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Vy'keen Effigy",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Gek Relic",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Sac Venom",
     "chance": 50,
     "min": 1,
     "max": 2
    },
    {
     "item": "Albumen Pearl",
     "chance": 50,
     "min": 1,
     "max": 2
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ],
   [
    {
     "item": "Random artifact / curiosity",
     "chance": 1,
     "min": null,
     "max": null
    },
    {
     "item": "Thermic Condensate",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Enriched Carbon",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Nitrogen Salt",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Sac Venom",
     "chance": 50,
     "min": 1,
     "max": 2
    },
    {
     "item": "Albumen Pearl",
     "chance": 50,
     "min": 1,
     "max": 2
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ],
   [
    {
     "item": "Random artifact / curiosity",
     "chance": 1,
     "min": null,
     "max": null
    },
    {
     "item": "Korvax Casing",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Vy'keen Effigy",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Gek Relic",
     "chance": 20,
     "min": 1,
     "max": 2
    },
    {
     "item": "Vortex Cube",
     "chance": 50,
     "min": 1,
     "max": 2
    },
    {
     "item": "Gravitino Ball",
     "chance": 50,
     "min": 1,
     "max": 2
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ]
  ]
 },
 "Industrial": {
  "normal": [
   [
    {
     "item": "Activated Copper",
     "chance": 100,
     "min": 250,
     "max": 750
    },
    {
     "item": "Activated Cadmium",
     "chance": 100,
     "min": 250,
     "max": 750
    },
    {
     "item": "Activated Emeril",
     "chance": 100,
     "min": 250,
     "max": 750
    },
    {
     "item": "Activated Indium",
     "chance": 100,
     "min": 250,
     "max": 750
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    }
   ],
   [
    {
     "item": "Storage Augmentation",
     "chance": 66,
     "min": 1,
     "max": 1
    },
    {
     "item": "Salvaged Frigate Module",
     "chance": 66,
     "min": 1,
     "max": 1
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    },
    {
     "item": "Neural Duct",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Re-latticed Arc Crystal",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Superconducting Fibre",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Organic Catalyst",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Semiconductor",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Hot Ice",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Random artifact / curiosity",
     "chance": 100,
     "min": null,
     "max": null
    }
   ],
   [
    {
     "item": "Storage Augmentation",
     "chance": 66,
     "min": 1,
     "max": 1
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    },
    {
     "item": "Geodesite",
     "chance": 100,
     "min": 2,
     "max": 4
    },
    {
     "item": "Iridesite",
     "chance": 100,
     "min": 2,
     "max": 4
    },
    {
     "item": "Aronium",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Dirty Bronze",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Herox",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Lemmium",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Magno-Gold",
     "chance": 100,
     "min": 5,
     "max": 10
    },
    {
     "item": "Grantine",
     "chance": 100,
     "min": 5,
     "max": 10
    }
   ],
   [
    {
     "item": "Storage Augmentation",
     "chance": 66,
     "min": 1,
     "max": 1
    },
    {
     "item": "Salvaged Frigate Module",
     "chance": 66,
     "min": 1,
     "max": 1
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 250000,
     "max": 400000
    },
    {
     "item": "Unrefined Pyrite Grease",
     "chance": 100,
     "min": 10,
     "max": 20
    },
    {
     "item": "Bromide Salt",
     "chance": 100,
     "min": 10,
     "max": 20
    },
    {
     "item": "Thermic Condensate",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Enriched Carbon",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Nitrogen Salt",
     "chance": 100,
     "min": 1,
     "max": 3
    },
    {
     "item": "Grantine",
     "chance": 100,
     "min": 2,
     "max": 6
    }
   ]
  ],
  "small": [
   [
    {
     "item": "Activated Copper",
     "chance": 100,
     "min": 100,
     "max": 200
    },
    {
     "item": "Activated Cadmium",
     "chance": 100,
     "min": 100,
     "max": 200
    },
    {
     "item": "Activated Emeril",
     "chance": 100,
     "min": 100,
     "max": 200
    },
    {
     "item": "Activated Indium",
     "chance": 100,
     "min": 100,
     "max": 200
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    }
   ],
   [
    {
     "item": "Salvaged Frigate Module",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    },
    {
     "item": "Neural Duct",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Re-latticed Arc Crystal",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Superconducting Fibre",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Random artifact / curiosity",
     "chance": 1,
     "min": null,
     "max": null
    }
   ],
   [
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    },
    {
     "item": "Geodesite",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Iridesite",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Aronium",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Dirty Bronze",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Herox",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Lemmium",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Magno-Gold",
     "chance": 100,
     "min": 1,
     "max": 2
    },
    {
     "item": "Grantine",
     "chance": 100,
     "min": 1,
     "max": 2
    }
   ],
   [
    {
     "item": "Salvaged Frigate Module",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Units",
     "chance": 100,
     "min": 25000,
     "max": 40000
    },
    {
     "item": "Unrefined Pyrite Grease",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Bromide Salt",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Living Pearl",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Crystal Sulphide",
     "chance": 100,
     "min": 1,
     "max": 1
    },
    {
     "item": "Albumen Pearl",
     "chance": 100,
     "min": 1,
     "max": 1
    }
   ]
  ]
 }
};
