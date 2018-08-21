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

const _fleshTypeName = [
  "肉体",
  "复制肉体",
  "化石",
  "感染",
  "感染肉体",
  "感染肌腱",
  "机械",
  "机器",
  "物件",
];

export enum SheildType {
  /** 护盾 */
  Sheild,
  /** 原型护盾 */
  ProtoSheild,
}

const _sheildTypeName = [
  "护盾",
  "原型护盾",
];

export enum ArmorType {
  /** 铁制装甲 */
  FerriteArmor,
  /** 合金装甲 */
  AlloyArmor,
}

const _armorType = [
  "铁制装甲",
  "合金装甲",
];

/** 敌人派系 */
export enum EnemyFaction {
  Tenno,
  Grineer,
  Corpus,
  Infested,
  Orokin,
  Sentient,
  Wild,
}

export interface EnemyData {
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
}

const _enemyList = [
  ["Eidolon Teralyst", "夜灵兆力使", 5, 1, 15000, 2500, 200, 7, 0, 1],  // 生成等级: 50 外加75%减伤 关节是总血量1/6
  ["Eidolon Gantulyst", "夜灵巨力使", 5, 1, 15000, 2500, 200, 7, 0, 1], // 生成等级: 55 外加75%减伤 关节是总血量1/6
  ["Eidolon Hydrolyst", "夜灵水力使", 5, 1, 15000, 2500, 200, 7, 0, 1], // 生成等级: 60 外加75%减伤 关节是总血量1/6
  ["MOA", "恐鸟", 2, 1, 60, 150, 0, 7, 0, 0],
  ["Fusion MOA", "熔岩恐鸟", 2, 10, 250, 250, 0, 7, 0, 0],
  ["Anti MOA", "逆进恐鸟", 2, 5, 50, 500, 0, 7, 0, 0],
  ["Shockwave MOA", "震荡恐鸟", 2, 15, 60, 150, 0, 7, 0, 0],
  ["Crewman", "船员", 2, 1, 60, 150, 0, 0, 0, 0],
  ["Comba", "驱逐员", 2, 15, 1100, 400, 0, 0, 0, 0],
  ["Corpus Tech", "Corpus技师", 2, 15, 700, 250, 0, 0, 1, 0],
  ["Toxic Ancient", "远古剧毒者", 3, 1, 400, 0, 0, 2, 0, 0],
  ["Ancient Disrupter", "远古干扰者", 3, 1, 400, 0, 0, 2, 0, 0],
  ["Bombard", "轰击者", 1, 1, 500, 0, 95, 1, 0, 0],
  ["Napalm", "火焰轰击者", 1, 6, 600, 0, 500, 1, 0, 1],
  ["Elite Lancer", "精英枪兵", 1, 15, 150, 0, 200, 1, 0, 1],
  ["Heavy Gunner", "重型机枪手", 1, 8, 300, 0, 500, 1, 0, 0],
  ["Ballista", "弩炮", 1, 1, 100, 0, 100, 1, 0, 0],
  ["Drahk Master", "爪喀驯兽师", 1, 12, 500, 0, 200, 1, 0, 0],
  ["Hyekka Master", "鬣猫驯兽师", 1, 12, 650, 0, 200, 1, 0, 0],
  ["Commander", "指挥官", 1, 3, 300, 0, 500, 1, 0, 1],
  ["Corrupted Bombard", "堕落轰击者", 4, 4, 300, 0, 500, 1, 0, 1],
  ["Corrupted Heavy Gunner", "堕落重型机枪手", 4, 8, 700, 0, 500, 1, 0, 0],
  ["Corrupted Ancient", "远古堕落者", 4, 1, 400, 0, 0, 2, 0, 0],
] as [string, string, number, number, number, number, number, number, number, number][];

/** 敌人列表 */
export const EnemyList = _enemyList.map(v => ({
  id: v[0],
  name: v[1],
  faction: v[2],
  baseLevel: v[3],
  baseHealth: v[4],
  baseSheild: v[5],
  baseArmor: v[6],
  fleshType: v[7],
  sheildType: v[8],
  armorType: v[9],
}));

