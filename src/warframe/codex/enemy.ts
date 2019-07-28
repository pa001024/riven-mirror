import _ from "lodash";
import { hAccSum } from "../util";
import { i18n } from "@/i18n";

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
  /** 真实 */ True = "True",
  /** 虚空 */ Void = "Void"
}

export interface DamageTypeData {
  id: DamageType;
  name: string;
  type: "Physical" | "Elemental" | "Combined" | "Standalone";
  desc: string;
  // ["肉体", "复制肉体", "化石", "感染", "感染肉体", "感染肌腱", "机械", "机器", "物件", "护盾", "原型护盾", "铁制装甲", "合金装甲"],
  dmgMul: number[];
  combinedBy?: DamageType[];
}

const _damageTypeDatabase = {
  Impact: ["Physical", null, [-0.25, -0.25, 0, 0, 0, 0, 0.25, 0, 0, 0.5, 0.25, 0, 0]],
  Puncture: ["Physical", null, [0, 0, 0, 0, 0, 0.25, 0, 0.25, 0, -0.2, -0.5, 0.5, 0.15]],
  Slash: ["Physical", null, [0.25, 0.25, 0.15, 0.25, 0.5, 0, 0, -0.25, 0, 0, 0, -0.15, -0.5]],
  Cold: ["Elemental", null, [0, 0, -0.25, 0, -0.5, 0.25, 0, 0, 0, 0.5, 0, 0, 0.25]],
  Electricity: ["Elemental", null, [0, 0, 0, 0, 0, 0, 0.5, 0.5, 0, 0, 0, 0, -0.5]],
  Heat: ["Elemental", null, [0, 0.25, 0, 0.25, 0.5, 0, 0, 0, 0, 0, -0.5, 0, 0]],
  Toxin: ["Elemental", null, [0.5, 0, -0.5, 0, 0, 0, -0.25, -0.25, 0, NaN, NaN, 0.25, 0]],
  Blast: ["Combined", "Cold+Heat", [0, 0, 0.5, 0, 0, -0.5, 0.75, 0, 0, 0, 0, -0.25, 0]],
  Corrosive: ["Combined", "Electricity+Toxin", [0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, -0.5, 0.75, 0]],
  Gas: ["Combined", "Heat+Toxin", [-0.25, -0.5, 0, 0.75, 0.5, 0, 0, 0, 0, 0, 0, 0, 0]],
  Magnetic: ["Combined", "Cold+Electricity", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0.75, 0, -0.5]],
  Radiation: ["Combined", "Electricity+Heat", [0, 0, -0.75, -0.5, 0, 0.5, 0, 0.25, 0, -0.25, 0, 0, 0.75]],
  Viral: ["Combined", "Cold+Toxin", [0.5, 0.75, 0, -0.5, 0, 0, -0.25, 0, 0, 0, 0, 0, 0]],
  Void: ["Standalone", null, [0, -0.5, -0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
} as { [key: string]: [string, string, number[]] };

/**
 * 伤害类型数据
 */
export const DamageTypeDatabase: DamageTypeData[] = Object.keys(_damageTypeDatabase).map(k => {
  let v = _damageTypeDatabase[k];
  let o = {
    id: k,
    type: v[0].trim(),
    dmgMul: v[2]
  } as DamageTypeData;
  if (v[1]) o.combinedBy = v[1].trim().split("+") as DamageType[];
  return o;
}, {});

/** 复合元素映射表 */
export const CombElementMap: { [key: string]: DamageType } = {
  "Cold+Heat": DamageType.Blast,
  "Electricity+Toxin": DamageType.Corrosive,
  "Heat+Toxin": DamageType.Gas,
  "Cold+Electricity": DamageType.Magnetic,
  "Electricity+Heat": DamageType.Radiation,
  "Cold+Toxin": DamageType.Viral
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
  /** 护盾 */
  Shield,
  /** 原型护盾 */
  ProtoShield,
  /** 铁制装甲 */
  FerriteArmor,
  /** 合金装甲 */
  AlloyArmor
}

/** 敌人派系 */
export enum EnemyFaction {
  Tenno,
  Grineer,
  Corpus,
  Infested,
  Orokin,
  Sentient,
  Wild
}

export interface IEnemyData {
  id: string;
  faction: EnemyFaction;
  baseLevel: number;
  baseHealth: number;
  baseShield: number;
  baseArmor: number;
  fleshType: FleshType;
  shieldType: FleshType;
  armorType: FleshType;
  resistence: number;
  ignoreProc: number; // 1免疫DoT 2免疫所有 3为夜灵 影响伤害算法
}
export class EnemyData implements IEnemyData {
  id: string;
  get name() {
    const key = `enemy.names.${_.camelCase(this.id)}`;
    return i18n.te(key) ? i18n.t(key) : this.id;
  }
  faction: EnemyFaction;
  baseLevel: number;
  baseHealth: number;
  baseShield: number;
  baseArmor: number;
  fleshType: FleshType;
  shieldType: FleshType;
  armorType: FleshType;
  resistence: number;
  ignoreProc: number; // 1免疫DoT 2免疫所有 3为夜灵 影响伤害算法
  constructor({ id, faction, baseLevel, baseHealth, baseShield, baseArmor, fleshType, shieldType, armorType, resistence, ignoreProc }: IEnemyData) {
    [this.id, this.faction] = [id, faction];
    [this.baseLevel, this.baseHealth, this.baseShield, this.baseArmor] = [baseLevel, baseHealth, baseShield, baseArmor];
    [this.fleshType, this.shieldType, this.armorType] = [fleshType, shieldType, armorType];
    this.resistence = resistence;
    this.ignoreProc = ignoreProc;
  }
}

/** 敌人列表 [id, faction, baseLevel, baseHealth, baseShield, baseArmor, fleshType, shieldType, armorType, resistence, ignoreProc] */
const _enemyList = [
  ["Wolf of Saturn Six", 5, , 20000, , 2500, 12, , 1, , 2],
  ["Eidolon Teralyst", 5, , 15000, , 200, 7, , 1, 0.6, 3],
  ["Eidolon Gantulyst", 5, , 15000, , 200, 7, , 1, 0.6, 3],
  ["Eidolon Hydrolyst", 5, , 15000, , 200, 7, , 1, 0.6, 3],
  ["Teralyst Synovia", 5, , 2500, , 200, 7, , 1, 0.6, 3],
  ["Profit-Taker Orb", 2, 50, 7000, 30000, 150, 7, , 1, , 1],
  ["Condor Dropship", 2, , 1000, , 100, 7, , , , 1],
  ["Tusk Firbolg", 1, , 8000, , 600, 7, , 1, , 1],
  ["Tusk Bolkor", 1, , 10000, , 600, 7, , 1, , 1],
  ["Bailiff", 1, , 600, , 500, 1],
  ["Butcher", 1, , 50, , 5, 1],
  ["Flameblade", 1, , 50, , 5, 1],
  ["Fire Prosecutor", 1, , 1500, , 5, 1],
  ["Powerfist", 1, , 100, , 5, 1],
  ["Scorpion", 1, , 150, , 150, 1],
  ["Shield Lancer", 1, , 100, , 5, 1],
  ["Ballista", 1, , 100, , 100, 1],
  ["Eviscerator", 1, , 150, , 200, 1],
  ["Hellion", 1, , 100, , 100, 1],
  ["Lancer", 1, , 100, , 100, 1],
  ["Elite Lancer", 1, 15, 150, , 200, 1, , 1],
  ["Scorch", 1, 1, 120, , 100, 1],
  ["Seeker", 1, 1, 100, , 200, 1],
  ["Trooper", 1, 1, 120, , 150, 1],
  ["Bombard", 1, 1, 300, , 500, 1, , 1],
  ["Commander", 1, 3, 500, , 95, 1, , 1],
  ["Drahk Master", 1, 12, 500, , 200, 1],
  ["Heavy Gunner", 1, 8, 300, , 500, 1],
  ["Hyekka Master", 1, 12, 650, , 200, 1],
  ["Manic", 1, 1, 350, , 25, 1],
  ["Napalm", 1, 6, 600, , 500, 1, , 1],
  ["Nox", 1, 1, 250, , 350, 1, , 1, 0.9],
  ["Ghoul Auger", 1, 1, 400, , 200, 1],
  ["Ghoul Devourer", 1, 1, 600, , 250, 1],
  ["Ghoul Expired", 1, 1, 300, , 150, 1],
  ["Ghoul Rictus", 1, 1, 400, , 200, 1],
  ["Grineer Warden", 1, 1, 600, , 500, 1],
  ["Sensor Regulator", 1, 1, 100, , 300, 6],
  ["Human of Anyo Corp", 2, 1, 150, 100, 200, , , 1],
  ["Robotic of Anyo Corp", 2, 1, 150, 100, 200, 7, , 1],
  ["Crewman", 2, 1, 60, 150],
  ["Detron Crewman", 2, 1, 60, 150],
  ["Elite Crewman", 2, 15, 100, 200],
  ["Nullifier Crewman", 2, 1, 60, 150, , , 1],
  ["Prod Crewman", 2, 1, 100, 50],
  ["Sniper Crewman", 2, 15, 60, 150, , , 1],
  ["Corpus Tech", 2, 15, 700, 250, , , 1],
  ["Comba", 2, 15, 1100, 400],
  ["Scrambus", 2, 15, 1100, 400],
  ["Denial Bursa", 2, 1, 1200, 700, 200, 7, , 1],
  ["Drover Bursa", 2, 1, 1200, 700, 200, 7, , 1],
  ["Isolator Bursa", 2, 1, 1200, 700, 200, 7, , 1],
  ["MOA", 2, 1, 60, 150, , 7],
  ["Anti MOA", 2, 5, 50, 500, , 7],
  ["Fusion MOA", 2, 10, 250, 250, , 7],
  ["Railgun MOA", 2, 1, 60, 150, , 7],
  ["Shockwave MOA", 2, 15, 60, 150, , 7],
  ["Drone", 2, 1, 250, 75, , 7],
  ["Leech Osprey", 2, 1, 100, 50, , 7],
  ["Lynx Osprey", 2, 1, 35, 50, , 7],
  ["Mine Osprey", 2, 10, 100, 50, , 7],
  ["Oxium Osprey", 2, 1, 750, 150, 40, 7],
  ["Scavanger Osprey", 2, 1, 100, 50, , 7],
  ["Sapping Osprey", 2, 1, 200, 50, , 7],
  ["Shield Osprey", 2, 1, 35, 50, , 7],
  ["Charger", 3, 1, 80, , , 3],
  ["Leaper", 3, 1, 100, , , 3],
  ["Runner", 3, 1, 100, , , 3],
  ["Volatile Runner", 3, 1, 80, , , 3],
  ["Crawler", 3, 1, 50, , , 4],
  ["Electric Crawler", 3, 1, 50, , , 4],
  ["Lobber Crawler", 3, 1, 50, , , 4],
  ["Nauseous Crawler", 3, 1, 50, , , 4],
  ["Toxic Crawler", 3, 1, 50, , , 4],
  ["Mutalist Osprey", 3, 1, 200, , , 4],
  ["Swarm Mutalist MOA", 3, 12, 350, , , 2],
  ["Tar-Mutalist MOA", 3, 12, 350, , , 2],
  ["Ancient Disrupter", 3, 1, 400, , , 2],
  ["Ancient Healer", 3, 1, 400, , , 2],
  ["Boiler", 3, 12, 1200, , , 2],
  ["Brood Mother", 3, 12, 700, , , 2],
  ["Toxic Ancient", 3, 1, 400, , , 2],
  // ["Hemocyte", 3, 1, 2200, , 175, 2, , , , 3],
  ["Corrupted Ancient", 4, 1, 400, , , 2],
  ["Corrupted Butcher", 4, 1, 100, , 5, 1],
  ["Corrupted Bombard", 4, 4, 300, , 500, 1, , 1],
  ["Corrupted Heavy Gunner", 4, 8, 700, , 500, 1],
  ["Corrupted Lancer", 4, 1, 60, , 200, 1, , 1],
  ["Orokin Drone", 4, 1, 35, 50, , 7],
  ["Corrupted Crewman", 4, 1, 60, 150],
  ["Corrupted MOA", 4, 1, 250, 250, , 7],
  ["Corrupted Nullifier", 4, 15, 60, 150, , , 1]
] as [string, number, number, number, number, number, number, number, number, number, number][];

/** 敌人列表 */
export const EnemyList = _enemyList.map(
  v =>
    new EnemyData({
      id: v[0],
      faction: v[1],
      baseLevel: v[2] || 1,
      baseHealth: v[3] || 0,
      baseShield: v[4] || 0,
      baseArmor: v[5] || 0,
      fleshType: v[6] || 0,
      shieldType: (v[7] || 0) + 9,
      armorType: (v[8] || 0) + 11,
      resistence: v[9] || 0,
      ignoreProc: v[10] || 0
    })
);

/** 伤害模型序列 [id, faction, flesh, shield, armor, resistence, ignoreProc] */
type DamageModelDataArray = [string, number, number, number, number, number, number];

const _damageModelList = [
  // 伤害模型列表
  ["Eidolon", 5, 6, , 1, 0.6, 3],
  ["Eidolon Unarmored", 5, 6, , , 0.6, 3],
  ["Eidolon Shield", 5, 10, , , 0.6, 4],
  ["Orb", 5, 6, , 1, 0, 2],
  ["Grineer", 1, 1, , 0, 0, 0],
  ["Grineer Unarmored", 1, 1, , , 0, 0],
  ["Grineer Elite", 1, 1, , 1, 0, 0],
  ["Corpus", 2, 0, , , 0, 0],
  ["Corpus Robotic", 2, 1, , , 0, 0],
  ["Corpus Shield", 2, , 0, , 0, 0],
  ["Corpus Elite", 2, 0, , 1, 0, 0],
  ["Corpus Elite Shield", 2, , 1, , 0, 0],
  ["Infested", 3, 3, , , 0, 0],
  ["Infested Flesh", 3, 4, , , 0, 0],
  ["Infested Elite", 3, 2, , , 0, 0],
  ["Tenno", 0, 0, , 0, 0, 0]
] as DamageModelDataArray[];

export interface IDamageModelData {
  /** 模型ID */
  id: string;
  /** 模型本地化名称 */
  name: string;
  /** 派系 */
  faction?: EnemyFaction;
  /** 血肉类型 */
  fleshType?: FleshType;
  /** 护盾类型 */
  shieldType?: FleshType;
  /** 护甲模型 */
  armorType?: FleshType;
  /** 伤害抗性 */
  resistence?: number;
  /** 计算模式 夜灵=3 */
  ignoreProc?: number;
}

/** 伤害模型数据 */
export class DamageModelData implements IDamageModelData {
  id: string;
  get name() {
    const key = `enemy.models.${_.camelCase(this.id)}`;
    return i18n.te(key) ? i18n.t(key) : this.id;
  }
  faction?: EnemyFaction;
  fleshType?: FleshType;
  shieldType?: FleshType;
  armorType?: FleshType;
  resistence?: number;
  ignoreProc?: number;
  constructor(data: IDamageModelData | DamageModelDataArray) {
    if (Array.isArray(data)) {
      const [id, faction, fleshType, shieldType, armorType, resistence, ignoreProc] = data;
      this.id = id;
      this.faction = faction;
      this.fleshType = fleshType || 0;
      if (typeof shieldType === "number") this.shieldType = shieldType + 9;
      if (typeof armorType === "number") this.armorType = armorType + 11;
      this.resistence = resistence;
      this.ignoreProc = ignoreProc;
    } else {
      const { id, faction, fleshType, shieldType, armorType, resistence, ignoreProc } = data;
      this.id = id;
      this.faction = faction;
      this.fleshType = fleshType || 0;
      this.shieldType = shieldType;
      this.armorType = armorType;
      this.resistence = resistence;
      this.ignoreProc = ignoreProc;
    }
  }
}

export const DamageModelList = _damageModelList.map(v => new DamageModelData(v));

/** 简单伤害模型 */
export class SimpleDamageModel extends DamageModelData {
  currentArmor: number = 0;
  constructor(data: DamageModelData, currentArmor: number) {
    super(data);
    this.currentArmor = currentArmor;
  }

  /**
   * 根据克制修正系数计算伤害模型
   *
   * @param {[string, number][]} dmgs
   * @param critChance 暴击几率
   * @param threshold 阈值
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamage(dmgs: [string, number][], critChance: number = 0, threshold = 300) {
    if (this.ignoreProc > 3) return this.mapEidolonDmg(dmgs.filter(v => v[0] === "Void"), critChance, threshold > 300 ? 300 : threshold);
    if (this.ignoreProc > 2) return this.mapEidolonDmg(dmgs, critChance, threshold > 300 ? 300 : threshold);
    else return this.mapDamageNormal(dmgs);
  }

  /**
   * 根据克制修正系数计算触发伤害模型
   *
   * @param {[string, number][]} dmgs
   * @param critChance 暴击几率
   * @param threshold 阈值
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapProcDamage(dmgs: [string, number][]) {
    if (this.ignoreProc > 1) return dmgs.map(([vn, vv]) => [vn, 0] as [string, number]);
    else return this.mapDamageNormal(dmgs, true);
  }

  /**
   * 根据克制修正系数计算伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageNormal(dmgs: [string, number][], dot = false) {
    if (typeof this.shieldType === "number") return this.mapDamageShield(dmgs, dot);
    if (typeof this.armorType === "number") return this.mapDamageArmor(dmgs, dot);
    if (typeof this.fleshType === "number") return this.mapDamageHealth(dmgs, dot);
    return dmgs;
  }

  /**
   * 根据克制修正系数计算护盾伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageShield(dmgs: [string, number][], dot = false) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType((dot && id === "Gas" ? "Toxin" : id) as DamageType);
      if (!dtype) return [id, dmg];
      let SM = dtype.dmgMul[this.shieldType];
      // 毒素伤害直接穿透护盾对血量进行打击, 不计算对护盾的伤害
      let DM = isNaN(SM) ? 0 : 1 + SM;
      return [id, dmg * DM * (1 - this.resistence)];
    }) as [string, number][];
  }

  /**
   * 根据克制修正系数计算护甲伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageArmor(dmgs: [string, number][], dot = false) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType((dot && id === "Gas" ? "Toxin" : id) as DamageType);
      if (!dtype) return [id, dmg];
      let HM = dtype.dmgMul[this.fleshType];
      let AM = dtype.dmgMul[this.armorType];
      let DM = ((1 + HM) * (1 + AM)) / (1 + (this.currentArmor * (1 - AM)) / 300);
      return [id, dmg * DM * (1 - this.resistence)];
    }) as [string, number][];
  }

  /**
   * 根据克制修正系数计算血肉伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageHealth(dmgs: [string, number][], dot = false) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType((dot && id === "Gas" ? "Toxin" : id) as DamageType);
      if (!dtype) return [id, dmg];
      let HM = dtype.dmgMul[this.fleshType];
      let DM = 1 + HM;
      return [id, dmg * DM * (1 - this.resistence)];
    }) as [string, number][];
  }

  /**
   * 应用伤害(夜灵)
   *
   * @param {[string, number][]} dmgs 伤害表
   * @param critChance 暴击率
   * @param threshold 阈值
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapEidolonDmg(dmgs: [string, number][], critChance: number, threshold = 300) {
    let mapped = this.mapDamageNormal(dmgs);
    let totalDmg = mapped.reduce((a, b) => a + b[1], 0);

    let eidolonCritDmg = totalDmg + totalDmg * (critChance > 1 ? 1 : critChance);
    // 目标夜灵 无视护盾
    let eidolonDmg = eidolonCritDmg > threshold ? threshold + eidolonCritDmg / 10 : eidolonCritDmg;
    return mapped.map(([vn, vv]) => [vn, (vv / totalDmg) * eidolonDmg] as [string, number]);
  }
}
export class Procs {
  // [伤害, 剩余时间]
  Slash: [number, number][] = [];
  Heat: [number, number] = null;
  Toxin: [number, number][] = [];
  Viral: number = 0;

  /**
   * 加入触发伤害
   *
   * @param {DamageType} dtype 伤害类型
   * @param {number} dmg 伤害值
   * @param {number} durationMul 持续时间倍率
   * @memberof Procs
   */
  push(dtype: DamageType, dmg: number, durationMul: number) {
    switch (dtype) {
      // 切割伤害: https://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0/%E5%88%87%E5%89%B2%E4%BC%A4%E5%AE%B3
      case "Slash":
        this.Slash.push([dmg, ~~(6 * durationMul)]);
        break;
      // 毒素伤害: https://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0/%E6%AF%92%E7%B4%A0%E4%BC%A4%E5%AE%B3
      case "Toxin":
      case "Gas":
        this.Toxin.push([dmg, ~~(8 * durationMul)]);
        break;
      // 火焰伤害: https://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0/%E7%81%AB%E7%84%B0%E4%BC%A4%E5%AE%B3
      // 注:火焰触发不会叠加
      case "Heat":
        if (!this.Heat) this.Heat = [dmg, ~~(8 * durationMul)];
        break;
    }
  }

  /**
   * 结算触发伤害
   *
   * @param {number} procDamageMul 触发伤害加成
   * @returns {[DamageType, number][]}
   * @memberof Procs
   */
  pop(procDamageMul: number): [DamageType, number][] {
    // 求和 然后去掉持续时间到0的
    let totalSlash = this.Slash.reduce((a, b) => a + b[0], 0);
    this.Slash = this.Slash.filter(v => --v[1] > 0) as [number, number][];
    let totalToxin = this.Toxin.reduce((a, b) => a + b[0], 0);
    this.Toxin = this.Toxin.filter(v => --v[1] > 0) as [number, number][];
    let totalHeat = this.Heat ? this.Heat[0] : 0;
    if (this.Heat && this.Heat[1] <= 1) this.Heat = null;
    let dmgs = [];
    if (totalSlash > 0) dmgs.push([DamageType.True, procDamageMul * totalSlash]);
    if (totalToxin > 0) dmgs.push([DamageType.Toxin, procDamageMul * totalToxin]);
    if (totalHeat > 0) dmgs.push([DamageType.Heat, procDamageMul * totalHeat]);
    return dmgs;
  }
}

export interface EnemyTimelineState {
  ms: number;
  ammo: number;
  health: number;
  shield: number;
  armor: number;
  isDoT: boolean;
}

export class Enemy extends EnemyData {
  // === 静态属性 ===
  get factionName() {
    return EnemyFaction[this.faction];
  }
  get fleshTypeId() {
    return FleshType[this.fleshType];
  }
  get shieldTypeId() {
    return FleshType[this.shieldType];
  }
  get armorTypeId() {
    return FleshType[this.armorType];
  }
  get fleshTypeName() {
    return i18n.t("enemy.fleshType")[this.fleshType];
  }
  get shieldTypeName() {
    return i18n.t("enemy.shieldType")[this.shieldType];
  }
  get armorTypeName() {
    return i18n.t("enemy.armorType")[this.armorType];
  }
  get resistenceText() {
    return this.resistence && (this.resistence * 100).toFixed() + "%";
  }
  // === 动态属性 ===
  private _level: number;
  public get level(): number {
    return this._level;
  }
  public set level(value: number) {
    this._level = value;
    this.reset();
  }
  currentHealth: number = 0;
  currentShield: number = 0;
  currentArmor: number = 0;
  currentProcs: Procs;
  amrorReduce: number = 0;

  // === 计算属性 ===
  /**
   * 当前等级基础生命
   * 资料: http: //warframe.huijiwiki.com/wiki/%E6%95%8C%E6%96%B9%E7%AD%89%E7%BA%A7%E5%8F%98%E5%8C%96%E8%A7%84%E5%BE%8B
   * = 基础生命 × ( 1 + ( 当前等级 − 基础等级 )^2 × 0.015 )
   */
  get health() {
    return this.baseHealth * (1 + (this.level - this.baseLevel) ** 2 * 0.015);
  }
  /**
   * 当前等级基础护盾
   * = 基础护盾 × ( 1 + ( 当前等级 − 基础等级 )^2 × 0.0075 )
   */
  get shield() {
    return this.baseShield * (1 + (this.level - this.baseLevel) ** 2 * 0.0075);
  }
  /**
   * 当前等级基础护甲
   * = 基础护甲 × ( 1 + ( 当前等级 − 基础等级 )^1.75 × 0.005 )
   */
  get armor() {
    return this.baseArmor * (1 + (this.level - this.baseLevel) ** 1.75 * 0.005);
  }

  /**
   * 重置当前血量护盾护甲
   */
  reset() {
    this.currentHealth = this.health;
    this.currentShield = this.shield;
    this.currentArmor = this.armor * (this.amrorReduce > 1 ? 0 : 1 - this.amrorReduce);
    this.currentProcs = new Procs();
    this.stateHistory = [];
    this.tickCount = 0;
    this.pushState(false);
  }

  /**
   * 创建一个敌人对象
   * @param {EnemyData} obj 参数对象
   * @param level 等级
   */
  constructor(data: IEnemyData, level: number) {
    super(data);
    this.level = level;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      faction: this.faction,
      baseLevel: this.baseLevel,
      baseHealth: this.baseHealth,
      baseShield: this.baseShield,
      baseArmor: this.baseArmor,
      fleshType: this.fleshType,
      shieldType: this.shieldType,
      armorType: this.armorType,
      resistence: this.resistence,
      ignoreProc: this.ignoreProc
    };
  }
  /**
   * 根据克制修正系数计算伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamage(dmgs: [string, number][]) {
    if (this.currentShield > 1) return this.mapDamageShield(dmgs);
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
      if (!dtype) return [id, dmg];
      let HM = dtype.dmgMul[this.fleshType];
      let DM = 1 + HM;
      return [id, dmg * DM * (1 - this.resistence)];
    }) as [string, number][];
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
      if (!dtype) return [id, dmg];
      let HM = dtype.dmgMul[this.fleshType];
      let AM = dtype.dmgMul[this.armorType];
      let DM = ((1 + HM) * (1 + AM)) / (1 + (this.currentArmor * (1 - AM)) / 300);
      return [id, dmg * DM * (1 - this.resistence)];
    }) as [string, number][];
  }
  /**
   * 根据克制修正系数计算护盾伤害模型
   *
   * @param {[string, number][]} dmgs
   * @returns 映射后的伤害数值
   * @memberof Enemy
   */
  mapDamageShield(dmgs: [string, number][]) {
    return dmgs.map(([id, dmg]) => {
      let dtype = Damage2_0.getDamageType(id as DamageType);
      if (!dtype) return [id, dmg];
      let SM = dtype.dmgMul[this.shieldType];
      // 毒素伤害直接穿透护盾对血量进行打击, 不计算对护盾的伤害
      let DM = isNaN(SM) ? 0 : 1 + SM;
      return [id, dmg * DM * (1 - this.resistence)];
    }) as [string, number][];
  }
  /**
   * 应用伤害
   *
   * @param {[string, number][]} dmgs 伤害表
   * @returns
   * @memberof Enemy
   */
  applyDmg(dmgs: [string, number][]) {
    let mapped = this.mapDamage(dmgs);
    let totalDmg = mapped.reduce((a, b) => a + b[1], 0);

    for (let i = 0; i < mapped.length; i++) {
      let [id, dmg] = mapped[i];
      // 真实伤害
      if (id === DamageType.True) {
        this.currentHealth -= dmg;
      } else {
        // 毒素穿透护盾
        if (this.currentShield > 0) {
          if (id === DamageType.Toxin) {
            let dtype = Damage2_0.getDamageType(id as DamageType);
            let HM = dtype.dmgMul[this.fleshType];
            let AM = dtype.dmgMul[this.armorType];
            let DM = ((1 + HM) * (1 + AM)) / (1 + (this.currentArmor * (1 - AM)) / 300);
            this.currentHealth -= dmgs[i][1] * DM;
          } else {
            this.currentShield -= dmg;
          }
        } else {
          this.currentHealth -= dmg;
        }
      }
    }
    // 如果伤害穿透护盾之后还有剩 按剩余比例再计算一次
    if (this.currentShield < 0) {
      let remaingDmgRate = 1 - this.currentShield / totalDmg;
      this.currentShield = 0;
      this.applyDmg(dmgs.map(([id, dmg]) => [id, dmg * remaingDmgRate] as [string, number]));
    }
    return this;
  }
  /**
   * 应用伤害(夜灵)
   *
   * @param {[string, number][]} dmgs 伤害表
   * @param {number} critChance 暴击率
   * @param {number} [threshold=300] 阈值
   * @memberof Enemy
   */
  applyEidolonDmg(dmgs: [string, number][], critChance: number, threshold = 300) {
    let mapped = this.mapDamage(dmgs);
    let totalDmg = mapped.reduce((a, b) => a + b[1], 0);

    let eidolonCritDmg = totalDmg + totalDmg * (critChance > 1 ? 1 : critChance);
    // 目标夜灵 无视护盾
    let eidolonDmg = eidolonCritDmg > threshold ? threshold + eidolonCritDmg / 10 : eidolonCritDmg;
    this.currentHealth -= eidolonDmg;
    return this;
  }
  /**
   * 应用DoT伤害
   *
   * @param {[string, number][]} dmgs DoT单跳伤害列表
   * @param {number} durationMul DoT伤害
   * @memberof Enemy
   */
  applyDoTDmg(dmgs: [string, number][], durationMul: number = 1, procDamageMul: number = 1) {
    let immediateDamages = dmgs.map(([vn, vv]) => {
      switch (vn) {
        // 切割伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Slash_Damage
        case "Slash":
          this.currentProcs.push(DamageType.Slash, vv * procDamageMul, durationMul);
          return [DamageType.True, vv];
        // 毒素伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Toxin_Damage
        case "Toxin":
          this.currentProcs.push(DamageType.Toxin, vv * procDamageMul, durationMul);
          return [DamageType.Toxin, vv];
        // 毒气伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Gas_Damage
        case "Gas":
          this.currentProcs.push(DamageType.Toxin, vv * procDamageMul * procDamageMul, durationMul);
          return [DamageType.Toxin, vv];
        // 火焰伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Heat_Damage
        // 注:火焰触发不会叠加
        case "Heat":
          this.currentProcs.push(DamageType.Heat, vv * procDamageMul, durationMul);
          return [DamageType.Heat, vv];
        // 电击伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Electricity_Damage
        case "Electricity":
          this.currentProcs.push(DamageType.Electricity, vv * procDamageMul, durationMul);
          return [DamageType.Electricity, vv];
      }
    }) as [DamageType, number][];
    return this.applyDmg(immediateDamages);
  }

  /**
   * 计算单发射击后怪物血量剩余情况(连续)
   *
   * @param {[string, number][]} dmgs 伤害表
   * @param {[string, number][]} procChanceMap 触发几率表(真实触发)
   * @param {[string, number][]} dotDamageMap 触发伤害表(DoT)
   * @param {number} [pellets=1] 弹片数
   * @param {number} [durationMul=1]
   * @param {number} [durationMul=1]
   * @param {number} [critChance=0]
   * @param {number} [threshold=300]
   * @param {number} [procDamageMul=1]
   * @param {number} [ammo=1]
   * @memberof Enemy
   */
  applyHit(
    dmgs: [string, number][],
    procChanceMap: [string, number][],
    dotDamageMap: [string, number][],
    pellets = 1,
    durationMul = 1,
    critChance = 0,
    threshold = 300,
    procDamageMul = 1,
    ammo = 1
  ) {
    let procChance = procChanceMap.reduce((a, [id, val]) => ((a[id] = val), a), {});
    // [0.每个弹片单独计算]
    let bls = pellets;
    while (bls > 0) {
      // [0.将伤害平分给每个弹片 不满整个的按比例计算]
      let bh = bls >= 1 ? 1 : bls;
      // 夜灵算法 https://warframe.huijiwiki.com/wiki/%E5%8D%9A%E5%AE%A2:%E5%A4%9C%E7%81%B5%E5%85%86%E5%8A%9B%E4%BD%BF%E4%BC%A4%E5%AE%B3%E6%9C%BA%E5%88%B6
      if (this.ignoreProc > 2) {
        this.applyEidolonDmg(dmgs.map(([vn, vv]) => [vn, (vv * bh) / pellets] as [string, number]), critChance, threshold * this.resistence * bh); // 不足一个的乘以阈值
      } else if (this.ignoreProc === 2) {
        this.applyDmg(dmgs.map(([vn, vv]) => [vn, (vv * bh) / pellets] as [string, number]));
      } else {
        // [1.按当前病毒触发比例减少血上限]
        let currentViral = this.currentProcs.Viral;
        this.currentHealth *= 1 - 0.5 * currentViral;
        // [2.直接伤害]
        this.applyDmg(dmgs.map(([vn, vv]) => [vn, (vv * bh) / pellets] as [string, number]));
        // [3.腐蚀扒皮] 计算腐蚀触发(连续)
        if (procChance[DamageType.Corrosive] > 0) {
          this.currentArmor *= 0.75 ** (procChance[DamageType.Corrosive] * bh);
        }
        // [4.1.磁力少盾]
        if (procChance[DamageType.Magnetic] > 0) {
          this.currentShield *= 0.25 ** (procChance[DamageType.Magnetic] * bh);
        }
        // [4.2.病毒少血]
        if (procChance[DamageType.Viral] > 0 && this.currentProcs.Viral < 1) {
          // 将病毒触发连续化计算增伤
          let newViral = currentViral + procChance[DamageType.Viral] * bh;
          this.currentProcs.Viral = newViral > 1 ? 1 : newViral;
        }
        // [5.DoT伤害]
        if (this.ignoreProc === 0) this.applyDoTDmg(dotDamageMap.map(([vn, vv]) => [vn, (vv * bh) / pellets] as [string, number]), durationMul, procDamageMul);
        // [6.将病毒下降的血量恢复]
        this.currentHealth /= 1 - 0.5 * currentViral;
      }
      bls = hAccSum(bls, -1);
    }
    this.pushState(false, ammo);
  }

  // === 时间线系统 ===

  TICKCYCLE = 60;
  tickCount = 0;
  stateHistory: EnemyTimelineState[] = [];
  /**
   * 将DoT计时器进入下一秒
   */
  nextSecond(procDamageMul: number) {
    let dotDmgs = this.currentProcs.pop(procDamageMul);
    this.applyDmg(dotDmgs);
    this.pushState(true);
  }
  /**
   * 记录历史信息
   *
   * @memberof Enemy
   */
  pushState(isDoT = false, ammo = 0) {
    this.stateHistory.push({
      ms: Math.ceil((this.tickCount * 1e3) / this.TICKCYCLE),
      ammo,
      health: this.currentHealth,
      shield: this.currentShield,
      armor: this.currentArmor,
      isDoT
    });
  }
}

/**
 * 伤害2.0计算
 * http: //warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0
 */
export class Damage2_0 {
  private dtypeDict: Map<DamageType, DamageTypeData>;
  protected static instance = new Damage2_0();
  constructor() {
    this.dtypeDict = new Map(DamageTypeDatabase.map(v => [v.id, v] as [DamageType, DamageTypeData]));
  }

  static getDamageType(id: DamageType) {
    return this.instance.dtypeDict.get(id);
  }
}
