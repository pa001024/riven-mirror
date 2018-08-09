/** 伤害类型 */
export enum DamageType {
  /** 冲击 */ Impact = "Impact",
  /** 穿刺 */ Puncture = "Puncture",
  /** 切割 */ Slash = "Slash",
  /** 冰冻 */ Cold = "Cold",
  /** 电击 */ Electricity = "Electricity",
  /** 火焰 */ Heat = "Heat",
  /** 毒素 */ Toxin = "Toxin",
  /** 爆炸 */ Blast = "Blast",
  /** 腐蚀 */ Corrosive = "Corrosive",
  /** 毒气 */ Gas = "Gas",
  /** 磁力 */ Magnetic = "Magnetic",
  /** 辐射 */ Radiation = "Radiation",
  /** 病毒 */ Viral = "Viral",
}

export interface DamageTypeData {
  id: DamageType
  name: string
  type: "Physical" | "Elemental" | "Combined"
  desc: string
  combinedBy?: DamageType[]
}
const _damageTypeDatabase = [
  [DamageType.Impact, "冲击", "Physical", null, "蹒跚"],
  [DamageType.Puncture, "穿刺", "Physical", null, "伤害输出"],
  [DamageType.Slash, "切割", "Physical", null, "流血"],
  [DamageType.Cold, "冰冻", "Elemental", null, "缓速"],
  [DamageType.Electricity, "电击", "Elemental", null, "链式攻击"],
  [DamageType.Heat, "火焰", "Elemental", null, "火焰DoT 恐惧"],
  [DamageType.Toxin, "毒素", "Elemental", null, "生命DoT"],
  [DamageType.Blast, "爆炸", "Combined", "Heat, Cold", "击倒"],
  [DamageType.Corrosive, "腐蚀", "Combined", "Electricity, Toxin", "降低护甲"],
  [DamageType.Gas, "毒气", "Combined", "Heat, Toxin", "毒素AoE"],
  [DamageType.Magnetic, "磁力", "Combined", "Cold, Electricity", "降低最大护盾值"],
  [DamageType.Radiation, "辐射", "Combined", "Heat, Electricity", "降低精度 向队友开火"],
  [DamageType.Viral, "病毒", "Combined", "Cold, Toxin", "降低最大生命值"]
];

/**
 * 伤害类型数据
 */
export const DamageTypeDatabase: DamageTypeData[] = _damageTypeDatabase.map(v => {
  let o = {
    id: v[0].trim(),
    name: v[1].trim(),
    type: v[2].trim(),
    desc: v[4].trim()
  } as any;
  if (v[3]) o.combinedBy = v[3].trim().split(", ");
  return o;
});

export enum FleshType {
  /** 物件 */
  Object = "Object",
  /** 肉体 */
  Flesh = "Flesh",
  /** 复制肉体 */
  ClonedFlesh = "ClonedFlesh",
  /** 化石 */
  Fossilized = "Fossilized",
  /** 感染 */
  Infested = "Infested",
  /** 感染肉体 */
  InfestedFlesh = "InfestedFlesh",
  /** 感染肌腱 */
  InfestedSinew = "InfestedSinew",
  /** 机械 */
  Machinery = "Machinery",
  /** 机器 */
  Robotic = "Robotic",
}

export enum ArmorType {
  /** 护盾 */
  Sheild = "Sheild",
  /** 原型护盾 */
  ProtoSheild = "ProtoSheild",
  /** 铁制装甲 */
  FerriteArmor = "FerriteArmor",
  /** 合金装甲 */
  AlloyArmor = "AlloyArmor",
}

export enum EnemyFaction {
  Tenno = "Tenno",
  Grineer = "Grineer",
  Corpus = "Corpus",
  Infested = "Infested",
  Orokin = "Orokin",
  Sentient = "Sentient",
  Wild = "Wild",
}
export interface EnemyType {

}

const _enemyList = [];

export class Enemy {
  name: string;
  faction: EnemyFaction;
  level: number;
  baseLevel: number;
  baseHealth: number;
  baseSheild: number;
  baseArmor: number;
  // === 计算属性 ===
  /**
   * 当前生命
   * 当前生命 = 基础生命 × ( 1 + ( 当前等级 − 基础等级 )^2 × 0.015 )
   */
  get health() { return this.baseHealth * (1 + (this.level - this.baseLevel) ** 2 * 0.015); }
  /**
   * 当前护盾
   * 当前护盾 = 基础护盾 × ( 1 + ( 当前等级 − 基础等级 )^2 × 0.0075 )
   */
  get sheild() { return this.baseSheild * (1 + (this.level - this.baseLevel) ** 2 * 0.0075); }
  /**
   * 当前护甲
   * 当前护甲 = 基础护甲 × ( 1 + ( 当前等级 − 基础等级 )^1.75 × 0.005 )
   */
  get armor() { return this.baseArmor * (1 + (this.level - this.baseLevel) ** 1.75 * 0.005); }
  constructor({ baseLevel, baseHealth, baseSheild, baseArmor }) {
    [this.baseLevel, this.baseHealth, this.baseSheild, this.baseArmor] = [baseLevel, baseHealth, baseSheild, baseArmor];
  }
}

export class Damage2_0 {
  protected static instance = new Damage2_0();
  static getDamageType(id: DamageType) {
    return this.instance.dtypeDict.get(id);
  }
  private dtypeDict: Map<DamageType, DamageTypeData>;
  constructor() {
    this.dtypeDict = new Map(DamageTypeDatabase.map(v => [v.id, v] as [DamageType, DamageTypeData]));
  }
}
