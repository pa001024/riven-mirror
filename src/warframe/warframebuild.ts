import _ from "lodash";
import { WarframeDataBase, Warframe, Codex, AbilityData, AbilityEnhance, AbilityProp, AbilityFormData, AbilityType, AdvancedAbilityPropValue, WarframeProperty, AbilityPropTypes } from "./codex";
import { i18n } from "@/i18n";
import { NormalMod, NormalModDatabase } from "./codex/mod";
import { hAccSum } from "./util";
import { Arcane } from "./codex/arcane";
import { Buff, BuffList } from "./codex/buff";
import { base62, debase62 } from "./lib/base62";
import { _abilityData } from "./codex/warframe.data";
import { HH } from "@/var";

export enum WarframeCompareMode {
  EffectiveHealth, // 有效血量
  Health, // 血量
  Armor, // 护甲
  Shield, // 护盾
  Strength, // 强度
  Duration, // 持续
  Range // 范围
}
export interface WarframeBuildOptions {
  compareMode?: WarframeCompareMode;
  usrEnergyConversion?: boolean;
  arcanes?: Arcane[];
}

export class WarframeBuild {
  data: Warframe;
  protected _rawmods: NormalMod[] = [];
  protected _mods: NormalMod[] = [];
  protected _arcanes: Arcane[] = [];
  protected _buffs: Buff[] = [];
  protected _aura: NormalMod = null;
  protected _exilus: NormalMod = null;

  /** 所有适用的MOD */
  protected avaliableMods: NormalMod[] = [];

  /** 光环 */
  get aura() {
    return this._aura;
  }
  set aura(value) {
    this._aura = value;
    this.calcMods();
    this.recalcPolarizations();
  }
  /** 特殊功能 */
  get exilus() {
    return this._exilus;
  }
  set exilus(value) {
    this._exilus = value;
    this.calcMods();
    this.recalcPolarizations();
  }

  /** 原型MOD列表 */
  get rawMods() {
    return this._rawmods;
  }
  /** MOD列表 */
  get mods() {
    return _.cloneDeep(this._mods);
  }
  set mods(value) {
    this._rawmods = _.cloneDeep(value);
    this._mods = this.mapRankUpMods(value);
    this.calcMods();
    this.recalcPolarizations();
  }
  /** 特殊功能MOD与MOD */
  get costMods() {
    return [this.exilus, ...this._mods];
  }
  /** 所有MOD */
  get allMods() {
    return [this._aura, this._exilus, ...this._mods];
  }
  /** 赋能列表 */
  get arcanes() {
    return _.cloneDeep(this._arcanes);
  }
  set arcanes(value) {
    this._arcanes = _.cloneDeep(value);
    this.calcMods();
  }
  /** 加成列表 */
  get buffs() {
    return _.cloneDeep(this._buffs);
  }
  set buffs(value) {
    this._buffs = _.cloneDeep(value);
    this.calcMods();
  }

  /** ID */
  get id() {
    return this.data.name;
  }
  /** 本地化名称 */
  get name() {
    return i18n.t(`messages.${this.data.name}`);
  }
  /** 基础ID */
  get baseId() {
    return this.data.className || this.data.id;
  }
  /** 属性标记 */
  get tags() {
    return this.data.tags.concat(["Warframe", this.baseId]);
  }

  protected _healthMul: number;
  protected _shieldMul: number;
  protected _armorMul: number;
  protected _armorAdd: number;
  protected _energyMul: number;
  protected _sprintMul: number;
  protected _abilityStrengthMul: number;
  protected _abilityDurationMul: number;
  protected _abilityEfficiencyMul: number;
  protected _abilityRangeMul: number;
  protected _abilityStrengthAdd: number;
  protected _abilityDurationAdd: number;
  protected _abilityEfficiencyAdd: number;
  protected _abilityRangeAdd: number;
  protected _shieldRecharge: number;
  protected _castSpeedMul: number;
  protected _knockdownResistanceMul: number;
  protected _knockdownRecoveryMul: number;
  protected _slideMul: number;
  protected _frictionMul: number;
  protected _parkourVelocityMul: number;
  protected _holsterRateMul: number;
  protected _quickThinkingAdd: number;
  protected _rageAdd: number;
  protected _healthConversionAdd: number;
  protected _energyConversionAdd: number;
  protected _tauResistAdd: number;
  protected _auraStrengthAdd: number;
  protected _auraEffectivenessAdd: number;
  protected _aimGlideWallLatchTimeAdd: number;
  protected _enemyRadarAdd: number;
  protected _lootRadarAdd: number;
  protected _damageResistance: number;

