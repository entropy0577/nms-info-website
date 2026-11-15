<script>
  import { findItem, aliasesOf } from '../lib/data/items.js';
  import { economyById } from '../lib/data/economy.js';
  import { categories } from '../lib/data/settlements.js';
  import { rawTotals } from '../lib/data/crafting.js';
  import { href } from '../lib/router.svelte.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import EconomyTag from '../lib/components/EconomyTag.svelte';
  import RecipeTree from '../lib/components/RecipeTree.svelte';
  import Cls from '../lib/components/Cls.svelte';
  import Recipe from '../lib/components/Recipe.svelte';
  import { units } from '../lib/format.js';

  let { name } = $props();
  const it = $derived(findItem(name));
  const aliases = $derived(it ? aliasesOf(it.name) : []);
  const buyer = $derived(it?.tradeGood ? economyById[it.tradeGood.economy.sellsTo] : null);
  const raw = $derived(it?.craft ? Object.entries(rawTotals(it.name)).sort((a, b) => b[1] - a[1]) : []);
  const wikiUrl = $derived('https://nomanssky.fandom.com/wiki/' + encodeURIComponent((it?.name || name).replace(/ /g, '_')));
  const catBuilding = (id) => categories.find((c) => c.id === id)?.building;
  const showRefineInto = 12;
  let allInto = $state(false);
</script>

