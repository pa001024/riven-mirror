/** 战甲信息 */
export interface WarframeData {
  id: string;
  // name: string;
  tags?: string[];
  description?: string;
  className?: string;
  health: number;
  shield: number;
  armor: number;
  energy: number;
  sprint: number;
  introduced: string;
  masteryReq?: number;
  polarities: string[];
  lvlUps?: [string, number][];
  // prime common props
  passiveDescription?: string;
  abilities?: string[];
  aura?: string;
  exilus?: string;
  sex?: string;
  // prime only props
  releaseDate?: string;
  vaultDate?: string;
  estimatedVaultDate?: string;
}

/** 战甲属性条目 */
export enum WarframeProperty {
  Health = "h",
  Shield = "s",
  Amror = "a",
  Energy = "e",
  Sprint = "f",
  ShieldRecharge = "r",
  AbilityStrength = "t",
  AbilityDuration = "u",
  AbilityEfficiency = "x",
  AbilityRange = "g",
  CastSpeed = "c",
  KnockdownResistance = "k",
  KnockdownRecovery = "h",
  Slide = "l",
  Friction = "i",
  ParkourVelocity = "v",
  QuickThinking = "z",
  Rage = "rg",
  HealthConversion = "hc",
  EnergyConversion = "ec",
  TauResist = "tr",
  AuraStrength = "as",
  AuraEffectiveness = "ae",
  AimGlideWallLatchTime = "at",
  EnemyRadar = "er",
  LootRadar = "lr",
  HolsterRate = "hr",
}

export enum AbilityType {
  /** 伤害 */
  Damage = 1,
  /** 附加效果 */
  BuffDebuff = 2,
  /** 机动 */
  Mobility = 4,
  /** 感知 */
  Perception = 8,
  /** 控制 */
  Control = 16,
  /** 召唤 */
  Summon = 32,
}

/** 高级数值 */
export interface AdvancedAbilityPropValue {
  /** 与基础属性的关联性 [属性名, 加数] 不填即为固定 */
  bind?: [WarframeProperty, number][]
  /** 基础值 */
  value?: number
  /** 下限 */
  minValue?: number
  /** 上限 */
  maxValue?: number
}

/** 数值 */
export type AbilityPropValue = number | AdvancedAbilityPropValue

/** 属性类型 */
namespace AbilityPropTypes {
  /** 伤害 */
  export interface Damage {
    /** 伤害 */
    damage: [string, AbilityPropValue][]
    /** 范围伤害 */
    rangeDamage?: [string, AbilityPropValue][]
    /** 持续时间 不填表示是瞬间伤害 */
    duration?: AbilityPropValue
    /** 有持续时间表示总持续时间内伤害次数 没有表示单次伤害攻击数量 */
    tick?: AbilityPropValue
    /** 影响角度 不填表示是全向技能 */
    angel?: AbilityPropValue
    /** 影响范围 不填表示是单体技能 */
    range?: AbilityPropValue
    /** 施放距离 不填表示是以自身为中心 */
    distance?: AbilityPropValue
    /** 飞行速度 */
    prjSpeed?: AbilityPropValue
    /** 所受MOD影响 常用 melee */
    affectBy?: string
  }
  /** Buff */
  export interface Buff {
    /** 作用对象 常用取值 all / weapon 默认为 all */
    target?: string
    /** 作用 等效MOD */
    effect: [string, AbilityPropValue][]
    /** 持续时间 不填表示是开关技能 */
    duration?: AbilityPropValue
    /** 影响角度 不填表示是全向技能 */
    angel?: AbilityPropValue
    /** 影响范围 不填表示是单体技能 */
    range?: AbilityPropValue
    /** 施放距离 不填表示是以自身为中心 */
    distance?: AbilityPropValue
  }
  /** Debuff */
  export interface Debuff {
    /** 作用对象 默认为 enemy */
    target?: string
    /** 作用 等效MOD */
    effect: [string, AbilityPropValue][]
    /** 持续时间 不填表示是开关技能 */
    duration?: AbilityPropValue
    /** 影响角度 不填表示是全向技能 */
    angel?: AbilityPropValue
    /** 影响范围 不填表示是单体技能 */
    range?: AbilityPropValue
    /** 施放距离 不填表示是以自身为中心 */
    distance?: AbilityPropValue
  }
  export interface Summon {
    /** 生命值 */
    health?: AbilityPropValue
    /** 持续时间 不填表示是开关技能 */
    duration?: AbilityPropValue
    /** 施放距离 不填表示是以自身为中心 */
    distance?: AbilityPropValue
    /** 影响范围 不填表示是单体技能 */
    range?: AbilityPropValue
    /** 伤害 */
    damage?: [string, AbilityPropValue][]
    /** 范围伤害 */
    rangeDamage?: [string, AbilityPropValue][]
  }
  /** 减伤对象 */
  export enum Target {
    /** 所有 */
    All,
    /** 远程攻击 */
    Range,
    /** 近战 */
    Melee,
    /** 抛射物 */
    Projectile,
  }
  /** 减伤 */
  export interface DamageReduce {
    /** 百分比 */
    rate: AbilityPropValue
    /** 减伤对象 */
    target: Target
  }
  /** 反伤 */
  export interface DamageReflect {
    /** 倍率 */
    rate: AbilityPropValue
    /** 反伤对象 */
    target: Target
    /** 反伤范围 不填表示无限距离 */
    range?: AbilityPropValue
  }
  /** 控制 */
  export interface Control {
    /** 持续时间 不填表示是瞬间控制类技能(如牵引) */
    duration?: AbilityPropValue
    /** 影响角度 不填表示是全向技能 */
    angel?: AbilityPropValue
    /** 影响范围 不填表示是单体技能 */
    range?: AbilityPropValue
    /** 施放距离 不填表示是以自身为中心 */
    distance?: AbilityPropValue
  }
  /** 特殊 */
  export interface Special {
    value: AbilityPropValue
  }
  /** 位移 */
  export interface Move {
    /** 指向性 0为非指向性 1为非强制指向(如咖喱1技能) 2为强制指向 */
    directive?: 0 | 1 | 2
    /** 距离 */
    distance: AbilityPropValue
  }
  /** 显赫武器 */
  export interface ExaltedWeapon {
    /** 显赫武器名称 */
    weaponName: string
    /** 作用 等效MOD */
    effect?: [string, AbilityPropValue][]
  }
}