  // ### 参数 ###

  /** 是否计算能量转换 */
  usrEnergyConversion = true;
  compareMode = WarframeCompareMode.EffectiveHealth;

  // ### 基础属性 ###

  /** 生命 */
  get health() {
    return (this.data.health * this._healthMul) / 100;
  }
  /** 护盾 */
  get shield() {
    return (this.data.shield * this._shieldMul) / 100;
  }
  /** 护甲 */
  get armor() {
    return (this.data.armor * this._armorMul) / 100 + this._armorAdd;
  }
  /** 能量 */
  get energy() {
    return (this.data.energy * this._energyMul) / 100;
  }
  /** 冲刺速度 */
  get sprint() {
    return (this.data.sprint * this._sprintMul) / 100;
  }
  /** 护盾回充 */
  get shieldRecharge() {
    return this._shieldRecharge / 100;
  }
  /** 技能强度 */
  get abilityStrength() {
    return (this.usrEnergyConversion ? this.energyConversion : 0) + ((1 + this._abilityStrengthAdd / 100) * this._abilityStrengthMul) / 100;
  }
  /** 技能持续 */
  get abilityDuration() {
    return ((1 + this._abilityDurationAdd / 100) * this._abilityDurationMul) / 100;
  }
  /** 技能效率(无限制) */
  get abilityEfficiencyUnlimited() {
    return ((1 + this._abilityEfficiencyAdd / 100) * this._abilityEfficiencyMul) / 100;
  }
  /** 技能效率(持续) */
  get abilityEfficiencyContinuous() {
    const unlimited = 2 - (2 - this.abilityEfficiencyUnlimited) / this.abilityDuration;
    return unlimited > 1.75 ? 1.75 : unlimited;
  }
  /** 技能效率 */
  get abilityEfficiency() {
    return this.abilityEfficiencyUnlimited > 1.75 ? 1.75 : this.abilityEfficiencyUnlimited;
  }
  /** 技能范围 */
  get abilityRange() {
    return ((1 + this._abilityRangeAdd / 100) * this._abilityRangeMul) / 100;
  }
  /** 施放速度 */
  get castSpeed() {
    return this._castSpeedMul / 100;
  }
  /** 倒地抵抗 */
  get knockdownResistance() {
    return this._knockdownResistanceMul / 100;
  }
  /** 倒地恢复 */
  get knockdownRecovery() {
    return this._knockdownRecoveryMul / 100;
  }
  /** 滑行 */
  get slide() {
    return this._slideMul / 100;
  }
  /** 摩擦力 */
  get friction() {
    return this._frictionMul / 100;
  }
  /** 跑酷速度 */
  get parkourVelocity() {
    return this._parkourVelocityMul / 100;
  }
  /** 随机应变 */
  get quickThinking() {
    return this._quickThinkingAdd / 100;
  }
  /** 狂暴化 */
  get rage() {
    return this._rageAdd / 100;
  }
  /** 生命转换 */
  get healthConversion() {
    return this._healthConversionAdd / 100;
  }
  /** 能量转换 */
  get energyConversion() {
    return this._energyConversionAdd / 100;
  }
  /** S系抗性 */
  get tauResist() {
    return this._tauResistAdd / 100;
  }
  /** 光环强度 */
  get auraStrength() {
    return this._auraStrengthAdd / 100;
  }
  /** 光环效果 */
  get auraEffectiveness() {
    return this._auraEffectivenessAdd / 100;
  }
  /** 飞身瞄准和持续时间 */
  get aimGlideWallLatchTime() {
    return this._aimGlideWallLatchTimeAdd / 100;
  }
  /** 敌人雷达 */
  get enemyRadar() {
    return this._enemyRadarAdd / 100;
  }
  /** 物品雷达 */
  get lootRadar() {
    return this._lootRadarAdd / 100;
  }
  /** 切换速度 */
  get holsterRate() {
    return this._holsterRateMul / 100;
  }
  /** 伤害减免 */
  get damageResistance() {
    return this._damageResistance / 100;
  }
  /** 有效生命 */
  get effectiveHealth() {
    return (this.shield + (this.health + this.energy * this.quickThinking) * (1 + this.armor / 300)) / (1 - this.damageResistance);
  }
  /** 对比参数 */
  get compareValue() {
    switch (this.compareMode) {
      default:
      case WarframeCompareMode.EffectiveHealth:
        return this.effectiveHealth;
      case WarframeCompareMode.Health:
        return this.health;
      case WarframeCompareMode.Armor:
        return this.armor;
      case WarframeCompareMode.Shield:
        return this.shield;
      case WarframeCompareMode.Strength:
        return this.abilityStrength;
      case WarframeCompareMode.Duration:
        return this.abilityDuration;
      case WarframeCompareMode.Range:
        return this.abilityRange;
    }
  }

