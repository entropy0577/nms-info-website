<script>
  import { itemHref } from '../router.svelte.js';
  import { canonical } from '../data/items.js';
  let { name, qty = null } = $props();
</script>

<a class="item" href={itemHref(canonical(name))}>{#if qty != null}<span class="qty">{qty.toLocaleString('en-GB')}×</span>{/if}{name}</a>

<style>
  .item { white-space: nowrap; }
  .qty { color: var(--muted); font-variant-numeric: tabular-nums; margin-right: 0.2rem; }
</style>
