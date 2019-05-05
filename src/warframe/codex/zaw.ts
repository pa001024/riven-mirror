import { hAccSum } from "@/warframe/util";
import { MeleeWeapon } from "@/warframe/codex/weapon";
import { i18n } from "@/i18n";
import _ from "lodash";

export enum Stance {
  Daggers, // 匕首
  Scythes, // 镰刀
  Machetes, // 大砍刀
  Swords, // 剑
  Nikanas, // 侍刃
  Rapiers, // 细剑
  Staves, // 杖
  Polearms, // 长柄武器
  Hammers, // 锤
  HeavyBlade // 巨刃
}

const _zawStrike = [
  ["0", "Balla", -4, [12, 1, 7], 5, 8, 8, "Daggers", "Staves"],
  ["1", "Dokrahm", -4, [7, 3, 10], 5, 8, 8, "Scythes", "HeavyBlade"],
  ["2", "Kronsh", 14, [0, 14, 6], -4, 8, 8, "Machetes", "Polearms"],
  ["3", "Ooltha", 0, [8, 2, 10], 0, 8, 8, "Swords", "Staves"],
  ["4", "Rabvee", 14, [1, 12, 7], -4, 8, 8, "Machetes", "Hammers"],
  ["5", "Sepfahn", 0, [5, 2, 13], 0, 10, 10, "Nikanas", "Staves"],
  ["6", "Dehtat", -4, [10, 2, 8], 5, 8, 8, "Rapiers", "Polearms"],
  ["7", "Cyath", 0, [1, 4, 15], 0, 8, 8, "Machetes", "Polearms"],
  ["8", "Mewan", 14, [7, 5, 8], -4, 8, 8, "Swords", "Polearms"],
  ["9", "Plague Keewar", 7, [-7, 4, 8, 2], -2, 8, 12, "Scythes", "Staves"],
  ["A", "Plague Kripath", -2, [7, -8, -3, 2], 2, 12, 8, "Rapiers", "Polearms"]
] as [string, string, number, number[], number, number, number, string, string][];

export const StanceData = {
  Daggers: [1, 2.14286],
  Scythes: [1, 2],
  Machetes: [1, 3],
  Swords: [1, 2.14286],
  Nikanas: [1, 2.14286],
  Rapiers: [1, 2.14286],
  Staves: [1.18, 2.14286],
  Polearms: [1.18, 2.22222],
  Hammers: [1.7, 2],
  HeavyBlade: [1.7, 2]
};

export const RangeData = {
  Daggers: [0.88, 0.82],
  Scythes: [0.42, 1.48],
  Machetes: [0.58, 2.62],
  Swords: [0.73, 1.32],
  Nikanas: [0.85, 1.05],
  Rapiers: [0.91, 1.29],
  Staves: [3.09, 0.61],
  Polearms: [3.09, 0.11],
  Hammers: [3.09, 0.81],
  HeavyBlade: [3.09, 0.81]
};

export interface ZawStrike {
  idx: string;
  id: string;
  name: string;
  dmg: number;
  dmgs: number[];
  speed: number;
  crit: number;
  status: number;
  oneHand: ZawStrikeModify;
  twoHand: ZawStrikeModify;
}
export interface ZawStrikeModify {
  dmg: number;
  slide: number;
  type: string;
  range: [number, number];
}

export const ZawStrikeData: ZawStrike[] = _zawStrike.map(v => ({
  idx: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  dmg: v[2],
  dmgs: v[3],
  speed: v[4],
  crit: v[5],
  status: v[6],
  oneHand: { dmg: StanceData[v[7]][0], slide: StanceData[v[7]][1], type: v[7], range: RangeData[v[7]] },
  twoHand: { dmg: StanceData[v[8]][0], slide: StanceData[v[8]][1], type: v[8], range: RangeData[v[8]] }
}));

const _zawGrip = [
  ["1", "Peye", 0, -4, 0],
  ["2", "Plague Akwin", 0, -2, -3],
  ["3", "Laka", 0, 0, -5],
  ["4", "Kwath", 0, 14, -9],
  ["0", "Korb", 0, 28, -13],
  ["6", "Seekalla", 1, -4, 0],
  ["8", "Jayap", 1, 0, -5],
  ["5", "Plague Bokwin", 1, 7, -7],
  ["9", "Kroostra", 1, 14, -9],
  ["7", "Shtung", 1, 28, -13]
] as [string, string, number, number, number][];

export interface ZawGrip {
  idx: string;
  id: string;
  name: string;
  twoHand: boolean;
  dmg: number;
  speed: number;
}

export const ZawGripData: ZawGrip[] = _zawGrip.map(v => ({
  idx: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  twoHand: !!v[2],
  dmg: v[3],
  speed: v[4]
}));

export const NoneZawGripData = {
  idx: "",
  id: "None",
  name: "none",
  twoHand: false,
  dmg: 0,
  speed: 0
};

