
import Vue from 'vue'
import VueI18n from 'vue-i18n';

import lang_en from './lang/en';

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

export const vi18n = new VueI18n({
  dateTimeFormats,
  locale: localStorage.getItem("lang") || navigator && navigator.language || 'en',
  fallbackLocale: 'en',
  messages: { en },
});

export async function changeLocale(locale: string) {
  if (vi18n.locale !== locale) {
    console.log("Change locale to", locale)
    if (locale) {
      vi18n.locale = locale;
      localStorage.setItem("lang", locale);
    }
    else
      localStorage.removeItem("lang");
  }
  switch (locale) {
    case 'zh-CN':
    case 'zh-SG':
      let { default: zh } = await import(/* webpackChunkName: "lang-zh" */ './lang/zh')
      const chs = _.assign(elLang_zh, zh);
      vi18n.setLocaleMessage(locale, chs);
      break;
    case 'zh-CY':
      let [{ default: zh2 }, { default: zhCY }] = await Promise.all([
        import(/* webpackChunkName: "lang-zh" */ './lang/zh'),
        import(/* webpackChunkName: "lang-zhCY" */ './lang/zh-CY')]);
      const chCY = _.assign({}, elLang_zh, zh2, zhCY);
      vi18n.setLocaleMessage(locale, chCY);
      break;
    case 'zh-TW':
    case 'zh-HK':
    case 'zh-MO':
      let { default: zhTW } = await import(/* webpackChunkName: "lang-zhTW" */ './lang/zh-TW')
      const cht = _.assign(elLang_zhTW, zhTW);
      vi18n.setLocaleMessage(locale, cht);
      break;
    default:
  }
  document.title = vi18n.t("title.main").toString();
}
