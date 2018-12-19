import _ from "lodash";
import { WarframeData, WarframeDataBase } from "./codex";
import { i18n } from "@/i18n";
import { NormalMod } from "./codex/mod";
import { hAccSum, hAccMul } from "./util";
import { Arcane } from "./codex/arcane";
import { Buff } from "./codex/buff";

export class WarframeBuild {
  data: WarframeData
  protected _rawmods: NormalMod[] = [];
  protected _mods: NormalMod[] = [];
  protected _arcanes: Arcane[] = [];
  protected _buffs: Buff[] = [];
  /** MOD列表 */
  get rawMods() { return this._rawmods; }
  get mods() { return _.cloneDeep(this._mods); }
  set mods(value) {
    this._rawmods = _.cloneDeep(value);
    this._mods = this.mapRankUpMods(value)
    this.calcMods();
  }
  /** 赋能列表 */
  get arcanes() { return _.cloneDeep(this._arcanes); }
  set arcanes(value) { this._arcanes = _.cloneDeep(value); this.calcMods(); }
  /** 加成列表 */
  get buffs() { return _.cloneDeep(this._buffs); }
  set buffs(value) { this._buffs = _.cloneDeep(value); this.calcMods(); }

  /** ID */
  get id() { return this.data.name }
  /** 本地化名称 */
  get name() { return i18n.t(`messages.${this.data.name}`) }

  protected _healthMul: number;
  protected _shieldMul: number;
  protected _armorMul: number;
  protected _energyMul: number;
  protected _sprintMul: number;
  protected _sheildRecharge: number;
  protected _abilityStrengthMul: number;
  protected _abilityDurationMul: number;
  protected _abilityEfficiencyMul: number;
  protected _abilityRangeMul: number;
  protected _abilityStrengthAdd: number;
  protected _abilityDurationAdd: number;
  protected _abilityEfficiencyAdd: number;
  protected _abilityRangeAdd: number;
  protected _castSpeedMul: number;
  protected _knockdownResistanceMul: number;
  protected _knockdownRecoveryMul: number;
  protected _slideMul: number;
  protected _frictionMul: number;
  protected _parkourVelocityMul: number;
  protected _quickThinkingMul: number;
  protected _rageMul: number;
  protected _healthConversionMul: number;
  protected _energyConversionMul: number;
  protected _tauResistMul: number;
  protected _auraStrengthMul: number;
  protected _auraEffectivenessMul: number;
  protected _aimGlideWallLatchTimeMul: number;
  protected _enemyRadarMul: number;
  protected _lootRadarMul: number;
  protected _holsterRateMul: number;

  // ### 基础属性 ###

