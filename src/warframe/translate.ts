import _ from "lodash";
import { i18n } from "@/i18n";

/**
 * 翻译工具类
 *
 * @export
 * @class Translator
 */
export class Translator {
  private static _locale = "en";
  public static get Locale() {
    if (this._locale !== i18n.locale) {
      this._locale = i18n.locale || "en";
      this.instance.reload();
    }
    return this._locale;
  };
  protected static instance = new Translator();
  private mainDict: Map<string, string>;
  private subDict: Map<string, string>;
  private subLinkDict: Map<string, string[]>;

  constructor() {
    this.reload();
  }

  /**
   * 重新加载语言文件
   *
   * @memberof Translator
   */
  reload() {
    let en = i18n.t("messages", "en") as { [key: string]: any }, cl = i18n.t("messages") as { [key: string]: any };
    let enE = i18n.t("messagesExtend", "en") as { [key: string]: any }, clE = i18n.t("messagesExtend") as { [key: string]: any };
    let _transData = _.map(en, (v, i) => [v.toLowerCase(), cl[i]] as [string, string]);
    let _partSubfixs = _.map(enE, (v, i) => [v.toLowerCase(), clE[i]] as [string, string]);
    // 英中字典
    this.mainDict = new Map(_transData);
    // 后缀字典
    this.subDict = new Map(_partSubfixs);
    // 后缀辅助字典
    this.subLinkDict = new Map();
    _partSubfixs.forEach(v => {
      if (!v[0].includes(" ")) return;
      let sub = _.last(v[0].split(" ")).toLowerCase();
      if (this.subLinkDict.has(sub)) this.subLinkDict.get(sub).push(v[0]);
      else this.subLinkDict.set(sub, [v[0]]);
    });
  }

  /**
   * 翻译文本
   *
   * @static
   * @param {string} rawText 原文本
   * @returns {string} 翻译后的文本
   * @memberof Translator
   */
  static getLocText(rawText: string): string {
    if (this.Locale === "en") return rawText;
    return this.getLocTextCN(rawText);
  }
  static getLocTextCN(rawText: string): string {
    // 忽略大小写
    let text = rawText.toLowerCase(), m;
    // 处理如 "Lith A1" => "古纪 A1"
    if (m = text.match(/^(lith|axi|meso|neo) (\w+?\d+) (.+)/))
      return `${this.getLocText(m[1])} ${m[2].toUpperCase()} ${this.getLocText(m[3])}`;
    // 处理如 "100 Endo" => "100 内融核心"
    if (m = text.match(/^(\d+)s? (.+)/))
      return `${m[1]} ${this.getLocText(m[2])}`;
    // 处理如 "Weapon Restriction: Sniper Only" => "武器限定：狙击枪"
    if (text.includes(": "))
      return (([a, b]) => this.getLocText(a) + "：" + this.getLocText(b.replace(/ only$/i, "")))(rawText.split(": "));
    let lastWord = _.last(text.split(" "));
    // 辅助表查询
    let subfix = this.instance.subLinkDict.has(lastWord)
      && this.instance.subLinkDict.get(lastWord).find(v => text.endsWith(v))
      || lastWord;
    // 主表查询
    let localeSubfix = this.instance.subDict.get(subfix);
    if (localeSubfix && !this.instance.mainDict.has(text)) {
      let len = text.length - subfix.length - 1;
      if (len < 0)
        return localeSubfix;
      // 递归解析后缀
      return this.getLocText(rawText.substr(0, len)) + " " + localeSubfix;
    }
    return this.instance.mainDict.get(text) || rawText;
  }
}
