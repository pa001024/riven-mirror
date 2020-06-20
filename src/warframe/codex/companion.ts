import { camelCase } from "lodash-es";
import { i18n } from "@/i18n";
import { _companionData } from "./companion.data";
import { CompanionData } from "./companion.i";
import { Damage } from "./weapon.i";

/** 同伴 */
export class Companion {
  id: string;
  name: string;
  className?: string;
  tags: string[];
  health: number;
  shield: number;
  armor: number;
  polarities: string[];

  damage?: Damage;
  critChance?: number;
  critMul?: number;
  procChance?: number;

  constructor(data: CompanionData) {
    const base = data.className ? _companionData.find(v => v.id === data.className) : ({} as CompanionData);
    this.id = data.id;
    const ikey = `messages.${camelCase(data.id)}`;
    this.name = i18n.te(ikey) ? i18n.t(ikey) : data.id;
    if (data.tags || base.tags) this.tags = data.tags || base.tags || [];
    if (data.className) this.className = data.className;
    if (data.health) this.health = data.health;
    if (data.shield) this.shield = data.shield;
    if (data.armor) this.armor = data.armor;
    if (data.polarities) this.polarities = data.polarities ? data.polarities.split("") : [];
    if (data.damage) this.damage = data.damage;
    if (data.critChance) this.critChance = data.critChance;
    if (data.critMul) this.critMul = data.critMul;
    if (data.procChance) this.procChance = data.procChance;
  }

  get url() {
    return this.id.replace(/ /g, "_");
  }

  get isBase() {
    return !this.className;
  }
  get companions() {
    return CompanionDataBase.getCompanionByClassName(this.className || this.id);
  }

  /** 有效生命 */
  get effectiveHealth() {
    return this.shield + this.health * (1 + this.armor / 300);
  }
}

/** 同伴数据辅助类 */
export class CompanionDataBase {
  protected _companions: CompanionData[];
  protected _i2w: Map<string, CompanionData>;
  protected _f2w: { [key: string]: string[] };
  constructor() {
    this._companions = _companionData;
    this._i2w = new Map(this._companions.map(v => [v.id, v] as [string, CompanionData]));
    this._f2w = _companionData.reduce(
      (a, b) => {
        let cn = b.className || b.id;
        if (cn in a) a[cn].push(b.id);
        else a[cn] = [b.id];
        return a;
      },
      {} as { [key: string]: string[] }
    );
  }
  protected static instance = new CompanionDataBase();
  static reload() {
    this.instance = new CompanionDataBase();
  }
  static getCompanionById(id: string) {
    return this.instance._i2w.has(id) && new Companion(this.instance._i2w.get(id));
  }
  static getCompanionByClassName(className: string) {
    return this.instance._f2w[className].map(v => this.getCompanionById(v));
  }
  /** 所有同伴 */
  static get Companions() {
    return this.instance._companions.map(v => new Companion(v));
  }
  static get All() {
    return this.instance._companions.filter(v => !v.className).map(v => new Companion(v));
  }
  /** 所有种类 */
  static get ClassNames() {
    return Object.keys(this.instance._f2w);
  }

  // 查询类
  static get Sentinel() {
    return this.instance._companions.filter(v => !v.className && v.tags && v.tags.includes("Sentinel")).map(v => new Companion(v));
  }
  static get Beast() {
    return this.instance._companions.filter(v => !v.className && v.tags && v.tags.includes("Beast")).map(v => new Companion(v));
  }
}
