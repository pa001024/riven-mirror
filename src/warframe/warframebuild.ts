import { WarframeDataBase, Warframe, Codex } from "./codex";
import { i18n } from "@/i18n";
import { NormalMod } from "./codex/mod";
import { hAccSum } from "./util";
import { Arcane } from "./codex/arcane";
import { Buff, BuffList } from "./codex/buff";
import { base62, debase62 } from "./lib/base62";

export class WarframeBuild {
  data: Warframe;
  protected _rawmods: NormalMod[] = [];
  protected _mods: NormalMod[] = [];
  protected _arcanes: Arcane[] = [];
  protected _buffs: Buff[] = [];
  protected _aura: NormalMod = null;
  protected _exilus: NormalMod = null;

  /** 光环 */
  get aura() { return this._aura }
  set aura(value) {
    this._aura = value;
    this.calcMods();
    this.recalcPolarizations();
  }
  /** 特殊功能 */
  get exilus() { return this._exilus }
  set exilus(value) {
    this._exilus = value;
    this.calcMods();
    this.recalcPolarizations();
  }

  /** 原型MOD列表 */
  get rawMods() { return this._rawmods; }
  /** MOD列表 */
  get mods() { return _.cloneDeep(this._mods); }
  set mods(value) {
    this._rawmods = _.cloneDeep(value);
    this._mods = this.mapRankUpMods(value);
    this.calcMods();
    this.recalcPolarizations();
  }
  /** 特殊功能MOD与MOD */
  get costMods() { return [this.exilus, ...this._mods] }
  /** 所有MOD */
  get allMods() { return [this._aura, this._exilus, ...this._mods] }
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
  /** 基础ID */
  get baseId() { return this.data.className || this.data.id }
  /** 属性标记 */
  get tags() { return this.data.tags.concat(["Warframe", this.baseId]) }

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

  // ### 基础属性 ###

  /** 生命 */
  get health() { return this.data.health * this._healthMul }
  /** 护盾 */
  get shield() { return this.data.shield * this._shieldMul }
  /** 护甲 */
  get armor() { return this.data.armor * this._armorMul + this._armorAdd }
  /** 能量 */
  get energy() { return this.data.energy * this._energyMul }
  /** 冲刺速度 */
  get sprint() { return this.data.sprint * this._sprintMul }
  /** 护盾回充 */
  get shieldRecharge() { return this._shieldRecharge }
  /** 技能强度 */
  get abilityStrength() { return (1 + this._abilityStrengthAdd) * this._abilityStrengthMul }
  /** 技能持续 */
  get abilityDuration() { return (1 + this._abilityDurationAdd) * this._abilityDurationMul }
  /** 技能效率 */
  get abilityEfficiency() { return (1 + this._abilityEfficiencyAdd) * this._abilityEfficiencyMul }
  /** 技能范围 */
  get abilityRange() { return (1 + this._abilityRangeAdd) * this._abilityRangeMul }
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
  get quickThinking() { return this._quickThinkingAdd }
  /** 狂暴化 */
  get rage() { return this._rageAdd }
  /** 生命转换 */
  get healthConversion() { return this._healthConversionAdd }
  /** 能量转换 */
  get energyConversion() { return this._energyConversionAdd }
  /** S系抗性 */
  get tauResist() { return this._tauResistAdd }
  /** 光环强度 */
  get auraStrength() { return this._auraStrengthAdd }
  /** 光环效果 */
  get auraEffectiveness() { return this._auraEffectivenessAdd }
  /** 飞身瞄准和持续时间 */
  get aimGlideWallLatchTime() { return this._aimGlideWallLatchTimeAdd }
  /** 敌人雷达 */
  get enemyRadar() { return this._enemyRadarAdd }
  /** 物品雷达 */
  get lootRadar() { return this._lootRadarAdd }
  /** 切换速度 */
  get holsterRate() { return this._holsterRateMul }
  /** 有效生命 */
  get effectiveHealth() {
    return this.shield + ((this.health + this.energy * this.quickThinking) * (1 + this.armor / 300));
  }

  constructor(data: Warframe | string) {
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
    this._armorAdd = 0;
    this._energyMul = 1;
    this._sprintMul = 1;
    this._abilityStrengthMul = 1;
    this._abilityDurationMul = 1;
    this._abilityEfficiencyMul = 1;
    this._abilityRangeMul = 1;
    this._shieldRecharge = 1;
    this._castSpeedMul = 1;
    this._knockdownResistanceMul = 1;
    this._knockdownRecoveryMul = 1;
    this._slideMul = 1;
    this._frictionMul = 1;
    this._parkourVelocityMul = 1;
    this._holsterRateMul = 1;
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
    this.data.lvlUps.map(v => this.applyProp(null, v[0], v[1]));
  }

