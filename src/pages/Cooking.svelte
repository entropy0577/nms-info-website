<script>
  import { dishes, rawIngredients } from '../lib/data/cooking.yaml';
  import { tick } from 'svelte';
  import { route, scrollToAnchor, href } from '../lib/router.svelte.js';
  import { ingestEffects, buffGroups, statNotes, statBySlug, effectLabel, durSeconds, recipesFor, strongest, bestFor, effectFor } from '../lib/buffs.js';
  import { findItem } from '../lib/items.js';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import Cls from '../lib/components/Cls.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { units, norm } from '../lib/format.js';
  import { recipeTree, rawShoppingList } from '../lib/cooktree.js';

  const cats = [...new Set(dishes.map((d) => d.cat))];
  const dishNames = new Set(dishes.map((d) => d.name));

  let q = $state('');
  let mode = $state('dish');
  let cat = $state('All');
  let sort = $state('value');
  let limit = $state(30);

  // ?Dish%20Name from a link elsewhere (e.g. "Open in Cooking" on item pages) opens that recipe.
  $effect(() => { if (route.query && dishNames.has(route.query)) openRecipe(route.query); });

  const results = $derived.by(() => {
    const t = norm(q);
    let r = dishes.filter((d) => {
      if (cat !== 'All' && d.cat !== cat) return false;
      if (!t) return true;
      if (mode === 'exact') return d.name === q;
      if (mode === 'dish') return norm(d.name).includes(t);
      return d.recipes.some((rec) => rec.some((slot) => slot.some((i) => norm(i).includes(t))));
    });
    if (sort === 'value') r = [...r].sort((a, b) => (b.value ?? -1) - (a.value ?? -1));
    else r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  });
  $effect(() => { q; mode; cat; sort; limit = 30; });

  const topValue = [...dishes].filter((d) => d.value).sort((a, b) => b.value - a.value).slice(0, 8);
  // Jump to the Recipes tab: a dish shows its own card (tree open), anything else shows what it's used in.
  let openTree = $state('');
  const showTab = (tab) => { panel = tab; tick().then(() => scrollToAnchor('lookup')); };
  function openRecipe(name) { q = name; mode = 'exact'; cat = 'All'; openTree = name; showTab('recipes'); }
  function lookFor(name) {
    if (dishNames.has(name)) return openRecipe(name);
    q = name; mode = 'ingredient'; cat = 'All'; openTree = ''; showTab('recipes');
  }
  const leafInfo = new Map(rawIngredients.map((r) => [r.name, r.how]));
  // ── Food buff lookup ──
  const statOrder = buffGroups.flatMap((g) => g.stats);
  let bq = $state('');
  let bStat = $state('All');
  let bSrc = $state('all');
  let bSort = $state('strongest');
  let bLimit = $state(24);
  // ?buff-resources-mined (from the Units & Nanites page) preselects that buff.
  $effect(() => {
    const st = route.query?.startsWith('buff-') ? statBySlug(route.query.slice(5)) : null;
    if (st) { panel = 'buffs'; bStat = st; bq = ''; bSrc = 'all'; scrollToAnchor('lookup'); }
  });
  const srcOf = (e) => (e.dish || e.src === 'cooked' ? 'cooked' : e.src === 'fish' ? 'fish' : 'other');
  const buffResults = $derived.by(() => {
    const t = norm(bq);
    let r = ingestEffects.filter((e) =>
      (bStat === 'All' || e.stat === bStat) &&
      (bSrc === 'all' || srcOf(e) === bSrc) &&
      (!t || norm(`${e.name} ${e.stat}`).includes(t)));
    if (bSort === 'name') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    else if (bSort === 'longest') r = [...r].sort((a, b) => durSeconds(b.dur) - durSeconds(a.dur) || strongest(a, b));
    else r = [...r].sort((a, b) => statOrder.indexOf(a.stat) - statOrder.indexOf(b.stat) || strongest(a, b));
    return r;
  });
  $effect(() => { bq; bStat; bSrc; bSort; bLimit = 24; });
  const pickBuff = (stat) => { bStat = stat; bq = ''; bSrc = 'all'; bSort = 'strongest'; showTab('buffs'); };
  const where = (f) => [f.biome === 'All' ? 'any biome' : f.biome, f.when !== 'Any' ? `${f.when.toLowerCase()} only` : null].filter(Boolean).join(', ');

  // Buff lookup, recipes and raw ingredients share one tabbed panel; ?buff-lookup, ?recipes and ?raw open a tab.
  let panel = $state('buffs');
  const tabFor = { 'buff-lookup': 'buffs', recipes: 'recipes', raw: 'raw' };
  $effect(() => { if (tabFor[route.query]) showTab(tabFor[route.query]); });

  let rawQ = $state('');
  const rawRows = $derived(rawIngredients.filter((r) => !rawQ || norm(`${r.name} ${r.how}`).includes(norm(rawQ))));
