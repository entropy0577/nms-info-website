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
- Economies & trade goods, settlements, units & nanites, resources, 350+ refiner recipes, crafting/profit chains, cooking, technology & blueprints, base building & power, stars & biomes,
  portals, points of interest with a searchable puzzle-answer guide, starships, exocraft, multi-tools, a Voltaic Staff guide, an X-class module roll guide, companions & Holo-Arena team optimiser, frigates & expeditions, and sentinels.

## Development

```sh
npm install
npm run dev       # local dev server
npm run build     # static site in dist/ (runs the data checks first)
npm run check     # data checks only
npm run generate -- <name|all> [--check]   # regenerate a generated data file from its source
npm run preview   # serve the built site
```

Built with Svelte 5 + Vite. It uses hash routing (`#/economies`) and relative asset paths, so `dist/` can be hosted on any
static host (GitHub Pages, Netlify, a plain folder) with no server configuration.

## Data

All game data lives in `src/lib/data/` as YAML — edit those files to correct or add information. Each top-level key in a
file becomes a named export (`import { dishes } from './data/cooking.yaml'`); a Vite plugin (`tools/vite-plugin-data.js`)
turns the YAML into plain JS at build time, so the browser never parses YAML. Code that derives things from the data lives
in `src/lib/` (e.g. `items.js`, `crafting.js`, `buffs.js`); build tooling lives in `tools/`.

Every build checks the data and stops with the file and line if anything is wrong: YAML mistakes, a record with a missing
or unknown field or a value of the wrong type (schemas in `tools/schemas.js`), and any recipe, cost, production row or
reward that names an item no data file defines (`tools/items-check.js` — the usual mistake after a game update renames
an item).

| File | Contents |
| --- | --- |
| `economy.yaml` | Economy types, trade goods, strengths, smuggled goods |
| `settlements.yaml` | Settlement production by species/building, buildings, tips |
| `resources.yaml` | Raw resources |
| `refiner.yaml` | Refiner recipes (generated from the wiki) |
| `crafting.yaml` | Crafting recipes and values |
| `explore.yaml` | Star colours, biomes, portal glyphs |
| `poi.yaml` | Points of interest, plaque/harmonic camp/terminal puzzles |
| `monoliths.yaml` | Monolith puzzle answers |
| `puzzles-generated.yaml` | Facility, observatory and transmission tower puzzles (generated from the wiki) |
| `gear.yaml` | Starships, exocraft, multi-tools, frigates, sentinels |
| `money.yaml` | Units and nanite methods, Suspicious Packets for X-class flipping |
| `ingest.yaml` | Nutrient Ingestor buff for every food and fish, with catch info and missing recipes (generated from the wiki) |
| `companions.yaml` | Holo-Arena affinities, battle stats, Egg Sequencer mutagens |
| `expeditions.yaml` | Frigate types, expedition rewards, boosters, fuel, traits, repairs |
| `expedition-rewards.yaml` | Frigate expedition reward pools from the game's reward table (generated) |
| `cooking.yaml` | Cooking recipes and raw ingredients (generated from the wiki); buff helpers live in `src/lib/buffs.js`, recipe trees in `src/lib/cooktree.js` |
| `tech.yaml` | Installable technology: cost, recharge, blueprint source (generated from the wiki) |
| `base.yaml` | Power generators, consumption, hotspots, production parts, specialists |
| `voltaic.yaml` | Voltaic Staff parts, prices, unlock steps and crafting mechanics |
| `xmodules.yaml` | X-class vs S-class upgrade module roll ranges |
| `items.yaml` | Items with no data of their own, extra item aliases, cooking recipe wildcards |

### Editing the data

1. Find the file in the table above and keep its layout (one-line `{…}` records for tables, one field per line for prose).
2. Quote text YAML would misread: times (`"9:00"`), number-like text (`"2121"`), text containing `: ` or ` #`, and —
   inside a one-line `{…}` or `[…]` — any text with a comma (`{note: "Gek, Korvax & Vy'keen"}`).
3. Run `npm run check` (or just `npm run dev`, which shows problems in the browser). Errors look like
   `src/lib/data/crafting.yaml:7 crafted[0].value: expected a whole number ≥ 0, got "800"`.
4. An unknown item name is usually a typo or a renamed item — fix it. If it's a real item that no file defines yet,
   add it to `otherItems` in `items.yaml`.
5. Update the `#` header at the top of the file with the source you used and the month/year.
6. Files marked *generated* are rebuilt by `npm run generate -- <name>`; put fixes for them in
   `tools/generate/corrections/<file>.yaml` (with a `why:`) instead of editing the data, or the next run loses them.

The full guide (where each kind of data lives, quoting rules, generators) is in [AGENTS.md](AGENTS.md#editing-data).

## Sources

Data was compiled in November 2026 (Cosmos / 7.x era). Values may shift with game updates.

- The [No Man's Sky community wiki](https://nomanssky.fandom.com/) (CC BY-SA) — most item, recipe, technology, POI and puzzle data.
- Player research: settlement production ("Settlement Math Part 4", Steam forums) and the Monolith answers Steam guide.
- Community Xeno Arena guides for creature battle mechanics and the affinity chart (sources are credited on that page).
- The game's expedition reward table, as extracted in [csakypeter/NMS-BetterRewards](https://github.com/csakypeter/NMS-BetterRewards).

Each page on the site names its own sources at the bottom.

Unofficial fan project; not affiliated with Hello Games.
