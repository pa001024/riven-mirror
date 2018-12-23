import { i18n } from "@/i18n";
import { _warframeData, _abilityData, WarframeFunction } from "./warframe.data";
import { AbilityData, WarframeData } from "./warframe.i";

const defaultLvlUps: [string, number][] = [["h", 2], ["e", 0.5], ["s", 2]];

/** 战甲 */
export class Warframe implements WarframeData {
  id: string;
  name: string;
  tags: string[];
  description: string;
  className?: string;
  health: number;
  shield: number;
  armor: number;
  energy: number;
  sprint: number;
  introduced: string;
  masteryReq?: number;
  polarities: string[];
  lvlUps?: [string, number][];
  // prime common props
  passiveDescription?: string;
  abilities?: string[];
  aura?: string;
  sex?: string;
  // prime only props
  releaseDate?: string;
  vaultDate?: string;
  estimatedVaultDate?: string;

  constructor(data: WarframeData) {
    let base = this.className ? _warframeData.find(v => v.id === this.className) : {} as WarframeData;
    this.id = data.id;
    this.name = i18n.t(`messages.${data.name}`) as string;
    this.tags = data.tags || base.tags || [];
    this.description = data.description;
    this.className = data.className;
    this.health = data.health;
    this.shield = data.shield;
    this.armor = data.armor;
    this.energy = data.energy;
    this.sprint = data.sprint;
    this.introduced = data.introduced;
    this.masteryReq = data.masteryReq;
    this.polarities = data.polarities;
    this.lvlUps = data.lvlUps || base.lvlUps || defaultLvlUps;
    this.passiveDescription = data.passiveDescription || base.passiveDescription;
    this.abilities = data.abilities || base.abilities;
    this.aura = data.aura || base.aura;
    this.sex = data.sex || base.sex;
    this.releaseDate = data.releaseDate;
    this.vaultDate = data.vaultDate;
    this.estimatedVaultDate = data.estimatedVaultDate;
  }

  get url() {
    return this.id.replace(/ /g, "_");
  }

  get isBase() { return !this.className }
  get warframes() { return WarframeDataBase.getWarframeByClassName(this.className || this.id) }

  get abilityStrength() { return 1 }
  get abilityDuration() { return 1 }
  get abilityEfficiency() { return 1 }
  get abilityRange() { return 1 }
  /** 有效生命 */
  get effectiveHealth() {
    return this.shield + (this.health * (1 + this.armor / 300));
  }
}

/** 战甲数据辅助类 */
export class WarframeDataBase {
  protected _warframes: Warframe[];
  protected _i2w: Map<string, Warframe>;
  protected _i2a: Map<string, AbilityData>;
  protected _f2w: { [key: string]: string[] };
  constructor() {
    this._warframes = _warframeData.map(v => new Warframe(v));
    this._i2w = new Map(this._warframes.map(v => [v.id, v] as [string, Warframe]));
    this._i2a = new Map(_abilityData.map(v => [v.id, v] as [string, AbilityData]));
    this._f2w = _warframeData.reduce((a, b) => {
      let cn = b.className || b.id;
      if (cn in a) a[cn].push(b.id);
      else a[cn] = [b.id];
      return a;
    }, {} as { [key: string]: string[] });
  }
  protected static instance = new WarframeDataBase();
  static reload() { this.instance = new WarframeDataBase() }
  static getWarframeById(id: string) { return this.instance._i2w.get(id) }
  static getWarframeByClassName(className: string) { return this.instance._f2w[className].map(v => this.instance._i2w.get(v)) }
  /** 所有战甲 */
  static get All() { return this.instance._warframes.filter(v => v.isBase) }
  /** 所有种类 */
  static get ClassNames() { return Object.keys(this.instance._f2w) }
  // 查询类
  static get DPS() { return this.instance._warframes.filter(v => v.isBase && v.tags && v.tags.includes(WarframeFunction.DPS)) }
  static get Tactics() { return this.instance._warframes.filter(v => v.isBase && v.tags && v.tags.includes(WarframeFunction.Tactics)) }
  static get Tank() { return this.instance._warframes.filter(v => v.isBase && v.tags && v.tags.includes(WarframeFunction.Tank)) }
  static get Support() { return this.instance._warframes.filter(v => v.isBase && v.tags && v.tags.includes(WarframeFunction.Support)) }
  static get Control() { return this.instance._warframes.filter(v => v.isBase && v.tags && v.tags.includes(WarframeFunction.Control)) }

  static get Abilities() { return _abilityData }
  static getAbility(name: string) { return this.instance._i2a.get(name) }
}

