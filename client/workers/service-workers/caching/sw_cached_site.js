const cacheName = 'v2';

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');

  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Cleaning Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching');

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // Make clone of the response
        const resClone = res.clone();

        // Open cache
        caches.open(cacheName).then((cache) => {
          // Add response to cache
          cache.put(event.request, resClone);
        });

        return res;
      })
      .catch(() => caches.match(event.request).then((res) => res))
  );
});
