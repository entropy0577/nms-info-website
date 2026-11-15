<script>
  import { craftByName } from '../data/crafting.js';
  import ItemLink from './ItemLink.svelte';
  import RecipeTree from './RecipeTree.svelte';
  import { shortUnits } from '../format.js';

  let { name, qty = 1, depth = 0 } = $props();
  const recipe = $derived(craftByName[name]);
</script>

<div class="node" class:root={depth === 0}>
  <div class="row">
    <ItemLink {name} qty={depth === 0 ? null : qty} />
    {#if recipe}<span class="val">{shortUnits(recipe.value)}</span>{/if}
  </div>
  {#if recipe}
    <div class="kids">
      {#each recipe.in as [n, k]}
        <RecipeTree name={n} qty={k * qty} depth={depth + 1} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .node { font-size: 0.92rem; }
  .row { display: flex; gap: 0.5rem; align-items: baseline; padding: 0.12rem 0; }
  .root > .row { font-weight: 700; }
  .val { font-size: 0.75rem; color: var(--muted); }
  .kids { margin-left: 0.55rem; padding-left: 0.9rem; border-left: 1px solid var(--border); }
</style>
