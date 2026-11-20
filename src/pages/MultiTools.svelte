<script>
  import { multiToolTypes } from '../lib/data/gear.yaml';
</script>

<h1>Multi-Tools</h1>
<p class="lead">Multi-tool type decides which stats get a bonus. Class (C–S) decides how big.</p>

<div class="table-wrap">
  <table>
    <thead><tr><th>Type</th><th>Best for</th><th>Notes</th></tr></thead>
    <tbody>
      {#each multiToolTypes as m}
        <tr><td><strong>{m.name}</strong></td><td>{m.role}</td><td>{m.notes}{#if m.name === 'Voltaic Staff'} <a href="#/voltaic-staff">Full guide →</a>{/if}</td></tr>
      {/each}
    </tbody>
  </table>
</div>

<h2>Getting a better one</h2>
<ul class="tips">
  <li>Buy from Multi-Tool cabinets in space stations, trading posts and settlement factories. The stock changes by system.</li>
  <li>Royal (Exotic) multi-tools only come from Sentinel Pillars; Sentinel types from Harmonic Camps.</li>
  <li>Upgrade class and slot count at the Space Anomaly (and with Storage Augmentations).</li>
  <li>Upgrade modules of the same type placed next to each other get an adjacency (synergy) bonus.</li>
</ul>

<p class="source">Source: No Man's Sky community wiki (Multi-Tool), Nov 2026.</p>
