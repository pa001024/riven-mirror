/**
 * ServiceWorker 注册。
 *
 * 旧版是 webpack + workbox 手写注册 /sw.js；
 * 现在由 vite-plugin-pwa (generateSW + registerType:"prompt" + injectRegister:null) 产出 sw.js，
 * 这里手动接管注册与「有新版本」提示。
 */
import { registerSW } from "virtual:pwa-register";
import { i18n } from "./i18n";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

let updateSW: (reloadPage?: boolean) => Promise<void>;

export default function register() {
  if (!("serviceWorker" in navigator)) return;
  if (isLocalhost) return;

  updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      // 新版本已下载完成，等用户确认后再切换
      const tip = (() => {
        try {
          return i18n.t("app.updateTip") as string;
        } catch {
          return "";
        }
      })();
      if (confirm(tip || "New content is available, refresh now?")) {
        updateSW(true);
      }
    },
    onOfflineReady() {
      console.log("Content is cached for offline use.");
    },
    onRegisterError(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

register();
