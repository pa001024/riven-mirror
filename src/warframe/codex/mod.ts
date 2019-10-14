import _ from "lodash";
import { ValuedProperty } from "./prop";
import { i18n } from "@/i18n";

export type Polarity = "r" | "-" | "d" | "=" | "w";
export type Rarity = "n" | "c" | "r" | "g" | "l" | "x";

export interface NormalModData {
  /** 索引 */
  key: string;
  /** ID */
  id: string;
  /** 名称 */
  name?: string;
  /** 描述 */
  desc?: string;
  /** 适用对象 */
  type: string;
  /** 极性 */
  polarity: Polarity;
  /** 消耗 */
  cost: number;
  /** 等级 */
  level: number;
  /** 稀有度 */
  rarity: Rarity;
  /** 属性 */
  props: [string, number][];
  /** 等价的MOD 如元素卡 */
  canReplaceBy?: string[];
  /** P卡或其他种类高级卡对应的普通卡的名称 */
  primed?: string;
  /** 紫卡元数据 */
  riven?: string;
}

const elems = {
  4: "Heat",
  5: "Cold",
  6: "Toxin",
  7: "Electricity",
  8: "Impact",
  9: "Puncture",
  A: "Slash",
};

/**
 * 普通MOD信息
 */
export class NormalMod implements NormalModData {
  key: string;
  id: string;
  customName?: string;
  type: string;
  polarity: Polarity;
  baseCost: number;
  level: number;
  maxLevel: number;
  rarity: Rarity;
  _props: [string, number][];
  private _propsMax: [string, number][];
  canReplaceBy?: string[];
  primed?: string;
  riven?: string;
  setMul: number = 1;
  /** 元素名称 */
  get elemType() {
    const elem = this.props.find(v => elems[v[0]]);
    return elem ? elems[elem[0]] : "";
  }

  get props() {
    if (this.setMul === 1 && this.level === this.maxLevel && this._propsMax) return this._propsMax;
    let hasAbs = false;
    let nprops = this._props.map(([vn, vv]) => {
      if (vn.startsWith("!")) {
        hasAbs = true;
        return [vn, +(vv * this.setMul).toFixed(4)] as [string, number];
      }
      return [vn, +(vv * (this.level + 1) * this.setMul).toFixed(4)] as [string, number];
    });
    if (hasAbs) {
      let pn = {};
      nprops.forEach(([vn, vv]) => {
        // '!': fixed 不动数
        if (vn.startsWith("!")) pn[vn.substr(1)] = (pn[vn.substr(1)] || 0) + vv;
        else pn[vn] = (pn[vn] || 0) + vv;
      });
      nprops = _.map(pn, (v, i) => [i, v] as [string, number]);
    }
    if (this.setMul === 1 && this.level === this.maxLevel) this._propsMax = nprops;
    return nprops;
  }
  /**
   * 显示用Props
   *
   * @readonly
   * @memberof NormalMod
   */
  get vProps() {
    return this.props.map(prop => {
      let vp = ValuedProperty.parse(prop);
      return {
        id: vp.id,
        fullName: vp.fullString,
        shortName: vp.shortString,
        value: vp.value,
        dmg: vp.prop.dmg,
      };
    });
  }

  get cost(): number {
    return this.baseCost < 0 ? this.baseCost - this.level : this.baseCost + this.level;
  }
  get delta() {
    return this.baseCost < 0 ? -this.cost : Math.floor(this.cost / 2);
  }
  get theta() {
    return this.baseCost < 0 ? Math.ceil(this.cost / 1.25) - this.cost : this.cost - Math.ceil(this.cost * 1.25);
  }
  get name() {
    const ikey = `messages.${_.camelCase(this.id)}`;
    let name = this.customName || (i18n.te(ikey) ? i18n.t(ikey) : this.id);
    return name || "";
  }

  /**
   * 简称
   *
   * @readonly
   * @memberof NormalMod
   */
  get shortName() {
    const ikey = `mods.${_.camelCase(this.key === "01" ? "riven" : this.id)}`;
    let name = i18n.te(ikey) ? i18n.t(ikey) : "";
    return name || this.name;
  }

  /** 描述 */
  get desc() {
    let desc = i18n.t(`moddesc.${_.camelCase(this.id)}`) as string;
    return desc || "";
  }

