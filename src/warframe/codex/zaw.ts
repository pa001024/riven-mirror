import { hAccSum } from "@/warframe/util";
import { MeleeWeapon } from "@/warframe/codex/weapon";

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
  HeavyBlade, // 巨刃
}

const _zawStrike = [
  ["0", "Balla", "宝拉", [["Impact", 3.4], ["Puncture", 40.8], ["Slash", 23.8]], 0.083, 0.18, 0.18, "Daggers", "Staves"],
  ["1", "Dokrahm", "多克拉姆", [["Impact", 10.2], ["Puncture", 23.8], ["Slash", 34]], 0.083, 0.18, 0.18, "Scythes", "HeavyBlade"],
  ["2", "Kronsh", "客隆什", [["Impact", 60.2], ["Slash", 25.8]], -0.067, 0.18, 0.18, "Machetes", "Hammers"],
  ["3", "Ooltha", "乌尔萨", [["Impact", 7.2], ["Puncture", 28.8], ["Slash", 36]], 0.000, 0.18, 0.18, "Swords", "Staves"],
  ["4", "Rabvee", "拉比威", [["Impact", 51.6], ["Puncture", 4.3], ["Slash", 30.1]], -0.067, 0.18, 0.18, "Machetes", "Polearms"],
  ["5", "Sepfahn", "瑟普梵", [["Impact", 7.2], ["Puncture", 18], ["Slash", 46.8]], 0.000, 0.20, 0.20, "Nikanas", "Staves"],
  ["6", "Dehtat", "德塔特", [["Impact", 6.8], ["Puncture", 34], ["Slash", 27.2]], 0.083, 0.18, 0.18, "Rapiers", "Polearms"],
  ["7", "Cyath", "西亚什", [["Impact", 14.4], ["Puncture", 3.6], ["Slash", 54]], 0.000, 0.18, 0.18, "Machetes", "Polearms"],
  ["8", "Mewan", "密丸", [["Impact", 21.5], ["Puncture", 30.1], ["Slash", 34.4]], -0.067, 0.18, 0.18, "Swords", "Polearms"],
  ["9", "Plague Keewar", "瘟疫 奇沃", [["Impact", 22], ["Puncture", 11], ["Slash", 26], ["Viral", 20.0]], -0.033, 0.18, 0.22, "Scythes", "Staves"],
  ["A", "Plague Kripath", "瘟疫 克里帕丝", [["Impact", 10], ["Puncture", 25], ["Slash", 15], ["Viral", 20]], 0.033, 0.22, 0.18, "Rapiers", "Polearms"],
] as [string, string, string, [string, number][], number, number, number, string, string][];


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
  HeavyBlade: [1.7, 2],
};

export interface ZawStrike {
  idx: string;
  id: string;
  name: string;
  dmgs: [string, number][];
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
}

export const ZawStrikeData: ZawStrike[] = _zawStrike.map(v => ({
  idx: v[0],
  id: v[1],
  name: v[2],
  dmgs: v[3],
  speed: v[4],
  crit: v[5],
  status: v[6],
  oneHand: { dmg: StanceData[v[7]][0], slide: StanceData[v[7]][1], type: v[7] },
  twoHand: { dmg: StanceData[v[8]][0], slide: StanceData[v[8]][1], type: v[8] },
}));

const _zawGrip = [
  ["0", "Korb", "科布", 0, 28, 0.783],
  ["1", "Peye", "佩耶", 0, -4, 1],
  ["2", "Plague Akwin", "瘟疫 艾克文", 0, -2, 0.95],
  ["3", "Laka", "拉卡", 0, 0, 0.917],
  ["4", "Kwath", "库阿斯", 0, 14, 0.850],
  ["5", "Plague Bokwin", "瘟疫 柏克文", 1, 7, 0.883],
  ["6", "Seekalla", "斯卡拉", 1, -4, 1],
  ["7", "Shtung", "石当", 1, 28, 0.783],
  ["8", "Jayap", "查亚普", 1, 0, 0.917],
  ["9", "Kroostra", "克鲁斯查", 1, 14, 0.85],
] as [string, string, string, number, number, number][];

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
  name: v[2],
  twoHand: !!v[3],
  dmg: v[4],
  speed: v[5],
}));

