import { ValuedProperty } from "./prop";
import { ArcaneList } from "./arcane";

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
    target: "Weapon",
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
  // 乘法总伤类
  {
    id: "c",
    name: "combo", // 连击
    type: BuffType.TotalDamage,
    target: "Sniper",
    dynamicProps: [["oad", 100, -1]],
    parms: ["status", ""],
    defaultValue: 2,
  }, {
    id: "o",
    name: "finalDamage", // 通用终伤
    type: BuffType.TotalDamage,
    target: "Weapon",
    dynamicProps: [["oad", 100, 0]],
    parms: ["power", "%"],
  }, {
    id: "R",
    name: "roar", // 牛吼
    type: BuffType.TotalDamage,
    target: "All",
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
    target: "Weapon",
    dynamicProps: [["oad", 12, 0]],
    parms: ["time", "s"],
    defaultValue: 30,
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
      unstackableProps: [
        [["oad", 60]],
        [["oad", 156]],
        [["oad", 309.6]],
        [["oad", 555.36]],
        [["oad", 948.576]],
        [["oad", 1577.7216]],
        [["oad", 2584.35456]],
        [["oad", 4194.967296]],
        [["oad", 6771.947674]],
        [["oad", 10895.11628]],
        [["oad", 17492.18604]],
        [["oad", 28047.49767]],
        [["oad", 44935.99627]],
      ],
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
    target: "Weapon",
    dynamicProps: [["eca", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 0.6,
  }, {
    id: "I",
    name: "empoweredQuiver", // 弓妹集团1踩线
    type: BuffType.CritDamage,
    target: "Weapon",
    dynamicProps: [["1", 100, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "H",
    name: "covenant", // 主教4 庇佑圣约
    type: BuffType.CritDamage,
    target: "Weapon",
    props: [["eca", 50], ["cwh", 150]],
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