  /** 是否银元素卡 */
  get isElement() {
    return this.props.every(v => ["4", "5", "6", "7"].includes(v[0]));
  }

  /** 计算实际容量消耗 */
  calcCost(polarity: string) {
    if (polarity)
      return this.type === "Aura"
        ? Math.ceil(polarity === this.polarity ? this.cost * 2 : this.cost / 1.25)
        : Math.round(polarity === this.polarity ? this.cost / 2 : this.cost * 1.25);
    else return this.cost;
  }

  /** 调整等级 */
  scaleLevel(level: number) {
    if (level >= this.maxLevel) return this;
    let { key, id, customName, type, polarity, rarity, maxLevel, canReplaceBy, primed, riven } = this;
    return new NormalMod(
      {
        key,
        id,
        type,
        polarity,
        rarity,
        canReplaceBy,
        primed,
        riven,
        props: this._props,
        name: customName,
        level: maxLevel,
        cost: this.baseCost,
      },
      level
    );
  }

  constructor(data: NormalModData, userLevel?: number) {
    this.key = data.key;
    this.id = data.id;
    this.customName = data.name;
    this.type = data.type;
    this.polarity = data.polarity;
    this.baseCost = data.cost;
    this.level = userLevel || data.level;
    this.maxLevel = data.level;
    this.rarity = data.rarity;
    this._props = data.props;
    this.canReplaceBy = data.canReplaceBy;
    this.primed = data.primed;
    this.riven = data.riven;
  }
}

import _normalModSource from "./mod.data";

const linkedMods = [
  ["Sacrificial Pressure", "Primed Pressure Point"], // 压迫点 (TODO: 好像会导致压迫点和牺牲一起装备)
  ["True Steel", "Sacrificial Steel"], // 斩铁
  ["Vitality", "Umbral Vitality"], // 生命力
  ["Steel Fiber", "Umbral Fiber"], // 纤维
  ["Intensify", "Umbral Intensify"], // 聚精会神
  ["Enhanced Vitality", "Link Health"], // 生命
  ["Calculated Redirection", "Link Shields"], // 护盾
  ["Metal Fiber", "Link Armor"], // 护甲
];
/**
 * 普通MOD信息
 */
export const NormalModDatabase = _normalModSource.map(v => {
  let linked = linkedMods.find(k => v[1] === k[0]);
  let pr = _normalModSource.find(k => (linked ? k[1] === linked[1] : k[1] === "Primed " + v[1] || k[1] === "Amalgam " + v[1]));
  return new NormalMod({
    key: v[0],
    id: v[1],
    props: v[2],
    type: v[3],
    cost: v[6] || 0,
    level: v[7] || 5,
    polarity: v[4],
    rarity: v[5],
    primed: pr && pr[1],
  } as NormalModData);
});

export const NormalCardDependTable: { [key: string]: string } = {
  "Bladed Rounds": "Vital Sense", // 尖刃弹头 -> 致命一击
  "Heavy Caliber": "Serration", // 重口径 -> 膛线
  "Pressurized Magazine": "Anemic Agility", // 增压弹匣 -> 乏能迅敏
};

export const AcolyteModsList: string[] = [
  "Weeping Wounds",
  "Blood Rush",
  "Body Count",
  "Maiming Strike",
  "Focused Defense", // "创口溃烂", "急进猛突", "杀伤计数", "致残突击", "重点防御",
  "Guided Ordnance",
  "Bladed Rounds",
  "Argon Scope",
  "Spring Loaded Chamber",
  "Catalyzer Link", // "制导弹药", "尖刃弹头", "氩晶瞄具", "簧压膛室", "触媒连动",
  "Narrow Barrel",
  "Shrapnel Shot",
  "Nano Applicator",
  "Repeater Clip",
  "Laser Sight", // "狭窄枪膛", "破片射击", "纳米涂覆", "转轮弹匣", "雷射瞄具",
  "Embedded Catalyzer",
  "Pressurized Magazine",
  "Targeting Subsystem",
  "Sharpened Bullets",
  "Hydraulic Crosshairs", // "内置触媒", "增压弹匣", "定位辅助", "尖锐子弹", "液压准心",
];

export const VirtualMeleeMods = ["D3", "D4", "D5", "D6"];
