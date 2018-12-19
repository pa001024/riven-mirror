import { GunWeaponDataBase, MeleeWeaponDataBase, Weapon } from ".";
import { strSimilarity } from "../util";
import _ from "lodash";
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
  { id: '0', sName: "暴击率", eName: "Critical Chance", name: "暴击率", prefix: "crita", subfix: "cron" },
  { id: '1', sName: "暴击伤害", eName: "Critical Damage", name: "暴击伤害", prefix: "acri", subfix: "tis" },
  { id: '2', sName: "触发率", eName: "Status Chance", name: "触发几率", prefix: "hexa", subfix: "dex", noDmg: true },
  { id: '3', sName: "触发时间", eName: "Status Duration", name: "触发时间", prefix: "deci", subfix: "des", noDmg: true },
  { id: '4', sName: "火伤", eName: "Heat", name: "火焰伤害", prefix: "igni", subfix: "pha", onlyPositive: true },
  { id: '5', sName: "冰伤", eName: "Cold", name: "冰冻伤害", prefix: "geli", subfix: "do", onlyPositive: true },
  { id: '6', sName: "毒伤", eName: "Toxin", name: "毒素伤害", prefix: "toxi", subfix: "tox", onlyPositive: true },
  { id: '7', sName: "电伤", eName: "Electricity", name: "电击伤害", prefix: "vexi", subfix: "tio", onlyPositive: true },
  { id: '8', sName: "冲击", eName: "Impact", name: "冲击伤害", prefix: "magna", subfix: "ton" },
  { id: '9', sName: "穿刺", eName: "Puncture", name: "穿刺伤害", prefix: "insi", subfix: "cak" },
  { id: 'A', sName: "切割", eName: "Slash", name: "切割伤害", prefix: "sci", subfix: "sus" },
  { id: 'G', sName: "Grineer伤害", eName: "Damage to Grineer", name: "对Grineer伤害", prefix: "argi", subfix: "con" },
  { id: 'I', sName: "Infested伤害", eName: "Damage to Infested", name: "对Infested伤害", prefix: "pura", subfix: "ada" },
  { id: 'C', sName: "Corpus伤害", eName: "Damage to Corpus", name: "对Corpus伤害", prefix: "manti", subfix: "tron" },
];

const gunProperty: RivenProperty[] = [
  { id: 'D', sName: "伤害", eName: "Damage", name: "伤害", prefix: "visi", subfix: "ata" },
  { id: 'S', sName: "多重", eName: "Multishot", name: "多重射击", prefix: "sati", subfix: "can" },
  { id: 'R', sName: "射速", eName: "Fire Rate", name: "射速", prefix: "croni", subfix: "dra" },
  { id: 'L', sName: "弹匣", eName: "Magazine Capacity", name: "弹匣容量", prefix: "arma", subfix: "tin" },
  { id: 'F', sName: "装填", eName: "Reload Speed", name: "装填速度", prefix: "feva", subfix: "tak" },
  { id: 'M', sName: "弹药", eName: "Ammo Maximum", name: "弹药最大值", prefix: "ampi", subfix: "bin", noDmg: true },
  { id: 'P', sName: "穿透", eName: "Punch Through", name: "穿透", prefix: "lexi", subfix: "nok", onlyPositive: true, nopercent: true, noDmg: true },
  { id: 'H', sName: "变焦", eName: "Zoom", name: "变焦", prefix: "hera", subfix: "lis", noDmg: true },
  { id: 'V', sName: "弹道", eName: "Projectile Flight Speed", name: "弹道飞行速度", prefix: "conci", subfix: "nak", noDmg: true },
  { id: 'Z', sName: "后坐", eName: "Weapon Recoil", name: "后坐力", prefix: "zeti", subfix: "mag", negative: true, noDmg: true },
];

