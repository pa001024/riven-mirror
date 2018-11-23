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
  get layerEnable() { return !!this.data.multiLayer; }
  get powerEnable() { return !!this.data.parms; }
}
/**
 * 需求效果:
 * 按需添加常用buff并且结果可以编辑
 */

/** 加成列表 */
export const BuffList: BuffData[] = [
  // 加法基伤类
  // 死亡之眼光环等
  {
    id: "b",
    name: "baseDamage",   // 通用基伤
    type: BuffType.BaseDamage,
    target: "武器",
    dynamicProps: [["伤害", 1, 0]],
    parms: ["power", "%"],
  }, {
    id: "B",
    name: "ballisticBattery", // 女枪1 弹道蓄能 (加数值)
    type: BuffType.BaseDamage,
    target: "枪",
    dynamicProps: [["伤害数值", 1600, 0]],
    parms: ["power", "%"],
    defaultValue: 2,
  }, {
    id: "G",
    name: "shootingGallery", // 女枪2 靶场
    type: BuffType.BaseDamage,
    target: "武器",
    dynamicProps: [["伤害", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 2,
  }, {
    id: "A",
    name: "vexArmor", // 龙3 怨怒护甲
    type: BuffType.BaseDamage,
    target: "武器",
    dynamicProps: [["伤害", 2.75, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "J",
    name: "mallet", // DJ4 强音增幅
    type: BuffType.BaseDamage,
    target: "武器",
    dynamicProps: [["伤害", 2, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "d",
    name: "deadEye", // 死亡之眼 Dead Eye
    type: BuffType.BaseDamage,
    target: "Sniper",
    dynamicProps: [["伤害", 0.525, 0]],
    parms: ["mul", "x"],
  }, {
    id: "m",
    name: "metamorphosis",  // 扶她1 昼夜交替
    type: BuffType.BaseDamage,
    target: "武器",
    dynamicProps: [["伤害", 0.25, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "v",
    name: "vigorousSwap",   // 强力切换 (MOD)
    type: BuffType.BaseDamage,
    target: "武器",
    multiLayer: {
      maxStack: 11,
      stackableProps: [["伤害", 0.15]],
    },
    defaultLayer: 11,
  },
  // 乘法总伤类
  {
    id: "c",
    name: "combo", // 连击
    type: BuffType.TotalDamage,
    target: "Sniper",
    dynamicProps: [["最终伤害", 1, -1]],
    parms: ["status", ""],
    defaultValue: 2,
  }, {
    id: "o",
    name: "finalDamage", // 通用终伤
    type: BuffType.TotalDamage,
    target: "武器",
    dynamicProps: [["最终伤害", 1, 0]],
    parms: ["power", "%"],
  }, {
    id: "R",
    name: "roar", // 牛吼
    type: BuffType.TotalDamage,
    target: "全域",
    dynamicProps: [["最终伤害", 0.5, 0], ["触发伤害", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "E",
    name: "eclipse",   // 小丑3 黯然失色
    type: BuffType.TotalDamage,
    target: "武器",
    dynamicProps: [["最终伤害", 2, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "M",
    name: "voidStrike", // M蹲 虚空重击
    type: BuffType.TotalDamage,
    target: "武器",
    dynamicProps: [["最终伤害", 0.12, 1]],
    parms: ["time", "s"],
    defaultValue: 30,
  }, {
    id: "N",
    name: "molecularPrime", // nova4 分子填充
    type: BuffType.TotalDamage,
    target: "全域",
    props: [["最终伤害", 1]],
  }, {
    id: "C",
    name: "conditionOverlord", // 异况超量 次方计算
    type: BuffType.TotalDamage,
    target: "Melee",
    multiLayer: {
      maxStack: 13,
      unstackableProps: [
        [["最终伤害", 0.6]],
        [["最终伤害", 1.56]],
        [["最终伤害", 3.096]],
        [["最终伤害", 5.5536]],
        [["最终伤害", 9.48576]],
        [["最终伤害", 15.777216]],
        [["最终伤害", 25.8435456]],
        [["最终伤害", 41.94967296]],
        [["最终伤害", 67.71947674]],
        [["最终伤害", 108.9511628]],
        [["最终伤害", 174.9218604]],
        [["最终伤害", 280.4749767]],
        [["最终伤害", 449.3599627]],
      ],
    },
    defaultLayer: 2,
  }, {
    id: "T",
    name: "stealth", // 偷袭
    type: BuffType.TotalDamage,
    target: "Melee",
    dynamicProps: [["偷袭伤害", 0.2, 1], ["触发伤害", 0.2, 1]],
    parms: ["level", ""],
    defaultValue: 30,
  },
  // 附加元素类
  {
    id: "f",
    name: "fireballFrenzy", // 火鸡集团1 狂热火球 火焰伤害
    type: BuffType.ElementDamage,
    target: "武器",
    dynamicProps: [["4", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "a",
    name: "flashAccelerant", // 火鸡集团2 闪耀助燃 火焰伤害
    type: BuffType.ElementDamage,
    target: "武器",
    dynamicProps: [["4", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "F",
    name: "freezeForce", // 冰男集团1 寒冰之力 冰冻伤害
    type: BuffType.ElementDamage,
    target: "武器",
    dynamicProps: [["5", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "S",
    name: "shockTrooper", // 电男集团1 电击奇兵 电击伤害
    type: BuffType.ElementDamage,
    target: "武器",
    dynamicProps: [["7", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "O",
    name: "smiteInfusion",   // 奶爸集团1 惩击洗礼 辐射伤害
    type: BuffType.ElementDamage,
    target: "武器",
    dynamicProps: [["辐射伤害", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "D",
    name: "venomDose",   // 毒妈集团1 猛毒附加 腐蚀伤害
    type: BuffType.ElementDamage,
    target: "武器",
    dynamicProps: [["腐蚀伤害", 1, 0]],
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
    dynamicProps: [["J", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "W",
    name: "warcry", // 咆哮 (Valkyr)
    type: BuffType.Speed,
    target: "Melee",
    dynamicProps: [["J", 0.5, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "w",
    name: "elementalWard", // 元素之护 (毒龙)
    type: BuffType.Speed,
    target: "Gun",
    dynamicProps: [["F", 0.35, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  },
  // 暴击类
  {
    id: "t",
    name: "critChance", // 通用暴击
    type: BuffType.CritDamage,
    target: "武器",
    dynamicProps: [["加法暴击", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 0.6,
  }, {
    id: "I",
    name: "empoweredQuiver", // 弓妹集团1踩线
    type: BuffType.CritDamage,
    target: "武器",
    dynamicProps: [["1", 1, 0]],
    parms: ["power", "%"],
    defaultValue: 3.48,
  }, {
    id: "H",
    name: "covenant", // 主教4 庇佑圣约
    type: BuffType.CritDamage,
    target: "武器",
    props: [["加法暴击", 0.5], ["爆头暴击", 1.5]],
  },
  // 复合类
  {
    id: "V",
    name: "electricShield", // 电盾
    type: BuffType.Other,
    target: "远程武器",
    props: [["最终暴伤", 1]],
    multiLayer: {
      maxStack: 6,
      stackableProps: [["7", 0.5]],
    },
    defaultLayer: 6,
  }, {
    id: "e",
    name: "fireBlast", // 火圈
    type: BuffType.Other,
    target: "远程武器",
    multiLayer: {
      maxStack: 6,
      stackableProps: [["4", 0.5]],
    },
  }, {
    id: "L",
    name: "mutalistQuanta", // 异融量子枪次要
    type: BuffType.Other,
    target: "远程武器",
    props: [["最终暴伤", 0.25], ["加法暴击", 0.25], ["最终伤害", -0.333]],
    multiLayer: {
      maxStack: 3,
      unstackableProps: [
        [["7", 1]],
        [["7", 3.666]],
        [["7", 5]],
      ],
    },
    defaultLayer: 3,
  },
];