const _zawLinks = [
  ["0", "Jai", -4, 5, 0, 0],
  ["1", "Jai II", -8, 10, 0, 0],
  ["2", "Ruhang", 14, -4, 0, 0],
  ["3", "Ruhang II", 28, -8, 0, 0],
  ["4", "Ekwana Jai", -4, 5, -4, 7],
  ["5", "Ekwana Ruhang", 14, -4, -4, 7],
  ["6", "Vargeet Jai", -4, 5, 7, -4],
  ["7", "Vargeet Ruhang", 14, -4, 7, -4],
  ["8", "Ekwana II Jai", -4, 5, -8, 14],
  ["9", "Ekwana II Ruhang", 14, -4, -8, 14],
  ["A", "Vargeet II Jai", -4, 5, 14, -8],
  ["B", "Vargeet II Ruhang", 14, -4, 14, -8],
  ["C", "Ekwana Jai II", -8, 10, -4, 7],
  ["D", "Ekwana Ruhang II", 28, -8, -4, 7],
  ["E", "Vargeet Jai II", -8, 10, 7, -4],
  ["F", "Vargeet Ruhang II", 28, -8, 7, -4]
] as [string, string, number, number, number, number][];

export interface ZawLinks {
  idx: string;
  id: string;
  name: string;
  dmg: number;
  speed: number;
  crit: number;
  status: number;
}

export const ZawLinksData: ZawLinks[] = _zawLinks.map(v => ({
  idx: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  dmg: v[2],
  speed: v[3],
  crit: v[4],
  status: v[5]
}));

export const NoneZawLinksData: ZawLinks = {
  idx: "",
  id: "None",
  name: "none",
  dmg: 0,
  speed: 0,
  crit: 0,
  status: 0
};

export class Zaw implements MeleeWeapon {
  strike: ZawStrike;
  grip: ZawGrip;
  links: ZawLinks;

  id: string;
  name: string;
  dmg: [string, number][];
  fireRate: number;
  critChance: number;
  status: number;
  stance: string;
  fltSpeed: number;
  pol = "";
  bullets = 1;
  range: [number, number];

  get oneHand() {
    return !this.grip.twoHand;
  }
  get twoHand() {
    return this.grip.twoHand;
  }
  get panelDamage() {
    return this.dmg.reduce((a, b) => a + b[1], 0);
  }
  get slideDmg() {
    return this.panelDamage * (this.grip.twoHand ? this.strike.twoHand : this.strike.oneHand).slide;
  }
  get tags() {
    return ["Melee", "ZAW", this.stance];
  }
  get critMul() {
    return this.strike.idx === "A" ? 2.2 : 2;
  }
  get url() {
    return `ZAW-${this.strike.idx}-${this.grip.idx}-${this.links.idx}`;
  }
  set url(value) {
    let parts = value.split("-");
    this.strike = ZawStrikeData.find(v => v.idx === parts[1]);
    this.grip = ZawGripData.find(v => v.idx === parts[2]) || NoneZawGripData;
    this.links = ZawLinksData.find(v => v.idx === parts[3]) || NoneZawLinksData;
    this.recalc();
  }
  constructor(strike: ZawStrike | string, grip: ZawGrip = null, links: ZawLinks = null) {
    if (typeof strike === "string") {
      this.url = strike;
    } else {
      [this.strike, this.grip, this.links] = [strike, grip || NoneZawGripData, links || NoneZawLinksData];
      if (strike) this.recalc();
    }
  }
  recalc() {
    this.id = this.strike.id;
    this.name = this.strike.name;
    let modify = this.grip.twoHand ? this.strike.twoHand : this.strike.oneHand;
    this.stance = modify.type;
    this.range = modify.range;
    // 60 为基础值 12为镀金加成
    this.fireRate = +((60 + this.strike.speed + this.grip.speed + this.links.speed) / 60).toFixed(3);
    this.critChance = (10 + this.strike.crit + this.links.crit) / 100;
    this.status = (10 + this.strike.status + this.links.status) / 100;

    //  ZAW 计算方法

    //  普通ZAW:
    //  比例固定 分成20等分 将最后计算结果乘以 基伤/20 即可得到单独属性的值

    //  举例: 原比例 12, 1, 7
    //  则总计 60伤害时 分配为 36, 3, 21

    //  瘟疫类:
    //  比例不固定 将最后计算结果等值加到单独属性的基础值上去

    //  举例: 基础值 7, -8, -3, 2
    //  则总计 46伤害时(+30) 分配为 22.5, 7.5, 12.5, 17.5
    //  (每项各加30/4=7.5)
    const dmg = (60 + 12 + this.strike.dmg + this.grip.dmg + this.links.dmg) * modify.dmg;
    const DamageTypes = ["Puncture", "Impact", "Slash", "Viral"];
    let calced: [string, number][];
    if (this.strike.dmgs.length === 4) {
      // let totalDmg = this.strike.dmgs.reduce((a, b) => a + b[1], 0);
      calced = this.strike.dmgs.map((v, i) => [DamageTypes[i], +(v + (dmg - this.strike.dmg) / 4).toFixed(1)]);
    } else {
      calced = this.strike.dmgs.map((v, i) => [DamageTypes[i], +((v * dmg) / 20).toFixed(1)]);
    }
    this.dmg = calced.filter(v => v[1] > 0);
  }
  get displayName() {
    return `${i18n.t(`messages.${this.strike.name}`)}-${i18n.t(`messages.${this.grip.name}`)}-${i18n.t(`messages.${this.links.name}`)}` as string;
  }
  /** 真实ID */
  get realID() {
    return this.id;
  }
  /** 真实URL */
  get realURL() {
    return this.realID.replace(/ /g, "_");
  }
  /** WM URL */
  get wmurl() {
    return this.realID.toLowerCase().replace(/ /g, "-");
  }
}
