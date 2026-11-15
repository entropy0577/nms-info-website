<script>
  import { affinities, affinityInfo, chart, stats, classMeaning, temperaments, abilityKinds, arenaFacts, mutagens } from '../lib/data/companions.js';
  import { effectiveness, matchup, statRating, upgradeOrder, bestTeams, leadPick } from '../lib/arena.js';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import Cls from '../lib/components/Cls.svelte';
  import { norm } from '../lib/format.js';

  // ── Affinity explorer ──
  let picked = $state('Fire');

  // ── Roster (kept in this browser only) ──
  const KEY = 'nms-info:arena-roster';
  const blank = () => ({ name: '', affinity: 'Fire', health: 'A', combat: 'A', agility: 'A', size: 'Medium', independence: 'Medium' });
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  }
  let roster = $state(load());
  let draft = $state(blank());
  $effect(() => {
    const data = JSON.stringify(roster);
    try { localStorage.setItem(KEY, data); } catch { /* storage unavailable — roster lasts this session only */ }
  });

  function add() {
    const name = draft.name.trim() || `${draft.affinity} creature ${roster.length + 1}`;
    roster.push({ ...draft, name, id: Date.now() + Math.random() });
    draft = { ...blank(), affinity: draft.affinity };
  }
  const remove = (id) => (roster = roster.filter((c) => c.id !== id));
  function example() {
    const ex = [
      ['Ember stalker', 'Fire', 'A', 'S', 'A', 'Small'], ['Glacier hulk', 'Frost', 'S', 'B', 'B', 'Large'], ['Glow beetle', 'Radioactive', 'A', 'A', 'S', 'Small'],
      ['Bog drifter', 'Toxic', 'B', 'A', 'A', 'Medium'], ['Fern grazer', 'Tropical', 'S', 'A', 'B', 'Large'], ['Prism wisp', 'Anomalous', 'B', 'A', 'S', 'Small'],
      ['Scrap walker', 'Mechanical', 'A', 'S', 'B', 'Medium'], ['Dune runner', 'Desert', 'B', 'B', 'S', 'Small'],
    ];
    roster = ex.map(([name, affinity, health, combat, agility, size], i) => ({ name, affinity, health, combat, agility, size, independence: 'Medium', id: i + 1 }));
  }

  // ── Opponent & optimiser ──
  let opp = $state(['', '', '']);
  const oppList = $derived(opp.filter(Boolean));
  const teams = $derived(bestTeams(roster, oppList, 3));
  const label = (m) => (m >= 3 ? 'Great' : m >= 1 ? 'Good' : m === 0 ? 'Neutral' : m >= -2 ? 'Risky' : 'Bad');
  const tone = (m) => (m >= 1 ? 'good' : m === 0 ? 'meh' : 'bad');

  // ── Mutagens ──
  let mq = $state('');
  let mOutcome = $state('Independence');
  const outcomes = [...new Set(mutagens.map((m) => m.outcome))];
  const mRows = $derived(
    mutagens
      .filter((m) => m.outcome === mOutcome && (!mq || norm(m.item).includes(norm(mq))))
      .sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct)),
  );
</script>

<h1>Companions & Holo-Arena</h1>
<p class="lead">
  How creature battles work, what the battle stats mean, and a team optimiser: enter your companions and the opposing lineup, and it suggests your
  best three and who to lead with.
</p>
<OnThisPage links={[['basics', 'How battles work'], ['stats', 'Battle stats'], ['affinity', 'Affinities'], ['optimiser', 'Team optimiser'], ['eggs', 'Egg Sequencer']]} />

