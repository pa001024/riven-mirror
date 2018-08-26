import { AcolyteModsList, GunWeapon, NormalMod, NormalModDatabase, ModBuild, RivenMod, Enemy } from "@/warframe";
import { hAccSum, hAccMul } from "@/warframe/util";

/*
 * MOD自动配置模块
 * 伤害计算原理:
 * 基伤=武器自带所有伤害总和
 * 额伤=基伤*物理MOD*物理比例+基伤*元素MOD
 * 总伤=基伤*多重*额伤
 * 均速=1/(1/射速+装填/弹匣)
 * 均暴=1+暴击*(倍率-1)
 * 均伤=总伤*均暴*均速
 */

export enum GunCompareMode {
  TotalDamage,// 单发伤害
  BurstDamage,// 爆发伤害
  SustainedDamage // 持续伤害
}
export interface GunModBuildOptions {
  compareMode?: GunCompareMode
  useAcolyteMods?: boolean
  useHeavyCaliber?: boolean
  useHunterMunitions?: number
  handShotChance?: number
  allowElementTypes?: string[]
  isUseMomentum?: boolean
  isUseVelocity?: boolean
  extraBaseDamage?: number
  target?: Enemy
}
/** 枪类 */
export class GunModBuild extends ModBuild {
  weapon: GunWeapon
  // 属性增幅器
  private _multishotMul = 1;
  private _magazineMul = 1;
  private _reloadSpeedMul = 1;
  private _maxAmmoMul = 1;
  private _zoomMul = 1;
  private _projectileSpeedMul = 1;
  private _recoilMul = 1;
  private _punchThrough = 0;
  private _slashWhenCrit = 0;
  private _critLevelUpChance = 0;
  private _firstAmmoMul = 1;

  /** 多重增幅倍率 */
  get multishotMul() { return this._multishotMul; }
  /** 弹夹容量增幅倍率 */
  get magazineMul() { return this._magazineMul; }
  /** 换弹增幅倍率 */
  get reloadSpeedMul() { return this._reloadSpeedMul; }
  /** 最大弹容增幅倍率 */
  get maxAmmoMul() { return this._maxAmmoMul; }
  /** 变焦增幅倍率 */
  get zoomMul() { return this._zoomMul; }
  /** 抛射物飞行速度增幅倍率 */
  get projectileSpeedMul() { return this._projectileSpeedMul; }
  /** 后坐力增幅倍率 */
  get recoilMul() { return this._recoilMul; }
  /** 穿透增幅量 */
  get punchThrough() { return this._punchThrough; }
  /** 暴击时触发切割伤害 */
  get slashWhenCrit() { return this._slashWhenCrit; }
  /** 暴击强化 */
  get critLevelUpChance() { return this._critLevelUpChance; }
  /** 第一发子弹伤害加成 */
  get firstAmmoMul() { return this._firstAmmoMul; }

  // 额外参数

  /** 使用追随者MOD */
  useAcolyteMods = true;
  /** 使用重口径 */
  useHeavyCaliber = true;
  /** 使用猎人战备  0=不用 1=自动选择 2=必须用 */
  useHunterMunitions = 0;
  /** 动量赋能 */
  isUseMomentum = false;
  /** 迅速赋能 */
  isUseVelocity = false;

  constructor(weapon: GunWeapon = null, riven: RivenMod = null, options: GunModBuildOptions = null) {
    super(riven);
    if (this.weapon = weapon) {
      this.avaliableMods = NormalModDatabase.filter(v => this.weapon.tags.concat([this.rivenWeapon.name]).includes(v.type));
    }
    if (options) {
      this.options = options;
    }
  }

