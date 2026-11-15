<script>
  // Small in-page jump list so long pages are easy to move around.
  let { links } = $props();
</script>

<nav class="otp" aria-label="On this page">
  <span class="muted small">On this page:</span>
  {#each links as [id, label]}
    <a href={'#' + location.hash.slice(1).split('?')[0] + '?' + id}>{label}</a>
  {/each}
</nav>

<style>
  .otp { display: flex; flex-wrap: wrap; gap: 0.35rem 1rem; align-items: baseline; margin: -0.5rem 0 1.5rem; font-size: 0.9rem; }
</style>
