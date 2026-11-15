<script>
  import { securePuzzles, codePuzzles } from '../lib/data/puzzles-generated.js';
  import { monoliths, monolithTips } from '../lib/data/monoliths.js';
  import { plaqueChoice, harmonicSteps, terminalInteractions } from '../lib/data/poi.js';
  import { route, href } from '../lib/router.svelte.js';
  import { norm } from '../lib/format.js';

  // Every puzzle in one searchable list.
  const all = [
    ...monoliths.map((m, i) => ({
      kind: 'monoliths', site: 'Monolith', race: m.race, text: m.text, incomplete: m.incomplete,
      options: m.options.map((o) => ({ opt: o.opt, verdict: o.best ? 'good' : o.result && /drops|damage/i.test(o.result) ? 'bad' : 'meh', detail: o.result })),
    })),
    ...securePuzzles.map((p) => ({
      kind: 'secure', site: p.site, race: p.race, text: p.text, hot: p.hot,
      options: p.options.map((o) => ({
        opt: o.opt,
        verdict: o.mood === 'positive' ? 'good' : o.mood === 'negative' ? 'bad' : 'meh',
        detail: [...o.rewards, o.then && `then: ${o.then}`].filter(Boolean).join(' · '),
      })),
    })),
    ...codePuzzles.map((c) => ({
      kind: c.site === 'Observatory' ? 'observatory' : 'tower', site: c.site, race: c.race || 'Any', text: c.text, sequence: c.sequence, rule: c.rule,
      options: c.options.map((o) => ({ opt: o, verdict: o === c.answer ? 'good' : 'bad' })),
    })),
    ...terminalInteractions.map((t) => ({
      kind: 'terminals', site: 'Building terminal', race: 'Any', text: t.text,
      options: t.options.map((o) => ({ opt: o.opt, verdict: o.best ? 'good' : 'bad' })),
    })),
  ];

  const kinds = [
    ['all', 'All'],
    ['monoliths', 'Monoliths'],
    ['secure', 'Manufacturing / Operations'],
    ['observatory', 'Observatories'],
    ['tower', 'Transmission Towers'],
    ['harmonic', 'Harmonic Camps'],
    ['plaques', 'Plaques'],
    ['terminals', 'Other terminals'],
  ];
  const races = ['Any race', 'Gek', 'Korvax', "Vy'keen"];

  let kind = $state('all');
  let race = $state('Any race');
  let q = $state('');
  let limit = $state(25);

  // Arriving from the POI page with ?monoliths etc. selects that puzzle type.
  $effect(() => {
    kind = kinds.some(([k]) => k === route.query) ? route.query : 'all';
  });

  const results = $derived.by(() => {
    const words = norm(q).split(' ').filter(Boolean);
    return all.filter((p) => {
      if (kind !== 'all' && p.kind !== kind) return false;
      if (race !== 'Any race' && p.race !== race && p.race !== 'Any') return false;
      if (!words.length) return true;
      const hay = norm(`${p.site} ${p.text} ${p.sequence || ''} ${p.options.map((o) => o.opt).join(' ')}`);
      return words.every((w) => hay.includes(w));
    });
  });
  $effect(() => { q; kind; race; limit = 25; });

  // Generic solver for observatory codes: works even for codes not in the list.
  let codes = $state('');
  const solved = $derived.by(() => {
    const nums = codes.match(/\d{4}/g);
    if (!nums || nums.length < 2) return null;
    const left = (s) => s.slice(1) + s[0];
    const right = (s) => s.at(-1) + s.slice(0, -1);
    const last = nums.at(-1);
    const okL = nums.slice(1).every((n, i) => left(nums[i]) === n);
    const okR = nums.slice(1).every((n, i) => right(nums[i]) === n);
    if (okL && !okR) return { answer: left(last), rule: 'first digit moves to the end' };
    if (okR && !okL) return { answer: right(last), rule: 'last digit moves to the front' };
    if (okL && okR) return { answer: left(last), rule: 'repeating pattern' };
    return { answer: null };
  });

  const showHarmonic = $derived((kind === 'all' || kind === 'harmonic') && (!q || norm('harmonic camp interface glyph sentinel equation').includes(norm(q).split(' ')[0])));
  const showPlaques = $derived((kind === 'all' || kind === 'plaques') && (!q || norm('plaque language knowledge past ruin').includes(norm(q).split(' ')[0])));
</script>

<h1>POI Puzzles</h1>
<p class="lead">
  Type a few words from the text on the terminal or monolith (or the numbers shown) to find the right answer.
  Good answers are marked <span class="v good">✓</span>, bad ones <span class="v bad">✗</span>.
</p>