  set options(options: GunModBuildOptions) {
    this.compareMode = typeof options.compareMode !== "undefined" ? options.compareMode : this.compareMode;
    this.useAcolyteMods = typeof options.useAcolyteMods !== "undefined" ? options.useAcolyteMods : this.useAcolyteMods;
    this.useHeavyCaliber = typeof options.useHeavyCaliber !== "undefined" ? options.useHeavyCaliber : this.useHeavyCaliber;
    this.useHunterMunitions = typeof options.useHunterMunitions !== "undefined" ? options.useHunterMunitions : this.useHunterMunitions;
    this.handShotChance = typeof options.handShotChance !== "undefined" ? options.handShotChance : this.handShotChance;
    this.allowElementTypes = typeof options.allowElementTypes !== "undefined" ? options.allowElementTypes : this.allowElementTypes;
    this.isUseMomentum = typeof options.isUseMomentum !== "undefined" ? options.isUseMomentum : this.isUseMomentum;
    this.isUseVelocity = typeof options.isUseVelocity !== "undefined" ? options.isUseVelocity : this.isUseVelocity;
    this.extraBaseDamage = typeof options.extraBaseDamage !== "undefined" ? options.extraBaseDamage : this.extraBaseDamage;
    this.target = typeof options.target !== "undefined" ? options.target : this.target;
  }
  get options(): GunModBuildOptions {
    return {
      compareMode: this.compareMode,
      useAcolyteMods: this.useAcolyteMods,
      useHeavyCaliber: this.useHeavyCaliber,
      useHunterMunitions: this.useHunterMunitions,
      handShotChance: this.handShotChance,
      allowElementTypes: this.allowElementTypes,
      isUseMomentum: this.isUseMomentum,
      isUseVelocity: this.isUseVelocity,
      extraBaseDamage: this.extraBaseDamage,
      target: this.target,
    }
  }

  /** [overwrite] 目标打击时间线 */
  getTimeline(limit = 10) {
    if (this.target)
      return super.getTimeline(limit, this.bullets, (this.weapon.rivenName || this.weapon.id) === "Knell" ? 9999 : this.magazineSize, this.reloadTime);
    else return null;
  }

  // ### 计算属性 ###
  get accuracy() { return this.weapon.accuracy; }
  get bullets() { return this.weapon.bullets * this.multishotMul; }
  /** 换弹时间 */
  get reloadTime() { return this.weapon.reload / hAccSum(this.reloadSpeedMul, (this.isUseMomentum ? 1 : 0)); }
  /** 弹夹容量 */
  get magazineSize() { return Math.round(this.weapon.magazine * this.magazineMul); }
  /** 最大弹药 */
  get maxAmmo() { return Math.round(this.weapon.ammo * this.maxAmmoMul); }

  /** [overwrite] 暴击率 */
  get critChance() {
    // 兰卡开镜暴击
    if ((this.weapon.rivenName || this.weapon.id) === "Lanka")
      return hAccMul(this.weapon.criticalChances, this.critChanceMul) + 0.5;
    return hAccMul(this.weapon.criticalChances, this.critChanceMul);
  }
  /** [overwrite] 暴击倍率 */
  get critMul() {
    // 绝路开镜暴伤
    if ((this.weapon.rivenName || this.weapon.id) === "Rubico")
      return hAccMul(this.weapon.criticalMultiplier, this.critMulMul) + 0.5;
    // 丧钟开镜暴伤
    if ((this.weapon.rivenName || this.weapon.id) === "Knell")
      return hAccMul(this.weapon.criticalMultiplier, this.critMulMul) + 2.5;
    return hAccMul(this.weapon.criticalMultiplier, this.critMulMul);
  }

  /** [overwrite] 面板基础伤害增幅倍率 */
  get panelBaseDamageMul() { return hAccMul(this.baseDamageMul, this.multishotMul); }
  /** 爆发伤害增幅倍率 */
  get burstDamageMul() { return hAccMul(this.totalDamageMul, this.fireRateMul); }
  /** [overwrite] 平均暴击区增幅倍率 */
  get critDamageMul() {
    // 私法系列的暴击强化可以直接加在这里 因为白字无加成 去掉不暴击的概率
    let upLvlChance = this.critChance >= 1 ? this.critLevelUpChance : this.critChance * this.critLevelUpChance;
    return this.calcCritDamage(this.critChance + upLvlChance, this.critMul, this.handShotChance, this.handShotMul);
  }
  /** 每个弹片触发几率 */
  get realProcChance() { return 1 - (1 - this.procChance) ** (1 / this.weapon.bullets); }
  /** 平均射速增幅倍率  */
  get sustainedFireRateMul() { return (1 / this.weapon.fireRate + this.weapon.reload / this.weapon.magazine) * this.sustainedFireRate; }
  /** [overwrite] 射速 */
  get fireRate() {
    let fr = this.weapon.fireRate * hAccSum(this.fireRateMul, (this.isUseVelocity ? 0.8 : 0));
    // 攻速下限
    return fr < 0.05 ? 0.05 : fr;
  }
  /** 原平均射速=1/(1/射速+装填/弹匣) */
  get oriSustainedFireRate() { return 1 / (1 / this.weapon.fireRate + this.weapon.reload / this.weapon.magazine); }
  /** 平均射速=1/(1/射速+装填/弹匣) */
  get sustainedFireRate() { return 1 / (1 / this.fireRate + this.reloadTime / this.magazineSize); }
  /** 持续伤害增幅倍率  */
  get sustainedDamageMul() { return hAccMul(this.totalDamageMul, this.sustainedFireRateMul); }
  /** 原爆发伤害 */
  get oriBurstDamage() { return hAccMul(this.oriTotalDamage, this.weapon.fireRate); }
  /** 爆发伤害 */
  get burstDamage() { return hAccMul(this.totalDamage, this.fireRate); }
  /** 原持续伤害 */
  get oriSustainedDamage() { return hAccMul(this.oriTotalDamage, this.oriSustainedFireRate); }
  /** 持续伤害 */
  get sustainedDamage() { return hAccMul(this.totalDamage, this.sustainedFireRate); }
  /** [overwrite] 用于比较的伤害 */
  get compareDamage() {
    return this.compareMode == GunCompareMode.TotalDamage ? this.totalDamage : this.compareMode == GunCompareMode.BurstDamage ? this.burstDamage : this.sustainedDamage;
  }

