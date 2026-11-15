<script>
  import { tick } from 'svelte';
  import { route, href, scrollToAnchor } from './lib/router.svelte.js';
  import { navGroups, pages } from './lib/nav.js';
  import Search from './lib/components/Search.svelte';

  // Each page is loaded on demand, so page-specific data (puzzles, recipes…) isn't downloaded until it's needed.
  const routes = {
    '/': () => import('./pages/Home.svelte'),
    '/economies': () => import('./pages/Economies.svelte'),
    '/settlements': () => import('./pages/Settlements.svelte'),
    '/money': () => import('./pages/Money.svelte'),
    '/resources': () => import('./pages/Resources.svelte'),
    '/refiner': () => import('./pages/Refiner.svelte'),
    '/crafting': () => import('./pages/Crafting.svelte'),
    '/base': () => import('./pages/Base.svelte'),
    '/technology': () => import('./pages/Technology.svelte'),
    '/cooking': () => import('./pages/Cooking.svelte'),
    '/stars': () => import('./pages/Stars.svelte'),
    '/companions': () => import('./pages/Companions.svelte'),
    '/poi': () => import('./pages/Poi.svelte'),
    '/poi-puzzles': () => import('./pages/PoiPuzzles.svelte'),
    '/portals': () => import('./pages/Portals.svelte'),
    '/starships': () => import('./pages/Starships.svelte'),
    '/exocraft': () => import('./pages/Exocraft.svelte'),
    '/multitools': () => import('./pages/MultiTools.svelte'),
    '/voltaic-staff': () => import('./pages/VoltaicStaff.svelte'),
    '/x-modules': () => import('./pages/XModules.svelte'),
    '/frigates': () => import('./pages/Frigates.svelte'),
    '/sentinels': () => import('./pages/Sentinels.svelte'),
  };
  const loadItem = () => import('./pages/Item.svelte');
  const loadNotFound = () => import('./pages/NotFound.svelte');

  let menuOpen = $state(false);

  const itemName = $derived(route.path.startsWith('/item/') ? route.path.slice(6) : null);
  // Component, its props and key are swapped together so an old page never renders with the new route's props.
  let view = $state({ Page: null, name: null, key: '' });
  $effect(() => {
    const path = route.path;
    const loader = itemName ? loadItem : routes[path] || loadNotFound;
    loader().then((m) => {
      if (route.path !== path) return; // user navigated again while loading
      view = { Page: m.default, name: itemName, key: path };
      // Deep links like #/economies?mining: scroll once the newly loaded page has rendered.
      if (route.query) tick().then(() => scrollToAnchor(route.query));
    });
  });
  const index = $derived(pages.findIndex((p) => p.path === route.path));
  const prev = $derived(index > 0 ? pages[index - 1] : null);
  const next = $derived(index >= 0 && index < pages.length - 1 ? pages[index + 1] : null);
  const current = $derived(pages[index]);

  $effect(() => {
    document.title = itemName ? `${itemName} · NMS Info` : current ? `${current.title} · NMS Info` : 'NMS Info';
    menuOpen = false;
  });

  // #/economies?mining  → jump to that section once the page has rendered.
  $effect(() => scrollToAnchor(route.query));
</script>

