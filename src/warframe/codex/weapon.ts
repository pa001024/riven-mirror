import { i18n } from "@/i18n";

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

/*
Data from https://warframe.huijiwiki.com/wiki/module:Weapons/data
*/
export const GunWeaponDataBase: GunWeapon[] = ([
  { id: "MK1-Braton", name: "mk1Braton", rivenName: "Braton", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 9], ["Puncture", 4.5], ["Impact", 4.5]], accuracy: 40, fireRate: 7.5, critChance: 0.08, critMul: 1.5, status: 0.05, magazine: 60, reload: 2, ammo: 540 },
  { id: "MK1-Furis", name: "mk1Furis", rivenName: "Furis", tags: ["Gun", "Secondary"], dmg: [["Slash", 1.9], ["Puncture", 9.1], ["Impact", 2]], accuracy: 15.4, fireRate: 8.3, critChance: 0.05, critMul: 2, status: 0.01, magazine: 35, reload: 1.4, ammo: 210, pol: "-" },
  { id: "MK1-Kunai", name: "mk1Kunai", tags: ["Gun", "Secondary", "Thrown"], rivenName: "Kunai", dmg: [["Slash", 6], ["Puncture", 30], ["Impact", 4]], accuracy: 100, fireRate: 3.3, critChance: 0.05, critMul: 2, status: 0.025, magazine: 10, reload: 0.75, ammo: 210, pol: "rr" },
  { id: "MK1-Paris", name: "mk1Paris", rivenName: "Paris", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 15], ["Puncture", 80], ["Impact", 5]], accuracy: 16.7, fireRate: 1.67, critChance: 0.2, critMul: 1.5, status: 0.15, magazine: 1, reload: 0.55, ammo: 72, prjSpeed: 70, pol: "-" },
  { id: "MK1-Paris (charged)", name: "mk1Paris", mode: "charged", rivenName: "Paris", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 18], ["Puncture", 96], ["Impact", 6]], accuracy: 16.7, fireRate: 2, critChance: 0.3, critMul: 2, status: 0.15, magazine: 1, reload: 0.55, ammo: 72, prjSpeed: 85, pol: "-" },
  { id: "MK1-Strun", name: "mk1Strun", rivenName: "Strun", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 54], ["Puncture", 27], ["Impact", 99]], accuracy: 4, bullets: 10, fireRate: 2.08, critChance: 0.075, critMul: 2, status: 0.2, magazine: 6, reload: 3.75, ammo: 120, pol: "-" },
  { id: "Acrid", name: "acrid", tags: ["Gun", "Secondary"], dmg: [["Toxin", 35]], accuracy: 100, fireRate: 6.7, critChance: 0.05, critMul: 2, status: 0.1, magazine: 15, reload: 1.2, ammo: 210, prjSpeed: 65 },
  { id: "Afuris", name: "afuris", tags: ["Gun", "Secondary"], dmg: [["Slash", 3], ["Puncture", 14], ["Impact", 3]], accuracy: 15.4, fireRate: 12.5, critChance: 0.05, critMul: 2, status: 0.12, magazine: 70, reload: 2, ammo: 210, pol: "-" },
  { id: "Akbolto", name: "akbolto", tags: ["Gun", "Secondary"], dmg: [["Puncture", 36], ["Impact", 4]], accuracy: 26.7, fireRate: 10, critChance: 0.16, critMul: 2.4, status: 0.022, magazine: 30, reload: 2.6, ammo: 210, prjSpeed: 75, pol: "d" },
  { id: "Telos Akbolto", name: "telosAkbolto", rivenName: "Akbolto", tags: ["Gun", "Secondary"], dmg: [["Puncture", 42.3], ["Impact", 4.7]], accuracy: 26.7, fireRate: 10, critChance: 0.13, critMul: 2, status: 0.29, magazine: 30, reload: 2.6, ammo: 210, prjSpeed: 75, pol: "d-" },
  { id: "Akbolto Prime", name: "akboltoPrime", rivenName: "Akbolto", tags: ["Gun", "Secondary"], dmg: [["Slash", 1.3], ["Puncture", 27.5], ["Impact", 3.2]], accuracy: 26.7, fireRate: 7, critChance: 0.36, critMul: 2.8, status: 0.14, magazine: 40, reload: 1.3, ammo: 210, prjSpeed: 75, pol: "-rrr" },
  { id: "Akbronco", name: "akbronco", tags: ["Gun", "Secondary"], dmg: [["Slash", 28], ["Puncture", 28], ["Impact", 224]], accuracy: 3.7, bullets: 7, fireRate: 8.33, critChance: 0.06, critMul: 2, status: 0.22, magazine: 4, reload: 2.25, ammo: 210, pol: "r" },
  { id: "Akbronco Prime", name: "akbroncoPrime", rivenName: "Akbronco", tags: ["Gun", "Secondary"], dmg: [["Slash", 35], ["Puncture", 35], ["Impact", 280]], accuracy: 3.7, bullets: 7, fireRate: 4.33, critChance: 0.06, critMul: 2, status: 0.3, magazine: 8, reload: 2.25, ammo: 210, pol: "rr" },
  { id: "Akjagara", name: "akjagara", tags: ["Gun", "Secondary"], dmg: [["Slash", 21], ["Puncture", 4.5], ["Impact", 4.5]], accuracy: 15.4, fireRate: 16.67, critChance: 0.06, critMul: 2, status: 0.28, magazine: 36, reload: 2.25, ammo: 210, pol: "-" },
  { id: "Akjagara Prime", name: "akjagaraPrime", rivenName: "Akjagara", tags: ["Gun", "Secondary"], dmg: [["Slash", 28.8], ["Puncture", 3.6], ["Impact", 3.6]], accuracy: 33.3, fireRate: 10, critChance: 0.18, critMul: 2.2, status: 0.32, magazine: 40, reload: 1.4, ammo: 210, pol: "rr" },
  { id: "Aklato", name: "aklato", tags: ["Gun", "Secondary"], dmg: [["Slash", 18], ["Puncture", 7.5], ["Impact", 4.5]], accuracy: 11.1, fireRate: 7.5, critChance: 0.1, critMul: 1.8, status: 0.06, magazine: 30, reload: 2.4, ammo: 210 },
  { id: "Aklex", name: "aklex", tags: ["Gun", "Secondary"], dmg: [["Slash", 13], ["Puncture", 104], ["Impact", 13]], accuracy: 9.8, fireRate: 1.58, critChance: 0.2, critMul: 2, status: 0.1, magazine: 12, reload: 3, ammo: 210 },
  { id: "Aklex Prime", name: "aklexPrime", rivenName: "Aklex", tags: ["Gun", "Secondary"], dmg: [["Slash", 15], ["Puncture", 120], ["Impact", 15]], accuracy: 9.8, fireRate: 2.67, critChance: 0.25, critMul: 2, status: 0.25, magazine: 16, reload: 3, ammo: 210 },
  { id: "Akmagnus", name: "akmagnus", tags: ["Gun", "Secondary"], dmg: [["Slash", 20.9], ["Puncture", 20.9], ["Impact", 34.2]], accuracy: 11.1, fireRate: 6.17, critChance: 0.22, critMul: 2, status: 0.22, magazine: 16, reload: 2.4, ammo: 210 },
  { id: "Aksomati", name: "aksomati", tags: ["Gun", "Secondary"], dmg: [["Slash", 9], ["Puncture", 7.2], ["Impact", 1.8]], accuracy: 15.4, fireRate: 12.5, critChance: 0.24, critMul: 3, status: 0.08, magazine: 70, reload: 1.4, ammo: 420, pol: "-" },
  { id: "Akstiletto", name: "akstiletto", tags: ["Gun", "Secondary"], dmg: [["Slash", 8.4], ["Puncture", 2.8], ["Impact", 16.8]], accuracy: 23.5, fireRate: 10, critChance: 0.18, critMul: 1.8, status: 0.18, magazine: 28, reload: 1.1, ammo: 210, pol: "-" },
  { id: "Akstiletto Prime", name: "akstilettoPrime", rivenName: "Akstiletto", tags: ["Gun", "Secondary"], dmg: [["Slash", 10.8], ["Puncture", 3.6], ["Impact", 21.6]], accuracy: 23.5, fireRate: 7.08, critChance: 0.15, critMul: 2, status: 0.3, magazine: 40, reload: 1.1, ammo: 210, pol: "-r" },
  { id: "Akvasto", name: "akvasto", tags: ["Gun", "Secondary"], dmg: [["Slash", 29], ["Puncture", 14.5], ["Impact", 14.5]], accuracy: 11.1, fireRate: 8.67, critChance: 0.16, critMul: 1.8, status: 0.12, magazine: 12, reload: 2, ammo: 210 },
  { id: "Akvasto Prime", name: "akvastoPrime", rivenName: "Akvasto", tags: ["Gun", "Secondary"], dmg: [["Slash", 46.2], ["Puncture", 9.9], ["Impact", 9.9]], accuracy: 16, fireRate: 6.33, critChance: 0.22, critMul: 2.4, status: 0.22, magazine: 12, reload: 1.4, ammo: 210, pol: "rr" },
  { id: "Akzani", name: "akzani", tags: ["Gun", "Secondary"], dmg: [["Slash", 1.8], ["Puncture", 8.4], ["Impact", 1.8]], accuracy: 16.7, fireRate: 20, critChance: 0.14, critMul: 2, status: 0.14, magazine: 100, reload: 2, ammo: 400, pol: "-" },
  { id: "Amprex", name: "amprex", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Continuous"], dmg: [["Electricity", 22]], accuracy: 12.5, fireRate: 12, critChance: 0.32, critMul: 2.2, status: 0.22, magazine: 100, reload: 2.6, ammo: 700, rangeLimit: 18 },
  { id: "Angstrum", name: "angstrum", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Blast", 200]], accuracy: 26.7, fireRate: 1, critChance: 0.16, critMul: 2, status: 0.22, magazine: 3, reload: 2.5, ammo: 18, prjSpeed: 150, pol: "d" },
  { id: "Prisma Angstrum", name: "prismaAngstrum", rivenName: "Angstrum", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Blast", 200]], accuracy: 26.7, fireRate: 1, critChance: 0.18, critMul: 2.2, status: 0.26, magazine: 3, reload: 1.8, ammo: 18, pol: "d" },
  { id: "Arca Plasmor", name: "arcaPlasmor", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Radiation", 600]], accuracy: 9.1, fireRate: 1.1, critChance: 0.22, critMul: 1.6, status: 0.28, magazine: 10, reload: 2.8, ammo: 48, prjSpeed: 60, rangeLimit: 30, pol: "rr" },
  { id: "Arca Scisco", name: "arcaScisco", tags: ["Gun", "Secondary"], dmg: [["Slash", 24], ["Puncture", 36]], accuracy: 32, fireRate: 4.667, critChance: 0.18, critMul: 1.6, status: 0.26, magazine: 36, reload: 2.2, ammo: 288, pol: "rr" },
  { id: "Argonak", name: "argonak", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 26.2], ["Puncture", 6.3], ["Impact", 24.5]], accuracy: 28.6, fireRate: 6, critChance: 0.09, critMul: 1.5, status: 0.27, magazine: 43, reload: 2.4, ammo: 473, pol: "r-" },
  { id: "Argonak (semi-auto)", name: "argonak", rivenName: "Argonak", mode: "semiAuto", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 26.2], ["Puncture", 6.3], ["Impact", 24.5]], accuracy: 28.6, fireRate: 4.33, critChance: 0.27, critMul: 2.3, status: 0.19, magazine: 43, reload: 2.4, ammo: 473, pol: "r-" },
  { id: "Astilla", name: "astilla", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 78], ["Puncture", 42], ["Impact", 70]], accuracy: 25, fireRate: 4.33, critChance: 0.17, critMul: 1.9, status: 0.33, magazine: 16, reload: 2, ammo: 112, prjSpeed: 75, pol: "r-" },
  { id: "Atomos", name: "atomos", tags: ["Gun", "Secondary", "Continuous"], dmg: [["Heat", 29]], accuracy: 12.5, fireRate: 8, critChance: 0.15, critMul: 1.7, status: 0.21, magazine: 70, reload: 2, ammo: 350, rangeLimit: 15, pol: "d" },
  { id: "Attica", name: "attica", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 16], ["Puncture", 60], ["Impact", 4]], accuracy: 40, fireRate: 3.67, critChance: 0.25, critMul: 3, status: 0.1, magazine: 20, reload: 2.8, ammo: 540, prjSpeed: 90, pol: "r" },
  { id: "Azima", name: "azima", tags: ["Gun", "Secondary"], dmg: [["Slash", 13], ["Puncture", 5], ["Impact", 2]], accuracy: 15.4, fireRate: 10, critChance: 0.16, critMul: 2, status: 0.16, magazine: 75, reload: 1.4, ammo: 525, pol: "-r" },
  { id: "Ballistica", name: "ballistica", tags: ["Gun", "Secondary"], dmg: [["Slash", 2.5], ["Puncture", 20], ["Impact", 2.5]], accuracy: 4, fireRate: 11.43, critChance: 0.15, critMul: 1.5, status: 0.1, magazine: 16, reload: 2, ammo: 210, prjSpeed: 100, pol: "d" },
  { id: "Ballistica (charged)", name: "ballistica", rivenName: "Ballistica", mode: "charged", tags: ["Gun", "Secondary", "Charge"], dmg: [["Slash", 10], ["Puncture", 80], ["Impact", 10]], accuracy: 4, fireRate: 3.33, critChance: 0.15, critMul: 1.5, status: 0.1, magazine: 16, reload: 2, ammo: 210, prjSpeed: 100, pol: "d" },
  { id: "Rakta Ballistica", name: "raktaBallistica", rivenName: "Ballistica", tags: ["Gun", "Secondary"], dmg: [["Slash", 3.75], ["Puncture", 67.5], ["Impact", 3.75]], accuracy: 4, fireRate: 11.43, critChance: 0.2, critMul: 1.5, status: 0.1, magazine: 20, reload: 2, ammo: 210, prjSpeed: 100, pol: "dr" },
  { id: "Rakta Ballistica (charged)", name: "raktaBallistica", rivenName: "Ballistica", mode: "charged", tags: ["Gun", "Secondary", "Charge"], dmg: [["Slash", 15], ["Puncture", 270], ["Impact", 15]], accuracy: 4, bullets: 4, fireRate: 1, critChance: 0.2, critMul: 1.5, status: 0.1, magazine: 5, reload: 2, ammo: 210, prjSpeed: 100, pol: "dr" },
  { id: "Ballistica Prime", name: "ballisticaPrime", rivenName: "Ballistica", tags: ["Gun", "Secondary"], dmg: [["Slash", 15.2], ["Puncture", 20.9], ["Impact", 1.9]], accuracy: 4, fireRate: 11.43, critChance: 0.2, critMul: 2, status: 0.2, magazine: 32, reload: 1.2, ammo: 210, prjSpeed: 100, pol: "-rr" },
  { id: "Ballistica Prime (charged)", name: "ballisticaPrime", rivenName: "Ballistica", mode: "charged", tags: ["Gun", "Secondary", "Charge"], dmg: [["Slash", 121.6], ["Puncture", 167.2], ["Impact", 15.2]], accuracy: 4, bullets: 4, fireRate: 1.25, critChance: 0.2, critMul: 2, status: 0.2, magazine: 32, reload: 1.2, ammo: 210, prjSpeed: 100, pol: "-rr" },
  { id: "Battacor", name: "battacor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Puncture", 24], ["Magnetic", 42]], accuracy: 25, fireRate: 3.57, critChance: 0.32, critMul: 2.4, status: 0.18, magazine: 60, reload: 2, ammo: 720 },
  { id: "Baza", name: "baza", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 3.5], ["Puncture", 6.7], ["Impact", 5.8]], accuracy: 80, fireRate: 16.67, critChance: 0.26, critMul: 3, status: 0.1, magazine: 40, reload: 1.4, ammo: 800, pol: "r" },
  { id: "Boar", name: "boar", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 52.8], ["Puncture", 26.4], ["Impact", 96.8]], accuracy: 5, bullets: 8, fireRate: 4.17, critChance: 0.1, critMul: 1.5, status: 0.2, magazine: 20, reload: 2.7, ammo: 120 },
  { id: "Boar Prime", name: "boarPrime", rivenName: "Boar", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 64], ["Puncture", 48], ["Impact", 208]], accuracy: 5, bullets: 8, fireRate: 4.67, critChance: 0.15, critMul: 2, status: 0.3, magazine: 20, reload: 2.75, ammo: 120 },
  { id: "Bolto", name: "bolto", tags: ["Gun", "Secondary"], dmg: [["Puncture", 36], ["Impact", 4]], accuracy: 26.7, fireRate: 6.83, critChance: 0.16, critMul: 2.4, status: 0.022, magazine: 15, reload: 1.3, ammo: 210, prjSpeed: 75, pol: "d" },
  { id: "Boltor", name: "boltor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 2.5], ["Puncture", 20], ["Impact", 2.5]], accuracy: 25, fireRate: 8.75, critChance: 0.1, critMul: 1.8, status: 0.14, magazine: 60, reload: 2.6, ammo: 540, prjSpeed: 85, pol: "d" },
  { id: "Telos Boltor", name: "telosBoltor", rivenName: "Boltor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Puncture", 27], ["Impact", 3]], accuracy: 25, fireRate: 9.33, critChance: 0.3, critMul: 2.4, status: 0.16, magazine: 90, reload: 2.4, ammo: 540, prjSpeed: 65, pol: "dr" },
  { id: "Boltor Prime", name: "boltorPrime", rivenName: "Boltor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Puncture", 41.4], ["Impact", 4.6]], accuracy: 50, fireRate: 10, critChance: 0.12, critMul: 2, status: 0.32, magazine: 60, reload: 2.4, ammo: 540, prjSpeed: 100, pol: "dr" },
  { id: "Brakk", name: "brakk", tags: ["Gun", "Secondary"], dmg: [["Slash", 60], ["Puncture", 50], ["Impact", 90]], accuracy: 5.6, bullets: 10, fireRate: 5, critChance: 0.17, critMul: 2, status: 0.17, magazine: 5, reload: 1.05, ammo: 210, pol: "-r" },
  { id: "Braton", name: "braton", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 8.2], ["Puncture", 7.9], ["Impact", 7.9]], accuracy: 28.6, fireRate: 8.75, critChance: 0.12, critMul: 1.6, status: 0.06, magazine: 45, reload: 2, ammo: 540 },
  { id: "Braton Prime", name: "bratonPrime", rivenName: "Braton", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 21], ["Puncture", 12.25], ["Impact", 1.75]], accuracy: 28.6, fireRate: 9.58, critChance: 0.12, critMul: 2, status: 0.26, magazine: 75, reload: 2.2, ammo: 600 },
  { id: "Braton Vandal", name: "bratonVandal", rivenName: "Braton", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 21], ["Puncture", 1.75], ["Impact", 12.25]], accuracy: 33.3, fireRate: 7.5, critChance: 0.16, critMul: 2, status: 0.16, magazine: 50, reload: 1.8, ammo: 550, pol: "r" },
  { id: "Bronco", name: "bronco", tags: ["Gun", "Secondary"], dmg: [["Slash", 28], ["Puncture", 28], ["Impact", 224]], accuracy: 3.7, bullets: 7, fireRate: 5, critChance: 0.06, critMul: 2, status: 0.22, magazine: 2, reload: 1.05, ammo: 210 },
  { id: "Bronco Prime", name: "broncoPrime", tags: ["Gun", "Secondary"], rivenName: "Bronco", dmg: [["Slash", 35], ["Puncture", 35], ["Impact", 280]], accuracy: 3.7, bullets: 7, fireRate: 4.17, critChance: 0.06, critMul: 2, status: 0.3, magazine: 4, reload: 2, ammo: 210 },
  { id: "Burston", name: "burston", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 10], ["Puncture", 10], ["Impact", 10]], accuracy: 25, fireRate: 7.83, critChance: 0.06, critMul: 1.6, status: 0.18, magazine: 45, reload: 2, ammo: 540, pol: "r" },
  { id: "Burston Prime", name: "burstonPrime", rivenName: "Burston", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 14.4], ["Puncture", 10.8], ["Impact", 10.8]], accuracy: 25, fireRate: 13.64, critChance: 0.18, critMul: 1.8, status: 0.3, magazine: 45, reload: 2, ammo: 540, pol: "r" },
  { id: "Buzlok", name: "buzlok", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 6], ["Puncture", 24], ["Impact", 30]], accuracy: 13.3, fireRate: 6.25, critChance: 0.23, critMul: 2.5, status: 0.21, magazine: 50, reload: 3, ammo: 540, prjSpeed: 40 },
  { id: "Castanas", name: "castanas", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Electricity", 160]], accuracy: 100, fireRate: 3.33, critChance: 0.08, critMul: 1.5, status: 0.22, magazine: 2, reload: 1, ammo: 18, prjSpeed: 30, pol: "rr" },
  { id: "Sancti Castanas", name: "sanctiCastanas", rivenName: "Castanas", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Electricity", 300]], accuracy: 100, fireRate: 3.33, critChance: 0.24, critMul: 2, status: 0.34, magazine: 2, reload: 1, ammo: 18, prjSpeed: 30, pol: "rrd" },
  { id: "Cernos", name: "cernos", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 5.5], ["Puncture", 5.5], ["Impact", 99]], accuracy: 16.7, fireRate: 1.67, critChance: 0.2, critMul: 1.5, status: 0.18, magazine: 1, reload: 0.6, ammo: 72, pol: "r" },
  { id: "Cernos (charged)", name: "cernos", rivenName: "Cernos", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 11], ["Puncture", 11], ["Impact", 198]], accuracy: 16.7, fireRate: 2, critChance: 0.36, critMul: 2, status: 0.18, magazine: 1, reload: 0.6, ammo: 72, pol: "r" },
  { id: "Rakta Cernos", name: "raktaCernos", rivenName: "Cernos", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 7.5], ["Puncture", 7.5], ["Impact", 135]], accuracy: 16.7, fireRate: 1.67, critChance: 0.2, critMul: 2, status: 0.15, magazine: 1, reload: 0.6, ammo: 72, pol: "rr-" },
  { id: "Rakta Cernos (charged)", name: "raktaCernos", rivenName: "Cernos", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 12.5], ["Puncture", 12.5], ["Impact", 225]], accuracy: 16.7, fireRate: 4, critChance: 0.35, critMul: 2, status: 0.15, magazine: 1, reload: 0.6, ammo: 72, pol: "rr-" },
  { id: "Cernos Prime", name: "cernosPrime", rivenName: "Cernos", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 9], ["Puncture", 9], ["Impact", 162]], accuracy: 16.7, bullets: 3, fireRate: 1, critChance: 0.2, critMul: 1.5, status: 0.3, magazine: 1, reload: 0.65, ammo: 72, pol: "rr" },
  { id: "Cernos Prime (charged)", name: "cernosPrime", rivenName: "Cernos", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 18], ["Puncture", 18], ["Impact", 324]], accuracy: 16.7, bullets: 3, fireRate: 2, critChance: 0.35, critMul: 2, status: 0.3, magazine: 1, reload: 0.65, ammo: 72, pol: "rr" },
  { id: "Cestra", name: "cestra", tags: ["Gun", "Secondary"], dmg: [["Puncture", 20.8], ["Impact", 5.2]], accuracy: 33.3, fireRate: 8.33, critChance: 0.06, critMul: 1.6, status: 0.2, magazine: 60, reload: 2, ammo: 420, prjSpeed: 100 },
  { id: "Convectrix", name: "convectrix", tags: ["Gun", "Primary", "Shotgun", "Continuous"], dmg: [["Slash", 19.2], ["Puncture", 2.4], ["Impact", 2.4]], accuracy: 50, bullets: 2, fireRate: 12, critChance: 0.16, critMul: 2.4, status: 0.3, magazine: 70, reload: 2, ammo: 700, rangeLimit: 30 },
  { id: "Corinth (secondary)", name: "corinth", rivenName: "Corinth", mode: "secondary", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Blast", 404]], accuracy: 9.1, fireRate: 1.17, critChance: 0.04, critMul: 1.6, status: 0.28, magazine: 5, reload: 2.3, ammo: 132, prjSpeed: 70, rangeLimit: 20 },
  { id: "Corinth", name: "corinth", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 162], ["Puncture", 226.8], ["Impact", 151.2]], accuracy: 9.1, bullets: 6, fireRate: 1.17, critChance: 0.3, critMul: 2.8, status: 0.12, magazine: 5, reload: 2.3, ammo: 132, pol: "rr" },
  { id: "Cycron", name: "cycron", tags: ["Gun", "Secondary", "Continuous"], dmg: [["Radiation", 10], ["Slash", 5], ["Puncture", 8]], accuracy: 100, fireRate: 12, critChance: 0.12, critMul: 1.8, status: 0.3, magazine: 40, reload: 1, ammo: 40, rangeLimit: 24, pol: "--" },
  { id: "Daikyu", name: "daikyu", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 138], ["Puncture", 184], ["Impact", 138]], accuracy: 16.7, fireRate: 1, critChance: 0.2, critMul: 2, status: 0.5, magazine: 1, reload: 0.6, ammo: 72, prjSpeed: 85, pol: "r" },
  { id: "Dera", name: "dera", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 1.5], ["Puncture", 22.5], ["Impact", 6]], accuracy: 100, fireRate: 11.25, critChance: 0.08, critMul: 1.65, status: 0.22, magazine: 45, reload: 1.8, ammo: 540, prjSpeed: 100 },
  { id: "Dera Vandal", name: "deraVandal", rivenName: "Dera", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 1.6], ["Puncture", 24], ["Impact", 6.4]], accuracy: 100, fireRate: 11.25, critChance: 0.08, critMul: 2, status: 0.3, magazine: 60, reload: 1.8, ammo: 540, prjSpeed: 100 },
  { id: "Despair", name: "despair", tags: ["Gun", "Secondary", "Thrown"], dmg: [["Slash", 8.7], ["Puncture", 46.4], ["Impact", 2.9]], accuracy: 100, fireRate: 3.33, critChance: 0.16, critMul: 1.6, status: 0.16, magazine: 10, reload: 0.75, ammo: 210, prjSpeed: 70, pol: "rr" },
  { id: "Detron", name: "detron", tags: ["Gun", "Secondary"], dmg: [["Radiation", 280]], accuracy: 7.1, bullets: 7, fireRate: 3.33, critChance: 0.04, critMul: 1.5, status: 0.3, magazine: 5, reload: 1.05, ammo: 210, prjSpeed: 150 },
  { id: "Mara Detron", name: "maraDetron", rivenName: "Detron", tags: ["Gun", "Secondary"], dmg: [["Radiation", 280]], accuracy: 13.3, bullets: 7, fireRate: 3.33, critChance: 0.08, critMul: 1.5, status: 0.32, magazine: 8, reload: 1.05, ammo: 120 },
  { id: "Drakgoon", name: "drakgoon", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 276], ["Puncture", 34.5], ["Impact", 34.5]], accuracy: 1.4, bullets: 10, fireRate: 3.33, critChance: 0.075, critMul: 2, status: 0.23, magazine: 7, reload: 2.3, ammo: 120, prjSpeed: 100 },
  { id: "Drakgoon (charged)", name: "drakgoon", rivenName: "Drakgoon", mode: "charged", tags: ["Gun", "Primary", "Shotgun", "Charge"], dmg: [["Slash", 560], ["Puncture", 70], ["Impact", 70]], accuracy: 1.4, bullets: 10, fireRate: 2, critChance: 0.075, critMul: 2, status: 0.23, magazine: 7, reload: 2.3, ammo: 210, prjSpeed: 100 },
  { id: "Dread", name: "dread", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 117], ["Puncture", 6.5], ["Impact", 6.5]], accuracy: 16.7, fireRate: 1.43, critChance: 0.25, critMul: 2, status: 0.2, magazine: 1, reload: 0.7, ammo: 72, prjSpeed: 70, pol: "rr" },
  { id: "Dread (charged)", name: "dread", rivenName: "Dread", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 180], ["Puncture", 10], ["Impact", 10]], accuracy: 16.7, fireRate: 2, critChance: 0.5, critMul: 2, status: 0.2, magazine: 1, reload: 0.7, ammo: 72, prjSpeed: 85 },
  { id: "Dual Cestra", name: "dualCestra", tags: ["Gun", "Secondary"], dmg: [["Puncture", 20], ["Impact", 5]], accuracy: 20, fireRate: 12.5, critChance: 0.06, critMul: 1.6, status: 0.2, magazine: 120, reload: 3.5, ammo: 480, prjSpeed: 100, pol: "r" },
  { id: "Secura Dual Cestra", name: "securaDualCestra", rivenName: "Dual Cestra", tags: ["Gun", "Secondary"], dmg: [["Puncture", 22.4], ["Impact", 5.6]], accuracy: 20, fireRate: 12.5, critChance: 0.16, critMul: 1.6, status: 0.28, magazine: 120, reload: 3.5, ammo: 480, pol: "r-" },
  { id: "Dual Toxocyst", name: "dualToxocyst", tags: ["Gun", "Secondary"], dmg: [["Slash", 7.5], ["Puncture", 60], ["Impact", 7.5]], accuracy: 16, fireRate: 1, critChance: 0.05, critMul: 2, status: 0.37, magazine: 12, reload: 2.3, ammo: 210, pol: "r-" },
  { id: "Embolist", name: "embolist", tags: ["Gun", "Secondary", "Continuous"], dmg: [["Toxin", 35]], accuracy: 100, fireRate: 8, critChance: 0.03, critMul: 1.5, status: 0.41, magazine: 33, reload: 1.3, ammo: 210, rangeLimit: 9, pol: "-" },
  { id: "Euphona Prime (shotgun)", name: "euphonaPrime", rivenName: "Euphona Prime", mode: "shotgun", tags: ["Gun", "Secondary"], dmg: [["Slash", 660], ["Puncture", 176], ["Impact", 44]], accuracy: 3.2, bullets: 10, fireRate: 1.5, critChance: 0.02, critMul: 2, status: 0.3, magazine: 5, reload: 2, ammo: 40, pol: "-" },
  { id: "Euphona Prime", name: "euphonaPrime", tags: ["Gun", "Secondary"], dmg: [["Slash", 16.25], ["Puncture", 16.25], ["Impact", 292.5]], accuracy: 100, fireRate: 1.5, critChance: 0.3, critMul: 2.5, status: 0.02, magazine: 5, reload: 2, ammo: 40, prjSpeed: 180, pol: "rrr" },
  { id: "Exergis", name: "exergis", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 780], ["Puncture", 360], ["Impact", 60], ["Radiation", 420]], accuracy: 15.4, bullets: 3, fireRate: 3.33, critChance: 0.08, critMul: 1.4, status: 0.36, magazine: 1, reload: 1.6, ammo: 90, prjSpeed: 100 },
  { id: "Ferrox", name: "ferrox", tags: ["Gun", "Primary", "AssaultRifle", "Rifle"], dmg: [["Slash", 70], ["Puncture", 245], ["Impact", 35]], accuracy: 16.7, fireRate: 2, critChance: 0.32, critMul: 2.8, status: 0.1, magazine: 10, reload: 1.8, ammo: 540, prjSpeed: 70, pol: "rd" },
  { id: "Flux Rifle", name: "fluxRifle", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Continuous"], dmg: [["Slash", 17.2], ["Puncture", 4.8]], accuracy: 100, fireRate: 12, critChance: 0.1, critMul: 2, status: 0.24, magazine: 50, reload: 1.25, ammo: 50, rangeLimit: 30 },
  { id: "Furis", name: "furis", tags: ["Gun", "Secondary"], dmg: [["Slash", 2.9], ["Puncture", 14], ["Impact", 3.1]], accuracy: 15.4, fireRate: 10, critChance: 0.05, critMul: 2, status: 0.12, magazine: 35, reload: 1.4, ammo: 210, pol: "-" },
  { id: "Dex Furis", name: "dexFuris", rivenName: "Afuris", tags: ["Gun", "Secondary"], dmg: [["Slash", 2.4], ["Puncture", 11.2], ["Impact", 2.4]], accuracy: 15.4, fireRate: 20, critChance: 0.14, critMul: 2, status: 0.28, magazine: 100, reload: 2, ammo: 400, pol: "-" },
  { id: "Fusilai", name: "fusilai", tags: ["Gun", "Secondary", "Thrown"], dmg: [["Slash", 46.2], ["Puncture", 30.8]], accuracy: 100, fireRate: 2.83, critChance: 0.23, critMul: 1.7, status: 0.29, magazine: 6, reload: 0.8, ammo: 72, prjSpeed: 70, pol: "r" },
  { id: "Fusilai (secondary)", name: "fusilai", rivenName: "Fusilai", mode: "secondary", tags: ["Gun", "Secondary", "Thrown"], dmg: [["Slash", 138.6], ["Puncture", 92.4]], accuracy: 100, bullets: 3, fireRate: 1.5, critChance: 0.03, critMul: 1.5, status: 0.37, magazine: 6, reload: 0.8, ammo: 72, ammoCost: 3, prjSpeed: 70, pol: "r" },
  { id: "Gammacor", name: "gammacor", tags: ["Gun", "Secondary"], dmg: [["Magnetic", 16]], accuracy: 100, fireRate: 12, critChance: 0.08, critMul: 1.8, status: 0.2, magazine: 60, reload: 1.4, ammo: 240, rangeLimit: 25, pol: "d" },
  { id: "Synoid Gammacor", name: "synoidGammacor", rivenName: "Gammacor", tags: ["Gun", "Secondary", "Continuous"], dmg: [["Magnetic", 20]], accuracy: 100, fireRate: 12, critChance: 0.2, critMul: 2, status: 0.28, magazine: 80, reload: 1.8, ammo: 400, rangeLimit: 40, pol: "d-" },
  { id: "Glaxion", name: "glaxion", tags: ["Gun", "Primary", "Rifle", "Continuous"], dmg: [["Cold", 26]], accuracy: 100, fireRate: 12, critChance: 0.08, critMul: 2, status: 0.34, magazine: 80, reload: 2.2, ammo: 720, rangeLimit: 24 },
  { id: "Gorgon", name: "gorgon", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 2.5], ["Puncture", 3.8], ["Impact", 18.8]], accuracy: 12.5, fireRate: 12.5, critChance: 0.17, critMul: 1.5, status: 0.09, magazine: 90, reload: 4.2, ammo: 540 },
  { id: "Gorgon Wraith", name: "gorgonWraith", rivenName: "Gorgon", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 1.3], ["Puncture", 2.7], ["Impact", 23]], accuracy: 16.7, fireRate: 13.3, critChance: 0.15, critMul: 1.9, status: 0.21, magazine: 90, reload: 3, ammo: 900 },
  { id: "Prisma Gorgon", name: "prismaGorgon", rivenName: "Gorgon", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 2.3], ["Puncture", 3.5], ["Impact", 17.3]], accuracy: 14.3, fireRate: 14.17, critChance: 0.3, critMul: 2.3, status: 0.15, magazine: 120, reload: 3, ammo: 840 },
  { id: "Grakata", name: "grakata", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 2.9], ["Puncture", 3.7], ["Impact", 4.4]], accuracy: 28.6, fireRate: 20, critChance: 0.25, critMul: 2, status: 0.2, magazine: 60, reload: 2.4, ammo: 750 },
  { id: "Prisma Grakata", name: "prismaGrakata", rivenName: "Grakata", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 4], ["Puncture", 5], ["Impact", 6]], accuracy: 28.6, fireRate: 21.67, critChance: 0.25, critMul: 2.5, status: 0.21, magazine: 120, reload: 2, ammo: 1000 },
  { id: "Grinlok", name: "grinlok", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 74.8], ["Puncture", 18.7], ["Impact", 93.5]], accuracy: 44.4, fireRate: 1.67, critChance: 0.15, critMul: 2.5, status: 0.35, magazine: 9, reload: 1.7, ammo: 540, pol: "r" },
  { id: "Harpak (charged)", name: "harpak", rivenName: "Harpak", mode: "charged", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Charge"], dmg: [["Slash", 10], ["Puncture", 50], ["Impact", 40]], accuracy: 18.2, fireRate: 1.5, critChance: 0.2, critMul: 2.3, status: 0.17, magazine: 45, reload: 2, ammo: 540, prjSpeed: 40, pol: "r" },
  { id: "Harpak", name: "harpak", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 7.5], ["Puncture", 37.5], ["Impact", 5]], accuracy: 18.2, fireRate: 6, critChance: 0.2, critMul: 2.3, status: 0.17, magazine: 45, reload: 2, ammo: 540, prjSpeed: 40, pol: "r" },
  { id: "Hek", name: "hek", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 105], ["Puncture", 341.25], ["Impact", 78.75]], accuracy: 9.1, bullets: 7, fireRate: 2.17, critChance: 0.1, critMul: 2, status: 0.25, magazine: 4, reload: 2, ammo: 120 },
  { id: "Vaykor Hek", name: "vaykorHek", tags: ["Gun", "Primary", "Shotgun"], rivenName: "Hek", dmg: [["Slash", 105], ["Puncture", 341.25], ["Impact", 78.75]], accuracy: 9.1, bullets: 7, fireRate: 3, critChance: 0.25, critMul: 2, status: 0.25, magazine: 8, reload: 2.25, ammo: 120, pol: "dr" },
  { id: "Hema", name: "hema", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Viral", 47]], accuracy: 20, fireRate: 6, critChance: 0.11, critMul: 2, status: 0.25, magazine: 60, reload: 2, ammo: 540, prjSpeed: 70, pol: "r" },
  { id: "Hikou", name: "hikou", tags: ["Gun", "Secondary", "Thrown"], dmg: [["Slash", 7.8], ["Puncture", 15.6], ["Impact", 2.6]], accuracy: 100, fireRate: 6.67, critChance: 0.04, critMul: 1.6, status: 0.1, magazine: 20, reload: 0.75, ammo: 210, prjSpeed: 70, pol: "rr" },
  { id: "Hikou Prime", name: "hikouPrime", tags: ["Gun", "Secondary", "Thrown"], rivenName: "Hikou", dmg: [["Slash", 1.8], ["Puncture", 30.6], ["Impact", 3.6]], accuracy: 100, fireRate: 5.83, critChance: 0.06, critMul: 1.8, status: 0.28, magazine: 26, reload: 0.5, ammo: 210, prjSpeed: 70, pol: "rr" },
  { id: "Hind", name: "hind", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 15], ["Puncture", 7.5], ["Impact", 7.5]], accuracy: 33.3, fireRate: 6.25, critChance: 0.07, critMul: 1.5, status: 0.15, magazine: 65, reload: 2, ammo: 540, pol: "r" },
  { id: "Hystrix", name: "hystrix", tags: ["Gun", "Secondary"], dmg: [["Slash", 2.9], ["Puncture", 31], ["Impact", 2.2]], accuracy: 14.3, fireRate: 7, critChance: 0.24, critMul: 2.2, status: 0.1, magazine: 16, reload: 1.7, ammo: 210, prjSpeed: 70, pol: "r" },
  { id: "Ignis", name: "ignis", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Continuous"], dmg: [["Heat", 33]], accuracy: 100, fireRate: 8, critChance: 0.11, critMul: 2, status: 0.27, magazine: 150, reload: 2, ammo: 750, rangeLimit: 20 },
  { id: "Ignis Wraith", name: "ignisWraith", rivenName: "Ignis", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Continuous"], dmg: [["Heat", 35]], accuracy: 100, fireRate: 8, critChance: 0.17, critMul: 2.5, status: 0.29, magazine: 200, reload: 1.7, ammo: 800, rangeLimit: 27 },
  { id: "Javlok", name: "javlok", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Heat", 230]], accuracy: 100, fireRate: 3.33, critChance: 0.2, critMul: 2, status: 0.25, magazine: 6, reload: 1.9, ammo: 540, prjSpeed: 60, pol: "rr" },
  { id: "Karak", name: "karak", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 7.3], ["Puncture", 8.7], ["Impact", 13]], accuracy: 28.6, fireRate: 11.67, critChance: 0.09, critMul: 1.5, status: 0.15, magazine: 30, reload: 2, ammo: 540, pol: "r" },
  { id: "Karak Wraith", name: "karakWraith", rivenName: "Karak", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 7.8], ["Puncture", 9.3], ["Impact", 14.1]], accuracy: 28.6, fireRate: 11.67, critChance: 0.13, critMul: 2, status: 0.25, magazine: 60, reload: 2, ammo: 540, pol: "r" },
  { id: "Knell", name: "knell", tags: ["Gun", "Secondary"], dmg: [["Slash", 18], ["Puncture", 69], ["Impact", 63]], accuracy: 32, fireRate: 4, critChance: 0.2, critMul: 1.5, status: 0.05, magazine: 1, reload: 0, ammo: 10 },
  { id: "Kohm", name: "kohm", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 18], ["Puncture", 6], ["Impact", 6]], accuracy: 3.6, fireRate: 3.67, critChance: 0.11, critMul: 2.3, status: 0.25, magazine: 245, reload: 2, ammo: 960, pol: "d" },
  { id: "Kohm (fastest)", name: "kohm", rivenName: "Kohm", mode: "fastest", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 216], ["Puncture", 72], ["Impact", 72]], accuracy: 3.6, bullets: 12, fireRate: 3.67, critChance: 0.11, critMul: 2.3, status: 0.25, magazine: 245, ammoCost: 4, reload: 2, ammo: 240, pol: "d" },
  { id: "Kohmak", name: "kohmak", tags: ["Gun", "Secondary"], dmg: [["Slash", 90], ["Puncture", 30], ["Impact", 30]], accuracy: 3.6, bullets: 5, fireRate: 5, critChance: 0.11, critMul: 2, status: 0.23, magazine: 40, reload: 2, ammo: 210 },
  { id: "Kraken", name: "kraken", tags: ["Gun", "Secondary"], dmg: [["Slash", 6.1], ["Puncture", 6.1], ["Impact", 36.8]], accuracy: 16, fireRate: 4.42, critChance: 0.05, critMul: 2, status: 0.13, magazine: 14, reload: 2.45, ammo: 210 },
  { id: "Kulstar", name: "kulstar", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Blast", 300], ["Impact", 200]], accuracy: 26.7, fireRate: 2, critChance: 0.17, critMul: 2.3, status: 0.19, magazine: 3, reload: 2, ammo: 15, pol: "d" },
  { id: "Kunai", name: "kunai", tags: ["Gun", "Secondary", "Thrown"], dmg: [["Slash", 6.9], ["Puncture", 34.5], ["Impact", 4.6]], accuracy: 100, fireRate: 3.33, critChance: 0.08, critMul: 1.6, status: 0.08, magazine: 10, reload: 0.8, ammo: 210, pol: "rr" },
  { id: "Lanka", name: "lanka", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Electricity", 200]], accuracy: 100, fireRate: 1, critChance: 0.25, critMul: 2, status: 0.25, magazine: 10, reload: 2, ammo: 72, prjSpeed: 200 },
  { id: "Lanka (charged)", name: "lanka", rivenName: "Lanka", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Sniper", "Charge"], dmg: [["Electricity", 525]], accuracy: 100, fireRate: 1, critChance: 0.25, critMul: 2, status: 0.25, magazine: 10, reload: 2, ammo: 72, prjSpeed: 200 },
  { id: "Lato", name: "lato", tags: ["Gun", "Secondary"], dmg: [["Slash", 15], ["Puncture", 7.5], ["Impact", 7.5]], accuracy: 18.2, fireRate: 6.67, critChance: 0.1, critMul: 1.8, status: 0.06, magazine: 15, reload: 1, ammo: 210 },
  { id: "Lato Prime", name: "latoPrime", rivenName: "Lato", tags: ["Gun", "Secondary"], dmg: [["Slash", 33.6], ["Puncture", 9.6], ["Impact", 4.8]], accuracy: 18.2, fireRate: 6.67, critChance: 0.3, critMul: 2, status: 0.2, magazine: 15, reload: 1, ammo: 210, pol: "r-" },
  { id: "Lato Vandal", name: "latoVandal", rivenName: "Lato", tags: ["Gun", "Secondary"], dmg: [["Slash", 27.6], ["Puncture", 11.5], ["Impact", 6.9]], accuracy: 23, fireRate: 5, critChance: 0.26, critMul: 2.4, status: 0.1, magazine: 15, reload: 1, ammo: 210, pol: "r" },
  { id: "Latron", name: "latron", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 8.25], ["Puncture", 38.5], ["Impact", 8.25]], accuracy: 28.6, fireRate: 4.17, critChance: 0.12, critMul: 2, status: 0.12, magazine: 15, reload: 2.4, ammo: 540, pol: "r" },
  { id: "Latron Prime", name: "latronPrime", rivenName: "Latron", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 9], ["Puncture", 72], ["Impact", 9]], accuracy: 28.6, fireRate: 4.17, critChance: 0.22, critMul: 2.8, status: 0.26, magazine: 15, reload: 2.4, ammo: 540, pol: "r-" },
  { id: "Latron Wraith", name: "latronWraith", rivenName: "Latron", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 3], ["Puncture", 42], ["Impact", 15]], accuracy: 28.6, fireRate: 5.42, critChance: 0.26, critMul: 2.8, status: 0.14, magazine: 15, reload: 2.4, ammo: 540, pol: "r" },
  { id: "Lenz", name: "lenz", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Cold", 10], ["Blast", 330], ["Impact", 50]], accuracy: 16.7, fireRate: 0.83, critChance: 0.5, critMul: 2, status: 0.05, magazine: 1, reload: 0.6, ammo: 6, prjSpeed: 85, pol: "--" },
  { id: "Lex", name: "lex", tags: ["Gun", "Secondary"], dmg: [["Slash", 13], ["Puncture", 104], ["Impact", 13]], accuracy: 16, fireRate: 1.08, critChance: 0.2, critMul: 2, status: 0.1, magazine: 6, reload: 2.35, ammo: 210, pol: "r" },
  { id: "Lex Prime", name: "lexPrime", rivenName: "Lex", tags: ["Gun", "Secondary"], dmg: [["Slash", 15], ["Puncture", 120], ["Impact", 15]], accuracy: 16, fireRate: 2.08, critChance: 0.25, critMul: 2, status: 0.25, magazine: 8, reload: 2.35, ammo: 210, pol: "r" },
  { id: "Magnus", name: "magnus", tags: ["Gun", "Secondary"], dmg: [["Slash", 20.9], ["Puncture", 20.9], ["Impact", 34.2]], accuracy: 16, fireRate: 5.83, critChance: 0.22, critMul: 2, status: 0.22, magazine: 8, reload: 1.4, ammo: 210, pol: "r" },
  { id: "Marelok", name: "marelok", tags: ["Gun", "Secondary"], dmg: [["Slash", 64], ["Puncture", 16], ["Impact", 80]], accuracy: 10, fireRate: 2, critChance: 0.15, critMul: 1.5, status: 0.3, magazine: 6, reload: 1.67, ammo: 210, pol: "r" },
  { id: "Vaykor Marelok", name: "vaykorMarelok", rivenName: "Marelok", tags: ["Gun", "Secondary"], dmg: [["Slash", 48], ["Puncture", 16], ["Impact", 96]], accuracy: 10, fireRate: 2, critChance: 0.2, critMul: 1.5, status: 0.35, magazine: 10, reload: 1.67, ammo: 210, pol: "rd" },
  { id: "Miter", name: "miter", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 90], ["Puncture", 5], ["Impact", 5]], accuracy: 100, fireRate: 2.5, critChance: 0.05, critMul: 2, status: 0.25, magazine: 20, reload: 2, ammo: 72, prjSpeed: 60, pol: "-" },
  { id: "Miter (charged)", name: "miter", rivenName: "Miter", mode: "charged", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Charge"], dmg: [["Slash", 225], ["Puncture", 12.5], ["Impact", 12.5]], accuracy: 100, fireRate: 1.33, critChance: 0.1, critMul: 2, status: 0.5, magazine: 20, reload: 2, ammo: 72, prjSpeed: 60, pol: "-" },
  { id: "Mutalist Cernos", name: "mutalistCernos", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 6], ["Puncture", 6], ["Impact", 108]], accuracy: 16.7, fireRate: 1.67, critChance: 0.1, critMul: 1.5, status: 0.49, magazine: 1, reload: 0.6, ammo: 72, prjSpeed: 70, pol: "-" },
  { id: "Mutalist Cernos (charged)", name: "mutalistCernos", rivenName: "Mutalist Cernos", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 11.25], ["Puncture", 11.25], ["Impact", 202.5]], accuracy: 16.7, fireRate: 2, critChance: 0.15, critMul: 2, status: 0.49, magazine: 1, reload: 0.6, ammo: 72, prjSpeed: 85, pol: "-" },
  { id: "Mutalist Quanta", name: "mutalistQuanta", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 7.5], ["Puncture", 15], ["Impact", 2.5]], accuracy: 100, fireRate: 10, critChance: 0.025, critMul: 1.5, status: 0.15, magazine: 60, reload: 3, ammo: 540, prjSpeed: 100, pol: "d" },
  { id: "Nagantaka", name: "nagantaka", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 143.1], ["Puncture", 14.3], ["Impact", 1.6]], accuracy: 40, fireRate: 2.5, critChance: 0.15, critMul: 2.3, status: 0.39, magazine: 9, reload: 2.3, ammo: 72, prjSpeed: 100, pol: "r" },
  { id: "Nagantaka (burst)", name: "nagantaka", rivenName: "Nagantaka", mode: "burst", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 143.1], ["Puncture", 14.3], ["Impact", 1.6]], accuracy: 40, fireRate: 5.81, critChance: 0.15, critMul: 2.3, status: 0.39, magazine: 9, reload: 2.3, ammo: 72, prjSpeed: 100, pol: "r" },
  { id: "Nukor", name: "nukor", tags: ["Gun", "Secondary", "Continuous"], dmg: [["Radiation", 22]], accuracy: 100, fireRate: 10, critChance: 0.03, critMul: 4, status: 0.29, magazine: 50, reload: 2, ammo: 210, rangeLimit: 25 },
  { id: "Ocucor", name: "ocucor", tags: ["Gun", "Secondary", "Continuous"], dmg: [["Puncture", 2], ["Radiation", 20]], accuracy: 100, fireRate: 12, critChance: 0.16, critMul: 1.8, status: 0.24, magazine: 60, reload: 1.6, ammo: 300, rangeLimit: 20 },
  { id: "Ogris", name: "ogris", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher", "Charge"], dmg: [["Blast", 500]], accuracy: 100, fireRate: 1.5, critChance: 0.05, critMul: 2, status: 0.35, magazine: 5, reload: 2.5, ammo: 20, prjSpeed: 40 },
  { id: "Opticor", name: "opticor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Charge"], dmg: [["Slash", 50], ["Puncture", 850], ["Impact", 100]], accuracy: 100, fireRate: 0.5, critChance: 0.2, critMul: 2.5, status: 0.2, magazine: 5, reload: 2, ammo: 540, rangeLimit: 300, pol: "r" },
  { id: "Pandero", name: "pandero", tags: ["Gun", "Secondary"], dmg: [["Slash", 36], ["Puncture", 18], ["Impact", 18]], accuracy: 16, fireRate: 3, critChance: 0.3, critMul: 2.8, status: 0.1, magazine: 8, reload: 1, ammo: 210 },
  { id: "Pandero (burst)", name: "pandero", rivenName: "Pandero", mode: "burst", tags: ["Gun", "Secondary"], dmg: [["Slash", 36], ["Puncture", 18], ["Impact", 18]], accuracy: 16, fireRate: 7.69, critChance: 0.3, critMul: 2.8, status: 0.1, magazine: 8, reload: 1, ammo: 210 },
  { id: "Panthera (secondary)", name: "panthera", rivenName: "Panthera", mode: "secondary", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 80], ["Puncture", 10], ["Impact", 10]], accuracy: 100, fireRate: 2, critChance: 0.25, critMul: 2, status: 0.35, magazine: 60, reload: 2, ammo: 540, pol: "-" },
  { id: "Panthera", name: "panthera", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 70], ["Puncture", 10], ["Impact", 20]], accuracy: 100, fireRate: 3, critChance: 0.12, critMul: 2, status: 0.24, magazine: 60, reload: 2, ammo: 540, prjSpeed: 40, pol: "-" },
  { id: "Paracyst", name: "paracyst", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Toxin", 33]], accuracy: 25, fireRate: 11.11, critChance: 0.1, critMul: 2, status: 0.3, magazine: 60, reload: 2, ammo: 540, prjSpeed: 70, pol: "d" },
  { id: "Paris", name: "paris", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 18], ["Puncture", 96], ["Impact", 6]], accuracy: 16.7, fireRate: 1.54, critChance: 0.2, critMul: 1.5, status: 0.1, magazine: 1, reload: 0.65, ammo: 72, prjSpeed: 70, pol: "-" },
  { id: "Paris (charged)", name: "paris", rivenName: "Paris", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 27], ["Puncture", 144], ["Impact", 9]], accuracy: 16.7, fireRate: 2, critChance: 0.3, critMul: 2, status: 0.1, magazine: 1, reload: 0.65, ammo: 72, prjSpeed: 85, pol: "-" },
  { id: "Paris Prime", name: "parisPrime", rivenName: "Paris", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 22.75], ["Puncture", 104], ["Impact", 3.25]], accuracy: 16.7, fireRate: 1.43, critChance: 0.25, critMul: 2, status: 0.2, magazine: 1, reload: 0.7, ammo: 72, prjSpeed: 70, pol: "-r" },
  { id: "Paris Prime (charged)", name: "parisPrime", rivenName: "Paris", mode: "charged", tags: ["Gun", "Primary", "Rifle", "Bow", "Charge"], dmg: [["Slash", 45.5], ["Puncture", 208], ["Impact", 6.5]], accuracy: 16.7, fireRate: 2, critChance: 0.45, critMul: 2, status: 0.2, magazine: 1, reload: 0.7, ammo: 72, prjSpeed: 85, pol: "-r" },
  { id: "Penta", name: "penta", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher"], dmg: [["Blast", 350], ["Impact", 75]], accuracy: 100, fireRate: 1, critChance: 0.1, critMul: 2, status: 0.1, magazine: 5, reload: 2.5, ammo: 20, prjSpeed: 20 },
  { id: "Carmine Penta", name: "carminePenta", rivenName: "Penta", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher"], dmg: [["Blast", 350], ["Impact", 75]], accuracy: 100, fireRate: 2.7, critChance: 0.1, critMul: 2, status: 0.1, magazine: 10, reload: 2.5, ammo: 20, prjSpeed: 20 },
  { id: "Secura Penta", name: "securaPenta", rivenName: "Penta", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher"], dmg: [["Blast", 300], ["Impact", 75]], accuracy: 100, fireRate: 2, critChance: 0.26, critMul: 2, status: 0.26, magazine: 7, reload: 2.5, ammo: 28, prjSpeed: 25, pol: "-dr" },
  { id: "Phage", name: "phage", tags: ["Gun", "Primary", "Shotgun", "Continuous"], dmg: [["Viral", 30]], accuracy: 50, bullets: 7, fireRate: 12, critChance: 0.19, critMul: 2, status: 0.31, magazine: 90, reload: 2, ammo: 120, rangeLimit: 25, pol: "-" },
  { id: "Phantasma", name: "phantasma", tags: ["Gun", "Primary", "Shotgun", "Continuous"], dmg: [["Impact", 25], ["Radiation", 50]], accuracy: 100, bullets: 5, fireRate: 12, critChance: 0.03, critMul: 1.5, status: 0.37, magazine: 11, reload: 0.5, ammo: 275, rangeLimit: 20, pol: "-r" },
  { id: "Phantasma (charged)", name: "phantasma", rivenName: "Phantasma", mode: "charged", tags: ["Gun", "Primary", "Shotgun", "Charge"], dmg: [["Impact", 15], ["Radiation", 73]], accuracy: 100, fireRate: 2, critChance: 0.03, critMul: 1.5, status: 0.37, magazine: 11, reload: 0.5, ammo: 275, pol: "-r" },
  { id: "Plinx", name: "plinx", tags: ["Gun", "Secondary"], dmg: [["Puncture", 26], ["Heat", 20]], accuracy: 50, fireRate: 3.33, critChance: 0.32, critMul: 3, status: 0.04, magazine: 10, reload: 1, ammo: 210, rangeLimit: 20 },
  { id: "Pox", name: "pox", tags: ["Gun", "Secondary", "Thrown", "SecondUnique"], dmg: [["Toxin", 150]], accuracy: 100, fireRate: 2.08, critChance: 0.01, critMul: 2, status: 0.35, magazine: 4, reload: 1, ammo: 20, prjSpeed: 30, pol: "rr" },
  { id: "Pyrana", name: "pyrana", tags: ["Gun", "Secondary"], dmg: [["Slash", 211.2], ["Puncture", 26.4], ["Impact", 26.4]], accuracy: 5, bullets: 12, fireRate: 4.17, critChance: 0.2, critMul: 2, status: 0.1, magazine: 10, reload: 2, ammo: 210 },
  { id: "Pyrana Prime", name: "pyranaPrime", rivenName: "Pyrana", tags: ["Gun", "Secondary"], dmg: [["Slash", 201.6], ["Puncture", 19.2], ["Impact", 19.2]], accuracy: 6.1, bullets: 12, fireRate: 4, critChance: 0.24, critMul: 2.2, status: 0.12, magazine: 12, reload: 1.6, ammo: 210, pol: "rr" },
  { id: "Quanta", name: "quanta", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Continuous"], dmg: [["Electricity", 20]], accuracy: 100, fireRate: 12, critChance: 0.16, critMul: 2.2, status: 0.16, magazine: 60, reload: 2, ammo: 540, rangeLimit: 50, pol: "d" },
  { id: "Quanta Vandal", name: "quantaVandal", rivenName: "Quanta", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Continuous"], dmg: [["Electricity", 26]], accuracy: 100, fireRate: 12, critChance: 0.22, critMul: 2.4, status: 0.3, magazine: 80, reload: 1.8, ammo: 540, rangeLimit: 50, pol: "r" },
  { id: "Quartakk", name: "quartakk", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 16.7], ["Puncture", 14.2], ["Impact", 18.1]], accuracy: 90.9, fireRate: 6.33, critChance: 0.19, critMul: 2.3, status: 0.27, magazine: 84, reload: 1.9, ammo: 540 },
  { id: "Rubico", name: "rubico", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Slash", 9], ["Puncture", 27], ["Impact", 144]], accuracy: 13.3, fireRate: 2.67, critChance: 0.3, critMul: 3, status: 0.12, magazine: 5, reload: 2.4, ammo: 72 },
  { id: "Rubico Prime", name: "rubicoPrime", rivenName: "Rubico", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Slash", 9.3], ["Puncture", 28.1], ["Impact", 149.6]], accuracy: 13.3, fireRate: 3.67, critChance: 0.38, critMul: 3, status: 0.16, magazine: 5, reload: 2, ammo: 72, pol: "rr" },
  { id: "Scourge", name: "scourge", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Corrosive", 100]], accuracy: 100, fireRate: 2.67, critChance: 0.02, critMul: 1.5, status: 0.3, magazine: 20, reload: 2.5, ammo: 540, pol: "-r" },
  { id: "Scourge (charged)", name: "scourge", rivenName: "Scourge", mode: "charged", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Charge"], dmg: [["Slash", 122.5], ["Puncture", 72.5], ["Impact", 455], ["Corrosive", 50]], accuracy: 100, fireRate: 2, critChance: 0.04, critMul: 2, status: 0.3, magazine: 20, reload: 2.5, ammo: 540, pol: "-r" },
  { id: "Seer", name: "seer", tags: ["Gun", "Secondary"], dmg: [["Slash", 33.7], ["Puncture", 33.7], ["Impact", 33.7]], accuracy: 16, fireRate: 2, critChance: 0.05, critMul: 1.5, status: 0.13, magazine: 8, reload: 2.8, ammo: 210, prjSpeed: 200 },
  { id: "Sicarus", name: "sicarus", tags: ["Gun", "Secondary"], dmg: [["Slash", 4.5], ["Puncture", 4.5], ["Impact", 21]], accuracy: 20, fireRate: 7.39, critChance: 0.16, critMul: 2, status: 0.06, magazine: 15, reload: 2, ammo: 210, pol: "r" },
  { id: "Sicarus Prime", name: "sicarusPrime", rivenName: "Sicarus", tags: ["Gun", "Secondary"], dmg: [["Slash", 15], ["Puncture", 15], ["Impact", 20]], accuracy: 25, fireRate: 9.38, critChance: 0.25, critMul: 2, status: 0.2, magazine: 24, reload: 2, ammo: 210, pol: "r" },
  { id: "Simulor", name: "simulor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Magnetic", 75]], accuracy: 100, fireRate: 3, critChance: 0.12, critMul: 2, status: 0.3, magazine: 8, reload: 3, ammo: 60, rangeLimit: 12, pol: "d-" },
  { id: "Synoid Simulor", name: "synoidSimulor", rivenName: "Simulor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Magnetic", 75]], accuracy: 100, fireRate: 3.33, critChance: 0.14, critMul: 2, status: 0.35, magazine: 16, reload: 2, ammo: 75, pol: "rd-" },
  { id: "Snipetron", name: "snipetron", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Slash", 18], ["Puncture", 144], ["Impact", 18]], accuracy: 13.3, fireRate: 2, critChance: 0.3, critMul: 1.5, status: 0.12, magazine: 4, reload: 3.5, ammo: 72, pol: "r" },
  { id: "Snipetron Vandal", name: "snipetronVandal", rivenName: "Snipetron", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Slash", 10], ["Puncture", 180], ["Impact", 10]], accuracy: 13.3, fireRate: 2, critChance: 0.28, critMul: 2, status: 0.16, magazine: 6, reload: 2, ammo: 72, pol: "r" },
  { id: "Sobek", name: "sobek", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 43.75], ["Puncture", 43.75], ["Impact", 262.5]], accuracy: 9.1, bullets: 5, fireRate: 2.5, critChance: 0.11, critMul: 2, status: 0.27, magazine: 20, reload: 2.7, ammo: 240 },
  { id: "Soma", name: "soma", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 6], ["Puncture", 4.8], ["Impact", 1.2]], accuracy: 28.6, fireRate: 15, critChance: 0.3, critMul: 3, status: 0.07, magazine: 100, reload: 3, ammo: 540, pol: "rr" },
  { id: "Soma Prime", name: "somaPrime", rivenName: "Soma", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 6], ["Puncture", 4.8], ["Impact", 1.2]], accuracy: 28.6, fireRate: 15, critChance: 0.3, critMul: 3, status: 0.1, magazine: 200, reload: 3, ammo: 800, pol: "rr" },
  { id: "Sonicor", name: "sonicor", tags: ["Gun", "Secondary"], dmg: [["Impact", 200]], accuracy: 100, fireRate: 1.25, critChance: 0.1, critMul: 2, status: 0.25, magazine: 15, reload: 3, ammo: 150, prjSpeed: 80, rangeLimit: 15, pol: "d" },
  { id: "Spectra", name: "spectra", tags: ["Gun", "Secondary", "Continuous"], dmg: [["Slash", 10.4], ["Puncture", 7.6]], accuracy: 100, fireRate: 12, critChance: 0.14, critMul: 2, status: 0.22, magazine: 60, reload: 1.8, ammo: 360, rangeLimit: 18 },
  { id: "Spira", name: "spira", tags: ["Gun", "Secondary", "Thrown"], dmg: [["Slash", 24.6], ["Puncture", 49.2], ["Impact", 8.2]], accuracy: 100, fireRate: 2.5, critChance: 0.3, critMul: 2, status: 0.08, magazine: 10, reload: 1, ammo: 210, prjSpeed: 70, pol: "rr" },
  { id: "Spira Prime", name: "spiraPrime", rivenName: "Spira", tags: ["Gun", "Secondary", "Thrown"], dmg: [["Slash", 6], ["Puncture", 48], ["Impact", 6]], accuracy: 100, fireRate: 3.33, critChance: 0.3, critMul: 3, status: 0.14, magazine: 12, reload: 0.75, ammo: 210, prjSpeed: 70, pol: "rr" },
  { id: "Staticor", name: "staticor", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Radiation", 132]], accuracy: 16.7, fireRate: 3.5, critChance: 0.14, critMul: 2.2, status: 0.28, magazine: 48, reload: 1.5, ammo: 270, prjSpeed: 70, pol: "-" },
  { id: "Staticor (charged)", name: "staticor", rivenName: "Staticor", tags: ["Gun", "Secondary", "SecondUnique", "Charge"], dmg: [["Radiation", 528]], accuracy: 16.7, fireRate: 3.5, critChance: 0.14, critMul: 2.2, status: 0.28, magazine: 48, reload: 1.5, ammo: 270, prjSpeed: 70, pol: "-" },
  { id: "Stradavar", name: "stradavar", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 8.4], ["Puncture", 9.8], ["Impact", 9.8]], accuracy: 14.3, fireRate: 10, critChance: 0.24, critMul: 2, status: 0.12, magazine: 65, reload: 2, ammo: 540, pol: "rr" },
  { id: "Stradavar (semi-auto)", name: "stradavar", rivenName: "Stradavar", mode: "semiAuto", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 8.4], ["Puncture", 9.8], ["Impact", 9.8]], accuracy: 28.6, fireRate: 5, critChance: 0.28, critMul: 2, status: 0.16, magazine: 65, reload: 2, ammo: 540, pol: "rr" },
  { id: "Strun", name: "strun", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 90], ["Puncture", 45], ["Impact", 165]], accuracy: 4, bullets: 10, fireRate: 2.5, critChance: 0.075, critMul: 1.5, status: 0.2, magazine: 6, reload: 3.75, ammo: 120, pol: "-" },
  { id: "Strun Wraith", name: "strunWraith", rivenName: "Strun", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 80], ["Puncture", 60], ["Impact", 260]], accuracy: 6.7, bullets: 10, fireRate: 2.5, critChance: 0.18, critMul: 2.2, status: 0.4, magazine: 10, reload: 5, ammo: 120, pol: "-" },
  { id: "Stubba", name: "stubba", tags: ["Gun", "Secondary"], dmg: [["Slash", 15.5], ["Puncture", 3.3], ["Impact", 14.2]], accuracy: 26.7, fireRate: 6.33, critChance: 0.23, critMul: 1.9, status: 0.13, magazine: 57, reload: 1.3, ammo: 210 },
  { id: "Stug", name: "stug", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Corrosive", 156]], accuracy: 100, fireRate: 4, critChance: 0.05, critMul: 1.5, status: 0, magazine: 20, reload: 2, ammo: 210, prjSpeed: 35, pol: "d" },
  { id: "Stug (charged)", name: "stug", rivenName: "Stug", tags: ["Gun", "Secondary", "SecondUnique", "Charge"], dmg: [["Corrosive", 936]], accuracy: 100, fireRate: 0.33, critChance: 0.05, critMul: 1.5, status: 0, magazine: 20, reload: 2, ammoCost: 6, ammo: 210, prjSpeed: 35, pol: "d" },
  { id: "Supra", name: "supra", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 6], ["Puncture", 30], ["Impact", 4]], accuracy: 14.3, fireRate: 12.5, critChance: 0.12, critMul: 1.8, status: 0.3, magazine: 180, reload: 3, ammo: 1080, prjSpeed: 80 },
  { id: "Supra Vandal", name: "supraVandal", rivenName: "Supra", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 6], ["Puncture", 30], ["Impact", 4]], accuracy: 28.6, fireRate: 12.5, critChance: 0.16, critMul: 2, status: 0.3, magazine: 300, reload: 3, ammo: 1600, prjSpeed: 80, pol: "rr" },
  { id: "Sybaris", name: "sybaris", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 27.2], ["Puncture", 26.4], ["Impact", 26.4]], accuracy: 28.6, fireRate: 3.98, critChance: 0.25, critMul: 2, status: 0.1, magazine: 10, reload: 2, ammo: 540 },
  { id: "Dex Sybaris", name: "dexSybaris", rivenName: "Sybaris", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 33.75], ["Puncture", 18.75], ["Impact", 22.5]], accuracy: 28.6, fireRate: 4.17, critChance: 0.35, critMul: 2, status: 0.1, magazine: 14, reload: 1.5, ammo: 540 },
  { id: "Sybaris Prime", name: "sybarisPrime", rivenName: "Sybaris", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 29.9], ["Puncture", 29], ["Impact", 29]], accuracy: 25, fireRate: 4.72, critChance: 0.3, critMul: 2, status: 0.25, magazine: 20, reload: 2, ammo: 540, pol: "--r" },
  { id: "Synapse", name: "synapse", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Continuous"], dmg: [["Corrosive", 20]], accuracy: 100, fireRate: 12, critChance: 0.39, critMul: 2.7, status: 0.13, magazine: 70, reload: 1.5, ammo: 540, rangeLimit: 27 },
  { id: "Talons", name: "talons", tags: ["Gun", "Secondary", "Thrown", "SecondUnique"], dmg: [["Blast", 120]], accuracy: 100, fireRate: 3.33, critChance: 0.22, critMul: 2, status: 0.26, magazine: 4, reload: 1, ammo: 12, prjSpeed: 25, pol: "rr" },
  { id: "Tenora", name: "tenora", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 7.2], ["Puncture", 9.6], ["Impact", 7.2]], accuracy: 12.5, fireRate: 11.67, critChance: 0.28, critMul: 2, status: 0.16, magazine: 150, reload: 2.5, ammo: 900 },
  { id: "Tenora (charged)", name: "tenora", rivenName: "Tenora", mode: "charged", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Charge"], dmg: [["Slash", 48], ["Puncture", 144], ["Impact", 48]], accuracy: 12.5, fireRate: 1.25, critChance: 0.33, critMul: 3, status: 0.11, magazine: 150, ammoCost: 10, reload: 2.5, ammo: 900 },
  { id: "Tetra", name: "tetra", tags: ["Gun", "Primary", "Rifle"], dmg: [["Puncture", 25.6], ["Impact", 6.4]], accuracy: 18.2, fireRate: 6.67, critChance: 0.04, critMul: 1.5, status: 0.2, magazine: 60, reload: 2, ammo: 540, prjSpeed: 100 },
  { id: "Prisma Tetra", name: "prismaTetra", rivenName: "Tetra", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Puncture", 30.4], ["Impact", 7.6]], accuracy: 18.2, fireRate: 7.08, critChance: 0.1, critMul: 2, status: 0.24, magazine: 60, reload: 2, ammo: 540, prjSpeed: 100 },
  { id: "Tiberon", name: "tiberon", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 11], ["Puncture", 22], ["Impact", 11]], accuracy: 33.3, fireRate: 9.09, critChance: 0.26, critMul: 2.4, status: 0.16, magazine: 30, reload: 2.3, ammo: 540, pol: "r" },
  { id: "Tiberon Prime", name: "tiberonPrime", rivenName: "Tiberon", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 13.8], ["Puncture", 18.4], ["Impact", 13.8]], accuracy: 33.3, fireRate: 7.38, critChance: 0.28, critMul: 3, status: 0.2, magazine: 42, reload: 2, ammo: 540, pol: "r--" },
  { id: "Tiberon Prime (semi-auto)", name: "tiberonPrime", rivenName: "Tiberon", mode: "semiAuto", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 13.8], ["Puncture", 18.4], ["Impact", 13.8]], accuracy: 33.3, fireRate: 6, critChance: 0.3, critMul: 3.4, status: 0.18, magazine: 42, reload: 2, ammo: 540, pol: "r--" },
  { id: "Tiberon Prime (full-auto)", name: "tiberonPrime", rivenName: "Tiberon", mode: "fullAuto", tags: ["Gun", "Primary", "Rifle"], dmg: [["Slash", 13.8], ["Puncture", 18.4], ["Impact", 13.8]], accuracy: 33.3, fireRate: 8.33, critChance: 0.16, critMul: 2.8, status: 0.32, magazine: 42, reload: 2, ammo: 540, pol: "r--" },
  { id: "Tigris", name: "tigris", rivenName: "Tigris", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 840], ["Puncture", 105], ["Impact", 105]], accuracy: 9.1, bullets: 5, fireRate: 2, critChance: 0.1, critMul: 2, status: 0.28, magazine: 2, reload: 1.8, ammo: 120 },
  { id: "Sancti Tigris", name: "sanctiTigris", rivenName: "Tigris", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 1008], ["Puncture", 126], ["Impact", 126]], accuracy: 6.5, bullets: 6, fireRate: 2, critChance: 0.15, critMul: 1.5, status: 0.28, magazine: 2, reload: 1.5, ammo: 120, pol: "d-r" },
  { id: "Tigris Prime", name: "tigrisPrime", rivenName: "Tigris", tags: ["Gun", "Primary", "Shotgun"], dmg: [["Slash", 1248], ["Puncture", 156], ["Impact", 156]], accuracy: 9.1, bullets: 8, fireRate: 2, critChance: 0.1, critMul: 2, status: 0.3, magazine: 2, reload: 1.8, ammo: 120, pol: "r-" },
  { id: "Tonkor", name: "tonkor", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher"], dmg: [["Blast", 650], ["Puncture", 75]], accuracy: 12.5, fireRate: 3.17, critChance: 0.25, critMul: 2.5, status: 0.1, magazine: 1, reload: 1.7, ammo: 30, prjSpeed: 30 },
  { id: "Torid", name: "torid", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher"], dmg: [["Toxin", 100]], accuracy: 100, fireRate: 1.5, critChance: 0.15, critMul: 2, status: 0.23, magazine: 5, reload: 1.7, ammo: 60, prjSpeed: 25 },
  { id: "Twin Grakatas", name: "twinGrakatas", tags: ["Gun", "Secondary"], dmg: [["Slash", 5.3], ["Puncture", 6.7], ["Impact", 8]], accuracy: 28.6, fireRate: 20, critChance: 0.25, critMul: 2.7, status: 0.11, magazine: 120, reload: 3, ammo: 1200, pol: "-" },
  { id: "Twin Gremlins", name: "twinGremlins", tags: ["Gun", "Secondary"], dmg: [["Slash", 12.33], ["Puncture", 12.33], ["Impact", 12.33]], accuracy: 16.7, fireRate: 5, critChance: 0.15, critMul: 1.5, status: 0.15, magazine: 30, reload: 1.1, ammo: 210, prjSpeed: 65, pol: "r" },
  { id: "Prisma Twin Gremlins", name: "prismaTwinGremlins", rivenName: "Twin Gremlins", tags: ["Gun", "Secondary"], dmg: [["Slash", 11.3], ["Puncture", 12.7], ["Impact", 3]], accuracy: 36.4, fireRate: 8.83, critChance: 0.23, critMul: 1.9, status: 0.23, magazine: 70, reload: 0.9, ammo: 210, prjSpeed: 65, pol: "r" },
  { id: "Twin Kohmak", name: "twinKohmak", tags: ["Gun", "Secondary"], dmg: [["Slash", 90], ["Puncture", 30], ["Impact", 30]], accuracy: 3, bullets: 5, fireRate: 6.67, critChance: 0.11, critMul: 2, status: 0.23, magazine: 80, reload: 2.2, ammo: 240, pol: "d" },
  { id: "Twin Rogga", name: "twinRogga", tags: ["Gun", "Secondary"], dmg: [["Slash", 70.5], ["Puncture", 352.5], ["Impact", 282]], accuracy: 4.3, bullets: 15, fireRate: 2.5, critChance: 0.1, critMul: 2, status: 0.33, magazine: 2, reload: 1.5, ammo: 120, pol: "-r" },
  { id: "Twin Vipers", name: "twinVipers", tags: ["Gun", "Secondary"], dmg: [["Slash", 5.1], ["Puncture", 1.7], ["Impact", 10.2]], accuracy: 15.4, fireRate: 25, critChance: 0.15, critMul: 1.5, status: 0.11, magazine: 28, reload: 2, ammo: 420, pol: "-" },
  { id: "Twin Vipers Wraith", name: "wraithTwinVipers", rivenName: "Twin Vipers", tags: ["Gun", "Secondary"], dmg: [["Slash", 1.8], ["Puncture", 1.8], ["Impact", 14.4]], accuracy: 11.1, fireRate: 25, critChance: 0.19, critMul: 2, status: 0.09, magazine: 40, reload: 2, ammo: 440, pol: "-" },
  { id: "Tysis", name: "tysis", tags: ["Gun", "Secondary"], dmg: [["Corrosive", 79]], accuracy: 100, fireRate: 2.5, critChance: 0.03, critMul: 1.5, status: 0.5, magazine: 11, reload: 1.2, ammo: 210, prjSpeed: 75 },
  { id: "Vasto", name: "vasto", tags: ["Gun", "Secondary"], dmg: [["Slash", 29], ["Puncture", 14.5], ["Impact", 14.5]], accuracy: 16, fireRate: 5, critChance: 0.2, critMul: 1.8, status: 0.08, magazine: 6, reload: 1, ammo: 210, pol: "r" },
  { id: "Vasto Prime", name: "vastoPrime", rivenName: "Vasto", tags: ["Gun", "Secondary"], dmg: [["Slash", 46.2], ["Puncture", 9.9], ["Impact", 9.9]], accuracy: 16, fireRate: 5.42, critChance: 0.22, critMul: 2.4, status: 0.22, magazine: 6, reload: 1, ammo: 210, pol: "rr" },
  { id: "Vectis", name: "vectis", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Slash", 56.25], ["Puncture", 78.75], ["Impact", 90]], accuracy: 13.3, fireRate: 1.5, critChance: 0.25, critMul: 2, status: 0.3, magazine: 1, reload: 1, ammo: 72, pol: "r" },
  { id: "Vectis Prime", name: "vectisPrime", rivenName: "Vectis", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Slash", 52.5], ["Puncture", 157.5], ["Impact", 140]], accuracy: 13.3, fireRate: 2.67, critChance: 0.3, critMul: 2, status: 0.3, magazine: 2, reload: 0.85, ammo: 72, pol: "r-" },
  { id: "Veldt", name: "veldt", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 43.2], ["Puncture", 23.4], ["Impact", 23.4]], accuracy: 25, fireRate: 3.67, critChance: 0.22, critMul: 2.2, status: 0.22, magazine: 16, reload: 1.8, ammo: 528, pol: "-" },
  { id: "Viper", name: "viper", tags: ["Gun", "Secondary"], dmg: [["Slash", 5.1], ["Puncture", 1.7], ["Impact", 10.2]], accuracy: 15.4, fireRate: 14.38, critChance: 0.15, critMul: 1.5, status: 0.11, magazine: 14, reload: 0.7, ammo: 420, pol: "r" },
  { id: "Viper Wraith", name: "wraithViper", rivenName: "Viper", tags: ["Gun", "Secondary"], dmg: [["Slash", 1.8], ["Puncture", 1.8], ["Impact", 14.4]], accuracy: 28.6, fireRate: 14.38, critChance: 0.19, critMul: 2, status: 0.09, magazine: 20, reload: 0.8, ammo: 420, pol: "-" },
  { id: "Vulkar", name: "vulkar", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Slash", 11.2], ["Puncture", 33.8], ["Impact", 180]], accuracy: 13.3, fireRate: 1.5, critChance: 0.2, critMul: 2, status: 0.25, magazine: 6, reload: 3, ammo: 72 },
  { id: "Vulkar Wraith", name: "vulkarWraith", rivenName: "Vulkar", tags: ["Gun", "Primary", "Rifle", "Sniper"], dmg: [["Puncture", 27.3], ["Impact", 245.7]], accuracy: 13.3, fireRate: 2, critChance: 0.2, critMul: 2, status: 0.25, magazine: 8, reload: 3, ammo: 72, pol: "r" },
  { id: "Zakti", name: "zakti", tags: ["Gun", "Secondary", "SecondUnique"], dmg: [["Puncture", 18], ["Impact", 12]], accuracy: 26.7, fireRate: 5, critChance: 0.02, critMul: 1.5, status: 0.2, magazine: 3, reload: 0.8, ammo: 210, prjSpeed: 65, pol: "--" },
  { id: "Zarr", name: "zarr", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher"], dmg: [["Blast", 175], ["Impact", 25]], accuracy: 100, fireRate: 1.67, critChance: 0.17, critMul: 2.5, status: 0.29, magazine: 3, reload: 2.3, ammo: 84, prjSpeed: 40, pol: "r" },
  { id: "Zarr (shotgun)", name: "zarr", rivenName: "Zarr", mode: "shotgun", tags: ["Gun", "Primary", "Rifle", "AssaultRifle", "Launcher"], dmg: [["Blast", 800]], accuracy: 100, bullets: 10, fireRate: 3, critChance: 0.17, critMul: 2.5, status: 0.29, magazine: 3, reload: 2.3, ammo: 84, rangeLimit: 10, pol: "r" },
  { id: "Zenith", name: "zenith", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 19.5], ["Puncture", 6], ["Impact", 4.5]], accuracy: 33.3, fireRate: 10.83, critChance: 0.1, critMul: 2, status: 0.34, magazine: 90, reload: 1.6, ammo: 540, pol: "-r" },
  { id: "Zenith (semi-auto)", name: "zenith", rivenName: "Zenith", mode: "semiAuto", tags: ["Gun", "Primary", "Rifle", "AssaultRifle"], dmg: [["Slash", 15], ["Puncture", 120], ["Impact", 15]], accuracy: 33.3, fireRate: 3, critChance: 0.35, critMul: 2.5, status: 0.08, magazine: 18, reload: 1.6, ammo: 540, pol: "-r" },
  { id: "Zhuge", name: "zhuge", tags: ["Gun", "Primary", "Rifle", "Bow"], dmg: [["Slash", 20], ["Puncture", 75], ["Impact", 5]], accuracy: 40, fireRate: 4.17, critChance: 0.2, critMul: 2, status: 0.35, magazine: 20, reload: 2.5, ammo: 540, prjSpeed: 100, pol: "r" },
  { id: "Zylok", name: "zylok", tags: ["Gun", "Secondary"], dmg: [["Slash", 78.4], ["Puncture", 16.8], ["Impact", 44.8]], accuracy: 23.5, fireRate: 1.5, critChance: 0.08, critMul: 2, status: 0.26, magazine: 8, reload: 1.2, ammo: 210 },
  // 显赫武器
  { id: "Dex Pixia", name: "dexPixia", tags: ["Gun", "Exalted", "Secondary"], dmg: [["Slash", 128], ["Puncture", 16], ["Impact", 16]], accuracy: 23, fireRate: 5.83, critChance: 0.1, critMul: 2, status: 0.25, magazine: 60, reload: 1.2, ammo: 210 },
  { id: "Regulators", name: "regulators", tags: ["Gun", "Exalted", "Secondary"], dmg: [["Slash", 12.5], ["Puncture", 12.5], ["Impact", 25]], accuracy: 13.3, fireRate: 14.8, critChance: 0.25, critMul: 3, status: 0.1, magazine: 100, reload: 0, ammo: 99999999 },
  { id: "Artemis Bow", name: "artemisBow", tags: ["Gun", "Exalted", "Primary", "Rifle", "Bow"], dmg: [["Slash", 14.4], ["Puncture", 192], ["Impact", 33.6]], accuracy: 100, fireRate: 1.11, critChance: 0.25, critMul: 2.5, status: 0.2, magazine: 1, reload: 0.9, ammo: 72, prjSpeed: 70 },

  // Arch-gun
  { id: "Imperator", name: "imperator", rivenName: "Imperator", tags: ["Gun", "Archgun"], dmg: [["Puncture", 14], ["Slash", 10], ["Impact", 16]], critMul: 2, critChance: 0.1, fireRate: 16.7, status: 0.05, accuracy: 25, magazine: 250, reload: 250 / 50 },
  { id: "Imperator Vandal", name: "imperatorVandal", rivenName: "Imperator", tags: ["Gun", "Archgun"], dmg: [["Puncture", 14], ["Slash", 10], ["Impact", 16]], critMul: 2, critChance: 0.15, fireRate: 25, status: 0.1, accuracy: 25, magazine: 300, reload: 300 / 75 },
  { id: "Fluctus", name: "fluctus", rivenName: "Fluctus", tags: ["Gun", "Archgun"], dmg: [["Puncture", 20], ["Slash", 140], ["Impact", 40]], critMul: 2, critChance: 0.15, fireRate: 5, status: 0.1, accuracy: 100, magazine: 25, reload: 25 / 10, pol: "-" },
  { id: "Phaedra", name: "phaedra", rivenName: "Phaedra", tags: ["Gun", "Archgun"], dmg: [["Puncture", 29.25], ["Slash", 4.5], ["Impact", 11.25]], critMul: 2, critChance: 0.1, fireRate: 18.75, status: 0.25, accuracy: 11.8, magazine: 250, reload: 250 / 50, pol: "r" },
  { id: "Grattler", name: "grattler", rivenName: "Grattler", tags: ["Gun", "Archgun"], dmg: [["Puncture", 140], ["Slash", 17.5], ["Impact", 17.5]], critMul: 2, critChance: 0.25, fireRate: 6.25, status: 0.25, accuracy: 25, magazine: 60, reload: 60 / 10, pol: "r" },
  { id: "Corvas", name: "corvas", rivenName: "Corvas", tags: ["Gun", "Archgun"], dmg: [["Puncture", 42], ["Slash", 42], ["Impact", 336]], critMul: 2, critChance: 0.15, fireRate: 2, status: 0.1, accuracy: 9.1, bullets: 12, magazine: 25, reload: 25 / 5, pol: "-" },
  { id: "Cyngas", name: "cyngas", rivenName: "Cyngas", tags: ["Gun", "Archgun"], dmg: [["Puncture", 66], ["Slash", 68], ["Impact", 66]], critMul: 2, critChance: 0.05, fireRate: 9.09, status: 0.3, accuracy: 33.3, magazine: 30, reload: 30 / 0 },
  { id: "Dual Decurion", name: "dualDecurion", rivenName: "Dual Decurion", tags: ["Gun", "Archgun"], dmg: [["Puncture", 16.5], ["Slash", 16.5], ["Impact", 27]], critMul: 2, critChance: 0.25, fireRate: 8.3, status: 0.1, accuracy: 100, magazine: 32, reload: 32 / 50 },
  { id: "Velocitus", name: "velocitus", rivenName: "Velocitus", tags: ["Gun", "Archgun"], dmg: [["Magnetic", 1800]], critMul: 3, critChance: 0.25, fireRate: 1, status: 0.25, accuracy: 28.6, magazine: 100, reload: 100 / 25 },

  // Arch-gun (Atmosphere)
  { id: "Imperator (Atmosphere)", name: "imperator", mode: "atmosphere", rivenName: "Imperator", tags: ["Gun", "Archgun"], dmg: [["Puncture", 17.5], ["Slash", 12.5], ["Impact", 20]], critMul: 2, critChance: 0.24, fireRate: 16.7, status: 0.12, accuracy: 25, magazine: 200, reload: 2, ammo: 800, pol: "r" },
  { id: "Imperator Vandal (Atmosphere)", name: "imperatorVandal", mode: "atmosphere", rivenName: "Imperator", tags: ["Gun", "Archgun"], dmg: [["Puncture", 17.5], ["Slash", 12.5], ["Impact", 20]], critMul: 2.4, critChance: 0.28, fireRate: 25, status: 0.12, accuracy: 25, magazine: 300, reload: 2, ammo: 1200 },
  { id: "Fluctus (Atmosphere)", name: "fluctus", mode: "atmosphere", rivenName: "Fluctus", tags: ["Gun", "Archgun"], dmg: [["Puncture", 25], ["Slash", 175], ["Impact", 50]], critMul: 2, critChance: 0.22, fireRate: 5, status: 0.16, accuracy: 100, magazine: 40, reload: 2, ammo: 160, pol: "-" },
  { id: "Phaedra (Atmosphere)", name: "phaedra", mode: "atmosphere", rivenName: "Phaedra", tags: ["Gun", "Archgun"], dmg: [["Puncture", 36.4], ["Slash", 6], ["Impact", 14]], critMul: 2, critChance: 0.14, fireRate: 18.75, status: 0.3, accuracy: 11.8, magazine: 250, reload: 2, ammo: 960, pol: "r" },
  { id: "Grattler (Atmosphere)", name: "grattler", mode: "atmosphere", rivenName: "Grattler", tags: ["Gun", "Archgun"], dmg: [["Puncture", 157.8], ["Slash", 19.7], ["Impact", 19.7]], critMul: 2, critChance: 0.25, fireRate: 6.25, status: 0.25, accuracy: 25, magazine: 30, reload: 2, ammo: 180, pol: "r" },
  { id: "Corvas (Atmosphere)", name: "corvas", mode: "atmosphere", rivenName: "Corvas", tags: ["Gun", "Archgun"], dmg: [["Puncture", 48], ["Slash", 48], ["Impact", 384]], critMul: 2.6, critChance: 0.4, fireRate: 2, status: 0.14, accuracy: 9.1, bullets: 12, magazine: 25, reload: 2, ammo: 100, pol: "-" },
  { id: "Cyngas (Atmosphere)", name: "cyngas", mode: "atmosphere", rivenName: "Cyngas", tags: ["Gun", "Archgun"], dmg: [["Puncture", 39.6], ["Slash", 40.8], ["Impact", 39.6]], critMul: 2.2, critChance: 0.2, fireRate: 9.09, status: 0.3, accuracy: 33.3, magazine: 30, reload: 1.2, ammo: 480 },
  { id: "Dual Decurion (Atmosphere)", name: "dualDecurion", mode: "atmosphere", rivenName: "Dual Decurion", tags: ["Gun", "Archgun"], dmg: [["Puncture", 30.25], ["Slash", 30.25], ["Impact", 49.6]], critMul: 2.2, critChance: 0.28, fireRate: 8.3, status: 0.14, accuracy: 100, magazine: 32, reload: 1.4, ammo: 512 },
  { id: "Velocitus (Atmosphere)", name: "velocitus", mode: "atmosphere", rivenName: "Velocitus", tags: ["Gun", "Archgun"], dmg: [["Magnetic", 1200]], critMul: 3, critChance: 0.3, fireRate: 1, status: 0.25, accuracy: 28.6, magazine: 10, reload: 2, ammo: 60 },

  // 守护
  { id: "Burst Laser", name: "burstLaser", rivenName: "Burst Laser", tags: ["Gun", "Robotic", "Secondary"], dmg: [["Puncture", 6], ["Slash", 0.3], ["Impact", 0.7]], critMul: 1.3, critChance: 0.025, fireRate: 1.5, status: 0.02, accuracy: 100, magazine: 15, reload: 0 },
  { id: "Prisma Burst Laser", name: "prismaBurstLaser", rivenName: "Burst Laser", tags: ["Gun", "Robotic", "Secondary"], dmg: [["Puncture", 8.5], ["Slash", 0.5], ["Impact", 1]], critMul: 2, critChance: 0.05, fireRate: 1.61, status: 0.1, accuracy: 100, magazine: 15, reload: 0 },
  { id: "Vulklok", name: "vulklok", rivenName: "Vulklok", tags: ["Gun", "Robotic", "Primary", "Rifle", "Sniper"], dmg: [["Electricity", 85]], critMul: 2.5, critChance: 0.35, fireRate: 0.15, status: 0.25, accuracy: 100, magazine: 10, reload: 2 },
  { id: "Artax", name: "artax", rivenName: "Artax", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Cold", 5]], critMul: 1.5, critChance: 0.02, fireRate: 1, status: 0.03, accuracy: 12.5, magazine: 100, reload: 1.5 },
  { id: "Vulcax", name: "vulcax", rivenName: "Vulcax", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Heat", 35]], critMul: 2.5, critChance: 0.2, fireRate: 1, status: 0.1, accuracy: 100, magazine: 1, reload: 6 },
  { id: "Sweeper", name: "sweeper", rivenName: "Sweeper", tags: ["Gun", "Robotic", "Primary", "Shotgun"], dmg: [["Puncture", 2.1], ["Slash", 4.2], ["Impact", 35.7]], critMul: 1.5, critChance: 0.05, fireRate: 1, status: 0.14, accuracy: 3.3, bullets: 6, magazine: 10, reload: 2.3 },
  { id: "Sweeper Prime", name: "sweeperPrime", rivenName: "Sweeper", tags: ["Gun", "Robotic", "Primary", "Shotgun"], dmg: [["Puncture", 3], ["Slash", 6], ["Impact", 51]], critMul: 2, critChance: 0.05, fireRate: 1, status: 0.15, accuracy: 3.3, bullets: 6, magazine: 20, reload: 2 },
  { id: "Stinger", name: "stinger", rivenName: "Stinger", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Toxin", 15]], critMul: 1.5, critChance: 0.025, fireRate: 3.3, status: 0.05, accuracy: 100, magazine: 4, reload: 1.2 },
  { id: "Multron", name: "multron", rivenName: "Multron", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Puncture", 3.8], ["Impact", 1.3]], critMul: 1.8, critChance: 0.125, fireRate: 3.33, status: 0.05, accuracy: 18.2, magazine: 60, reload: 3 },
  { id: "Laser Rifle", name: "laserRifle", rivenName: "Laser Rifle", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Puncture", 6.4], ["Slash", 0.8], ["Impact", 0.8]], critMul: 1.3, critChance: 0.025, fireRate: 6.7, status: 0.02, accuracy: 100, magazine: 5, reload: 1.2 },
  { id: "Prime Laser Rifle", name: "primeLaserRifle", rivenName: "Laser Rifle", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Puncture", 8.4], ["Slash", 2.4], ["Impact", 1.2]], critMul: 1.5, critChance: 0.15, fireRate: 10, status: 0.05, accuracy: 100, magazine: 5, reload: 1.2 },
  { id: "Deth Machine Rifle", name: "dethMachineRifle", rivenName: "Deth Machine Rifle", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Puncture", 0.3], ["Slash", 4.3], ["Impact", 0.5]], critMul: 2, critChance: 0.05, fireRate: 8.3, status: 0.01, accuracy: 100, magazine: 100, reload: 2 },
  { id: "Cryotra", name: "cryotra", rivenName: "Cryotra", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Cold", 10]], critMul: 2, critChance: 0.05, fireRate: 1, status: 0.35, accuracy: 12.5, magazine: 80, reload: 4 },
  { id: "Tazicor", name: "tazicor", rivenName: "Tazicor", tags: ["Gun", "Robotic", "Primary", "Rifle"], dmg: [["Electricity", 6]], critMul: 1.5, critChance: 0.02, fireRate: 8.33, status: 0.15, accuracy: 25, magazine: 4, reload: 2.5 }
] as GunWeaponData[]).map(v => new GunWeapon(v));

export const MeleeWeaponDataBase: MeleeWeapon[] = ([
  { id: "Sibear", name: "sibear", tags: ["Melee", "Hammer"], dmg: [["Cold", 130]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 260, status: 0.1, pol: "d" },
  { id: "Endura", name: "endura", tags: ["Melee", "Rapier"], dmg: [["Puncture", 66.5], ["Slash", 23.75], ["Impact", 4.75]], critMul: 2, critChance: 0.05, fireRate: 0.917, slideDmg: 204, status: 0.25, pol: "r" },
  { id: "Nami Skyla", name: "namiSkyla", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 7.5], ["Slash", 35], ["Impact", 7.5]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 300, status: 0.1 },
  { id: "Nami Skyla Prime", name: "namiSkylaPrime", rivenName: "Nami Skyla", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 12], ["Slash", 42], ["Impact", 6]], critMul: 1.5, critChance: 0.2, fireRate: 1.33, slideDmg: 360, status: 0.3, pol: "rrd" },
  { id: "Redeemer", name: "redeemer", tags: ["Melee", "Gunblade"], dmg: [["Puncture", 12], ["Slash", 42], ["Impact", 6]], critMul: 1.5, critChance: 0.05, fireRate: 0.833, slideDmg: 180, status: 0.1 },
  { id: "Redeemer Prime", name: "redeemerPrime", rivenName: "Redeemer", tags: ["Melee", "Gunblade"], dmg: [["Puncture", 16], ["Slash", 56], ["Impact", 8]], critMul: 2.2, critChance: 0.16, fireRate: 0.917, slideDmg: 240, status: 0.28, pol: "rr" },
  { id: "Sigma & Octantis", name: "sigmaOctantis", tags: ["Melee", "Sword-Shield"], dmg: [["Puncture", 9.6], ["Slash", 37.2], ["Impact", 13.2]], critMul: 2.2, critChance: 0.28, fireRate: 1.08, slideDmg: 129, status: 0.16 },
  { id: "Prova", name: "prova", tags: ["Melee", "Machete"], dmg: [["Electricity", 35]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 105, status: 0.1 },
  { id: "Prova Vandal", name: "provaVandal", rivenName: "Prova", tags: ["Melee", "Machete"], dmg: [["Electricity", 48]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 144, status: 0.2 },
  { id: "Furax", name: "furax", tags: ["Melee", "Fist"], dmg: [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], critMul: 2, critChance: 0.2, fireRate: 1, slideDmg: 105, status: 0.1 },
  { id: "MK1-Furax", name: "mk1Furax", rivenName: "Furax", tags: ["Melee", "Fist"], dmg: [["Puncture", 4.5], ["Slash", 4.5], ["Impact", 21]], critMul: 2, critChance: 0.2, fireRate: 1, slideDmg: 90, status: 0.1 },
  { id: "Furax Wraith", name: "furaxWraith", rivenName: "Furax", tags: ["Melee", "Fist"], dmg: [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], critMul: 2.5, critChance: 0.25, fireRate: 1.08, slideDmg: 105, status: 0.1 },
  { id: "Boltace", name: "boltace", tags: ["Melee", "Tonfa"], dmg: [["Puncture", 68], ["Slash", 8.5], ["Impact", 8.5]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 510, status: 0.25 },
  { id: "Telos Boltace", name: "telosBoltace", rivenName: "Boltace", tags: ["Melee", "Tonfa"], dmg: [["Puncture", 72.3], ["Slash", 4.2], ["Impact", 8.5]], critMul: 2, critChance: 0.1, fireRate: 1.08, slideDmg: 510, status: 0.25, pol: "-" },
  { id: "Dragon Nikana", name: "dragonNikana", tags: ["Melee", "Nikana"], dmg: [["Puncture", 8.5], ["Slash", 72.25], ["Impact", 4.25]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 182, status: 0.15, pol: "rd" },
  { id: "Magistar", name: "magistar", tags: ["Melee", "Hammer"], dmg: [["Puncture", 12], ["Slash", 4], ["Impact", 64]], critMul: 2, critChance: 0.2, fireRate: 0.833, slideDmg: 160, status: 0.1 },
  { id: "Sancti Magistar", name: "sanctiMagistar", rivenName: "Magistar", tags: ["Melee", "Hammer"], dmg: [["Puncture", 18], ["Slash", 6], ["Impact", 96]], critMul: 2, critChance: 0.2, fireRate: 1, slideDmg: 240, status: 0.1, pol: "r" },
  { id: "Atterax", name: "atterax", tags: ["Melee", "Whip"], dmg: [["Puncture", 2.25], ["Slash", 40.5], ["Impact", 2.25]], critMul: 3, critChance: 0.25, fireRate: 0.917, slideDmg: 96, status: 0.2 },
  { id: "Dual Ichor", name: "dualIchor", tags: ["Melee", "DualSwords"], dmg: [["Toxin", 35]], critMul: 3, critChance: 0.25, fireRate: 1.08, slideDmg: 210, status: 0.15, pol: "d" },
  { id: "Ack & Brunt", name: "ackBrunt", tags: ["Melee", "Sword-Shield"], dmg: [["Puncture", 5], ["Slash", 40], ["Impact", 5]], critMul: 2, critChance: 0.2, fireRate: 0.833, slideDmg: 107, status: 0.1 },
  { id: "Amphis", name: "amphis", tags: ["Melee", "Staff"], dmg: [["Puncture", 8.3], ["Slash", 8.2], ["Impact", 38.5]], critMul: 1.5, critChance: 0.075, fireRate: 1.25, slideDmg: 75, status: 0.1, pol: "-" },
  { id: "Dual Skana", name: "dualSkana", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 4.8], ["Slash", 22.4], ["Impact", 4.8]], critMul: 1.5, critChance: 0.05, fireRate: 0.833, slideDmg: 192, status: 0.1 },
  { id: "Nami Solo", name: "namiSolo", tags: ["Melee", "Machete"], dmg: [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 105, status: 0.25, pol: "r" },
  { id: "Twin Krohkur", name: "twinKrohkur", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 12.6], ["Slash", 49], ["Impact", 8.4]], critMul: 1.7, critChance: 0.19, fireRate: 0.917, slideDmg: 420, status: 0.33 },
  { id: "Lacera", name: "lacera", tags: ["Melee", "BladeAndWhip"], dmg: [["Electricity", 80]], critMul: 2, critChance: 0.025, fireRate: 0.917, slideDmg: 171, status: 0.45, pol: "-" },
  { id: "Skana", name: "skana", tags: ["Melee", "Sword"], dmg: [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], critMul: 1.5, critChance: 0.05, fireRate: 0.833, slideDmg: 75, status: 0.1 },
  { id: "Skana Prime", name: "skanaPrime", rivenName: "Skana", tags: ["Melee", "Sword"], dmg: [["Puncture", 6.3], ["Slash", 29.4], ["Impact", 6.3]], critMul: 1.5, critChance: 0.1, fireRate: 1, slideDmg: 90, status: 0.1, pol: "r-" },
  { id: "Prisma Skana", name: "prismaSkana", rivenName: "Skana", tags: ["Melee", "Sword"], dmg: [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], critMul: 2, critChance: 0.2, fireRate: 1, slideDmg: 75, status: 0.1 },
  { id: "Serro", name: "serro", tags: ["Melee", "Polearm"], dmg: [["Electricity", 75]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 167, status: 0.25, pol: "r" },
  { id: "Dual Kamas", name: "dualKamas", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 4.2], ["Slash", 35.7], ["Impact", 2.1]], critMul: 1.5, critChance: 0.05, fireRate: 1.17, slideDmg: 252, status: 0.075 },
  { id: "Dual Kamas Prime", name: "dualKamasPrime", rivenName: "Dual Kamas", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 14], ["Slash", 52.5], ["Impact", 3.5]], critMul: 2, critChance: 0.15, fireRate: 1.17, slideDmg: 420, status: 0.2, pol: "r" },
  { id: "Ceramic Dagger", name: "ceramicDagger", tags: ["Melee", "Dagger"], dmg: [["Puncture", 31.5], ["Impact", 3.5]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 75, status: 0.1, pol: "r" },
  { id: "Cerata", name: "cerata", tags: ["Melee", "Glaive"], dmg: [["Toxin", 44]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 220, status: 0.3, pol: "rd" },
  { id: "Cerata (charged)", name: "cerata", mode: "charged", rivenName: "Cerata", tags: ["Melee", "Glaive"], dmg: [["Puncture", 160], ["Slash", 20], ["Impact", 20], ["Toxin", 150]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 0, status: 0.33, fltSpeed: 35, pol: "rd" },
  { id: "Galatine", name: "galatine", tags: ["Melee", "HeavyBlade"], dmg: [["Puncture", 3.1], ["Slash", 118.8], ["Impact", 3.1]], critMul: 2, critChance: 0.1, fireRate: 1, slideDmg: 250, status: 0.2, pol: "-" },
  { id: "Galatine Prime", name: "galatinePrime", rivenName: "Galatine", tags: ["Melee", "HeavyBlade"], dmg: [["Puncture", 4.1], ["Slash", 156.8], ["Impact", 4.1]], critMul: 2, critChance: 0.2, fireRate: 1, slideDmg: 330, status: 0.2, pol: "rr" },
  { id: "Dual Cleavers", name: "dualCleavers", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], critMul: 3, critChance: 0.25, fireRate: 0.833, slideDmg: 210, status: 0.1, pol: "r" },
  { id: "Prisma Dual Cleavers", name: "prismaDualCleavers", rivenName: "Dual Cleavers", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 3.5], ["Slash", 28], ["Impact", 3.5]], critMul: 3, critChance: 0.25, fireRate: 1, slideDmg: 210, status: 0.25, pol: "r" },
  { id: "Jat Kittag", name: "jatKittag", tags: ["Melee", "Hammer"], dmg: [["Puncture", 19.5], ["Slash", 6.5], ["Impact", 104]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 260, status: 0.25, pol: "r-" },
  { id: "Fang", name: "fang", tags: ["Melee", "DualDaggers"], dmg: [["Puncture", 21], ["Slash", 4.5], ["Impact", 4.5]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 150, status: 0.08, pol: "d" },
  { id: "Fang Prime", name: "fangPrime", rivenName: "Fang", tags: ["Melee", "DualDaggers"], dmg: [["Puncture", 32.4], ["Impact", 3.6]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 180, status: 0.05, pol: "d" },
  { id: "Lesion", name: "lesion", tags: ["Melee", "Polearm"], dmg: [["Puncture", 5], ["Slash", 75], ["Impact", 20]], critMul: 2, critChance: 0.05, fireRate: 1, slideDmg: 222, status: 0.3, pol: "r" },
  { id: "Galvacord", name: "galvacord", tags: ["Melee", "Whip"], dmg: [["Puncture", 6], ["Slash", 22], ["Impact", 14], ["Electricity", 38]], critMul: 1.8, critChance: 0.12, fireRate: 0.75, slideDmg: 171, status: 0.3 },
  { id: "Gram", name: "gram", tags: ["Melee", "HeavyBlade"], dmg: [["Puncture", 15], ["Slash", 70], ["Impact", 15]], critMul: 2, critChance: 0.15, fireRate: 0.95, slideDmg: 200, status: 0.15 },
  { id: "Gram Prime", name: "gramPrime", tags: ["Melee", "HeavyBlade"], rivenName: "Gram", dmg: [["Puncture", 9], ["Slash", 135], ["Impact", 36]], critMul: 2.6, critChance: 0.32, fireRate: 0.8, slideDmg: 360, status: 0.32, pol: "rr" },
  { id: "Jaw Sword", name: "jawSword", tags: ["Melee", "Sword"], dmg: [["Puncture", 8.8], ["Slash", 33], ["Impact", 2.2]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 94, status: 0.1, pol: "r" },
  { id: "Bo", name: "bo", tags: ["Melee", "Staff"], dmg: [["Puncture", 5], ["Impact", 45]], critMul: 2, critChance: 0.125, fireRate: 1, slideDmg: 107, status: 0.2, pol: "d" },
  { id: "MK1-Bo", name: "mk1Bo", rivenName: "Bo", tags: ["Melee", "Staff"], dmg: [["Puncture", 4.5], ["Impact", 40.5]], critMul: 2, critChance: 0.125, fireRate: 1, slideDmg: 96, status: 0.2, pol: "d" },
  { id: "Bo Prime", name: "boPrime", rivenName: "Bo", tags: ["Melee", "Staff"], dmg: [["Puncture", 7.5], ["Impact", 67.5]], critMul: 2, critChance: 0.125, fireRate: 1.08, slideDmg: 161, status: 0.25, pol: "dr" },
  { id: "Fragor", name: "fragor", tags: ["Melee", "Hammer"], dmg: [["Puncture", 17.3], ["Slash", 17.2], ["Impact", 80.5]], critMul: 2, critChance: 0.2, fireRate: 0.833, slideDmg: 230, status: 0.1 },
  { id: "Fragor Prime", name: "fragorPrime", rivenName: "Fragor", tags: ["Melee", "Hammer"], dmg: [["Puncture", 19.5], ["Slash", 19.5], ["Impact", 91]], critMul: 2.5, critChance: 0.35, fireRate: 0.8, slideDmg: 260, status: 0.1, pol: "r" },
  { id: "Skiajati", name: "skiajati", tags: ["Melee", "Nikana"], dmg: [["Puncture", 5.4], ["Slash", 60.1], ["Impact", 11.6]], critMul: 1.9, critChance: 0.15, fireRate: 1.17, slideDmg: 165, status: 0.27, pol: "ww" },
  { id: "Anku", name: "anku", tags: ["Melee", "Scythe"], dmg: [["Puncture", 56], ["Slash", 3.5], ["Impact", 10.5]], critMul: 2, critChance: 0.2, fireRate: 1.08, slideDmg: 140, status: 0.1, pol: "r" },
  { id: "Caustacyst", name: "caustacyst", tags: ["Melee", "Scythe"], dmg: [["Corrosive", 75]], critMul: 2, critChance: 0.05, fireRate: 1, slideDmg: 150, status: 0.3, pol: "r" },
  { id: "Nikana", name: "nikana", tags: ["Melee", "Nikana"], dmg: [["Puncture", 4.5], ["Slash", 38.25], ["Impact", 2.25]], critMul: 2, critChance: 0.1, fireRate: 0.917, slideDmg: 96, status: 0.1, pol: "rd" },
  { id: "Nikana Prime", name: "nikanaPrime", rivenName: "Nikana", tags: ["Melee", "Nikana"], dmg: [["Puncture", 4.75], ["Slash", 85.5], ["Impact", 4.75]], critMul: 2, critChance: 0.2, fireRate: 1.08, slideDmg: 204, status: 0.2, pol: "rd" },
  { id: "Kama", name: "kama", tags: ["Melee", "Machete"], dmg: [["Puncture", 6.75], ["Slash", 31.5], ["Impact", 6.75]], critMul: 1.5, critChance: 0.05, fireRate: 1.17, slideDmg: 135, status: 0.02, pol: "rr" },
  { id: "Heat Sword", name: "heatSword", tags: ["Melee", "Sword"], dmg: [["Puncture", 4.4], ["Slash", 35.2], ["Impact", 4.4]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 94, status: 0.2, pol: "-" },
  { id: "Machete", name: "machete", tags: ["Melee", "Machete"], dmg: [["Puncture", 3.75], ["Slash", 17.5], ["Impact", 3.75]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 75, status: 0.1 },
  { id: "Prisma Machete", name: "prismaMachete", rivenName: "Machete", tags: ["Melee", "Machete"], dmg: [["Puncture", 3.75], ["Slash", 17.5], ["Impact", 3.75]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 75, status: 0.1 },
  { id: "Machete Wraith", name: "macheteWraith", rivenName: "Machete", tags: ["Melee", "Machete"], dmg: [["Puncture", 6.75], ["Slash", 31.5], ["Impact", 6.75]], critMul: 1.5, critChance: 0.05, fireRate: 1.08, slideDmg: 135, status: 0.1, pol: "rr" },
  { id: "Hirudo", name: "hirudo", tags: ["Melee", "Sparring"], dmg: [["Puncture", 44], ["Slash", 2.7], ["Impact", 8.3]], critMul: 3, critChance: 0.15, fireRate: 1, slideDmg: 220, status: 0.05, pol: "r" },
  { id: "Tekko", name: "tekko", tags: ["Melee", "Fist"], dmg: [["Puncture", 4.5], ["Slash", 31.5], ["Impact", 9]], critMul: 2, critChance: 0.3, fireRate: 0.917, slideDmg: 135, status: 0.1, pol: "r" },
  { id: "Arca Titron", name: "arcaTitron", tags: ["Melee", "Hammer"], dmg: [["Puncture", 0], ["Slash", 63], ["Impact", 117]], critMul: 2, critChance: 0.24, fireRate: 0.733, slideDmg: 360, status: 0.38, pol: "r-" },
  { id: "Dual Raza", name: "dualRaza", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 14.4], ["Slash", 28.8], ["Impact", 4.8]], critMul: 3, critChance: 0.2, fireRate: 0.917, slideDmg: 288, status: 0.05 },
  { id: "Dakra Prime", name: "dakraPrime", tags: ["Melee", "Sword"], dmg: [["Puncture", 6], ["Slash", 48], ["Impact", 6]], critMul: 1.5, critChance: 0.15, fireRate: 1, slideDmg: 129, status: 0.1, pol: "r-" },
  { id: "Gunsen", name: "gunsen", tags: ["Melee", "Warfan"], dmg: [["Puncture", 6], ["Slash", 40], ["Impact", 4]], critMul: 2, critChance: 0.16, fireRate: 1.17, slideDmg: 107, status: 0.28, pol: "r" },
  { id: "Karyst", name: "karyst", tags: ["Melee", "Dagger"], dmg: [["Toxin", 50]], critMul: 2, critChance: 0.1, fireRate: 0.75, slideDmg: 107, status: 0.15, pol: "-" },
  { id: "Mios", name: "mios", tags: ["Melee", "BladeAndWhip"], dmg: [["Puncture", 20], ["Slash", 36], ["Impact", 24]], critMul: 2, critChance: 0.15, fireRate: 1.08, slideDmg: 171, status: 0.25, pol: "r" },
  { id: "Destreza", name: "destreza", tags: ["Melee", "Rapier"], dmg: [["Puncture", 63.8], ["Slash", 9.4], ["Impact", 1.9]], critMul: 2, critChance: 0.2, fireRate: 1, slideDmg: 161, status: 0.05, pol: "r" },
  { id: "Destreza Prime", name: "destrezaPrime", rivenName: "Destreza", tags: ["Melee", "Rapier"], dmg: [["Puncture", 53.2], ["Slash", 13.7], ["Impact", 9.1]], critMul: 3, critChance: 0.24, fireRate: 0.917, slideDmg: 163, status: 0.18, pol: "rr" },
  { id: "Kogake", name: "kogake", tags: ["Melee", "Sparring"], dmg: [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], critMul: 2, critChance: 0.2, fireRate: 0.917, slideDmg: 140, status: 0.1 },
  { id: "Kogake Prime", name: "kogakePrime", rivenName: "Kogake", tags: ["Melee", "Sparring"], dmg: [["Puncture", 10.5], ["Slash", 10.5], ["Impact", 49]], critMul: 1.8, critChance: 0.16, fireRate: 0.917, slideDmg: 280, status: 0.34, pol: "rrr" },
  { id: "Pangolin Sword", name: "pangolinSword", tags: ["Melee", "Sword"], dmg: [["Puncture", 5.55], ["Slash", 29.6], ["Impact", 1.85]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 79, status: 0.12, pol: "r" },
  { id: "Scoliac", name: "scoliac", tags: ["Melee", "Whip"], dmg: [["Puncture", 8.25], ["Slash", 38.5], ["Impact", 8.25]], critMul: 1.5, critChance: 0.05, fireRate: 1.25, slideDmg: 118, status: 0.15, pol: "r" },
  { id: "Dual Keres", name: "dualKeres", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 13.2], ["Slash", 25.5], ["Impact", 5.3]], critMul: 2.6, critChance: 0.28, fireRate: 1.25, slideDmg: 264, status: 0.14 },
  { id: "Sydon", name: "sydon", tags: ["Melee", "Polearm"], dmg: [["Puncture", 71.3], ["Impact", 3.8]], critMul: 2, critChance: 0.1, fireRate: 0.917, slideDmg: 167, status: 0.25 },
  { id: "Kronen", name: "kronen", tags: ["Melee", "Tonfa"], dmg: [["Puncture", 6.5], ["Slash", 52], ["Impact", 6.5]], critMul: 1.5, critChance: 0.05, fireRate: 1.08, slideDmg: 390, status: 0.2 },
  { id: "Kronen Prime", name: "kronenPrime", rivenName: "Kronen", tags: ["Melee", "Tonfa"], dmg: [["Puncture", 6.6], ["Slash", 52.8], ["Impact", 6.6]], critMul: 2, critChance: 0.12, fireRate: 1.17, slideDmg: 396, status: 0.24, pol: "r-" },
  { id: "Tonbo", name: "tonbo", tags: ["Melee", "Polearm"], dmg: [["Puncture", 12], ["Slash", 60], ["Impact", 8]], critMul: 2, critChance: 0.05, fireRate: 1, slideDmg: 178, status: 0.25, pol: "r" },
  { id: "Obex", name: "obex", tags: ["Melee", "Sparring"], dmg: [["Puncture", 3.8], ["Slash", 3.7], ["Impact", 17.5]], critMul: 2, critChance: 0.25, fireRate: 1, slideDmg: 100, status: 0.1 },
  { id: "Prisma Obex", name: "prismaObex", rivenName: "Obex", tags: ["Melee", "Sparring"], dmg: [["Puncture", 3.8], ["Slash", 3.7], ["Impact", 17.5]], critMul: 2, critChance: 0.25, fireRate: 1.33, slideDmg: 100, status: 0.3 },
  { id: "Vaykor Sydon", name: "vaykorSydon", rivenName: "Sydon", tags: ["Melee", "Polearm"], dmg: [["Puncture", 80.8], ["Impact", 4.3]], critMul: 2, critChance: 0.15, fireRate: 1.08, slideDmg: 189, status: 0.25, pol: "r" },
  { id: "Ankyros", name: "ankyros", tags: ["Melee", "Fist"], dmg: [["Puncture", 4.5], ["Slash", 4.5], ["Impact", 21]], critMul: 2, critChance: 0.2, fireRate: 1.17, slideDmg: 90, status: 0.1 },
  { id: "Ankyros Prime", name: "ankyrosPrime", rivenName: "Ankyros", tags: ["Melee", "Fist"], dmg: [["Puncture", 5.7], ["Slash", 5.7], ["Impact", 26.6]], critMul: 2, critChance: 0.2, fireRate: 1.25, slideDmg: 114, status: 0.15, pol: "rr" },
  { id: "Silva & Aegis", name: "silvaAegis", tags: ["Melee", "Sword-Shield"], dmg: [["Heat", 35]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 75, status: 0.2 },
  { id: "Silva & Aegis Prime", name: "silvaAegisPrime", rivenName: "Silva & Aegis", tags: ["Melee", "Sword-Shield"], dmg: [["Heat", 120]], critMul: 2, critChance: 0.15, fireRate: 0.75, slideDmg: 257, status: 0.25, pol: "rdd" },
  { id: "Sheev", name: "sheev", tags: ["Melee", "Dagger"], dmg: [["Puncture", 2.25], ["Slash", 40.5], ["Impact", 2.25]], critMul: 2, critChance: 0.05, fireRate: 0.667, slideDmg: 96, status: 0.25, pol: "-" },
  { id: "Cadus", name: "cadus", tags: ["Melee", "Staff"], dmg: [["Electricity", 50]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 107, status: 0.25, pol: "d" },
  { id: "Heat Dagger", name: "heatDagger", tags: ["Melee", "Dagger"], dmg: [["Puncture", 36], ["Slash", 6.7], ["Impact", 2.3]], critMul: 1.5, critChance: 0.05, fireRate: 0.75, slideDmg: 96, status: 0.05, pol: "-" },
  { id: "Gazal Machete", name: "gazalMachete", tags: ["Melee", "Machete"], dmg: [["Puncture", 7.8], ["Slash", 39], ["Impact", 5.2]], critMul: 2, critChance: 0.1, fireRate: 1.08, slideDmg: 156, status: 0.25, pol: "r" },
  { id: "Ether Daggers", name: "etherDaggers", tags: ["Melee", "DualDaggers"], dmg: [["Puncture", 6.8], ["Slash", 31.5], ["Impact", 6.8]], critMul: 1.5, critChance: 0.05, fireRate: 0.833, slideDmg: 225, status: 0.15, pol: "d" },
  { id: "Dex Dakra", name: "dexDakra", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 6.5], ["Slash", 52], ["Impact", 6.5]], critMul: 2, critChance: 0.1, fireRate: 0.883, slideDmg: 390, status: 0.2, pol: "-" },
  { id: "Dark Sword", name: "darkSword", tags: ["Melee", "Sword"], dmg: [["Radiation", 37]], critMul: 1.5, critChance: 0.05, fireRate: 0.833, slideDmg: 79, status: 0.1 },
  { id: "Ripkas", name: "ripkas", tags: ["Melee", "Claws"], dmg: [["Puncture", 5.5], ["Slash", 46.8], ["Impact", 2.8]], critMul: 2, critChance: 0.2, fireRate: 0.883, slideDmg: 165, status: 0.15, pol: "r" },
  { id: "Broken Scepter", name: "brokenScepter", tags: ["Melee", "Staff"], dmg: [["Puncture", 6], ["Slash", 12], ["Impact", 42]], critMul: 2, critChance: 0.1, fireRate: 1.25, slideDmg: 129, status: 0.3, pol: "-" },
  { id: "Orthos", name: "orthos", tags: ["Melee", "Polearm"], dmg: [["Puncture", 7.5], ["Slash", 35], ["Impact", 7.5]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 111, status: 0.15 },
  { id: "Orthos Prime", name: "orthosPrime", rivenName: "Orthos", tags: ["Melee", "Polearm"], dmg: [["Puncture", 9.75], ["Slash", 45.5], ["Impact", 9.75]], critMul: 2, critChance: 0.1, fireRate: 1.17, slideDmg: 144, status: 0.15 },
  { id: "Twin Basolk", name: "twinBasolk", tags: ["Melee", "DualSwords"], dmg: [["Heat", 65]], critMul: 2, critChance: 0.05, fireRate: 1, slideDmg: 390, status: 0.4, pol: "r" },
  { id: "Scindo", name: "scindo", tags: ["Melee", "HeavyBlade"], dmg: [["Puncture", 10], ["Slash", 80], ["Impact", 10]], critMul: 1.5, critChance: 0.15, fireRate: 0.917, slideDmg: 200, status: 0.1 },
  { id: "Scindo Prime", name: "scindoPrime", rivenName: "Scindo", tags: ["Melee", "HeavyBlade"], dmg: [["Puncture", 13], ["Slash", 104], ["Impact", 13]], critMul: 2, critChance: 0.2, fireRate: 0.967, slideDmg: 260, status: 0.15, pol: "r" },
  { id: "Krohkur", name: "krohkur", tags: ["Melee", "Sword"], dmg: [["Puncture", 12.6], ["Slash", 49], ["Impact", 8.4]], critMul: 1.7, critChance: 0.29, fireRate: 0.833, slideDmg: 150, status: 0.19 },
  { id: "Tipedo", name: "tipedo", tags: ["Melee", "Staff"], dmg: [["Puncture", 5], ["Slash", 40], ["Impact", 5]], critMul: 2, critChance: 0.2, fireRate: 1.33, slideDmg: 107, status: 0.2, pol: "d" },
  { id: "Okina", name: "okina", tags: ["Melee", "DualDaggers"], dmg: [["Puncture", 18], ["Slash", 20], ["Impact", 2]], critMul: 2, critChance: 0.05, fireRate: 1.08, slideDmg: 200, status: 0.15, pol: "r" },
  { id: "Shaku", name: "shaku", tags: ["Melee", "Nunchaku"], dmg: [["Puncture", 0], ["Slash", 0], ["Impact", 55]], critMul: 2, critChance: 0.075, fireRate: 1.17, slideDmg: 118, status: 0.25 },
  { id: "Kestrel", name: "kestrel", tags: ["Melee", "Glaive"], dmg: [["Puncture", 5.3], ["Slash", 5.2], ["Impact", 24.5]], critMul: 2, critChance: 0.1, fireRate: 1.08, slideDmg: 175, status: 0.1, pol: "r-" },
  { id: "Kestrel (charged)", name: "kestrel", mode: "charged", rivenName: "Kestrel", tags: ["Melee", "Glaive"], dmg: [["Puncture", 15], ["Slash", 15], ["Impact", 120]], critMul: 2, critChance: 0.1, fireRate: 1.08, slideDmg: 0, status: 0.1, fltSpeed: 30, pol: "r-" },
  { id: "Dark Split-Sword (Heavy Blade)", name: "darkSplitSword", mode: "heavyBlade", rivenName: "Dark Split-Sword", tags: ["Melee", "HeavyBlade"], dmg: [["Radiation", 90]], critMul: 2, critChance: 0.1, fireRate: 0.917, slideDmg: 180, status: 0.25, pol: "r" },
  { id: "Dark Split-Sword (Dual Swords)", name: "darkSplitSword", mode: "dualSwords", rivenName: "Dark Split-Sword", tags: ["Melee", "DualSwords"], dmg: [["Radiation", 65]], critMul: 2.5, critChance: 0.25, fireRate: 1.17, slideDmg: 390, status: 0.15, pol: "r" },
  { id: "Reaper Prime", name: "reaperPrime", tags: ["Melee", "Scythe"], dmg: [["Puncture", 11.3], ["Slash", 52.5], ["Impact", 11.3]], critMul: 2, critChance: 0.2, fireRate: 1.08, slideDmg: 150, status: 0.12 },
  { id: "Glaive", name: "glaive", tags: ["Melee", "Glaive"], dmg: [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], critMul: 2, critChance: 0.1, fireRate: 1, slideDmg: 225, status: 0.1, pol: "r-" },
  { id: "Glaive (charged)", name: "glaive", mode: "charged", rivenName: "Glaive", tags: ["Melee", "Glaive"], dmg: [["Puncture", 30], ["Slash", 140], ["Impact", 30], ["Blast", 50]], critMul: 2, critChance: 0.1, fireRate: 1, slideDmg: 0, status: 0.1, fltSpeed: 20, pol: "r-" },
  { id: "Glaive Prime", name: "glaivePrime", rivenName: "Glaive", tags: ["Melee", "Glaive"], dmg: [["Puncture", 7.5], ["Slash", 35], ["Impact", 7.5]], critMul: 2, critChance: 0.15, fireRate: 1.25, slideDmg: 250, status: 0.3, fltSpeed: 40, pol: "r-" },
  { id: "Glaive Prime (charged)", name: "glaivePrime", mode: "charged", rivenName: "Glaive", tags: ["Melee", "Glaive"], dmg: [["Puncture", 37.5], ["Slash", 37.5], ["Impact", 175], ["Blast", 175]], critMul: 2, critChance: 0.15, fireRate: 1.25, slideDmg: 0, status: 0.3, fltSpeed: 40, pol: "r-" },
  { id: "Cronus", name: "cronus", tags: ["Melee", "Sword"], dmg: [["Puncture", 5.3], ["Slash", 19.2], ["Impact", 10.5]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 75, status: 0.1, pol: "r" },
  { id: "Dual Ether", name: "dualEther", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 6], ["Slash", 28], ["Impact", 6]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 240, status: 0.1 },
  { id: "Dual Heat Swords", name: "dualHeatSwords", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 6.75], ["Slash", 31.5], ["Impact", 6.75]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 270, status: 0.1, pol: "-" },
  { id: "Halikar", name: "halikar", tags: ["Melee", "Glaive"], dmg: [["Puncture", 36], ["Slash", 4.5], ["Impact", 4.5]], critMul: 2, critChance: 0.1, fireRate: 1.17, slideDmg: 225, status: 0.2, pol: "r-" },
  { id: "Halikar (charged)", name: "halikar", mode: "charged", rivenName: "Halikar", tags: ["Melee", "Glaive"], dmg: [["Puncture", 160], ["Slash", 20], ["Impact", 20], ["Blast", 150]], critMul: 2, critChance: 0.1, fireRate: 1.17, slideDmg: 0, status: 0.2, fltSpeed: 30, pol: "r-" },
  { id: "Ether Reaper", name: "etherReaper", tags: ["Melee", "Scythe"], dmg: [["Puncture", 9.8], ["Slash", 45.5], ["Impact", 9.8]], critMul: 2, critChance: 0.15, fireRate: 1.08, slideDmg: 130, status: 0.15, pol: "r" },
  { id: "Venka", name: "venka", tags: ["Melee", "Claws"], dmg: [["Puncture", 9.25], ["Slash", 25.9], ["Impact", 1.85]], critMul: 2, critChance: 0.15, fireRate: 1, slideDmg: 111, status: 0.15 },
  { id: "Venka Prime", name: "venkaPrime", rivenName: "Venka", tags: ["Melee", "Claws"], dmg: [["Puncture", 11], ["Slash", 41.25], ["Impact", 2.75]], critMul: 2.5, critChance: 0.25, fireRate: 1.05, slideDmg: 165, status: 0.15, pol: "-r" },
  { id: "Dark Dagger", name: "darkDagger", tags: ["Melee", "Dagger"], dmg: [["Radiation", 35]], critMul: 1.5, critChance: 0.05, fireRate: 0.917, slideDmg: 75, status: 0.1 },
  { id: "Rakta Dark Dagger", name: "raktaDarkDagger", rivenName: "Dark Dagger", tags: ["Melee", "Dagger"], dmg: [["Radiation", 50]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 107, status: 0.1, pol: "r" },
  { id: "Heliocor", name: "heliocor", tags: ["Melee", "Hammer"], dmg: [["Puncture", 14], ["Slash", 7], ["Impact", 119]], critMul: 2, critChance: 0.25, fireRate: 0.833, slideDmg: 280, status: 0.025 },
  { id: "Synoid Heliocor", name: "synoidHeliocor", rivenName: "Heliocor", tags: ["Melee", "Hammer"], dmg: [["Puncture", 12], ["Slash", 6], ["Impact", 102]], critMul: 2, critChance: 0.1, fireRate: 1.08, slideDmg: 240, status: 0.2 },
  { id: "Dual Zoren", name: "dualZoren", tags: ["Melee", "DualSwords"], dmg: [["Puncture", 1.5], ["Slash", 27], ["Impact", 1.5]], critMul: 3, critChance: 0.25, fireRate: 1.17, slideDmg: 180, status: 0.05, pol: "d" },
  { id: "Lecta", name: "lecta", tags: ["Melee", "Whip"], dmg: [["Electricity", 45]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 96, status: 0.25 },
  { id: "Secura Lecta", name: "securaLecta", rivenName: "Lecta", tags: ["Melee", "Whip"], dmg: [["Electricity", 75]], critMul: 1.5, critChance: 0.05, fireRate: 1.25, slideDmg: 161, status: 0.25, pol: "d" },
  { id: "Kesheg", name: "kesheg", tags: ["Melee", "Polearm"], dmg: [["Puncture", 10.5], ["Slash", 52.5], ["Impact", 42]], critMul: 2.5, critChance: 0.075, fireRate: 0.833, slideDmg: 233, status: 0.1, pol: "r" },
  { id: "Mire", name: "mire", tags: ["Melee", "Sword"], dmg: [["Puncture", 5.25], ["Slash", 24.5], ["Impact", 5.25]], critMul: 1.5, critChance: 0.05, fireRate: 1.08, slideDmg: 75, status: 0.1 },
  { id: "Sarpa", name: "sarpa", tags: ["Melee", "Gunblade"], dmg: [["Puncture", 14], ["Slash", 49], ["Impact", 7]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 210, status: 0.1, pol: "d" },
  { id: "War", name: "war", tags: ["Melee", "HeavyBlade"], dmg: [["Puncture", 3.5], ["Slash", 24.5], ["Impact", 112]], critMul: 2, critChance: 0.2, fireRate: 0.917, slideDmg: 280, status: 0.2, pol: "-" },
  { id: "Zenistar", name: "zenistar", tags: ["Melee", "HeavyBlade"], dmg: [["Heat", 130]], critMul: 2, critChance: 0.05, fireRate: 0.833, slideDmg: 260, status: 0.25, pol: "r" },
  { id: "Zenistar (aura)", name: "zenistar", mode: "aura", rivenName: "Zenistar", tags: ["Melee", "HeavyBlade"], dmg: [["Heat", 50]], critMul: 2, critChance: 0.05, fireRate: 0.833, slideDmg: 0, status: 0.5, pol: "r" },
  { id: "Volnus", name: "volnus", tags: ["Melee", "Hammer"], dmg: [["Puncture", 32], ["Slash", 46], ["Impact", 22]], critMul: 1.6, critChance: 0.18, fireRate: 1.2, slideDmg: 200, status: 0.3, pol: "r" },
  { id: "Jat Kusar", name: "jatKusar", tags: ["Melee", "BladeAndWhip"], dmg: [["Heat", 80]], critMul: 2.5, critChance: 0.35, fireRate: 0.833, slideDmg: 171, status: 0.05, pol: "rr" },
  { id: "Orvius", name: "orvius", tags: ["Melee", "Glaive"], dmg: [["Puncture", 3.5], ["Slash", 52.5], ["Impact", 14]], critMul: 2, critChance: 0.15, fireRate: 0.75, slideDmg: 350, status: 0.15, pol: "-r" },
  { id: "Orvius (charged)", name: "orvius", mode: "charged", rivenName: "Orvius", tags: ["Melee", "Glaive"], dmg: [["Puncture", 10], ["Slash", 150], ["Impact", 40], ["Cold", 150]], critMul: 2, critChance: 0.15, fireRate: 0.75, slideDmg: 0, status: 0.15, fltSpeed: 30, pol: "-r" },
  { id: "Cassowar", name: "cassowar", tags: ["Melee", "Polearm"], dmg: [["Puncture", 23.8], ["Slash", 30.8], ["Impact", 15.4]], critMul: 1.4, critChance: 0.06, fireRate: 1.17, slideDmg: 156, status: 0.28, pol: "rd" },
  { id: "Plasma Sword", name: "plasmaSword", tags: ["Melee", "Sword"], dmg: [["Electricity", 35]], critMul: 2, critChance: 0.15, fireRate: 0.667, slideDmg: 75, status: 0.15 },
  { id: "Ohma", name: "ohma", tags: ["Melee", "Tonfa"], dmg: [["Electricity", 100]], critMul: 2, critChance: 0.15, fireRate: 0.917, slideDmg: 600, status: 0.3 },
  { id: "Ether Sword", name: "etherSword", tags: ["Melee", "Sword"], dmg: [["Puncture", 5.55], ["Slash", 25.9], ["Impact", 5.55]], critMul: 1.5, critChance: 0.05, fireRate: 1, slideDmg: 79, status: 0.1 },
  { id: "Hate", name: "hate", tags: ["Melee", "Scythe"], dmg: [["Puncture", 10.5], ["Slash", 49], ["Impact", 10.5]], critMul: 2.5, critChance: 0.2, fireRate: 0.917, slideDmg: 140, status: 0.15 },
  { id: "Ninkondi", name: "ninkondi", tags: ["Melee", "Nunchaku"], dmg: [["Electricity", 45]], critMul: 2, critChance: 0.1, fireRate: 1, slideDmg: 96, status: 0.35 },
  { id: "Guandao", name: "guandao", tags: ["Melee", "Polearm"], dmg: [["Puncture", 4.5], ["Slash", 63], ["Impact", 22.5]], critMul: 2.2, critChance: 0.24, fireRate: 0.833, slideDmg: 200, status: 0.04, pol: "dr" },
  { id: "Broken War", name: "brokenWar", tags: ["Melee", "Sword"], dmg: [["Puncture", 9], ["Slash", 72], ["Impact", 9]], critMul: 1.5, critChance: 0.15, fireRate: 1, slideDmg: 193, status: 0.1, pol: "r-" },
  { id: "Paracesis", name: "paracesis", tags: ["Melee", "HeavyBlade"], dmg: [["Puncture", 11.5], ["Slash", 100.8], ["Impact", 31.7]], critMul: 2.6, critChance: 0.31, fireRate: 0.917, slideDmg: 288, status: 0.12 },
  { id: "Pupacyst", name: "pupacyst", tags: ["Melee", "Polearm"], dmg: [["Viral", 43], ["Impact", 47]], critMul: 1.5, critChance: 0.13, fireRate: 0.833, slideDmg: 193, status: 0.27, pol: "r" },
  { id: "Falcor", name: "falcor", tags: ["Melee", "Glaive"], dmg: [["Electricity", 28], ["Puncture", 4], ["Slash", 34], ["Impact", 12]], critMul: 1.6, critChance: 0.12, fireRate: 0.833, slideDmg: 390, status: 0.28 },
  { id: "Falcor (charged)", name: "falcor", mode: "charged", rivenName: "Falcor", tags: ["Melee", "Glaive"], dmg: [["Electricity", 435], ["Puncture", 80], ["Slash", 100], ["Impact", 50]], critMul: 1.6, critChance: 0.12, fireRate: 0.833, slideDmg: 0, status: 0.28, fltSpeed: 30 },
  { id: "Kreska", name: "kreska", tags: ["Melee", "Machete"], dmg: [["Heat", 40], ["Puncture", 5], ["Slash", 15], ["Impact", 10]], critMul: 2, critChance: 0.14, fireRate: 0.917, slideDmg: 210, status: 0.22, pol: "r" },
  { id: "Cobra & Crane", name: "cobraCrane", tags: ["Melee", "Sword-Shield"], dmg: [["Puncture", 10], ["Impact", 90]], critMul: 1.5, critChance: 0.1, fireRate: 0.917, slideDmg: 214, status: 0.36 },
  { id: "Wolf Sledge", name: "wolfSledge", tags: ["Melee", "Hammer"], dmg: [["Puncture", 3.4], ["Slash", 52.9], ["Impact", 58.6]], critMul: 1.9, critChance: 0.17, fireRate: 1, slideDmg: 230, status: 0.33 },
  { id: "Wolf Sledge (charged)", name: "wolfSledge", mode: "charged", rivenName: "Wolf Sledge", tags: ["Melee", "Hammer"], dmg: [["Puncture", 17.2], ["Slash", 264.6], ["Impact", 293.2]], critMul: 1.9, critChance: 0.17, fireRate: 1, slideDmg: 0, status: 0.33, fltSpeed: 50 },
  // 显赫武器
  { id: "Diwata", name: "diwata", tags: ["Melee", "Exalted"], dmg: [["Puncture", 150], ["Slash", 20], ["Impact", 30]], critMul: 2, critChance: 0.2, fireRate: 1.08, slideDmg: 429, status: 0.1, pol: "rr-" },
  { id: "Iron Staff", name: "ironStaff", tags: ["Melee", "Exalted"], dmg: [["Puncture", 37.5], ["Impact", 212.5]], critMul: 2, critChance: 0.25, fireRate: 1, slideDmg: 536, status: 0.1, pol: "r--" },
  { id: "Valkyr Talons", name: "valkyrTalons", tags: ["Melee", "Exalted"], dmg: [["Puncture", 83.3], ["Slash", 83.3], ["Impact", 83.3]], critMul: 2, critChance: 0.5, fireRate: 1.5, slideDmg: 750, status: 0.1, pol: "r--" },
  { id: "Exalted Blade", name: "exaltedBlade", tags: ["Melee", "Exalted"], dmg: [["Puncture", 37.5], ["Slash", 175], ["Impact", 37.5]], critMul: 2, critChance: 0.15, fireRate: 0.833, slideDmg: 536, status: 0.1, pol: "rr-" },
  { id: "Desert Wind", name: "desertWind", tags: ["Melee", "Exalted"], dmg: [["Impact", 250]], critMul: 2, critChance: 0.5, fireRate: 1, slideDmg: 750, status: 0.1, pol: "rrd" },
  // 虚拟技能武器
  { id: "Whipclaw", name: "whipclaw", tags: ["Melee", "Exalted", "Virtual"], dmg: [["Puncture", 90], ["Slash", 120], ["Impact", 90]], critMul: 2, critChance: 0.25, fireRate: 1, slideDmg: 0, status: 0.2 },
  { id: "Shattered Lash", name: "shatteredLash", tags: ["Melee", "Exalted", "Virtual"], dmg: [["Puncture", 800]], critMul: 1, critChance: 0, fireRate: 1, slideDmg: 0, status: 0 },
  { id: "Landslide", name: "landslide", tags: ["Melee", "Exalted", "Virtual"], dmg: [["Impact", 350]], critMul: 2, critChance: 0.05, fireRate: 1, slideDmg: 0, status: 0.05 },
  // 守护武器
  { id: "Deconstructor", name: "deconstructor", rivenName: "Deconstructor", tags: ["Melee", "Robotic", "Glaive"], dmg: [["Impact", 50]], critChance: 0, critMul: 1, fireRate: 1.3, slideDmg: 0, status: 0.25 },
  { id: "Deconstructor Prime", name: "deconstructorPrime", rivenName: "Deconstructor", tags: ["Melee", "Robotic", "Glaive"], dmg: [["Impact", 75]], critChance: 0, critMul: 1, fireRate: 1.33, slideDmg: 0, status: 0.25 }
] as MeleeWeaponData[]).map(v => new MeleeWeapon(v));
