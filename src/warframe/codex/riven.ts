import _ from "lodash";
import { strSimilarity } from "../util";
import { i18n } from "@/i18n";
import { _rivenDataBaseWeapons, _rivenDataBaseWeaponsCY } from "./riven.data";

/**MOD上的裂罅属性 */
export interface RivenPropertyValue {
  id: string;
  name: string;
  value: number;
}
/**
 * 裂罅属性条目
 *
 * 符号标记说明,如: DSR-Z 即为伤害多重射速负后座
 */
export interface RivenProperty {
  id: string;
  name: string;
  eName: string;
  sName: string;
  prefix: string;
  subfix: string;
  onlyPositive?: boolean;
  nopercent?: boolean;
  negative?: boolean;
  noDmg?: boolean;
  displayPre?: string;
  eDisplayPre?: string;
}

const baseProperty: RivenProperty[] = [
  { id: "0", sName: "暴击率", eName: "Critical Chance", name: "暴击率", prefix: "crita", subfix: "cron" }, //
  { id: "1", sName: "暴击伤害", eName: "Critical Damage", name: "暴击伤害", prefix: "acri", subfix: "tis" }, //
  { id: "2", sName: "触发率", eName: "Status Chance", name: "触发几率", prefix: "hexa", subfix: "dex", noDmg: true }, //
  { id: "3", sName: "触发时间", eName: "Status Duration", name: "触发时间", prefix: "deci", subfix: "des", noDmg: true }, //
  { id: "4", sName: "火伤", eName: "Heat", name: "火焰伤害", prefix: "igni", subfix: "pha", onlyPositive: true }, //
  { id: "5", sName: "冰伤", eName: "Cold", name: "冰冻伤害", prefix: "geli", subfix: "do", onlyPositive: true }, //
  { id: "6", sName: "毒伤", eName: "Toxin", name: "毒素伤害", prefix: "toxi", subfix: "tox", onlyPositive: true }, //
  { id: "7", sName: "电伤", eName: "Electricity", name: "电击伤害", prefix: "vexi", subfix: "tio", onlyPositive: true }, //
  { id: "8", sName: "冲击", eName: "Impact", name: "冲击伤害", prefix: "magna", subfix: "ton" }, //
  { id: "9", sName: "穿刺", eName: "Puncture", name: "穿刺伤害", prefix: "insi", subfix: "cak" }, //
  { id: "A", sName: "切割", eName: "Slash", name: "切割伤害", prefix: "sci", subfix: "sus" }, //
  { id: "G", sName: "Grineer伤害", eName: "Damage to Grineer", name: "对Grineer伤害", prefix: "argi", subfix: "con" }, //
  { id: "I", sName: "Infested伤害", eName: "Damage to Infested", name: "对Infested伤害", prefix: "pura", subfix: "ada" }, //
  { id: "C", sName: "Corpus伤害", eName: "Damage to Corpus", name: "对Corpus伤害", prefix: "manti", subfix: "tron" } //
];

const gunProperty: RivenProperty[] = [
  { id: "D", sName: "伤害", eName: "Damage", name: "伤害", prefix: "visi", subfix: "ata" }, //
  { id: "S", sName: "多重", eName: "Multishot", name: "多重射击", prefix: "sati", subfix: "can" }, //
  { id: "R", sName: "射速", eName: "Fire Rate", name: "射速", prefix: "croni", subfix: "dra" }, //
  { id: "L", sName: "弹匣", eName: "Magazine Capacity", name: "弹匣容量", prefix: "arma", subfix: "tin" }, //
  { id: "F", sName: "装填", eName: "Reload Speed", name: "装填速度", prefix: "feva", subfix: "tak" }, //
  { id: "M", sName: "弹药", eName: "Ammo Maximum", name: "弹药最大值", prefix: "ampi", subfix: "bin", noDmg: true }, //
  { id: "P", sName: "穿透", eName: "Punch Through", name: "穿透", prefix: "lexi", subfix: "nok", onlyPositive: true, nopercent: true, noDmg: true }, //
  { id: "H", sName: "变焦", eName: "Zoom", name: "变焦", prefix: "hera", subfix: "lis", noDmg: true }, //
  { id: "V", sName: "弹道", eName: "Projectile Speed", name: "投射物速度", prefix: "conci", subfix: "nak", noDmg: true }, //
  { id: "Z", sName: "后坐", eName: "Weapon Recoil", name: "后坐力", prefix: "zeti", subfix: "mag", negative: true, noDmg: true } //
];

