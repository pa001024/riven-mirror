import { camelCase } from "lodash-es";
import { hAccSum } from "@/warframe/util";
import { Weapon } from "@/warframe/codex";
import { i18n } from "@/i18n";
import { WeaponTag, CoreWeaponMode, MainTag } from "./weapon";

/**
 * 枪膛
 */
export interface KitgunChamber {
  index: number;
  id: string;
  name: string;
  pdmgs: [string, number][];
  sdmgs: [string, number][];
  critChance: number;
  procChance: number;
  magazine: number[];
  accuracy: number;
  rangeLimit?: number[];
  disposition: number[];
}

/**
 * 握把
 */
export interface KitgunGrip {
  index: number;
  id: string;
  name: string;
  chambersData: GripChamberData[];
  type: string;
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
  magazineIndex?: number;
  reload?: number;
  critChance?: number;
  procChance?: number;
}

// prettier-ignore
const _kitgunChamber = [
  [0, "Catchmoon", [
    [["Impact", 89], ["Heat", 167]],
    [["Impact", 49], ["Heat", 85]] // Primary
  ], 0.21, 0.21, [5, 7, 9, 11, 13, 17, 23, 39], 5.9, [0.5, 0.9]],
  [1, "Gaze", [
    [["Puncture", 6], ["Radiation", 10]],
    [["Radiation", 29]] // Primary
  ], 0.25, 0.25, [23, 31, 37, 43, 51, 49, 85, 113], 100, [1, 0.85]],
  [2, "Rattleguts", [
    [["Impact", -1], ["Puncture", 7], ["Slash", 5], ["Radiation", 10]],
    [["Impact", 2], ["Puncture", 5], ["Slash", 3], ["Radiation", 9]] // Primary
  ], 0.19, 0.19, [29, 45, 57, 67, 83, 75, 111, 153], 26, [0.75, 0.8]],
  [3, "Tombfinger", [
    [["Impact", 12], ["Puncture", 5], ["Radiation", 43]],
    [["Puncture", 40], ["Radiation", 18]] // Primary
  ], 0.24, 0.24, [9, 15, 19, 23, 29, 31, 35, 49], 50, [0.65, 0.75]],
  [4, "Sporelacer", [
    [["Impact", -39], ["Toxin", 103]],
    [["Impact", 21], ["Toxin", 69]] // Primary
  ], 0.21, 0.21, [5, 7, 9, 11, 13, 17, 23, 39], 5.9, [0.5, 0.5]],
  [5, "Vermisplicer", [
    [["Impact", 1.5], ["Puncture", 3.5], ["Slash", 4.5], ["Toxin", 4.5]],
    [["Impact", 5], ["Puncture", 6], ["Slash", 10], ["Toxin", 12]] // Primary
  ], 0.25, 0.25, [23, 31, 37, 43, 51, 49, 85, 113], 5.4, [0.5, 0.5]],
] as [number, string, [string, number][][], number, number, number[], number, number[]][];

// prettier-ignore
const _kitgunGrip = [
  [0, "Gibber", [[-48, 190], [0, 720], [0, 660], [-4, 270], [0, 190], [0, 720]], "Secondary"],
  [1, "Ramble", [[-24, 150], [0.5, 720], [1.5, 530], [0, 220], [48, 150], [0.3, 720]], "Secondary"],
  [2, "Ulnaris", [[17, 110], [1, 720], [3.5, 400], [6.7, 170], [130, 110], [0.5, 720]], "Secondary"],
  [3, "Lovetap", [[51, 90], [1.5, 720], [7.8, 310], [12, 150], [198, 90], [0.8, 720]], "Secondary"],
  [4, "Haymaker", [[102, 70], [2, 720], [12.5, 220], [20, 130], [300, 70], [1, 720]], "Secondary"],

  [5, "Brash", [[-12, 340], [0, 480], [-0.5, 1020], [-10, 226], [0, 340], [0, 480]], "Primary"],
  [6, "Palmaris", [[-12, 340], [1, 480], [-0.3, 930], [-7.5, 207], [6, 310], [0.3, 480]], "Primary"],
  [7, "Shrewd", [[-6, 280], [2, 480], [-0.2, 840], [-5, 188], [12, 280], [0.5, 480]], "Primary"],
  [8, "Steadyslam", [[20.5, 200], [6, 480], [2.3, 600], [14.5, 140], [65, 200], [1.5, 480]], "Primary"],
  [9, "Tremor", [[41, 180], [8, 480], [4.5, 540], [29, 128], [106, 180], [2, 480]], "Primary"]
] as [number, string, [number, number][], string][];

