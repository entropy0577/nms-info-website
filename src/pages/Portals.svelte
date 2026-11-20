<script>
  import { glyphs } from '../lib/data/explore.yaml';

  let address = $state('');
  const clean = $derived(address.toUpperCase().replace(/[^0-9A-F]/g, '').slice(0, 12));
  const parts = $derived(
    clean.length === 12
      ? [
          ['Planet', clean.slice(0, 1)],
          ['System', clean.slice(1, 4)],
          ['Y (height)', clean.slice(4, 6)],
          ['Z', clean.slice(6, 9)],
          ['X', clean.slice(9, 12)],
        ]
      : null,
  );
</script>

<h1>Portals & Glyphs</h1>
<p class="lead">Portals let you jump anywhere in the galaxy if you know its 12-glyph address. Each glyph is a hexadecimal digit (0–F).</p>

<h2>The 16 glyphs</h2>
<div class="glyphs">
  {#each glyphs as g}
    <div class="card glyph">
      <span class="hex">{g.hex}</span>
      <strong>{g.name}</strong>
      {#if g.title}<span class="muted small">{g.title}</span>{/if}
    </div>
  {/each}
</div>
<p class="muted small">Glyph numbers start at 0 (Sunset) — the in-game "Glyph 1" is hex 0.</p>

<h2>Reading an address</h2>
<p>An address is <code>P SSS YY ZZZ XXX</code>: planet index, star system index within the region, then the region's position.</p>
<div class="card">
  <label for="addr"><strong>Break down an address</strong></label>
  <input id="addr" type="text" placeholder="e.g. 109A039BAE4B" bind:value={address} />
  {#if parts}
    <div class="parts">
      {#each parts as [label, v]}<div><span class="muted small">{label}</span><code>{v}</code></div>{/each}
    </div>
    <p class="small">Glyphs: {clean.split('').map((c) => glyphs.find((g) => g.hex === c).name).join(' · ')}</p>
  {:else if clean.length}
    <p class="muted small">{clean.length}/12 digits</p>
  {/if}
</div>

<h2>How to get glyphs</h2>
<ul class="tips">
  <li>Ask Travellers where they came from — they lead you to a <strong>Traveller Grave</strong>, which teaches a glyph.</li>
  <li>The Artemis Path mission <em>The Purge</em> gives one glyph per warp until you have all 16.</li>
  <li>Portals need to be charged and you need the glyphs to dial. The address of the portal you're at is shown at its terminal.</li>
  <li>Same address + different first digit = a different planet in the same system (1–6).</li>
</ul>

<p class="source">Source: No Man's Sky community wiki (Glyph, Portal address), Nov 2026.</p>

<style>
  .glyphs { display: grid; gap: 0.6rem; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
  .glyph { display: flex; flex-direction: column; gap: 0.1rem; padding: 0.7rem 0.9rem; }
  .hex { font: 700 1.3rem ui-monospace, monospace; color: var(--accent); }
  input { margin: 0.4rem 0; font-family: ui-monospace, monospace; }
  .parts { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0.5rem 0; }
  .parts div { display: flex; flex-direction: column; }
  code { font: 600 1rem ui-monospace, monospace; }
</style>
