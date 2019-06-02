import { hAccSum } from "@/warframe/util";
import { Weapon } from "@/warframe/codex";
import { i18n } from "@/i18n";
import _ from "lodash";
import { WeaponTag, CoreWeaponMode } from "./weapon";

/**
 * 枪膛
 */
export interface KitgunChamber {
  index: number;
  id: string;
  name: string;
  dmgs: [string, number][];
  critChance: number;
  procChance: number;
  magazine: number[];
  accuracy: number;
  rangeLimit?: number[];
}

/**
 * 握把
 */
export interface KitgunGrip {
  index: number;
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
  index: number;
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
  [0, "Catchmoon", [["Heat", 167], ["Impact", 89]], 0.21, 0.21, [5, 7, 11, 13], 5.9],
  [1, "Gaze", [["Puncture", 6], ["Radiation", 10]], 0.25, 0.25, [23, 31, 43, 51], 100],
  [2, "Rattleguts", [["Impact", -1], ["Puncture", 7], ["Slash", 5], ["Radiation", 10]], 0.19, 0.19, [29, 45, 67, 83], 26],
  [3, "Tombfinger", [["Impact", 12], ["Puncture", 5], ["Radiation", 43]], 0.24, 0.24, [9, 15, 23, 29], 50]
] as [number, string, [string, number][], number, number, number[], number][];

const _kitgunGrip = [
  [0, "Gibber", [[-48, 3.17], [0, 12], [0, 11], [-4, 4.5]]],
  [1, "Ramble", [[-24, 2.5], [0.5, 12], [1.5, 8.83], [0, 3.67]]],
  [2, "Lovetap", [[51, 1.5], [1.5, 12], [7.8, 5.17], [12, 2.5]]],
  [3, "Haymaker", [[102, 1.17], [2, 12], [12.5, 3.67], [20, 2.17]]]
] as [number, string, [number, number][]][];

const _kitgunLoader = [
  [0, "Flutterfire", -0.3, -0.08, 0.14, 0, 1, []],
  [1, "Ramflare", -0.3, -0.08, 0.14, 0.4, 2, []],
  [2, "Zipfire", -0.1, -0.04, 0.07, -0.4, 0, []],
  [3, "Swiftfire", -0.1, -0.04, 0.07, 0, 1, []],
  [4, "Sparkfire", -0.1, -0.04, 0.07, 0.4, 2, []],
  [5, "Thunderdrum", -0.1, -0.04, 0.07, 0.8, 3, [{ chamberID: "Catchmoon", critChance: -0.08, procChance: 0.14 }]],
  [6, "Zip", 0, 0, 0, -0.4, 0, []],
  [7, "Slap", 0, 0, 0, 0, 1, []],
  [8, "Deepbreath", 0, 0, 0, 0.4, 2, []],
  [9, "Bellows", 0, 0, 0, 0.8, 3, []],
  [10, "Zipneedle", 0.1, 0.07, -0.04, -0.4, 0, []],
  [11, "Slapneedle", 0.1, 0.07, -0.04, 0, 1, []],
  [12, "Bashrack", 0.1, 0.07, -0.04, 0.4, 2, []],
  [13, "Stitch", 0.1, 0.07, -0.04, 0.8, 3, []],
  [14, "Killstream", 0.3, 0.14, -0.08, 0, 1, []],
  [15, "Splat", 0.3, 0.14, -0.08, 0.4, 2, []]
] as [number, string, number, number, number, number, number, LoaderChamberData[]][];

export const KitgunChamberData: KitgunChamber[] = _kitgunChamber.map(v => ({
  index: v[0],
  id: _.camelCase(v[1]),
  name: v[1],
  dmgs: v[2],
  critChance: v[3],
  procChance: v[4],
  magazine: v[5],
  accuracy: v[6]
}));

export const KitgunGripData: KitgunGrip[] = _kitgunGrip.map(v => ({
  index: v[0],
  id: _.camelCase(v[1]),
  name: v[1],
  chambersData: v[2].map(k => ({
    dmgAdd: k[0],
    fireRate: k[1]
  }))
}));