const meleeProperty: RivenProperty[] = [
  { id: 'K', sName: "伤害", eName: "Melee Damage", name: "近战伤害", prefix: "visi", subfix: "ata" },
  { id: 'T', sName: "范围", eName: "Range", name: "攻击范围", prefix: "locti", subfix: "tor", noDmg: true },
  { id: 'J', sName: "攻速", eName: "Attack Speed", name: "攻击速度", prefix: "croni", subfix: "dra" },
  { id: 'B', sName: "导引伤害", eName: "Channeling Damage", name: "导引伤害", prefix: "tori", subfix: "bo", noDmg: true },
  { id: 'U', sName: "导引效率", eName: "Channeling Efficiency", name: "导引效率", prefix: "uti", subfix: "tia", noDmg: true },
  { id: 'N', sName: "连击时间", eName: "Combo Duration", name: "连击持续时间", prefix: "tempi", subfix: "nem", nopercent: true, noDmg: true },
  { id: 'E', sName: "滑行暴击", eName: "chance to be a Critical Hit.", eDisplayPre: "Slide Attack has", displayPre: "滑行攻击有", name: "的几率造成暴击", prefix: "pleci", subfix: "nent" },
  { id: 'X', sName: "处决伤害", eName: "Finisher Damage", name: "处决伤害", prefix: "exi", subfix: "cta", noDmg: true },
];

