// Offline-Speicher für das Grading-Café-Spiel. Bei jedem Update CACHE-Version erhöhen.
const CACHE = 'gc-spiel-v24a';
const FILES = ['./', './index.html', './three.min.js', './zurueck.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './fonts/fraunces-latin-600-normal.woff2', './fonts/fraunces-latin-800-normal.woff2',
  './fonts/inter-latin-400-normal.woff2', './fonts/inter-latin-500-normal.woff2',
  './fonts/inter-latin-600-normal.woff2', './fonts/inter-latin-700-normal.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.url.endsWith('/index.html');
  if (isPage) { // Seite: zuerst Netz (damit Updates sofort ankommen), sonst Offline-Kopie
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  } else { // Dateien: zuerst Offline-Kopie
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => { const c = n.clone(); caches.open(CACHE).then(k => k.put(req, c)); return n; })));
  }
});
