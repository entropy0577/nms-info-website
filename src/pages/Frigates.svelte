<script>
  import { frigateTypes, expeditionTypes, boosters, fuelItems, rankUps, repairs, expeditionFacts, safety, damageFacts, organicFacts, buyingTips, traits } from '../lib/data/expeditions.yaml';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { expeditionRewards } from '../lib/data/expedition-rewards.yaml';
  import { norm, units } from '../lib/format.js';

  // ── Fuel calculator ──
  let distance = $state(3000);
  let ships = $state([10, 10, 10, 10, 3]);
  let reduction = $state(0);
  const fuel = $derived.by(() => {
    const eff = Math.round((Number(distance) || 0) / 250) * 250;
    const per = ships.reduce((s, x) => s + (Number(x) || 0), 0);
    const raw = (eff / 250) * per - (Number(reduction) || 0);
    const total = Math.max(0, Math.ceil(raw / 50) * 50);
    // Fewest fuel items: 200s first, then 100, then 50.
    let left = total;
    const n200 = Math.floor(left / 200); left -= n200 * 200;
    const n100 = Math.floor(left / 100); left -= n100 * 100;
    const n50 = Math.ceil(left / 50);
    return { eff, per, raw, total, n200, n100, n50, dh: total, tr: total };
  });

  // ── Frigate checker ──
  let fc = $state({ combat: 0, exploration: 0, industry: 0, trade: 0, bonuses: 0, expeditions: 0, good: 1, bad: 0 });
  const ranksDone = $derived(rankUps.filter((r) => r <= (Number(fc.expeditions) || 0)).length);
  const glitched = $derived(rankUps.includes(Number(fc.expeditions)));
  const baseStats = $derived((Number(fc.combat) + Number(fc.exploration) + Number(fc.industry) + Number(fc.trade)) - (Number(fc.bonuses) + ranksDone * 6));
  const verdict = $derived(
    glitched || baseStats < 0 ? ['Avoid — looks bugged', 'bad'] : baseStats >= 12 ? ['Excellent', 'good'] : baseStats >= 9 ? ['Good', 'good'] : baseStats >= 5 ? ['Average', 'meh'] : ['Poor', 'bad'],
  );
  const toS = $derived(Math.max(0, 5 - (Number(fc.good) - Number(fc.bad))));
  const sAt = $derived.by(() => {
    if (toS === 0) return 'Already S-class';
    const next = rankUps.filter((r) => r > (Number(fc.expeditions) || 0));
    return next[toS - 1] ? `S-class at about ${next[toS - 1]} expeditions` : 'Can’t reach S-class (runs out of rank-ups)';
  });

  // ── Reward tables ──
  let rType = $state('Trade');
  let rFleet = $state('normal');
  const pools = $derived(expeditionRewards[rType][rFleet]);
  const amount = (i) => (i.min == null ? '—' : i.min === i.max ? units(i.min) : `${units(i.min)}–${units(i.max)}`);

  // ── Trait lookup ──
  let tq = $state('');
  const tRows = $derived(traits.filter((t) => !tq || norm(`${t.trait} ${t.group}`).includes(norm(tq))));
</script>

<h1>Frigates & Expeditions</h1>
<p class="lead">Build a fleet, send it on expeditions from your freighter, and keep it alive. Includes a fuel calculator, a frigate checker to use before you buy, and a trait lookup.</p>
<OnThisPage links={[['how', 'How it works'], ['types', 'Frigate types'], ['rewards', 'Rewards'], ['tables', 'Reward tables'], ['safety', 'Difficulty'], ['fuel', 'Fuel calculator'], ['checker', 'Frigate checker'], ['traits', 'Traits'], ['repair', 'Damage & repair']]} />

