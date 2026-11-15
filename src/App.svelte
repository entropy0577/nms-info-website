<script>
  import { route, href, scrollToAnchor } from './lib/router.svelte.js';
  import { navGroups, pages } from './lib/nav.js';
  import Search from './lib/components/Search.svelte';

  import Home from './pages/Home.svelte';
  import Economies from './pages/Economies.svelte';
  import Settlements from './pages/Settlements.svelte';
  import Money from './pages/Money.svelte';
  import Resources from './pages/Resources.svelte';
  import Refiner from './pages/Refiner.svelte';
  import Crafting from './pages/Crafting.svelte';
  import Stars from './pages/Stars.svelte';
  import Portals from './pages/Portals.svelte';
  import Starships from './pages/Starships.svelte';
  import MultiTools from './pages/MultiTools.svelte';
  import Exocraft from './pages/Exocraft.svelte';
  import XModules from './pages/XModules.svelte';
  import Frigates from './pages/Frigates.svelte';
  import Sentinels from './pages/Sentinels.svelte';
  import Item from './pages/Item.svelte';
  import NotFound from './pages/NotFound.svelte';

  const routes = {
    '/': Home,
    '/economies': Economies,
    '/settlements': Settlements,
    '/money': Money,
    '/resources': Resources,
    '/refiner': Refiner,
    '/crafting': Crafting,
    '/stars': Stars,
    '/portals': Portals,
    '/starships': Starships,
    '/exocraft': Exocraft,
    '/multitools': MultiTools,
    '/x-modules': XModules,
    '/frigates': Frigates,
    '/sentinels': Sentinels,
  };

  let menuOpen = $state(false);

  const itemName = $derived(route.path.startsWith('/item/') ? route.path.slice(6) : null);
  const Page = $derived(itemName ? Item : routes[route.path] || NotFound);
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
      <img src="./favicon.svg" alt="" width="26" height="26" />
      <span>NMS Info</span>
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
    {#key route.path}
      <Page name={itemName} />
    {/key}

    {#if prev || next}
      <nav class="pager" aria-label="Previous and next page">
        {#if prev}<a class="card" href={href(prev.path)}><span class="muted small">← Previous</span><strong>{prev.title}</strong></a>{:else}<span></span>{/if}
        {#if next}<a class="card right" href={href(next.path)}><span class="muted small">Next →</span><strong>{next.title}</strong></a>{/if}
      </nav>
    {/if}

    <footer class="footer">
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
    background: color-mix(in srgb, var(--surface) 92%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }
  .brand { display: flex; align-items: center; gap: 0.55rem; font-weight: 700; color: var(--text); width: calc(var(--sidebar) - 2.5rem); flex: none; }
  .brand:hover { text-decoration: none; }
  .brand img { border-radius: 6px; }
  .menu-btn { display: none; background: none; border: 0; color: var(--text); padding: 0.25rem; cursor: pointer; }

  .sidebar {
    position: sticky; top: 53px; align-self: start;
    height: calc(100vh - 53px); overflow-y: auto;
    padding: 1rem 0.75rem 2rem;
    border-right: 1px solid var(--border);
  }
  .nav-group { margin-top: 1.1rem; }
  .nav-title { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); font-weight: 700; padding: 0 0.6rem 0.3rem; }
  .nav-link { display: block; padding: 0.38rem 0.6rem; border-radius: 7px; color: var(--text); font-size: 0.93rem; }
  .nav-link:hover { background: var(--surface-2); text-decoration: none; }
  .nav-link.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }

  .content { padding: 2rem 2.5rem 3rem; max-width: 1100px; width: 100%; min-width: 0; overflow-x: clip; }

  .pager { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; margin-top: 3rem; }
  .pager a { display: flex; flex-direction: column; gap: 0.15rem; color: var(--text); }
  .pager a:hover { border-color: var(--accent); text-decoration: none; }
  .pager .right { text-align: right; grid-column: 2; }

  .footer { margin-top: 2.5rem; padding-top: 1rem; border-top: 1px solid var(--border); color: var(--muted); font-size: 0.8rem; }

  .scrim { display: none; }

  @media (max-width: 860px) {
    .shell { grid-template-columns: 1fr; }
    .menu-btn { display: inline-flex; }
    .brand { width: auto; }
    .brand span { display: none; }
    .sidebar {
      position: fixed; top: 53px; left: 0; z-index: 30;
      width: min(80vw, 300px); background: var(--surface);
      transform: translateX(-100%); transition: transform 0.18s ease;
    }
    .sidebar.open { transform: none; box-shadow: 0 0 40px rgb(0 0 0 / 0.25); }
    .scrim { display: block; position: fixed; inset: 53px 0 0 0; z-index: 25; background: rgb(0 0 0 / 0.3); border: 0; }
    .content { padding: 1.25rem 1rem 2rem; }
    .topbar { padding: 0.6rem 1rem; gap: 0.6rem; }
  }
</style>