const meleeProperty: RivenProperty[] = [
  { id: "K", sName: "伤害", eName: "Melee Damage", name: "近战伤害", prefix: "visi", subfix: "ata" }, //
  { id: "T", sName: "范围", eName: "Range", name: "攻击范围", prefix: "locti", subfix: "tor", noDmg: true }, //
  { id: "J", sName: "攻速", eName: "Attack Speed", name: "攻击速度", prefix: "croni", subfix: "dra" }, //
  { id: "B", sName: "导引伤害", eName: "Channeling Damage", name: "导引伤害", prefix: "tori", subfix: "bo", noDmg: true, onlyPositive: true }, //
  { id: "U", sName: "导引效率", eName: "Channeling Efficiency", name: "导引效率", prefix: "uti", subfix: "tia", noDmg: true, onlyPositive: true }, //
  { id: "N", sName: "连击时间", eName: "Combo Duration", name: "连击持续时间", prefix: "tempi", subfix: "nem", nopercent: true, noDmg: true }, //
  {
    id: "E",
    sName: "滑行暴击",
    eName: "chance to be a Critical Hit.",
    eDisplayPre: "Slide Attack has",
    displayPre: "滑行攻击有",
    name: "的几率造成暴击",
    prefix: "pleci",
    subfix: "nent"
  }, //
  { id: "X", sName: "处决伤害", eName: "Finisher Damage", name: "处决伤害", prefix: "exi", subfix: "cta", noDmg: true } //
];

export interface RivenProperties {
  Rifle: RivenProperty[];
  Shotgun: RivenProperty[];
  Secondary: RivenProperty[];
  Kitgun: RivenProperty[];
  Melee: RivenProperty[];
  Zaw: RivenProperty[];
  "Arch-Gun": RivenProperty[];
  "Arch-Melee": RivenProperty[];
  Amp: RivenProperty[];
  all: RivenProperty[];
}

export type RivenTypes = keyof RivenProperties;

