import { ValuedProperty } from "./prop";
import { i18n } from "@/i18n";

/**
 * 加成
 */
export interface BuffData {
  id: string;
  /** 名称(i18n) */
  name: string;
  /** 类型 */
  type: BuffType;
  /** 生效目标 */
  target: string;
  /** 属性 [属性名称, 数值] */
  props?: [string, number][];
  /** 随强度变化的属性 [属性名称, 数值, 基础值] */
  dynamicProps?: [string, number, number][];
  /** 叠加效果 */
  multiLayer?: MultiLayer;
  /** 参数 */
  parms?: [string, string];
  /** 默认参数 */
  defaultValue?: number;
  defaultLayer?: number;
}

export interface MultiLayer {
  /** 最大层数 */
  maxStack: number;
  baseLayer?: number;
  stackableProps?: [string, number][];
  unstackableProps?: [string, number][][];
}

export enum BuffType {
  Arcane,
  Team,
  BaseDamage,
  TotalDamage,
  ElementDamage,
  CritDamage,
  Speed,
  Other,
}
/**
 * 实体BUFF类
 */
export class Buff {
  data: BuffData;
  layer = 1;
  baseLayer = 0;
  power = 1;
  constructor(data: BuffData) {
    this.data = data;
    if (data.defaultLayer) this.layer = data.defaultLayer;
    if (data.multiLayer && data.multiLayer.baseLayer) this.baseLayer = data.multiLayer.baseLayer;
    if (data.defaultValue) this.power = data.defaultValue;
  }
  get name() {
    return this.data.name;
  }
  get shortName() {
    return i18n.t(`buff.${this.name}`).replace(/ \(.+?\)/, "");
  }

  get props() {
    let pout = [];
    if (this.data.props) pout = pout.concat(this.data.props);
    if (this.data.dynamicProps) pout = pout.concat(this.data.dynamicProps.map(([n, v, p]) => [n, v * this.power + p]));
    if (this.data.multiLayer) {
      if (this.data.multiLayer.stackableProps)
        pout = pout.concat(this.data.multiLayer.stackableProps.map(([n, v]) => [n, v * (this.layer + this.baseLayer)]));
      if (this.data.multiLayer.unstackableProps)
        pout = pout.concat(this.data.multiLayer.unstackableProps[this.layer - 1]);
    }
    return pout;
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
      };
    });
  }
  get layerEnable() {
    return !!this.data.multiLayer;
  }
  get powerEnable() {
    return !!this.data.parms;
  }
}
/**
 * 需求效果:
 * 按需添加常用buff并且结果可以编辑
 */

