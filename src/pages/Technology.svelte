<script>
  import { technology } from '../lib/data/tech.yaml';
  import { route, href } from '../lib/router.svelte.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import { norm } from '../lib/format.js';

  const devices = ['All', 'Exosuit', 'Multi-Tool', 'Starship', 'Exocraft', 'Freighter'];
  let device = $state('All');
  let q = $state('');

  // ?Tech%20Name (from global search) pre-fills the filter.
  $effect(() => { if (route.query && technology.some((t) => t.name === route.query)) { q = route.query; device = 'All'; } });

  const rows = $derived.by(() => {
    const t = norm(q);
    const match = (x) => !t || norm(`${x.name} ${x.desc} ${x.recharge} ${x.cost.map((c) => c[0]).join(' ')}`).includes(t);
    // Keep each upgrade with its parent: show parent if it or any of its upgrades match.
    return technology.filter((x) => {
      if (device !== 'All' && x.device !== device) return false;
      if (match(x)) return true;
      if (!x.upgradeOf) return technology.some((u) => u.upgradeOf === x.name && u.device === x.device && match(u));
      return false;
    });
  });
  const groups = $derived([...new Set(rows.map((r) => r.device))]);
</script>

<h1>Technology & Blueprints</h1>
<p class="lead">
  Every piece of technology you can install: what it does, what it costs to build, what recharges it, and where to get the blueprint.
  Indented rows are upgrades for the tech above them. For upgrade <em>modules</em> (C–S and X class), see
  <a href={href('/x-modules')}>X-Class Module Rolls</a>.
</p>

<div class="toolbar">
  <input type="search" placeholder="Filter, e.g. hyperdrive, refiner, Wiring Loom" bind:value={q} />
</div>
<div class="tabs" role="group" aria-label="Device">
  {#each devices as d}<button aria-pressed={device === d} onclick={() => (device = d)}>{d}</button>{/each}
</div>

{#each groups as g}
  <h2>{g}</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Technology</th><th>Build cost</th><th>Recharge</th><th>Blueprint from</th></tr></thead>
      <tbody>
        {#each rows.filter((r) => r.device === g) as t}
          <tr class:sub={t.upgradeOf}>
            <td class="name">
              <strong>{t.name}</strong>
              {#if t.desc}<div class="muted small">{t.desc}</div>{/if}
            </td>
            <td class="cost" data-label="Build cost">
              {#if t.cost.length}
                {#each t.cost as [n, k]}<div><ItemLink name={n} qty={k} /></div>{/each}
              {:else}<span class="muted">—</span>{/if}
            </td>
            <td class="small" data-label="Recharge">{t.recharge || '—'}</td>
            <td class="small" data-label="Blueprint" class:muted={t.guess}>{#if t.guess}<em>Usually:</em> {/if}{t.source}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="muted">No technology matches.</p>
{/each}

<h2>How blueprints work</h2>
<ul class="tips">
  <li>Most technology blueprints are bought with <strong>nanites</strong> on the Space Anomaly: Iteration: Selene (exosuit), Iteration: Eos (multi-tool), Iteration: Hyperion (starship).</li>
  <li>Base parts and many products are unlocked with <strong>Salvaged Data</strong> at the Construction Research Station on the Space Anomaly. Dig up Buried Technology Modules to get it.</li>
  <li>Freighter tech is researched at the freighter's Upgrade Control terminal with <strong>Salvaged Frigate Modules</strong>.</li>
  <li>Manufacturing Facilities, Operations Centres, base specialist missions and Korvax conversations can also award blueprints — see <a href={href('/poi')}>Points of Interest</a>.</li>
  <li>Dismantling tech refunds 50% of its build cost — make sure you have inventory space first, or the refund is lost.</li>
</ul>

<p class="source">
  Source: No Man's Sky community wiki ("Technology" and individual tech pages), Nov 2026. Where a page doesn't say where the blueprint comes from it's marked
  <em>Usually</em>, based on the wiki's general blueprint notes.
</p>

<style>
  tr.sub td.name { padding-left: 2rem; position: relative; }
  tr.sub td.name::before { content: '↳'; position: absolute; left: 0.9rem; color: var(--muted); }
  td.name { min-width: 220px; }
  td.cost { white-space: nowrap; }
  @media (max-width: 700px) {
    thead { display: none; }
    table, tbody, tr, td { display: block; width: 100%; }
    tr { border-bottom: 1px solid var(--border); padding: 0.4rem 0; }
    td { border: 0; padding: 0.25rem 0.9rem; }
    td[data-label]::before { content: attr(data-label); display: block; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); }
    td.name { min-width: 0; }
    tr.sub { background: var(--surface-2); }
  }
</style>