// prettier-ignore
const _kitgunLoader = [
  [0, "Flutterfire", -0.3, -0.08, 0.14, 0, 1, []],
  [1, "Ramflare", -0.3, -0.08, 0.14, 0.4, 3, []],
  [2, "Zipfire", -0.1, -0.04, 0.07, -0.4, 0, []],
  [3, "Swiftfire", -0.1, -0.04, 0.07, 0, 1, []],
  [4, "Sparkfire", -0.1, -0.04, 0.07, 0.4, 3, []],
  [5, "Thunderdrum", -0.1, -0.04, 0.07, 0.8, 4, [{ chamberID: "Catchmoon", critChance: -0.08, procChance: 0.14 }]],
  [6, "Zip", 0, 0, 0, -0.4, 0, []],
  [7, "Slap", 0, 0, 0, 0, 1, []],
  [8, "Deepbreath", 0, 0, 0, 0.4, 3, []],
  [9, "Bellows", 0, 0, 0, 0.8, 4, []],
  [10, "Zipneedle", 0.1, 0.07, -0.04, -0.4, 0, []],
  [11, "Slapneedle", 0.1, 0.07, -0.04, 0, 1, []],
  [12, "Bashrack", 0.1, 0.07, -0.04, 0.4, 3, []],
  [13, "Stitch", 0.1, 0.07, -0.04, 0.8, 4, []],
  [14, "Killstream", 0.3, 0.14, -0.08, 0, 1, []],
  [15, "Splat", 0.3, 0.14, -0.08, 0.4, 3, []],
  [16, "Arcroid", 0, 0.03, 0.03, 0.2, 2, []],
  [17, "Thymoid", 0, 0, 0, 1, 5, []],
  [18, "MarcoArcroid", 0, 0.03, 0.03, 1.6, 6, []],
  [19, "MarcoThymoid", 0, 0, 0, 1.8, 7, []],
] as [number, string, number, number, number, number, number, LoaderChamberData[]][];

export const KitgunChamberData: KitgunChamber[] = _kitgunChamber.map(v => ({
  index: v[0],
  id: camelCase(v[1]),
  name: v[1],
  pdmgs: v[2][1],
  sdmgs: v[2][0],
  critChance: v[3],
  procChance: v[4],
  magazine: v[5],
  accuracy: v[6],
  disposition: v[7],
}));

export const KitgunGripData: KitgunGrip[] = _kitgunGrip.map(v => ({
  index: v[0],
  id: camelCase(v[1]),
  name: v[1],
  chambersData: v[2].map(k => ({
    dmgAdd: k[0],
    fireRate: k[1],
  })),
  type: v[3],
}));

export const KitgunLoaderData: KitgunLoader[] = _kitgunLoader.map(v => ({
  index: v[0],
  id: camelCase(v[1]),
  name: v[1],
  critDamage: v[2],
  critChance: v[3],
  procChance: v[4],
  reloadTime: v[5],
  magazineIndex: v[6],
  chambersData: v[7],
}));

export const NoneKitgunGripData: number[] = [4, 0, 3, 4, 4, 4];

export const NoneKitgunLoaderData: KitgunLoader = KitgunLoaderData[14];

const getName = (url: string) => {
  let parts = url.split("-");
  const chamber = KitgunChamberData.find(v => v.name === parts[1]);
  return chamber.name;
};

export class Kitgun extends Weapon {
  chamber: KitgunChamber;
  grip: KitgunGrip;
  loader: KitgunLoader;

  mod = MainTag.Kitgun;

