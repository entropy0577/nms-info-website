# AGENTS.md

Guidance for AI coding agents working on **NMS Info**, an unofficial No Man's Sky reference site.
Live at https://entropy0577.github.io/nms-info-website/ (repo: `entropy0577/nms-info-website`).

The site exists because the Fandom wiki is hard to use mid-game. Keep it **fast, clean, and easy to navigate**:
everything should be reachable from the sidebar or the global search, and every item has its own page.

## Commands

```sh
npm install
npm run dev       # dev server
npm run build     # static site in dist/ — must finish with no warnings (also runs the data checks)
npm run check     # data checks only: YAML syntax, schemas, item names (fast; run after every data edit)
npm run generate -- <name|all> [--check]   # regenerate a generated data file from its source (see "Generated files")
npm run preview   # serve dist/ (e.g. npx vite preview --host 127.0.0.1 --port 4173)
```

There is no test suite. After a change, run `npm run build` (treat any warning as a failure) and check the affected
pages in a browser, including at phone width (~390px) — no page may scroll sideways. The data checks are the
closest thing to tests: never weaken a schema or add to `otherItems` just to make a failing build pass — fix the data.

## Stack & architecture

- **Svelte 5 (runes) + Vite 8**, plain JavaScript, no framework router, no UI library, no runtime dependencies
  (`yaml` is a build-time dev dependency only; `tools/` is build/maintenance code that never ships).
- **Static, hash-routed SPA.** `src/lib/router.svelte.js` turns `#/path?anchor` into `route.path` / `route.query`.
  `?anchor` deep-links scroll to the element with that id (and some pages use it to preselect a tab/filter).
  `vite.config.js` uses `base: './'`, so `dist/` works from any sub-path (GitHub Pages) with no server config.
- **`src/App.svelte`** is the shell: top bar, sidebar, page area, previous/next links, footer. Pages are **lazy-loaded**
  via the `routes` map (`'/x': () => import('./pages/X.svelte')`). The loaded component, its `name` prop and key are
  swapped together in one `view` object — keep it that way, or an old page can render with the new route's props.
- **`src/lib/nav.js`** defines the sidebar groups and page order. The order also drives previous/next links, the home
  page tiles and the page entries in search.
- **`src/lib/item-index.js`** builds one cross-referenced index of every item from the data files (trade goods,
  resources, crafting, refiner, settlements, cooking, technology, `items.yaml`). It has no imports, so the same code runs
  in the browser (`src/lib/items.js`) and at build time. `src/pages/Item.svelte` renders `#/item/<name>` from it. Use
  `<ItemLink name=…>` anywhere an item is mentioned so it links to that page (ItemLink only loads the small alias table,
  `src/lib/canonical.js`).
- **Keep the data out of the app shell.** Every page is lazy-loaded, but the shell (search box, ItemLink) is on every
  page, so it must not import data files or `items.js`. The search box and the home page counts use two build-time
  modules from `tools/vite-plugin-data.js`: `virtual:nms-search` (names, kinds, aliases) and `virtual:nms-stats`. If the
  main `index-*.js` chunk grows past ~100 kB, something pulled data into the shell.
- **`src/lib/components/Search.svelte`** is the global search (`/` or Ctrl+K): pages, items, technology and Galactic Map
  economy names.
- Shared helpers: `src/lib/format.js` (`units`, `shortUnits`, `norm`), `src/lib/arena.js` (Holo-Arena scoring heuristics).

## Adding a page

1. Put the data in `src/lib/data/<topic>.yaml` (see the data format and rules below).
2. Create `src/pages/<Name>.svelte`. Start with an `<h1>` and a `<p class="lead">`; use `<OnThisPage>` for long pages;
   end with a `<p class="source">` naming the sources.
3. Register it in `nav.js` (with a short `blurb`) and in the `routes` map in `App.svelte`.
4. Add the data file to the table in `README.md`.
5. Add a schema for the new data file to `tools/schemas.js` (the build fails without one).
6. If the page has items, link them with `ItemLink`. If its data names items (costs, recipes, rewards), add those
   fields to `tools/items-check.js` so typos are caught, and make sure each item is defined somewhere (see below).

## Data: where things live

