import { Damage2_0, DamageType, EnemyData, EnemyList, NormalMod, NormalModDatabase } from "@/warframe/codexs";

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
  static getFleshTypeName(id: number) { return Damage2_0.getFleshTypeName(id) }
  static getSheildTypeName(id: number) { return Damage2_0.getSheildTypeName(id); }
  static getArmorTypeName(id: number) { return Damage2_0.getArmorTypeName(id); }
  static getEnemy(id: string) { return this.instance.enemyDict.get(id); }
}

export * from '@/warframe/codexs';
