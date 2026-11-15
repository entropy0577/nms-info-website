<script>
  // Visual comparison of the S-class and X-class roll ranges on one scale.
  let { s = null, x } = $props();
  const max = $derived(Math.max(x[1], s ? s[1] : 0) || 1);
  const pct = (v) => (v / max) * 100;
</script>

<div class="bar" aria-hidden="true">
  <div class="x" style:left="{pct(x[0])}%" style:width="{Math.max(pct(x[1]) - pct(x[0]), 1.5)}%"></div>
  {#if s}
    <div class="s" style:left="{pct(s[0])}%" style:width="{Math.max(pct(s[1]) - pct(s[0]), 1.5)}%"></div>
    <div class="cap" style:left="{pct(s[1])}%"></div>
  {/if}
</div>

<style>
  .bar { position: relative; height: 14px; min-width: 120px; background: var(--surface-2); border-radius: 4px; }
  .x, .s { position: absolute; border-radius: 3px; }
  .x { top: 0; bottom: 0; background: color-mix(in srgb, #c03dd6 35%, transparent); }
  .s { top: 4px; bottom: 4px; background: #c8961a; }
  .cap { position: absolute; top: -3px; bottom: -3px; width: 2px; margin-left: -1px; background: var(--text); opacity: 0.7; }
</style>
