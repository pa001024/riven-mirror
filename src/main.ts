// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import draggable from 'vuedraggable';
import qrcode from "@/components/QRCode";
import { i18n } from '@/i18n';

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import register from './registerServiceWorker';
register()