/** 技能属性 */
export type AbilityProp = {
  Damage?: AbilityPropTypes.Damage
  Buff?: AbilityPropTypes.Buff
  Debuff?: AbilityPropTypes.Debuff
  Summon?: AbilityPropTypes.Summon
  Target?: AbilityPropTypes.Target
  DamageReduce?: AbilityPropTypes.DamageReduce
  DamageReflect?: AbilityPropTypes.DamageReflect
  Control?: AbilityPropTypes.Control
  Special?: AbilityPropTypes.Special
  Move?: AbilityPropTypes.Move
  ExaltedWeapon?: AbilityPropTypes.ExaltedWeapon
}

/** 技能强化 (集团卡) */
export interface AbilityEnhance {
  /** 集团卡名称 */
  modName: string
  /** 描述 */
  description?: string
  /** 技能属性 */
  props?: AbilityProp
  /** 技能使用蓝耗 */
  energyCost: number
  /** 技能持续蓝耗 不填表示不是开关技能 */
  energyCostPS?: number
  /** 技能使用蓝耗 (弓妹4) */
  energyCostN?: number
}

export interface AbilityData {
  /** ID */
  id: string
  /** 本地化名称 */
  // name: string
  /** 描述 */
  description?: string
  /** 单手动作 */
  oneHand?: boolean
  /** 技能标记 union enum AbilityType 没有则为0 */
  tags: number
  /** 技能使用蓝耗 */
  energyCost: number
  /** 技能持续蓝耗 不填表示不是开关技能 */
  energyCostPS?: number
  /** 技能使用蓝耗 (弓妹4) */
  energyCostN?: number
  /** 技能强化 (集团卡) */
  enhance?: AbilityEnhance
  /** 技能属性 */
  props?: AbilityProp
  /** 形态 */
  forms?: AbilityFormData[]
}

export interface AbilityFormData {
  /** ID */
  id: string
  /** 技能属性 */
  props?: AbilityProp
  /** 单手动作 */
  oneHand?: boolean
  /** 技能标记 union enum AbilityType 没有则为0 */
  tags: number
  /** 技能使用蓝耗 */
  energyCost: number
  /** 技能持续蓝耗 不填表示不是开关技能 */
  energyCostPS?: number
  /** 技能使用蓝耗 (弓妹4) */
  energyCostN?: number
  /** 技能强化 (集团卡) */
  enhance?: AbilityEnhance
}
