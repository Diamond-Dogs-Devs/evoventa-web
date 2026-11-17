const CACHE_NAME = "evoventa-pos-web-v2";
const OFFLINE_URL = "/offline.html";
const APP_SHELL = [
  "/",
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

const isNavigationRequest = (request) => request.mode === "navigate";
const isSameOriginRequest = (request) => {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch {
    return false;
  }
};

const isStaticAssetRequest = (request) => {
  const url = new URL(request.url);
  const assetExtensions = /\.(?:js|css|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|eot|map|json)$/i;
  return assetExtensions.test(url.pathname);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET" || !isSameOriginRequest(request)) {
    return;
  }

  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          const offlineResponse = await caches.match(OFFLINE_URL);
          return offlineResponse || Response.redirect(OFFLINE_URL);
        }),
    );
    return;
  }

  if (isStaticAssetRequest(request)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            return networkResponse;
          })
          .catch(() => cachedResponse || caches.match(OFFLINE_URL));

        return cachedResponse || networkFetch;
      }),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;

        const offlineResponse = await caches.match(OFFLINE_URL);
        return offlineResponse || Response.redirect(OFFLINE_URL);
      }),
  );
});