  constructor(data: Warframe | string, options: WarframeBuildOptions = null) {
    if (typeof data === "string") data = WarframeDataBase.getWarframeById(data);
    if (!data) return;
    if ((this.data = data)) {
      this.avaliableMods = NormalModDatabase.filter(v => this.data.tags.concat(["Warframe", "Exilus", this.baseId, this.baseId + ",Exilus"]).includes(v.type));
    }
    if (options) {
      this.options = options;
    }
    this.reset();
  }

  set options(options: WarframeBuildOptions) {
    this.compareMode = typeof options.compareMode !== "undefined" ? options.compareMode : this.compareMode;
    this.usrEnergyConversion = typeof options.usrEnergyConversion !== "undefined" ? options.usrEnergyConversion : this.usrEnergyConversion;
    this.arcanes = typeof options.arcanes !== "undefined" ? options.arcanes : this.arcanes;
  }
  get options(): WarframeBuildOptions {
    return {
      compareMode: this.compareMode,
      usrEnergyConversion: this.usrEnergyConversion,
      arcanes: this.arcanes
    };
  }

  /** 重置属性 */
  reset() {
    this._healthMul = 100;
    this._shieldMul = 100;
    this._armorMul = 100;
    this._armorAdd = 0;
    this._energyMul = 100;
    this._sprintMul = 100;
    this._abilityStrengthMul = 100;
    this._abilityDurationMul = 100;
    this._abilityEfficiencyMul = 100;
    this._abilityRangeMul = 100;
    this._shieldRecharge = 100;
    this._castSpeedMul = 100;
    this._knockdownResistanceMul = 100;
    this._knockdownRecoveryMul = 100;
    this._slideMul = 100;
    this._frictionMul = 100;
    this._parkourVelocityMul = 100;
    this._holsterRateMul = 100;
    this._quickThinkingAdd = 0;
    this._rageAdd = 0;
    this._healthConversionAdd = 0;
    this._energyConversionAdd = 0;
    this._tauResistAdd = 0;
    this._auraStrengthAdd = 0;
    this._auraEffectivenessAdd = 0;
    this._aimGlideWallLatchTimeAdd = 0;
    this._enemyRadarAdd = 0;
    this._lootRadarAdd = 0;
    this._abilityStrengthAdd = 0;
    this._abilityDurationAdd = 0;
    this._abilityEfficiencyAdd = 0;
    this._abilityRangeAdd = 0;
    this._damageResistance = 0;
    this.data.lvlUps.map(v => this.applyProp(null, v[0], v[1]));
    this.recalcPolarizations();
  }

