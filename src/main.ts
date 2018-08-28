// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import './theme/index.css';
import './theme/display.css';
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import draggable from 'vuedraggable';

console.log("using lang", navigator.language);
Vue.config.productionTip = false;

import { i18n } from '@/i18n';

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.component("draggable", draggable);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
});
