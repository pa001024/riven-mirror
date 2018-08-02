import { strSimilarity } from "@/warframe/util"
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
  prefix: string;
  subfix: string;
  onlyPositive?: boolean;
  nopercent?: boolean;
  negative?: boolean;
  noDmg?: boolean;
}

const baseProperty: RivenProperty[] = [
  { id: '0', name: "暴击率", prefix: "crita", subfix: "cron" },
  { id: '1', name: "暴击伤害", prefix: "acri", subfix: "tis" },
  { id: '2', name: "触发几率", prefix: "hexa", subfix: "dex", noDmg: true },
  { id: '3', name: "触发时间", prefix: "deci", subfix: "des", noDmg: true },
  { id: '4', name: "火焰伤害", prefix: "igni", subfix: "pha", onlyPositive: true },
  { id: '5', name: "冰冻伤害", prefix: "geli", subfix: "do", onlyPositive: true },
  { id: '6', name: "毒素伤害", prefix: "toxi", subfix: "tox", onlyPositive: true },
  { id: '7', name: "电击伤害", prefix: "vexi", subfix: "tio", onlyPositive: true },
  { id: '8', name: "冲击伤害", prefix: "magna", subfix: "ton" },
  { id: '9', name: "穿刺伤害", prefix: "insi", subfix: "cak" },
  { id: 'A', name: "切割伤害", prefix: "sci", subfix: "sus" },
  { id: 'G', name: "对Grineer伤害", prefix: "argi", subfix: "con" },
  { id: 'I', name: "对Infested伤害", prefix: "pura", subfix: "ada" },
  { id: 'C', name: "对Corpus伤害", prefix: "manti", subfix: "tron" },
  { id: 'O', name: "对堕落者伤害", prefix: "unknown", subfix: "unknown" },
];

const gunProperty: RivenProperty[] = [
  { id: 'D', name: "伤害", prefix: "visi", subfix: "ata" },
  { id: 'S', name: "多重射击", prefix: "sati", subfix: "can" },
  { id: 'R', name: "射速（弓类武器效果加倍）", prefix: "croni", subfix: "dra" },
  { id: 'L', name: "弹匣容量", prefix: "arma", subfix: "tin" },
  { id: 'F', name: "装填速度", prefix: "feva", subfix: "tak" },
  { id: 'M', name: "弹药最大值", prefix: "ampi", subfix: "bin", noDmg: true },
  { id: 'P', name: "穿透", prefix: "lexi", subfix: "nok", onlyPositive: true, nopercent: true, noDmg: true },
  { id: 'H', name: "变焦", prefix: "hera", subfix: "lis", noDmg: true },
  { id: 'V', name: "抛射物飞行速度", prefix: "conci", subfix: "nak", noDmg: true },
  { id: 'Z', name: "后坐力", prefix: "zeti", subfix: "mag", negative: true, noDmg: true },
];

const meleeProperty: RivenProperty[] = [
  { id: 'K', name: "近战伤害", prefix: "visi", subfix: "ata" },
  { id: 'T', name: "攻击范围", prefix: "locti", subfix: "tor", noDmg: true },
  { id: 'J', name: "攻击速度", prefix: "croni", subfix: "dra" },
  { id: 'B', name: "充能伤害", prefix: "tori", subfix: "bo", noDmg: true },
  { id: 'U', name: "充能效率", prefix: "uti", subfix: "tia", noDmg: true },
  { id: 'N', name: "连击持续时间", prefix: "tempi", subfix: "nem", nopercent: true, noDmg: true },
  { id: 'E', name: "滑行攻击造成暴击几率", prefix: "pleci", subfix: "nent" },
  { id: 'X', name: "处决伤害", prefix: "exi", subfix: "cta", noDmg: true },
];

export const RivenPropertyDataBase: { [key: string]: RivenProperty[] } = {
  gun: baseProperty.concat(gunProperty),
  melee: baseProperty.concat(meleeProperty),
  all: baseProperty.concat(gunProperty, meleeProperty),
};

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
    R: 9,   // 射速（弓类武器效果加倍）
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
    R: 7.5, // 射速（弓类武器效果加倍）
    L: 5,   // 弹匣容量
    F: 5,   // 装填速度
    M: 5,   // 弹药最大值
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
 * 武器属性及裂罅倾向
 * Data from https://wfaw.richasy.cn/
 */
export interface RivenWeapon {
  /** 武器英文名 */
  id: string;
  /** 武器中文名 */
  name: string;
  /** 武器裂罅倾向 */
  ratio: number;
  /** 武器MOD类型 */
  mod: string;
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
  ["Sicarus", "暗杀者", 1.5, "Pistol"],
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
  ["Afuris", "盗贼双枪", 1.39, "Pistol"],
  ["Furis", "盗贼", 1.35, "Pistol"],
  ["Dual Cestra", "锡斯特双枪", 1.35, "Pistol"],
  ["Azima", "方位角", 1.35, "Pistol"],
  ["Acrid", "阿克里德", 1.33, "Pistol"],
  ["Akmagnus", "麦格努斯双枪", 1.28, "Pistol"],
  ["Aksomati", "轻灵月神双枪", 1.26, "Pistol"],
  ["Stubba", "史度巴", 1.25, "Pistol"],
  ["Despair", "绝望", 1.24, "Pistol"],
  ["Pyrana", "食人鱼", 1.2, "Pistol"],
  ["Fusilai", "齐射玻刃", 1.2, "Pistol"],
  ["Kohmak", "寇恩霰机枪", 1.2, "Pistol"],
  ["Bronco", "野马", 1.2, "Pistol"],
  ["Akbronco", "野马双枪", 1.2, "Pistol"],
  ["Dual Toxocyst", "毒囊双枪", 1.19, "Pistol"],
  ["Akvasto", "瓦斯托双枪", 1.15, "Pistol"],
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
  ["Euphona Prime", "悦音 Prime", 0.66, "Pistol"],
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
  ["Plague Keewar", "瘟疫 奇沃", 1, "Melee"],
  ["Cyath", "西亚什", 1, "Melee"],
  ["Plague Kripath", "瘟疫 克里帕丝", 0.93, "Melee"],

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
];
export const RivenWeaponDataBase = _rivenWeaponDataBase.map(v => ({
  id: v[0],
  name: v[1],
  ratio: v[2],
  mod: v[3],
} as RivenWeapon));


/**
 * 武器信息
 */
export interface Weapon {
  id: string;
  name: string;
  rivenName?: string;
  tags: string[];
  dmg: [string, number][];
  criticalMultiplier: number;
  criticalChances: number;
  fireRate: number;
  status: number;
}
/**
 * 枪武器信息
 */
export interface GunWeapon extends Weapon {
  accuracy: number;
  bullets: number;
  magazine: number;
  reload: number;
  ammo: number;
}
/**
 * 近战武器信息
 */
