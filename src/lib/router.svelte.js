// Tiny hash router: URLs look like  #/economies  or  #/item/Fusion%20Core.
// Hash routing means the built site works on any static host with no server config.

// An optional "?anchor" after the path (e.g. #/economies?mining) scrolls to / highlights that section.
function read() {
  const [rawPath, query = ''] = location.hash.replace(/^#/, '').split('?');
  const path = decodeURIComponent(rawPath) || '/';
  return { path: path.startsWith('/') ? path : '/' + path, query: decodeURIComponent(query) };
}

export const route = $state(read());

window.addEventListener('hashchange', () => {
  const next = read();
  const samePage = next.path === route.path;
  route.path = next.path;
  route.query = next.query;
  if (!samePage && !next.query) window.scrollTo(0, 0);
});

/** Scroll to the element with this id once the page has rendered. */
export function scrollToAnchor(id) {
  if (!id) return;
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
}

export function href(path) {
  return '#' + path.split('/').map(encodeURIComponent).join('/');
}

export function itemHref(name) {
  return href('/item/' + name);
}

export function go(path) {
  location.hash = href(path).slice(1);
}
