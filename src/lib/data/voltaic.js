// Voltaic Staff multi-tools. Source: No Man's Sky community wiki — "Multi-Tool Catalogue - Voltaic Staff", "Voltaic Staff",
// "Autophage Synthesis Terminal", "Void Mote" and "They Who Returned" pages, Nov 2026.

// Type bonus ranges (+%) by class.
export const staffStats = [
  { cls: 'S', damage: [25, 50], mining: [10, 15], scan: [40, 50] },
  { cls: 'A', damage: [20, 30], mining: [5, 10], scan: [35, 45] },
  { cls: 'B', damage: [15, 25], mining: [5, 10], scan: [30, 35] },
  { cls: 'C', damage: [10, 20], mining: [0, 5], scan: [20, 25] },
];

// Parts sold at Autophage Synthesis Terminals and Harmonic Interfaces (price in Void Motes).
// The Voltaic set is unlocked free as blueprints during the Autophage questline.
export const staffSets = [
  { set: 'Voltaic (quest set)', note: 'Blueprints are rewarded by "Audience with the Autophage" — craft these for free.', parts: [
    { name: 'Concentric Transducer', slot: 'Head', price: null },
    { name: 'Atlantideum Chamber', slot: 'Core', price: null },
    { name: 'Fiberglass Grip', slot: 'Pole', price: null },
  ] },
  { set: 'Havoc', parts: [
    { name: 'Havoc Coil', slot: 'Head', price: 999 },
    { name: 'Havoc Core', slot: 'Core', price: 646 },
    { name: 'Havoc Lance', slot: 'Pole', price: 333 },
  ] },
  { set: 'Radiant', parts: [
    { name: 'Radiant Heart', slot: 'Head', price: 999 },
    { name: 'Radiant Chamber', slot: 'Core', price: 646 },
    { name: 'Radiant Bore', slot: 'Pole', price: 333 },
  ] },
  { set: 'Reclaimed', note: 'The only set with two heads. Recycled Pole is assumed to belong to it.', parts: [
    { name: 'Reclaimed Head', slot: 'Head', price: 999 },
    { name: 'Reclaimed Claw', slot: 'Head', price: 999 },
    { name: 'Reclaimed Grip', slot: 'Core', price: 646 },
    { name: 'Recycled Pole', slot: 'Pole', price: 333 },
  ] },
  { set: 'Runic', parts: [
    { name: 'Runic Focus', slot: 'Head', price: 999 },
    { name: 'Runic Core', slot: 'Core', price: 646 },
    { name: 'Runic Beam', slot: 'Pole', price: 333 },
  ] },
  { set: 'Salvaged', parts: [
    { name: 'Salvaged Aerator', slot: 'Head', price: 999 },
    { name: 'Salvaged Battery', slot: 'Core', price: 646 },
    { name: 'Salvaged Staff', slot: 'Pole', price: 333 },
  ] },
];

export const staffParts = staffSets.flatMap((s) => s.parts.map((p) => ({ ...p, set: s.set })));

export const staffFacts = [
  'A combat-type multi-tool: high damage and scanner bonuses, low mining bonus. Between 17 and 30 slots.',
  'Every crafted staff comes with a Polyphonic Core pre-installed.',
  'Built from three parts — a Head, a Core and a Pole — at an Autophage Synthesis Terminal (in hidden Autophage Camps) or a Harmonic Interface (at Harmonic Camps).',
  'Parts can be mixed freely across sets; the Core and Pole are purely cosmetic apart from tiny stat variation.',
  'The staff stays visible on your back in third-person, and other players can see it in the Space Anomaly (it can’t be used there).',
  'Each terminal only sells some of the parts (at least 6), so you may need to visit several camps for a full set.',
];