  // ### 基类方法 ###

  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    if (!super.isValidMod(mod))
      return false;
    if (!this.useAcolyteMods && AcolyteModsList.some(v => v === mod.name))
      return false;
    if (!this.useHeavyCaliber && "重口径" === mod.name)
      return false;
    if (!this.useHunterMunitions && "猎人 战备" === mod.name)
      return false;
    return true;
  }

  /** 重置所有属性增幅器 */
  reset() {
    super.reset();
    this._multishotMul = 1;
    this._fireRateMul = 1;
    this._magazineMul = 1;
    this._reloadSpeedMul = 1;
    this._maxAmmoMul = 1;
    this._punchThrough = 0;
    this._zoomMul = 1;
    this._projectileSpeedMul = 1;
    this._recoilMul = 1;
    this._slashWhenCrit = 0;
    this._critLevelUpChance = 0;
    this._firstAmmoMul = 1;
  }
  /**
   * 自动按武器属性填充MOD
   * @param slots 可用的插槽数
   * @param useRiven 是否使用紫卡 0=不用 1=自动选择 2=必须用
   */
  fill(slots = 8, useRiven = 1) {
    if (this.useHunterMunitions === 2)
      this.applyMod(NormalModDatabase.find(v => v.name === "猎人 战备"));
    super.fill(slots, useRiven);
  }
  /**
  * 应用枪属性
  * @param mod MOD
  * @param pName 属性id或名称
  * @param pValue 属性值
  */
  applyProp(mod: NormalMod, pName: string, pValue: number) {
    switch (pName) {
      case 'D': /* 伤害 baseDmg */ this._baseDamageMul = hAccSum(this._baseDamageMul, pValue); break;
      case 'S': /* 多重射击 multiShot */ this._multishotMul = hAccSum(this._multishotMul, pValue); break;
      case 'R': /* 射速（弓类武器效果加倍） fireRate */ this._fireRateMul = hAccSum(this._fireRateMul, (this.weapon.tags.includes("弓") ? 2 * pValue : pValue)); break;
      case 'L': /* 弹匣容量 magazine */ this._magazineMul = hAccSum(this._magazineMul, pValue); break;
      case 'F': /* 装填速度 reloadSpeed */ this._reloadSpeedMul = hAccSum(this._reloadSpeedMul, pValue); break;
      case 'M': /* 弹药最大值 maxAmmo' */ this._maxAmmoMul = hAccSum(this._maxAmmoMul, pValue); break;
      case 'P': /* 穿透 punchThrough */ this._punchThrough = hAccSum(this._punchThrough, pValue); break;
      case 'H': /* 变焦 zoom */ this._zoomMul = hAccSum(this._zoomMul, pValue); break;
      case 'V': /* 抛射物飞行速度 projectileSpeed */ this._projectileSpeedMul = hAccSum(this._projectileSpeedMul, pValue); break;
      case 'Z': /* 后坐力 recoil */ this._recoilMul = hAccSum(this._recoilMul, pValue); break;
      case '暴击时触发切割伤害': /* 暴击时触发切割伤害 slashWhenCrit */this._slashWhenCrit = hAccSum(this._slashWhenCrit, pValue); break;
      case '暴击强化': /* 暴击强化 critLevelUpChance */this._critLevelUpChance = hAccSum(this._critLevelUpChance, pValue); break;
      case '第一发子弹伤害加成': /* 第一发子弹伤害加成 firstAmmoMul */this._firstAmmoMul = hAccSum(this._firstAmmoMul, pValue); break;
      default:
        super.applyProp(mod, pName, pValue);
    }
  }
}