| What | Where |
| --- | --- |
| Game data (one file per topic) | `src/lib/data/<topic>.yaml` — data only, no code |
| Items with no data of their own, extra item aliases, recipe wildcards | `src/lib/data/items.yaml` |
| Trade good aliases ("5D Torus") | `src/lib/data/economy.yaml` `tradeGoodAliases` |
| Code that derives things from the data (indexes, totals, verdicts) | `src/lib/<topic>.js` (`items.js`, `crafting.js`, `economy.js`, `xmodules.js`, `buffs.js`, `cooktree.js`) |
| YAML → JS compiler, checks, search/stats modules | `tools/vite-plugin-data.js` |
| Schema for each data file (+ same-file consistency rules) | `tools/schemas.js` (building blocks in `tools/schema.js`) |
| Cross-file item name check | `tools/items-check.js` |
| Generators for wiki/game-derived files, and their hand corrections | `tools/generate/<name>.js`, `tools/generate/corrections/<file>.yaml` |

Every top-level key of a data file becomes a named export (`import { generators, powerTips } from '../lib/data/base.yaml'`),
so top-level keys must be valid JS identifiers. There is no default export, and YAML never reaches the browser.

## Editing data

1. **Find the file** in the table above (the README lists what each data file contains). Keep the existing layout:
   table-like lists use one record per line (`- {name: Glass, value: 200, in: [[Frost Crystal, 40]]}`), records with
   long prose use one field per line. `#` comments are fine and stay in the file.
2. **Quote values YAML would otherwise misread.** Parsing is YAML 1.2, so `yes`/`no`/`on`/`off` stay text, but quote:
   - times and ratios: `"9:00"`, `"1:2"`;
   - text that looks like a number, boolean or null but must stay text: `"2121"`, `"1e3"`, `"0x10"`, `".5"`, `"true"`,
     `"null"`, `"~"`;
   - text containing `: ` or ` #` (everything after ` #` is a comment), or starting with `- `, `[`, `{`, `!`, `*`, `&`, `%`,
     `@`, `|`, `>` or a quote;
   - **inside a one-line `{…}` or `[…]` record, any text containing a comma, `[`, `]`, `{` or `}`**
     (e.g. `{note: "Gek, Korvax & Vy'keen produce trade goods here."}`) — otherwise the comma splits the value
     (`{note: Gek, Korvax}` becomes a `note` of "Gek" plus an extra key "Korvax", which the schema reports as unknown);
   - text with leading or trailing spaces (`unit: " ly"`) and empty text (`""`).
   Use `"…"` and write an apostrophe inside as-is (`"Vy'keen Dagger"`); unquoted `Vy'keen` is also fine.
   Write "no value" as `null`, not `""`, unless the schema says the field is text.
3. **Run `npm run check`.** It reports every problem as `file:line path: message`: YAML syntax errors, duplicate keys,
   missing or unknown fields, wrong types (`value: "800"` is text, not a number), values outside a fixed set, broken
   same-file references (a `sellsTo` that isn't an economy id), and unknown item names, with a "did you mean". The build
   runs the same checks, and the dev server shows them in the browser overlay.
4. **Unknown item name?** Fix the spelling first — after a game update, a renamed or removed item is the usual cause.
   Only if it is a real in-game item that no data file defines (check the wiki), add it to `otherItems` in `items.yaml`;
   if it is another name for an existing item, add it to `itemAliases` (trade goods: `tradeGoodAliases`).
   Defined items are: trade and smuggled goods, resources, crafted products, dishes and raw ingredients, Nutrient
   Ingestor foods/fish (`ingest.yaml`) and `otherItems`.
5. **New field or new top-level key?** Add it to the file's schema in `tools/schemas.js` (use `optional(...)` if not every
   record has it) and handle it in the page. Don't loosen a type to make bad data pass.
6. **Update the file's header comment** (the `#` lines at the top): the source you used and the month/year, e.g.
   `# … Source: community wiki "Power" page, Nov 2026; Ion Battery cost corrected from the item page, Mar 2027.`
   If you changed values from a different source than the header names, add that source. Update the page's
   `<p class="source">` too if the sources changed.
7. **Generated files** (`cooking`, `ingest`, `tech`, `refiner`, `puzzles-generated`, `expedition-rewards`): don't hand-edit
   the data — the next regeneration would overwrite it. Put the fix in `tools/generate/corrections/<file>.yaml` (each entry
   needs a `why:`), then `npm run generate -- <name>` and review `git diff src/lib/data/`.

## Generated files

- `tools/generate/<name>.js` rebuilds a data file from its source: `cooking`, `ingest`, `tech`, `refiner` and
  `puzzles` from the community wiki (MediaWiki API), `expedition-rewards` from the game's reward table extract.
  Downloads are cached in `tools/generate/.cache/` (git-ignored); `--refresh` fetches again. `ingest` reads
  `cooking.yaml`, so regenerate `cooking` first (`all` runs them in a safe order).
