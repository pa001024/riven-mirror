import { AcolyteModsList, GunWeapon, NormalCardDependTable, NormalMod, NormalModDatabase, ModBuild, RivenMod } from "@/warframe";
import { hAccSum } from "@/warframe/util";


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
  compareMode: GunCompareMode
  useAcolyteMods: boolean
  useHeavyCaliber: boolean
  useHunterMunitions: number
  handShotChance: number
  allowElementTypes: string[]
  isUseMomentum: boolean
  isUseVelocity: boolean
}
/** 枪类 */
export class GunModBuild extends ModBuild {
  weapon: GunWeapon
  // 增幅器
  private _multishotMul = 1; /** 多重增幅倍率 */  get multishotMul() { return this._multishotMul; }
  private _magazineMul = 1; /** 弹夹容量增幅倍率 */  get magazineMul() { return this._magazineMul; }
  private _reloadSpeedMul = 1; /** 换弹增幅倍率 */  get reloadSpeedMul() { return this._reloadSpeedMul; }

  private _maxAmmoMul = 1; /** 最大弹容增幅倍率 */  get maxAmmoMul() { return this._maxAmmoMul; }
  private _zoomMul = 1; /** 变焦增幅倍率 */  get zoomMul() { return this._zoomMul; }
  private _projectileSpeedMul = 1; /** 抛射物飞行速度增幅倍率 */  get projectileSpeedMul() { return this._projectileSpeedMul; }
  private _recoilMul = 1; /** 后坐力增幅倍率 */  get recoilMul() { return this._recoilMul; }
  private _punchThrough = 0; /** 穿透增幅量 */  get punchThrough() { return this._punchThrough; }
  private _handShotMulMul = 1; /** 爆头倍率增幅倍率 */  get handShotMulMul() { return this._handShotMulMul; }
  private _slashWhenCrit = 0; /** 暴击时触发切割伤害 */  get slashWhenCrit() { return this._slashWhenCrit; }
  private _critLevelUpChance = 0; /** 暴击强化 */  get critLevelUpChance() { return this._critLevelUpChance; }

  // 额外参数
  private _handShotChance = 0; /** 爆头概率 */  get handShotChance() { return this._handShotChance; }
  /** 设置爆头概率 */
  set handShotChance(value) {
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    this._handShotChance = value;
  }

  compareMode: GunCompareMode = GunCompareMode.TotalDamage;
  /** 使用追随者MOD */
  useAcolyteMods = false;
  /** 使用重口径 */
  useHeavyCaliber = true;
  /** 使用猎人战备  0=不用 1=自动选择 2=必须用 */
  useHunterMunitions = 0;
  /** 动量赋能 */
  isUseMomentum = false;
  /** 迅速赋能 */
  isUseVelocity = false;
  /** chroma加成 */
  chromaBaseDamage = 0;

  constructor(riven: RivenMod = null, selected: string = null, options: GunModBuildOptions = null) {
    super(riven);
    if (riven) {
      let weapons = riven.weapons as GunWeapon[];
      this.weapon = weapons.find(v => selected === v.name) || weapons[0];
      this.avaliableMods = NormalModDatabase.filter(v => this.weapon.tags.includes(v.type));
    }
    if (options) {
      this.options = options;
    }
  }

  set options(options: any) {
    this.compareMode = options.compareMode;
    this.useAcolyteMods = options.useAcolyteMods;
    this.useHeavyCaliber = options.useHeavyCaliber;
    this.useHunterMunitions = options.useHunterMunitions;
    this.handShotChance = options.handShotChance;
    this.allowElementTypes = options.allowElementTypes;
    this.isUseMomentum = options.isUseMomentum;
    this.isUseVelocity = options.isUseVelocity;
    this.chromaBaseDamage = options.chromaBaseDamage;
  }
  get options(): any {
    return {
      compareMode: this.compareMode,
      useAcolyteMods: this.useAcolyteMods,
      useHeavyCaliber: this.useHeavyCaliber,
      useHunterMunitions: this.useHunterMunitions,
      handShotChance: this.handShotChance,
      allowElementTypes: this.allowElementTypes,
      isUseMomentum: this.isUseMomentum,
      isUseVelocity: this.isUseVelocity,
      chromaBaseDamage: this.chromaBaseDamage,
    } as GunModBuildOptions;
  }

  // ### 计算属性 ###

