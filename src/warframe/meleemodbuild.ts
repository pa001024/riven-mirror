import { compact } from "lodash-es";
import { Enemy, NormalModDatabase, NormalMod, Weapon } from "./codex";
import { ModBuild } from "./modbuild";
import { RivenMod } from "./rivenmod";

export enum MeleeCompareMode {
  TotalDamage, // 平砍DPH
  SlideDamage, // 滑砍DPH
  TotalDamagePS, // 平砍DPS
  SlideDamagePS, // 滑砍DPS
  HeavyDamage, // 重击DPH
}
export interface MeleeModBuildOptions {
  compareMode?: MeleeCompareMode;
  comboLevel?: number;
  allowElementTypes?: string[];
  isUseFury?: boolean;
  isUseStrike?: boolean;
  extraBaseDamage?: number;
  extraOverall?: number;
  target?: Enemy;
  requireRange?: boolean;
  requireCombo?: boolean;
  calcCondiOver?: boolean;
  modeIndex?: number;
}

export class MeleeModBuild extends ModBuild {
  weapon: Weapon;
  // 属性增幅器
  private _rangeAdd = 0;
  private _initialCombo = 0;
  private _comboEffMul = 100;
  private _comboDurationAdd = 0;
  private _comboDurationMul = 100;
  private _slideCritChanceMul = 0;
  private _execDmgMul = 100;
  private _comboCritChanceMul = 0;
  private _comboDamageMul = 0;
  private _comboProcChanceMul = 0;
  private _stealthDamageMul = 0;
  private _damagePerStatus = 0;
  private _extraStatusCount = 0;
  private _heavyBaseDamageMul = 0;
  private _windUpMul = 0;

  /** 范围增幅倍率 */
  get rangeAdd() {
    return this._rangeAdd;
  }
  /** 初始连击 */
  get initialCombo() {
    return this._initialCombo / 100;
  }
  /** 连击效率 */
  get comboEffMul() {
    return this._comboEffMul / 100;
  }

  /** 连击时间增值 */
  get comboDurationAdd() {
    return this._comboDurationAdd / 100;
  }
  /** 滑行暴击增值 */
  get slideCritChanceMul() {
    return this._slideCritChanceMul / 100;
  }
  /** 处决伤害增幅倍率 */
  get execDmgMul() {
    return this._execDmgMul < 0 ? 0 : this._execDmgMul / 100;
  }
  /** 连击数增加暴击率 */
  get comboCritChanceMul() {
    return this._comboCritChanceMul / 100;
  }
  /** 连击数增加最终伤害 */
  get comboDamageMul() {
    return this._comboDamageMul / 100;
  }
  /** 连击数增加触发率 */
  get comboProcChanceMul() {
    return this._comboProcChanceMul / 100;
  }
  /** 偷袭伤害 */
  get stealthDamageMul() {
    return this._stealthDamageMul < 0 ? 0 : this._stealthDamageMul / 100;
  }
  /** 每个状态额外伤害(异况量化) */
  get damagePerStatus() {
    return this._damagePerStatus / 100;
  }

  // 额外参数
  /** 异况触发量 */
  statusCount = 2;
  /** 自动加载范围卡 */
  requireRange = true;
  /** 自动加载连击卡 */
  requireCombo = true;
  /** 属性期望套用到异况加成 */
  calcCondiOver = true;

