import _ from "lodash";
import { hAccSum } from "@/warframe/util";
import { GunWeapon } from "@/warframe/codex/weapon";
import { i18n } from "@/i18n";

/**
 * 枪膛
 */
export interface KitgunChamber {
  id: string;
  name: string;
  dmgs: [string, number][];
  critChance: number;
  procChance: number;
  magazine: number[];
  accuracy: number;
}

/**
 * 握把
 */
export interface KitgunGrip {
  id: string;
  name: string;
  chambersData: GripChamberData[];
}
/**
 * 枪膛-握把 组合数据
 */
export interface GripChamberData {
  dmgAdd: number;
  fireRate: number;
}

/**
 * 填弹器
 */
export interface KitgunLoader {
  id: string;
  name: string;
  critDamage: number;
  critChance: number;
  procChance: number;
  reloadTime: number;
  magazineIndex: number;
  chambersData: LoaderChamberData[];
}

export interface KitgunLoaderDisplay {
  id: string;
  name: string;
  critDamage: number;
  critChance: number;
  procChance: number;
  reload: number;
  magazine: number;
}

/**
 * 枪膛-填弹器 组合数据
 */
export interface LoaderChamberData {
  chamberID: string;
  reload?: number;
  critChance?: number;
  procChance?: number;
}

const _kitgunChamber = [
  ["1", "catchmoon", [["Heat", 167], ["Impact", 89]], 0.21, 0.21, [5, 7, 11, 13], 5.9],
  ["2", "gaze", [["Puncture", 6], ["Radiation", 10]], 0.25, 0.25, [23, 31, 43, 51], 100],
  ["3", "rattleguts", [["Impact", -1], ["Puncture", 7], ["Slash", 5], ["Radiation", 10]], 0.19, 0.19, [29, 45, 67, 83], 26],
  ["4", "tombfinger", [["Impact", 16], ["Puncture", 9], ["Radiation", 59]], 0.24, 0.24, [9, 15, 23, 29], 50],
] as [string, string, [string, number][], number, number, number[], number][];

const _kitgunGrip = [
  ["1", "gibber", [[0, 3.17], [0, 12], [0, 11], [0, 4.5]]],
  ["2", "haymaker", [[102, 1.17], [2, 12], [12.5, 3.67], [16, 2.17]]],
  ["3", "lovetap", [[51, 1.5], [1.5, 12], [7.8, 5.17], [8, 2.5]]],
  ["4", "ramble", [[0, 2.5], [0.5, 12], [1.5, 8.83], [0, 3.67]]],
] as [string, string, [number, number][]][];

const _kitgunLoader = [
  ["7", "slap", 0, 0, 0, 0, 2, []],
  ["3", "deepbreath", 0, 0, 0, 0.4, 3, []],
  ["2", "bellows", 0, 0, 0, 0.8, 2, []],
  ["E", "zip", 0, 0, 0, -0.4, 1, []],
  ["F", "zipfire", -0.1, -0.04, 0.07, -0.4, 1, []],
  ["1", "bashrack", 0.1, 0.07, -0.04, 0.4, 2, []],
  ["G", "zipneedle", 0.1, 0.07, -0.04, -0.4, 1, []],
  ["9", "sparkfire", -0.1, -0.04, 0.07, 0.4, 1, []],
  ["C", "swiftfire", -0.1, -0.04, 0.07, 0, 2, []],
  ["6", "ramflare", -0.3, -0.08, 0.14, 0.4, 2, []],
  ["D", "thunderdrum", -0.1, -0.04, 0.07, 0.8, 3, [{ chamberID: "1", critChance: -0.08, procChance: 0.14 }]],
  ["4", "flutterfire", -0.3, -0.08, 0.14, 0, 1, []],
  ["8", "slapneedle", 0.1, 0.07, -0.04, 0, 3, []],
  ["B", "stitch", 0.1, 0.07, -0.04, 0.8, 0, []],
  ["A", "splat", 0.3, 0.14, -0.08, 0.4, 0, [{ chamberID: "2", reload: -0.1 }]],
  ["5", "killstream", 0.3, 0.14, -0.08, 0, 0, [{ chamberID: "1", procChance: -0.1 }]],
] as [string, string, number, number, number, number, number, LoaderChamberData[]][];

