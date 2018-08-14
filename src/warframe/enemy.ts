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
  // ["肉体", "复制肉体", "化石", "感染", "感染肉体", "感染肌腱", "机械", "机器", "物件", "护盾", "原型护盾", "铁制装甲", "合金装甲"],
  dmgMul: number[]
  combinedBy?: DamageType[]
}

const _damageTypeDatabase = [
  [DamageType.Impact, "冲击", "Physical", null, "蹒跚", [-0.25, -0.25, 0, 0, 0, 0, 0.25, 0, 0, 0.5, 0.25, 0, 0]],
  [DamageType.Puncture, "穿刺", "Physical", null, "伤害输出", [0, 0, 0, 0, 0, 0.25, 0, 0.25, 0, -0.25, -0.5, 0.5, 0.25]],
  [DamageType.Slash, "切割", "Physical", null, "流血", [0.25, 0.25, 0.25, 0.25, 0.5, 0, 0, -0.25, 0, 0, 0, -0.25, -0.5]],
  [DamageType.Cold, "冰冻", "Elemental", null, "缓速", [0, 0, -0.25, 0, -0.5, 0.25, 0, 0, 0, 0.5, 0, 0, 0.25]],
  [DamageType.Electricity, "电击", "Elemental", null, "链式攻击", [0, 0, 0, 0, 0, 0, 0.5, 0.5, 0, 0, 0, 0, -0.5]],
  [DamageType.Heat, "火焰", "Elemental", null, "火焰DoT 恐惧", [0, 0.25, 0, 0.25, 0.5, 0, 0, 0, 0, 0, -0.5, 0, 0]],
  [DamageType.Toxin, "毒素", "Elemental", null, "生命DoT", [0.5, 0, -0.5, 0, 0, 0, -0.25, -0.25, 0, NaN, 0.25, 0.25, 0]],
  [DamageType.Blast, "爆炸", "Combined", "Cold+Heat", "击倒", [0, 0, 0.5, 0, 0, -0.5, 0.75, 0, 0, 0, 0, -0.25, 0]],
  [DamageType.Corrosive, "腐蚀", "Combined", "Electricity+Toxin", "降低护甲", [0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, -0.5, 0.75, 0]],
  [DamageType.Gas, "毒气", "Combined", "Heat+Toxin", "毒素AoE", [-0.25, -0.5, 0, 0.75, 0.5, 0, 0, 0, 0, 0, 0, 0, 0]],
  [DamageType.Magnetic, "磁力", "Combined", "Cold+Electricity", "降低最大护盾值", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0.75, 0, -0.5]],
  [DamageType.Radiation, "辐射", "Combined", "Electricity+Heat", "降低精度 向队友开火", [0, 0, -0.75, -0.5, 0, 0.5, 0, 0.25, 0, -0.25, 0, 0, 0.75]],
  [DamageType.Viral, "病毒", "Combined", "Cold+Toxin", "降低最大生命值", [0.5, 0.75, 0, -0.5, 0, 0, -0.25, 0, 0, 0, 0, 0, 0]],
] as [string, string, string, string, string, number[]][];

/**
 * 伤害类型数据
 */
export const DamageTypeDatabase: DamageTypeData[] = _damageTypeDatabase.map(v => {
  let o = {
    id: v[0].trim(),
    name: v[1].trim(),
    type: v[2].trim(),
    desc: v[4].trim(),
    dmgMul: v[5],
  } as DamageTypeData;
  if (v[3]) o.combinedBy = v[3].trim().split("+") as DamageType[];
  return o;
}, {});

/** 复合元素映射表 */
export const CombElementMap: { [key: string]: DamageType } = {
  "Cold+Heat": DamageType.Blast,
  "Electricity+Toxin": DamageType.Corrosive,
  "Heat+Toxin": DamageType.Gas,
  "Cold+Electricity": DamageType.Magnetic,
  "Electricity+Heat": DamageType.Radiation,
  "Cold+Toxin": DamageType.Viral,
};

export enum FleshType {
  /** 肉体 */
  Flesh,
  /** 复制肉体 */
  ClonedFlesh,
  /** 化石 */
  Fossilized,
  /** 感染 */
  Infested,
  /** 感染肉体 */
  InfestedFlesh,
  /** 感染肌腱 */
  InfestedSinew,
  /** 机械 */
  Machinery,
  /** 机器 */
  Robotic,
  /** 物件 */
  Object,
}

export enum SheildType {
  /** 护盾 */
  Sheild,
  /** 原型护盾 */
  ProtoSheild,
}
export enum ArmorType {
  /** 铁制装甲 */
  FerriteArmor,
  /** 合金装甲 */
  AlloyArmor,
}

export enum EnemyFaction {
  Tenno,
  Grineer,
  Corpus,
  Infested,
  Orokin,
  Sentient,
  Wild,
}

export type EnemyType = [string, string, number, number, number, number, number, number, number, number];