  /**
   * 应用通用属性
   *
   * @param {(NormalMod | Arcane)} mod MOD
   * @param {string} pName 属性id或名称
   * @param {number} pValue 属性值
   * @memberof WarframeBuild
   */
  applyProp(mod: NormalMod | Arcane, pName: string, pValue: number) {
    switch (pName) {
    /** Health */ case "h": this._healthMul = hAccSum(this._healthMul, pValue); break;
    /** Shield */ case "s": this._shieldMul = hAccSum(this._shieldMul, pValue); break;
    /** Amror */ case "a": this._armorMul = hAccSum(this._armorMul, pValue); break;
    /** AmrorAdd */ case "aa": this._armorAdd = hAccSum(this._armorAdd, pValue); break;
    /** Energy */ case "e": this._energyMul = hAccSum(this._energyMul, pValue); break;
    /** Sprint */ case "f": this._sprintMul = hAccSum(this._sprintMul, pValue); break;
    /** ShieldRecharge */ case "r": this._shieldRecharge = hAccSum(this._shieldRecharge, pValue); break;
    /** AbilityStrength */ case "t": this._abilityStrengthAdd = hAccSum(this._abilityStrengthAdd, pValue); break;
    /** AbilityDuration */ case "u": this._abilityDurationAdd = hAccSum(this._abilityDurationAdd, pValue); break;
    /** AbilityEfficiency */ case "x": this._abilityEfficiencyAdd = hAccSum(this._abilityEfficiencyAdd, pValue); break;
    /** AbilityRange */ case "g": this._abilityRangeAdd = hAccSum(this._abilityRangeAdd, pValue); break;
    /** CastSpeed */ case "c": this._castSpeedMul = hAccSum(this._castSpeedMul, pValue); break;
    /** KnockdownResistance */ case "k": this._knockdownResistanceMul = hAccSum(this._knockdownResistanceMul, pValue); break;
    /** KnockdownRecovery */ case "y": this._knockdownRecoveryMul = hAccSum(this._knockdownRecoveryMul, pValue); break;
    /** Slide */ case "l": this._slideMul = hAccSum(this._slideMul, pValue); break;
    /** Friction */ case "i": this._frictionMul = hAccSum(this._frictionMul, pValue); break;
    /** ParkourVelocity */ case "v": this._parkourVelocityMul = hAccSum(this._parkourVelocityMul, pValue); break;
    /** QuickThinking */ case "z": this._quickThinkingAdd = hAccSum(this._quickThinkingAdd, pValue); break;
    /** Rage */ case "rg": this._rageAdd = hAccSum(this._rageAdd, pValue); break;
    /** HealthConversion */ case "hc": this._healthConversionAdd = hAccSum(this._healthConversionAdd, pValue); break;
    /** EnergyConversion */ case "ec": this._energyConversionAdd = hAccSum(this._energyConversionAdd, pValue); break;
    /** TauResist */ case "tr": this._tauResistAdd = hAccSum(this._tauResistAdd, pValue); break;
    /** AuraStrength */ case "as": this._auraStrengthAdd = hAccSum(this._auraStrengthAdd, pValue); break;
    /** AuraEffectiveness */ case "ae": this._auraEffectivenessAdd = hAccSum(this._auraEffectivenessAdd, pValue); break;
    /** AimGlideWallLatchTime */ case "at": this._aimGlideWallLatchTimeAdd = hAccSum(this._aimGlideWallLatchTimeAdd, pValue); break;
    /** EnemyRadar */ case "er": this._enemyRadarAdd = hAccSum(this._enemyRadarAdd, pValue); break;
    /** LootRadar */ case "lr": this._lootRadarAdd = hAccSum(this._lootRadarAdd, pValue); break;
    /** HolsterRate */ case "hr": this._holsterRateMul = hAccSum(this._holsterRateMul, pValue); break;
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
    this.recalcPolarizations();
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
    if (mods.some(v => v.id === mod.primed || (mod.primed && v.primed === mod.primed)))
      return false;
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
    let umbraSet = { "HP": [1, 1.25, 1.75], "HQ": [1, 1.25, 1.75], "HR": [1, 1.25, 1.5] };
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
   * 返回MOD价值有效生命值收益
   * @param index 也可以是mod.id
   * @return MOD价值收益 (-∞ ~ +∞ 小数)
   */
  modValue(index: number | string) {
    if (typeof index === "string")
      index = this._mods.findIndex(v => v && v.id === index);
    if (!this._mods[index]) return 0;
    let nb = new (this.constructor as any)(this.data);
    nb._mods = this.mods;
    nb._buffs = this.buffs;
    nb._mods.splice(index, 1);
    let oldVal = this.effectiveHealth;
    nb.calcMods();
    let newVal = nb.effectiveHealth;
    return oldVal / newVal - 1;
  }

  /**
   * MOD自动填充V1
   *
   * @description 根据所需的属性计算最大化或最小化以填充空白
   * @memberof WarframeBuild
   */
  fillEmpty() {

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
   * 不定长buff序列 ![id]:[base62 encoded power]:[layer]
   * @type {string}
   * @memberof WarframeBuild
   */
  get miniCode(): string {
    let mods = [this.aura, this.exilus, ...this.mods];
    while (mods.length < 10) mods.push(null);
    let normal = mods.map(v => v && (v.key + (v.level !== v.maxLevel ? "@" + base62(v.level) : "")) || "00").join("");
    let buffseq = this.buffs.map(v => `!${v.data.id}:${v.powerEnable && v.power ? base62(v.power * 100) : ""}${v.layerEnable ? ":" + v.layer : ""}`).join("");
    return normal + buffseq;
  }

  set miniCode(code: string) {
    let normal = code.match(/..(?:@.)?/g).slice(0, 10);
    let subPart = code.substr(normal.join("").length);
    let buffIdx = subPart.indexOf("!");
    let buffseq = subPart.substr(buffIdx + 1);
    let bufflist = [];
    buffseq.split("!").forEach(buff => {
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
      let key = v.substr(0, 2), level = v.substr(3, 4);
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
    return `https://rm.0-0.at/warframe/${this.data.url}/${this.miniCode}`;
  }
  get maxHealth() { return 1 }
  get maxShield() { return 1 }
  get maxArmor() { return 1 }
  get maxEnergy() { return 1 }
  get maxSprint() { return 1 }
  get maxAbilityStrength() { return 1 }
  get maxAbilityDuration() { return 1 }
  get maxAbilityEfficiency() { return 1 }
  get maxAbilityRange() { return 1 }

  // 容量计算与极化

  protected _auraPol: string;
  protected _exilusPol: string;
  get auraPol() { return this._auraPol }
  get exilusPol() { return this._exilusPol }
  protected _polarizations: string[] = Array(8);
  get polarizations() { return this._polarizations; }
  get allPolarizations() { return [this._auraPol, this._exilusPol, ...this._polarizations]; }
  /** 容量 */
  get totalCost() {
    let total = this.costMods.reduce((a, _, i) => a += this.getCost(i - 1), 0);
    return total;
  }

  /** 获取指定位置MOD的容量 */
  getCost(modIndex: number) {
    let mod = this.allMods[modIndex + 2];
    if (mod) return mod.calcCost(this.allPolarizations[modIndex + 2]);
    return 0;
  }

  /** 最大容量 */
  get maxCost() { return 60 + this.getCost(-2); }
  _formaCount = 0;
  /** 极化次数 */
  get formaCount() { return this._formaCount }
  /** 重新计算极化次数 */
  recalcPolarizations() {
    // 自带的极性
    let defaultPolarities = this.data.polarities.slice();
    this._auraPol = this.data.aura;
    this._exilusPol = this.data.exilus;
    this._polarizations = Array(8);
    this._formaCount = 0;
    // 自动匹配自带槽位
    const deltaSeq = this._mods.map((v, i) => [i, v ? v.delta : 0]).sort((a, b) => b[1] - a[1]);
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
    // 强制使用自带槽位
    while (defaultPolarities.length > 0) {
      const pol = defaultPolarities.pop();
      let mod = thetaSeq.pop();
      if (mod) this._polarizations[mod[0]] = pol;
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
          if (this._polarizations[modIndex - 2] !== pol) {
            this._polarizations[modIndex - 2] = pol;
            ++this._formaCount;
          }
        }
      }
    }
    // console.log(this.allMods, this.allPolarizations)
    return this.allPolarizations;
  }
}

export module WarframeBuild {
  export interface FillRule {
    name: string
    type: FillRuleType
    target: FillRuleTarget
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
    Max,
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
    AbilityRange,
  }
}

export * from "./codex/warframe"