export class Enemy implements EnemyData {
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
  currentProcs: { [key: string]: number }
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
    this.currentProcs = {};
  }

  /**
   * 创建一个敌人对象
   * @param {EnemyData} obj 参数对象
   * @param level 等级
   */
  constructor({ id, name, faction, baseLevel, baseHealth, baseSheild, baseArmor, fleshType, sheildType, armorType }: EnemyData, level: number) {
    [this.id, this.name, this.faction] = [id, name, faction];
    [this.baseLevel, this.baseHealth, this.baseSheild, this.baseArmor] = [baseLevel, baseHealth, baseSheild, baseArmor];
    [this.fleshType, this.sheildType, this.armorType] = [fleshType, sheildType, armorType];
    this.level = level;
  }

  /**
   * 根据克制修正系数计算伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamage(dmgs: [string, number][]) {
    if (this.currentSheild > 1) return this.mapDamageSheild(dmgs);
    if (this.currentArmor > 1) return this.mapDamageArmor(dmgs);
    return this.mapDamageHealth(dmgs);
  }
  /**
   * 根据克制修正系数计算血肉伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageHealth(dmgs: [string, number][]) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType(id as DamageType);
      let HM = dtype.dmgMul[this.fleshType];
      let DM = 1 + HM;
      return [id, dmg * DM] as [string, number];
    });
  }
  /**
   * 根据克制修正系数计算护甲伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageArmor(dmgs: [string, number][]) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType(id as DamageType);
      let HM = dtype.dmgMul[this.fleshType];
      let AM = dtype.dmgMul[11 + this.armorType];
      let DM = (1 + HM) * (1 + AM) / (1 + this.currentArmor * (1 - AM) / 300);
      return [id, dmg * DM] as [string, number];
    });
  }
  /**
   * 根据克制修正系数计算护盾伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageSheild(dmgs: [string, number][]) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType(id as DamageType);
      let SM = dtype.dmgMul[9 + this.sheildType];
      // 毒素伤害直接穿透护盾对血量进行打击, 不计算对护盾的伤害
      let DM = isNaN(SM) ? 0 : 1 + SM;
      return [id, dmg * DM] as [string, number];
    });
  }
  /**
   * 应用伤害
   *
   * @param {[string, number][]} dmgs
   * @returns
   * @memberof Enemy
   */
  applyDmg(dmgs: [string, number][]) {
    let mapped = this.mapDamage(dmgs);
    let totalDmg = mapped.reduce((a, b) => a + b[1], 0)

    for (let i = 0; i < mapped.length; i++) {
      let [id, dmg] = mapped[i];
      // 毒素穿透护盾
      if (this.currentSheild > 0) {
        if (id === DamageType.Toxin) {
          let dtype = Damage2_0.getDamageType(id as DamageType);
          let HM = dtype.dmgMul[this.fleshType];
          let AM = dtype.dmgMul[11 + this.armorType];
          let DM = (1 + HM) * (1 + AM) / (1 + this.currentArmor * (1 - AM) / 300);
          this.currentHealth -= dmgs[i][1] * DM;
        } else {
          this.currentSheild -= dmg;
        }
      } else {
        this.currentHealth -= dmg;
      }
    }
    // 如果伤害穿透护盾之后还有剩 按剩余比例再计算一次
    if (this.currentSheild < 0) {
      let remaingDmgRate = 1 - this.currentSheild / totalDmg;
      this.currentSheild = 0;
      this.applyDmg(dmgs.map(([id, dmg]) => [id, dmg * remaingDmgRate] as [string, number]));
    }
    return this;
  }
  /**
   * 应用DoT伤害
   *
   * @param {[string, number][]} dmgs
   * @memberof Enemy
   */
  applyDoTDmg(dmgs: [string, number][]) {

  }

  /**
   * 计算单发射击后怪物血量剩余情况(连续)
   *
   * @param {[string, number][]} dmgs 伤害表
   * @param {[string, number][]} procChanceMap 触发几率表(真实触发)
   * @param {[string, number][]} dotDamageMap 触发伤害表(DoT)
   * @param {number} bullets 弹片数
   * @memberof Enemy
   */
  applyHit(dmgs: [string, number][], procChanceMap: [string, number][], dotDamageMap: [string, number][], bullets: number = 1) {
    let procChance = procChanceMap.reduce((a, [id, val]) => a[id] = val, {});
    // [0.每个弹片单独计算]
    let bls = bullets;
    do {
      // [1.直接伤害] 将伤害平分给每个弹片 不满整个的按比例计算
      this.applyDmg(dmgs.map(([vn, vv]) => [vn, vv * (bls >= 1 ? 1 : bls) / bullets] as [string, number]));
      // [2.腐蚀扒皮] 连续计算腐蚀触发
      if (procChance[DamageType.Corrosive] && procChance[DamageType.Corrosive][1] > 0) {
        this.currentArmor *= (0.75 ** procChance[DamageType.Corrosive][1]);
      }
      // [3.病毒少血/磁力少盾]
      if (procChance[DamageType.Magnetic] && procChance[DamageType.Magnetic][1] > 0) {
        this.currentSheild *= (0.25 ** procChance[DamageType.Magnetic][1]);
      }
      if (procChance[DamageType.Viral] && procChance[DamageType.Viral][1] > 0 && this.currentProcs[DamageType.Viral] < 0) {
        // 将病毒触发连续化计算增伤
        let newViral = (this.currentProcs[DamageType.Viral] || 0) + procChance[DamageType.Viral][1];
        this.currentProcs[DamageType.Viral] = newViral > 1 ? 1 : newViral;
      }
      // [4.DoT伤害]
      this.applyDoTDmg(dotDamageMap);
    } while (--bls > 0)
  }
}

/**
 * 伤害2.0计算
 * http://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0
 */
export class Damage2_0 {
  private dtypeDict: Map<DamageType, DamageTypeData>;
  protected static instance = new Damage2_0();
  constructor() {
    this.dtypeDict = new Map(DamageTypeDatabase.map(v => [v.id, v] as [DamageType, DamageTypeData]));
  }

  static getDamageType(id: DamageType) { return this.instance.dtypeDict.get(id); }
  static getFleshTypeName(id: number) { return _fleshTypeName[id]; }
  static getSheildTypeName(id: number) { return _sheildTypeName[id]; }
  static getArmorTypeName(id: number) { return _armorType[id]; }
}
