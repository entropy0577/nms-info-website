<script>
  import { economies, economyById, tierValues, tierStrength, strengths, smuggledGoods } from '../lib/data/economy.js';
  import { route } from '../lib/router.svelte.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import EconomyTag from '../lib/components/EconomyTag.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { units, norm } from '../lib/format.js';

  let lookup = $state('');
  const match = $derived.by(() => {
    const q = norm(lookup);
    if (!q) return null;
    const eco = economies.find((e) => e.aliases.some((a) => norm(a) === q || norm(a).startsWith(q)));
    const str = strengths.find((s) => s.names.some((n) => norm(n) === q || norm(n).startsWith(q)));
    return { eco, str };
  });
  const buyer = (e) => economies.find((x) => x.sellsTo === e.id);

  // Trade surge planner: pick the surge system's economy, or the good the surge asks for.
  let surgeEco = $state('');
  let surgeGood = $state('');
  const plan = $derived.by(() => {
    if (surgeGood) {
      const src = economies.find((e) => e.goods.includes(surgeGood));
      const tier = src.goods.indexOf(surgeGood);
      return { goods: [[surgeGood, tier]], from: src, to: economyById[src.sellsTo] };
    }
    if (surgeEco) {
      const to = economyById[surgeEco];
      const src = buyer(to);
      return { goods: src.goods.map((g, i) => [g, i]), from: src, to };
    }
    return null;
  });
  const pickEco = (id) => { surgeEco = surgeEco === id ? '' : id; surgeGood = ''; };
</script>

<h1>Economies & Trade Goods</h1>
<p class="lead">
  Every inhabited system has an economy type and strength. Each type sells five trade goods and pays a premium for the goods of one other type.
</p>
<OnThisPage links={[['lookup', 'Name lookup'], ['types', 'Economy types'], ['routes', 'Trade routes'], ['surges', 'Trade surges'], ['strength', 'Strength'], ['modifiers', 'Buy/sell %'], ['smuggled', 'Outlaw systems']]} />

