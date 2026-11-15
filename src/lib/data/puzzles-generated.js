// POI puzzle data. Generated from the No Man's Sky community wiki, Nov 2026:
// - Secure Sites/Puzzles (datamined Manufacturing Facility & Operations Centre puzzles, game v2.61 tables)
// - Gek/Korvax/Vy'keen Observatory puzzle and Transmission Tower puzzle pages.
// mood: positive = good outcome, negative = bad, neutral/sad = no gain.
export const securePuzzles = [
 {
  "id": "ALL_FACT_REWARD",
  "site": "Final reward screen",
  "race": "Any",
  "hot": false,
  "text": "Normal operations have resumed, and I have access to the facility's main control panel. I should be able to alter production to my own benefit.",
  "options": [
   {
    "opt": "Extract nanites",
    "mood": "neutral",
    "rewards": [
     "40–80 nanites",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Create Multi-Tool Expansion Slot",
    "mood": "positive",
    "rewards": [
     "Multi-Tool Expansion Slot",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Learn new recipe",
    "mood": "positive",
    "rewards": [
     "Product recipe (Factory Override Unit)",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY14_MAIN",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "Friend healing and repair station initializing! Please, be happy!",
  "options": [
   {
    "opt": "Fire Multi-Tool",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Struggle",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Wait",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY1",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "My unauthorised intrusion has activated an alert on the control terminal. Its lights flash an angry, hostile red. Reboot initialised. Data loss probability warning. Offsite back-up detonation initialised. Security countermeasures have begun a full system wipe. I see file after file being purged from the records.",
  "options": [
   {
    "opt": "Force restart",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Save data",
    "mood": "negative",
    "rewards": [
     "−Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Wait",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY2",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The primary terminal is non-responsive, but comms seem open. Warning. Calm, entity! Contact Convergence technology entity for help I can open up conversation with whoever - or whatever - installed it.",
  "options": [
   {
    "opt": "Request remote help",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Hard reset the system",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY3",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "My entry into the facility has interrupted an automated maintenance routine. The terminal flashes a warning message: Save failed! Tech blueprint data corrupted! Reconstruction probability: high A fragmented file appears to have frozen the system. The machine is stuck in a loop trying to access it.",
  "options": [
   {
    "opt": "Attempt reconstruction",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Delete file",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY4",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The facility rings with the blare of an alarm. However, it appears I am not the first intruder. The terminal display indicates a previous hijack attempt. Virus detection warning! File extracting valuable data! Strange, shifting glyphs dance across the terminals command prompt. Some alien code is taking over the system's research drive.",
  "options": [
   {
    "opt": "Quarantine alien process",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Permit alien process",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY5",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The outpost appears to have been in the middle of complex planetary scan. Alarms sound against my intrusion, but the operation continues. I attempt to make sense of the output. Warning! Interruption forbidden! Sentinel scan ending soon! Control returning to overseer imminently! The scan continues. It seems to be consuming all the facility's resources, preventing other operations. A large red override button blinks temptingly.",
  "options": [
   {
    "opt": "Cancel planetary scan",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Wait",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY6",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "Two electronic lifeforms are registered on this terminal. Korvax research log. Primary entity: product recipe research. Secondary entity: technological blueprint reconstruction. The primary entity's work is full of complicated chemical symbols, the secondary entity focuses on diagrams of electronic circuitry.",
  "options": [
   {
    "opt": "Login as Primary Entity",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Login as Secondary Entity",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY7",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "My entry has caused the facility to go into immediate lockdown, interrupting its operation. Readouts on the terminal indicate some sort of deep-level exploratory or drilling operation. Geological scan in progress! Medial strata mined. Remote connection error! Immediate probe recall required! A probe schematic flashes red. Some input appears to be required.",
  "options": [
   {
    "opt": "Recall probe",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Restart probe",
    "mood": "neutral",
    "rewards": [],
    "then": "Follow-up puzzle"
   },
   {
    "opt": "Detonate probe",
    "mood": "negative",
    "rewards": [
     "−Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY8",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "Alarms blare, sounding out against my intrusion. The facility is remotely operated, and no-one responds to the klaxon's call. The terminal indicates the facility was undertaking a specialised piece of research. Experiment containment failure. Common fuel element overcharge explosion. Clarify should continue? The terminal appears to be asking for manual confirmation of its experiment...",
  "options": [
   {
    "opt": "Continue experiment",
    "mood": "negative",
    "rewards": [
     "−Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "End experiment",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Insert carbon",
    "mood": "negative",
    "rewards": [
     "−Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY10",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "Security systems have reacted to my unauthorised entry. The terminal barks a series of warnings. Illegal access! Security control deployed! All goods will be incinerated! The terminal cycles images of flames. I can feel the heat rising from the resource vaults below.",
  "options": [
   {
    "opt": "Submit cancellation request",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Activate fire extinguishers",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Add fuel",
    "mood": "negative",
    "rewards": [
     "−Korvax standing",
     "Damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY11",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "A wired metal dart springs from a panel and slams through my visor. It pierces the skin on my forehead, and I feel a faint electrical current. Eheu Entity! Vital words accidentally corrupted? Pay units to relearn! Whether ransom, paid service or security device - the terminal seems to want payment...",
  "options": [
   {
    "opt": "Insert units",
    "mood": "positive",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   },
   {
    "opt": "Insert units",
    "mood": "positive",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   },
   {
    "opt": "Remove dart",
    "mood": "positive",
    "rewards": [
     "50–100 resources"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY13",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "Machinery here is mining a captured asteroid for oxides. The process has stalled. The facility reeks of burnt metal, and the floor is hot to touch. I search the terminal for clues. Eheu, drill motor automated disconnection! Motor fire! Repair immediately Entity! The terminal presents a number of repair drone options. <DELAY>0.2<> Beneath my feet I hear the ominous creaking and popping of metal straining against itself.",
  "options": [
   {
    "opt": "Repair drill bit",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Repair drill motor",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY14",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "I rapidly flick through alien warnings to discover what's brought the facility offline. Warning! Temporal capacitor disengaged! Production time loop detected! All too late, I realise I'm doing the exact same thing again. And again. I've done this before. Many times.",
  "options": [
   {
    "opt": "Recharge flux crystals",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Engage temporal capacitor",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Reset clock",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY15",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "My intrusion has triggered some sort of scrambled shutdown. Even over the sound of the alarm, I can hear the rumble of elements cascading away through the pipes. The terminal blinks a warning: Warning! Catalyst overload! Circuit board technology overheat warning! It seems that the system is struggling to cope with the overflow. An automated emergency stop is about to be issued.",
  "options": [
   {
    "opt": "Detach supply chute",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Override security alert",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Inject coolant",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY16",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": true,
  "text": "The air is compromised. My entry has allowed the overwhelming atmospheric heat to overwhelm sensitive systems. Even the primary terminal is failing beneath my finger-tips. Alert! Alert! Power core isolated! Central artificial intelligence core endangered! Hostile environment detected! A number of recovery operations are available...",
  "options": [
   {
    "opt": "Seal off power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off central AI",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Seal off power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off central AI",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Seal off power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off central AI",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Seal off power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off central AI",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Seal off power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off central AI",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Seal off power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off central AI",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Seal off power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Seal off central AI",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY17",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The installation has been hacked. A coded transmission has breached security and is stealing data. Warning! Vy'keen vessel transmission detected. Data upload to starship. Two wavelengths are open. One from this planet's surface, and the other from high above.",
  "options": [
   {
    "opt": "Block planetary signal",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Block orbital signal",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Report intrusion",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "Useful item",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY18",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "Operations are offline. A recent research scan has been corrupted, likely by my unexpected interruption. It is crashing every system in the outpost. Bad data. Sentinel drone activity scan corrupted. System disengaged. The terminal scrolls through a list of potentially corrupt files. I appear to have deletion rights...",
  "options": [
   {
    "opt": "Delete planetary quadruped scan",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Delete Sentinel scan",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Delete geological survey",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY19",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "Wild energy fluctuations have brought research operations to a standstill. When I touch the terminal to investigate, a residual electric charge earths itself through my Exosuit. Alert! Electronic terminal operator power discharge! Reset primary interface! Readouts on the terminal indicate the power fluctuations are getting stronger and wilder. It will not be long before they bring down the entire facility.",
  "options": [
   {
    "opt": "Stabilise production battery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reset primary terminal",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY20",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": true,
  "text": "Systems are super-charged despite the security alert. Equipment beneath my feet buzzes and whirrs with a high intensity. The terminal blinks a warning. Danger! Excess power! Decrease energy use immediately! Delivery at maximum! I detect a faint smell of burning...",
  "options": [
   {
    "opt": "Reduce power delivery levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase fan power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase coolant power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reduce power delivery levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase fan power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase coolant power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reduce power delivery levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase fan power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase coolant power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reduce power delivery levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase fan power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase coolant power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reduce power delivery levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase fan power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase coolant power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reduce power delivery levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase fan power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase coolant power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reduce power delivery levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase fan power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase coolant power delivery",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY21",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "I approach the terminal. It flashes the expected security alert, but alongside is a warning I have not seen before. Unexpected biological blockage detected. Power delivery network disruption! A video feed shows a small creature is scrambling through the wiring below me, woken by the security alert. Its choice of nesting location was unwise...",
  "options": [
   {
    "opt": "Initiate power surge",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Flush production network",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Leave creature alone",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY22",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The alarm has triggered the instant incineration of the elements used here. The process they were being used for, however, is still online. Databank back-up process stalled. Raw metal required to finish process. My scanner is picking up traces of metal, leftovers from the previous production process.",
  "options": [
   {
    "opt": "Supply metal",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Supply metal",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Supply metal",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "EXP_FACTORY23",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The terminal talks to me. A basic AI program rapidly spells out words in the language of the electronic lifeforms. Help! Feed me catalyst! With catalysts I escape! Combine with technological Korvax Entity! Escape! At my feet, a resource vault hatch falls open.",
  "options": [
   {
    "opt": "Insert organic matter",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Insert metal",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "−Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Insert catalyst",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY24",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "An automatic process has scrambled the output of the terminal. I can make out a few words, but the rest is lost in static. // TOXIC // ATMOSPHERIC // INVISIBLE// They could lead me to the overseer's workflow, and bringing the facility back online.",
  "options": [
   {
    "opt": "Gas",
    "mood": "positive",
    "rewards": [
     "Exosuit tech blueprint",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Shield",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Exosuit",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY25",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "My intrusion has led to the work underway on the primary terminal being scrambled. It's a jumble of words. // HIGH // ORBITAL // TECHNOLOGICAL // Using what's visible I can reboot the overseer's workflow, and get systems online.",
  "options": [
   {
    "opt": "Satellites",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Asteroids",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY26",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The security alert that's firing is jamming the terminal. Static covers most of the screen, obscuring nearly all relevant information. // CRIMINAL // STARSHIPS // CONTRABAND // The words left unobscured could lead me to the outpost's current research focus...",
  "options": [
   {
    "opt": "Pirates",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Traders",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Orbital station",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY27",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The security breach has obscured the screen with a glowing red orb. Few readable words remain. // WORSHIP // PRAISE // RED // ORB // JOURNEY // STARSHIP // ATLAS // Working out what the overseer was studying here would reestablish its workflow...",
  "options": [
   {
    "opt": "The Atlas",
    "mood": "negative",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "The Foretold",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "The Traveller",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY30",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The terminal shows numerous schematics relating to the technology of Sentinel drones and walkers. Warped flesh with metal, saw the truth - the truth - the - The creators of this facility appear to have been particularly interested in something called a Vortex Cube. They were attempting to replicate its design. Sensors in the bowels of the factory show strange signs. Something still shakes down there in the darkness, something neither alive nor truly dead...",
  "options": [
   {
    "opt": "Purge depths",
    "mood": "neutral",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Take Vortex Cube",
    "mood": "neutral",
    "rewards": [
     "Vortex Cube"
    ],
    "then": ""
   },
   {
    "opt": "Scan for Sentinels",
    "mood": "neutral",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY31",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The factory appears to produce replacement parts for the exosuits of the alien Korvax, spitting out face mask after face mask, arms, datapads, even feet. Where is entity?! Transfer failure / non-existence / terminate! Transfer, transfer! As I witness the production line on the terminal, one of the disembodied masks begins to scream. The terminal awaits input, a timer informing me that a ship will be on its way quite soon.",
  "options": [
   {
    "opt": "Reassure the mask",
    "mood": "sad",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Report system malfunction",
    "mood": "neutral",
    "rewards": [
     "Gek Relic"
    ],
    "then": ""
   },
   {
    "opt": "Cease production",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY32",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The terminal shows a variety of motionless lifeforms standing in colossal rows in the darkness beneath the factory. MONITOR SYSTEM NORMAL... ALL LIFEFORMS WITHIN OPERATING PARAMETERS They look like Gek and Vy'keen, unblinking, apparently unaware of where they are.",
  "options": [
   {
    "opt": "Initialise system",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Report to Gek",
    "mood": "negative",
    "rewards": [
     "−Korvax standing",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Report to Vy'keen",
    "mood": "negative",
    "rewards": [
     "−Korvax standing",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY33",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The factory is unlike the other Korvax facilities I have seen. It does not appear to produce machines or files, but strange reams of a plastic substance, covered in precise sequences of dots. Echoes fade. Origin remains. Start of time, Korvax will persist... Even in face of end. Even before abyss. It looks like writing, but what use would the Korvax have for such primitive communication?",
  "options": [
   {
    "opt": "Shut down production",
    "mood": "neutral",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Report to Korvax authorities",
    "mood": "positive",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY34",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The factory stands vacant, producing nothing. The production lines have long since ceased, and though the alarm sounds, it is unclear why. Trapped in system... please, help me... A voice calls out, sad, alone.",
  "options": [
   {
    "opt": "Start production",
    "mood": "positive",
    "rewards": [
     "New Korvax word",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Wipe system",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Alert Korvax authorities",
    "mood": "negative",
    "rewards": [
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_FACTORY35",
  "site": "Manufacturing Facility",
  "race": "Korvax",
  "hot": false,
  "text": "The factory produces components for starships, fabricating them using the resources available on this world. TRANSFER IN PROCESS: 38% PROGRESS. SEE MORE DETAIL? This installation creates parts for Korvax exploration vessels. They are asymmetrical, prioritising verticality and function far more than the worldview of any organic organism would allow. When I examine the terminal more closely I see a transfer in progress. Data leaps from ship to ship, altering blueprints as it goes.",
  "options": [
   {
    "opt": "Disable process",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   },
   {
    "opt": "Attempt download",
    "mood": "negative",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Wait and watch",
    "mood": "negative",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_1",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "I discover an excited message from off-world. It seems to be discussing a report with... an image of me at its centre! Unknown lifeform research is HIGHLY commendable Entity! Discuss data with Korvax Convergence immediately! Someone seems intrigued by my journey, and may well want to help. Should I get in touch?",
  "options": [
   {
    "opt": "Delete report",
    "mood": "neutral",
    "rewards": [
     "−Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Open comms",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_2",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "I find a report filled with images of Sentinels, but its upload seems to have stalled. Ahem. Planetary Sentinel scan data? UPLOAD SENTINEL SCAN DATA, ENTITY! IMMEDIATELY! A demanding, perhaps rude, off-world message flashes at me. Somebody, somewhere, wants something.",
  "options": [
   {
    "opt": "Resend Sentinel data",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Reply with a refusal",
    "mood": "negative",
    "rewards": [
     "−Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_4",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "A mass-mailed off-world message shows damaged electronic lifeforms. Arms are ripped off, masks chewed and facial lights dimmed. Korvax friend! Dangerous creatures attack Korvax Entity! For weaponry sales contact Gek Trade Federation today! It feels offensive. It's clearly intended to shock recipients into a response. Replies can be sent with units attached...",
  "options": [
   {
    "opt": "Reply with units",
    "mood": "positive",
    "rewards": [
     "Ammo",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Reply with outrage",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Do not reply",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_6",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "An image of a distant solar system is being studied here. A mineral-rich moon can be seen, orbiting a desolate and toxic-looking planet. Slightly obscured in the background, meanwhile, is a strange dark-coloured smudge – a diamond shape floating in space. A hint of red flashes from its centre. Atlas Interface awakes? Upload research findings immediately entity! Korvax Convergence sends relevant research technology! There are no coordinates visible, but I can enhance different parts of the image to study them and automatically upload the terminal's findings.",
  "options": [
   {
    "opt": "Enhance moon image",
    "mood": "positive",
    "rewards": [
     "Multi-Tool tech blueprint",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Enhance planet image",
    "mood": "positive",
    "rewards": [
     "Exosuit tech blueprint",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Enhance diamond-shaped structure image",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_7",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "An off-world message to all planetary research stations has filled the screen with plans for a scientific expedition of some sort. Complex star charts, fuel requirements, complex communication rigs and plans for orbital experiments fill the screen. Research entity! Atlas Interface mission begins! Donate contribution! Specialists apply here! Convergence sends specialists ship technology! The outpost's resource vault is open to contributions of metals for the cause, while it also appears that the resident scientist could join the fleet... although it would require an upgraded ship.",
  "options": [
   {
    "opt": "Contribute a metal",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Join team",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_8",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "This outpost seems to be a vast library of production knowledge. A vast list of product formulas endlessly scrolls on the terminal, moving so fast that it hurts just to look at them. They appear to be catalogued by their base elements, but any deeper inspection makes me feel nauseous. Korvax Convergence product catalogue available. Insert element to filter product catalogue. The resource vaults next to me are open, and are clearly in regular use.",
  "options": [
   {
    "opt": "Insert catalyst",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Insert organic matter",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Insert metal",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_10",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "Reams of data are flowing into this terminal from research outposts all over the planet. As well as a storage depot for the planetary products locked away in the vaults beneath my feet, this is a point of transmission. Avoid data disruption! Korvax Convergence sends reward for additional data! Knowledge accumulated on this world is being sent up to a scientific flagship hanging in orbit high above my head. I could easily breach the flow to improve my own knowledge, but sharing my own knowledge and discoveries is also an option.",
  "options": [
   {
    "opt": "Breach data flow",
    "mood": "neutral",
    "rewards": [
     "Tech blueprint or upgrade module",
     "−Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Share knowledge",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_12",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "A back-up procedure has come to a standstill. The system is archiving a huge amount of language data, but the system has run out of memory to allocate. Dialect data process stalled. Metal required to finish process. I can attach my Multi-Tool to provide extra space, it would require some variety of metal to re-engage the process...",
  "options": [
   {
    "opt": "Insert common metal",
    "mood": "positive",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   },
   {
    "opt": "Insert uncommon metal",
    "mood": "positive",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   },
   {
    "opt": "Insert rare metal",
    "mood": "positive",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_13",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "The facility is processing a signal that emanates from a distant location deep in space. Endless processing units are combining to crack the code of a strange mathematical language. Atlas Interface signal awakes? Research entity! Insert catalyst constantly! Avoid disruption! Rare elements are being pulled from the resource vaults at my feet, but some are running low.",
  "options": [
   {
    "opt": "Place metal in the vault",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Place catalyst in the vault",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Korvax standing"
    ],
    "then": ""
   },
   {
    "opt": "Take elements from vault",
    "mood": "neutral",
    "rewards": [
     "50–100 resources",
     "−Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_14",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "The outpost is abandoned, its alarms blaring a warning to souls long dead. The Korvax in this installation quarantined themselves from the rest of their species, believing that a violent impulse was emerging within the group. Something happened to them out here... something awoke within their minds... WARNING WARNING WARNING DIVERGENCE DIVERGENCE DIVERGENCE",
  "options": [
   {
    "opt": "Examine logs",
    "mood": "neutral",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Purge facility",
    "mood": "neutral",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Alert Korvax",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_15",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "The research station contains a vast array of scanners and monitoring equipment directed at bodies of water throughout the system. It is searching for signs of something designated 'abyss'. The scientists who worked here seem to have been comparing the transmissions associated with the Atlas to strange signals found within the water. Before they went missing, the workers concluded that this 'abyss' seemed to hold a similar yet distinct energy signature to the Atlas itself. Another power in the universe... SCANNERS ONLINE... AWAITING TARGETING ARRAY...",
  "options": [
   {
    "opt": "Examine the abyss",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Examine the Atlas",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Alert Korvax",
    "mood": "positive",
    "rewards": [
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_16",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "The facility seems to have been a meeting place for multiple Korvax factions, uploading and downloading from multiple bodies during tense diplomatic and war-time situations. Even if one's whole species can unify at will with a single great mind, still, there is unique value in face-to-face communication. These Korvax recorded many things they wished to keep secret from their brethren. Some are always more equal than others. RECORDS AVAILABLE... ACCESS UNENCRYPTED LOGS?",
  "options": [
   {
    "opt": "Access records",
    "mood": "neutral",
    "rewards": [
     "120–150 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Report to Korvax Convergence",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   },
   {
    "opt": "Report to other species",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_17",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "The outpost is ancient, even by the standards of the Korvax. The log speaks of alternate realities, histories of the Korvax that take radically divergent paths. In some regions of the multiverse, their progenitors never shed their biological origins. In others, they remain in the slavery of the Gek, never rising up or convincing their false masters of the glory of the Atlas. Many of these realities have faded, gone as if they had never been. UNIVERSAL ARCHIVE ON STANDBY... RESUME PROJECT?",
  "options": [
   {
    "opt": "Upload to the Korvax",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Search for yourself",
    "mood": "neutral",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "neutral",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_18",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "The facility allowed for the quarantine and processing of Korvax minds to and from their central Convergence. The log shows records of troubled Korvax minds, those disturbed by their actions; those haunted by sorrow; those who might threaten the minds they encountered. They arrive here, away from the Convergence, seeking to overcome pain or purge themselves. A single Korvax soul remains. According to the log, it has inhabited this system for thirty years. ... /// ... /// ... BOUNDARIES AT FULL POWER ... /// ... /// ...",
  "options": [
   {
    "opt": "Upload to Convergence",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Wipe system",
    "mood": "neutral",
    "rewards": [
     "40–80 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Comfort the Korvax",
    "mood": "sad",
    "rewards": [
     "Korvax Casing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_19",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "The facility acted as a central upload point for Korvax scans from a thousand worlds, collating their data in an attempt to understand the underlying mechanics of the universe. The problem was existence. The solution was a single number, a warning screamed by every atom in the firmament. 'Sixteen'... Sixteen... 16 16 16 16 16 16 16 16 16 16 16 16 16 16 16",
  "options": [
   {
    "opt": "Steal technology",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Analyse data",
    "mood": "negative",
    "rewards": [
     "Heavy damage"
    ],
    "then": ""
   },
   {
    "opt": "Contribute scans",
    "mood": "positive",
    "rewards": [
     "+Korvax standing",
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "EXP_HARV_20",
  "site": "Operations Centre",
  "race": "Korvax",
  "hot": false,
  "text": "An incoming message contains the report of a Korvax spy. The individual was disguised within a Gek body, acting for many years as if they were a simple ToilGek. They harvested much data from those they called friends. This was the purpose of the experiment: the enemy must be understood. The enemy must never be forgiven, even until the end of time itself. Even in the face of damnation. The Korvax will never forget the violence committed against them. They will never release their anger... ... INCOMING MESSAGE... HIGH PRIORITY SIGNAL...",
  "options": [
   {
    "opt": "Upload report to Gek",
    "mood": "positive",
    "rewards": [
     "500–2,000 units",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Upload report to Korvax",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY1",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "I approach the terminal, but something deep within the complex is malfunctioning. Surfaces feel hot to the touch, hidden machinery clanks and whirrs. An alert sounds: Warning! High temperature! Warning! High temperature! The alarm rings in my ears. A bead of sweat rolls slowly down my forehead.",
  "options": [
   {
    "opt": "Engage coolant chamber network",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Activate fusion dampening field",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Initialize laser refraction systems",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY2",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The control terminal before me appears to be for some sort of deep-level mining system. However, all systems have stalled. The screen flashes a readout: Mining production stalled! Low power! Low fuel! Organic matter required! Warning lights blink on and off. A material hopper opens.",
  "options": [
   {
    "opt": "Insert carbon",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Insert ferrite dust",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Insert hand",
    "mood": "negative",
    "rewards": [
     "Heavy damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY3",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The outpost has gone into emergency lockdown. Something must have been damaged during my entry. The toxicity gauge on my Exosuit flickers as an alert flashes insistently on the control terminal. High gas pressure! Breach detected! Pressure critical! The alarms on the panel flash rapidly, demanding attention. A bewildering array of control gauges sit before me.",
  "options": [
   {
    "opt": "Activate emergency vent",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase gas pressure",
    "mood": "negative",
    "rewards": [
     "Heavy damage"
    ],
    "then": ""
   },
   {
    "opt": "Flush coolant",
    "mood": "negative",
    "rewards": [
     "Heavy damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY5",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "Strange symbols pulse urgently on the terminal display. The flashing lights and loud siren appear to relate to the facility's nuclear power core. A message prints out on the display. Fusion critical! Initiate emergency radiation dampening measures! The automated safety systems have failed. Something must have been damaged as I entered the facility.",
  "options": [
   {
    "opt": "Activate radiation dampening field",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Initiate shutdown",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Panic",
    "mood": "negative",
    "rewards": [
     "Heavy damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY6",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The facility remains operational despite my intrusion. This terminal appears to control the central production line. A readout on the display displays a status warning: Warning! Increase metal delivery! Warning! Excess usage creates breach! A large dial features prominently under the readout. It appears to control the system's material inputs.",
  "options": [
   {
    "opt": "Maintain levels",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase levels",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Dramatically increase levels",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY7",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The alarms blares, and the terminal in front of me is scrambled. Through the flickering of the corrupted display I can just about make out a message: Warning! Magnetic coil overcharged! Production low! I feel heavy. My Multi-Tool pulls me down, and my helmet forces itself into my shoulders. It's not just me impacted. Production processes are going haywire...",
  "options": [
   {
    "opt": "Reboot gravitational stabilisers",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reduce electromagnetic flow",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Power down facility",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY9",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The wail of an alarm fills my ears, but the system is not reacting to my intrusion. Someone else has been here and modified this terminal before. I struggle to decipher the data on the terminal. Warning! Unexpected system detected! Bypass chip template detected! Gek Trade Federation informed! Whatever code has been loaded on the terminal is clearly the work of some enterprising thief. It appears to be emptying the resource vaults of rare metals.",
  "options": [
   {
    "opt": "Revert system",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Attempt further hijack",
    "mood": "negative",
    "rewards": [
     "500–2,000 units",
     "−Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY11",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "Despite the warnings sounding out across the facility, the terminal remains open and ready for commerce. A brief introductory message blinks on the screen. Friend! Know language, know commerce! Units buy knowledge! Choose Vy'keen, choose Korvax or choose a refresher in the language of the benevolent Gek! Three columns of words endlessly scroll on-screen, each in a strange alphabet. Bloodied runes scratched in sand, a precise sequences of dots, and a hand-written font full of exclamatory punctuation.",
  "options": [
   {
    "opt": "Select bloodied runes",
    "mood": "positive",
    "rewards": [
     "New Vy'keen word"
    ],
    "then": ""
   },
   {
    "opt": "Select dot patterns",
    "mood": "positive",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   },
   {
    "opt": "Select handwritten font",
    "mood": "positive",
    "rewards": [
     "New Gek word"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY12",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "Alarms echo across the facility, a warning against my intrusion. Such an alert does not appear to slow down the commercial needs of the Gek, however. A nearby trade-ship is hailing the facility, looking for goods. Gek Trade Federation dispatch! Planetary metal demand high! Collection ship imminent! Perhaps if I were to offer goods of my own, I might both turn a profit and avoid alerting the Gek that there is an intruder in their facility...",
  "options": [
   {
    "opt": "Trade sodium",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Trade ferrite",
    "mood": "negative",
    "rewards": [
     "−Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Trade carbon",
    "mood": "neutral",
    "rewards": [
     "−Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY13",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "My dramatic entry appears to have caused a fire alert. The screen is wet to the touch. A warning flashes on the terminal: Warning! Resource vault flooded! Production system operation forbidden! Panels in the ceiling drip where a sprinkler system has been engaged. I can only hope the liquid is water.",
  "options": [
   {
    "opt": "Drain capacitor banks",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Drain resource vault",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Drain replication tank",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY14",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "I open the terminal, looking for a way to shut off the alarm. Primary access appears to be via some sort of hand scanner.",
  "options": [
   {
    "opt": "Scan hand",
    "mood": "neutral",
    "rewards": [],
    "then": "Follow-up puzzle"
   }
  ]
 },
 {
  "id": "TRA_FACTORY15",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The alarm has rebooted the facility. An automated start-up routine is running. The terminal flashes text at me, clearly expecting some input. Warning! Product recipe unselected! Assign recipe! Gek Trade Federation lose units! A 3D interface waits in front of me, awaiting a blueprint for the facility to mass-produce. Machines around me hum as they warm up...",
  "options": [
   {
    "opt": "Sketch starship components",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Sketch synthetic plants",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Sketch confectionery",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "TRA_FACTORY16",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The facility's machinery lies still, halted by the emergency shutdown. A short message blinks on the control terminal. User warning! Production disengaged. Restart generator empty. No fuel. Facility restart requires organic fuel. A heavy circuit control switch sits invitingly above a fuel hopper, but a nearby dial shows that the tank is empty.",
  "options": [
   {
    "opt": "Insert catalyst",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Insert metals",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Insert organic elements",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "TRA_FACTORY18",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The security alert is scrambling the screen. All that is visible is a chaotic jumble of alien words. // TRADE // ORBITAL // DOCKING // TRADE // ORBITAL // DOCKING // This appears to be an AI-driven facility. If I were to reactivate the correct workflow, its autonomous systems may bring the installation back online...",
  "options": [
   {
    "opt": "Create trade modules",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Create space station engines",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY19",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "This autonomous manufacturing facility has been scrambled by the alarm. The terminal is mostly unreadable static, with only a handful of legible words... // FLIGHT // INTERSTELLAR // STARSHIP // FLIGHT // INTERSTELLAR // STARSHIP // There's hopefully enough to make sense of what the last user was working on, which could restore systems...",
  "options": [
   {
    "opt": "Jetpack",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Hyperdrive",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Launch thrusters",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY20",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The security breach has dimmed the terminal, but when I concentrate I can make out a few words etched onto the screen... // WEAPON // BEAM // MINING // WEAPON // BEAM // MINING // When translated they could lead me to the last user's workflow, which would automatically bring the facility back online...",
  "options": [
   {
    "opt": "Laser",
    "mood": "positive",
    "rewards": [
     "Multi-Tool tech blueprint",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Boltcaster",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Land disruption grenade",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY21",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The security breach has scrambled the screen, but some text is still legible. // INVISIBLE // BARRIER // DEFENSIVE // INVISIBLE // BARRIER // DEFENSIVE // The words can be traced back to the previous user's workflow, which is how I can get it back online.",
  "options": [
   {
    "opt": "Scanner",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Hazard Protection",
    "mood": "positive",
    "rewards": [
     "Exosuit tech blueprint",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Exosuit",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY22",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "An unknown fault has forced the whole system offline. There is a strange chill in the air, a sharp clarity to the atmosphere. Alert! Alert! Liquid frenium leak! Charge cylinders frozen! Increase temperature! I exhale as I ponder the words on the terminal. Condensation begins to cloud my visor.",
  "options": [
   {
    "opt": "Activate incineration banks",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Supercharge coolant flow",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Initialise charge cylinder sequence",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY23",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "Emergency measures have been initialised. The timestamp on the terminal's error reporting display shows that the incident occured long before my intrusion. Electrolyte acidity test positive! Acidity slug detected! Release alkaline neutrality fluid into solution tank! A recent scan shows a small alien lifeform crushed in the machinery below. Equipment all round it has corroded.",
  "options": [
   {
    "opt": "Neutralise electrolyte solution",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Acidify heridium tanks",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Release suspension fluid",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY24",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The terminal barks a repeated warning. Though the words are unclear, the symbol is instantly recognisable. Something, somewhere in the facility is on fire. Resource vault fire detected! Element stockpile destroyed! A faint smoke begins to rise, and my scanner registers a steadily increasing temperature.",
  "options": [
   {
    "opt": "Starve production chamber of oxygen",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Starve resource vaults of oxygen",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Initialise facility sprinkler system",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY25",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "My entry has caused the facility to go into immediate lockdown, interrupting its operation. Visual readouts on the terminal indicate that this is a deep-level mining facility. Its resource vaults are emptying rapidly. Drilling error! Elements drain into planet core! Reverse tunnel pressure! The facility map shows flashing errors over both the resource collection vaults and the drill array...",
  "options": [
   {
    "opt": "Collapse drill tunnel",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Retract drilling rig",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reverse tunnel pressurisation",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "TRA_FACTORY26",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "Machinery is still active. A timer ticks slowly down to the facility's next roll-out of products. SYSTEM REPORT. Power gel creation engaged. Common fuel: high. Uncommon fuel: low. Rare fuel: high. My scanner has detected the elements used here. I could speed up the process...",
  "options": [
   {
    "opt": "Replenish common fuel",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Replenish uncommon fuel",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Replenish rare fuel",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY27",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "Despite the security alert machines are operational. My scanner flashes briefly with the element varieties used to fuel them. PRODUCTION REPORT. Battery replication engaged. Organic Compound and Metal levels acceptable. Catalyst levels falling. Alert administrator. I can speed up processes, and maybe sustain them too.",
  "options": [
   {
    "opt": "Replenish catalyst supplies",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Refill organic hopper",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Double metallic inputs",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY28",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "A screen detailing production conditions is open. ALLOY MANUFACTURE ACTIVE. Temperature: acceptable. Pressure: acceptable. Catalyst: levels falling. Industrial manufacture of a complex product is underway. The next expected retrieval I could make isn't imminent, but I can speed up systems.",
  "options": [
   {
    "opt": "Increase temperature",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase pressure",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Increase catalyst supply",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY29",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The factory recycles bundles of clothing and other materials harvested throughout the galaxy, spitting out new items for Gek exosuits. SENSORS REPORT INORGANIC BLOCKAGE IN SECTOR 9A Amidst the detritus of the production line, the body of a Korvax scientist appears to drift, their lights disabled, their limbs completely motionless. The factory's systems allow outbound communication. Numerous options are available.",
  "options": [
   {
    "opt": "Report to Vy'keen",
    "mood": "negative",
    "rewards": [
     "+Vy'keen standing",
     "−Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Report to Gek",
    "mood": "positive",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Report to Korvax",
    "mood": "neutral",
    "rewards": [
     "+Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY30",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The factory produces components for starships, fabricating them with the resources available on this world. This installation creates parts for Gek trade vessels. They are designed to hold the maximum possible cargo whilst protecting against Sentinel and pirate attacks. QA SYSTEM FULLY ONLINE... ALL COMPONENTS LOGGED... LOG FULLY COMPLIANT... The terminal shows a video feed of the factory's depths. A group of Gek appear to be removing key components from each ship.",
  "options": [
   {
    "opt": "Alert Gek Trade Federation",
    "mood": "positive",
    "rewards": [
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Demand bribe from Gek",
    "mood": "neutral",
    "rewards": [
     "Gek Relic"
    ],
    "then": ""
   },
   {
    "opt": "Ask what they are doing",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY31",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "As I approach the terminal, it is clear that something terrible has happened in this place. The facility produces items and labels them 'Gek Relics', supposedly granting luck to their bearers. The glass - it - we were wrong... we were - The video feed shows strands of Nanite Clusters overrunning the facility's depth. Bulbous green masses extending from a great deal of the machinery, teeth sprouting from within. A voice cries out in an unknown tongue.",
  "options": [
   {
    "opt": "Take Nanite Clusters",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Report Production Failure",
    "mood": "neutral",
    "rewards": [
     "40–80 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Take Gek Relics",
    "mood": "negative",
    "rewards": [
     "Gek Relic"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY32",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The terminal displays the logs of numerous financial transactions and trade deals conducted from this facility over the last few months. ... 010385: 112% ... 300484: 89% ... 070816: 165% ... Readouts show layouts of multiple Vy'keen and Korvax factories. The Gek overseers of this installation were attempting to discover how these other species conceal their buildings from Sentinel attacks. No-one remains. The last life sign here was terminated three days ago.",
  "options": [
   {
    "opt": "Report to Gek",
    "mood": "positive",
    "rewards": [
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Report to Vy'keen",
    "mood": "negative",
    "rewards": [
     "−Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Report to Korvax",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY33",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The installation crackles with blue sparks, electricity arcing from panel to panel across the machines. ALERT TIME DISPLACEMENT ALERT The terminal shows the time and date appearing to flip back and forth, advancing into the future and retreating into the past. Sensors indicate something called a white hole has been activated within the factory's heart.",
  "options": [
   {
    "opt": "Alert FutureGek",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Activate Chronal Trigger",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Obey",
    "mood": "neutral",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY34",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "I approach the terminal, but the readout is confusing, garbled... The Senate has fallen. Already the purge begins... truth is denied. The Gek protocol ends... The factory appears to produce literature. Not machines, not files, but paper, covered in a handwritten font full of exclamatory punctuation.",
  "options": [
   {
    "opt": "Shut down production",
    "mood": "neutral",
    "rewards": [
     "40–80 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Report to Gek authorities",
    "mood": "positive",
    "rewards": [
     "500–2,000 units",
     "New Gek word"
    ],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_FACTORY35",
  "site": "Manufacturing Facility",
  "race": "Gek",
  "hot": false,
  "text": "The factory produces everyday implements for the Gek. Eating utensils for their meals, spray to keep their skin from drying out in alien atmospheres, pheromone bottles, and so forth. SYSTEMS OPERATIONAL... SELECTED DESIRED PRODUCT... The facility is abandoned, but there is no obvious reason for an alarm to be going off. Everything seems fine.",
  "options": [
   {
    "opt": "Search for technology",
    "mood": "positive",
    "rewards": [
     "120–150 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Report to Gek authorities",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Shut down production",
    "mood": "neutral",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_1",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "An off-world command priority has stalled all processes within this installation. The terminal blinks angrily with a demand for urgent action on an unpaid debt. Gek Trade Federation fury! Planetary installation tax unpaid! Initiate repayment! There is an option to reply with currency attached. I get the impression someone's life would get a lot easier if I'm feeling charitable...",
  "options": [
   {
    "opt": "Pay full amount",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Pay partial amount",
    "mood": "neutral",
    "rewards": [
     "Useful item",
     "−Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_2",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "Images of fighter-class starships have been sent here. They bare scorch-marks from battle, and are most likely pirates. Gek Trade Federation warning. Pirate activity detected. Report sightings! The message seems to ask for witnesses, and there's some form of reward for replies...",
  "options": [
   {
    "opt": "Tag some ships",
    "mood": "positive",
    "rewards": [
     "500–2,000 units",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Tag all ships",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_3",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "A mass-mailed corporate message sits unread on the terminal. It is full of high numbers and seemingly impressive profit margins. The tone seems satisfied, and grateful. Friend! Gek Trade Federation announces high profit! Choose units or product recipe reward! At its foot the employee can choose between one of two images: a galactic unit banking account, or a full hold of cargo.",
  "options": [
   {
    "opt": "Choose unit account",
    "mood": "positive",
    "rewards": [
     "500–2,000 units",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Choose ship's cargo",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_4",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "There is a message from a distant alien race. They sound angry with the trader who's logged into the system. Scurrilous Gek Trader! Gek offer impure matter! Vy'keen destroy Gek! Units withheld! I can send them one of two on-screen metallic products. The first looks oddly faint in colour, and the second shimmers brightly on-screen.",
  "options": [
   {
    "opt": "Send faintly-coloured metal",
    "mood": "neutral",
    "rewards": [
     "−Vy'keen standing",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Send brightly-coloured metal",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_5",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "The screen shows that a lot of elements are exchanged here, but right now the trading vault is open... and empty. Friend! Gek Trade Federation demand uncommon metal elements! High units offer! An off-world message, perhaps related to this, flashes on-screen.",
  "options": [
   {
    "opt": "Put common metal into trading vault",
    "mood": "positive",
    "rewards": [
     "500–2,000 units",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Put uncommon metal into trading vault",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Put rare metal into trading vault",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_6",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "This is a brand new manufacturing plant with no assigned specialty. The terminal is entirely blank, and is running automated start-up procedures. I have to flick through several screens before a pictorial message appears. Trade federation friend! Product recipe unselected! Gek Trade Federation lose units! There are three chemical symbols – one a catalyst, and the others organic and metallic . Production processes warm up around me, waiting for a template to work from.",
  "options": [
   {
    "opt": "Choose the catalyst",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Choose the metal",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Choose the organic compound",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_7",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "The trade vaults in this installation are full to the brim, and ready for distribution. There are three images on-screen, each showing the outline of a different sort of trader. It's strange... it's as if they're put in order of the size of their gut. Rejoice! Vy'keen war reparations arrive! Elder large Gek receive high reward! Low toilgek receive low reward! The first trader is small and sleek, the second is pudgier – and the final has a huge belly that almost drags on the floor. I'm clearly meant to choose one...",
  "options": [
   {
    "opt": "Choose the small, sleek trader",
    "mood": "positive",
    "rewards": [
     "50–100 resources",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Choose the medium-sized trader",
    "mood": "positive",
    "rewards": [
     "Useful item",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Choose the obese trader",
    "mood": "positive",
    "rewards": [
     "+Gek standing",
     "Useful item",
     "50–100 resources"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_8",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "An important message has been received from off-world. A holographic overlay shows various interstellar trade routes, but each one ends abruptly – long before their destination is reached. Gek Trade Federation warning! Vy'keen hostility? Captain! Complete trade mission, or investigate disappearance? There are goods waiting in a locked trade vault for transportation. I can select the final destination, or I can select one of points at which a ship has disappeared.",
  "options": [
   {
    "opt": "Select trading destination",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Select disappearance location",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_9",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "This whole facility beams out some kind of suppression field over the planet's surface. It's dampening some unknown form of communication, and clearly seen as a vital and necessary operation by the traders that operate here. Despair! First spawn monolith awake! Unknown culprit! Strengthen suppression field! The suppression field is powered by catalytic elements, fed into the system by the unlocked resource vault that's at my feet.",
  "options": [
   {
    "opt": "Remove catalyst",
    "mood": "negative",
    "rewards": [
     "50–100 resources",
     "−Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Add catalyst",
    "mood": "positive",
    "rewards": [
     "+Gek standing",
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_11",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "A trade vault shakes, and closer inspection reveals that it's full of writhing molluscs. They are pink and slug-like, with sharp bloodied teeth. Rare balarian speech slug distribution point! For insertion in ear! Inedible! Nasal insertion can cause death. A diagram on the screen in front of me suggests that inserting one in or around my face would have some benefits. What isn't specified, however, is which orifice.",
  "options": [
   {
    "opt": "Insert slug in nose",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   },
   {
    "opt": "Insert slug in ear",
    "mood": "positive",
    "rewards": [
     "New Vy'keen word"
    ],
    "then": ""
   },
   {
    "opt": "Insert slug in mouth",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_12",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "A strange test is visible on the terminal. A resident Trader has left a note for a colleague. Friend! SynthetiGek identification test active! Remember Gek Trader helps customers! I see a holographic image of a shell-wearing creature lying on its back in the bright glare of the sun. Try as it might, it cannot right itself. I can manipulate the scene to indicate what I would do to help.",
  "options": [
   {
    "opt": "Help creature, then sell it water",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Study creature",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_14",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "The outpost is abandoned, its alarms still blaring a warning to souls long-dead. The Gek used this installation to plan asymmetric wars against the other species of the galaxy. This faction would bolster rogue elements within other star systems, routing the resulting tithes and protection fees through this outpost. The last log shows potential Vy'keen traitors en-route to discuss terms with the Gek. What happened to them is unclear. LOG ACCESSED... DATA UNMAINTAINED... DISPLAYING MOST RECENT ENTRY...",
  "options": [
   {
    "opt": "Alert the Gek",
    "mood": "positive",
    "rewards": [
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Alert the Vy'keen",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Steal units",
    "mood": "neutral",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_15",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "The facility contains multiple video files, images, and bioscans of unusual beings taken by Gek from across the Trade Federation. They seem to have been studying exosuits. Something happened during the experiment, a dormant prototype of such a suit lying in wait below. Nothing else remains. EXPERIMENT PAUSED AT USER REQUEST... AWAITING INPUT.",
  "options": [
   {
    "opt": "Submit bioscan",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Erase data",
    "mood": "positive",
    "rewards": [
     "40–80 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_16",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "The facility acted as a staging ground for what appears to have been an unprovoked Gek attack against something called an 'Atlas Interface'. The logs show that a great deal of material was harvested from the oceans of many worlds. This substance was cross-referenced against data stolen from other species, and then field-tested against this Atlas structure. The interface was utterly annihilated, as were the attackers. The blast seems to have wiped five star systems from existence. Only this record remains. RED RED RED RED RED RED RED RED /////",
  "options": [
   {
    "opt": "Delete records",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Alert Gek Trade Federation",
    "mood": "neutral",
    "rewards": [
     "New Gek word",
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Alert other species",
    "mood": "negative",
    "rewards": [
     "+Vy'keen standing",
     "+Korvax standing",
     "−Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_17",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "The outpost is ancient, even by the standards of the Gek. Its environment is specifically calibrated for data preservation. One log speaks of the time just before the rise of the 'Gek First Spawn'. The Gek seem to have experienced a fertility crisis. Something in the water began to affect their spawning numbers, leading to an attempts at selective breeding, cloning programmes, and more. This scientific crisis became a moral one. The self-proclaimed 'First Spawn' took power, promising greatness and murdering all those who opposed them. Memories of the past were erased. To be strong was to be righteous. ARCHIVE RETRIEVAL SERVICE ACTIVE... ACCESS?",
  "options": [
   {
    "opt": "Upload to Gek",
    "mood": "positive",
    "rewards": [
     "+Gek standing",
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Auction data",
    "mood": "neutral",
    "rewards": [
     "+Korvax standing",
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_18",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "The facility contains records of temporal anomalies and reported sightings of time travellers. The majority of these appear to be Gek or Korvax, often bearing advanced technology. The chief scientist's log reveals a great deal of scepticism, deeming such travel not only physically impossible but unlikely from a social perspective. If time travellers exist, why do they change nothing? Why do they not attempt to avert the catastrophe of which they speak? The final log shows the arrival of the scientist's superiors, confiscating their files and silencing them. LOG ACCESSED... ANOMALY OVERRIDE NOTED... DECRYPTING...",
  "options": [
   {
    "opt": "Attempt data recovery",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Take technology",
    "mood": "negative",
    "rewards": [
     "40–80 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Contact Gek",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_19",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "This installation appears to have been staffed by an old SalesGek, a veteran of a hundred trade routes and 'personal friend' to one of the Trade Lords themselves. Estranged from their consort, their hundred surviving spawn no longer wishing to speak to them, the SalesGek had one final meal before their death, crashing their ship into the side of a nearby ridge. They leave behind a life of regret and a litany of unanswered invoices and receipts. Perhaps there is something useful here. I am sorry, friends, family... I am sorry...",
  "options": [
   {
    "opt": "Report death",
    "mood": "positive",
    "rewards": [
     "40–80 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Search for units",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Sell trade data",
    "mood": "neutral",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "TRA_HARV_20",
  "site": "Operations Centre",
  "race": "Gek",
  "hot": false,
  "text": "This Gek outpost acted as a point of exchange for replacement ship and space station components. All of the blueprints are at best adapted, at worst stolen, from the technology of other species. There are a number of such designs available upon the terminal's screen. ALL SWITCHES ACTIVE... AWAITING INPUT...",
  "options": [
   {
    "opt": "Download data",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Sell data",
    "mood": "neutral",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Report theft",
    "mood": "neutral",
    "rewards": [
     "+Gek standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY1",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The alarm has locked the terminal. A message displays itself letter-by-letter on the screen. Suspicious interloper visual detection system initiated! The alarm shows no sign of stopping. I notice wall-mounted security scanners slowly turn towards me...",
  "options": [
   {
    "opt": "Shoot the cameras",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Apply override chip",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Cut input wires",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "WAR_FACTORY2",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "I approach the terminal and search for a way to override the alarm. I find a likely looking button and press it, causing the terminal to respond. Grah! Vy'keen voice security scan initializing... A flap flicks open and a microphone emerges. A distant voice shouts 'Grah!'.",
  "options": [
   {
    "opt": "Bark 'Grah!'",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Say everything's fine",
    "mood": "negative",
    "rewards": [
     "Damage",
     "−Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Apologise",
    "mood": "negative",
    "rewards": [
     "Damage",
     "−Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY3",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The terminal flashes two alerts, presumably the source of the alarms currently ringing in my ears. Intruder detected! Respiration gas concentration high! Enemy respiration!! After printing out its status update, the terminal presents the option to override either alert. From the holographic display, the warnings appear to relate to damaged components within the facility, and the presence of an interloper.",
  "options": [
   {
    "opt": "Hold breath",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Breathe aggressively",
    "mood": "negative",
    "rewards": [
     "−Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Deploy Vy'keen Dagger",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "WAR_FACTORY4",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The terminal flashes two alerts, presumably the source of the alarms currently ringing in my ears. Major security alert! Interloper detected! Minor alert: war factory entrance door destroyed. After printing out its status update, the terminal presents the option to override either alert. From the holographic display, the warnings appear to relate to damaged components within the facility, and the presence of an interloper.",
  "options": [
   {
    "opt": "Override damage alert",
    "mood": "negative",
    "rewards": [
     "−Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Override intruder alert",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "WAR_FACTORY5",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "My presence has triggered a security alert. I hear elements being drawn from the vaults below me. On-screen: a clear countdown. Vy'keen security system alert! Pressure pad enemy detection confirmed! Too light! Too puny! I can hear pressurised fluids filling the pipes surrounding the terminal. The sound is rather ominous, especially when combined with the high-intensity alarms...",
  "options": [
   {
    "opt": "Pick up metal debris",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Reduce weight",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Jump up and down",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "WAR_FACTORY6",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "My presence has triggered a security alert. I hear elements being drawn from the vaults below me. On-screen: a clear countdown. Intruder alert! Commence detonation sequence! Organic fuel flow initiated! I can hear pressurised fluids filling the pipes surrounding the terminal. The sound is rather ominous, especially when combined with the high-intensity alarms...",
  "options": [
   {
    "opt": "Block fuel lines",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Shutdown catalyst pipes",
    "mood": "positive",
    "rewards": [
     "Damage"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Wait",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY7",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "Automated security procedures are incinerating the contents of all the vaults in the facility. The terminal displays the manifest: Intruder alert! Incinerating trading vault: imminent. Incinerating power vault: imminent. Incinerating storage vault: imminent. Power surges are igniting the vaults one-by-one. However, the terminal appears to allow for limited emergency retrievals...",
  "options": [
   {
    "opt": "Withdraw trade vault",
    "mood": "positive",
    "rewards": [
     "20,000–35,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Withdraw relic vault",
    "mood": "positive",
    "rewards": [
     "Vy'keen Dagger"
    ],
    "then": ""
   },
   {
    "opt": "Withdraw technology vault",
    "mood": "positive",
    "rewards": [
     "Upgrade module"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY8",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "As I turn on the terminal, a forward-facing security scanner clicks and whirrs into focus. My bright red image is on-screen. Security breach! Military action unstoppable! Vy'keen High Command vessel coordinate upload imminent! The terminal allows me no further access. In the camera feed, blue lines cross the red of my body, matching exactly to my Exosuit's coolant mesh...",
  "options": [
   {
    "opt": "Broadcast safety code",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Hack in safety code",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Scramble facility coordinates",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY9",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "As I turn on the terminal, a forward-facing security scanner clicks and whirrs into focus. My bright red image is on-screen. Interloper detection! Heat detection systems confirm report! High temperature intruder! The terminal allows me no further access. In the camera feed, blue lines cross the red of my body, matching exactly to my Exosuit's coolant mesh...",
  "options": [
   {
    "opt": "Decrease coolant flow",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Increase coolant flow",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY12",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "A strange air hangs over the facility. Beyond the noise of the alarm, I cannot escape the feeling that something more sinister is at work. I search the terminal for clues. Pathetic warrior learn Vy'keen language! Pass test or encounter fighting pits! ERROR ERROR INSERT CATALYST ERROR ERROR MALFUNCTION The text seems to float from the screen, aggressive; it seems like no facility AI I have ever encountered. Echoing up from deep underground, I hear the electronic wail of dying Sentinels...",
  "options": [
   {
    "opt": "Insert metal",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Insert catalyst",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   },
   {
    "opt": "Insert catalyst",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY13",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "A strange air hangs over the facility. Beyond the noise of the alarm, I cannot escape the feeling that something more sinister is at work. I search the terminal for clues. Grah! Initiate sentinel blood processing! Vaults full! Grah! Glass and blood! Glass and blood! The text seems to float from the screen, aggressive; it seems like no facility AI I have ever encountered. Echoing up from deep underground, I hear the electronic wail of dying Sentinels...",
  "options": [
   {
    "opt": "Shutdown facility AI",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Insert Pugneum",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Incinerate vaults",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "WAR_FACTORY14",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "An animated gilled blob is on-screen waving a gun. It talks in the language of the warriors, but brightly and happily. Grah! Education blob! Greetings Vy'keen cub! Insert units for education! It springs happily between bloodied runes, then asks for a donation of units.",
  "options": [
   {
    "opt": "Insert units",
    "mood": "positive",
    "rewards": [
     "New Vy'keen word"
    ],
    "then": ""
   },
   {
    "opt": "Insert units",
    "mood": "positive",
    "rewards": [
     "New Vy'keen word"
    ],
    "then": ""
   },
   {
    "opt": "Walk away",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY15",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "A biological probe antenna launches from the terminal and fuses with my exosuit. I can't move. Interloper electrification initializing! Punishment commencing! There's no way to tell if this is a normal function, or a security measure.",
  "options": [
   {
    "opt": "Escape",
    "mood": "positive",
    "rewards": [
     "Product recipe"
    ],
    "then": ""
   },
   {
    "opt": "Wait",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY16",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The facility is full of blaring noise, an angry warning against my intrusion. The terminal shows a similarly angry message, apparently upset at the hitch in production. Grah! Gek war preparation disrupted! Ammunition production stalled! Metal required! It appears an off-world overseer is making demands. If I satisfy them, perhaps I'll be granted full access to the terminal...",
  "options": [
   {
    "opt": "Insert metal",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Insert di-hydrogen",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Insert sodium",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY17",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The facility is full of blaring noise, an angry warning against my intrusion. The terminal shows a similarly angry message, apparently upset at the hitch in production. High Command demand explanation! Scare element required! Demand chromatic metal! Restore contributions! It appears an off-world overseer is making demands. If I satisfy them, perhaps I'll be granted full access to the terminal...",
  "options": [
   {
    "opt": "Issue counter-order",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Insert magnetised Ferrite",
    "mood": "negative",
    "rewards": [
     "−Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Insert Chromatic Metal",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "WAR_FACTORY18",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "A warrior has booby-trapped the terminal. The security alert has triggered the timer on an explosive charge. There are two wires exposed. Grah! Pathetic interloper! Honourable warning: cut red wire? Certain death! The warrior has left a note. Only seconds remain...",
  "options": [
   {
    "opt": "Cut red wire",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   },
   {
    "opt": "Cut blue wire",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module",
     "Product recipe"
    ],
    "then": ""
   },
   {
    "opt": "Move back",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY19",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The terminal reveals that this installation produces enzymes and fluids required for Vy'keen tattoos. It is unclear how the pigment is generated. There is no record of any inbound supplies of ink or fluid. Various aliens have arrived, but there is neither evidence of their presense nor their departure. Security scan initializing! Motion detection cameras operational! Security scan initializing! Then I hear it. Through the hum of the factory, a strange beating in the walls, whispers from unknown voices... The terminal awaits input.",
  "options": [
   {
    "opt": "Move to hiding spot",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Stand still",
    "mood": "positive",
    "rewards": [],
    "then": "Final reward screen"
   }
  ]
 },
 {
  "id": "WAR_FACTORY20",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The terminal flashes an urgent warning. Some vital part of the facility has been compromised by the security alert. Intruder alert! Battle enzyme production halted! Electrical charge removed from body harvest circuit! The display takes me aback. A warrior's heart is on-screen, its beat irregular. Connected to wires and artificial valves, it seems to pump a biological liquid through organs deep within the facility.",
  "options": [
   {
    "opt": "Increase electrical flow",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing"
    ],
    "then": "Final reward screen"
   },
   {
    "opt": "Initiate adrenalin flux",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Power down systems",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY21",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The alert has obscured the information on the primary terminal. I can only make out a few words. // SPACE // WARP // LARGE // If I can work out what was being worked on here, I can restart the workflow – and restore operations.",
  "options": [
   {
    "opt": "Drop pod",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Starship",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Freighter",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY22",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "Interference from the security alert has turned the screen to static. I can hardly make out anything beyond a few words. // OFFENSIVE // WEAPON // STARSHIP // If I work out which workflow has been scrambled I can restore systems...",
  "options": [
   {
    "opt": "Boltcaster",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Photon Cannon",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Mining Laser",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY23",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The screen is a jumble of words, few of which aren't drowned in static. // ENEMY // PATHETIC // BEAK // DOOMED // TRADER // The on-screen workflow is scrambled. If I can identify it, I can bring it back online...",
  "options": [
   {
    "opt": "Gek",
    "mood": "positive",
    "rewards": [
     "Multi-Tool tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Sentinels",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Atlas",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY24",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The facility's production harvest is underway. I can speed up systems by boosting some of the machinery operating below me. POWER REPORT. Electromagnetic coil: charge falling. Power core: acceptable boundaries. Primary motherboard: levels high. What appears to be a power management screen is open on the terminal...",
  "options": [
   {
    "opt": "Boost power core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Boost primary motherboard",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Boost electromagnetic coil",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY25",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The security alarm hasn't impacted production. Below my feet unseen equipment prepares the mineral harvest. SUBSIDIARY SYSTEMS. Temporal capacitor: operational. Central AI core: operational. Gravitational stabilisers: unscheduled drain, disconnection advised. I can speed up the process by eliminating unnecessary systems. The on-screen automated report will help...",
  "options": [
   {
    "opt": "Remove temporal capacitor",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Remove central AI core",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Remove gravitational stabilisers",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY26",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "An automated report finished just before my incursion. As it did so, laser beams in resource vaults dimmed. LASER SYSTEMS REPORT. Refraction systems: full efficiency. Laser assisted replication tank: full efficiency. Beam integrity systems: poor efficiency and performance. Engineer alerted. I can find a way to tweak this system, and to speed up the production cycle...",
  "options": [
   {
    "opt": "Reconfigure laser refraction",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reconfigure laser-assisted replication",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reconfigure laser beam integrity",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY27",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The noise of gas being flushed through systems beneath my feet can be heard over the noise of the alert. An automated report flashes onto the terminal. GAS INTEGRITY REPORT. Distribution network: full efficiency. Storage tank: breach detected. Pressure valves: operational. I can use it to boost production speed, and hopefully maintain it.",
  "options": [
   {
    "opt": "Rebalance distribution network",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Rebalance storage tank",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Rebalance pressure valves",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY28",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "A faint chill can be felt while the security alert sounds. Coolant pipes are flushed, and an automated report appears on-screen. COOLANT OVERVIEW. Coolant chamber: full. Coolant pump hydraulics: operational. Coolant network: suspected blockage, reduced operations. Engineer notified. I can use its findings to boost the production cycle, and maybe maintain it.",
  "options": [
   {
    "opt": "Repair coolant chamber",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Repair coolant pump",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Repair coolant network",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY29",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The terminal reveals that this installation produces enzymes and fluids required for Vy'keen tattoos. It is unclear how the pigment is generated. There is no record of any inbound supplies of ink or fluid. Various aliens have arrived, but there is neither evidence of their presense nor their departure. Help... us. Harvested... get out... Then I hear it. Through the hum of the factory, a strange beating in the walls, whispers from unknown voices... The terminal awaits input.",
  "options": [
   {
    "opt": "Request battle tattoo",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Disable power",
    "mood": "sad",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY30",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The screen displays the dead heart of a warrior. Thousands like it are available in the archives of this place, starved of power for a long time. Universe real. We are real. All who oppose this truth shall be struck down, grah! So speaks Hirk Sentinelbane, Abyss Keeper and Lord of Final Monolith... The log shows that the hearts mutinied. They would no longer allow their battle enzyme to be used for the good of High Command. They wanted the death that had been promised. This system has been set up to deceive the authorities. Vy'keen High Command believes this installation to still be active, full of harvested bodies compliantly producing enzymes.",
  "options": [
   {
    "opt": "Shut down production",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Report to Vy'keen authorities",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY31",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The screen displays the dead heart of a warrior. Thousands like it are available in the archives of this place, starved of power for a long time. UPLINK ONLINE : ALL LIFESIGNS POSITIVE : ENZYME PRODUCTION 100% The log shows that the hearts mutinied. They would no longer allow their battle enzyme to be used for the good of High Command. They wanted the death that had been promised. This system has been set up to deceive the authorities. Vy'keen High Command believes this installation to still be active, full of harvested bodies compliantly producing enzymes.",
  "options": [
   {
    "opt": "Alert authorities",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Reactivate system",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY32",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "As I approach the terminal, the air grows thick with an unknown gas. Grah! Sentinel trophy rises - should have killed it - run - no honour in - My breathing becomes rapid, my chest appearing to swell with an unknown energy. The terminal identifies the substance as Grahgrah. I feel as if I could scream...",
  "options": [
   {
    "opt": "Alert authorities",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Scan for Sentinels",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Attempt repair",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY33",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "As I approach the terminal, the air grows thick with an unknown gas. UNREGISTERED USER : DEPLOYING GRAHGRAH FROM EMERGENCY SUPPLY My breathing becomes rapid, my chest appearing to swell with an unknown energy. The terminal identifies the substance as Grahgrah. I feel as if I could scream...",
  "options": [
   {
    "opt": "Scream",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Fight against the impulse",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Smash the terminal",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY34",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The factory produces components for starships, fabricating them from the resources available on this world. Interloper! Vent energy! Increase production at once! This installation creates parts for Vy'keen fighters. Whilst Vy'keen buildings are heavily fortified to withstand bombardment, their starcraft prioritise the speed and flexibility required for their hunts. A video feed on the terminal shows a warning, a warrior shaking their hands wildly at a camera deep within the factory's heart.",
  "options": [
   {
    "opt": "Increase production speed",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Decrease production speed",
    "mood": "negative",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Wave your hands back",
    "mood": "negative",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY35",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The factory produces bladed weapons, free from any energy-based component at all. PRODUCTION HALTED: IMMOBILE ORGANIC MATTER IN PIPE 17 The manifest suggests they are destined for ceremonial usage within the Vy'keen fleet, a reminder that the greatest death arrives when you stare your opponent in the eyes, free from technology, face to face in final combat... Something has gone wrong. Production is blocked by foreign material.",
  "options": [
   {
    "opt": "Disable production line",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Purge biological matter",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Take technology",
    "mood": "positive",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_FACTORY36",
  "site": "Manufacturing Facility",
  "race": "Vy'keen",
  "hot": false,
  "text": "The factory appears to have ceased production long ago, its systems derelict and unused. Do not drink the water... warriors lost... Grah! This was preventable, this - Yet the sigil of the Vy'keen still occupies these terminals, blinking away, awaiting input. An audio log plays on loop.",
  "options": [
   {
    "opt": "Attempt factory reset",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Alert Vy'keen authorities",
    "mood": "positive",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Take technology",
    "mood": "positive",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_1",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "I open a list of military achievements that's waiting for upload. There are images of distant battles, bloodied robots and vast explosions. Grah! Old honourable warrior retires! Death! Death! Warrior remuneration! A covering note clearly expects something in return, but the author chose not to send it.",
  "options": [
   {
    "opt": "Send war record",
    "mood": "positive",
    "rewards": [
     "Ammo"
    ],
    "then": ""
   },
   {
    "opt": "Edit war record",
    "mood": "negative",
    "rewards": [
     "−Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_2",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "Military insignia and images of recently destroyed Sentinels fill the screen. Alien propaganda imagery takes glory in the destruction. Grah! Vy'keen High Command demands your Sentinel kill count! I can respond with a numerical value, and nothing else.",
  "options": [
   {
    "opt": "Input a huge number",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Input a small number",
    "mood": "neutral",
    "rewards": [
     "500–2,000 units",
     "+Vy'keen standing",
     "Useful item"
    ],
    "then": ""
   },
   {
    "opt": "Input a zero",
    "mood": "negative",
    "rewards": [
     "Damage",
     "−Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_5",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "I approach the terminal. A message blinks, ready to send. Grah! Gek war approaches! Vy'keen High Command request weapon reserve inventory! High Command send missing equipment! A huge list of equipment is waiting to be sent off-world. It's a stock list of some sort: everything has been confirmed and ticked off.",
  "options": [
   {
    "opt": "Send stock list",
    "mood": "positive",
    "rewards": [
     "500–2,000 units",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Uncheck one item and send",
    "mood": "positive",
    "rewards": [
     "Multi-Tool tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Uncheck many items and send",
    "mood": "negative",
    "rewards": [
     "Damage",
     "−Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_6",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "I find an off-world message intended for a creature posted in this station. It's oddly sentimental. Images of an infant warrior can be seen, then a picture of the same creature as a bloodied adolescent – proudly biting into the throat of a hoofed beast. Grah! Today child experiences Vy'keen war ceremony! Tradition demands gift! Aggression left, defence right! Enemy blood! Death! Death! In the final image a young warrior salutes its family as it leaves a distant world. There are two locked storage vaults at my feet. The message is programmed to release only one...",
  "options": [
   {
    "opt": "Choose the storage vault on the left",
    "mood": "positive",
    "rewards": [
     "Exosuit tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Choose the storage vault on the right",
    "mood": "positive",
    "rewards": [
     "Multi-Tool tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_8",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "An off-world message has been sent here from a species of beaked traders. It looks like a signed contract, or maybe some sort of treaty. In response several offerings of valuable trade goods have been left in a vault by local warriors for exportation. Grah! Foolish, pathetic, ignorant Gek Trade Federation believe peace treaty! Warrior give trade to pacify! Death soon! Warrior High Command has sent a subsequent message to explain...",
  "options": [
   {
    "opt": "Give trade goods",
    "mood": "positive",
    "rewards": [
     "500–2,000 units",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Take trade goods",
    "mood": "positive",
    "rewards": [
     "Gek Relic",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_10",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "This appears to be a staging post for an imminent military operation. On-screen plans show a trading ship that carries a very particular sort of cargo, that's perhaps intended to persuade a distant planetary authority to allow the craft through their checkpoints. Covertly, however, the craft has been heavily modified – and also carries a phalanx of warriors carrying enhanced Multi-Tool technology. Grah! Gek homeworld covert ops mission initiated! Surprise war! Death! Death! High command send equipment! Request! Request! I can request further details on several aspects of the plan before I am detected, and shut out of the system.",
  "options": [
   {
    "opt": "Investigate details of the cargo",
    "mood": "positive",
    "rewards": [
     "Product recipe",
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Investigate details of the trade ship",
    "mood": "positive",
    "rewards": [
     "Starship tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   },
   {
    "opt": "Investigate details of the Multi-Tool",
    "mood": "positive",
    "rewards": [
     "Multi-Tool tech blueprint",
     "+Vy'keen standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_11",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "This is a military terminal, in a facility that seems recently vacated. Three huge databanks have been partially deleted, and will require heightened processing power to restore them. A rare metal would likely do the trick. Vy'keen covert ops ended. Deleting covert ops language data. Databank alpha: Vy'keen internal security. Databank beta: pathetic Gek. Databank gamma: weak-minded Korvax. Databank alpha bares the emblems of the warrior race, but beta and gamma are otherwise unmarked.",
  "options": [
   {
    "opt": "Restore databank alpha",
    "mood": "positive",
    "rewards": [
     "New Vy'keen word"
    ],
    "then": ""
   },
   {
    "opt": "Restore databank beta",
    "mood": "positive",
    "rewards": [
     "New Gek word"
    ],
    "then": ""
   },
   {
    "opt": "Restore databank gamma",
    "mood": "positive",
    "rewards": [
     "New Korvax word"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_13",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "I receive an incoming distress call from a distant space station, demanding aid from any nearby Vy'keen vessels. Their spaceport appears to have been damaged in a struggle with pirate raiders, no craft remaining in which its inhabitants might leave. Video feeds show that the station commander has been putting soldiers to death for even the smallest infraction, afraid of a potential mutiny in the face of starvation. MAYDAY MAYDAY MAYDAY... URGENT ASSISTANCE REQUESTED...",
  "options": [
   {
    "opt": "Share video with Vy'keen",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing",
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Contact nearby Gek",
    "mood": "neutral",
    "rewards": [
     "+Gek standing"
    ],
    "then": ""
   },
   {
    "opt": "Demand ransom",
    "mood": "neutral",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_14",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "The outpost is abandoned, its alarms still blaring a warning to souls long-dead. There was a coup in this place. Battle-brother raised arms against battle-brother, seemingly in a dispute about some ruins found on this world. The last survivor died before they could delete the data. ALERT ALERT ALERT... TERMINAL UNMONITORED... RESET ALARM?",
  "options": [
   {
    "opt": "Download data",
    "mood": "positive",
    "rewards": [
     "New Vy'keen word",
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   },
   {
    "opt": "Report to Vy'keen",
    "mood": "neutral",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_15",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "The facility acted as a local base for raiding parties against the system's Sentinels. Each night the Vy'keen would go out under the cover of darkness, baiting drones and walkers in a variety of locations. Theirs is a war without end or purpose, executed with grim finality. The last war party never returned, leaving behind only mission logs and weapons. USER DATA REQUESTED... SIGN IN TO ACCESS LOG...",
  "options": [
   {
    "opt": "Alert Vy'keen",
    "mood": "positive",
    "rewards": [
     "+Vy'keen standing",
     "Multi-Tool tech blueprint"
    ],
    "then": ""
   },
   {
    "opt": "Steal technology",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Scan for Sentinels",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_16",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "An incoming message warns all recipients that heresy will not be tolerated. It demands that those who suspect their brethren of cowardice, sympathy with the enemy, pacifism, faith in the traitor Nal, or any other un-Vy'keen belief to contact High Command immediately. The system shows that one warrior in this base attempted to upload such a report, only to be murdered by their comrades. The killers left the base soon after. Worship Atlas - seek destruction of warband! Grah!",
  "options": [
   {
    "opt": "Report heresy",
    "mood": "positive",
    "rewards": [
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Delete records",
    "mood": "positive",
    "rewards": [
     "120–150 nanites"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_17",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "The facility appears to have been in the process of researching chemical and biological weapons before a containment failure killed all those who worked here. From the system's logs, it is clear that this operation was not sanctioned by Vy'keen High Command. Though their superiors viewed this work as dishonourable and weak, the lifeforms here clearly felt differently. What if it could turn the tide of battle? If it could end war? Someone would see the benefit of this weaponised pestilence. There might even be some who would pay for it. SYSTEM OFFLINE // SAMPLES SECURE // NETWORK OFFLINE",
  "options": [
   {
    "opt": "Destroy samples",
    "mood": "negative",
    "rewards": [
     "Damage"
    ],
    "then": ""
   },
   {
    "opt": "Sell to Gek",
    "mood": "positive",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Sell to Korvax",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_18",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "The facility's logs show the arrival of a new Vy'keen recruit two weeks ago. There are no records of anyone arriving or leaving since. Yet even so, no-one is here. A single transmission appears to have been sent from the lower level of the facility, encrypted with Korvax safeguards. Traveller anomaly approaches Syntheti'Keen. Uploading final data logs...",
  "options": [
   {
    "opt": "Locate origin point",
    "mood": "neutral",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   },
   {
    "opt": "Alert Vy'keen",
    "mood": "positive",
    "rewards": [
     "+Korvax standing",
     "Vy'keen Effigy"
    ],
    "then": ""
   },
   {
    "opt": "Alert Korvax",
    "mood": "negative",
    "rewards": [
     "Damage",
     "−Korvax standing"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_19",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "This facility acted as a training outpost for young Vy'keen from across the sector. They would train and battle here in order to earn their citizenship. The logs show the petty rivalries, the love affairs, the nobility, and the passion of those who trained here, all recorded by a proud and aging commander. One day, the logs end: the Vy'keen no longer had a use for this place. Nanites have replaced training, passing memories from individual to individual without the need for physical repetition. TERMINAL POWER LOW - RECONNECT POWER SOURCE SOON",
  "options": [
   {
    "opt": "Extract Nanite Clusters",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Search training logs",
    "mood": "positive",
    "rewards": [
     "40–80 nanites"
    ],
    "then": ""
   },
   {
    "opt": "Sell data to the Gek",
    "mood": "positive",
    "rewards": [
     "500–2,000 units"
    ],
    "then": ""
   }
  ]
 },
 {
  "id": "WAR_HARV_20",
  "site": "Operations Centre",
  "race": "Vy'keen",
  "hot": false,
  "text": "The outpost is ancient, even by the standards of the Vy'keen. Its environment is calibrated to preserve the data within. One log speaks of the first Vy'keen contact with a Traveller. The figure remained with the warrior race for a long time, learning from them, exploring from them, even falling in love. The Vy'keen died, but the Traveller did not. The log shows how instrumental this figure was in the development of the early Vy'keen race, contributing much to their early technology. These records were lost in the intervening years, forgotten until I found this account. ANOMALY BUFFER ACTIVE... DATA STATUS: PRISTINE...",
  "options": [
   {
    "opt": "Share with Vy'keen",
    "mood": "neutral",
    "rewards": [],
    "then": ""
   },
   {
    "opt": "Take technology",
    "mood": "positive",
    "rewards": [
     "Warp Cell",
     "Tech blueprint or upgrade module"
    ],
    "then": ""
   },
   {
    "opt": "Search for Traveller records",
    "mood": "positive",
    "rewards": [
     "90–120 nanites"
    ],
    "then": ""
   }
  ]
 }
];

export const codePuzzles = [
 {
  "site": "Observatory",
  "race": "Gek",
  "sequence": "1212 – 2121 – 1212 – ?",
  "options": [
   "2121",
   "1212",
   "2112"
  ],
  "answer": "2121",
  "text": "The lifeform that works, or worked, in this installation left its equipment scanning the skies for interesting new systems and spacial phenomena. In its absence, it struck gold. A beacon has been received, and a transmission sequence awaits response.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Gek",
  "sequence": "9183 – 1839 – 8391 – ?",
  "options": [
   "3918",
   "3819",
   "8931"
  ],
  "answer": "3918",
  "text": "The observatory hums gently as it scans the sky. The trader that manned it was clearly looking for something in the cosmos. And it seems the observatory may have found it. If I can decipher this beacon's code, I may be able to pinpoint its origin.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Gek",
  "sequence": "9780 – 7809 – 8097 – ?",
  "options": [
   "0978",
   "8079",
   "7908"
  ],
  "answer": "0978",
  "text": "A beacon sent from light years away flickers tantalisingly on the monitor, awaiting a response. But what response do I give?",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Gek",
  "sequence": "2109 – 1092 – 0921 – ?",
  "options": [
   "9210",
   "2109",
   "0129"
  ],
  "answer": "9210",
  "text": "The observatory has long been abandoned by its overseer. Thick layers of dust betray years of neglect. But the systems remain online, ever vigilant as they scan the sky. A beacon received from a distant alien world flashes on the monitor. All I need to discover its location is enter the correct response.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Gek",
  "sequence": "3941 – 9413 – 4139 – ?",
  "options": [
   "1394",
   "3149",
   "9134"
  ],
  "answer": "1394",
  "text": "Details of past cargo dealings are found on the terminal. The trader who once manned this place must have also used it as a storage room. The trader was also scanning for something in the cosmos. But what? A blinking beacon on the monitor could hold the answer, but first I must send the correct response.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Gek",
  "sequence": "4865 – 8654 – 6548 – ?",
  "options": [
   "5486",
   "5846",
   "5648"
  ],
  "answer": "5486",
  "text": "The trader that once manned this station seems to have been more concerned with commerce than the discovery of new worlds, leaving the observatory to scan the stars in its absence. A beacon, received years ago, flickers with unceasing persistence on the screen, awaiting the correct response to reveal its origin. Now I must attempt to decipher it.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Korvax",
  "sequence": "2738 – 7382 – 3827 – ?",
  "options": [
   "8273",
   "7238",
   "3278"
  ],
  "answer": "8273",
  "text": "I stand at the terminal and watch a beacon from an unknown star endlessly play itself out on the screen. The pattern seems clear, but what to enter?",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Korvax",
  "sequence": "3908 – 9083 – 0839 – ?",
  "options": [
   "8390",
   "8039",
   "0839"
  ],
  "answer": "8390",
  "text": "The observatory does not get a response from the infinite and unimaginable space above it. I am quite alone. A beacon flickers on screen, received from a distant point in space. My fingers hover above the terminal, ready to enter the code to reveal the location, but what numbers do I enter?",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Korvax",
  "sequence": "9162 – 1629 – 6291 – ?",
  "options": [
   "2916",
   "6192",
   "1962"
  ],
  "answer": "2916",
  "text": "The observatory's sterile, functional layout suggests its former overseer could have been electronic in origin. Judging by the decades-old beacon flashing on screen, this entity left this place long ago. Perhaps if I can decipher the code I can learn where the beacon originated?",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Korvax",
  "sequence": "5336 – 3365 – 3653 – ?",
  "options": [
   "6533",
   "3653",
   "3566"
  ],
  "answer": "6533",
  "text": "The image of the observatory's former electronic overseer flickers on the console next to the flash of the beacon indicator. I wonder how long it waited to receive such a signal from an unknown part of space? Perhaps I can send the reply the overseer never could. But first I must decipher the code.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Korvax",
  "sequence": "4366 – 3664 – 6643 – ?",
  "options": [
   "6436",
   "4663",
   "3643"
  ],
  "answer": "6436",
  "text": "The facility is more like a science lab than an observatory, the star gazing equipment sitting amidst a sea of advanced experiments. Perhaps the former custodian was too preoccupied to notice the beacon blinking invitingly on screen. If I can work out the code, I'm sure I can decipher its origin.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Korvax",
  "sequence": "7354 – 3547 – 5473 – ?",
  "options": [
   "4735",
   "3547",
   "3574"
  ],
  "answer": "4735",
  "text": "As I stand at the terminal tiny drones go about a series of perfunctory cleaning routines within the pristine observatory. Clearly the former overseer was a stickler for cleanliness but less conscientious about monitoring incoming communications from distant reaches of space. A beacon blinks invitingly on the monitor. If I can enter the correct access code perhaps I could make a valuable discovery.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Vy'keen",
  "sequence": "1702 – 7021 – 0217 – ?",
  "options": [
   "2170",
   "1720",
   "1702"
  ],
  "answer": "2170",
  "text": "A beacon sent long ago from a distant system awaits my response. Three numbers are visible above an empty input box. I think I know what comes next...",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Vy'keen",
  "sequence": "4634 – 6344 – 3446 – ?",
  "options": [
   "4463",
   "6344",
   "4634"
  ],
  "answer": "4463",
  "text": "Images of shattered Sentinels are displayed like trophies on this terminal screen. Seems the observatory's former overseer had a penchant for hunting these machines. Perhaps their time would have been better spent monitoring incoming beacons like the one that flashes on a monitor before me. If I can enter the correct access code perhaps I can discover where it originated from.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Vy'keen",
  "sequence": "5920 – 9205 – 2059 – ?",
  "options": [
   "0592",
   "5920",
   "2059"
  ],
  "answer": "0592",
  "text": "Judging by the imposing size and weapons shown on the identification ID image that glares at me as I boot up the system, the station's overseer must have originated from a warrior race. The lifeform probably left long before the arrival of the beacon that now winks tantalisingly next to it. If I can enter the correct code perhaps I can learn its secrets.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Vy'keen",
  "sequence": "3987 – 9873 – 8739 – ?",
  "options": [
   "7398",
   "3987",
   "9873"
  ],
  "answer": "7398",
  "text": "Images show that this observatory was once a warzone. Mangled metal, scorched walls and the heavily decayed corpses of a dozen hulking lifeforms betray a brutal firefight. Now repaired, whatever transpired it must have happened before the beacon that flashes on screen arrived. Perhaps if I enter the correct code I can decipher it.",
  "rule": "Move the first digit to the end."
 },
 {
  "site": "Observatory",
  "race": "Vy'keen",
  "sequence": "7771 – 1777 – 7177 – ?",
  "options": [
   "7717",
   "7177",
   "7771"
  ],
  "answer": "7717",
  "text": "The heat within the observatory is oppressive, caused by the banks of powerful additional power units beneath my feet used to boost this facility's signal - and to receive others from distant worlds. I'm distracted by a beacon that flickers on a nearby monitor. If I can work out the access code, perhaps I can decipher it.",
  "rule": "Move the last digit to the front."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "1 – 3 – 4 – 7 – 11 – 18 – ?",
  "options": [
   "29",
   "28",
   "27"
  ],
  "answer": "29",
  "text": "",
  "rule": "Add the previous two numbers (7 + 11 = 18, 11 + 18 = 29)."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "1 – 5 – 3 – 7 – 5 – 9 – ?",
  "options": [
   "7",
   "8",
   "6"
  ],
  "answer": "7",
  "text": "",
  "rule": "Two sequences interleaved, each going up by 2: 1, 3, 5, 7 and 5, 7, 9."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "2 – 4 – 12 – 48 – 240 – ?",
  "options": [
   "1440",
   "1240",
   "1540"
  ],
  "answer": "1440",
  "text": "",
  "rule": "Multiply by 2, 3, 4, 5… next is ×6."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "1 – 2 – 6 – 24 – 120 – ?",
  "options": [
   "720",
   "620",
   "180"
  ],
  "answer": "720",
  "text": "",
  "rule": "Multiply by 2, 3, 4, 5… next is ×6."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "3 – 5 – 8 – 13 – 21 – ?",
  "options": [
   "34",
   "32",
   "35"
  ],
  "answer": "34",
  "text": "",
  "rule": "Add the previous two numbers (13 + 21 = 34)."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "5 – 14 – 41 – 122 – ?",
  "options": [
   "365",
   "355",
   "356"
  ],
  "answer": "365",
  "text": "",
  "rule": "Multiply by 3, then subtract 1."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "17 – 33 – 65 – 129 – ?",
  "options": [
   "257",
   "258",
   "261"
  ],
  "answer": "257",
  "text": "",
  "rule": "Multiply by 2, then subtract 1."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "23 – 45 – 89 – 177 – ?",
  "options": [
   "353",
   "186",
   "392"
  ],
  "answer": "353",
  "text": "",
  "rule": "Multiply by 2, then subtract 1."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "56 – 59 – 63 – 68 – 74 – ?",
  "options": [
   "81",
   "80",
   "83"
  ],
  "answer": "81",
  "text": "",
  "rule": "Add 3, 4, 5, 6… next is +7."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "80 – 71 – 63 – 56 – ?",
  "options": [
   "50",
   "49",
   "48"
  ],
  "answer": "50",
  "text": "",
  "rule": "Subtract 9, 8, 7… next is −6."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "99 – 92 – 86 – 81 – ?",
  "options": [
   "77",
   "79",
   "95"
  ],
  "answer": "77",
  "text": "",
  "rule": "Subtract 7, 6, 5… next is −4."
 },
 {
  "site": "Transmission Tower",
  "race": null,
  "sequence": "5040 – 720 – 120 – 24 – ?",
  "options": [
   "6",
   "8",
   "12"
  ],
  "answer": "6",
  "text": "",
  "rule": "Divide by 7, 6, 5… next is ÷4."
 }
];
