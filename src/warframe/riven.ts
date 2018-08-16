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
  /** 武器裂罅倾向 */
  ratio: number;
  /** 武器MOD类型 */
  mod: string;
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
  constructor(id: string, name: string, ratio: number, mod: string) {
    this.id = id;
    this.name = name;
    this.ratio = ratio;
    this.mod = mod;
  }
}

const _rivenWeaponDataBase = [
  // 步枪
  ["Miter", "米特尔", 1.6, "Rifle"],
  ["Panthera", "猎豹", 1.55, "Rifle"],
  ["Flux Rifle", "通量射线步枪", 1.55, "Rifle"],
  ["Harpak", "哈帕克", 1.55, "Rifle"],
  ["Mutalist Quanta", "异融量子枪", 1.55, "Rifle"],
  ["Buzlok", "巴兹火枪", 1.55, "Rifle"],
  ["Tetra", "特拉", 1.5, "Rifle"],
  ["Phage", "噬菌者", 1.5, "Shotgun"],
  ["Deth Machine Rifle", "死亡机枪", 1.46, "Rifle"],
  ["Hind", "雌鹿", 1.42, "Rifle"],
  ["Attica", "阿提卡", 1.42, "Rifle"],
  ["Tiberon", "狂鲨", 1.4, "Rifle"],
  ["Vulkar", "金工火神", 1.38, "Rifle"],
  ["Glaxion", "冷冻光束步枪", 1.35, "Rifle"],
  ["Stinger", "毒刺", 1.31, "Rifle"],
  ["Paracyst", "附肢寄生者", 1.31, "Rifle"],
  ["Karak", "卡拉克", 1.28, "Rifle"],
  ["Grinlok", "葛恩火枪", 1.25, "Rifle"],
  ["Dera", "德拉", 1.25, "Rifle"],
  ["Ogris", "食人女魔", 1.25, "Rifle"],
  ["Stradalet", "斯特拉迪瓦", 1.25, "Rifle"],
  ["Synapse", "突触生化枪", 1.24, "Rifle"],
  ["Vulklok", "金工火枪", 1.245, "Rifle"],
  ["Laser Rifle", "激光步枪", 1.21, "Rifle"],
  ["Opticor", "奥堤克光子枪", 1.21, "Rifle"],
  ["Mutalist Cernos", "异融 西诺斯", 1.21, "Rifle"],
  ["Daikyu", "大久和弓", 1.21, "Rifle"],
  ["Quartakk", "夸塔克", 1.2, "Rifle"],
  ["Penta", "潘塔", 1.18, "Rifle"],
  ["Gorgon", "蛇发女妖", 1.18, "Rifle"],
  ["Burston", "伯斯顿", 1.175, "Rifle"],
  ["Snipetron", "狙击特昂", 1.165, "Rifle"],
  ["Supra", "苏普拉", 1.14, "Rifle"],
  ["Torid", "托里德", 1.14, "Rifle"],
  ["Rubico", "绝路", 1.105, "Rifle"],
  ["Lanka", "兰卡", 1.105, "Rifle"],
  ["Grakata", "葛拉卡达", 1.1, "Rifle"],
  ["Baza", "苍鹰", 1.1, "Rifle"],
  ["Zhuge", "诸葛连弩", 1.1, "Rifle"],
  ["Latron", "拉特昂", 1.07, "Rifle"],
  ["Javlok", "燃焰标枪", 1, "Rifle"],
  ["Tenora", "双簧管", 1, "Rifle"],
  ["Zenith", "天穹之顶", 1, "Rifle"],
  ["Ferrox", "铁晶磁轨炮", 1, "Rifle"],
  ["Veldt", "草原猎手", 1, "Rifle"],
  ["Scourge", "祸根", 1, "Rifle"],
  ["Hema", "血肢", 1, "Rifle"],
  ["Argonak", "氩格纳克", 1, "Rifle"],
  ["Vectis", "守望者", 1, "Rifle"],
  ["Artax", "阿塔克斯", 1, "Rifle"],
  ["Amprex", "安培克斯", 0.965, "Rifle"],
  ["Zarr", "沙皇", 0.96, "Rifle"],
  ["Braton", "布莱顿", 0.96, "Rifle"],
  ["Paris", "帕里斯", 0.96, "Rifle"],
  ["Quanta", "量子切割器", 0.9, "Rifle"],
  ["Lenz", "楞次弓", 0.9, "Rifle"],
  ["Cernos", "西诺斯", 0.86, "Rifle"],
  ["Sybaris", "席芭莉丝", 0.85, "Rifle"],
  ["Dread", "恐惧", 0.82, "Rifle"],
  ["Boltor", "螺钉步枪", 0.79, "Rifle"],
  ["Ignis", "伊格尼斯", 0.79, "Rifle"],
  ["Tonkor", "征服榴炮", 0.55, "Rifle"],
  ["Simulor", "重力奇点拟成枪", 0.5, "Rifle"],
  ["Soma", "月神", 0.5, "Rifle"],
  // 霰弹枪
  ["Drakgoon", "龙骑兵", 1.48, "Shotgun"],
  ["Convectrix", "导热聚焦枪", 1.45, "Shotgun"],
  ["Strun", "斯特朗", 1.4, "Shotgun"],
  ["Kohm", "寇恩热能枪", 1.4, "Shotgun"],
  ["Boar", "野猪", 1.34, "Shotgun"],
  ["Sobek", "鳄神", 1.33, "Shotgun"],
  ["Astilla", "碎裂者", 1.2, "Shotgun"],
  ["Sweeper", "扫除者", 1, "Shotgun"],
  ["Corinth", "科林斯", 1, "Shotgun"],
  ["Arca Plasmor", "弧电离子枪", 0.9, "Shotgun"],
  ["Tigris", "猛虎", 0.55, "Shotgun"],
  ["Hek", "海克", 0.55, "Shotgun"],
  // 手枪
  ["Vasto", "瓦斯托", 1.53, "Pistol"],
  ["Kraken", "北海巨妖", 1.53, "Pistol"],
  ["Magnus", "麦格努斯", 1.53, "Pistol"],
  ["Viper", "蝰蛇", 1.53, "Pistol"],
  ["Aklato", "拉托双枪", 1.52, "Pistol"],
  ["Akzani", "荒谬双枪", 1.52, "Pistol"],
  ["Cestra", "锡斯特", 1.52, "Pistol"],
  ["Bolto", "螺钉手枪", 1.51, "Pistol"],
  ["Tysis", "啐沫者", 1.51, "Pistol"],
  ["Lato", "拉托", 1.51, "Pistol"],
  ["Kunai", "苦无", 1.51, "Pistol"],
  ["Seer", "预言者", 1.5, "Pistol"],
  ["Twin Gremlins", "双子小精灵", 1.5, "Pistol"],
  ["Spectra", "光谱切割器", 1.49, "Pistol"],
  ["Stug", "史特克", 1.48, "Pistol"],
  ["Nukor", "努寇微波枪", 1.45, "Pistol"],
  ["Embolist", "安柏勒斯", 1.45, "Pistol"],
  ["Burst Laser", "激光点发", 1.45, "Pistol"],
  ["Talons", "鹰爪", 1.44, "Pistol"],
  ["Akjagara", "觉醒双枪", 1.43, "Pistol"],
  ["Castanas", "雷爆信标", 1.42, "Pistol"],
  ["Twin Vipers", "双子蝰蛇", 1.41, "Pistol"],
  ["Angstrum", "安格斯壮", 1.4, "Pistol"],
  ["Sicarus", "暗杀者", 1.4, "Pistol"],
  ["Afuris", "盗贼双枪", 1.39, "Pistol"],
  ["Furis", "盗贼", 1.35, "Pistol"],
  ["Dual Cestra", "锡斯特双枪", 1.35, "Pistol"],
  ["Azima", "方位角", 1.35, "Pistol"],
  ["Acrid", "阿克里德", 1.33, "Pistol"],
  ["Akmagnus", "麦格努斯双枪", 1.28, "Pistol"],
  ["Aksomati", "轻灵月神双枪", 1.26, "Pistol"],
  ["Stubba", "史度巴", 1.25, "Pistol"],
  ["Despair", "绝望", 1.24, "Pistol"],
  ["Fusilai", "齐射玻刃", 1.2, "Pistol"],
  ["Kohmak", "寇恩霰机枪", 1.2, "Pistol"],
  ["Bronco", "野马", 1.2, "Pistol"],
  ["Akbronco", "野马双枪", 1.2, "Pistol"],
  ["Dual Toxocyst", "毒囊双枪", 1.19, "Pistol"],
  ["Akvasto", "瓦斯托双枪", 1.15, "Pistol"],
  ["Pyrana", "食人鱼", 1.1, "Pistol"],
  ["Kulstar", "杀星", 1.1, "Pistol"],
  ["Twin Kohmak", "双子寇恩霰机枪", 1.1, "Pistol"],
  ["Twin Rogga", "双子罗格", 1, "Pistol"],
  ["Pandero", "手鼓", 1, "Pistol"],
  ["Zakti", "毒芽", 1, "Pistol"],
  ["Hystrix", "猬刺", 1, "Pistol"],
  ["Knell", "丧钟", 1, "Pistol"],
  ["Arca Scisco", "弧电探知者", 1, "Pistol"],
  ["Cycron", "循环离子枪", 1, "Pistol"],
  ["Detron", "德特昂", 1, "Pistol"],
  ["Aklex", "雷克斯双枪", 1, "Pistol"],
  ["Atomos", "原子矿融炮", 0.87, "Pistol"],
  ["Akbolto", "螺钉双枪", 0.85, "Pistol"],
  ["Ballistica", "布里斯提卡", 0.85, "Pistol"],
  ["Pox", "脓痘", 0.82, "Pistol"],
  ["Twin Grakatas", "双子葛拉卡达", 0.76, "Pistol"],
  ["Brakk", "布拉克", 0.75, "Pistol"],
  ["Hikou", "飞扬", 0.69, "Pistol"],
  ["Euphona Prime", "悦音 Prime", 0.69, "Pistol"],
  ["Spira", "旋刃飞刀", 0.66, "Pistol"],
  ["Gammacor", "咖玛腕甲枪", 0.53, "Pistol"],
  ["Staticor", "静电能量导引枪", 0.53, "Pistol"],
  ["Marelok", "玛瑞火枪", 0.5, "Pistol"],
  ["Akstiletto", "史提托双枪", 0.5, "Pistol"],
  ["Lex", "雷克斯", 0.5, "Pistol"],
  ["Sonicor", "超音波冲击枪", 0.5, "Pistol"],
  // 近战
  ["Amphis", "双头蛇", 1.5, "Melee"],
  ["Ether Daggers", "苍穹匕首", 1.49, "Melee"],
  ["Dark Sword", "暗黑长剑", 1.48, "Melee"],
  ["Cronus", "克洛诺斯", 1.48, "Melee"],
  ["Plasma Sword", "等离子长剑", 1.48, "Melee"],
  ["Heat Sword", "烈焰长剑", 1.48, "Melee"],
  ["Twin Krohkur", "双子克鲁古尔", 1.48, "Melee"],
  ["Dual Keres", "双持凯瑞斯", 1.48, "Melee"],
  ["Dual Skana", "空刃双刀", 1.48, "Melee"],
  ["Jaw Sword", "蛇颚刀", 1.47, "Melee"],
  ["Pangolin Sword", "鲮鲤剑", 1.47, "Melee"],
  ["Kama", "短柄战镰", 1.47, "Melee"],
  ["Anku", "夺魂死神", 1.46, "Melee"],
  ["Kogake", "科加基", 1.46, "Melee"],
  ["Dual Ether", "苍穹双剑", 1.45, "Melee"],
  ["Machete", "马谢特砍刀", 1.45, "Melee"],
  ["Ankyros", "甲龙双拳", 1.45, "Melee"],
  ["Ether Reaper", "苍穹死神", 1.45, "Melee"],
  ["Kestrel", "红隼", 1.45, "Melee"],
  ["Halikar", "哈利卡", 1.44, "Melee"],
  ["Dual Zoren", "佐伦双斧", 1.44, "Melee"],
  ["Ether Sword", "苍穹之剑", 1.44, "Melee"],
  ["Heat Dagger", "烈焰短剑", 1.44, "Melee"],
  ["Dual Heat Swords", "烈焰双剑", 1.44, "Melee"],
  ["Gram", "格拉姆", 1.44, "Melee"],
  ["Ceramic Dagger", "陶瓷匕首", 1.43, "Melee"],
  ["Kronen", "皇家拐刃", 1.43, "Melee"],
  ["Mire", "米尔", 1.43, "Melee"],
  ["Nami Solo", "海波单剑", 1.43, "Melee"],
  ["Ninkondi", "降灵追猎者", 1.41, "Melee"],
  ["Tekko", "铁钩手甲", 1.4, "Melee"],
  ["Dual Raza", "锋月双斧", 1.4, "Melee"],
  ["Tonbo", "蜻蛉薙", 1.38, "Melee"],
  ["Serro", "电能斩锯", 1.38, "Melee"],
  ["Ripkas", "锐卡斯", 1.38, "Melee"],
  ["Furax", "弗拉克斯", 1.38, "Melee"],
  ["Fang", "狼牙", 1.36, "Melee"],
  ["Cerata", "裸鳃刃", 1.36, "Melee"],
  ["Hate", "憎恨", 1.36, "Melee"],
  ["Dragon Nikana", "龙之侍刃", 1.35, "Melee"],
  ["Shaku", "双节尺棍", 1.35, "Melee"],
  ["Sibear", "西伯利亚冰锤", 1.35, "Melee"],
  ["Gazal Machete", "加扎勒反曲刀", 1.35, "Melee"],
  ["Scoliac", "嵴椎节鞭", 1.32, "Melee"],
  ["Okina", "翁", 1.31, "Melee"],
  ["Tipedo", "提佩多", 1.31, "Melee"],
  ["Lacera", "悲痛之刃", 1.31, "Melee"],
  ["Caustacyst", "灼蚀变体镰", 1.3, "Melee"],
  ["Prova", "普罗沃", 1.29, "Melee"],
  ["Bo", "玻之武杖", 1.29, "Melee"],
  ["Karyst", "凯洛斯特", 1.29, "Melee"],
  ["Reaper Prime", "收割者 Prime", 1.29, "Melee"],
  ["Deconstructor", "分离", 1.25, "Melee"],
  ["Sheev", "希芙", 1.25, "Melee"],
  ["Kesheg", "怯薛", 1.24, "Melee"],
  ["Sarpa", "蛇刃", 1.24, "Melee"],
  ["Skana", "空刃", 1.22, "Melee"],
  ["Krohkur", "克鲁古尔", 1.22, "Melee"],
  ["Glaive", "战刃", 1.22, "Melee"],
  ["Dark Split-Sword", "暗黑分合剑", 1.21, "Melee"],
  ["Volnus", "创伤", 1.2, "Melee"],
  ["Broken Scepter", "破损珽杖", 1.19, "Melee"],
  ["Twin Basolk", "双子巴萨克", 1.18, "Melee"],
  ["Nami Skyla", "海波斯库拉对剑", 1.175, "Melee"],
  ["Redeemer", "救赎者", 1.17, "Melee"],
  ["Dual Ichor", "恶脓双斧", 1.16, "Melee"],
  ["Orvius", "灵枢", 1.15, "Melee"],
  ["Dakra Prime", "达克拉 Prime", 1.15, "Melee"],
  ["Dex Dakra", "DEX 达克拉双剑", 1.15, "Melee"],
  ["Destreza", "技巧之剑", 1.14, "Melee"],
  ["Obex", "奥比克斯", 1.1, "Melee"],
  ["Magistar", "执法者", 1.09, "Melee"],

  ["Mewan", "密丸", 1, "Melee"],
  ["Kronsh", "客隆什", 1, "Melee"],
  ["Ooltha", "乌尔萨", 1, "Melee"],
  ["Balla", "宝拉", 1, "Melee"],
  ["Dehtat", "德塔特", 1, "Melee"],
  ["Cyath", "西亚什", 1, "Melee"],
  ["Plague Keewar", "瘟疫 奇沃", 1, "Melee"],
  ["Plague Kripath", "瘟疫 克里帕丝", 0.862, "Melee"],

  ["Gunsen", "军扇", 1, "Melee"],
  ["Silva & Aegis", "席瓦 & 神盾", 1, "Melee"],
  ["Sigma & Octantis", "西格玛 & 南极座", 1, "Melee"],
  ["Dual Cleavers", "斩肉双刀", 1, "Melee"],
  ["Arca Titron", "弧电振子锤", 1, "Melee"],
  ["Endura", "三叶坚韧", 1, "Melee"],
  ["Scindo", "分裂斩斧", 1, "Melee"],
  ["Sephahn", "瑟普梵", 1, "Melee"],
  ["Cassowar", "鹤鸵长戟", 1, "Melee"],
  ["Boltace", "螺钉拐刃", 1, "Melee"],
  ["Rabvee", "拉比威", 1, "Melee"],
  ["Dokrahm", "多克拉姆", 1, "Melee"],
  ["Skiajati", "影生", 1, "Melee"],
  ["Ohma", "欧玛", 0.97, "Melee"],
  ["Fragor", "重击巨锤", 0.96, "Melee"],
  ["Mios", "牝狮神", 0.95, "Melee"],
  ["Heliocor", "赫利俄光锤", 0.94, "Melee"],
  ["Guandao", "关刀", 0.9, "Melee"],
  ["Ack & Brunt", "认知 & 冲击", 0.9, "Melee"],
  ["Sydon", "恶龙", 0.84, "Melee"],
  ["Jat Kusar", "喷射锁镰", 0.81, "Melee"],
  ["Dual Kamas", "双短柄战镰", 0.81, "Melee"],
  ["Broken War", "破碎的战争之剑", 0.79, "Melee"],
  ["Jat Kittag", "喷射战锤", 0.75, "Melee"],
  ["War", "战争之剑", 0.5, "Melee"],
  ["Atterax", "阿特拉克斯", 0.5, "Melee"],
  ["Dark Dagger", "暗黑匕首", 0.5, "Melee"],
  ["Galatine", "迦伦提恩", 0.5, "Melee"],
  ["Lesion", "病变", 0.5, "Melee"],
  ["Hirudo", "蚂蝗", 0.5, "Melee"],
  ["Zenistar", "天顶之星", 0.5, "Melee"],
  ["Lecta", "勒克塔", 0.5, "Melee"],
  ["Venka", "凯旋之爪", 0.5, "Melee"],
  ["Nikana", "侍刃", 0.5, "Melee"],
  ["Orthos", "欧特鲁斯", 0.5, "Melee"]
] as [string, string, number, string][];
export const ModTypeTable = {
  "Rifle": "步枪",
  "Shotgun": "霰弹枪",
  "Pistol": "手枪",
  "Melee": "近战",
};

export const RivenWeaponDataBase = _rivenWeaponDataBase.map(v => new RivenWeapon(v[0], v[1], v[2], v[3]));


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
