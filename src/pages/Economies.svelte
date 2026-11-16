<script>
  import { economies, economyById, tierValues, strengths, smuggledGoods } from '../lib/data/economy.js';
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
</script>

<h1>Economies & Trade Goods</h1>
<p class="lead">
  Every inhabited system has an economy type and strength. Each type sells five trade goods and pays a premium for the goods of one other type.
</p>
<OnThisPage links={[['lookup', 'Name lookup'], ['types', 'Economy types'], ['routes', 'Trade routes'], ['strength', 'Strength'], ['modifiers', 'Buy/sell %'], ['smuggled', 'Outlaw systems']]} />

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
        <thead><tr><th>Tier</th><th>Trade good</th><th class="num">Value</th></tr></thead>
        <tbody>
          {#each e.goods as g, i}
            <tr><td>{i + 1}</td><td><ItemLink name={g} /></td><td class="num">{units(tierValues[i])}</td></tr>
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

<h2 id="strength">Economy strength</h2>
<p>Strength decides how many of the five goods are for sale and in what quantity, and affects the class of ships that visit.</p>
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

<p class="source">Source: No Man's Sky community wiki (Economy, Trade Goods), Nov 2026.</p>

<style>
  .lookup input { margin: 0.25rem 0 0.5rem; }
  .answer { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; }
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
  section[id], h2[id] { scroll-margin-top: 70px; }
</style>
