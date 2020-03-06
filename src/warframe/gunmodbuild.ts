import { hAccSum, hAccMul, hAccDiv } from "@/warframe/util";
import { Enemy, NormalModDatabase, NormalMod, AcolyteModsList, Weapon } from "./codex";
import { ModBuild } from "./modbuild";
import { RivenMod } from "./rivenmod";
import { i18n } from "@/i18n";
import _ from "lodash";

/*
 * MOD自动配置模块
 * 伤害计算原理:
 * 基伤=武器自带所有伤害总和
 * 额伤=物理*物理比例+元素
 * 总伤=基伤*多重*额伤
 * 均速=1/(1/射速+装填/弹匣)
 * 均暴=1+暴击*(倍率-1)
 * 均伤=总伤*均暴*均速
 */

export enum GunCompareMode {
  TotalDamage, // 单发伤害
  BurstDamage, // 爆发伤害
  SustainedDamage, // 持续伤害
  FirstAmmoDamage, // 首发伤害
}
export interface GunModBuildOptions {
  compareMode?: GunCompareMode;
  useAcolyteMods?: boolean;
  useHeavyCaliber?: boolean;
  usePrimedChamber?: boolean;
  useDeadlyEfficiency?: boolean;
  useHunterMunitions?: number;
  headShotChance?: number;
  allowElementTypes?: string[];
  extraBaseDamage?: number;
  extraOverall?: number;
  target?: Enemy;
  amrorReduce?: number;
  burstSampleSize?: number;
  zoomLevel?: number;
  modeIndex?: number;
}
/** 枪类 */
export class GunModBuild extends ModBuild {
  weapon: Weapon;
  // 属性增幅器
  private _magazineMul = 100;
  private _reloadSpeedMul = 100;
  private _maxAmmoMul = 100;
  private _zoomMul = 100;
  private _projectileSpeedMul = 100;
  private _recoilMul = 100;
  private _punchThrough = 0;
  private _critLevelUpChance = 0;
  private _firstAmmoMul = 100;
  private _slashWhenCrit = 0;
  private _rangeLimitAdd = 0;

  /** 多重增幅倍率 */
  get multishotMul() {
    return this._multishotMul / 100;
  }
  /** 弹匣容量增幅倍率 */
  get magazineMul() {
    return this._magazineMul / 100;
  }
  /** 换弹增幅倍率 */
  get reloadSpeedMul() {
    return this._reloadSpeedMul / 100;
  }
  /** 最大弹匣增幅倍率 */
  get maxAmmoMul() {
    return this._maxAmmoMul / 100;
  }
  /** 变焦增幅倍率 */
  get zoomMul() {
    return this._zoomMul / 100;
  }
  /** 投射物速度增幅倍率 */
  get projectileSpeedMul() {
    return this._projectileSpeedMul / 100;
  }
  /** 后坐力增幅倍率 */
  get recoilMul() {
    return this._recoilMul / 100;
  }
  /** 穿透增幅量 */
  get punchThrough() {
    return this._punchThrough;
  }
  /** 暴击强化 */
  get critLevelUpChance() {
    return this._critLevelUpChance / 100;
  }
  /** 第一发子弹伤害加成 */
  get firstAmmoMul() {
    return this._firstAmmoMul / 100;
  }
  /** 猎人 战备 */
  get slashWhenCrit() {
    return this._slashWhenCrit / 100;
  }
  /** 子弹消耗速度 */
  get ammoCost() {
    return this.mode.ammoCost || (this.mode.trigger === "Held" ? 0.5 : 1);
  }
  /** 距离限制 */
  get rangeLimit() {
    let raw = this.mode.range ? this.mode.range + this._rangeLimitAdd : 0;
    if (this.mode.prjSpeed) return (this.prjSpeed / this.mode.prjSpeed) * raw;
    return raw;
  }

  // 额外参数