</script>

<h1>Cooking</h1>
<p class="lead">
  {dishes.length} dishes you can make in a Nutrient Processor. Search by dish, or by an ingredient you have to see what it makes.
  Click any ingredient to jump to it.
</p>
<OnThisPage links={[['cronus', 'Cronus & money'], ['food-buffs', 'Food buffs'], ['buff-lookup', 'Buff lookup'], ['recipes', 'Recipes'], ['raw', 'Raw ingredients']]} />

<section id="cronus" class="card">
  <h2 class="first">Cooking for nanites & units</h2>
  <ul class="tips">
    <li>Give dishes to <strong>Iteration: Cronus</strong> on the Space Anomaly for nanites — better dishes pay more (high-grade dishes give roughly 50–320 nanites each). Present them one at a time.</li>
    <li>Dishes also sell for units at any trade terminal. Cakes and "horror" dishes made with Larval Cores or monster parts are the most valuable.</li>
    <li>Cook at a Nutrient Processor built at your base or freighter, or use the one in a settlement Saloon.</li>
    <li>Feeding creatures with Creature Pellets gives eggs, milk and other animal products used in many recipes.</li>
    <li>Fed into a <strong>Nutrient Ingestor</strong>, food gives timed buffs, including huge boosts to scanning units and mining
      yield. See <a href={href('/cooking?food-buffs')}>Food buffs</a>.</li>
  </ul>
  <h3>Most valuable dishes</h3>
  <div class="chips">
    {#each topValue as d}<button class="chip" onclick={() => lookFor(d.name)}>{d.name} <span class="muted">{units(d.value)}</span></button>{/each}
  </div>
</section>

<h2 id="food-buffs">Food buffs (Nutrient Ingestor)</h2>
<p>
  The <strong>Nutrient Ingestor</strong> (Exosuit technology, Worlds Part II) feeds cooked food, raw ingredients and fish to you
  automatically and turns them into timed buffs. These are much stronger than the small bonus you get from eating food directly.
  {ingestEffects.length} foods have an Ingestor effect.
</p>
<div class="grid steps">
  <div class="card">
    <strong>Get the Ingestor</strong>
    <p class="small">Buy the blueprint from the Exosuit upgrade merchant on the Space Anomaly. Build it in an Exosuit slot with
      30 Condensed Carbon, 1 Lubricant and 2 Microprocessors.</p>
  </div>
  <div class="card">
    <strong>Load it and begin</strong>
    <p class="small">Put the food into the Ingestor and select <em>Begin Ingestion</em>. Each unit adds its time to the buff, and
      the Ingestor works through the stack on its own, so 6 Stellarators = 1 hour of +64% Resources Mined.</p>
  </div>
  <div class="card">
    <strong>Stacks with upgrades</strong>
    <p class="small">The buffs multiply on top of your technology upgrades. A fully upgraded scanner plus an Analysis Rewards cake
      is the basis of the <a href={href('/money?food-buffs')}>unit and Nanite farms</a>.</p>
  </div>
</div>

<h3 id="best-buffs">Best food for each buff</h3>
<p class="small muted">Click a buff to see every food that gives it.</p>
<div class="grid best">
  {#each buffGroups as g}
    <div class="card">
      <strong class="glabel">{g.label}</strong>
      <ul class="clean blist">
        {#each g.stats as st}
          {@const b = bestFor(st)}
          {#if b}
            <li>
              <button class="ing statbtn" onclick={() => pickBuff(st)}>{st}</button>
              <span class="small">
                {#if findItem(b.dish ?? b.name)}<ItemLink name={b.dish ?? b.name} />{:else}{b.name}{/if}
                <span class="good">{` ${effectLabel(b).split(' ')[0]}`}</span>{#if b.dur}<span class="muted">{` · ${b.dur}`}</span>{/if}
              </span>
              {#if statNotes[st]}<span class="small muted note-line">{statNotes[st]}</span>{/if}
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/each}
</div>

{#snippet treeNode(n)}
  <li>
    {#if n.cooked}<button class="ing cooked" onclick={() => openRecipe(n.name)}>{n.name}</button>
    {:else if findItem(n.name)}<ItemLink name={n.name} />
    {:else}<span title={leafInfo.get(n.name)}>{n.name}</span>{/if}
    {#if n.process}<span class="muted small">{` · ${n.process}`}</span>{/if}
    {#if !n.cooked && leafInfo.has(n.name)}<span class="muted small">{` · ${leafInfo.get(n.name)}`}</span>{/if}
    {#if n.alts.length}<span class="muted small alts">{` or ${n.alts.join(', ')}`}</span>{/if}
    {#if n.children.length}<ul>{#each n.children as c}{@render treeNode(c)}{/each}</ul>{/if}
  </li>
{/snippet}

<div id="lookup" class="ptabs" role="tablist" aria-label="Lookup">
  <button role="tab" aria-selected={panel === 'buffs'} onclick={() => (panel = 'buffs')}>Buff lookup</button>
  <button role="tab" aria-selected={panel === 'recipes'} onclick={() => (panel = 'recipes')}>Recipes</button>
  <button role="tab" aria-selected={panel === 'raw'} onclick={() => (panel = 'raw')}>Raw ingredients</button>
</div>

{#if panel === 'buffs'}
<div class="toolbar">
  <input type="search" placeholder="Food or buff, e.g. Stellarator or jetpack" bind:value={bq} />
  <select bind:value={bStat} aria-label="Buff">
    <option value="All">All buffs</option>
    {#each buffGroups as g}<optgroup label={g.label}>{#each g.stats as st}<option value={st}>{st}</option>{/each}</optgroup>{/each}
  </select>
  <select bind:value={bSort} aria-label="Sort">
    <option value="strongest">Strongest first</option>
    <option value="longest">Longest first</option>
    <option value="name">A–Z</option>
  </select>
</div>
<div class="toolbar">
  <div class="tabs" role="group" aria-label="Source">
    {#each [['all', 'Everything'], ['cooked', 'Cooked'], ['fish', 'Fish'], ['other', 'Raw & other']] as [k, label]}
      <button aria-pressed={bSrc === k} onclick={() => (bSrc = k)}>{label}</button>
    {/each}
  </div>
  <span class="muted small">{buffResults.length} food{buffResults.length === 1 ? '' : 's'}</span>
</div>
<div class="dishes">
  {#each buffResults.slice(0, bLimit) as e (e.name)}
    {@const recs = recipesFor(e)}
    <article class="card dish">
      <header>
        <h3>{e.dish ?? e.name}</h3>
        <span class="buffval">{effectLabel(e)}</span>
      </header>
      <p class="muted small meta">
        {#if e.dur}{`${e.dur} per unit · `}{/if}
        {#if e.dish}{dishes.find((d) => d.name === e.dish)?.cat ?? 'Cooked'}
        {:else if e.src === 'cooked'}Cooked{#if e.recipes[0]?.process}{` · ${e.recipes[0].process}`}{/if}
        {:else if e.src === 'fish'}Fish{#if e.fish}{' · '}<Cls c={e.fish.cls} />{` · ${where(e.fish)}`}{/if}
        {:else if e.src === 'raw'}Raw ingredient
        {:else}Found or caught, not cooked{/if}
      </p>
      {#each recs.slice(0, 2) as rec, i}
        <div class="recipe">
          {#if recs.length > 1}<span class="muted small alt">Recipe {i + 1}</span>{/if}
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
      {#if e.dish}
        <button class="chip openrec" onclick={() => openRecipe(e.dish)}>
          Open recipe{#if recs.length > 2}{` (+${recs.length - 2} more)`}{/if} & full tree →
        </button>
      {/if}
    </article>
  {:else}
    <p class="muted">No foods match.</p>
  {/each}
</div>
{#if buffResults.length > bLimit}<button class="chip more" onclick={() => (bLimit += 48)}>Show more ({buffResults.length - bLimit} left)</button>{/if}
<p class="muted small">Click an ingredient to open it in the Recipes tab. Underlined ones are cooked dishes themselves.</p>
{:else if panel === 'recipes'}
<div class="toolbar">
  <input type="search" placeholder={mode === 'ingredient' ? 'Ingredient you have, e.g. Giant Egg' : 'Dish name, e.g. Mystery Meat Stew'} bind:value={q} oninput={() => { if (mode === 'exact') mode = 'dish'; }} />
  <div class="tabs" role="group" aria-label="Search by">
    <button aria-pressed={mode !== 'ingredient'} onclick={() => (mode = 'dish')}>Find a dish</button>
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
    {@const tree = recipeTree(d.name)}
    <article class="card dish">
      <header>
        <h3>{d.name}</h3>
        {#if d.value}<span class="val">{units(d.value)} u</span>{/if}
      </header>
      <p class="muted small meta">{d.cat}{#if d.bonus && d.bonus !== '-'}{` · Eaten: ${d.bonus}`}{/if}</p>
      {#if effectFor(d.name)}{@const e = effectFor(d.name)}<p class="small ingest">Ingestor: <span class="good">{effectLabel(e)}</span>{#if e.dur}<span class="muted">{` · ${e.dur} per unit`}</span>{/if}</p>{/if}
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
      <details class="tree" open={openTree === d.name}>
        <summary>Full recipe tree <span class="muted small">{`· ${tree.steps} cooking step${tree.steps === 1 ? '' : 's'} from raw`}</span></summary>
        <p class="small muted treenote">Follows the simplest route (fewest cooking steps). Other ingredients that fit a slot are listed after "or".</p>
        <ul class="treelist">{@render treeNode(tree)}</ul>
        <p class="small shop"><strong>Raw ingredients for one:</strong>
          {#each rawShoppingList(tree) as [n, k], i}{#if i > 0}<span class="sep">·</span>{/if}<span class="nowrap">{k}× {n}</span>{/each}
        </p>
      </details>
    </article>
  {:else}
    <p class="muted">No dishes match.</p>
  {/each}
</div>
{#if results.length > limit}<button class="chip more" onclick={() => (limit += 60)}>Show more ({results.length - limit} left)</button>{/if}
<p class="muted small">Underlined ingredients are themselves cooked dishes. Click one to open its recipe.</p>

{:else}
<p class="small">Where the basic ingredients come from. Click one to see every dish it goes into.</p>
<div class="toolbar">
  <input type="search" placeholder="Filter, e.g. egg, milk, lush" bind:value={rawQ} />
  <span class="muted small">{rawRows.length} ingredient{rawRows.length === 1 ? '' : 's'}</span>
</div>
<div class="table-wrap">
  <table>
    <thead><tr><th>Ingredient</th><th>How to get it</th><th class="rawtype">Type</th></tr></thead>
    <tbody>
      {#each rawRows as r}<tr><td><button class="ing rawname" onclick={() => lookFor(r.name)}>{r.name}</button></td><td>{r.how}</td><td class="muted small rawtype">{r.source.replace('Raw Ingredients - ', '')}</td></tr>{/each}
    </tbody>
  </table>
</div>
{/if}

<p class="source">Source: No Man's Sky community wiki ("Cooking", "Nutrient Ingestor", "Fish" and dish pages), Nov 2026. Values are base sell values; fish have no listed value.</p>

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
  .steps { margin-bottom: 0.5rem; }
  .steps p { margin: 0.35rem 0 0; }
  .best { grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); }
  .glabel { display: block; font-family: var(--font-display); text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.85rem; color: var(--accent-bright); margin-bottom: 0.4rem; }
  .blist li { padding: 0.35rem 0; border-top: 1px dashed var(--border); display: flex; flex-direction: column; }
  .blist li:first-child { border-top: 0; }
  .statbtn { align-self: flex-start; padding: 0; font-weight: 600; }
  .note-line { font-size: 0.78rem; }
  .good { color: var(--good); font-weight: 600; }
  .buffval { color: var(--good); font-weight: 700; text-align: right; }
  .ingest { margin: -0.3rem 0 0.5rem; }
  h3[id], #lookup { scroll-margin-top: 70px; }
  .openrec { margin-top: 0.5rem; font-size: 0.85rem; }
  .tree { margin-top: 0.4rem; border-top: 1px dashed var(--border); padding-top: 0.45rem; }
  .tree summary { cursor: pointer; color: var(--link); font-size: 0.9rem; font-weight: 600; }
  .tree summary:hover { color: var(--accent-bright); }
  .treenote { margin: 0.35rem 0 0.2rem; }
  .treelist, .treelist ul { list-style: none; margin: 0; padding: 0; }
  .treelist ul { margin-left: 0.55rem; padding-left: 0.9rem; border-left: 1px solid var(--border-strong); }
  .treelist li { position: relative; padding: 0.15rem 0; font-size: 0.88rem; }
  .treelist ul > li::before { content: ''; position: absolute; left: -0.9rem; top: 0.85rem; width: 0.7rem; border-top: 1px solid var(--border-strong); }
  .treelist .ing { padding: 0; font-size: 0.88rem; }
  .alts { font-style: italic; }
  .shop { margin: 0.5rem 0 0; }
  .nowrap { white-space: nowrap; }
  .ptabs { display: flex; gap: 0; margin: 1.6rem 0 1rem; border-bottom: 1px solid var(--border-strong); }
  .ptabs button {
    font: inherit; font-family: var(--font-display); font-weight: 700; font-size: 1.12rem; letter-spacing: 0.01em;
    background: none; border: 0; border-bottom: 2px solid transparent; margin-bottom: -1px;
    color: var(--muted); padding: 0.45rem 1rem; cursor: pointer;
  }
  .ptabs button:first-child { padding-left: 0.2rem; }
  .ptabs button:hover { color: var(--text); }
  .ptabs button[aria-selected='true'] { color: var(--text); border-bottom-color: var(--accent); box-shadow: 0 6px 10px -8px var(--accent-glow); }
  .rawname { font-weight: 600; text-align: left; padding: 0; }
  @media (max-width: 600px) { .rawtype { display: none; } }
</style>