export const KitgunChamberData: KitgunChamber[] = _kitgunChamber.map(v => ({
  id: v[0],
  name: v[1],
  dmgs: v[2],
  critChance: v[3],
  procChance: v[4],
  magazine: v[5],
  accuracy: v[6],
}));

export const KitgunGripData: KitgunGrip[] = _kitgunGrip.map(v => ({
  id: v[0],
  name: v[1],
  chambersData: v[2].map(k => ({
    dmgAdd: k[0],
    fireRate: k[1],
  })),
}));

export const KitgunLoaderData: KitgunLoader[] = _kitgunLoader.map(v => ({
  id: v[0],
  name: v[1],
  critDamage: v[2],
  critChance: v[3],
  procChance: v[4],
  reloadTime: v[5],
  magazineIndex: v[6],
  chambersData: v[7],
}));

export const NoneKitgunGripData: KitgunGrip = KitgunGripData[0];

export const NoneKitgunLoaderData: KitgunLoader = KitgunLoaderData[0];

export class Kitgun implements GunWeapon {
  chamber: KitgunChamber;
  grip: KitgunGrip;
  loader: KitgunLoader;

  bullets: number = 1;
  ammo: number = 210;
  ammoMode?: number;
  prjSpeed?: number;

  id: string;
  name: string;
  dmg: [string, number][];
  fireRate: number;
  critMul: number;
  critChance: number;
  status: number;
  reload: number;
  magazine: number;
  accuracy: number;

  static loadGrip(chamber: KitgunChamber, grip: KitgunGrip) {
    return grip.chambersData[+chamber.id - 1];
  }
  static loadLoader(chamber: KitgunChamber, loader: KitgunLoader) {
    let data = loader.chambersData.find(v => v.chamberID === chamber.id);
    return {
      id: loader.id,
      name: loader.name,
      critDamage: loader.critDamage,
      critChance: data && data.critChance || loader.critChance,
      procChance: data && data.procChance || loader.procChance,
      reload: data && data.reload || loader.reloadTime,
      magazine: chamber.magazine[loader.magazineIndex],
    } as KitgunLoaderDisplay;
  }

  get panelDamage() { return this.dmg.reduce((a, b) => a + b[1], 0); }
  get tags() { return ["Gun", "Secondary", "KITGUN"]; }
  get url() { return `KITGUN-${this.chamber.id}-${this.grip.id}-${this.loader.id}`; }
  set url(value) {
    let parts = value.split("-");
    this.chamber = KitgunChamberData.find(v => v.id === parts[1]);
    this.grip = KitgunGripData.find(v => v.id === parts[2]) || NoneKitgunGripData;
    this.loader = KitgunLoaderData.find(v => v.id === parts[3]) || NoneKitgunLoaderData;
    this.recalc();
  }
  constructor(chamber: KitgunChamber | string, grip: KitgunGrip = null, loader: KitgunLoader = null) {
    if (typeof chamber === "string") {
      this.url = chamber;
    }
    else {
      [this.chamber, this.grip, this.loader] = [chamber, grip || NoneKitgunGripData, loader || NoneKitgunLoaderData];
      if (chamber) this.recalc();
    }
  }
  recalc() {
    const chamberID = +this.chamber.id;
    const grip = this.grip.chambersData[chamberID - 1];

    this.id = _.startCase(this.chamber.name);
    this.name = this.chamber.name;
    this.critMul = hAccSum(this.loader.critDamage, 2);
    this.critChance = hAccSum(this.chamber.critChance, this.loader.critChance);
    this.status = hAccSum(this.chamber.procChance, this.loader.procChance);
    this.fireRate = grip.fireRate;
    this.dmg = this.chamber.dmgs.map(([n, v]) => [n, hAccSum(v, grip.dmgAdd)] as [string, number]).filter(v => v[1] > 0);
    this.reload = hAccSum(1.3, this.loader.reloadTime);
    this.magazine = this.chamber.magazine[this.loader.magazineIndex];
    this.accuracy = this.chamber.accuracy;
  }
  get displayName() {
    return `${i18n.t(`messages.${this.chamber.name}`)}-${i18n.t(`messages.${this.grip.name}`)}-${i18n.t(`messages.${this.loader.name}`)}` as string;
  }
}
