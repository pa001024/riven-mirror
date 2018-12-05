import { MeleeWeaponDataBase, NormalMod, RivenDataBase, RivenProperty, RivenPropertyDataBase, RivenWeaponDataBase, GunWeaponDataBase } from ".";
import { Base64, randomNormalDistribution, strSimilarity } from "./util";
import _ from "lodash";
import { base62, debase62 } from "./lib/base62";

export class ValuedRivenProperty {
  /** 属性原型 */
  prop: RivenProperty
  /** 属性值 */
  value: number
  /** 属性基础值 */
  baseValue: number
  /** 调整数值 */
  upLevel: number

  constructor(prop: RivenProperty, value: number, baseValue?: number, upLevel?: number) {
    this.prop = prop;
    this.value = value;
    this.baseValue = baseValue;
    this.upLevel = upLevel;
  }
  /**  获取属性id */
  get id() { return this.prop.id }
  /**  获取属性名称 */
  get name() { return this.prop.name }
  /** 获取属性显示数据 */
  get displayValue() {
    let val = this.prop.nopercent ? this.value.toFixed(1) : this.value.toFixed(1) + "%";
    if (val[0] != "-")
      return "+" + val;
    else return val;
  }
  /** 获取本条属性是否是负面属性 */
  get isNegative() {
    return this.prop.negative ? this.value > 0 : this.value < 0;
  }
  get negativeUpLevel() {
    return this.upLevel == 1.243 ? 0.5 : 0.755;
  }
  /** 根据属性基础值计算属性偏差值 */
  get deviation() {
    return (this.isNegative ? -1 : 1) * this.value / (this.isNegative ? this.negativeUpLevel : this.upLevel) / this.baseValue;
  }
  /** 数值范围 [下限, 上限]  */
  get range() {
    let val = this.baseValue * (this.isNegative ? -1 : 1) * (this.isNegative ? this.negativeUpLevel : this.upLevel);
    return [+(val * 0.9).toFixed(1), +(val * 1.1).toFixed(1)];
  }
  /** 获取偏差值显示数据 */
  get displayDeviation() {
    let val = (this.deviation * 100 - 100), tex = val.toFixed(1) + "%";
    if (Math.abs(val) < 0.2) return "";
    if (tex[0] != "-")
      return "+" + tex;
    return tex;
  }
  /** 根据属性基础值标准化属性值 */
  normalize() {
    let devi = this.deviation;
    if (devi < 0.3)
      this.value *= 9;
    return this
  }
}

