/**
 * 武器信息
 */
export interface WeaponData {
  id: string;
  name: string;
  mode?: string;
  rivenName?: string;
  tags: string[];
  dmg: [string, number][];
  critMul: number;
  critChance: number;
  fireRate: number;
  status: number;
  defaultMode?: number;
  pol?: string;
}
/**
 * 枪武器信息
 */
export interface GunWeaponData extends WeaponData {
  /** 精准度 */
  accuracy: number;
  /** 弹片数 */
  bullets?: number;
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
  slideDmg: number;
  fltSpeed?: number;
}
