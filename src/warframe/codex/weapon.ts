import { i18n } from "@/i18n";
import { WeaponData, GunWeaponData, MeleeWeaponData } from "./weapon.i";

export class Weapon implements WeaponData {
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
  pol: string;

  constructor(data: WeaponData) {
    this.id = data.id;
    this.name = data.name;
    this.mode = data.mode;
    this.rivenName = data.rivenName;
    this.tags = data.tags;
    this.dmg = data.dmg;
    this.critMul = data.critMul;
    this.critChance = data.critChance;
    this.fireRate = data.fireRate;
    this.status = data.status;
    this.defaultMode = data.defaultMode;
    this.pol = data.pol;
  }
  /** URL */
  get url() {
    return this.id.replace(/ /g, "_");
  }
  /** 真实ID */
  get realID() {
    return this.id.replace(/ \(.+?\)$/g, "");
  }
  /** 真实URL */
  get realURL() {
    return this.realID.replace(/ /g, "_");
  }
  /** WM URL */
  get wmurl() {
    return this.realID.toLowerCase().replace(/ /g, "-");
  }
  get displayName() {
    let name = i18n.t(`messages.${this.name}`) as string;
    if (!this.mode) return name;
    let mode = (this.mode && i18n.t("weaponmode.format", [i18n.t(`weaponmode.${this.mode}`)])) || "";
    return name + mode;
  }
}

export class GunWeapon extends Weapon implements GunWeaponData {
  accuracy: number;
  bullets?: number;
  magazine: number;
  reload: number;
  ammo: number;
  ammoCost?: number;
  prjSpeed?: number;
  rangeLimit?: number;
  constructor(data: GunWeaponData) {
    super(data);
    this.accuracy = data.accuracy;
    this.bullets = data.bullets || 1;
    this.magazine = data.magazine;
    this.reload = data.reload;
    this.ammo = data.ammo;
    this.ammoCost = data.ammoCost;
    this.prjSpeed = data.prjSpeed;
    this.rangeLimit = data.rangeLimit;
  }
}
export class MeleeWeapon extends Weapon implements MeleeWeaponData {
  slideDmg: number;
  fltSpeed: number;
  constructor(data: MeleeWeaponData) {
    super(data);
    this.slideDmg = data.slideDmg;
    this.fltSpeed = data.fltSpeed;
  }
}

import { gunWeaponData, meleeWeaponData } from "./weapon.data";

export const GunWeaponDataBase: GunWeapon[] = gunWeaponData.map(v => new GunWeapon(v));

export const MeleeWeaponDataBase: MeleeWeapon[] = meleeWeaponData.map(v => new MeleeWeapon(v));
