import { createApp as createVueApp, type App as VueApp } from "vue";

// 全局组件
import draggable from "vuedraggable";
import qrcode from "@/components/QRCode";
import WfIcon from "./components/WfIcon.vue";
import Tip from "./components/Tip.vue";

// Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import elLocaleEn from "element-plus/es/locale/lang/en";
import elLocaleZhCn from "element-plus/es/locale/lang/zh-cn";
import elLocaleZhTw from "element-plus/es/locale/lang/zh-tw";
import "./less/ele/theme.less";
import "./less/ele/icons.css";
import "./less/ele/display.css";
import "./less/app.less";

import { i18n } from "./i18n/";

// i18n
import { changeLocale, vi18n, global as i18nGlobal } from "./i18n/plugin";

// tour
import VueTour from "v3-tour";
import "v3-tour/dist/vue-tour.css";

import { createRouter } from "./router";
import { createStore } from "./store";
import App from "./App.vue";

/** vue-i18n 的 locale 串映射到 Element Plus 的语言包 */
function resolveElementLocale(locale: string) {
  if (!locale) return elLocaleEn;
  if (/^zh[-_](tw|hk|mo|hant)/i.test(locale)) return elLocaleZhTw;
  if (/^zh/i.test(locale)) return elLocaleZhCn;
  return elLocaleEn;
}

export interface CreateAppResult {
  app: VueApp<Element>;
  router: ReturnType<typeof createRouter>;
  store: ReturnType<typeof createStore>;
}

export async function createApp({ beforeApp = () => {}, afterApp = () => {}, locale }: any = {}) {
  const store = createStore();
  const router = createRouter();
  // load extra i18n file
  await changeLocale(locale);
  if (!locale) console.log("using lang", locale || i18nGlobal.locale);
  i18n.inject(i18nGlobal);

  await beforeApp({ router, store });

  store.dispatch("load");

  const app = createVueApp(App);

  app.use(vi18n);
  app.use(router);
  app.use(store);
  app.use(ElementPlus, { locale: resolveElementLocale(i18n.locale) });
  app.use(VueTour);

  // 全局组件注册（Vue 3 走 app 实例，不再是 Vue.component）
  app.component("draggable", draggable);
  app.component("qrcode", qrcode);
  app.component("WfIcon", WfIcon);
  app.component("Tip", Tip);

  app.config.performance = true;

  const result: CreateAppResult = { app, router, store };

  await afterApp(result);

  return result;
}

// ServiceWorker
import "./registerServiceWorker";

const langParameter = location.search.match(/(?:\?|&)lang=(.+?)(?=$|&)/);

import { RivenDatabase, WeaponDatabase } from "@/warframe/codex";

createApp({
  async beforeApp() {
    RivenDatabase.reload();
    await WeaponDatabase.loadDataOnline();
  },

  async afterApp({ app, router }: CreateAppResult) {
    // Vue Router 4+ 首次导航是异步的，等就绪再挂载可避免首屏闪烁
    await router.isReady();
    app.mount("#app");
  },

  locale: (langParameter && langParameter[1]) || localStorage.getItem("lang"),
});