  /** 使用追随者MOD */
  useAcolyteMods = true;
  /** 使用重口径 */
  useHeavyCaliber = true;
  /** 使用金首发 */
  usePrimedChamber = false;
  /** 使用致命效率 */
  useDeadlyEfficiency = false;
  /** 使用猎人战备  0=不用 1=自动选择 2=必须用 */
  useHunterMunitions = 1;
  /** 开镜倍率 */
  zoomLevel = 0;

  constructor(weapon: Weapon = null, riven: RivenMod = null, options: GunModBuildOptions = null, fast = false) {
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
    const chargemodeindex = weapon.modes.findIndex(v => v.type === "charge");
    this.modeIndex = chargemodeindex > 0 ? chargemodeindex : 0;
    if (this.weapon.maxZoomLevel) {
      this.zoomLevel = this.weapon.maxZoomLevel;
      this.reset();
    }
    if (options) {
      this.options = options;
    }
  }

  set options(options: GunModBuildOptions) {
    this.compareMode = typeof options.compareMode !== "undefined" ? options.compareMode : this.compareMode;
    this.useAcolyteMods = typeof options.useAcolyteMods !== "undefined" ? options.useAcolyteMods : this.useAcolyteMods;
    this.useHeavyCaliber = typeof options.useHeavyCaliber !== "undefined" ? options.useHeavyCaliber : this.useHeavyCaliber;
    this.usePrimedChamber = typeof options.usePrimedChamber !== "undefined" ? options.usePrimedChamber : this.usePrimedChamber;
    this.useDeadlyEfficiency = typeof options.useDeadlyEfficiency !== "undefined" ? options.useDeadlyEfficiency : this.useDeadlyEfficiency;
    this.useHunterMunitions = typeof options.useHunterMunitions !== "undefined" ? options.useHunterMunitions : this.useHunterMunitions;
    this.headShotChance = typeof options.headShotChance !== "undefined" ? options.headShotChance : this.headShotChance;
    this.allowElementTypes = typeof options.allowElementTypes !== "undefined" ? options.allowElementTypes : this.allowElementTypes;
    this.extraBaseDamage = typeof options.extraBaseDamage !== "undefined" ? options.extraBaseDamage : this.extraBaseDamage;
    this.extraOverall = typeof options.extraOverall !== "undefined" ? options.extraOverall : this.extraOverall;
    this.target = typeof options.target !== "undefined" ? options.target : this.target;
    this.amrorReduce = typeof options.amrorReduce !== "undefined" ? options.amrorReduce : this.amrorReduce;
    this.burstSampleSize = typeof options.burstSampleSize !== "undefined" ? options.burstSampleSize : this.burstSampleSize;
    this.zoomLevel = typeof options.zoomLevel !== "undefined" ? options.zoomLevel : this.zoomLevel;
    this.modeIndex = typeof options.modeIndex !== "undefined" ? options.modeIndex : this.modeIndex;
  }
  get options(): GunModBuildOptions {
    return {
      compareMode: this.compareMode,
      useAcolyteMods: this.useAcolyteMods,
      useHeavyCaliber: this.useHeavyCaliber,
      usePrimedChamber: this.usePrimedChamber,
      useHunterMunitions: this.useHunterMunitions,
      useDeadlyEfficiency: this.useDeadlyEfficiency,
      headShotChance: this.headShotChance,
      allowElementTypes: this.allowElementTypes,
      extraBaseDamage: this.extraBaseDamage,
      extraOverall: this.extraOverall,
      target: this.target,
      amrorReduce: this.amrorReduce,
      burstSampleSize: this.burstSampleSize,
      zoomLevel: this.zoomLevel,
      modeIndex: this.modeIndex,
    };
  }
  /** 生成伤害时间线 */
  getTimeline(timeLimit = 300) {
    let enemy = new Enemy(this.target.data, this.target.level);
    enemy.amrorReduce = this.amrorReduce;
    enemy.reset();
    let ticks = Math.ceil(enemy.TICKCYCLE / this.fireRate); // 60tick/s 整合射速和秒DoT
    let reloadTicks = Math.ceil(enemy.TICKCYCLE * this.reloadTime); // 装填需要的tick数
    let remaingMag = this.magazineSize; // 剩余子弹数
    let shotAmmoCost = this.ammoCost; // 射击消耗子弹数
    let nextDoTTick = enemy.TICKCYCLE;
    const isCharge = this.mode.type === "charge";
    let nextDmgTick = isCharge ? ticks : 0;
    // 敌人死亡或者到时间停止
    for (let seconds = 0; enemy.currentHealth > 0 && seconds < timeLimit; ++seconds) {
      // 伤害
      while (nextDmgTick <= nextDoTTick && enemy.currentHealth > 0) {
        enemy.tickCount = nextDmgTick;
        enemy.applyHit(
          remaingMag === this.magazineSize ? this.totalDmgFirstRaw : this.totalDmgRaw,
          this.procChanceMap,
          this.dotDamageMap,
          this.pellets,
          this.procDurationMul,
          this.critChance,
          this.weapon.tags.has("Sniper") ? 750 : 750 / (this.fireRate < 1 ? 1 : this.fireRate),
          this.procDamageMul,
          shotAmmoCost
        );
        nextDmgTick +=
          (remaingMag = remaingMag - shotAmmoCost) > 0 ? ticks : ((remaingMag = this.magazineSize), isCharge ? reloadTicks + ticks : reloadTicks || ticks);
      }
      // DoT
      if (enemy.currentHealth > 0) {
        enemy.tickCount = nextDoTTick;
        nextDoTTick += enemy.TICKCYCLE;
        enemy.nextSecond(this.procDamageMul);
      }
    }
    return enemy.stateHistory;
  }

