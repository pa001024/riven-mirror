import { i18n } from "@/i18n";

/**
 * 翻译工具类
 *
 * @export
 * @class Translator
 */
export class Translator {
  protected static instance = new Translator();
  private subDict: Map<string, string>;
  private subLinkDict: Map<string, string[]>;

  /**
   * 重新加载语言文件
   *
   * @memberof Translator
   */
  reload() {
    let enE = i18n.a("messagesExtend", "en") as { [key: string]: any }, clE = i18n.a("messagesExtend") as { [key: string]: any };
    let _partSubfixs = _.map(enE, (v, i) => [v.toLowerCase(), clE[i]] as [string, string]);
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
  static reload(){
    this.instance.reload();
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
    // alias 转换
    if (tranlateAlias.has(rawText)) rawText = tranlateAlias.get(rawText);
    // 忽略大小写
    let text = rawText.toLowerCase(), m;
    // 处理如 "Lith A1" / "Lith A1 Relic" => "古纪 A1 遗物"
    if (m = rawText.match(/^(lith|axi|meso|neo) (\w+?\d+)(?: (\S+?)(?: \(\S+\))?)?$/i))
      return `${this.getLocText(m[1])} ${m[2].toUpperCase()} ${this.getLocText(m[3] || "relic")}`;
    // 处理如 "100 Endo" => "100 内融核心"
    if (m = rawText.match(/^(\d+)s? (.+)/i))
      return `${m[1]} ${this.getLocText(m[2])}`;
    // 处理如 "Weapon Restriction: Sniper Only" => "武器限定：狙击枪"
    if (rawText.includes(": "))
      return (([a, b]) => this.getLocText(a) + "：" + this.getLocText(b.replace(/ only$/i, "")))(rawText.split(": "));
    let lastWord = _.last(text.split(" "));
    // 辅助表查询
    let subfix = this.instance.subLinkDict.has(lastWord)
      && this.instance.subLinkDict.get(lastWord).find(v => text.endsWith(v))
      || lastWord;
    // 主表查询
    let localeSubfix = this.instance.subDict.get(subfix);
    let mainMatch = i18n.t("messages")[_.camelCase(text)];
    if (localeSubfix && !mainMatch) {
      let len = text.length - subfix.length - 1;
      if (len < 0)
        return localeSubfix;
      // 递归解析后缀
      return this.getLocText(rawText.substr(0, len)) + " " + localeSubfix;
    }
    return mainMatch || rawText;
  }
}

const tranlateAlias = new Map([
  ["Liset Prop Ost Rug Baro", "Tenno Kindred Rug"],
  ["Colour Picker Twitch B Item A", "Eminence Palette"],
  ["Prisma Twin Gremlins Weapon", "Prisma Twin Gremlins"],
]);
