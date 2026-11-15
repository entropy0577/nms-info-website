<img src="assets/icon.svg" width="64" height="64" alt="">

# NMS Info

A clean, fast No Man's Sky reference — built because the Fandom wiki is hard to use mid-game.

**Live site:** https://entropy0577.github.io/nms-info-website/

> [!NOTE]
> **AI disclaimer:** this site was built with the help of an AI coding assistant (Claude, by Anthropic). The AI wrote most of the
> code and gathered, parsed and summarised the game data from the sources listed below. The work was directed and reviewed by a
> human, but AI-compiled data can contain mistakes or out-of-date values — check anything important in game, and please
> [open an issue](https://github.com/entropy0577/nms-info-website/issues) if you spot an error.

- **Search everything** from any page (press `/` or `Ctrl+K`): items, pages, and Galactic Map economy names like "Booming" or "Alchemical".
- **One page per item** gathering where to buy it, settlement production, crafting tree, refiner recipes and what it's used for.
- Economies & trade goods, settlements, units & nanites, resources, 290+ refiner recipes, crafting/profit chains, cooking, technology & blueprints, base building & power, stars & biomes,
  portals, points of interest with a searchable puzzle-answer guide, starships, exocraft, multi-tools, a Voltaic Staff guide, an X-class module roll guide, companions & Holo-Arena team optimiser, frigates & expeditions, and sentinels.

## Development

```sh
npm install
npm run dev       # local dev server
npm run build     # static site in dist/
npm run preview   # serve the built site
```

Built with Svelte 5 + Vite. It uses hash routing (`#/economies`) and relative asset paths, so `dist/` can be hosted on any
static host (GitHub Pages, Netlify, a plain folder) with no server configuration.

## Data

All game data lives in `src/lib/data/` as plain JS — edit those files to correct or add information:

| File | Contents |
| --- | --- |
| `economy.js` | Economy types, trade goods, strengths, smuggled goods |
| `settlements.js` | Settlement production by species/building, buildings, tips |
| `resources.js` | Raw resources |
| `refiner.js` | Refiner recipes (generated from the wiki) |
| `crafting.js` | Crafting recipes and values |
| `explore.js` | Star colours, biomes, portal glyphs |
| `poi.js` | Points of interest, plaque/harmonic camp/terminal puzzles |
| `monoliths.js` | Monolith puzzle answers |
| `puzzles-generated.js` | Facility, observatory and transmission tower puzzles (generated from the wiki) |
| `gear.js` | Starships, exocraft, multi-tools, frigates, sentinels |
| `money.js` | Units and nanite methods |
| `companions.js` | Holo-Arena affinities, battle stats, Egg Sequencer mutagens |
| `expeditions.js` | Frigate types, expedition rewards, boosters, fuel, traits, repairs |
| `expedition-rewards.js` | Frigate expedition reward pools from the game's reward table (generated) |
| `cooking.js` | Cooking recipes and raw ingredients (generated from the wiki) |
| `tech.js` | Installable technology: cost, recharge, blueprint source (generated from the wiki) |
| `base.js` | Power generators, consumption, hotspots, production parts, specialists |
| `voltaic.js` | Voltaic Staff parts, prices, unlock steps and crafting mechanics |
| `xmodules.js` | X-class vs S-class upgrade module roll ranges |
| `items.js` | Builds the cross-referenced item index (no data of its own) |

## Sources

Data was compiled in November 2026 (Cosmos / 7.x era). Values may shift with game updates.

- The [No Man's Sky community wiki](https://nomanssky.fandom.com/) (CC BY-SA) — most item, recipe, technology, POI and puzzle data.
- Player research: settlement production ("Settlement Math Part 4", Steam forums) and the Monolith answers Steam guide.
- Community Xeno Arena guides for creature battle mechanics and the affinity chart (sources are credited on that page).
- The game's expedition reward table, as extracted in [csakypeter/NMS-BetterRewards](https://github.com/csakypeter/NMS-BetterRewards).

Each page on the site names its own sources at the bottom.

Unofficial fan project; not affiliated with Hello Games.
