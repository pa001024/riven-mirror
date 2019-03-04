import { ValuedProperty } from "./prop";

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
  defaultValue?: number
  defaultLayer?: number
}

export interface MultiLayer {
  /** 最大层数 */
  maxStack: number;
  stackableProps?: [string, number][];
  unstackableProps?: [string, number][][];
}

export enum BuffType {
  Arcane,
  BaseDamage,
  TotalDamage,
  ElementDamage,
  CritDamage,
  Speed,
  Other
}
/**
 * 实体BUFF类
 */
export class Buff {
  data: BuffData;
  layer = 1;
  power = 1;
  constructor(data: BuffData) {
    this.data = data;
    if (data.defaultLayer) this.layer = data.defaultLayer;
    if (data.defaultValue) this.power = data.defaultValue;
  }
  get name() { return this.data.name; }
  get props() {
    let pout = [];
    if (this.data.props) pout = pout.concat(this.data.props);
    if (this.data.dynamicProps) pout = pout.concat(this.data.dynamicProps.map(([n, v, p]) => [n, v * this.power + p]));
    if (this.data.multiLayer && this.data.multiLayer.stackableProps) pout = pout.concat(this.data.multiLayer.stackableProps.map(([n, v]) => [n, v * this.layer]));
    if (this.data.multiLayer && this.data.multiLayer.unstackableProps) pout = pout.concat(this.data.multiLayer.unstackableProps[this.layer - 1]);
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
      let vp = ValuedProperty.parse(prop)
      return {
        id: vp.id,
        fullName: vp.fullString,
        shortName: vp.shortString,
        value: vp.value
      }
    })
  }
  get layerEnable() { return !!this.data.multiLayer; }
  get powerEnable() { return !!this.data.parms; }
}
/**
 * 需求效果:
 * 按需添加常用buff并且结果可以编辑
 */