export const KitgunLoaderData: KitgunLoader[] = _kitgunLoader.map(v => ({
  index: v[0],
  id: _.camelCase(v[1]),
  name: v[1],
  critDamage: v[2],
  critChance: v[3],
  procChance: v[4],
  reloadTime: v[5],
  magazineIndex: v[6],
  chambersData: v[7]
}));

export const NoneKitgunGripData: number[] = [3, 0, 2, 3];

export const NoneKitgunLoaderData: KitgunLoader = KitgunLoaderData[14];

export class Kitgun extends Weapon {
  chamber: KitgunChamber;
  grip: KitgunGrip;
  loader: KitgunLoader;

  static loadGrip(chamber: KitgunChamber, grip: KitgunGrip) {
    return grip.chambersData[chamber.index];
  }
  static loadLoader(chamber: KitgunChamber, loader: KitgunLoader) {
    let data = loader.chambersData.find(v => v.chamberID === chamber.name);
    return {
      name: loader.name,
      critDamage: loader.critDamage,
      critChance: (data && data.critChance) || loader.critChance,
      procChance: (data && data.procChance) || loader.procChance,
      reload: (data && data.reload) || loader.reloadTime,
      magazine: chamber.magazine[loader.magazineIndex]
    } as KitgunLoaderDisplay;
  }
  get tags() {
    return new WeaponTag(this.name === "Gaze" ? ["Gun", "Secondary", "Kitgun", "Continuous"] : ["Gun", "Secondary", "Kitgun"]);
  }
  get url() {
    return `KITGUN-${this.chamber.name}-${this.grip.name}-${this.loader.name}`;
  }
  set url(value) {
    let parts = value.split("-");
    this.chamber = KitgunChamberData.find(v => v.name === parts[1]);
    this.grip = KitgunGripData.find(v => v.name === parts[2]) || KitgunGripData[NoneKitgunGripData[this.chamber.index]];
    this.loader = KitgunLoaderData.find(v => v.name === parts[3]) || NoneKitgunLoaderData;
    this.recalc();
  }
  constructor(chamber: KitgunChamber | string, grip: KitgunGrip = null, loader: KitgunLoader = null) {
    super();
    if (typeof chamber === "string") {
      this.url = chamber;
    } else {
      [this.chamber, this.grip, this.loader] = [chamber, grip || KitgunGripData[NoneKitgunGripData[chamber.index]], loader || NoneKitgunLoaderData];
      if (chamber) this.recalc();
    }
  }
  recalc() {
    const grip = this.grip.chambersData[this.chamber.index];
    const loader = Kitgun.loadLoader(this.chamber, this.loader);

    this.name = this.chamber.name;
    const mode = {} as CoreWeaponMode;
    mode.damage = this.chamber.dmgs
      .map(([n, v]) => [n, hAccSum(v, (this.name === "Tombfinger" && n === "Radiation" ? 4 : 1) * grip.dmgAdd)] as [string, number])
      .filter(v => v[1] > 0)
    mode.critMul = hAccSum(loader.critDamage, 2);
    mode.critChance = hAccSum(this.chamber.critChance, loader.critChance);
    mode.procChance = hAccSum(this.chamber.procChance, loader.procChance);
    mode.fireRate = grip.fireRate;
    mode.accuracy = this.chamber.accuracy;
    this.reload = hAccSum(1.3, loader.reload);
    this.magazine = loader.magazine;
    switch (this.name) {
      case "Catchmoon":
        mode.prjSpeed = 70;
        mode.range = 40;
        break;
      case "Tombfinger":
        mode.prjSpeed = 200;
        break;
      case "Gaze":
        mode.range = [41, 38, 25, 22][this.grip.index];
        break;
    }
    this.modes = [mode];
  }
  get displayName() {
    return `${i18n.t(`messages.${this.chamber.id}`)}-${i18n.t(`messages.${this.grip.id}`)}-${i18n.t(`messages.${this.loader.id}`)}` as string;
  }
}
