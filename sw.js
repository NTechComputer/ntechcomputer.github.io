self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('ntech').then((cache) => cache.addAll([
        '/',
        '/icon.svg',
        '/logo.svg',
        '/index.html',
        '/css/login.css',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });
  
  self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
  });