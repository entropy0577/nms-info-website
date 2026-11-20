// Holo-Arena scoring helpers. These are transparent heuristics built on community-reported mechanics
// (affinity ≈ ±30% damage, Agility decides turn order and matters most) — not the game's own formulas.
import { affinities, chart } from './data/companions.yaml';

export const classValue = { S: 4, A: 3, B: 2, C: 1 };

/** +2 if attacker's affinity hits defender hard, −2 if it hits weakly, 0 otherwise (attacker's view + defender's view combined). */
export function effectiveness(att, def) {
  let v = 0;
  if (chart[att].atkStrong === def) v += 1;
  if (chart[att].atkWeak === def) v -= 1;
  if (chart[def].defWeak === att) v += 1;
  if (chart[def].defStrong === att) v -= 1;
  return v;
}

/** How well my creature does against one opposing affinity: my damage edge minus theirs. Range −4…+4. */
export function matchup(mine, theirs) {
  return effectiveness(mine, theirs) - effectiveness(theirs, mine);
}

/** 0–10 rating from stat classes. Agility is weighted highest, then Health, then Combat. */
export function statRating(c) {
  const raw = 1.5 * classValue[c.agility] + 1.2 * classValue[c.health] + 1.0 * classValue[c.combat];
  const bonus = c.independence === 'High' ? 0.4 : 0;
  return Math.min(10, Math.round(((raw + bonus) / 14.8) * 100) / 10);
}

export function upgradeOrder(c) {
  // Spend points where the class ceiling is highest, Agility first on ties.
  return [
    ['Agility', c.agility, 1.5],
    ['Health', c.health, 1.2],
    ['Combat Effectiveness', c.combat, 1.0],
  ]
    .sort((a, b) => classValue[b[1]] * b[2] - classValue[a[1]] * a[2])
    .map((x) => x[0]);
}

function combos(list, k) {
  const out = [];
  const rec = (start, acc) => {
    if (acc.length === k) return out.push(acc);
    for (let i = start; i < list.length; i++) rec(i + 1, [...acc, list[i]]);
  };
  rec(0, []);
  return out;
}

/** Score a 3-creature team against a known opposing lineup (or, if none, against every affinity). */
export function scoreTeam(team, opponents) {
  const targets = opponents.length ? opponents : affinities;
  let counter = 0;
  let threat = 0;
  const perOpp = targets.map((o) => {
    const ranked = team.map((c) => ({ c, m: matchup(c.affinity, o) })).sort((a, b) => b.m - a.m || statRating(b.c) - statRating(a.c));
    const best = ranked[0];
    const hitBy = team.filter((c) => effectiveness(o, c.affinity) > 0);
    counter += Math.max(best.m, -2);
    threat += Math.max(0, hitBy.length - 1);
    return { opp: o, best: best.c, m: best.m, hitBy };
  });
  const stats = team.reduce((s, c) => s + statRating(c), 0) / team.length;
  const weight = opponents.length ? 2.5 : 1.2;
  const distinct = new Set(team.map((c) => c.affinity)).size;
  const score = counter * weight + stats * 1.5 - threat * 2 + (opponents.length ? 0 : distinct);
  return { team, score: Math.round(score * 10) / 10, perOpp, stats };
}

export function bestTeams(roster, opponents, n = 3) {
  if (roster.length < 1) return [];
  const size = Math.min(3, roster.length);
  return combos(roster, size)
    .map((t) => scoreTeam(t, opponents))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

/** Lead with the fastest creature that isn't at a disadvantage against the opponent's first creature. */
export function leadPick(team, firstOpp) {
  const ok = team.filter((c) => !firstOpp || matchup(c.affinity, firstOpp) >= 0);
  const pool = ok.length ? ok : team;
  return [...pool].sort((a, b) => classValue[b.agility] - classValue[a.agility] || (firstOpp ? matchup(b.affinity, firstOpp) - matchup(a.affinity, firstOpp) : 0))[0];
}
