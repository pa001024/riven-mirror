import { strSimilarity, StringTree } from "@/warframe/util"
import _ from "lodash";
import { MeleeWeaponDataBase, GunWeaponDataBase, Weapon } from "@/warframe/weapon";

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
  { id: '4', sName: "火伤", eName: "Fire", name: "火焰伤害", prefix: "igni", subfix: "pha", onlyPositive: true },
  { id: '5', sName: "冰伤", eName: "Ice", name: "冰冻伤害", prefix: "geli", subfix: "do", onlyPositive: true },
  { id: '6', sName: "毒伤", eName: "Toxic", name: "毒素伤害", prefix: "toxi", subfix: "tox", onlyPositive: true },
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
  { id: 'L', sName: "弹容", eName: "Magazine Capacity", name: "弹匣容量", prefix: "arma", subfix: "tin" },
  { id: 'F', sName: "装填", eName: "Reload Speed", name: "装填速度", prefix: "feva", subfix: "tak" },
  { id: 'M', sName: "弹药", eName: "Ammo Maximum", name: "弹药最大值", prefix: "ampi", subfix: "bin", noDmg: true },
  { id: 'P', sName: "穿透", eName: "Punch Through", name: "穿透", prefix: "lexi", subfix: "nok", onlyPositive: true, nopercent: true, noDmg: true },
  { id: 'H', sName: "变焦", eName: "Zoom", name: "变焦", prefix: "hera", subfix: "lis", noDmg: true },
  { id: 'V', sName: "抛射", eName: "Projectile Flight Speed", name: "抛射物飞行速度", prefix: "conci", subfix: "nak", noDmg: true },
  { id: 'Z', sName: "后坐", eName: "Weapon Recoil", name: "后坐力", prefix: "zeti", subfix: "mag", negative: true, noDmg: true },
];

const meleeProperty: RivenProperty[] = [
  { id: 'K', sName: "伤害", eName: "Melee Damage", name: "近战伤害", prefix: "visi", subfix: "ata" },
  { id: 'T', sName: "范围", eName: "Range", name: "攻击范围", prefix: "locti", subfix: "tor", noDmg: true },
  { id: 'J', sName: "攻速", eName: "Attack Speed", name: "攻击速度", prefix: "croni", subfix: "dra" },
  { id: 'B', sName: "充能伤害", eName: "Channeling Damage", name: "充能伤害", prefix: "tori", subfix: "bo", noDmg: true },
  { id: 'U', sName: "充能效率", eName: "Channeling Efficiency", name: "充能效率", prefix: "uti", subfix: "tia", noDmg: true },
  { id: 'N', sName: "连击时间", eName: "Combo Duration", name: "连击持续时间", prefix: "tempi", subfix: "nem", nopercent: true, noDmg: true },
  { id: 'E', sName: "滑行暴击", eName: "chance to be a Critical Hit.", eDisplayPre: "Slide Attack has", displayPre: "滑行攻击有", name: "的几率造成暴击", prefix: "pleci", subfix: "nent" },
  { id: 'X', sName: "处决伤害", eName: "Finisher Damage", name: "处决伤害", prefix: "exi", subfix: "cta", noDmg: true },
];

export const RivenPropertyDataBase: { [key: string]: RivenProperty[] } = {
  Rifle: baseProperty.concat(gunProperty.map(v => v.id === "R" ? { id: 'R', sName: "射速", eName: "Firerate (x2 for Bows)", name: "射速（弓类武器效果加倍）", prefix: v.prefix, subfix: v.subfix } : v)),
  Shotgun: baseProperty.concat(gunProperty),
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
    V: 9,   // 抛射物飞行速度
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
    V: 9,   // 抛射物飞行速度
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
    V: 9,   // 抛射物飞行速度
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
    B: 15,  // 充能伤害
    U: 9,   // 充能效率
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
  /** 武器中文名 */
  name: string;
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
    if (this.mod === "Melee")
      return MeleeWeaponDataBase.filter(v => this.id === (v.rivenName || v.id));
    else
      return GunWeaponDataBase.filter(v => this.id === (v.rivenName || v.id));
  }
  calcPrice(x: number) {
    let normal = 800;
    if (x > 30) normal = +0.0000016468253968327832 * x * x * x * x * x * x - 0.0006184523809555002 * x * x * x * x * x + 0.0937003968259277 * x * x * x * x - 7.283630952427242 * x * x * x + 306.6134920656638 * x * x - 6605.452381004125 * x + 57700.00000048811;
    return ~~(normal * this.price / 1600);
  }
  constructor(id: string, name: string, mod: string, ratio: number, price: number) {
    this.id = id;
    this.name = name;
    this.mod = mod;
    this.ratio = ratio;
    this.price = price;
  }
}

