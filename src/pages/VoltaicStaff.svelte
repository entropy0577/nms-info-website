<script>
  import { staffStats, staffSets, staffParts, staffFacts, unlockSteps, staffMechanics, secondarySteps, huntSteps, voidMoteSources, unconfirmed } from '../lib/data/voltaic.js';
  import { href } from '../lib/router.svelte.js';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import Cls from '../lib/components/Cls.svelte';
  import { units } from '../lib/format.js';

  const bySlot = (slot) => staffParts.filter((p) => p.slot === slot);
  const heads = bySlot('Head');
  const cores = bySlot('Core');
  const poles = bySlot('Pole');

  // ── Build planner ──
  let head = $state(heads[0].name);
  let core = $state(cores[0].name);
  let pole = $state(poles[0].name);
  let owned = $state(0);
  const priceOf = (n) => staffParts.find((p) => p.name === n)?.price ?? 0;
  const buildCost = $derived(priceOf(head) + priceOf(core) + priceOf(pole));
  const allHeadsCost = heads.reduce((s, p) => s + (p.price ?? 0), 0);
  const stillNeed = $derived(Math.max(0, buildCost - (Number(owned) || 0)));
  const label = (p) => `${p.name} — ${p.price ? `${units(p.price)} VM` : 'free'}`;

  // ── Hunt checklist (remembered in this browser) ──
  const KEY = 'nms-info:staff-hunt';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
  let done = $state(load());
  $effect(() => { const d = JSON.stringify(done); try { localStorage.setItem(KEY, d); } catch { /* not saved */ } });
  const toggle = (i) => (done = done.includes(i) ? done.filter((x) => x !== i) : [...done, i]);
</script>

<section class="banner atlas-band">
  <div>
    <p class="kicker">Autophage multi-tool</p>
    <h1>Voltaic Staff</h1>
    <p class="intro">
      A custom-built staff assembled from Autophage parts. It's a combat multi-tool with high damage and scanner bonuses. This page covers how to
      unlock it, what each part costs, and how to hunt for an S-class staff.
    </p>
  </div>
  <svg class="art" viewBox="0 0 60 200" aria-hidden="true">
    <defs><linearGradient id="vs" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff6a6f" /><stop offset="1" stop-color="#5c0a10" /></linearGradient></defs>
    <circle cx="30" cy="26" r="20" fill="none" stroke="#e02d36" stroke-opacity="0.5" />
    <circle cx="30" cy="26" r="11" fill="url(#vs)" />
    <path d="M30 6 L36 26 L30 46 L24 26 Z" fill="none" stroke="#ffb3b0" stroke-opacity="0.6" />
    <rect x="25" y="60" width="10" height="22" rx="3" fill="#1b1419" stroke="#e02d36" stroke-opacity="0.6" />
    <rect x="28.5" y="46" width="3" height="150" rx="1.5" fill="url(#vs)" opacity="0.85" />
  </svg>
</section>

<OnThisPage links={[['overview', 'Overview'], ['unlock', 'Unlocking'], ['parts', 'Parts & prices'], ['planner', 'Build planner'], ['class', 'How class works'], ['hunt', 'S-class hunt'], ['motes', 'Void Motes']]} />