  /**
   * 应用通用属性
   *
   * @param {(NormalMod | Arcane)} mod MOD
   * @param {string} pName 属性id或名称
   * @param {number} pValue 属性值
   * @memberof WarframeBuild
   */
  applyProp(mod: NormalMod | Arcane, pName: string, pValue: number = 0) {
    switch (pName) {
      /** Health */ case "h":
        this._healthMul = hAccSum(this._healthMul, pValue);
        break;
      /** Shield */ case "s":
        this._shieldMul = hAccSum(this._shieldMul, pValue);
        break;
      /** Amror */ case "a":
        this._armorMul = hAccSum(this._armorMul, pValue);
        break;
      /** AmrorAdd */ case "ea":
        this._armorAdd = hAccSum(this._armorAdd, pValue);
        break;
      /** Energy */ case "e":
        this._energyMul = hAccSum(this._energyMul, pValue);
        break;
      /** Sprint */ case "f":
        this._sprintMul = hAccSum(this._sprintMul, pValue);
        break;
      /** ShieldRecharge */ case "r":
        this._shieldRecharge = hAccSum(this._shieldRecharge, pValue);
        break;
      /** AbilityStrength */ case "t":
        this._abilityStrengthAdd = hAccSum(this._abilityStrengthAdd, pValue);
        break;
      /** AbilityStrength */ case "ovs":
        this._abilityStrengthMul = (this._abilityStrengthMul * (100 + pValue)) / 100;
        break;
      /** AbilityDuration */ case "u":
        this._abilityDurationAdd = hAccSum(this._abilityDurationAdd, pValue);
        break;
      /** AbilityEfficiency */ case "x":
        this._abilityEfficiencyAdd = hAccSum(this._abilityEfficiencyAdd, pValue);
        break;
      /** AbilityRange */ case "g":
        this._abilityRangeAdd = hAccSum(this._abilityRangeAdd, pValue);
        break;
      /** AbilityRange */ case "ovr":
        this._abilityRangeMul = (this._abilityRangeMul * (100 + pValue)) / 100;
        break;
      /** CastSpeed */ case "c":
        this._castSpeedMul = hAccSum(this._castSpeedMul, pValue);
        break;
      /** KnockdownResistance */ case "k":
        this._knockdownResistanceMul = hAccSum(this._knockdownResistanceMul, pValue);
        break;
      /** KnockdownRecovery */ case "y":
        this._knockdownRecoveryMul = hAccSum(this._knockdownRecoveryMul, pValue);
        break;
      /** Slide */ case "l":
        this._slideMul = hAccSum(this._slideMul, pValue);
        break;
      /** Friction */ case "i":
        this._frictionMul = hAccSum(this._frictionMul, pValue);
        break;
      /** ParkourVelocity */ case "v":
        this._parkourVelocityMul = hAccSum(this._parkourVelocityMul, pValue);
        break;
      /** QuickThinking */ case "z":
        this._quickThinkingAdd = hAccSum(this._quickThinkingAdd, pValue);
        break;
      /** Rage */ case "rg":
        this._rageAdd = hAccSum(this._rageAdd, pValue);
        break;
      /** HealthConversion */ case "hc":
        this._healthConversionAdd = hAccSum(this._healthConversionAdd, pValue);
        break;
      /** EnergyConversion */ case "ec":
        this._energyConversionAdd = hAccSum(this._energyConversionAdd, pValue);
        break;
      /** TauResist */ case "tr":
        this._tauResistAdd = hAccSum(this._tauResistAdd, pValue);
        break;
      /** AuraStrength */ case "as":
        this._auraStrengthAdd = hAccSum(this._auraStrengthAdd, pValue);
        break;
      /** AuraEffectiveness */ case "ae":
        this._auraEffectivenessAdd = hAccSum(this._auraEffectivenessAdd, pValue);
        break;
      /** AimGlideWallLatchTime */ case "at":
        this._aimGlideWallLatchTimeAdd = hAccSum(this._aimGlideWallLatchTimeAdd, pValue);
        break;
      /** EnemyRadar */ case "er":
        this._enemyRadarAdd = hAccSum(this._enemyRadarAdd, pValue);
        break;
      /** LootRadar */ case "lr":
        this._lootRadarAdd = hAccSum(this._lootRadarAdd, pValue);
        break;
      /** HolsterRate */ case "hr":
        this._holsterRateMul = hAccSum(this._holsterRateMul, pValue);
        break;
      /** Damage Resistance */ case "res":
        this._damageResistance = 100 - ((100 - this._damageResistance) * (100 - pValue)) / 100;
        break;
    }
  }

  /**
   * 应用MOD
   *
   * @param {NormalMod} mod MOD
   * @returns
   * @memberof WarframeBuild
   */
  applyMod(mod: NormalMod) {
    this._mods.push(mod);
    this.calcMods();
    return this;
  }

  /**
   * 应用赋能
   *
   * @param {Arcane} arc 赋能
   * @returns
   * @memberof WarframeBuild
   */
  applyArcane(arc: Arcane) {
    this._arcanes.push(arc);
    this.calcMods();
    return this;
  }

  /**
   * 应用加成
   *
   * @param {Buff} buff
   * @returns
   * @memberof WarframeBuild
   */
  applyBuff(buff: Buff) {
    this._buffs.push(buff);
    this.calcMods();
    return this;
  }

  /**
   * 将Mod属性写入到增幅上
   *
   * @memberof WarframeBuild
   */
  calcMods() {
    this.reset();
    [this._aura, this._exilus, ...this._mods].forEach(mod => {
      mod && _.forEachRight(mod.props, prop => this.applyProp(mod, prop[0], prop[1]));
    });
    // 加载Buff
    this._buffs.forEach(buff => {
      buff && buff.props.forEach(prop => this.applyProp(null, prop[0], prop[1]));
    });
  }

  /**
   * 清除所有MOD并重置属性增幅器
   *
   * @memberof WarframeBuild
   */
  clear() {
    this._mods = [];
    this._aura = null;
    this._exilus = null;
    this.reset();
  }

  /**
   * 检测当前MOD是否可用
   *
   * @param {NormalMod} mod MOD
   * @returns {boolean}
   * @memberof WarframeBuild
   */
  isValidMod(mod: NormalMod): boolean {
    let mods = _.compact(this._mods);
    // 如果相应的P卡已经存在则不使用
    if (mods.some(v => v.id === mod.primed || v.primed === mod.id || (mod.primed && v.primed === mod.primed))) return false;
    return true;
  }

