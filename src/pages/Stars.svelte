<script>
  import { starColours, biomes } from '../lib/data/explore.yaml';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { findItem } from '../lib/items.js';
</script>

<h1>Stars & Biomes</h1>
<p class="lead">A star's colour tells you which warp drive you need and which stellar metal its planets have. A planet's biome tells you its hazards and local resources.</p>
<OnThisPage links={[['stars', 'Star colours'], ['biomes', 'Biomes']]} />

<h2 id="stars">Star colours</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Colour</th><th>Class</th><th>Drive needed</th><th>Stellar metal</th><th>Notes</th></tr></thead>
    <tbody>
      {#each starColours as s}
        <tr>
          <td><span class="pill"><span class="dot" style:background={s.swatch}></span>{s.colour}</span></td>
          <td>{s.classes}</td>
          <td><strong>{s.drive}</strong><br /><span class="muted small">{s.driveNeeds}</span></td>
          <td><ItemLink name={s.metal} /><br /><ItemLink name={s.activated} /></td>
          <td class="small">{s.notes}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<p class="muted small">The star class is shown in the Galactic Map — its first letter gives the colour. Activated metals appear on extreme-weather planets.</p>

<h2 id="biomes">Biomes</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Biome</th><th>Hazard</th><th>Plant</th><th>Local mineral</th><th>Gas (harvester)</th><th>Notes</th></tr></thead>
    <tbody>
      {#each biomes as b}
        <tr>
          <td><strong>{b.name}</strong></td>
          <td class="small">{b.hazard}{#if b.protection !== '—'}<br /><span class="muted">Upgrade: {b.protection}</span>{/if}</td>
          {#each [b.plant, b.mineral, b.gas] as v}
            <td>{#if findItem(v)}<ItemLink name={v} />{:else}<span class="small muted">{v}</span>{/if}</td>
          {/each}
          <td class="small">{b.notes}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<p class="muted small">Every normal biome also has the star's stellar metal and one random extra mineral. Storms can drain hazard protection up to 3× faster — shelter in caves, buildings or your ship.</p>

<p class="source">Source: No Man's Sky community wiki (System colours, Biome), Nov 2026.</p>

<style>h2[id] { scroll-margin-top: 70px; }</style>
