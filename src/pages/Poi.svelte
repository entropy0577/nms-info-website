<script>
  import { pois, poiGroups } from '../lib/data/poi.js';
  import { href } from '../lib/router.svelte.js';
  import { norm } from '../lib/format.js';

  let group = $state('All');
  let puzzlesOnly = $state(false);
  let q = $state('');

  const rows = $derived(
    pois.filter(
      (p) =>
        (group === 'All' || p.group === group) &&
        (!puzzlesOnly || p.puzzle) &&
        (!q || norm(`${p.name} ${p.find} ${p.inside} ${p.rewards}`).includes(norm(q))),
    ),
  );
  const puzzleCount = pois.filter((p) => p.puzzle).length;
</script>

<h1>Points of Interest</h1>
<p class="lead">
  The buildings and sites you find on planets, how to find them and what they're worth. {puzzleCount} of them have a puzzle —
  answers are on the <a href={href('/poi-puzzles')}>POI Puzzles</a> page.
</p>

<div class="toolbar">
  <input type="search" placeholder="Filter (e.g. nanites, multi-tool, portal)" bind:value={q} />
  <label class="small check"><input type="checkbox" bind:checked={puzzlesOnly} /> Only sites with a puzzle</label>
</div>
<div class="tabs" role="group" aria-label="Category">
  {#each ['All', ...poiGroups] as g}<button aria-pressed={group === g} onclick={() => (group = g)}>{g}</button>{/each}
</div>

<div class="list">
  {#each rows as p (p.name)}
    <article class="card poi">
      <header>
        <h3>{p.name}</h3>
        <span class="pill">{p.group}</span>
        {#if p.puzzle}
          <a class="badge" href={href('/poi-puzzles') + '?' + p.puzzle}>🧩 {p.puzzleType} — see answers</a>
        {/if}
      </header>
      <dl>
        <dt>Find it</dt><dd>{p.find}</dd>
        <dt>What's there</dt><dd>{p.inside}</dd>
        <dt>Rewards</dt><dd>{p.rewards}{#if p.link} <a href={href(p.link)}>More →</a>{/if}</dd>
      </dl>
    </article>
  {:else}
    <p class="muted">Nothing matches that filter.</p>
  {/each}
</div>

<h2>Finding POIs</h2>
<ul class="tips">
  <li><strong>Planetary Charts</strong> from a station Cartographer (traded for Navigation Data) point to a type of site: Secure Site, Inhabited Outpost, Distress Signal, Ancient, and more.</li>
  <li>A <strong>Signal Booster</strong> (and the Exocraft's Advanced Signal Booster) can scan for nearby structures.</li>
  <li>The <strong>Analysis Visor</strong> reveals nearby resources and small finds, and tags "Unknown Building" markers.</li>
  <li>Puzzle rewards at Observatories and Transmission Towers mark other POIs for you.</li>
</ul>

<p class="source">Source: No Man's Sky community wiki (Point of Interest and individual site pages), Nov 2026.</p>

<style>
  .check { display: inline-flex; gap: 0.35rem; align-items: center; color: var(--muted); cursor: pointer; }
  .list { display: grid; gap: 0.8rem; grid-template-columns: minmax(0, 1fr); }
  .poi header { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
  .poi h3 { margin: 0 0.25rem 0 0; }
  .badge { font-size: 0.8rem; font-weight: 600; padding: 0.15rem 0.6rem; border-radius: 999px; background: var(--accent-soft); color: var(--accent); }
  dl { display: grid; grid-template-columns: 7.5rem 1fr; gap: 0.3rem 1rem; margin: 0; font-size: 0.92rem; }
  dt { color: var(--muted); }
  dd { margin: 0; }
  @media (max-width: 600px) { dl { grid-template-columns: 1fr; } dt { margin-top: 0.3rem; } }
</style>
