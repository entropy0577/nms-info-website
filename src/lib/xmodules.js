// X-class module verdicts (data in data/xmodules.yaml).

/** 'better' if X can exceed S's best roll, 'equal' if same cap, 'worse' if it can't reach it, 'fixed' if always the same. */
export function verdict(st) {
  if (!st.s) return 'xonly';
  if (st.x[0] === st.x[1] && st.s[0] === st.s[1] && st.x[0] === st.s[0]) return 'fixed';
  if (st.x[1] > st.s[1]) return 'better';
  if (st.x[1] === st.s[1]) return 'equal';
  return 'worse';
}

/** Overall: can an X module of this family beat the best S module on its main stat? */
export function familyVerdict(f) {
  if (f.xOnly) return 'xonly';
  const key = f.stats.find((s) => s.key) || f.stats[0];
  return verdict(key);
}
