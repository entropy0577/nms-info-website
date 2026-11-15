<script>
  import { crafted, craftGroups, rawTotals } from '../lib/data/crafting.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import RecipeTree from '../lib/components/RecipeTree.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { units, shortUnits } from '../lib/format.js';

  let tree = $state('Fusion Ignitor');
  const raw = $derived(Object.entries(rawTotals(tree)).sort((a, b) => b[1] - a[1]));
</script>

<h1>Crafting & Profit Chains</h1>
<p class="lead">
  Key recipes, and the crafting chains that turn farmed plants and harvested gases into the game's most valuable items.
  Most of these blueprints are unlocked through base specialist missions (such as the Farmer) and at the Space Anomaly.
</p>
<OnThisPage links={[['chains', 'Profit chains'], ...craftGroups.map((g) => [g.replace(/\s+/g, '-').toLowerCase(), g])]} />

<section id="chains" class="card">
  <h2 class="first">Profit chain explorer</h2>
  <div class="tabs" role="group" aria-label="Chain">
    {#each ['Fusion Ignitor', 'Stasis Device', 'Quantum Processor', 'Portable Reactor', 'Cryogenic Chamber', 'Circuit Board', 'Living Glass'] as n}
      <button aria-pressed={tree === n} onclick={() => (tree = n)}>{n}</button>
    {/each}
  </div>
  <div class="split">
    <div>
      <h3>Recipe tree</h3>
      <RecipeTree name={tree} />
    </div>
    <div>
      <h3>Raw materials for one</h3>
      <ul class="clean raw">
        {#each raw as [n, k]}<li><ItemLink name={n} qty={k} /></li>{/each}
      </ul>
    </div>
  </div>
</section>

{#each craftGroups as g}
  <h2 id={g.replace(/\s+/g, '-').toLowerCase()}>{g}</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Product</th><th>Ingredients</th><th class="num">Value</th></tr></thead>
      <tbody>
        {#each crafted.filter((c) => c.group === g) as c}
          <tr>
            <td><ItemLink name={c.name} /></td>
            <td>{#each c.in as [n, k], i}{#if i > 0}<span class="muted plus">+</span>{/if}<ItemLink name={n} qty={k} />{/each}</td>
            <td class="num" title={units(c.value)}>{shortUnits(c.value)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/each}

<h2>Farming tips</h2>
<ul class="tips">
  <li>Grow plants in Hydroponic Trays or biodomes at a base — they grow anywhere once planted. Harvest with the Haz-Mat Gauntlet.</li>
  <li>Atmosphere Harvesters collect the biome's gas (Nitrogen, Sulphurine or Radon) automatically; they need power.</li>
  <li>Faecium comes from feeding creatures, or from Livestock Units at your base. Mordite comes from killing creatures.</li>
  <li>Craft the most valuable item your materials allow — selling intermediate products leaves most of the value on the table.</li>
</ul>

<p class="source">Source: No Man's Sky community wiki item pages (crafting recipes and values), Nov 2026.</p>

<style>
  .first { margin-top: 0; }
  .plus { margin: 0 0.35rem; }
  .split { display: grid; grid-template-columns: 1.6fr 1fr; gap: 1.5rem; }
  .raw li { padding: 0.2rem 0; border-bottom: 1px dashed var(--border); }
  h2[id], section[id] { scroll-margin-top: 70px; }
  @media (max-width: 700px) { .split { grid-template-columns: 1fr; } }
</style>
