<script>
  import { exocraft, exocraftTips } from '../lib/data/gear.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
</script>

<h1>Exocraft</h1>
<p class="lead">Planetary vehicles for fast travel, mining, storage and combat. Each one is summoned from its own geobay.</p>

<h2>Which one?</h2>
<div class="grid">
  {#each exocraft as e}
    <div class="card">
      <div class="head"><strong>{e.name}</strong><span class="pill">{e.kind}</span></div>
      <p class="best">{e.bestFor}</p>
      <p class="small muted">{e.notes}</p>
    </div>
  {/each}
</div>

<h2>Stats</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Exocraft</th><th class="num">Tech slots</th><th class="num">Cargo slots</th><th>Speed (u/s)</th></tr></thead>
    <tbody>
      {#each exocraft as e}<tr><td><strong>{e.name}</strong></td><td class="num">{e.tech}</td><td class="num">{e.cargo}</td><td>{e.speed}</td></tr>{/each}
    </tbody>
  </table>
</div>
<p class="muted small">Speed = base → fully upgraded → boosting with engine modules in supercharged slots. Tech slots include 3 supercharged. Land vehicles are much slower in water.</p>

<h2>Tips</h2>
<ul class="tips">{#each exocraftTips as t}<li>{t}</li>{/each}</ul>
<p class="small">Related: <ItemLink name="Salvaged Data" />, <ItemLink name="Storm Crystal" />, <ItemLink name="Cyto-Phosphate" />.</p>

<p class="source">Source: No Man's Sky community wiki (Exocraft), Nov 2026.</p>

<style>
  .head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; }
  .best { margin-bottom: 0.4rem; font-size: 0.92rem; }
</style>