  /** 生命 */
  get health() { return this.data.health * this._healthMul }
  /** 护盾 */
  get shield() { return this.data.shield * this._shieldMul }
  /** 护甲 */
  get armor() { return this.data.armor * this._armorMul }
  /** 能量 */
  get energy() { return this.data.energy * this._energyMul }
  /** 冲刺速度 */
  get sprint() { return this.data.sprint * this._sprintMul }
  /** 护盾回充 */
  get sheildRecharge() { return this._sheildRecharge }
  /** 技能强度 */
  get abilityStrength() { return (100 + this._abilityStrengthAdd) * this._abilityStrengthMul }
  /** 技能持续 */
  get abilityDuration() { return (100 + this._abilityDurationAdd) * this._abilityDurationMul }
  /** 技能效率 */
  get abilityEfficiency() { return (100 + this._abilityEfficiencyAdd) * this._abilityEfficiencyMul }
  /** 技能范围 */
  get abilityRange() { return (100 + this._abilityRangeAdd) * this._abilityRangeMul }
  /** 施放速度 */
  get castSpeed() { return this._castSpeedMul }
  /** 倒地抵抗 */
  get knockdownResistance() { return this._knockdownResistanceMul }
  /** 倒地恢复 */
  get knockdownRecovery() { return this._knockdownRecoveryMul }
  /** 滑行 */
  get slide() { return this._slideMul }
  /** 摩擦力 */
  get friction() { return this._frictionMul }
  /** 跑酷速度 */
  get parkourVelocity() { return this._parkourVelocityMul }
  /** 随机应变 */
  get quickThinking() { return this._quickThinkingMul }
  /** 狂暴化 */
  get rage() { return this._rageMul }
  /** 生命转换 */
  get healthConversion() { return this._healthConversionMul }
  /** 能量转换 */
  get energyConversion() { return this._energyConversionMul }
  /** S系抗性 */
  get tauResist() { return this._tauResistMul }
  /** 光环强度 */
  get auraStrength() { return this._auraStrengthMul }
  /** 光环效果 */
  get auraEffectiveness() { return this._auraEffectivenessMul }
  /** 飞身瞄准和持续时间 */
  get aimGlideWallLatchTime() { return this._aimGlideWallLatchTimeMul }
  /** 敌人雷达 */
  get enemyRadar() { return this._enemyRadarMul }
  /** 物品雷达 */
  get lootRadar() { return this._lootRadarMul }
  /** 切换速度 */
  get holsterRate() { return this._holsterRateMul }

  constructor(data: WarframeData | string) {
    if (typeof data === "string") data = WarframeDataBase.getWarframeById(data);
    if (!data) return;
    this.data = data;
    this.reset();
  }

  /** 重置属性 */
  reset() {
    this._healthMul = 1;
    this._shieldMul = 1;
    this._armorMul = 1;
    this._energyMul = 1;
    this._sprintMul = 1;
    this._sheildRecharge = 1;
    this._abilityStrengthMul = 1;
    this._abilityDurationMul = 1;
    this._abilityEfficiencyMul = 1;
    this._abilityRangeMul = 1;
    this._castSpeedMul = 1;
    this._knockdownResistanceMul = 1;
    this._knockdownRecoveryMul = 1;
    this._slideMul = 1;
    this._frictionMul = 1;
    this._parkourVelocityMul = 1;
    this._quickThinkingMul = 1;
    this._rageMul = 1;
    this._healthConversionMul = 1;
    this._energyConversionMul = 1;
    this._tauResistMul = 1;
    this._auraStrengthMul = 1;
    this._auraEffectivenessMul = 1;
    this._aimGlideWallLatchTimeMul = 1;
    this._enemyRadarMul = 1;
    this._lootRadarMul = 1;
    this._holsterRateMul = 1;
    this._abilityStrengthAdd = 0;
    this._abilityDurationAdd = 0;
    this._abilityEfficiencyAdd = 0;
    this._abilityRangeAdd = 0;
  }

