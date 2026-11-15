<script>
  import { navGroups } from '../lib/nav.js';
  import { href, itemHref } from '../lib/router.svelte.js';
  import { economies } from '../lib/data/economy.js';
</script>

<h1>No Man's Sky, at a glance</h1>
<p class="lead">
  A quick, clean reference for the things you actually look up while playing. Use the search bar (press <kbd>/</kbd>) to jump
  straight to any item — every item has its own page showing where to buy it, how to make it and what it's used for.
</p>

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