export const RivenPropertyDataBase: RivenProperties = {
  Rifle: baseProperty.concat(
    gunProperty.map(v =>
      v.id === "R" ? { id: "R", sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v
    )
  ),
  Shotgun: baseProperty.concat(
    gunProperty
      .filter(v => v.id != "H")
      .map(v =>
        v.id === "R" ? { id: "R", sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v
      )
  ),
  Secondary: baseProperty.concat(gunProperty),
  Kitgun: baseProperty.concat(gunProperty),
  "Arch-Gun": baseProperty.concat(
    gunProperty.map(v =>
      v.id === "R" ? { id: "R", sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v
    )
  ),
  "Arch-Melee": [],
  Amp: [],
  Melee: baseProperty.concat(meleeProperty),
  Zaw: baseProperty.concat(meleeProperty),
  all: baseProperty.concat(gunProperty, meleeProperty)
};

export const ExtraDmgSet = new Set(["4", "5", "6", "7", "8", "9", "A"]);

const RPVBRifle = {
  0: 15, // 暴击率
  1: 12, // 暴击伤害
  2: 9, // 触发几率
  3: 10, // 触发时间
  4: 9, // 火焰伤害
  5: 9, // 冰冻伤害
  6: 9, // 毒素伤害
  7: 9, // 电击伤害
  8: 12, // 冲击伤害
  9: 12, // 穿刺伤害
  A: 12, // 切割伤害
  G: 4.5, // 对Grineer伤害
  I: 4.5, // 对Infested伤害
  C: 4.5, // 对Corpus伤害
  D: 16.5, // 伤害
  S: 9, // 多重射击
  R: 6, // 射速（弓类武器效果加倍）
  L: 5, // 弹匣容量
  F: 5, // 装填速度
  M: 5, // 弹药最大值
  P: 27, // 穿透
  H: 6, // 变焦
  V: 9, // 弹道飞行速度
  Z: -9 // 后坐力
};
const RPVBShotgun = {
  0: 9, // 暴击率
  1: 9, // 暴击伤害
  2: 9, // 触发几率
  3: 10, // 触发时间
  4: 9, // 火焰伤害
  5: 9, // 冰冻伤害
  6: 9, // 毒素伤害
  7: 9, // 电击伤害
  8: 12, // 冲击伤害
  9: 12, // 穿刺伤害
  A: 12, // 切割伤害
  G: 4.5, // 对Grineer伤害
  I: 4.5, // 对Infested伤害
  C: 4.5, // 对Corpus伤害
  D: 16.5, // 伤害
  S: 12, // 多重射击
  R: 9, // 射速
  L: 5, // 弹匣容量
  F: 5, // 装填速度
  M: 9, // 弹药最大值
  P: 27, // 穿透
  H: 6, // 变焦
  V: 9, // 弹道飞行速度
  Z: -9 // 后坐力
};
const RPVBPistol = {
  0: 15, // 暴击率
  1: 9, // 暴击伤害
  2: 9, // 触发几率
  3: 10, // 触发时间
  4: 9, // 火焰伤害
  5: 9, // 冰冻伤害
  6: 9, // 毒素伤害
  7: 9, // 电击伤害
  8: 12, // 冲击伤害
  9: 12, // 穿刺伤害
  A: 12, // 切割伤害
  G: 4.5, // 对Grineer伤害
  I: 4.5, // 对Infested伤害
  C: 4.5, // 对Corpus伤害
  D: 22, // 伤害
  S: 12, // 多重射击
  R: 7.5, // 射速
  L: 5, // 弹匣容量
  F: 5, // 装填速度
  M: 9, // 弹药最大值
  P: 27, // 穿透
  H: 8, // 变焦
  V: 9, // 弹道飞行速度
  Z: -9 // 后坐力
};
const RPVBArchgun = {
  0: 10, // 暴击率
  1: 8, // 暴击伤害
  2: 6, // 触发几率
  3: 10, // 触发时间
  4: 12, // 火焰伤害
  5: 12, // 冰冻伤害
  6: 12, // 毒素伤害
  7: 12, // 电击伤害
  8: 9, // 冲击伤害
  9: 9, // 穿刺伤害
  A: 9, // 切割伤害
  G: 4.5, // 对Grineer伤害
  I: 4.5, // 对Infested伤害
  C: 4.5, // 对Corpus伤害
  D: 10, // 伤害
  S: 6, // 多重射击
  R: 6, // 射速
  L: 6, // 弹匣容量
  F: 10, // 装填速度
  M: 9, // 弹药最大值
  P: 27, // 穿透
  H: 6, // 变焦
  V: 9, // 弹道飞行速度
  Z: -9 // 后坐力
};
const RPVBMelee = {
  0: 9, // 暴击率
  1: 9, // 暴击伤害
  2: 9, // 触发几率
  3: 10, // 触发时间
  4: 9, // 火焰伤害
  5: 9, // 冰冻伤害
  6: 9, // 毒素伤害
  7: 9, // 电击伤害
  8: 12, // 冲击伤害
  9: 12, // 穿刺伤害
  A: 12, // 切割伤害
  G: 4.5, // 对Grineer伤害
  I: 4.5, // 对Infested伤害
  C: 4.5, // 对Corpus伤害
  K: 16.5, // 近战伤害
  T: 12, // 攻击范围
  J: 5.5, // 攻击速度
  B: 15, // 导引伤害
  U: 9, // 导引效率
  N: 81, // 连击持续时间
  E: 9, // 滑行攻击造成暴击几率
  X: 12 // 处决伤害
};
/**
 * 属性基础值
 */
export const RivenPropertyValueBaseDataBase = {
  Rifle: RPVBRifle,
  Shotgun: RPVBShotgun,
  Secondary: RPVBPistol,
  Kitgun: RPVBPistol,
  Melee: RPVBMelee,
  Zaw: RPVBMelee,
  "Arch-Gun": RPVBArchgun
};

export const ModTypeTable = {
  Rifle: { name: "rifle", include: [0 /* MainTag.Rifle */] },
  Shotgun: { name: "shotgun", include: [1 /* MainTag.Shotgun */] },
  Secondary: { name: "secondary", include: [2, 3 /* MainTag.Secondary, MainTag.Kitgun */] },
  Melee: { name: "melee", include: [4, 5 /* MainTag.Melee, MainTag.Zaw */] },
  Archwing: { name: "archwing", include: [6, 7 /* MainTag["Arch-Gun"], MainTag["Arch-Melee"] */] }
};

const propRegExpsFactory = (name: RivenTypes) =>
  new RegExp(
    `(?:(${RivenPropertyDataBase[name].map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase[name].map(v => v.prefix).join("|")})(${RivenPropertyDataBase[
      name
    ]
      .map(v => v.subfix)
      .join("|")})`,
    "i"
  );

/**
 * 主要工具类
 */
export class RivenDatabase {
  /** 属性名称 -> 属性 index */
  private propDict = new Map<string, number>();
  /** 武器名称 -> 倾向性 */
  private ratioDict = new Map<string, number>();

  private static instance = new RivenDatabase();

  static PropRegExps = {
    Rifle: propRegExpsFactory("Rifle"),
    Shotgun: propRegExpsFactory("Shotgun"),
    Secondary: propRegExpsFactory("Secondary"),
    Kitgun: propRegExpsFactory("Kitgun"),
    Melee: propRegExpsFactory("Melee"),
    Zaw: propRegExpsFactory("Zaw")
  };
  static PrefixAll = new RegExp(`(?:${RivenPropertyDataBase.all.map(v => v.prefix).join("|")})`, "i");

  constructor() {
    this.reload();
  }

  reload() {
    RivenPropertyDataBase.all.forEach((v, i) => {
      this.propDict.set(v.id, i);
      this.propDict.set(v.eName, i);
      this.propDict.set(v.name, i);
    });
    (i18n.locale === "zh-CY" ? _rivenDataBaseWeaponsCY : _rivenDataBaseWeapons).forEach(v => {
      this.ratioDict.set(v[0], v[2]);
    });
  }

  static reload() {
    this.instance.reload();
  }

  /**
   * 查询是否有这个属性
   * @param name 属性名称
   */
  static hasProp(name: string) {
    return this.instance.propDict.has(name);
  }
  /**
   * 模糊识别属性名称
   * @param prop 属性名称
   */
  static findMostSimProp(prop: string) {
    if (this.hasProp(name)) return RivenPropertyDataBase.all[this.instance.propDict.get(name)];
    let propFinded = _.maxBy(RivenPropertyDataBase.all, v => _.max([strSimilarity(prop, v.eName), strSimilarity(prop, v.name)]));
    return propFinded;
  }
  /**
   * 通过名称或id获取属性
   * @param nameOrId 属性名称|id
   */
  static getPropByName(nameOrId: string) {
    return RivenPropertyDataBase.all[this.instance.propDict.get(nameOrId)];
  }

  /**
   * 通过tag获取属性
   * @param tag tag
   * @param stype
   * @param isPrefix 是否是前缀
   */
  static getPropByTag(tag: string, stype: string, isPrefix: boolean) {
    return RivenPropertyDataBase[stype].find(v => v[isPrefix ? "prefix" : "subfix"] == tag);
  }

  /**
   * 获取属性基础值
   * @param weaponType 武器通用名称
   * @param prop
   * @return 返回基础值 如果为-1说明错误
   */
  static getPropBaseValue(ratio: number, weaponType: string, propName: string): number {
    let prop = this.getPropByName(propName);
    if (weaponType in RivenPropertyValueBaseDataBase && prop) return RivenPropertyValueBaseDataBase[weaponType][prop.id] * ratio * (prop.nopercent ? 0.1 : 10);
    else return -1;
  }

  /**
   * 获取武器倾向值
   *
   * @param {string} name
   */
  static getRatio(name: string) {
    return this.instance.ratioDict.get(name);
  }
}