export class RivenMod {
  /** 武器ID */
  id: string
  /** 武器本地化名称 */
  name: string
  /** 后缀 */
  private _subfix: string;
  get subfix(): string {
    if (this._subfix)
      return this._subfix;
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
  /** 等级 */
  level: number = 8
  /** 极性 */
  polarity: "r" | "-" | "d"
  /** 根据卡面所带来的提升值 一共三种 0.8 | 1 | 1.2 分别代表 3+; 2+/3+1-; 2+1- */
  upLevel = 1
  /** 全名 如: 西诺斯 Critacan*/
  get fullName() { return this.name + " " + this.subfix }
  set fullName(value) { let v = value.split(" "); this.name = v[0]; this.subfix = v[1]; }
  /** 英文全名 如: Cernos Critacan*/
  get fullId() { return this.id + " " + this.subfix }
  set fullId(value) { let v = value.split(" "); this.id = v[0]; this.subfix = v[1]; }
  /** 属性列表 */
  properties: ValuedRivenProperty[] = []
  /** 是否有负面属性 */
  hasNegativeProp: boolean
  /** 循环次数 */
  recycleTimes = 0
  /** 段位 */
  rank: number
  /** 类型 */
  mod: string
  get weapon() { return RivenDataBase.getRivenWeaponByName(this.id); }
  get ratio() { return this.weapon.ratio; }
  get star() { return this.weapon.star; }
  get starText() { return this.weapon.starText; }
  calcPrice(x: number) { return this.weapon.calcPrice(x); }

  constructor(parm?: string | RivenMod, base64 = false) {
    if (typeof parm === "string") {
      if (parm.indexOf("|") >= 0)
        this.qrCode = parm;
      else if (base64)
        this.qrCodeBase64 = parm;
      else
        this.parseString(parm);
    } else if (parm) {
      this.id = parm.id;
      this.name = parm.name;
      this.subfix = parm.subfix;
      this.level = parm.level;
      this.polarity = parm.polarity;
      this.upLevel = parm.upLevel;
      this.properties = _.cloneDeep(parm.properties);
      this.hasNegativeProp = parm.hasNegativeProp;
      this.recycleTimes = parm.recycleTimes;
      this.rank = parm.rank;
      this.mod = parm.mod;
    }
  }
  is(tag: string) {
    tag = tag.toLowerCase();
    switch (tag) {
      case "gun": return this.mod !== "Melee";
      case "melee": return this.mod === "Melee";
      case "pistol": return this.mod === "Pistol";
      case "rifle": return this.mod === "Rifle";
      case "sniper": return this.mod === "Rifle" && this.weapons[0].tags.includes("Sniper");
      case "zaw": return this.mod === "Melee" && MeleeWeaponDataBase.filter(v => this.id === (v.rivenName || v.id)).length === 0;
      case "kitgun": return this.mod === "Pistol" && GunWeaponDataBase.filter(v => this.id === (v.rivenName || v.id)).length === 0;
    }
    return false;
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
    this.id = this.name = "";
    this.hasNegativeProp = false;
    this.rank = this.recycleTimes = 0;
    let lines = modText.replace(/\n([A-Za-z\u4e00-\u9fa5。]+)\n/g, (m, r1) => r1 + "\n")
      .replace(/(（\S*?)\s(\S*?）)|(\(\S*?)\s(\S*?\))/g, "$1$2$3$4").replace("·", "-").replace(/lgni/g, "Igni").split(/\n+/g);
    console.log("lines=>", lines);
    let subfixIndex = lines.findIndex(v => v.match(RivenDataBase.PrefixAll) != null);
    if (subfixIndex < 0) return new Error("紫卡属性识别错误: 找不到后缀");
    else {
      let idt = lines[subfixIndex].match(RivenDataBase.PrefixAll).index;
      if (idt > 0) {
        let subfix = lines[subfixIndex].substr(idt).trim();
        lines[subfixIndex] = lines[subfixIndex].substr(0, idt).trim();
        lines.splice(++subfixIndex, 0, subfix);
      }
    }
    let rawName = lines[subfixIndex - 1];
    // 查询名称最接近的武器
    let weapon = RivenDataBase.findMostSimRivenWeapon(rawName);
    this.mod = weapon.mod;
    this.subfix = lines[subfixIndex];
    // 识别到的名字是否正确, 否则模糊匹配
    this.name = weapon.name;
    this.id = weapon.id;
    // 获取后缀属性
    let rivenProps = this.parseSubfix(this.subfix, this.mod);
    let propRegExp = /([+\-]?\d+(?:\.\d+)?)%? *.*?([A-Zc\u4e00-\u9fa5]\D+)/;
    let properties: [RivenProperty, number][] = [];
    for (let i = subfixIndex + 1; i < lines.length; i++) {
      let propLine = lines[i].match(propRegExp);
      if (properties.length < 4 && !this.hasNegativeProp && propLine) {
        // 如果后缀已识别则优先使用(只识别一定次数)
        let prop = ((i <= subfixIndex + (rivenProps && rivenProps.length || 0)) && rivenProps && _.maxBy(rivenProps, v => {
          let s = _.max([strSimilarity(v[0].name, propLine[2]), strSimilarity(v[0].eName, propLine[2])]);
          console.log("strSimilarity: ", v[0].name, propLine[2], "s=", s);
          return s;
        })[0])
          // 识别到的属性是否正确, 否则模糊匹配
          || RivenDataBase.findMostSimProp(propLine[2]);
        // 判断前缀不是+或者-就加上-
        let propValue = +(v => v[0] != '-' && v[0] != '+' ? -v : v)(propLine[1]);
        console.log(propLine[0], "prop=", prop, "propValue=", propValue);
        // 对于只有正面的属性去除负号
        if (prop.onlyPositive && propValue < 0) propValue = -propValue;
        // 检测负属性
        if ((prop.negative ? -propValue : propValue) < 0)
          this.hasNegativeProp = true;
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
        let extra = _.compact(lines[i].split(/\D+/g));
        this.rank = extra[0] && +extra[0] || 0;
        this.recycleTimes = extra[1] && +extra[1] || 0;
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
    let rst = subfix.toLowerCase().match(RivenDataBase.PropRegExps[stype]);
    if (rst) {
      let fixs = rst.slice(rst[1] ? 1 : 2, 4);
      return fixs.map((v, i): [RivenProperty, string] =>
        [RivenPropertyDataBase[stype].find(p => v == p[i < fixs.length - 1 ? "prefix" : "subfix"]), v]);
    }
    return;
  }
  /**
   * 识别普通MOD格式的属性
   */
  parseProps(props: [string, number][]) {
    this.hasNegativeProp = false;
    this.properties = props.map((v, i) => {
      let prop = RivenDataBase.getPropByName(v[0]);
      if (i >= 3 || (prop.negative ? -v[1] : v[1]) < 0) this.hasNegativeProp = true;
      return new ValuedRivenProperty(prop, v[1], RivenDataBase.getPropBaseValue(this.name, prop.name), this.upLevel).normalize();
    });
  }
  /**
   * 随机化所有
   */
  random(stype: string = "") {
    let db = RivenWeaponDataBase.filter(v => v.ratio > 0 && v.id !== "Artax");
    let data = stype ? db.filter(v => v.mod === stype) : db;
    let { id, name, mod } = data[~~(Math.random() * data.length)];
    let rank = ~~(Math.random() * 8) + 9;
    [this.id, this.name, this.mod, this.rank, this.recycleTimes] = [id, name, mod, rank, 0];
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
    let negaUplvl = toNegaUpLevel(totalCount, this.hasNegativeProp);
    // 偏差值 正态分布 标准差=5
    let devi = () => (100 + 5 * randomNormalDistribution()) / 100;
    let props = _.sampleSize(RivenPropertyDataBase[this.mod], count)
      .map(v => [v.id, _.round(devi() * this.upLevel * RivenDataBase.getPropBaseValue(this.name, v.id), 1)]) as [string, number][];
    if (this.hasNegativeProp) {
      let neProp = _.sample(RivenPropertyDataBase[this.mod].filter(v => !v.onlyPositive && props.every(k => k[0] !== v.id)));
      props.push([neProp.id, _.round(devi() * -negaUplvl * RivenDataBase.getPropBaseValue(this.name, neProp.id), 1)]);
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
  /** 返回适用的武器列表 */
  get weapons() {
    return RivenDataBase.getNormalWeaponsByRivenName(this.id);
  }
  /** 返回一个标准MOD对象 */
  get normalMod(): NormalMod {
    return {
      key: "01",
      id: this.fullId,
      name: this.fullName,
      type: this.name,
      desc: "裂罅MOD",
      polarity: this.polarity || "r",
      cost: 18,
      rarity: "x",
      props: this.properties.map(v => [v.prop.id, v.value / 100] as [string, number]),
      riven: this.qrCode
    };
  }
  /** 是否是Zaw */
  get isZaw() { return this.is("zaw"); }
  /** 是否是Kitgun */
  get isKitgun() { return this.is("kitgun"); }
  /** 短后缀 */
  get shortSubfix() {
    let subs = this.parseSubfix(this.subfix, this.mod);
    if (subs)
      return subs.map(v => v[0].id).join("");
    return "";
  }
  set shortSubfix(value) {
    let props = value.split("").map(v => RivenDataBase.getPropByName(v));
    if (props.length === 3)
      this.subfix = _.startCase(props[0].prefix) + "-" + props[1].prefix + props[2].subfix;
    else if (props.length === 2)
      this.subfix = _.startCase(props[0].prefix) + props[1].subfix;
  }
  /** 返回二维码使用的序列化字符串 */
  get qrCode() {
    return [this.id, this.shortSubfix, base62(this.rank) + base62(this.recycleTimes), this.properties.map(v => v.prop.id + base62(+(v.value * 10).toFixed(0))).join(".")].join("|");
  }
  /** 读取二维码识别后的序列化字符串 */
  set qrCode(value) {
    let d = value.split("|");
    this.id = d[0];
    this.shortSubfix = d[1];
    let weapon = RivenDataBase.findMostSimRivenWeapon(this.id);
    this.name = weapon.name;
    this.mod = weapon.mod;
    this.rank = debase62(d[2][0]);
    this.recycleTimes = debase62(d[2].substr(1));
    let props = d[3].split(".").map(v => {
      let vv = debase62(v.substr(1)) / 10;
      return [RivenDataBase.getPropByName(v[0]), vv];
    }) as [RivenProperty, number][];
    let lastProp = props[props.length - 1];
    this.hasNegativeProp = props.length === 4 || !lastProp[0].negative == (lastProp[1] < 0);
    this.upLevel = toUpLevel(props.length, this.hasNegativeProp);
    this.properties = props.map(v =>
      new ValuedRivenProperty(v[0], v[1], RivenDataBase.getPropBaseValue(this.name, v[0].name), this.upLevel).normalize());
  }
  /** Base64形式的二维码 */
  get qrCodeBase64() {
    return Base64.encodeURI(this.qrCode);
  }
  set qrCodeBase64(value) {
    this.qrCode = Base64.decode(value);
  }
  /** 网址形式的二维码 */
  get qrCodeURL() {
    return "https://rm.0-0.at/riven/" + this.qrCodeBase64;
  }
  set qrCodeURL(value) {
    this.qrCodeBase64 = value.replace("https://rm.0-0.at/riven/", "");
  }
  /** 返回完整的modText */
  get modText() {
    return [this.fullName, ...this.properties.map(v => v.displayValue + v.name), this.rank + "O" + this.recycleTimes].join("\n");
  }
  set modText(value) {
    this.parseString(value);
  }
}

export function toUpLevel(len: number, nega: boolean) {
  return [1.243, 0.942, 1, 0.755][len - (nega ? 3 : 0)];
}
export function toNegaUpLevel(len: number, nega: boolean) {
  return [0.5, 0.755, 0, 0][len - (nega ? 3 : 0)];
}
