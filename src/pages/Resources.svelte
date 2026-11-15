<script>
  import { resources } from '../lib/data/resources.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import { units, norm } from '../lib/format.js';

  const groups = [...new Set(resources.map((r) => r.group))];
  let group = $state('All');
  let q = $state('');

  const rows = $derived(
    resources.filter(
      (r) => (group === 'All' || r.group === group) && (!q || norm(`${r.name} ${r.found} ${r.use} ${r.sym}`).includes(norm(q))),
    ),
  );
</script>

<h1>Resources</h1>
<p class="lead">Every raw material, where it comes from and what you'll want it for. Click a name for its refiner and crafting uses.</p>

<div class="toolbar">
  <input type="search" placeholder="Filter (e.g. lush, caves, fuel)…" bind:value={q} />
</div>
<div class="tabs" role="group" aria-label="Resource group">
  {#each ['All', ...groups] as g}
    <button aria-pressed={group === g} onclick={() => (group = g)}>{g}</button>
  {/each}
</div>

<div class="table-wrap">
  <table>
    <thead><tr><th>Resource</th><th>Group</th><th>Where to find it</th><th>Main use</th><th class="num">Value</th></tr></thead>
    <tbody>
      {#each rows as r}
        <tr>
          <td><ItemLink name={r.name} /> <span class="muted small">{r.sym}</span></td>
          <td class="muted">{r.group}</td>
          <td>{r.found}</td>
          <td>{r.use}</td>
          <td class="num">{units(r.value)}</td>
        </tr>
      {:else}
        <tr><td colspan="5" class="muted">Nothing matches that filter.</td></tr>
      {/each}
    </tbody>
  </table>
</div>

<h2>Scanner colours</h2>
<ul class="tips">
  <li><strong>Blue crystals</strong> — Di-hydrogen. <strong>Red crystals</strong> — Condensed Carbon. <strong>Yellow crystals</strong> — Sodium Nitrate (needs the Advanced Mining Laser).</li>
  <li>On the scanner: red diamonds are Oxygen, yellow are Sodium / Sodium Nitrate, blue are Di-hydrogen.</li>
  <li>Use the <strong>Analysis Visor</strong> on rocks and plants to reveal secondary resources.</li>
  <li>Every resource can also be bought from Galactic Trade Terminals.</li>
</ul>

<p class="source">Source: No Man's Sky community wiki (Resource), Nov 2026.</p>
