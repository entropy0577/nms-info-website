<script>
  import { sentinelLevels, sentinelTips } from '../lib/data/gear.yaml';
</script>

<h1>Sentinels</h1>
<p class="lead">Sentinels police planets and space. Each planet's Sentinel activity is shown when you scan it from orbit — from none, through low and high, to aggressive.</p>

<h2>Wanted levels</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Level</th><th>On a planet (typical)</th><th>In space</th></tr></thead>
    <tbody>{#each sentinelLevels as l}<tr><td><strong>{l.level}</strong></td><td>{l.ground}</td><td>{l.space}</td></tr>{/each}</tbody>
  </table>
</div>
<p class="muted small">High-activity planets send more drones at each level.</p>

<h2>Tips</h2>
<ul class="tips">{#each sentinelTips as t}<li>{t}</li>{/each}</ul>

<p class="source">Source: No Man's Sky community wiki (Sentinel), Nov 2026.</p>
