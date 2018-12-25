// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import draggable from 'vuedraggable';
import qrcode from "@/components/QRCode";
import { i18n, changeLocale } from "@/i18n";


// 设置echarts主题
import "@/echart.theme";

console.log("using lang", navigator.language);
Vue.config.productionTip = false;

// 全局组件
Vue.component("draggable", draggable);
Vue.component("qrcode", qrcode);

import WfIcon from "./components/WfIcon.vue";
Vue.component("WfIcon", WfIcon);

import './plugins/element'

const App = () => import('./App.vue')

changeLocale(i18n.locale).then(() => {
  const router = import('@/router')
  const store = import('@/store')
  Promise.all([router, store]).then(([router, store]) => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      i18n,
      router: router.default,
      store: store.default,
      render: h => h(App)
    })
  })
})

import register from './registerServiceWorker';
register()
