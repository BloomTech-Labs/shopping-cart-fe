var CACHE_NAME = "pwa-task-manager";
var urlsToCache = ["./"];

// Install a service worker
self.addEventListener("install", event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open("my-dynamic-site").then(function(cache) {
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
  console.log(caches);
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
