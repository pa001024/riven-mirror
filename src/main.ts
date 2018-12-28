// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 全局引入lodash
import "lodash";

// 设置echarts主题
import "@/echart.theme";

Vue.config.productionTip = false;

// 全局组件
import draggable from 'vuedraggable';
Vue.component("draggable", draggable);
import qrcode from "@/components/QRCode";
Vue.component("qrcode", qrcode);

import WfIcon from "./components/WfIcon.vue";
Vue.component("WfIcon", WfIcon);

// Element UI
import Element from 'element-ui'
import './element-variables.scss'

import { i18n } from './i18n/';
Vue.use(Element, { i18n: (key, value) => i18n.t(key, value) })
// i18n

import VueI18n from 'vue-i18n';

import lang_en from './i18n/lang/en';

import elLang_en from 'element-ui/lib/locale/lang/en'
import elLang_zh from 'element-ui/lib/locale/lang/zh-CN'
import elLang_zhTW from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(VueI18n);

const cnDF = {
  short: {
    year: 'numeric', month: 'short', day: 'numeric'
  },
  weekday: {
    year: 'numeric', month: 'short', day: 'numeric', weekday: "long"
  },
  long: {
    year: 'numeric', month: 'short', day: 'numeric',
    weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
  },
  time: {
    hour: 'numeric', minute: 'numeric', hour12: false
  }
};

const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    weekday: {
      year: 'numeric', month: 'short', day: 'numeric', weekday: "long"
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    },
    time: {
      hour: 'numeric', minute: 'numeric', hour12: false
    }
  },
  'zh-CN': cnDF,
  'zh-CY': cnDF,
  'zh-TW': cnDF,
  'zh-HK': cnDF,
  'zh-SG': cnDF,
  'zh-MO': cnDF,
};

// 配置
const en = _.assign(elLang_en, lang_en);

let messages = { en }

const vi18n = new VueI18n({
  dateTimeFormats,
  locale: localStorage.getItem("lang") || navigator && navigator.language || 'en',
  fallbackLocale: 'en',
  messages,
});

export function changeLocale(locale: string) {
  return new Promise((resolve, reject) => {
    if (vi18n.locale !== locale) {
      vi18n.locale = locale;
      localStorage.setItem("lang", locale);
    }
    switch (locale) {
      case 'zh-CN':
      case 'zh-SG':
        import(/* webpackChunkName: "lang-zh" */ './i18n/lang/zh').then(module => {
          const chs = _.assign(elLang_zh, module.default);
          vi18n.setLocaleMessage(locale, chs);
          document.title = vi18n.t("title.main").toString();
          resolve();
        });
        break;
      case 'zh-CY':
        Promise.all([
          import(/* webpackChunkName: "lang-zh" */ './i18n/lang/zh'),
          import(/* webpackChunkName: "lang-zhCY" */ './i18n/lang/zh-CY')]).then(module => {
            const chCY = _.assign({}, elLang_zh, module[0].default, module[1].default);
            vi18n.setLocaleMessage(locale, chCY);
            document.title = vi18n.t("title.main").toString();
            resolve();
          });
        break;
      case 'zh-TW':
      case 'zh-HK':
      case 'zh-MO':
        import(/* webpackChunkName: "lang-zhTW" */ './i18n/lang/zh-TW').then(module => {
          const cht = _.assign(elLang_zhTW, module.default);
          vi18n.setLocaleMessage(locale, cht);
          document.title = vi18n.t("title.main").toString();
          resolve();
        });
        break;
      default:
        resolve();
    }
  })
}
import router from '@/router'
import store from '@/store'
import App from './App.vue'

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

// import Worker from "worker-loader!./worker/main";

// const worker = new Worker();

// worker.postMessage({ a: 1 });
// worker.onmessage = (event) => { };

// worker.addEventListener("message", (event) => { });

// ServiceWorker
import register from './registerServiceWorker';
register()