  // ### 计算属性 ###
  /** 精准度 */
  get accuracy() {
    return this.mode.accuracy;
  }
  /** 是否是射线武器 */
  get isLaser() {
    return this.weapon.tags.has("Continuous");
  }
  /** [overwrite] 弹片数 */
  get pellets() {
    return this.isLaser ? this.mode.pellets : hAccMul(this.mode.pellets, this.multishotMul);
  }
  /** 换弹时间 */
  get reloadTime() {
    // 一发发装的武器随弹匣变化
    const perReloadWeapons = ["Zarr", "Corinth", "Strun"];
    if (perReloadWeapons.includes(this.baseId)) {
      return hAccMul(this.magazineSize / this.weapon.magazine, hAccDiv(this.weapon.reload, this.reloadSpeedMul));
    }
    return hAccDiv(this.weapon.reload, this.reloadSpeedMul);
  }
  /** 弹夹容量 */
  get magazineSize() {
    let s = Math.round(this.weapon.magazine * this.magazineMul);
    return s <= 1 ? 1 : s;
  }
  /** 最大弹药 */
  get maxAmmo() {
    return Math.round(this.weapon.maxAmmo * this.maxAmmoMul);
  }
  /** 飞行速度 */
  get prjSpeed() {
    return this.mode.prjSpeed * this.projectileSpeedMul;
  }
  /** [overwrite] 空占比 */
  get dutyCycle() {
    return this.reloadTime / (this.magazineSize / this.fireRate + this.reloadTime);
  }

  /** [overwrite] 每发触发率 */
  get procChancePerHit() {
    const p = this.procChance;
    return this.isLaser ? p : ~~p * this.multishotMul + 1 - (1 - (p % 1)) ** this.multishotMul;
  }

