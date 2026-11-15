<script>
  import { navGroups } from '../lib/nav.js';
  import { href, itemHref } from '../lib/router.svelte.js';
  import { economies } from '../lib/data/economy.js';
  import { allItems } from '../lib/data/items.js';
  import { refinerRecipes } from '../lib/data/refiner.js';
  import { dishes } from '../lib/data/cooking.js';
  import { technology } from '../lib/data/tech.js';

  // Live counts from the site's own data.
  const counts = [
    [allItems.length, 'items indexed', ''],
    [refinerRecipes.length, 'refiner recipes', '/refiner'],
    [dishes.length, 'cooking recipes', '/cooking'],
    [technology.length, 'technologies', '/technology'],
    [216, 'puzzle answers', '/poi-puzzles'],
  ];
</script>

<section class="hero atlas-band">
  <div class="hero-text">
    <p class="kicker">Traveller's reference</p>
    <h1>No Man's Sky, at a glance</h1>
    <p class="intro">
      The things you actually look up while playing. Press <kbd>/</kbd> to search — every item has its own page showing where to buy it,
      how to make it and what it's used for.
    </p>
  </div>
  <svg class="hero-art" viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <radialGradient id="core" cx="50%" cy="45%" r="55%">
        <stop offset="0" stop-color="#ff6a6f" />
        <stop offset="0.6" stop-color="#e02d36" />
        <stop offset="1" stop-color="#5c0a10" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="92" fill="none" stroke="#e02d36" stroke-opacity="0.18" />
    <circle cx="100" cy="100" r="72" fill="none" stroke="#e02d36" stroke-opacity="0.3" stroke-dasharray="2 6" />
    <circle cx="100" cy="100" r="52" fill="none" stroke="#e02d36" stroke-opacity="0.45" />
    <path d="M100 48 L140 100 L100 152 L60 100 Z" fill="url(#core)" />
    <path d="M100 48 L140 100 L100 152 L60 100 Z" fill="none" stroke="#ffb3b0" stroke-opacity="0.55" />
    <circle cx="100" cy="100" r="9" fill="#060507" />
    <circle cx="100" cy="8" r="2.5" fill="#ff4b52" />
    <circle cx="192" cy="100" r="2" fill="#ff4b52" fill-opacity="0.6" />
  </svg>
  <div class="stats">
    {#each counts as [n, label, path]}
      {#if path}
        <a class="stat" href={href(path)}><strong>{n.toLocaleString('en-GB')}</strong><span>{label}</span></a>
      {:else}
        <div class="stat"><strong>{n.toLocaleString('en-GB')}</strong><span>{label}</span></div>
      {/if}
    {/each}
  </div>
</section>

<section class="quick card">
  <h2 class="first">Trade route cheat sheet</h2>
  <p class="muted small">Buy an economy's goods, then sell them to the economy it points to.</p>
  <div class="loops">
    {#each ['A', 'B'] as loop}
      <div class="loop">
        {#each economies.filter((e) => e.route === loop) as e, i}
          {#if i > 0}<span class="arrow">→</span>{/if}
          <a class="pill" href={href('/economies') + '?' + e.id}><span class="dot" style:background={e.colour}></span>{e.name}</a>
        {/each}
        <span class="arrow">↺</span>
      </div>
    {/each}
  </div>
</section>

{#each navGroups as group}
  <h2>{group.title}</h2>
  <div class="grid">
    {#each group.pages as p}
      <a class="card tile" href={href(p.path)}>
        <strong>{p.title}</strong>
        <span class="muted small">{p.blurb}</span>
      </a>
    {/each}
  </div>
{/each}

<h2>Popular lookups</h2>
<div class="popular">
  {#each ['Fusion Ignitor', 'Stasis Device', 'Chromatic Metal', 'Warp Cell', 'Activated Indium', 'Quantum Processor', 'Living Glass', 'Nanite Cluster', 'Frost Crystal', 'Neural Duct'] as n}
    <a class="chip" href={itemHref(n)}>{n}</a>
  {/each}
</div>

<style>
  .hero { display: grid; grid-template-columns: 1fr 190px; gap: 0 1.5rem; padding: 1.75rem 1.75rem 1.25rem; margin-bottom: 1.5rem; }
  .kicker { font-family: var(--font-display); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.8rem; color: var(--accent-bright); margin: 0 0 0.35rem; }
  .hero h1 { font-size: 2.5rem; margin-bottom: 0.6rem; text-shadow: 0 0 30px rgb(224 45 54 / 0.35); }
  .hero h1::before { display: none; }
  .intro { color: #cdbfc0; max-width: 60ch; margin: 0; }
  .hero-art { width: 190px; height: 190px; grid-row: 1 / span 2; grid-column: 2; align-self: center; filter: drop-shadow(0 0 18px rgb(224 45 54 / 0.45)); }
  .hero-art circle:nth-of-type(2) { transform-origin: 100px 100px; animation: spin 60s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .hero-art circle:nth-of-type(2) { animation: none; } }
  .stats { grid-column: 1; display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.4rem; }
  .stat { display: flex; flex-direction: column; padding: 0.45rem 0.85rem; border-left: 2px solid var(--accent); background: rgb(0 0 0 / 0.35); color: var(--text); border-radius: 0 6px 6px 0; }
  .stat strong { font-family: var(--font-display); font-size: 1.35rem; line-height: 1.1; color: #fff; }
  .stat span { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  a.stat:hover { background: var(--accent-soft); text-decoration: none; }
  @media (max-width: 700px) {
    .hero { grid-template-columns: 1fr; padding: 1.25rem; }
    .hero-art { display: none; }
    .hero h1 { font-size: 1.9rem; }
  }
  .quick { margin-bottom: 0.5rem; }
  .first { margin-top: 0; }
  .loops { display: grid; gap: 0.6rem; }
  .loop { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; }
  .loop .pill { color: var(--text); }
  .arrow { color: var(--muted); }
  .tile { display: flex; flex-direction: column; gap: 0.25rem; color: var(--text); transition: border-color 0.12s; }
  .tile:hover { border-color: var(--accent); text-decoration: none; }
  .popular { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .chip:hover { text-decoration: none; border-color: var(--accent); }
  kbd { font: inherit; font-size: 0.85em; border: 1px solid var(--border); border-bottom-width: 2px; border-radius: 4px; padding: 0 0.3rem; background: var(--surface); }
</style>