export const RivenPropertyDataBase: { [key: string]: RivenProperty[] } = {
  Rifle: baseProperty.concat(gunProperty.map(v => v.id === "R" ? { id: 'R', sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v)),
  Shotgun: baseProperty.concat(gunProperty.map(v => v.id === "R" ? { id: 'R', sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v)),
  Pistol: baseProperty.concat(gunProperty),
  Melee: baseProperty.concat(meleeProperty),
  all: baseProperty.concat(gunProperty, meleeProperty),
};

export const ExtraDmgSet = new Set(["4", "5", "6", "7", "8", "9", "A"]);

/**
 * 属性基础值
 */
export const RivenPropertyValueBaseDataBase = {
  "Rifle": {
    0: 15,  // 暴击率
    1: 12,  // 暴击伤害
    2: 9,   // 触发几率
    3: 10,  // 触发时间
    4: 9,   // 火焰伤害
    5: 9,   // 冰冻伤害
    6: 9,   // 毒素伤害
    7: 9,   // 电击伤害
    8: 12,  // 冲击伤害
    9: 12,  // 穿刺伤害
    A: 12,  // 切割伤害
    G: 4.5, // 对Grineer伤害
    I: 4.5, // 对Infested伤害
    C: 4.5, // 对Corpus伤害
    O: 4.5, // 对堕落者伤害
    D: 16.5,// 伤害
    S: 9,   // 多重射击
    R: 6,   // 射速（弓类武器效果加倍）
    L: 5,   // 弹匣容量
    F: 5,   // 装填速度
    M: 5,   // 弹药最大值
    P: 27,  // 穿透
    H: 6,   // 变焦
    V: 9,   // 弹道飞行速度
    Z: -9,  // 后坐力
  },
  "Shotgun": {
    0: 9,   // 暴击率
    1: 9,   // 暴击伤害
    2: 9,   // 触发几率
    3: 10,  // 触发时间
    4: 9,   // 火焰伤害
    5: 9,   // 冰冻伤害
    6: 9,   // 毒素伤害
    7: 9,   // 电击伤害
    8: 12,  // 冲击伤害
    9: 12,  // 穿刺伤害
    A: 12,  // 切割伤害
    G: 4.5, // 对Grineer伤害
    I: 4.5, // 对Infested伤害
    C: 4.5, // 对Corpus伤害
    O: 4.5, // 对堕落者伤害
    D: 16.5,// 伤害
    S: 12,  // 多重射击
    R: 9,   // 射速
    L: 5,   // 弹匣容量
    F: 5,   // 装填速度
    M: 9,   // 弹药最大值
    P: 27,  // 穿透
    H: 6,   // 变焦
    V: 9,   // 弹道飞行速度
    Z: -9,  // 后坐力
  },
  "Pistol": {
    0: 15,  // 暴击率
    1: 9,   // 暴击伤害
    2: 9,   // 触发几率
    3: 10,  // 触发时间
    4: 9,   // 火焰伤害
    5: 9,   // 冰冻伤害
    6: 9,   // 毒素伤害
    7: 9,   // 电击伤害
    8: 12,  // 冲击伤害
    9: 12,  // 穿刺伤害
    A: 12,  // 切割伤害
    G: 4.5, // 对Grineer伤害
    I: 4.5, // 对Infested伤害
    C: 4.5, // 对Corpus伤害
    O: 4.5, // 对堕落者伤害
    D: 22,  // 伤害
    S: 12,  // 多重射击
    R: 7.5, // 射速
    L: 5,   // 弹匣容量
    F: 5,   // 装填速度
    M: 9,   // 弹药最大值
    P: 27,  // 穿透
    H: 8,   // 变焦
    V: 9,   // 弹道飞行速度
    Z: -9,  // 后坐力
  },
  "Melee": {
    0: 9,   // 暴击率
    1: 9,   // 暴击伤害
    2: 9,   // 触发几率
    3: 10,  // 触发时间
    4: 9,   // 火焰伤害
    5: 9,   // 冰冻伤害
    6: 9,   // 毒素伤害
    7: 9,   // 电击伤害
    8: 12,  // 冲击伤害
    9: 12,  // 穿刺伤害
    A: 12,  // 切割伤害
    G: 4.5, // 对Grineer伤害
    I: 4.5, // 对Infested伤害
    C: 4.5, // 对Corpus伤害
    O: 4.5, // 对堕落者伤害
    K: 16.5,// 近战伤害
    T: 12,  // 攻击范围
    J: 5.5, // 攻击速度
    B: 15,  // 导引伤害
    U: 9,   // 导引效率
    N: 80,  // 连击持续时间
    E: 9,   // 滑行攻击造成暴击几率
    X: 12,  // 处决伤害
  }
}

/**
 * 武器名称及裂罅倾向
 * Data from https://wfaw.richasy.cn/
 */
export class RivenWeapon {
  /** 武器英文名 */
  id: string;
  /** 武器本地化名称 */
  name: string;
  /** 武器MOD类型 */
  mod: string;
  /** 武器裂罅倾向 */
  ratio: number;
  /** 武器MOD类型 */
  price: number;
  /** 武器MOD类型中文 */
  get modcn() { return ModTypeTable[this.mod]; }
  get weapons() {
    if (this.mod === "Melee")
      return MeleeWeaponDataBase.filter(v => this.id === (v.rivenName || v.id));
    else
      return GunWeaponDataBase.filter(v => this.id === (v.rivenName || v.id));
  }
  /** 武器倾向星数 */
  get star() { return [0.1, 0.7, 0.875, 1.125, 1.305, Infinity].findIndex(v => this.ratio < v); }
  get starText() { return _.repeat("●", this.star) + _.repeat("○", 5 - this.star); }
  calcPrice(x: number) {
    let normal = 800;
    if (x > 30) normal = +0.0000016468253968327832 * x * x * x * x * x * x - 0.0006184523809555002 * x * x * x * x * x + 0.0937003968259277 * x * x * x * x - 7.283630952427242 * x * x * x + 306.6134920656638 * x * x - 6605.452381004125 * x + 57700.00000048811;
    return ~~(normal * this.price / 1600);
  }
  constructor(id: string, name: string, mod: string, ratio: number, price: number = 0) {
    this.id = id;
    this.name = i18n.t(`messages.${name}`) as string;
    this.mod = mod;
    this.ratio = ratio;
    this.price = price;
  }
}

const _rivenWeaponDataBase = [
  // 步枪 Rifle
  ["Miter", "miter", "Rifle", 1.55],
  ["Panthera", "panthera", "Rifle", 1.5],
  ["Flux Rifle", "fluxRifle", "Rifle", 1.55],
  ["Harpak", "harpak", "Rifle", 1.55],
  ["Mutalist Quanta", "mutalistQuanta", "Rifle", 1.55],
  ["Tetra", "tetra", "Rifle", 1.5],
  ["Buzlok", "buzlok", "Rifle", 1.45],
  ["Phage", "phage", "Shotgun", 1.46],
  ["Deth Machine Rifle", "dethMachineRifle", "Rifle", 1.46],
  ["Vulkar", "vulkar", "Rifle", 1.45],
  ["Hind", "hind", "Rifle", 1.42],
  ["Attica", "attica", "Rifle", 1.42],
  ["Glaxion", "glaxion", "Rifle", 1.35],
  ["Stinger", "stinger", "Rifle", 1.31],
  ["Synapse", "synapse", "Rifle", 1.31],
  ["Paracyst", "paracyst", "Rifle", 1.31],
  ["Tiberon", "tiberon", "Rifle", 1.3],
  ["Karak", "karak", "Rifle", 1.28],
  ["Mutalist Cernos", "mutalistCernos", "Rifle", 1.26],
  ["Grinlok", "grinlok", "Rifle", 1.25],
  ["Dera", "dera", "Rifle", 1.25],
  ["Ogris", "ogris", "Rifle", 1.25],
  ["Stradavar", "stradavar", "Rifle", 1.25],
  ["Vulklok", "vulklok", "Rifle", 1.25],
  ["Quartakk", "quartakk", "Rifle", 1.25],
  ["Burston", "burston", "Rifle", 1.25],
  ["Penta", "penta", "Rifle", 1.25],
  ["Laser Rifle", "laserRifle", "Rifle", 1.21],
  ["Daikyu", "daikyu", "Rifle", 1.21],
  ["Torid", "torid", "Rifle", 1.2],
  ["Gorgon", "gorgon", "Rifle", 1.18],
  ["Zhuge", "zhuge", "Rifle", 1.18],
  ["Snipetron", "snipetron", "Rifle", 1.165],
  ["Opticor", "opticor", "Rifle", 1.15],
  ["Grakata", "grakata", "Rifle", 1.15],
  ["Latron", "latron", "Rifle", 1.15],
  ["Supra", "supra", "Rifle", 1.1],
  ["Baza", "baza", "Rifle", 1.1],
  ["Javlok", "javlok", "Rifle", 1.1],
  ["Zenith", "zenith", "Rifle", 1.1],
  ["Ferrox", "ferrox", "Rifle", 1.1],
  ["Veldt", "veldt", "Rifle", 1.1],
  ["Scourge", "scourge", "Rifle", 1.1],
  ["Hema", "hema", "Rifle", 1.1],
  ["Argonak", "argonak", "Rifle", 1.1],
  ["Quanta", "quanta", "Rifle", 1],
  ["Nagantaka", "nagantaka", "Rifle", 1],
  ["Battacor", "battacor", "Rifle", 1],
  ["Zarr", "zarr", "Rifle", 1.08],
  ["Tenora", "tenora", "Rifle", 1.05],
  ["Paris", "paris", "Rifle", 1.05],
  ["Braton", "braton", "Rifle", 1.01],
  ["Artax", "artax", "Rifle", 1],
  ["Rubico", "rubico", "Rifle", 0.95],
  ["Lanka", "lanka", "Rifle", 0.95],
  ["Vectis", "vectis", "Rifle", 0.92],
  ["Cernos", "cernos", "Rifle", 0.92],
  ["Lenz", "lenz", "Rifle", 0.9],
  ["Sybaris", "sybaris", "Rifle", 0.9],
  ["Dread", "dread", "Rifle", 0.9],
  ["Amprex", "amprex", "Rifle", 0.85],
  ["Boltor", "boltor", "Rifle", 0.79],
  ["Tonkor", "tonkor", "Rifle", 0.75],
  ["Ignis", "ignis", "Rifle", 0.7],
  ["Simulor", "simulor", "Rifle", 0.7],
  ["Soma", "soma", "Rifle", 0.55],
  // 霰弹枪 Shotgun
  ["Drakgoon", "drakgoon", "Shotgun", 1.48],
  ["Convectrix", "convectrix", "Shotgun", 1.46],
  ["Kohm", "kohm", "Shotgun", 1.4],
  ["Strun", "strun", "Shotgun", 1.35],
  ["Boar", "boar", "Shotgun", 1.34],
  ["Sobek", "sobek", "Shotgun", 1.33],
  ["Astilla", "astilla", "Shotgun", 1.1],
  ["Sweeper", "sweeper", "Shotgun", 1],
  ["Corinth", "corinth", "Shotgun", 1.05],
  ["Phantasma", "phantasma", "Shotgun", 1],
  ["Arca Plasmor", "arcaPlasmor", "Shotgun", 0.7],
  ["Hek", "hek", "Shotgun", 0.7],
  ["Tigris", "tigris", "Shotgun", 0.5],
  // 手枪 Pistol
  ["Kraken", "kraken", "Pistol", 1.53],
  ["Magnus", "magnus", "Pistol", 1.53],
  ["Aklato", "aklato", "Pistol", 1.52],
  ["Akzani", "akzani", "Pistol", 1.52],
  ["Cestra", "cestra", "Pistol", 1.52],
  ["Bolto", "bolto", "Pistol", 1.51],
  ["Tysis", "tysis", "Pistol", 1.51],
  ["Kunai", "kunai", "Pistol", 1.51],
  ["Seer", "seer", "Pistol", 1.5],
  ["Spectra", "spectra", "Pistol", 1.49],
  ["Stug", "stug", "Pistol", 1.48],
  ["Nukor", "nukor", "Pistol", 1.45],
  ["Embolist", "embolist", "Pistol", 1.45],
  ["Burst Laser", "burstLaser", "Pistol", 1.45],
  ["Viper", "viper", "Pistol", 1.45],
  ["Talons", "talons", "Pistol", 1.44],
  ["Akjagara", "akjagara", "Pistol", 1.43],
  ["Twin Vipers", "twinVipers", "Pistol", 1.41],
  ["Angstrum", "angstrum", "Pistol", 1.4],
  ["Vasto", "vasto", "Pistol", 1.4],
  ["Lato", "lato", "Pistol", 1.4],
  ["Twin Gremlins", "twinGremlins", "Pistol", 1.4],
  ["Afuris", "afuris", "Pistol", 1.39],
  ["Castanas", "castanas", "Pistol", 1.35],
  ["Furis", "furis", "Pistol", 1.35],
  ["Acrid", "acrid", "Pistol", 1.33],
  ["Akvasto", "akvasto", "Pistol", 1.3],
  ["Bronco", "bronco", "Pistol", 1.3],
  ["Dual Cestra", "dualCestra", "Pistol", 1.3],
  ["Despair", "despair", "Pistol", 1.3],
  ["Fusilai", "fusilai", "Pistol", 1.3],
  ["Kohmak", "kohmak", "Pistol", 1.3],
  ["Sicarus", "sicarus", "Pistol", 1.3],
  ["Akmagnus", "akmagnus", "Pistol", 1.28],
  ["Azima", "azima", "Pistol", 1.25],
  ["Stubba", "stubba", "Pistol", 1.25],
  ["Dual Toxocyst", "dualToxocyst", "Pistol", 1.25],
  ["Aksomati", "aksomati", "Pistol", 1.2],
  ["Akbronco", "akbronco", "Pistol", 1.2],
  ["Kulstar", "kulstar", "Pistol", 1.2],
  ["Twin Kohmak", "twinKohmak", "Pistol", 1.2],
  ["Twin Rogga", "twinRogga", "Pistol", 1.15],
  ["Knell", "knell", "Pistol", 1.15],
  ["Cycron", "cycron", "Pistol", 1.1],
  ["Zakti", "zakti", "Pistol", 1.1],
  ["Hystrix", "hystrix", "Pistol", 1.05],
  ["Arca Scisco", "arcaScisco", "Pistol", 1],
  ["Pyrana", "pyrana", "Pistol", 1],
  ["Detron", "detron", "Pistol", 1],
  ["Zylok", "zylok", "Pistol", 1],
  ["Ocucor", "ocucor", "Pistol", 1],

  ["Catchmoon", "catchmoon", "Pistol", 1],
  ["Gaze", "gaze", "Pistol", 1],
  ["Rattleguts", "rattleguts", "Pistol", 1],
  ["Tombfinger", "tombfinger", "Pistol", 1],

  ["Brakk", "brakk", "Pistol", 0.95],
  ["Ballistica", "ballistica", "Pistol", 0.95],
  ["Pandero", "pandero", "Pistol", 0.95],
  ["Pox", "pox", "Pistol", 0.95],
  ["Aklex", "aklex", "Pistol", 0.92],
  ["Spira", "spira", "Pistol", 0.85],
  ["Twin Grakatas", "twinGrakatas", "Pistol", 0.85],
  ["Atomos", "atomos", "Pistol", 0.8],
  ["Akbolto", "akbolto", "Pistol", 0.8],
  ["Hikou", "hikou", "Pistol", 0.75],
  ["Euphona Prime", "euphonaPrime", "Pistol", 0.7],
  ["Gammacor", "gammacor", "Pistol", 0.65],
  ["Marelok", "marelok", "Pistol", 0.65],
  ["Sonicor", "sonicor", "Pistol", 0.65],
  ["Staticor", "staticor", "Pistol", 0.53],
  ["Akstiletto", "akstiletto", "Pistol", 0.5],
  ["Lex", "lex", "Pistol", 0.5],
  // 近战 Melee
  ["Amphis", "amphis", "Melee", 1.5],
  ["Ether Daggers", "etherDaggers", "Melee", 1.49],
  ["Dark Sword", "darkSword", "Melee", 1.48],
  ["Cronus", "cronus", "Melee", 1.48],
  ["Plasma Sword", "plasmaSword", "Melee", 1.48],
  ["Heat Sword", "heatSword", "Melee", 1.48],
  ["Twin Krohkur", "twinKrohkur", "Melee", 1.48],
  ["Dual Keres", "dualKeres", "Melee", 1.48],
  ["Dual Skana", "dualSkana", "Melee", 1.48],
  ["Jaw Sword", "jawSword", "Melee", 1.47],
  ["Pangolin Sword", "pangolinSword", "Melee", 1.47],
  ["Kama", "kama", "Melee", 1.47],
  ["Anku", "anku", "Melee", 1.46],
  ["Kogake", "kogake", "Melee", 1.46],
  ["Dual Ether", "dualEther", "Melee", 1.45],
  ["Machete", "machete", "Melee", 1.45],
  ["Ankyros", "ankyros", "Melee", 1.45],
  ["Ether Reaper", "etherReaper", "Melee", 1.45],
  ["Kestrel", "kestrel", "Melee", 1.45],
  ["Halikar", "halikar", "Melee", 1.44],
  ["Dual Zoren", "dualZoren", "Melee", 1.44],
  ["Ether Sword", "etherSword", "Melee", 1.44],
  ["Heat Dagger", "heatDagger", "Melee", 1.44],
  ["Dual Heat Swords", "dualHeatSwords", "Melee", 1.44],
  ["Gram", "gram", "Melee", 1.44],
  ["Ceramic Dagger", "ceramicDagger", "Melee", 1.43],
  ["Kronen", "kronen", "Melee", 1.43],
  ["Mire", "mire", "Melee", 1.43],
  ["Nami Solo", "namiSolo", "Melee", 1.43],
  ["Ninkondi", "ninkondi", "Melee", 1.41],
  ["Tekko", "tekko", "Melee", 1.4],
  ["Dual Raza", "dualRaza", "Melee", 1.4],
  ["Tonbo", "tonbo", "Melee", 1.38],
  ["Serro", "serro", "Melee", 1.38],
  ["Ripkas", "ripkas", "Melee", 1.38],
  ["Furax", "furax", "Melee", 1.38],
  ["Fang", "fang", "Melee", 1.36],
  ["Cerata", "cerata", "Melee", 1.36],
  ["Hate", "hate", "Melee", 1.36],
  ["Dragon Nikana", "dragonNikana", "Melee", 1.35],
  ["Shaku", "shaku", "Melee", 1.35],
  ["Sibear", "sibear", "Melee", 1.35],
  ["Gazal Machete", "gazalMachete", "Melee", 1.35],
  ["Scoliac", "scoliac", "Melee", 1.32],
  ["Okina", "okina", "Melee", 1.31],
  ["Tipedo", "tipedo", "Melee", 1.31],
  ["Lacera", "lacera", "Melee", 1.31],
  ["Caustacyst", "caustacyst", "Melee", 1.3],
  ["Prova", "prova", "Melee", 1.29],
  ["Bo", "bo", "Melee", 1.29],
  ["Karyst", "karyst", "Melee", 1.29],
  ["Reaper Prime", "reaperPrime", "Melee", 1.29],
  ["Deconstructor", "deconstructor", "Melee", 1.25],
  ["Sheev", "sheev", "Melee", 1.25],
  ["Kesheg", "kesheg", "Melee", 1.24],
  ["Sarpa", "sarpa", "Melee", 1.24],
  ["Skana", "skana", "Melee", 1.22],
  ["Krohkur", "krohkur", "Melee", 1.22],
  ["Glaive", "glaive", "Melee", 1.22],
  ["Dark Split-Sword", "darkSplitSword", "Melee", 1.21],
  ["Volnus", "volnus", "Melee", 1.2],
  ["Broken Scepter", "brokenScepter", "Melee", 1.19],
  ["Twin Basolk", "twinBasolk", "Melee", 1.18],
  ["Nami Skyla", "namiSkyla", "Melee", 1.175],
  ["Redeemer", "redeemer", "Melee", 1.17],
  ["Dual Ichor", "dualIchor", "Melee", 1.16],
  ["Orvius", "orvius", "Melee", 1.15],
  ["Dakra Prime", "dakraPrime", "Melee", 1.15],
  ["Dex Dakra", "dexDakra", "Melee", 1.15],
  ["Destreza", "destreza", "Melee", 1.14],
  ["Obex", "obex", "Melee", 1.1],
  ["Magistar", "magistar", "Melee", 1.09],

  ["Mewan", "mewan", "Melee", 1],
  ["Kronsh", "kronsh", "Melee", 1],
  ["Ooltha", "ooltha", "Melee", 1],
  ["Balla", "balla", "Melee", 1],
  ["Dehtat", "dehtat", "Melee", 1],
  ["Cyath", "cyath", "Melee", 1],
  ["Plague Keewar", "plagueKeewar", "Melee", 1],
  ["Plague Kripath", "plagueKripath", "Melee", 1],

  ["Cadus", "cadus", "Melee", 1],
  ["Kreska", "kreska", "Melee", 1],
  ["Paracesis", "paracesis", "Melee", 1],
  ["Pupacyst", "pupacyst", "Melee", 1],
  ["Falcor", "falcor", "Melee", 1],
  ["Gunsen", "gunsen", "Melee", 1],
  ["Silva & Aegis", "silvaAegis", "Melee", 1],
  ["Sigma & Octantis", "sigmaOctantis", "Melee", 1],
  ["Dual Cleavers", "dualCleavers", "Melee", 1],
  ["Arca Titron", "arcaTitron", "Melee", 1],
  ["Endura", "endura", "Melee", 1],
  ["Scindo", "scindo", "Melee", 1],
  ["Sepfahn", "sepfahn", "Melee", 1],
  ["Cassowar", "cassowar", "Melee", 1],
  ["Boltace", "boltace", "Melee", 1],
  ["Rabvee", "rabvee", "Melee", 1],
  ["Dokrahm", "dokrahm", "Melee", 1],
  ["Skiajati", "skiajati", "Melee", 1],
  ["Ohma", "ohma", "Melee", 0.97],
  ["Fragor", "fragor", "Melee", 0.96],
  ["Mios", "mios", "Melee", 0.95],
  ["Heliocor", "heliocor", "Melee", 0.94],
  ["Guandao", "guandao", "Melee", 0.9],
  ["Ack & Brunt", "ackBrunt", "Melee", 0.9],
  ["Sydon", "sydon", "Melee", 0.84],
  ["Jat Kusar", "jatKusar", "Melee", 0.81],
  ["Dual Kamas", "dualKamas", "Melee", 0.81],
  ["Broken War", "brokenWar", "Melee", 0.79],
  ["Jat Kittag", "jatKittag", "Melee", 0.75],
  ["War", "war", "Melee", 0.5],
  ["Atterax", "atterax", "Melee", 0.5],
  ["Dark Dagger", "darkDagger", "Melee", 0.5],
  ["Galatine", "galatine", "Melee", 0.5],
  ["Lesion", "lesion", "Melee", 0.5],
  ["Hirudo", "hirudo", "Melee", 0.5],
  ["Zenistar", "zenistar", "Melee", 0.5],
  ["Lecta", "lecta", "Melee", 0.5],
  ["Venka", "venka", "Melee", 0.5],
  ["Nikana", "nikana", "Melee", 0.5],
  ["Orthos", "orthos", "Melee", 0.5],

  // 技能武器 Exalted Weapon
  ["Regulators", "regulators", "Pistol", 0],
  ["Iron Staff", "ironStaff", "Melee", 0],
  ["Valkyr Talons", "valkyrTalons", "Melee", 0],
  ["Exalted Blade", "exaltedBlade", "Melee", 0],
  ["Diwata", "diwata", "Melee", 0],
  ["Artemis Bow", "artemisBow", "Rifle", 0],
  ["Dex Pixia", "dexPixia", "Pistol", 0],
  ["Whipclaw", "whipclaw", "Melee", 0],
  ["Shattered Lash", "shatteredLash", "Melee", 0],
] as [string, string, string, number][];
export const ModTypeTable = {
  "Rifle": "步枪",
  "Shotgun": "霰弹枪",
  "Pistol": "手枪",
  "Melee": "近战",
};

export const RivenWeaponDataBase = _rivenWeaponDataBase.map(v => new RivenWeapon(v[0], v[1], v[2], v[3]));

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
    Rifle: new RegExp(`(?:(${RivenPropertyDataBase.Rifle.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.Rifle.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.Rifle.map(v => v.subfix).join("|")})`, "i"),
    Shotgun: new RegExp(`(?:(${RivenPropertyDataBase.Shotgun.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.Shotgun.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.Shotgun.map(v => v.subfix).join("|")})`, "i"),
    Pistol: new RegExp(`(?:(${RivenPropertyDataBase.Pistol.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.Pistol.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.Pistol.map(v => v.subfix).join("|")})`, "i"),
    Melee: new RegExp(`(?:(${RivenPropertyDataBase.Melee.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.Melee.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.Melee.map(v => v.subfix).join("|")})`, "i"),
  }
  static PrefixAll = new RegExp(`(?:${RivenPropertyDataBase.all.map(v => v.prefix).join("|")})`, "i")

  constructor() {
    // 同时添加中英文名称
    RivenWeaponDataBase.forEach((v, i) => { this.rWeaponDict.set(v.id, i); this.rWeaponDict.set(v.name, i); });
    RivenPropertyDataBase.all.forEach((v, i) => { this.propDict.set(v.id, i); this.propDict.set(v.eName, i); this.propDict.set(v.name, i); });
    (GunWeaponDataBase as Weapon[]).concat(MeleeWeaponDataBase).forEach((v, i) => this.addWeapon(v, i));
  }

  addWeapon(weapon: Weapon, index: number) {
    this.nWeaponDict.set(weapon.id, index);
    this.nWeaponDict.set(i18n.t(`messages.${weapon.name}`) as string, index);
    let riven = RivenWeaponDataBase[this.rWeaponDict.get(weapon.rivenName || weapon.id)];
    if (!riven) {
      // 部分技能武器
      return;
    }
    if (this.ccWeaponDict.has(riven.name)) {
      if (riven.id !== riven.name) this.ccWeaponDict.get(riven.id).push(index);
      this.ccWeaponDict.get(riven.name).push(index);
    }
    else {
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
    if (rst < gunCount)
      return GunWeaponDataBase[rst];
    else
      return MeleeWeaponDataBase[rst - gunCount];
  }

  /**
   * 通过武器通用名称获取武器实例
   * @param name 武器通用名称
   */
  static getNormalWeaponsByRivenName(name: string) {
    let rst = this.instance.ccWeaponDict.get(name),
      gunCount = GunWeaponDataBase.length;
    if (rst) {
      if (rst[0] < gunCount)
        return rst.map(v => GunWeaponDataBase[v])
      else
        return rst.map(v => MeleeWeaponDataBase[v - gunCount])
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
    if (weapon && prop)
      return RivenPropertyValueBaseDataBase[weapon.mod][prop.id] * weapon.ratio * (prop.nopercent ? 0.1 : 10);
    else
      return -1;
  }

}
