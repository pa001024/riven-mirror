import { strSimilarity } from "./util"
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
}

const baseProperty: RivenProperty[] = [
  { id: '0', name: "暴击率", prefix: "crita", subfix: "cron" },
  { id: '1', name: "暴击伤害", prefix: "acri", subfix: "tis" },
  { id: '2', name: "触发几率", prefix: "hexa", subfix: "dex" },
  { id: '3', name: "触发时间", prefix: "deci", subfix: "des" },
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
];

const gunProperty: RivenProperty[] = [
  { id: 'D', name: "伤害", prefix: "visi", subfix: "ata" },
  { id: 'S', name: "多重射击", prefix: "sati", subfix: "can" },
  { id: 'R', name: "射速（弓类武器效果加倍）", prefix: "croni", subfix: "dra" },
  { id: 'L', name: "弹匣容量", prefix: "arma", subfix: "tin" },
  { id: 'F', name: "装填速度", prefix: "feva", subfix: "tak" },
  { id: 'M', name: "弹药最大值", prefix: "ampi", subfix: "bin" },
  { id: 'P', name: "穿透", prefix: "lexi", subfix: "nok", onlyPositive: true, nopercent: true },
  { id: 'H', name: "变焦", prefix: "hera", subfix: "lis" },
  { id: 'V', name: "抛射物飞行速度", prefix: "conci", subfix: "nak" },
  { id: 'Z', name: "后坐力", prefix: "zeti", subfix: "mag", negative: true },
];