<div class="search card">
  <input type="search" class="big" placeholder="e.g. “drowning”, “battle enzyme”, “9183”, “coliseum”…" bind:value={q} aria-label="Search puzzles" />
  <div class="filters">
    <select bind:value={kind} aria-label="Puzzle type">{#each kinds as [k, l]}<option value={k}>{l}</option>{/each}</select>
    <select bind:value={race} aria-label="Race">{#each races as r}<option>{r}</option>{/each}</select>
  </div>
</div>

<details class="card solver" open={kind === 'observatory'}>
  <summary><strong>Observatory code solver</strong> <span class="muted small">— works for any 4-digit code sequence</span></summary>
  <input type="text" placeholder="Type the codes shown, e.g. 9183 1839 8391" bind:value={codes} />
  {#if solved?.answer}
    <p>Answer: <strong class="answer">{solved.answer}</strong> <span class="muted small">({solved.rule})</span></p>
  {:else if solved}
    <p class="muted small">Those codes don't follow the usual digit-rotation pattern — check for typos.</p>
  {/if}
</details>

{#if showHarmonic}
  <section id="harmonic" class="card">
    <h2 class="first">Harmonic Camp <span class="pill">Arithmetic glyphs</span></h2>
    <ol class="tips">{#each harmonicSteps as s}<li>{s}</li>{/each}</ol>
    <p class="small muted">Glyph values: <a href={href('/portals')}>Portals & Glyphs</a> lists all 16 (Sunset = 0 … Atlas = 15/F).</p>
  </section>
{/if}

{#if showPlaques}
  <section id="plaques" class="card">
    <h2 class="first">Plaques <span class="pill">Simple choice</span></h2>
    <ul class="clean opts">{#each plaqueChoice as c}<li><span class="v good">✓</span><span><strong>{c.opt}</strong> <span class="muted small">— {c.result}</span></span></li>{/each}</ul>
  </section>
{/if}

<p class="count muted small">{results.length} puzzle{results.length === 1 ? '' : 's'}{q ? ` matching “${q}”` : ''}</p>

<div class="results">
  {#each results.slice(0, limit) as p}
    <article class="card puzzle">
      <header>
        <span class="pill">{p.site}</span>
        {#if p.race !== 'Any'}<span class="pill">{p.race}</span>{/if}
        {#if p.hot}<span class="pill">Hot planets</span>{/if}
        {#if p.incomplete}<span class="pill">Partly known</span>{/if}
      </header>
      {#if p.sequence}<p class="seq">{p.sequence}</p>{/if}
      {#if p.text}<p class="text">{p.text}</p>{/if}
      {#if p.rule}<p class="small muted">Rule: {p.rule}</p>{/if}
      <ul class="clean opts">
        {#each p.options as o}
          <li class:best={o.verdict === 'good'}>
            <span class="v {o.verdict}">{o.verdict === 'good' ? '✓' : o.verdict === 'bad' ? '✗' : '–'}</span>
            <span><strong>{o.opt}</strong>{#if o.detail}<span class="muted small detail">{o.detail}</span>{/if}</span>
          </li>
        {/each}
      </ul>
    </article>
  {:else}
    <p class="muted">No puzzles match. Try fewer or different words — alien words in the text won't match, so use the English parts.</p>
  {/each}
</div>
{#if results.length > limit}
  <button class="chip more" onclick={() => (limit += 50)}>Show more ({results.length - limit} left)</button>
{/if}

<h2>Tips</h2>
<ul class="tips">
  {#each monolithTips as t}<li>{t}</li>{/each}
  <li>Manufacturing Facilities and Operations Centres: a good answer usually leads to the final reward screen — choose <strong>Learn new recipe</strong> or <strong>Create Multi-Tool Expansion Slot</strong> over nanites.</li>
  <li>Observatories only mark one site at a time: if you haven't visited the last one, a solved observatory says "nothing found" (you still get standing).</li>
</ul>

<p class="source">
  Sources: Manufacturing Facility / Operations Centre, Observatory and Transmission Tower puzzles from the community wiki (datamined game text);
  Monolith answers from the community Steam guide "Monolith Answers" (2024) — a few entries are incomplete. Nov 2026.
</p>

<style>
  .search { display: grid; gap: 0.6rem; margin-bottom: 0.9rem; }
  .big { max-width: none; font-size: 1.05rem; padding: 0.7rem 0.9rem; }
  .filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .filters select { width: auto; }
  .solver { margin-bottom: 0.9rem; }
  .solver summary { cursor: pointer; }
  .solver input { margin: 0.7rem 0 0.4rem; font-family: ui-monospace, monospace; }
  .answer { font: 700 1.3rem ui-monospace, monospace; color: var(--good); }
  .first { margin-top: 0; display: flex; align-items: center; gap: 0.5rem; }
  section { margin-bottom: 0.9rem; scroll-margin-top: 70px; }
  .count { margin: 1rem 0 0.5rem; }
  .results { display: grid; gap: 0.75rem; grid-template-columns: minmax(0, 1fr); }
  .puzzle header { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.5rem; }
  .text { font-size: 0.92rem; color: var(--muted); font-style: italic; }
  .seq { font: 600 1.1rem ui-monospace, monospace; margin-bottom: 0.4rem; }
  .opts li { display: flex; gap: 0.55rem; align-items: baseline; padding: 0.3rem 0.5rem; border-radius: 7px; }
  .opts li.best { background: var(--good-soft); box-shadow: inset 2px 0 0 var(--good); }
  .v { font-weight: 800; width: 1rem; text-align: center; flex: none; }
  .v.good { color: var(--good); }
  .v.bad { color: var(--bad); }
  .v.meh { color: var(--muted); }
  .more { margin-top: 0.8rem; }
  .detail::before { content: '—'; margin: 0 0.35rem; }
</style>