  /** [overwrite] 面板基础伤害增幅倍率 */
  get panelBaseDamageMul() {
    return hAccMul(this.baseDamageMul, this.multishotMul);
  }
  /** [overwrite] 平均暴击区增幅倍率 */
  get critDamageMul() {
    // 私法系列的暴击强化可以直接加在这里 因为白字无加成 去掉不暴击的概率
    let upLvlChance = this.critChance >= 1 ? this.critLevelUpChance : this.critChance * this.critLevelUpChance;
    return this.calcCritDamage(this.critChance + upLvlChance, this.critMul, this.headShotChance, this.headShotMul);
  }
  /** 平均射速增幅倍率  */
  get sustainedFireRateMul() {
    return (60 / this.mode.fireRate + this.weapon.reload / this.weapon.magazine) * this.sustainedFireRate;
  }
  /** 原平均射速 = 弹匣 ÷ ((弹匣 − 1) ÷ 射速 + 装填) */
  get oriSustainedFireRate() {
    const { reload: r, magazine } = this.weapon;
    const f = this.mode.fireRate / 60;
    const m = ~~(magazine / this.ammoCost);
    if (this.mode.type === "charge") return 1 / (1 / f + r / m);
    return (m * f) / (m - 1 + Math.max(1, r * f));
  }

  /** 有效弹匣容量 */
  get effectiveMagazineSize() {
    return ~~(this.magazineSize / this.ammoCost);
  }
  /** 平均射速
   * <version1> = 1/(1/射速+装填/弹匣)
   * <version2> = mf/(m-1+max(1,rf))
   */
  get sustainedFireRate() {
    const { fireRate: f, reloadTime: r, effectiveMagazineSize: m } = this;
    if (this.mode.type === "charge") return 1 / (1 / f + r / m);
    return (m * f) / (m - 1 + Math.max(1, r * f));
  }
  /** 持续伤害增幅倍率  */
  get sustainedDamageMul() {
    return hAccMul(this.totalDamageMul, this.sustainedFireRateMul);
  }
  /** 原爆发伤害 */
  get oriBurstDamage() {
    return hAccMul(this.oriTotalDamage, this.oriBurstSampleFireRate);
  }

  // 首发相关
  /** 第一发子弹伤害 */
  get firstAmmoDamage() {
    return hAccMul(this.totalDamage, this.firstAmmoMul);
  }
  /** 无模型第一发子弹伤害 */
  get firstAmmoDamageRaw() {
    return hAccMul(this.totalDamageRaw, this.firstAmmoMul);
  }
  /** 持续输出首发增幅 = 1 + 首发 / 弹匣 */
  get sustainedfirstAmmoMul() {
    return 1 + (this.firstAmmoMul - 1) / this.magazineSize;
  }
  /** 所有伤害(首发) */
  get totalDmgFirst() {
    return this.baseDmg.map(([i, v]) => [i, (v * this.firstAmmoDamage) / this.extraDmgMul]).filter(v => v[1] > 0) as [string, number][];
  }
  /** 无模型所有伤害(首发) */
  get totalDmgFirstRaw() {
    return this.baseDmg.map(([i, v]) => [i, (v * this.firstAmmoDamageRaw) / this.extraDmgMul]).filter(v => v[1] > 0) as [string, number][];
  }
  /** 计算首发的总伤害 */
  get totalDamageAvg() {
    return hAccMul(this.totalDamage, this.sustainedfirstAmmoMul);
  }

  /** 爆发伤害 */
  get burstDamage() {
    return hAccMul(this.totalDamage, this.burstSampleFireRate);
  }

  /** 爆发取样等效射速 */
  get burstSampleFireRate() {
    const { fireRate: f, reloadTime: r, effectiveMagazineSize: m, burstSampleSize: b } = this;
    if (!b) return f;
    const isCharge = this.mode.type === "charge";
    let ar = isCharge ? m / f : (m - 1) / f, // 射完子弹需要的时间
      rt = isCharge ? m / f + r : (m - 1) / f + r; // 整个周期需要的时间
    // 时间不足射完弹匣
    if (b < ar) {
      return f;
    } //时间刚好射完弹匣
    else if (b < rt) {
      return m / b;
    } // 射完换了弹还在射
    else {
      const rs = ~~(b / rt); // 总共射了几轮
      const rr = b - rs * rt; // 还剩多少时间
      return (m * rs + (isCharge ? Math.floor : Math.ceil)(rr * f)) / b;
    }
  }

