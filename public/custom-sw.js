//var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  '/',
  './manifest.json',
  './index.html'
];

// Install a service worker
self.addEventListener('install', async event => {
  // Perform install steps
  self.skipWaiting();
  const cache = await caches.open('app-static');
  cache.addAll(urlsToCache);

});

// Cache and return requests
self.addEventListener('fetch', event => {
 const req = event.request;
 const url = new URL(req.url)
 if(url.origin === location.origin){
   event.respondWith(cacheFirst(req))
 }else{
   event.respondWith(networkFirst(req));
 }
});

// Update a service worker
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

async function cacheFirst(req){
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req)
}

async function networkFirst(req){
  const cache = await caches.open('app-dynamic');
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    return await cache.match(req)
  }
}