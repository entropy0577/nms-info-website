// Fetch helpers for the generators: MediaWiki wikitext from the No Man's Sky community wiki, and raw files from URLs.
// Responses are cached in tools/generate/.cache/ (git-ignored) so re-running a generator is fast and offline-friendly;
// pass --refresh to a generator to ignore the cache and fetch again.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const API = 'https://nomanssky.fandom.com/api.php';
const CACHE = path.join(import.meta.dirname, '..', '.cache');
const REFRESH = process.argv.includes('--refresh');
const HEADERS = { 'User-Agent': 'nms-info-site data generator (static fan reference site)' };
const DELAY_MS = 250;
let last = 0;

async function politeFetch(url) {
  const wait = last + DELAY_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  last = Date.now();
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { headers: HEADERS });
    if (res.ok) return res.text();
    if (attempt >= 3 || res.status < 500) throw new Error(`GET ${url} → HTTP ${res.status}`);
    await new Promise((r) => setTimeout(r, 1000 * attempt));
  }
}

function cached(key, ext) {
  const file = path.join(CACHE, crypto.createHash('sha1').update(key).digest('hex').slice(0, 16) + ext);
  return { file, hit: !REFRESH && fs.existsSync(file) };
}

/** Fetch any URL as text (cached). */
export async function fetchText(url) {
  const c = cached(url, '.txt');
  if (c.hit) return fs.readFileSync(c.file, 'utf8');
  const text = await politeFetch(url);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(c.file, text);
  return text;
}

/**
 * Wikitext of one or more wiki pages (redirects followed), cached per title.
 * @param {string[]} titles
 * @returns {Promise<Map<string, string|null>>} title as requested → wikitext, or null if the page doesn't exist.
 */
export async function wikitextMany(titles) {
  const out = new Map();
  const todo = [];
  for (const t of titles) {
    const c = cached('wiki:' + t, '.json');
    if (c.hit) out.set(t, JSON.parse(fs.readFileSync(c.file, 'utf8')).text);
    else todo.push(t);
  }
  for (let i = 0; i < todo.length; i += 50) {
    const batch = todo.slice(i, i + 50);
    const url = `${API}?action=query&prop=revisions&rvprop=content&rvslots=main&redirects=1&format=json&formatversion=2&titles=${encodeURIComponent(batch.join('|'))}`;
    const json = JSON.parse(await politeFetch(url));
    const q = json.query || {};
    // Map requested title → final title through normalisation and redirects.
    const norm = new Map((q.normalized || []).map((n) => [n.from, n.to]));
    const redir = new Map((q.redirects || []).map((n) => [n.from, n.to]));
    const pages = new Map((q.pages || []).map((p) => [p.title, p.missing ? null : p.revisions?.[0]?.slots?.main?.content ?? null]));
    for (const t of batch) {
      let final = norm.get(t) || t;
      final = redir.get(final) || final;
      const text = pages.has(final) ? pages.get(final) : null;
      out.set(t, text);
      fs.mkdirSync(CACHE, { recursive: true });
      fs.writeFileSync(cached('wiki:' + t, '.json').file, JSON.stringify({ title: final, text }));
    }
  }
  return out;
}

/** Wikitext of a single page (throws if it doesn't exist). */
export async function wikitext(title) {
  const text = (await wikitextMany([title])).get(title);
  if (text == null) throw new Error(`Wiki page not found: ${title}`);
  return text;
}
