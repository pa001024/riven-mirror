import _ from "lodash";
import { hAccSum } from "@/warframe/util";
import { i18n } from "@/i18n";
import { Companion } from "./companion";

/**
 * 型号
 */
export interface MoaModel {
  index: number;
  name: string;
  mods: string[];
}
/**
 * 核心
 */
export interface MoaCore {
  index: number;
  name: string;
  mat: string;
  health: number;
  shield: number;
  armor: number;
}
/**
 * 陀螺仪
 */
export interface MoaGyro {
  index: number;
  name: string;
  mat: string;
  health: number;
  shield: number;
  armor: number;
}
/**
 * 脚架
 */
export interface MoaBracket {
  index: number;
  name: string;
  polarities: string;
}

const _moaModel = [
  // index, id, mods
  [1, "Lambeo Moa", ["Stasis Field", "Shockwave Actuators"]],
  [2, "Oloro Moa", ["Tractor Beam", "Security Override"]],
  [3, "Para Moa", ["Whiplash Mine", "Anti-Grav Grenade"]],
] as [number, string, string[]][];

const _moaCore = [
  // index, name, mat, health, shield, armor
  [1, "Drex Core", "Rough", 2, 3, 1],
  [2, "Alcrom Core", "Metal", 2, 1, 3],
  [3, "Krisys Core", "Smooth", 2, 2, 2],
] as [number, string, string, number, number, number][];

const _moaGyro = [
  // index, name, mat, health, shield, armor
  [1, "Aegron Gyro", "Rough", 1, -2, 2],
  [2, "Atheca Gyro", "Metal", -1, 1, 2],
  [3, "Harpen Gyro", "Smooth", 1, 2, -1],
  [4, "Hextra Gyro", "Rough", 2, -1, 1],
  [5, "Munit Gyro", "Rough", 2, 1, -1],
  [6, "Phazor Gyro", "Rough", -1, 2, 1],
  [7, "Trux Gyro", "Rough", 4, -1, -1],
] as [number, string, string, number, number, number][];

const _moaBracket = [
  // index, name, polarities
  [1, "Drimper Bracket", "yyyy"],
  [2, "Gauth Bracket", "yyyy-"],
  [3, "Jonsin Bracket", "yyyyr"],
  [4, "Tian Bracket", "yyyyd"],
] as [number, string, string][];

export const MoaModelData: MoaModel[] = _moaModel.map(v => ({
  index: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  mods: v[2],
}));
export const MoaCoreData: MoaCore[] = _moaCore.map(v => ({
  index: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  mat: v[2],
  health: v[3],
  shield: v[4],
  armor: v[5],
}));
export const MoaGyroData: MoaGyro[] = _moaGyro.map(v => ({
  index: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  mat: v[2],
  health: v[3],
  shield: v[4],
  armor: v[5],
}));
export const MoaBracketData: MoaBracket[] = _moaBracket.map(v => ({
  index: v[0],
  id: v[1],
  name: _.camelCase(v[1]),
  polarities: v[2],
}));

const getName = (url: string) => {
  let parts = url.split("-")[1];
  const model = MoaModelData.find(v => v.index === +parts[0]);
  return model && model.name;
};

export class Moa extends Companion {
  model: MoaModel;
  core: MoaCore;
  gyro: MoaGyro;
  bracket: MoaBracket;

  get tags() {
    return ["Robotic", "Animal", "MOA"];
  }
  get buildName() {
    return `${this.model.index}${this.core.index}${this.gyro.index}${this.bracket.index}`;
  }
  get url() {
    return `MOA-${this.buildName}`;
  }
  set url(value) {
    try {
      let parts = value.split("-")[1];
      this.model = MoaModelData.find(v => v.index === +parts[0]);
      this.core = MoaCoreData.find(v => v.index === +parts[1]);
      this.gyro = MoaGyroData.find(v => v.index === +parts[2]);
      this.bracket = MoaBracketData.find(v => v.index === +parts[3]);
      this.recalc();
    } catch (e) {
      console.error("MOA parse URL fail:", value);
    }
  }
  constructor(model: MoaModel | string, core: MoaCore = null, gyro: MoaGyro = null, bracket: MoaBracket = null) {
    super({ id: typeof model === "string" ? getName(model) : model ? model.name : core.name });
    if (typeof model === "string") {
      this.url = model;
    } else {
      this.model = model;
      this.core = core;
      this.gyro = gyro;
      this.bracket = bracket;
      if (model) this.recalc();
    }
  }
  recalc() {}
  get displayName() {
    if (this.model) return i18n.t(`messages.${_.camelCase(this.model.name)}`);
    else return "MOA";
  }
}
