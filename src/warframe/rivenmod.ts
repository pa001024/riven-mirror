import { camelCase, cloneDeep, maxBy, max, compact, sampleSize, round, sample, startCase } from "lodash-es";
import { randomNormalDistribution, strSimilarity } from "./util";
import { base62, debase62 } from "./lib/base62";
import { Polarity, RivenProperty, RivenDatabase, RivenPropertyDataBase, NormalMod, MainTag, WeaponDatabase, RivenTypes, Weapon } from "./codex";
import { HH } from "@/var";
import { i18n } from "@/i18n";

/**
 * 紫卡属性数值
 */
export class ValuedRivenProperty {
  /** 属性原型 */
  prop: RivenProperty;
  /** 基础值 */
  baseValue: number;
  /** 偏差值 大约取值 0.89 ~ 1.11 -0.8 后 * 5000 精度为 -20.05 ~ +20.05 */
  deviation: number;
  /** 位置值 */
  upLevel: number;

  constructor(prop: RivenProperty, deviation: number, baseValue?: number, upLevel?: number, isValue?: boolean) {
    this.prop = prop;
    this.baseValue = baseValue;
    this.upLevel = upLevel;
    if (isValue) this.value = deviation;
    else this.deviation = deviation;
  }
  /** 获取属性id */
  get id() {
    return this.prop.id;
  }
  /** 获取属性名称 */
  get name() {
    return this.prop.name;
  }
  /** 获取属性显示数据 */
  get displayValue() {
    let val = this.prop.nopercent ? this.value.toFixed(1) : this.value.toFixed(1) + "%";
    if (val[0] != "-") return "+" + val;
    else return val;
  }
  /** 根据属性基础值计算属性偏差值 */
  get value() {
    return this.deviation * this.baseValue * this.upLevel;
  }
  set value(val) {
    this.deviation = val / (this.baseValue * this.upLevel);
  }
  /** 数值范围 [下限, 上限]  */
  get range() {
    let val = this.baseValue * this.upLevel;
    return [+(val * 0.9).toFixed(1), +(val * 1.1).toFixed(1)];
  }
  /** 获取偏差值显示数据 */
  get displayDeviation() {
    let val = this.deviation * 100 - 100,
      tex = val.toFixed(1) + "%";
    if (Math.abs(val) < 0.2) return "";
    if (tex[0] != "-") return "+" + tex;
    return tex;
  }
}

export class RivenMod {
  /** 武器ID */
  name: string;
  /** 等级 */
  level: number = 8;
  /** 极性 */
  polarity: Polarity;
  /** 根据卡面所带来的位置值 一共4种 0.755 | 1 | 0.942 | 1.243 分别代表 3+; 2+; 3+1-; 2+1- */
  upLevel = 1;
  /** 负面位置值 */
  negativeUpLevel = -0.755;
  /** 属性列表 */
  properties: ValuedRivenProperty[] = [];
  /** 是否有负面属性 */
  hasNegativeProp: boolean;
  /** 循环次数 */
  recycleTimes = 0;
  /** 段位 */
  rank: number;
  /** 类型 */
  mod: RivenTypes;
  /** 后缀 */
  private _subfix: string;
  get subfix(): string {
    if (this._subfix) return this._subfix;
    else {
      let props = this.properties.map(v => v.prop.id);
      if (this.hasNegativeProp) props.pop();
      this.shortSubfix = props.join("");
      return this._subfix;
    }
  }
  set subfix(value: string) {
    this._subfix = value;
  }

  get readableSubfix() {
    return this.properties.map(v => (v.upLevel < 0 ? "-" : "") + i18n.t(`prop.shortName.${v.id}`)).join("");
  }