  /**
   * [纯函数] 映射组合MOD加成
   *
   * @param {NormalMod[]} mods
   * @returns {NormalMod[]}
   * @memberof WarframeBuild
   */
  mapRankUpMods(mods: NormalMod[]): NormalMod[] {
    let umbraSet = { Ha: [1, 1.25, 1.75], Hb: [1, 1.25, 1.75], Hc: [1, 1.25, 1.5] };
    let umbraSetCount = mods.filter(v => v && v.key in umbraSet).length - 1;
    let rst = mods.map(mod => {
      if (mod && mod.key in umbraSet) {
        let mapped = _.clone(mod);
        mapped.setMul = umbraSet[mod.key][umbraSetCount];
        return mapped;
      }
      return mod;
    });
    // console.log(rst);
    return rst;
  }

  /**
   * 返回MOD价值收益
   * @param index 也可以是mod.id
   * @return MOD价值收益 (-∞ ~ +∞ 小数)
   */
  modValue(index: number | string) {
    if (typeof index === "string") index = this._mods.findIndex(v => v && v.id === index);
    if (!this._mods[index]) return 0;
    let nb = new (this.constructor as any)(this.data);
    nb._mods = this.mods;
    nb._buffs = this.buffs;
    nb._mods.splice(index, 1);
    let oldVal = this.compareValue;
    nb.calcMods();
    let newVal = nb.compareValue;
    return oldVal / newVal - 1;
  }

  /**
   * 返回BUFF价值收益
   * @param index 也可以是buff.id
   * @return MOD价值收益 (-∞ ~ +∞ 小数)
   */
  buffValue(index: number | string) {
    if (typeof index === "string") index = this._buffs.findIndex(v => v.data.id === index);
    if (!this._buffs[index]) return 0;
    let nb = new (this.constructor as any)(this.data);
    nb._mods = this.mods;
    nb._buffs = this.buffs;
    nb._buffs.splice(index, 1);
    let oldVal = this.compareValue;
    nb.calcMods();
    let newVal = nb.compareValue;
    return oldVal / newVal - 1;
  }

  /**
   * 自动填充MOD
   * @param slots 可用的插槽数
   * @param useRiven 是否使用紫卡 0 = 不用 1 = 自动选择 2 = 必须用
   */
  fill(slots = 8, useRiven = 0) {
    // 初始化
    this.clear();
    this.fillEmpty(slots, useRiven);
  }
  /**
   * MOD自动填充V1
   *
   * @description 根据所需的属性计算最大化或最小化以填充空白
   * @memberof WarframeBuild
   */
  fillEmpty(slots = 8, useRiven = 0, lib = this.avaliableMods, rivenLimit = 0) {
    let mods = (this._mods = _.compact(this._mods));
    let othermods = lib.filter(v => !mods.some(k => v.id === k.id || v.id === k.primed || v.primed === k.id));
    let sortableMods = othermods.map(v => [v, this.testMod(v)] as [NormalMod, number]).filter(v => v[1] > 0);
    console.log(sortableMods, mods.length, sortableMods.length, slots - mods.length);
    while (mods.length < slots && sortableMods.length > 0) {
      // 2. 计算收益
      // console.log("开始计算收益: ", this._mods.length)
      sortableMods.forEach(v => {
        v[1] = this.testMod(v[0]);
      });
      // 3. 把所有卡按收益排序
      sortableMods.sort((a, b) => (b[1] == a[1] ? b[0].name.localeCompare(a[0].name) : b[1] - a[1]));
      if (sortableMods.length > 0) {
        // console.log("计算收益最高值: ", sortableMods[0][0].name, "的收益是", sortableMods[0][1]);
        // 4. 将收益最高的一项插入并移出数组
        let expMod = sortableMods.shift();
        // 跳过负收益 (可能是被过滤的)
        if (expMod[1] < 0) break;
        this.applyMod(expMod[0]);
        // 5. 重复以上步骤直到卡槽充满
      }
    }
    this._mods.length = 8;
    this.recalcPolarizations();
  }

  /**
   * 返回MOD增幅数值
   * @param mod NormalMod
   * @return MOD增幅数值
   */
  testMod(mod: NormalMod) {
    // MOD查重
    if (!this.isValidMod(mod)) return -1;
    // 效率优化
    if (mod.props.length == 1) {
      let oriDmg: [string, number];
      switch (mod.props[0][0]) {
      }
    }
    // 通用方法
    let oldVal = this.compareValue;
    this._mods.push(mod);
    this.calcMods();
    let newVal = this.compareValue;
    this._mods.pop();
    this.calcMods();
    return newVal / oldVal - 1;
  }