/** 加成列表 */
export const BuffList: BuffData[] = [
  // 赋能
  ...[
    ["a3", "arcaneAgility", [["onDamaged"], ["f", 10]], "Warframe+"], // 灵敏赋能
    ["a4", "arcaneBarrier", [["onDamaged"], ["fsr", 1]], "Warframe+"], // 壁垒赋能
    ["a5", "arcaneAegis", [["onDamaged"], ["psr", 5]], "Warframe+"], // 神盾赋能
    ["a6", "arcaneTrickery", [["onFinish"], ["ivb", 5]], "Warframe"], // 诡计赋能
    ["a7", "arcaneUltimatum", [["onFinish"], ["ea", 200]], "Warframe"], // 通牒赋能
    ["a8", "arcaneArachne", [["onWalllatch"], ["D", 25]], "Weapon"], // 蜘蛛赋能
    ["a9", "arcaneGrace", [["onDamaged"], ["phr", 1]], "Warframe+"], // 优雅赋能
    ["aA", "arcaneGuardian", [["onDamaged"], ["ea", 150]], "Warframe+"], // 保卫者赋能
    ["aB", "arcanePhantasm", [["onBlock"], ["f", 10]], "Warframe+"], // 幻象赋能
    ["aJ", "arcaneAcceleration", [["R", 15]], "Rifle"], // 加速赋能
    ["aK", "arcaneAvenger", [["i0", 7.5]], "Weapon"], // 复仇者赋能
    ["aL", "arcaneAwakening", [["D", 25]], "Secondary"], // 觉醒赋能
    ["aM", "arcaneFury", [["K", 30]], "Melee"], // 狂怒赋能
    ["aN", "arcaneStrike", [["J", 10]], "Melee"], // 速攻赋能
    ["aO", "arcaneMomentum", [["F", 25]], "Sniper"], // 动量赋能
    ["aP", "arcanePrecision", [["D", 50]], "Secondary"], // 精确赋能
    ["aQ", "arcaneRage", [["D", 30]], "Primary"], // 愤怒赋能
    ["aR", "arcaneTempo", [["R", 15]], "Shotgun"], // 节奏赋能
    ["aS", "arcaneVelocity", [["R", 20]], "Secondary"], // 迅速赋能
    ["aT", "paxBolt", [["t", 30], ["x", 30]], "Warframe"], // 和平电闪
    ["aU", "arcaneTanker", [["onEquip"], ["ea", 200]], "Warframe"], // 坦克赋能
  ].map(
    v =>
      ({
        id: v[0],
        name: v[1],
        type: BuffType.Arcane,
        target: v[3],
        defaultLayer: 5,
        multiLayer: {
          baseLayer: 1,
          maxStack: 5,
          stackableProps: v[2],
        },
      } as BuffData)
  ),
  ...[
    ["vA", "virtuosNull", [["erc", 5]], "Amp"], // 正直空无
    ["vB", "virtuosTempo", [["R", 15]], "Amp"], // 正直节奏
    ["vC", "virtuosFury", [["D", 7.5]], "Amp"], // 正直狂怒
    ["vD", "virtuosStrike", [["1", 15]], "Amp"], // 正直打击
    ["vE", "virtuosShadow", [["0", 15]], "Amp"], // 正直暗影
    ["vF", "virtuosGhost", [["2", 15]], "Amp"], // 正直鬼魅
    ["vH", "virtuosSurge", [["vte", 25]], "Amp"], // 正直特洛伊
    ["vG", "virtuosTrojan", [["vtv", 25]], "Amp"], // 正直突波
    ["vI", "virtuosSpike", [["vtp", 25]], "Amp"], // 正直尖刺
    ["vJ", "virtuosForge", [["vth", 25]], "Amp"], // 正直熔炉
    // ["mA", "magusVigor", [[]], "Operator"],
    // ["mB", "magusHusk", [[]], "Operator"],
    // ["mC", "magusCloud", [[]], "Operator"],
    // ["mD", "magusCadence", [[]], "Operator"],
    // ["mE", "magusReplenish", [[]], "Operator"],
    // ["mF", "magusElevate", [[]], "Operator"],
    // ["mG", "magusNourish", [[]], "Operator"],
    // ["mH", "magusOverload", [[]], "Operator"],
    // ["mI", "magusGlitch", [[]], "Operator"],
    // ["mJ", "magusRevert", [[]], "Operator"],
    // ["mK", "magusFirewall", [[]], "Operator"],
    // ["mL", "magusDrive", [[]], "Operator"],
    // ["mM", "magusLockdown", [[]], "Operator"],
    // ["mN", "magusDestruct", [[]], "Operator"],
    // ["mO", "magusAnomaly", [[]], "Operator"],
    ["mP", "magusMelt", [["4", 25]], "Amp"],
    // ["mQ", "magusAccelerant", [[]], "Operator"],
    // ["mR", "magusRepair", [[]], "Operator"],
  ].map(
    v =>
      ({
        id: v[0],
        name: v[1],
        type: BuffType.Arcane,
        target: v[3],
        defaultLayer: v[4] || 3,
        multiLayer: {
          baseLayer: 1,
          maxStack: v[4] || 3,
          stackableProps: v[2],
        },
      } as BuffData)
  ),
  ...[
    ["b4", "kuvaHeat", [["b4", 1, 0]], "Kuva Weapon"], // 初始火伤
    ["b5", "kuvaCold", [["b5", 1, 0]], "Kuva Weapon"], // 初始冰伤
    ["b6", "kuvaToxin", [["b6", 1, 0]], "Kuva Weapon"], // 初始毒伤
    ["b7", "kuvaElectricity", [["b7", 1, 0]], "Kuva Weapon"], // 初始电伤
    ["b8", "kuvaImpact", [["b8", 1, 0]], "Kuva Weapon"], // 初始冲击
    ["bM", "kuvaMagnetic", [["bM", 1, 0]], "Kuva Weapon"], // 初始磁力
    ["bR", "kuvaRadiation", [["bR", 1, 0]], "Kuva Weapon"], // 初始辐射
  ].map(
    v =>
      ({
        id: v[0],
        name: v[1],
        type: BuffType.ElementDamage,
        target: v[3],
        dynamicProps: v[2],
        parms: ["power", "%"],
        defaultValue: 60,
      } as BuffData)
  ),
  // 战甲加成
  ...[
    ["A0", "growingPower", [["t", 25.5]], "Warframe+"], // 成长之力
    ["A1", "powerDonation", [["t", 30]], "Warframe+"], // 献出力量
  ].map(
    v =>
      ({
        id: v[0],
        name: v[1],
        type: BuffType.Team,
        target: v[3],
        defaultLayer: v[4] || 1,
        multiLayer: {
          maxStack: v[4] || 6,
          stackableProps: v[2],
        },
      } as BuffData)
  ),
  {
    id: "rb",
    name: "razorwingBlitz", // 蝶 刀翼闪击
    type: BuffType.Speed,
    target: "Dex Pixia",
    dynamicProps: [["R", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "cb4",
    name: "chromaticBlade4", // Excalibur 华彩刀剑 火
    type: BuffType.Other,
    target: "Exalted Blade",
    props: [["p4", 100]],
    dynamicProps: [["2", 3, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "cb5",
    name: "chromaticBlade5", // Excalibur 华彩刀剑 冰
    type: BuffType.Other,
    target: "Exalted Blade",
    props: [["p5", 100]],
    dynamicProps: [["2", 3, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "cb6",
    name: "chromaticBlade6", // Excalibur 华彩刀剑 毒
    type: BuffType.Other,
    target: "Exalted Blade",
    props: [["p6", 100]],
    dynamicProps: [["2", 3, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "cb7",
    name: "chromaticBlade7", // Excalibur 华彩刀剑 电
    type: BuffType.Other,
    target: "Exalted Blade",
    props: [["p7", 100]],
    dynamicProps: [["2", 3, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "vm",
    name: "vitalityMote", // Wisp 活力尘埃
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["eh", 3, 0], ["hps", 0.3, 0]],
    parms: ["power", "%"],
    defaultValue: 200,
  },
  {
    id: "hm",
    name: "hasteMote", // Wisp 急速尘埃
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["f", 0.2, 0]],
    parms: ["power", "%"],
    defaultValue: 200,
  },
  {
    id: "h",
    name: "hasteMote", // Wisp 急速尘埃
    type: BuffType.Speed,
    target: "Weapon",
    dynamicProps: [["R", 0.3, 0], ["J", 0.2, 0]],
    parms: ["power", "%"],
    defaultValue: 200,
  },
  {
    id: "Q",
    name: "parasiticLink", // 蛆3 寄生链接
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["ovs", 0.25, 0]],
    parms: ["power", "%"],
    defaultValue: 364,
  },
  {
    id: "q",
    name: "provoke", // 激怒 (和平挑衅)
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["t", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 80,
  },
  {
    id: "y",
    name: "commonResistance", // 通用减伤
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["res", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 75,
  },
  {
    id: "X",
    name: "corruption", // 堕落
    type: BuffType.Other,
    target: "Warframe+",
    props: [["ovs", 100], ["ovr", 100]],
  },
  {
    id: "Ab",
    name: "arbitrationsBuff", // 仲裁加成
    type: BuffType.Other,
    target: "Warframe",
    props: [["t", 300]],
  },
  {
    id: "x",
    name: "speed", // 加速 (Volt)
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["f", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },

  // 加法基伤类
  // 死亡之眼光环等
  {
    id: "b",
    name: "baseDamage", // 通用基伤
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "ms",
    name: "multishot", // 通用基伤
    type: BuffType.BaseDamage,
    target: "Gun",
    dynamicProps: [["S", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "B",
    name: "ballisticBattery", // 女枪1 弹道蓄能 (加数值)
    type: BuffType.BaseDamage,
    target: "Gun",
    dynamicProps: [["apd", 16, 0]],
    parms: ["power", "%"],
    defaultValue: 200,
  },
  {
    id: "G",
    name: "shootingGallery", // 女枪2 靶场
    type: BuffType.BaseDamage,
    target: "All",
    dynamicProps: [["dmg", 0.25, 0]],
    parms: ["power", "%"],
    defaultValue: 200,
  },
  {
    id: "A",
    name: "vexArmor", // 龙3 怨怒护甲
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 2.75, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "w4",
    name: "elementalWard4", // 龙2 元素之护 火
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["h", 2, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "w5",
    name: "elementalWard5", // 龙2 元素之护 冰
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["a", 1.5, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "w6",
    name: "elementalWard6", // 龙2 元素之护 毒
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["F", 0.35, 0], ["hr", 0.35, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "w7",
    name: "elementalWard7", // 龙2 元素之护 电
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["s", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "A3",
    name: "vexArmor", // 龙3 怨怒护甲
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["a", 3.5, 0], ["dmg", 2.75, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "A4",
    name: "baseArmor", // 龙3 怨怒护甲
    type: BuffType.Team,
    target: "Warframe+",
    dynamicProps: [["ea", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 60,
  },
  {
    id: "J",
    name: "mallet", // DJ4 强音增幅
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 2, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "d",
    name: "deadEye", // 死亡之眼 Dead Eye
    type: BuffType.BaseDamage,
    target: "Sniper",
    dynamicProps: [["dmg", 52.5, 0]],
    parms: ["mul", "x"],
  },
  {
    id: "m",
    name: "metamorphosis", // 扶她1 昼夜交替
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 0.25, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "v",
    name: "vigorousSwap", // 强力切换 (MOD)
    type: BuffType.BaseDamage,
    target: "Weapon",
    multiLayer: {
      maxStack: 11,
      stackableProps: [["dmg", 15]],
    },
    defaultLayer: 11,
  },
  {
    id: "z",
    name: "strength", // 强度
    type: BuffType.BaseDamage,
    target: "Regulators",
    dynamicProps: [["dmg", 1.5, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  // 乘法总伤类
  {
    id: "Z",
    name: "strength", // 强度
    type: BuffType.TotalDamage,
    target: "Exalted",
    dynamicProps: [["eid", 1, -100]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "c",
    name: "combo", // 连击
    type: BuffType.TotalDamage,
    target: "Sniper",
    dynamicProps: [["oad", 100, -100]],
    parms: ["status", ""],
    defaultValue: 2,
  },
  {
    id: "mc",
    name: "meleeCombo", // 连击
    type: BuffType.TotalDamage,
    target: "Melee",
    dynamicProps: [["red", 1, 0]],
    parms: ["status", ""],
    defaultValue: 25,
  },
  {
    id: "o",
    name: "finalDamage", // 通用终伤
    type: BuffType.TotalDamage,
    target: "Weapon",
    dynamicProps: [["oad", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  {
    id: "R",
    name: "roar", // 牛吼
    type: BuffType.TotalDamage,
    target: "Weapon+",
    dynamicProps: [["aed", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "E",
    name: "eclipse", // 小丑3 黯然失色
    type: BuffType.TotalDamage,
    target: "Weapon",
    dynamicProps: [["oad", 2, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "M",
    name: "voidStrike", // M蹲 虚空重击
    type: BuffType.TotalDamage,
    target: "All",
    dynamicProps: [["oad", 12, 0]],
    parms: ["time", "s"],
    defaultValue: 30,
  },
  {
    id: "U",
    name: "unairu", // UNAIRU 虚灵
    type: BuffType.TotalDamage,
    target: "Amp",
    multiLayer: {
      maxStack: 4,
      stackableProps: [["oad", 25]],
    },
    defaultLayer: 4,
  },
  {
    id: "K",
    name: "block", // 格挡加成
    type: BuffType.TotalDamage,
    target: "Ack & Brunt",
    multiLayer: {
      maxStack: 4,
      stackableProps: [["oad", 17.5]],
    },
    defaultLayer: 4,
  },
  {
    id: "sh",
    name: "shepherd", // 牧羊人
    type: BuffType.Team,
    target: "Companion",
    multiLayer: {
      maxStack: 4,
      stackableProps: [["eh", 300], ["ea", 180]],
    },
    defaultLayer: 1,
  },
  {
    id: "N",
    name: "molecularPrime", // nova4 分子填充
    type: BuffType.TotalDamage,
    target: "All",
    props: [["oad", 100]],
  },
  {
    id: "C",
    name: "conditionOverlord", // 异况超量 次方计算
    type: BuffType.BaseDamage,
    target: "Melee",
    multiLayer: {
      maxStack: 16,
      stackableProps: [["esc", 1]],
    },
    defaultLayer: 2,
  },
  {
    id: "T",
    name: "stealth", // 偷袭
    type: BuffType.TotalDamage,
    target: "Melee",
    dynamicProps: [["ds", 20, 100], ["sd", 20, 100]],
    parms: ["level", ""],
    defaultValue: 30,
  },
  // 附加元素类
  {
    id: "f",
    name: "fireballFrenzy", // 火鸡集团1 狂热火球 火焰伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["4", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "a",
    name: "flashAccelerant", // 火鸡集团2 闪耀助燃 火焰伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["4", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "F",
    name: "freezeForce", // 冰男集团1 寒冰之力 冰冻伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["5", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "S",
    name: "shockTrooper", // 电男集团1 电击奇兵 电击伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["7", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "O",
    name: "smiteInfusion", // 奶爸集团1 惩击洗礼 辐射伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["erd", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "D",
    name: "venomDose", // 毒妈集团1 猛毒附加 腐蚀伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["ecd", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "s",
    name: "toxin", // 米尔的加成
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["etd", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 10,
  },
  // 速度类
  // 电男2 女汉子2 毒龙2
  // Octavia DJ 23
  {
    id: "P",
    name: "speed", // 加速 (Volt)
    type: BuffType.Speed,
    target: "Melee",
    dynamicProps: [["J", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "W",
    name: "warcry", // 咆哮 (Valkyr)
    type: BuffType.Speed,
    target: "Melee",
    dynamicProps: [["J", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 250,
  },
  {
    id: "w",
    name: "elementalWard", // 元素之护 (毒龙)
    type: BuffType.Speed,
    target: "Gun",
    dynamicProps: [["F", 0.35, 0]],
    parms: ["power", "%"],
    defaultValue: 171.4,
  },
  // 暴击类
  {
    id: "t",
    name: "critChance", // 通用暴击
    type: BuffType.CritDamage,
    target: "All",
    dynamicProps: [["i0", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 60,
  },
  {
    id: "I",
    name: "empoweredQuiver", // 弓妹集团1踩线
    type: BuffType.CritDamage,
    target: "All",
    dynamicProps: [["1", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 348,
  },
  {
    id: "H",
    name: "covenant", // 主教4 庇佑圣约
    type: BuffType.CritDamage,
    target: "Weapon",
    props: [["i0", 50], ["cwh", 150]],
  },
  {
    id: "l",
    name: "gladiator", // 角斗士组合效果
    type: BuffType.CritDamage,
    target: "Melee",
    multiLayer: {
      maxStack: 6,
      stackableProps: [["bldr", 10]],
    },
  },
  {
    id: "vi",
    name: "vigilante", // 私法组合效果
    type: BuffType.CritDamage,
    target: "Primary",
    multiLayer: {
      maxStack: 6,
      stackableProps: [["ce", 15]],
    },
  },
  {
    id: "r",
    name: "charm", // 招福
    type: BuffType.CritDamage,
    target: "Weapon",
    props: [["ccl", 200]],
  },
  // 复合类
  {
    id: "V",
    name: "electricShield", // 电盾
    type: BuffType.Other,
    target: "Ranged",
    props: [["fcd", 100]],
    multiLayer: {
      maxStack: 48,
      stackableProps: [["eed", 50]],
    },
    defaultLayer: 6,
  },
  {
    id: "V2",
    name: "energyShell", // 能量护罩
    type: BuffType.Other,
    target: "Ranged",
    props: [["fcd", 100], ["efd", 50]],
  },
  {
    id: "e",
    name: "fireBlast", // 火圈
    type: BuffType.Other,
    target: "Ranged",
    multiLayer: {
      maxStack: 6,
      stackableProps: [["efd", 50]],
    },
  },
  {
    id: "L",
    name: "mutalistQuanta", // 异融量子枪次要
    type: BuffType.Other,
    target: "Ranged",
    props: [["fcd", 25], ["i0", 25], ["oad", -33.3]],
    multiLayer: {
      maxStack: 3,
      unstackableProps: [[["eed", 100]], [["eed", 366.6]], [["eed", 500]]],
    },
    defaultLayer: 3,
  },
];
