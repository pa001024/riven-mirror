import { GunWeaponDataBase, MeleeWeaponDataBase, Weapon } from ".";
import { strSimilarity } from "../util";
import _ from "lodash";

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
  { id: 'V', sName: "抛射", eName: "Projectile Flight Speed", name: "抛射物飞行速度", prefix: "conci", subfix: "nak", noDmg: true },
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
  /** 武器中文名 */
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
  get star() { return [0, 0.7, 0.875, 1.125, 1.3, Infinity].findIndex(v => this.ratio < v); }
  get starText() { return _.repeat("●", this.star) + _.repeat("○", 5 - this.star); }
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
  // 步枪 Rifle
  ["Miter", "米特尔", "Rifle", 1.55, 105],
  ["Panthera", "猎豹", "Rifle", 1.5, 125],
  ["Flux Rifle", "通量射线步枪", "Rifle", 1.55, 85],
  ["Harpak", "哈帕克", "Rifle", 1.55, 85],
  ["Mutalist Quanta", "异融量子枪", "Rifle", 1.55, 85],
  ["Tetra", "特拉", "Rifle", 1.5, 70],
  ["Buzlok", "巴兹火枪", "Rifle", 1.45, 225],
  ["Phage", "噬菌者", "Shotgun", 1.46, 195],
  ["Deth Machine Rifle", "死亡机枪", "Rifle", 1.46, 35],
  ["Vulkar", "金工火神", "Rifle", 1.45, 310],
  ["Hind", "雌鹿", "Rifle", 1.42, 50],
  ["Attica", "阿提卡", "Rifle", 1.42, 140],
  ["Glaxion", "冷冻光束步枪", "Rifle", 1.35, 95],
  ["Stinger", "毒刺", "Rifle", 1.31, 45],
  ["Synapse", "突触生化枪", "Rifle", 1.31, 250],
  ["Paracyst", "附肢寄生者", "Rifle", 1.31, 70],
  ["Tiberon", "狂鲨", "Rifle", 1.3, 875],
  ["Karak", "卡拉克", "Rifle", 1.28, 140],
  ["Mutalist Cernos", "异融 西诺斯", "Rifle", 1.26, 140],
  ["Grinlok", "葛恩火枪", "Rifle", 1.25, 135],
  ["Dera", "德拉", "Rifle", 1.25, 85],
  ["Ogris", "食人女魔", "Rifle", 1.25, 105],
  ["Stradavar", "斯特拉迪瓦", "Rifle", 1.25, 110],
  ["Vulklok", "金工火枪", "Rifle", 1.25, 65],
  ["Quartakk", "夸塔克", "Rifle", 1.25, 175],
  ["Burston", "伯斯顿", "Rifle", 1.25, 75],
  ["Penta", "潘塔", "Rifle", 1.25, 105],
  ["Laser Rifle", "激光步枪", "Rifle", 1.21, 55],
  ["Daikyu", "大久和弓", "Rifle", 1.21, 120],
  ["Torid", "托里德", "Rifle", 1.2, 125],
  ["Gorgon", "蛇发女妖", "Rifle", 1.18, 180],
  ["Zhuge", "诸葛连弩", "Rifle", 1.18, 75],
  ["Snipetron", "狙击特昂", "Rifle", 1.165, 205],
  ["Opticor", "奥堤克光子枪", "Rifle", 1.15, 670],
  ["Grakata", "葛拉卡达", "Rifle", 1.15, 135],
  ["Latron", "拉特昂", "Rifle", 1.15, 170],
  ["Supra", "苏普拉", "Rifle", 1.1, 335],
  ["Baza", "苍鹰", "Rifle", 1.1, 325],
  ["Javlok", "燃焰标枪", "Rifle", 1.1, 80],
  ["Zenith", "天穹之顶", "Rifle", 1.1, 160],
  ["Ferrox", "铁晶磁轨炮", "Rifle", 1.1, 115],
  ["Veldt", "草原猎手", "Rifle", 1.1, 105],
  ["Scourge", "祸根", "Rifle", 1.1, 70],
  ["Hema", "血肢", "Rifle", 1.1, 145],
  ["Argonak", "氩格纳克", "Rifle", 1.1, 140],
  ["Quanta", "量子切割器", "Rifle", 1, 160],
  ["Nagantaka", "噬蛇弩", "Rifle", 1, 300],
  ["Battacor", "战使之力 (暂)", "Rifle", 1, 300],
  ["Zarr", "沙皇", "Rifle", 1.08, 325],
  ["Tenora", "双簧管", "Rifle", 1.05, 230],
  ["Paris", "帕里斯", "Rifle", 1.05, 125],
  ["Braton", "布莱顿", "Rifle", 1.01, 90],
  ["Artax", "阿塔克斯", "Rifle", 1, 21500],
  ["Rubico", "绝路", "Rifle", 0.95, 670],
  ["Lanka", "兰卡", "Rifle", 0.95, 1595],
  ["Vectis", "守望者", "Rifle", 0.92, 965],
  ["Cernos", "西诺斯", "Rifle", 0.92, 175],
  ["Lenz", "楞次弓", "Rifle", 0.9, 425],
  ["Sybaris", "席芭莉丝", "Rifle", 0.9, 270],
  ["Dread", "恐惧", "Rifle", 0.9, 250],
  ["Amprex", "安培克斯", "Rifle", 0.85, 560],
  ["Boltor", "螺钉步枪", "Rifle", 0.79, 195],
  ["Tonkor", "征服榴炮", "Rifle", 0.75, 90],
  ["Ignis", "伊格尼斯", "Rifle", 0.7, 320],
  ["Simulor", "重力奇点拟成枪", "Rifle", 0.7, 65],
  ["Soma", "月神", "Rifle", 0.55, 225],
  // 霰弹枪 Shotgun
  ["Drakgoon", "龙骑兵", "Shotgun", 1.48, 185],
  ["Convectrix", "导热聚焦枪", "Shotgun", 1.46, 105],
  ["Kohm", "寇恩热能枪", "Shotgun", 1.4, 725],
  ["Strun", "斯特朗", "Shotgun", 1.35, 285],
  ["Boar", "野猪", "Shotgun", 1.34, 230],
  ["Sobek", "鳄神", "Shotgun", 1.33, 250],
  ["Astilla", "碎裂者", "Shotgun", 1.1, 320],
  ["Sweeper", "扫除者", "Shotgun", 1, 120],
  ["Corinth", "科林斯", "Shotgun", 1.05, 460],
  ["Phantasma", "幻离子", "Shotgun", 1, 450],
  ["Arca Plasmor", "弧电离子枪", "Shotgun", 0.7, 860],
  ["Hek", "海克", "Shotgun", 0.7, 195],
  ["Tigris", "猛虎", "Shotgun", 0.5, 315],
  // 手枪 Pistol
  ["Kraken", "北海巨妖", "Pistol", 1.53, 30],
  ["Magnus", "麦格努斯", "Pistol", 1.53, 85],
  ["Aklato", "拉托双枪", "Pistol", 1.52, 125],
  ["Akzani", "荒谬双枪", "Pistol", 1.52, 45],
  ["Cestra", "锡斯特", "Pistol", 1.52, 55],
  ["Bolto", "螺钉手枪", "Pistol", 1.51, 55],
  ["Tysis", "啐沫者", "Pistol", 1.51, 75],
  ["Kunai", "苦无", "Pistol", 1.51, 40],
  ["Seer", "预言者", "Pistol", 1.5, 40],
  ["Spectra", "光谱切割器", "Pistol", 1.49, 45],
  ["Stug", "史特克", "Pistol", 1.48, 30],
  ["Nukor", "努寇微波枪", "Pistol", 1.45, 100],
  ["Embolist", "安柏勒斯", "Pistol", 1.45, 65],
  ["Burst Laser", "激光点发", "Pistol", 1.45, 55],
  ["Viper", "蝰蛇", "Pistol", 1.45, 80],
  ["Talons", "鹰爪", "Pistol", 1.44, 70],
  ["Akjagara", "觉醒双枪", "Pistol", 1.43, 360],
  ["Twin Vipers", "双子蝰蛇", "Pistol", 1.41, 70],
  ["Angstrum", "安格斯壮", "Pistol", 1.4, 80],
  ["Vasto", "瓦斯托", "Pistol", 1.4, 240],
  ["Lato", "拉托", "Pistol", 1.4, 375],
  ["Twin Gremlins", "双子小精灵", "Pistol", 1.4, 45],
  ["Sicarus", "暗杀者", "Pistol", 1.3, 550],
  ["Afuris", "盗贼双枪", "Pistol", 1.39, 95],
  ["Castanas", "雷爆信标", "Pistol", 1.35, 125],
  ["Furis", "盗贼", "Pistol", 1.35, 65],
  ["Acrid", "阿克里德", "Pistol", 1.33, 85],
  ["Akvasto", "瓦斯托双枪", "Pistol", 1.3, 115],
  ["Bronco", "野马", "Pistol", 1.3, 35],
  ["Dual Cestra", "锡斯特双枪", "Pistol", 1.3, 90],
  ["Despair", "绝望", "Pistol", 1.3, 85],
  ["Fusilai", "齐射玻刃", "Pistol", 1.3, 95],
  ["Kohmak", "寇恩霰机枪", "Pistol", 1.3, 50],
  ["Akmagnus", "麦格努斯双枪", "Pistol", 1.28, 90],
  ["Azima", "方位角", "Pistol", 1.25, 175],
  ["Stubba", "史度巴", "Pistol", 1.25, 75],
  ["Dual Toxocyst", "毒囊双枪", "Pistol", 1.25, 130],
  ["Aksomati", "轻灵月神双枪", "Pistol", 1.2, 165],
  ["Akbronco", "野马双枪", "Pistol", 1.2, 100],
  ["Kulstar", "杀星", "Pistol", 1.2, 105],
  ["Twin Kohmak", "双子寇恩霰机枪", "Pistol", 1.2, 90],
  ["Twin Rogga", "双子罗格", "Pistol", 1.15, 175],
  ["Knell", "丧钟", "Pistol", 1.15, 125],
  ["Cycron", "循环离子枪", "Pistol", 1.1, 85],
  ["Zakti", "毒芽", "Pistol", 1.1, 70],
  ["Hystrix", "豪猪", "Pistol", 1.05, 125],
  ["Arca Scisco", "弧电探知者", "Pistol", 1, 110],
  ["Pyrana", "食人鱼", "Pistol", 1, 910],
  ["Detron", "德特昂", "Pistol", 1, 190],
  ["Zylok", "席尔火枪", "Pistol", 1, 150],
  ["Ocucor", "视使之触 (暂)", "Pistol", 1, 120],

  ["Catchmoon", "捕月", "Pistol", 1, 300],
  ["Gaze", "凝目", "Pistol", 1, 300],
  ["Rattleguts", "响胆", "Pistol", 1, 300],
  ["Tombfinger", "墓指", "Pistol", 1, 300],

  ["Brakk", "布拉克", "Pistol", 0.95, 135],
  ["Ballistica", "布里斯提卡", "Pistol", 0.95, 90],
  ["Pandero", "手鼓", "Pistol", 0.95, 365],
  ["Pox", "脓痘", "Pistol", 0.95, 140],
  ["Aklex", "雷克斯双枪", "Pistol", 0.92, 315],
  ["Spira", "旋刃飞刀", "Pistol", 0.85, 70],
  ["Twin Grakatas", "双子葛拉卡达", "Pistol", 0.85, 125],
  ["Atomos", "原子矿融炮", "Pistol", 0.8, 190],
  ["Akbolto", "螺钉双枪", "Pistol", 0.8, 195],
  ["Hikou", "飞扬", "Pistol", 0.75, 70],
  ["Euphona Prime", "悦音 Prime", "Pistol", 0.7, 375],
  ["Gammacor", "咖玛腕甲枪", "Pistol", 0.65, 95],
  ["Marelok", "玛瑞火枪", "Pistol", 0.65, 125],
  ["Sonicor", "超音波冲击枪", "Pistol", 0.65, 75],
  ["Staticor", "静电能量导引枪", "Pistol", 0.53, 125],
  ["Akstiletto", "史提托双枪", "Pistol", 0.5, 165],
  ["Lex", "雷克斯", "Pistol", 0.5, 125],
  // 近战 Melee
  ["Amphis", "双头蛇", "Melee", 1.5, 65],
  ["Ether Daggers", "苍穹匕首", "Melee", 1.49, 35],
  ["Dark Sword", "暗黑长剑", "Melee", 1.48, 65],
  ["Cronus", "克洛诺斯", "Melee", 1.48, 50],
  ["Plasma Sword", "等离子长剑", "Melee", 1.48, 30],
  ["Heat Sword", "烈焰长剑", "Melee", 1.48, 35],
  ["Twin Krohkur", "双子克鲁古尔", "Melee", 1.48, 130],
  ["Dual Keres", "凯瑞斯双刀", "Melee", 1.48, 230],
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

  ["Kreska", "克雷斯卡直斧 (暂)", "Melee", 1, 300],
  ["Paracesis", "心智之殁", "Melee", 1, 300],
  ["Pupacyst", "毒囊骨茧", "Melee", 1, 70],
  ["Falcor", "猎鹰轮", "Melee", 1, 200],
  ["Mewan", "密丸", "Melee", 1, 140],
  ["Kronsh", "客隆什", "Melee", 1, 70],
  ["Ooltha", "乌尔萨", "Melee", 1, 110],
  ["Balla", "宝拉", "Melee", 1, 175],
  ["Dehtat", "德塔特", "Melee", 1, 160],
  ["Cyath", "西亚什", "Melee", 1, 170],
  ["Plague Keewar", "瘟疫 奇沃", "Melee", 1, 215],
  ["Plague Kripath", "瘟疫 克里帕丝", "Melee", 1, 445],
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
  ["Mios", "牡狮神", "Melee", 0.95, 195],
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
  ["Orthos", "欧特鲁斯", "Melee", 0.5, 150],

  // 技能武器 Exalted Weapon
  ["Regulators", "监察者双枪", "Pistol", 0, 0],
  ["Iron Staff", "定海神针", "Melee", 0, 0],
  ["Valkyr Talons", "Valkyr之爪", "Melee", 0, 0],
  ["Exalted Blade", "显赫刀剑", "Melee", 0, 0],
  ["Diwata", "仙女", "Melee", 0, 0],
  ["Artemis Bow", "月神狩弓", "Rifle", 0, 0],
  ["Dex Pixia", "Dex 妖精", "Pistol", 0, 0],
  ["Whipclaw", "长鞭利爪", "Melee", 0, 0],
  ["Shattered Lash", "琉璃碎击", "Melee", 0, 0],
] as [string, string, string, number, number][];
export const ModTypeTable = {
  "Rifle": "步枪",
  "Shotgun": "霰弹枪",
  "Pistol": "手枪",
  "Melee": "近战",
};

export const RivenWeaponDataBase = _rivenWeaponDataBase.map(v => new RivenWeapon(v[0], v[1], v[2], v[3], v[4]));

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
