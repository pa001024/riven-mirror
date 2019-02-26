import _ from "lodash";
import { hAccSum } from "@/warframe/util";
import { GunWeapon, Weapon } from "@/warframe/codex/weapon";
import { i18n } from "@/i18n";

/**
 * 棱镜
 */
export interface AmpPrism {
  index: number;
  id: string;
  name: string;
  dmgs: [string, number][];
  critChance: number;
  critDamage: number;
  procChance: number;
  fireRate: number;
  accuracy: number;
  ammoCost: number;
  rangeLimit?: number;
  prjSpeed?: number;
}

/**
 * 支架
 */
export interface AmpScaffold {
  index: number;
  id: string;
  name: string;
  dmgs: [string, number][];
  critChance: number;
  critDamage: number;
  procChance: number;
  fireRate: number;
  accuracy: number;
  ammoCost: number;
  rangeLimit?: number;
  prjSpeed?: number;
}

/**
 * 曲柄
 */
export interface AmpBrace {
  index: number;
  id: string;
  name: string;
  critChance: number;
  procChance: number;
  magazine: number; // 基础100
  reloadDelay: number; // 基础2秒
  reloadSpeed: number; // 基础30点每秒
}

const _ampPrism = [
  // index, id, dmgs, critChance, critDamage, procChance, fireRate, accuracy, ammoCost, rangeLimit
  [1, "Raplak Prism", [["Void", 3000]], 0.38, 2.6, 0.1, 2, 32, 5, 100],
  [2, "Shwaak Prism", [["Void", 3500]], 0.1, 1.6, 0.2, 1.33, 9.1, 10, 30, /* prjSpeed */ 100],
  [3, "Granmu Prism", [["Void", 2400]], 0.26, 2, 0.12, 2.07, 100, 15, 70, /* prjSpeed */ 80],
  [4, "Rahn Prism", [["Void", 1000]], 0.3, 2, 0.04, 5.67, 32, 2, 100],
  [5, "Cantic Prism", [["Void", 1460]], 0.34, 2.2, 0.1, 4.88, 32, 3, 100],
  [6, "Lega Prism", [["Void", 600]], 0.08, 1.6, 0.34, 7.5, 100, 60, 28],
  [7, "Klamora Prism", [["Void", 600]], 0.38, 2.4, 0.1, 12, 100, 25, 13],
] as [number, string, [string, number][], number, number, number, number, number, number, number, number?][];

const _ampScaffold = [
  // index, id, dmgs, critChance, critDamage, procChance, fireRate, accuracy, ammoCost, rangeLimit
  [1, "Pencha Scaffold", [["Void", 9000]], 0.14, 1.6, 0.18, 1.25, 100, 10, 41],
  [2, "Shraksun Scaffold", [["Void", 7500]], 0.2, 2.5, 0.2, 1.33, 9.1, 10, 15, /* prjSpeed */ 40],
  [3, "Klebrik Scaffold", [["Void", 320]], 0.16, 1.6, 0.14, 12, 100, 3, 25],
  [4, "Phahd Scaffold", [["Void", 6100]], 0.34, 2.6, 0.12, 1.33, 9.1, 20, 300, /* prjSpeed */ 100],
  [5, "Exard Scaffold", [/*["Impact", 200], */["Void", 2600]], 0.17, 1.9, 0.33, 8.26, 10, 20, 40, /* prjSpeed */ 100],
  [6, "Dissic Scaffold", [/*["Impact", 15], */["Void", 6600]], 0.03, 1.5, 0.37, 1, 100, 50, /* prjSpeed */ 100],
  [7, "Propa Scaffold", [["Void", 9000]], 0.3, 2, 0, 2, 9.1, 50, 10, /* prjSpeed */ 40],
] as [number, string, [string, number][], number, number, number, number, number, number, number, number?][];

const _ampBrace = [
  // index, id, critChance, procChance, magazine, reloadDelay, reloadSpeed
  [1, "Clapkra Brace", 0, 0, 40, 0, 0],
  [2, "Juttni Brace", 0, 0, 0, -1, 0],
  [3, "Lohrin Brace", 0.12, 0.12, 0, 0, 0],
  [4, "Anspatha Brace", 0, 0, 0, 0, 15],
  [5, "Suo Brace", 0, 0, 100, 2, 0],
  [6, "Plaga Brace", 0, 0, -20, -1.5, 0],
  [7, "Certus Brace", 0.2, 0, 0, 0, 0],
] as [number, string, number, number, number, number, number][];

export const NoneBraceData = {
  index: 0,
  id: "None",
  name: "none",
  critChance: 0,
  procChance: 0,
  magazine: 0,
  reloadDelay: 0,
  reloadSpeed: 0,
}