const _enemyList = [
  ["Corpus Tech", "Corpus技师", 2, 15, 700, 250, 0, 0, 1, 0],
  ["Toxic Ancient", "远古剧毒者", 3, 1, 400, 0, 0, 2, 0, 0],
  ["Ancient Disrupter", "远古干扰者", 3, 1, 400, 0, 0, 2, 0, 0],
  ["Napalm", "火焰轰击者", 1, 6, 600, 0, 500, 1, 0, 1],
  ["Corrupted Bombard", "堕落轰击者", 4, 4, 300, 0, 500, 1, 0, 1],
  ["Corrupted Heavy Gunner", "堕落重型机枪手", 4, 8, 700, 0, 500, 1, 0, 0],
  ["Corrupted Ancient", "远古堕落者", 4, 1, 400, 0, 0, 2, 0, 0],
] as EnemyType[];

export class Enemy {
  // === 静态属性 ===
  id: string;
  name: string;
  faction: EnemyFaction;
  baseLevel: number;
  baseHealth: number;
  baseSheild: number;
  baseArmor: number;
  fleshType: FleshType;
  sheildType: SheildType;
  armorType: ArmorType;
  // === 动态属性 ===
  private _level: number;
  public get level(): number { return this._level; }
  public set level(value: number) {
    this._level = value;
    this.reset();
  }
  currentHealth: number;
  currentSheild: number;
  currentArmor: number;
  // === 计算属性 ===
  /**
   * 当前等级基础生命
   * 资料: http://warframe.huijiwiki.com/wiki/%E6%95%8C%E6%96%B9%E7%AD%89%E7%BA%A7%E5%8F%98%E5%8C%96%E8%A7%84%E5%BE%8B
   * = 基础生命 × ( 1 + ( 当前等级 − 基础等级 )^2 × 0.015 )
   */
  get health() { return this.baseHealth * (1 + (this.level - this.baseLevel) ** 2 * 0.015); }
  /**
   * 当前等级基础护盾
   * = 基础护盾 × ( 1 + ( 当前等级 − 基础等级 )^2 × 0.0075 )
   */
  get sheild() { return this.baseSheild * (1 + (this.level - this.baseLevel) ** 2 * 0.0075); }
  /**
   * 当前等级基础护甲
   * = 基础护甲 × ( 1 + ( 当前等级 − 基础等级 )^1.75 × 0.005 )
   */
  get armor() { return this.baseArmor * (1 + (this.level - this.baseLevel) ** 1.75 * 0.005); }

  /**
   * 重置当前血量护盾护甲
   */
  reset() {
    this.currentHealth = this.health;
    this.currentSheild = this.sheild;
    this.currentArmor = this.armor;
  }
  /**
   * 创建一个敌人对象
   * @param obj 参数对象
   * @param level 等级
   */
  constructor({ id, name, faction, baseLevel, baseHealth, baseSheild, baseArmor, fleshType, sheildType, armorType }, level: number) {
    [this.id, this.name, this.faction] = [id, name, faction];
    [this.baseLevel, this.baseHealth, this.baseSheild, this.baseArmor] = [baseLevel, baseHealth, baseSheild, baseArmor];
    [this.fleshType, this.sheildType, this.armorType] = [fleshType, sheildType, armorType];
    this.level = level;
  }

  /**
   * 根据克制修正系数计算伤害模型
   * @param dmgs
   */
  mapDamage(dmgs: [string, number][]) {
    if (this.currentSheild > 0) return this.mapDamageSheild(dmgs);
    if (this.currentArmor > 0) return this.mapDamageArmor(dmgs);
    return this.mapDamageHealth(dmgs);
  }
  /**
   * 根据克制修正系数计算血肉伤害模型
   * @param dmgs
   */
  mapDamageHealth(dmgs: [string, number][]) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType(id as DamageType);
      let HM = dtype.dmgMul[this.fleshType];
      let DM = 1 + HM;
      return [id, dmg * DM];
    });
  }
  /**
   * 根据克制修正系数计算护甲伤害模型
   * @param dmgs
   */
  mapDamageArmor(dmgs: [string, number][]) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType(id as DamageType);
      let HM = dtype.dmgMul[this.fleshType];
      let AM = dtype.dmgMul[11 + this.armorType];
      let DM = (1 + HM) * (1 + AM) / (1 + this.armor * (1 - AM) / 300);
      return [id, dmg * DM];
    });
  }
  /**
   * 根据克制修正系数计算护盾伤害模型
   * @param dmgs
   */
  mapDamageSheild(dmgs: [string, number][]) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType(id as DamageType);
      let HM = dtype.dmgMul[this.fleshType];
      let SM = dtype.dmgMul[9 + this.sheildType];
      let AM = dtype.dmgMul[11 + this.armorType];
      // 毒素伤害直接穿透护盾对血量进行打击, 可能同时存在护甲
      let DM = isNaN(SM) ? (1 + HM) * (1 + AM) / (1 + this.armor * (1 - AM) / 300) : 1 + SM;
      return [id, dmg * DM];
    });
  }
}

/**
 * 伤害2.0计算
 * http://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0
 */
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