  /** 换弹时间 */
  get reloadTIme() { return this.weapon.reload / hAccSum(this.reloadSpeedMul, (this.isUseMomentum ? 1 : 0)); }
  /** 弹夹容量 */
  get magazineSize() { return Math.round(this.weapon.magazine * this.magazineMul); }
  /** 爆头倍率 */
  get handShotMul() { return 2 * this.handShotMulMul; }
  /** 暴击率 */
  get critChance() {
    // 兰卡开镜暴击
    if ((this.weapon.rivenName || this.weapon.id) === "Lanka")
      return this.weapon.criticalChances * this.critChanceMul + 0.5;
    return this.weapon.criticalChances * this.critChanceMul;
  }
  /** 暴击倍率 */
  get critMul() {
    // 绝路开镜暴伤
    if ((this.weapon.rivenName || this.weapon.id) === "Rubico")
      return this.weapon.criticalMultiplier * this.critMulMul + 0.5;
    return this.weapon.criticalMultiplier * this.critMulMul;
  }
  /** 平均暴击区增幅倍率 */
  get critDamageMul() {
    // 私法系列的暴击强化可以直接加在这里
    return this.calcCritDamage(this.critChance + this.critLevelUpChance, this.critMul, this.handShotChance, this.handShotMul);
  }
  /** 平均爆头增伤倍率 */
  get handShotDmgMul() { return this.handShotChance * (this.handShotMul - 1) + 1; }
  /** 爆发伤害增幅倍率 */
  get burstDamageMul() { return this.totalDamageMul * this.fireRateMul; }
  /** 每个弹片触发几率 */
  get procChancePerBullet() { return 1 - (1 - this.procChance) ** (1 / this.weapon.bullets); }
  /** 面板伤害增幅倍率 */
  get panelDamageMul() { return this.baseDamageMul * this.multishotMul * this.extraDmgMul; }
  /** 总伤增幅倍率 */
  get totalDamageMul() { return this.panelDamageMul * this.critDamageMul * this.handShotDmgMul; }
  /** 平均射速增幅倍率  */
  get sustainedFireRateMul() {
    return (1 / this.weapon.fireRate + this.weapon.reload / this.weapon.magazine) * this.sustainedFireRate;
  }
  /** 射速 */
  get fireRate() {
    let fr = this.weapon.fireRate * hAccSum(this.fireRateMul, (this.isUseVelocity ? 0.8 : 0));
    // 攻速下限
    return fr < 0.05 ? 0.05 : fr;
  }
  /** 平均射速=1/(1/射速+装填/弹匣) */
  get sustainedFireRate() {
    return 1 / (1 / this.fireRate + this.reloadTIme / this.magazineSize);
  }
  /** 持续伤害增幅倍率  */
  get sustainedDamageMul() { return this.totalDamageMul * this.sustainedFireRateMul; }
  /** 面板伤害 */
  get panelDamage() { return this.originalDamage * this.panelDamageMul; }
  /** [猎人战备]切割DoT伤害 */
  get slashDotDamage() {
    return this.originalDamage * this.baseDamageMul * this.multishotMul * this.critDamageMul *
      (this.critChance > 1 ? 1 : this.critChance) * this.slashWhenCrit * 0.35 * ~~(6 * this.procDurationMul + 1);
  }
  /** 总伤害 */
  get totalDamage() { return this.originalDamage * this.totalDamageMul + this.slashDotDamage; }
  /** 爆发伤害 */
  get burstDamage() { return this.totalDamage * this.fireRate; }
  /** 持续伤害 */
  get sustainedDamage() { return this.totalDamage * this.sustainedFireRate; }
  /** 用于比较的伤害 */
  get compareDamage() {
    return this.compareMode == GunCompareMode.TotalDamage ? this.totalDamage : this.compareMode == GunCompareMode.BurstDamage ? this.burstDamage : this.sustainedDamage;
  }

  // ### 基类方法 ###

  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    if (!super.isValidMod(mod))
      return false;
    // 过滤一些需要前置MOD的MOD
    for (let i = 0; i < NormalCardDependTable.length; i++) {
      const depend = NormalCardDependTable[i];
      if (mod.name === depend[0]) {
        if (!this._mods.some(v => v.name === depend[1]))
          return false;
      }
    }
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
    this._baseDamageMul = 1 + this.chromaBaseDamage;
    this._multishotMul = 1;
    this._fireRateMul = 1;
    this._magazineMul = 1;
    this._reloadSpeedMul = 1;
    this._maxAmmoMul = 1;
    this._punchThrough = 0;
    this._zoomMul = 1;
    this._projectileSpeedMul = 1;
    this._recoilMul = 1;
    this._handShotMulMul = 1;
    this._slashWhenCrit = 0;
    this._critLevelUpChance = 0;
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
      case 'D': /* 伤害 baseDmg */ this._baseDamageMul += pValue; break;
      case 'S': /* 多重射击 multiShot */ this._multishotMul += pValue; break;
      case 'R': /* 射速（弓类武器效果加倍） fireRate */ this._fireRateMul += (this.weapon.tags.includes("弓") ? 2 * pValue : pValue); break;
      case 'L': /* 弹匣容量 magazine */ this._magazineMul += pValue; break;
      case 'F': /* 装填速度 reloadSpeed */ this._reloadSpeedMul += pValue; break;
      case 'M': /* 弹药最大值 maxAmmo' */ this._maxAmmoMul += pValue; break;
      case 'P': /* 穿透 punchThrough */ this._punchThrough += pValue; break;
      case 'H': /* 变焦 zoom */ this._zoomMul += pValue; break;
      case 'V': /* 抛射物飞行速度 projectileSpeed */ this._projectileSpeedMul += pValue; break;
      case 'Z': /* 后坐力 recoil */ this._recoilMul += pValue; break;
      case '爆头伤害': /* 爆头伤害 handShotMul */this._handShotMulMul += pValue; break;
      case '暴击时触发切割伤害': /* 暴击时触发切割伤害 slashWhenCrit */this._slashWhenCrit += pValue; break;
      case '暴击强化': /* 暴击强化 critLevelUpChance */this._critLevelUpChance += pValue; break;
      default:
        super.applyProp(mod, pName, pValue);
    }
  }
}
