const CACHE_NAME = 'gothic-life-v1';
const urlsToCache = [
  '/gothic-life-assistant.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Твой Демон Зовет! 👹';
  const options = {
    body: data.body || 'У тебя новое задание!',
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Crect width="512" height="512" fill="%231a0a0a"/%3E%3Ctext x="256" y="350" font-size="300" text-anchor="middle" fill="%23dc143c"%3E😈%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Ctext x="64" y="100" font-size="100" text-anchor="middle" fill="%23dc143c"%3E😈%3C/text%3E%3C/svg%3E',
    vibrate: [200, 100, 200],
    data: data,
    requireInteraction: true,
    tag: 'quest-notification'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/gothic-life-assistant.html')
  );
});
