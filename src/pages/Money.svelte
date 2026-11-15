<script>
  import { unitMethods, naniteMethods } from '../lib/data/money.js';
  import { href } from '../lib/router.svelte.js';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
</script>

<h1>Units & Nanites</h1>
<p class="lead">The most reliable ways to earn the game's two main currencies, roughly from best to simplest.</p>
<OnThisPage links={[['units', 'Units'], ['nanites', 'Nanites'], ['quicksilver', 'Quicksilver']]} />

<h2 id="units">Units</h2>
<div class="grid">
  {#each unitMethods as m}
    <div class="card">
      <div class="head"><strong>{m.name}</strong><span class="pill">{m.stage}</span></div>
      <p class="small">{m.how}</p>
      {#if m.link}<a class="small" href={href(m.link)}>Details →</a>{/if}
    </div>
  {/each}
</div>

<h2 id="nanites">Nanites</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Method</th><th>Rate</th><th>How</th></tr></thead>
    <tbody>
      {#each naniteMethods as m}<tr><td><strong>{m.name}</strong></td><td class="muted">{m.rate}</td><td>{m.how}</td></tr>{/each}
    </tbody>
  </table>
</div>

<h2 id="quicksilver">Quicksilver</h2>
<p>
  Quicksilver is earned from Nexus missions (on the Space Anomaly) and weekly community research, and is spent at the Quicksilver Synthesis
  Companion on cosmetics and base parts.
</p>

<p class="source">Sources: No Man's Sky community wiki (Units, Nanite Cluster), Nov 2026. Rates are player estimates.</p>

<style>
  .head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; }
  h2[id] { scroll-margin-top: 70px; }
</style>
