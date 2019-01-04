import { hAccSum } from "../util";

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

export enum ShieldType {
  /** 护盾 */
  Shield,
  /** 原型护盾 */
  ProtoShield,
}

const _shieldTypeName = [
  "护盾",
  "原型护盾",
];

export enum ArmorType {
  /** 铁制装甲 */
  FerriteArmor,
  /** 合金装甲 */
  AlloyArmor,
}

const _armorTypeName = [
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
  baseShield: number;
  baseArmor: number;
  fleshType: FleshType;
  shieldType: ShieldType;
  armorType: ArmorType;
  resistence: number;
  ignoreProc: number; // 1免疫DoT 2免疫所有 3为夜灵 影响伤害算法
}

const _enemyList = [
  ["Eidolon Teralyst", "夜灵兆力使", 5, 1, 15000, 0, 200, 7, 0, 1, 0.60, 3],
  ["Eidolon Gantulyst", "夜灵巨力使", 5, 1, 15000, 0, 200, 7, 0, 1, 0.60, 3],
  ["Eidolon Hydrolyst", "夜灵水力使", 5, 1, 15000, 0, 200, 7, 0, 1, 0.60, 3],
  ["Teralyst Synovia", "兆力使骨液", 5, 1, 2500, 0, 200, 7, 0, 1, 0.60, 3],
  ["Tusk Firbolg", "巨牙博格", 1, 1, 8000, 0, 600, 7, 0, 1, 0, 1],
  ["Tusk Bolkor", "巨牙博寇", 1, 1, 10000, 0, 600, 7, 0, 1, 0, 1],
  ["Bailiff", "执法员", 1, 1, 600, 0, 500, 1, 0, 0, 0, 0],
  ["Butcher", "屠夫", 1, 1, 50, 0, 5, 1, 0, 0, 0, 0],
  ["Flameblade", "烈焰刀客", 1, 1, 50, 0, 5, 1, 0, 0, 0, 0],
  ["Fire Prosecutor", "禁卫军", 1, 1, 1500, 0, 5, 1, 0, 0, 0, 0],
  ["Powerfist", "重击手", 1, 1, 100, 0, 5, 1, 0, 0, 0, 0],
  ["Scorpion", "天蝎", 1, 1, 150, 0, 150, 1, 0, 0, 0, 0],
  ["Shield Lancer", "盾枪兵", 1, 1, 100, 0, 5, 1, 0, 0, 0, 0],
  ["Ballista", "弩炮", 1, 1, 100, 0, 100, 1, 0, 0, 0, 0],
  ["Eviscerator", "开膛者", 1, 1, 150, 0, 200, 1, 0, 0, 0, 0],
  ["Hellion", "恶徒", 1, 1, 100, 0, 100, 1, 0, 0, 0, 0],
  ["Lancer", "枪兵", 1, 1, 100, 0, 100, 1, 0, 0, 0, 0],
  ["Elite Lancer", "精英枪兵", 1, 15, 150, 0, 200, 1, 0, 1, 0, 0],
  ["Scorch", "怒焚者", 1, 1, 120, 0, 100, 1, 0, 0, 0, 0],
  ["Seeker", "追踪者", 1, 1, 100, 0, 200, 1, 0, 0, 0, 0],
  ["Trooper", "骑兵", 1, 1, 120, 0, 150, 1, 0, 0, 0, 0],
  ["Bombard", "轰击者", 1, 1, 300, 0, 500, 1, 0, 1, 0, 0],
  ["Commander", "指挥官", 1, 3, 500, 0, 95, 1, 0, 1, 0, 0],
  ["Drahk Master", "爪喀驯兽师", 1, 12, 500, 0, 200, 1, 0, 0, 0, 0],
  ["Heavy Gunner", "重型机枪手", 1, 8, 300, 0, 500, 1, 0, 0, 0, 0],
  ["Hyekka Master", "鬣猫驯兽师", 1, 12, 650, 0, 200, 1, 0, 0, 0, 0],
  ["Manic", "狂躁Grineer", 1, 1, 350, 0, 25, 1, 0, 0, 0, 0],
  ["Napalm", "火焰轰击者", 1, 6, 600, 0, 500, 1, 0, 1, 0, 0],
  ["Nox", "毒化者", 1, 1, 250, 0, 350, 1, 0, 1, 0.90, 0],
  ["Ghoul Auger", "钻孔尸鬼", 1, 1, 400, 0, 200, 1, 0, 0, 0, 0],
  ["Ghoul Devourer", "吞噬尸鬼", 1, 1, 600, 0, 250, 1, 0, 0, 0, 0],
  ["Ghoul Expired", "除役尸鬼", 1, 1, 300, 0, 150, 1, 0, 0, 0, 0],
  ["Ghoul Rictus", "裂嘴尸鬼", 1, 1, 400, 0, 200, 1, 0, 0, 0, 0],
  ["Grineer Warden", "Grineer典狱长", 1, 1, 600, 0, 500, 1, 0, 0, 0, 0],
  ["Sensor Regulator", "感应调整者", 1, 1, 100, 0, 300, 6, 0, 0, 0, 0],
  ["Crewman", "船员", 2, 1, 60, 150, 0, 0, 0, 0, 0, 0],
  ["Detron Crewman", "德特昂船员", 2, 1, 60, 150, 0, 0, 0, 0, 0, 0],
  ["Elite Crewman", "精英船员", 2, 15, 100, 200, 0, 0, 0, 0, 0, 0],
  ["Nullifier Crewman", "虚能船员", 2, 1, 60, 150, 0, 0, 1, 0, 0, 0],
  ["Prod Crewman", "监工船员", 2, 1, 100, 50, 0, 0, 0, 0, 0, 0],
  ["Sniper Crewman", "狙击手船员", 2, 15, 60, 150, 0, 0, 1, 0, 0, 0],
  ["Corpus Tech", "Corpus技师", 2, 15, 700, 250, 0, 0, 1, 0, 0, 0],
  ["Comba", "驱逐员", 2, 15, 1100, 400, 0, 0, 0, 0, 0, 0],
  ["Scrambus", "扰敌员", 2, 15, 1100, 400, 0, 0, 0, 0, 0, 0],
  ["Anti MOA", "逆进恐鸟", 2, 5, 50, 500, 0, 7, 0, 0, 0, 0],
  ["Denial Bursa", "守护金流恐鸟", 2, 1, 1200, 700, 400, 7, 0, 0, 0, 0],
  ["Drover Bursa", "驱引金流恐鸟", 2, 1, 1200, 700, 400, 7, 0, 0, 0, 0],
  ["Fusion MOA", "熔岩恐鸟", 2, 10, 250, 250, 0, 7, 0, 0, 0, 0],
  ["Isolator Bursa", "隔离金流恐鸟", 2, 1, 1200, 700, 400, 7, 0, 0, 0, 0],
  ["MOA", "恐鸟", 2, 1, 60, 150, 0, 7, 0, 0, 0, 0],
  ["Railgun MOA", "磁轨炮恐鸟", 2, 1, 60, 150, 0, 7, 0, 0, 0, 0],
  ["Shockwave MOA", "震荡恐鸟", 2, 15, 60, 150, 0, 7, 0, 0, 0, 0],
  ["Drone", "无人机", 2, 1, 250, 75, 0, 7, 0, 0, 0, 0],
  ["Leech Osprey", "吸血鱼鹰", 2, 1, 100, 50, 0, 7, 0, 0, 0, 0],
  ["Lynx Osprey", "山猫鱼鹰", 2, 1, 35, 50, 0, 7, 0, 0, 0, 0],
  ["Mine Osprey", "地雷鱼鹰", 2, 10, 100, 50, 0, 7, 0, 0, 0, 0],
  ["Oxium Osprey", "奥席金属鱼鹰", 2, "-", 750, 150, 40, 7, 0, 0, 0, 0],
  ["Scavanger Osprey", "清道夫无人机", 2, 1, 100, 50, 0, 7, 0, 0, 0, 0],
  ["Sapping Osprey", "基蚀鱼鹰", 2, 1, 200, 50, 0, 7, 0, 0, 0, 0],
  ["Shield Osprey", "护盾鱼鹰", 2, 1, 35, 50, 0, 7, 0, 0, 0, 0],
  ["Charger", "疾冲者", 3, 1, 80, 0, 0, 3, 0, 0, 0, 0],
  ["Leaper", "奔跳者", 3, 1, 100, 0, 0, 3, 0, 0, 0, 0],
  ["Runner", "狂奔者", 3, 1, 100, 0, 0, 3, 0, 0, 0, 0],
  ["Volatile Runner", "爆炸奔跑者", 3, 1, 80, 0, 0, 3, 0, 0, 0, 0],
  ["Crawler", "爬行者", 3, 1, 50, 0, 0, 4, 0, 0, 0, 0],
  ["Electric Crawler", "电击爬行者", 3, 1, 50, 0, 0, 4, 0, 0, 0, 0],
  ["Lobber Crawler", "喷吐爬行者", 3, 1, 50, 0, 0, 4, 0, 0, 0, 0],
  ["Nauseous Crawler", "呕心爬行者", 3, 1, 50, 0, 0, 4, 0, 0, 0, 0],
  ["Toxic Crawler", "剧毒爬行者", 3, 1, 50, 0, 0, 4, 0, 0, 0, 0],
  ["Mutalist Osprey", "剧毒无人机", 3, 1, 200, 0, 0, 4, 0, 0, 0, 0],
  ["Swarm Mutalist MOA", "异融胞群恐鸟", 3, 12, 350, 0, 0, 2, 0, 0, 0, 0],
  ["Tar-Mutalist MOA", "异融焦油恐鸟", 3, 12, 350, 0, 0, 2, 0, 0, 0, 0],
  ["Ancient Disrupter", "远古干扰者", 3, 1, 400, 0, 0, 2, 0, 0, 0, 0],
  ["Ancient Healer", "远古治愈者", 3, 1, 400, 0, 0, 2, 0, 0, 0, 0],
  ["Boiler", "痈裂者", 3, 12, 1200, 0, 0, 2, 0, 0, 0, 0],
  ["Brood Mother", "病变虫母", 3, 12, 700, 0, 0, 2, 0, 0, 0, 0],
  ["Toxic Ancient", "远古剧毒者", 3, 1, 400, 0, 0, 2, 0, 0, 0, 0],
  ["Hemocyte", "免疫血胞体", 3, 1, 2200, 0, 175, 2, 0, 0, 0, 3],
  ["Corrupted Ancient", "远古堕落者", 4, 1, 400, 0, 0, 2, 0, 0, 0, 0],
  ["Corrupted Butcher", "堕落屠夫", 4, 1, 100, 0, 5, 1, 0, 0, 0, 0],
  ["Corrupted Bombard", "堕落轰击者", 4, 4, 300, 0, 500, 1, 0, 1, 0, 0],
  ["Corrupted Heavy Gunner", "堕落重型机枪手", 4, 8, 700, 0, 500, 1, 0, 0, 0, 0],
  ["Corrupted Lancer", "堕落枪兵", 4, 1, 60, 0, 200, 1, 0, 1, 0, 0],
  ["Orokin Drone", "Orokin无人机", 4, 1, 35, 50, 0, 7, 0, 0, 0, 0],
  ["Corrupted Crewman", "堕落船员", 4, 1, 60, 150, 0, 0, 0, 0, 0, 0],
  ["Corrupted MOA", "堕落恐鸟", 4, 1, 250, 250, 0, 7, 0, 0, 0, 0],
  ["Corrupted Nullifier", "堕落虚能者", 4, 15, 60, 150, 0, 0, 1, 0, 0, 0]
] as [string, string, number, number, number, number, number, number, number, number, number, number][];