export const unlockSteps = [
  { step: 'Finish The Purge (Artemis Path).', detail: 'If "New Beginnings" is in your log, this is done.' },
  { step: 'Get an Echo Locator.', detail: 'Fight Dissonance Resonators (the tall mining pillars) on a planet with "Dissonance Detected", or kill Corrupted Sentinel Quads.' },
  { step: 'Lift the seal at a Harmonic Camp.', detail: 'Use the Echo Locator, then solve the 3-equation glyph puzzle at the Harmonic Interface. See POI Puzzles.', link: '/poi-puzzles?harmonic' },
  { step: 'Warp to any other system in your starship.', detail: 'Your ship reports an error — this starts "They Who Returned". (If a freighter battle triggers, warp again.)' },
  { step: 'Meet the damaged Autophage.', detail: 'Offer Atlantideum (not nanites or Pugneum). Then offer Atlantideum at the Discordant Interface on the Korvax Monolith it marks.' },
  { step: 'Return to the Harmonic Camp.', detail: 'Enter the three glyphs matching the numbers the Autophage head says. You get the Scan Harmoniser blueprint.' },
  { step: 'Visit Nada on the Space Anomaly.', detail: 'Show Atlantideum to the Assembled Construct; Nada gives two parallel missions.' },
  { step: 'Complete "Audience with the Autophage".', detail: 'Build the Polyphonic Core, find three Autophage camps in different systems and earn their favour. Rewards the three Voltaic part blueprints — you can now craft a staff.' },
  { step: 'Complete "Prayers of the Machine" and the rest of the questline.', detail: 'Needed to finish They Who Returned, which ends with an Atlas encounter (you’ll need your staff).' },
];

export const staffMechanics = [
  { title: 'The head decides class and colour', text: 'The Head is the main factor in the staff’s class and colour scheme. Core and Pole barely matter. Seven heads exist: Radiant, Runic, Reclaimed Head, Reclaimed Claw, Salvaged, Havoc and the base (Voltaic) head.' },
  { title: 'Each terminal has a fixed “primary” result', text: 'For a given head, a terminal always shows the same class and colours the first time you assemble in a session.' },
  { title: 'Where you stand gives a “secondary” result', text: 'Your position around the terminal changes a second, independent result. It is unlocked by assembling twice in one menu session (method below), and changes every time you step away and re-open the menu.' },
  { title: 'Economy matters', text: 'S-class odds are believed to follow the same rules as starships: strong (★★★) economies and pirate systems are best.' },
  { title: 'Previewing is free', text: '“Assemble” only shows a preview — parts are spent only when you confirm. Decline to keep your parts.' },
  { title: 'Results are per galaxy', text: 'A terminal’s results are the same for everyone in the same galaxy, so shared coordinates only work if you’re in that galaxy.' },
];

export const secondarySteps = [
  'Open the staff assembly menu.',
  'Put any Head in and click Assemble.',
  'Go back to the parts view without closing the menu.',
  'Swap in a different Head and click Assemble.',
  'Go back to the parts view again.',
  'Put the original Head back and click Assemble — this is the secondary result. Every assembly for the rest of this menu session uses the secondary pool.',
  'To reroll it: close the menu fully, take at least one step in any direction, and repeat.',
];

export const huntSteps = [
  'Collect as many different Heads as you can — ideally all seven.',
  'Travel to a pirate or strong (★★★) economy system.',
  'Find an Autophage Camp with a Synthesis Terminal (use the Polyphonic Core; reveal it with the Scan Harmoniser).',
  'Preview every Head’s primary result with Assemble — nothing is spent.',
  'For each Head, unlock the secondary result, then step to a new spot around the terminal and try again.',
  'When an S-class staff with a colour you like appears, confirm the assembly.',
  'No luck after a thorough search? Try another terminal or camp — several can exist on one planet.',
];

export const voidMoteSources = [
  { source: 'Autophage missions', amount: '200–600 per mission' },
  { source: 'Scrapping an Atlas multi-tool at a Multi-Tool Decommissioning Terminal', amount: '100–5,400' },
  { source: 'Wheelbarrows of scrap around Harmonic Camps', amount: 'Occasional' },
];

export const unconfirmed = 'One player reported that the class of the multi-tool you have equipped while assembling may affect the staff’s class. This hasn’t been verified and may conflict with the head + terminal + position model.';