export interface MeleeWeapon extends Weapon {
  slideDmg: number;
}
/*
Data from https://warframe.huijiwiki.com/wiki/%E6%A8%A1%E5%9D%97:Weapons/data

*/
export const GunWeaponDataBase: GunWeapon[] = [
  {
    "name": "阿克里德", "tags": ["枪", "手枪"],
    "id": "Acrid",
    "dmg": [["Toxin", 35]],
    "accuracy": 100, "bullets": 1, "fireRate": 6.7,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 10, "magazine": 15, "reload": 1.2, "ammo": 210
  }, {
    "name": "盗贼双枪", "tags": ["枪", "手枪"],
    "id": "Afuris",
    "dmg": [["Slash", 3], ["Puncture", 14], ["Impact", 3]],
    "accuracy": 8.7, "bullets": 1, "fireRate": 12.5,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 8, "magazine": 70, "reload": 2.8, "ammo": 210
  }, {
    "name": "螺钉双枪", "tags": ["枪", "手枪"],
    "id": "Akbolto",
    "dmg": [["Puncture", 40.5], ["Impact", 4.5]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 10,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 7.5, "magazine": 30, "reload": 2.6, "ammo": 210
  }, {
    "name": "螺钉双枪 Prime", "tags": ["枪", "手枪"],
    "id": "Akbolto Prime", "rivenName": "Akbolto",
    "dmg": [["Slash", 1.3], ["Puncture", 27.5], ["Impact", 3.2]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 7,
    "criticalChances": 36, "criticalMultiplier": 2.8,
    "status": 14, "magazine": 40, "reload": 1.3, "ammo": 210
  }, {
    "name": "野马双枪", "tags": ["枪", "手枪"],
    "id": "Akbronco",
    "dmg": [["Slash", 28], ["Puncture", 28], ["Impact", 224]],
    "accuracy": 3.7, "bullets": 7, "fireRate": 8.33,
    "criticalChances": 6, "criticalMultiplier": 2,
    "status": 22, "magazine": 4, "reload": 2.25, "ammo": 210
  }, {
    "name": "野马双枪 Prime", "tags": ["枪", "手枪"],
    "id": "Akbronco Prime", "rivenName": "Akbronco",
    "dmg": [["Slash", 35], ["Puncture", 35], ["Impact", 280]],
    "accuracy": 3.7, "bullets": 7, "fireRate": 4.33,
    "criticalChances": 6, "criticalMultiplier": 2,
    "status": 30, "magazine": 8, "reload": 2.25, "ammo": 210
  }, {
    "name": "觉醒双枪", "tags": ["枪", "手枪"],
    "id": "Akjagara",
    "dmg": [["Slash", 21], ["Puncture", 4.5], ["Impact", 4.5]],
    "accuracy": 8.7, "bullets": 2, "fireRate": 8.333,
    "criticalChances": 6, "criticalMultiplier": 2,
    "status": 28, "magazine": 36, "reload": 2.3, "ammo": 210
  }, {
    "name": "拉托双枪", "tags": ["枪", "手枪"],
    "id": "Aklato",
    "dmg": [["Slash", 18], ["Puncture", 7.5], ["Impact", 4.5]],
    "accuracy": 11.1, "bullets": 1, "fireRate": 8.3,
    "criticalChances": 10, "criticalMultiplier": 1.8,
    "status": 6, "magazine": 30, "reload": 2.4, "ammo": 210
  }, {
    "name": "雷克斯双枪", "tags": ["枪", "手枪"],
    "id": "Aklex",
    "dmg": [["Slash", 13], ["Puncture", 104], ["Impact", 13]],
    "accuracy": 9.8, "bullets": 1, "fireRate": 2,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 15, "magazine": 12, "reload": 3, "ammo": 210
  }, {
    "name": "雷克斯双枪 Prime", "tags": ["枪", "手枪"],
    "id": "Aklex Prime", "rivenName": "Aklex",
    "dmg": [["Slash", 15], ["Puncture", 120], ["Impact", 15]],
    "accuracy": 9.8, "bullets": 1, "fireRate": 2.67,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 25, "magazine": 16, "reload": 3, "ammo": 210
  }, {
    "name": "麦格努斯双枪", "tags": ["枪", "手枪"],
    "id": "Akmagnus",
    "dmg": [["Slash", 20.9], ["Puncture", 20.9], ["Impact", 34.2]],
    "accuracy": 11.1, "bullets": 1, "fireRate": 6.17,
    "criticalChances": 22, "criticalMultiplier": 2,
    "status": 22, "magazine": 16, "reload": 2.4, "ammo": 210
  }, {
    "name": "轻灵月神双枪", "tags": ["枪", "手枪"],
    "id": "Aksomati",
    "dmg": [["Slash", 9], ["Puncture", 7.2], ["Impact", 1.8]],
    "accuracy": 8.7, "bullets": 1, "fireRate": 12.5,
    "criticalChances": 24, "criticalMultiplier": 3,
    "status": 8, "magazine": 70, "reload": 1.4, "ammo": 420
  }, {
    "name": "史提托双枪", "tags": ["枪", "手枪"],
    "id": "Akstiletto",
    "dmg": [["Slash", 8.4], ["Puncture", 2.8], ["Impact", 16.8]],
    "accuracy": 23.5, "bullets": 1, "fireRate": 10,
    "criticalChances": 18, "criticalMultiplier": 1.8,
    "status": 18, "magazine": 28, "reload": 1.1, "ammo": 210
  }, {
    "name": "史提托双枪 Prime", "tags": ["枪", "手枪"],
    "id": "Akstiletto Prime", "rivenName": "Akstiletto",
    "dmg": [["Slash", 10.8], ["Puncture", 3.6], ["Impact", 21.6]],
    "accuracy": 23.5, "bullets": 1, "fireRate": 7.08,
    "criticalChances": 15, "criticalMultiplier": 2,
    "status": 30, "magazine": 40, "reload": 1.1, "ammo": 210
  }, {
    "name": "瓦斯托双枪", "tags": ["枪", "手枪"],
    "id": "Akvasto",
    "dmg": [["Slash", 29], ["Puncture", 14.5], ["Impact", 14.5]],
    "accuracy": 11.1, "bullets": 1, "fireRate": 8.67,
    "criticalChances": 16, "criticalMultiplier": 1.8,
    "status": 12, "magazine": 12, "reload": 2, "ammo": 210
  }, {
    "name": "荒谬双枪", "tags": ["枪", "手枪"],
    "id": "Akzani",
    "dmg": [["Slash", 1.8], ["Puncture", 8.4], ["Impact", 1.8]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 20,
    "criticalChances": 14, "criticalMultiplier": 2,
    "status": 14, "magazine": 100, "reload": 2, "ammo": 400
  }, {
    "name": "安培克斯", "tags": ["枪", "主要武器", "步枪", "突击步枪", "射线"],
    "id": "Amprex",
    "dmg": [["Electric", 22]],
    "accuracy": 12.5, "bullets": 1, "fireRate": 12,
    "criticalChances": 32, "criticalMultiplier": 2.2,
    "status": 22, "magazine": 100, "reload": 2.6, "ammo": 700
  }, {
    "name": "安格斯壮", "tags": ["枪", "手枪", "发射器", "发射器"],
    "id": "Angstrum",
    "dmg": [["Cold", 225], ["Heat", 225]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 1,
    "criticalChances": 16, "criticalMultiplier": 2,
    "status": 22, "magazine": 3, "reload": 2.5, "ammo": 18
  }, {
    "name": "弧电离子枪", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Arca Plasmor",
    "dmg": [["Electric", 300], ["Heat", 300]],
    "accuracy": 9.1, "bullets": 1, "fireRate": 1.1,
    "criticalChances": 22, "criticalMultiplier": 1.6,
    "status": 28, "magazine": 10, "reload": 2.8, "ammo": 48
  }, {
    "name": "弧电探知者", "tags": ["枪", "手枪"],
    "id": "Arca Scisco",
    "dmg": [["Slash", 24], ["Puncture", 36]],
    "accuracy": 32, "bullets": 1, "fireRate": 4.67,
    "criticalChances": 18, "criticalMultiplier": 1.6,
    "status": 26, "magazine": 36, "reload": 2.2, "ammo": 288
  }, {
    "name": "氩格纳克", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Argonak",
    "dmg": [["Slash", 26.2], ["Puncture", 6.3], ["Impact", 24.5]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 4.33,
    "criticalChances": 9, "criticalMultiplier": 1.5,
    "status": 27, "magazine": 43, "reload": 2.4, "ammo": 540
  }, {
    "name": "氩格纳克 (蓄力)", "tags": ["枪", "主要武器", "步枪", "突击步枪", "蓄力"],
    "id": "Argonak (charged)", "rivenName": "Argonak",
    "dmg": [["Slash", 26.2], ["Puncture", 6.3], ["Impact", 24.5]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 4.33,
    "criticalChances": 27, "criticalMultiplier": 2.3,
    "status": 19, "magazine": 43, "reload": 2.4, "ammo": 540
  }, {
    "name": "月神狩弓", "tags": ["枪", "技能武器", "弓"],
    "id": "Artemis Bow",
    "dmg": [["Slash", 14.4], ["Puncture", 192], ["Impact", 33.6]],
    "accuracy": 100, "bullets": 7, "fireRate": 1.11,
    "criticalChances": 25, "criticalMultiplier": 2.5,
    "status": 20, "magazine": 1, "reload": 0.9, "ammo": 72
  }, {
    "name": "碎裂者", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Astilla",
    "dmg": [["Slash", 78], ["Puncture", 42], ["Impact", 70]],
    "accuracy": 25, "bullets": 1, "fireRate": 4.33,
    "criticalChances": 17, "criticalMultiplier": 1.9,
    "status": 33, "magazine": 16, "reload": 2, "ammo": 210
  }, {
    "name": "原子矿融炮", "tags": ["枪", "手枪", "射线"],
    "id": "Atomos",
    "dmg": [["Heat", 50]],
    "accuracy": 12.5, "bullets": 1, "fireRate": 8,
    "criticalChances": 15, "criticalMultiplier": 1.7,
    "status": 21, "magazine": 70, "reload": 2, "ammo": 300
  }, {
    "name": "阿提卡", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Attica",
    "dmg": [["Slash", 16], ["Puncture", 60], ["Impact", 4]],
    "accuracy": 40, "bullets": 1, "fireRate": 3.67,
    "criticalChances": 25, "criticalMultiplier": 3,
    "status": 10, "magazine": 20, "reload": 2.8, "ammo": 540
  }, {
    "name": "方位角", "tags": ["枪", "手枪"],
    "id": "Azima",
    "dmg": [["Slash", 13], ["Puncture", 5], ["Impact", 2]],
    "accuracy": 15.4, "bullets": 1, "fireRate": 10,
    "criticalChances": 16, "criticalMultiplier": 2,
    "status": 16, "magazine": 75, "reload": 1.4, "ammo": 525
  }, {
    "name": "苍鹰", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Baza",
    "dmg": [["Slash", 3.5], ["Puncture", 6.7], ["Impact", 5.8]],
    "accuracy": 80, "bullets": 1, "fireRate": 16.67,
    "criticalChances": 26, "criticalMultiplier": 3,
    "status": 10, "magazine": 40, "reload": 1.4, "ammo": 800
  }, {
    "name": "野猪", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Boar",
    "dmg": [["Slash", 52.8], ["Puncture", 26.4], ["Impact", 96.8]],
    "accuracy": 5, "bullets": 8, "fireRate": 4.17,
    "criticalChances": 10, "criticalMultiplier": 1.5,
    "status": 20, "magazine": 20, "reload": 2.7, "ammo": 120
  }, {
    "name": "野猪 Prime", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Boar Prime", "rivenName": "Boar",
    "dmg": [["Slash", 64], ["Puncture", 48], ["Impact", 208]],
    "accuracy": 5, "bullets": 8, "fireRate": 4.67,
    "criticalChances": 15, "criticalMultiplier": 2,
    "status": 30, "magazine": 20, "reload": 2.8, "ammo": 120
  }, {
    "name": "螺钉手枪", "tags": ["枪", "手枪"],
    "id": "Bolto",
    "dmg": [["Puncture", 40.5], ["Impact", 4.5]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 6.8,
    "criticalChances": 5, "criticalMultiplier": 2.5,
    "status": 7.5, "magazine": 15, "reload": 1.3, "ammo": 210
  }, {
    "name": "螺钉步枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Boltor",
    "dmg": [["Slash", 2.5], ["Puncture", 20], ["Impact", 2.5]],
    "accuracy": 25, "bullets": 1, "fireRate": 8.75,
    "criticalChances": 10, "criticalMultiplier": 1.8,
    "status": 14, "magazine": 60, "reload": 2.6, "ammo": 540
  }, {
    "name": "螺钉步枪 Prime", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Boltor Prime", "rivenName": "Boltor",
    "dmg": [["Puncture", 41.4], ["Impact", 4.6]],
    "accuracy": 50, "bullets": 1, "fireRate": 10,
    "criticalChances": 12, "criticalMultiplier": 2,
    "status": 32, "magazine": 60, "reload": 2.4, "ammo": 540
  }, {
    "name": "布拉克", "tags": ["枪", "手枪"],
    "id": "Brakk",
    "dmg": [["Slash", 60], ["Puncture", 50], ["Impact", 90]],
    "accuracy": 5.6, "bullets": 10, "fireRate": 5,
    "criticalChances": 17, "criticalMultiplier": 2,
    "status": 17, "magazine": 5, "reload": 1.05, "ammo": 210
  }, {
    "name": "布莱顿", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Braton",
    "dmg": [["Slash", 8.2], ["Puncture", 7.9], ["Impact", 7.9]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 8.75,
    "criticalChances": 12, "criticalMultiplier": 1.6,
    "status": 6, "magazine": 45, "reload": 2, "ammo": 540
  }, {
    "name": "布莱顿 Prime", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Braton Prime", "rivenName": "Braton",
    "dmg": [["Slash", 21], ["Puncture", 12.25], ["Impact", 1.75]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 9.58,
    "criticalChances": 12, "criticalMultiplier": 2,
    "status": 26, "magazine": 75, "reload": 2.2, "ammo": 600
  }, {
    "name": "布莱顿 破坏者", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Braton Vandal", "rivenName": "Braton",
    "dmg": [["Slash", 21], ["Puncture", 1.75], ["Impact", 12.25]],
    "accuracy": 33.3, "bullets": 1, "fireRate": 7.5,
    "criticalChances": 16, "criticalMultiplier": 2,
    "status": 16, "magazine": 50, "reload": 1.8, "ammo": 550
  }, {
    "name": "野马", "tags": ["枪", "手枪"],
    "id": "Bronco",
    "dmg": [["Slash", 28], ["Puncture", 28], ["Impact", 224]],
    "accuracy": 3.7, "bullets": 7, "fireRate": 5,
    "criticalChances": 6, "criticalMultiplier": 2,
    "status": 22, "magazine": 2, "reload": 1.05, "ammo": 210
  }, {
    "name": "野马 Prime", "tags": ["枪", "手枪"],
    "id": "Bronco Prime", "rivenName": "Bronco",
    "dmg": [["Slash", 35], ["Puncture", 35], ["Impact", 280]],
    "accuracy": 3.7, "bullets": 7, "fireRate": 4.17,
    "criticalChances": 6, "criticalMultiplier": 2,
    "status": 30, "magazine": 4, "reload": 2, "ammo": 210
  }, {
    "name": "伯斯顿", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Burston",
    "dmg": [["Slash", 10], ["Puncture", 10], ["Impact", 10]],
    "accuracy": 25, "bullets": 1, "fireRate": 8.197,
    "criticalChances": 6, "criticalMultiplier": 1.6,
    "status": 18, "magazine": 45, "reload": 2, "ammo": 540
  }, {
    "name": "伯斯顿 Prime", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Burston Prime", "rivenName": "Burston",
    "dmg": [["Slash", 14.4], ["Puncture", 10.8], ["Impact", 10.8]],
    "accuracy": 25, "bullets": 1, "fireRate": 8.573,
    "criticalChances": 18, "criticalMultiplier": 1.8,
    "status": 30, "magazine": 45, "reload": 2, "ammo": 540
  }, {
    "name": "巴兹火枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Buzlok",
    "dmg": [["Slash", 6], ["Puncture", 24], ["Impact", 30]],
    "accuracy": 13.3, "bullets": 1, "fireRate": 6.25,
    "criticalChances": 23, "criticalMultiplier": 2.5,
    "status": 21, "magazine": 50, "reload": 3, "ammo": 540
  }, {
    "name": "雷爆信标", "tags": ["枪", "手枪"],
    "id": "Castanas",
    "dmg": [["Electric", 160]],
    "accuracy": 100, "bullets": 1, "fireRate": 5,
    "criticalChances": 8, "criticalMultiplier": 1.5,
    "status": 22, "magazine": 2, "reload": 1, "ammo": 18
  }, {
    "name": "西诺斯", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Cernos",
    "dmg": [["Slash", 5.5], ["Puncture", 5.5], ["Impact", 99]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1.67,
    "criticalChances": 18, "criticalMultiplier": 1.5,
    "status": 18, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "西诺斯 (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Cernos (charged)", "rivenName": "Cernos",
    "dmg": [["Slash", 11], ["Puncture", 11], ["Impact", 198]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 36, "criticalMultiplier": 2,
    "status": 18, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "西诺斯 Prime", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Cernos Prime", "rivenName": "Cernos",
    "dmg": [["Slash", 9], ["Puncture", 9], ["Impact", 162]],
    "accuracy": 16.7, "bullets": 3, "fireRate": 1,
    "criticalChances": 35, "criticalMultiplier": 2,
    "status": 30, "magazine": 1, "reload": 1, "ammo": 72
  }, {
    "name": "西诺斯 Prime (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Cernos Prime (charged)", "rivenName": "Cernos",
    "dmg": [["Slash", 6], ["Puncture", 6], ["Impact", 108]],
    "accuracy": 16.7, "bullets": 3, "fireRate": 2,
    "criticalChances": 35, "criticalMultiplier": 2,
    "status": 10, "magazine": 1, "reload": 0.65, "ammo": 72
  }, {
    "name": "锡斯特", "tags": ["枪", "手枪"],
    "id": "Cestra",
    "dmg": [["Puncture", 20], ["Impact", 5]],
    "accuracy": 33.3, "bullets": 1, "fireRate": 8.33,
    "criticalChances": 6, "criticalMultiplier": 1.6,
    "status": 20, "magazine": 60, "reload": 2, "ammo": 420
  }, {
    "name": "导热聚焦枪", "tags": ["枪", "主要武器", "霰弹枪", "射线"],
    "id": "Convectrix",
    "dmg": [["Slash", 19.2], ["Puncture", 2.4], ["Impact", 2.4]],
    "accuracy": 50, "bullets": 1, "fireRate": 12,
    "criticalChances": 16, "criticalMultiplier": 2.4,
    "status": 30, "magazine": 70, "reload": 2, "ammo": 700
  }, {
    "name": "科林斯", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Corinth",
    "dmg": [["Slash", 162], ["Puncture", 226.8], ["Impact", 151.2]],
    "accuracy": 9.1, "bullets": 1, "fireRate": 1.17,
    "criticalChances": 30, "criticalMultiplier": 2.8,
    "status": 12, "magazine": 5, "reload": 2.3, "ammo": 132
  }, {
    "name": "循环离子枪", "tags": ["枪", "手枪", "射线"],
    "id": "Cycron",
    "dmg": [["Electric", 5], ["Heat", 5], ["Slash", 5], ["Puncture", 8]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 12, "criticalMultiplier": 1.8,
    "status": 30, "magazine": 40, "reload": 1, "ammo": 40
  }, {
    "name": "大久和弓", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Daikyu",
    "dmg": [["Slash", 138], ["Puncture", 184], ["Impact", 138]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 50, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "德拉", "tags": ["枪", "主要武器", "步枪"],
    "id": "Dera",
    "dmg": [["Slash", 1.5], ["Puncture", 22.5], ["Impact", 6]],
    "accuracy": 100, "bullets": 1, "fireRate": 11.25,
    "criticalChances": 8, "criticalMultiplier": 1.65,
    "status": 22, "magazine": 45, "reload": 1.8, "ammo": 540
  }, {
    "name": "德拉 破坏者", "tags": ["枪", "主要武器", "步枪"],
    "id": "Dera Vandal", "rivenName": "Dera",
    "dmg": [["Slash", 1.6], ["Puncture", 24], ["Impact", 6.4]],
    "accuracy": 100, "bullets": 1, "fireRate": 11.25,
    "criticalChances": 8, "criticalMultiplier": 2,
    "status": 30, "magazine": 60, "reload": 1.8, "ammo": 540
  }, {
    "name": "绝望", "tags": ["枪", "手枪", "飞镖"],
    "id": "Despair",
    "dmg": [["Slash", 8.7], ["Puncture", 46.4], ["Impact", 2.9]],
    "accuracy": 100, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 16, "criticalMultiplier": 1.6,
    "status": 16, "magazine": 10, "reload": 0.8, "ammo": 210
  }, {
    "name": "德特昂", "tags": ["枪", "手枪"],
    "id": "Detron",
    "dmg": [["Electric", 140], ["Heat", 140]],
    "accuracy": 7.1, "bullets": 7, "fireRate": 3.33,
    "criticalChances": 4, "criticalMultiplier": 1.5,
    "status": 30, "magazine": 5, "reload": 1.05, "ammo": 210
  }, {
    "name": "Dex 盗贼双枪", "tags": ["枪", "手枪"],
    "id": "Dex Furis", "rivenName": "Furis",
    "dmg": [["Slash", 2.4], ["Puncture", 11.2], ["Impact", 2.4]],
    "accuracy": 8.7, "bullets": 1, "fireRate": 20,
    "criticalChances": 14, "criticalMultiplier": 2,
    "status": 28, "magazine": 100, "reload": 2, "ammo": 400
  }, {
    "name": "Dex 妖精", "tags": ["枪", "技能武器", "手枪"],
    "id": "Dex Pixia",
    "dmg": [["Slash", 128], ["Puncture", 16], ["Impact", 16]],
    "accuracy": 23, "bullets": 1, "fireRate": 5.83,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 25, "magazine": 60, "reload": 1.2, "ammo": 210
  }, {
    "name": "Dex 席芭莉丝", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Dex Sybaris", "rivenName": "Sybaris",
    "dmg": [["Slash", 33.75], ["Puncture", 18.75], ["Impact", 22.5]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 4.264,
    "criticalChances": 35, "criticalMultiplier": 2,
    "status": 10, "magazine": 14, "reload": 1.5, "ammo": 540
  }, {
    "name": "龙骑兵", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Drakgoon",
    "dmg": [["Slash", 276], ["Puncture", 34.5], ["Impact", 34.5]],
    "accuracy": 1.4, "bullets": 10, "fireRate": 3.33,
    "criticalChances": 7.5, "criticalMultiplier": 2,
    "status": 23, "magazine": 7, "reload": 2.3, "ammo": 120
  }, {
    "name": "龙骑兵 (蓄力)", "tags": ["枪", "主要武器", "霰弹枪", "蓄力"],
    "id": "Drakgoon (charged)", "rivenName": "Drakgoon",
    "dmg": [["Slash", 560], ["Puncture", 70], ["Impact", 70]],
    "accuracy": 1.4, "bullets": 10, "fireRate": 2,
    "criticalChances": 7.5, "criticalMultiplier": 2,
    "status": 23, "magazine": 7, "reload": 2.3, "ammo": 210
  }, {
    "name": "恐惧", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Dread",
    "dmg": [["Slash", 117], ["Puncture", 6.5], ["Impact", 6.5]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1.43,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 20, "magazine": 1, "reload": 0.7, "ammo": 72
  }, {
    "name": "恐惧 (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Dread (charged)", "rivenName": "Dread",
    "dmg": [["Slash", 180], ["Puncture", 10], ["Impact", 10]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 50, "criticalMultiplier": 2,
    "status": 20, "magazine": 1, "reload": 0.7, "ammo": 72
  }, {
    "name": "锡斯特双枪", "tags": ["枪", "手枪"],
    "id": "Dual Cestra",
    "dmg": [["Puncture", 20], ["Impact", 5]],
    "accuracy": 20, "bullets": 1, "fireRate": 12.5,
    "criticalChances": 6, "criticalMultiplier": 1.6,
    "status": 20, "magazine": 120, "reload": 3.5, "ammo": 480
  }, {
    "name": "毒囊双枪", "tags": ["枪", "手枪"],
    "id": "Dual Toxocyst",
    "dmg": [["Slash", 7.5], ["Puncture", 60], ["Impact", 7.5]],
    "accuracy": 16, "bullets": 1, "fireRate": 1,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 37, "magazine": 12, "reload": 2.3, "ammo": 210
  }, {
    "name": "安柏勒斯", "tags": ["枪", "手枪", "射线"],
    "id": "Embolist",
    "dmg": [["Toxin", 35]],
    "accuracy": 100, "bullets": 1, "fireRate": 8,
    "criticalChances": 3, "criticalMultiplier": 1.5,
    "status": 41, "magazine": 33, "reload": 1.3, "ammo": 210
  }, {
    "name": "悦音 Prime", "tags": ["枪", "手枪"],
    "id": "Euphona Prime",
    "dmg": [["Slash", 16.25], ["Puncture", 16.25], ["Impact", 292.5]],
    "accuracy": 100, "bullets": 1, "fireRate": 1.5,
    "criticalChances": 30, "criticalMultiplier": 2.5,
    "status": 2, "magazine": 5, "reload": 2, "ammo": 210
  }, {
    "name": "铁晶磁轨炮", "tags": ["枪", "主要武器", "突击步枪", "步枪"],
    "id": "Ferrox",
    "dmg": [["Slash", 70], ["Puncture", 245], ["Impact", 35]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 32, "criticalMultiplier": 2.8,
    "status": 10, "magazine": 10, "reload": 1.8, "ammo": 540
  }, {
    "name": "通量射线步枪", "tags": ["枪", "主要武器", "步枪", "突击步枪", "射线"],
    "id": "Flux Rifle",
    "dmg": [["Slash", 17.2], ["Puncture", 4.8]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 24, "magazine": 50, "reload": 1.25, "ammo": 50
  }, {
    "name": "盗贼", "tags": ["枪", "手枪"],
    "id": "Furis",
    "dmg": [["Slash", 2.9], ["Puncture", 14], ["Impact", 3.1]],
    "accuracy": 15.4, "bullets": 1, "fireRate": 10,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 12, "magazine": 35, "reload": 1.4, "ammo": 210
  }, {
    "name": "齐射玻刃", "tags": ["枪", "手枪", "飞镖"],
    "id": "Fusilai",
    "dmg": [["Slash", 46.2], ["Puncture", 30.8]],
    "accuracy": 100, "bullets": 1, "fireRate": 2.83,
    "criticalChances": 23, "criticalMultiplier": 1.7,
    "status": 29, "magazine": 6, "reload": 0.8, "ammo": 72
  }, {
    "name": "咖玛腕甲枪", "tags": ["枪", "手枪"],
    "id": "Gammacor",
    "dmg": [["Electric", 8], ["Cold", 8]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 8, "criticalMultiplier": 1.8,
    "status": 20, "magazine": 60, "reload": 1.4, "ammo": 240
  }, {
    "name": "冷冻光束步枪", "tags": ["枪", "主要武器", "步枪"],
    "id": "Glaxion",
    "dmg": [["Cold", 26]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 8, "criticalMultiplier": 2,
    "status": 34, "magazine": 80, "reload": 2.2, "ammo": 720
  }, {
    "name": "蛇发女妖", "tags": ["枪", "主要武器", "步枪"],
    "id": "Gorgon",
    "dmg": [["Slash", 2.5], ["Puncture", 3.8], ["Impact", 18.8]],
    "accuracy": 12.5, "bullets": 1, "fireRate": 12.5,
    "criticalChances": 17, "criticalMultiplier": 1.5,
    "status": 9, "magazine": 90, "reload": 4.2, "ammo": 540
  }, {
    "name": "蛇发女妖 亡魂", "tags": ["枪", "主要武器", "步枪"],
    "id": "Gorgon Wraith", "rivenName": "Gorgon",
    "dmg": [["Slash", 1.3], ["Puncture", 2.7], ["Impact", 23]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 13.3,
    "criticalChances": 15, "criticalMultiplier": 1.9,
    "status": 21, "magazine": 90, "reload": 3, "ammo": 900
  }, {
    "name": "葛拉卡达", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Grakata",
    "dmg": [["Slash", 2.9], ["Puncture", 3.7], ["Impact", 4.4]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 20,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 20, "magazine": 60, "reload": 2.4, "ammo": 750
  }, {
    "name": "葛恩火枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Grinlok",
    "dmg": [["Slash", 74.8], ["Puncture", 18.7], ["Impact", 93.5]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 1.7,
    "criticalChances": 15, "criticalMultiplier": 2.5,
    "status": 35, "magazine": 9, "reload": 1.7, "ammo": 540
  }, {
    "name": "哈帕克", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Harpak",
    "dmg": [["Slash", 7.5], ["Puncture", 37.5], ["Impact", 5]],
    "accuracy": 18.2, "bullets": 1, "fireRate": 6,
    "criticalChances": 20, "criticalMultiplier": 2.3,
    "status": 17, "magazine": 45, "reload": 2, "ammo": 540
  }, {
    "name": "哈帕克 (蓄力)", "tags": ["枪", "主要武器", "步枪", "突击步枪", "蓄力"],
    "id": "Harpak (charged)", "rivenName": "Harpak",
    "dmg": [["Slash", 10], ["Puncture", 50], ["Impact", 40]],
    "accuracy": 18.2, "bullets": 1, "fireRate": 1.5,
    "criticalChances": 20, "criticalMultiplier": 2.3,
    "status": 17, "magazine": 45, "reload": 2, "ammo": 540
  }, {
    "name": "海克", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Hek",
    "dmg": [["Slash", 105], ["Puncture", 341.3], ["Impact", 78.8]],
    "accuracy": 9.1, "bullets": 7, "fireRate": 2.17,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 25, "magazine": 4, "reload": 2, "ammo": 120
  }, {
    "name": "血肢", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Hema",
    "dmg": [["Toxin", 23.5], ["Cold", 23.5]],
    "accuracy": 20, "bullets": 1, "fireRate": 6,
    "criticalChances": 11, "criticalMultiplier": 2,
    "status": 25, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "飞扬", "tags": ["枪", "手枪", "飞镖"],
    "id": "Hikou",
    "dmg": [["Slash", 7.5], ["Puncture", 15], ["Impact", 2.5]],
    "accuracy": 100, "bullets": 1, "fireRate": 6.67,
    "criticalChances": 4, "criticalMultiplier": 1.6,
    "status": 12, "magazine": 20, "reload": 0.8, "ammo": 210
  }, {
    "name": "飞扬 Prime", "tags": ["枪", "手枪", "飞镖"],
    "id": "Hikou Prime", "rivenName": "Hikou",
    "dmg": [["Slash", 1.8], ["Puncture", 30.6], ["Impact", 3.6]],
    "accuracy": 100, "bullets": 1, "fireRate": 5.83,
    "criticalChances": 6, "criticalMultiplier": 1.8,
    "status": 28, "magazine": 26, "reload": 0.5, "ammo": 210
  }, {
    "name": "雌鹿", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Hind",
    "dmg": [["Slash", 15], ["Puncture", 7.5], ["Impact", 7.5]],
    "accuracy": 33.3, "bullets": 1, "fireRate": 7.693,
    "criticalChances": 7, "criticalMultiplier": 1.5,
    "status": 15, "magazine": 65, "reload": 2, "ammo": 540
  }, {
    "name": "猬刺", "tags": ["枪", "手枪"],
    "id": "Hystrix",
    "dmg": [["Slash", 2.9], ["Puncture", 31], ["Impact", 2.2]],
    "accuracy": 14.3, "bullets": 1, "fireRate": 7,
    "criticalChances": 24, "criticalMultiplier": 2.2,
    "status": 10, "magazine": 15, "reload": 1.7, "ammo": 210
  }, {
    "name": "伊格尼斯", "tags": ["枪", "主要武器", "步枪", "突击步枪", "射线"],
    "id": "Ignis",
    "dmg": [["Heat", 33]],
    "accuracy": 100, "bullets": 1, "fireRate": 8,
    "criticalChances": 11, "criticalMultiplier": 2,
    "status": 27, "magazine": 150, "reload": 2, "ammo": 750
  }, {
    "name": "伊格尼斯 亡魂", "tags": ["枪", "主要武器", "步枪", "突击步枪", "射线"],
    "id": "Ignis Wraith", "rivenName": "Ignis",
    "dmg": [["Heat", 35]],
    "accuracy": 100, "bullets": 1, "fireRate": 8,
    "criticalChances": 17, "criticalMultiplier": 2.5,
    "status": 29, "magazine": 200, "reload": 1.7, "ammo": 800
  }, {
    "name": "燃焰标枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Javlok",
    "dmg": [["Heat", 280]],
    "accuracy": 100, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 25, "magazine": 6, "reload": 1.9, "ammo": 540
  }, {
    "name": "卡拉克", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Karak",
    "dmg": [["Slash", 7.3], ["Puncture", 8.7], ["Impact", 13]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 11.7,
    "criticalChances": 9, "criticalMultiplier": 1.5,
    "status": 15, "magazine": 30, "reload": 2, "ammo": 540
  }, {
    "name": "卡拉克 亡魂", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Karak Wraith", "rivenName": "Karak",
    "dmg": [["Slash", 7.8], ["Puncture", 9.3], ["Impact", 14.1]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 11.7,
    "criticalChances": 13, "criticalMultiplier": 2,
    "status": 25, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "丧钟", "tags": ["枪", "手枪"],
    "id": "Knell",
    "dmg": [["Slash", 18], ["Puncture", 69], ["Impact", 63]],
    "accuracy": 32, "bullets": 1, "fireRate": 1,
    "criticalChances": 20, "criticalMultiplier": 1.5,
    "status": 5, "magazine": 1, "reload": 1, "ammo": 10
  }, {
    "name": "寇恩热能枪", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Kohm",
    "dmg": [["Slash", 18], ["Puncture", 6], ["Impact", 6]],
    "accuracy": 3.67, "bullets": 1, "fireRate": 3.67,
    "criticalChances": 11, "criticalMultiplier": 2.3,
    "status": 25, "magazine": 245, "reload": 2, "ammo": 960
  }, {
    "name": "寇恩霰机枪", "tags": ["枪", "手枪"],
    "id": "Kohmak",
    "dmg": [["Slash", 90], ["Puncture", 30], ["Impact", 30]],
    "accuracy": 3.6, "bullets": 1, "fireRate": 5,
    "criticalChances": 11, "criticalMultiplier": 2,
    "status": 23, "magazine": 40, "reload": 2, "ammo": 210
  }, {
    "name": "北海巨妖", "tags": ["枪", "手枪"],
    "id": "Kraken",
    "dmg": [["Slash", 6.1], ["Puncture", 6.1], ["Impact", 36.8]],
    "accuracy": 16, "bullets": 1, "fireRate": 2.8,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 13, "magazine": 14, "reload": 2.5, "ammo": 210
  }, {
    "name": "杀星", "tags": ["枪", "手枪", "发射器"],
    "id": "Kulstar",
    "dmg": [["Cold", 150], ["Heat", 150], ["Impact", 200]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 17, "criticalMultiplier": 2.3,
    "status": 19, "magazine": 3, "reload": 2, "ammo": 15
  }, {
    "name": "苦无", "tags": ["枪", "手枪", "飞镖"],
    "id": "Kunai",
    "dmg": [["Slash", 6.9], ["Puncture", 34.5], ["Impact", 4.6]],
    "accuracy": 100, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 8, "criticalMultiplier": 1.6,
    "status": 8, "magazine": 10, "reload": 0.8, "ammo": 210
  }, {
    "name": "兰卡", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Lanka",
    "dmg": [["Electric", 200]],
    "accuracy": 100, "bullets": 1, "fireRate": 1,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 25, "magazine": 10, "reload": 2, "ammo": 72
  }, {
    "name": "兰卡 (蓄力)", "tags": ["枪", "主要武器", "步枪", "狙击枪", "蓄力"],
    "id": "Lanka (charged)", "rivenName": "Lanka",
    "dmg": [["Electric", 525]],
    "accuracy": 100, "bullets": 1, "fireRate": 1,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 25, "magazine": 10, "reload": 2, "ammo": 72
  }, {
    "name": "拉托", "tags": ["枪", "手枪"],
    "id": "Lato",
    "dmg": [["Slash", 15], ["Puncture", 7.5], ["Impact", 7.5]],
    "accuracy": 18.2, "bullets": 1, "fireRate": 6.67,
    "criticalChances": 10, "criticalMultiplier": 1.8,
    "status": 6, "magazine": 15, "reload": 1, "ammo": 210
  }, {
    "name": "拉托 Prime", "tags": ["枪", "手枪"],
    "id": "Lato Prime", "rivenName": "Lato",
    "dmg": [["Slash", 33.6], ["Puncture", 9.6], ["Impact", 4.8]],
    "accuracy": 18.2, "bullets": 1, "fireRate": 6.67,
    "criticalChances": 30, "criticalMultiplier": 2,
    "status": 20, "magazine": 15, "reload": 1, "ammo": 210
  }, {
    "name": "拉托 破坏者", "tags": ["枪", "手枪"],
    "id": "Lato Vandal", "rivenName": "Lato",
    "dmg": [["Slash", 27.6], ["Puncture", 11.5], ["Impact", 6.9]],
    "accuracy": 23, "bullets": 1, "fireRate": 5,
    "criticalChances": 26, "criticalMultiplier": 2.4,
    "status": 10, "magazine": 15, "reload": 1, "ammo": 210
  }, {
    "name": "拉特昂", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Latron",
    "dmg": [["Slash", 8.2], ["Puncture", 38.5], ["Impact", 8.3]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 4.17,
    "criticalChances": 12, "criticalMultiplier": 2,
    "status": 12, "magazine": 15, "reload": 2.4, "ammo": 540
  }, {
    "name": "拉特昂 Prime", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Latron Prime", "rivenName": "Latron",
    "dmg": [["Slash", 9], ["Puncture", 72], ["Impact", 9]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 4.17,
    "criticalChances": 22, "criticalMultiplier": 2.8,
    "status": 26, "magazine": 15, "reload": 2.4, "ammo": 540
  }, {
    "name": "拉特昂 亡魂", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Latron Wraith", "rivenName": "Latron",
    "dmg": [["Slash", 3], ["Puncture", 42], ["Impact", 15]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 5.42,
    "criticalChances": 26, "criticalMultiplier": 2.8,
    "status": 14, "magazine": 14, "reload": 2.4, "ammo": 540
  }, {
    "name": "楞次弓", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Lenz",
    "dmg": [["Cold", 10], ["Cold", 330], ["Heat", 330], ["Impact", 50]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 0.83,
    "criticalChances": 50, "criticalMultiplier": 2,
    "status": 5, "magazine": 1, "reload": 0.6, "ammo": 6
  }, {
    "name": "雷克斯", "tags": ["枪", "手枪"],
    "id": "Lex",
    "dmg": [["Slash", 13], ["Puncture", 104], ["Impact", 13]],
    "accuracy": 16, "bullets": 1, "fireRate": 1.08,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 10, "magazine": 6, "reload": 2.35, "ammo": 210
  }, {
    "name": "雷克斯 Prime", "tags": ["枪", "手枪"],
    "id": "Lex Prime", "rivenName": "Lex",
    "dmg": [["Slash", 15], ["Puncture", 120], ["Impact", 15]],
    "accuracy": 16, "bullets": 1, "fireRate": 2.1,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 25, "magazine": 8, "reload": 2.3, "ammo": 210
  }, {
    "name": "麦格努斯", "tags": ["枪", "手枪"],
    "id": "Magnus",
    "dmg": [["Slash", 20.9], ["Puncture", 20.9], ["Impact", 34.2]],
    "accuracy": 16, "bullets": 1, "fireRate": 5.83,
    "criticalChances": 22, "criticalMultiplier": 2,
    "status": 22, "magazine": 8, "reload": 1.4, "ammo": 210
  }, {
    "name": "苦痛 德特昂", "tags": ["枪", "手枪"],
    "id": "Mara Detron", "rivenName": "Detron",
    "dmg": [["Electric", 140], ["Heat", 140]],
    "accuracy": 13.3, "bullets": 7, "fireRate": 3.33,
    "criticalChances": 8, "criticalMultiplier": 1.5,
    "status": 32, "magazine": 8, "reload": 1.05, "ammo": 120
  }, {
    "name": "玛瑞火枪", "tags": ["枪", "手枪"],
    "id": "Marelok",
    "dmg": [["Slash", 64], ["Puncture", 16], ["Impact", 80]],
    "accuracy": 10, "bullets": 1, "fireRate": 2,
    "criticalChances": 15, "criticalMultiplier": 1.5,
    "status": 30, "magazine": 6, "reload": 1.7, "ammo": 210
  }, {
    "name": "米特尔", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Miter",
    "dmg": [["Slash", 112.5], ["Puncture", 6.25], ["Impact", 6.25]],
    "accuracy": 100, "bullets": 1, "fireRate": 2.5,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 25, "magazine": 20, "reload": 2, "ammo": 72
  }, {
    "name": "米特尔 (蓄力)", "tags": ["枪", "主要武器", "步枪", "突击步枪", "蓄力"],
    "id": "Miter (charged)", "rivenName": "Miter",
    "dmg": [["Slash", 225], ["Puncture", 12.5], ["Impact", 12.5]],
    "accuracy": 100, "bullets": 1, "fireRate": 1.33,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 50, "magazine": 20, "reload": 2, "ammo": 72
  }, {
    "name": "MK1-布莱顿", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "MK1-Braton", "rivenName": "Braton",
    "dmg": [["Slash", 9], ["Puncture", 4.5], ["Impact", 4.5]],
    "accuracy": 40, "bullets": 1, "fireRate": 7.5,
    "criticalChances": 8, "criticalMultiplier": 1.5,
    "status": 5, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "MK1-盗贼", "tags": ["枪", "手枪"],
    "id": "MK1-Furis", "rivenName": "Furis",
    "dmg": [["Slash", 1.9], ["Puncture", 9.1], ["Impact", 2]],
    "accuracy": 15.4, "bullets": 1, "fireRate": 8.3,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 1, "magazine": 35, "reload": 1.4, "ammo": 210
  }, {
    "name": "MK1-苦无", "tags": ["枪", "手枪", "飞镖"],
    "id": "MK1-Kunai", "rivenName": "Kunai",
    "dmg": [["Slash", 6], ["Puncture", 30], ["Impact", 4]],
    "accuracy": 100, "bullets": 1, "fireRate": 3.3,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 2.5, "magazine": 10, "reload": 0.8, "ammo": 210
  }, {
    "name": "MK1-帕里斯", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "MK1-Paris", "rivenName": "Paris",
    "dmg": [["Slash", 9], ["Puncture", 49], ["Impact", 3]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1.67,
    "criticalChances": 30, "criticalMultiplier": 1.5,
    "status": 10, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "MK1-帕里斯 (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "MK1-Paris (charged)", "rivenName": "Paris",
    "dmg": [["Slash", 18], ["Puncture", 96], ["Impact", 6]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 30, "criticalMultiplier": 2,
    "status": 10, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "MK1-斯特朗", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "MK1-Strun", "rivenName": "Strun",
    "dmg": [["Slash", 54], ["Puncture", 27], ["Impact", 99]],
    "accuracy": 4, "bullets": 10, "fireRate": 2.08,
    "criticalChances": 7.5, "criticalMultiplier": 2,
    "status": 20, "magazine": 6, "reload": 0, "ammo": 120
  }, {
    "name": "异融 西诺斯", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Mutalist Cernos",
    "dmg": [["Slash", 5.63], ["Puncture", 5.63], ["Impact", 101.25]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1.67,
    "criticalChances": 15, "criticalMultiplier": 2,
    "status": 49, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "异融 西诺斯 (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Mutalist Cernos (charged)", "rivenName": "Mutalist Cernos",
    "dmg": [["Slash", 11.25], ["Puncture", 11.25], ["Impact", 202.5]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 15, "criticalMultiplier": 2,
    "status": 49, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "异融量子枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Mutalist Quanta",
    "dmg": [["Slash", 7.5], ["Puncture", 15], ["Impact", 2.5]],
    "accuracy": 100, "bullets": 1, "fireRate": 10,
    "criticalChances": 2.5, "criticalMultiplier": 1.5,
    "status": 15, "magazine": 60, "reload": 3, "ammo": 540
  }, {
    "name": "努寇微波枪", "tags": ["枪", "手枪", "射线"],
    "id": "Nukor",
    "dmg": [["Electric", 11], ["Heat", 11]],
    "accuracy": 100, "bullets": 1, "fireRate": 10,
    "criticalChances": 3, "criticalMultiplier": 4,
    "status": 29, "magazine": 50, "reload": 2, "ammo": 210
  }, {
    "name": "食人女魔", "tags": ["枪", "主要武器", "步枪", "突击步枪", "发射器"],
    "id": "Ogris",
    "dmg": [["Cold", 50], ["Heat", 50]],
    "accuracy": 100, "bullets": 1, "fireRate": 1.5,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 35, "magazine": 5, "reload": 2.5, "ammo": 20
  }, {
    "name": "食人女魔 (蓄力)", "tags": ["枪", "主要武器", "步枪", "突击步枪", "发射器", "蓄力"],
    "id": "Ogris (charged)", "rivenName": "Ogris",
    "dmg": [["Cold", 300], ["Heat", 300]],
    "accuracy": 100, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 35, "magazine": 5, "reload": 2.5, "ammo": 20
  }, {
    "name": "奥堤克光子枪", "tags": ["枪", "主要武器", "步枪", "突击步枪", "蓄力"],
    "id": "Opticor",
    "dmg": [["Slash", 50], ["Puncture", 850], ["Impact", 100]],
    "accuracy": 100, "bullets": 1, "fireRate": 0.5,
    "criticalChances": 20, "criticalMultiplier": 2.5,
    "status": 20, "magazine": 5, "reload": 2, "ammo": 540
  }, {
    "name": "手鼓", "tags": ["枪", "手枪"],
    "id": "Pandero",
    "dmg": [["Slash", 36], ["Puncture", 18], ["Impact", 18]],
    "accuracy": 16, "bullets": 1, "fireRate": 3,
    "criticalChances": 30, "criticalMultiplier": 2.8,
    "status": 10, "magazine": 8, "reload": 1, "ammo": 210
  }, {
    "name": "猎豹", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Panthera",
    "dmg": [["Slash", 70], ["Puncture", 10], ["Impact", 20]],
    "accuracy": 100, "bullets": 1, "fireRate": 3,
    "criticalChances": 12, "criticalMultiplier": 2,
    "status": 24, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "附肢寄生者", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Paracyst",
    "dmg": [["Toxin", 33]],
    "accuracy": 25, "bullets": 1, "fireRate": 6.04,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 30, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "帕里斯", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Paris",
    "dmg": [["Slash", 18], ["Puncture", 96], ["Impact", 6]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1.54,
    "criticalChances": 15, "criticalMultiplier": 1.5,
    "status": 10, "magazine": 1, "reload": 0.65, "ammo": 72
  }, {
    "name": "帕里斯 (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Paris (charged)", "rivenName": "Paris",
    "dmg": [["Slash", 27], ["Puncture", 144], ["Impact", 9]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 30, "criticalMultiplier": 2,
    "status": 10, "magazine": 1, "reload": 0.7, "ammo": 72
  }, {
    "name": "帕里斯 Prime", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Paris Prime", "rivenName": "Paris",
    "dmg": [["Slash", 22.75], ["Puncture", 104], ["Impact", 3.25]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1.43,
    "criticalChances": 22.5, "criticalMultiplier": 2,
    "status": 20, "magazine": 1, "reload": 0.7, "ammo": 72
  }, {
    "name": "帕里斯 Prime (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Paris Prime (charged)", "rivenName": "Paris",
    "dmg": [["Slash", 45.5], ["Puncture", 208], ["Impact", 6.5]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 2,
    "criticalChances": 45, "criticalMultiplier": 2,
    "status": 20, "magazine": 1, "reload": 0.7, "ammo": 72
  }, {
    "name": "潘塔", "tags": ["枪", "主要武器", "步枪", "突击步枪", "发射器"],
    "id": "Penta",
    "dmg": [["Cold", 175], ["Heat", 175], ["Impact", 75]],
    "accuracy": 100, "bullets": 1, "fireRate": 1,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 10, "magazine": 5, "reload": 2.5, "ammo": 20
  }, {
    "name": "噬菌者", "tags": ["枪", "主要武器", "霰弹枪", "射线"],
    "id": "Phage",
    "dmg": [["Toxin", 15], ["Cold", 15]],
    "accuracy": 50, "bullets": 1, "fireRate": 12,
    "criticalChances": 19, "criticalMultiplier": 2,
    "status": 31, "magazine": 90, "reload": 2, "ammo": 120
  }, {
    "name": "脓痘", "tags": ["枪", "手枪", "飞镖"],
    "id": "Pox",
    "dmg": [["Toxin", 150]],
    "accuracy": 100, "bullets": 1, "fireRate": 2.08,
    "criticalChances": 1, "criticalMultiplier": 2,
    "status": 35, "magazine": 4, "reload": 1, "ammo": 20
  }, {
    "name": "棱晶 安格斯壮", "tags": ["枪", "手枪", "发射器"],
    "id": "Prisma Angstrum", "rivenName": "Angstrum",
    "dmg": [["Cold", 225], ["Heat", 225]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 1,
    "criticalChances": 18, "criticalMultiplier": 2.2,
    "status": 26, "magazine": 3, "reload": 1.8, "ammo": 18
  }, {
    "name": "棱晶 蛇发女妖", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Prisma Gorgon", "rivenName": "Gorgon",
    "dmg": [["Slash", 2.3], ["Puncture", 3.5], ["Impact", 17.3]],
    "accuracy": 14.3, "bullets": 1, "fireRate": 14.17,
    "criticalChances": 30, "criticalMultiplier": 2.3,
    "status": 15, "magazine": 120, "reload": 3, "ammo": 840
  }, {
    "name": "棱晶 葛拉卡达", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Prisma Grakata", "rivenName": "Grakata",
    "dmg": [["Slash", 4], ["Puncture", 5], ["Impact", 6]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 21.67,
    "criticalChances": 25, "criticalMultiplier": 2.5,
    "status": 21, "magazine": 120, "reload": 2, "ammo": 1000
  }, {
    "name": "棱晶 特拉", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Prisma Tetra", "rivenName": "Tetra",
    "dmg": [["Puncture", 30.4], ["Impact", 7.6]],
    "accuracy": 18.2, "bullets": 1, "fireRate": 7.08,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 24, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "食人鱼", "tags": ["枪", "手枪"],
    "id": "Pyrana",
    "dmg": [["Slash", 211.2], ["Puncture", 26.4], ["Impact", 26.4]],
    "accuracy": 5, "bullets": 12, "fireRate": 4.2,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 10, "magazine": 10, "reload": 2, "ammo": 210
  }, {
    "name": "食人鱼 Prime", "tags": ["枪", "手枪"],
    "id": "Pyrana Prime", "rivenName": "Pyrana",
    "dmg": [["Slash", 201.6], ["Puncture", 19.2], ["Impact", 19.2]],
    "accuracy": 6.1, "bullets": 12, "fireRate": 4,
    "criticalChances": 24, "criticalMultiplier": 2.2,
    "status": 12, "magazine": 12, "reload": 1.6, "ammo": 210
  }, {
    "name": "量子切割器", "tags": ["枪", "主要武器", "步枪", "突击步枪", "射线"],
    "id": "Quanta",
    "dmg": [["Electric", 20]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 16, "criticalMultiplier": 2.2,
    "status": 16, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "量子切割器 破坏者", "tags": ["枪", "主要武器", "步枪", "突击步枪", "射线"],
    "id": "Quanta Vandal", "rivenName": "Quanta",
    "dmg": [["Electric", 26]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 22, "criticalMultiplier": 2.4,
    "status": 30, "magazine": 80, "reload": 1.8, "ammo": 540
  }, {
    "name": "夸塔克", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Quartakk",
    "dmg": [["Slash", 16.7], ["Puncture", 14.2], ["Impact", 18.1]],
    "accuracy": 90.9, "bullets": 1, "fireRate": 6.327,
    "criticalChances": 19, "criticalMultiplier": 2.3,
    "status": 27, "magazine": 84, "reload": 1.9, "ammo": 540
  }, {
    "name": "布里斯提卡", "tags": ["枪", "手枪"],
    "id": "Ballistica",
    "dmg": [["Slash", 2.5], ["Puncture", 20], ["Impact", 2.5]],
    "accuracy": 4, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 3.75, "criticalMultiplier": 1.5,
    "status": 2.5, "magazine": 16, "reload": 2, "ammo": 210
  }, {
    "name": "布里斯提卡 (蓄力)", "tags": ["枪", "手枪", "蓄力"],
    "id": "Ballistica", "rivenName": "Ballistica",
    "dmg": [["Slash", 10], ["Puncture", 80], ["Impact", 10]],
    "accuracy": 4, "bullets": 4, "fireRate": 1,
    "criticalChances": 3.75, "criticalMultiplier": 1.5,
    "status": 2.5, "magazine": 16, "reload": 2, "ammo": 210
  }, {
    "name": "绯红 布里斯提卡", "tags": ["枪", "手枪"],
    "id": "Rakta Ballistica", "rivenName": "Ballistica",
    "dmg": [["Slash", 3.75], ["Puncture", 67.5], ["Impact", 3.75]],
    "accuracy": 4, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 5, "criticalMultiplier": 1.5,
    "status": 2.5, "magazine": 20, "reload": 2, "ammo": 210
  }, {
    "name": "绯红 布里斯提卡 (蓄力)", "tags": ["枪", "手枪", "蓄力"],
    "id": "Rakta Ballistica", "rivenName": "Ballistica",
    "dmg": [["Slash", 15], ["Puncture", 270], ["Impact", 15]],
    "accuracy": 4, "bullets": 4, "fireRate": 1,
    "criticalChances": 5, "criticalMultiplier": 1.5,
    "status": 2.5, "magazine": 5, "reload": 2, "ammo": 210
  }, {
    "name": "布里斯提卡 Prime", "tags": ["枪", "手枪"],
    "id": "Ballistica Prime", "rivenName": "Ballistica",
    "dmg": [["Slash", 15.2], ["Puncture", 20.9], ["Impact", 1.9]],
    "accuracy": 4, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 20, "magazine": 32, "reload": 1.2, "ammo": 210
  }, {
    "name": "布里斯提卡 Prime (蓄力)", "tags": ["枪", "手枪", "蓄力"],
    "id": "Ballistica Prime", "rivenName": "Ballistica",
    "dmg": [["Slash", 121.6], ["Puncture", 167.2], ["Impact", 15.2]],
    "accuracy": 4, "bullets": 4, "fireRate": 1.25,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 20, "magazine": 32, "reload": 1.2, "ammo": 210
  }, {
    "name": "绯红 西诺斯", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Rakta Cernos", "rivenName": "Cernos",
    "dmg": [["Slash", 6.25], ["Puncture", 6.25], ["Impact", 112.5]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 1.67,
    "criticalChances": 35, "criticalMultiplier": 2,
    "status": 15, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "绯红 西诺斯 (蓄力)", "tags": ["枪", "主要武器", "步枪", "弓", "蓄力"],
    "id": "Rakta Cernos (charged)", "rivenName": "Cernos",
    "dmg": [["Slash", 12.5], ["Puncture", 12.5], ["Impact", 225]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 4,
    "criticalChances": 35, "criticalMultiplier": 2,
    "status": 15, "magazine": 1, "reload": 0.6, "ammo": 72
  }, {
    "name": "监察者双枪", "tags": ["枪", "技能武器", "手枪"],
    "id": "Regulators",
    "dmg": [["Slash", 12.5], ["Puncture", 12.5], ["Impact", 25]],
    "accuracy": 0, "bullets": 1, "fireRate": 14.8,
    "criticalChances": 25, "criticalMultiplier": 3,
    "status": 10, "magazine": 100, "reload": 1.8, "ammo": 210
  }, {
    "name": "绝路", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Rubico",
    "dmg": [["Slash", 9], ["Puncture", 27], ["Impact", 144]],
    "accuracy": 0, "bullets": 1, "fireRate": 2.67,
    "criticalChances": 30, "criticalMultiplier": 3,
    "status": 12, "magazine": 5, "reload": 2.4, "ammo": 72
  }, {
    "name": "圣洁 雷爆信标", "tags": ["枪", "手枪"],
    "id": "Sancti Castanas", "rivenName": "Castanas",
    "dmg": [["Electric", 300]],
    "accuracy": 100, "bullets": 1, "fireRate": 5,
    "criticalChances": 23, "criticalMultiplier": 2,
    "status": 34, "magazine": 2, "reload": 1, "ammo": 18
  }, {
    "name": "圣洁 猛虎", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Sancti Tigris", "rivenName": "Tigris",
    "dmg": [["Slash", 1008], ["Puncture", 126], ["Impact", 126]],
    "accuracy": 6.5, "bullets": 6, "fireRate": 2,
    "criticalChances": 15, "criticalMultiplier": 1.5,
    "status": 28, "magazine": 2, "reload": 1.5, "ammo": 120
  }, {
    "name": "祸根", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Scourge",
    "dmg": [["Toxin", 30], ["Electric", 30]],
    "accuracy": 100, "bullets": 1, "fireRate": 2.67,
    "criticalChances": 2, "criticalMultiplier": 1.5,
    "status": 30, "magazine": 20, "reload": 2.5, "ammo": 540
  }, {
    "name": "祸根 (蓄力)", "tags": ["枪", "主要武器", "步枪", "突击步枪", "蓄力"],
    "id": "Scourge (charged)", "rivenName": "Scourge",
    "dmg": [["Slash", 122.5], ["Puncture", 72.5], ["Impact", 455]],
    "accuracy": 100, "bullets": 1, "fireRate": 2,
    "criticalChances": 4, "criticalMultiplier": 2,
    "status": 30, "magazine": 20, "reload": 2.5, "ammo": 540
  }, {
    "name": "保障 锡斯特双枪", "tags": ["枪", "手枪"],
    "id": "Secura Dual Cestra", "rivenName": "Dual Cestra",
    "dmg": [["Puncture", 22.4], ["Impact", 5.6]],
    "accuracy": 20, "bullets": 1, "fireRate": 12.5,
    "criticalChances": 16, "criticalMultiplier": 1.6,
    "status": 20, "magazine": 120, "reload": 3.5, "ammo": 480
  }, {
    "name": "保障 潘塔", "tags": ["枪", "主要武器", "步枪", "突击步枪", "发射器"],
    "id": "Secura Penta", "rivenName": "Penta",
    "dmg": [["Cold", 150], ["Heat", 150], ["Impact", 75]],
    "accuracy": 100, "bullets": 1, "fireRate": 2,
    "criticalChances": 26, "criticalMultiplier": 2,
    "status": 26, "magazine": 28, "reload": 2.5, "ammo": 30
  }, {
    "name": "预言者", "tags": ["枪", "手枪"],
    "id": "Seer",
    "dmg": [["Slash", 33.7], ["Puncture", 33.7], ["Impact", 33.7]],
    "accuracy": 16, "bullets": 1, "fireRate": 2,
    "criticalChances": 5, "criticalMultiplier": 1.5,
    "status": 13, "magazine": 8, "reload": 2.8, "ammo": 210
  }, {
    "name": "暗杀者", "tags": ["枪", "手枪"],
    "id": "Sicarus",
    "dmg": [["Slash", 4.5], ["Puncture", 4.5], ["Impact", 21]],
    "accuracy": 20, "bullets": 1, "fireRate": 5.715,
    "criticalChances": 16, "criticalMultiplier": 2,
    "status": 6, "magazine": 15, "reload": 2, "ammo": 210
  }, {
    "name": "暗杀者 Prime", "tags": ["枪", "手枪"],
    "id": "Sicarus Prime", "rivenName": "Sicarus",
    "dmg": [["Slash", 15], ["Puncture", 15], ["Impact", 20]],
    "accuracy": 25, "bullets": 1, "fireRate": 7.087,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 20, "magazine": 24, "reload": 2, "ammo": 210
  }, {
    "name": "重力奇点拟成枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Simulor",
    "dmg": [["Electric", 37.5], ["Cold", 37.5]],
    "accuracy": 100, "bullets": 1, "fireRate": 2,
    "criticalChances": 12, "criticalMultiplier": 2,
    "status": 30, "magazine": 10, "reload": 3, "ammo": 60
  }, {
    "name": "狙击特昂", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Snipetron",
    "dmg": [["Slash", 17.5], ["Puncture", 140], ["Impact", 17.5]],
    "accuracy": 13.3, "bullets": 1, "fireRate": 2,
    "criticalChances": 30, "criticalMultiplier": 1.5,
    "status": 12, "magazine": 4, "reload": 3.5, "ammo": 72
  }, {
    "name": "狙击特昂 破坏者", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Snipetron Vandal", "rivenName": "Snipetron",
    "dmg": [["Slash", 10], ["Puncture", 180], ["Impact", 10]],
    "accuracy": 13.3, "bullets": 1, "fireRate": 2,
    "criticalChances": 28, "criticalMultiplier": 2,
    "status": 16, "magazine": 6, "reload": 2, "ammo": 72
  }, {
    "name": "鳄神", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Sobek",
    "dmg": [["Slash", 43.75], ["Puncture", 43.75], ["Impact", 262.5]],
    "accuracy": 9.1, "bullets": 5, "fireRate": 2.5,
    "criticalChances": 11, "criticalMultiplier": 2,
    "status": 27, "magazine": 20, "reload": 2.7, "ammo": 240
  }, {
    "name": "月神", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Soma",
    "dmg": [["Slash", 6], ["Puncture", 4.8], ["Impact", 1.2]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 15,
    "criticalChances": 30, "criticalMultiplier": 3,
    "status": 7, "magazine": 100, "reload": 3, "ammo": 540
  }, {
    "name": "月神 Prime", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Soma Prime", "rivenName": "Soma",
    "dmg": [["Slash", 6], ["Puncture", 4.8], ["Impact", 1.2]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 15,
    "criticalChances": 30, "criticalMultiplier": 3,
    "status": 10, "magazine": 200, "reload": 3, "ammo": 800
  }, {
    "name": "超音波冲击枪", "tags": ["枪", "手枪"],
    "id": "Sonicor",
    "dmg": [["Impact", 150]],
    "accuracy": 100, "bullets": 1, "fireRate": 1.25,
    "criticalChances": 0, "criticalMultiplier": 0,
    "status": 0, "magazine": 15, "reload": 3, "ammo": 150
  }, {
    "name": "光谱切割器", "tags": ["枪", "手枪", "射线"],
    "id": "Spectra",
    "dmg": [["Slash", 10.4], ["Puncture", 7.6]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 14, "criticalMultiplier": 2,
    "status": 22, "magazine": 60, "reload": 1.8, "ammo": 360
  }, {
    "name": "旋刃飞刀", "tags": ["枪", "手枪", "飞镖"],
    "id": "Spira",
    "dmg": [["Slash", 24.6], ["Puncture", 49.2], ["Impact", 8.2]],
    "accuracy": 100, "bullets": 1, "fireRate": 2.5,
    "criticalChances": 30, "criticalMultiplier": 2,
    "status": 8, "magazine": 10, "reload": 1, "ammo": 210
  }, {
    "name": "旋刃飞刀 Prime", "tags": ["枪", "手枪", "飞镖"],
    "id": "Spira Prime", "rivenName": "Spira",
    "dmg": [["Slash", 6], ["Puncture", 48], ["Impact", 6]],
    "accuracy": 100, "bullets": 1, "fireRate": 3.33,
    "criticalChances": 30, "criticalMultiplier": 3,
    "status": 14, "magazine": 12, "reload": 0.8, "ammo": 210
  }, {
    "name": "静电能量导引枪", "tags": ["枪", "手枪"],
    "id": "Staticor",
    "dmg": [["Electric", 88], ["Heat", 88]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 3.5,
    "criticalChances": 14, "criticalMultiplier": 2.2,
    "status": 28, "magazine": 45, "reload": 1.5, "ammo": 270
  }, {
    "name": "斯特拉迪瓦", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Stradalet",
    "dmg": [["Slash", 8.4], ["Puncture", 9.8], ["Impact", 9.8]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 10,
    "criticalChances": 24, "criticalMultiplier": 2,
    "status": 12, "magazine": 65, "reload": 2, "ammo": 540
  }, {
    "name": "斯特朗", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Strun",
    "dmg": [["Slash", 90], ["Puncture", 45], ["Impact", 165]],
    "accuracy": 4, "bullets": 10, "fireRate": 2.5,
    "criticalChances": 7.5, "criticalMultiplier": 1.5,
    "status": 20, "magazine": 6, "reload": 0, "ammo": 120
  }, {
    "name": "斯特朗 亡魂", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Strun Wraith", "rivenName": "Strun",
    "dmg": [["Slash", 80], ["Puncture", 60], ["Impact", 260]],
    "accuracy": 6.7, "bullets": 10, "fireRate": 2.5,
    "criticalChances": 18, "criticalMultiplier": 2.2,
    "status": 40, "magazine": 10, "reload": 0, "ammo": 120
  }, {
    "name": "史度巴", "tags": ["枪", "手枪"],
    "id": "Stubba",
    "dmg": [["Slash", 15.5], ["Puncture", 3.3], ["Impact", 14.2]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 6.33,
    "criticalChances": 23, "criticalMultiplier": 1.9,
    "status": 13, "magazine": 57, "reload": 1.3, "ammo": 210
  }, {
    "name": "史特克", "tags": ["枪", "手枪"],
    "id": "Stug",
    "dmg": [["Toxin", 78], ["Electric", 78]],
    "accuracy": 100, "bullets": 1, "fireRate": 4,
    "criticalChances": 5, "criticalMultiplier": 1.5,
    "status": 0, "magazine": 20, "reload": 2, "ammo": 210
  }, {
    "name": "苏普拉", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Supra",
    "dmg": [["Slash", 6], ["Puncture", 30], ["Impact", 4]],
    "accuracy": 14.3, "bullets": 1, "fireRate": 12.5,
    "criticalChances": 12, "criticalMultiplier": 1.8,
    "status": 30, "magazine": 180, "reload": 3, "ammo": 1080
  }, {
    "name": "苏普拉 破坏者", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Supra Vandal", "rivenName": "Supra",
    "dmg": [["Slash", 6], ["Puncture", 30], ["Impact", 4]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 12.5,
    "criticalChances": 16, "criticalMultiplier": 2,
    "status": 30, "magazine": 300, "reload": 3, "ammo": 1600
  }, {
    "name": "席芭莉丝", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Sybaris",
    "dmg": [["Slash", 27.2], ["Puncture", 26.4], ["Impact", 26.4]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 4,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 10, "magazine": 10, "reload": 2, "ammo": 540
  }, {
    "name": "席芭莉丝 Prime", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Sybaris Prime", "rivenName": "Sybaris",
    "dmg": [["Slash", 29.9], ["Puncture", 29], ["Impact", 29]],
    "accuracy": 25, "bullets": 1, "fireRate": 4.762,
    "criticalChances": 30, "criticalMultiplier": 2,
    "status": 25, "magazine": 20, "reload": 2, "ammo": 540
  }, {
    "name": "突触生化枪", "tags": ["枪", "主要武器", "步枪", "突击步枪", "射线"],
    "id": "Synapse",
    "dmg": [["Toxin", 10], ["Electric", 10]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 39, "criticalMultiplier": 2.7,
    "status": 13, "magazine": 70, "reload": 1.5, "ammo": 540
  }, {
    "name": "枢议 咖玛腕甲枪", "tags": ["枪", "手枪", "射线"],
    "id": "Synoid Gammacor", "rivenName": "Gammacor",
    "dmg": [["Electric", 10], ["Cold", 10]],
    "accuracy": 100, "bullets": 1, "fireRate": 12,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 28, "magazine": 80, "reload": 1.8, "ammo": 400
  }, {
    "name": "枢议 重力奇点拟成枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Synoid Simulor", "rivenName": "Simulor",
    "dmg": [["Electric", 25], ["Cold", 25]],
    "accuracy": 100, "bullets": 1, "fireRate": 2.67,
    "criticalChances": 5, "criticalMultiplier": 2,
    "status": 35, "magazine": 15, "reload": 2, "ammo": 75
  }, {
    "name": "鹰爪", "tags": ["枪", "手枪", "飞镖"],
    "id": "Talons",
    "dmg": [["Cold", 60], ["Heat", 60]],
    "accuracy": 100, "bullets": 1, "fireRate": 5,
    "criticalChances": 22, "criticalMultiplier": 2,
    "status": 26, "magazine": 4, "reload": 1, "ammo": 12
  }, {
    "name": "终极 螺钉双枪", "tags": ["枪", "手枪"],
    "id": "Telos Akbolto", "rivenName": "Akbolto",
    "dmg": [["Puncture", 42.3], ["Impact", 4.7]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 10,
    "criticalChances": 13, "criticalMultiplier": 2,
    "status": 29, "magazine": 30, "reload": 2.6, "ammo": 210
  }, {
    "name": "终极 螺钉步枪", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Telos Boltor", "rivenName": "Boltor",
    "dmg": [["Puncture", 27], ["Impact", 3]],
    "accuracy": 25, "bullets": 1, "fireRate": 9.33,
    "criticalChances": 30, "criticalMultiplier": 2.4,
    "status": 16, "magazine": 90, "reload": 2.4, "ammo": 540
  }, {
    "name": "双簧管", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Tenora",
    "dmg": [["Slash", 7.2], ["Puncture", 9.6], ["Impact", 7.2]],
    "accuracy": 12.5, "bullets": 1, "fireRate": 11.67,
    "criticalChances": 28, "criticalMultiplier": 2,
    "status": 16, "magazine": 150, "reload": 2.5, "ammo": 900
  }, {
    "name": "双簧管 (蓄力)", "tags": ["枪", "主要武器", "步枪", "突击步枪", "蓄力"],
    "id": "Tenora (charged)", "rivenName": "Tenora",
    "dmg": [["Slash", 48], ["Puncture", 144], ["Impact", 48]],
    "accuracy": 12.5, "bullets": 1, "fireRate": 1.25,
    "criticalChances": 33, "criticalMultiplier": 3,
    "status": 11, "magazine": 150, "reload": 2.5, "ammo": 900
  }, {
    "name": "特拉", "tags": ["枪", "主要武器", "步枪"],
    "id": "Tetra",
    "dmg": [["Puncture", 6.4], ["Impact", 25.6]],
    "accuracy": 18.2, "bullets": 1, "fireRate": 6.67,
    "criticalChances": 4, "criticalMultiplier": 1.5,
    "status": 20, "magazine": 60, "reload": 2, "ammo": 540
  }, {
    "name": "狂鲨", "tags": ["枪", "主要武器", "步枪"],
    "id": "Tiberon",
    "dmg": [["Slash", 11], ["Puncture", 22], ["Impact", 11]],
    "accuracy": 33.3, "bullets": 1, "fireRate": 9.006,
    "criticalChances": 26, "criticalMultiplier": 2.4,
    "status": 16, "magazine": 30, "reload": 2.3, "ammo": 540
  }, {
    "name": "狂鲨 Prime", "tags": ["枪", "主要武器", "步枪"],
    "id": "Tiberon Prime", "rivenName": "Tiberon",
    "dmg": [["Slash", 13.8], ["Puncture", 18.4], ["Impact", 13.8]],
    "accuracy": 33.3, "bullets": 1, "fireRate": 7.38,
    "criticalChances": 28, "criticalMultiplier": 3,
    "status": 2, "magazine": 42, "reload": 2, "ammo": 540
  }, {
    "name": "猛虎", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Tigris",
    "dmg": [["Slash", 840], ["Puncture", 105], ["Impact", 105]],
    "accuracy": 9.1, "bullets": 5, "fireRate": 2,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 28, "magazine": 2, "reload": 1.8, "ammo": 120
  }, {
    "name": "猛虎 Prime", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Tigris Prime", "rivenName": "Tigris",
    "dmg": [["Slash", 1248], ["Puncture", 156], ["Impact", 156]],
    "accuracy": 9.1, "bullets": 8, "fireRate": 2,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 30, "magazine": 2, "reload": 1.8, "ammo": 120
  }, {
    "name": "征服榴炮", "tags": ["枪", "主要武器", "步枪", "突击步枪", "发射器"],
    "id": "Tonkor",
    "dmg": [["Puncture", 75]],
    "accuracy": 12.5, "bullets": 1, "fireRate": 2,
    "criticalChances": 25, "criticalMultiplier": 2.5,
    "status": 10, "magazine": 2, "reload": 2, "ammo": 40
  }, {
    "name": "托里德", "tags": ["枪", "主要武器", "步枪", "突击步枪", "发射器"],
    "id": "Torid",
    "dmg": [["Toxin", 100]],
    "accuracy": 100, "bullets": 1, "fireRate": 1.5,
    "criticalChances": 15, "criticalMultiplier": 2,
    "status": 20, "magazine": 5, "reload": 1.7, "ammo": 60
  }, {
    "name": "双子葛拉卡达", "tags": ["枪", "手枪"],
    "id": "Twin Grakatas",
    "dmg": [["Slash", 2.65], ["Puncture", 3.35], ["Impact", 4]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 20,
    "criticalChances": 25, "criticalMultiplier": 2.7,
    "status": 11, "magazine": 120, "reload": 3, "ammo": 1200
  }, {
    "name": "双子小精灵", "tags": ["枪", "手枪"],
    "id": "Twin Gremlins",
    "dmg": [["Slash", 12.3], ["Puncture", 12.3], ["Impact", 12.3]],
    "accuracy": 16.7, "bullets": 1, "fireRate": 5,
    "criticalChances": 15, "criticalMultiplier": 1.5,
    "status": 15, "magazine": 30, "reload": 1.1, "ammo": 210
  }, {
    "name": "双子寇恩霰机枪", "tags": ["枪", "手枪"],
    "id": "Twin Kohmak",
    "dmg": [["Slash", 90], ["Puncture", 30], ["Impact", 30]],
    "accuracy": 3, "bullets": 5, "fireRate": 6.67,
    "criticalChances": 11, "criticalMultiplier": 2,
    "status": 23, "magazine": 80, "reload": 2.2, "ammo": 240
  }, {
    "name": "双子罗格", "tags": ["枪", "手枪"],
    "id": "Twin Rogga",
    "dmg": [["Slash", 70.5], ["Puncture", 352.5], ["Impact", 282]],
    "accuracy": 4.3, "bullets": 15, "fireRate": 2.5,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 33, "magazine": 2, "reload": 1.5, "ammo": 120
  }, {
    "name": "双子蝰蛇", "tags": ["枪", "手枪"],
    "id": "Twin Vipers",
    "dmg": [["Slash", 5.1], ["Puncture", 1.7], ["Impact", 10.2]],
    "accuracy": 8.7, "bullets": 1, "fireRate": 25,
    "criticalChances": 15, "criticalMultiplier": 1.5,
    "status": 11, "magazine": 28, "reload": 2, "ammo": 420
  }, {
    "name": "啐沫者", "tags": ["枪", "手枪"],
    "id": "Tysis",
    "dmg": [["Toxin", 39.5], ["Electric", 39.5]],
    "accuracy": 100, "bullets": 1, "fireRate": 2.5,
    "criticalChances": 3, "criticalMultiplier": 1.5,
    "status": 50, "magazine": 11, "reload": 1.2, "ammo": 210
  }, {
    "name": "瓦斯托", "tags": ["枪", "手枪"],
    "id": "Vasto",
    "dmg": [["Slash", 29], ["Puncture", 14.5], ["Impact", 14.5]],
    "accuracy": 16, "bullets": 1, "fireRate": 5,
    "criticalChances": 20, "criticalMultiplier": 1.8,
    "status": 8, "magazine": 6, "reload": 1, "ammo": 210
  }, {
    "name": "瓦斯托 Prime", "tags": ["枪", "手枪"],
    "id": "Vasto Prime", "rivenName": "Vasto",
    "dmg": [["Slash", 46.2], ["Puncture", 9.9], ["Impact", 9.9]],
    "accuracy": 16, "bullets": 1, "fireRate": 5.42,
    "criticalChances": 22, "criticalMultiplier": 2.4,
    "status": 22, "magazine": 6, "reload": 1, "ammo": 210
  }, {
    "name": "勇气 海克", "tags": ["枪", "主要武器", "霰弹枪"],
    "id": "Vaykor Hek", "rivenName": "Hek",
    "dmg": [["Slash", 105], ["Puncture", 341.3], ["Impact", 78.8]],
    "accuracy": 9.1, "bullets": 7, "fireRate": 3,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 25, "magazine": 8, "reload": 2.3, "ammo": 120
  }, {
    "name": "勇气 玛瑞火枪", "tags": ["枪", "手枪"],
    "id": "Vaykor Marelok", "rivenName": "Marelok",
    "dmg": [["Slash", 48], ["Puncture", 16], ["Impact", 96]],
    "accuracy": 10, "bullets": 1, "fireRate": 2,
    "criticalChances": 20, "criticalMultiplier": 1.5,
    "status": 35, "magazine": 10, "reload": 1.7, "ammo": 210
  }, {
    "name": "守望者", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Vectis",
    "dmg": [["Slash", 56.3], ["Puncture", 78.8], ["Impact", 90]],
    "accuracy": 13.3, "bullets": 1, "fireRate": 1.11,
    "criticalChances": 25, "criticalMultiplier": 2,
    "status": 30, "magazine": 1, "reload": 0.9, "ammo": 72
  }, {
    "name": "守望者 Prime", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Vectis Prime", "rivenName": "Vectis",
    "dmg": [["Slash", 52.5], ["Puncture", 157.5], ["Impact", 140]],
    "accuracy": 13.3, "bullets": 1, "fireRate": 2.67,
    "criticalChances": 30, "criticalMultiplier": 2,
    "status": 30, "magazine": 2, "reload": 0.85, "ammo": 72
  }, {
    "name": "草原猎手", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Veldt",
    "dmg": [["Slash", 43.2], ["Puncture", 23.4], ["Impact", 23.4]],
    "accuracy": 25, "bullets": 1, "fireRate": 3.67,
    "criticalChances": 22, "criticalMultiplier": 2.2,
    "status": 22, "magazine": 16, "reload": 1.6, "ammo": 528
  }, {
    "name": "蝰蛇", "tags": ["枪", "手枪"],
    "id": "Viper",
    "dmg": [["Slash", 5.1], ["Puncture", 1.7], ["Impact", 10.2]],
    "accuracy": 15.4, "bullets": 1, "fireRate": 14.4,
    "criticalChances": 15, "criticalMultiplier": 1.5,
    "status": 11, "magazine": 14, "reload": 0.7, "ammo": 420
  }, {
    "name": "蝰蛇 亡魂", "tags": ["枪", "手枪"],
    "id": "Viper Wraith", "rivenName": "Viper",
    "dmg": [["Slash", 1.8], ["Puncture", 1.8], ["Impact", 14.4]],
    "accuracy": 28.6, "bullets": 1, "fireRate": 14.38,
    "criticalChances": 19, "criticalMultiplier": 2,
    "status": 9, "magazine": 20, "reload": 0.8, "ammo": 420
  }, {
    "name": "金工火神", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Vulkar",
    "dmg": [["Slash", 11.2], ["Puncture", 33.8], ["Impact", 180]],
    "accuracy": 13.3, "bullets": 1, "fireRate": 1.5,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 25, "magazine": 6, "reload": 3, "ammo": 72
  }, {
    "name": "金工火神 亡魂", "tags": ["枪", "主要武器", "步枪", "狙击枪"],
    "id": "Vulkar Wraith", "rivenName": "Vulkar",
    "dmg": [["Puncture", 27.3], ["Impact", 245.7]],
    "accuracy": 13.3, "bullets": 1, "fireRate": 2,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 25, "magazine": 8, "reload": 3, "ammo": 72
  }, {
    "name": "双子蝰蛇 亡魂", "tags": ["枪", "手枪"],
    "id": "Twin Vipers Wraith", "rivenName": "Twin Vipers",
    "dmg": [["Slash", 1.8], ["Puncture", 1.8], ["Impact", 14.4]],
    "accuracy": 11.1, "bullets": 1, "fireRate": 25,
    "criticalChances": 19, "criticalMultiplier": 2,
    "status": 9, "magazine": 40, "reload": 0.8, "ammo": 440
  }, {
    "name": "毒芽", "tags": ["枪", "手枪"],
    "id": "Zakti",
    "dmg": [["Puncture", 18], ["Impact", 12]],
    "accuracy": 26.7, "bullets": 1, "fireRate": 5,
    "criticalChances": 2, "criticalMultiplier": 1.5,
    "status": 20, "magazine": 3, "reload": 0.8, "ammo": 210
  }, {
    "name": "沙皇", "tags": ["枪", "主要武器", "步枪", "突击步枪", "发射器"],
    "id": "Zarr",
    "dmg": [["Cold", 87.5], ["Heat", 87.5], ["Impact", 25]],
    "accuracy": 100, "bullets": 1, "fireRate": 1.67,
    "criticalChances": 17, "criticalMultiplier": 2.5,
    "status": 29, "magazine": 3, "reload": 2.3, "ammo": 84
  }, {
    "name": "天穹之顶", "tags": ["枪", "主要武器", "步枪", "突击步枪"],
    "id": "Zenith",
    "dmg": [["Slash", 19.5], ["Puncture", 6], ["Impact", 4.5]],
    "accuracy": 33.3, "bullets": 1, "fireRate": 10.83,
    "criticalChances": 10, "criticalMultiplier": 2,
    "status": 34, "magazine": 90, "reload": 1.6, "ammo": 540
  }, {
    "name": "诸葛连弩", "tags": ["枪", "主要武器", "步枪", "弓"],
    "id": "Zhuge",
    "dmg": [["Slash", 20], ["Puncture", 75], ["Impact", 5]],
    "accuracy": 40, "bullets": 1, "fireRate": 4.17,
    "criticalChances": 20, "criticalMultiplier": 2,
    "status": 35, "magazine": 20, "reload": 2.5, "ammo": 540
  }
];


export const MeleeWeaponDataBase: MeleeWeapon[] = [
  { "id": "Sibear", "name": "西伯利亚冰锤", "tags": ["近战", "Hammer"], "dmg": [["Cold", 130]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 260, "status": 0.1 },
  { "id": "Endura", "name": "三叶坚韧", "tags": ["近战", "Rapier"], "dmg": [["Puncture", 66.5], ["Slash", 23.75], ["Impact", 4.75]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 204, "status": 0.25 },
  {
    "id": "Nami Skyla Prime", "name": "海波斯库拉对剑 Prime", "rivenName": "Nami Skyla",
    "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 12], ["Slash", 42], ["Impact", 6]], "criticalMultiplier": 1.5, "criticalChances": 0.2, "fireRate": 1.33, "slideDmg": 360, "status": 0.3
  },
  { "id": "Redeemer", "name": "救赎者", "tags": ["近战", "Gunblade"], "dmg": [["Puncture", 12], ["Slash", 42], ["Impact", 6]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.833, "slideDmg": 180, "status": 0.1 },
  { "id": "Sigma & Octantis", "name": "西格玛 & 南极座", "tags": ["近战", "剑盾"], "dmg": [["Puncture", 9.6], ["Slash", 37.2], ["Impact", 13.2]], "criticalMultiplier": 2.2, "criticalChances": 0.28, "fireRate": 1.08, "slideDmg": 129, "status": 0.16 },
  { "id": "Prova", "name": "普罗沃", "tags": ["近战", "Machete"], "dmg": [["Electricity", 35]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 105, "status": 0.1 },
  {
    "id": "Prova Vandal", "name": "普罗沃 破坏者", "rivenName": "Prova",
    "tags": ["近战", "Machete"], "dmg": [["Electricity", 48]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 144, "status": 0.2
  },
  { "id": "Furax", "name": "弗拉克斯", "tags": ["近战", "Fist"], "dmg": [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1, "slideDmg": 105, "status": 0.1 },
  {
    "id": "MK1-Furax", "name": "MK1-弗拉克斯", "rivenName": "Furax",
    "tags": ["近战", "Fist"], "dmg": [["Puncture", 4.5], ["Slash", 4.5], ["Impact", 21]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1, "slideDmg": 90, "status": 0.1
  }, {
    "id": "Furax Wraith", "name": "弗拉克斯 亡魂", "rivenName": "Furax",
    "tags": ["近战", "Fist"], "dmg": [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], "criticalMultiplier": 2.5, "criticalChances": 0.25, "fireRate": 1.08, "slideDmg": 105, "status": 0.1
  },
  { "id": "Boltace", "name": "螺钉拐刃", "tags": ["近战", "Tonfa"], "dmg": [["Puncture", 68], ["Slash", 8.5], ["Impact", 8.5]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 510, "status": 0.25 },
  {
    "id": "Telos Boltace", "name": "终极 螺钉拐刃", "rivenName": "Boltace",
    "tags": ["近战", "Tonfa"], "dmg": [["Puncture", 72.3], ["Slash", 4.2], ["Impact", 8.5]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1.08, "slideDmg": 510, "status": 0.25
  },
  { "id": "Dragon Nikana", "name": "龙之侍刃", "tags": ["近战", "Nikana"], "dmg": [["Puncture", 8.5], ["Slash", 72.25], ["Impact", 4.25]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 182, "status": 0.15 },
  { "id": "Magistar", "name": "执法者", "tags": ["近战", "Hammer"], "dmg": [["Puncture", 12], ["Slash", 4], ["Impact", 64]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 0.833, "slideDmg": 160, "status": 0.1 },
  {
    "id": "Sancti Magistar", "name": "圣洁 执法者", "rivenName": "Magistar",
    "tags": ["近战", "Hammer"], "dmg": [["Puncture", 18], ["Slash", 6], ["Impact", 96]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1, "slideDmg": 240, "status": 0.1
  },
  { "id": "Atterax", "name": "阿特拉克斯", "tags": ["近战", "Whip"], "dmg": [["Puncture", 2.25], ["Slash", 40.5], ["Impact", 2.25]], "criticalMultiplier": 3, "criticalChances": 0.25, "fireRate": 0.917, "slideDmg": 96, "status": 0.2 },
  { "id": "Dual Ichor", "name": "恶脓双斧", "tags": ["近战", "Dual Swords"], "dmg": [["Toxin", 35]], "criticalMultiplier": 3, "criticalChances": 0.25, "fireRate": 1.08, "slideDmg": 210, "status": 0.15 },
  { "id": "Ack & Brunt", "name": "认知 & 冲击", "tags": ["近战", "剑盾"], "dmg": [["Puncture", 5], ["Slash", 40], ["Impact", 5]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 0.833, "slideDmg": 107, "status": 0.1 },
  { "id": "Amphis", "name": "双头蛇", "tags": ["近战", "Staff"], "dmg": [["Puncture", 8.3], ["Slash", 8.2], ["Impact", 38.5]], "criticalMultiplier": 1.5, "criticalChances": 0.075, "fireRate": 1.25, "slideDmg": 75, "status": 0.1 },
  { "id": "Dual Skana", "name": "空刃双刀", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 4.8], ["Slash", 22.4], ["Impact", 4.8]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.833, "slideDmg": 192, "status": 0.1 },
  { "id": "Nami Solo", "name": "海波单剑", "tags": ["近战", "Machete"], "dmg": [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 105, "status": 0.25 },
  { "id": "Twin Krohkur", "name": "双子克鲁古尔", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 12.6], ["Slash", 49], ["Impact", 8.4]], "criticalMultiplier": 1.7, "criticalChances": 0.19, "fireRate": 0.917, "slideDmg": 420, "status": 0.33 },
  { "id": "Lacera", "name": "悲痛之刃", "tags": ["近战", "Blade and Whip"], "dmg": [["Electricity", 80]], "criticalMultiplier": 2, "criticalChances": 0.025, "fireRate": 0.917, "slideDmg": 171, "status": 0.45 },
  { "id": "Skana", "name": "空刃", "tags": ["近战", "Sword"], "dmg": [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.833, "slideDmg": 75, "status": 0.1 },
  {
    "id": "Skana Prime", "name": "空刃 Prime", "rivenName": "Skana",
    "tags": ["近战", "Sword"], "dmg": [["Puncture", 6.3], ["Slash", 29.4], ["Impact", 6.3]], "criticalMultiplier": 1.5, "criticalChances": 0.1, "fireRate": 1, "slideDmg": 90, "status": 0.1
  }, {
    "id": "Prisma Skana", "name": "棱晶 空刃", "rivenName": "Skana",
    "tags": ["近战", "Sword"], "dmg": [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1, "slideDmg": 75, "status": 0.1
  },
  { "id": "Serro", "name": "电能斩锯", "tags": ["近战", "Polearm"], "dmg": [["Electricity", 75]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 167, "status": 0.25 },
  { "id": "Dual Kamas", "name": "双短柄战镰", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 4.2], ["Slash", 35.7], ["Impact", 2.1]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1.17, "slideDmg": 252, "status": 0.075 },
  {
    "id": "Dual Kamas Prime", "name": "双短柄战镰 Prime", "rivenName": "Dual Kamas",
    "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 14], ["Slash", 52.5], ["Impact", 3.5]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1.17, "slideDmg": 420, "status": 0.2
  },
  { "id": "Ceramic Dagger", "name": "陶瓷匕首", "tags": ["近战", "Dagger"], "dmg": [["Puncture", 31.5], ["Impact", 3.5]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 75, "status": 0.1 },
  { "id": "Cerata", "name": "裸鳃刃", "tags": ["近战", "Glaive"], "dmg": [["Toxin", 44]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 220, "status": 0.3 },

  { "id": "Galatine", "name": "迦伦提恩", "tags": ["近战", "Heavy Blade"], "dmg": [["Puncture", 3.1], ["Slash", 118.8], ["Impact", 3.1]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1, "slideDmg": 250, "status": 0.2 },
  {
    "id": "Galatine Prime", "name": "迦伦提恩 Prime", "rivenName": "Galatine",
    "tags": ["近战", "Heavy Blade"], "dmg": [["Puncture", 4.1], ["Slash", 156.8], ["Impact", 4.1]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1, "slideDmg": 330, "status": 0.2
  },
  { "id": "Dual Cleavers", "name": "斩肉双刀", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], "criticalMultiplier": 3, "criticalChances": 0.25, "fireRate": 0.833, "slideDmg": 210, "status": 0.1 },
  {
    "id": "Prisma Dual Cleavers", "name": "棱晶 斩肉双刀", "rivenName": "Dual Cleavers",
    "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 3.5], ["Slash", 28], ["Impact", 3.5]], "criticalMultiplier": 3, "criticalChances": 0.25, "fireRate": 1, "slideDmg": 210, "status": 0.25
  },
  { "id": "Jat Kittag", "name": "喷射战锤", "tags": ["近战", "Hammer"], "dmg": [["Puncture", 19.5], ["Slash", 6.5], ["Impact", 104]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 260, "status": 0.25 },
  { "id": "Fang", "name": "狼牙", "tags": ["近战", "Dual Daggers"], "dmg": [["Puncture", 21], ["Slash", 4.5], ["Impact", 4.5]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 150, "status": 0.08 },
  {
    "id": "Fang Prime", "name": "狼牙 Prime", "rivenName": "Fang",
    "tags": ["近战", "Dual Daggers"], "dmg": [["Puncture", 32.4], ["Impact", 3.6]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 180, "status": 0.05
  },
  { "id": "Lesion", "name": "病变", "tags": ["近战", "Polearm"], "dmg": [["Puncture", 5], ["Slash", 75], ["Impact", 20]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 222, "status": 0.3 },
  { "id": "Gram", "name": "格拉姆", "tags": ["近战", "Heavy Blade"], "dmg": [["Puncture", 15], ["Slash", 70], ["Impact", 15]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 0.95, "slideDmg": 200, "status": 0.15 },
  { "id": "Jaw Sword", "name": "蛇颚刀", "tags": ["近战", "Sword"], "dmg": [["Puncture", 8.8], ["Slash", 33], ["Impact", 2.2]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 94, "status": 0.1 },
  { "id": "Bo", "name": "玻之武杖", "tags": ["近战", "Staff"], "dmg": [["Puncture", 5], ["Impact", 45]], "criticalMultiplier": 2, "criticalChances": 0.125, "fireRate": 1, "slideDmg": 107, "status": 0.2 },
  {
    "id": "MK1-Bo", "name": "MK1-玻之武杖", "rivenName": "Bo",
    "tags": ["近战", "Staff"], "dmg": [["Puncture", 4.5], ["Impact", 40.5]], "criticalMultiplier": 2, "criticalChances": 0.125, "fireRate": 1, "slideDmg": 96, "status": 0.2
  },
  {
    "id": "Bo Prime", "name": "玻之武杖 Prime", "rivenName": "Bo",
    "tags": ["近战", "Staff"], "dmg": [["Puncture", 7.5], ["Impact", 67.5]], "criticalMultiplier": 2, "criticalChances": 0.125, "fireRate": 1.08, "slideDmg": 161, "status": 0.25
  },
  { "id": "Fragor", "name": "重击巨锤", "tags": ["近战", "Hammer"], "dmg": [["Puncture", 17.3], ["Slash", 17.2], ["Impact", 80.5]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 0.833, "slideDmg": 230, "status": 0.1 },
  {
    "id": "Fragor Prime", "name": "重击巨锤 Prime", "rivenName": "Fragor",
    "tags": ["近战", "Hammer"], "dmg": [["Puncture", 19.5], ["Slash", 19.5], ["Impact", 91]], "criticalMultiplier": 2.5, "criticalChances": 0.35, "fireRate": 0.8, "slideDmg": 260, "status": 0.1
  },
  { "id": "Skiajati", "name": "影生", "tags": ["近战", "Nikana"], "dmg": [["Puncture", 5.4], ["Slash", 60.1], ["Impact", 11.6]], "criticalMultiplier": 1.9, "criticalChances": 0.15, "fireRate": 1.17, "slideDmg": 165, "status": 0.27 },
  { "id": "Anku", "name": "夺魂死神", "tags": ["近战", "Scythe"], "dmg": [["Puncture", 56], ["Slash", 3.5], ["Impact", 10.5]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1.08, "slideDmg": 140, "status": 0.1 },
  { "id": "Caustacyst", "name": "灼蚀变体镰", "tags": ["近战", "Scythe"], "dmg": [["Corrosive", 75]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 150, "status": 0.3 },
  { "id": "Nikana", "name": "侍刃", "tags": ["近战", "Nikana"], "dmg": [["Puncture", 4.5], ["Slash", 38.25], ["Impact", 2.25]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 0.917, "slideDmg": 96, "status": 0.1 },
  {
    "id": "Nikana Prime", "name": "侍刃 Prime", "rivenName": "Nikana",
    "tags": ["近战", "Nikana"], "dmg": [["Puncture", 4.75], ["Slash", 85.5], ["Impact", 4.75]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1.08, "slideDmg": 204, "status": 0.2
  },
  { "id": "Kama", "name": "短柄战镰", "tags": ["近战", "Machete"], "dmg": [["Puncture", 6.75], ["Slash", 31.5], ["Impact", 6.75]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1.17, "slideDmg": 135, "status": 0.02 },
  { "id": "Heat Sword", "name": "烈焰长剑", "tags": ["近战", "Sword"], "dmg": [["Puncture", 4.4], ["Slash", 35.2], ["Impact", 4.4]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 94, "status": 0.2 },
  { "id": "Machete", "name": "马谢特砍刀", "tags": ["近战", "Machete"], "dmg": [["Puncture", 3.75], ["Slash", 17.5], ["Impact", 3.75]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 75, "status": 0.1 },
  {
    "id": "Machete Wraith", "name": "马谢特砍刀 亡魂", "rivenName": "Machete",
    "tags": ["近战", "Machete"], "dmg": [["Puncture", 6.75], ["Slash", 31.5], ["Impact", 6.75]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1.08, "slideDmg": 135, "status": 0.1
  },
  {
    "id": "Prisma Machete", "name": "棱晶 马谢特砍刀", "rivenName": "Machete",
    "tags": ["近战", "Machete"], "dmg": [["Puncture", 3.75], ["Slash", 17.5], ["Impact", 3.75]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 75, "status": 0.1
  },
  { "id": "Hirudo", "name": "蚂蝗", "tags": ["近战", "Sparring"], "dmg": [["Puncture", 44], ["Slash", 2.7], ["Impact", 8.3]], "criticalMultiplier": 3, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 220, "status": 0.05 },
  { "id": "Tekko", "name": "铁钩手甲", "tags": ["近战", "Fist"], "dmg": [["Puncture", 4.5], ["Slash", 31.5], ["Impact", 9]], "criticalMultiplier": 2, "criticalChances": 0.3, "fireRate": 0.917, "slideDmg": 135, "status": 0.1 },
  { "id": "Arca Titron", "name": "弧电振子锤", "tags": ["近战", "Hammer"], "dmg": [["Puncture", 0], ["Slash", 63], ["Impact", 117]], "criticalMultiplier": 2, "criticalChances": 0.24, "fireRate": 0.733, "slideDmg": 360, "status": 0.38 },
  { "id": "Dual Raza", "name": "锋月双斧", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 14.4], ["Slash", 28.8], ["Impact", 4.8]], "criticalMultiplier": 3, "criticalChances": 0.2, "fireRate": 0.917, "slideDmg": 288, "status": 0.05 },
  { "id": "Dakra Prime", "name": "达克拉 Prime", "tags": ["近战", "Sword"], "dmg": [["Puncture", 6], ["Slash", 48], ["Impact", 6]], "criticalMultiplier": 1.5, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 129, "status": 0.1 },
  { "id": "Gunsen", "name": "军扇", "tags": ["近战", "Warfan"], "dmg": [["Puncture", 6], ["Slash", 40], ["Impact", 4]], "criticalMultiplier": 2, "criticalChances": 0.16, "fireRate": 1.17, "slideDmg": 107, "status": 0.28 },
  { "id": "Karyst", "name": "凯洛斯特", "tags": ["近战", "Dagger"], "dmg": [["Toxin", 50]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 0.75, "slideDmg": 107, "status": 0.15 },
  { "id": "Mios", "name": "牝狮神", "tags": ["近战", "Blade and Whip"], "dmg": [["Puncture", 20], ["Slash", 36], ["Impact", 24]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1.08, "slideDmg": 171, "status": 0.25 },
  { "id": "Destreza", "name": "技巧之剑", "tags": ["近战", "Rapier"], "dmg": [["Puncture", 63.8], ["Slash", 9.4], ["Impact", 1.9]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1, "slideDmg": 161, "status": 0.05 },
  {
    "id": "Destreza Prime", "name": "技巧之剑 Prime", "rivenName": "Destreza",
    "tags": ["近战", "Rapier"], "dmg": [["Puncture", 53.2], ["Slash", 13.7], ["Impact", 9.1]], "criticalMultiplier": 3, "criticalChances": 0.24, "fireRate": 0.917, "slideDmg": 163, "status": 0.18
  },
  {
    "id": "Iron Staff", "name": "定海神针",
    "tags": ["近战", "技能武器"], "dmg": [["Puncture", 37.5], ["Impact", 212.5]], "criticalMultiplier": 2, "criticalChances": 0.25, "fireRate": 1, "slideDmg": 536, "status": 0.1
  },
  {
    "id": "Valkyr Talons", "name": "Valkyr之爪",
    "tags": ["近战", "技能武器"], "dmg": [["Puncture", 83.3], ["Slash", 83.3], ["Impact", 83.3]], "criticalMultiplier": 2, "criticalChances": 0.5, "fireRate": 1.5, "slideDmg": 750, "status": 0.1
  },
  {
    "id": "Exalted Blade", "name": "显赫刀剑",
    "tags": ["近战", "技能武器"], "dmg": [["Puncture", 37.5], ["Slash", 175], ["Impact", 37.5]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 0.833, "slideDmg": 536, "status": 0.1
  },
  { "id": "Kogake", "name": "科加基", "tags": ["近战", "Sparring"], "dmg": [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 0.917, "slideDmg": 140, "status": 0.1 },
  {
    "id": "Kogake Prime", "name": "科加基 Prime", "rivenName": "Kogake",
    "tags": ["近战", "Sparring"], "dmg": [["Puncture", 10.5], ["Slash", 10.5], ["Impact", 49]], "criticalMultiplier": 1.8, "criticalChances": 0.16, "fireRate": 0.917, "slideDmg": 280, "status": 0.34
  },
  { "id": "Pangolin Sword", "name": "鲮鲤剑", "tags": ["近战", "Sword"], "dmg": [["Puncture", 5.55], ["Slash", 29.6], ["Impact", 1.85]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 79, "status": 0.12 },
  { "id": "Scoliac", "name": "嵴椎节鞭", "tags": ["近战", "Whip"], "dmg": [["Puncture", 8.25], ["Slash", 38.5], ["Impact", 8.25]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1.25, "slideDmg": 118, "status": 0.15 },
  { "id": "Dual Keres", "name": "双持凯瑞斯", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 13.2], ["Slash", 25.5], ["Impact", 5.3]], "criticalMultiplier": 2.6, "criticalChances": 0.28, "fireRate": 1.25, "slideDmg": 264, "status": 0.14 },
  { "id": "Sydon", "name": "恶龙", "tags": ["近战", "Polearm"], "dmg": [["Puncture", 71.3], ["Impact", 3.8]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 0.917, "slideDmg": 167, "status": 0.25 },
  { "id": "Kronen", "name": "皇家拐刃", "tags": ["近战", "Tonfa"], "dmg": [["Puncture", 6.5], ["Slash", 52], ["Impact", 6.5]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1.08, "slideDmg": 390, "status": 0.2 },
  {
    "id": "Kronen Prime", "name": "皇家拐刃 Prime", "rivenName": "Kronen",
    "tags": ["近战", "Tonfa"], "dmg": [["Puncture", 6.6], ["Slash", 52.8], ["Impact", 6.6]], "criticalMultiplier": 2, "criticalChances": 0.12, "fireRate": 1.17, "slideDmg": 396, "status": 0.24
  },
  { "id": "Tonbo", "name": "蜻蛉薙", "tags": ["近战", "Polearm"], "dmg": [["Puncture", 12], ["Slash", 60], ["Impact", 8]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 178, "status": 0.25 },
  { "id": "Obex", "name": "奥比克斯", "tags": ["近战", "Sparring"], "dmg": [["Puncture", 3.8], ["Slash", 3.7], ["Impact", 17.5]], "criticalMultiplier": 2, "criticalChances": 0.25, "fireRate": 1, "slideDmg": 100, "status": 0.1 },
  {
    "id": "Prisma Obex", "name": "棱晶 奥比克斯", "rivenName": "Obex",
    "tags": ["近战", "Sparring"], "dmg": [["Puncture", 3.8], ["Slash", 3.7], ["Impact", 17.5]], "criticalMultiplier": 2, "criticalChances": 0.25, "fireRate": 1.33, "slideDmg": 100, "status": 0.3
  },
  {
    "id": "Diwata", "name": "仙女",
    "tags": ["近战", "技能武器"], "dmg": [["Puncture", 150], ["Slash", 20], ["Impact", 30]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1.08, "slideDmg": 429, "status": 0.1
  },
  {
    "id": "Vaykor Sydon", "name": "勇气 恶龙", "rivenName": "Sydon",
    "tags": ["近战", "Polearm"], "dmg": [["Puncture", 80.8], ["Impact", 4.3]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1.08, "slideDmg": 189, "status": 0.25
  },
  { "id": "Ankyros", "name": "甲龙双拳", "tags": ["近战", "Fist"], "dmg": [["Puncture", 4.5], ["Slash", 4.5], ["Impact", 21]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1.17, "slideDmg": 90, "status": 0.1 },
  {
    "id": "Ankyros Prime", "name": "甲龙双拳 Prime", "rivenName": "Ankyros",
    "tags": ["近战", "Fist"], "dmg": [["Puncture", 5.7], ["Slash", 5.7], ["Impact", 26.6]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1.25, "slideDmg": 114, "status": 0.15
  },
  { "id": "Silva & Aegis", "name": "席瓦 & 神盾", "tags": ["近战", "剑盾"], "dmg": [["Heat", 35]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 75, "status": 0.2 },
  {
    "id": "Silva & Aegis Prime", "name": "席瓦 & 神盾 Prime", "rivenName": "Silva & Aegis",
    "tags": ["近战", "剑盾"], "dmg": [["Heat", 120]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 0.75, "slideDmg": 257, "status": 0.25
  },
  { "id": "Sheev", "name": "希芙", "tags": ["近战", "Dagger"], "dmg": [["Puncture", 2.25], ["Slash", 40.5], ["Impact", 2.25]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 0.667, "slideDmg": 96, "status": 0.25 },
  {
    "id": "Cadus", "name": "光棍",
    "tags": ["近战", "Staff"], "dmg": [["Electricity", 50]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 107, "status": 0.25
  },
  { "id": "Heat Dagger", "name": "烈焰短剑", "tags": ["近战", "Dagger"], "dmg": [["Puncture", 36], ["Slash", 6.7], ["Impact", 2.3]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.75, "slideDmg": 96, "status": 0.05 },
  { "id": "Gazal Machete", "name": "加扎勒反曲刀", "tags": ["近战", "Machete"], "dmg": [["Puncture", 7.8], ["Slash", 39], ["Impact", 5.2]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1.08, "slideDmg": 156, "status": 0.25 },
  { "id": "Ether Daggers", "name": "苍穹匕首", "tags": ["近战", "Dual Daggers"], "dmg": [["Puncture", 6.8], ["Slash", 31.5], ["Impact", 6.8]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.833, "slideDmg": 225, "status": 0.15 },
  { "id": "Dex Dakra", "name": "DEX 达克拉双剑", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 6.5], ["Slash", 52], ["Impact", 6.5]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 0.883, "slideDmg": 390, "status": 0.2 },
  { "id": "Dark Sword", "name": "暗黑长剑", "tags": ["近战", "Sword"], "dmg": [["Radiation", 37]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.833, "slideDmg": 79, "status": 0.1 },
  { "id": "Ripkas", "name": "锐卡斯", "tags": ["近战", "Claws"], "dmg": [["Puncture", 5.5], ["Slash", 46.8], ["Impact", 2.8]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 0.883, "slideDmg": 165, "status": 0.15 },
  { "id": "Broken Scepter", "name": "破损珽杖", "tags": ["近战", "Staff"], "dmg": [["Puncture", 6], ["Slash", 12], ["Impact", 42]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1.25, "slideDmg": 129, "status": 0.3 },
  { "id": "Orthos", "name": "欧特鲁斯", "tags": ["近战", "Polearm"], "dmg": [["Puncture", 7.5], ["Slash", 35], ["Impact", 7.5]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 111, "status": 0.15 },
  {
    "id": "Orthos Prime", "name": "欧特鲁斯", "rivenName": "Orthos",
    "tags": ["近战", "Polearm"], "dmg": [["Puncture", 9.75], ["Slash", 45.5], ["Impact", 9.75]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1.17, "slideDmg": 144, "status": 0.15
  },
  { "id": "Twin Basolk", "name": "双子巴萨克", "tags": ["近战", "Dual Swords"], "dmg": [["Heat", 65]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 390, "status": 0.4 },
  { "id": "Scindo", "name": "分裂斩斧", "tags": ["近战", "Heavy Blade"], "dmg": [["Puncture", 10], ["Slash", 80], ["Impact", 10]], "criticalMultiplier": 1.5, "criticalChances": 0.15, "fireRate": 0.917, "slideDmg": 200, "status": 0.1 },
  {
    "id": "Scindo Prime", "name": "分裂斩斧 Prime", "rivenName": "Scindo",
    "tags": ["近战", "Heavy Blade"], "dmg": [["Puncture", 13], ["Slash", 104], ["Impact", 13]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 0.967, "slideDmg": 260, "status": 0.15
  },
  { "id": "Krohkur", "name": "克鲁古尔", "tags": ["近战", "Sword"], "dmg": [["Puncture", 12.6], ["Slash", 49], ["Impact", 8.4]], "criticalMultiplier": 1.7, "criticalChances": 0.29, "fireRate": 0.833, "slideDmg": 150, "status": 0.19 },
  { "id": "Tipedo", "name": "提佩多", "tags": ["近战", "Staff"], "dmg": [["Puncture", 5], ["Slash", 40], ["Impact", 5]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1.33, "slideDmg": 107, "status": 0.2 },
  { "id": "Okina", "name": "翁", "tags": ["近战", "Dual Daggers"], "dmg": [["Puncture", 18], ["Slash", 20], ["Impact", 2]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 1.08, "slideDmg": 200, "status": 0.15 },
  { "id": "Shaku", "name": "双节尺棍", "tags": ["近战", "Nunchaku"], "dmg": [["Puncture", 0], ["Slash", 0], ["Impact", 55]], "criticalMultiplier": 2, "criticalChances": 0.075, "fireRate": 1.17, "slideDmg": 118, "status": 0.25 },
  { "id": "Kestrel", "name": "红隼", "tags": ["近战", "Glaive"], "dmg": [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1.08, "slideDmg": 175, "status": 0.1 },
  {
    "id": "Dark Split-Sword (Heavy Blade)", "name": "暗黑分合剑（巨刃）", "rivenName": "Dark Split-Sword",
    "tags": ["近战", "Heavy Blade"], "dmg": [["Radiation", 90]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 0.917, "slideDmg": 180, "status": 0.25
  }, {
    "id": "Dark Split-Sword (Dual Swords)", "name": "暗黑分合剑（双剑）", "rivenName": "Dark Split-Sword",
    "tags": ["近战", "Dual Swords"], "dmg": [["Radiation", 65]], "criticalMultiplier": 2.5, "criticalChances": 0.25, "fireRate": 1.17, "slideDmg": 390, "status": 0.15
  },
  { "id": "Reaper Prime", "name": "收割者 Prime", "tags": ["近战", "Scythe"], "dmg": [["Puncture", 11.3], ["Slash", 52.5], ["Impact", 11.3]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 1.08, "slideDmg": 150, "status": 0.12 },
  { "id": "Glaive", "name": "战刃", "tags": ["近战", "Glaive"], "dmg": [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1, "slideDmg": 225, "status": 0.1 },
  {
    "id": "Glaive Prime", "name": "战刃 Prime", "rivenName": "Glaive",
    "tags": ["近战", "Glaive"], "dmg": [["Puncture", 7.5], ["Slash", 35], ["Impact", 7.5]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1.25, "slideDmg": 250, "status": 0.3
  },
  { "id": "Cronus", "name": "克洛诺斯", "tags": ["近战", "Sword"], "dmg": [["Puncture", 5.3], ["Slash", 19.2], ["Impact", 10.5]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 75, "status": 0.1 },
  { "id": "Dual Ether", "name": "苍穹双剑", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 6], ["Slash", 28], ["Impact", 6]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 240, "status": 0.1 },
  { "id": "Dual Heat Swords", "name": "烈焰双剑", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 6.75], ["Slash", 31.5], ["Impact", 6.75]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 270, "status": 0.1 },

  { "id": "Halikar", "name": "哈利卡", "tags": ["近战", "Glaive"], "dmg": [["Puncture", 36], ["Slash", 4.5], ["Impact", 4.5]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1.17, "slideDmg": 225, "status": 0.2 },
  { "id": "Ether Reaper", "name": "苍穹死神", "tags": ["近战", "Scythe"], "dmg": [["Puncture", 9.8], ["Slash", 45.5], ["Impact", 9.8]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1.08, "slideDmg": 130, "status": 0.15 },
  { "id": "Venka", "name": "凯旋之爪", "tags": ["近战", "Claws"], "dmg": [["Puncture", 9.25], ["Slash", 25.9], ["Impact", 1.85]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 111, "status": 0.15 },
  {
    "id": "Venka Prime", "name": "凯旋之爪 Prime", "rivenName": "Venka",
    "tags": ["近战", "Claws"], "dmg": [["Puncture", 11], ["Slash", 41.25], ["Impact", 2.75]], "criticalMultiplier": 2.5, "criticalChances": 0.25, "fireRate": 1.05, "slideDmg": 165, "status": 0.15
  },
  { "id": "Dark Dagger", "name": "暗黑匕首", "tags": ["近战", "Dagger"], "dmg": [["Radiation", 35]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 75, "status": 0.1 },
  {
    "id": "Rakta Dark Dagger", "name": "绯红 暗黑匕首", "rivenName": "Dark Dagger",
    "tags": ["近战", "Dagger"], "dmg": [["Radiation", 50]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 107, "status": 0.1
  },
  { "id": "Heliocor", "name": "赫利俄光锤", "tags": ["近战", "Hammer"], "dmg": [["Puncture", 14], ["Slash", 7], ["Impact", 119]], "criticalMultiplier": 2, "criticalChances": 0.25, "fireRate": 0.833, "slideDmg": 280, "status": 0.025 },
  {
    "id": "Synoid Heliocor", "name": "枢议 赫利俄光锤", "rivenName": "Heliocor",
    "tags": ["近战", "Hammer"], "dmg": [["Puncture", 12], ["Slash", 6], ["Impact", 102]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1.08, "slideDmg": 240, "status": 0.2
  },
  { "id": "Dual Zoren", "name": "佐伦双斧", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 1.5], ["Slash", 27], ["Impact", 1.5]], "criticalMultiplier": 3, "criticalChances": 0.25, "fireRate": 1.17, "slideDmg": 180, "status": 0.05 },
  { "id": "Lecta", "name": "勒克塔", "tags": ["近战", "Whip"], "dmg": [["Electricity", 45]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 96, "status": 0.25 },
  {
    "id": "Secura Lecta", "name": "保障 勒克塔", "rivenName": "Lecta",
    "tags": ["近战", "Whip"], "dmg": [["Electricity", 75]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1.25, "slideDmg": 161, "status": 0.25
  },
  { "id": "Kesheg", "name": "怯薛", "tags": ["近战", "Polearm"], "dmg": [["Puncture", 10.5], ["Slash", 52.5], ["Impact", 42]], "criticalMultiplier": 2.5, "criticalChances": 0.075, "fireRate": 0.833, "slideDmg": 233, "status": 0.1 },
  { "id": "Mire", "name": "米尔", "tags": ["近战", "Sword"], "dmg": [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1.08, "slideDmg": 75, "status": 0.1 },
  { "id": "Sarpa", "name": "蛇刃", "tags": ["近战", "Gunblade"], "dmg": [["Puncture", 14], ["Slash", 49], ["Impact", 7]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 210, "status": 0.1 },
  { "id": "War", "name": "战争之剑", "tags": ["近战", "Heavy Blade"], "dmg": [["Puncture", 3.5], ["Slash", 24.5], ["Impact", 112]], "criticalMultiplier": 2, "criticalChances": 0.2, "fireRate": 0.917, "slideDmg": 280, "status": 0.2 },
  { "id": "Zenistar", "name": "天顶之星", "tags": ["近战", "Heavy Blade"], "dmg": [["Heat", 130]], "criticalMultiplier": 2, "criticalChances": 0.05, "fireRate": 0.833, "slideDmg": 260, "status": 0.25 },
  { "id": "Volnus", "name": "创伤", "tags": ["近战", "Hammer"], "dmg": [["Puncture", 32], ["Slash", 46], ["Impact", 22]], "criticalMultiplier": 1.6, "criticalChances": 0.18, "fireRate": 1.2, "slideDmg": 200, "status": 0.3 },
  { "id": "Jat Kusar", "name": "喷射锁镰", "tags": ["近战", "Blade and Whip"], "dmg": [["Heat", 80]], "criticalMultiplier": 2.5, "criticalChances": 0.35, "fireRate": 0.833, "slideDmg": 171, "status": 0.05 },
  { "id": "Orvius", "name": "灵枢", "tags": ["近战", "Glaive"], "dmg": [["Puncture", 3.5], ["Slash", 52.5], ["Impact", 14]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 0.75, "slideDmg": 350, "status": 0.15 },
  { "id": "Cassowar", "name": "鹤鸵长戟", "tags": ["近战", "Polearm"], "dmg": [["Puncture", 23.8], ["Slash", 30.8], ["Impact", 15.4]], "criticalMultiplier": 1.4, "criticalChances": 0.06, "fireRate": 1.17, "slideDmg": 156, "status": 0.28 },
  { "id": "Plasma Sword", "name": "等离子长剑", "tags": ["近战", "Sword"], "dmg": [["Electricity", 35]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 0.667, "slideDmg": 75, "status": 0.15 },
  { "id": "Ohma", "name": "欧玛", "tags": ["近战", "Tonfa"], "dmg": [["Electricity", 100]], "criticalMultiplier": 2, "criticalChances": 0.15, "fireRate": 0.917, "slideDmg": 600, "status": 0.3 },
  { "id": "Ether Sword", "name": "苍穹之剑", "tags": ["近战", "Sword"], "dmg": [["Puncture", 5.55], ["Slash", 25.9], ["Impact", 5.55]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 1, "slideDmg": 79, "status": 0.1 },
  { "id": "Hate", "name": "憎恨", "tags": ["近战", "Scythe"], "dmg": [["Puncture", 10.5], ["Slash", 49], ["Impact", 10.5]], "criticalMultiplier": 2.5, "criticalChances": 0.2, "fireRate": 0.917, "slideDmg": 140, "status": 0.15 },
  { "id": "Ninkondi", "name": "降灵追猎者", "tags": ["近战", "Nunchaku"], "dmg": [["Electricity", 45]], "criticalMultiplier": 2, "criticalChances": 0.1, "fireRate": 1, "slideDmg": 96, "status": 0.35 },
  { "id": "Nami Skyla", "name": "海波斯库拉对剑", "tags": ["近战", "Dual Swords"], "dmg": [["Puncture", 7.5], ["Slash", 35], ["Impact", 7.5]], "criticalMultiplier": 1.5, "criticalChances": 0.05, "fireRate": 0.917, "slideDmg": 300, "status": 0.1 },
  { "id": "Guandao", "name": "关刀", "tags": ["近战", "Polearm"], "dmg": [["Puncture", 4.5], ["Slash", 63], ["Impact", 22.5]], "criticalMultiplier": 2.2, "criticalChances": 0.24, "fireRate": 0.833, "slideDmg": 200, "status": 0.04 },
  { "id": "Broken War", "name": "破碎的战争之剑", "tags": ["近战", "Sword"], "dmg": [["Puncture", 9], ["Slash", 72], ["Impact", 9]], "criticalMultiplier": 1.5, "criticalChances": 0.15, "fireRate": 1, "slideDmg": 193, "status": 0.1 }];

export interface DamageType {
  id: string
  name: string
  type: "Physical" | "Elemental" | "Combined"
  desc: string
  combinedBy?: string[]
}
const _damageTypeDatabase = [
  ["Impact     ", "冲击", "Physical ", null, "蹒跚"],
  ["Puncture   ", "穿刺", "Physical ", null, "伤害输出"],
  ["Slash      ", "切割", "Physical ", null, "流血"],
  ["Cold       ", "冰冻", "Elemental", null, "缓速"],
  ["Electricity", "电击", "Elemental", null, "链式攻击"],
  ["Heat       ", "火焰", "Elemental", null, "火焰DoT 恐惧"],
  ["Toxin      ", "毒素", "Elemental", null, "生命DoT"],
  ["Blast      ", "爆炸", "Combined ", "Heat, Cold", "击倒"],
  ["Corrosive  ", "腐蚀", "Combined ", "Electricity, Toxin", "降低护甲"],
  ["Gas        ", "毒气", "Combined ", "Heat, Toxin", "毒素AoE"],
  ["Magnetic   ", "磁力", "Combined ", "Cold, Electricity", "降低最大护盾值"],
  ["Radiation  ", "辐射", "Combined ", "Heat, Electricity", "降低精度 向队友开火"],
  ["Viral      ", "病毒", "Combined ", "Cold, Toxin", "降低最大生命值"]
];

/**
 * 伤害类型数据
 */
export const DamageTypeDatabase: DamageType[] = _damageTypeDatabase.map(v => {
  let o = {
    id: v[0].trim(),
    name: v[1].trim(),
    type: v[2].trim(),
    desc: v[4].trim()
  } as any;
  if (v[3]) o.combinedBy = v[3].trim().split(", ");
  return o;
});
/**
 * 普通MOD信息
 */
export interface NormalMod {
  /** 英文名 */
  id: string
  /** 中文名 */
  name: string
  /** 适用武器 */
  type: string
  /** 描述 */
  desc: string
  /** 极性 */
  polarity: "r" | "-" | "d" | "="
  /** 消耗 */
  cost: number
  /** 稀有度 */
  rarity: "n" | "c" | "r" | "l" | "x"
  /** 属性 */
  props: [string, number][]
  canReplaceBy?: string[] // 等价的MOD 如元素卡
  primed?: string // P卡或其他种类高级卡对应的普通卡的名称
}

/*
步枪: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Rifle-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
手枪: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Handgun-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
霰弹枪: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Shotgun-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
近战: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Melee-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
Array.from($(".mw-parser-output tr")
        .filter((i, v) => !v.style.display)
        .find("td:nth(1)"))
        .map(v => v.innerText)
        .filter(Boolean)
        .join("\n");

Array.from($(".mw-parser-output tr")
        .filter((i, v) => !v.style.display)
        .find("td:nth(2)"))
    .map(v => $(v).find("img").attr("alt").split(" ")[0])
    .filter(Boolean)
    .join("\n");
    */
const _normalModSource = [
  ["Hunter Munitions", "猎人 战备", [["暴击时触发切割伤害", 0.3]], "暴击时，有几率触发切割伤害", "主要武器", "r", "c", 9],
  ["Vigilante Armaments", "私法 军备", [["S", 0.6], ["暴击强化", 0.05]], "增加多重射击的几率", "主要武器", "-", "n", 9],
  ["Vigilante Fervor", "私法 热诚", [["R", 0.45], ["暴击强化", 0.05]], "增加射速", "主要武器", "r", "c", 9],
  ["Vigilante Offense", "私法 侵犯", [["P", 1.5], ["暴击强化", 0.05]], "增加穿透", "主要武器", "-", "r", 9],

  // 步枪
  ["Serration", "膛线", [["D", 1.65]], "提升基础伤害", "步枪", "r", "c", 14],
  ["Split Chamber", "分裂膛室", [["S", 0.9]], "增加多重射击的几率", "步枪", "r", "r", 15],
  ["Heavy Caliber", "重口径", [["D", 1.65], ["精准度", -0.55]], "提升伤害，降低精准度", "步枪", "r", "r", 16],
  ["Point Strike", "致命一击", [["0", 1.5]], "提升暴击几率", "步枪", "r", "n", 9],
  ["Vital Sense", "弱点感应", [["1", 1.2]], "提升暴击伤害", "步枪", "r", "r", 9],
  ["Argon Scope", "氩晶瞄具", [["0", 1.35]], "在爆头之后的一段时间内提升瞄准时的暴击几率", "步枪", "r", "r", 7],
  ["Bladed Rounds", "尖刃弹头", [["1", 1.2]], "完成击杀后的一段时间内提升瞄准时的暴击伤害", "步枪", "r", "c", 9],
  ["Hammer Shot", "重锤射击", [["1", 0.6], ["2", 0.4]], "提升暴击伤害，提升触发几率", "步枪", "d", "r", 9],
  ["Cryo Rounds", "低温弹头", [["5", 0.9]], "增加冰冻伤害", "步枪", "d", "c", 11],
  ["Primed Cryo Rounds", "低温弹头 Prime", [["5", 1.65]], "增加冰冻伤害", "步枪", "d", "l", 16],
  ["Infected Clip", "污染弹匣", [["6", 0.9]], "增加毒素伤害", "步枪", "-", "c", 11],
  ["Stormbringer", "暴风使者", [["7", 0.9]], "增加电击伤害", "步枪", "-", "c", 11],
  ["Hellfire", "地狱火", [["4", 0.9]], "增加火焰伤害", "步枪", "-", "c", 11],
  ["Malignant Force", "致命火力", [["6", 0.6], ["2", 0.6]], "提升异常触发几率 增加毒素伤害", "步枪", "r", "r", 7],
  ["High Voltage", "高压电流", [["7", 0.6], ["2", 0.6]], "提升异常触发几率 增加电击伤害", "步枪", "r", "r", 7],
  ["Rime Rounds", "白霜弹头", [["5", 0.6], ["2", 0.6]], "提升异常触发几率 增加冰冻伤害", "步枪", "r", "r", 7],
  ["Thermite Rounds", "铝热焊弹", [["4", 0.6], ["2", 0.6]], "提升异常触发几率 增加火焰伤害", "步枪", "r", "r", 7],
  ["Piercing Hit", "穿甲伤害", [["9", 0.3]], "提升穿刺伤害", "步枪", "-", "n", 9],
  ["Piercing Caliber", "穿甲口径", [["9", 1.2]], "提升穿刺伤害", "步枪", "-", "r", 11],
  ["Sawtooth Clip", "锯齿弹链", [["A", 0.3]], "增加切割伤害", "步枪", "-", "n", 9],
  ["Fanged Fusillade", "尖牙连射", [["A", 1.2]], "增加步枪的 切割伤害", "步枪", "-", "r", 11],
  ["Rupture", "破裂", [["8", 0.3]], "提升冲击伤害", "步枪", "-", "n", 9],
  ["Crash Course", "连续冲击", [["8", 1.2]], "增加冲击伤害", "步枪", "-", "r", 11],
  ["Critical Delay", "关键延迟", [["0", 0.48], ["R", -0.36]], "提升暴击几率，降低攻击速度", "步枪", "-", "r", 9],
  ["Adhesive Blast", "凝胶爆破", [["魔改", 0]], "武器发射出的榴弹能够附着于壁面", "特定武器", "r", "r", 9],
  ["Sinister Reach", "凶恶延伸", [["射程", 12]], "增加喷射型的主武器射程", "喷射型武器", "-", "c", 5],
  ["Vile Acceleration", "卑劣加速", [["R", 0.9], ["D", -0.15]], "提升射速，降低伤害", "步枪", "-", "r", 9],
  ["Metal Auger", "合金钻头", [["P", 2.1]], "增加穿透", "步枪", "-", "r", 15],
  ["Magazine Warp", "弹匣增幅", [["L", 0.3]], "提升弹匣容量", "步枪", "-", "n", 9],
  ["Ammo Drum", "弹鼓", [["M", 0.3]], "增加武器的携带弹药上限", "步枪", "-", "n", 7],
  ["Shred", "撕裂", [["R", 0.3], ["P", 1.2]], "增加射速和穿透", "步枪", "r", "r", 9],
  ["Continuous Misery", "无尽苦难", [["3", 1]], "提升触发的异常持续时间", "步枪", "r", "n", 7],
  ["Agile Aim", "机动瞄准", [["移动速度", 0.2]], "提升瞄准时的移动速度", "步枪", "r", "c", 5],
  ["Vile Precision", "极恶精准", [["Z", -0.6], ["R", -0.36]], "提升精确度，降低攻击速度", "步枪", "-", "r", 11],
  ["Terminal Velocity", "极限速度", [["V", 0.6]], "提升抛射物飞行速度", "步枪", "r", "c", 7],
  ["Rifle Aptitude", "步枪才能", [["2", 0.15]], "提升异常触发几率", "步枪", "d", "c", 9],
  ["Hush", "消音器", [["噪音", -1]], "降低开火造成的声音", "步枪", "-", "n", 5],
  ["Bane of Corpus", "灭亡 Corpus", [["C", 0.3]], "提升对 Corpus单位的伤害", "步枪", "r", "c", 9],
  ["Primed Bane of Corpus", "灭亡 Corpus Prime", [["C", 0.55]], "提升对 Corpus单位的伤害", "步枪", "r", "l", 12],
  ["Bane of Grineer", "灭亡 Grineer", [["G", 0.3]], "提升对 Grineer单位的伤害", "步枪", "r", "c", 9],
  ["Primed Bane of Grineer", "灭亡 Grineer Prime", [["G", 0.55]], "提升对 Grineer单位的伤害", "步枪", "r", "l", 12],
  ["Bane of Infested", "灭亡 Infested", [["I", 0.3]], "提升对 Infested单位的伤害", "步枪", "r", "c", 9],
  ["Primed Bane of Infested", "灭亡 Infested Prime", [["I", 0.55]], "提升对 Infested单位的伤害", "步枪", "r", "l", 12],
  ["Bane of Corrupted", "灭亡堕落者", [["O", 0.3]], "提升对堕落者单位的伤害", "步枪", "r", "c", 9],
  ["Primed Bane of Corrupted", "灭亡堕落者 Prime", [["O", 0.55]], "提升对堕落者单位的伤害", "步枪", "r", "l", 12],
  ["Speed Trigger", "灵敏扳机", [["R", 0.6]], "提升射速", "步枪", "r", "c", 9],
  ["Combustion Beam", "灼热光束", [["一段时间后敌人爆炸", 600]], "让被该武器击杀的敌人爆炸", "喷射型武器", "r", "r", 9],
  ["Firestorm", "烈焰风暴", [["增加爆炸半径", 0.24]], "增加特定武器的攻击范围", "特定武器", "r", "r", 9],
  ["Fast Hands", "爆发装填", [["F", 0.3]], "降低装填时间", "步枪", "-", "n", 7],
  ["Primed Fast Hands", "爆发装填 Prime", [["F", 0.55]], "降低装填时间", "步枪", "-", "l", 12],
  ["Stabilizer", "稳定", [["Z", -0.6]], "降低射击时产生的后坐力", "步枪", "-", "r", 9],
  ["Arrow Mutation", "箭矢转换", [["弹药转换", 0]], "将拾起的其他种类弹药转变为弓箭弹药", "步枪", "-", "r", 9],
  ["Guided Ordinance", "制导弹药", [["精准度", 0.3]], "命中敌人后的一段时间内提升瞄准时的精准度", "突击步枪", "r", "c", 7],
  ["Spring-Loaded Chamber", "簧压膛室", [["R", 0.75]], "提升在上弹之后的一段时间内瞄准时的射速", "突击步枪", "r", "c", 9],
  ["Kinetic Ricochet", "动力回弹", [["魔改", 0]], "让特拉发射的子弹回弹并延长飞行距离", "特拉", "-", "r", 7],
  ["Tether Grenades", "系绳榴弹", [["魔改", 0]], "让武器的榴弹对其周围敌人产生牵引效果", "潘塔系列武器", "-", "c", 9],
  ["Catalyzer Link", "触媒连动", [["2", 0.6]], "在施展技能后一段时间内提升瞄准时的异常状态触发率", "步枪", "r", "n", 9],
  ["Twitch", "迅速抽换", [["切换速度", 2]], "提升拔枪速度", "步枪", "-", "c", 7],
  ["Wildfire", "野火", [["L", 0.2], ["4", 0.6]], "提升弹夹容量，增加 火焰伤害", "步枪", "r", "r", 9],
  ["Eagle Eye", "鹰眼", [["H", 0.4]], "提升变焦", "步枪", "-", "c", 7],
  ["Charged Chamber", "蓄力装填", [["第一发子弹加成", 0.4]], "提升更换弹匣后第一次射击的基础伤害", "狙击枪", "r", "c", 9],
  ["Target Acquired", "锁定目标", [["爆头倍率", 0.6]], "增加狙击步枪的爆头伤害倍率", "狙击枪", "r", "r", 9],
  ["Entropy Burst", "熵数爆发", [["加基础状态触发率", 20]], "提升异常触发几率并附加熵数效果", "苏普拉", "r", "r", 7],
  ["Lasting Purity", "永恒纯净", [["正中红心", 0.6]], "附加正中红心和纯净效果", "金工火神", "-", "r", 7],
  ["Nightwatch Napalm", "夜巡燃烧弹", [["魔改", 0]], "让武器所发射出的导弹在爆炸后产生持续爆炎", "食人女魔", "r", "r", 9],
  ["Flux Overdrive", "通量射线步枪超载", [["魔改", 0]], "让武器在持续开火时的触发几率得到随机提升", "通量射线步枪", "r", "c", 9],
  ["Neutralizing Justice", "抵消正义", [["魔改", 0]], "让发射出的刀片有几率立刻摧毁虚能船员的护罩，附加正义特效", "米特尔", "d", "r", 7],
  ["Voltage Sequence", "电压数列", [["魔改", 8]], "让武器在击杀飞行敌人的时候将他们转换成一个电击陷阱，附加数列特效", "兰卡", "-", "r", 7],
  ["Disarming Purity", "缴械纯净", [["魔改", 0]], "让武器的次要攻击有几率解除敌人的武装，附加纯净特效", "猎豹", "-", "r", 7],
  ["Deadly Sequence", "致命数列", [["0", 2]], "提升暴击几率，附加数列特效", "葛恩火枪", "r", "r", 7],
  ["Gilded Truth", "镀金真相", [["R", 0.8]], "提升射速，附加真相效果", "伯斯顿", "r", "r", 7],
  // ["Apex Predator", "顶级掠食者", [["PVP", 0]], "让被击中的目标暂时出现在小地图上（限武形秘仪）", "步枪", "-", "c", 7],
  // ["Lucky Shot", "幸运射击", [["PVP", 0]], "提升武器的抛射物飞行速度，降低精准度（限武形秘仪）", "步枪", "r", "c", 9],
  // ["Vanquished Prey", "战无不克", [["PVP", 0]], "击败另一名玩家后降低一段时间的护盾回充延迟，降低生命球的回血量（限武形秘仪）", "突击步枪", "d", "r", 9],
  // ["Comet Rounds", "彗星弹头", [["PVP", 0]], "将一部分物理伤害转化为冲击伤害（限武形秘仪）", "步枪", "r", "c", 5],
  // ["Serrated Rounds", "锯刃弹头", [["PVP", 0]], "一部分物理伤害转换为切割伤害（限武形秘仪）", "步枪", "r", "c", 5],
  // ["Ripper Rounds", "撕裂弹头", [["PVP", 0]], "将一部分物理伤害转化为穿刺伤害（限武形秘仪）", "步枪", "r", "c", 5],
  // 霰弹枪
  ["Point Blank", "抵近射击", [["D", 0.9]], "增加伤害", "霰弹枪", "r", "c", 9],
  ["Primed Point Blank", "抵近射击 Prime", [["D", 1.65]], "增加伤害", "霰弹枪", "r", "l", 14],
  ["Hell's Chamber", "地狱弹膛", [["S", 1.2]], "增加多重射击", "霰弹枪", "r", "r", 15],
  ["Vicious Spread", "恶性扩散", [["D", 0.9], ["扩散", 0.6]], "增加伤害和扩散", "霰弹枪", "r", "r", 9],
  ["Blaze", "烈焰", [["D", 0.6], ["4", 0.6]], "增加伤害和火焰伤害", "霰弹枪", "r", "r", 9],
  ["Toxic Barrage", "毒素弹幕", [["6", 0.6], ["2", 0.6]], "增加 毒素伤害和触发几率", "霰弹枪", "r", "r", 7],
  ["Scattering Inferno", "炼狱轰击", [["4", 0.6], ["2", 0.6]], "增加 火焰伤害和触发几率", "霰弹枪", "r", "r", 7],
  ["Frigid Blast", "冰冷疾风", [["5", 0.6], ["2", 0.6]], "增加冰冻伤害和触发几率", "霰弹枪", "r", "r", 7],
  ["Shell Shock", "电冲弹药", [["7", 0.6], ["2", 0.6]], "增加电击伤害和异常触发几率", "霰弹枪", "r", "r", 7],
  ["Incendiary Coat", "燃烧外壳", [["4", 0.9]], "增加 火焰伤害", "霰弹枪", "-", "c", 11],
  ["Chilling Grasp", "急冻控场", [["5", 0.9]], "增加冰冻伤害", "霰弹枪", "d", "c", 11],
  ["Contagious Spread", "传染蔓延", [["6", 0.9]], "增加毒素伤害", "霰弹枪", "-", "c", 11],
  ["Charged Shell", "充电弹头", [["7", 0.9]], "增加电击伤害", "霰弹枪", "-", "c", 11],
  ["Shredder", "粉碎器", [["A", 0.3]], "增加切割伤害", "霰弹枪", "-", "n", 9],
  ["Sweeping Serration", "扫荡锯齿", [["A", 1.2]], "增加切割伤害", "霰弹枪", "-", "r", 11],
  ["Flechette", "箭型弹头", [["9", 0.3]], "增加穿刺伤害", "霰弹枪", "-", "n", 9],
  ["Breach Loader", "破裂填装", [["9", 1.2]], "增加穿刺伤害", "霰弹枪", "-", "r", 11],
  ["Disruptor", "冲击干扰", [["8", 0.3]], "增加冲击伤害", "霰弹枪", "-", "n", 9],
  ["Full Contact", "全面接触", [["8", 1.2]], "增加冲击伤害", "霰弹枪", "-", "r", 11],
  ["Accelerated Blast", "加速冲击", [["R", 0.6], ["9", 0.6]], "增加攻击速度和穿刺伤害", "霰弹枪", "r", "r", 9],
  ["Cleanse Corpus", "净化 Corpus", [["C", 0.3]], "增加对 Corpus的伤害", "霰弹枪", "r", "c", 9],
  ["Cleanse Grineer", "净化 Grineer", [["G", 0.3]], "增加对 Grineer的伤害", "霰弹枪", "r", "c", 9],
  ["Cleanse Infested", "净化 Infested", [["I", 0.3]], "增加对 Infested的伤害", "霰弹枪", "r", "c", 9],
  ["Cleanse Corrupted", "净化堕落者", [["对堕落者伤害", 0.3]], "增加对Corrupted的伤害", "霰弹枪", "r", "c", 9],
  ["Shell Compression", "压缩弹药", [["M", 0.3]], "增加弹药最大值", "霰弹枪", "-", "c", 7],
  ["Lock and Load", "填弹上膛", [["收起武器时弹夹每秒自动装填", 0.2]], "增加收起霰弹枪以后，自动填装弹药的几率", "霰弹枪", "-", "r", 13],
  ["Silent Battery", "寂静炮组", [["噪音", -1]], "减少武器噪音等级", "霰弹枪", "-", "c", 5],
  ["Tactical Pump", "战术上膛", [["F", 0.3]], "增加装填速度", "霰弹枪", "-", "c", 7],
  ["Lingering Torment", "恒久折磨", [["3", 0.3]], "增加触发时间", "霰弹枪", "r", "n", 11],
  ["Scattered Justice", "散射正义", [["S", 2]], "为武器增加多重射击以及正义效果", "海克", "r", "r", 7],
  ["Tainted Shell", "污秽弹药", [["扩散", -0.77], ["R", -0.55]], "减少弹片扩散和射速", "霰弹枪", "d", "r", 14],
  ["Chilling Reload", "激冷装填", [["5", 0.6], ["F", 0.4]], "增加 冰冻伤害和装填速度", "霰弹枪", "r", "r", 5],
  ["Seeking Fury", "狂暴追猎", [["F", 0.15], ["P", 1.2]], "提升装填速度和穿透", "霰弹枪", "r", "r", 11],
  ["Ravage", "破灭", [["1", 0.6]], "增加暴击伤害", "霰弹枪", "r", "r", 9],
  ["Primed Ravage", "破灭 Prime", [["1", 1.1]], "提升暴击伤害", "霰弹枪", "r", "l", 14],
  ["Shrapnel Shot", "破片射击", [["1", 0.99]], "完成击杀后的一段时间内提升瞄准时的暴击伤害。", "霰弹枪", "r", "n", 9],
  ["Narrow Barrel", "狭窄枪膛", [["扩散", -0.3]], "命中敌人后的一段时间内提升瞄准时的精准度", "霰弹枪", "r", "r", 9],
  ["Shattering Justice", "破碎正义", [["加法触发", 0.2]], "增加武器的触发几率和正义集团特效", "鳄神", "-", "r", 7],
  ["Seeking Force", "穿透力", [["P", 0.3]], "增加穿透", "霰弹枪", "-", "r", 15],
  ["Nano-Applicator", "纳米涂覆", [["2", 0.9]], "在使用技能后的一段时间内提升瞄准时的异常状态触发率。", "霰弹枪", "r", "r", 9],
  ["Fatal Acceleration", "致死加速", [["V", 0.4]], "增加抛射物飞行速度", "霰弹枪", "r", "c", 7],
  ["Frail Momentum", "虚弱动能", [["R", 0.9], ["D", -0.15]], "增加攻击速度但降低伤害", "霰弹枪", "-", "r", 9],
  ["Shotgun Spazz", "表演时间", [["R", 0.9]], "增加攻击速度", "霰弹枪", "r", "c", 9],
  ["Repeater Clip", "转轮弹匣", [["R", 1.05]], "在上弹之后的一段时间内提升瞄准时的射速", "霰弹枪", "r", "c", 9],
  ["Burdened Magazine", "过载弹匣", [["L", 0.6], ["F", -0.18]], "增加弹匣容量和装填时间", "霰弹枪", "-", "r", 11],
  ["Shotgun Savvy", "通晓霰弹枪", [["2", 0.3]], "增加触发几率", "霰弹枪", "d", "c", 9],
  ["Critical Deceleration", "降速暴击", [["0", 0.48], ["R", -0.3]], "增加暴击几率但降低攻击速度", "霰弹枪", "r", "r", 9],
  ["Laser Sight", "雷射瞄具", [["0", 1.2]], "在爆头后的一段时间内提升瞄准时的暴击几率.", "霰弹枪", "r", "c", 9],
  ["Blunderbuss", "雷筒", [["0", 0.9]], "增加暴击几率", "霰弹枪", "r", "n", 9],
  // ["Primed Blunderbuss", "雷筒 Prime", [["0", 1.65]], "增加暴击几率", "霰弹枪", "r", "l", 14],
  ["Ammo Stock", "霰弹扩充", [["L", 0.6]], "增加弹匣容量", "霰弹枪", "-", "c", 9],
  // ["Shotgun Ammo Mutation", "霰弹枪弹药转换", [["弹药转换", 0]], "捡取未使用的弹药转换成霰弹枪弹药", "霰弹枪", "-", "r", 9],
  // ["Primed Shotgun Ammo Mutation", "霰弹枪弹药转换 Prime", [["弹药转换", 0]], "捡取未使用的弹药转换成霰弹枪弹药", "霰弹枪", "-", "l", 14],
  // ["Soft Hands", "精湛快手", [["拔枪速度", 2]], "增加霰弹枪的切换速度", "霰弹枪", "-", "c", 7],
  // ["Acid Shells", "酸性弹药", [["魔改", 450]], "让被击杀的敌人爆炸", "鳄神", "r", "c", 9],
  // ["Fomorian Accelerant", "巨人促进剂", [["魔改", 0]], "提高子弹飞行速度并使其具有反弹能力", "龙骑兵", "r", "c", 7],
  // ["Snap Shot", "速射", [["PVP", 0]], "增加瞄准时的 移动速度", "霰弹枪", "r", "c", 9],
  // ["Broad Eye", "广域之视", [["PVP", 0]], "瞄准时，减少变焦", "霰弹枪", "-", "c", 7],
  // ["Kill Switch", "屠戮换弹", [["PVP", 0]], "在击杀时，增加换弹速度", "霰弹枪", "r", "r", 13],
  // ["Momentary Pause", "片刻喘息", [["PVP", 0]], "击杀时回复生命 减少从生命球中获得的生命回复", "霰弹枪", "d", "r", 9],
  // ["Loaded Capacity", "加载弹容", [["PVP", 0]], "增加弹药容量 减少填装速度", "霰弹枪", "-", "n", 9],
  // ["Bounty Hunter", "赏金猎人", [["PVP", 0]], "被命中的敌人会暂时的暴露在小地图上", "霰弹枪", "-", "c", 7],
  // ["Loose Chamber", "松弛枪膛", [["PVP", 0]], "增加霰弹枪的填装速度和武器后坐力", "霰弹枪", "-", "n", 9],
  // ["Hydraulic Chamber", "液压枪膛", [["PVP", 0]], "减少弹药容量和武器后坐力", "霰弹枪", "-", "r", 9],
  // ["Double-Barrel Drift", "游离双管", [["PVP", 0]], "滑行时,降低霰弹枪的后坐力和弹片扩散程度", "霰弹枪", "r", "r", 9],
  // ["Shred Shot", "撕碎射击", [["PVP", 0]], "转换霰弹枪部分物理伤害为穿刺伤害", "霰弹枪", "r", "c", 5],
  // ["Crash Shot", "溃散射击", [["PVP", 0]], "转换霰弹枪部分物理伤害为冲击伤害", "霰弹枪", "r", "c", 5],
  // ["Flak Shot", "高射炮击", [["PVP", 0]], "转换霰弹枪部分物理伤害为切割伤害", "霰弹枪", "r", "c", 5],
  // 手枪
  ["Hornet Strike", "黄蜂蛰刺", [["D", 2.2]], "增加基础伤害", "手枪", "r", "c", 14],
  ["Barrel Diffusion", "弹头扩散", [["S", 1.2]], "增加多重射击", "手枪", "r", "r", 11],
  ["Lethal Torrent", "致命洪流", [["R", 0.6], ["S", 0.6]], "增加攻击速度 增加多重射击", "手枪", "r", "r", 11],
  ["Pistol Gambit", "手枪精通", [["0", 1.2]], "增加暴击几率", "手枪", "r", "n", 9],
  ["Primed Pistol Gambit", "手枪精通 Prime", [["0", 1.87]], "增加暴击几率", "手枪", "r", "l", 14],
  ["Target Cracker", "弱点专精", [["1", 0.6]], "增加暴击伤害", "手枪", "r", "c", 9],
  ["Primed Target Cracker", "弱点专精 Prime", [["1", 1.2]], "增加暴击伤害", "手枪", "r", "l", 14],
  ["Hydraulic Crosshairs", "液压准心", [["0", 1.35]], "在爆头后的一段时间内增加瞄准时的暴击几率", "手枪", "r", "n", 7],
  ["Embedded Catalyzer", "内置触媒", [["2", 0.9]], "在使用技能后的一段时间内增加瞄准时的异常状态触发几率", "手枪", "r", "c", 9],
  ["Pressurized Magazine", "增压弹匣", [["R", 0.9]], "在上弹后的一段时间内提升瞄准时的射速", "手枪", "r", "r", 9],
  ["Targeting Subsystem", "定位辅助", [["精准度", 0.3]], "在命中敌人后的一段时间内提升瞄准时的精准度", "手枪", "r", "c", 7],
  ["Sharpened Bullets", "尖锐子弹", [["1", 0.75]], "在完成击杀后的一段时间内提升瞄准时的暴击伤害", "手枪", "r", "c", 7],
  ["No Return", "有去无回", [["9", 0.6]], "增加基础穿刺伤害", "手枪", "-", "c", 7],
  ["Bore", "枪膛", [["9", 1.2]], "增加基础穿刺伤害", "手枪", "-", "r", 11],
  ["Razor Shot", "剃刀射击", [["A", 0.6]], "增加基础切割伤害", "手枪", "-", "c", 7],
  ["Maim", "致残枪弹", [["A", 1.2]], "增加基础切割伤害", "手枪", "-", "c", 11],
  ["Concussion Rounds", "震荡弹头", [["8", 0.6]], "增加基础冲击伤害", "手枪", "-", "c", 7],
  ["Pummel", "强力猛击", [["8", 1.2]], "增加基础冲击伤害", "手枪", "-", "c", 11],
  ["Heated Charge", "火焰装填", [["4", 0.9]], "使武器攻击附加火焰伤害", "手枪", "-", "c", 11],
  ["Primed Heated Charge", "火焰装填 Prime", [["4", 1.65]], "使武器攻击附加火焰伤害", "手枪", "-", "l", 16],
  ["Convulsion", "痉挛", [["7", 0.9]], "使武器攻击附加电击伤害", "手枪", "-", "c", 11],
  ["Deep Freeze", "深层冷冻", [["5", 0.9]], "使武器攻击附加冰冻伤害", "手枪", "d", "c", 11],
  ["Pathogen Rounds", "病原弹头", [["6", 0.9]], "使武器攻击附加毒素伤害", "手枪", "-", "c", 11],
  ["Pistol Pestilence", "瘟疫手枪", [["6", 0.6], ["2", 0.6]], "使武器攻击附加毒素伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["Jolt", "电流震击", [["7", 0.6], ["2", 0.6]], "使武器攻击附加电击伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["Scorch", "灼痕焦点", [["4", 0.6], ["2", 0.6]], "使武器攻击附加火焰伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["Frostbite", "结霜侵蚀", [["5", 0.6], ["2", 0.6]], "使武器攻击附加冰冻伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["Ice Storm", "冰风暴", [["L", 0.4], ["5", 0.4]], "使武器攻击附加冰冻伤害 增加弹匣容量", "手枪", "r", "r", 9],
  ["Creeping Bullseye", "匍匐靶心", [["0", 0.48], ["R", -0.36]], "增加暴击几率 减少攻击速度", "手枪", "-", "r", 9],
  ["Expel Corpus", "驱逐 Corpus", [["C", 0.3]], "增加对 Corpus单位的伤害", "手枪", "r", "c", 9],
  ["Expel Grineer", "驱逐 Grineer", [["G", 0.3]], "增加对 Grineer单位的伤害", "手枪", "r", "c", 9],
  ["Expel Infested", "驱逐 Infested", [["I", 0.3]], "增加对 Infested单位的伤害", "手枪", "r", "c", 9],
  ["Expel Corrupted", "驱逐堕落者", [["对堕落者伤害", 0.3]], "提升对堕落者单位的伤害", "手枪", "r", "c", 9],
  ["Anemic Agility", "乏能迅敏", [["R", 0.9], ["D", -0.15]], "增加攻击速度 减少基础伤害", "手枪", "-", "r", 9],
  ["Gunslinger", "神枪手", [["R", 0.72]], "增加攻击速度", "手枪", "r", "c", 9],
  ["Hawk Eye", "隼目", [["H", 0.8]], "增加瞄准变焦", "手枪", "-", "c", 9],
  ["Hollow Point", "空尖弹", [["1", 0.6], ["D", -0.15]], "增加暴击伤害 减少基础伤害", "手枪", "-", "r", 9],
  ["Magnum Force", "重装火力", [["D", 0.66], ["精准度", -0.33]], "增加基础伤害减少精准度", "手枪", "r", "r", 14],
  ["Quickdraw", "持续火力", [["F", 0.48]], "减少上弹时间", "手枪", "-", "n", 7],
  ["Primed Quickdraw", "持续火力 Prime", [["F", 0.88]], "减少上弹时间", "手枪", "-", "l", 12],
  ["Seeker", "弹头导引", [["P", 2.1]], "使子弹附加穿透效果", "手枪", "-", "r", 9],
  ["Slip Magazine", "串联弹匣", [["L", 0.3]], "增加弹匣容量", "手枪", "-", "n", 9],
  ["Primed Slip Magazine", "串联弹匣 Prime", [["L", 0.55]], "增加弹匣容量", "手枪", "-", "l", 9],
  ["Steady Hands", "稳定枪手", [["Z", -0.6]], "减少开火时造成的准星偏移", "手枪", "-", "r", 9],
  ["Stunning Speed", "慑人神速", [["F", 0.4], ["2", 0.1]], "增加异常触发几率 减少上弹时间", "手枪", "-", "r", 9],
  ["Suppress", "消音", [["噪音", -1]], "减少开火时发出的噪音", "手枪", "-", "n", 5],
  ["Sure Shot", "准确射手", [["2", 0.15]], "增加异常触发几率", "手枪", "d", "c", 7],
  ["Tainted Clip", "感染弹匣", [["L", 0.6], ["F", -0.3]], "增加弹匣容量 增加上弹时间", "手枪", "-", "r", 9],
  ["Trick Mag", "戏法增幅", [["M", 0.9]], "增加弹药最大值", "手枪", "-", "n", 7],
  // ["Pistol Ammo Mutation", "手枪弹药转换", [["弹药转换", 0]], "将任意尚未被拾起的其他种类弹药转换成手枪弹药", "手枪", "-", "r", 9],
  // ["Primed Pistol Ammo Mutation", "手枪弹药转换 Prime", [["弹药转换", 0]], "将任意尚未被拾起的其他种类弹药转换成手枪弹药", "手枪", "-", "r", 14],
  // ["Ruinous Extension", "毁灭扩展", [["射程", 8]], "增加射线类武器的射程", "手枪", "-", "c", 5],
  // 近战
  ["Gladiator Rush", "角斗士 猛突", [["N", 6], ["连击数增加暴击率", 0.15]], "随着近战连击数增加触发机率", "近战", "r", "n", 9],
  ["Gladiator Vice", "角斗士 钳制", [["J", 0.3], ["连击数增加暴击率", 0.15]], "随着近战连击数增加触发机率", "近战", "r", "r", 9],
  ["Gladiator Might", "角斗士 威猛", [["1", 0.6], ["连击数增加暴击率", 0.15]], "随着近战连击数增加触发机率", "近战", "r", "c", 9],
  ["Blood Rush", "急进猛突", [["连击数增加暴击率", 1.65]], "随着近战连击数增加暴击机率", "近战", "r", "c", 14],
  ["Weeping Wounds", "创口溃烂", [["连击数增加触发率", 0.45]], "随着近战连击数增加触发机率", "近战", "r", "c", 9],
  ["Condition Overload", "异况超量", [["异常状态增加近战伤害", 0.6]], "根据已触发的异常状态增加对目标的近战伤害", "近战", "r", "r", 15],
  // ["Guardian Derision", "奚落守护", [["独立卡", 0]], "当格挡时增加 攻击者对你的仇恨值", "近战", "d", "r", 11],
  // ["Healing Return", "治愈归复", [["独立卡", 0]], "当攻击触发了异常状态的目标时恢复 生命值", "近战", "d", "r", 16],
  // ["Energy Channel", "能量导引", [["独立卡", 0]], "在攻击中加入基于战甲能力的能量消耗量的额外近战伤害", "近战", "r", "r", 7],
  ["Relentless Combination", "残酷组合", [["残酷组合", 1]], "当攻击触发了切割状态的目标时，有几率获得额外的近战连击数", "近战", "-", "c", 9],
  ["Pressure Point", "压迫点", [["K", 1.2]], "增加基础近战伤害", "近战", "r", "n", 9],
  ["Primed Pressure Point", "压迫点 Prime", [["K", 1.65]], "增加基础近战伤害", "近战", "r", "n", 14],
  ["Spoiled Strike", "腐坏打击", [["K", 1], ["J", -0.2]], "增加 基础伤害减少 攻击速度", "近战", "r", "r", 7],
  ["Reach", "剑风", [["T", 0.6]], "增加近战攻击的攻击范围", "近战", "r", "n", 9],
  ["Primed Reach", "剑风 Prime", [["T", 1.65]], "增加近战攻击的攻击范围", "近战", "r", "l", 14],
  ["Maiming Strike", "致残突击", [["E", 0.9]], "滑行攻击时增加暴击机率", "近战", "r", "r", 7],
  ["Body Count", "杀伤计数", [["N", 12]], "延长近战连击数的判定时间", "近战", "r", "n", 9],
  ["Berserker", "狂战士", [["J", 0.75]], "在暴击后一段时间内增加攻击速度", "近战", "r", "r", 9],
  ["Fury", "狂暴", [["J", 0.3]], "增加攻击速度", "近战", "r", "c", 9],
  ["True Steel", "斩铁", [["0", 0.6]], "增加暴击机率", "近战", "r", "n", 9],
  ["Organ Shatter", "肢解", [["1", 0.9]], "增加暴击伤害", "近战", "r", "n", 9],
  ["Heavy Trauma", "重创", [["8", 0.9]], "增加冲击伤害", "近战", "-", "r", 9],
  ["Collision Force", "冲击巨力", [["8", 1.2]], "增加冲击伤害", "近战", "-", "r", 11],
  ["Primed Heavy Trauma", "重创 Prime", [["8", 1.65]], "增加基础冲击伤害", "近战", "-", "l", 14],
  ["Sundering Strike", "破甲", [["9", 0.9]], "增加穿刺伤害", "近战", "-", "r", 9],
  ["Auger Strike", "螺钻打击", [["9", 1.2]], "增加穿刺伤害", "近战", "-", "r", 11],
  ["Jagged Edge", "锯刃", [["A", 0.9]], "增加切割伤害", "近战", "-", "r", 9],
  ["Buzz Kill", "败兴虐杀", [["A", 1.2]], "增加切割伤害", "近战", "-", "r", 11],
  ["Fever Strike", "热病打击", [["6", 0.9]], "使武器攻击附加毒素伤害", "近战", "-", "c", 11],
  ["Primed Fever Strike", "热病打击 Prime", [["6", 1.65]], "使武器攻击附加毒素伤害", "近战", "-", "l", 16],
  ["Molten Impact", "熔岩冲击", [["4", 0.9]], "使武器攻击附加火焰伤害", "近战", "-", "c", 11],
  ["North Wind", "北风", [["5", 0.9]], "使武器攻击附加冰冻伤害", "近战", "d", "c", 11],
  ["Shocking Touch", "电击触点", [["7", 0.9]], "使武器攻击附加电击伤害", "近战", "-", "c", 11],
  ["Vicious Frost", "蚀骨寒霜", [["5", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入冰冻伤害", "近战", "r", "r", 7],
  ["Virulent Scourge", "剧毒灾害", [["6", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入毒素伤害", "近战", "r", "r", 7],
  ["Volcanic Edge", "爆裂刀刃", [["4", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入火焰伤害", "近战", "r", "r", 7],
  ["Voltaic Strike", "伏打电能", [["7", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入电击伤害", "近战", "r", "r", 7],
  ["Finishing Touch", "画龙点睛", [["X", 0.6]], "增加终结伤害", "近战", "r", "c", 9],
  ["Corrupt Charge", "邪恶蓄力", [["B", 1], ["U", -0.4]], "增加导引伤害 减少导引效率", "近战", "r", "r", 7],
  ["Dispatch Overdrive", "超速击杀", [["移动速度", 0.6]], "在导引期间增加移动速度", "近战", "-", "c", 9],
  ["Drifting Contact", "漂移接触", [["N", 10], ["2", 0.4]], "增加 近战连击数的判定时间/增加 触发机率", "近战", "d", "r", 5],
  ["Enduring Affliction", "长时苦难", [["击中时的状态持续时间", 1.5]], "当导引时增加额外的触发时间 减少导引效率", "近战", "d", "c", 9],
  ["Enduring Strike", "不朽打击", [["2", 0.6], ["U", -0.4]], "增加触发机率 减少导引效率", "近战", "=", "n", 7],
  ["Focus Energy", "聚焦能量", [["U", 0.4], ["7", 0.6]], "增加导引效率 / 使武器攻击附加电击伤害 ", "近战", "r", "r", 9],
  ["Focused Defense", "重点防御", [["护甲", 0.2], ["U", -1.4]], "增加护甲 当导引时减少导引效率", "近战", "d", "n", 9],
  ["Life Strike", "生命打击", [["生命窃取", 0.2], ["U", -1.4]], "使用导引近战攻击时偷取一定生命/减少 导引效率", "近战", "d", "r", 9],
  ["Primed Fury", "狂暴 Prime", [["J", 0.55]], "增加攻击速度", "近战", "r", "c", 14],
  ["Killing Blow", "一击必杀", [["B", 1.2]], "增加导引伤害", "近战", "r", "c", 9],
  ["Lasting Sting", "未完之刺", [["3", 1.1]], "增加异常状态的持续时间", "近战", "r", "n", 9],
  ["Melee Prowess", "非凡技巧", [["2", 0.15]], "增加异常状态触发机率", "近战", "d", "n", 9],
  ["Blocking", "格挡", [["反击几率", 0.9]], "使格挡有几率击倒近战攻击者", "近战", "d", "n", 9],
  ["Speed", "加速", [["J", 0.2], ["U", -0.8]], "增加攻击速度 减少导引效率", "近战", "r", "r", 9],
  ["Reflex Coil", "增幅线圈", [["U", 0.6]], "增加导引效率", "近战", "-", "c", 9],
  ["Rending Strike", "撕裂打击", [["A", 0.6], ["9", 0.8]], "增加基础穿刺和切割伤害", "近战", "-", "r", 9],
  ["Smite Corpus", "毁灭 Corpus", [["C", 0.3]], "增加对 Corpus 位造成的伤害", "近战", "r", "c", 9],
  ["Smite Grineer", "毁灭 Grineer", [["G", 0.3]], "增加对 Grineer单位造成的伤害", "近战", "r", "c", 9],
  ["Smite Infested", "毁灭 Infested", [["I", 0.3]], "增加对 Infested 单位造成的伤害", "近战", "r", "c", 9],
  ["Smite Corrupted", "毁灭堕落者", [["对堕落者伤害", 0.3]], "增加对堕落者单位造成的伤害", "近战", "r", "c", 9],
  ["Seismic Wave", "震波", [["近战震地伤害", 2]], "增加近战武器震地攻击伤害", "近战", "r", "n", 9],
  ["True Punishment", "真实惩罚", [["0", 0.4], ["U", -0.6]], "增加暴击机率 减少导引效率", "近战", "=", "n", 7],
  ["Power Throw", "奋力一掷", [["P", 0.6]], "增加投掷武器的穿透 （如战刃, 战刃 Prime, 哈利卡,和红隼），对其他武器无效", "投掷武器", "r", "r", 9],
  ["Quick Return", "快速收回", [["弹跳", -4]], "减少投掷武器（如战刃, 战刃 Prime, 哈利卡,和红隼）的弹跳次数", "投掷武器", "-", "n", 7],
  ["Rebound", "弹跳", [["弹跳", 4]], "增加投掷武器（如战刃, 战刃 Prime, 哈利卡,和红隼）的弹跳次数", "投掷武器", "-", "n", 7],
  ["Whirlwind", "旋风", [["飞行速度", 1.8]], "增加投掷武器（如战刃, 战刃 Prime, 哈利卡,和红隼）的飞行速度", "投掷武器", "-", "r", 7],
  ["Justice Blades", "正义刀锋", [["K", 1]], "增加近战伤害和正义效果", "斩肉双刀", "r", "r", 9],
] as [string, string, [string, number][], string, string, "r" | "-" | "d" | "=", "n" | "c" | "r" | "l" | "x", number][];
/**
 * 普通MOD信息
 */
export const NormalModDatabase = _normalModSource.map(v => {
  let pr = _normalModSource.find(k => k[0] === "Primed " + v[0]);
  return {
    id: v[0],
    name: v[1],
    props: v[2],
    desc: v[3],
    type: v[4],
    cost: 0,
    polarity: v[5],
    rarity: v[6],
    primed: pr && pr[0]
  } as NormalMod;
});

export const NormalCardDependTable: [string, string][] = [
  ["尖刃弹头", "弱点感应"],
  ["重口径", "膛线"],
];

export const AcolyteModsList: string[] = [
  "创口溃烂", "急进猛突", "杀伤计数", "致残突击", "重点防御",
  "制导弹药", "尖刃弹头", "氩晶瞄具", "簧压膛室", "触媒连动",
  "狭窄枪膛", "破片射击", "纳米涂覆", "转轮弹匣", "雷射瞄具",
  "内置触媒", "增压弹匣", "定位辅助", "尖锐子弹", "液压准心",
];
/**
 * 主要工具类
 */
export class RivenDataBase {
  private weaponDict = new Map<string, number>()
  private propDict = new Map<string, number>()

  private static instance = new RivenDataBase();

  static PropRegExps = {
    gun: new RegExp(`(?:(${RivenPropertyDataBase.gun.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.gun.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.gun.map(v => v.subfix).join("|")})`, "i"),
    melee: new RegExp(`(?:(${RivenPropertyDataBase.melee.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.melee.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.melee.map(v => v.subfix).join("|")})`, "i"),
  }
  static PrefixAll = new RegExp(`(?:${RivenPropertyDataBase.all.map(v => v.prefix).join("|")})`, "i")

  constructor() {
    // 同时添加中英文名称
    RivenWeaponDataBase.forEach((v, i) => { this.weaponDict.set(v.id, i); this.weaponDict.set(v.name, i); });
    RivenPropertyDataBase.all.forEach((v, i) => { this.propDict.set(v.id, i); this.propDict.set(v.name, i); });
  }
  /**
   * 查询是否有这个武器
   * @param name 武器名称
   */
  static hasWeapon(name: string) {
    return this.instance.weaponDict.has(name);
  }

  /**
   * 获取武器
   * @param name 武器名称
   */
  static getRivenWeaponByName(name: string) {
    return RivenWeaponDataBase[this.instance.weaponDict.get(name)];
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
    let propFinded = _.maxBy(RivenPropertyDataBase.all, v => strSimilarity(prop, v.name));
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
   * @param stype 类型 ["gun" | "melee"]
   * @param isPrefix 是否是前缀
   */
  static getPropByTag(tag: string, stype: "gun" | "melee", isPrefix: boolean) {
    return RivenPropertyDataBase[stype].find(v => v[isPrefix ? "prefix" : "subfix"] == tag);
  }

  /**
   * 获取属性基础值
   * @param weaponName 武器名
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