  /**
   * MOD自动填充V2
   *
   * @description 自动填充V2实现原理:
   * 描述符分为两种 reducer和filter
   * reducer是直接对mod进行选择
   * 比如特定卡选择/最大化/最小化等
   * filter是给对应reducer作出限制
   * 常用于大于和小于操作符
   *
   * 选卡流程:
   * 按顺序加入reducer和于其同级的filter
   * 按照filter->reducer->next的流程循环直到空白数用完
   *
   * 举例:
   * 1. [reducer] 使用某MOD
   * 2. [filter] 强度 >= 145%
   * 3. [filter] 范围 >= 190%
   * 3. [reducer] MORE HP
   * 则先加入: 某MOD
   * 然后开始计算 MORE HP reducer,
   * 将目标函数效果进行排序之后, 如果不满足filter要求, 则按照filter要求替换部分MOD
   * 替换流程:
   * 设reducer后的MOD为 [某MOD] [U生命] [U护甲] [U聚精] [护甲2] [活力] [随机] [川流]
   * 则强度为155%满足要求 范围未满足要求 开始验证
   * 1. 使用[过度]会导致强度-60% 需要 [瞬时] [力量] 补足 负面是持续-27%
   * 2. 使用[延伸] [通灵] [狡诈] 无负面
   * 故选择后者 确定替换3张卡 重新计算reducer 替换3张卡
   * 输出最后的结果
   *
   * @memberof WarframeBuild
   */
  fillEmptyV2() {
    // TODO
  }

  // === 计算属性 ===

  /**
   * 序列化支持
   * 20位 普通MOD序列 如00001A1B000000000000
   * 等级修饰符@0-A 如00001A@01B000000000000
   * 不定长buff序列 ![id]: [base62 encoded power]: [layer]
   * @type {string}
   * @memberof WarframeBuild
   */
  get miniCode(): string {
    let mods = [this.aura, this.exilus, ...this.mods];
    while (mods.length < 10) mods.push(null);
    let normal = mods.map(v => (v && v.key + (v.level !== v.maxLevel ? "@" + base62(v.level) : "")) || "00").join("");
    let buffseq = this.buffs.map(v => `_${v.data.id}:${v.powerEnable && v.power ? base62(v.power * 100) : ""}${v.layerEnable ? ":" + v.layer : ""}`).join("");
    if (normal === "00000000000000000000") return buffseq;
    else return normal + buffseq;
  }

  set miniCode(code: string) {
    if (code.startsWith("!") || code.startsWith("_")) code = "00000000000000000000" + code;
    let normal = code.match(/..(?:@.)?/g).slice(0, 10);
    let subPart = code.substr(normal.join("").length);
    let buffIdx = subPart.indexOf("_");
    if (buffIdx < 0) buffIdx = subPart.indexOf("!");
    let buffseq = subPart.substr(buffIdx + 1);
    let bufflist = [];
    buffseq.split(/[!_]/g).forEach(buff => {
      let w = buff.split(":");
      let bdata = BuffList.find(v => v.id === w[0]);
      if (bdata) {
        let newBuff = new Buff(bdata);
        if (w[1]) newBuff.power = debase62(w[1]) / 100;
        if (w[2]) newBuff.layer = +w[2];
        bufflist.push(newBuff);
      }
    });
    let [aura, exilus, ...mods] = normal.map(v => {
      let key = v.substr(0, 2),
        level = v.substr(3, 4);
      let mod = _.cloneDeep(Codex.getNormalMod(key));
      if (level) mod.level = debase62(level);
      return mod;
    });
    this._aura = aura;
    this._exilus = exilus;
    this._buffs = bufflist;
    this.mods = mods;
  }
  get miniCodeURL() {
    return this.miniCode ? `https://${HH}/warframe/${this.data.url}/${this.miniCode}` : `https://${HH}/warframe/${this.data.url}`;
  }
  get maxHealth() {
    return 1;
  }
  get maxShield() {
    return 1;
  }
  get maxArmor() {
    return 1;
  }
  get maxEnergy() {
    return 1;
  }
  get maxSprint() {
    return 1;
  }
  get maxAbilityStrength() {
    return 1;
  }
  get maxAbilityDuration() {
    return 1;
  }
  get maxAbilityEfficiency() {
    return 1;
  }
  get maxAbilityRange() {
    return 1;
  }

  // 容量计算与极化

