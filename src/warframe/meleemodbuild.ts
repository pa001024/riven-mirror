import { ModBuild } from "@/warframe/modbuild";
import { NormalMod, MeleeWeapon, NormalModDatabase } from "@/warframe/data";
import { RivenMod } from "@/warframe/rivenmod";

export interface MeleeModBuildOptions {
  isCalcSlide: boolean
  comboLevel: number
  allowElementTypes: string[]
}

export class MeleeModBuild extends ModBuild {
  weapon: MeleeWeapon
  // 增幅器
  private _rangeMul = 1;
  /** 范围增幅倍率 */
  get rangeMul() { return this._rangeMul; }
  private _chargeMulMul = 1; /** 充能倍率增幅倍率 */  get chargeMulMul() { return this._chargeMulMul; }
  private _chargeEffMul = 1; /** 充能效率增幅倍率 */  get chargeEffMul() { return this._chargeEffMul; }
  private _comboDurationAdd = 0; /** 连击时间增值 */  get comboDurationAdd() { return this._comboDurationAdd; }
  private _slideCritChanceAdd = 0; /** 滑行暴击增值 */  get slideCritChanceAdd() { return this._slideCritChanceAdd; }
  private _execDmgMul = 1; /** 处决伤害增幅倍率 */  get execDmgMul() { return this._execDmgMul; }
  private _comboCritChanceMul = 0; /** 连击数增加暴击率 */  get comboCritChanceMul() { return this._comboCritChanceMul; }
  private _comboStatusMul = 0; /** 连击数增加触发率 */  get comboStatusMul() { return this._comboStatusMul; }
  private _statusDamageMul = 0; /** 异常状态增加近战伤害 */  get statusDamageMul() { return this._statusDamageMul; }

  // 额外参数

  /** 连击层数 */
  comboLevel = 0;
  /** 异况触发量 */
  statusCount = 2;
  /** 是否计算滑行伤害 */
  isCalcSlide = true;

  /** 设置连击数 */
  set comboCount(value) {
    this.comboLevel = value > 4 ? ~~(Math.log(value / 5) / Math.log(3)) + 1 : 0;
  }

  constructor(riven: RivenMod = null, selected: string = null, options: MeleeModBuildOptions = null) {
    super(riven);
    if (riven) {
      let weapons = riven.weapons as MeleeWeapon[];
      // console.log()
      this.weapon = weapons.find(v => selected === v.name) || weapons[0];
      this.avaliableMods = NormalModDatabase.filter(v => this.weapon.tags.includes(v.type));
    }
    if (options) {
      this.options = options;
    }
  }

  set options(options: any) {
    this.isCalcSlide = options.isCalcSlide;
    this.comboLevel = options.comboLevel;
    this.allowElementTypes = options.allowElementTypes;
  }
  get options(): any {
    return {
      isCalcSlide: this.isCalcSlide,
      comboLevel: this.comboLevel,
      allowElementTypes: this.allowElementTypes,
    } as MeleeModBuildOptions;
  }


  // ### 计算属性 ###

  /** 连击倍率 */
  get comboMul() {
    if (this.weapon.name === "凯旋之爪 Prime")
      return this.comboLevel * 0.75 + 1;
    else
      return this.comboLevel * 0.5 + 1;
  }
  /** 暴击率 */
  get critChance() {
    return this.weapon.criticalChances * this.critChanceMul * (this.comboMul > 1 ? this.comboMul * this.comboCritChanceMul : 1);
  }
  /** 滑行暴击率 */
  get slideCritDamage() {
    return (this.weapon.criticalChances * this.critChanceMul + this.slideCritChanceAdd) * (this.comboMul > 1 ? this.comboMul * this._comboCritChanceMul : 1)
  }
  /** 暴击倍率 */
  get critMul() {
    return this.weapon.criticalMultiplier * this.critMulMul;
  }
  /** 平均暴击区增幅倍率 */
  get critDamageMul() { return this.calcCritDamage(this.critChance, this.critMul); }
  /** 滑行平均暴击区增幅倍率 */
  get slideCritDamageMul() { return this.calcCritDamage(this.slideCritDamage, this.critMul); }
  /** 面板伤害增幅倍率 */
  get panelDamageMul() { return this.baseDamageMul * this.extraDmgMul; }
  /** 总伤增幅倍率 */
  get totalDamageMul() { return this.panelDamageMul * this.critDamageMul * this.comboMul; }
  /** 滑行攻击伤增幅倍率 */
  get slideDamageMul() { return this.panelDamageMul * this.slideCritDamageMul * this.comboMul; }
  /** 面板伤害 */
  get panelDamage() { return this.originalDamage * this.panelDamageMul; }
  /** 总伤害 */
  get totalDamage() { return this.originalDamage * this.totalDamageMul * this.fireRate; }
  /** 滑行攻击伤害 */
  get slideDamage() { return this.weapon.slideDmg * this.slideDamageMul * this.fireRate; }
  /** 用于比较的伤害 */
  get compareDamage() {
    return this.isCalcSlide ? this.slideDamage : this.totalDamage;
  }

  // ### 基类方法 ###

  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    if (!super.isValidMod(mod))
      return false;
    return true;
  }


  /** 重置所有属性增幅器 */
  reset() {
    super.reset();
    this._rangeMul = 1;
    this._chargeMulMul = 1;
    this._chargeEffMul = 1;
    this._comboDurationAdd = 0;
    this._slideCritChanceAdd = 0;
    this._execDmgMul = 1;
    this._comboCritChanceMul = 0;
    this._comboStatusMul = 0;
    this._statusDamageMul = 0;
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
      case 'J': /* 攻击速度 attackSpeed */ this._fireRateMul += pValue; break;
      case 'B': /* 充能伤害 chargeMul */ this._chargeMulMul += pValue; break;
      case 'U': /* 充能效率 chargeEff */ this._chargeEffMul += pValue; break;
      case 'N': /* 连击持续时间 comboDuration */ this._comboDurationAdd += pValue; break;
      case 'E': /* 滑行攻击造成暴击几率 slideCritChance */ this._slideCritChanceAdd += pValue; break;
      case 'X': /* 处决伤害 execDmg */ this._execDmgMul += pValue; break;
      case '连击数增加暴击率': this._comboCritChanceMul += pValue; break;
      case '连击数增加触发率': this._comboStatusMul += pValue; break;
      case '异常状态增加近战伤害': this._statusDamageMul += pValue; break;
      default:
        super.applyProp(mod, pName, pValue); break;
    }
  }
}
