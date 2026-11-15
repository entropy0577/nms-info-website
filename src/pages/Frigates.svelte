<script>
  import { frigateSpecialisms, frigateTips } from '../lib/data/gear.js';
</script>

<h1>Frigates</h1>
<p class="lead">Frigates join your freighter's fleet and go on timed expeditions that bring back units, resources and items.</p>

<h2>Specialisms</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Type</th><th>Guaranteed trait</th><th>Best used for</th></tr></thead>
    <tbody>{#each frigateSpecialisms as f}<tr><td><strong>{f.name}</strong></td><td>{f.trait}</td><td>{f.good}</td></tr>{/each}</tbody>
  </table>
</div>

<h2>Tips</h2>
<ul class="tips">{#each frigateTips as t}<li>{t}</li>{/each}</ul>

<p class="source">Source: No Man's Sky community wiki (Frigate), Nov 2026.</p>
