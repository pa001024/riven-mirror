import { Weapon } from "./data";
import { RivenMod } from "./rivenmod";


/**
 * MOD自动配置模块
 * 伤害计算原理:
 * 基伤=武器自带所有伤害总和
 * 额伤=基伤*物理MOD*物理比例+基伤*元素MOD
 * 总伤=基伤*多重*额伤
 * 均速=1/(1/射速+装填/弹匣)
 * 均暴=1+暴击*(倍率-1)
 * 均伤=总伤*均暴*均速
 */
export class ModBuild {
  weapon: Weapon
  riven: RivenMod
  // modifiers: M
  private _baseDamage: number
  private _critChance: number
  private _critMul: number
  private _multishot: number
  private _extraDmg: number
  /** 爆头概率 */
  handShotChance = 0
  /** 基伤 */
  get baseDamage() {
    if (!this._baseDamage)
      this._baseDamage = this.weapon.dmg.reduce((a, b) => a + b[1], 0);
    return this._baseDamage;
  }
  /** 额伤 */
  get extraDmg() {
    return this._extraDmg;
  }
  /** 多重 */
  get multishot() {
    return this._multishot;
  }
  /** 总伤 */
  get totalDamage() {
    return this.baseDamage * (1 + this.multishot) * (1 + this.extraDmg);
  }
  /**
   * 均暴
   * @param m 暴击率
   * @param n 暴击倍率
   * @param p 爆头几率 [=0]
   * @param v 爆头倍率 [=2]
   */
  calcCritDamage(m: number, n: number, p = 0, v = 2) {
    if (v != 2)
      return ((1 + (1 - v) * p) * (m * (n - 1) + 1) + m * n * p * v) / (p + 1);
    if (p != 0)
      return m * (n - 1) + 1 + 2 * m * n * p / (p + 1);
    return m * (n - 1) + 1;
  }
  get finalDamage() {
    return 1;
  }
  /**
   * 自动按武器属性填充MOD
   */
  fill() {
    // 把所有暴击有关的卡全部列出 按数值从高到低排序 并计算收益
    // 如步枪使用150% / 120% / 150%+120% / 150%+135% ... 150%+135%+120%+120% 等等
    // 按每张平均收益储存该组合并与其它类型MOD按收益进行降序排序
    // 将排序结果最高的所有结果作为候选项
  }
  constructor() {

  }
}
