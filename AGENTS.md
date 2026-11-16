# AGENTS.md

Guidance for AI coding agents working on **NMS Info**, an unofficial No Man's Sky reference site.
Live at https://entropy0577.github.io/nms-info-website/ (repo: `entropy0577/nms-info-website`).

The site exists because the Fandom wiki is hard to use mid-game. Keep it **fast, clean, and easy to navigate**:
everything should be reachable from the sidebar or the global search, and every item has its own page.

## Commands

```sh
npm install
npm run dev       # dev server
npm run build     # static site in dist/ — must finish with no warnings
npm run preview   # serve dist/ (e.g. npx vite preview --host 127.0.0.1 --port 4173)
```

There is no test suite. After a change, run `npm run build` (treat any warning as a failure) and check the affected
pages in a browser, including at phone width (~390px) — no page may scroll sideways.

## Stack & architecture

- **Svelte 5 (runes) + Vite 8**, plain JavaScript, no framework router, no UI library, no runtime dependencies.
- **Static, hash-routed SPA.** `src/lib/router.svelte.js` turns `#/path?anchor` into `route.path` / `route.query`.
  `?anchor` deep-links scroll to the element with that id (and some pages use it to preselect a tab/filter).
  `vite.config.js` uses `base: './'`, so `dist/` works from any sub-path (GitHub Pages) with no server config.
- **`src/App.svelte`** is the shell: top bar, sidebar, page area, previous/next links, footer. Pages are **lazy-loaded**
  via the `routes` map (`'/x': () => import('./pages/X.svelte')`). The loaded component, its `name` prop and key are
  swapped together in one `view` object — keep it that way, or an old page can render with the new route's props.
- **`src/lib/nav.js`** defines the sidebar groups and page order. The order also drives previous/next links, the home
  page tiles and the page entries in search.
- **`src/lib/data/items.js`** builds one cross-referenced index of every item from all the data files (trade goods,
  resources, crafting, refiner, settlements, cooking, technology). `src/pages/Item.svelte` renders `#/item/<name>` from
  it. Use `<ItemLink name=…>` anywhere an item is mentioned so it links to that page.
- **`src/lib/components/Search.svelte`** is the global search (`/` or Ctrl+K): pages, items, technology and Galactic Map
  economy names.
- Shared helpers: `src/lib/format.js` (`units`, `shortUnits`, `norm`), `src/lib/arena.js` (Holo-Arena scoring heuristics).

## Adding a page

1. Put the data in `src/lib/data/<topic>.js` (see data rules below).
2. Create `src/pages/<Name>.svelte`. Start with an `<h1>` and a `<p class="lead">`; use `<OnThisPage>` for long pages;
   end with a `<p class="source">` naming the sources.
3. Register it in `nav.js` (with a short `blurb`) and in the `routes` map in `App.svelte`.
4. Add the data file to the table in `README.md`.
5. If the page has items, link them with `ItemLink`; if it introduces new items, consider adding them to `items.js`.

## Data rules (important)

- **Accuracy over coverage.** Data comes from the No Man's Sky community wiki (CC BY-SA), player research and game-file
  extracts. Never invent numbers, recipes or mechanics. If something can't be verified, leave it out or label it on the
  page (e.g. *Usually:*, "unconfirmed", "community-mapped").
- Every data file starts with a comment stating its **source and date**. Every page credits its sources at the bottom.
  Don't remove credits — the wiki licence requires attribution.
- Where sources disagree, say so on the page rather than silently picking one (see the Companions affinity chart and
  the frigate safety margin for examples).
- Several files are **generated** from wiki/game data (`refiner.js`, `cooking.js`, `tech.js`, `puzzles-generated.js`,
  `expedition-rewards.js`, `ingest.js`, parts of `companions.js` and `expeditions.js`). Edit them by hand only for small corrections,
  and note the correction in a comment.
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
