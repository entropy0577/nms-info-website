<script>
  import { xFamilies, xSources, xRollTips, xNoVersion } from '../lib/data/xmodules.yaml';
  import { verdict, familyVerdict } from '../lib/xmodules.js';
  import RangeBar from '../lib/components/RangeBar.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { norm } from '../lib/format.js';

  let device = $state('All');
  let q = $state('');
  const devices = ['All', 'Starship', 'Multi-Tool', 'Exosuit'];
  const shown = $derived(
    xFamilies.filter((f) => (device === 'All' || f.device === device) && (!q || norm(f.name + ' ' + f.stats.map((s) => s.stat).join(' ')).includes(norm(q)))),
  );

  const labels = {
    better: ['X can beat S', 'good'],
    equal: ['Same cap as S', 'meh'],
    worse: ["Can't reach S", 'bad'],
    fixed: ['Fixed value', 'meh'],
    xonly: ['X-class only', 'good'],
  };
  const fmt = (v, st) => {
    const u = st.unit ?? '%';
    const sign = st.dir === 'less' ? '−' : '+';
    return `${sign}${v.toLocaleString('en-GB')}${u}`;
  };
  const range = (r, st) => (r[0] === r[1] ? fmt(r[0], st) : `${fmt(r[0], st)} to ${fmt(r[1], st)}`);
</script>

<h1>X-Class Module Roll Guide</h1>
<p class="lead">
  X-class (Suspicious) modules roll from a much wider range than normal modules. For each upgrade, compare the X-class range with S-class,
  and keep an X roll only when it beats the best S-class roll.
</p>
<OnThisPage links={[['how', 'How X rolls work'], ['guide', 'Roll ranges'], ['where', 'Where to get them']]} />

<section id="how" class="card">
  <h2 class="first">How to read this</h2>
  <div class="legend small">
    <span><span class="sw xsw"></span> X-class range</span>
    <span><span class="sw ssw"></span> S-class range</span>
    <span><span class="sw cap"></span> best S roll — keep X only if it's to the right of this</span>
  </div>
  <ul class="tips">{#each xRollTips as t}<li>{t}</li>{/each}</ul>
</section>

<h2 id="guide">Roll ranges</h2>
<div class="toolbar">
  <div class="tabs" role="group" aria-label="Device">
    {#each devices as d}<button aria-pressed={device === d} onclick={() => (device = d)}>{d}</button>{/each}
  </div>
  <input type="search" placeholder="Filter (e.g. hyperdrive, damage)" bind:value={q} />
</div>

<div class="families">
  {#each shown as f (f.name)}
    {@const fv = labels[familyVerdict(f)]}
    <article class="card fam" id={f.name.replace(/\W+/g, '-').toLowerCase()}>
      <header>
        <h3>{f.name}</h3>
        <span class="pill">{f.device}</span>
        <span class="badge {fv[1]}">{fv[0]}</span>
      </header>
      <p class="muted small meta">
        Stats rolled: S-class {f.drawn.s} · X-class {f.drawn.x}
        {#if f.packet} · Found in Suspicious Packet ({f.packet}){/if}
      </p>
      <div class="table-wrap flat">
        <table>
          <thead>
            <tr><th>Stat</th><th class="num">S-class</th><th class="num">X-class</th><th class="num">Keep X if</th><th class="barcol">Range</th></tr>
          </thead>
          <tbody>
            {#each f.stats as st}
              {@const v = verdict(st)}
              <tr class:key={st.key}>
                <td>{st.stat}{#if st.key}<span class="muted small main">main</span>{/if}</td>
                <td class="num">{st.s ? range(st.s, st) : '—'}</td>
                <td class="num xv">{range(st.x, st)}</td>
                <td class="num">
                  {#if v === 'better'}<span class="good-t">better than {fmt(st.s[1], st)}</span>
                  {:else if v === 'equal'}<span class="muted">= {fmt(st.s[1], st)} at best</span>
                  {:else if v === 'worse'}<span class="bad-t">never</span>
                  {:else if v === 'fixed'}<span class="muted">always same</span>
                  {:else}<span class="muted">higher is better</span>{/if}
                </td>
                <td class="barcol"><RangeBar s={st.s} x={st.x} /></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {#if f.note}<p class="muted small note-line">{f.note}</p>{/if}
    </article>
  {:else}
    <p class="muted">No upgrades match.</p>
  {/each}
</div>

<p class="muted small">
  No X-class version is listed on the wiki for: {xNoVersion.join(', ')}.
</p>

<h2 id="where">Where to get X-class modules</h2>
<ul class="tips">{#each xSources as t}<li>{t}</li>{/each}</ul>

<p class="source">Source: No Man's Sky community wiki — class min/max tables on each upgrade page (Procedural Upgrades), Nov 2026. Ranges are community-tested and in-game display rounds down.</p>

<style>
  .first { margin-top: 0; }
  section[id], h2[id], .fam { scroll-margin-top: 70px; }
  .legend { display: flex; flex-wrap: wrap; gap: 1.2rem; margin-bottom: 0.8rem; }
  .legend > span { display: inline-flex; align-items: center; gap: 0.4rem; }
  .sw { display: inline-block; width: 22px; height: 10px; border-radius: 3px; }
  .xsw { background: color-mix(in srgb, #c03dd6 35%, transparent); height: 14px; }
  .ssw { background: #c8961a; height: 6px; }
  .sw.cap { width: 2px; height: 16px; background: var(--text); opacity: 0.7; }
  .families { display: grid; gap: 1rem; grid-template-columns: minmax(0, 1fr); }
  .fam { min-width: 0; }
  .main { margin-left: 0.4rem; font-weight: 400; }
  .fam header { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
  .fam h3 { margin: 0 0.25rem 0 0; }
  .meta { margin: 0.35rem 0 0.6rem; }
  .flat { box-shadow: none; border: 0; border-top: 1px solid var(--border); margin: 0 -1.1rem; border-radius: 0; background: transparent; }
  .flat td:first-child, .flat th:first-child { padding-left: 1.1rem; }
  .flat td:last-child, .flat th:last-child { padding-right: 1.1rem; }
  .barcol { width: 26%; min-width: 130px; vertical-align: middle; }
  tr.key td:first-child { font-weight: 600; }
  .xv { color: #e08cf0; font-weight: 600; }
  .badge { font-size: 0.75rem; font-weight: 700; padding: 0.12rem 0.55rem; border-radius: 999px; }
  .badge.good { background: var(--good-soft); color: var(--good); }
  .badge.meh { background: var(--surface-2); color: var(--muted); }
  .badge.bad { background: var(--bad-soft); color: var(--bad); }
  .good-t { color: var(--good); font-weight: 600; }
  .bad-t { color: var(--bad); font-weight: 600; }
  .note-line { margin: 0.6rem 0 0; }
  @media (max-width: 700px) {
    .barcol { display: none; }
    .fam td.num { white-space: normal; }
    .flat th, .flat td { padding: 0.5rem 0.45rem; }
  }
</style>