  /**
   * 应用通用属性
   * @param mod MOD
   * @param pName 属性id或名称
   * @param pValue 属性值
   */
  applyProp(mod: NormalMod | Arcane, pName: string, pValue: number) {
    switch (pName) {
    /** Health */ case "h": this._healthMul = hAccSum(this._healthMul, pValue); break;
    /** Sheild */ case "s": this._shieldMul = hAccSum(this._shieldMul, pValue); break;
    /** Amror */ case "a": this._armorMul = hAccSum(this._armorMul, pValue); break;
    /** Energy */ case "e": this._energyMul = hAccSum(this._energyMul, pValue); break;
    /** Sprint */ case "f": this._sprintMul = hAccSum(this._sprintMul, pValue); break;
    /** SheildRecharge */ case "r": this._sheildRecharge = hAccSum(this._sheildRecharge, pValue); break;
    /** AbilityStrength */ case "S": this._abilityStrengthAdd = hAccSum(this._abilityStrengthAdd, pValue); break;
    /** AbilityDuration */ case "D": this._abilityDurationAdd = hAccSum(this._abilityDurationAdd, pValue); break;
    /** AbilityEfficiency */ case "E": this._abilityEfficiencyAdd = hAccSum(this._abilityEfficiencyAdd, pValue); break;
    /** AbilityRange */ case "R": this._abilityRangeAdd = hAccSum(this._abilityRangeAdd, pValue); break;
    /** CastSpeed */ case "c": this._castSpeedMul = hAccSum(this._castSpeedMul, pValue); break;
    /** KnockdownResistance */ case "k": this._knockdownResistanceMul = hAccSum(this._knockdownResistanceMul, pValue); break;
    /** KnockdownRecovery */ case "h": this._knockdownRecoveryMul = hAccSum(this._knockdownRecoveryMul, pValue); break;
    /** Slide */ case "l": this._slideMul = hAccSum(this._slideMul, pValue); break;
    /** Friction */ case "F": this._frictionMul = hAccSum(this._frictionMul, pValue); break;
    /** ParkourVelocity */ case "v": this._parkourVelocityMul = hAccSum(this._parkourVelocityMul, pValue); break;
    /** QuickThinking */ case "z": this._quickThinkingMul = hAccSum(this._quickThinkingMul, pValue); break;
    /** Rage */ case "A": this._rageMul = hAccSum(this._rageMul, pValue); break;
    /** HealthConversion */ case "hc": this._healthConversionMul = hAccSum(this._healthConversionMul, pValue); break;
    /** EnergyConversion */ case "ec": this._energyConversionMul = hAccSum(this._energyConversionMul, pValue); break;
    /** TauResist */ case "tr": this._tauResistMul = hAccSum(this._tauResistMul, pValue); break;
    /** AuraStrength */ case "as": this._auraStrengthMul = hAccSum(this._auraStrengthMul, pValue); break;
    /** AuraEffectiveness */ case "ae": this._auraEffectivenessMul = hAccSum(this._auraEffectivenessMul, pValue); break;
    /** AimGlideWallLatchTime */ case "at": this._aimGlideWallLatchTimeMul = hAccSum(this._aimGlideWallLatchTimeMul, pValue); break;
    /** EnemyRadar */ case "er": this._enemyRadarMul = hAccSum(this._enemyRadarMul, pValue); break;
    /** LootRadar */ case "lr": this._lootRadarMul = hAccSum(this._lootRadarMul, pValue); break;
    /** HolsterRate */ case "hr": this._holsterRateMul = hAccSum(this._holsterRateMul, pValue); break;
    }
  }

  /** 应用MOD */
  applyMod(mod: NormalMod) {
    this._mods.push(mod);
    this.calcMods();
    return this;
  }

  /** 应用赋能 */
  applyArcane(arc: Arcane) {
    this._arcanes.push(arc);
    this.calcMods();
    return this;
  }

  /** 应用加成 */
  applyBuff(buff: Buff) {
    this._buffs.push(buff);
    this.calcMods();
    return this;
  }

  /** 将Mod属性写入到增幅上 */
  calcMods() {
    this.reset();
    this.mods.forEach(mod => {
      mod && _.forEachRight(mod.props, prop => this.applyProp(mod, prop[0], prop[1]));
    });
  }

  /** [纯函数] 映射组合MOD加成 */
  mapRankUpMods(mods: NormalMod[]): NormalMod[] {
    let umbraSet = { "HO": [1, 1.25, 1.75], "HP": [1, 1.25, 1.75], "HQ": [1, 1.25, 1.5] };
    let umbraSetCount = mods.filter(v => v.key in umbraSet).length;
    let rst = mods.map(mod => {
      if (mod.key in umbraSet) {
        let mapped = _.clone(mod);
        mapped.props = mod.props.map(p => [p[0], hAccMul(umbraSet[mod.id][umbraSetCount], p[1])] as [string, number]);
        return mapped;
      }
      return mod;
    });
    // console.log(rst);
    return rst;
  }
}

export * from "./codex/warframe"
