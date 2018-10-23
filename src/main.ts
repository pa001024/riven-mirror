// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import draggable from 'vuedraggable';
import { i18n } from '@/i18n';

// 设置echarts主题
import "@/echart.theme";

console.log("using lang", navigator.language);
Vue.config.productionTip = false;

// 全局组件
Vue.component("draggable", draggable);

import './plugins/element.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
