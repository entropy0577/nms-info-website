<script>
  import { refinerRecipes } from '../lib/data/refiner.yaml';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import Recipe from '../lib/components/Recipe.svelte';
  import { norm } from '../lib/format.js';

  let q = $state('');
  let mode = $state('any');
  let size = $state(0);

  const rows = $derived.by(() => {
    const t = norm(q);
    return refinerRecipes.filter((r) => {
      if (size && r.in.length !== size) return false;
      if (!t) return true;
      const out = norm(r.out).includes(t);
      const inp = r.in.some(([n]) => norm(n).includes(t));
      return mode === 'out' ? out : mode === 'in' ? inp : out || inp || norm(r.name).includes(t);
    });
  });
</script>

<h1>Refiner Recipes</h1>
<p class="lead">
  All {refinerRecipes.length} known refiner recipes. Portable refiners take 1 input, Medium refiners 2 and Large refiners 3.
</p>

<div class="toolbar">
  <input type="search" placeholder="Search an item, e.g. Chromatic Metal" bind:value={q} />
  <div class="tabs" role="group" aria-label="Match">
    <button aria-pressed={mode === 'any'} onclick={() => (mode = 'any')}>Anywhere</button>
    <button aria-pressed={mode === 'out'} onclick={() => (mode = 'out')}>Makes it</button>
    <button aria-pressed={mode === 'in'} onclick={() => (mode = 'in')}>Uses it</button>
  </div>
  <div class="tabs" role="group" aria-label="Refiner size">
    {#each [[0, 'Any refiner'], [1, 'Portable (1)'], [2, 'Medium (2)'], [3, 'Large (3)']] as [n, label]}
      <button aria-pressed={size === n} onclick={() => (size = n)}>{label}</button>
    {/each}
  </div>
</div>

<p class="muted small">{rows.length} recipe{rows.length === 1 ? '' : 's'}</p>
<div class="table-wrap">
  <table>
    <thead><tr><th>Recipe</th><th class="process">Process</th></tr></thead>
    <tbody>
      {#each rows as r}
        <tr>
          <td><Recipe {r} /></td>
          <td class="muted small process">{r.name}</td>
        </tr>
      {:else}
        <tr><td colspan="2" class="muted">No recipes match.</td></tr>
      {/each}
    </tbody>
  </table>
</div>

<h2>Good to know</h2>
<ul class="tips">
  <li>Medium and Large refiners at a base or freighter need no fuel; portable ones burn Carbon or Condensed Carbon.</li>
  <li>The output slot holds 4,095 (normal mode) — empty it during big batches or refining stops.</li>
  <li><strong>Chromatic Metal loop:</strong> 1 Indium + 1 Chromatic Metal → 2 Indium, then 2 Indium → 4 Chromatic Metal. Repeat to multiply.</li>
  <li>Nanite shortcuts: 1 Salvaged Data → 15 Nanites; 5 Runaway Mould → 1 Nanite.</li>
</ul>

<p class="source">Source: No Man's Sky community wiki item pages (refining tables), Nov 2026.</p>

<style>
  @media (max-width: 600px) { .process { display: none; } }
</style>
