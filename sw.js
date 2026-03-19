// ── BacheBog Service Worker ──
// Versión de caché — incrementar al actualizar assets
const CACHE_NAME = 'bachebog-v1';

// Assets que se cachean en la instalación (App Shell)
const APP_SHELL = [
  '/bachebog/',
  '/bachebog/index.html',
  '/bachebog/manifest.json',
  '/bachebog/pages/home.html',
  '/bachebog/icons/icon-192.png',
  '/bachebog/icons/icon-512.png',
];

// ── INSTALL: Cachear el App Shell ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: Limpiar cachés viejos ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Estrategia Network-First con fallback a caché ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones del mismo origen (no Firebase, Google Fonts, etc.)
  if (url.origin !== self.location.origin) return;

  // Para navegación (páginas HTML) → Network-first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Si la red responde, guardar en caché y devolver
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Sin red → intentar desde caché
          return caches.match(request).then(cached => {
            return cached || caches.match('/bachebog/index.html');
          });
        })
    );
    return;
  }

  // Para assets estáticos (CSS, JS, imágenes) → Cache-first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Cachear solo respuestas válidas
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      });
    })
  );
});

// ── PUSH NOTIFICATIONS (base para futuras notificaciones) ──
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'BacheBog 🚧';
  const options = {
    body: data.body || 'Hay una actualización en tu reporte.',
    icon: '/bachebog/icons/icon-192.png',
    badge: '/bachebog/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/bachebog/pages/home.html' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── NOTIFICATION CLICK ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data?.url || '/bachebog/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url === target && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
