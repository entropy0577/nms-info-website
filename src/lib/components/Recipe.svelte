<script>
  // One refiner recipe on a single wrapping line: "2× Copper + 1× Pure Ferrite → 3× Chromatic Metal".
  import ItemLink from './ItemLink.svelte';
  let { r } = $props();
</script>

<span class="recipe">
  {#each r.in as [n, k], i}
    {#if i > 0}<span class="op">+</span>{/if}<ItemLink name={n} qty={k} />
  {/each}
  <span class="op">→</span><strong><ItemLink name={r.out} qty={r.qty} /></strong>
</span>

<style>
  .recipe { display: inline-flex; flex-wrap: wrap; align-items: baseline; column-gap: 0.4rem; row-gap: 0.1rem; }
  .op { color: var(--muted); }
</style>