- `npm run generate -- <name> --check` compares the generated data with the committed file without writing. Run it after
  changing a generator — it should report no differences unless the source changed.
- After a game update: `npm run generate -- all --refresh`, read the whole `git diff src/lib/data/`, run `npm run check`
  and fix renamed items, then update the date in the headers (the generators write them).
- Corrections in `tools/generate/corrections/` are applied after parsing; each must match exactly one record, so a
  correction that no longer applies (the wiki was fixed) stops the generator and should be removed. A correction whose
  `why` starts with `UNRESOLVED:` keeps a value the source now disagrees with until someone verifies it in game.
- `companions.yaml` and `expeditions.yaml` were partly compiled from wiki tables but are maintained by hand.

## Data rules (important)

- **Accuracy over coverage.** Data comes from the No Man's Sky community wiki (CC BY-SA), player research and game-file
  extracts. Never invent numbers, recipes or mechanics. If something can't be verified, leave it out or label it on the
  page (e.g. *Usually:*, "unconfirmed", "community-mapped").
- Every data file starts with a `#` comment stating its **source and date**. Every page credits its sources at the bottom.
  Don't remove credits — the wiki licence requires attribution.
- Where sources disagree, say so on the page rather than silently picking one (see the Companions affinity chart and
  the frigate safety margin for examples).
- Data is current to the Cosmos (7.x) era, compiled November 2026. Game updates can change values.

## Styling

- **Dark-only "Atlas" theme**: near-black background, crimson accent, Rajdhani display font (Google Fonts, falls back to
  system fonts). All tokens are in `src/app.css` `:root` — use `var(--accent)`, `var(--good)`, `var(--bad)`,
  `var(--warn)`, `var(--muted)` etc. Don't hard-code colours, and don't add light-mode or `prefers-color-scheme` rules.
- Good/bad outcomes use `--good` (green) / `--bad` (coral), always paired with a symbol or word (✓/✗, "Good"), so they
  aren't confused with the red accent.
- `.card` is square (`--radius: 0`) with red **corner brackets drawn by `::before`/`::after`** on the border. A card that
  sets `overflow` will clip them — put scrolling on an inner wrapper instead (see `.pool-scroll` in `Frigates.svelte`).
  To hide them on a specific card, set `display: none` on its `::before`/`::after` (see `.eco` in `Economies.svelte`).
- Shared classes in `app.css`: `.card`, `.grid`, `.table-wrap`, `.tabs`, `.chip`, `.pill`, `.cls cls-S…C`, `.toolbar`,
  `.tips`, `.note`, `.lead`, `.source`, `.atlas-band` (red/black banner), `.sep` (spaced separator).
- **Svelte trims whitespace** inside tags: `<span> + </span>` renders as "+" with no spaces. Use `<span class="sep">+</span>`.
- **Layout width:** the content area grows to 1720px on wide screens. Card grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`
  so short rows stretch to fill. Running text (`main > p`, tips, notes) is capped at ~95ch for readability.
- **Card grids keep equal-height rows** (the default grid `stretch`). Where cards share a structure, line their parts up across
  a row with CSS subgrid (see `.eco` in `Economies.svelte`: header, description, table and footer each get a shared row track).
- Tables in narrow layouts must not overflow the page: use `.table-wrap`, allow wrapping, or switch to stacked cards on
  mobile (see `Technology.svelte`).

## Interactive tools

- Calculators and optimisers must be transparent about what they assume (state formulas or "community-reported" basis
  on the page).
- Per-viewer state (Holo-Arena roster, Voltaic Staff checklist) is saved in `localStorage` under `nms-info:*` keys.
  Always wrap reads/writes in `try/catch` and make the page work without storage.

## Git & deployment

- Pushing to **`main`** deploys automatically via `.github/workflows/deploy.yml` (Node 22, `npm ci`, `npm run build`,
  upload `dist/` to GitHub Pages).
- `nms-reference-site` is a long-lived feature branch kept level with `main`: after committing on `main`, fast-forward it
  (`git switch nms-reference-site && git merge --ff-only main && git switch main`) and push both.
- Commit as the repo's configured identity (`user.email` is the owner's GitHub no-reply address — never commit with a
  personal email). Write clear commit messages describing what changed and why.
- Only commit, push or deploy when the user asks.
- `node_modules/` and `dist/` are ignored; don't commit build output.

## Disclaimer

The README carries an AI disclaimer (the site was built with an AI coding assistant, with human direction and review).
Keep it accurate if the way the project is built changes.