<div class="shell">
  <header class="topbar">
    <button class="menu-btn" aria-label="Toggle menu" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}>
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
    </button>
    <a class="brand" href={href('/')}>
      <img src="./favicon.svg" alt="" width="28" height="28" />
      <span>NMS <b>Info</b></span>
    </a>
    <Search />
  </header>

  <nav class="sidebar" class:open={menuOpen} aria-label="Sections">
    <a class="nav-link home" class:active={route.path === '/'} href={href('/')}>Home</a>
    {#each navGroups as group}
      <div class="nav-group">
        <div class="nav-title">{group.title}</div>
        {#each group.pages as p}
          <a class="nav-link" class:active={route.path === p.path} href={href(p.path)}>{p.title}</a>
        {/each}
      </div>
    {/each}
  </nav>
  {#if menuOpen}
    <button class="scrim" aria-label="Close menu" onclick={() => (menuOpen = false)}></button>
  {/if}

  <main class="content">
    {#key view.key}
      {#if view.Page}<view.Page name={view.name} />{/if}
    {/key}

    {#if prev || next}
      <nav class="pager" aria-label="Previous and next page">
        {#if prev}<a class="card" href={href(prev.path)}><span class="muted small">← Previous</span><strong>{prev.title}</strong></a>{:else}<span></span>{/if}
        {#if next}<a class="card right" href={href(next.path)}><span class="muted small">Next →</span><strong>{next.title}</strong></a>{/if}
      </nav>
    {/if}

    <footer class="footer">
      <span class="diamond" aria-hidden="true"></span>
      Unofficial fan reference for No Man's Sky. Data compiled November 2026 (Cosmos / 7.x era) from the community wiki and player research — values can shift with game updates.
    </footer>
  </main>
</div>

<style>
  .shell {
    display: grid;
    grid-template-columns: var(--sidebar) 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  }
  .topbar {
    grid-column: 1 / -1;
    position: sticky; top: 0; z-index: 20;
    display: flex; align-items: center; gap: 1rem;
    padding: 0.6rem 1.25rem;
    background: rgb(5 5 6 / 0.82);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgb(224 45 54 / 0.35);
    box-shadow: 0 1px 0 rgb(224 45 54 / 0.08), 0 10px 30px rgb(224 45 54 / 0.05);
  }
  .brand {
    display: flex; align-items: center; gap: 0.6rem; color: var(--text); width: calc(var(--sidebar) - 2.5rem); flex: none;
    font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
  }
  /* All-caps text has no descenders, so drop it slightly to centre the capitals on the logo. */
  .brand span { line-height: 1; padding-top: 0.14em; }
  .brand b { color: var(--accent-bright); font-weight: 700; text-shadow: 0 0 12px var(--accent-glow); }
  .brand:hover { text-decoration: none; color: var(--text); }
  .brand img { filter: drop-shadow(0 0 6px var(--accent-glow)); }
  .menu-btn { display: none; background: none; border: 0; color: var(--text); padding: 0.25rem; cursor: pointer; }

  .sidebar {
    position: sticky; top: 55px; align-self: start;
    height: calc(100vh - 55px); overflow-y: auto;
    padding: 1rem 0.75rem 2rem;
    border-right: 1px solid var(--border);
    background: linear-gradient(180deg, rgb(13 13 16 / 0.7), rgb(5 5 6 / 0.4));
  }
  .nav-group { margin-top: 1rem; padding-top: 0.9rem; border-top: 1px solid rgb(224 45 54 / 0.12); }
  .nav-title {
    font-family: var(--font-display); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.14em;
    color: #b0585c; font-weight: 700; padding: 0 0.7rem 0.35rem;
    display: flex; align-items: center; gap: 0.45rem;
  }
  .nav-title::before { content: ''; width: 5px; height: 5px; background: var(--accent); transform: rotate(45deg); box-shadow: 0 0 6px var(--accent-glow); }
  .nav-link {
    display: block; padding: 0.38rem 0.7rem; border-radius: 6px; color: #cfc8c8; font-size: 0.93rem;
    border-left: 2px solid transparent; transition: background 0.12s, color 0.12s, border-color 0.12s;
  }
  .nav-link:hover { background: var(--surface-2); color: #fff; text-decoration: none; }
  .nav-link.active {
    background: linear-gradient(90deg, var(--accent-soft), transparent); color: #fff; font-weight: 600;
    border-left-color: var(--accent); border-radius: 0 6px 6px 0;
  }

  .content { padding: 2.25rem 2.5rem 3rem; max-width: 1100px; width: 100%; min-width: 0; overflow-x: clip; }

  .pager { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; margin-top: 3rem; }
  .pager a { display: flex; flex-direction: column; gap: 0.15rem; color: var(--text); }
  .pager a strong { font-family: var(--font-display); font-size: 1.1rem; }
  .pager .right { text-align: right; grid-column: 2; }
  .pager span { color: var(--accent-bright); text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.72rem; font-family: var(--font-display); }

  .footer {
    position: relative; margin-top: 3rem; padding: 1.1rem 1.25rem 1.1rem 2.6rem; color: var(--muted); font-size: 0.8rem;
    border-top: 1px solid rgb(224 45 54 / 0.4);
    background: linear-gradient(90deg, rgb(224 45 54 / 0.1), transparent 60%);
  }
  .diamond { position: absolute; left: 1rem; top: 1.25rem; width: 9px; height: 9px; background: var(--accent); transform: rotate(45deg); box-shadow: 0 0 10px var(--accent-glow); }

  .scrim { display: none; }

  @media (max-width: 860px) {
    .shell { grid-template-columns: 1fr; }
    .menu-btn { display: inline-flex; }
    .brand { width: auto; }
    .brand span { display: none; }
    .sidebar {
      position: fixed; top: 55px; left: 0; z-index: 30;
      width: min(80vw, 300px); background: var(--surface);
      transform: translateX(-100%); transition: transform 0.18s ease;
    }
    .sidebar.open { transform: none; box-shadow: 0 0 40px rgb(0 0 0 / 0.6); }
    .scrim { display: block; position: fixed; inset: 55px 0 0 0; z-index: 25; background: rgb(0 0 0 / 0.55); border: 0; }
    .content { padding: 1.25rem 1rem 2rem; }
    .topbar { padding: 0.6rem 1rem; gap: 0.6rem; }
  }
</style>
