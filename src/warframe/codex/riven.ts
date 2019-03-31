import _ from "lodash";
import { GunWeaponDataBase, MeleeWeaponDataBase, Weapon } from ".";
import { strSimilarity } from "../util";
import { i18n } from "@/i18n";

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
  { id: "V", sName: "弹道", eName: "Projectile Flight Speed", name: "弹道飞行速度", prefix: "conci", subfix: "nak", noDmg: true }, //
  { id: "Z", sName: "后坐", eName: "Weapon Recoil", name: "后坐力", prefix: "zeti", subfix: "mag", negative: true, noDmg: true } //
];

const meleeProperty: RivenProperty[] = [
  { id: "K", sName: "伤害", eName: "Melee Damage", name: "近战伤害", prefix: "visi", subfix: "ata" }, //
  { id: "T", sName: "范围", eName: "Range", name: "攻击范围", prefix: "locti", subfix: "tor", noDmg: true }, //
  { id: "J", sName: "攻速", eName: "Attack Speed", name: "攻击速度", prefix: "croni", subfix: "dra" }, //
  { id: "B", sName: "导引伤害", eName: "Channeling Damage", name: "导引伤害", prefix: "tori", subfix: "bo", noDmg: true, onlyPositive: true }, //
  { id: "U", sName: "导引效率", eName: "Channeling Efficiency", name: "导引效率", prefix: "uti", subfix: "tia", noDmg: true, onlyPositive: true }, //
  { id: "N", sName: "连击时间", eName: "Combo Duration", name: "连击持续时间", prefix: "tempi", subfix: "nem", nopercent: true, noDmg: true }, //
  { id: "E", sName: "滑行暴击", eName: "chance to be a Critical Hit.", eDisplayPre: "Slide Attack has", displayPre: "滑行攻击有", name: "的几率造成暴击", prefix: "pleci", subfix: "nent" }, //
  { id: "X", sName: "处决伤害", eName: "Finisher Damage", name: "处决伤害", prefix: "exi", subfix: "cta", noDmg: true } //
];