  static loadGrip(chamber: KitgunChamber, grip: KitgunGrip) {
    const data = { ...grip.chambersData[chamber.index], type: grip.type };
    if (grip.type === "Primary") {
      data.type = chamber.name === "Catchmoon" ? "Shotgun" : "Rifle";
    }
    return data;
  }
  static loadLoader(chamber: KitgunChamber, loader: KitgunLoader) {
    let data = loader.chambersData.find(v => v.chamberID === chamber.name);
    return {
      name: loader.name,
      critDamage: loader.critDamage,
      critChance: (data && data.critChance) || loader.critChance,
      procChance: (data && data.procChance) || loader.procChance,
      reload: (data && data.reload) || loader.reloadTime,
      magazine: chamber.magazine[loader.magazineIndex],
    } as KitgunLoaderDisplay;
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
    super({ name: typeof chamber === "string" ? getName(chamber) : chamber.name });
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
    this.disposition = this.chamber.disposition[this.grip.type === "Primary" ? 1 : 0];
    const mode = {} as CoreWeaponMode;
    const dmgs = this.grip.type === "Primary" ? this.chamber.pdmgs : this.chamber.sdmgs;
    mode.damage = dmgs
      .map(
        ([n, v]) =>
          [n, hAccSum(v, (this.name === "Tombfinger" && this.grip.type === "Secondary" && n === "Radiation" ? 4 : 1) * grip.dmgAdd)] as [string, number]
      )
      .filter(v => v[1] > 0);
    mode.critMul = hAccSum(loader.critDamage, this.chamber.name === "Sporelacer" && this.grip.type === "Primary" ? 3 : 2);
    mode.critChance = hAccSum(this.chamber.critChance, loader.critChance);
    mode.procChance = hAccSum(this.chamber.procChance, loader.procChance);
    mode.fireRate = grip.fireRate;
    mode.accuracy = this.chamber.accuracy;
    if (this.chamber.name === "Vermisplicer" && this.grip.type === "Secondary") {
      mode.pellets = 5;
    }
    this.reload = hAccSum(1.3, loader.reload);
    this.magazine = loader.magazine;
    switch (this.name) {
      case "Catchmoon":
        mode.prjSpeed = 70;
        mode.range = this.grip.type === "Primary" ? 40 : 20;
        break;
      case "Tombfinger":
        mode.prjSpeed = 200;
        if (this.grip.type === "Primary") {
          mode.chargeTime = [0.5, 0.8, 1.0, 1.1, 1.5][this.grip.index % 5];
        }
        break;
      case "Gaze":
        if (this.grip.type === "Secondary") {
          mode.range = [41, 39, 38, 25, 22][this.grip.index % 5];
        } else {
          mode.range = [30, 26, 23, 20, 16][this.grip.index % 5];
        }
        break;
    }
    this.modes = [mode];
    if (this.name === "Tombfinger" && this.grip.type === "Primary") {
      const cmode = { ...mode } as CoreWeaponMode;
      cmode.type = "charge";
      cmode.radius = 6.2;
      cmode.damage = [["Radiation", mode.damage.reduce((r, v) => r + v[1], 0) + 374]];
      cmode.fireRate = 60 / cmode.chargeTime;
      this.modes.push(cmode);
    }
    this.modes = this.modes.map(mode => {
      if (mode.name || mode.type) {
        const locKey = `weaponmode.${camelCase(mode.name || mode.type || "default")}`;
        if (i18n.te(locKey)) {
          mode.locName = i18n.t(locKey);
        } else {
          console.log("missing", locKey);
          mode.locName = mode.name;
        }
      } else mode.locName = i18n.t("weaponmode.default");
      return mode;
    });
    let tags = this.grip.type === "Primary" ? ["Primary", "Rifle", "Assault Rifle", "Kitgun"] : ["Secondary", "Kitgun"];
    if (this.grip.type === "Primary") {
      if (this.name === "Catchmoon") {
        tags = ["Primary", "Shotgun", "Kitgun"];
      }
    } else if (this.name === "Gaze") {
      tags.push("Continuous");
    }
    this.tags = new WeaponTag(tags);
    this.mod = this.tags.mainTag;
  }
  get displayName() {
    return `${i18n.t(`messages.${this.chamber.id}`)}-${i18n.t(`messages.${this.grip.id}`)}-${i18n.t(`messages.${this.loader.id}`)}` as string;
  }
}
