<script>
  import { species, categories, production, claimCost, buildings, officeSteps, settlementTips } from '../lib/data/settlements.yaml';
  import ItemLink from '../lib/components/ItemLink.svelte';
  import EconomyTag from '../lib/components/EconomyTag.svelte';
  import Cls from '../lib/components/Cls.svelte';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import { findItem } from '../lib/items.js';
  import { units } from '../lib/format.js';

  let sp = $state('Korvax');
  let cat = $state('all');
  let sortByValue = $state(false);

  const rows = $derived.by(() => {
    let r = production[sp].filter((x) => cat === 'all' || x.cat === cat);
    if (sortByValue) r = [...r].sort((a, b) => (b.value ?? -1) - (a.value ?? -1));
    return r;
  });
  const catName = (id) => categories.find((c) => c.id === id);
  const baseName = (n) => n.replace(/ \(.*\)$/, '');
</script>

<h1>Settlements</h1>
<p class="lead">
  Once a settlement is out of debt it produces two items of your choice, which you collect from the Administration Terminal (or any
  teleporter). What you can choose depends on the settlement's <strong>species</strong> and which <strong>buildings</strong> you've upgraded.
</p>
<OnThisPage links={[['production', 'Production options'], ['buildings', 'Buildings'], ['claiming', 'Claiming'], ['tips', 'Tips']]} />

<h2 id="production">Production options</h2>
<div class="note">
  Options are the same on every planet, economy and galaxy — only species and building class matter. A product unlocks once the listed
  building type reaches that class.
</div>

<div class="toolbar">
  <div class="tabs" role="group" aria-label="Species">
    {#each species as s}
      <button aria-pressed={sp === s} onclick={() => (sp = s)}>{s}</button>
    {/each}
  </div>
</div>
<div class="toolbar">
  <select bind:value={cat} aria-label="Building type">
    <option value="all">All building types</option>
    {#each categories as c}<option value={c.id}>{c.name} — {c.building}</option>{/each}
  </select>
  <label class="small"><input type="checkbox" bind:checked={sortByValue} /> Sort by value</label>
</div>

<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Unlocked by</th><th>Class</th><th>Product</th><th class="num">Per batch</th><th class="num">Batch value</th>
        {#if sp === 'Gek'}<th class="num" title="Gek batch time in GPT units (how long one GPT lasts varies with the settlement's productivity and maintenance cost)">Batch time</th>{/if}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        {@const tg = findItem(baseName(row.item))?.tradeGood}
        <tr>
          <td>{catName(row.cat).building}</td>
          <td><Cls c={row.cls} /></td>
          <td>
            <ItemLink name={baseName(row.item)} />{#if row.item !== baseName(row.item)}<span class="muted"> {row.item.slice(baseName(row.item).length)}</span>{/if}
            {#if tg}<span class="tg"><EconomyTag economy={tg.economy} /></span>{/if}
          </td>
          <td class="num">{row.qty}</td>
          <td class="num">{row.value == null ? 'not sellable' : units(row.value)}</td>
          {#if sp === 'Gek'}<td class="num">{row.gpt} GPT</td>{/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<p class="muted small">
  {#if sp === 'Gek'}
    Gek batches are quick: most items take only a few GPT, but the S-class Cryogenic Chamber takes 300 GPT.
  {:else}
    {sp} batches all take the same time.
  {/if}
  How long a batch takes varies with the settlement's productivity and its maintenance cost.
  Commercial goods tagged with an economy are standard trade goods.
</p>

<h2 id="buildings">Buildings</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Building</th><th>Type</th><th>What it does</th></tr></thead>
    <tbody>
      {#each buildings as b}<tr><td><strong>{b.name}</strong></td><td>{b.role}</td><td>{b.effect}</td></tr>{/each}
    </tbody>
  </table>
</div>
<p class="muted small">Buildings start at C-class and run C → B → A → S. Upgrade from the terminal outside each building.</p>

<h2 id="claiming">Finding & claiming one</h2>
<div class="grid">
  <div class="card">
    <h3 class="first">Find one</h3>
    <ul class="tips">
      <li>Buy a <ItemLink name="Settlement Chart" /> from a station Cartographer (5 Navigation Data).</li>
      <li>Follow the mission <em>The Settlers</em>.</li>
      <li>Or stumble across one while exploring (not in uncharted/abandoned systems).</li>
    </ul>
  </div>
  <div class="card">
    <h3 class="first">Claim cost</h3>
    <ul class="clean">
      {#each Object.entries(claimCost) as [s, c]}<li><strong>{s}:</strong> {c}</li>{/each}
    </ul>
    <p class="muted small" style="margin-top:.5rem">Also needs enough standing with that species. Max 4 settlements at once.</p>
  </div>
  <div class="card">
    <h3 class="first">Build the Overseer's Office</h3>
    <ol class="tips">{#each officeSteps as s}<li>{s}</li>{/each}</ol>
  </div>
</div>

<h2 id="tips">Tips</h2>
<ul class="tips">{#each settlementTips as t}<li>{t}</li>{/each}</ul>

<p class="source">
  Sources: production table from player testing ("Settlement Math Part 4", Steam NMS forums, Oct–Nov 2025, post-Beacon); buildings and claiming from the community wiki.
</p>

<style>
  .tg { margin-left: 0.4rem; }
  .first { margin-top: 0; }
  h2[id] { scroll-margin-top: 70px; }
  label.small { display: inline-flex; align-items: center; gap: 0.35rem; color: var(--muted); cursor: pointer; }
  select { max-width: 320px; }
</style>