/** 加成列表 */
export const BuffList: BuffData[] = [
  // 赋能
  ...[
    ["aJ", "arcaneAcceleration", [["R", 60]], "Rifle"],
    ["aK", "arcaneAvenger", [["eca", 30]], "Weapon"],
    ["aL", "arcaneAwakening", [["D", 100]], "Secondary"],
    ["aM", "arcaneFury", [["K", 120]], "Melee"],
    ["aN", "arcaneStrike", [["J", 40]], "Melee"],
    ["aO", "arcaneMomentum", [["F", 100]], "Sniper"],
    ["aP", "arcanePrecision", [["D", 120]], "Secondary"],
    ["aQ", "arcaneRage", [["D", 10]], "Primary"],
    ["aR", "arcaneTempo", [["R", 60]], "Shotgun"],
    ["aS", "arcaneVelocity", [["R", 80]], "Secondary"],
  ].map(v => ({
    id: v[0],
    name: v[1],
    type: BuffType.Arcane,
    target: v[3],
    multiLayer: {
      maxStack: 2,
      stackableProps: v[2],
    },
  } as BuffData)),
  ...[
    ["vA", "virtuosNull", [["erc", 5]], "Amp"],
    ["vB", "virtuosTempo", [["R", 15]], "Amp"],
    ["vC", "virtuosFury", [["D", 7.5]], "Amp"],
    ["vD", "virtuosStrike", [["1", 15]], "Amp"],
    ["vE", "virtuosShadow", [["0", 15]], "Amp"],
    ["vF", "virtuosGhost", [["2", 15]], "Amp"],
    ["vH", "virtuosSurge", [["vte", 25]], "Amp"],
    ["vG", "virtuosTrojan", [["vtv", 25]], "Amp"],
    ["vI", "virtuosSpike", [["vtp", 25]], "Amp"],
    ["vJ", "virtuosForge", [["vth", 25]], "Amp"],
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
  ].map(v => ({
    id: v[0],
    name: v[1],
    type: BuffType.Arcane,
    target: v[3],
    defaultLayer: v[4] || 4,
    multiLayer: {
      maxStack: v[4] || 4,
      stackableProps: v[2],
    },
  } as BuffData)),
  // 加法基伤类
  // 死亡之眼光环等
  {
    id: "b",
    name: "baseDamage",   // 通用基伤
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 100, 0]],
    parms: ["power", "%"],
  }, {
    id: "B",
    name: "ballisticBattery", // 女枪1 弹道蓄能 (加数值)
    type: BuffType.BaseDamage,
    target: "Gun",
    dynamicProps: [["apd", 1600, 0]],
    parms: ["power", "%"],
    defaultValue: 2,
  }, {
    id: "G",
    name: "shootingGallery", // 女枪2 靶场
    type: BuffType.BaseDamage,
    target: "All",
    dynamicProps: [["dmg", 50, 0]],
    parms: ["power", "%"],
    defaultValue: 2,
  }, {
    id: "A",
    name: "vexArmor", // 龙3 怨怒护甲
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 275, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "J",
    name: "mallet", // DJ4 强音增幅
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 200, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "d",
    name: "deadEye", // 死亡之眼 Dead Eye
    type: BuffType.BaseDamage,
    target: "Sniper",
    dynamicProps: [["dmg", 52.5, 0]],
    parms: ["mul", "x"],
  }, {
    id: "m",
    name: "metamorphosis",  // 扶她1 昼夜交替
    type: BuffType.BaseDamage,
    target: "Weapon",
    dynamicProps: [["dmg", 25, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "v",
    name: "vigorousSwap",   // 强力切换 (MOD)
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
    name: "strength",   // 强度
    type: BuffType.BaseDamage,
    target: "Regulators",
    dynamicProps: [["dmg", 1.5, 0]],
    parms: ["power", "%"],
    defaultValue: 100,
  },
  // 乘法总伤类
  {
    id: "Z",
    name: "strength",   // 强度
    type: BuffType.TotalDamage,
    target: "Exalted",
    dynamicProps: [["oad", 1, -100]],
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
  }, {
    id: "o",
    name: "finalDamage", // 通用终伤
    type: BuffType.TotalDamage,
    target: "Weapon",
    dynamicProps: [["oad", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 0.7,
  }, {
    id: "R",
    name: "roar", // 牛吼
    type: BuffType.TotalDamage,
    target: "Weapon",
    dynamicProps: [["aed", 50, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "E",
    name: "eclipse",   // 小丑3 黯然失色
    type: BuffType.TotalDamage,
    target: "Weapon",
    dynamicProps: [["oad", 200, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "M",
    name: "voidStrike", // M蹲 虚空重击
    type: BuffType.TotalDamage,
    target: "All",
    dynamicProps: [["oad", 12, 0]],
    parms: ["time", "s"],
    defaultValue: 30,
  }, {
    id: "U",
    name: "unairu", // UNAIRU 虚灵
    type: BuffType.TotalDamage,
    target: "Amp",
    multiLayer: {
      maxStack: 4,
      stackableProps: [["oad", 25]],
    },
    defaultLayer: 4,
  }, {
    id: "N",
    name: "molecularPrime", // nova4 分子填充
    type: BuffType.TotalDamage,
    target: "All",
    props: [["oad", 100]],
  }, {
    id: "C",
    name: "conditionOverlord", // 异况超量 次方计算
    type: BuffType.TotalDamage,
    target: "Melee",
    multiLayer: {
      maxStack: 13,
      stackableProps: [["esc", 1]],
    },
    defaultLayer: 2,
  }, {
    id: "T",
    name: "stealth", // 偷袭
    type: BuffType.TotalDamage,
    target: "Melee",
    dynamicProps: [["ds", 20, 0], ["sd", 20, 0]],
    parms: ["level", ""],
    defaultValue: 30,
  },
  // 附加元素类
  {
    id: "f",
    name: "fireballFrenzy", // 火鸡集团1 狂热火球 火焰伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["4", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "a",
    name: "flashAccelerant", // 火鸡集团2 闪耀助燃 火焰伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["4", 50, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "F",
    name: "freezeForce", // 冰男集团1 寒冰之力 冰冻伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["5", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "S",
    name: "shockTrooper", // 电男集团1 电击奇兵 电击伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["7", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "O",
    name: "smiteInfusion",   // 奶爸集团1 惩击洗礼 辐射伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["erd", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "D",
    name: "venomDose",   // 毒妈集团1 猛毒附加 腐蚀伤害
    type: BuffType.ElementDamage,
    target: "Weapon",
    dynamicProps: [["ecd", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  },
  // 速度类
  // 电男2 女汉子2 毒龙2
  // Octavia DJ 23
  {
    id: "P",
    name: "speed", // 加速 (Volt)
    type: BuffType.Speed,
    target: "Melee",
    dynamicProps: [["J", 50, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "W",
    name: "warcry", // 咆哮 (Valkyr)
    type: BuffType.Speed,
    target: "Melee",
    dynamicProps: [["J", 50, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "w",
    name: "elementalWard", // 元素之护 (毒龙)
    type: BuffType.Speed,
    target: "Gun",
    dynamicProps: [["F", 35, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  },
  // 暴击类
  {
    id: "t",
    name: "critChance", // 通用暴击
    type: BuffType.CritDamage,
    target: "All",
    dynamicProps: [["eca", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 0.6,
  }, {
    id: "I",
    name: "empoweredQuiver", // 弓妹集团1踩线
    type: BuffType.CritDamage,
    target: "All",
    dynamicProps: [["1", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "H",
    name: "covenant", // 主教4 庇佑圣约
    type: BuffType.CritDamage,
    target: "Weapon",
    props: [["eca", 50], ["cwh", 150]],
  }, {
    id: "l",
    name: "gladiator", // 角斗士组合效果
    type: BuffType.CritDamage,
    target: "Melee",
    multiLayer: {
      maxStack: 6,
      stackableProps: [["bldr", 15]],
    },
  }, {
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
      maxStack: 6,
      stackableProps: [["eed", 50]],
    },
    defaultLayer: 6,
  }, {
    id: "e",
    name: "fireBlast", // 火圈
    type: BuffType.Other,
    target: "Ranged",
    multiLayer: {
      maxStack: 6,
      stackableProps: [["efd", 50]],
    },
  }, {
    id: "L",
    name: "mutalistQuanta", // 异融量子枪次要
    type: BuffType.Other,
    target: "Ranged",
    props: [["fcd", 25], ["eca", 25], ["oad", -33.3]],
    multiLayer: {
      maxStack: 3,
      unstackableProps: [
        [["eed", 100]],
        [["eed", 366.6]],
        [["eed", 500]],
      ],
    },
    defaultLayer: 3,
  },
];
