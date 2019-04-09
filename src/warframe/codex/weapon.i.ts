/**
 * 武器信息
 */
export interface WeaponData {
  id: string;
  name: string;
  mode?: string;
  /** 紫卡归属 */
  rivenName?: string;
  /** 标签 */
  tags: string[];
  /** 基伤 */
  dmg: [string, number][];
  /** 暴伤 */
  critMul: number;
  /** 暴率 */
  critChance: number;
  /** 攻速 */
  fireRate: number;
  /** 触发 */
  status: number;
  /** 默认模式 */
  defaultMode?: number;
  /** 极性 */
  pol?: string;
  /** 弹片数 */
  bullets?: number;
}
/**
 * 枪武器信息
 */
export interface GunWeaponData extends WeaponData {
  /** 精准度 */
  accuracy: number;
  /** 弹匣容量 */
  magazine: number;
  /** 装填速度 */
  reload: number;
  /** 弹药上限 */
  ammo: number;
  /** 弹药消耗数 */
  ammoCost?: number;
  /** 弹道速度 */
  prjSpeed?: number;
  /** 距离限制 */
  rangeLimit?: number;
}
/**
 * 近战武器信息
 */
export interface MeleeWeaponData extends WeaponData {
  /** 滑砍伤害 */
  slideDmg: number;
  /** 飞行速度 */
  fltSpeed?: number;
  /** 近战范围 [乘法值, 加法值] */
  range?: [number, number];
}
