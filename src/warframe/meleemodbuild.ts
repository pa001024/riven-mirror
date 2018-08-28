import { RivenMod, ModBuild, NormalMod, MeleeWeapon, NormalModDatabase, Enemy, Arcane } from "@/warframe";
import { hAccMul, hAccSum } from "@/warframe/util";

export enum MeleeCompareMode {
  TotalDamage,// 平砍伤害
  SlashDamage,// 滑砍伤害
}
export interface MeleeModBuildOptions {
  compareMode?: MeleeCompareMode
  comboLevel?: number
  allowElementTypes?: string[]
  isUseFury?: boolean
  isUseStrike?: boolean
  extraBaseDamage?: number
  extraOverall?: number
  arcanes?: Arcane[]
  target?: Enemy
}

export class MeleeModBuild extends ModBuild {
  weapon: MeleeWeapon
  // 属性增幅器
  private _rangeMul = 1;
  private _chargeMulMul = 1;
  private _chargeEffMul = 1;
  private _comboDurationAdd = 0;
  private _slideCritChanceAdd = 0;
  private _execDmgMul = 1;
  private _comboCritChanceMul = 0;
  private _comboStatusMul = 1;
  private _statusDamageMul = 1;

  /** 范围增幅倍率 */
  get rangeMul() { return this._rangeMul; }
  /** 充能倍率增幅倍率 */
  get chargeMulMul() { return this._chargeMulMul; }
  /** 充能效率增幅倍率 */
  get chargeEffMul() { return this._chargeEffMul; }
  /** 连击时间增值 */
  get comboDurationAdd() { return this._comboDurationAdd; }
  /** 滑行暴击增值 */
  get slideCritChanceAdd() { return this._slideCritChanceAdd; }
  /** 处决伤害增幅倍率 */
  get execDmgMul() { return this._execDmgMul; }
  /** 连击数增加暴击率 */
  get comboCritChanceMul() { return this._comboCritChanceMul; }
  /** 连击数增加触发率 */
  get comboStatusMul() { return this._comboStatusMul; }
  /** 异常状态增加近战伤害 */
  get statusDamageMul() { return this._statusDamageMul; }

  // 额外参数
  /** 比较方法 */
  compareMode = 0;
  /** 异况触发量 */
  statusCount = 2;

  constructor(weapon: MeleeWeapon = null, riven: RivenMod = null, options: MeleeModBuildOptions = null) {
    super(riven);
    if (this.weapon = weapon)
      this.avaliableMods = NormalModDatabase.filter(v => this.weapon.tags.concat([this.rivenWeapon.name]).includes(v.type));
    if (options) {
      this.options = options;
    }
  }

  set options(options: MeleeModBuildOptions) {
    this.compareMode = typeof options.compareMode !== "undefined" ? options.compareMode : this.compareMode;
    this.comboLevel = typeof options.comboLevel !== "undefined" ? options.comboLevel : this.comboLevel;
    this.allowElementTypes = typeof options.allowElementTypes !== "undefined" ? options.allowElementTypes : this.allowElementTypes;
    this.extraBaseDamage = typeof options.extraBaseDamage !== "undefined" ? options.extraBaseDamage : this.extraBaseDamage;
    this.extraOverall = typeof options.extraOverall !== "undefined" ? options.extraOverall : this.extraOverall;
    this.arcanes = typeof options.arcanes !== "undefined" ? options.arcanes : this.arcanes;
    this.target = typeof options.target !== "undefined" ? options.target : this.target;
  }

  get options(): MeleeModBuildOptions {
    return {
      compareMode: this.compareMode,
      comboLevel: this.comboLevel,
      allowElementTypes: this.allowElementTypes,
      extraBaseDamage: this.extraBaseDamage,
      extraOverall: this.extraOverall,
      arcanes: this.arcanes,
      target: this.target,
    };
  }


  // ### 计算属性 ###

  /** 连击倍率 */
  get comboMul() {
    if (this.weapon.id === "Venka Prime")
      return this.comboLevel * 0.75 + 1;
    else
      return this.comboLevel * 0.5 + 1;
  }
  /** [overwrite] 暴击率 */
  get critChance() { return hAccMul(this.weapon.critChances, this.critChanceMul, this.comboMul > 1 ? 1 + this.comboMul * this.comboCritChanceMul : 1); }
  /** 滑行暴击率 */
  get slideCritDamage() {
    return hAccSum(hAccMul(this.weapon.critChances, this.critChanceMul), this.critChanceAdd, this.slideCritChanceAdd) * (this.comboMul > 1 ? this.comboMul * this._comboCritChanceMul : 1)
  }
  /** 真实触发几率 */
  get realProcChance() { return this.procChance; }
  /** 滑行平均暴击区增幅倍率 */
  get slideCritDamageMul() { return this.calcCritDamage(this.slideCritDamage, this.critMul); }
  /** [overwrite] 总伤增幅倍率 */
  get totalDamageMul() { return hAccMul(this.panelDamageMul, this.critDamageMul, this.overallMul, this.comboMul); }
  /** [overwrite] 总伤害 */
  get totalDamage() { return hAccMul(this.originalDamage, this.totalDamageMul, this.fireRate); }
  /** [overwrite] 原总伤害 */
  get oriTotalDamage() { return hAccMul(this.originalDamage, this.oriCritDamageMul, this.weapon.fireRate); }
  /** 滑行攻击伤害增幅倍率 */
  get slideDamageMul() { return hAccMul(this.panelDamageMul, this.slideCritDamageMul, this.overallMul, this.comboMul); }
  /** 原滑行攻击伤害 */
  get oriSlideDamage() { return hAccMul(this.weapon.slideDmg, this.oriCritDamageMul, this.weapon.fireRate); }
  /** 滑行攻击伤害 */
  get slideDamage() { return hAccMul(this.weapon.slideDmg, this.slideDamageMul, this.fireRate); }
  /** 面板滑行伤害 */
  get panelSlideDamage() { return hAccMul(this.weapon.slideDmg, this.panelDamageMul); }
  /** [overwrite] 用于比较的伤害 */
  get compareDamage() {
    return this.compareMode === MeleeCompareMode.SlashDamage ? this.slideDamage : this.totalDamage;
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
    this._comboStatusMul = 1;
    this._statusDamageMul = 1;
  }

  /**
   * 应用通用属性
   * @param mod MOD
   * @param pName 属性id或名称
   * @param pValue 属性值
   */
  applyProp(mod: NormalMod | Arcane, pName: string, pValue: number) {
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
