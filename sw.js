// Service Worker for Alexander's Tennis App
// Caches the app shell so it works offline (videos still need internet)

const CACHE_NAME = 'alexanders-tennis-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Use addAll but tolerate failures on individual resources
      return Promise.all(
        APP_SHELL.map(url =>
          cache.add(url).catch(err => console.log('Skipped caching:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip YouTube and other video providers — let them go straight to network
  const url = event.request.url;
  if (/youtube|googlevideo|ytimg|suno\.com/.test(url)) return;

  // Cache-first strategy for app shell, network-fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful responses for fonts and same-origin resources
        if (response && response.status === 200 && (event.request.url.includes('fonts.gstatic.com') || event.request.url.startsWith(self.location.origin))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback: serve index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
