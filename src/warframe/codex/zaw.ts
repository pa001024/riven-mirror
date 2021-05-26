import { camelCase } from "lodash-es";
import { Weapon } from "@/warframe/codex";
import { i18n } from "@/i18n";
import { WeaponTag, CoreWeaponMode, MainTag, WeaponDatabase } from "./weapon";

export enum Stance {
  Dagger, // 匕首
  Scythe, // 镰刀
  Machete, // 大砍刀
  Sword, // 剑
  Nikana, // 侍刃
  Rapier, // 细剑
  Stave, // 杖
  Polearm, // 长柄武器
  Hammer, // 锤
  HeavyBlade, // 巨刃
}

const _zawStrike = [
  ["0", "Balla", 0, [12, 1, 7], 5, 8, 8, "Dagger", "Stave", 0.9],
  ["1", "Dokrahm", 85, [7, 3, 10], 5, 8, 8, "Scythe", "HeavyBlade", 0.75],
  ["2", "Kronsh", 10, [0, 14, 6], -4, 8, 8, "Machete", "Polearm", 1.3],
  ["3", "Ooltha", 0, [8, 2, 10], 0, 8, 8, "Sword", "Stave", 1.25],
  ["4", "Rabvee", 10, [1, 12, 7], -4, 8, 8, "Machete", "Hammer", 1.3],
  ["5", "Sepfahn", 2, [5, 2, 13], 0, 10, 10, "Nikana", "Stave", 0.7],
  ["6", "Dehtat", 0, [10, 2, 8], 5, 8, 8, "Rapier", "Polearm", 1.2],
  ["7", "Cyath", 6, [1, 4, 15], 0, 8, 8, "Machete", "Polearm", 0.9],
  ["8", "Mewan", 0, [7, 5, 8], -4, 8, 8, "Sword", "Polearm", 1.1],
  ["9", "Plague Keewar", 82, [1, 32, 35, 14], -2, 8, 12, "Scythe", "Stave", 0.75],
  ["A", "Plague Kripath", -11, [14, -26, -7, 8], 2, 12, 8, "Rapier", "Polearm", 0.6],
] as [string, string, number, number[], number, number, number, string, string, number][];

export const StanceData = {
  Dagger: [1, 2],
  Scythe: [1, 2],
  Machete: [1, 2],
  Sword: [1, 1],
  Nikana: [1, 2],
  Rapier: [1, 1],
  Stave: [1, 1],
  Polearm: [1, 2],
  Hammer: [1, 2],
  HeavyBlade: [1, 2],
};

export const RangeData = {
  Dagger: 1.7,
  Scythe: 1.8,
  Machete: 2.4,
  Sword: 2.5,
  Nikana: 2.5,
  Rapier: 2.5,
  Stave: 3,
  Polearm: 3,
  Hammer: 3,
  HeavyBlade: 3,
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
  disposition: number;
}
export interface ZawStrikeModify {
  dmg: number;
  slide: number;
  type: string;
  range: number;
}

export const ZawStrikeData: ZawStrike[] = _zawStrike.map(v => ({
  idx: v[0],
  id: camelCase(v[1]),
  name: v[1],
  dmg: v[2],
  dmgs: v[3],
  speed: v[4],
  crit: v[5],
  status: v[6],
  oneHand: { dmg: 1, slide: StanceData[v[7]][1], type: v[7], range: RangeData[v[7]] },
  twoHand: { dmg: v[9], slide: StanceData[v[8]][1], type: v[8], range: RangeData[v[8]] },
  disposition: v[9],
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
  ["7", "Shtung", 1, 28, -13],
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
  id: camelCase(v[1]),
  name: v[1],
  twoHand: !!v[2],
  dmg: v[3],
  speed: v[4],
}));

export const NoneZawGripData = {
  idx: "",
  id: "none",
  name: "None",
  twoHand: false,
  dmg: 0,
  speed: 0,
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
  ["F", "Vargeet Ruhang II", 28, -8, 7, -4],
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
  id: camelCase(v[1]),
  name: v[1],
  dmg: v[2],
  speed: v[3],
  crit: v[4],
  status: v[5],
}));

export const NoneZawLinksData: ZawLinks = {
  idx: "",
  id: "none",
  name: "None",
  dmg: 0,
  speed: 0,
  crit: 0,
  status: 0,
};

const getName = (url: string) => {
  let parts = url.split("-");
  const strike = ZawStrikeData.find(v => v.idx === parts[1]);
  return strike.name;
};

export class Zaw extends Weapon {
  strike: ZawStrike;
  grip: ZawGrip;
  links: ZawLinks;

  stance: string;
  mod = MainTag.Zaw;

  get oneHand() {
    return !this.grip.twoHand;
  }
  get twoHand() {
    return this.grip.twoHand;
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
    super({ name: typeof strike === "string" ? getName(strike) : strike.name });
    if (typeof strike === "string") {
      this.url = strike;
    } else {
      [this.strike, this.grip, this.links] = [strike, grip || NoneZawGripData, links || NoneZawLinksData];
      if (strike) this.recalc();
    }
  }
  recalc() {
    this.name = this.strike.name;
    this.disposition = this.strike.disposition;
    this.slideAttack = (this.grip.twoHand ? this.strike.twoHand : this.strike.oneHand).slide;
    this.tags = new WeaponTag(["Melee", "ZAW", this.stance]);

    let modify = this.grip.twoHand ? this.strike.twoHand : this.strike.oneHand;
    this.stance = modify.type;
    this.meleeRange = modify.range;

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
    const dmg = Math.round((224 + this.strike.dmg + this.grip.dmg + this.links.dmg) * modify.dmg);
    const DamageTypes = ["Puncture", "Impact", "Slash", "Viral"];
    let calced: [string, number][];
    if (this.strike.dmgs.length === 4) {
      // let totalDmg = this.strike.dmgs.reduce((a, b) => a + b[1], 0);
      calced = this.strike.dmgs.map((v, i) => [DamageTypes[i], +(v + (dmg - this.strike.dmg) / 4).toFixed(1)]);
    } else {
      calced = this.strike.dmgs.map((v, i) => [DamageTypes[i], +((v * dmg) / 20).toFixed(1)]);
    }
    const mode = {
      // 212 为基础值 12为镀金加成
      damage: calced.filter(v => v[1] > 0),
      fireRate: 60 + this.strike.speed + this.grip.speed + this.links.speed,
      critChance: (10 + this.strike.crit + this.links.crit) / 100,
      procChance: (10 + this.strike.status + this.links.status) / 100,
      critMul: this.strike.idx === "A" ? 2.2 : 2,
    } as CoreWeaponMode;
    this.modes = [mode];
  }
  get displayName() {
    return `${i18n.t(`messages.${camelCase(this.strike.id)}`)}-${i18n.t(`messages.${camelCase(this.grip.id)}`)}-${i18n.t(
      `messages.${camelCase(this.links.id)}`
    )}`;
  }
}
