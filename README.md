<img src="assets/icon.svg" width="64" height="64" alt="">

# NMS Info

A clean, fast No Man's Sky reference — built because the Fandom wiki is hard to use mid-game.

- **Search everything** from any page (press `/` or `Ctrl+K`): items, pages, and Galactic Map economy names like "Booming" or "Alchemical".
- **One page per item** gathering where to buy it, settlement production, crafting tree, refiner recipes and what it's used for.
- Economies & trade goods, settlements, units & nanites, resources, 290+ refiner recipes, crafting/profit chains, stars & biomes,
  portals, points of interest with a searchable puzzle-answer guide, starships, exocraft, multi-tools, an X-class module roll guide, frigates and sentinels.

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
| `xmodules.js` | X-class vs S-class upgrade module roll ranges |
| `items.js` | Builds the cross-referenced item index (no data of its own) |

Data was compiled in November 2026 (Cosmos / 7.x era) from the No Man's Sky community wiki, plus player testing for
settlement production ("Settlement Math Part 4", Steam forums). Values may shift with game updates.

Unofficial fan project; not affiliated with Hello Games.
