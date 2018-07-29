import { ModBuild } from "@/warframe/modbuild";
import { NormalMod, MeleeWeapon, NormalModDatabase } from "@/warframe/data";
import { RivenMod } from "@/warframe/rivenmod";

export class MeleeModBuild extends ModBuild {
  weapon: MeleeWeapon
  // 增幅器
  private _rangeMul = 1; /** 范围增幅倍率 */  get rangeMul() { return this._rangeMul; }
  private _attackSpeedMul = 1; /** 攻击速度增幅倍率 */  get attackSpeedMul() { return this._attackSpeedMul; }
  private _chargeMulMul = 1; /** 充能倍率增幅倍率 */  get chargeMulMul() { return this._chargeMulMul; }
  private _chargeEffMul = 1; /** 充能效率增幅倍率 */  get chargeEffMul() { return this._chargeEffMul; }
  private _comboDurationAdd = 0; /** 连击时间增值 */  get comboDurationAdd() { return this._comboDurationAdd; }
  private _slideCritChanceMul = 1; /** 滑行暴击增幅倍率 */  get slideCritChanceMul() { return this._slideCritChanceMul; }
  private _execDmgMul = 1; /** 处决伤害增幅倍率 */  get execDmgMul() { return this._execDmgMul; }
  // 额外参数

  constructor(riven: RivenMod, selected: string) {
    super(riven);
    let weapons = riven.weapons;
    this.weapon = weapons.find(v => selected === v.name) || weapons[0];
    this.avaliableMods = NormalModDatabase.filter(v => this.weapon.tags.includes(v.type));
  }

  /** 平均暴击区增幅倍率 */
  get critDamageMul() {
    return this.calcCritDamage(this.weapon.criticalChances * this.critChanceMul, this.weapon.criticalMultiplier * this.critMulMul);
  }
  /** 总伤害 */
  get totalDamage() {
    return 0;
  }
  get compareDamage() {
    return this.totalDamage;
  }
  /** 重置所有属性增幅器 */
  reset() {
    this._baseDamageMul = 1;
    this._critChanceMul = 1;
    this._critMulMul = 1;
    this._extraDmgMul = 1;
    this._procChanceMul = 1;
    this._procDurationMul = 1;
    this._enemyDmgMul = 1;
    this._rangeMul = 1;
    this._attackSpeedMul = 1;
    this._chargeMulMul = 1;
    this._chargeEffMul = 1;
    this._comboDurationAdd = 0;
    this._slideCritChanceMul = 1;
    this._execDmgMul = 1;
  }
  // ### 基类方法 ###

  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    if (!super.isValidMod(mod))
      return false;
    return true;
  }

  /**
   * 应用通用属性
   * @param mod MOD
   * @param pName 属性id或名称
   * @param pValue 属性值
   */
  applyProp(mod: NormalMod, pName: string, pValue: number) {
    switch (pName) {
      case 'K': /* 近战伤害 baseDmg */ this._baseDamageMul += pValue; break;
      case 'T': /* 攻击范围 range */ this._rangeMul += pValue; break;
      case 'J': /* 攻击速度 attackSpeed */ this._attackSpeedMul += pValue; break;
      case 'B': /* 充能伤害 chargeMul */ this._chargeMulMul += pValue; break;
      case 'U': /* 充能效率 chargeEff */ this._chargeEffMul += pValue; break;
      case 'N': /* 连击持续时间 comboDuration */ this._comboDurationAdd += pValue; break;
      case 'E': /* 滑行攻击造成暴击几率 slideCritChance */ this._slideCritChanceMul += pValue; break;
      case 'X': /* 处决伤害 execDmg */ this._execDmgMul += pValue; break;
      default:
        super.applyProp(mod, pName, pValue);
    }
  }
}