export const RivenPropertyDataBase: { [key: string]: RivenProperty[] } = {
  Rifle: baseProperty.concat(
    gunProperty.map(v => (v.id === "R" ? { id: "R", sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v))
  ),
  Shotgun: baseProperty.concat(
    gunProperty
      .filter(v => v.id != "H")
      .map(v => (v.id === "R" ? { id: "R", sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v))
  ),
  Pistol: baseProperty.concat(gunProperty),
  Kitgun: baseProperty.concat(gunProperty),
  Archgun: baseProperty.concat(gunProperty),
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
  O: 4.5, // 对堕落者伤害
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
  O: 4.5, // 对堕落者伤害
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
  O: 4.5, // 对堕落者伤害
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
  O: 4.5, // 对堕落者伤害
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
  Pistol: RPVBPistol,
  Kitgun: RPVBPistol,
  Melee: RPVBMelee,
  Zaw: RPVBMelee
};

/**
 * 武器名称及裂罅倾向
 */
export class RivenWeapon {
  /** 武器英文名 */
  id: string;
  /** 武器本地化名称 */
  get name() {
    const ikey = `messages.${_.camelCase(this.id)}`;
    const name = i18n.te(ikey) ? i18n.t(ikey) : this.id;
    return name || "";
  }
  /** 武器MOD类型 */
  mod: string;
  /** 武器裂罅倾向 */
  ratio: number;
  /** 武器MOD类型 */
  price: number;
  /** 武器MOD类型中文 */
  get modcn() {
    return ModTypeTable[this.mod];
  }
  get weapons() {
    if (this.mod === "Melee" || this.mod === "Zaw") return MeleeWeaponDataBase.filter(v => this.id === (v.rivenName || v.id));
    else return GunWeaponDataBase.filter(v => this.id === (v.rivenName || v.id));
  }
  /** 武器倾向星数 */
  get star() {
    return [0.1, 0.7, 0.875, 1.125, 1.305, Infinity].findIndex(v => this.ratio < v);
  }
  get starText() {
    return _.repeat("●", this.star) + _.repeat("○", 5 - this.star);
  }
  /** 是否是Gun */
  get isGun() {
    return this.mod !== "Melee" && this.mod !== "Zaw";
  }
  /** 是否是Melee */
  get isMelee() {
    return this.mod === "Melee" || this.mod === "Zaw";
  }
  /** 是否是Pistol */
  get isPistol() {
    return this.mod === "Pistol" || this.mod === "Kitgun";
  }
  /** 是否是Rifle */
  get isRifle() {
    return this.mod === "Rifle";
  }
  /** 是否是Sniper */
  get isSniper() {
    return this.mod === "Rifle" && this.weapons[0].tags.includes("Sniper");
  }
  /** 是否是Zaw */
  get isZaw() {
    return this.mod === "Zaw";
  }
  /** 是否是Kitgun */
  get isKitgun() {
    return this.mod === "Kitgun";
  }
  constructor(id: string, mod: string, ratio: number, price: number = 0) {
    this.id = id;
    this.mod = mod;
    this.ratio = ratio;
    this.price = price;
  }
}

const _rivenWeaponDataBase = [
  // 步枪 Rifle
  ["Miter", "Rifle", 1.55],
  ["Panthera", "Rifle", 1.5],
  ["Flux Rifle", "Rifle", 1.55],
  ["Harpak", "Rifle", 1.55],
  ["Mutalist Quanta", "Rifle", 1.55],
  ["Tetra", "Rifle", 1.5],
  ["Buzlok", "Rifle", 1.45],
  ["Phage", "Shotgun", 1.46],
  ["Deth Machine Rifle", "Rifle", 1.46],
  ["Vulkar", "Rifle", 1.45],
  ["Hind", "Rifle", 1.42],
  ["Attica", "Rifle", 1.42],
  ["Glaxion", "Rifle", 1.35],
  ["Stinger", "Rifle", 1.31],
  ["Synapse", "Rifle", 1.31],
  ["Paracyst", "Rifle", 1.31],
  ["Tiberon", "Rifle", 1.3],
  ["Karak", "Rifle", 1.28],
  ["Mutalist Cernos", "Rifle", 1.26],
  ["Grinlok", "Rifle", 1.25],
  ["Dera", "Rifle", 1.25],
  ["Ogris", "Rifle", 1.25],
  ["Stradavar", "Rifle", 1.25],
  ["Vulklok", "Rifle", 1.25],
  ["Quartakk", "Rifle", 1.25],
  ["Burston", "Rifle", 1.25],
  ["Penta", "Rifle", 1.25],
  ["Laser Rifle", "Rifle", 1.21],
  ["Daikyu", "Rifle", 1.21],
  ["Torid", "Rifle", 1.2],
  ["Gorgon", "Rifle", 1.18],
  ["Zhuge", "Rifle", 1.18],
  ["Snipetron", "Rifle", 1.165],
  ["Opticor", "Rifle", 1.15],
  ["Grakata", "Rifle", 1.15],
  ["Latron", "Rifle", 1.15],
  ["Supra", "Rifle", 1.1],
  ["Baza", "Rifle", 1.1],
  ["Javlok", "Rifle", 1.1],
  ["Zenith", "Rifle", 1.1],
  ["Ferrox", "Rifle", 1.1],
  ["Veldt", "Rifle", 1.1],
  ["Scourge", "Rifle", 1.1],
  ["Hema", "Rifle", 1.1],
  ["Argonak", "Rifle", 1.1],
  ["Quanta", "Rifle", 1],
  ["Nagantaka", "Rifle", 1],
  ["Battacor", "Rifle", 1],
  ["Vulcax", "Rifle", 1],
  ["Multron", "Rifle", 1],
  ["Cryotra", "Rifle", 1],
  ["Tazicor", "Rifle", 1],
  ["Zarr", "Rifle", 1.08],
  ["Tenora", "Rifle", 1.05],
  ["Paris", "Rifle", 1.05],
  ["Braton", "Rifle", 1.01],
  ["Artax", "Rifle", 1],
  ["Rubico", "Rifle", 0.95],
  ["Lanka", "Rifle", 0.95],
  ["Vectis", "Rifle", 0.92],
  ["Cernos", "Rifle", 0.92],
  ["Lenz", "Rifle", 0.9],
  ["Sybaris", "Rifle", 0.9],
  ["Dread", "Rifle", 0.9],
  ["Amprex", "Rifle", 0.85],
  ["Boltor", "Rifle", 0.79],
  ["Tonkor", "Rifle", 0.75],
  ["Ignis", "Rifle", 0.7],
  ["Simulor", "Rifle", 0.7],
  ["Soma", "Rifle", 0.55],
  // 霰弹枪 Shotgun
  ["Drakgoon", "Shotgun", 1.48],
  ["Convectrix", "Shotgun", 1.46],
  ["Kohm", "Shotgun", 1.4],
  ["Strun", "Shotgun", 1.35],
  ["Boar", "Shotgun", 1.34],
  ["Sobek", "Shotgun", 1.33],
  ["Astilla", "Shotgun", 1.1],
  ["Sweeper", "Shotgun", 1],
  ["Corinth", "Shotgun", 1.05],
  ["Phantasma", "Shotgun", 1],
  ["Exergis", "Shotgun", 1],
  ["Arca Plasmor", "Shotgun", 0.7],
  ["Hek", "Shotgun", 0.7],
  ["Tigris", "Shotgun", 0.5],
  // 手枪 Pistol
  ["Kraken", "Pistol", 1.53],
  ["Magnus", "Pistol", 1.53],
  ["Aklato", "Pistol", 1.52],
  ["Akzani", "Pistol", 1.52],
  ["Cestra", "Pistol", 1.52],
  ["Bolto", "Pistol", 1.51],
  ["Tysis", "Pistol", 1.51],
  ["Kunai", "Pistol", 1.51],
  ["Seer", "Pistol", 1.5],
  ["Spectra", "Pistol", 1.49],
  ["Stug", "Pistol", 1.48],
  ["Nukor", "Pistol", 1.45],
  ["Embolist", "Pistol", 1.45],
  ["Burst Laser", "Pistol", 1.45],
  ["Viper", "Pistol", 1.45],
  ["Talons", "Pistol", 1.44],
  ["Akjagara", "Pistol", 1.43],
  ["Twin Vipers", "Pistol", 1.41],
  ["Angstrum", "Pistol", 1.4],
  ["Vasto", "Pistol", 1.4],
  ["Lato", "Pistol", 1.4],
  ["Twin Gremlins", "Pistol", 1.4],
  ["Afuris", "Pistol", 1.39],
  ["Castanas", "Pistol", 1.35],
  ["Furis", "Pistol", 1.35],
  ["Acrid", "Pistol", 1.33],
  ["Akvasto", "Pistol", 1.3],
  ["Bronco", "Pistol", 1.3],
  ["Dual Cestra", "Pistol", 1.3],
  ["Despair", "Pistol", 1.3],
  ["Fusilai", "Pistol", 1.3],
  ["Kohmak", "Pistol", 1.3],
  ["Sicarus", "Pistol", 1.3],
  ["Akmagnus", "Pistol", 1.28],
  ["Azima", "Pistol", 1.25],
  ["Stubba", "Pistol", 1.25],
  ["Dual Toxocyst", "Pistol", 1.25],
  ["Aksomati", "Pistol", 1.2],
  ["Akbronco", "Pistol", 1.2],
  ["Kulstar", "Pistol", 1.2],
  ["Twin Kohmak", "Pistol", 1.2],
  ["Twin Rogga", "Pistol", 1.15],
  ["Knell", "Pistol", 1.15],
  ["Cycron", "Pistol", 1.1],
  ["Zakti", "Pistol", 1.1],
  ["Hystrix", "Pistol", 1.05],
  ["Arca Scisco", "Pistol", 1],
  ["Pyrana", "Pistol", 1],
  ["Detron", "Pistol", 1],
  ["Zylok", "Pistol", 1],
  ["Ocucor", "Pistol", 1],
  ["Plinx", "Pistol", 1],

  ["Catchmoon", "Kitgun", 1],
  ["Gaze", "Kitgun", 1],
  ["Rattleguts", "Kitgun", 1],
  ["Tombfinger", "Kitgun", 1],

  ["Brakk", "Pistol", 0.95],
  ["Ballistica", "Pistol", 0.95],
  ["Pandero", "Pistol", 0.95],
  ["Pox", "Pistol", 0.95],
  ["Aklex", "Pistol", 0.92],
  ["Spira", "Pistol", 0.85],
  ["Twin Grakatas", "Pistol", 0.85],
  ["Atomos", "Pistol", 0.8],
  ["Akbolto", "Pistol", 0.8],
  ["Hikou", "Pistol", 0.75],
  ["Euphona Prime", "Pistol", 0.7],
  ["Gammacor", "Pistol", 0.65],
  ["Marelok", "Pistol", 0.65],
  ["Sonicor", "Pistol", 0.65],
  ["Staticor", "Pistol", 0.53],
  ["Akstiletto", "Pistol", 0.5],
  ["Lex", "Pistol", 0.5],
  // 近战 Melee
  ["Amphis", "Melee", 1.5],
  ["Ether Daggers", "Melee", 1.49],
  ["Dark Sword", "Melee", 1.48],
  ["Cronus", "Melee", 1.48],
  ["Plasma Sword", "Melee", 1.48],
  ["Heat Sword", "Melee", 1.48],
  ["Twin Krohkur", "Melee", 1.48],
  ["Dual Keres", "Melee", 1.48],
  ["Dual Skana", "Melee", 1.48],
  ["Jaw Sword", "Melee", 1.47],
  ["Pangolin Sword", "Melee", 1.47],
  ["Kama", "Melee", 1.47],
  ["Anku", "Melee", 1.46],
  ["Kogake", "Melee", 1.46],
  ["Dual Ether", "Melee", 1.45],
  ["Machete", "Melee", 1.45],
  ["Ankyros", "Melee", 1.45],
  ["Ether Reaper", "Melee", 1.45],
  ["Kestrel", "Melee", 1.45],
  ["Halikar", "Melee", 1.44],
  ["Dual Zoren", "Melee", 1.44],
  ["Ether Sword", "Melee", 1.44],
  ["Heat Dagger", "Melee", 1.44],
  ["Dual Heat Swords", "Melee", 1.44],
  ["Gram", "Melee", 1.44],
  ["Ceramic Dagger", "Melee", 1.43],
  ["Kronen", "Melee", 1.43],
  ["Mire", "Melee", 1.43],
  ["Nami Solo", "Melee", 1.43],
  ["Ninkondi", "Melee", 1.41],
  ["Tekko", "Melee", 1.4],
  ["Dual Raza", "Melee", 1.4],
  ["Tonbo", "Melee", 1.38],
  ["Serro", "Melee", 1.38],
  ["Ripkas", "Melee", 1.38],
  ["Furax", "Melee", 1.38],
  ["Fang", "Melee", 1.36],
  ["Cerata", "Melee", 1.36],
  ["Hate", "Melee", 1.36],
  ["Dragon Nikana", "Melee", 1.35],
  ["Shaku", "Melee", 1.35],
  ["Sibear", "Melee", 1.35],
  ["Gazal Machete", "Melee", 1.35],
  ["Scoliac", "Melee", 1.32],
  ["Okina", "Melee", 1.31],
  ["Tipedo", "Melee", 1.31],
  ["Lacera", "Melee", 1.31],
  ["Caustacyst", "Melee", 1.3],
  ["Prova", "Melee", 1.29],
  ["Bo", "Melee", 1.29],
  ["Karyst", "Melee", 1.29],
  ["Reaper Prime", "Melee", 1.29],
  ["Deconstructor", "Melee", 1.25],
  ["Sheev", "Melee", 1.25],
  ["Kesheg", "Melee", 1.24],
  ["Sarpa", "Melee", 1.24],
  ["Skana", "Melee", 1.22],
  ["Krohkur", "Melee", 1.22],
  ["Glaive", "Melee", 1.22],
  ["Dark Split-Sword", "Melee", 1.21],
  ["Volnus", "Melee", 1.2],
  ["Broken Scepter", "Melee", 1.19],
  ["Twin Basolk", "Melee", 1.18],
  ["Nami Skyla", "Melee", 1.175],
  ["Redeemer", "Melee", 1.17],
  ["Dual Ichor", "Melee", 1.16],
  ["Orvius", "Melee", 1.15],
  ["Dakra Prime", "Melee", 1.15],
  ["Dex Dakra", "Melee", 1.15],
  ["Destreza", "Melee", 1.14],
  ["Obex", "Melee", 1.1],
  ["Magistar", "Melee", 1.09],

  ["Balla", "Zaw", 1],
  ["Cyath", "Zaw", 1],
  ["Dehtat", "Zaw", 1],
  ["Dokrahm", "Zaw", 1],
  ["Rabvee", "Zaw", 1],
  ["Mewan", "Zaw", 1],
  ["Kronsh", "Zaw", 1],
  ["Ooltha", "Zaw", 1],
  ["Plague Keewar", "Zaw", 1],
  ["Plague Kripath", "Zaw", 1],

  ["Tatsu", "Melee", 1],
  ["Wolf Sledge", "Melee", 1],
  ["Galvacord", "Melee", 1],
  ["Cadus", "Melee", 1],
  ["Kreska", "Melee", 1],
  ["Paracesis", "Melee", 1],
  ["Pupacyst", "Melee", 1],
  ["Falcor", "Melee", 1],
  ["Gunsen", "Melee", 1],
  ["Cobra & Crane", "Melee", 1],
  ["Silva & Aegis", "Melee", 1],
  ["Sigma & Octantis", "Melee", 1],
  ["Dual Cleavers", "Melee", 1],
  ["Arca Titron", "Melee", 1],
  ["Endura", "Melee", 1],
  ["Scindo", "Melee", 1],
  ["Sepfahn", "Melee", 1],
  ["Cassowar", "Melee", 1],
  ["Boltace", "Melee", 1],
  ["Skiajati", "Melee", 1],
  ["Ohma", "Melee", 0.97],
  ["Fragor", "Melee", 0.96],
  ["Mios", "Melee", 0.95],
  ["Heliocor", "Melee", 0.94],
  ["Guandao", "Melee", 0.9],
  ["Ack & Brunt", "Melee", 0.9],
  ["Sydon", "Melee", 0.84],
  ["Jat Kusar", "Melee", 0.81],
  ["Dual Kamas", "Melee", 0.81],
  ["Broken War", "Melee", 0.79],
  ["Jat Kittag", "Melee", 0.75],
  ["War", "Melee", 0.5],
  ["Atterax", "Melee", 0.5],
  ["Dark Dagger", "Melee", 0.5],
  ["Galatine", "Melee", 0.5],
  ["Lesion", "Melee", 0.5],
  ["Hirudo", "Melee", 0.5],
  ["Zenistar", "Melee", 0.5],
  ["Lecta", "Melee", 0.5],
  ["Venka", "Melee", 0.5],
  ["Nikana", "Melee", 0.5],
  ["Orthos", "Melee", 0.5],

  // 技能武器 Exalted Weapon
  ["Regulators", "Pistol", 0],
  ["Iron Staff", "Melee", 0],
  ["Valkyr Talons", "Melee", 0],
  ["Exalted Blade", "Melee", 0],
  ["Diwata", "Melee", 0],
  ["Artemis Bow", "Rifle", 0],
  ["Dex Pixia", "Pistol", 0],
  ["Whipclaw", "Melee", 0],
  ["Shattered Lash", "Melee", 0],
  ["Desert Wind", "Melee", 0],
  ["Landslide", "Melee", 0],
  ["Balefire", "Pistol", 0],

  // Archgun
  ["Larkspur", "Archgun", 1],
  ["Phaedra", "Archgun", 1],
  ["Velocitus", "Archgun", 1],
  ["Imperator", "Archgun", 1],
  ["Dual Decurion", "Archgun", 1],
  ["Fluctus", "Archgun", 1],
  ["Grattler", "Archgun", 1],
  ["Cyngas", "Archgun", 1],
  ["Corvas", "Archgun", 1],

  // Archmelee
  ["Agkuza", "Archmelee", 0],
  ["Centaur", "Archmelee", 0],
  ["Kaszas", "Archmelee", 0],
  ["Knux", "Archmelee", 0],
  ["Onorix", "Archmelee", 0],
  ["Rathbone", "Archmelee", 0],
  ["Veritux", "Archmelee", 0],

  // Amp
  ["Amp", "Amp", 0]
] as [string, string, number][];

export const ModTypeTable = {
  Rifle: { name: "rifle", include: ["Rifle"] },
  Shotgun: { name: "shotgun", include: ["Shotgun"] },
  Pistol: { name: "pistol", include: ["Pistol", "Kitgun"] },
  Melee: { name: "melee", include: ["Melee", "Zaw"] },
  Archwing: { name: "archwing", include: ["Archgun", "Archmelee"] }
};

export const RivenWeaponDataBase = _rivenWeaponDataBase.map(v => new RivenWeapon(v[0], v[1], v[2]));

const propRegExpsFactory = (name: string) =>
  new RegExp(
    `(?:(${RivenPropertyDataBase[name].map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase[name].map(v => v.prefix).join("|")})(${RivenPropertyDataBase[name].map(v => v.subfix).join("|")})`,
    "i"
  );

/**
 * 主要工具类
 */
export class RivenDataBase {
  /** 通用名称 -> index */
  private rWeaponDict = new Map<string, number>();
  /** 武器名称 -> index */
  private nWeaponDict = new Map<string, number>();
  /** 通用名称 -> 武器名称 index list */
  private ccWeaponDict = new Map<string, number[]>();
  /** 属性名称 -> 属性 index */
  private propDict = new Map<string, number>();

  private static instance = new RivenDataBase();

  static PropRegExps = {
    Rifle: propRegExpsFactory("Rifle"),
    Shotgun: propRegExpsFactory("Shotgun"),
    Pistol: propRegExpsFactory("Pistol"),
    Kitgun: propRegExpsFactory("Kitgun"),
    Melee: propRegExpsFactory("Melee"),
    Zaw: propRegExpsFactory("Zaw")
  };
  static PrefixAll = new RegExp(`(?:${RivenPropertyDataBase.all.map(v => v.prefix).join("|")})`, "i");

  constructor() {
    this.reload();
  }

  reload() {
    // 同时添加中英文名称
    RivenWeaponDataBase.forEach((v, i) => {
      this.rWeaponDict.set(v.id, i);
      this.rWeaponDict.set(v.name, i);
    });
    RivenPropertyDataBase.all.forEach((v, i) => {
      this.propDict.set(v.id, i);
      this.propDict.set(v.eName, i);
      this.propDict.set(v.name, i);
    });
    (GunWeaponDataBase as Weapon[]).concat(MeleeWeaponDataBase).forEach((v, i) => this.addWeapon(v, i));
  }

  static reload() {
    this.instance.reload();
  }

  addWeapon(weapon: Weapon, index: number) {
    this.nWeaponDict.set(weapon.id, index);
    this.nWeaponDict.set(i18n.t(`messages.${weapon.name}`), index);
    let riven = RivenWeaponDataBase[this.rWeaponDict.get(weapon.rivenName || weapon.id)];
    if (!riven) {
      // 部分技能武器
      return;
    }
    if (this.ccWeaponDict.has(riven.name)) {
      if (riven.id !== riven.name) this.ccWeaponDict.get(riven.id).push(index);
      this.ccWeaponDict.get(riven.name).push(index);
    } else {
      if (riven.id !== riven.name) this.ccWeaponDict.set(riven.id, [index]);
      this.ccWeaponDict.set(riven.name, [index]);
    }
  }

  /**
   * 通过武器具体名称获取武器实例
   * @param name 武器具体名称
   */
  static getNormalWeaponsByName(name: string) {
    let rst = this.instance.nWeaponDict.get(name),
      gunCount = GunWeaponDataBase.length;
    if (rst < 0) return null;
    if (rst < gunCount) return GunWeaponDataBase[rst];
    else return MeleeWeaponDataBase[rst - gunCount];
  }

  /**
   * 通过武器通用名称获取武器实例
   * @param name 武器通用名称
   */
  static getNormalWeaponsByRivenName(name: string) {
    let rst = this.instance.ccWeaponDict.get(name),
      gunCount = GunWeaponDataBase.length;
    if (rst) {
      if (rst[0] < gunCount) return rst.map(v => GunWeaponDataBase[v]);
      else return rst.map(v => MeleeWeaponDataBase[v - gunCount]);
    } else {
      return [];
    }
  }
  /**
   * 查询是否有这个武器
   * @param name 武器通用名称
   */
  static hasWeapon(name: string) {
    return this.instance.rWeaponDict.has(name);
  }

  /**
   * 获取武器
   * @param name 武器通用名称
   */
  static getRivenWeaponByName(name: string) {
    return RivenWeaponDataBase[this.instance.rWeaponDict.get(name)];
  }
  /**
   * 模糊识别武器名称
   * @param name 模糊匹配的名称
   */
  static findMostSimRivenWeapon(name: string) {
    name = name.trim();
    if (this.hasWeapon(name)) return this.getRivenWeaponByName(name);
    let weaponFinded = _.maxBy(RivenWeaponDataBase, v => _.max([strSimilarity(name, v.id), strSimilarity(name, v.name)]));
    return weaponFinded;
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
   * @param weaponName 武器通用名称
   * @param prop
   * @return 返回基础值 如果为-1说明错误
   */
  static getPropBaseValue(weaponName: string, propName: string): number {
    let weapon = this.getRivenWeaponByName(weaponName);
    let prop = this.getPropByName(propName);
    if (weapon && prop) return RivenPropertyValueBaseDataBase[weapon.mod][prop.id] * weapon.ratio * (prop.nopercent ? 0.1 : 10);
    else return -1;
  }
}
