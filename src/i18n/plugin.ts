import { createI18n } from "vue-i18n";
import type { VueI18n } from "vue-i18n";
import { merge } from "lodash-es";
import localStorage from "universal-localstorage";

import lang_en from "./lang/en.json";

const cnDF = {
  short: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  weekday: {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "long",
  },
  long: {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  },
  time: {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  },
};

const datetimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    weekday: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
    time: {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    },
  },
  "zh-CN": cnDF,
  "zh-CY": cnDF,
  "zh-TW": cnDF,
  "zh-HK": cnDF,
  "zh-SG": cnDF,
  "zh-MO": cnDF,
} as any;

/**
 * vue-i18n 9+ 实例。
 * 这里刻意用 legacy 模式：全项目 73 个类组件都依赖模板里的 $t / $d 与 this.$i18n，
 * 切 Composition API 需要全量重写，收益为零。
 */
export const vi18n = createI18n({
  legacy: true,
  globalInjection: true,
  allowComposition: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  datetimeFormats,
  locale: "en",
  fallbackLocale: "en",
  messages: { en: lang_en as any },
});

/** legacy 模式下 global 是 VueI18n 实例（locale 是普通字符串，可直接赋值） */
export const global = vi18n.global as unknown as VueI18n;

export async function changeLocale(locale: string) {
  if (global.locale !== locale) {
    console.log("Change locale to", locale || "(default)" + navigator.language);
    if (locale) {
      global.locale = locale;
      localStorage.setItem("lang", locale);
    } else {
      locale = global.locale = navigator.language;
      localStorage.removeItem("lang");
    }
  }
  switch (locale) {
    case "zh-CN":
    case "zh-SG": {
      const { default: zh } = await import("./lang/zh-Hans.json");
      global.setLocaleMessage(locale, zh as any);
      break;
    }
    case "zh-CY": {
      const [{ default: zh2 }, { default: zhCY }] = await Promise.all([import("./lang/zh-Hans.json"), import("./lang/zh-Hans-wegame.json")]);
      // 国服文案是简中的深层增量覆盖，必须 deep merge
      global.setLocaleMessage(locale, merge({}, zh2, zhCY) as any);
      break;
    }
    case "zh-TW":
    case "zh-HK":
    case "zh-MO": {
      const { default: zhTW } = await import("./lang/zh-Hant.json");
      global.setLocaleMessage(locale, zhTW as any);
      break;
    }
    default:
  }
  document.title = global.t("title.main").toString();
}