  /** 原爆发取样等效射速 */
  get oriBurstSampleFireRate() {
    const { reload: r, magazine } = this.weapon;
    const f = this.mode.fireRate / 60;
    const b = this.burstSampleSize;
    if (!b) return f;
    const m = ~~(magazine / this.ammoCost);
    const isCharge = this.mode.type === "charge";
    let ar = isCharge ? m / f : (m - 1) / f, // 射完子弹需要的时间
      rt = isCharge ? m / f + r : (m - 1) / f + r; // 整个周期需要的时间
    // 时间不足射完弹匣
    if (b < ar) {
      return f;
    } //时间刚好射完弹匣
    else if (b < rt) {
      return m / b;
    } // 射完换了弹还在射
    else {
      const rs = ~~(b / rt); // 总共射了几轮
      const rr = b - rs * rt; // 还剩多少时间
      return (m * rs + (isCharge ? Math.floor : Math.ceil)(rr * f)) / b;
    }
  }

  /** 原持续伤害 */
  get oriSustainedDamage() {
    return hAccMul(this.oriTotalDamage, this.oriSustainedFireRate);
  }
  /** 持续伤害 */
  get sustainedDamage() {
    return hAccMul(this.totalDamageAvg, this.sustainedFireRate);
  }
  /** [overwrite] 用于比较的伤害 */
  get compareDamage() {
    return this.compareMode == GunCompareMode.TotalDamage
      ? this.totalDamageAvg
      : this.compareMode == GunCompareMode.FirstAmmoDamage
      ? this.firstAmmoDamage
      : this.compareMode == GunCompareMode.BurstDamage
      ? this.burstDamage
      : this.sustainedDamage;
  }

  /** [overwrite] 额外触发几率 */
  get extraProcChance() {
    let epc = this._extraProcChance;
    if (this.slashWhenCrit) epc = epc.concat([["Slash", (this.critChance > 1 ? 1 : this.critChance) * this._slashWhenCrit]]);
    return epc.map(v => [v[0], v[1] / 100] as [string, number]);
  }

  // ### 基类方法 ###

  /** [overwrite] 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    if (!super.isValidMod(mod)) return false;
    if (!this.useAcolyteMods && AcolyteModsList.some(v => v === mod.id)) return false;
    if (!this.useHunterMunitions && "Hunter Munitions" === mod.id) return false;
    if (i18n.locale !== "zh-CY" && "Primed Charged Chamber" === mod.id) return false;
    // 集团海克屏蔽散射正义
    if (this.weapon.name === "Vaykor Hek" && mod.id === "Scattered Justice") return false;
    return true;
  }

  /** [overwrite] 检测当前MOD是否不自动使用 */
  isNoNeedMod(mod: NormalMod) {
    if (!this.useHeavyCaliber && "Heavy Caliber" === mod.id) return true;
    if (!this.usePrimedChamber && ("Primed Chamber" === mod.id || "Primed Charged Chamber" === mod.id)) return true;
    if (!this.useDeadlyEfficiency && "Deadly Efficiency" === mod.id) return true;
    return false;
  }