const meleeProperty: RivenProperty[] = [
  { id: 'K', name: "近战伤害", prefix: "visi", subfix: "ata" },
  { id: 'T', name: "攻击范围", prefix: "locti", subfix: "tor" },
  { id: 'J', name: "攻击速度", prefix: "croni", subfix: "dra" },
  { id: 'B', name: "充能伤害", prefix: "tori", subfix: "bo" },
  { id: 'U', name: "充能效率", prefix: "uti", subfix: "tia" },
  { id: 'N', name: "连击持续时间", prefix: "tempi", subfix: "nem", nopercent: true },
  { id: 'E', name: "滑行攻击造成暴击几率", prefix: "pleci", subfix: "nent" },
  { id: 'X', name: "处决伤害", prefix: "exi", subfix: "cta" },
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
    D: 16.5,// 伤害
    S: 12,  // 多重射击
    R: 6,   // 射速（弓类武器效果加倍）
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

export const RivenWeaponDataBase: RivenWeapon[] = [
  {
    "id": "Dex Dakra",
    "name": "DEX 达克拉双剑",
    "ratio": 1.15,
    "mod": "Melee"
  }, {
    "id": "Endura",
    "name": "三叶坚韧",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Dual Zoren",
    "name": "佐伦双斧",
    "ratio": 1.44,
    "mod": "Melee"
  }, {
    "id": "Nikana",
    "name": "侍刃",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Cronus",
    "name": "克洛诺斯",
    "ratio": 1.48,
    "mod": "Melee"
  }, {
    "id": "Krohkur",
    "name": "克鲁古尔",
    "ratio": 1.22,
    "mod": "Melee"
  }, {
    "id": "Guandao",
    "name": "关刀",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Gunsen",
    "name": "军扇",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Venka",
    "name": "凯旋之爪",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Karyst",
    "name": "凯洛斯特",
    "ratio": 1.29,
    "mod": "Melee"
  }, {
    "id": "Scindo",
    "name": "分裂斩斧",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Volnus",
    "name": "创伤",
    "ratio": 1.2,
    "mod": "Melee"
  }, {
    "id": "Gazal Machete",
    "name": "加扎勒反曲刀",
    "ratio": 1.35,
    "mod": "Melee"
  }, {
    "id": "Lecta",
    "name": "勒克塔",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Amphis",
    "name": "双头蛇",
    "ratio": 1.5,
    "mod": "Melee"
  }, {
    "id": "Twin Krohkur",
    "name": "双子克鲁古尔",
    "ratio": 1.48,
    "mod": "Melee"
  }, {
    "id": "Twin Basolk",
    "name": "双子巴萨克",
    "ratio": 1.18,
    "mod": "Melee"
  }, {
    "id": "Dual Kamas",
    "name": "双短柄战镰",
    "ratio": 0.81,
    "mod": "Melee"
  }, {
    "id": "Shaku",
    "name": "双节尺棍",
    "ratio": 1.35,
    "mod": "Melee"
  }, {
    "id": "Halikar",
    "name": "哈利卡",
    "ratio": 1.44,
    "mod": "Melee"
  }, {
    "id": "Jat Kittag",
    "name": "喷射战锤",
    "ratio": 0.75,
    "mod": "Melee"
  }, {
    "id": "Jat Kusar",
    "name": "喷射锁镰",
    "ratio": 0.81,
    "mod": "Melee"
  }, {
    "id": "Anku",
    "name": "夺魂死神",
    "ratio": 1.46,
    "mod": "Melee"
  }, {
    "id": "Obex",
    "name": "奥比克斯",
    "ratio": 1.1,
    "mod": "Melee"
  }, {
    "id": "Scoliac",
    "name": "嵴椎节鞭",
    "ratio": 1.3,
    "mod": "Melee"
  }, {
    "id": "Sheev",
    "name": "希芙",
    "ratio": 1.25,
    "mod": "Melee"
  }, {
    "id": "Silva & Aegis",
    "name": "席瓦 & 神盾",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Furax",
    "name": "弗拉克斯",
    "ratio": 1.38,
    "mod": "Melee"
  }, {
    "id": "Arca Titron",
    "name": "弧电振子锤",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Kesheg",
    "name": "怯薛",
    "ratio": 1.24,
    "mod": "Melee"
  }, {
    "id": "Dual Ichor",
    "name": "恶脓双斧",
    "ratio": 1.16,
    "mod": "Melee"
  }, {
    "id": "Sydon",
    "name": "恶龙",
    "ratio": 0.84,
    "mod": "Melee"
  }, {
    "id": "Lacera",
    "name": "悲痛之刃",
    "ratio": 1.31,
    "mod": "Melee"
  }, {
    "id": "Hate",
    "name": "憎恨",
    "ratio": 1.36,
    "mod": "Melee"
  }, {
    "id": "War",
    "name": "战争之剑",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Magistar",
    "name": "执法者",
    "ratio": 1.09,
    "mod": "Melee"
  }, {
    "id": "Destreza",
    "name": "技巧之剑",
    "ratio": 1.14,
    "mod": "Melee"
  }, {
    "id": "Tipedo",
    "name": "提佩多",
    "ratio": 1.31,
    "mod": "Melee"
  }, {
    "id": "Redeemer",
    "name": "救赎者",
    "ratio": 1.17,
    "mod": "Melee"
  }, {
    "id": "Dual Cleavers",
    "name": "斩肉双刀",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Prova",
    "name": "普罗沃",
    "ratio": 1.29,
    "mod": "Melee"
  }, {
    "id": "Dark Split-Sword",
    "name": "暗黑分合剑",
    "ratio": 1.21,
    "mod": "Melee"
  }, {
    "id": "Dark Sword",
    "name": "暗黑长剑",
    "ratio": 1.48,
    "mod": "Melee"
  }, {
    "id": "Gram",
    "name": "格拉姆",
    "ratio": 1.44,
    "mod": "Melee"
  }, {
    "id": "Orthos",
    "name": "欧特鲁斯",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Ohma",
    "name": "欧玛",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Nami Solo",
    "name": "海波单剑",
    "ratio": 1.43,
    "mod": "Melee"
  }, {
    "id": "Nami Skyla",
    "name": "海波斯库拉对剑",
    "ratio": 1.175,
    "mod": "Melee"
  }, {
    "id": "Orvius",
    "name": "灵枢",
    "ratio": 1.15,
    "mod": "Melee"
  }, {
    "id": "Heat Dagger",
    "name": "烈焰短剑",
    "ratio": 1.44,
    "mod": "Melee"
  }, {
    "id": "Mios",
    "name": "牝狮神",
    "ratio": 0.95,
    "mod": "Melee"
  }, {
    "id": "Fang",
    "name": "狼牙",
    "ratio": 1.36,
    "mod": "Melee"
  }, {
    "id": "Bo",
    "name": "玻之武杖",
    "ratio": 1.29,
    "mod": "Melee"
  }, {
    "id": "Ankyros",
    "name": "甲龙双拳",
    "ratio": 1.45,
    "mod": "Melee"
  }, {
    "id": "Serro",
    "name": "电能斩锯",
    "ratio": 1.38,
    "mod": "Melee"
  }, {
    "id": "Lesion",
    "name": "病变",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Kronen",
    "name": "皇家拐刃",
    "ratio": 1.43,
    "mod": "Melee"
  }, {
    "id": "Kama",
    "name": "短柄战镰",
    "ratio": 1.47,
    "mod": "Melee"
  }, {
    "id": "Broken Scepter",
    "name": "破损珽杖",
    "ratio": 1.19,
    "mod": "Melee"
  }, {
    "id": "Broken-War",
    "name": "破碎的战争之剑",
    "ratio": 0.79,
    "mod": "Melee"
  }, {
    "id": "Kogake",
    "name": "科加基",
    "ratio": 1.46,
    "mod": "Melee"
  }, {
    "id": "Skana",
    "name": "空刃",
    "ratio": 1.22,
    "mod": "Melee"
  }, {
    "id": "Dual Skana",
    "name": "空刃双刀",
    "ratio": 1.48,
    "mod": "Melee"
  }, {
    "id": "Kestrel",
    "name": "红隼",
    "ratio": 1.45,
    "mod": "Melee"
  }, {
    "id": "Okina",
    "name": "翁",
    "ratio": 1.31,
    "mod": "Melee"
  }, {
    "id": "Ether Sword",
    "name": "苍穹之剑",
    "ratio": 1.44,
    "mod": "Melee"
  }, {
    "id": "Ether Daggers",
    "name": "苍穹匕首",
    "ratio": 1.49,
    "mod": "Melee"
  }, {
    "id": "Dual Ether",
    "name": "苍穹双剑",
    "ratio": 1.45,
    "mod": "Melee"
  }, {
    "id": "Ether Reaper",
    "name": "苍穹死神",
    "ratio": 1.45,
    "mod": "Melee"
  }, {
    "id": "Hirudo",
    "name": "蚂蝗",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Sarpa",
    "name": "蛇刃",
    "ratio": 1.24,
    "mod": "Melee"
  }, {
    "id": "Jaw Sword",
    "name": "蛇颚刀",
    "ratio": 1.47,
    "mod": "Melee"
  }, {
    "id": "Tonbo",
    "name": "蜻蛉薙",
    "ratio": 1.38,
    "mod": "Melee"
  }, {
    "id": "Boltace",
    "name": "螺钉拐刃",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Cerata",
    "name": "裸鳃刃",
    "ratio": 1.36,
    "mod": "Melee"
  }, {
    "id": "Sibear",
    "name": "西伯利亚冰锤",
    "ratio": 1.35,
    "mod": "Melee"
  }, {
    "id": "Ack & Brunt",
    "name": "认知&冲击",
    "ratio": 0.9,
    "mod": "Melee"
  }, {
    "id": "Heliocor",
    "name": "赫利俄光锤",
    "ratio": 0.94,
    "mod": "Melee"
  }, {
    "id": "Galatine",
    "name": "迦伦提恩",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Fragor",
    "name": "重击巨锤",
    "ratio": 0.96,
    "mod": "Melee"
  }, {
    "id": "Tekko",
    "name": "铁钩手甲",
    "ratio": 1.4,
    "mod": "Melee"
  }, {
    "id": "Dual Raza",
    "name": "锋月双斧",
    "ratio": 1.4,
    "mod": "Melee"
  }, {
    "id": "Ripkas",
    "name": "锐卡斯",
    "ratio": 1.38,
    "mod": "Melee"
  }, {
    "id": "Atterax",
    "name": "阿特拉克斯",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Ninkondi",
    "name": "降灵追猎者",
    "ratio": 1.41,
    "mod": "Melee"
  }, {
    "id": "Machete",
    "name": "马谢特砍刀",
    "ratio": 1.45,
    "mod": "Melee"
  }, {
    "id": "Pangolin Sword",
    "name": "鲮鲤剑",
    "ratio": 1.47,
    "mod": "Melee"
  }, {
    "id": "Cassowar",
    "name": "鹤鸵长戟",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Dragon Nikana",
    "name": "龙之侍刃",
    "ratio": 1.35,
    "mod": "Melee"
  }, {
    "id": "Dark Dagger",
    "name": "暗黑匕首",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Dual Heat Swords",
    "name": "烈焰双剑",
    "ratio": 1.44,
    "mod": "Melee"
  }, {
    "id": "Ceramic Dagger",
    "name": "陶瓷匕首",
    "ratio": 1.43,
    "mod": "Melee"
  }, {
    "id": "Plasma Sword",
    "name": "等离子长剑",
    "ratio": 1.48,
    "mod": "Melee"
  }, {
    "id": "Glaive",
    "name": "战刃",
    "ratio": 1.22,
    "mod": "Melee"
  }, {
    "id": "Mire",
    "name": "米尔",
    "ratio": 1.43,
    "mod": "Melee"
  }, {
    "id": "Heat Sword",
    "name": "烈焰长剑",
    "ratio": 1.48,
    "mod": "Melee"
  }, {
    "id": "Caustacyst",
    "name": "灼蚀变体镰",
    "ratio": 1.3,
    "mod": "Melee"
  }, {
    "id": "Sigma & Octantis",
    "name": "西格玛 & 南极座",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Dex Sybaris",
    "name": "DEX 席芭莉丝",
    "ratio": 0.895,
    "mod": "Rifle"
  }, {
    "id": "Ignis",
    "name": "伊格尼斯",
    "ratio": 0.79,
    "mod": "Rifle"
  }, {
    "id": "Burston",
    "name": "伯斯顿",
    "ratio": 1.175,
    "mod": "Rifle"
  }, {
    "id": "Glaxion",
    "name": "冷冻光束步枪",
    "ratio": 1.35,
    "mod": "Rifle"
  }, {
    "id": "Karak",
    "name": "卡拉克",
    "ratio": 1.28,
    "mod": "Rifle"
  }, {
    "id": "Tenora",
    "name": "双簧管",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Harpak",
    "name": "哈帕克",
    "ratio": 1.55,
    "mod": "Rifle"
  }, {
    "id": "Phage",
    "name": "噬菌者",
    "ratio": 1.5,
    "mod": "Shotgun"
  }, {
    "id": "Daikyu",
    "name": "大久和弓",
    "ratio": 1.21,
    "mod": "Rifle"
  }, {
    "id": "Quartakk",
    "name": "夸塔克",
    "ratio": 1.2,
    "mod": "Rifle"
  }, {
    "id": "Opticor",
    "name": "奥堤克光子枪",
    "ratio": 1.21,
    "mod": "Rifle"
  }, {
    "id": "Amprex",
    "name": "安培克斯",
    "ratio": 0.96,
    "mod": "Rifle"
  }, {
    "id": "Kohm",
    "name": "寇恩热能枪",
    "ratio": 1.4,
    "mod": "Shotgun"
  }, {
    "id": "Convectrix",
    "name": "导热聚焦枪",
    "ratio": 1.45,
    "mod": "Shotgun"
  }, {
    "id": "Buzlok",
    "name": "巴兹火枪",
    "ratio": 1.55,
    "mod": "Rifle"
  }, {
    "id": "Braton",
    "name": "布莱顿",
    "ratio": 0.96,
    "mod": "Rifle"
  }, {
    "id": "Paris",
    "name": "帕里斯",
    "ratio": 0.96,
    "mod": "Rifle"
  }, {
    "id": "Sybaris",
    "name": "席芭莉丝",
    "ratio": 0.9,
    "mod": "Rifle"
  }, {
    "id": "Mutalist Cernos",
    "name": "异融 西诺斯",
    "ratio": 1.21,
    "mod": "Rifle"
  }, {
    "id": "Mutalist Quanta",
    "name": "异融量子枪",
    "ratio": 1.55,
    "mod": "Rifle"
  }, {
    "id": "Arca Plasmor",
    "name": "弧电离子枪",
    "ratio": 0.9,
    "mod": "Shotgun"
  }, {
    "id": "Tonkor",
    "name": "征服榴炮",
    "ratio": 0.55,
    "mod": "Rifle"
  }, {
    "id": "Dera",
    "name": "德拉",
    "ratio": 1.25,
    "mod": "Rifle"
  }, {
    "id": "Dread",
    "name": "恐惧",
    "ratio": 0.82,
    "mod": "Rifle"
  }, {
    "id": "Torid",
    "name": "托里德",
    "ratio": 1.14,
    "mod": "Rifle"
  }, {
    "id": "Latron",
    "name": "拉特昂",
    "ratio": 1.07,
    "mod": "Rifle"
  }, {
    "id": "Stradalet",
    "name": "斯特拉迪瓦",
    "ratio": 1.18,
    "mod": "Rifle"
  }, {
    "id": "Strun",
    "name": "斯特朗",
    "ratio": 1.4,
    "mod": "Shotgun"
  }, {
    "id": "Soma",
    "name": "月神",
    "ratio": 0.5,
    "mod": "Rifle"
  }, {
    "id": "Lenz",
    "name": "楞次弓",
    "ratio": 0.9,
    "mod": "Rifle"
  }, {
    "id": "Argonak",
    "name": "氩格纳克",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Zarr",
    "name": "沙皇",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Hek",
    "name": "海克",
    "ratio": 0.55,
    "mod": "Shotgun"
  }, {
    "id": "Penta",
    "name": "潘塔",
    "ratio": 1.18,
    "mod": "Rifle"
  }, {
    "id": "Javlok",
    "name": "燃焰标枪",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Tetra",
    "name": "特拉",
    "ratio": 1.5,
    "mod": "Rifle"
  }, {
    "id": "Tiberon",
    "name": "狂鲨",
    "ratio": 1.5,
    "mod": "Rifle"
  }, {
    "id": "Panthera",
    "name": "猎豹",
    "ratio": 1.55,
    "mod": "Rifle"
  }, {
    "id": "Tigris",
    "name": "猛虎",
    "ratio": 0.55,
    "mod": "Shotgun"
  }, {
    "id": "Astilla",
    "name": "碎裂者",
    "ratio": 1.2,
    "mod": "Shotgun"
  }, {
    "id": "Scourge",
    "name": "祸根",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Miter",
    "name": "米特尔",
    "ratio": 1.6,
    "mod": "Rifle"
  }, {
    "id": "Baza",
    "name": "苍鹰",
    "ratio": 1.1,
    "mod": "Rifle"
  }, {
    "id": "Supra",
    "name": "苏普拉",
    "ratio": 1.14,
    "mod": "Rifle"
  }, {
    "id": "Grinlok",
    "name": "葛恩火枪",
    "ratio": 1.25,
    "mod": "Rifle"
  }, {
    "id": "Grakata",
    "name": "葛拉卡达",
    "ratio": 1.1,
    "mod": "Rifle"
  }, {
    "id": "Gorgon",
    "name": "蛇发女妖",
    "ratio": 1.18,
    "mod": "Rifle"
  }, {
    "id": "Hema",
    "name": "血肢",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Cernos",
    "name": "西诺斯",
    "ratio": 0.86,
    "mod": "Rifle"
  }, {
    "id": "Zhuge",
    "name": "诸葛连弩",
    "ratio": 1.1,
    "mod": "Rifle"
  }, {
    "id": "Flux Rifle",
    "name": "通量射线步枪",
    "ratio": 1.55,
    "mod": "Rifle"
  }, {
    "id": "Simulor",
    "name": "重力奇点拟成枪",
    "ratio": 0.5,
    "mod": "Rifle"
  }, {
    "id": "Boar",
    "name": "野猪",
    "ratio": 1.34,
    "mod": "Shotgun"
  }, {
    "id": "Quanta",
    "name": "量子切割器",
    "ratio": 0.9,
    "mod": "Rifle"
  }, {
    "id": "Ferrox",
    "name": "铁晶磁轨炮",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Attica",
    "name": "阿提卡",
    "ratio": 1.42,
    "mod": "Rifle"
  }, {
    "id": "Paracyst",
    "name": "附肢寄生者",
    "ratio": 1.31,
    "mod": "Rifle"
  }, {
    "id": "Hind",
    "name": "雌鹿",
    "ratio": 1.42,
    "mod": "Rifle"
  }, {
    "id": "Ogris",
    "name": "食人女魔",
    "ratio": 1.25,
    "mod": "Rifle"
  }, {
    "id": "Sobek",
    "name": "鳄神",
    "ratio": 1.33,
    "mod": "Shotgun"
  }, {
    "id": "Drakgoon",
    "name": "龙骑兵",
    "ratio": 1.48,
    "mod": "Shotgun"
  }, {
    "id": "Boltor",
    "name": "螺钉步枪",
    "ratio": 0.79,
    "mod": "Rifle"
  }, {
    "id": "Synapse",
    "name": "突触生化枪",
    "ratio": 1.31,
    "mod": "Rifle"
  }, {
    "id": "Dex Furis",
    "name": "DEX 盗贼双枪",
    "ratio": 1.39,
    "mod": "Pistol"
  }, {
    "id": "Knell",
    "name": "丧钟",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Spectra",
    "name": "光谱切割器",
    "ratio": 1.49,
    "mod": "Pistol"
  }, {
    "id": "Nukor",
    "name": "努寇微波枪",
    "ratio": 1.45,
    "mod": "Pistol"
  }, {
    "id": "Kraken",
    "name": "北海巨妖",
    "ratio": 1.53,
    "mod": "Pistol"
  }, {
    "id": "Atomos",
    "name": "原子矿融炮",
    "ratio": 0.87,
    "mod": "Pistol"
  }, {
    "id": "Twin Kohmak",
    "name": "双子寇恩霰机枪",
    "ratio": 1.1,
    "mod": "Pistol"
  }, {
    "id": "Twin Gremlins",
    "name": "双子小精灵",
    "ratio": 1.5,
    "mod": "Pistol"
  }, {
    "id": "Twin Rogga",
    "name": "双子罗格",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Twin Grakata",
    "name": "双子葛拉卡达",
    "ratio": 0.76,
    "mod": "Pistol"
  }, {
    "id": "Twin Vipers",
    "name": "双子蝰蛇",
    "ratio": 1.41,
    "mod": "Pistol"
  }, {
    "id": "Stubba",
    "name": "史度巴",
    "ratio": 1.25,
    "mod": "Pistol"
  }, {
    "id": "Akstiletto",
    "name": "史提托双枪",
    "ratio": 0.5,
    "mod": "Pistol"
  }, {
    "id": "Stug",
    "name": "史特克",
    "ratio": 1.48,
    "mod": "Pistol"
  }, {
    "id": "Gammacor",
    "name": "咖玛腕甲枪",
    "ratio": 0.53,
    "mod": "Pistol"
  }, {
    "id": "Tysis",
    "name": "啐沫者",
    "ratio": 1.51,
    "mod": "Pistol"
  }, {
    "id": "Embolist",
    "name": "安柏勒斯",
    "ratio": 1.45,
    "mod": "Pistol"
  }, {
    "id": "Angstrum",
    "name": "安格斯壮",
    "ratio": 1.4,
    "mod": "Pistol"
  }, {
    "id": "Kohmak",
    "name": "寇恩霰机枪",
    "ratio": 1.2,
    "mod": "Pistol"
  }, {
    "id": "Brakk",
    "name": "布拉克",
    "ratio": 0.75,
    "mod": "Pistol"
  }, {
    "id": "Ballistica",
    "name": "布里斯提卡",
    "ratio": 0.85,
    "mod": "Pistol"
  }, {
    "id": "Arca Scisco",
    "name": "弧电探知者",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Cycron",
    "name": "循环离子枪",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Detron",
    "name": "德特昂",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Pandero",
    "name": "手鼓",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Aklato",
    "name": "拉托双枪",
    "ratio": 1.52,
    "mod": "Pistol"
  }, {
    "id": "Azima",
    "name": "方位角",
    "ratio": 1.35,
    "mod": "Pistol"
  }, {
    "id": "Spira",
    "name": "旋刃飞刀",
    "ratio": 0.66,
    "mod": "Pistol"
  }, {
    "id": "Sicarus",
    "name": "暗杀者",
    "ratio": 1.5,
    "mod": "Pistol"
  }, {
    "id": "Kulstar",
    "name": "杀星",
    "ratio": 1.1,
    "mod": "Pistol"
  }, {
    "id": "Dual Toxocyst",
    "name": "毒囊双枪",
    "ratio": 1.19,
    "mod": "Pistol"
  }, {
    "id": "Zakti",
    "name": "毒芽",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Marelok",
    "name": "玛瑞火枪",
    "ratio": 0.5,
    "mod": "Pistol"
  }, {
    "id": "Vasto",
    "name": "瓦斯托",
    "ratio": 1.53,
    "mod": "Pistol"
  }, {
    "id": "Akvasto",
    "name": "瓦斯托双枪",
    "ratio": 1.24,
    "mod": "Pistol"
  }, {
    "id": "Furis",
    "name": "盗贼",
    "ratio": 1.35,
    "mod": "Pistol"
  }, {
    "id": "Afuris",
    "name": "盗贼双枪",
    "ratio": 1.39,
    "mod": "Pistol"
  }, {
    "id": "Despair",
    "name": "绝望",
    "ratio": 1.24,
    "mod": "Pistol"
  }, {
    "id": "Pox",
    "name": "脓痘",
    "ratio": 0.82,
    "mod": "Pistol"
  }, {
    "id": "Kunai",
    "name": "苦无",
    "ratio": 1.51,
    "mod": "Pistol"
  }, {
    "id": "AkZani",
    "name": "荒谬双枪",
    "ratio": 1.52,
    "mod": "Pistol"
  }, {
    "id": "Viper",
    "name": "蝰蛇",
    "ratio": 1.53,
    "mod": "Pistol"
  }, {
    "id": "Akbolto",
    "name": "螺钉双枪",
    "ratio": 0.85,
    "mod": "Pistol"
  }, {
    "id": "Bolto",
    "name": "螺钉手枪",
    "ratio": 1.51,
    "mod": "Pistol"
  }, {
    "id": "AkJagara",
    "name": "觉醒双枪",
    "ratio": 1.43,
    "mod": "Pistol"
  }, {
    "id": "Sonicor",
    "name": "超音波冲击枪",
    "ratio": 0.5,
    "mod": "Pistol"
  }, {
    "id": "Aksomati",
    "name": "轻灵月神双枪",
    "ratio": 1.26,
    "mod": "Pistol"
  }, {
    "id": "Bronco",
    "name": "野马",
    "ratio": 1.2,
    "mod": "Pistol"
  }, {
    "id": "Akbronco",
    "name": "野马双枪",
    "ratio": 1.2,
    "mod": "Pistol"
  }, {
    "id": "Cestra",
    "name": "锡斯特",
    "ratio": 1.52,
    "mod": "Pistol"
  }, {
    "id": "Dual Cestra",
    "name": "锡斯特双枪",
    "ratio": 1.35,
    "mod": "Pistol"
  }, {
    "id": "Acrid",
    "name": "阿克里德",
    "ratio": 1.33,
    "mod": "Pistol"
  }, {
    "id": "Lex",
    "name": "雷克斯",
    "ratio": 0.5,
    "mod": "Pistol"
  }, {
    "id": "Aklex",
    "name": "雷克斯双枪",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Castanas",
    "name": "雷爆信标",
    "ratio": 1.42,
    "mod": "Pistol"
  }, {
    "id": "Staticor",
    "name": "静电能量导引枪",
    "ratio": 0.53,
    "mod": "Pistol"
  }, {
    "id": "Seer",
    "name": "预言者",
    "ratio": 1.5,
    "mod": "Pistol"
  }, {
    "id": "Hikou",
    "name": "飞扬",
    "ratio": 0.69,
    "mod": "Pistol"
  }, {
    "id": "Pyrana",
    "name": "食人鱼",
    "ratio": 1.2,
    "mod": "Pistol"
  }, {
    "id": "Talons",
    "name": "鹰爪",
    "ratio": 1.44,
    "mod": "Pistol"
  }, {
    "id": "Magnus",
    "name": "麦格努斯",
    "ratio": 1.53,
    "mod": "Pistol"
  }, {
    "id": "Akmagnus",
    "name": "麦格努斯双枪",
    "ratio": 1.28,
    "mod": "Pistol"
  }, {
    "id": "Fusilai",
    "name": "齐射玻刃",
    "ratio": 1.2,
    "mod": "Pistol"
  }, {
    "id": "Lato",
    "name": "拉托",
    "ratio": 1.51,
    "mod": "Pistol"
  }, {
    "id": "Zenistar",
    "name": "天顶之星",
    "ratio": 0.5,
    "mod": "Melee"
  }, {
    "id": "Zenith",
    "name": "天穹之顶",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Deconstructor",
    "name": "分离",
    "ratio": 1.25,
    "mod": "Melee"
  }, {
    "id": "Sweeper",
    "name": "扫除者",
    "ratio": 1,
    "mod": "Shotgun"
  }, {
    "id": "Deth Machine Rifle",
    "name": "死亡机枪",
    "ratio": 1.46,
    "mod": "Rifle"
  }, {
    "id": "Stinger",
    "name": "毒刺",
    "ratio": 1.31,
    "mod": "Rifle"
  }, {
    "id": "Laser Rifle",
    "name": "激光步枪",
    "ratio": 1.21,
    "mod": "Rifle"
  }, {
    "id": "Burst Laser",
    "name": "激光点发",
    "ratio": 1.45,
    "mod": "Pistol"
  }, {
    "id": "Artax",
    "name": "阿塔克斯",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Mewan",
    "name": "密丸",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Kronsh",
    "name": "客隆什",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Ooltha",
    "name": "乌尔萨",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Balla",
    "name": "宝拉",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Dehtat",
    "name": "德塔特",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Plague Kripath",
    "name": "瘟疫 克里帕丝",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Plague Keewar",
    "name": "瘟疫 奇沃",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Cyath",
    "name": "西亚什",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Vectis",
    "name": "守望者",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Vulkar",
    "name": "金工火神",
    "ratio": 1.45,
    "mod": "Rifle"
  }, {
    "id": "Vulklok",
    "name": "金工火枪",
    "ratio": 1.245,
    "mod": "Rifle"
  }, {
    "id": "Snipetron",
    "name": "狙击特昂",
    "ratio": 1.165,
    "mod": "Rifle"
  }, {
    "id": "Corinth",
    "name": "科林斯",
    "ratio": 1,
    "mod": "Shotgun"
  }, {
    "id": "Euphona Prime",
    "name": "悦音 Prime",
    "ratio": 0.75,
    "mod": "Pistol"
  }, {
    "id": "Rubico",
    "name": "绝路",
    "ratio": 1.105,
    "mod": "Rifle"
  }, {
    "id": "Lanka",
    "name": "兰卡",
    "ratio": 1.105,
    "mod": "Rifle"
  }, {
    "id": "Dakra Prime",
    "name": "达克拉 Prime",
    "ratio": 1.15,
    "mod": "Melee"
  }, {
    "id": "Reaper Prime",
    "name": "收割者 Prime",
    "ratio": 1.29,
    "mod": "Melee"
  }, {
    "id": "Hystrix",
    "name": "猬刺",
    "ratio": 1,
    "mod": "Pistol"
  }, {
    "id": "Dual Keres",
    "name": "双持凯瑞斯",
    "ratio": 1.48,
    "mod": "Melee"
  }, {
    "id": "Veldt",
    "name": "草原猎手",
    "ratio": 1,
    "mod": "Rifle"
  }, {
    "id": "Sephahn",
    "name": "瑟普梵",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Rabvee",
    "name": "拉比威",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Dokrahm",
    "name": "多克拉姆",
    "ratio": 1,
    "mod": "Melee"
  }, {
    "id": "Skiajati",
    "name": "影生",
    "ratio": 1,
    "mod": "Melee"
  }];

/**
 * 武器信息
 */
export interface Weapon {
  name: string;
  dmg: [string, number][];
  accuracy: number;
  bullets: number;
  fireRate: number;
  criticalMultiplier: number;
  criticalChances: number;
  status: number;
  magazine: number;
  reload: number;
  ammo: number;
}
/*
Data from http://warframe-builder.com/Weapon_comparator
控制台运行如下脚本
let RivenWeaponDataBase = [...];
 $("[data-type=archgun]").remove();
JSON.stringify(Array.prototype.map.call($(".detail_tir.base"), v => ({
    id: $(v).parent().find(".nom_liste_arme").text().trim(),
    name: RivenWeaponDataBase.find(v=>v.id==$(v).parent().find(".nom_liste_arme").text().trim()).name,
    dmg: Array.prototype.map.call($(v).find("tr.separateur").prevAll("tr"),v=>[$(v).find("td:nth(0)").text(),+$(v).find("td:nth(1)").text().replace(",","")]),

    accuracy: +$(v).parent().find(".detail_arme.base").find(".precision>span").text().replace(",",""),
    bullets: +$(v).parent().find(".detail_arme.base").find(".balles>span").text().replace(",",""),
    fireRate: +$(v).parent().find(".detail_arme.base").find(".cadence_de_tir>span").text().replace(",",""),
    criticalMultiplier: +$(v).parent().find(".detail_arme.base").find(".valeur_de_critique>span").text().replace(",",""),
    criticalChances: +$(v).parent().find(".detail_arme.base").find(".chances_de_critique>span").text().replace(",",""),
    status: +$(v).parent().find(".detail_arme.base").find(".status>span").text().replace(",",""),
    magazine: +$(v).parent().find(".detail_arme.base").find(".chargeur>span").text().replace(",",""),
    reload: +$(v).parent().find(".detail_arme.base").find(".recharger>span").text().replace(",",""),
    ammo: +$(v).parent().find(".detail_arme.base").find(".munitions>span").text().replace(",",""),
})))
 */
export const WeaponDataBase: Weapon[] = [
  {
    "name": "Acrid",
    "dmg": [
      ["Toxin", 35]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 6.7,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 10,
    "magazine": 15,
    "reload": 1.2,
    "ammo": 210
  }, {
    "name": "Afuris",
    "dmg": [
      ["Slash", 3],
      ["Puncture", 14],
      ["Impact", 3]
    ],
    "accuracy": 8.7,
    "bullets": 1,
    "fireRate": 12.5,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 8,
    "magazine": 70,
    "reload": 2.8,
    "ammo": 210
  }, {
    "name": "Akbolto",
    "dmg": [
      ["Puncture", 40.5],
      ["Impact", 4.5]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 7.5,
    "magazine": 30,
    "reload": 2.6,
    "ammo": 210
  }, {
    "name": "Akbolto Prime",
    "dmg": [
      ["Slash", 1.3],
      ["Puncture", 27.5],
      ["Impact", 3.2]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 7,
    "criticalMultiplier": 2.8,
    "criticalChances": 36,
    "status": 14,
    "magazine": 40,
    "reload": 1.3,
    "ammo": 210
  }, {
    "name": "Akbronco",
    "dmg": [
      ["Slash", 28],
      ["Puncture", 28],
      ["Impact", 224]
    ],
    "accuracy": 3.7,
    "bullets": 0,
    "fireRate": 8.33,
    "criticalMultiplier": 2,
    "criticalChances": 6,
    "status": 22,
    "magazine": 4,
    "reload": 2.25,
    "ammo": 210
  }, {
    "name": "Akbronco prime",
    "dmg": [
      ["Slash", 35],
      ["Puncture", 35],
      ["Impact", 280]
    ],
    "accuracy": 3.7,
    "bullets": 0,
    "fireRate": 4.33,
    "criticalMultiplier": 2,
    "criticalChances": 6,
    "status": 30,
    "magazine": 8,
    "reload": 2.25,
    "ammo": 210
  }, {
    "name": "Akjagara",
    "dmg": [
      ["Slash", 21],
      ["Puncture", 4.5],
      ["Impact", 4.5]
    ],
    "accuracy": 8.7,
    "bullets": 2,
    "fireRate": 8.333,
    "criticalMultiplier": 2,
    "criticalChances": 6,
    "status": 28,
    "magazine": 36,
    "reload": 2.3,
    "ammo": 210
  }, {
    "name": "Aklato",
    "dmg": [
      ["Slash", 18],
      ["Puncture", 7.5],
      ["Impact", 4.5]
    ],
    "accuracy": 11.1,
    "bullets": 1,
    "fireRate": 8.3,
    "criticalMultiplier": 1.8,
    "criticalChances": 10,
    "status": 6,
    "magazine": 30,
    "reload": 2.4,
    "ammo": 210
  }, {
    "name": "Aklex",
    "dmg": [
      ["Slash", 13],
      ["Puncture", 104],
      ["Impact", 13]
    ],
    "accuracy": 9.8,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 15,
    "magazine": 12,
    "reload": 3,
    "ammo": 210
  }, {
    "name": "Aklex Prime",
    "dmg": [
      ["Slash", 15],
      ["Puncture", 120],
      ["Impact", 15]
    ],
    "accuracy": 9.8,
    "bullets": 1,
    "fireRate": 2.67,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 25,
    "magazine": 16,
    "reload": 3,
    "ammo": 210
  }, {
    "name": "Akmagnus",
    "dmg": [
      ["Slash", 20.9],
      ["Puncture", 20.9],
      ["Impact", 34.2]
    ],
    "accuracy": 11.1,
    "bullets": 1,
    "fireRate": 6.17,
    "criticalMultiplier": 2,
    "criticalChances": 22,
    "status": 22,
    "magazine": 16,
    "reload": 2.4,
    "ammo": 210
  }, {
    "name": "Aksomati",
    "dmg": [
      ["Slash", 9],
      ["Puncture", 7.2],
      ["Impact", 1.8]
    ],
    "accuracy": 8.7,
    "bullets": 1,
    "fireRate": 12.5,
    "criticalMultiplier": 3,
    "criticalChances": 24,
    "status": 8,
    "magazine": 70,
    "reload": 1.4,
    "ammo": 420
  }, {
    "name": "Akstiletto",
    "dmg": [
      ["Slash", 8.4],
      ["Puncture", 2.8],
      ["Impact", 16.8]
    ],
    "accuracy": 23.5,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 1.8,
    "criticalChances": 18,
    "status": 18,
    "magazine": 28,
    "reload": 1.1,
    "ammo": 210
  }, {
    "name": "Akstiletto Prime",
    "dmg": [
      ["Slash", 10.8],
      ["Puncture", 3.6],
      ["Impact", 21.6]
    ],
    "accuracy": 23.5,
    "bullets": 1,
    "fireRate": 7.08,
    "criticalMultiplier": 2,
    "criticalChances": 15,
    "status": 30,
    "magazine": 40,
    "reload": 1.1,
    "ammo": 210
  }, {
    "name": "Akvasto",
    "dmg": [
      ["Slash", 29],
      ["Puncture", 14.5],
      ["Impact", 14.5]
    ],
    "accuracy": 11.1,
    "bullets": 1,
    "fireRate": 8.67,
    "criticalMultiplier": 1.8,
    "criticalChances": 16,
    "status": 12,
    "magazine": 12,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Akzani",
    "dmg": [
      ["Slash", 1.8],
      ["Puncture", 8.4],
      ["Impact", 1.8]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 20,
    "criticalMultiplier": 2,
    "criticalChances": 14,
    "status": 14,
    "magazine": 100,
    "reload": 2,
    "ammo": 400
  }, {
    "name": "Amprex",
    "dmg": [
      ["Electric", 22]
    ],
    "accuracy": 12.5,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2.2,
    "criticalChances": 32,
    "status": 22,
    "magazine": 100,
    "reload": 2.6,
    "ammo": 700
  }, {
    "name": "Angstrum",
    "dmg": [
      ["Cold", 225],
      ["Heat", 225]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 1,
    "criticalMultiplier": 2,
    "criticalChances": 16,
    "status": 22,
    "magazine": 3,
    "reload": 2.5,
    "ammo": 18
  }, {
    "name": "Arca Plasmor",
    "dmg": [
      ["Electric", 300],
      ["Heat", 300]
    ],
    "accuracy": 9.1,
    "bullets": 0,
    "fireRate": 1.1,
    "criticalMultiplier": 1.6,
    "criticalChances": 22,
    "status": 28,
    "magazine": 10,
    "reload": 2.8,
    "ammo": 48
  }, {
    "name": "Arca Scisco",
    "dmg": [
      ["Slash", 24],
      ["Puncture", 36]
    ],
    "accuracy": 32,
    "bullets": 1,
    "fireRate": 4.67,
    "criticalMultiplier": 1.6,
    "criticalChances": 18,
    "status": 26,
    "magazine": 36,
    "reload": 2.2,
    "ammo": 288
  }, {
    "name": "Argonak",
    "dmg": [
      ["Slash", 26.2],
      ["Puncture", 6.3],
      ["Impact", 24.5]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 4.33,
    "criticalMultiplier": 1.5,
    "criticalChances": 9,
    "status": 27,
    "magazine": 43,
    "reload": 2.4,
    "ammo": 540
  }, {
    "name": "Argonak (charged)",
    "dmg": [
      ["Slash", 26.2],
      ["Puncture", 6.3],
      ["Impact", 24.5]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 4.33,
    "criticalMultiplier": 2.3,
    "criticalChances": 27,
    "status": 19,
    "magazine": 43,
    "reload": 2.4,
    "ammo": 540
  }, {
    "name": "Artemis Bow",
    "dmg": [
      ["Slash", 14.4],
      ["Puncture", 192],
      ["Impact", 33.6]
    ],
    "accuracy": 100,
    "bullets": 7,
    "fireRate": 1.11,
    "criticalMultiplier": 2.5,
    "criticalChances": 25,
    "status": 20,
    "magazine": 1,
    "reload": 0.9,
    "ammo": 72
  }, {
    "name": "Artemis Bow (charged)",
    "dmg": [
      ["Slash", 14.4],
      ["Puncture", 192],
      ["Impact", 33.6]
    ],
    "accuracy": 100,
    "bullets": 7,
    "fireRate": 0,
    "criticalMultiplier": 2.5,
    "criticalChances": 25,
    "status": 20,
    "magazine": 1,
    "reload": 0.9,
    "ammo": 72
  }, {
    "name": "Astilla",
    "dmg": [
      ["Slash", 78],
      ["Puncture", 42],
      ["Impact", 70]
    ],
    "accuracy": 25,
    "bullets": 1,
    "fireRate": 4.33,
    "criticalMultiplier": 1.9,
    "criticalChances": 17,
    "status": 33,
    "magazine": 16,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Atomos",
    "dmg": [
      ["Heat", 50]
    ],
    "accuracy": 12.5,
    "bullets": 1,
    "fireRate": 8,
    "criticalMultiplier": 1.7,
    "criticalChances": 15,
    "status": 21,
    "magazine": 70,
    "reload": 2,
    "ammo": 300
  }, {
    "name": "Attica",
    "dmg": [
      ["Slash", 16],
      ["Puncture", 60],
      ["Impact", 4]
    ],
    "accuracy": 40,
    "bullets": 1,
    "fireRate": 3.67,
    "criticalMultiplier": 3,
    "criticalChances": 25,
    "status": 10,
    "magazine": 20,
    "reload": 2.8,
    "ammo": 540
  }, {
    "name": "Azima",
    "dmg": [
      ["Slash", 13],
      ["Puncture", 5],
      ["Impact", 2]
    ],
    "accuracy": 15.4,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 2,
    "criticalChances": 16,
    "status": 16,
    "magazine": 75,
    "reload": 1.4,
    "ammo": 525
  }, {
    "name": "Ballistica",
    "dmg": [
      ["Slash", 2.5],
      ["Puncture", 20],
      ["Impact", 2.5]
    ],
    "accuracy": 4,
    "bullets": 4,
    "fireRate": 8.584,
    "criticalMultiplier": 1.5,
    "criticalChances": 3.75,
    "status": 2.5,
    "magazine": 16,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Ballistica Prime",
    "dmg": [
      ["Slash", 15.2],
      ["Puncture", 20.9],
      ["Impact", 1.9]
    ],
    "accuracy": 4,
    "bullets": 4,
    "fireRate": 8.584,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 20,
    "magazine": 32,
    "reload": 1.2,
    "ammo": 210
  }, {
    "name": "Baza",
    "dmg": [
      ["Slash", 3.5],
      ["Puncture", 6.7],
      ["Impact", 5.8]
    ],
    "accuracy": 80,
    "bullets": 1,
    "fireRate": 16.67,
    "criticalMultiplier": 3,
    "criticalChances": 26,
    "status": 10,
    "magazine": 40,
    "reload": 1.4,
    "ammo": 800
  }, {
    "name": "Boar",
    "dmg": [
      ["Slash", 52.8],
      ["Puncture", 26.4],
      ["Impact", 96.8]
    ],
    "accuracy": 5,
    "bullets": 0,
    "fireRate": 4.17,
    "criticalMultiplier": 1.5,
    "criticalChances": 10,
    "status": 20,
    "magazine": 20,
    "reload": 2.7,
    "ammo": 120
  }, {
    "name": "Boar prime",
    "dmg": [
      ["Slash", 64],
      ["Puncture", 48],
      ["Impact", 208]
    ],
    "accuracy": 5,
    "bullets": 0,
    "fireRate": 4.67,
    "criticalMultiplier": 2,
    "criticalChances": 15,
    "status": 30,
    "magazine": 20,
    "reload": 2.8,
    "ammo": 120
  }, {
    "name": "Bolto",
    "dmg": [
      ["Puncture", 40.5],
      ["Impact", 4.5]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 6.8,
    "criticalMultiplier": 2.5,
    "criticalChances": 5,
    "status": 7.5,
    "magazine": 15,
    "reload": 1.3,
    "ammo": 210
  }, {
    "name": "Boltor",
    "dmg": [
      ["Slash", 2.5],
      ["Puncture", 20],
      ["Impact", 2.5]
    ],
    "accuracy": 25,
    "bullets": 1,
    "fireRate": 8.75,
    "criticalMultiplier": 1.8,
    "criticalChances": 10,
    "status": 14,
    "magazine": 60,
    "reload": 2.6,
    "ammo": 540
  }, {
    "name": "Boltor prime",
    "dmg": [
      ["Puncture", 41.4],
      ["Impact", 4.6]
    ],
    "accuracy": 50,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 2,
    "criticalChances": 12,
    "status": 32,
    "magazine": 60,
    "reload": 2.4,
    "ammo": 540
  }, {
    "name": "Brakk",
    "dmg": [
      ["Slash", 60],
      ["Puncture", 50],
      ["Impact", 90]
    ],
    "accuracy": 5.6,
    "bullets": 0,
    "fireRate": 5,
    "criticalMultiplier": 2,
    "criticalChances": 17,
    "status": 17,
    "magazine": 5,
    "reload": 1.05,
    "ammo": 210
  }, {
    "name": "Braton",
    "dmg": [
      ["Slash", 8.2],
      ["Puncture", 7.9],
      ["Impact", 7.9]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 8.75,
    "criticalMultiplier": 1.6,
    "criticalChances": 12,
    "status": 6,
    "magazine": 45,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Braton prime",
    "dmg": [
      ["Slash", 21],
      ["Puncture", 12.25],
      ["Impact", 1.75]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 9.58,
    "criticalMultiplier": 2,
    "criticalChances": 12,
    "status": 26,
    "magazine": 75,
    "reload": 2.2,
    "ammo": 600
  }, {
    "name": "Braton vandal",
    "dmg": [
      ["Slash", 21],
      ["Puncture", 1.75],
      ["Impact", 12.25]
    ],
    "accuracy": 33.3,
    "bullets": 1,
    "fireRate": 7.5,
    "criticalMultiplier": 2,
    "criticalChances": 16,
    "status": 16,
    "magazine": 50,
    "reload": 1.8,
    "ammo": 550
  }, {
    "name": "Bronco",
    "dmg": [
      ["Slash", 28],
      ["Puncture", 28],
      ["Impact", 224]
    ],
    "accuracy": 3.7,
    "bullets": 0,
    "fireRate": 5,
    "criticalMultiplier": 2,
    "criticalChances": 6,
    "status": 22,
    "magazine": 2,
    "reload": 1.05,
    "ammo": 210
  }, {
    "name": "Bronco prime",
    "dmg": [
      ["Slash", 35],
      ["Puncture", 35],
      ["Impact", 280]
    ],
    "accuracy": 3.7,
    "bullets": 0,
    "fireRate": 4.17,
    "criticalMultiplier": 2,
    "criticalChances": 6,
    "status": 30,
    "magazine": 4,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Burston",
    "dmg": [
      ["Slash", 10],
      ["Puncture", 10],
      ["Impact", 10]
    ],
    "accuracy": 25,
    "bullets": 3,
    "fireRate": 8.197,
    "criticalMultiplier": 1.6,
    "criticalChances": 6,
    "status": 18,
    "magazine": 45,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Burston prime",
    "dmg": [
      ["Slash", 14.4],
      ["Puncture", 10.8],
      ["Impact", 10.8]
    ],
    "accuracy": 25,
    "bullets": 3,
    "fireRate": 8.573,
    "criticalMultiplier": 1.8,
    "criticalChances": 18,
    "status": 30,
    "magazine": 45,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Buzlok",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 24],
      ["Impact", 30]
    ],
    "accuracy": 13.3,
    "bullets": 1,
    "fireRate": 6.25,
    "criticalMultiplier": 2.5,
    "criticalChances": 23,
    "status": 21,
    "magazine": 50,
    "reload": 3,
    "ammo": 540
  }, {
    "name": "Castanas",
    "dmg": [
      ["Electric", 160]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 5,
    "criticalMultiplier": 1.5,
    "criticalChances": 8,
    "status": 22,
    "magazine": 2,
    "reload": 1,
    "ammo": 18
  }, {
    "name": "Cernos",
    "dmg": [
      ["Slash", 5.5],
      ["Puncture", 5.5],
      ["Impact", 99]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1.67,
    "criticalMultiplier": 1.5,
    "criticalChances": 18,
    "status": 18,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Cernos (charged)",
    "dmg": [
      ["Slash", 11],
      ["Puncture", 11],
      ["Impact", 198]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 36,
    "status": 18,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Cernos Prime",
    "dmg": [
      ["Slash", 9],
      ["Puncture", 9],
      ["Impact", 162]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1,
    "criticalMultiplier": 2,
    "criticalChances": 35,
    "status": 30,
    "magazine": 1,
    "reload": 1,
    "ammo": 72
  }, {
    "name": "Cernos Prime (charged)",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 6],
      ["Impact", 108]
    ],
    "accuracy": 16.7,
    "bullets": 3,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 35,
    "status": 10,
    "magazine": 0,
    "reload": 0.65,
    "ammo": 72
  }, {
    "name": "Cestra",
    "dmg": [
      ["Puncture", 20],
      ["Impact", 5]
    ],
    "accuracy": 33.3,
    "bullets": 1,
    "fireRate": 8.33,
    "criticalMultiplier": 1.6,
    "criticalChances": 6,
    "status": 20,
    "magazine": 60,
    "reload": 2,
    "ammo": 420
  }, {
    "name": "Convectrix",
    "dmg": [
      ["Slash", 19.2],
      ["Puncture", 2.4],
      ["Impact", 2.4]
    ],
    "accuracy": 50,
    "bullets": 0,
    "fireRate": 12,
    "criticalMultiplier": 2.4,
    "criticalChances": 16,
    "status": 30,
    "magazine": 70,
    "reload": 2,
    "ammo": 700
  }, {
    "name": "Corinth",
    "dmg": [
      ["Slash", 162],
      ["Puncture", 226.8],
      ["Impact", 151.2]
    ],
    "accuracy": 9.1,
    "bullets": 0,
    "fireRate": 1.17,
    "criticalMultiplier": 2.8,
    "criticalChances": 30,
    "status": 12,
    "magazine": 5,
    "reload": 2.3,
    "ammo": 132
  }, {
    "name": "Cycron",
    "dmg": [
      ["Electric", 5],
      ["Heat", 5],
      ["Slash", 5],
      ["Puncture", 8]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 1.8,
    "criticalChances": 12,
    "status": 30,
    "magazine": 40,
    "reload": 1,
    "ammo": 40
  }, {
    "name": "Daikyu (charged)",
    "dmg": [
      ["Slash", 138],
      ["Puncture", 184],
      ["Impact", 138]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 50,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Dera",
    "dmg": [
      ["Slash", 1.5],
      ["Puncture", 22.5],
      ["Impact", 6]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 11.25,
    "criticalMultiplier": 1.65,
    "criticalChances": 8,
    "status": 22,
    "magazine": 45,
    "reload": 1.8,
    "ammo": 540
  }, {
    "name": "Dera Vandal",
    "dmg": [
      ["Slash", 1.6],
      ["Puncture", 24],
      ["Impact", 6.4]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 11.25,
    "criticalMultiplier": 2,
    "criticalChances": 8,
    "status": 30,
    "magazine": 60,
    "reload": 1.8,
    "ammo": 540
  }, {
    "name": "Despair",
    "dmg": [
      ["Slash", 8.7],
      ["Puncture", 46.4],
      ["Impact", 2.9]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 3.33,
    "criticalMultiplier": 1.6,
    "criticalChances": 16,
    "status": 16,
    "magazine": 10,
    "reload": 0.8,
    "ammo": 210
  }, {
    "name": "Detron",
    "dmg": [
      ["Electric", 140],
      ["Heat", 140]
    ],
    "accuracy": 7.1,
    "bullets": 0,
    "fireRate": 3.33,
    "criticalMultiplier": 1.5,
    "criticalChances": 4,
    "status": 30,
    "magazine": 5,
    "reload": 1.05,
    "ammo": 210
  }, {
    "name": "Dex furis",
    "dmg": [
      ["Slash", 2.4],
      ["Puncture", 11.2],
      ["Impact", 2.4]
    ],
    "accuracy": 8.7,
    "bullets": 1,
    "fireRate": 20,
    "criticalMultiplier": 2,
    "criticalChances": 14,
    "status": 28,
    "magazine": 100,
    "reload": 2,
    "ammo": 400
  }, {
    "name": "Dex Pixia",
    "dmg": [
      ["Slash", 128],
      ["Puncture", 16],
      ["Impact", 16]
    ],
    "accuracy": 23,
    "bullets": 1,
    "fireRate": 5.83,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 25,
    "magazine": 60,
    "reload": 1.2,
    "ammo": 210
  }, {
    "name": "Dex Sybaris",
    "dmg": [
      ["Slash", 33.75],
      ["Puncture", 18.75],
      ["Impact", 22.5]
    ],
    "accuracy": 28.6,
    "bullets": 2,
    "fireRate": 4.264,
    "criticalMultiplier": 2,
    "criticalChances": 35,
    "status": 10,
    "magazine": 14,
    "reload": 1.5,
    "ammo": 540
  }, {
    "name": "Drakgoon",
    "dmg": [
      ["Slash", 276],
      ["Puncture", 34.5],
      ["Impact", 34.5]
    ],
    "accuracy": 1.4,
    "bullets": 0,
    "fireRate": 3.33,
    "criticalMultiplier": 2,
    "criticalChances": 7.5,
    "status": 23,
    "magazine": 7,
    "reload": 2.3,
    "ammo": 120
  }, {
    "name": "Drakgoon (charged)",
    "dmg": [
      ["Slash", 560],
      ["Puncture", 70],
      ["Impact", 70]
    ],
    "accuracy": 1.4,
    "bullets": 0,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 7.5,
    "status": 23,
    "magazine": 7,
    "reload": 2.3,
    "ammo": 210
  }, {
    "name": "Dread",
    "dmg": [
      ["Slash", 117],
      ["Puncture", 6.5],
      ["Impact", 6.5]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1.43,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 20,
    "magazine": 0,
    "reload": 0.7,
    "ammo": 72
  }, {
    "name": "Dread (charged)",
    "dmg": [
      ["Slash", 180],
      ["Puncture", 10],
      ["Impact", 10]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 50,
    "status": 20,
    "magazine": 0,
    "reload": 0.7,
    "ammo": 72
  }, {
    "name": "Dual cestras",
    "dmg": [
      ["Puncture", 20],
      ["Impact", 5]
    ],
    "accuracy": 20,
    "bullets": 1,
    "fireRate": 12.5,
    "criticalMultiplier": 1.6,
    "criticalChances": 6,
    "status": 20,
    "magazine": 120,
    "reload": 3.5,
    "ammo": 480
  }, {
    "name": "Dual Toxocyst",
    "dmg": [
      ["Slash", 7.5],
      ["Puncture", 60],
      ["Impact", 7.5]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 1,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 37,
    "magazine": 12,
    "reload": 2.3,
    "ammo": 210
  }, {
    "name": "Embolist",
    "dmg": [
      ["Toxin", 35]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 8,
    "criticalMultiplier": 1.5,
    "criticalChances": 3,
    "status": 41,
    "magazine": 33,
    "reload": 1.3,
    "ammo": 210
  }, {
    "name": "Euphona Prime",
    "dmg": [
      ["Slash", 16.25],
      ["Puncture", 16.25],
      ["Impact", 292.5]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 1.5,
    "criticalMultiplier": 2.5,
    "criticalChances": 30,
    "status": 2,
    "magazine": 5,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Ferrox",
    "dmg": [
      ["Slash", 70],
      ["Puncture", 245],
      ["Impact", 35]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2.8,
    "criticalChances": 32,
    "status": 10,
    "magazine": 10,
    "reload": 1.8,
    "ammo": 540
  }, {
    "name": "Flux rifle",
    "dmg": [
      ["Slash", 17.2],
      ["Puncture", 4.8]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 24,
    "magazine": 50,
    "reload": 1.25,
    "ammo": 50
  }, {
    "name": "Furis",
    "dmg": [
      ["Slash", 2.9],
      ["Puncture", 14],
      ["Impact", 3.1]
    ],
    "accuracy": 15.4,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 12,
    "magazine": 35,
    "reload": 1.4,
    "ammo": 210
  }, {
    "name": "Fusilai",
    "dmg": [
      ["Slash", 46.2],
      ["Puncture", 30.8]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2.83,
    "criticalMultiplier": 1.7,
    "criticalChances": 23,
    "status": 29,
    "magazine": 6,
    "reload": 0.8,
    "ammo": 72
  }, {
    "name": "Gammacor",
    "dmg": [
      ["Electric", 8],
      ["Cold", 8]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 1.8,
    "criticalChances": 8,
    "status": 20,
    "magazine": 60,
    "reload": 1.4,
    "ammo": 240
  }, {
    "name": "Glaxion",
    "dmg": [
      ["Cold", 26]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2,
    "criticalChances": 8,
    "status": 34,
    "magazine": 80,
    "reload": 2.2,
    "ammo": 720
  }, {
    "name": "Gorgon",
    "dmg": [
      ["Slash", 2.5],
      ["Puncture", 3.8],
      ["Impact", 18.8]
    ],
    "accuracy": 12.5,
    "bullets": 1,
    "fireRate": 12.5,
    "criticalMultiplier": 1.5,
    "criticalChances": 17,
    "status": 9,
    "magazine": 90,
    "reload": 4.2,
    "ammo": 540
  }, {
    "name": "Gorgon wraith",
    "dmg": [
      ["Slash", 1.3],
      ["Puncture", 2.7],
      ["Impact", 23]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 13.3,
    "criticalMultiplier": 1.9,
    "criticalChances": 15,
    "status": 21,
    "magazine": 90,
    "reload": 3,
    "ammo": 900
  }, {
    "name": "Grakata",
    "dmg": [
      ["Slash", 2.9],
      ["Puncture", 3.7],
      ["Impact", 4.4]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 20,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 20,
    "magazine": 60,
    "reload": 2.4,
    "ammo": 750
  }, {
    "name": "Grinlok",
    "dmg": [
      ["Slash", 74.8],
      ["Puncture", 18.7],
      ["Impact", 93.5]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 1.7,
    "criticalMultiplier": 2.5,
    "criticalChances": 15,
    "status": 35,
    "magazine": 9,
    "reload": 1.7,
    "ammo": 540
  }, {
    "name": "Harpak",
    "dmg": [
      ["Slash", 7.5],
      ["Puncture", 37.5],
      ["Impact", 5]
    ],
    "accuracy": 18.2,
    "bullets": 3,
    "fireRate": 6,
    "criticalMultiplier": 2.3,
    "criticalChances": 20,
    "status": 17,
    "magazine": 45,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Harpak (charged)",
    "dmg": [
      ["Slash", 10],
      ["Puncture", 50],
      ["Impact", 40]
    ],
    "accuracy": 18.2,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2.3,
    "criticalChances": 20,
    "status": 17,
    "magazine": 45,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Hek",
    "dmg": [
      ["Slash", 105],
      ["Puncture", 341.3],
      ["Impact", 78.8]
    ],
    "accuracy": 9.1,
    "bullets": 0,
    "fireRate": 2.17,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 25,
    "magazine": 4,
    "reload": 2,
    "ammo": 120
  }, {
    "name": "Hema",
    "dmg": [
      ["Toxin", 23.5],
      ["Cold", 23.5]
    ],
    "accuracy": 20,
    "bullets": 3,
    "fireRate": 6,
    "criticalMultiplier": 2,
    "criticalChances": 11,
    "status": 25,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Hikou",
    "dmg": [
      ["Slash", 7.5],
      ["Puncture", 15],
      ["Impact", 2.5]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 6.67,
    "criticalMultiplier": 1.6,
    "criticalChances": 4,
    "status": 12,
    "magazine": 20,
    "reload": 0.8,
    "ammo": 210
  }, {
    "name": "Hikou prime",
    "dmg": [
      ["Slash", 1.8],
      ["Puncture", 30.6],
      ["Impact", 3.6]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 5.83,
    "criticalMultiplier": 1.8,
    "criticalChances": 6,
    "status": 28,
    "magazine": 26,
    "reload": 0.5,
    "ammo": 210
  }, {
    "name": "Hind",
    "dmg": [
      ["Slash", 15],
      ["Puncture", 7.5],
      ["Impact", 7.5]
    ],
    "accuracy": 33.3,
    "bullets": 5,
    "fireRate": 7.693,
    "criticalMultiplier": 1.5,
    "criticalChances": 7,
    "status": 15,
    "magazine": 65,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Hystrix",
    "dmg": [
      ["Slash", 2.9],
      ["Puncture", 31],
      ["Impact", 2.2]
    ],
    "accuracy": 14.3,
    "bullets": 1,
    "fireRate": 7,
    "criticalMultiplier": 2.2,
    "criticalChances": 24,
    "status": 10,
    "magazine": 15,
    "reload": 1.7,
    "ammo": 210
  }, {
    "name": "Ignis",
    "dmg": [
      ["Heat", 33]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 8,
    "criticalMultiplier": 2,
    "criticalChances": 11,
    "status": 27,
    "magazine": 150,
    "reload": 2,
    "ammo": 750
  }, {
    "name": "Ignis Wraith",
    "dmg": [
      ["Heat", 35]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 8,
    "criticalMultiplier": 2.5,
    "criticalChances": 17,
    "status": 29,
    "magazine": 200,
    "reload": 1.7,
    "ammo": 800
  }, {
    "name": "Javlok",
    "dmg": [
      ["Heat", 280]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 25,
    "magazine": 6,
    "reload": 1.9,
    "ammo": 540
  }, {
    "name": "Javlok (charged)",
    "dmg": [
      ["Heat", 300],
      ["Slash", 30],
      ["Puncture", 75],
      ["Impact", 45]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 25,
    "magazine": 6,
    "reload": 1.9,
    "ammo": 540
  }, {
    "name": "Karak",
    "dmg": [
      ["Slash", 7.3],
      ["Puncture", 8.7],
      ["Impact", 13]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 11.7,
    "criticalMultiplier": 1.5,
    "criticalChances": 9,
    "status": 15,
    "magazine": 30,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Karak Wraith",
    "dmg": [
      ["Slash", 7.8],
      ["Puncture", 9.3],
      ["Impact", 14.1]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 11.7,
    "criticalMultiplier": 2,
    "criticalChances": 13,
    "status": 25,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Knell",
    "dmg": [
      ["Slash", 18],
      ["Puncture", 69],
      ["Impact", 63]
    ],
    "accuracy": 32,
    "bullets": 1,
    "fireRate": 1,
    "criticalMultiplier": 1.5,
    "criticalChances": 20,
    "status": 5,
    "magazine": 1,
    "reload": 1,
    "ammo": 10
  }, {
    "name": "Kohm",
    "dmg": [
      ["Slash", 18],
      ["Puncture", 6],
      ["Impact", 6]
    ],
    "accuracy": 3.67,
    "bullets": 0,
    "fireRate": 3.67,
    "criticalMultiplier": 2.3,
    "criticalChances": 11,
    "status": 25,
    "magazine": 245,
    "reload": 2,
    "ammo": 960
  }, {
    "name": "Kohmak",
    "dmg": [
      ["Slash", 90],
      ["Puncture", 30],
      ["Impact", 30]
    ],
    "accuracy": 3.6,
    "bullets": 0,
    "fireRate": 5,
    "criticalMultiplier": 2,
    "criticalChances": 11,
    "status": 23,
    "magazine": 40,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Kraken",
    "dmg": [
      ["Slash", 6.1],
      ["Puncture", 6.1],
      ["Impact", 36.8]
    ],
    "accuracy": 16,
    "bullets": 2,
    "fireRate": 2.8,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 13,
    "magazine": 14,
    "reload": 2.5,
    "ammo": 210
  }, {
    "name": "Kulstar",
    "dmg": [
      ["Cold", 150],
      ["Heat", 150],
      ["Impact", 200]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 2.3,
    "criticalChances": 17,
    "status": 19,
    "magazine": 3,
    "reload": 2,
    "ammo": 15
  }, {
    "name": "Kunai",
    "dmg": [
      ["Slash", 6.9],
      ["Puncture", 34.5],
      ["Impact", 4.6]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 3.33,
    "criticalMultiplier": 1.6,
    "criticalChances": 8,
    "status": 8,
    "magazine": 10,
    "reload": 0.8,
    "ammo": 210
  }, {
    "name": "Lanka",
    "dmg": [
      ["Electric", 200]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 1,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 25,
    "magazine": 10,
    "reload": 2,
    "ammo": 72
  }, {
    "name": "Lanka (charged)",
    "dmg": [
      ["Electric", 525]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 25,
    "magazine": 10,
    "reload": 2,
    "ammo": 72
  }, {
    "name": "Lato",
    "dmg": [
      ["Slash", 15],
      ["Puncture", 7.5],
      ["Impact", 7.5]
    ],
    "accuracy": 18.2,
    "bullets": 1,
    "fireRate": 6.67,
    "criticalMultiplier": 1.8,
    "criticalChances": 10,
    "status": 6,
    "magazine": 15,
    "reload": 1,
    "ammo": 210
  }, {
    "name": "Lato prime",
    "dmg": [
      ["Slash", 33.6],
      ["Puncture", 9.6],
      ["Impact", 4.8]
    ],
    "accuracy": 18.2,
    "bullets": 1,
    "fireRate": 6.67,
    "criticalMultiplier": 2,
    "criticalChances": 30,
    "status": 20,
    "magazine": 15,
    "reload": 1,
    "ammo": 210
  }, {
    "name": "Lato vandal",
    "dmg": [
      ["Slash", 27.6],
      ["Puncture", 11.5],
      ["Impact", 6.9]
    ],
    "accuracy": 23,
    "bullets": 1,
    "fireRate": 5,
    "criticalMultiplier": 2.4,
    "criticalChances": 26,
    "status": 10,
    "magazine": 15,
    "reload": 1,
    "ammo": 210
  }, {
    "name": "Latron",
    "dmg": [
      ["Slash", 8.2],
      ["Puncture", 38.5],
      ["Impact", 8.3]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 4.17,
    "criticalMultiplier": 2,
    "criticalChances": 12,
    "status": 12,
    "magazine": 15,
    "reload": 2.4,
    "ammo": 540
  }, {
    "name": "Latron prime",
    "dmg": [
      ["Slash", 9],
      ["Puncture", 72],
      ["Impact", 9]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 4.17,
    "criticalMultiplier": 2.8,
    "criticalChances": 22,
    "status": 26,
    "magazine": 15,
    "reload": 2.4,
    "ammo": 540
  }, {
    "name": "Latron wraith",
    "dmg": [
      ["Slash", 3],
      ["Puncture", 42],
      ["Impact", 15]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 5.42,
    "criticalMultiplier": 2.8,
    "criticalChances": 26,
    "status": 14,
    "magazine": 14,
    "reload": 2.4,
    "ammo": 540
  }, {
    "name": "Lenz (charged)",
    "dmg": [
      ["Cold", 10],
      ["Cold", 330],
      ["Heat", 330],
      ["Impact", 50]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 50,
    "status": 5,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 6
  }, {
    "name": "Lex",
    "dmg": [
      ["Slash", 13],
      ["Puncture", 104],
      ["Impact", 13]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 1.08,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 10,
    "magazine": 6,
    "reload": 2.35,
    "ammo": 210
  }, {
    "name": "Lex prime",
    "dmg": [
      ["Slash", 15],
      ["Puncture", 120],
      ["Impact", 15]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 2.1,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 25,
    "magazine": 8,
    "reload": 2.3,
    "ammo": 210
  }, {
    "name": "Magnus",
    "dmg": [
      ["Slash", 20.9],
      ["Puncture", 20.9],
      ["Impact", 34.2]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 5.83,
    "criticalMultiplier": 2,
    "criticalChances": 22,
    "status": 22,
    "magazine": 8,
    "reload": 1.4,
    "ammo": 210
  }, {
    "name": "Mara detron",
    "dmg": [
      ["Electric", 140],
      ["Heat", 140]
    ],
    "accuracy": 13.3,
    "bullets": 0,
    "fireRate": 3.33,
    "criticalMultiplier": 1.5,
    "criticalChances": 8,
    "status": 32,
    "magazine": 8,
    "reload": 1.05,
    "ammo": 120
  }, {
    "name": "Marelok",
    "dmg": [
      ["Slash", 64],
      ["Puncture", 16],
      ["Impact", 80]
    ],
    "accuracy": 10,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 1.5,
    "criticalChances": 15,
    "status": 30,
    "magazine": 6,
    "reload": 1.7,
    "ammo": 210
  }, {
    "name": "Miter",
    "dmg": [
      ["Slash", 112.5],
      ["Puncture", 6.25],
      ["Impact", 6.25]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2.5,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 25,
    "magazine": 20,
    "reload": 2,
    "ammo": 72
  }, {
    "name": "Miter (charged)",
    "dmg": [
      ["Slash", 225],
      ["Puncture", 12.5],
      ["Impact", 12.5]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 50,
    "magazine": 20,
    "reload": 2,
    "ammo": 72
  }, {
    "name": "Mk1-braton",
    "dmg": [
      ["Slash", 9],
      ["Puncture", 4.5],
      ["Impact", 4.5]
    ],
    "accuracy": 40,
    "bullets": 1,
    "fireRate": 7.5,
    "criticalMultiplier": 1.5,
    "criticalChances": 8,
    "status": 5,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Mk1-furis",
    "dmg": [
      ["Slash", 1.9],
      ["Puncture", 9.1],
      ["Impact", 2]
    ],
    "accuracy": 15.4,
    "bullets": 1,
    "fireRate": 8.3,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 1,
    "magazine": 35,
    "reload": 1.4,
    "ammo": 210
  }, {
    "name": "Mk1-kunai",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 30],
      ["Impact", 4]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 3.3,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 2.5,
    "magazine": 10,
    "reload": 0.8,
    "ammo": 210
  }, {
    "name": "Mk1-paris",
    "dmg": [
      ["Slash", 9],
      ["Puncture", 49],
      ["Impact", 3]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1.67,
    "criticalMultiplier": 1.5,
    "criticalChances": 30,
    "status": 10,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Mk1-paris (charged)",
    "dmg": [
      ["Slash", 18],
      ["Puncture", 96],
      ["Impact", 6]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 30,
    "status": 10,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Mk1-strun",
    "dmg": [
      ["Slash", 54],
      ["Puncture", 27],
      ["Impact", 99]
    ],
    "accuracy": 4,
    "bullets": 0,
    "fireRate": 2.08,
    "criticalMultiplier": 2,
    "criticalChances": 7.5,
    "status": 20,
    "magazine": 6,
    "reload": 0,
    "ammo": 120
  }, {
    "name": "Mutalist Cernos",
    "dmg": [
      ["Slash", 5.63],
      ["Puncture", 5.63],
      ["Impact", 101.25]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1.67,
    "criticalMultiplier": 2,
    "criticalChances": 15,
    "status": 49,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Mutalist Cernos (charged)",
    "dmg": [
      ["Slash", 11.25],
      ["Puncture", 11.25],
      ["Impact", 202.5]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 15,
    "status": 49,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Mutalist quanta",
    "dmg": [
      ["Slash", 7.5],
      ["Puncture", 15],
      ["Impact", 2.5]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 1.5,
    "criticalChances": 2.5,
    "status": 15,
    "magazine": 60,
    "reload": 3,
    "ammo": 540
  }, {
    "name": "Nukor",
    "dmg": [
      ["Electric", 11],
      ["Heat", 11]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 4,
    "criticalChances": 3,
    "status": 29,
    "magazine": 50,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Ogris",
    "dmg": [
      ["Cold", 50],
      ["Heat", 50]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 1.5,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 35,
    "magazine": 5,
    "reload": 2.5,
    "ammo": 20
  }, {
    "name": "Ogris (charged)",
    "dmg": [
      ["Cold", 300],
      ["Heat", 300]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 35,
    "magazine": 5,
    "reload": 2.5,
    "ammo": 20
  }, {
    "name": "Opticor",
    "dmg": [
      ["Slash", 50],
      ["Puncture", 850],
      ["Impact", 100]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2.5,
    "criticalChances": 20,
    "status": 20,
    "magazine": 5,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Pandero",
    "dmg": [
      ["Slash", 36],
      ["Puncture", 18],
      ["Impact", 18]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 3,
    "criticalMultiplier": 2.8,
    "criticalChances": 30,
    "status": 10,
    "magazine": 8,
    "reload": 1,
    "ammo": 210
  }, {
    "name": "Panthera",
    "dmg": [
      ["Slash", 70],
      ["Puncture", 10],
      ["Impact", 20]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 3,
    "criticalMultiplier": 2,
    "criticalChances": 12,
    "status": 24,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Paracyst",
    "dmg": [
      ["Toxin", 33]
    ],
    "accuracy": 25,
    "bullets": 3,
    "fireRate": 6.04,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 30,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Paris",
    "dmg": [
      ["Slash", 18],
      ["Puncture", 96],
      ["Impact", 6]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1.54,
    "criticalMultiplier": 1.5,
    "criticalChances": 15,
    "status": 10,
    "magazine": 0,
    "reload": 0.65,
    "ammo": 72
  }, {
    "name": "Paris (charged)",
    "dmg": [
      ["Slash", 27],
      ["Puncture", 144],
      ["Impact", 9]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 30,
    "status": 10,
    "magazine": 0,
    "reload": 0.7,
    "ammo": 72
  }, {
    "name": "Paris prime",
    "dmg": [
      ["Slash", 22.75],
      ["Puncture", 104],
      ["Impact", 3.25]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1.43,
    "criticalMultiplier": 2,
    "criticalChances": 22.5,
    "status": 20,
    "magazine": 0,
    "reload": 0.7,
    "ammo": 72
  }, {
    "name": "Paris prime (charged)",
    "dmg": [
      ["Slash", 45.5],
      ["Puncture", 208],
      ["Impact", 6.5]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 45,
    "status": 20,
    "magazine": 0,
    "reload": 0.7,
    "ammo": 72
  }, {
    "name": "Penta",
    "dmg": [
      ["Cold", 175],
      ["Heat", 175],
      ["Impact", 75]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 1,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 10,
    "magazine": 5,
    "reload": 2.5,
    "ammo": 20
  }, {
    "name": "Phage",
    "dmg": [
      ["Toxin", 15],
      ["Cold", 15]
    ],
    "accuracy": 50,
    "bullets": 0,
    "fireRate": 12,
    "criticalMultiplier": 2,
    "criticalChances": 19,
    "status": 31,
    "magazine": 90,
    "reload": 2,
    "ammo": 120
  }, {
    "name": "Pox",
    "dmg": [
      ["Toxin", 150]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2.08,
    "criticalMultiplier": 2,
    "criticalChances": 1,
    "status": 35,
    "magazine": 4,
    "reload": 1,
    "ammo": 20
  }, {
    "name": "Prisma Angstrum",
    "dmg": [
      ["Cold", 225],
      ["Heat", 225]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 1,
    "criticalMultiplier": 2.2,
    "criticalChances": 18,
    "status": 26,
    "magazine": 3,
    "reload": 1.8,
    "ammo": 18
  }, {
    "name": "Prisma Gorgon",
    "dmg": [
      ["Slash", 2.3],
      ["Puncture", 3.5],
      ["Impact", 17.3]
    ],
    "accuracy": 14.3,
    "bullets": 1,
    "fireRate": 14.17,
    "criticalMultiplier": 2.3,
    "criticalChances": 30,
    "status": 15,
    "magazine": 120,
    "reload": 3,
    "ammo": 840
  }, {
    "name": "Prisma Grakata",
    "dmg": [
      ["Slash", 4],
      ["Puncture", 5],
      ["Impact", 6]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 21.67,
    "criticalMultiplier": 2.5,
    "criticalChances": 25,
    "status": 21,
    "magazine": 120,
    "reload": 2,
    "ammo": 1000
  }, {
    "name": "Prisma Tetra",
    "dmg": [
      ["Puncture", 30.4],
      ["Impact", 7.6]
    ],
    "accuracy": 18.2,
    "bullets": 1,
    "fireRate": 7.08,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 24,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Pyrana",
    "dmg": [
      ["Slash", 211.2],
      ["Puncture", 26.4],
      ["Impact", 26.4]
    ],
    "accuracy": 5,
    "bullets": 0,
    "fireRate": 4.2,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 10,
    "magazine": 10,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Pyrana Prime",
    "dmg": [
      ["Slash", 201.6],
      ["Puncture", 19.2],
      ["Impact", 19.2]
    ],
    "accuracy": 6.1,
    "bullets": 0,
    "fireRate": 4,
    "criticalMultiplier": 2.2,
    "criticalChances": 24,
    "status": 12,
    "magazine": 12,
    "reload": 1.6,
    "ammo": 210
  }, {
    "name": "Quanta",
    "dmg": [
      ["Electric", 20]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2.2,
    "criticalChances": 16,
    "status": 16,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Quanta Vandal",
    "dmg": [
      ["Electric", 26]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2.4,
    "criticalChances": 22,
    "status": 30,
    "magazine": 80,
    "reload": 1.8,
    "ammo": 540
  }, {
    "name": "Quartakk",
    "dmg": [
      ["Slash", 16.7],
      ["Puncture", 14.2],
      ["Impact", 18.1]
    ],
    "accuracy": 90.9,
    "bullets": 4,
    "fireRate": 6.327,
    "criticalMultiplier": 2.3,
    "criticalChances": 19,
    "status": 27,
    "magazine": 84,
    "reload": 1.9,
    "ammo": 540
  }, {
    "name": "Rakta Ballistica",
    "dmg": [
      ["Slash", 3.75],
      ["Puncture", 67.5],
      ["Impact", 3.75]
    ],
    "accuracy": 4,
    "bullets": 4,
    "fireRate": 8.584,
    "criticalMultiplier": 1.5,
    "criticalChances": 5,
    "status": 2.5,
    "magazine": 20,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Rakta Cernos",
    "dmg": [
      ["Slash", 6.25],
      ["Puncture", 6.25],
      ["Impact", 112.5]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 1.67,
    "criticalMultiplier": 2,
    "criticalChances": 35,
    "status": 15,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Rakta Cernos (charged)",
    "dmg": [
      ["Slash", 12.5],
      ["Puncture", 12.5],
      ["Impact", 225]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 35,
    "status": 15,
    "magazine": 0,
    "reload": 0.6,
    "ammo": 72
  }, {
    "name": "Regulators",
    "dmg": [
      ["Slash", 12.5],
      ["Puncture", 12.5],
      ["Impact", 25]
    ],
    "accuracy": 0,
    "bullets": 1,
    "fireRate": 14.8,
    "criticalMultiplier": 3,
    "criticalChances": 25,
    "status": 10,
    "magazine": 100,
    "reload": 1.8,
    "ammo": 210
  }, {
    "name": "Rubico",
    "dmg": [
      ["Slash", 9],
      ["Puncture", 27],
      ["Impact", 144]
    ],
    "accuracy": 0,
    "bullets": 1,
    "fireRate": 2.67,
    "criticalMultiplier": 3,
    "criticalChances": 30,
    "status": 12,
    "magazine": 5,
    "reload": 2.4,
    "ammo": 72
  }, {
    "name": "Sancti Castanas",
    "dmg": [
      ["Electric", 300]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 5,
    "criticalMultiplier": 2,
    "criticalChances": 23,
    "status": 34,
    "magazine": 2,
    "reload": 1,
    "ammo": 18
  }, {
    "name": "Sancti Tigris",
    "dmg": [
      ["Slash", 1008],
      ["Puncture", 126],
      ["Impact", 126]
    ],
    "accuracy": 6.5,
    "bullets": 0,
    "fireRate": 2,
    "criticalMultiplier": 1.5,
    "criticalChances": 15,
    "status": 28,
    "magazine": 2,
    "reload": 1.5,
    "ammo": 120
  }, {
    "name": "Scourge",
    "dmg": [
      ["Toxin", 30],
      ["Electric", 30]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2.67,
    "criticalMultiplier": 1.5,
    "criticalChances": 2,
    "status": 30,
    "magazine": 20,
    "reload": 2.5,
    "ammo": 540
  }, {
    "name": "Scourge (charged)",
    "dmg": [
      ["Slash", 122.5],
      ["Puncture", 72.5],
      ["Impact", 455]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 0,
    "criticalMultiplier": 2,
    "criticalChances": 4,
    "status": 30,
    "magazine": 20,
    "reload": 2.5,
    "ammo": 540
  }, {
    "name": "Secura Dual Cestra",
    "dmg": [
      ["Puncture", 22.4],
      ["Impact", 5.6]
    ],
    "accuracy": 20,
    "bullets": 1,
    "fireRate": 12.5,
    "criticalMultiplier": 1.6,
    "criticalChances": 16,
    "status": 20,
    "magazine": 120,
    "reload": 3.5,
    "ammo": 480
  }, {
    "name": "Secura Penta",
    "dmg": [
      ["Cold", 150],
      ["Heat", 150],
      ["Impact", 75]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 2,
    "criticalChances": 26,
    "status": 26,
    "magazine": 28,
    "reload": 2.5,
    "ammo": 30
  }, {
    "name": "Seer",
    "dmg": [
      ["Slash", 33.7],
      ["Puncture", 33.7],
      ["Impact", 33.7]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 1.5,
    "criticalChances": 5,
    "status": 13,
    "magazine": 8,
    "reload": 2.8,
    "ammo": 210
  }, {
    "name": "Sicarus",
    "dmg": [
      ["Slash", 4.5],
      ["Puncture", 4.5],
      ["Impact", 21]
    ],
    "accuracy": 20,
    "bullets": 3,
    "fireRate": 5.715,
    "criticalMultiplier": 2,
    "criticalChances": 16,
    "status": 6,
    "magazine": 15,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Sicarus prime",
    "dmg": [
      ["Slash", 15],
      ["Puncture", 15],
      ["Impact", 20]
    ],
    "accuracy": 25,
    "bullets": 3,
    "fireRate": 7.087,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 20,
    "magazine": 24,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Simulor",
    "dmg": [
      ["Electric", 37.5],
      ["Cold", 37.5]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 2,
    "criticalChances": 12,
    "status": 30,
    "magazine": 10,
    "reload": 3,
    "ammo": 60
  }, {
    "name": "Snipetron",
    "dmg": [
      ["Slash", 17.5],
      ["Puncture", 140],
      ["Impact", 17.5]
    ],
    "accuracy": 13.3,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 1.5,
    "criticalChances": 30,
    "status": 12,
    "magazine": 4,
    "reload": 3.5,
    "ammo": 72
  }, {
    "name": "Snipetron vandal",
    "dmg": [
      ["Slash", 10],
      ["Puncture", 180],
      ["Impact", 10]
    ],
    "accuracy": 13.3,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 2,
    "criticalChances": 28,
    "status": 16,
    "magazine": 6,
    "reload": 2,
    "ammo": 72
  }, {
    "name": "Sobek",
    "dmg": [
      ["Slash", 43.75],
      ["Puncture", 43.75],
      ["Impact", 262.5]
    ],
    "accuracy": 9.1,
    "bullets": 0,
    "fireRate": 2.5,
    "criticalMultiplier": 2,
    "criticalChances": 11,
    "status": 27,
    "magazine": 20,
    "reload": 2.7,
    "ammo": 240
  }, {
    "name": "Soma",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 4.8],
      ["Impact", 1.2]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 15,
    "criticalMultiplier": 3,
    "criticalChances": 30,
    "status": 7,
    "magazine": 100,
    "reload": 3,
    "ammo": 540
  }, {
    "name": "Soma prime",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 4.8],
      ["Impact", 1.2]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 15,
    "criticalMultiplier": 3,
    "criticalChances": 30,
    "status": 10,
    "magazine": 200,
    "reload": 3,
    "ammo": 800
  }, {
    "name": "Sonicor",
    "dmg": [
      ["Impact", 150]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 1.25,
    "criticalMultiplier": 0,
    "criticalChances": 0,
    "status": 0,
    "magazine": 15,
    "reload": 3,
    "ammo": 150
  }, {
    "name": "Spectra",
    "dmg": [
      ["Slash", 10.4],
      ["Puncture", 7.6]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2,
    "criticalChances": 14,
    "status": 22,
    "magazine": 60,
    "reload": 1.8,
    "ammo": 360
  }, {
    "name": "Spira",
    "dmg": [
      ["Slash", 24.6],
      ["Puncture", 49.2],
      ["Impact", 8.2]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2.5,
    "criticalMultiplier": 2,
    "criticalChances": 30,
    "status": 8,
    "magazine": 10,
    "reload": 1,
    "ammo": 210
  }, {
    "name": "Spira Prime",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 48],
      ["Impact", 6]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 3.33,
    "criticalMultiplier": 3,
    "criticalChances": 30,
    "status": 14,
    "magazine": 12,
    "reload": 0.8,
    "ammo": 210
  }, {
    "name": "Staticor",
    "dmg": [
      ["Electric", 88],
      ["Heat", 88]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 3.5,
    "criticalMultiplier": 2.2,
    "criticalChances": 14,
    "status": 28,
    "magazine": 45,
    "reload": 1.5,
    "ammo": 270
  }, {
    "name": "Stradalet",
    "dmg": [
      ["Slash", 8.4],
      ["Puncture", 9.8],
      ["Impact", 9.8]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 2,
    "criticalChances": 24,
    "status": 12,
    "magazine": 65,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Strun",
    "dmg": [
      ["Slash", 90],
      ["Puncture", 45],
      ["Impact", 165]
    ],
    "accuracy": 4,
    "bullets": 0,
    "fireRate": 2.5,
    "criticalMultiplier": 1.5,
    "criticalChances": 7.5,
    "status": 20,
    "magazine": 6,
    "reload": 0,
    "ammo": 120
  }, {
    "name": "Strun wraith",
    "dmg": [
      ["Slash", 80],
      ["Puncture", 60],
      ["Impact", 260]
    ],
    "accuracy": 6.7,
    "bullets": 0,
    "fireRate": 2.5,
    "criticalMultiplier": 2.2,
    "criticalChances": 18,
    "status": 40,
    "magazine": 10,
    "reload": 0,
    "ammo": 120
  }, {
    "name": "Stubba",
    "dmg": [
      ["Slash", 15.5],
      ["Puncture", 3.3],
      ["Impact", 14.2]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 6.33,
    "criticalMultiplier": 1.9,
    "criticalChances": 23,
    "status": 13,
    "magazine": 57,
    "reload": 1.3,
    "ammo": 210
  }, {
    "name": "Stug",
    "dmg": [
      ["Toxin", 78],
      ["Electric", 78]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 4,
    "criticalMultiplier": 1.5,
    "criticalChances": 5,
    "status": 0,
    "magazine": 20,
    "reload": 2,
    "ammo": 210
  }, {
    "name": "Supra",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 30],
      ["Impact", 4]
    ],
    "accuracy": 14.3,
    "bullets": 1,
    "fireRate": 12.5,
    "criticalMultiplier": 1.8,
    "criticalChances": 12,
    "status": 30,
    "magazine": 180,
    "reload": 3,
    "ammo": 1080
  }, {
    "name": "Supra Vandal",
    "dmg": [
      ["Slash", 6],
      ["Puncture", 30],
      ["Impact", 4]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 12.5,
    "criticalMultiplier": 2,
    "criticalChances": 16,
    "status": 30,
    "magazine": 300,
    "reload": 3,
    "ammo": 1600
  }, {
    "name": "Sybaris",
    "dmg": [
      ["Slash", 27.2],
      ["Puncture", 26.4],
      ["Impact", 26.4]
    ],
    "accuracy": 28.6,
    "bullets": 2,
    "fireRate": 4,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 10,
    "magazine": 10,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Sybaris Prime",
    "dmg": [
      ["Slash", 29.9],
      ["Puncture", 29],
      ["Impact", 29]
    ],
    "accuracy": 25,
    "bullets": 2,
    "fireRate": 4.762,
    "criticalMultiplier": 2,
    "criticalChances": 30,
    "status": 25,
    "magazine": 20,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Synapse",
    "dmg": [
      ["Toxin", 10],
      ["Electric", 10]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2.7,
    "criticalChances": 39,
    "status": 13,
    "magazine": 70,
    "reload": 1.5,
    "ammo": 540
  }, {
    "name": "Synoid Gammacor",
    "dmg": [
      ["Electric", 10],
      ["Cold", 10]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 12,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 28,
    "magazine": 80,
    "reload": 1.8,
    "ammo": 400
  }, {
    "name": "Synoid Simulor",
    "dmg": [
      ["Electric", 25],
      ["Cold", 25]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2.67,
    "criticalMultiplier": 2,
    "criticalChances": 5,
    "status": 35,
    "magazine": 15,
    "reload": 2,
    "ammo": 75
  }, {
    "name": "Talons",
    "dmg": [
      ["Cold", 60],
      ["Heat", 60]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 5,
    "criticalMultiplier": 2,
    "criticalChances": 22,
    "status": 26,
    "magazine": 4,
    "reload": 1,
    "ammo": 12
  }, {
    "name": "Telos Akbolto",
    "dmg": [
      ["Puncture", 42.3],
      ["Impact", 4.7]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 10,
    "criticalMultiplier": 2,
    "criticalChances": 13,
    "status": 29,
    "magazine": 30,
    "reload": 2.6,
    "ammo": 210
  }, {
    "name": "Telos Boltor",
    "dmg": [
      ["Puncture", 27],
      ["Impact", 3]
    ],
    "accuracy": 25,
    "bullets": 1,
    "fireRate": 9.33,
    "criticalMultiplier": 2.4,
    "criticalChances": 30,
    "status": 16,
    "magazine": 90,
    "reload": 2.4,
    "ammo": 540
  }, {
    "name": "Tenora",
    "dmg": [
      ["Slash", 7.2],
      ["Puncture", 9.6],
      ["Impact", 7.2]
    ],
    "accuracy": 12.5,
    "bullets": 1,
    "fireRate": 11.67,
    "criticalMultiplier": 2,
    "criticalChances": 28,
    "status": 16,
    "magazine": 150,
    "reload": 2.5,
    "ammo": 900
  }, {
    "name": "Tenora (charged)",
    "dmg": [
      ["Slash", 48],
      ["Puncture", 144],
      ["Impact", 48]
    ],
    "accuracy": 12.5,
    "bullets": 0,
    "fireRate": 0,
    "criticalMultiplier": 3,
    "criticalChances": 33,
    "status": 11,
    "magazine": 150,
    "reload": 2.5,
    "ammo": 900
  }, {
    "name": "Tetra",
    "dmg": [
      ["Puncture", 6.4],
      ["Impact", 25.6]
    ],
    "accuracy": 18.2,
    "bullets": 1,
    "fireRate": 6.67,
    "criticalMultiplier": 1.5,
    "criticalChances": 4,
    "status": 20,
    "magazine": 60,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Tiberon",
    "dmg": [
      ["Slash", 11],
      ["Puncture", 22],
      ["Impact", 11]
    ],
    "accuracy": 33.3,
    "bullets": 3,
    "fireRate": 9.006,
    "criticalMultiplier": 2.4,
    "criticalChances": 26,
    "status": 16,
    "magazine": 30,
    "reload": 2.3,
    "ammo": 540
  }, {
    "name": "Tiberon Prime",
    "dmg": [
      ["Slash", 13.8],
      ["Puncture", 18.4],
      ["Impact", 13.8]
    ],
    "accuracy": 33.3,
    "bullets": 3,
    "fireRate": 7.38,
    "criticalMultiplier": 3,
    "criticalChances": 28,
    "status": 2,
    "magazine": 42,
    "reload": 2,
    "ammo": 540
  }, {
    "name": "Tigris",
    "dmg": [
      ["Slash", 840],
      ["Puncture", 105],
      ["Impact", 105]
    ],
    "accuracy": 9.1,
    "bullets": 0,
    "fireRate": 2,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 28,
    "magazine": 2,
    "reload": 1.8,
    "ammo": 120
  }, {
    "name": "Tigris Prime",
    "dmg": [
      ["Slash", 1248],
      ["Puncture", 156],
      ["Impact", 156]
    ],
    "accuracy": 9.1,
    "bullets": 0,
    "fireRate": 2,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 30,
    "magazine": 2,
    "reload": 1.8,
    "ammo": 120
  }, {
    "name": "Tonkor",
    "dmg": [
      ["Puncture", 75]
    ],
    "accuracy": 12.5,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 2.5,
    "criticalChances": 25,
    "status": 10,
    "magazine": 2,
    "reload": 2,
    "ammo": 40
  }, {
    "name": "Torid",
    "dmg": [
      ["Toxin", 100]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 1.5,
    "criticalMultiplier": 2,
    "criticalChances": 15,
    "status": 20,
    "magazine": 5,
    "reload": 1.7,
    "ammo": 60
  }, {
    "name": "Twin Grakatas",
    "dmg": [
      ["Slash", 2.65],
      ["Puncture", 3.35],
      ["Impact", 4]
    ],
    "accuracy": 28.6,
    "bullets": 2,
    "fireRate": 20,
    "criticalMultiplier": 2.7,
    "criticalChances": 25,
    "status": 11,
    "magazine": 120,
    "reload": 3,
    "ammo": 1200
  }, {
    "name": "Twin gremlins",
    "dmg": [
      ["Slash", 12.3],
      ["Puncture", 12.3],
      ["Impact", 12.3]
    ],
    "accuracy": 16.7,
    "bullets": 1,
    "fireRate": 5,
    "criticalMultiplier": 1.5,
    "criticalChances": 15,
    "status": 15,
    "magazine": 30,
    "reload": 1.1,
    "ammo": 210
  }, {
    "name": "Twin Kohmak",
    "dmg": [
      ["Slash", 90],
      ["Puncture", 30],
      ["Impact", 30]
    ],
    "accuracy": 3,
    "bullets": 0,
    "fireRate": 6.67,
    "criticalMultiplier": 2,
    "criticalChances": 11,
    "status": 23,
    "magazine": 80,
    "reload": 2.2,
    "ammo": 240
  }, {
    "name": "Twin Rogga",
    "dmg": [
      ["Slash", 70.5],
      ["Puncture", 352.5],
      ["Impact", 282]
    ],
    "accuracy": 4.3,
    "bullets": 0,
    "fireRate": 2.5,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 33,
    "magazine": 2,
    "reload": 1.5,
    "ammo": 120
  }, {
    "name": "Twin vipers",
    "dmg": [
      ["Slash", 5.1],
      ["Puncture", 1.7],
      ["Impact", 10.2]
    ],
    "accuracy": 8.7,
    "bullets": 1,
    "fireRate": 25,
    "criticalMultiplier": 1.5,
    "criticalChances": 15,
    "status": 11,
    "magazine": 28,
    "reload": 2,
    "ammo": 420
  }, {
    "name": "Tysis",
    "dmg": [
      ["Toxin", 39.5],
      ["Electric", 39.5]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 2.5,
    "criticalMultiplier": 1.5,
    "criticalChances": 3,
    "status": 50,
    "magazine": 11,
    "reload": 1.2,
    "ammo": 210
  }, {
    "name": "Vasto",
    "dmg": [
      ["Slash", 29],
      ["Puncture", 14.5],
      ["Impact", 14.5]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 5,
    "criticalMultiplier": 1.8,
    "criticalChances": 20,
    "status": 8,
    "magazine": 6,
    "reload": 1,
    "ammo": 210
  }, {
    "name": "Vasto prime",
    "dmg": [
      ["Slash", 46.2],
      ["Puncture", 9.9],
      ["Impact", 9.9]
    ],
    "accuracy": 16,
    "bullets": 1,
    "fireRate": 5.42,
    "criticalMultiplier": 2.4,
    "criticalChances": 22,
    "status": 22,
    "magazine": 6,
    "reload": 1,
    "ammo": 210
  }, {
    "name": "Vaykor Hek",
    "dmg": [
      ["Slash", 105],
      ["Puncture", 341.3],
      ["Impact", 78.8]
    ],
    "accuracy": 9.1,
    "bullets": 0,
    "fireRate": 3,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 25,
    "magazine": 8,
    "reload": 2.3,
    "ammo": 120
  }, {
    "name": "Vaykor Marelok",
    "dmg": [
      ["Slash", 48],
      ["Puncture", 16],
      ["Impact", 96]
    ],
    "accuracy": 10,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 1.5,
    "criticalChances": 20,
    "status": 35,
    "magazine": 10,
    "reload": 1.7,
    "ammo": 210
  }, {
    "name": "Vectis",
    "dmg": [
      ["Slash", 56.3],
      ["Puncture", 78.8],
      ["Impact", 90]
    ],
    "accuracy": 13.3,
    "bullets": 1,
    "fireRate": 1.11,
    "criticalMultiplier": 2,
    "criticalChances": 25,
    "status": 30,
    "magazine": 1,
    "reload": 0.9,
    "ammo": 72
  }, {
    "name": "Vectis Prime",
    "dmg": [
      ["Slash", 52.5],
      ["Puncture", 157.5],
      ["Impact", 140]
    ],
    "accuracy": 13.3,
    "bullets": 1,
    "fireRate": 2.67,
    "criticalMultiplier": 2,
    "criticalChances": 30,
    "status": 30,
    "magazine": 2,
    "reload": 0.85,
    "ammo": 72
  }, {
    "name": "Veldt",
    "dmg": [
      ["Slash", 43.2],
      ["Puncture", 23.4],
      ["Impact", 23.4]
    ],
    "accuracy": 25,
    "bullets": 1,
    "fireRate": 3.67,
    "criticalMultiplier": 2.2,
    "criticalChances": 22,
    "status": 22,
    "magazine": 16,
    "reload": 1.6,
    "ammo": 528
  }, {
    "name": "Viper",
    "dmg": [
      ["Slash", 5.1],
      ["Puncture", 1.7],
      ["Impact", 10.2]
    ],
    "accuracy": 15.4,
    "bullets": 1,
    "fireRate": 14.4,
    "criticalMultiplier": 1.5,
    "criticalChances": 15,
    "status": 11,
    "magazine": 14,
    "reload": 0.7,
    "ammo": 420
  }, {
    "name": "Viper Wraith",
    "dmg": [
      ["Slash", 1.8],
      ["Puncture", 1.8],
      ["Impact", 14.4]
    ],
    "accuracy": 28.6,
    "bullets": 1,
    "fireRate": 14.38,
    "criticalMultiplier": 2,
    "criticalChances": 19,
    "status": 9,
    "magazine": 20,
    "reload": 0.8,
    "ammo": 420
  }, {
    "name": "Vulkar",
    "dmg": [
      ["Slash", 11.2],
      ["Puncture", 33.8],
      ["Impact", 180]
    ],
    "accuracy": 13.3,
    "bullets": 1,
    "fireRate": 1.5,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 25,
    "magazine": 6,
    "reload": 3,
    "ammo": 72
  }, {
    "name": "Vulkar Wraith",
    "dmg": [
      ["Puncture", 27.3],
      ["Impact", 245.7]
    ],
    "accuracy": 13.3,
    "bullets": 1,
    "fireRate": 2,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 25,
    "magazine": 8,
    "reload": 3,
    "ammo": 72
  }, {
    "name": "Wraith twin vipers",
    "dmg": [
      ["Slash", 1.8],
      ["Puncture", 1.8],
      ["Impact", 14.4]
    ],
    "accuracy": 11.1,
    "bullets": 1,
    "fireRate": 25,
    "criticalMultiplier": 2,
    "criticalChances": 19,
    "status": 9,
    "magazine": 40,
    "reload": 0.8,
    "ammo": 440
  }, {
    "name": "Zakti",
    "dmg": [
      ["Puncture", 18],
      ["Impact", 12]
    ],
    "accuracy": 26.7,
    "bullets": 1,
    "fireRate": 5,
    "criticalMultiplier": 1.5,
    "criticalChances": 2,
    "status": 20,
    "magazine": 3,
    "reload": 0.8,
    "ammo": 210
  }, {
    "name": "Zarr",
    "dmg": [
      ["Cold", 87.5],
      ["Heat", 87.5],
      ["Impact", 25]
    ],
    "accuracy": 100,
    "bullets": 1,
    "fireRate": 1.67,
    "criticalMultiplier": 2.5,
    "criticalChances": 17,
    "status": 29,
    "magazine": 3,
    "reload": 2.3,
    "ammo": 84
  }, {
    "name": "Zenith",
    "dmg": [
      ["Slash", 19.5],
      ["Puncture", 6],
      ["Impact", 4.5]
    ],
    "accuracy": 33.3,
    "bullets": 1,
    "fireRate": 10.83,
    "criticalMultiplier": 2,
    "criticalChances": 10,
    "status": 34,
    "magazine": 90,
    "reload": 1.6,
    "ammo": 540
  }, {
    "name": "Zhuge",
    "dmg": [
      ["Slash", 20],
      ["Puncture", 75],
      ["Impact", 5]
    ],
    "accuracy": 40,
    "bullets": 1,
    "fireRate": 4.17,
    "criticalMultiplier": 2,
    "criticalChances": 20,
    "status": 35,
    "magazine": 20,
    "reload": 2.5,
    "ammo": 540
  }
];


export interface DamageType {
  id: string
  name: string
  type: "Physical" | "Elemental" | "Combined"
  desc: string
  combinedBy?: string[]
}
/*
var ar = [
  ["Impact   ","冲击","Physical",null,"蹒跚"],
  ["Puncture ","穿刺","Physical",null,"伤害输出"],
  ["Slash    ","切割","Physical",null,"流血"],
  ["Cold     ","冰冻","Elemental",null,"缓速"],
  ["Electricity","电击","Elemental",null,"链式攻击"],
  ["Heat     ","火焰","Elemental",null,"火焰DoT 恐惧"],
  ["Toxin    ","毒素","Elemental",null,"生命DoT"],
  ["Blast    ","爆炸","Combined ","Heat, Cold","击倒"],
  ["Corrosive","腐蚀","Combined","Electricity, Toxin","降低护甲"],
  ["Gas      ","毒气","Combined","Heat, Toxin","毒素AoE"],
  ["Magnetic ","磁力","Combined","Cold, Electricity","降低最大护盾值"],
  ["Radiation","辐射","Combined","Heat, Electricity","降低精度 向队友开火"],
  ["Viral","病毒","Combined","Cold, Toxin","降低最大生命值"]];
JSON.stringify(ar.map(v => {
    let o = {
        id: v[0].trim(),
        name: v[1].trim(),
        type: v[2].trim(),
        desc: v[4].trim()
    };
    if (v[3]) o.combinedBy = v[3].trim().split(", ");
    return o;
}));
*/

/**
 * 伤害类型数据
 */
export const DamageTypeDatabase: DamageType[] = [
  {
    "id": "Impact",
    "name": "冲击",
    "type": "Physical",
    "desc": "蹒跚"
  }, {
    "id": "Puncture",
    "name": "穿刺",
    "type": "Physical",
    "desc": "伤害输出"
  }, {
    "id": "Slash",
    "name": "切割",
    "type": "Physical",
    "desc": "流血"
  }, {
    "id": "Cold",
    "name": "冰冻",
    "type": "Elemental",
    "desc": "缓速"
  }, {
    "id": "Electricity",
    "name": "电击",
    "type": "Elemental",
    "desc": "链式攻击"
  }, {
    "id": "Heat",
    "name": "火焰",
    "type": "Elemental",
    "desc": "火焰DoT 恐惧"
  }, {
    "id": "Toxin",
    "name": "毒素",
    "type": "Elemental",
    "desc": "生命DoT"
  }, {
    "id": "Blast",
    "name": "爆炸",
    "type": "Combined",
    "desc": "击倒",
    "combinedBy": ["Heat", "Cold"]
  }, {
    "id": "Corrosive",
    "name": "腐蚀",
    "type": "Combined",
    "desc": "降低护甲",
    "combinedBy": ["Electricity", "Toxin"]
  }, {
    "id": "Gas",
    "name": "毒气",
    "type": "Combined",
    "desc": "毒素AoE",
    "combinedBy": ["Heat", "Toxin"]
  }, {
    "id": "Magnetic",
    "name": "磁力",
    "type": "Combined",
    "desc": "降低最大护盾值",
    "combinedBy": ["Cold", "Electricity"]
  }, {
    "id": "Radiation",
    "name": "辐射",
    "type": "Combined",
    "desc": "降低精度 向队友开火",
    "combinedBy": ["Heat", "Electricity"]
  }, {
    "id": "Viral",
    "name": "病毒",
    "type": "Combined",
    "desc": "降低最大生命值",
    "combinedBy": ["Cold", "Toxin"]
  }
];
/**
 * 普通MOD信息
 */
export interface NormalMod {
  id: string
  name: string
  type: string // Melee Rifle Shotgun Pistol
  modifier: [string, number][]
}

/*
步枪: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Rifle-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
手枪: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Handgun-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
霰弹枪: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Shotgun-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
近战: https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Dcsv/offset%3D0/limit%3D500/-5B-5B%E6%A6%82%E5%BF%B5:Melee-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue/searchlabel%3DCSV
*/
/**
 * 普通MOD信息
 */
export const NormalModDatabase = [
  {
    "id": "Hunter Munitions",
    "name": "猎人 战备"
  }, {
    "id": "Maiming Strike",
    "name": "致残突击",
  }, {
    "id": "Blood Rush",
    "name": "急进猛突",
  }, {
    "id": "Voltaic Strike",
    "name": "伏打电能",
  }, {
    "id": "Primed Cryo Rounds",
    "name": "低温弹头 Prime",
  }, {
    "id": "Primed Point Blank",
    "name": "抵近射击 Prime",
  }, {
    "id": "Primed Bane of Corpus",
    "name": "灭亡 Corpus Prime",
  }, {
    "id": "Primed Bane of Grineer",
    "name": "灭亡 Grineer Prime",
  }, {
    "id": "Primed Bane of Infested",
    "name": "灭亡 Infested Prime",
  }, {
    "id": "Primed Bane of Corrupted",
    "name": "灭亡堕落者 Prime",
  }, {
    "id": "Primed Fast Hands",
    "name": "爆发装填 Prime",
  }, {
    "id": "Primed Ravage",
    "name": "破灭 Prime",
  }, {
    "id": "Full Contact",
    "name": "全面接触",
  }, {
    "id": "Critical Delay",
    "name": "关键延迟",
  }, {
    "id": "Frigid Blast",
    "name": "冰冷疾风",
  }, {
    "id": "Adhesive Blast",
    "name": "凝胶爆破"
  }, {
    "id": "Split Chamber",
    "name": "分裂膛室"
  }, {
    "id": "Accelerated Blast",
    "name": "加速冲击"
  }, {
    "id": "Kinetic Ricochet",
    "name": "动力回弹"
  }, {
    "id": "Vile Acceleration",
    "name": "卑劣加速"
  }, {
    "id": "Metal Auger",
    "name": "合金钻头"
  }, {
    "id": "Hell's Chamber",
    "name": "地狱弹膛"
  }, {
    "id": "Lock and Load",
    "name": "填弹上膛"
  }, {
    "id": "Fanged Fusillade",
    "name": "尖牙连射"
  }, {
    "id": "Vital Sense",
    "name": "弱点感应"
  }, {
    "id": "Gun Glide",
    "name": "恒稳枪杆"
  }, {
    "id": "Vicious Spread",
    "name": "恶性扩散"
  }, {
    "id": "Sweeping Serration",
    "name": "扫荡锯齿"
  }, {
    "id": "Neutralizing Justice",
    "name": "抵消正义"
  }, {
    "id": "Shred",
    "name": "撕裂"
  }, {
    "id": "Scattered Justice",
    "name": "散射正义"
  }, {
    "id": "Tactical Reload",
    "name": "机动装填"
  }, {
    "id": "Vile Precision",
    "name": "极恶精准"
  }, {
    "id": "Rifle Ammo Mutation",
    "name": "步枪弹药转换"
  }, {
    "id": "Toxic Barrage",
    "name": "毒素弹幕"
  }, {
    "id": "Argon Scope",
    "name": "氩晶瞄具"
  }, {
    "id": "Lasting Purity",
    "name": "永恒纯净"
  }, {
    "id": "Tainted Shell",
    "name": "污秽弹药"
  }, {
    "id": "Double-Barrel Drift",
    "name": "游离双管"
  }, {
    "id": "Chilling Reload",
    "name": "激冷装填"
  }, {
    "id": "Combustion Beam",
    "name": "灼热光束"
  }, {
    "id": "Scattering Inferno",
    "name": "炼狱轰击"
  }, {
    "id": "Blaze",
    "name": "烈焰"
  }, {
    "id": "Firestorm",
    "name": "烈焰风暴"
  }, {
    "id": "Entropy Burst",
    "name": "熵数爆发"
  }, {
    "id": "Seeking Fury",
    "name": "狂暴追猎"
  }, {
    "id": "Narrow Barrel",
    "name": "狭窄枪膛"
  }, {
    "id": "Hunter Track",
    "name": "猎人 追踪"
  }, {
    "id": "Shell Shock",
    "name": "电冲弹药"
  }, {
    "id": "Voltage Sequence",
    "name": "电压数列"
  }, {
    "id": "Rime Rounds",
    "name": "白霜弹头"
  }, {
    "id": "Ravage",
    "name": "破灭"
  }, {
    "id": "Shattering Justice",
    "name": "破碎正义"
  }, {
    "id": "Breach Loader",
    "name": "破裂填装"
  }, {
    "id": "Vigilante Offense",
    "name": "私法 侵犯"
  }, {
    "id": "Vigilante Supplies",
    "name": "私法 补给"
  }, {
    "id": "Stabilizer",
    "name": "稳定"
  }, {
    "id": "Piercing Caliber",
    "name": "穿甲口径"
  }, {
    "id": "Seeking Force",
    "name": "穿透力"
  }, {
    "id": "Arrow Mutation",
    "name": "箭矢转换"
  }, {
    "id": "Spring-Loaded Broadhead",
    "name": "簧压猎箭"
  }, {
    "id": "Tether Grenades",
    "name": "系绳榴弹"
  }, {
    "id": "Nano-Applicator",
    "name": "纳米涂覆"
  }, {
    "id": "Disarming Purity",
    "name": "缴械纯净"
  }, {
    "id": "Depleted Reload",
    "name": "耗竭装填"
  }, {
    "id": "Tainted Mag",
    "name": "腐败弹匣"
  }, {
    "id": "Deadly Sequence",
    "name": "致命数列"
  }, {
    "id": "Malignant Force",
    "name": "致命火力"
  }, {
    "id": "Frail Momentum",
    "name": "虚弱动能"
  }, {
    "id": "Burdened Magazine",
    "name": "过载弹匣"
  }, {
    "id": "Crash Course",
    "name": "连续冲击"
  }, {
    "id": "Flux Overdrive",
    "name": "通量射线步枪超载"
  }, {
    "id": "Heavy Caliber",
    "name": "重口径"
  }, {
    "id": "Hammer Shot",
    "name": "重锤射击"
  }, {
    "id": "Wildfire",
    "name": "野火"
  }, {
    "id": "Thermite Rounds",
    "name": "铝热焊弹"
  }, {
    "id": "Target Acquired",
    "name": "锁定目标"
  }, {
    "id": "Gilded Truth",
    "name": "镀金真相"
  }, {
    "id": "Critical Deceleration",
    "name": "降速暴击"
  }, {
    "id": "Thunderbolt",
    "name": "雷火"
  }, {
    "id": "Shotgun Ammo Mutation",
    "name": "霰弹枪弹药转换"
  }, {
    "id": "High Voltage",
    "name": "高压电流"
  }, {
    "id": "Contagious Spread",
    "name": "传染蔓延"
  }, {
    "id": "Cryo Rounds",
    "name": "低温弹头"
  }, {
    "id": "Charged Shell",
    "name": "充电弹头"
  }, {
    "id": "Cleanse Corpus",
    "name": "净化CORPUS"
  }, {
    "id": "Cleanse Grineer",
    "name": "净化GRINEER"
  }, {
    "id": "Cleanse Infested",
    "name": "净化INFESTED"
  }, {
    "id": "Cleanse Corrupted",
    "name": "净化堕落者"
  }, {
    "id": "Sinister Reach",
    "name": "凶恶延伸"
  }, {
    "id": "Guided Ordinance",
    "name": "制导弹药"
  }, {
    "id": "Shell Compression",
    "name": "压缩弹药"
  }, {
    "id": "Hellfire",
    "name": "地狱火"
  }, {
    "id": "Nightwatch Napalm",
    "name": "夜巡燃烧弹"
  }, {
    "id": "Silent Battery",
    "name": "寂静炮组"
  }, {
    "id": "Bladed Rounds",
    "name": "尖刃弹头"
  }, {
    "id": "Fomorian Accelerant",
    "name": "巨人促进剂"
  }, {
    "id": "Broad Eye",
    "name": "广域之视"
  }, {
    "id": "Chilling Grasp",
    "name": "急冻控场"
  }, {
    "id": "Tactical Pump",
    "name": "战术上膛"
  }, {
    "id": "Point Blank",
    "name": "抵近射击"
  }, {
    "id": "Stormbringer",
    "name": "暴风使者"
  }, {
    "id": "Agile Aim",
    "name": "机动瞄准"
  }, {
    "id": "Terminal Velocity",
    "name": "极限速度"
  }, {
    "id": "Rifle Aptitude",
    "name": "步枪才能"
  }, {
    "id": "Infected Clip",
    "name": "污染弹匣"
  }, {
    "id": "Bane of Corpus",
    "name": "灭亡CORPUS"
  }, {
    "id": "Bane of Grineer",
    "name": "灭亡GRINEER"
  }, {
    "id": "Bane of Infested",
    "name": "灭亡INFESTED"
  }, {
    "id": "Bane Of Corrupted",
    "name": "灭亡堕落者"
  }, {
    "id": "Speed Trigger",
    "name": "灵敏扳机"
  }, {
    "id": "Incendiary Coat",
    "name": "燃烧外壳"
  }, {
    "id": "Vigilante Fervor",
    "name": "私法 热诚"
  }, {
    "id": "Spring-Loaded Chamber",
    "name": "簧压膛室"
  }, {
    "id": "Soft Hands",
    "name": "精湛快手"
  }, {
    "id": "Overview",
    "name": "综观全局"
  }, {
    "id": "Serration",
    "name": "膛线"
  }, {
    "id": "Fatal Acceleration",
    "name": "致死加速"
  }, {
    "id": "Charged Chamber",
    "name": "蓄力装填"
  }, {
    "id": "Shotgun Spazz",
    "name": "表演时间"
  }, {
    "id": "Repeater Clip",
    "name": "转轮弹匣"
  }, {
    "id": "Twitch",
    "name": "迅速抽换"
  }, {
    "id": "Shotgun Savvy",
    "name": "通晓霰弹枪"
  }, {
    "id": "Snap Shot",
    "name": "速射"
  }, {
    "id": "Acid Shells",
    "name": "酸性弹药"
  }, {
    "id": "Laser Sight",
    "name": "雷射瞄具"
  }, {
    "id": "Ammo Stock",
    "name": "霰弹扩充"
  }, {
    "id": "Eagle Eye",
    "name": "鹰眼"
  }, {
    "id": "Disruptor",
    "name": "冲击干扰"
  }, {
    "id": "Magazine Warp",
    "name": "弹匣增幅"
  }, {
    "id": "Ammo Drum",
    "name": "弹鼓"
  }, {
    "id": "Lingering Torment",
    "name": "恒久折磨"
  }, {
    "id": "Continuous Misery",
    "name": "无尽苦难"
  }, {
    "id": "Hush",
    "name": "消音器"
  }, {
    "id": "Fast Hands",
    "name": "爆发装填"
  }, {
    "id": "Shrapnel Shot",
    "name": "破片射击"
  }, {
    "id": "Rupture",
    "name": "破裂"
  }, {
    "id": "Vigilante Armaments",
    "name": "私法 军备"
  }, {
    "id": "Piercing Hit",
    "name": "穿甲伤害"
  }, {
    "id": "Flechette",
    "name": "箭型弹头"
  }, {
    "id": "Shredder",
    "name": "粉碎器"
  }, {
    "id": "Point Strike",
    "name": "致命一击"
  }, {
    "id": "Catalyzer Link",
    "name": "触媒连动"
  }, {
    "id": "Sawtooth Clip",
    "name": "锯齿弹链"
  }, {
    "id": "Blunderbuss",
    "name": "雷筒"
  }, {
    "id": "Primed Slip Magazine",
    "name": "串联弹匣 Prime"
  }, {
    "id": "Primed Target Cracker",
    "name": "弱点专精 Prime"
  }, {
    "id": "Primed Pistol Gambit",
    "name": "手枪精通 Prime"
  }, {
    "id": "Primed Heated Charge",
    "name": "火焰装填 Prime"
  }, {
    "id": "Anemic Agility",
    "name": "乏能迅敏"
  }, {
    "id": "Eroding Blight",
    "name": "侵蚀毁坏"
  }, {
    "id": "Ice Storm",
    "name": "冰风暴"
  }, {
    "id": "Concealed Explosives",
    "name": "内置炸药"
  }, {
    "id": "Creeping Bullseye",
    "name": "匍匐靶心"
  }, {
    "id": "Sequence Burn",
    "name": "延烧数列"
  }, {
    "id": "Pressurized Magazine",
    "name": "增压弹匣"
  }, {
    "id": "Eject Magazine",
    "name": "弹匣置换"
  }, {
    "id": "Seeker",
    "name": "弹头导引"
  }, {
    "id": "Barrel Diffusion",
    "name": "弹头扩散"
  }, {
    "id": "Pummel",
    "name": "强力猛击"
  }, {
    "id": "Tainted Clip",
    "name": "感染弹匣"
  }, {
    "id": "Stunning Speed",
    "name": "慑人神速"
  }, {
    "id": "Pistol Ammo Mutation",
    "name": "手枪弹药转换"
  }, {
    "id": "Bore",
    "name": "枪膛"
  }, {
    "id": "Toxic Sequence",
    "name": "毒素数列"
  }, {
    "id": "Strafing Slide",
    "name": "滑行扫射"
  }, {
    "id": "Scorch",
    "name": "灼痕焦点"
  }, {
    "id": "Thermagnetic Shells",
    "name": "热磁弹药"
  }, {
    "id": "Entropy Spike",
    "name": "熵数尖钉"
  }, {
    "id": "Fulmination",
    "name": "猛烈爆发"
  }, {
    "id": "Jolt",
    "name": "电流震击"
  }, {
    "id": "Pistol Pestilence",
    "name": "瘟疫手枪"
  }, {
    "id": "Stockpiled Blight",
    "name": "积存毁坏"
  }, {
    "id": "Steady Hands",
    "name": "稳定枪手"
  }, {
    "id": "Hollow Point",
    "name": "空尖弹"
  }, {
    "id": "Winds of Purity",
    "name": "纯净之风"
  }, {
    "id": "Frostbite",
    "name": "结霜侵蚀"
  }, {
    "id": "Lethal Torrent",
    "name": "致命洪流"
  }, {
    "id": "Maim",
    "name": "致残枪弹"
  }, {
    "id": "Stinging Truth",
    "name": "过激真相"
  }, {
    "id": "Magnum Force",
    "name": "重装火力"
  }, {
    "id": "Augur Seeker",
    "name": "预言 探求"
  }, {
    "id": "Embedded Catalyzer",
    "name": "内置触媒"
  }, {
    "id": "Sure Shot",
    "name": "准确射手"
  }, {
    "id": "Razor Shot",
    "name": "剃刀射击"
  }, {
    "id": "Reflex Draw",
    "name": "反射拔枪"
  }, {
    "id": "Targeting Subsystem",
    "name": "定位辅助"
  }, {
    "id": "Sharpened Bullets",
    "name": "尖锐子弹"
  }, {
    "id": "Target Cracker",
    "name": "弱点专精"
  }, {
    "id": "No Return",
    "name": "有去无回"
  }, {
    "id": "Ruinous Extension",
    "name": "毁灭扩展"
  }, {
    "id": "Deep Freeze",
    "name": "深层冷冻"
  }, {
    "id": "Heated Charge",
    "name": "火焰装填"
  }, {
    "id": "Pathogen Rounds",
    "name": "病原弹头"
  }, {
    "id": "Convulsion",
    "name": "痉挛"
  }, {
    "id": "Gunslinger",
    "name": "神枪手"
  }, {
    "id": "Air Recon",
    "name": "空中侦察"
  }, {
    "id": "Lethal Momentum",
    "name": "致命动量"
  }, {
    "id": "Spry Sights",
    "name": "迅敏视觉"
  }, {
    "id": "Hawk Eye",
    "name": "隼目"
  }, {
    "id": "Concussion Rounds",
    "name": "震荡弹头"
  }, {
    "id": "Expel Corpus",
    "name": "驱逐CORPUS"
  }, {
    "id": "Expel Grineer",
    "name": "驱逐GRINEER"
  }, {
    "id": "Expel Infested",
    "name": "驱逐INFESTED"
  }, {
    "id": "Expel Corrupted",
    "name": "驱逐堕落者"
  }, {
    "id": "Hornet Strike",
    "name": "黄蜂蛰刺"
  }, {
    "id": "Slip Magazine",
    "name": "串联弹匣"
  }, {
    "id": "Trick Mag",
    "name": "戏法增幅"
  }, {
    "id": "Pistol Gambit",
    "name": "手枪精通"
  }, {
    "id": "Quickdraw",
    "name": "持续火力"
  }, {
    "id": "Perpetual Agony",
    "name": "永恒苦痛"
  }, {
    "id": "Suppress",
    "name": "消音"
  }, {
    "id": "Hydraulic Crosshairs",
    "name": "液压准心"
  }, {
    "id": "Augur Pact",
    "name": "预言 契约"
  }, {
    "id": "Primed Reach",
    "name": "剑风 Prime"
  }, {
    "id": "Primed Pressure Point",
    "name": "压迫点 Prime"
  }, {
    "id": "Primed Fever Strike",
    "name": "热病打击 Prime"
  }, {
    "id": "Primed Fury",
    "name": "狂暴 Prime"
  }, {
    "id": "Primed Heavy Trauma",
    "name": "重创 Prime"
  }, {
    "id": "Bright Purity",
    "name": "光明纯净"
  }, {
    "id": "Collision Force",
    "name": "冲击巨力"
  }, {
    "id": "Virulent Scourge",
    "name": "剧毒灾害"
  }, {
    "id": "Quickening",
    "name": "加速"
  }, {
    "id": "Avenging Truth",
    "name": "复仇真相"
  }, {
    "id": "Power Throw",
    "name": "奋力一掷"
  }, {
    "id": "Guardian Derision",
    "name": "奚落守护"
  }, {
    "id": "Condition Overload",
    "name": "异况超量"
  }, {
    "id": "Rending Strike",
    "name": "撕裂打击"
  }, {
    "id": "Whirlwind",
    "name": "旋风"
  }, {
    "id": "Justice Blades",
    "name": "正义刀锋"
  }, {
    "id": "Gleaming Blight",
    "name": "毁坏微光"
  }, {
    "id": "Toxic Blight",
    "name": "毁坏毒素"
  }, {
    "id": "Healing Return",
    "name": "治愈归复"
  }, {
    "id": "Drifting Contact",
    "name": "漂移接触"
  }, {
    "id": "Entropy Detonation",
    "name": "熵数起爆"
  }, {
    "id": "Volcanic Edge",
    "name": "爆裂刀刃"
  }, {
    "id": "Berserker",
    "name": "狂战士"
  }, {
    "id": "Life Strike",
    "name": "生命打击"
  }, {
    "id": "Blade of Truth",
    "name": "真相之刃"
  }, {
    "id": "Sundering Strike",
    "name": "破甲"
  }, {
    "id": "Spring-Loaded Blade",
    "name": "簧压刀刃"
  }, {
    "id": "Focus Energy",
    "name": "聚焦能量"
  }, {
    "id": "Energy Channel",
    "name": "能量导引"
  }, {
    "id": "Spoiled Strike",
    "name": "腐坏打击"
  }, {
    "id": "Covert Lethality",
    "name": "致命匿杀"
  }, {
    "id": "Vicious Frost",
    "name": "蚀骨寒霜"
  }, {
    "id": "Auger Strike",
    "name": "螺钻打击"
  }, {
    "id": "Gladiator Vice",
    "name": "角斗士 钳制"
  }, {
    "id": "Buzz Kill",
    "name": "败兴虐杀"
  }, {
    "id": "Corrupt Charge",
    "name": "邪恶蓄力"
  }, {
    "id": "Heavy Trauma",
    "name": "重创"
  }, {
    "id": "Jagged Edge",
    "name": "锯刃"
  }, {
    "id": "Static Discharge",
    "name": "静电释放"
  }, {
    "id": "Entropy Flight",
    "name": "飞逝熵数"
  }, {
    "id": "Killing Blow",
    "name": "一击必杀"
  }, {
    "id": "Weeping Wounds",
    "name": "创口溃烂"
  }, {
    "id": "North Wind",
    "name": "北风"
  }, {
    "id": "Reflex Coil",
    "name": "增幅线圈"
  }, {
    "id": "Relentless Combination",
    "name": "残酷组合"
  }, {
    "id": "Smite Corpus",
    "name": "毁灭CORPUS"
  }, {
    "id": "Smite Grineer",
    "name": "毁灭GRINEER"
  }, {
    "id": "Smite Infested",
    "name": "毁灭INFESTED"
  }, {
    "id": "Smite Corrupted",
    "name": "毁灭堕落者"
  }, {
    "id": "Vulcan Blitz",
    "name": "火神闪击"
  }, {
    "id": "Fever Strike",
    "name": "热病打击"
  }, {
    "id": "Molten Impact",
    "name": "熔岩冲击"
  }, {
    "id": "Fury",
    "name": "狂暴"
  }, {
    "id": "Hunter's Bonesaw",
    "name": "猎人骨锯"
  }, {
    "id": "Shocking Touch",
    "name": "电击触点"
  }, {
    "id": "Electromagnetic Shielding",
    "name": "电磁屏障"
  }, {
    "id": "Finishing Touch",
    "name": "画龙点睛"
  }, {
    "id": "Rift Strike",
    "name": "裂缝打击"
  }, {
    "id": "Gladiator Might",
    "name": "角斗士 威猛"
  }, {
    "id": "Dispatch Overdrive",
    "name": "超速击杀"
  }, {
    "id": "Enduring Affliction",
    "name": "长时苦难"
  }, {
    "id": "Seismic Wave",
    "name": "震波"
  }, {
    "id": "Enduring Strike",
    "name": "不朽打击"
  }, {
    "id": "Pressure Point",
    "name": "压迫点"
  }, {
    "id": "Rebound",
    "name": "弹跳"
  }, {
    "id": "Quick Return",
    "name": "快速收回"
  }, {
    "id": "True Steel",
    "name": "斩铁"
  }, {
    "id": "Lasting Sting",
    "name": "未完之刺"
  }, {
    "id": "Body Count",
    "name": "杀伤计数"
  }, {
    "id": "Blocking",
    "name": "格挡"
  }, {
    "id": "True Punishment",
    "name": "真实惩罚"
  }, {
    "id": "Shattering Impact",
    "name": "碎裂冲击"
  }, {
    "id": "Organ Shatter",
    "name": "肢解"
  }, {
    "id": "Gladiator Rush",
    "name": "角斗士 猛突"
  }, {
    "id": "Focused Defense",
    "name": "重点防御"
  }, {
    "id": "Melee Prowess",
    "name": "非凡技巧"
  }, {
    "id": "Slicing Feathers",
    "name": "割裂羽翼"
  }, {
    "id": "Bullet Dance",
    "name": "刀锋弹舞"
  }, {
    "id": "Crossing Snakes",
    "name": "双蛇牙突"
  }, {
    "id": "Twirling Spire",
    "name": "回转尖峰"
  }, {
    "id": "Vengeful Revenant",
    "name": "复仇亡灵"
  }, {
    "id": "Flailing Branch",
    "name": "多流抽击"
  }, {
    "id": "Four Riders",
    "name": "天启异象"
  }, {
    "id": "Pointed Wind",
    "name": "尖锐之风"
  }, {
    "id": "Cleaving Whirlwind",
    "name": "弧刃回天"
  }, {
    "id": "Gleaming Talon",
    "name": "微光利爪"
  }, {
    "id": "Malicious Raptor",
    "name": "恶毒猛禽"
  }, {
    "id": "Astral Twilight",
    "name": "星界微光"
  }, {
    "id": "Crushing Ruin",
    "name": "月落乌啼"
  }, {
    "id": "Vermilion Storm",
    "name": "朱红暴风"
  }, {
    "id": "Decisive Judgement",
    "name": "果断裁决"
  }, {
    "id": "High Noon",
    "name": "正午"
  }, {
    "id": "Brutal Tide",
    "name": "残暴浪潮"
  }, {
    "id": "Gaia's Tragedy",
    "name": "母神悲歌"
  }, {
    "id": "Coiling Viper",
    "name": "毒蛇螺旋"
  }, {
    "id": "Vulpine Mask",
    "name": "狡狐诈面"
  }, {
    "id": "Gnashing Payara",
    "name": "狼鱼咬咬"
  }, {
    "id": "Swooping Falcon",
    "name": "猎鹰俯击"
  }, {
    "id": "Tempo Royale",
    "name": "皇家节奏"
  }, {
    "id": "Tranquil Cleave",
    "name": "秋风落叶"
  }, {
    "id": "Defiled Snapdragon",
    "name": "积秽骁龙"
  }, {
    "id": "Stalking Fan",
    "name": "缠旋风切"
  }, {
    "id": "Sovereign Outcast",
    "name": "至尊浪人"
  }, {
    "id": "Stinging Thorn",
    "name": "蛰刺狂棘"
  }, {
    "id": "Bleeding Willow",
    "name": "血色万柳"
  }, {
    "id": "Crimson Dervish",
    "name": "赤红狂舞"
  }, {
    "id": "Iron Phoenix",
    "name": "钢铁凤凰"
  }, {
    "id": "Carving Mantis",
    "name": "雕斩螳螂"
  }, {
    "id": "Seismic Palm",
    "name": "震撼冲拳"
  }, {
    "id": "Cyclone Kraken",
    "name": "飓风海怪"
  }, {
    "id": "Shattering Storm",
    "name": "云暴山碎"
  }, {
    "id": "Grim Fury",
    "name": "冷面狂怒"
  }, {
    "id": "Sundering Weave",
    "name": "分裂编织"
  }, {
    "id": "Clashing Forest",
    "name": "巨林冲击"
  }, {
    "id": "Rending Crane",
    "name": "撕裂鹤击"
  }, {
    "id": "Reaping Spiral",
    "name": "收割螺旋"
  }, {
    "id": "Spinning Needle",
    "name": "旋压刺针"
  }, {
    "id": "Swirling Tiger",
    "name": "旋风虎击"
  }, {
    "id": "Blind Justice",
    "name": "无明制裁"
  }, {
    "id": "Final Harbinger",
    "name": "最终先驱"
  }, {
    "id": "Sinking Talon",
    "name": "沉没之爪"
  }, {
    "id": "Atlantis Vulcan",
    "name": "深渊之火"
  }, {
    "id": "Burning Wasp",
    "name": "炙热黄蜂"
  }, {
    "id": "Fracturing Wind",
    "name": "破碎之风"
  }, {
    "id": "Gemini Cross",
    "name": "纵横双子"
  }, {
    "id": "Eleventh Storm",
    "name": "终焉风暴"
  }, {
    "id": "Homing Fang",
    "name": "连牙追袭"
  }, {
    "id": "Primed Pistol Ammo Mutation",
    "name": "手枪弹药转换 Prime"
  }, {
    "id": "Vermillion Storm",
    "name": "朱红暴风"
  }, {
    "id": "Primed Rifle Ammo Mutation",
    "name": "步枪弹药转换 Prime"
  }, {
    "id": "Primed Shotgun Ammo Mutation",
    "name": "霰弹枪弹药转换 Prime"
  }, {
    "id": "Sacrificial Steel",
    "name": "牺牲 斩铁"
  }, {
    "id": "Sacrificial Pressure",
    "name": "牺牲 压迫点"
  }];

/**
 * 主要工具类
 */
export class RivenDataBase {
  private weaponDict = new Map<string, number>()
  private propDict = new Map<string, number>()
  private rivenDict = new Map<string, number>()

  PropRegExps = {
    gun: new RegExp(`(?:(${RivenPropertyDataBase.gun.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.gun.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.gun.map(v => v.subfix).join("|")})`, "i"),
    melee: new RegExp(`(?:(${RivenPropertyDataBase.melee.map(v => v.prefix).join("|")})-)?(${RivenPropertyDataBase.melee.map(v => v.prefix).join("|")})(${RivenPropertyDataBase.melee.map(v => v.subfix).join("|")})`, "i"),
  }
  PrefixAll = new RegExp(`(?:${RivenPropertyDataBase.all.map(v => v.prefix).join("|")})`, "i")

  constructor() {
    // 同时添加中英文名称
    RivenWeaponDataBase.forEach((v, i) => { this.weaponDict.set(v.id, i); this.weaponDict.set(v.name, i); });
    RivenPropertyDataBase.all.forEach((v, i) => { this.propDict.set(v.id, i); this.propDict.set(v.name, i); });
  }
  /**
   * 查询是否有这个武器
   * @param name 武器名称
   */
  hasWeapon(name: string) {
    return this.weaponDict.has(name);
  }

  /**
   * 获取武器
   * @param name 武器名称
   */
  getRivenWeaponByName(name: string) {
    return RivenWeaponDataBase[this.weaponDict.get(name)];
  }
  /**
   * 模糊识别武器名称
   * @param name 模糊匹配的名称
   */
  findMostSimRivenWeapon(name: string) {
    if (this.hasWeapon(name)) return this.getRivenWeaponByName(name);
    let weaponFinded = _.maxBy(RivenWeaponDataBase, v => strSimilarity(name, v.name));
    return weaponFinded;
  }
  /**
    * 查询是否有这个属性
    * @param name 属性名称
    */
  hasProp(name: string) {
    return this.propDict.has(name);
  }
  /**
   * 模糊识别属性名称
   * @param prop 属性名称
   */
  findMostSimProp(prop: string) {
    if (this.hasProp(name)) return RivenPropertyDataBase.all[this.propDict.get(name)];
    let propFinded = _.maxBy(RivenPropertyDataBase.all, v => strSimilarity(prop, v.name));
    return propFinded;
  }
  /**
   * 通过名称获取属性
   * @param name 属性名称
   */
  getPropByName(name: string) {
    return RivenPropertyDataBase.all[this.propDict.get(name)];
  }

  /**
   * 通过id获取属性
   * @param id id
   * @param stype 类型 ["gun" | "melee"]
   */
  getPropById(id: string, stype: "gun" | "melee") {
    return this.propDict.get(id);
  }

  /**
   * 通过tag获取属性
   * @param tag tag
   * @param stype 类型 ["gun" | "melee"]
   * @param isPrefix 是否是前缀
   */
  getPropByTag(tag: string, stype: "gun" | "melee", isPrefix: boolean) {
    return RivenPropertyDataBase[stype].find(v => v[isPrefix ? "prefix" : "subfix"] == tag);
  }

  /**
   * 获取属性基础值
   * @param weaponName 武器名
   * @param prop
   * @return 返回基础值 如果为-1说明错误
   */
  getPropBaseValue(weaponName: string, propName: string): number {
    let weapon = this.getRivenWeaponByName(weaponName);
    let prop = this.getPropByName(propName);
    if (weapon && prop)
      return RivenPropertyValueBaseDataBase[weapon.mod][prop.id] * weapon.ratio * (prop.nopercent ? 0.1 : 10) * .9405;
    else
      return -1;
  }
}
