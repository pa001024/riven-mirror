// weapon schema V1.0-variants

/** 伤害 */
export interface Damage {
  Impact?: number;
  Puncture?: number;
  Slash?: number;
  Heat?: number;
  Cold?: number;
  Electricity?: number;
  Toxin?: number;
  Blast?: number;
  Radiation?: number;
  Magnetic?: number;
  Gas?: number;
  Viral?: number;
  Corrosive?: number;
  Void?: number;
}

/** 模式 */
export interface WeaponMode {
  /** 类型 secondary/charge/chargedThrow/throw/area/secondaryArea */
  type?: string;
  /** 名字 */
  name?: string;
  /** 伤害 {Heat:100} */
  damage: Damage;
  // 隐性必填
  fireRate?: number;
  critChance?: number;
  critMul?: number;
  procChance?: number;
  /** 精准 xx (100 when aimed) */
  accuracy?: number;
  /** 自带穿透 */
  punchThrough?: number;
  /** 弹片数 */
  pellets?: number;
  /** 溅射半径 */
  radius?: number;
  /** 射程 */
  range?: number;
  /** 子弹消耗 */
  ammoCost?: number;
  /** 蓄力时间 */
  chargeTime?: number;
  /** 扳机 Semi-Auto/Held/Auto/Charge*/
  trigger?: string;
  /** 点射数量 */
  burstCount?: number;
  /** 投射物速度 */
  prjSpeed?: number;
  /** 启动子弹数 */
  spool?: number;
  /** 静音 */
  silent?: boolean;
  /** 衰减 [起始,中止,最大衰减] */
  falloff?: number[];
}

/** 变焦 */
export interface Zoom {
  /** 变焦倍率 */
  ratio: number;
  /** 额外属性 */
  props?: { [key: string]: number };
}

/** 武器 */
export interface Weapon {
  // base
  name: string;
  tags?: string[];
  /** 次要tag Tenno/G/C/I/Prime 等 */
  traits?: string[];
  /** 段位 */
  mastery?: number;
  /** 极性 */
  polarities?: string;

  // gun
  reload?: number;
  magazine?: number;
  maxAmmo?: number;
  reloadStyle?: number; // Normal=0 Regenerate=1 ByRound=2
  // deep extra
  sniperComboMin?: number;
  sniperComboReset?: number;
  /** 缩放 */
  zoom?: Zoom[]; // "3x (+20% Critical Chance)"

  // melee
  stancePolarity?: string;
  blockResist?: number;
  finisherDamage?: number;
  channelCost?: number;
  channelMult?: number;
  spinAttack?: number;
  jumpAttack?: number;
  leapAttack?: number;
  wallAttack?: number;
  /** 近战范围 */
  reach?: number[];

  // attack
  modes: WeaponMode[];
  variants?: Weapon[];
}

/** 基础 */
export interface ProtoWeapon extends Weapon {
  /** 裂罅倾向 */
  disposition?: number;
}