  protected _auraPol: string;
  protected _exilusPol: string;
  get auraPol() {
    return this._auraPol;
  }
  get exilusPol() {
    return this._exilusPol;
  }
  protected _polarizations: string[] = Array(8);
  get polarizations() {
    return this._polarizations;
  }
  get allPolarizations() {
    return [this._auraPol, this._exilusPol, ...this._polarizations];
  }
  /** 容量 */
  get totalCost() {
    let total = this.costMods.reduce((a, _, i) => (a += this.getCost(i - 1)), 0);
    return total;
  }

  /** 获取指定位置MOD的容量 */
  getCost(modIndex: number) {
    let mod = this.allMods[modIndex + 2];
    if (mod) return mod.calcCost(this.allPolarizations[modIndex + 2]);
    return 0;
  }

  /** 最大容量 */
  get maxCost() {
    return 60 - this.getCost(-2);
  }
  _formaCount = 0;
  /** 极化次数 */
  get formaCount() {
    return this._formaCount;
  }
  /** 重新计算极化次数 */
  recalcPolarizations() {
    // 自带的极性
    let defaultPolarities = this.data.polarities.slice();
    [this._auraPol, this._exilusPol, this._polarizations] = [this.data.aura, this.data.exilus, Array(8).fill(null)];
    this._formaCount = 0;
    // 匹配自带槽位
    // - 正面极性
    const deltaSeq = this._mods.map((v, i) => [i, v ? v.delta : 0]).sort((a, b) => b[1] - a[1]);
    // - 负面极性
    const thetaSeq = this._mods.map((v, i) => [i, v ? v.theta : 0]).sort((a, b) => a[1] - b[1]);
    deltaSeq.forEach(([i]) => {
      if (this._mods[i]) {
        let matched = defaultPolarities.indexOf(this._mods[i].polarity);
        if (matched >= 0) {
          defaultPolarities.splice(matched, 1);
          this._polarizations[i] = this._mods[i].polarity;
        }
      }
    });
    // 负面极性位
    let thetaMod = [];
    // 强制使用自带槽位
    while (defaultPolarities.length > 0) {
      const pol = defaultPolarities.pop();
      let mod = thetaSeq.pop();
      if (mod) {
        // 跳过已经极化的槽位
        if (!this._polarizations[mod[0]]) {
          this._polarizations[mod[0]] = pol;
          thetaMod.push(mod[0]);
        }
      } else {
        this._polarizations.some((v, i) => {
          if (!v) {
            this._polarizations[i] = pol;
            return true;
          }
          return false;
        });
      }
    }

    // 按容量需求量排序
    const mods = this.allMods;
    const delta = mods.map((v, i) => [i, v ? v.delta : 0]).sort((a, b) => b[1] - a[1]);
    // 最多极化10次
    for (let i = 0; this.totalCost > this.maxCost && i < delta.length && mods[delta[i][0]]; ++i) {
      const [modIndex] = delta[i];
      const pol = mods[modIndex].polarity;
      // aura
      if (modIndex === 0) {
        if (this._auraPol !== pol) {
          this._auraPol = pol;
          ++this._formaCount;
        }
      }
      // exilus
      else if (modIndex === 1) {
        if (this._exilusPol !== pol) {
          this._exilusPol = pol;
          ++this._formaCount;
        }
      } else {
        if (pol !== "w") {
          // console.log(`set pol [[${this._polarizations}]] ${modIndex - 2}: ${this._polarizations[modIndex - 2]} to ${pol}`)
          if (this._polarizations[modIndex - 2] !== pol) {
            this._polarizations[modIndex - 2] = pol;
            ++this._formaCount;
          }
        } else if (thetaMod.includes(modIndex - 2)) {
          // console.log(`set null [[${this._polarizations}]] ${modIndex - 2}: ${this._polarizations[modIndex - 2]} to null`)
          this._polarizations[modIndex - 2] = "";
          thetaMod = thetaMod.filter(v => v != modIndex - 2);
        }
      }
    }
    // console.log(this.allMods, this.allPolarizations)
    return this.allPolarizations;
  }

  _abilities: RenderedAbilities[];
  _lastCode: string;
  get Abilities() {
    if (this._lastCode === this.miniCode) return this._abilities;
    this._lastCode = this.miniCode;
    let datas = this.data.abilities.map(v => _abilityData.find(k => k.id === v));
    this._abilities = datas.filter(Boolean).map(v => new RenderedAbilities(v, this));
    return this._abilities;
  }
}

