import { Translator } from "../warframe/translate";

type VueI18n = import("vue-i18n").default

class I18nProxy {
  private _i18n: VueI18n
  get locale() { return this._i18n && this._i18n.locale }
  set locale(value) {
    if (this._i18n) {
      this._i18n.locale = value
      Translator.reload();
    }
  }
  inject(_i18n: VueI18n) {
    this._i18n = _i18n;
    Translator.reload();
  }

  t(key: string, ...value: any) {
    if (this._i18n) return this._i18n.t(key, ...value) as string
    return key
  }
  a(key: string, ...value: any): any {
    if (this._i18n) return this._i18n.t(key, ...value) as string
    return key
  }
}

export const i18n = new I18nProxy()
