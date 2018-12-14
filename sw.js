const { strategies } = workbox;

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  /\.(?:png|jpe?g)$/,
  strategies.cacheFirst()
);