/** 敌人列表 */
export const EnemyList = _enemyList.map(v => ({
  id: v[0],
  name: v[1],
  faction: v[2],
  baseLevel: v[3],
  baseHealth: v[4],
  baseShield: v[5],
  baseArmor: v[6],
  fleshType: v[7],
  shieldType: v[8],
  armorType: v[9],
  resistence: v[10],
  ignoreProc: v[11],
})) as EnemyData[];

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
        if (!this.Heat)
          this.Heat = ([dmg, ~~(8 * durationMul)]);
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
    if (this.Heat && this.Heat[1] <= 1)
      this.Heat = null;
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

export class Enemy implements EnemyData {
  // === 静态属性 ===
  id: string;
  name: string;
  faction: EnemyFaction;
  get factionName() { return EnemyFaction[this.faction]; }
  baseLevel: number;
  baseHealth: number;
  baseShield: number;
  baseArmor: number;
  fleshType: FleshType;
  shieldType: ShieldType;
  armorType: ArmorType;
  get fleshTypeId() { return FleshType[this.fleshType]; }
  get shieldTypeId() { return ShieldType[this.shieldType]; }
  get armorTypeId() { return ArmorType[this.armorType]; }
  get fleshTypeName() { return _fleshTypeName[this.fleshType]; }
  get shieldTypeName() { return _shieldTypeName[this.shieldType]; }
  get armorTypeName() { return _armorTypeName[this.armorType]; }
  resistence: number;
  get resistenceText() { return this.resistence && (this.resistence * 100).toFixed() + "%"; }
  ignoreProc: number;
  // === 动态属性 ===
  private _level: number;
  public get level(): number { return this._level; }
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
  get health() { return this.baseHealth * (1 + (this.level - this.baseLevel) ** 2 * 0.015); }
  /**
   * 当前等级基础护盾
   * = 基础护盾 × ( 1 + ( 当前等级 − 基础等级 )^2 × 0.0075 )
   */
  get shield() { return this.baseShield * (1 + (this.level - this.baseLevel) ** 2 * 0.0075); }
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
  constructor({ id, name, faction, baseLevel, baseHealth, baseShield, baseArmor, fleshType, shieldType, armorType, resistence, ignoreProc }: EnemyData, level: number) {
    [this.id, this.name, this.faction] = [id, name, faction];
    [this.baseLevel, this.baseHealth, this.baseShield, this.baseArmor] = [baseLevel, baseHealth, baseShield, baseArmor];
    [this.fleshType, this.shieldType, this.armorType] = [fleshType, shieldType, armorType];
    this.resistence = resistence;
    this.ignoreProc = ignoreProc;
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
      let AM = dtype.dmgMul[11 + this.armorType];
      let DM = (1 + HM) * (1 + AM) / (1 + this.currentArmor * (1 - AM) / 300);
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
      let SM = dtype.dmgMul[9 + this.shieldType];
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
            let AM = dtype.dmgMul[11 + this.armorType];
            let DM = (1 + HM) * (1 + AM) / (1 + this.currentArmor * (1 - AM) / 300);
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
   * @param {number} threshold 阈值
   * @returns this
   * @memberof Enemy
   */
  applyEidolonDmg(dmgs: [string, number][], critChance: number, threshold = 300) {
    let mapped = this.mapDamage(dmgs);
    let totalDmg = mapped.reduce((a, b) => a + b[1], 0);

    let eidolonCritDmg = totalDmg + totalDmg * (critChance > 1 ? 1 : critChance);
    // 目标夜灵 无视护盾
    let eidolonDmg = eidolonCritDmg > threshold ? threshold + (eidolonCritDmg) / 10 : eidolonCritDmg;
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
    this.applyDmg(immediateDamages);
  }
  /**
   * 计算单发射击后怪物血量剩余情况(连续)
   *
   * @param {[string, number][]} dmgs 伤害表
   * @param {[string, number][]} procChanceMap 触发几率表(真实触发)
   * @param {[string, number][]} dotDamageMap 触发伤害表(DoT)
   * @param {number} [bullets=1] 弹片数
   * @param {number} [durationMul=1]
   * @memberof Enemy
   */
  applyHit(dmgs: [string, number][], procChanceMap: [string, number][], dotDamageMap: [string, number][], bullets = 1, durationMul = 1, critChance = 0, threshold = 300, procDamageMul = 1) {
    let procChance = procChanceMap.reduce((a, [id, val]) => (a[id] = val, a), {});
    // [0.每个弹片单独计算]
    let bls = bullets;
    while (bls > 0) {
      // [0.将伤害平分给每个弹片 不满整个的按比例计算]
      let bh = bls >= 1 ? 1 : bls;
      // 夜灵算法 https://warframe.huijiwiki.com/wiki/%E5%8D%9A%E5%AE%A2:%E5%A4%9C%E7%81%B5%E5%85%86%E5%8A%9B%E4%BD%BF%E4%BC%A4%E5%AE%B3%E6%9C%BA%E5%88%B6
      if (this.ignoreProc === 3) {
        this.applyEidolonDmg(dmgs.map(([vn, vv]) => [vn, vv * bh / bullets] as [string, number]), critChance, threshold * this.resistence * bh); // 不足一个的乘以阈值
      } else if (this.ignoreProc === 2) {
        this.applyDmg(dmgs.map(([vn, vv]) => [vn, vv * bh / bullets] as [string, number]));
      } else {
        // [1.按当前病毒触发比例减少血上限]
        let currentViral = this.currentProcs.Viral;
        this.currentHealth *= (1 - 0.5 * currentViral);
        // [2.直接伤害]
        this.applyDmg(dmgs.map(([vn, vv]) => [vn, vv * bh / bullets] as [string, number]));
        // [3.腐蚀扒皮] 计算腐蚀触发(连续)
        if (procChance[DamageType.Corrosive] > 0) {
          this.currentArmor *= (0.75 ** (procChance[DamageType.Corrosive] * bh));
        }
        // [4.1.磁力少盾]
        if (procChance[DamageType.Magnetic] > 0) {
          this.currentShield *= (0.25 ** (procChance[DamageType.Magnetic] * bh));
        }
        // [4.2.病毒少血]
        if (procChance[DamageType.Viral] > 0 && this.currentProcs.Viral < 1) {
          // 将病毒触发连续化计算增伤
          let newViral = currentViral + (procChance[DamageType.Viral] * bh);
          this.currentProcs.Viral = newViral > 1 ? 1 : newViral;
        }
        // [5.DoT伤害]
        if (this.ignoreProc === 0) this.applyDoTDmg(dotDamageMap.map(([vn, vv]) => [vn, vv * bh / bullets] as [string, number]), durationMul, procDamageMul);
        // [6.将病毒下降的血量恢复]
        this.currentHealth /= (1 - 0.5 * currentViral);
      }
      bls = hAccSum(bls, -1);
    }
    this.pushState(false, 1);
  }

  // === 时间线系统 ===

  TICKCYCLE = 1200;
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
      ms: ~~(this.tickCount * 1e3 / this.TICKCYCLE),
      ammo,
      health: this.currentHealth,
      shield: this.currentShield,
      armor: this.currentArmor,
      isDoT
    })
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

  static getDamageType(id: DamageType) { return this.instance.dtypeDict.get(id); }
}