const _rivenWeaponDataBase = [
  // 步枪
  ["Miter", "米特尔", "Rifle", 1.6, 105],
  ["Panthera", "猎豹", "Rifle", 1.55, 125],
  ["Flux Rifle", "通量射线步枪", "Rifle", 1.55, 85],
  ["Harpak", "哈帕克", "Rifle", 1.55, 85],
  ["Mutalist Quanta", "异融量子枪", "Rifle", 1.55, 85],
  ["Buzlok", "巴兹火枪", "Rifle", 1.55, 225],
  ["Tetra", "特拉", "Rifle", 1.5, 70],
  ["Phage", "噬菌者", "Shotgun", 1.46, 195],
  ["Deth Machine Rifle", "死亡机枪", "Rifle", 1.46, 35],
  ["Hind", "雌鹿", "Rifle", 1.42, 50],
  ["Attica", "阿提卡", "Rifle", 1.42, 140],
  ["Tiberon", "狂鲨", "Rifle", 1.4, 875],
  ["Vulkar", "金工火神", "Rifle", 1.38, 310],
  ["Glaxion", "冷冻光束步枪", "Rifle", 1.35, 95],
  ["Stinger", "毒刺", "Rifle", 1.31, 45],
  ["Paracyst", "附肢寄生者", "Rifle", 1.31, 70],
  ["Karak", "卡拉克", "Rifle", 1.28, 140],
  ["Grinlok", "葛恩火枪", "Rifle", 1.25, 135],
  ["Dera", "德拉", "Rifle", 1.25, 85],
  ["Ogris", "食人女魔", "Rifle", 1.25, 105],
  ["Stradavar", "斯特拉迪瓦", "Rifle", 1.25, 110],
  ["Synapse", "突触生化枪", "Rifle", 1.31, 250],
  ["Vulklok", "金工火枪", "Rifle", 1.25, 65],
  ["Laser Rifle", "激光步枪", "Rifle", 1.21, 55],
  ["Opticor", "奥堤克光子枪", "Rifle", 1.21, 670],
  ["Mutalist Cernos", "异融 西诺斯", "Rifle", 1.21, 140],
  ["Daikyu", "大久和弓", "Rifle", 1.21, 120],
  ["Quartakk", "夸塔克", "Rifle", 1.2, 175],
  ["Penta", "潘塔", "Rifle", 1.18, 105],
  ["Gorgon", "蛇发女妖", "Rifle", 1.18, 180],
  ["Burston", "伯斯顿", "Rifle", 1.175, 75],
  ["Snipetron", "狙击特昂", "Rifle", 1.165, 205],
  ["Supra", "苏普拉", "Rifle", 1.14, 335],
  ["Torid", "托里德", "Rifle", 1.14, 125],
  ["Rubico", "绝路", "Rifle", 1.105, 670],
  ["Lanka", "兰卡", "Rifle", 1.105, 1595],
  ["Grakata", "葛拉卡达", "Rifle", 1.1, 135],
  ["Baza", "苍鹰", "Rifle", 1.1, 325],
  ["Zhuge", "诸葛连弩", "Rifle", 1.1, 75],
  ["Latron", "拉特昂", "Rifle", 1.07, 170],
  ["Javlok", "燃焰标枪", "Rifle", 1, 80],
  ["Tenora", "双簧管", "Rifle", 1, 230],
  ["Zenith", "天穹之顶", "Rifle", 1, 160],
  ["Ferrox", "铁晶磁轨炮", "Rifle", 1, 115],
  ["Veldt", "草原猎手", "Rifle", 1, 105],
  ["Scourge", "祸根", "Rifle", 1, 70],
  ["Hema", "血肢", "Rifle", 1, 145],
  ["Argonak", "氩格纳克", "Rifle", 1, 140],
  ["Vectis", "守望者", "Rifle", 1, 965],
  ["Artax", "阿塔克斯", "Rifle", 1, 21500],
  ["Amprex", "安培克斯", "Rifle", 0.965, 560],
  ["Zarr", "沙皇", "Rifle", 1, 325],
  ["Braton", "布莱顿", "Rifle", 0.96, 90],
  ["Paris", "帕里斯", "Rifle", 0.96, 125],
  ["Quanta", "量子切割器", "Rifle", 0.9, 160],
  ["Lenz", "楞次弓", "Rifle", 0.9, 425],
  ["Cernos", "西诺斯", "Rifle", 0.86, 175],
  ["Sybaris", "席芭莉丝", "Rifle", 0.9, 270],
  ["Dread", "恐惧", "Rifle", 0.82, 250],
  ["Boltor", "螺钉步枪", "Rifle", 0.79, 195],
  ["Ignis", "伊格尼斯", "Rifle", 0.79, 320],
  ["Tonkor", "征服榴炮", "Rifle", 0.55, 90],
  ["Simulor", "重力奇点拟成枪", "Rifle", 0.5, 65],
  ["Soma", "月神", "Rifle", 0.5, 225],
  // 霰弹枪
  ["Drakgoon", "龙骑兵", "Shotgun", 1.48, 185],
  ["Convectrix", "导热聚焦枪", "Shotgun", 1.46, 105],
  ["Strun", "斯特朗", "Shotgun", 1.4, 285],
  ["Kohm", "寇恩热能枪", "Shotgun", 1.4, 725],
  ["Boar", "野猪", "Shotgun", 1.34, 230],
  ["Sobek", "鳄神", "Shotgun", 1.33, 250],
  ["Astilla", "碎裂者", "Shotgun", 1.2, 320],
  ["Sweeper", "扫除者", "Shotgun", 1, 120],
  ["Corinth", "科林斯", "Shotgun", 1, 460],
  ["Arca Plasmor", "弧电离子枪", "Shotgun", 0.9, 860],
  ["Hek", "海克", "Shotgun", 0.55, 195],
  ["Tigris", "猛虎", "Shotgun", 0.5, 315],
  // 手枪
  ["Vasto", "瓦斯托", "Pistol", 1.53, 240],
  ["Kraken", "北海巨妖", "Pistol", 1.53, 30],
  ["Magnus", "麦格努斯", "Pistol", 1.53, 85],
  ["Viper", "蝰蛇", "Pistol", 1.53, 80],
  ["Aklato", "拉托双枪", "Pistol", 1.52, 125],
  ["Akzani", "荒谬双枪", "Pistol", 1.52, 45],
  ["Cestra", "锡斯特", "Pistol", 1.52, 55],
  ["Bolto", "螺钉手枪", "Pistol", 1.51, 55],
  ["Tysis", "啐沫者", "Pistol", 1.51, 75],
  ["Lato", "拉托", "Pistol", 1.51, 375],
  ["Kunai", "苦无", "Pistol", 1.51, 40],
  ["Seer", "预言者", "Pistol", 1.5, 40],
  ["Twin Gremlins", "双子小精灵", "Pistol", 1.5, 45],
  ["Spectra", "光谱切割器", "Pistol", 1.49, 45],
  ["Stug", "史特克", "Pistol", 1.48, 30],
  ["Nukor", "努寇微波枪", "Pistol", 1.45, 100],
  ["Embolist", "安柏勒斯", "Pistol", 1.45, 65],
  ["Burst Laser", "激光点发", "Pistol", 1.45, 55],
  ["Talons", "鹰爪", "Pistol", 1.44, 70],
  ["Akjagara", "觉醒双枪", "Pistol", 1.43, 360],
  ["Castanas", "雷爆信标", "Pistol", 1.42, 125],
  ["Twin Vipers", "双子蝰蛇", "Pistol", 1.41, 70],
  ["Angstrum", "安格斯壮", "Pistol", 1.4, 80],
  ["Sicarus", "暗杀者", "Pistol", 1.4, 550],
  ["Afuris", "盗贼双枪", "Pistol", 1.39, 95],
  ["Furis", "盗贼", "Pistol", 1.35, 65],
  ["Dual Cestra", "锡斯特双枪", "Pistol", 1.35, 90],
  ["Azima", "方位角", "Pistol", 1.35, 175],
  ["Acrid", "阿克里德", "Pistol", 1.33, 85],
  ["Akmagnus", "麦格努斯双枪", "Pistol", 1.28, 90],
  ["Aksomati", "轻灵月神双枪", "Pistol", 1.26, 165],
  ["Stubba", "史度巴", "Pistol", 1.25, 75],
  ["Despair", "绝望", "Pistol", 1.24, 85],
  ["Fusilai", "齐射玻刃", "Pistol", 1.2, 95],
  ["Kohmak", "寇恩霰机枪", "Pistol", 1.2, 50],
  ["Bronco", "野马", "Pistol", 1.2, 35],
  ["Akbronco", "野马双枪", "Pistol", 1.2, 100],
  ["Dual Toxocyst", "毒囊双枪", "Pistol", 1.19, 130],
  ["Akvasto", "瓦斯托双枪", "Pistol", 1.15, 115],
  ["Pyrana", "食人鱼", "Pistol", 1.1, 910],
  ["Kulstar", "杀星", "Pistol", 1.1, 105],
  ["Twin Kohmak", "双子寇恩霰机枪", "Pistol", 1.1, 90],
  ["Twin Rogga", "双子罗格", "Pistol", 1, 175],
  ["Pandero", "手鼓", "Pistol", 1, 365],
  ["Zakti", "毒芽", "Pistol", 1, 70],
  ["Hystrix", "猬刺", "Pistol", 1, 125],
  ["Knell", "丧钟", "Pistol", 1, 125],
  ["Arca Scisco", "弧电探知者", "Pistol", 1, 110],
  ["Cycron", "循环离子枪", "Pistol", 1, 85],
  ["Detron", "德特昂", "Pistol", 1, 190],
  ["Aklex", "雷克斯双枪", "Pistol", 1, 315],
  ["Atomos", "原子矿融炮", "Pistol", 0.87, 190],
  ["Akbolto", "螺钉双枪", "Pistol", 0.85, 195],
  ["Ballistica", "布里斯提卡", "Pistol", 0.85, 90],
  ["Pox", "脓痘", "Pistol", 0.82, 140],
  ["Twin Grakatas", "双子葛拉卡达", "Pistol", 0.76, 125],
  ["Brakk", "布拉克", "Pistol", 0.75, 135],
  ["Hikou", "飞扬", "Pistol", 0.69, 70],
  ["Euphona Prime", "悦音 Prime", "Pistol", 0.69, 375],
  ["Spira", "旋刃飞刀", "Pistol", 0.66, 70],
  ["Gammacor", "咖玛腕甲枪", "Pistol", 0.53, 95],
  ["Staticor", "静电能量导引枪", "Pistol", 0.53, 125],
  ["Marelok", "玛瑞火枪", "Pistol", 0.5, 125],
  ["Akstiletto", "史提托双枪", "Pistol", 0.5, 165],
  ["Lex", "雷克斯", "Pistol", 0.5, 125],
  ["Sonicor", "超音波冲击枪", "Pistol", 0.5, 75],
  // 近战
  ["Amphis", "双头蛇", "Melee", 1.5, 65],
  ["Ether Daggers", "苍穹匕首", "Melee", 1.49, 35],
  ["Dark Sword", "暗黑长剑", "Melee", 1.48, 65],
  ["Cronus", "克洛诺斯", "Melee", 1.48, 50],
  ["Plasma Sword", "等离子长剑", "Melee", 1.48, 30],
  ["Heat Sword", "烈焰长剑", "Melee", 1.48, 35],
  ["Twin Krohkur", "双子克鲁古尔", "Melee", 1.48, 130],
  ["Dual Keres", "双持凯瑞斯", "Melee", 1.48, 230],
  ["Dual Skana", "空刃双刀", "Melee", 1.48, 50],
  ["Jaw Sword", "蛇颚刀", "Melee", 1.47, 60],
  ["Pangolin Sword", "鲮鲤剑", "Melee", 1.47, 40],
  ["Kama", "短柄战镰", "Melee", 1.47, 50],
  ["Anku", "夺魂死神", "Melee", 1.46, 65],
  ["Kogake", "科加基", "Melee", 1.46, 130],
  ["Dual Ether", "苍穹双剑", "Melee", 1.45, 35],
  ["Machete", "马谢特砍刀", "Melee", 1.45, 35],
  ["Ankyros", "甲龙双拳", "Melee", 1.45, 85],
  ["Ether Reaper", "苍穹死神", "Melee", 1.45, 35],
  ["Kestrel", "红隼", "Melee", 1.45, 55],
  ["Halikar", "哈利卡", "Melee", 1.44, 30],
  ["Dual Zoren", "佐伦双斧", "Melee", 1.44, 50],
  ["Ether Sword", "苍穹之剑", "Melee", 1.44, 65],
  ["Heat Dagger", "烈焰短剑", "Melee", 1.44, 55],
  ["Dual Heat Swords", "烈焰双剑", "Melee", 1.44, 45],
  ["Gram", "格拉姆", "Melee", 1.44, 530],
  ["Ceramic Dagger", "陶瓷匕首", "Melee", 1.43, 95],
  ["Kronen", "皇家拐刃", "Melee", 1.43, 280],
  ["Mire", "米尔", "Melee", 1.43, 75],
  ["Nami Solo", "海波单剑", "Melee", 1.43, 70],
  ["Ninkondi", "降灵追猎者", "Melee", 1.41, 55],
  ["Tekko", "铁钩手甲", "Melee", 1.4, 130],
  ["Dual Raza", "锋月双斧", "Melee", 1.4, 80],
  ["Tonbo", "蜻蛉薙", "Melee", 1.38, 185],
  ["Serro", "电能斩锯", "Melee", 1.38, 100],
  ["Ripkas", "锐卡斯", "Melee", 1.38, 120],
  ["Furax", "弗拉克斯", "Melee", 1.38, 70],
  ["Fang", "狼牙", "Melee", 1.36, 45],
  ["Cerata", "裸鳃刃", "Melee", 1.36, 40],
  ["Hate", "憎恨", "Melee", 1.36, 70],
  ["Dragon Nikana", "龙之侍刃", "Melee", 1.35, 335],
  ["Shaku", "双节尺棍", "Melee", 1.35, 55],
  ["Sibear", "西伯利亚冰锤", "Melee", 1.35, 80],
  ["Gazal Machete", "加扎勒反曲刀", "Melee", 1.35, 65],
  ["Scoliac", "嵴椎节鞭", "Melee", 1.32, 795],
  ["Okina", "翁", "Melee", 1.31, 30],
  ["Tipedo", "提佩多", "Melee", 1.31, 140],
  ["Lacera", "悲痛之刃", "Melee", 1.31, 185],
  ["Caustacyst", "灼蚀变体镰", "Melee", 1.3, 140],
  ["Prova", "普罗沃", "Melee", 1.29, 60],
  ["Bo", "玻之武杖", "Melee", 1.29, 125],
  ["Karyst", "凯洛斯特", "Melee", 1.29, 50],
  ["Reaper Prime", "收割者 Prime", "Melee", 1.29, 125],
  ["Deconstructor", "分离", "Melee", 1.25, 80],
  ["Sheev", "希芙", "Melee", 1.25, 45],
  ["Kesheg", "怯薛", "Melee", 1.24, 110],
  ["Sarpa", "蛇刃", "Melee", 1.24, 70],
  ["Skana", "空刃", "Melee", 1.22, 85],
  ["Krohkur", "克鲁古尔", "Melee", 1.22, 75],
  ["Glaive", "战刃", "Melee", 1.22, 255],
  ["Dark Split-Sword", "暗黑分合剑", "Melee", 1.21, 120],
  ["Volnus", "创伤", "Melee", 1.2, 90],
  ["Broken Scepter", "破损珽杖", "Melee", 1.19, 70],
  ["Twin Basolk", "双子巴萨克", "Melee", 1.18, 65],
  ["Nami Skyla", "海波斯库拉对剑", "Melee", 1.175, 180],
  ["Redeemer", "救赎者", "Melee", 1.17, 60],
  ["Dual Ichor", "恶脓双斧", "Melee", 1.16, 100],
  ["Orvius", "灵枢", "Melee", 1.15, 80],
  ["Dakra Prime", "达克拉 Prime", "Melee", 1.15, 90],
  ["Dex Dakra", "DEX 达克拉双剑", "Melee", 1.15, 75],
  ["Destreza", "技巧之剑", "Melee", 1.14, 325],
  ["Obex", "奥比克斯", "Melee", 1.1, 75],
  ["Magistar", "执法者", "Melee", 1.09, 105],
  ["Mewan", "密丸", "Melee", 1, 140],
  ["Kronsh", "客隆什", "Melee", 1, 70],
  ["Ooltha", "乌尔萨", "Melee", 1, 110],
  ["Balla", "宝拉", "Melee", 1, 175],
  ["Dehtat", "德塔特", "Melee", 1, 160],
  ["Cyath", "西亚什", "Melee", 1, 170],
  ["Plague Keewar", "瘟疫 奇沃", "Melee", 1, 215],
  ["Plague Kripath", "瘟疫 克里帕丝", "Melee", 0.862, 445],
  ["Gunsen", "军扇", "Melee", 1, 85],
  ["Silva & Aegis", "席瓦 & 神盾", "Melee", 1, 175],
  ["Sigma & Octantis", "西格玛 & 南极座", "Melee", 1, 170],
  ["Dual Cleavers", "斩肉双刀", "Melee", 1, 65],
  ["Arca Titron", "弧电振子锤", "Melee", 1, 115],
  ["Endura", "三叶坚韧", "Melee", 1, 75],
  ["Scindo", "分裂斩斧", "Melee", 1, 170],
  ["Sepfahn", "瑟普梵", "Melee", 1, 255],
  ["Cassowar", "鹤鸵长戟", "Melee", 1, 130],
  ["Boltace", "螺钉拐刃", "Melee", 1, 90],
  ["Rabvee", "拉比威", "Melee", 1, 100],
  ["Dokrahm", "多克拉姆", "Melee", 1, 280],
  ["Skiajati", "影生", "Melee", 1, 420],
  ["Ohma", "欧玛", "Melee", 0.97, 120],
  ["Fragor", "重击巨锤", "Melee", 0.96, 70],
  ["Mios", "牝狮神", "Melee", 0.95, 195],
  ["Heliocor", "赫利俄光锤", "Melee", 0.94, 45],
  ["Guandao", "关刀", "Melee", 0.9, 440],
  ["Ack & Brunt", "认知 & 冲击", "Melee", 0.9, 85],
  ["Sydon", "恶龙", "Melee", 0.84, 60],
  ["Jat Kusar", "喷射锁镰", "Melee", 0.81, 140],
  ["Dual Kamas", "双短柄战镰", "Melee", 0.81, 75],
  ["Broken War", "破碎的战争之剑", "Melee", 0.79, 85],
  ["Jat Kittag", "喷射战锤", "Melee", 0.75, 120],
  ["War", "战争之剑", "Melee", 0.5, 120],
  ["Atterax", "阿特拉克斯", "Melee", 0.5, 235],
  ["Dark Dagger", "暗黑匕首", "Melee", 0.5, 30],
  ["Galatine", "迦伦提恩", "Melee", 0.5, 220],
  ["Lesion", "病变", "Melee", 0.5, 125],
  ["Hirudo", "蚂蝗", "Melee", 0.5, 65],
  ["Zenistar", "天顶之星", "Melee", 0.5, 345],
  ["Lecta", "勒克塔", "Melee", 0.5, 110],
  ["Venka", "凯旋之爪", "Melee", 0.5, 95],
  ["Nikana", "侍刃", "Melee", 0.5, 130],
  ["Orthos", "欧特鲁斯", "Melee", 0.5, 150]
] as [string, string, string, number, number][];
export const ModTypeTable = {
  "Rifle": "步枪",
  "Shotgun": "霰弹枪",
  "Pistol": "手枪",
  "Melee": "近战",
};

