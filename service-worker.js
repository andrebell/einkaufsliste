// Service Worker — Network-First Strategy
// Always try to load the latest version from the server first.
// Only use the cached version when offline.

const CACHE_VERSION = "v0.2.0-dev3";
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

// Files to cache for offline use
const FILES_TO_CACHE = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon.svg",
];

// On install: cache all app files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
  // Activate immediately without waiting
  self.skipWaiting();
});

// On activation: delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      ),
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// On fetch: Network-First strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Got a response from the server — cache it and return
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Network failed — try to serve from cache
        return caches.match(event.request);
      }),
  );
});
