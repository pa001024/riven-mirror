import { hAccSum } from "@/warframe/util";
import { GunWeapon } from "@/warframe/codex/weapon";
import { i18n } from "@/i18n";

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
  [0, "Catchmoon", "catchmoon", [["Heat", 167], ["Impact", 89]], 0.21, 0.21, [5, 7, 11, 13], 5.9],
  [1, "Gaze", "gaze", [["Puncture", 6], ["Radiation", 10]], 0.25, 0.25, [23, 31, 43, 51], 100],
  [2, "Rattleguts", "rattleguts", [["Impact", -1], ["Puncture", 7], ["Slash", 5], ["Radiation", 10]], 0.19, 0.19, [29, 45, 67, 83], 26],
  [3, "Tombfinger", "tombfinger", [["Impact", 12], ["Puncture", 5], ["Radiation", 43]], 0.24, 0.24, [9, 15, 23, 29], 50],
] as [number, string, string, [string, number][], number, number, number[], number][];

const _kitgunGrip = [
  [0, "Gibber", "gibber", [[-48, 3.17], [0, 12], [0, 11], [-4, 4.5]]],
  [1, "Ramble", "ramble", [[-24, 2.5], [0.5, 12], [1.5, 8.83], [0, 3.67]]],
  [2, "Lovetap", "lovetap", [[51, 1.5], [1.5, 12], [7.8, 5.17], [12, 2.5]]],
  [3, "Haymaker", "haymaker", [[102, 1.17], [2, 12], [12.5, 3.67], [20, 2.17]]],
] as [number, string, string, [number, number][]][];

const _kitgunLoader = [
  [0, "Flutterfire", "flutterfire", -0.3, -0.08, 0.14, 0, 1, []],
  [1, "Ramflare", "ramflare", -0.3, -0.08, 0.14, 0.4, 2, []],
  [2, "Zipfire", "zipfire", -0.1, -0.04, 0.07, -0.4, 0, []],
  [3, "Swiftfire", "swiftfire", -0.1, -0.04, 0.07, 0, 1, []],
  [4, "Sparkfire", "sparkfire", -0.1, -0.04, 0.07, 0.4, 2, []],
  [5, "Thunderdrum", "thunderdrum", -0.1, -0.04, 0.07, 0.8, 3, [{ chamberID: "Catchmoon", critChance: -0.08, procChance: 0.14 }]],
  [6, "Zip", "zip", 0, 0, 0, -0.4, 0, []],
  [7, "Slap", "slap", 0, 0, 0, 0, 1, []],
  [8, "Deepbreath", "deepbreath", 0, 0, 0, 0.4, 2, []],
  [9, "Bellows", "bellows", 0, 0, 0, 0.8, 3, []],
  [10, "Zipneedle", "zipneedle", 0.1, 0.07, -0.04, -0.4, 0, []],
  [11, "Slapneedle", "slapneedle", 0.1, 0.07, -0.04, 0, 1, []],
  [12, "Bashrack", "bashrack", 0.1, 0.07, -0.04, 0.4, 2, []],
  [13, "Stitch", "stitch", 0.1, 0.07, -0.04, 0.8, 3, []],
  [14, "Killstream", "killstream", 0.3, 0.14, -0.08, 0, 1, []],
  [15, "Splat", "splat", 0.3, 0.14, -0.08, 0.4, 2, []],
] as [number, string, string, number, number, number, number, number, LoaderChamberData[]][];

export const KitgunChamberData: KitgunChamber[] = _kitgunChamber.map(v => ({
  index: v[0],
  id: v[1],
  name: v[2],
  dmgs: v[3],
  critChance: v[4],
  procChance: v[5],
  magazine: v[6],
  accuracy: v[7],
}));

export const KitgunGripData: KitgunGrip[] = _kitgunGrip.map(v => ({
  index: v[0],
  id: v[1],
  name: v[2],
  chambersData: v[3].map(k => ({
    dmgAdd: k[0],
    fireRate: k[1],
  })),
}));

export const KitgunLoaderData: KitgunLoader[] = _kitgunLoader.map(v => ({
  index: v[0],
  id: v[1],
  name: v[2],
  critDamage: v[3],
  critChance: v[4],
  procChance: v[5],
  reloadTime: v[6],
  magazineIndex: v[7],
  chambersData: v[8],
}));

export const NoneKitgunGripData: number[] = [3, 0, 2, 3];

export const NoneKitgunLoaderData: KitgunLoader = KitgunLoaderData[14];

export class Kitgun implements GunWeapon {
  chamber: KitgunChamber;
  grip: KitgunGrip;
  loader: KitgunLoader;

  bullets: number = 1;
  ammo: number = 210;
  ammoCost?: number;
  prjSpeed?: number;
  rangeLimit?: number;

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
    return grip.chambersData[chamber.index];
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
  get tags() { return this.id === "Gaze" ? ["Gun", "Secondary", "KITGUN", "Continuous"] : ["Gun", "Secondary", "KITGUN"]; }
  get url() { return `KITGUN-${this.chamber.id}-${this.grip.id}-${this.loader.id}`; }
  set url(value) {
    let parts = value.split("-");
    this.chamber = KitgunChamberData.find(v => v.id === parts[1]);
    this.grip = KitgunGripData.find(v => v.id === parts[2]) || KitgunGripData[NoneKitgunGripData[this.chamber.index]];
    this.loader = KitgunLoaderData.find(v => v.id === parts[3]) || NoneKitgunLoaderData;
    this.recalc();
  }
  constructor(chamber: KitgunChamber | string, grip: KitgunGrip = null, loader: KitgunLoader = null) {
    if (typeof chamber === "string") {
      this.url = chamber;
    }
    else {
      [this.chamber, this.grip, this.loader] = [chamber, grip || KitgunGripData[NoneKitgunGripData[chamber.index]], loader || NoneKitgunLoaderData];
      if (chamber) this.recalc();
    }
  }
  recalc() {
    const grip = this.grip.chambersData[this.chamber.index];
    const loader = Kitgun.loadLoader(this.chamber, this.loader);

    this.id = this.chamber.id;
    this.name = this.chamber.name;
    this.critMul = hAccSum(loader.critDamage, 2);
    this.critChance = hAccSum(this.chamber.critChance, loader.critChance);
    this.status = hAccSum(this.chamber.procChance, loader.procChance);
    this.fireRate = grip.fireRate;
    this.dmg = this.chamber.dmgs.map(([n, v]) => [n, hAccSum(v, (this.id === "Tombfinger" && n === "Radiation" ? 4 : 1) * grip.dmgAdd)] as [string, number]).filter(v => v[1] > 0);
    this.reload = hAccSum(1.3, loader.reload);
    this.magazine = loader.magazine;
    this.accuracy = this.chamber.accuracy;
    switch (this.id) {
      case "Catchmoon": this.prjSpeed = 70; this.rangeLimit = 40; break;
      case "Tombfinger": this.prjSpeed = 200; break;
      case "Gaze": this.rangeLimit = [41, 38, 25, 22][this.grip.index]; break;
    }
  }
  get displayName() {
    return `${i18n.t(`messages.${this.chamber.name}`)}-${i18n.t(`messages.${this.grip.name}`)}-${i18n.t(`messages.${this.loader.name}`)}` as string;
  }
}
