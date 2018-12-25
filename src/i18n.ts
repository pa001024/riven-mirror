import _ from "lodash";
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import lang_en from './assets/lang/en';

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

export const i18n = new VueI18n({
  dateTimeFormats,
  locale: localStorage.getItem("lang") || navigator && navigator.language || 'en',
  fallbackLocale: 'en',
  messages,
});

let loadedLocales = ["en"];

export function changeLocale(locale: string) {
  return new Promise((resolve, reject) => {
    if (i18n.locale !== locale) {
      i18n.locale = locale;
      localStorage.setItem("lang", locale);
    }
    switch (locale) {
      case 'zh-CN':
      case 'zh-SG':
        import(/* webpackChunkName: "lang-zh" */ './assets/lang/zh').then(module => {
          const chs = _.assign(elLang_zh, module.default);
          i18n.setLocaleMessage(locale, chs);
          document.title = i18n.t("title.main").toString();
          resolve();
        });
        break;
      case 'zh-CY':
        Promise.all([
          import(/* webpackChunkName: "lang-zh" */ './assets/lang/zh'),
          import(/* webpackChunkName: "lang-zhCY" */ './assets/lang/zh-CY')]).then(module => {
            const chCY = _.assign({}, elLang_zh, module[0].default, module[1].default);
            i18n.setLocaleMessage(locale, chCY);
            document.title = i18n.t("title.main").toString();
            resolve();
          });
        break;
      case 'zh-TW':
      case 'zh-HK':
      case 'zh-MO':
        import(/* webpackChunkName: "lang-zhTW" */ './assets/lang/zh-TW').then(module => {
          const cht = _.assign(elLang_zhTW, module.default);
          i18n.setLocaleMessage(locale, cht);
          document.title = i18n.t("title.main").toString();
          resolve();
        });
        break;
      default:
        resolve();
    }
  })
}

