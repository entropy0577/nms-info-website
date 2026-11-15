<script>
  import { allItems, aliasesOf } from '../data/items.js';
  import { economies, strengths } from '../data/economy.js';
  import { pages } from '../nav.js';
  import { technology } from '../data/tech.js';
  import { route, href, itemHref } from '../router.svelte.js';
  import { norm } from '../format.js';

  // Everything searchable: pages, items, and Galactic Map economy descriptors.
  const entries = [
    ...pages.map((p) => ({ label: p.title, sub: 'Page', url: href(p.path), keys: norm(p.title + ' ' + p.blurb) })),
    ...allItems.map((it) => ({
      label: it.name,
      sub: [...it.kinds].join(' · '),
      url: itemHref(it.name),
      keys: norm([it.name, ...aliasesOf(it.name)].join(' ')),
    })),
    ...technology.map((t) => ({ label: t.name, sub: `${t.device} technology`, url: href('/technology') + '?' + encodeURIComponent(t.name), keys: norm(t.name + ' technology tech') })),
    ...economies.flatMap((e) =>
      e.aliases.map((a) => ({ label: a, sub: `Economy type: ${e.name}`, url: href('/economies') + '?' + e.id, keys: norm(a + ' economy') })),
    ),
    ...strengths.flatMap((s) =>
      s.names.map((n) => ({ label: n, sub: `Economy strength: ${s.level} ${'★'.repeat(s.stars)}`, url: href('/economies'), keys: norm(n + ' economy strength') })),
    ),
  ];

  let query = $state('');
  let open = $state(false);
  let active = $state(0);
  let input;

  // Clear and close the search whenever the page changes.
  $effect(() => {
    route.path;
    query = '';
    open = false;
  });

  const results = $derived.by(() => {
    const q = norm(query);
    if (!q) return [];
    const words = q.split(' ');
    const scored = [];
    for (const e of entries) {
      if (!words.every((w) => e.keys.includes(w))) continue;
      const label = norm(e.label);
      const score = label === q ? 0 : label.startsWith(q) ? 1 : e.keys.split(' ').some((k) => k.startsWith(words[0])) ? 2 : 3;
      scored.push({ e, score });
    }
    scored.sort((a, b) => a.score - b.score || a.e.label.localeCompare(b.e.label));
    return scored.slice(0, 12).map((s) => s.e);
  });

  function choose(e) {
    if (!e) return;
    location.hash = e.url.slice(1);
    query = '';
    open = false;
    input.blur();
  }

  function onKey(ev) {
    if (ev.key === 'ArrowDown') { active = Math.min(active + 1, results.length - 1); ev.preventDefault(); }
    else if (ev.key === 'ArrowUp') { active = Math.max(active - 1, 0); ev.preventDefault(); }
    else if (ev.key === 'Enter') choose(results[active]);
    else if (ev.key === 'Escape') { open = false; input.blur(); }
  }

  function globalKey(ev) {
    const tag = document.activeElement?.tagName;
    if ((ev.key === '/' || (ev.key === 'k' && (ev.ctrlKey || ev.metaKey))) && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      ev.preventDefault();
      input.focus();
    }
  }
</script>

<svelte:window onkeydown={globalKey} />

<div class="search">
  <svg class="icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.6" /><path d="m11 11 3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
  <input
    bind:this={input}
    type="search"
    placeholder="Search items, pages, economies…  ( / )"
    aria-label="Search"
    autocomplete="off"
    bind:value={query}
    oninput={() => { open = true; active = 0; }}
    onfocus={() => (open = true)}
    onblur={() => setTimeout(() => (open = false), 150)}
    onkeydown={onKey}
  />
  {#if open && query}
    <ul class="results" role="listbox">
      {#each results as r, i}
        <li role="option" aria-selected={i === active}>
          <a href={r.url} class:active={i === active} onmouseenter={() => (active = i)} onclick={(ev) => { ev.preventDefault(); choose(r); }}>
            <span class="label">{r.label}</span>
            <span class="sub">{r.sub}</span>
          </a>
        </li>
      {:else}
        <li class="empty">No matches for “{query}”</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .search { position: relative; flex: 1; max-width: 560px; }
  .icon { position: absolute; left: 0.7rem; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; }
  input { max-width: none; padding-left: 2.1rem; background: var(--surface-2); }
  .results {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    list-style: none; margin: 0; padding: 0.35rem;
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    box-shadow: 0 12px 32px rgb(0 0 0 / 0.14);
    max-height: 70vh; overflow-y: auto;
  }
  .results a { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; padding: 0.45rem 0.6rem; border-radius: 7px; color: var(--text); }
  .results a.active { background: var(--accent-soft); text-decoration: none; }
  .label { font-weight: 600; }
  .sub { font-size: 0.78rem; color: var(--muted); text-align: right; }
  .empty { padding: 0.6rem; color: var(--muted); }
</style>