  constructor(weapon: Weapon = null, riven: RivenMod = null, options: MeleeModBuildOptions = null, fast = false) {
    super(weapon, riven, fast);
    if ((this.weapon = weapon)) {
      this._mode = this.weapon.defaultMode;
      this.avaliableMods = NormalModDatabase.filter(
        v =>
          this.weapon.tags
            .toArray()
            .concat([this.weapon.name, this.weapon.baseName])
            .includes(v.type) && !v.props.some(p => p[0].startsWith("on"))
      );
    }
    // 自动配卡优化
    this.requireCombo = !this.weapon.tags.has("Virtual");
    this.requireRange = true;
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
    this.target = typeof options.target !== "undefined" ? options.target : this.target;
    this.requireRange = typeof options.requireRange !== "undefined" ? options.requireRange : this.requireRange;
    this.requireCombo = typeof options.requireCombo !== "undefined" ? options.requireCombo : this.requireCombo;
    this.calcCondiOver = typeof options.calcCondiOver !== "undefined" ? options.calcCondiOver : this.calcCondiOver;
    this.modeIndex = typeof options.modeIndex !== "undefined" ? options.modeIndex : this.modeIndex;
  }

  get options(): MeleeModBuildOptions {
    return {
      compareMode: this.compareMode,
      comboLevel: this.comboLevel,
      allowElementTypes: this.allowElementTypes,
      extraBaseDamage: this.extraBaseDamage,
      extraOverall: this.extraOverall,
      target: this.target,
      requireRange: this.requireRange,
      requireCombo: this.requireCombo,
      calcCondiOver: this.calcCondiOver,
      modeIndex: this.modeIndex,
    };
  }

  /**
   * 生成伤害时间线
   *
   * @param {number} [timeLimit=10]
   * @returns {EnemyTimelineState[]} 敌人时间线
   * @memberof GunModBuild
   */
  getTimeline(timeLimit = 10) {
    // TODO
    return [];
  }

  // ### 计算属性 ###

  /** 范围 */
  get range() {
    return this.weapon.meleeRange + this.rangeAdd;
  }

  /** 原范围 */
  get originalRange() {
    return this.weapon.meleeRange || 0;
  }

  get slideMode() {
    return this.compareMode === MeleeCompareMode.SlideDamage || this.compareMode === MeleeCompareMode.SlideDamagePS;
  }
  /** 滑行攻击倍率 */
  get slideAttackMul() {
    return this.weapon.slideAttack;
  }
  /** 滑行攻击倍率 */
  get heavyAttackMul() {
    return this.weapon.heavyAttack;
  }

  /** 连击倍率 */
  get comboMul() {
    return (this.comboLevel * 2 || 1) - 1;
  }
  /** 连击数增加暴击率 */
  get comboCritChance() {
    return this.comboMul * this.comboCritChanceMul;
  }
  /** 连击数增加最终伤害 */
  get comboDamage() {
    return this.comboMul * this.comboDamageMul;
  }
  /** 连击数增加触发率 */
  get comboProcChance() {
    return this.comboMul * this.comboProcChanceMul;
  }
  /** [overwrite] 暴击率 */
  get critChance() {
    return this.slideMode ? this.slideCritChance : this.normalCritChance;
  }
  /** 平砍暴击率 */
  get normalCritChance() {
    return Math.max(
      0,
      this.critChanceLock != -1
        ? this.critChanceLock // Locked
        : this.mode.critChance * (this.critChanceMul + this.comboCritChance) + this.critChanceAdd
    );
  }
  /** 滑行暴击率 */
  get slideCritChance() {
    return Math.max(
      0,
      this.critChanceLock != -1
        ? this.critChanceLock // Locked
        : this.mode.critChance * (this.critChanceMul + this.slideCritChanceMul + this.comboCritChance) + this.critChanceAdd
    );
  }
  /** 重击暴击率 */
  get heavyCritChance() {
    return Math.max(
      0,
      this.critChanceLock != -1
        ? this.critChanceLock // Locked
        : this.mode.critChance * ((this.critChanceMul - 1) * 2 + 1 + this.comboCritChance) + this.critChanceAdd
    );
  }

  /** [overwrite] 基伤增幅倍率 */
  get baseDamageMul() {
    if (this.damagePerStatus > 0)
      return this._baseDamageMul / 100 + this.damagePerStatus * (this.calcCondiOver ? this.averageProcQE + this._extraStatusCount : this._extraStatusCount);
    return this._baseDamageMul / 100;
  }