  /** 重置所有属性增幅器 */
  reset() {
    super.reset();
    this._fireRateMul = 100;
    this._magazineMul = 100;
    this._reloadSpeedMul = 100;
    this._maxAmmoMul = 100;
    this._punchThrough = 0;
    this._zoomMul = 100;
    this._projectileSpeedMul = 100;
    this._recoilMul = 100;
    this._critLevelUpChance = 0;
    this._firstAmmoMul = 100;
    this._slashWhenCrit = 0;

    // 开镜加成

    if (this.zoomLevel) {
      const zoom = this.weapon.zoom[this.zoomLevel - 1];
      _.map(zoom.props, (v, n) => this.applyProp(null, n, v));
    }
  }
  /**
   * 自动按武器属性填充MOD
   * @param slots 可用的插槽数
   * @param useRiven 是否使用紫卡 0=不用 1=自动选择 2=必须用
   */
  fill(slots = 8, useRiven = 0) {
    if (this.useHunterMunitions === 2) this.applyMod(NormalModDatabase.find(v => v.id === "Hunter Munitions"));
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
      case "S":
        /* 多重射击 multiShot */ this._multishotMul = hAccSum(this._multishotMul, pValue);
        break;
      case "R":
        /* 射速 fireRate */ this._fireRateMul = hAccSum(this._fireRateMul, this.weapon.tags.has("Bow") ? 2 * pValue : pValue);
        break;
      case "L":
        /* 弹匣容量 magazine */ this._magazineMul = hAccSum(this._magazineMul, pValue);
        break;
      case "bL":
        /* 基础弹匣容量 magazine */ this._magazineMul = hAccSum(this._magazineMul, (pValue / this.weapon.magazine) * 100);
        break;
      case "F":
        /* 装填速度 reloadSpeed */ this._reloadSpeedMul = hAccSum(this._reloadSpeedMul, pValue);
        break;
      case "M":
        /* 弹药最大值 maxAmmo' */ this._maxAmmoMul = hAccSum(this._maxAmmoMul, pValue);
        break;
      case "P":
        /* 穿透 punchThrough */ this._punchThrough = hAccSum(this._punchThrough, pValue);
        break;
      case "H":
        /* 变焦 zoom */ this._zoomMul = hAccSum(this._zoomMul, pValue);
        break;
      case "V":
        /* 投射物速度 projectileSpeed */ this._projectileSpeedMul = hAccSum(this._projectileSpeedMul, pValue);
        break;
      case "Z":
        /* 后坐力 recoil */ this._recoilMul = hAccSum(this._recoilMul, pValue);
        break;
      case "ac":
        /* 暴击时触发切割伤害 slashWhenCrit */ this._slashWhenCrit = hAccSum(this._slashWhenCrit, pValue);
        break;
      case "ce":
        /* 暴击强化 critLevelUpChance */ this._critLevelUpChance = hAccSum(this._critLevelUpChance, pValue);
        break;
      case "fsb":
        /* 第一发子弹伤害加成 firstAmmoMul */ this._firstAmmoMul = hAccSum(this._firstAmmoMul, pValue);
        break;
      case "eed":
        /* 电击伤害 */ this.mode.prjSpeed
          ? (this.electricityMul = hAccSum(this._electricityMul, pValue))
          : this.applyStandaloneElement("Electricity", pValue / 100);
        break;
      case "efd":
        /* 火焰伤害 */ this.mode.prjSpeed ? (this.heatMul = hAccSum(this._heatMul, pValue)) : this.applyStandaloneElement("Heat", pValue / 100);
        break;
      case "etd":
        /* 毒素伤害 */ this.mode.prjSpeed ? (this.toxinMul = hAccSum(this._toxinMul, pValue)) : this.applyStandaloneElement("Toxin", pValue / 100);
        break;
      case "ar":
        /* + Range (nopercent) */ this._rangeLimitAdd = hAccSum(this._rangeLimitAdd, pValue);
        break;
      case "vte":
        /* 虚空转换电击 voidConvs */ this._voidConvs.push(["Electricity", pValue]);
        break;
      case "vtv":
        /* 虚空转换病毒 voidConvs */ this._voidConvs.push(["Viral", pValue]);
        break;
      case "vtp":
        /* 虚空转换穿刺 voidConvs */ this._voidConvs.push(["Puncture", pValue]);
        break;
      case "vth":
        /* 虚空转换火焰 voidConvs */ this._voidConvs.push(["Heat", pValue]);
        break;
      default:
        super.applyProp(mod, pName, pValue);
    }
  }
}