<section id="basics">
  <h2>How battles work</h2>
  <ul class="tips">{#each arenaFacts as f}<li>{f}</li>{/each}</ul>
</section>

<section id="stats">
  <h2>Battle stats explained</h2>
  <p>Scan a creature in Creature Survey mode, or open it in the Companion Registry, to see an <strong>Overall</strong> class plus a class for each stat. The class is the stat's <em>growth ceiling</em>, not its current value.</p>
  <div class="grid">
    {#each stats as s}
      <div class="card"><div class="head"><strong>{s.name}</strong><span class="pill">Priority {s.priority}</span></div><p class="small">{s.what}</p></div>
    {/each}
  </div>
  <div class="split">
    <div>
      <h3>Classes</h3>
      <ul class="clean">{#each classMeaning as c}<li class="row"><Cls c={c.cls} /> <span class="small">{c.text}</span></li>{/each}</ul>
    </div>
    <div>
      <h3>Temperament in battle</h3>
      <ul class="clean">{#each temperaments as t}<li class="row"><strong class="tname">{t.name}</strong> <span class="small" class:muted={!t.confirmed}>{t.battle}</span></li>{/each}</ul>
    </div>
  </div>
  <h3>The five abilities</h3>
  <ol class="tips small">{#each abilityKinds as a}<li>{a}</li>{/each}</ol>
  <p class="small muted">Size also matters: big creatures are tankier but slower and easier to hit; small ones act faster and dodge more.</p>
</section>

<section id="affinity">
  <h2>Affinities</h2>
  <p>A creature's affinity comes from the biome it evolved on. Pick one to see its matchups.</p>
  <div class="tabs" role="group" aria-label="Affinity">
    {#each affinities as a}
      <button aria-pressed={picked === a} onclick={() => (picked = a)}><span class="dot" style:background={affinityInfo[a].colour}></span> {a}</button>
    {/each}
  </div>
  <div class="card aff" style:--c={affinityInfo[picked].colour}>
    <p class="small muted">Found on: {affinityInfo[picked].biome}</p>
    <div class="affgrid">
      <div><span class="k good">Hits hard</span><strong>{chart[picked].atkStrong}</strong></div>
      <div><span class="k bad">Hits weakly</span><strong>{chart[picked].atkWeak}</strong></div>
      <div><span class="k good">Resists</span><strong>{chart[picked].defStrong}</strong></div>
      <div><span class="k bad">Weak to</span><strong>{chart[picked].defWeak}</strong></div>
    </div>
  </div>

  <h3>Full chart</h3>
  <div class="table-wrap">
    <table class="matrix">
      <thead><tr><th>Attacker ↓ / Defender →</th>{#each affinities as d}<th class="c">{d.slice(0, 4)}</th>{/each}</tr></thead>
      <tbody>
        {#each affinities as a}
          <tr>
            <th>{a}</th>
            {#each affinities as d}
              {@const e = effectiveness(a, d)}
              <td class="c {e > 0 ? 'good' : e < 0 ? 'bad' : ''}">{e > 0 ? '▲' : e < 0 ? '▼' : '·'}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <p class="small muted">▲ extra damage, ▼ reduced damage. Mapped by the community from in-game matchup screens — sources disagree on a few cells, so check the matchup shown before a battle.</p>
</section>

<section id="optimiser">
  <h2>Team optimiser</h2>
  <p>Add your companions (their stat classes are in the Companion Registry), then pick the opponents' affinities shown before a battle. Your roster is saved in this browser.</p>

  <div class="card">
    <h3 class="first">1. Your companions <span class="muted small">({roster.length}/30)</span></h3>
    <form class="adder" onsubmit={(e) => { e.preventDefault(); add(); }}>
      <label class="wide">Name<input type="text" bind:value={draft.name} placeholder="optional" /></label>
      <label>Affinity<select bind:value={draft.affinity}>{#each affinities as a}<option>{a}</option>{/each}</select></label>
      <label>Health<select bind:value={draft.health}>{#each ['S', 'A', 'B', 'C'] as c}<option>{c}</option>{/each}</select></label>
      <label>Combat<select bind:value={draft.combat}>{#each ['S', 'A', 'B', 'C'] as c}<option>{c}</option>{/each}</select></label>
      <label>Agility<select bind:value={draft.agility}>{#each ['S', 'A', 'B', 'C'] as c}<option>{c}</option>{/each}</select></label>
      <label>Size<select bind:value={draft.size}>{#each ['Small', 'Medium', 'Large'] as c}<option>{c}</option>{/each}</select></label>
      <label>Independence<select bind:value={draft.independence}>{#each ['Low', 'Medium', 'High'] as c}<option>{c}</option>{/each}</select></label>
      <button class="chip primary" type="submit" disabled={roster.length >= 30}>Add</button>
    </form>

    {#if roster.length}
      <div class="table-wrap flat">
        <table>
          <thead><tr><th>Companion</th><th>Affinity</th><th>H / C / A</th><th class="num">Rating</th><th>Spend points on</th><th></th></tr></thead>
          <tbody>
            {#each roster as c (c.id)}
              <tr>
                <td><strong>{c.name}</strong><div class="muted small">{c.size}{c.independence === 'High' ? ' · High independence' : ''}</div></td>
                <td><span class="pill"><span class="dot" style:background={affinityInfo[c.affinity].colour}></span>{c.affinity}</span></td>
                <td><Cls c={c.health} /> <Cls c={c.combat} /> <Cls c={c.agility} /></td>
                <td class="num"><strong>{statRating(c)}</strong>/10</td>
                <td class="small">{upgradeOrder(c).join(' → ')}</td>
                <td><button class="x" aria-label="Remove {c.name}" onclick={() => remove(c.id)}>✕</button></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="small muted">Rating weights Agility 1.5×, Health 1.2×, Combat 1×, plus a little for High independence. "Spend points on" puts your mutation points where the class ceiling is highest.</p>
      <button class="chip" onclick={() => (roster = [])}>Clear roster</button>
    {:else}
      <p class="muted small">No companions yet. <button class="linkish" onclick={example}>Load an example roster</button> to try it out.</p>
    {/if}
  </div>

  <div class="card">
    <h3 class="first">2. Opponent lineup <span class="muted small">(leave blank to build an all-round team, e.g. for Oceanus’ daily)</span></h3>
    <div class="opp">
      {#each [0, 1, 2] as i}
        <label>Opponent {i + 1}
          <select bind:value={opp[i]}><option value="">Unknown</option>{#each affinities as a}<option>{a}</option>{/each}</select>
        </label>
      {/each}
    </div>
  </div>

  <div class="card">
    <h3 class="first">3. Suggested teams</h3>
    {#if roster.length < 1}
      <p class="muted small">Add some companions first.</p>
    {:else}
      {#each teams as t, i}
        {@const lead = leadPick(t.team, oppList[0])}
        <div class="team" class:top={i === 0}>
          <div class="thead">
            <strong>{i === 0 ? 'Best team' : `Option ${i + 1}`}</strong>
            <span class="muted small">score {t.score}</span>
          </div>
          <div class="members">
            {#each t.team as c}
              <span class="pill member"><span class="dot" style:background={affinityInfo[c.affinity].colour}></span>{c.name}{#if c === lead}<em class="lead">lead</em>{/if}</span>
            {/each}
          </div>
          <ul class="clean matchups">
            {#each t.perOpp as p}
              <li>
                <span class="vs">vs <strong>{p.opp}</strong></span>
                <span class="m {tone(p.m)}">{label(p.m)}</span>
                <span class="small">best answer: {p.best.name}</span>
                {#if p.hitBy.length > 1}<span class="small warn">⚠ hits {p.hitBy.length} of your team hard</span>{/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
      <p class="small muted">
        {#if oppList.length}Swap to each "best answer" when that opponent comes in.{:else}With no lineup given, teams are scored on how many affinities they can hit hard and how few can punish them.{/if}
        Scores are a guide built on community-reported mechanics, not the game's own maths.
      </p>
    {/if}
  </div>
</section>

<section id="eggs">
  <h2>Egg Sequencer — shaping temperament</h2>
  <p>
    At the Space Anomaly's Egg Sequencer, feed items into the Neural Calibrator to shift an egg's temperament before it hatches. Each 100% dose shifts it about 20%,
    and doses stack. For battlers, push <strong>Independence</strong> for the chance of free extra moves.
  </p>
  <div class="toolbar">
    <div class="tabs" role="group" aria-label="Temperament">
      {#each outcomes as o}<button aria-pressed={mOutcome === o} onclick={() => (mOutcome = o)}>{o}</button>{/each}
    </div>
    <input type="search" placeholder="Filter items" bind:value={mq} />
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Item</th><th class="num">Shift per item</th><th class="num">Items for 100%</th></tr></thead>
      <tbody>
        {#each mRows as m}<tr><td>{m.item}</td><td class="num">{m.pct}%</td><td class="num">{m.full || '—'}</td></tr>{/each}
      </tbody>
    </table>
  </div>
  <p class="small muted">Many cooked dishes give a full dose in one item — see <a href="#/cooking">Cooking</a>.</p>
</section>

<p class="source">
  Sources: official Xeno Arena (6.30) patch notes and the Egg Sequencer page on the community wiki; battle mechanics and affinity chart from community guides
  (NomansSkyRecipes, AllThings.How, TopGamerArena, VortexGaming), April–August 2026. Exact damage formulas aren't public.
</p>

<style>
  section { scroll-margin-top: 70px; }
  .first { margin-top: 0; }
  .head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem; }
  .split { display: grid; grid-template-columns: 1fr 1.4fr; gap: 1.5rem; }
  .row { display: flex; gap: 0.5rem; align-items: baseline; padding: 0.2rem 0; }
  .tname { min-width: 9rem; font-size: 0.9rem; }
  .tabs .dot { margin-right: 0.15rem; }
  .aff { border-left: 4px solid var(--c); }
  .affgrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
  .affgrid div { display: flex; flex-direction: column; }
  .k { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .k.good, .matrix td.good, .m.good { color: #0b7a43; }
  .k.bad, .matrix td.bad, .m.bad { color: #b4301f; }
  .matrix th, .matrix td { padding: 0.35rem 0.45rem; }
  .matrix .c { text-align: center; }
  .matrix td.good { background: color-mix(in srgb, #2fb36b 14%, transparent); }
  .matrix td.bad { background: color-mix(in srgb, #e5603b 12%, transparent); }
  .card + .card { margin-top: 0.9rem; }
  .adder { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: flex-end; margin-bottom: 0.8rem; }
  .adder label, .opp label { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.8rem; color: var(--muted); }
  .adder select, .opp select { width: auto; padding: 0.4rem 0.5rem; }
  .adder .wide input { width: 12rem; padding: 0.4rem 0.6rem; }
  .primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .opp { display: flex; flex-wrap: wrap; gap: 0.8rem; }
  .flat { box-shadow: none; margin-bottom: 0.6rem; }
  .x { background: none; border: 0; color: var(--muted); cursor: pointer; font-size: 1rem; }
  .x:hover { color: #b4301f; }
  .linkish { background: none; border: 0; padding: 0; font: inherit; color: var(--link); cursor: pointer; text-decoration: underline; }
  .team { border: 1px solid var(--border); border-radius: 8px; padding: 0.7rem 0.8rem; margin-bottom: 0.7rem; }
  .team.top { border-color: var(--accent); background: var(--accent-soft); }
  .thead { display: flex; justify-content: space-between; }
  .members { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.5rem 0; }
  .member { color: var(--text); }
  .lead { font-style: normal; font-size: 0.7rem; background: var(--accent); color: #fff; padding: 0 0.35rem; border-radius: 999px; margin-left: 0.25rem; }
  .matchups li { display: flex; flex-wrap: wrap; gap: 0.25rem 0.8rem; align-items: baseline; padding: 0.15rem 0; }
  .vs { min-width: 8.5rem; }
  .m { font-weight: 700; min-width: 4.5rem; }
  .m.meh { color: var(--muted); }
  .warn { color: #a86a00; }
  @media (prefers-color-scheme: dark) {
    .k.good, .matrix td.good, .m.good { color: #6ee7a8; }
    .k.bad, .matrix td.bad, .m.bad { color: #ff9b8f; }
    .warn { color: #f5cf5a; }
    .primary, .lead { color: #062018; }
  }
  @media (max-width: 700px) {
    .split { grid-template-columns: 1fr; }
    .affgrid { grid-template-columns: 1fr 1fr; }
  }
</style>