  /** [overwrite] 真实触发几率 */
  get realProcChance() {
    let s = this.oriRealProcChance * (this.procChanceMul + this.comboProcChance);

    if (this.procChanceAdd) {
      const nc = 1 - (1 - s) ** this.pellets + this.procChanceAdd;
      s = 1 - (1 - nc) ** (1 / this.pellets);
    }
    return s < 0 ? 0 : s;
  }

  /** [overwrite] 平均暴击区增幅倍率 */
  get critDamageMul() {
    return this.slideMode ? this.slideCritDamageMul : this.normalCritDamageMul;
  }
  /** [overwrite] 平均暴击区增幅倍率(暴击向下取整) */
  get critDamageMulFloor() {
    return this.slideMode
      ? this.calcCritDamage(Math.floor(this.slideCritChance), this.critMul, 0, 2, this.stealthDamageMul)
      : this.calcCritDamage(Math.floor(this.normalCritChance), this.critMul, 0, 2, this.stealthDamageMul);
  }
  /** [overwrite] 平均暴击区增幅倍率(暴击向上取整) */
  get critDamageMulCeil() {
    return this.slideMode
      ? this.calcCritDamage(Math.ceil(this.slideCritChance), this.critMul, 0, 2, this.stealthDamageMul)
      : this.calcCritDamage(Math.ceil(this.normalCritChance), this.critMul, 0, 2, this.stealthDamageMul);
  }
  /** 平砍平均暴击区增幅倍率 */
  get normalCritDamageMul() {
    return this.calcCritDamage(this.normalCritChance, this.critMul, 0, 2, this.stealthDamageMul);
  }
  /** 滑行平均暴击区增幅倍率 */
  get slideCritDamageMul() {
    return this.calcCritDamage(this.slideCritChance, this.critMul, 0, 2, this.stealthDamageMul);
  }
  /** 重击平均暴击区增幅倍率 */
  get heavyCritDamageMul() {
    return this.calcCritDamage(this.heavyCritChance, this.critMul, 0, 2, this.stealthDamageMul);
  }
  /** 重击平均暴击区增幅倍率 */
  get oriHeavyCritDamageMul() {
    return this.calcCritDamage(this.heavyCritChance, this.critMul, 0, 2, this.stealthDamageMul);
  }

  /** 平砍总伤增幅倍率 */
  get normalTotalDamageMul() {
    return this.normalCritDamageMul * this.overallMul * this.enemyDmgMul * (1 + this.comboDamage);
  }
  /** 滑行总伤增幅倍率 */
  get slideTotalDamageMul() {
    return this.slideCritDamageMul * this.overallMul * this.enemyDmgMul * (1 + this.comboDamage);
  }
  /** 重击总伤增幅倍率 */
  get heavyTotalDamageMul() {
    return this.heavyCritDamageMul * this.overallMul * this.enemyDmgMul * (1 + this.comboDamage) * (1 + this.comboMul);
  }
  /** 原重击总伤增幅倍率 */
  get oriHeavyTotalDamageMul() {
    return this.oriCritDamageMul * (1 + this.comboMul);
  }

  /** 每秒总伤害 */
  get totalDamagePS() {
    return this.totalDamage * this.fireRate;
  }
  /** 原每秒总伤害 */
  get oriTotalDamagePS() {
    return (this.oriTotalDamage * this.mode.fireRate) / 60;
  }

  /** 原滑行攻击伤害 */
  get oriSlideDamage() {
    return this.oriTotalDamage * this.slideAttackMul;
  }
  /** 原每秒滑行攻击伤害 */
  get oriSlideDamagePS() {
    return (this.oriSlideDamage * this.mode.fireRate) / 60;
  }

  /** 攻击伤害 */
  get normalDamage() {
    return this.panelDamage * this.normalTotalDamageMul;
  }
  /** 每秒攻击伤害 */
  get normalDamagePS() {
    return this.normalDamage * this.fireRate;
  }
  /** 滑行攻击伤害 */
  get slideDamage() {
    return this.panelDamage * this.slideAttackMul * this.slideTotalDamageMul;
  }
  /** 每秒滑行攻击伤害 */
  get slideDamagePS() {
    return this.slideDamage * this.fireRate;
  }