export class RenderedAbilities {
  build: WarframeBuild;
  data: AbilityData;
  get id() {
    return this.data.id;
  }
  get name() {
    const key = `skill.${_.camelCase(this.id)}`;
    return i18n.te(key) ? i18n.t(key) : this.id;
  }
  constructor(data: AbilityData, build: WarframeBuild) {
    this.data = data;
    this.build = build;
  }
  get oneHand() {
    return this.data.oneHand;
  }
  get tags() {
    return Array(6)
      .fill(1)
      .map((_, i) => this.data.tags & (1 << i) && AbilityType[1 << i])
      .filter(Boolean)
      .map(v => i18n.t(`ability.types.${_.camelCase(v)}`));
  }
  get energyCost() {
    return this.data.energyCost * (2 - this.build.abilityEfficiency);
  }
  get energyCostPS() {
    return this.data.energyCostPS * (2 - this.build.abilityEfficiencyContinuous);
  }
  get energyCostN() {
    return this.data.energyCostN * (2 - this.build.abilityEfficiency);
  }

  enhance?: AbilityEnhance;
  forms?: AbilityFormData[];

  get props() {
    const trans = (o: string | number | object) => {
      if (typeof o === "object") {
        // is object
        if (Array.isArray(o)) {
          // is array
          return o.map(trans);
        } // object
        else if ("value" in o) {
          // is AdvancedAbilityPropValue
          // 递归解析AAP
          const resolveBind = (aap: AdvancedAbilityPropValue) => {
            let value = aap.value;
            if (value && aap.bind)
              aap.bind.forEach(([binder, add, mul]) => {
                // 仅加法模式
                if (typeof add !== "undefined") {
                  if (typeof add !== "number") {
                    add = resolveBind(add);
                  }
                  if (typeof mul !== "undefined" && typeof mul !== "number") {
                    mul = resolveBind(mul);
                  }
                  // 属性映射解析
                  switch (binder) {
                    case WarframeProperty.Health:
                      value = (mul ? value + this.build.health * mul : value * this.build.health) + add;
                      break;
                    case WarframeProperty.Shield:
                      value = (mul ? value + this.build.shield * mul : value * this.build.shield) + add;
                      break;
                    case WarframeProperty.Armor:
                      value = (mul ? value + this.build.armor * mul : value * this.build.armor) + add;
                      break;
                    case WarframeProperty.Energy:
                      value = (mul ? value + this.build.energy * mul : value * this.build.energy) + add;
                      break;
                    case WarframeProperty.Sprint:
                      value = (mul ? value + this.build.sprint * mul : value * this.build.sprint) + add;
                      break;
                    case WarframeProperty.AbilityStrength:
                      value = (mul ? value + this.build.abilityStrength * mul : value * this.build.abilityStrength) + add;
                      break;
                    case WarframeProperty.AbilityDuration:
                      value = (mul ? value + this.build.abilityDuration * mul : value * this.build.abilityDuration) + add;
                      break;
                    case WarframeProperty.AbilityEfficiency:
                      value = (mul ? value + this.build.abilityEfficiency * mul : value * this.build.abilityEfficiency) + add;
                      break;
                    case WarframeProperty.AbilityRange:
                      value = (mul ? value + this.build.abilityRange * mul : value * this.build.abilityRange) + add;
                      break;
                  }
                }
              });
            if (aap.minValue) value = Math.max(value, aap.minValue);
            if (aap.maxValue) value = Math.min(value, aap.maxValue);
            return +value.toFixed(2);
          };
          return resolveBind(o);
        } else {
          // speical
          return _.mapValues(o as any, val => trans(val)) as typeof o;
        }
      }
      return o;
    };
    return _.map(this.data.props, (v, type) => {
      let rst = _.mapValues(v as any, val => trans(val)) as typeof v;
      switch (type) {
        case "Damage":
          const { ...r } = rst as AbilityPropTypes.Damage;
          return [
            _.camelCase(type),
            {
              ...r
            }
          ];
        case "Buff":
        case "Debuff":
        case "Summon":
        case "DamageReduce":
        case "Control":
        case "Special":
        case "Move":
        case "ExaltedWeapon":
          break;

        default:
          break;
      }
      return [_.camelCase(type), rst];
    });
  }
}

export module WarframeBuild {
  export interface FillRule {
    name: string;
    type: FillRuleType;
    target: FillRuleTarget;
  }
  /** 规则 */
  export enum FillRuleType {
    /** 最小化 */
    Min,
    /** 小于 */
    Less,
    /** 范围 */
    Range,
    /** 大于 */
    More,
    /** 最大化 */
    Max
  }
  /** 对象 */
  export enum FillRuleTarget {
    Health,
    Shield,
    Armor,
    Energy,
    Sprint,
    AbilityStrength,
    AbilityDuration,
    AbilityEfficiency,
    AbilityRange
  }
}

export * from "./codex/warframe";
