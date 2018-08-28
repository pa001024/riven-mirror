import { Damage2_0, DamageType, EnemyData, EnemyList, NormalMod, NormalModDatabase, Weapon, ArcaneList } from "./";

/**
 * 原版数据库
 */
export class Codex {
  protected static instance = new Codex();
  private modDict: Map<string, NormalMod>;
  private enemyDict: Map<string, EnemyData>;
  constructor() {
    this.modDict = new Map(NormalModDatabase.map(v => [v.id, v] as [string, NormalMod]));
    this.enemyDict = new Map(EnemyList.map(v => [v.id, v] as [string, EnemyData]))
  }

  static getNormalMod(id: string) {
    return this.instance.modDict.get(id);
  }
  static getDamageType(id: DamageType) { return Damage2_0.getDamageType(id); }
  static getEnemy(id: string) { return this.instance.enemyDict.get(id); }
  static getAvailableArcanes(weapon: Weapon) {
    return ArcaneList.filter(v => v.type === "武器" || weapon.tags.includes(v.type));
  }
}

export * from './enemy'
export * from './arcane'
export * from './weapon'
export * from './zaw'
export * from './riven'
export * from './mod'