<section id="overview">
  <h2>Overview</h2>
  <ul class="tips">{#each staffFacts as f}<li>{f}</li>{/each}</ul>
  <h3>Stat bonuses by class</h3>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Class</th><th class="num">Damage</th><th class="num">Mining</th><th class="num">Scanner</th></tr></thead>
      <tbody>
        {#each staffStats as s}
          <tr><td><Cls c={s.cls} /></td><td class="num">+{s.damage[0]}–{s.damage[1]}%</td><td class="num">+{s.mining[0]}–{s.mining[1]}%</td><td class="num">+{s.scan[0]}–{s.scan[1]}%</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
  <p class="small muted">Compare with other types on <a href={href('/multitools')}>Multi-Tools</a>.</p>
</section>

<section id="unlock">
  <h2>Unlocking it — They Who Returned</h2>
  <ol class="steps">
    {#each unlockSteps as s, i}
      <li>
        <span class="num-badge">{i + 1}</span>
        <div><strong>{s.step}</strong><p class="small muted">{s.detail}{#if s.link} <a href={href(s.link.split('?')[0]) + '?' + s.link.split('?')[1]}>Puzzle answer →</a>{/if}</p></div>
      </li>
    {/each}
  </ol>
  <p class="small muted">Common myths: you don't need a Korvax system, a Sentinel ship, the Settlers missions or A Trace of Metal to trigger the quest.</p>
</section>

<section id="parts">
  <h2>Parts & prices</h2>
  <p>Bought with Void Motes at Autophage Synthesis Terminals and Harmonic Interfaces. Each terminal stocks at least six parts, not all of them.</p>
  <div class="sets">
    {#each staffSets as set}
      <div class="card set">
        <h3>{set.set}</h3>
        <ul class="clean">
          {#each set.parts as p}
            <li><span class="slot slot-{p.slot.toLowerCase()}">{p.slot}</span><span class="pname">{p.name}</span><span class="price">{p.price ? `${units(p.price)} VM` : 'Free'}</span></li>
          {/each}
        </ul>
        {#if set.note}<p class="small muted note-line">{set.note}</p>{/if}
      </div>
    {/each}
  </div>
  <p class="small muted">Prices can vary slightly between terminals.</p>
</section>

<section id="planner">
  <h2>Build planner</h2>
  <div class="card planner">
    <div class="pick">
      <label>Head<select bind:value={head}>{#each heads as p}<option value={p.name}>{label(p)}</option>{/each}</select></label>
      <label>Core<select bind:value={core}>{#each cores as p}<option value={p.name}>{label(p)}</option>{/each}</select></label>
      <label>Pole<select bind:value={pole}>{#each poles as p}<option value={p.name}>{label(p)}</option>{/each}</select></label>
      <label>Void Motes you have<input type="number" min="0" bind:value={owned} /></label>
    </div>
    <div class="result">
      <div><span class="muted small">This build costs</span><strong>{units(buildCost)} VM</strong></div>
      <div><span class="muted small">Still needed</span><strong class:ok={stillNeed === 0}>{stillNeed === 0 ? 'You can afford it' : `${units(stillNeed)} VM`}</strong></div>
      <div><span class="muted small">All six bought heads (for an S-class hunt)</span><strong>{units(allHeadsCost)} VM</strong></div>
    </div>
    <p class="small muted">Only the head affects class and colour, so to hunt cheaply pair any head with the free quest Core and Pole.</p>
  </div>
</section>

<section id="class">
  <h2>How class and colour are decided</h2>
  <div class="grid mech">
    {#each staffMechanics as m}<div class="card"><strong>{m.title}</strong><p class="small">{m.text}</p></div>{/each}
  </div>
  <h3>Unlocking the secondary result</h3>
  <ol class="tips">{#each secondarySteps as s}<li>{s}</li>{/each}</ol>
  <p class="note small">Unconfirmed: {unconfirmed}</p>
</section>

<section id="hunt">
  <h2>S-class hunt checklist</h2>
  <p class="small muted">Tick steps off as you go — this is remembered in your browser.</p>
  <ul class="clean check">
    {#each huntSteps as s, i}
      <li class:done={done.includes(i)}>
        <label><input type="checkbox" checked={done.includes(i)} onchange={() => toggle(i)} /> <span>{s}</span></label>
      </li>
    {/each}
  </ul>
  {#if done.length}<button class="chip" onclick={() => (done = [])}>Reset checklist</button>{/if}
  <p class="small muted">Tip: if you're willing to spend a few hours hopping between camps, you can find an S-class staff with four adjacent supercharged slots.</p>
</section>

<section id="motes">
  <h2>Getting Void Motes</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Source</th><th>Amount</th></tr></thead>
      <tbody>{#each voidMoteSources as v}<tr><td>{v.source}</td><td>{v.amount}</td></tr>{/each}</tbody>
    </table>
  </div>
  <p class="small muted">Void Motes are also spent on Autophage cosmetics and Rebuilt Exosuit Modules (~400 VM) at the same terminals.</p>
</section>

<p class="source">
  Source: No Man's Sky community wiki (Multi-Tool Catalogue – Voltaic Staff, Voltaic Staff, Autophage Synthesis Terminal, Void Mote, They Who Returned), Nov 2026.
  The class mechanics come from player testing.
</p>

<style>
  section { scroll-margin-top: 70px; }
  .banner { display: grid; grid-template-columns: 1fr 70px; gap: 1.5rem; align-items: center; padding: 1.6rem 1.75rem; margin-bottom: 1.25rem; }
  .banner h1 { font-size: 2.4rem; margin-bottom: 0.5rem; text-shadow: 0 0 30px rgb(224 45 54 / 0.35); }
  .banner h1::before { display: none; }
  .kicker { font-family: var(--font-display); text-transform: uppercase; letter-spacing: 0.25em; font-size: 0.8rem; color: var(--accent-bright); margin: 0 0 0.35rem; }
  .intro { color: #cdbfc0; max-width: 62ch; margin: 0; }
  .art { width: 60px; height: 180px; filter: drop-shadow(0 0 14px rgb(224 45 54 / 0.5)); }

  .steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; }
  .steps li { display: flex; gap: 0.8rem; align-items: flex-start; padding: 0.6rem 0.8rem; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); }
  .steps p { margin: 0.15rem 0 0; }
  .num-badge { flex: none; width: 1.7rem; height: 1.7rem; display: grid; place-items: center; font-family: var(--font-display); font-weight: 700; color: #fff; background: var(--accent); clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }

  .sets { display: grid; gap: 0.8rem; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
  .set h3 { margin-top: 0; }
  .set li { display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; border-bottom: 1px dashed var(--border); }
  .set li:last-child { border-bottom: 0; }
  .pname { flex: 1; }
  .price { font-variant-numeric: tabular-nums; color: #fff; font-weight: 600; }
  .slot { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-display); font-weight: 700; padding: 0.05rem 0.4rem; border-radius: 4px; min-width: 2.8rem; text-align: center; }
  .slot-head { background: var(--accent); color: #fff; }
  .slot-core { background: rgb(224 45 54 / 0.25); color: #ffb3b0; }
  .slot-pole { background: var(--surface-3); color: var(--muted); }
  .note-line { margin: 0.5rem 0 0; }

  .pick { display: grid; gap: 0.6rem 1rem; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
  .pick label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.82rem; color: var(--muted); }
  .pick select, .pick input { max-width: none; }
  .result { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); margin-top: 1rem; padding-top: 0.9rem; border-top: 1px solid var(--border); }
  .result div { display: flex; flex-direction: column; }
  .result strong { font-family: var(--font-display); font-size: 1.35rem; color: #fff; }
  .result strong.ok { color: var(--good); }

  .mech .card p { margin: 0.3rem 0 0; }

  .check li { padding: 0.45rem 0.6rem; border-radius: 6px; }
  .check li:hover { background: var(--surface-2); }
  .check label { display: flex; gap: 0.6rem; align-items: flex-start; cursor: pointer; }
  .check input { accent-color: var(--accent); margin-top: 0.3rem; }
  .check li.done span { color: var(--muted); text-decoration: line-through; text-decoration-color: var(--accent); }

  @media (max-width: 700px) {
    .banner { grid-template-columns: 1fr; padding: 1.25rem; }
    .art { display: none; }
    .banner h1 { font-size: 1.9rem; }
  }
</style>