  /** 重击伤害 */
  get heavyDamage() {
    return this.panelHeavyDamage * this.heavyAttackMul * this.heavyTotalDamageMul;
  }
  /** 原重击伤害 */
  get oriHeavyDamage() {
    return this.originalDamage * this.heavyAttackMul * this.oriHeavyTotalDamageMul;
  }

  /** 面板滑行伤害 */
  get panelSlideDamage() {
    return this.panelDamage * this.slideAttackMul;
  }
  /** 重击面板伤害 */
  get panelHeavyDamage() {
    if (this.damageModel) {
      return this.dmgHeavy.reduce((r, [_, v]) => r + v, 0);
    }
    return this.panelHeavyDamageRaw;
  }
  /** 重击真实伤害模型映射输出 */
  get dmgHeavy() {
    if (this.damageModel)
      return this.damageModel.mapDamage(this.dmgRawHeavy, this.critChance, this.weapon.tags.has("Sniper") ? 300 : 300 / this.fireRate) as [string, number][];
    return this.dmgRawHeavy;
  }
  /** 重击所有伤害类型面板 */
  get dmgRawHeavy() {
    return this.baseDmg.map(([i, v]) => [i, v * this.panelHeavyBaseDamage]).filter(v => v[1] > 0) as [string, number][];
  }
  /** 重击无模型面板伤害 */
  get panelHeavyDamageRaw() {
    return this.originalDamage * this.heavyBaseDamageMul;
  }
  /** 重击面板基础伤害 */
  get panelHeavyBaseDamage() {
    return this.originalDamage * this.heavyBaseDamageMul;
  }
  /** 重击面板基础伤害增幅倍率 */
  get heavyBaseDamageMul() {
    if (this.damagePerStatus > 0)
      return  (this._baseDamageMul + this._heavyBaseDamageMul) / 100 + this.damagePerStatus * (this.calcCondiOver ? this.averageProcQE + this._extraStatusCount : this._extraStatusCount);
    return (this._baseDamageMul + this._heavyBaseDamageMul) / 100;
  }

  /** [overwrite] 用于比较的伤害 */
  get compareDamage() {
    switch (this.compareMode) {
      case MeleeCompareMode.TotalDamage:
        return this.normalDamage;
      case MeleeCompareMode.SlideDamage:
        return this.slideDamage;
      case MeleeCompareMode.HeavyDamage:
        return this.heavyDamage;
      default:
      case MeleeCompareMode.TotalDamagePS:
        return this.normalDamagePS;
      case MeleeCompareMode.SlideDamagePS:
        return this.slideDamagePS;
    }
  }

  // ### 基类方法 ###

  /**
   * [overwrite] 计算暴击伤害 (近战偷袭)
   * @param m 暴击率
   * @param n 暴击倍率
   * @param p 爆头几率 [=0]
   * @param v 爆头倍率 [=2]
   * @param s 偷袭倍率 [=0]
   */
  calcCritDamage(m: number, n: number, p = 0, v = 2, s = 0) {
    return super.calcCritDamage(m, n, p, v) + s;
  }

