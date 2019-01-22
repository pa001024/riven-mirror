// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({ prefix: "rm", suffix: "v1.3.0" });

// have our sw update and control a web page as soon as possible.
workbox.skipWaiting();
workbox.clientsClaim();

// precache
workbox.precaching.suppressWarnings();
var precaches = self.__precacheManifest || [];
var cdnPrecache = [
  "anspathaBrace.png",
  "canticPrism.png",
  "certusBrace.png",
  "clapkraBrace.png",
  "dissicScaffold.png",
  "earth-day.jpg",
  "earth-night.jpg",
  "eidolon-day.jpg",
  "eidolon-night.jpg",
  "exardScaffold.png",
  "fortuna-day.jpg",
  "fortuna-night.jpg",
  "granmuPrism.png",
  "juttniBrace.png",
  "kitgunChamberCatchmoon.png",
  "kitgunChamberGaze.png",
  "kitgunChamberRattleguts.png",
  "kitgunChamberTombfinger.png",
  "kitgunGripGibber.png",
  "kitgunGripHaymaker.png",
  "kitgunGripLovetap.png",
  "kitgunGripRamble.png",
  "kitgunLoaderBashrack.png",
  "kitgunLoaderBellows.png",
  "kitgunLoaderDeepbreath.png",
  "kitgunLoaderFlutterfire.png",
  "kitgunLoaderKillstream.png",
  "kitgunLoaderRamflare.png",
  "kitgunLoaderSlap.png",
  "kitgunLoaderSlapneedle.png",
  "kitgunLoaderSparkfire.png",
  "kitgunLoaderSplat.png",
  "kitgunLoaderStitch.png",
  "kitgunLoaderSwiftfire.png",
  "kitgunLoaderThunderdrum.png",
  "kitgunLoaderZip.png",
  "kitgunLoaderZipfire.png",
  "kitgunLoaderZipneedle.png",
  "klamoraPrism.png",
  "klebrikScaffold.png",
  "legaPrism.png",
  "lohrinBrace.png",
  "page-404.png",
  "penchaScaffold.png",
  "phahdScaffold.png",
  "plagaBrace.png",
  "propaScaffold.png",
  "rahnPrism.png",
  "raplakPrism.png",
  "shraksunScaffold.png",
  "shwaakPrism.png",
  "suoBrace.png",
  "zawGripJayap.png",
  "zawGripKorb.png",
  "zawGripKroostra.png",
  "zawGripKwath.png",
  "zawGripLaka.png",
  "zawGripPeye.png",
  "zawGripPlagueAkwin.png",
  "zawGripPlagueBokwin.png",
  "zawGripSeekalla.png",
  "zawGripShtung.png",
  "zawLinkEkwana2Jai.png",
  "zawLinkEkwana2Ruhang.png",
  "zawLinkEkwanaJai.png",
  "zawLinkEkwanaJai2.png",
  "zawLinkEkwanaRuhang.png",
  "zawLinkEkwanaRuhang2.png",
  "zawLinkJai.png",
  "zawLinkJai2.png",
  "zawLinkRuhang.png",
  "zawLinkRuhang2.png",
  "zawLinkVargeet2Jai.png",
  "zawLinkVargeet2Ruhang.png",
  "zawLinkVargeetJai.png",
  "zawLinkVargeetJai2.png",
  "zawLinkVargeetRuhang.png",
  "zawLinkVargeetRuhang2.png",
  "zawStrikeBalla.png",
  "zawStrikeCyath.png",
  "zawStrikeDehtat.png",
  "zawStrikeDokrahm.png",
  "zawStrikeKronsh.png",
  "zawStrikeMewan.png",
  "zawStrikeOoltha.png",
  "zawStrikePlagueKeewar.png",
  "zawStrikePlagueKripath.png",
  "zawStrikeRabvee.png",
  "zawStrikeSepfahn.png"
].map(v => ({ url: "https://cdn.riven.im/img/" + v }));
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
  new RegExp("^https://cdn.riven.im/"),
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(/.*\/$/, workbox.strategies.networkFirst());
