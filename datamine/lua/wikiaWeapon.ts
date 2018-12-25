/**
 * warframe wiki module:Weapons/data json export
 * from https://warframe.fandom.com/index.php?title=module:Weapons/data&action=raw
 *
 * @export
 * @interface WikiaWeapon
 */
export interface WikiaWeapon {
  Accuracy?: number | string;
  AmmoType?: string;
  BlockResist?: number;
  BurstCount?: number;
  BurstFireRate?: number;
  ChannelCost?: number;
  ChannelMult?: number;
  Class?: string;
  Conclave?: boolean;
  Cost?: Cost;
  Disposition?: number;
  Family?: string;
  FinisherDamage?: number;
  FireRate?: number;
  IgnoreCategories?: boolean;
  Image?: string;
  Introduced?: string;
  JumpAttack?: number;
  JumpElement?: string;
  JumpRadius?: number;
  Link?: string;
  Magazine?: number;
  Mastery?: number;
  MaxAmmo?: number;
  Name: string;
  NoiseLevel?: string;
  Polarities?: string[];
  Range?: number;
  Reload?: number;
  ReloadStyle?: string;
  SlideAttack?: number;
  SlideElement?: string;
  SniperComboMin?: number;
  SniperComboReset?: number;
  Spool?: number;
  Stagger?: string;
  StancePolarity?: string;
  SyndicateEffect?: string;
  Traits?: string[];
  Trigger?: string;
  Type: string;
  Users?: string[];
  WallAttack?: number;
  WallElement?: string;
  Zoom?: string[];
  ComparisonDisplay?: ComparisonDisplay[];
  NormalAttack?: NormalAttack;
  ChargeAttack?: ChargeAttack;
  SecondaryAttack?: SecondaryAttack;
  ThrowAttack?: ThrowAttack;
  AreaAttack?: AreaAttack;
  ChargedThrowAttack?: ChargedThrowAttack;
  SecondaryAreaAttack?: SecondaryAreaAttack;
}

/**
 * 伤害
 *
 * @export
 * @interface Damage
 */
export interface Damage {
  Puncture?: number;
  Slash?: number;
  Impact?: number;
  Cold?: number;
  Heat?: number;
  Toxin?: number;
  Electricity?: number;
  Blast?: number;
  Magnetic?: number;
  Radiation?: number;
  Corrosive?: number;
  Viral?: number;
  Gas?: number;
}


/**
 * 普通攻击
 *
 * @export
 * @interface NormalAttack
 */
export interface NormalAttack {
  Accuracy?: number;
  AmmoCost?: number;
  AttackName?: string;
  BurstCount?: number;
  ChargeTime?: number;
  CritChance?: number;
  CritMultiplier?: number;
  Damage: Damage;
  Falloff?: Falloff;
  FireRate?: number;
  PelletCount?: number;
  PelletName?: string;
  PunchThrough?: number;
  Radius?: number;
  Range?: number;
  ShotSpeed?: number | string;
  ShotType?: string;
  StatusChance?: number;
}
/**
 * 次要攻击
 *
 * @export
 * @interface SecondaryAttack
 */
export interface SecondaryAttack {
  Accuracy?: number;
  AmmoCost?: number;
  AttackName?: string;
  BurstCount?: number;
  ChargeTime?: number;
  CritChance?: number;
  CritMultiplier?: number;
  Damage: Damage;
  Falloff?: Falloff;
  FireRate?: number;
  NoiseLevel?: string;
  PelletCount?: number;
  PelletName?: string;
  Polarities?: string[];
  PunchThrough?: number;
  Radius?: number;
  Range?: number;
  Reload?: number;
  ShotSpeed?: number | string;
  ShotType?: string;
  StatusChance?: number;
  Traits?: string[];
  Trigger?: string;
}

/**
 * 范围攻击
 *
 * @export
 * @interface AreaAttack
 */
export interface AreaAttack {
  Accuracy?: number;
  AmmoCost?: number;
  AttackName?: string;
  ChargeTime?: number;
  CritChance?: number;
  CritMultiplier?: number;
  Damage: Damage;
  Duration?: number;
  FireRate?: number;
  Radius?: number;
  Range?: number;
  ShotSpeed?: string;
  ShotType?: string;
  StatusChance?: number;
}
/**
 * 次要范围攻击
 *
 * @export
 * @interface SecondaryAreaAttack
 */
export interface SecondaryAreaAttack {
  Accuracy?: number;
  AmmoCost?: number;
  AttackName: string;
  ChargeTime?: number;
  CritChance?: number;
  CritMultiplier?: number;
  Damage: Damage;
  Duration?: number;
  FireRate?: number;
  PelletCount?: number;
  PelletName?: string;
  Radius?: number;
  ShotSpeed?: number;
  ShotType?: string;
  StatusChance?: number;
}

/**
 * 投掷攻击
 *
 * @export
 * @interface ThrowAttack
 */
export interface ThrowAttack {
  CritChance: number;
  CritMultiplier: number;
  Damage: Damage;
  StatusChance: number;
}

/**
 * 蓄力投掷攻击
 *
 * @export
 * @interface ChargedThrowAttack
 */
export interface ChargedThrowAttack {
  CritChance: number;
  CritMultiplier: number;
  Damage: Damage;
  PunchThrough?: number;
  StatusChance: number;
}
/**
 * 对比视图
 *
 * @export
 * @interface ComparisonDisplay
 */
export interface ComparisonDisplay {
  Name: string;
  Attacks: string[];
}

/**
 * 蓄力攻击
 *
 * @export
 * @interface ChargeAttack
 */
export interface ChargeAttack {
  Accuracy?: number;
  AmmoCost?: number;
  AttackName?: string;
  ChargeTime?: number;
  CritChance?: number;
  CritMultiplier?: number;
  Damage: Damage;
  FireRate?: number;
  PelletCount?: number;
  PelletName?: string;
  PunchThrough?: number;
  Radius?: number;
  Range?: number;
  ShotSpeed?: number | string;
  ShotType?: string;
  StatusChance?: number;
}

/**
 * 制造材料
 *
 * @export
 * @interface Cost
 */
export interface Cost {
  BPCost?: number;
  BPStanding?: number;
  Credits?: number;
  MarketCost?: number | string;
  Parts?: Part[];
  Rank?: number;
  Reputation?: number;
  Rush?: number;
  Syndicate?: string;
  Time?: number;
}

export interface Part {
  Type: string;
  Name: string;
  Count: number;
}


/**
 * 衰减
 *
 * @export
 * @interface Falloff
 */
export interface Falloff {
  StartRange: number;
  EndRange: number;
  Reduction: number;
}