  /** [overwrite] 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    if (!super.isValidMod(mod)) return false;
    if (
      ("Sacrificial Pressure" === mod.id && this._mods.some(v => v && v.id === "Primed Pressure Point")) ||
      ("Primed Pressure Point" === mod.id && this._mods.some(v => v && v.id === "Sacrificial Pressure"))
    )
      return false;
    if (this.weapon.tags.has("Exalted") && !this.weapon.tags.has("Virtual")) {
      return !["Weeping Wounds", "Blood Rush", "Maiming Strike", "Focused Defense"].includes(mod.id);
    }
    return true;
  }

  /** [overwrite] 重置所有属性增幅器 */
  reset() {
    super.reset();
    this._rangeAdd = 0;
    this._initialCombo = 0;
    this._comboEffMul = 100;
    this._comboDurationAdd = 0;
    this._comboDurationMul = 100;
    this._slideCritChanceMul = 0;
    this._execDmgMul = 100;
    this._comboCritChanceMul = 0;
    this._comboDamageMul = 0;
    this._comboProcChanceMul = 0;
    this._stealthDamageMul = 0;
    this._damagePerStatus = 0;
    this._extraStatusCount = 0;
    this._heavyBaseDamageMul = 0;
    this._windUpMul = 0;
  }

  /**
   * [overwrite] 应用通用属性
   * @param mod MOD
   * @param pName 属性id或名称
   * @param pValue 属性值
   */
  applyProp(mod: NormalMod, pName: string, pValue: number) {
    switch (pName) {
      case "T":
        /* 攻击范围 range */ this._rangeAdd += pValue;
        break;
      case "J":
        /* 攻击速度 attackSpeed */ this._fireRateMul += pValue;
        break;
      case "B":
        /* 初始连击 initialCombo */ this._initialCombo += pValue;
        break;
      case "U":
        /* 连击效率 comboEffMul */ this._comboEffMul += pValue;
        break;
      case "N":
        /* 连击持续时间 comboDuration */ this._comboDurationAdd += pValue;
        break;
      case "rN":
        /* 连击持续时间 comboDuration */ this._comboDurationMul += pValue;
        break;
      case "E":
        /* 滑行攻击造成暴击几率 slideCritChance */ this._slideCritChanceMul += pValue;
        break;
      case "X":
        /* 处决伤害 execDmg */ this._execDmgMul += pValue;
        break;
      case "hd":
        /* 重击伤害 */ this._heavyBaseDamageMul += pValue;
        break;
      case "bldr":
        this._comboCritChanceMul += pValue;
        break;
      case "red":
        this._comboDamageMul += pValue;
        break;
      case "sccm":
        this._comboProcChanceMul += pValue;
        break;
      case "ds":
        this._stealthDamageMul += pValue;
        break;
      case "co":
        /* 异况超量 */ this._damagePerStatus = this._damagePerStatus += pValue;
        break;
      case "esc":
        /* 异况数量 */ this._extraStatusCount = this._extraStatusCount += pValue;
        break;
      default:
        super.applyProp(mod, pName, pValue);
        break;
    }
  }

  /**
   * [overwrite] 自动按武器属性填充MOD(不移除已有,使用特定卡库,自动添加范围连击卡)
   *
   * @param [slots=8] 可用的插槽数
   * @param [useRiven=0] 是否使用紫卡 0 = 不用 1 = 自动选择 2 = 必须用
   * @param [lib=this.avaliableMods] 卡库
   * @param [rivenLimit=0] 紫卡词条数
   */
  fillEmpty(slots = 8, useRiven = 0, lib = this.avaliableMods, rivenLimit = 0) {
    const rangeMod = this.avaliableMods.find(v => v.id === "Primed Reach");
    const comboMod = this.avaliableMods.find(v => v.id === "Drifting Contact");
    let mods = (this._mods = compact(this._mods));
    if (useRiven == 2) this.applyMod(this.riven.normalMod(this.weapon)); // 1. 将紫卡直接插入
    if (this.requireRange && rangeMod && !mods.some(v => v.id === rangeMod.id) && (useRiven === 0 || !this.riven.shortSubfix.includes("T")))
      this.applyMod(rangeMod);
    if (
      this.requireCombo &&
      comboMod &&
      !mods.some(v => v.id === comboMod.id || v.id === "Body Count") &&
      (useRiven === 0 || !this.riven.shortSubfix.includes("N"))
    )
      this.applyMod(comboMod);
    super.fillEmpty(slots, 0, lib, rivenLimit);
  }
}
