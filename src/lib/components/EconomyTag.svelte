<script>
  import { href } from '../router.svelte.js';
  let { economy } = $props();
</script>

<a class="pill" href={href('/economies') + '?' + economy.id}><span class="dot" style:background={economy.colour}></span>{economy.name}</a>

<style>
  a.pill { color: var(--text); }
  a.pill:hover { text-decoration: none; border-color: var(--accent); }
</style>