export const RivenWeaponDataBase = _rivenWeaponDataBase.map(v => new RivenWeapon(v[0], v[1], v[2], v[3], v[4]));


/** 拼音首字母查找表 */
export const CNPY_RivenWeapon = new StringTree([["mte", "米特尔"], ["lb", "猎豹"], ["tlsxbq", "通量射线步枪"], ["hpk", "哈帕克"], ["yrlzq", "异融量子枪"], ["bzhq", "巴兹火枪"], ["tl", "特拉"], ["sjz", "噬菌者"], ["swjq", "死亡机枪"], ["cl", "雌鹿"], ["atk", "阿提卡"], ["ks", "狂鲨"], ["jghs", "金工火神"], ["ldgsbq", "冷冻光束步枪"], ["dc", "毒刺"], ["fzjsz", "附肢寄生者"], ["klk", "卡拉克"], ["gehq", "葛恩火枪"], ["dl", "德拉"], ["srnm", "食人女魔"], ["stldw", "斯特拉迪瓦"], ["tcshq", "突触生化枪"], ["jghq", "金工火枪"], ["jgbq", "激光步枪"], ["adkgzq", "奥堤克光子枪"], ["yrxns", "异融 西诺斯"], ["djhg", "大久和弓"], ["ktk", "夸塔克"], ["pt", "潘塔"], ["sfny", "蛇发女妖"], ["bsd", "伯斯顿"], ["jjta", "狙击特昂"], ["spl", "苏普拉"], ["tld", "托里德"], ["jl", "绝路"], ["lk", "兰卡"], ["glkd", "葛拉卡达"], ["cy", "苍鹰"], ["zgln", "诸葛连弩"], ["lta", "拉特昂"], ["rybq", "燃焰标枪"], ["shg", "双簧管"], ["tqzd", "天穹之顶"], ["tjcgp", "铁晶磁轨炮"], ["cyls", "草原猎手"], ["hg", "祸根"], ["xz", "血肢"], ["ygnk", "氩格纳克"], ["swz", "守望者"], ["atks", "阿塔克斯"], ["apks", "安培克斯"], ["sh", "沙皇"], ["bld", "布莱顿"], ["pls", "帕里斯"], ["lzqgq", "量子切割器"], ["lcg", "楞次弓"], ["xns", "西诺斯"], ["xbls", "席芭莉丝"], ["kj", "恐惧"], ["ldbq", "螺钉步枪"], ["ygns", "伊格尼斯"], ["zflp", "征服榴炮"], ["zlqdncq", "重力奇点拟成枪"], ["ys", "月神"], ["lqb", "龙骑兵"], ["drjjq", "导热聚焦枪"], ["stl", "斯特朗"], ["kernq", "寇恩热能枪"], ["yz", "野猪"], ["es", "鳄神"], ["slz", "碎裂者"], ["scz", "扫除者"], ["kls", "科林斯"], ["hdlzq", "弧电离子枪"], ["mh", "猛虎"], ["hk", "海克"], ["wst", "瓦斯托"], ["bhjy", "北海巨妖"], ["mgns", "麦格努斯"], ["ks", "蝰蛇"], ["ltsq", "拉托双枪"], ["hmsq", "荒谬双枪"], ["xst", "锡斯特"], ["ldsq", "螺钉手枪"], ["cmz", "啐沫者"], ["lt", "拉托"], ["kw", "苦无"], ["yyz", "预言者"], ["szxjl", "双子小精灵"], ["gpqgq", "光谱切割器"], ["stk", "史特克"], ["nkwbq", "努寇微波枪"], ["abls", "安柏勒斯"], ["jgdf", "激光点发"], ["yz", "鹰爪"], ["jxsq", "觉醒双枪"], ["lbxb", "雷爆信标"], ["szks", "双子蝰蛇"], ["agsz", "安格斯壮"], ["asz", "暗杀者"], ["dzsq", "盗贼双枪"], ["dz", "盗贼"], ["xstsq", "锡斯特双枪"], ["fwj", "方位角"], ["akld", "阿克里德"], ["mgnssq", "麦格努斯双枪"], ["qlyssq", "轻灵月神双枪"], ["sdb", "史度巴"], ["jw", "绝望"], ["qsbr", "齐射玻刃"], ["kexjq", "寇恩霰机枪"], ["ym", "野马"], ["ymsq", "野马双枪"], ["dnsq", "毒囊双枪"], ["wstsq", "瓦斯托双枪"], ["sry", "食人鱼"], ["sx", "杀星"], ["szkexjq", "双子寇恩霰机枪"], ["szlg", "双子罗格"], ["sg", "手鼓"], ["dy", "毒芽"], ["wc", "猬刺"], ["sz", "丧钟"], ["hdtzz", "弧电探知者"], ["xhlzq", "循环离子枪"], ["dta", "德特昂"], ["lkssq", "雷克斯双枪"], ["yzkrp", "原子矿融炮"], ["ldsq", "螺钉双枪"], ["blstk", "布里斯提卡"], ["nd", "脓痘"], ["szglkd", "双子葛拉卡达"], ["blk", "布拉克"], ["fy", "飞扬"], ["yyprime", "悦音 Prime"], ["xrfd", "旋刃飞刀"], ["kmwjq", "咖玛腕甲枪"], ["jdnldyq", "静电能量导引枪"], ["mrhq", "玛瑞火枪"], ["sttsq", "史提托双枪"], ["lks", "雷克斯"], ["cybcjq", "超音波冲击枪"], ["sts", "双头蛇"], ["cqbs", "苍穹匕首"], ["ahcj", "暗黑长剑"], ["klns", "克洛诺斯"], ["dlzcj", "等离子长剑"], ["lycj", "烈焰长剑"], ["szklge", "双子克鲁古尔"], ["sckrs", "双持凯瑞斯"], ["krsd", "空刃双刀"], ["sed", "蛇颚刀"], ["llj", "鲮鲤剑"], ["dbzl", "短柄战镰"], ["dhss", "夺魂死神"], ["kjj", "科加基"], ["cqsj", "苍穹双剑"], ["mxtkd", "马谢特砍刀"], ["jlsq", "甲龙双拳"], ["cqss", "苍穹死神"], ["hs", "红隼"], ["hlk", "哈利卡"], ["zlsf", "佐伦双斧"], ["cqzj", "苍穹之剑"], ["lydj", "烈焰短剑"], ["lysj", "烈焰双剑"], ["glm", "格拉姆"], ["tcbs", "陶瓷匕首"], ["hjgr", "皇家拐刃"], ["me", "米尔"], ["hbdj", "海波单剑"], ["jlzlz", "降灵追猎者"], ["tgsj", "铁钩手甲"], ["fysf", "锋月双斧"], ["ql", "蜻蛉薙"], ["dnzj", "电能斩锯"], ["rks", "锐卡斯"], ["flks", "弗拉克斯"], ["ly", "狼牙"], ["lsr", "裸鳃刃"], ["zh", "憎恨"], ["lzsr", "龙之侍刃"], ["sjcg", "双节尺棍"], ["xblybc", "西伯利亚冰锤"], ["jzlfqd", "加扎勒反曲刀"], ["jzjb", "嵴椎节鞭"], ["w", "翁"], ["tpd", "提佩多"], ["btzr", "悲痛之刃"], ["zsbtl", "灼蚀变体镰"], ["plw", "普罗沃"], ["bzwz", "玻之武杖"], ["klst", "凯洛斯特"], ["sgzprime", "收割者 Prime"], ["fl", "分离"], ["xf", "希芙"], ["qx", "怯薛"], ["sr", "蛇刃"], ["kr", "空刃"], ["klge", "克鲁古尔"], ["zr", "战刃"], ["ahfhj", "暗黑分合剑"], ["cs", "创伤"], ["psz", "破损珽杖"], ["szbsk", "双子巴萨克"], ["hbskldj", "海波斯库拉对剑"], ["jsz", "救赎者"], ["ensf", "恶脓双斧"], ["ls", "灵枢"], ["dklprime", "达克拉 Prime"], ["dexdklsj", "DEX 达克拉双剑"], ["jqzj", "技巧之剑"], ["abks", "奥比克斯"], ["zfz", "执法者"], ["mw", "密丸"], ["kls", "客隆什"], ["wes", "乌尔萨"], ["bl", "宝拉"], ["dtt", "德塔特"], ["xys", "西亚什"], ["wyqw", "瘟疫 奇沃"], ["wyklps", "瘟疫 克里帕丝"], ["js", "军扇"], ["xwsd", "席瓦 & 神盾"], ["xgmnjz", "西格玛 & 南极座"], ["zrsd", "斩肉双刀"], ["hdzzc", "弧电振子锤"], ["syjr", "三叶坚韧"], ["flzf", "分裂斩斧"], ["spf", "瑟普梵"], ["htcj", "鹤鸵长戟"], ["ldgr", "螺钉拐刃"], ["lbw", "拉比威"], ["dklm", "多克拉姆"], ["ys", "影生"], ["om", "欧玛"], ["zjjc", "重击巨锤"], ["pss", "牝狮神"], ["hlegc", "赫利俄光锤"], ["gd", "关刀"], ["rzcj", "认知 & 冲击"], ["el", "恶龙"], ["pssl", "喷射锁镰"], ["sdbzl", "双短柄战镰"], ["psdzzzj", "破碎的战争之剑"], ["pszc", "喷射战锤"], ["zzzj", "战争之剑"], ["atlks", "阿特拉克斯"], ["ahbs", "暗黑匕首"], ["jlte", "迦伦提恩"], ["bb", "病变"], ["mh", "蚂蝗"], ["tdzx", "天顶之星"], ["lkt", "勒克塔"], ["kxzz", "凯旋之爪"], ["sr", "侍刃"], ["otls", "欧特鲁斯"]]);

/**
 * 主要工具类
 */
export class RivenDataBase {
  /** 通用名称 -> index */
  private rWeaponDict = new Map<string, number>()
  /** 武器名称 -> index */
  private nWeaponDict = new Map<string, number>()
  /** 通用名称 -> 武器名称 index list */
  private ccWeaponDict = new Map<string, number[]>()
  private propDict = new Map<string, number>()

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
    this.nWeaponDict.set(weapon.name, index);
    let riven = RivenWeaponDataBase[this.rWeaponDict.get(weapon.rivenName || weapon.id)];
    if (!riven) {
      // 部分技能武器
      return;
    }
    if (this.ccWeaponDict.has(riven.name)) {
      this.ccWeaponDict.get(riven.id).push(index);
      this.ccWeaponDict.get(riven.name).push(index);
    }
    else {
      this.ccWeaponDict.set(riven.id, [index]);
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
    if (this.hasWeapon(name)) return this.getRivenWeaponByName(name);
    let weaponFinded = _.maxBy(RivenWeaponDataBase, v => strSimilarity(name, v.name));
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