export const NoneZawGripData = {
  idx: "",
  id: "None",
  name: "无",
  twoHand: false,
  dmg: 0,
  speed: 1,
};

const _zawLinks = [
  ["0", "Jai", "翟", -4, 0.083, 0, 0],
  ["1", "Jai II", "翟 II", -8, 0.167, 0, 0],
  ["2", "Ruhang", "如杭", 14, -0.067, 0, 0],
  ["3", "Ruhang II", "如杭 II", 28, -0.133, 0, 0],
  ["4", "Ekwana Jai", "伊克瓦纳 翟", -4, 0.083, -0.04, 0.07],
  ["5", "Ekwana Ruhang", "伊克瓦纳 如杭", 14, -0.067, -0.04, 0.07],
  ["6", "Vargeet Jai", "瓦吉特 翟", -4, 0.083, 0.07, -0.04],
  ["7", "Vargeet Ruhang", "瓦吉特 如杭", 14, -0.067, 0.07, -0.04],
  ["8", "Ekwana II Jai", "伊克瓦纳 II 翟", -4, 0.083, -0.08, 0.14],
  ["9", "Ekwana II Ruhang", "伊克瓦纳 II 如杭", 14, -0.067, -0.08, 0.14],
  ["A", "Vargeet II Jai", "瓦吉特 II 翟", -4, 0.083, 0.14, -0.08],
  ["B", "Vargeet II Ruhang", "瓦吉特 II 如杭", 14, -0.067, 0.14, -0.08],
  ["C", "Ekwana Jai II", "伊克瓦纳 翟 II", -8, 0.167, -0.04, 0.07],
  ["D", "Ekwana Ruhang II", "伊克瓦纳 如杭 II", 28, -0.133, -0.04, 0.07],
  ["E", "Vargeet Jai II", "瓦吉特 翟 II", -8, 0.167, 0.07, -0.04],
  ["F", "Vargeet Ruhang II", "瓦吉特 如杭 II", 28, -0.133, 0.07, -0.04],
] as [string, string, string, number, number, number, number][];

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
  name: v[2],
  dmg: v[3],
  speed: v[4],
  crit: v[5],
  status: v[6],
}));

export const NoneZawLinksData = {
  idx: "",
  id: "None",
  name: "无",
  dmg: 0,
  speed: 0,
  crit: 0,
  status: 0,
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
  get oneHand() { return !this.grip.twoHand; }
  get twoHand() { return this.grip.twoHand; }
  get panelDamage() { return this.dmg.reduce((a, b) => a + b[1], 0); }
  get slideDmg() { return this.panelDamage * (this.grip.twoHand ? this.strike.twoHand : this.strike.oneHand).slide; }
  get tags() { return ["近战", "ZAW", this.stance]; }
  get critMul() { return this.strike.id === "A" ? 2.2 : 2; }
  get url() { return `ZAW-${this.strike.idx}-${this.grip.idx}-${this.links.idx}`; }
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
    }
    else {
      [this.strike, this.grip, this.links] = [strike, grip || NoneZawGripData, links || NoneZawLinksData];
      if (strike) this.recalc();
    }
  }
  recalc() {
    this.id = this.strike.id;
    this.name = this.strike.name;
    let totalDmg = this.strike.dmgs.reduce((a, b) => a + b[1], 0);
    let modify = this.grip.twoHand ? this.strike.twoHand : this.strike.oneHand;
    this.stance = modify.type;
    this.dmg = this.strike.dmgs.map(([vn, vv]) => [vn, +(vv * modify.dmg * (totalDmg + this.grip.dmg + this.links.dmg) / totalDmg).toFixed(1)] as [string, number]);
    this.fireRate = hAccSum(this.strike.speed, this.grip.speed, this.links.speed);
    this.critChance = hAccSum(this.strike.crit, this.links.crit);
    this.status = hAccSum(this.strike.status, this.links.status);
  }
}
