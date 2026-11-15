<script>
  let { title, lead = '', children } = $props();
</script>

<h1>{title}</h1>
{#if lead}<p class="lead">{lead}</p>{/if}
{@render children?.()}
