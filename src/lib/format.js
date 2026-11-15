export function units(n) {
  if (n == null) return '—';
  return n.toLocaleString('en-GB', { maximumFractionDigits: 1 });
}

export function shortUnits(n) {
  if (n == null) return '—';
  if (n >= 1e6) return (n / 1e6).toLocaleString('en-GB', { maximumFractionDigits: 1 }) + 'M';
  if (n >= 1e3) return (n / 1e3).toLocaleString('en-GB', { maximumFractionDigits: 1 }) + 'k';
  return String(n);
}

export function norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