<section id="how">
  <h2>How expeditions work</h2>
  <ul class="tips">{#each expeditionFacts as f}<li>{f}</li>{/each}</ul>
</section>

<section id="types">
  <h2>Frigate types</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Type</th><th>Guaranteed trait</th><th>While docked</th><th>Names by class (C → S)</th></tr></thead>
      <tbody>
        {#each frigateTypes as f}
          <tr><td><strong>{f.type}</strong></td><td>{f.bonus}</td><td class="small">{f.passive}</td><td class="small muted">{f.classes.join(' → ')}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
  <h3>Before you buy</h3>
  <ul class="tips">{#each buyingTips as t}<li>{t}</li>{/each}</ul>
</section>

<section id="rewards">
  <h2>Expedition types & rewards</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Expedition</th><th>Typical rewards</th></tr></thead>
      <tbody>{#each expeditionTypes as e}<tr><td><strong>{e.type}</strong></td><td class="small">{e.rewards}</td></tr>{/each}</tbody>
    </table>
  </div>
  <h3>Boosters (up to 3 per expedition)</h3>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Item</th><th>Effect</th><th>Craft</th></tr></thead>
      <tbody>
        {#each boosters as b}
          <tr><td><ItemLink name={b.name} /></td><td>{b.effect}</td><td>{#each b.cost as [n, k], i}{#if i > 0}<span class="muted sep">+</span>{/if}<ItemLink name={n} qty={k} />{/each}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<section id="tables">
  <h2>Reward tables</h2>
  <p>
    The game's own expedition reward table. Each expedition type has several reward pools; when a pool pays out, each line is included with the
    chance shown. Small fleets (1–3 frigates) use pools with the same items at roughly a tenth of the amounts.
  </p>
  <div class="toolbar">
    <div class="tabs" role="group" aria-label="Expedition type">
      {#each Object.keys(expeditionRewards) as t}<button aria-pressed={rType === t} onclick={() => (rType = t)}>{t}</button>{/each}
    </div>
    <div class="tabs" role="group" aria-label="Fleet size">
      <button aria-pressed={rFleet === 'normal'} onclick={() => (rFleet = 'normal')}>4+ frigates</button>
      <button aria-pressed={rFleet === 'small'} onclick={() => (rFleet = 'small')}>1–3 frigates</button>
    </div>
  </div>
  <div class="pools">
    {#each pools as pool, i}
      <div class="card pool">
        <h3 class="ptitle">Pool {i + 1}</h3>
        <div class="pool-scroll">
        <table>
          <thead><tr><th>Reward</th><th class="num">Chance</th><th class="num">Amount</th></tr></thead>
          <tbody>
            {#each pool as r}
              <tr>
                <td>{#if r.item === 'Units' || r.item === 'Nanites' || r.item.startsWith('Random')}<span>{r.item}</span>{:else}<ItemLink name={r.item} />{/if}</td>
                <td class="num" class:muted={r.chance < 100}>{r.chance}%</td>
                <td class="num">{amount(r)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
        </div>
      </div>
    {/each}
  </div>
  <p class="small muted">
    Balanced expeditions draw from all four types. Frigates with an extra-loot trait can bring back more on top.
    Data is from the game files as of version 3.10 (matching the wiki's 3.75 summary); Hello Games may have retuned amounts since.
  </p>
</section>

<section id="safety">
  <h2>Difficulty & safety</h2>
  <p>Expeditions are rated in stars, and so is your fleet once you pick frigates. The lights on a frigate in Manage Fleet show its number of good traits, not its stars.</p>
  <div class="table-wrap">
    <table><tbody>{#each safety as s}<tr><td><strong>{s.rating}</strong></td><td>{s.result}</td></tr>{/each}</tbody></table>
  </div>
  <p class="small muted">The wiki's two pages disagree on whether 1 or 2 stars above is enough — 2 is the safe choice. Cheap Support frigates are good filler for raising fleet stars.</p>
</section>

<section id="fuel">
  <h2>Fuel calculator</h2>
  <div class="card">
    <div class="form">
      <label>Expedition distance (ly)<input type="number" min="0" step="50" bind:value={distance} /></label>
      <label>Fuel reduction from traits (tonnes)<input type="number" min="0" bind:value={reduction} /></label>
    </div>
    <p class="small muted">Each frigate's fuel use, in tonnes per 250 ly (shown on the bridge screen):</p>
    <div class="ships">
      {#each ships as _, i}
        <label class="ship">#{i + 1}<input type="number" min="0" bind:value={ships[i]} /><button class="x" aria-label="Remove frigate {i + 1}" onclick={() => ships.splice(i, 1)}>✕</button></label>
      {/each}
      {#if ships.length < 5}<button class="chip" onclick={() => ships.push(10)}>+ Add frigate</button>{/if}
    </div>
    <div class="result">
      <div><span class="muted small">Total fuel</span><strong>{fuel.total} tonnes</strong></div>
      <div><span class="muted small">Using</span><strong>{[fuel.n200 && `${fuel.n200}× 200t`, fuel.n100 && `${fuel.n100}× 100t`, fuel.n50 && `${fuel.n50}× 50t`].filter(Boolean).join(' + ') || 'nothing'}</strong></div>
      <div><span class="muted small">Raw materials</span><strong>{fuel.dh} Di-hydrogen + {fuel.tr} Tritium</strong></div>
    </div>
    <p class="small muted">Formula: distance rounded to the nearest 250 ly ÷ 250 × total fuel per 250 ly − trait reductions, rounded up to a multiple of 50. Smaller fuel canisters in the freighter are used first.</p>
  </div>
  <div class="table-wrap fuelt">
    <table>
      <thead><tr><th>Fuel item</th><th>Craft</th></tr></thead>
      <tbody>{#each fuelItems as f}<tr><td>{f.name}</td><td>{#each f.cost as [n, k], i}{#if i > 0}<span class="muted sep">+</span>{/if}<ItemLink name={n} qty={k} />{/each}</td></tr>{/each}</tbody>
    </table>
  </div>
  <p class="small muted">Support frigates cut fuel by a fixed amount per expedition, so they help most on short trips and can cost more on long ones.</p>
</section>

<section id="checker">
  <h2>Frigate checker</h2>
  <p>Use this on a frigate for sale (Manage Fleet / the hire screen shows these numbers) to see its hidden base quality and how long it takes to reach S-class.</p>
  <div class="card">
    <div class="form">
      <label>Combat<input type="number" bind:value={fc.combat} /></label>
      <label>Exploration<input type="number" bind:value={fc.exploration} /></label>
      <label>Industry<input type="number" bind:value={fc.industry} /></label>
      <label>Trading<input type="number" bind:value={fc.trade} /></label>
      <label title="Add up the +/− numbers of traits that affect these four stats">Sum of trait bonuses to these 4<input type="number" bind:value={fc.bonuses} /></label>
      <label>Expeditions completed<input type="number" min="0" bind:value={fc.expeditions} /></label>
      <label>Good traits<input type="number" min="0" max="5" bind:value={fc.good} /></label>
      <label>Bad traits<input type="number" min="0" max="5" bind:value={fc.bad} /></label>
    </div>
    <div class="result">
      <div><span class="muted small">Base stats</span><strong>{baseStats}</strong></div>
      <div><span class="muted small">Verdict</span><strong class={verdict[1]}>{verdict[0]}</strong></div>
      <div><span class="muted small">Rank-ups so far</span><strong>{ranksDone}</strong></div>
      <div><span class="muted small">To S-class</span><strong>{toS} rank-up{toS === 1 ? '' : 's'}</strong><span class="small">{sAt}</span></div>
    </div>
    <p class="small muted">
      Base stats = (Combat + Exploration + Industry + Trading) − (trait bonuses + 6 × rank-ups). Good fresh frigates have about 9–12; the best known is 14.
      Rank-ups happen at {rankUps.join(', ')} expeditions.
    </p>
  </div>
</section>

<section id="traits">
  <h2>Trait lookup</h2>
  <div class="toolbar"><input type="search" placeholder="Trait name or effect, e.g. fuel, duration, Roach" bind:value={tq} /></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Trait</th><th>Affects</th><th class="num">Value</th></tr></thead>
      <tbody>
        {#each tRows as t}
          <tr><td>{t.good ? '✓' : '✗'} <strong>{t.trait}</strong></td><td class="small">{t.group}</td><td class="num {t.good ? 'good' : 'bad'}">{t.value || '—'}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
  <p class="small muted">Fuel-cost traits are a one-off amount per expedition; "Cost Per Warp" traits add tonnes per warp. Duration traits shorten the expedition.</p>
</section>

<section id="repair">
  <h2>Damage & repair</h2>
  <ul class="tips">{#each damageFacts as f}<li>{f}</li>{/each}</ul>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Damaged component</th><th>Repair with</th></tr></thead>
      <tbody>{#each repairs as [n, c]}<tr><td>{n}</td><td>{c}</td></tr>{/each}</tbody>
    </table>
  </div>
  <h3>Organic frigates</h3>
  <ul class="tips">{#each organicFacts as f}<li>{f}</li>{/each}</ul>
</section>

<p class="source">Source: No Man's Sky community wiki (Frigate, Frigate Expedition and item pages), Nov 2026.</p>

<style>
  section { scroll-margin-top: 70px; }
  .form { display: grid; gap: 0.6rem 1rem; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); margin-bottom: 0.8rem; }
  .form label { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.82rem; color: var(--muted); }
  .form input { max-width: none; padding: 0.4rem 0.6rem; }
  .ships { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
  .ship { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.85rem; color: var(--muted); }
  .ship input { width: 4.5rem; padding: 0.35rem 0.4rem; }
  .x { background: none; border: 0; color: var(--muted); cursor: pointer; }
  .result { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); margin-top: 1rem; padding-top: 0.9rem; border-top: 1px solid var(--border); }
  .result div { display: flex; flex-direction: column; }
  .result strong { font-size: 1.05rem; }
  .good { color: var(--good); }
  .bad { color: var(--bad); }
  .meh { color: var(--muted); }
  .fuelt { margin-top: 0.9rem; }
  .pools { display: grid; gap: 0.8rem; grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr)); align-items: start; }
  .pool td.num { white-space: nowrap; }
  .pool { padding: 0.8rem 0; }
  .pool-scroll { overflow-x: auto; }
  .pool .ptitle { margin: 0 1rem 0.4rem; font-size: 0.9rem; color: var(--muted); }
  .pool th:first-child, .pool td:first-child { padding-left: 1rem; }
  .pool th:last-child, .pool td:last-child { padding-right: 1rem; }
</style>
