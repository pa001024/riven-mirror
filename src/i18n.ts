import Vue from 'vue';
import VueI18n from 'vue-i18n';

import lang_en from '@/assets/lang/en';
import lang_zh from '@/assets/lang/zh';
import lang_zhTW from '@/assets/lang/zh-TW';

import elLang_en from 'element-ui/lib/locale/lang/en'
import elLang_zh from 'element-ui/lib/locale/lang/zh-CN'
import elLang_zhTW from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(VueI18n);

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
  'zh-CN': {
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
  },
  'zh-TW': {
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
  }
};

export const i18n = new VueI18n({
  dateTimeFormats,
  locale: localStorage.getItem("lang") || navigator && navigator.language || 'en',
  fallbackLocale: 'en',
  messages: {
    'en': Object.assign(elLang_en, lang_en),
    'zh-CN': Object.assign(elLang_zh, lang_zh),
    'zh-TW': Object.assign(elLang_zhTW, lang_zhTW),
  },
});

export function changeLocale(locale: string) {
  i18n.locale = locale;
  localStorage.setItem("lang", locale);
  document.title = i18n.t("title.main").toString();
}

document.title = i18n.t("title.main").toString();
