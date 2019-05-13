// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

Vue.config.productionTip = false;
Vue.config.performance = true;

// 全局组件
import draggable from "vuedraggable";
Vue.component("draggable", draggable);
import qrcode from "@/components/QRCode";
Vue.component("qrcode", qrcode);
import WfIcon from "./components/WfIcon.vue";
Vue.component("WfIcon", WfIcon);
import Tip from "./components/Tip.vue";
Vue.component("Tip", Tip);

// Element UI
import Element from "element-ui";
import "./less/ele/index.css";
import "./less/ele/display.css";
import "./less/app.less";

import { i18n } from "./i18n/";
Vue.use(Element, { i18n: (key, value) => i18n.t(key, value) });

// i18n
import { changeLocale, vi18n } from "./i18n/plugin";

// tour
import VueTour from "vue-tour";
import "vue-tour/dist/vue-tour.css";
Vue.use(VueTour);

import { createRouter } from "./router";
import { createStore } from "./store";
import App from "./App.vue";

// import Worker from "worker-loader!./worker/main";

// const worker = new Worker();

// worker.postMessage({ a: 1 });
// worker.onmessage = (event) => { };

// worker.addEventListener("message", (event) => { });

export async function createApp({ beforeApp = () => {}, afterApp = () => {}, locale }: any = {}) {
  const store = createStore();
  const router = createRouter();
  // load extra i18n file
  await changeLocale(locale);
  if (!locale) console.log("using lang", locale || vi18n.locale);
  i18n.inject(vi18n);
  store.dispatch("load");

  await beforeApp({
    router,
    store
  });

  let app = new Vue({
    i18n: vi18n,
    router,
    store,
    render: h => h(App)
  });

  const result = {
    app,
    router,
    store
  };

  await afterApp(result);

  return result;
}

// ServiceWorker
import "./registerServiceWorker";

// FastClick
import FastClick from "fastclick";
FastClick.attach(document.body);

const langParameter = location.search.match(/(?:\?|&)lang=(en|zh-CN|zh-TW|zh-CY)(?=$|&)/);

createApp({
  async beforeApp({ router }) {
    // await loadAsyncComponents({ router });
  },

  afterApp({ app, store }) {
    app.$mount("#app");
  },
  locale: (langParameter && langParameter[1]) || localStorage.getItem("lang")
});
