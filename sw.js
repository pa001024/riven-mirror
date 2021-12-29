// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({ prefix: "rm", suffix: "v1.3.0" });

// have our sw update and control a web page as soon as possible.
workbox.skipWaiting();
workbox.clientsClaim();

// precache
workbox.precaching.suppressWarnings();
var precaches = self.__precacheManifest || [];
var cdnPrecache = [
  "eidolon-day.m.jpg",
  "eidolon-night.m.jpg",
].map(v => ({ url: "https://rm-img.oss-accelerate.aliyuncs.com/img/" + v }));
workbox.precaching.precacheAndRoute(precaches.concat(cdnPrecache));

workbox.routing.registerRoute(
  /.*\.(?:png|jpe?g|ttf|otf)$/,
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
  /.*\.(?:css|js)$/,
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
  /.*\.(?:svg|json)$/,
  workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp("^https://cdn\.riven\.im/.+"),
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(/.*\/$/, workbox.strategies.networkFirst());
