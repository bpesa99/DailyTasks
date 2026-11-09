// Bei jeder Änderung an der App die Versionsnummer erhöhen,
// damit installierte Geräte die neuen Dateien laden.
const CACHE = 'daily-tasks-v1';

const FILES = [
  './',
  './index.html',
  './tailwind.css',
  './manifest.webmanifest',
  './fonts/inter-400.woff2',
  './fonts/inter-500.woff2',
  './fonts/inter-700.woff2',
  './fonts/inter-900.woff2',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Offline zuerst: aus dem Cache liefern, sonst aus dem Netz
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request))
  );
});
