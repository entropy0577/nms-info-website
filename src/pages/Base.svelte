<script>
  import { generators, consumption, powerRecipes, powerTips, hotspots, hotspotResources, productionParts, specialists, baseFacts } from '../lib/data/base.yaml';
  import { href } from '../lib/router.svelte.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';

  // Quick power planner: pick parts and see how much power you need.
  const plannerParts = consumption.filter(([n]) => !n.includes(','));
  let counts = $state(Object.fromEntries(plannerParts.map(([n]) => [n, 0])));
  const total = $derived(plannerParts.reduce((s, [n, kps]) => s + (counts[n] || 0) * kps, 0));
  const solarSets = $derived(Math.ceil(total / 50));
</script>

<h1>Base Building & Power</h1>
<p class="lead">How to power a base, where to put extractors, and which parts to build for farming and mining.</p>
<OnThisPage links={[['power', 'Power'], ['planner', 'Power planner'], ['hotspots', 'Hotspots'], ['parts', 'Production parts'], ['specialists', 'Specialists'], ['basics', 'Basics']]} />

<h2 id="power">Power generators</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Generator</th><th>Output</th><th>Build cost</th><th>Notes</th></tr></thead>
    <tbody>
      {#each generators as g}
        <tr>
          <td><strong>{g.name}</strong><div class="muted small">{g.blueprint}</div></td>
          <td>{g.output}<div class="muted small">Fuel: {g.fuel}</div></td>
          <td class="cost">{#each g.cost as [n, k]}<div><ItemLink name={n} qty={k} /></div>{/each}</td>
          <td class="small">{g.notes}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<h3>Which setup?</h3>
<div class="table-wrap">
  <table>
    <tbody>{#each powerRecipes as r}<tr><td><strong>{r.need}</strong></td><td>{r.setup}</td></tr>{/each}</tbody>
  </table>
</div>

<h3>Good to know</h3>
<ul class="tips">{#each powerTips as t}<li>{t}</li>{/each}</ul>

<h2 id="planner">Power planner</h2>
<div class="card planner">
  <p class="muted small">Enter how many of each part you plan to build.</p>
  <div class="pgrid">
    {#each plannerParts as [n, kps]}
      <label>
        <span>{n} <span class="muted small">{kps} kPs</span></span>
        <input type="number" min="0" max="999" bind:value={counts[n]} />
      </label>
    {/each}
  </div>
  <div class="result">
    <div><span class="muted small">Total demand</span><strong>{total} kPs</strong></div>
    <div><span class="muted small">Solar + battery</span><strong>{solarSets * 2} panels + {solarSets} batteries</strong></div>
    <div><span class="muted small">Biofuel reactors</span><strong>{solarSets}</strong></div>
    <div><span class="muted small">EM generators (C → S hotspot)</span><strong>{Math.ceil(total / 150)} → {Math.ceil(total / 300)}</strong></div>
  </div>
</div>
<p class="muted small">Lights, doors and corridors use about 1 kPs each. Full consumption list:</p>
<div class="consumption">
  {#each consumption as [n, kps]}<span class="pill">{n} · {kps} kPs</span>{/each}
</div>

<h2 id="hotspots">Hotspots</h2>
<p>
  Install the <strong>Survey Device</strong> (Analysis Visor upgrade) and switch to surveying mode to find hotspots. Higher class = more output.
  Output falls off with distance from the centre, so build in the middle.
</p>
<div class="table-wrap">
  <table>
    <thead><tr><th>Hotspot</th><th>Build</th><th>Output (C / B / A / S)</th></tr></thead>
    <tbody>{#each hotspots as h}<tr><td><strong>{h.type}</strong></td><td>{h.use}</td><td>{h.yields}</td></tr>{/each}</tbody>
  </table>
</div>
<h3>What hotspots contain</h3>
<div class="table-wrap">
  <table>
    <tbody>{#each hotspotResources as [k, v]}<tr><td><strong>{k}</strong></td><td>{v}</td></tr>{/each}</tbody>
  </table>
</div>
<p class="muted small">Any biome can also have an extra random mineral hotspot. Activated Indium on a blue-star planet is a classic money farm — see <a href={href('/money')}>Units & Nanites</a>.</p>

<h2 id="parts">Production parts</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Part</th><th>Build cost</th><th class="num">Power</th><th>Notes</th></tr></thead>
    <tbody>
      {#each productionParts as p}
        <tr>
          <td><strong>{p.name}</strong></td>
          <td class="cost">{#each p.cost as [n, k]}<div><ItemLink name={n} qty={k} /></div>{/each}</td>
          <td class="num">{p.power ? `${p.power} kPs` : '—'}</td>
          <td class="small">{p.notes}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<p class="muted small">What to grow and how to turn it into money: <a href={href('/crafting')}>Crafting & Profit Chains</a>.</p>

<h2 id="specialists">Base specialists</h2>
<p>Build a specialist's terminal at your base, then recruit them from a space station. Their mission chains unlock most farming and tech blueprints.</p>
<div class="table-wrap">
  <table>
    <thead><tr><th>Specialist</th><th>Terminal</th><th>Unlocks</th></tr></thead>
    <tbody>{#each specialists as s}<tr><td><strong>{s.role}</strong></td><td>{s.terminal}</td><td class="small">{s.unlocks}</td></tr>{/each}</tbody>
  </table>
</div>

<h2 id="basics">Basics</h2>
<ul class="tips">{#each baseFacts as f}<li>{f}</li>{/each}</ul>

<p class="source">Source: No Man's Sky community wiki (Power, Base building, Hotspot, Construction Terminal and part pages), Nov 2026.</p>

<style>
  h2[id] { scroll-margin-top: 70px; }
  td.cost { white-space: nowrap; }
  .pgrid { display: grid; gap: 0.5rem 1.25rem; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
  .pgrid label { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
  .pgrid input { width: 4.5rem; max-width: 4.5rem; padding: 0.3rem 0.4rem; text-align: right; }
  .result { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); margin-top: 1rem; padding-top: 0.9rem; border-top: 1px solid var(--border); }
  .result div { display: flex; flex-direction: column; }
  .result strong { font-size: 1.05rem; }
  .consumption { display: flex; flex-wrap: wrap; gap: 0.35rem; }
</style>