  /** 本地化ID */
  get id() {
    return `messages.${camelCase(this.name)}`;
  }
  /** 本地化名称 */
  get locName() {
    return i18n.te(this.id) ? i18n.t(this.id) : this.name;
  }
  /** 全名 如: 西诺斯 Critacan*/
  get fullLocName() {
    return this.locName + " " + this.subfix;
  }
  /** 英文全名 如: Cernos Critacan*/
  get fullName() {
    return this.name + " " + this.subfix;
  }
  set fullName(value) {
    let v = value.split(" ");
    this.name = v[0];
    this.subfix = v[1];
  }
  get weapon() {
    return WeaponDatabase.getWeaponByName(this.name);
  }
  get weapons() {
    return WeaponDatabase.getWeaponsByBase(this.name);
  }
  get ratio() {
    return this.weapon.disposition;
  }
  get star() {
    return this.weapon.star;
  }
  get starText() {
    return this.weapon.starText;
  }

  constructor(parm?: string | RivenMod, base64 = false) {
    if (typeof parm === "string") {
      if (parm.indexOf("|") >= 0) this.qrCode = parm;
      else if (base64) this.qrCodeBase64 = parm;
      else this.parseString(parm);
    } else if (parm) {
      this.name = parm.name;
      this.subfix = parm.subfix;
      this.level = parm.level;
      this.polarity = parm.polarity;
      this.upLevel = parm.upLevel;
      this.negativeUpLevel = parm.negativeUpLevel;
      this.properties = cloneDeep(parm.properties);
      this.hasNegativeProp = parm.hasNegativeProp;
      this.recycleTimes = parm.recycleTimes;
      this.rank = parm.rank;
      this.mod = MainTag[parm.weapon.mod] as RivenTypes;
    }
  }
  /**
   * 读取OCR识别的MOD文本
   * @param modText MOD文本
   */
  parseString(modText: string) {
    /*
示例输入:
多克拉姆
Pleci-loctitis
+78.6%暴击伤害
滑行攻击有+89.2%的几率
造成暴击。
+106.6%攻击范围
-34.9%对Infested伤害
A段位12023
    */
    this.name = "";
    this.hasNegativeProp = false;
    this.rank = this.recycleTimes = 0;
    let lines = modText
      .replace(/\n([A-Za-z\u4e00-\u9fa5。]+)\n/g, (m, r1) => r1 + "\n")
      .replace(/(（\S*?)\s(\S*?）)|(\(\S*?)\s(\S*?\))/g, "$1$2$3$4")
      .replace("·", "-")
      .replace(/lgni/g, "Igni")
      .split(/\r?\n+|\b \b/g)
      .reduce((r, v) => {
        console.log(JSON.stringify(v), /^\w+$/.test(v));
        if (r.length && /^\w+$/.test(v)) {
          r[r.length - 1] = r[r.length - 1] + " " + v;
          return r;
        }
        return [...r, v];
      }, []);
    let subfixIndex = lines.findIndex(v => v.match(RivenDatabase.PrefixAll) != null);
    if (subfixIndex < 0) return new Error("紫卡属性识别错误: 找不到后缀");
    else {
      let idt = lines[subfixIndex].match(RivenDatabase.PrefixAll).index;
      if (idt > 0) {
        let subfix = lines[subfixIndex].substr(idt).trim();
        lines[subfixIndex] = lines[subfixIndex].substr(0, idt).trim();
        lines.splice(++subfixIndex, 0, subfix);
      }
    }
    console.log("lines=>", lines, lines[subfixIndex]);
    let rawName = lines[(subfixIndex || 1) - 1];
    // 查询名称最接近的武器
    let weapon = WeaponDatabase.findMostSimRivenWeapon(rawName);
    this.mod = MainTag[weapon.mod] as RivenTypes;
    this.subfix = lines[subfixIndex];
    // 识别到的名字是否正确, 否则模糊匹配
    this.name = weapon.name;
    // 获取后缀属性
    let rivenProps = this.parseSubfix(this.subfix, this.mod);
    let propRegExp = /([+\-]?\d+(?:\.\d+)?)%? *.*?([A-Zc\u4e00-\u9fa5]\D+)/;
    let properties: [RivenProperty, number][] = [];
    for (let i = subfixIndex + 1; i < lines.length; i++) {
      let propLine = lines[i].match(propRegExp);
      if (properties.length < 4 && !this.hasNegativeProp && propLine) {
        // 如果后缀已识别则优先使用(只识别一定次数)
        let prop =
          (i <= subfixIndex + ((rivenProps && rivenProps.length) || 0) &&
            rivenProps &&
            maxBy(rivenProps, v => {
              let s = max([strSimilarity(v[0].name, propLine[2]), strSimilarity(v[0].eName, propLine[2])]);
              // console.log("strSimilarity: ", v[0].name, propLine[2], "s=", s);
              return s;
            })[0]) ||
          // 识别到的属性是否正确, 否则模糊匹配
          RivenDatabase.findMostSimProp(propLine[2]);
        // 判断前缀不是+或者-就加上-
        let propValue = +(v => (v[0] != "-" && v[0] != "+" ? -v : v))(propLine[1]);
        // console.log(propLine[0], "prop=", prop, "propValue=", propValue);
        // 对于只有正面的属性去除负号
        if (prop.onlyPositive && propValue < 0) propValue = -propValue;
        // 检测负属性
        if ((prop.negative ? -propValue : propValue) < 0) this.hasNegativeProp = true;
        // 如果有4条则最后一个一定是负
        else if (properties.length === 3) {
          propValue = -propValue;
          this.hasNegativeProp = true;
        }
        if (properties.length > 3) {
          console.log("[ERR]more than 4 properties found", [prop.name, prop, propValue]);
          continue;
        }
        // 将属性值加入
        properties.push([prop, propValue]);
      } else {
        // 识别段位和重roll次数
        let extra = compact(lines[i].split(/\D+/g));
        this.rank = (extra[0] && +extra[0]) || 0;
        this.recycleTimes = (extra[1] && +extra[1]) || 0;
        if (this.recycleTimes == 0 && this.rank > 100) {
          // 1003变成10 3
          let str = this.rank.toFixed();
          // 万一紫卡就出到20段了呢
          if (str.startsWith("1") || str.startsWith("2")) {
            this.rank = +str.substr(0, 2);
            this.recycleTimes = +str.substr(3);
          } else {
            this.rank = +str.substr(0, 1);
            this.recycleTimes = +str.substr(2);
          }
        }
      }
    }
    // console.log(lines);
    // console.log(this.hasNegativeProp, properties);
    if (properties.length > (this.hasNegativeProp ? 4 : 3)) return new Error("紫卡属性识别错误: 正面属性过多");
    // 计算upLevel
    // 3+1- = [4-3]>> 1
    // 3+ = [3-1]>>2
    // 2+ = [2-1]>>1
    // 2+1- = [3-3]>>0
    this.upLevel = toUpLevel(properties.length, this.hasNegativeProp);
    this.negativeUpLevel = -toNegaUpLevel(properties.length, this.hasNegativeProp);
    // 写入属性
    this.parseProps(properties.map(v => [v[0].id, v[1]] as [string, number]));
    return;
  }
  /**
   * 识别后缀
   * @param subfix 后缀
   * @param stype MOD类型
   */
  parseSubfix(subfix: string, stype: string): [RivenProperty, string][] {
    if (!subfix) return;
    let rst = subfix.toLowerCase().match(RivenDatabase.PropRegExps[stype]);
    if (rst) {
      let fixs = rst.slice(rst[1] ? 1 : 2, 4);
      return fixs.map((v, i): [RivenProperty, string] => [RivenPropertyDataBase[stype].find(p => v == p[i < fixs.length - 1 ? "prefix" : "subfix"]), v]);
    }
    return;
  }
  /**
   * 识别普通MOD格式的属性
   */
  parseProps(props: [string, number][], weapon = this.weapon) {
    this.hasNegativeProp = props.reduce((r, v, i) => {
      let prop = RivenDatabase.getPropByName(v[0]);
      const isNegative = i >= 3 || !prop.negative == v[1] < 0;
      if (isNegative) return true;
      return r;
    }, false);
    this.upLevel = toUpLevel(props.length, this.hasNegativeProp);
    this.negativeUpLevel = -toNegaUpLevel(props.length, this.hasNegativeProp);
    this.properties = props.map((v, i) => {
      let prop = RivenDatabase.getPropByName(v[0]);
      const isNegative = i >= 3 || !prop.negative === v[1] < 0;
      const base = weapon.getPropBaseValue(prop.name);
      const up = isNegative ? this.negativeUpLevel : this.upLevel;
      return new ValuedRivenProperty(prop, v[1], base, up, true);
    });
  }
  /**
   * 识别偏差值数据
   */
  parseDevis(props: [string, number][]) {
    const weapon = this.weapon;
    this.hasNegativeProp = props.length > this.shortSubfix.length;
    this.upLevel = toUpLevel(props.length, this.hasNegativeProp);
    this.negativeUpLevel = -toNegaUpLevel(props.length, this.hasNegativeProp);
    this.properties = props.map((v, i) => {
      let prop = RivenDatabase.getPropByName(v[0]);
      const base = weapon.getPropBaseValue(prop.name);
      const up = this.hasNegativeProp && i === props.length - 1 ? this.negativeUpLevel : this.upLevel;
      return new ValuedRivenProperty(prop, v[1], base, up);
    });
  }
  /**
   * 随机化所有
   */
  random(stype: string = "") {
    let db = WeaponDatabase.protos.filter(v => v.disposition > 0);
    let data = stype ? db.filter(v => v.mod === MainTag[stype]) : db;
    let { name, mod } = data[~~(Math.random() * data.length)];
    let rank = ~~(Math.random() * 8) + 9;
    [this.name, this.mod, this.rank, this.recycleTimes] = [name, MainTag[mod] as RivenTypes, rank, 0];
    this.randomProp();
  }
  /**
   * 只随机化属性
   */
  randomProp() {
    this.subfix = "";
    let count = ~~(Math.random() * 2) + 2;
    this.hasNegativeProp = ~~(Math.random() * 2) > 0;
    let totalCount = count + (this.hasNegativeProp ? 1 : 0);
    this.upLevel = toUpLevel(totalCount, this.hasNegativeProp);
    this.negativeUpLevel = -toNegaUpLevel(totalCount, this.hasNegativeProp);
    // 偏差值 正态分布 标准差=5
    let devi = () => (100 + 5 * randomNormalDistribution()) / 100;
    const weapon = this.weapon;
    // console.log(weapon, RivenPropertyDataBase[this.mod]);
    let props = sampleSize(
      RivenPropertyDataBase[this.mod].filter(v => !v.onlyNegative),
      count
    ).map(v => [v.id, round(devi() * this.upLevel * weapon.getPropBaseValue(v.id), 1)]) as [string, number][];
    if (this.hasNegativeProp) {
      let neProp = sample(RivenPropertyDataBase[this.mod].filter(v => !v.onlyPositive && props.every(k => k[0] !== v.id)));
      props.push([neProp.id, round(devi() * this.negativeUpLevel * weapon.getPropBaseValue(neProp.id), 1)]);
    }
    this.parseProps(props);
  }
  /**
   * 模拟洗卡
   * @return newMod RivenMod
   */
  reroll() {
    ++this.recycleTimes;
    let newMod = new RivenMod(this);
    newMod.randomProp();
    return newMod;
  }
  /** 返回一个标准MOD对象 */
  normalMod(weapon: Weapon): NormalMod {
    const ratio = weapon.disposition && this.weapon.disposition ? weapon.disposition / this.weapon.disposition : 1;
    console.log(this);
    return new NormalMod({
      key: "01",
      id: this.fullName,
      name: this.fullLocName,
      type: this.name,
      polarity: this.polarity || "r",
      cost: 10,
      level: 8,
      rarity: "x",
      props: this.properties.map(v => [v.prop.id, (ratio * v.value) / 9] as [string, number]),
      riven: this.qrCode,
    });
  }
  /** 短后缀 */
  get shortSubfix() {
    let subs = this.parseSubfix(this.subfix, this.mod);
    if (subs) return subs.map(v => v[0].id).join("");
    return "";
  }
  set shortSubfix(value) {
    let props = value.split("").map(v => RivenDatabase.getPropByName(v));
    if (props.length === 3) this.subfix = startCase(props[0].prefix) + "-" + props[1].prefix + props[2].subfix;
    else if (props.length === 2) this.subfix = startCase(props[0].prefix) + props[1].subfix;
  }
  /** 返回二维码使用的序列化字符串 */
  get qrCode() {
    return [
      this.name,
      this.shortSubfix,
      base62(this.rank) + base62(this.recycleTimes),
      this.properties.map(v => v.prop.id + base62(+(v.deviation * 5000 - 4000).toFixed(0))).join("."),
    ].join("|");
  }
  /** 读取二维码识别后的序列化字符串 */
  set qrCode(value) {
    let d = value.split("|");
    if (!d[0]) return;
    this.name = d[0];
    if (d[1]) this.shortSubfix = d[1];
    let weapon = WeaponDatabase.getWeaponByName(this.name);
    this.name = weapon.name;
    this.mod = MainTag[weapon.mod] as RivenTypes;
    this.rank = debase62(d[2][0]);
    this.recycleTimes = debase62(d[2].substr(1));
    let props = d[3].split(".").map(v => {
      let vv = (debase62(v.substr(1)) + 4000) / 5000;
      return [RivenDatabase.getPropByName(v[0]), vv];
    }) as [RivenProperty, number][];
    let lastProp = props[props.length - 1];
    this.hasNegativeProp = props.length === 4 || !lastProp[0].negative === lastProp[1] < 0;
    this.upLevel = toUpLevel(props.length, this.hasNegativeProp);
    this.negativeUpLevel = -toNegaUpLevel(props.length, this.hasNegativeProp);
    this.parseDevis(props.map(([n, v]) => [n.id, v] as [string, number]));
  }
  get qrCodeV1() {
    return [
      this.name,
      this.shortSubfix,
      base62(this.rank) + base62(this.recycleTimes),
      this.properties.map(v => v.prop.id + base62(+(v.deviation * 10).toFixed(0))).join("."),
    ].join("|");
  }
  /** 读取二维码识别后的序列化字符串 */
  set qrCodeV1(value) {
    let d = value.split("|");
    if (!d[0]) return;
    this.name = d[0];
    if (d[1]) this.shortSubfix = d[1];
    let weapon = WeaponDatabase.getWeaponByName(this.name);
    this.name = weapon.name;
    this.mod = MainTag[weapon.mod] as RivenTypes;
    this.rank = debase62(d[2][0]);
    this.recycleTimes = debase62(d[2].substr(1));
    let props = d[3].split(".").map(v => {
      let vv = debase62(v.substr(1)) / 10;
      return [RivenDatabase.getPropByName(v[0]), vv];
    }) as [RivenProperty, number][];
    let lastProp = props[props.length - 1];
    this.hasNegativeProp = props.length === 4 || !lastProp[0].negative == lastProp[1] < 0;
    this.upLevel = toUpLevel(props.length, this.hasNegativeProp);
    this.parseProps(props.map(([n, v]) => [n.id, v] as [string, number]));
  }
  /** Base64形式的二维码 */
  get qrCodeBase64() {
    return btoa(this.qrCode);
  }
  set qrCodeBase64(value) {
    this.qrCode = atob(value);
  }
  get qrCodeBase64V1() {
    return btoa(this.qrCodeV1);
  }
  set qrCodeBase64V1(value) {
    this.qrCodeV1 = atob(value);
  }
  /** 网址形式的二维码 */
  get qrCodeURL() {
    return `https://${HH}/riven/` + this.qrCodeBase64;
  }
  set qrCodeURL(value) {
    this.qrCodeBase64 = value.replace(`https://${HH}/riven/`, "");
  }
  /** 返回完整的modText */
  get modText() {
    return [this.fullLocName, ...this.properties.map(v => v.displayValue + v.name), this.rank + "O" + this.recycleTimes].join("\n");
  }
  set modText(value) {
    this.parseString(value);
  }
}

export function toUpLevel(len: number, nega: boolean) {
  return [1.243, 0.942, 1, 0.755][len - (nega ? 3 : 0)];
}
export function toNegaUpLevel(len: number, nega: boolean) {
  return [0.5, 0.755, 1, 1][len - (nega ? 3 : 0)];
}
