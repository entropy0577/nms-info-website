<script>
  import { dishes, rawIngredients } from '../lib/data/cooking.js';
  import { route } from '../lib/router.svelte.js';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { units, norm } from '../lib/format.js';

  const cats = [...new Set(dishes.map((d) => d.cat))];
  const dishNames = new Set(dishes.map((d) => d.name));

  let q = $state('');
  let mode = $state('dish');
  let cat = $state('All');
  let sort = $state('value');
  let limit = $state(30);

  // ?Dish%20Name from a link elsewhere pre-fills the search.
  $effect(() => { if (route.query && dishNames.has(route.query)) { q = route.query; mode = 'dish'; } });

  const results = $derived.by(() => {
    const t = norm(q);
    let r = dishes.filter((d) => {
      if (cat !== 'All' && d.cat !== cat) return false;
      if (!t) return true;
      if (mode === 'dish') return norm(d.name).includes(t);
      return d.recipes.some((rec) => rec.some((slot) => slot.some((i) => norm(i).includes(t))));
    });
    if (sort === 'value') r = [...r].sort((a, b) => (b.value ?? -1) - (a.value ?? -1));
    else r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  });
  $effect(() => { q; mode; cat; sort; limit = 30; });

  const topValue = [...dishes].filter((d) => d.value).sort((a, b) => b.value - a.value).slice(0, 8);
  const lookFor = (name) => { q = name; mode = dishNames.has(name) ? 'dish' : 'ingredient'; window.scrollTo({ top: document.getElementById('recipes').offsetTop - 70 }); };
  let rawQ = $state('');
  const rawRows = $derived(rawIngredients.filter((r) => !rawQ || norm(`${r.name} ${r.how}`).includes(norm(rawQ))));
</script>

<h1>Cooking</h1>
<p class="lead">
  {dishes.length} dishes you can make in a Nutrient Processor. Search by dish, or by an ingredient you have to see what it makes.
  Click any ingredient to jump to it.
</p>
<OnThisPage links={[['cronus', 'Cronus & money'], ['recipes', 'Recipes'], ['raw', 'Raw ingredients']]} />

<section id="cronus" class="card">
  <h2 class="first">Cooking for nanites & units</h2>
  <ul class="tips">
    <li>Give dishes to <strong>Iteration: Cronus</strong> on the Space Anomaly for nanites — better dishes pay more (high-grade dishes give roughly 50–320 nanites each). Present them one at a time.</li>
    <li>Dishes also sell for units at any trade terminal. Cakes and "horror" dishes made with Larval Cores or monster parts are the most valuable.</li>
    <li>Cook at a Nutrient Processor built at your base or freighter, or use the one in a settlement Saloon.</li>
    <li>Feeding creatures with Creature Pellets gives eggs, milk and other animal products used in many recipes.</li>
  </ul>
  <h3>Most valuable dishes</h3>
  <div class="chips">
    {#each topValue as d}<button class="chip" onclick={() => lookFor(d.name)}>{d.name} <span class="muted">{units(d.value)}</span></button>{/each}
  </div>
</section>

<h2 id="recipes">Recipes</h2>
<div class="toolbar">
  <input type="search" placeholder={mode === 'dish' ? 'Dish name, e.g. Mystery Meat Stew' : 'Ingredient you have, e.g. Giant Egg'} bind:value={q} />
  <div class="tabs" role="group" aria-label="Search by">
    <button aria-pressed={mode === 'dish'} onclick={() => (mode = 'dish')}>Find a dish</button>
    <button aria-pressed={mode === 'ingredient'} onclick={() => (mode = 'ingredient')}>What can I make with…</button>
  </div>
</div>
<div class="toolbar">
  <select bind:value={cat} aria-label="Category"><option>All</option>{#each cats as c}<option>{c}</option>{/each}</select>
  <select bind:value={sort} aria-label="Sort"><option value="value">Most valuable first</option><option value="name">A–Z</option></select>
  <span class="muted small">{results.length} dish{results.length === 1 ? '' : 'es'}</span>
</div>

<div class="dishes">
  {#each results.slice(0, limit) as d (d.name)}
    <article class="card dish">
      <header>
        <h3>{d.name}</h3>
        {#if d.value}<span class="val">{units(d.value)} u</span>{/if}
      </header>
      <p class="muted small meta">{d.cat}{#if d.bonus} · {d.bonus}{/if}</p>
      {#each d.recipes as rec, i}
        <div class="recipe">
          {#if d.recipes.length > 1}<span class="muted small alt">Recipe {i + 1}</span>{/if}
          {#each rec as slot, j}
            {#if j > 0}<span class="plus">+</span>{/if}
            <span class="slot">
              {#each slot as ing, k}
                {#if k > 0}<span class="or">or</span>{/if}
                <button class="ing" class:cooked={dishNames.has(ing)} onclick={() => lookFor(ing)}>{ing}</button>
              {/each}
            </span>
          {/each}
        </div>
      {/each}
    </article>
  {:else}
    <p class="muted">No dishes match.</p>
  {/each}
</div>
{#if results.length > limit}<button class="chip more" onclick={() => (limit += 60)}>Show more ({results.length - limit} left)</button>{/if}
<p class="muted small">Underlined ingredients are themselves cooked dishes — click to see how to make them.</p>

<h2 id="raw">Raw ingredients</h2>
<p>Where the basic ingredients come from.</p>
<div class="toolbar"><input type="search" placeholder="Filter, e.g. egg, milk, lush" bind:value={rawQ} /></div>
<div class="table-wrap">
  <table>
    <thead><tr><th>Ingredient</th><th>How to get it</th><th>Type</th></tr></thead>
    <tbody>
      {#each rawRows as r}<tr><td><strong>{r.name}</strong></td><td>{r.how}</td><td class="muted small">{r.source.replace('Raw Ingredients - ', '')}</td></tr>{/each}
    </tbody>
  </table>
</div>

<p class="source">Source: No Man's Sky community wiki ("Cooking" and dish pages), Nov 2026. Values are base sell values; fish have no listed value.</p>

<style>
  .first { margin-top: 0; }
  h2[id], section[id] { scroll-margin-top: 70px; }
  .chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .chips .chip { font-size: 0.85rem; }
  .toolbar select { width: auto; }
  .dishes { display: grid; gap: 0.75rem; grid-template-columns: minmax(0, 1fr); }
  .dish header { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; }
  .dish h3 { margin: 0; }
  .val { font-weight: 700; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .meta { margin: 0.15rem 0 0.5rem; }
  .recipe { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; padding: 0.35rem 0; border-top: 1px dashed var(--border); }
  .alt { width: 100%; }
  .slot { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 0.25rem; padding: 0.2rem 0.35rem; border: 1px solid var(--border); border-radius: 8px; background: var(--surface-2); }
  .plus { color: var(--muted); font-weight: 700; }
  .or { color: var(--muted); font-size: 0.75rem; }
  .ing { font: inherit; font-size: 0.85rem; background: none; border: 0; padding: 0.05rem 0.2rem; color: var(--link); cursor: pointer; border-radius: 4px; }
  .ing:hover { background: var(--accent-soft); }
  .ing.cooked { text-decoration: underline dotted; text-underline-offset: 3px; }
  .more { margin-top: 0.8rem; }
</style>
