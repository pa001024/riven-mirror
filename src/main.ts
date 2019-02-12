// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 全局引入lodash
import "lodash";

Vue.config.productionTip = false;
Vue.config.performance = true;

// 全局组件
import draggable from 'vuedraggable';
Vue.component("draggable", draggable);
import qrcode from "@/components/QRCode";
Vue.component("qrcode", qrcode);
import WfIcon from "./components/WfIcon.vue";
Vue.component("WfIcon", WfIcon);

// Element UI
import Element from 'element-ui'
import './less/ele/index.css'
import './less/ele/display.css'
import './less/app.less'

import { i18n } from './i18n/';
Vue.use(Element, { i18n: (key, value) => i18n.t(key, value) })

// i18n
import { changeLocale, vi18n } from './i18n/plugin';

// tour
import VueTour from 'vue-tour'
import 'vue-tour/dist/vue-tour.css'
Vue.use(VueTour)

import router from '@/router'
import store from '@/store'
import App from './App.vue'

// crossdomain check

import { HH, LH } from "@/var";

if ([HH, LH].includes(location.host)) {
  // load extra i18n file
  changeLocale(vi18n.locale).then(() => {
    console.log("using lang", navigator.language)
    i18n.inject(vi18n);
    store.dispatch("load")
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      i18n: vi18n,
      router,
      store,
      render: h => h(App)
    })
  });
}
// import Worker from "worker-loader!./worker/main";

// const worker = new Worker();

// worker.postMessage({ a: 1 });
// worker.onmessage = (event) => { };

// worker.addEventListener("message", (event) => { });

// ServiceWorker
import register from './registerServiceWorker';
register()

// FastClick
import FastClick from "fastclick";
FastClick.attach(document.body)
