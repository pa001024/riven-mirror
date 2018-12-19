// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({
  prefix: 'rm',
  suffix: 'v1.3.0',
});

// have our sw update and control a web page as soon as possible.
workbox.skipWaiting();
workbox.clientsClaim();

// precache
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  /.*\.(?:png|jpe|ttf|otf?g)$/,
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
  /.*\.(?:css|js|json?g)$/,
  workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
  /.*\/$/,
  workbox.strategies.staleWhileRevalidate()
);