/** 棱镜数据 */
export const AmpPrismData: AmpPrism[] = _ampPrism.map(v => ({
  index: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  dmgs: v[2],
  critChance: v[3],
  critDamage: v[4],
  procChance: v[5],
  fireRate: v[6],
  accuracy: v[7],
  ammoCost: v[8],
  rangeLimit: v[9],
  prjSpeed: v[10],
}));

/** 支架数据 */
export const AmpScaffoldData: AmpScaffold[] = _ampScaffold.map(v => ({
  index: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  dmgs: v[2],
  critChance: v[3],
  critDamage: v[4],
  procChance: v[5],
  fireRate: v[6],
  accuracy: v[7],
  ammoCost: v[8],
  rangeLimit: v[9],
  prjSpeed: v[10],
}));

/** 曲柄数据 */
export const AmpBraceData: AmpBrace[] = _ampBrace.map(v => ({
  index: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  critChance: v[2],
  procChance: v[3],
  magazine: v[4],
  reloadDelay: v[5],
  reloadSpeed: v[6],
}));

export class Amp implements GunWeapon {
  prism: AmpPrism;
  scaffold: AmpScaffold;
  brace: AmpBrace;

  bullets: number = 1;
  ammo: number = 0;
  ammoCost: number;
  prjSpeed?: number;
  rangeLimit?: number;

  id: string;
  buildName: string;
  name: string;
  dmg: [string, number][];
  fireRate: number;
  critMul: number;
  critChance: number;
  status: number;
  accuracy: number;
  /** 弹匣 基础100 */
  magazine: number;
  /** 充能延迟 基础2秒 */
  reloadDelay: number;
  /** 充能速度 基础30点每秒 */
  reloadSpeed: number;
  pol = "";
  get reload() { return this.reloadDelay + this.magazine / this.reloadSpeed; }

  /** 是否是棱镜 */
  get isPrism() { return !!this.prism }

  get panelDamage() { return this.dmg.reduce((a, b) => a + b[1], 0); }
  get tags() { return (this.scaffold && this.scaffold.id === "Klebrik Scaffold" || this.prism && this.prism.id === "Klamora Prism") ? ["Amp", "Continuous"] : ["Amp"]; }
  get url() { return `AMP-${this.buildName}`; }
  set url(value) {
    try {
      let parts = value.split("-")[1];
      this.prism = AmpPrismData.find(v => v.index === +parts[0]);
      this.scaffold = AmpScaffoldData.find(v => v.index === +parts[1]);
      this.brace = AmpBraceData.find(v => v.index === +parts[2]) || NoneBraceData;
      this.recalc();
    }
    catch (e) {
      console.error("AMP parse URL fail:", value)
    }
  }
  constructor(prism: AmpPrism | string, scaffold: AmpScaffold = null, brace: AmpBrace = null) {
    if (typeof prism === "string") {
      this.url = prism;
    }
    else {
      [this.prism, this.scaffold, this.brace] = [prism, scaffold, brace];
      if (prism || scaffold) this.recalc();
    }
  }
  recalc() {
    let mainPart = this.isPrism ? this.prism : this.scaffold;
    if (!mainPart) return;
    let brace = this.brace || NoneBraceData;
    this.id = "Amp";
    this.buildName = `${this.prism ? this.prism.index : "x"}${this.scaffold ? this.scaffold.index : "x"}${brace.index}`;
    this.critMul = mainPart.critDamage;
    this.critChance = hAccSum(mainPart.critChance, brace.critChance);
    this.status = hAccSum(mainPart.procChance, brace.procChance);
    this.fireRate = mainPart.fireRate;
    this.dmg = mainPart.dmgs;
    this.reloadSpeed = 30 + brace.reloadSpeed;
    this.reloadDelay = 2 + brace.reloadDelay;
    this.magazine = 100 + brace.magazine;
    this.ammoCost = mainPart.ammoCost;
    this.accuracy = mainPart.accuracy;
    this.rangeLimit = mainPart.rangeLimit;
    this.prjSpeed = mainPart.prjSpeed;
  }
  get displayName() {
    if (this.prism || this.scaffold)
      return `${this.isPrism ? i18n.t(`messages.${this.prism.name}`) : i18n.t(`messages.${this.scaffold.name}`)}-${i18n.t(`messages.${this.brace.name}`)} ( ${this.buildName} )` as string;
    else
      return "Amp";
  }
  /** 真实ID */
  get realID() { return this.id.replace(/ \(.+?\)$/g, "") }
  /** 真实URL */
  get realURL() { return this.realID.replace(/ /g, "_") }
  /** WM URL */
  get wmurl() { return this.realID.toLowerCase().replace(/ /g, "-") }
}