<section id="lookup" class="card lookup">
  <label for="eco-lookup"><strong>What does the Galactic Map name mean?</strong></label>
  <p class="muted small">Type the economy word you see (e.g. "Mercantile", "Booming", "Ore Extraction").</p>
  <input id="eco-lookup" type="text" bind:value={lookup} placeholder="e.g. Alchemical" />
  {#if match}
    <div class="answer">
      {#if match.eco}<div>Type: <EconomyTag economy={match.eco} /></div>{/if}
      {#if match.str}<div>Strength: <strong>{match.str.level}</strong> {'★'.repeat(match.str.stars)}</div>{/if}
      {#if !match.eco && !match.str}<div class="muted">No match — check the spelling.</div>{/if}
    </div>
  {/if}
</section>

<h2 id="types">Economy types</h2>
<div class="eco-grid">
  {#each economies as e}
    <article id={e.id} class="card eco" class:flash={route.query === e.id} style:--eco={e.colour}>
      <header>
        <h3><span class="dot" style:background={e.colour}></span>{e.name}</h3>
        <span class="pill">Route {e.route} · {e.mapColour} on map</span>
      </header>
      <p class="muted small aliases">Sells {e.category}. Map names: {e.aliases.join(', ')}</p>
      <table>
        <thead><tr><th>Tier</th><th>Trade good</th><th>Needs</th><th class="num">Value</th></tr></thead>
        <tbody>
          {#each e.goods as g, i}
            <tr><td>{i + 1}</td><td><ItemLink name={g} /></td><td class="stars" title="Economy strength needed">{'★'.repeat(tierStrength[i].min)}{tierStrength[i].min < 3 ? '+' : ''}</td><td class="num">{units(tierValues[i])}</td></tr>
          {/each}
        </tbody>
      </table>
      <div class="flow small">
        <span>Sell these to <EconomyTag economy={economyById[e.sellsTo]} /></span>
        <span>Buys goods from <EconomyTag economy={buyer(e)} /></span>
      </div>
    </article>
  {/each}
</div>

<h2 id="routes">Trade routes</h2>
<p>Goods flow around two loops. Buy everything a system sells, warp to the next economy in the loop, sell, and repeat.</p>
<div class="table-wrap">
  <table>
    <thead><tr><th>Route</th><th>Buy in</th><th>Sell in</th></tr></thead>
    <tbody>
      {#each economies as e}
        <tr><td>{e.route}</td><td><EconomyTag economy={e} /></td><td><EconomyTag economy={economyById[e.sellsTo]} /></td></tr>
      {/each}
    </tbody>
  </table>
</div>

<h2 id="surges">Trade surges</h2>
<p>
  Added in the Orbital update (4.60). A <strong>trade surge</strong> (shown in game as a <em>market surge</em>) is a time-limited
  event in a nearby system: certain trade goods become scarce and in high demand there, so they sell for a bigger profit than
  usual. You need to find a source of those goods and get them there before the timer runs out.
</p>
<div class="grid surge-steps">
  <div class="card">
    <strong>1. Fit an Economy Scanner</strong>
    <p class="small">Starship tech. Buy the blueprint for 150 Nanites from the starship vendor on the Space Anomaly, then build it
      with 5 Microprocessors and 1 Wiring Loom.</p>
  </div>
  <div class="card">
    <strong>2. Sweep for surges</strong>
    <p class="small">In space, open the quick menu and use the Economy Scanner (under Utilities). It now sweeps nearby systems for
      market surges as well as finding Trade Outposts, and shows which goods are wanted.</p>
  </div>
  <div class="card">
    <strong>3. Source the goods</strong>
    <p class="small">Find the economy that produces those goods. Use the planner below. Strong (★★★) systems stock all five tiers
      in the biggest quantities.</p>
  </div>
  <div class="card">
    <strong>4. Sell before it ends</strong>
    <p class="small">Fly to the surge system and sell at its station or a Trade Outpost while the surge is still active.</p>
  </div>
</div>

<h3 id="surge-planner">Surge planner</h3>
<p class="small muted">Pick the surge system's economy type, or the trade good the surge asks for, to see where to buy.</p>
<div class="surge-ecos" role="group" aria-label="Surge system economy">
  {#each economies as e}
    <button class="chip eco-chip" style:--eco={e.colour} aria-pressed={surgeEco === e.id && !surgeGood} onclick={() => pickEco(e.id)}>
      <span class="dot" style:background={e.colour}></span>{e.name}
    </button>
  {/each}
</div>
<div class="toolbar">
  <select bind:value={surgeGood} aria-label="Trade good in demand">
    <option value="">…or pick the good in demand</option>
    {#each economies as e}<optgroup label={e.name}>{#each e.goods as g, i}<option value={g}>T{i + 1} · {g}</option>{/each}</optgroup>{/each}
  </select>
  {#if surgeGood || surgeEco}<button class="chip" onclick={() => { surgeGood = ''; surgeEco = ''; }}>Clear</button>{/if}
</div>
{#if plan}
  <div class="card plan">
    <div class="route">
      <span>Buy in</span><EconomyTag economy={plan.from} />
      <span class="arrow">→</span>
      <span>sell in the surge</span><EconomyTag economy={plan.to} />
    </div>
    <table>
      <thead><tr><th>Trade good</th><th>Needs</th><th class="num">Base value</th></tr></thead>
      <tbody>
        {#each plan.goods as [g, i]}
          <tr>
            <td><ItemLink name={g} /> <span class="muted small">T{i + 1}</span></td>
            <td class="stars" title="Economy strength needed">{'★'.repeat(tierStrength[i].min)}{tierStrength[i].min < 3 ? '+' : ''}</td>
            <td class="num">{units(tierValues[i])}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if !surgeGood}
      <p class="small muted">
        The surge lists the specific goods it wants. Community guides report they're the goods this economy normally imports, i.e.
        the {plan.from.name} goods above. Check the scanner's list, and pick the good from the menu if it's different.
      </p>
    {/if}
  </div>
{/if}

<h3>Tips</h3>
<ul class="tips">
  <li><strong>Fill up before you sell.</strong> Selling a good lowers its price in that system, so bring a full load and sell it in
    one go. Buy from several source systems if one doesn't stock enough.</li>
  <li><strong>Use Strong economies with a good buy %</strong> to source the goods. They carry all five tiers, and the top tiers are
    worth the most per slot.</li>
  <li><strong>Watch the timer.</strong> Surges are time-limited, so check how long is left before a long buying run.</li>
  <li><strong>Fly in rather than teleporting.</strong> One player reported in 2024 that teleporting to the surge system's station
    reset the timer and removed the surge bonus. It's unconfirmed whether that's intended or still happens.</li>
  <li>Some players report hundreds of millions of units from a single well-stocked surge run with a large cargo hold. That's
    anecdotal, so treat it as an upper bound.</li>
</ul>

<h2 id="strength">Economy strength</h2>
<p>Strength decides how many of the five goods are for sale and in what quantity, and affects the class of ships that visit.</p>
<p class="note">
  <strong>Which tiers you can buy:</strong> tier 1 goods are sold at every strength. Tiers 2–3 need ★★ Average or better (tier 2
  sometimes turns up in ★ Weak systems). Tiers 4–5 need ★★★ Strong (tier 4 sometimes turns up in ★★ Average systems).
</p>
<div class="table-wrap">
  <table>
    <thead><tr><th>Strength</th><th>Map descriptors</th><th>What it means</th></tr></thead>
    <tbody>
      {#each strengths as s}
        <tr><td><strong>{s.level}</strong><br /><span class="muted">{'★'.repeat(s.stars)}</span></td><td>{s.names.join(', ')}</td><td>{s.note}</td></tr>
      {/each}
    </tbody>
  </table>
</div>

<h2 id="modifiers">Buy & sell modifiers</h2>
<ul class="tips">
  <li><strong>Sell %</strong> (positive) is the premium paid when you sell trade goods. It caps at <strong>+80%</strong> — aim for systems at +70–80%.</li>
  <li><strong>Buy %</strong> (negative) is the discount when you buy. It caps at <strong>−30%</strong> — aim for −20 to −30%.</li>
  <li>Modifiers only apply to trade goods, not to other items.</li>
  <li>Planetary <strong>Trade Outposts</strong> give better prices than space stations, for every item.</li>
  <li>An <strong>Economy Scanner</strong> lets you see these details (and filter by economy colour) on the Galactic Map without warping.</li>
  <li>Prices drop as you sell in bulk and recover over time, so spread big sales across systems.</li>
</ul>

<h2 id="smuggled">Outlaw systems & smuggled goods</h2>
<p>
  Outlaw systems show "Black Market" and a skull instead of stars. They still have an economy type and will buy its in-demand goods, but
  instead of their own trade goods they sell smuggled goods, which sell for a big profit in regular systems (watch for cargo scans).
</p>
<div class="popular">
  {#each smuggledGoods as s}<span class="chip"><ItemLink name={s} /></span>{/each}
</div>

<p class="source">
  Source: No Man's Sky community wiki (Economy, Trade Goods, Economy Scanner, Update 4.60 "Orbital" patch notes), Nov 2026.
  Trade surge tips from community guides and Steam discussions (2024).
</p>

<style>
  .lookup input { margin: 0.25rem 0 0.5rem; }
  .answer { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; }
  td.stars { color: var(--warn); white-space: nowrap; letter-spacing: 0.05em; }
  .eco-grid { display: grid; gap: 0.9rem; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); }
  .eco { border-top: 3px solid var(--eco); padding-bottom: 0.8rem; scroll-margin-top: 70px; }
  /* These cards already have a coloured top edge, so skip the red corner brackets. */
  .eco::before, .eco::after { display: none; }
  .eco.flash { outline: 2px solid var(--eco); }
  .eco header { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
  .eco h3 { margin: 0; display: flex; align-items: center; gap: 0.45rem; }
  .aliases { margin: 0.35rem 0 0.6rem; }
  .eco table { margin: 0 -1.1rem; width: calc(100% + 2.2rem); }
  .eco th:first-child, .eco td:first-child { padding-left: 1.1rem; width: 3rem; }
  .eco th:last-child, .eco td:last-child { padding-right: 1.1rem; }
  .flow { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.75rem; }
  .eco :global(.item) { white-space: normal; }
  .popular { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  section[id], h2[id], h3[id] { scroll-margin-top: 70px; }
  .surge-steps { grid-template-columns: repeat(auto-fill, minmax(min(100%, 210px), 1fr)); margin-bottom: 0.5rem; }
  .surge-steps p { margin: 0.35rem 0 0; }
  .surge-ecos { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.7rem; }
  .eco-chip { display: inline-flex; align-items: center; gap: 0.4rem; }
  .eco-chip[aria-pressed='true'] { background: var(--surface-3); border-color: var(--eco); box-shadow: 0 0 0 1px var(--eco) inset; }
  .toolbar select { width: auto; max-width: 100%; }
  .plan { margin-bottom: 1rem; }
  .plan .route { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }
  .plan .route > span { color: var(--muted); font-size: 0.9rem; }
  .plan .arrow { color: var(--accent); font-weight: 700; }
  .plan table { margin: 0 -1.1rem 0.4rem; width: calc(100% + 2.2rem); }
  .plan th:first-child, .plan td:first-child { padding-left: 1.1rem; }
  .plan th:last-child, .plan td:last-child { padding-right: 1.1rem; }
  .plan :global(.item) { white-space: normal; }
</style>
