<script>
  import { shipTypes, shipClasses, shipSpawnByEconomy } from '../lib/data/gear.js';
  import Cls from '../lib/components/Cls.svelte';
</script>

<h1>Starships</h1>
<p class="lead">Ship type decides the class bonus and launch cost; class (C–S) decides how big the bonus is. Stronger economies spawn better ships.</p>

<h2>Types</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Type</th><th>Good at</th><th>Class bonus</th><th class="num">Launch cost</th><th>Handling</th><th>Notes</th></tr></thead>
    <tbody>
      {#each shipTypes as s}
        <tr><td><strong>{s.name}</strong></td><td>{s.strength}</td><td>{s.bonus}</td><td class="num">{s.launch}</td><td>{s.handling}</td><td class="small">{s.notes}</td></tr>
      {/each}
    </tbody>
  </table>
</div>

<h2>Classes</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Class</th><th>Bonus</th><th>Slots</th></tr></thead>
    <tbody>{#each shipClasses as c}<tr><td><Cls c={c.cls} /></td><td>{c.bonus}</td><td>{c.slots}</td></tr>{/each}</tbody>
  </table>
</div>

<h2>Where to find S-class ships</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Economy</th><th class="num"><Cls c="C" /></th><th class="num"><Cls c="B" /></th><th class="num"><Cls c="A" /></th><th class="num"><Cls c="S" /></th></tr></thead>
    <tbody>{#each shipSpawnByEconomy as r}<tr><td>{r.economy}</td><td class="num">{r.C}</td><td class="num">{r.B}</td><td class="num">{r.A}</td><td class="num">{r.S}</td></tr>{/each}</tbody>
  </table>
</div>

<h2>Tips</h2>
<ul class="tips">
  <li>Each system has 21 fixed ship designs, but class and stats are re-rolled every time a ship lands. Wait at a station in a wealthy system for your design to roll S.</li>
  <li>Large-inventory variants can be identified by their wings or fuselage — scan a ship with the Analysis Visor.</li>
  <li>Any ship can be upgraded up to S-class and expanded with Storage Augmentations and Cargo Bulkheads.</li>
  <li>Scrapping ships gives upgrade modules (sell for Nanites) — see <a href="#/money">Units & Nanites</a>.</li>
  <li>Crashed ships on planets are free but damaged; repairs can be expensive.</li>
</ul>

<p class="source">Source: No Man's Sky community wiki (Starship), Nov 2026.</p>
