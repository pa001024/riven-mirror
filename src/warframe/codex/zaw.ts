const _zawStrike = [
  ["Balla", "宝拉", [["Impact", 3.4], ["Puncture", 40.8], ["Slash", 23.8]], 0.083, 0.18, 0.18, [1, 2.14286, "DAGGERS"], [1.18, 2.14286, "STAVES"]],
  ["Dokrahm", "多克拉姆", [["Impact", 10.2], ["Puncture", 23.8], ["Slash", 34]], 0.083, 0.18, 0.18, [1, 2, "SCYTHES"], [1.7, 2, "HEAVY BLADE"]],
  ["Kronsh", "客隆什", [["Impact", 60.2], ["Slash", 25.8]], -0.067, 0.18, 0.18, [1, 3, "MACHETES"], [1.18, 2.22222, "POLEARMS"]],
  ["Ooltha", "乌尔萨", [["Impact", 7.2], ["Puncture", 28.8], ["Slash", 36]], 0.000, 0.18, 0.18, [1, 2.14286, "SWORDS"], [1.18, 2.14286, "STAVES"]],
  ["Plague Keewar", "瘟疫 奇沃", [["Impact", 22], ["Puncture", 11], ["Slash", 26], ["Viral", 20.0]], -0.033, 0.18, 0.22, [1, 2, "SCYTHES"], [1.18, 2.14286, "STAVES"]],
  ["Plague Kripath", "瘟疫 克里帕丝", [["Impact", 10], ["Puncture", 25], ["Slash", 15], ["Viral", 20]], 0.033, 0.22, 0.18, [1, 2.14286, "RAPIERS"], [1.18, 2.22222, "POLEARMS"]],
  ["Rabvee", "拉比威", [["Impact", 51.6], ["Puncture", 4.3], ["Slash", 30.1]], -0.067, 0.18, 0.18, [1, 3, "MACHETES"], [1.7, 2, "HAMMERS"]],
  ["Sepfahn", "瑟普梵", [["Impact", 7.2], ["Puncture", 18], ["Slash", 46.8]], 0.000, 0.20, 0.20, [1, 2.14286, "NIKANAS"], [1.18, 2.14286, "STAVES"]],
  ["Dehtat", "德塔特", [["Impact", 6.8], ["Puncture", 34], ["Slash", 27.2]], 0.083, 0.18, 0.18, [1, 2.14286, "RAPIERS"], [1.18, 2.22222, "POLEARMS"]],
  ["Cyath", "西亚什", [["Impact", 14.4], ["Puncture", 3.6], ["Slash", 54]], 0.000, 0.18, 0.18, [1, 3, "MACHETES"], [1.18, 2.22222, "POLEARMS"]],
  ["Mewan", "密丸", [["Impact", 21.5], ["Puncture", 30.1], ["Slash", 34.4]], -0.067, 0.18, 0.18, [1, 2.14286, "SWORDS"], [1.18, 2.22222, "POLEARMS"]],
] as [string, string, [string, number][], number, number, number, [number, number, string], [number, number, string]][];

export interface ZawStrike {
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
  id: v[0],
  name: v[1],
  dmgs: v[2],
  speed: v[3],
  crit: v[4],
  status: v[5],
  oneHand: { dmg: v[6][0], slide: v[6][1], type: v[6][2] },
  twoHand: { dmg: v[7][0], slide: v[7][1], type: v[7][2] },
}));

const _zawGrip = [
  ["Korb", "科布", 0, 28, 0.783],
  ["Peye", "佩耶", 0, -4, 1.000],
  ["Plague Akwin", "瘟疫 艾克文", 0, -2, 0.950],
  ["Laka", "拉卡", 0, 0, 0.917],
  ["Kwath", "库阿斯", 0, 14, 0.850],
  ["Plague Bokwin", "瘟疫 柏克文", 1, 7, 0.883],
  ["Seekalla", "斯卡拉", 1, -4, 1.000],
  ["Shtung", "石当", 1, 28, 0.783],
  ["Jayap", "查亚普", 1, 0, 0.917],
  ["Kroostra", "克鲁斯查", 1, 14, 0.850],
] as [string, string, number, number, number][];

export interface ZawGrip {
  id: string;
  name: string;
  twoHand: boolean;
  dmg: number;
  speed: number;
}

export const ZawGripData: ZawGrip[] = _zawGrip.map(v => ({
  id: v[0],
  name: v[1],
  twoHand: !!v[2],
  dmg: v[3],
  speed: v[4],
}));

const _zawLinks = [
  ["Jai", "翟", -4, 0.083, 0, 0],
  ["Jai II", "翟 II", -8, 0.167, 0, 0],
  ["Ruhang", "如杭", 14, -0.067, 0, 0],
  ["Ruhang II", "如杭 II", 28, -0.133, 0, 0],
  ["Ekwana Jai", "伊克瓦纳 翟", -4, 0.083, -4, 7],
  ["Ekwana Ruhang", "伊克瓦纳 如杭", 14, -0.067, -4, 7],
  ["Vargeet Jai", "瓦吉特 翟", -4, 0.083, 7, -4],
  ["Vargeet Ruhang", "瓦吉特 如杭", 14, -0.067, 7, -4],
  ["Ekwana II Jai", "伊克瓦纳 II 翟", -4, 0.083, -8, 14],
  ["Ekwana II Ruhang", "伊克瓦纳 II 如杭", 14, -0.067, -8, 14],
  ["Vargeet II Jai", "瓦吉特 II 翟", -4, 0.083, 14, -8],
  ["Vargeet II Ruhang", "瓦吉特 II 如杭", 14, -0.067, 14, -8],
  ["Ekwana Jai II", "伊克瓦纳 翟 II", -8, 0.167, -4, 7],
  ["Ekwana Ruhang II", "伊克瓦纳 如杭 II", 28, -0.133, -4, 7],
  ["Vargeet Jai II", "瓦吉特 翟 II", -8, 0.167, 7, -4],
  ["Vargeet Ruhang II", "瓦吉特 如杭 II", 28, -0.133, 7, -4],
] as [string, string, number, number, number, number][];

export interface ZawLinks {
  id: string;
  name: string;
  dmg: number;
  speed: number;
  crit: number;
  status: number;
}

export const ZawLinksData: ZawLinks[] = _zawLinks.map(v => ({
  id: v[0],
  name: v[1],
  dmg: v[2],
  speed: v[3],
  crit: v[4],
  status: v[5],
}));


export class Zaw {
  strike: ZawStrike;
  grip: ZawGrip;
  links: ZawLinks;

  id: string;
  name: string;
  dmgs: [string, number][];
  speed: number;
  crit: number;
  status: number;
  get oneHand() { return !this.grip.twoHand; }
  get twoHand() { return this.grip.twoHand; }
  constructor(strike, grip, links) {
    [this.strike, this.grip, this.links] = [strike, grip, links];
    this.recalc();
  }
  recalc() {
    this.id = this.strike.id;
    this.name = this.strike.name;
    let totalDmg = this.strike.dmgs.reduce((a, b) => a + b[1], 0);
    let modify = this.grip.twoHand ? this.strike.twoHand : this.strike.oneHand;
    this.dmgs = this.strike.dmgs.map(([vn, vv]) => [vn, vv * modify.dmg * (totalDmg + this.grip.dmg + this.links.dmg) / totalDmg] as [string, number]);
    this.speed = this.strike.speed + this.grip.speed + this.links.speed;
    this.crit = this.strike.crit + this.links.crit;
    this.status = this.strike.status + this.links.status;
  }
}
