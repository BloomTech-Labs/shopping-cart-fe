var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  './',
  './dashboard',
  './inventory',
  './account',
  './profile'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open("pure-dynamic").then(function(cache) {
      return cache.match(event.request).then(function(response) {
        // Cache hit - return response
        return (
          response ||
          fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(err=>{
            return cache.match(event.request)
          })
        );
      });
    })
  );
});

// Update a service worker
self.addEventListener("activate", event => {
  var cacheWhitelist = ["pwa-task-manager"];
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    self.skipWaiting();
  }})