{#if !it}
  <h1>{name}</h1>
  <p class="lead">This item isn't in this site's data yet.</p>
  <p><a href={wikiUrl} target="_blank" rel="noopener">Look it up on the community wiki ↗</a></p>
{:else}
  <p class="crumb small"><a href={href('/')}>Home</a> / Items</p>
  <h1>{it.name}</h1>
  <div class="meta">
    {#each [...it.kinds] as k}<span class="pill">{k}</span>{/each}
    {#if it.value != null}<span class="value">Base value <strong>{units(it.value)}</strong> units</span>{/if}
  </div>
  {#if aliases.length}<p class="muted small">Also called: {aliases.join(', ')}</p>{/if}

  <div class="sections">
    {#if it.tradeGood}
      <section class="card">
        <h2>Buy & sell</h2>
        <p>Tier {it.tradeGood.tier} trade good.</p>
        <ul class="clean facts">
          <li><span>Buy in</span><EconomyTag economy={it.tradeGood.economy} /></li>
          <li><span>Sell in</span><EconomyTag economy={buyer} /></li>
        </ul>
        <p class="muted small">Look for a strong economy with a low buy % to buy, and a high sell % to sell. <a href={href('/economies')}>Economy guide →</a></p>
      </section>
    {/if}

    {#if it.kinds.has('Smuggled good')}
      <section class="card">
        <h2>Smuggled good</h2>
        <p>Bought in outlaw systems; sells for a high price in regulated systems. Beware cargo scans.</p>
      </section>
    {/if}

    {#if it.resource}
      <section class="card">
        <h2>Where to find it</h2>
        <p>{it.resource.found}</p>
        <p class="muted small">Used for: {it.resource.use}</p>
      </section>
    {/if}

    {#if it.craft}
      <section class="card wide">
        <h2>How to craft it</h2>
        <div class="craft">
          <RecipeTree name={it.name} />
          {#if raw.length > 1 && raw.length !== it.craft.in.length}
            <div>
              <h3>Raw materials in total</h3>
              <ul class="clean list">{#each raw as [n, k]}<li><ItemLink name={n} qty={k} /></li>{/each}</ul>
            </div>
          {/if}
        </div>
      </section>
    {/if}

    {#if it.settlement.length}
      <section class="card">
        <h2>Settlement production</h2>
        <div class="table-wrap flat">
          <table>
            <thead><tr><th>Species</th><th>Needs</th><th class="num">Per batch</th></tr></thead>
            <tbody>
              {#each it.settlement as s}
                <tr><td>{s.species}</td><td>{#if s.cls !== '-'}<Cls c={s.cls} /> {/if}{catBuilding(s.cat)}</td><td class="num">{s.qty}</td></tr>
              {/each}
            </tbody>
          </table>
        </div>
        <p class="small"><a href={href('/settlements')}>Settlement guide →</a></p>
      </section>
    {/if}

    {#if it.cook}
      <section class="card">
        <h2>Cook it</h2>
        <p class="small muted">{it.cook.cat}{#if it.cook.bonus} · {it.cook.bonus}{/if}</p>
        {#each it.cook.recipes as rec}
          <p class="small cookrec">{#each rec as slot, j}{#if j > 0}<span class="muted sep">+</span>{/if}{#each slot as ing, k}{#if k > 0}<span class="muted sep">/</span>{/if}<ItemLink name={ing} />{/each}{/each}</p>
        {/each}
        <p class="small"><a href={href('/cooking') + '?' + encodeURIComponent(it.name)}>Open in Cooking →</a></p>
      </section>
    {/if}

    {#if it.usedInCooking.length}
      <section class="card">
        <h2>Used in cooking</h2>
        <ul class="clean list">
          {#each it.usedInCooking.slice(0, 15) as d}<li><ItemLink name={d} /></li>{/each}
        </ul>
        {#if it.usedInCooking.length > 15}<p class="muted small">…and {it.usedInCooking.length - 15} more — search it on the <a href={href('/cooking')}>Cooking</a> page.</p>{/if}
      </section>
    {/if}

    {#if it.usedInTech.length}
      <section class="card">
        <h2>Used to build technology</h2>
        <ul class="clean list">
          {#each it.usedInTech as t}<li><a href={href('/technology') + '?' + encodeURIComponent(t.tech)}>{t.tech}</a> <span class="muted small">{t.device} · needs {t.amount}</span></li>{/each}
        </ul>
      </section>
    {/if}

    {#if it.usedIn.length}
      <section class="card">
        <h2>Used to craft</h2>
        <ul class="clean list">
          {#each it.usedIn as u}<li><ItemLink name={u.product} /> <span class="muted small">needs {u.amount}</span></li>{/each}
        </ul>
      </section>
    {/if}

    {#if it.refinedFrom.length}
      <section class="card wide">
        <h2>Refine it from</h2>
        <div class="table-wrap flat">
          <table>
            <tbody>
              {#each it.refinedFrom as r}
                <tr><td><Recipe {r} /></td><td class="muted small process">{r.name}</td></tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
    {/if}

    {#if it.refinesInto.length}
      <section class="card wide">
        <h2>Refines into</h2>
        <div class="table-wrap flat">
          <table>
            <tbody>
              {#each allInto ? it.refinesInto : it.refinesInto.slice(0, showRefineInto) as r}
                <tr><td><Recipe {r} /></td><td class="muted small process">{r.name}</td></tr>
              {/each}
            </tbody>
          </table>
        </div>
        {#if it.refinesInto.length > showRefineInto}
          <button class="chip more" onclick={() => (allInto = !allInto)}>{allInto ? 'Show fewer' : `Show all ${it.refinesInto.length}`}</button>
        {/if}
      </section>
    {/if}
  </div>

  <p class="source"><a href={wikiUrl} target="_blank" rel="noopener">More on the community wiki ↗</a></p>
{/if}

<style>
  .crumb { margin-bottom: 0.25rem; color: var(--muted); }
  .meta { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; margin-bottom: 0.5rem; }
  .value { margin-left: 0.4rem; color: var(--muted); }
  .value strong { color: var(--text); }
  .sections { display: grid; gap: 0.9rem; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); margin-top: 1.25rem; }
  .wide { grid-column: 1 / -1; }
  section h2 { margin: 0 0 0.6rem; font-size: 1rem; }
  section h3 { font-size: 0.85rem; color: var(--muted); margin: 1rem 0 0.4rem; }
  .facts li { display: flex; align-items: center; gap: 0.6rem; padding: 0.25rem 0; }
  .facts span { width: 4rem; color: var(--muted); font-size: 0.9rem; }
  .craft { display: grid; grid-template-columns: 1.6fr 1fr; gap: 1.5rem; }
  .craft h3 { margin-top: 0; }
  @media (max-width: 700px) { .craft { grid-template-columns: 1fr; } }
  .list li { padding: 0.2rem 0; }
  .flat { box-shadow: none; border: 0; margin: 0 -1.1rem; border-radius: 0; background: transparent; }
  .flat td:first-child, .flat th:first-child { padding-left: 1.1rem; }
  .more { margin-top: 0.6rem; }
  .cookrec { margin: 0.25rem 0; line-height: 1.8; }
  @media (max-width: 600px) { .process { display: none; } }
</style>
