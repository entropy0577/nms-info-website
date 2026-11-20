<script>
  import { unitMethods, naniteMethods, packets } from '../lib/data/money.yaml';
  import { buffGroups, bestFor, effectsByStat, buffSlug, statNotes } from '../lib/buffs.js';
  import { findItem } from '../lib/items.js';
  import { href } from '../lib/router.svelte.js';
  import OnThisPage from '../lib/components/OnThisPage.svelte';
  import ItemLink from '../lib/components/ItemLink.svelte';

  const moneyStats = buffGroups.find((g) => g.id === 'money').stats;
  const top3 = (stat) => effectsByStat(stat).slice(0, 3);
  const cookingLink = (stat) => href('/cooking?buff-' + buffSlug(stat));
</script>

<h1>Units & Nanites</h1>
<p class="lead">The most reliable ways to earn the game's two main currencies, roughly from best to simplest.</p>
<OnThisPage
  links={[
    ['units', 'Units'],
    ['food-buffs', 'Food buffs'],
    ['stellarator', 'Stellarator mould'],
    ['nanites', 'Nanites'],
    ['x-flipping', 'X-class flipping'],
    ['quicksilver', 'Quicksilver'],
  ]}
/>

<h2 id="units">Units</h2>
<div class="grid">
  {#each unitMethods as m}
    <div class="card">
      <div class="head"><strong>{m.name}</strong><span class="pill">{m.stage}</span></div>
      <p class="small">{m.how}</p>
      {#if m.link}<a class="small" href={href(m.link)}>Details →</a>{/if}
    </div>
  {/each}
</div>

<h2 id="food-buffs">Food buffs: units and Nanites</h2>
<p>
  Since Worlds Part II, the <strong>Nutrient Ingestor</strong> Exosuit technology turns cooked food into timed buffs. Two kinds
  matter for money:
</p>
<ul class="tips">
  <li><strong>Analysis Rewards</strong> (+1,600% to +6,500%): over 100 dishes multiply the units the Analysis Visor pays for
    scanning flora, fauna or minerals. They stack with your scanner upgrade modules.</li>
  <li><strong>Resources Mined</strong> (up to +64%): more yield from the Mining Beam. On Curious Deposits that means more
    Runaway Mould, which refines into Nanites. See <a href={href('/money?stellarator')}>Stellarator mould farming</a>.</li>
</ul>
<div class="grid steps">
  <div class="card">
    <strong>1. Get the Ingestor</strong>
    <p class="small">Buy the blueprint from the Exosuit upgrade merchant on the Space Anomaly. Build it with 30 Condensed Carbon,
      1 Lubricant and 2 Microprocessors.</p>
  </div>
  <div class="card">
    <strong>2. Upgrade the scanner</strong>
    <p class="small">Fill your Multi-Tool's Analysis Visor/Scanner with 3 high-roll S or X-class scanner modules, ideally in
      supercharged slots. <a href={href('/x-modules')}>Roll ranges →</a></p>
  </div>
  <div class="card">
    <strong>3. Bake the buff food</strong>
    <p class="small">The 10-minute cakes give the biggest bonus. Each unit you feed in adds its duration, so load a stack before
      a scanning trip. <a href={href('/cooking?food-buffs')}>Buff foods & recipes →</a></p>
  </div>
  <div class="card">
    <strong>4. Scan or mine</strong>
    <p class="small">Begin ingestion, then scan everything new on a busy planet or mine Curious Deposits. Match the food to
      the job: a fauna cake does nothing for plants or mining.</p>
  </div>
</div>
<p class="note">
  Analysis buffs boost the <strong>units</strong> from scanning, not the Nanites from uploading discoveries. Spend those units on
  <a href={href('/money?x-flipping')}>X-class flipping</a> for Nanites. Community guides report 10–30 million units for a single
  new creature with a fauna buff and good scanner modules. That's a player estimate, so expect variation.
</p>

<h3 id="money-buffs">Best foods for money</h3>
<p class="small">
  The top three foods for each money buff. For every food, its full recipe and the survival and movement buffs, use the
  <a href={href('/cooking?food-buffs')}>food buff lookup on the Cooking page</a>.
</p>
<div class="grid money-buffs">
  {#each moneyStats as st}
    <div class="card">
      <strong>{st}</strong>
      <p class="small muted pay">{statNotes[st]}</p>
      <ul class="clean flist">
        {#each top3(st) as b}
          <li class="small">
            {#if findItem(b.dish ?? b.name)}<ItemLink name={b.dish ?? b.name} />{:else}{b.name}{/if}
            <span class="good">{` +${b.amount.toLocaleString('en-GB')}${b.unit}`}</span>{#if b.dur}<span class="muted">{` · ${b.dur}`}</span>{/if}
          </li>
        {/each}
      </ul>
      <a class="small" href={cookingLink(st)}>All {effectsByStat(st).length} foods + recipes →</a>
    </div>
  {/each}
</div>

<h3 id="stellarator">Nanites: The Stellarator on Curious Deposits</h3>
<p>
  <ItemLink name="The Stellarator" /> gives <strong>+64% Resources Mined</strong> for 10 minutes per unit, the best mining-yield
  buff in the game. The wiki notes that it compounds with Mining Beam upgrades, so yields <em>approaching 9×</em> are possible.
  Point that at Curious Deposits and each one gives far more Runaway Mould.
</p>
<ol class="tips">
  <li>Cook The Stellarator: <ItemLink name="Lumpen Doughnut" /><span class="sep">+</span><ItemLink name="Stellar Custard" />
    (Nutrient Injection). Lumpen Doughnut is Dough + Clarified Oil + Processed Sugar; Stellar Custard is Cream + Processed
    Sugar + Silicon Egg.</li>
  <li>Fit your Multi-Tool's Mining Beam with high-roll S or X-class modules. Mining Speed is the key stat (see
    <a href={href('/x-modules')}>X-class rolls</a>).</li>
  <li>Find a system with <strong>Curious Deposits</strong>. Every planet in the system shares the node type, and the Analysis
    Visor marks them. Feed the Ingestor a stack of Stellarators and mine.</li>
  <li>Refine <strong>5 Runaway Mould → 1 Nanite</strong>. A large or nested refiner at a base handles big batches.</li>
</ol>
<p class="small muted">
  If Stellarators run short, other Resources Mined foods work at a slightly lower rate, e.g. Questionably Sweet Cake (+64%) or
  Caramel Doughnut (+60%). See <a href={href('/cooking?buff-resources-mined')}>all {effectsByStat('Resources Mined').length} Resources
  Mined foods with recipes</a>. The exact yield multiplier depends on your Mining Beam modules.
</p>

<h2 id="nanites">Nanites</h2>
<div class="table-wrap">
  <table>
    <thead><tr><th>Method</th><th>Rate</th><th>How</th></tr></thead>
    <tbody>
      {#each naniteMethods as m}<tr><td><strong>{m.name}</strong></td><td class="muted">{m.rate}</td><td>{m.how}</td></tr>{/each}
    </tbody>
  </table>
</div>

<h2 id="x-flipping">X-class flipping: units → Nanites</h2>
<p>
  Suspicious Packets contain one random <strong>X-class (Suspicious) upgrade module</strong>. You buy the packets with units or
  Tainted Metal, and Technology Merchants buy the modules back for Nanites. With plenty of units (for example from food-buffed
  scanning), this lets you convert units to Nanites almost without limit.
</p>
<div class="table-wrap">
  <table>
    <thead><tr><th>Packet</th><th>Where to buy</th><th>Contains</th></tr></thead>
    <tbody>
      {#each packets as p}<tr><td><strong>{p.name}</strong></td><td>{p.where}</td><td>{p.gives}</td></tr>{/each}
    </tbody>
  </table>
</div>
<ol class="tips">
  <li>Warp to a pirate-controlled or Outlaw system. The station's packet vendor sells packets for units.</li>
  <li>Buy a stack and open them all from your inventory.</li>
  <li>Keep any module that rolled well for your own gear (see <a href={href('/x-modules')}>X-class rolls</a>). Sell the rest
    <em>uninstalled</em> to the Technology Merchant for Nanites.</li>
  <li>Compare each module's Nanite price with what you paid. Prices vary by module type, so stop buying a packet type if it
    stops paying off.</li>
</ol>
<p class="small muted">
  Sell prices aren't fixed. The wiki lists roughly 50–170 Nanites per Suspicious Module since NextGen, while more recent community
  reports quote several hundred. Check the merchant's offer before committing a large stack of units.
</p>

<h2 id="quicksilver">Quicksilver</h2>
<p>
  Quicksilver is earned from Nexus missions (on the Space Anomaly) and weekly community research, and is spent at the Quicksilver Synthesis
  Companion on cosmetics and base parts.
</p>

<p class="source">
  Sources: No Man's Sky community wiki (Units, Nanite Cluster, Nutrient Ingestor, The Stellarator, Curious Deposit, Runaway Mould,
  Suspicious Module, Suspicious Packet), Nov 2026; r/NoMansSkyTheGame ("Impact of Stellarator ingestion on Curious Deposits");
  community farming guides for payout estimates. Rates are player estimates.
</p>

<style>
  .head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; }
  h2[id], h3[id] { scroll-margin-top: 70px; }
  .steps { margin-bottom: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr)); }
  .steps p { margin: 0.35rem 0 0; }
  .good { color: var(--good); font-weight: 600; }
  .money-buffs { grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); }
  .pay { margin: 0.1rem 0 0.4rem; }
  .flist { margin-bottom: 0.5rem; }
  .flist li { padding: 0.15rem 0; }
  ol.tips { padding-left: 1.3rem; margin: 1rem 0; }
  ol.tips li { margin-bottom: 0.4rem; }
</style>
