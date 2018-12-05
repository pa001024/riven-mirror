import {
  Arcane, Codex, CombElementMap, Damage2_0, DamageType, Enemy, EnemyTimelineState, ExtraDmgSet,
  NormalCardDependTable, NormalMod, RivenDataBase, RivenMod, RivenPropertyDataBase,
  toNegaUpLevel, toUpLevel, ValuedRivenProperty, Weapon, StatusInfo
} from "@/warframe";
import _ from "lodash";
import { choose, hAccDiv, hAccMul, hAccSum } from "./util";
import { Buff, BuffList } from "@/warframe/codex";
import { base62, debase62 } from "./lib/base62";
import { procDurationMap } from "./status";

// 基础类
export abstract class ModBuild {
  // ### 变量 ###

  public abstract weapon: Weapon
  public riven: RivenMod
  public get rivenWeapon() { return RivenDataBase.getRivenWeaponByName(this.weapon.rivenName || this.weapon.id) }

  /** 所有适用的MOD */
  protected avaliableMods: NormalMod[] = []
  protected _mods: NormalMod[] = [];
  protected _arcanes: Arcane[] = [];
  protected _buffs: Buff[] = [];
  /** MOD列表 */
  get mods() { return _.cloneDeep(this._mods); }
  set mods(value) { this._mods = _.cloneDeep(value); this.calcMods(); }
  /** 赋能列表 */
  get arcanes() { return _.cloneDeep(this._arcanes); }
  set arcanes(value) { this._arcanes = _.cloneDeep(value); this.calcMods(); }
  /** 加成列表 */
  get buffs() { return _.cloneDeep(this._buffs); }
  set buffs(value) { this._buffs = _.cloneDeep(value); this.calcMods(); }

  // ### 属性 ###
  protected _baseDamageMul = 1;
  protected _extraDmgMul = 1;
  protected _critChanceMul = 1;
  protected _critChanceAdd = 0;
  protected _critMulMul = 1;
  protected _procChanceMul = 1;
  protected _procDurationMul = 1;
  protected _procDamageMul = 1;
  protected _enemyDmgMul = [1, 1, 1, 1, 1];
  protected _fireRateMul = 1;
  protected _headShotMulMul = 1;
  protected _overallMul = 1;
  protected _finalCritMulMul = 1;
  protected _allEnemyDmgMul = 0;

  protected _extraProcChance: [string, number][] = [];

  /** 基伤增幅倍率 */
  get baseDamageMul() { return this._baseDamageMul; }
  /** 额伤增幅倍率 */
  get extraDmgMul() { return this._extraDmgMul; }
  /** 暴击率增幅倍率 */
  get critChanceMul() { return this._critChanceMul < 0 ? 0 : this._critChanceMul; }
  /** 加法暴击率增幅倍率 */
  get critChanceAdd() { return this._critChanceAdd; }
  /** 暴击伤害增幅倍率 */
  get critMulMul() { return this._critMulMul; }
  /** 触发几率增幅倍率 */
  get procChanceMul() { return this._procChanceMul; }
  /** 触发时间增幅倍率 */
  get procDurationMul() { return this._procDurationMul; }
  /** 触发伤害增幅倍率 */
  get procDamageMul() { return hAccMul(this.enemyDmgMul, this._procDamageMul); }
  /** 全种族伤害增幅倍率 */
  get allEnemyDmgMul() { return this._allEnemyDmgMul; }
  /** 种族伤害增幅倍率 */
  get enemyDmgMul() {
    if (this.enemyDmgTypeIndex >= 0)
      return this.allEnemyDmgMul + (this._enemyDmgMul[this.enemyDmgTypeIndex] <= 0 ? 0
        : this._enemyDmgMul[this.enemyDmgTypeIndex]);
    else
      return this.allEnemyDmgMul + 1;
  }
  /** 攻速增幅倍率 */
  get fireRateMul() { return this._fireRateMul; }
  /** 爆头倍率增幅倍率 */
  get headShotMulMul() { return this._headShotMulMul; }
  /** 全局伤害增幅倍率 */
  get overallMul() { return hAccMul(this.enemyDmgMul, this._overallMul); }
  /** 全局暴击伤害增幅倍率 */
  get finalCritMulMul() { return this._finalCritMulMul; }
  /** 额外触发几率 */
  get extraProcChance() { return this._extraProcChance; }
  abstract get compareDamage(): number;
  abstract set options(val: any);
  abstract get options(): any;

  // 额外参数

  /** 基伤加成 */
  extraBaseDamage = 0;
  /** 总伤加成 */
  extraOverall = 0;
  /** 护甲削减 */
  amrorReduce = 0;

  private _headShotChance = 0;
  /** 爆头概率 */
  get headShotChance() { return this._headShotChance; }
  set headShotChance(value) {
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    this._headShotChance = value;
  }

  private _compareMode: number = 0;
  /** 对比模式 */
  public get compareMode(): number { return this._compareMode; }
  public set compareMode(value: number) { this._compareMode = value; }

  protected _target: Enemy;
  /** 打击目标 */
  get target() { return this._target; }
  set target(value) {
    if (value)
      this.enemyDmgType = "TGCIOSW"[value.faction];
    this._target = value;
  }

  abstract getTimeline(limit: number): EnemyTimelineState[];

  // === 计算属性 ===

  /**
   * 序列化支持
   * 16位 普通MOD序列 如1A1B000000000000
   * 不定长紫卡base64序列
   * 不定长buff序列 ![id]:[base62 encoded power]:[layer]
   */
  get miniCode() {
    let mods = this.mods;
    while (mods.length < 8) mods.push(null);
    let normal = mods.map(v => v && v.key || "00").join("");
    let buffseq = this.buffs.map(v => `!${v.data.id}:${v.powerEnable && v.power ? base62(v.power * 100) : ""}${v.layerEnable ? ":" + v.layer : ""}`).join("");
    if (this.riven && mods.some(v => v && v.key === "01") && this.riven.properties.length > 1) return normal + this.riven.qrCodeBase64 + buffseq;
    return normal + buffseq;
  }

  set miniCode(code: string) {
    let normal = code.substr(0, 16);
    let subPart = code.substr(16);
    let buffIdx = subPart.indexOf("!");
    let riven = buffIdx >= 0 ? subPart.substr(0, buffIdx) : subPart;
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
    this.riven = riven && new RivenMod(riven, true);
    let mods = _.compact(_.words(normal, /../g).map(v => v === "01" ? this.riven.normalMod : Codex.getNormalMod(v)));
    this._mods = mods;
    this._buffs = bufflist;
    this.calcMods();
  }

  get miniCodeURL() {
    return `https://rm.0-0.at/weapon/${this.weapon.url}/${this.miniCode}`;
  }

  /** 暴击率 */
  get critChance() { return hAccSum(hAccMul(this.weapon.critChance, this.critChanceMul), this.critChanceAdd); }
  /** 暴击倍率 */
  get critMul() { return hAccMul(this.weapon.critMul, this.critMulMul, this.finalCritMulMul); }
  /** 平均暴击区增幅倍率 */
  get critDamageMul() { return this.calcCritDamage(this.critChance, this.critMul); }

  /** 元素顺序 */
  elementsOrder: string[] = [];
  protected _heatMul = 0;
  /** 火焰伤害增幅倍率 */
  public get heatMul() { return this._heatMul; }
  public set heatMul(value) {
    this._heatMul = value;
    this.elementsOrder.includes("Heat") || this.elementsOrder.push("Heat");
  }
  protected _coldMul = 0;
  /** 冰冻伤害增幅倍率 */
  public get coldMul() { return this._coldMul; }
  public set coldMul(value) {
    this._coldMul = value;
    this.elementsOrder.includes("Cold") || this.elementsOrder.push("Cold");
  }
  protected _toxinMul = 0;
  /** 毒素伤害增幅倍率 */
  public get toxinMul() { return this._toxinMul; }
  public set toxinMul(value) {
    this._toxinMul = value;
    this.elementsOrder.includes("Toxin") || this.elementsOrder.push("Toxin");
  }
  protected _electricityMul = 0;
  /** 电击伤害增幅倍率 */
  public get electricityMul() { return this._electricityMul; }
  public set electricityMul(value) {
    this._electricityMul = value;
    this.elementsOrder.includes("Electricity") || this.elementsOrder.push("Electricity");
  }
  private _impactMul = 0;
  /** 穿刺伤害增幅倍率 */
  public get impactMul() { return this._impactMul; }
  public set impactMul(value) {
    this._impactMul = value;
  }
  private _punctureMul = 0;
  /** 冲击伤害增幅倍率 */
  public get punctureMul() { return this._punctureMul; }
  public set punctureMul(value) {
    this._punctureMul = value;
  }
  private _slashMul = 0;
  /** 切割伤害增幅倍率 */
  public get slashMul() { return this._slashMul; }
  public set slashMul(value) {
    this._slashMul = value;
  }
  /** 所有元素增幅倍率 */
  public get elementsMul() { return { Heat: this.heatMul, Cold: this.coldMul, Toxin: this.toxinMul, Electricity: this.electricityMul, Impact: this.impactMul, Puncture: this.punctureMul, Slash: this.slashMul }; }
  /** 独立元素 */
  public standaloneElements: [string, number][] = [];

  /** 复合元素顺序 */
  private _combElementsOrder: [string, number][] = [];
  public get combElementsOrder(): [string, number][] { return this._combElementsOrder; }

  /** 重新计算元素顺序 */
  recalcElements() {
    this._extraDmgMul = hAccSum(this.heatMul, this.coldMul, this.toxinMul, this.electricityMul);
    let eleOrder = _.clone(this.elementsOrder), otherOrder = [], eleMul = this.elementsMul;
    // 计算武器原本属性
    this.weapon.dmg.forEach(([vn, vv]) => {
      let eMul = vn in eleMul ? eleMul[vn] + 1 : 1; // 1是复合属性
      let totalMul = vv / this.originalDamage;
      switch (vn) {
        // 单元素组合
        case "Heat": case "Cold": case "Toxin": case "Electricity":
          this._extraDmgMul = hAccSum(this._extraDmgMul, totalMul);
          eleMul[vn] = hAccSum(eleMul[vn], totalMul);
          eleOrder.includes(vn) || eleOrder.push(vn);
          break;
        // 物理
        case "Impact": case "Puncture": case "Slash":
          totalMul = hAccMul(eMul > 0 ? eMul : 0, totalMul);
        default:
          this._extraDmgMul = hAccSum(this._extraDmgMul, totalMul);
          otherOrder.push([vn, totalMul]);
          break;
      }
    });
    let combs = _.chunk(eleOrder, 2);
    // 复合元素合成
    let tmpCombs = combs.map(comb => {
      if (comb.length > 1) {
        let combElement = CombElementMap[comb.sort().join("+")];
        let etype = Damage2_0.getDamageType(combElement);
        return [etype.id, hAccSum(eleMul[etype.combinedBy[0]], eleMul[etype.combinedBy[1]])] as [string, number];
      } else {
        return [comb[0], eleMul[comb[0]]] as [string, number];
      }
    });
    // 将独立元素合并或加入到元素列表中
    this.standaloneElements.forEach(([vn, vv]) => {
      this._extraDmgMul = hAccSum(this._extraDmgMul, vv);
      let idx = tmpCombs.findIndex(v => v[0] === vn);
      if (idx >= 0) {
        tmpCombs[idx][1] = hAccSum(tmpCombs[idx][1], vv);
      } else {
        tmpCombs.push([vn, vv]);
      }
    });
    this._combElementsOrder = tmpCombs.concat(otherOrder);
  }
  /** 所有伤害 */
  get totalDmg() {
    return this.baseDmg.map(([i, v]) => [i, v * this.totalDamage / this.extraDmgMul]).filter(v => v[1] > 0) as [string, number][];
  }
  /** 所有伤害类型面板 */
  get dmg() {
    return this.baseDmg.map(([i, v]) => [i, v * this.panelBaseDamage]).filter(v => v[1] > 0) as [string, number][];
  }
  /**
   * 所有伤害类型(基础)
   *
   * 只计算元素本身的加成 无视基伤多重等影响 可以正确计算出负伤害情况下的元素配比
   */
  get baseDmg() {
    let extra = this.combElementsOrder;
    let rst = {};
    extra.forEach(([dname, dpart]) => {
      let targetElement = dname;
      if (rst[targetElement]) rst[targetElement] = hAccSum(rst[targetElement], dpart);
      else rst[targetElement] = dpart;
    });
    return _.map(rst, (v, i) => [i, +v]) as [string, number][];
  }

  // ### 额外参数 ###
  allowElementTypes: string[] = null;
  useStatus = false;

  /** 连击层数 */
  comboLevel = 0;
  /** 设置连击数 */
  set comboCount(value) {
    this.comboLevel = value > 4 ? ~~(Math.log(value / 5) / Math.log(3)) + 1 : 0;
  }

  // ### 计算属性 ###
  /** 原爆头倍率 */
  get oriHeadShotMul() { return 2; }
  /** 爆头倍率 */
  get headShotMul() { return hAccMul(this.oriHeadShotMul, this.headShotMulMul); }

  /** 触发率是否存在跃迁 */
  get isStatusJump() {
    let neededMul = (1 - this.weapon.status) / this.weapon.status;
    let procChanceProp = this.riven.properties.find(v => v.prop.id === "2");
    if (procChanceProp)
      return procChanceProp.value + 2.4 > neededMul;
    return 2.4 > neededMul;
  }

  /** 触发几率 */
  get procChance() {
    let s = this.weapon.status * this.procChanceMul;
    return s > 1 ? 1 : s < 0 ? 0 : s;
  }
  /** 真实触发几率 */
  abstract get realProcChance(): number;

  /** 触发权重 */
  get procWeights() {
    let oE = this.extraDmgMul;
    return this.baseDmg.map(([vn, vv]) => ["Impact", "Puncture", "Slash"].includes(vn) ? [vn, hAccDiv(vv * 4, oE)] : [vn, hAccDiv(vv, oE)]) as [string, number][];;
  }

  /** 真实触发几率(各属性) */
  get procChanceMap(): [string, number][] {
    let pC = this.realProcChance;
    let pW = this.procWeights;
    // 将触发率乘权重
    let opM = pW.map(([vn, vv]) => [vn, hAccMul(vv, pC)]) as [string, number][];
    // 加上额外触发率 (为了支持猎人切)
    if (this.extraProcChance.length > 0) {
      this.extraProcChance.forEach(([vn, vv]) => {
        let cp = opM.find(v => v[0] === vn);
        if (cp) cp[1] = cp[1] + vv;
        else opM.push([vn, vv]);
      });
    }
    // 防止触发率溢出
    let totalChance = opM.reduce((a, b) => a + b[1], 0);
    if (totalChance > 1)
      return opM.map(([vn, vv]) => [vn, vv / totalChance]) as [string, number][];
    return opM;
  }

  /** 无多重触发伤害(各属性) */
  get dotDamageMap() {
    let procs = this.procChanceMap;
    return procs.map(([vn, vv]) => {
      switch (vn) {
        // 切割伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Slash_Damage
        case "Slash":
          return [vn, vv * this.baseDamage * 0.35];
        // 毒素伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Toxin_Damage
        case "Toxin":
          return [vn, vv * this.toxinBaseDamage * 0.5];
        // 毒气伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Gas_Damage
        case "Gas":
          return [vn, vv * this.toxinBaseDamage * this.procDamageMul * 0.5];
        // 火焰伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Heat_Damage
        case "Heat":
          return [vn, vv * this.heatBaseDamage * 0.5];
        // 电击伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Electricity_Damage
        case "Electricity":
          return [vn, vv * this.electricityBaseDamage * 0.5];
      }
      return null;
    }).filter(Boolean) as [DamageType, number][];
  }

  /** 显示各触发参数 */
  get statusInfo() { return new StatusInfo(this.totalDmg, this.procChanceMap, this.procChance); }
  /** 触发总伤增幅倍率 */
  get procTotalDamageMul() { return hAccMul(this.critChanceMul, this.headShotDmgMul, this.overallMul, this.enemyDmgMul, this.procDamageMul); }

  /** 每发触发率 */
  get procChancePerHit() { return this.procChance; }
  /** 每秒触发率 */
  get procChancePerSecond() { return 1 - (1 - this.procChancePerHit) ** this.fireRate; }
  /** 平均状态量期望 */
  get averageProcQE() {
    let mergedMap = {}, asQE = 0;
    this.procChanceMap.forEach(v => {
      let k = v[0] === "Gas" ? "Toxin" : v[1];
      mergedMap[k] = hAccSum(mergedMap[k] || 0, v[1])
    });
    Object.keys(mergedMap).forEach(v => {
      asQE += mergedMap[v] * procDurationMap[v] * this.procDurationMul;
    });
    return asQE;
  }

  /** 面板基础伤害增幅倍率 */
  get panelBaseDamageMul() { return this.baseDamageMul; }
  /** 原平均爆头增伤倍率 */
  get oriHeadShotDmgMul() { return hAccMul(this.headShotChance, this.oriHeadShotMul - 1) + 1; }
  /** 平均爆头增伤倍率 */
  get headShotDmgMul() { return hAccMul(this.headShotChance, this.headShotMul - 1) + 1; }
  /** 面板伤害增幅倍率 */
  get panelDamageMul() { return hAccMul(this.panelBaseDamageMul, this.extraDmgMul); }
  /** 面板基础伤害 */
  get panelBaseDamage() { return hAccMul(this.originalDamage, this.panelBaseDamageMul); }
  /** 面板伤害 */
  get panelDamage() { return hAccMul(this.originalDamage, this.panelDamageMul); }
  /** 总伤增幅倍率 */
  get totalDamageMul() { return hAccMul(this.panelDamageMul, this.critDamageMul, this.headShotDmgMul, this.overallMul, this.enemyDmgMul); }
  /** 总伤害 */
  get totalDamage() { return hAccMul(this.originalDamage, this.totalDamageMul); }
  /** 原总伤害 */
  get oriTotalDamage() { return hAccMul(this.originalDamage, this.oriCritDamageMul, this.headShotDmgMul); }
  /** 基伤 触发计算中的基伤概念 包含多重暴击等 */
  get baseDamage() { return hAccMul(this.originalDamage, this.panelBaseDamageMul, this.critDamageMul, this.headShotDmgMul, this.overallMul, this.enemyDmgMul); }
  /** 毒DoT的基伤 */
  get toxinBaseDamage() { return hAccMul(this.baseDamage, 1 + this.toxinMul); }
  /** 火DoT的基伤 */
  get heatBaseDamage() { return hAccMul(this.baseDamage, 1 + this.heatMul); }
  /** 电DoT的基伤 */
  get electricityBaseDamage() { return hAccMul(this.baseDamage, 1 + this.electricityMul); }
  /** 攻速 */
  get fireRate() {
    let fr = hAccMul(this.weapon.fireRate, this.fireRateMul);
    // 攻速下限
    return fr < 0.05 ? 0.05 : fr;
  }
  /** 原平均暴击区增幅倍率 */
  get oriCritDamageMul() { return this.calcCritDamage(this.weapon.critChance, this.weapon.critMul, this.headShotChance, this.oriHeadShotMul); }

  protected _originalDamage: number;
  /** 武器原本伤害 */
  get originalDamage(): number {
    if (!this._originalDamage)
      this._originalDamage = this.weapon.dmg.reduce((a, b) => hAccSum(a, b[1]), 0);
    return this._originalDamage;
  }

  constructor(riven: RivenMod) {
    this.riven = riven;
  }
  // 额外参数
  protected _enemyDmgType = " ";
  /** 歧视伤害类型 */
  get enemyDmgType() {
    return this._enemyDmgType;
  }
  get enemyDmgTypeIndex() {
    return "GCIOS".indexOf(this._enemyDmgType);
  }
  /** 设置歧视伤害类型 */
  set enemyDmgType(value) {
    if (this._enemyDmgType !== value && "GCIOS".includes(value)) {
      this._enemyDmgType = value;
    }
  }

  /**
   * 计算暴击伤害
   * @param m 暴击率
   * @param n 暴击倍率
   * @param p 爆头几率 [=0]
   * @param v 爆头倍率 [=2]
   */
  calcCritDamage(m: number, n: number, p = 0, v = 2) {
    if (v != 2)
      return ((1 + (1 - v) * p) * (hAccMul(m, n - 1) + 1) + m * n * p * v) / (p + 1);
    if (p != 0)
      return hAccMul(m, n - 1) + 1 + 2 * m * n * p / (p + 1);
    return hAccMul(m, n - 1) + 1;//m * (n - 1) + 1;
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
    this._arcanes.forEach(arc => {
      this.applyProp(arc, arc.prop[0], arc.prop[1]);
    });
    this._buffs.forEach(buff => {
      _.forEachRight(buff.props, prop => this.applyProp(null, prop[0], prop[1]));
    });
    this._mods.forEach(mod => {
      // 后者优先 主要用于紫卡有多个元素词条时
      _.forEachRight(mod.props, prop => this.applyProp(mod, prop[0], prop[1]));
    });
    this.recalcElements();
  }

  /** 重置所有属性增幅器 */
  reset() {
    this._baseDamageMul = 1 + this.extraBaseDamage;
    this._extraDmgMul = 1;
    this._critChanceMul = 1;
    this._critMulMul = 1;
    this._critChanceAdd = 0;
    this._procChanceMul = 1;
    this._procDurationMul = 1;
    this._procDamageMul = 1;
    this._enemyDmgMul = [1, 1, 1, 1, 1];
    this._headShotMulMul = 1;
    this._fireRateMul = 1;
    this._heatMul = 0;
    this._coldMul = 0;
    this._toxinMul = 0;
    this._electricityMul = 0;
    this._impactMul = 0;
    this._punctureMul = 0;
    this._slashMul = 0;
    this.elementsOrder = [];
    this._combElementsOrder = [];
    this._extraProcChance = []
    this._overallMul = 1 + this.extraOverall;
    this._finalCritMulMul = 1;
    this._allEnemyDmgMul = 0;
    this.standaloneElements = [];
    this.recalcElements();
  }

  /** 清除所有MOD并重置属性增幅器 */
  clear() {
    this._mods = [];
    this.reset();
  }

  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    // 如果相应的P卡已经存在则不使用
    if (this._mods.some(v => v.id === mod.primed || (mod.primed && v.primed === mod.primed)))
      return false;
    // 只允许选择的元素
    if (this.allowElementTypes)
      if (mod.props.some(v => ExtraDmgSet.has(v[0])))
        if (!mod.props.some(v => this.allowElementTypes.includes(v[0])))
          return false;
    // 过滤一些需要前置MOD的MOD
    for (let i = 0; i < NormalCardDependTable.length; i++) {
      const depend = NormalCardDependTable[i];
      if (mod.id === depend[0]) {
        if (!this._mods.some(v => v.id === depend[1]))
          return false;
      }
    }
    return true;
  }

  /**
   * 返回MOD价值收益
   * @param index 也可以是mod.id
   * @return MOD价值收益 (-∞ ~ +∞ 小数)
   */
  modValue(index: number | string) {
    if (typeof index === "string")
      index = this._mods.findIndex(v => v.id === index);
    if (!this._mods[index]) return 0;
    let nb = new (this.constructor as any)(this.weapon, this.riven, this.options);
    nb._mods = this.mods;
    nb._buffs = this.buffs;
    nb._mods.splice(index, 1);
    let oldVal = this.compareDamage;
    nb.calcMods();
    let newVal = nb.compareDamage;
    return oldVal / newVal - 1;
  }

  /**
   * 返回BUFF价值收益
   * @param index 也可以是buff.id
   * @return MOD价值收益 (-∞ ~ +∞ 小数)
   */
  buffValue(index: number | string) {
    if (typeof index === "string")
      index = this._buffs.findIndex(v => v.data.id === index);
    if (!this._buffs[index]) return 0;
    let nb = new (this.constructor as any)(this.weapon, this.riven, this.options);
    nb._mods = this.mods;
    nb._buffs = this.buffs;
    nb._buffs.splice(index, 1);
    let oldVal = this.compareDamage;
    nb.calcMods();
    let newVal = nb.compareDamage;
    return oldVal / newVal - 1;
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
        case 'D':   // 伤害 baseDmg
        case 'K':   // 近战伤害 baseDmg
          return mod.props[0][1] / this._baseDamageMul;
        case '4':   // 火焰伤害 heatDmg
        case '5':   // 冰冻伤害 coldDmg
        case '6':   // 毒素伤害 toxiDmg
        case '7':   // 电击伤害 elecDmg
          return mod.props[0][1] / this._extraDmgMul;
        case '8':   // 冲击伤害 impaDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Impact");
          if (oriDmg)
            return mod.props[0][1] * oriDmg[1] / this.originalDamage / this._extraDmgMul;
          break;
        case '9':   // 穿刺伤害 puncDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Puncture");
          if (oriDmg)
            return mod.props[0][1] * oriDmg[1] / this.originalDamage / this._extraDmgMul;
          break;
        case 'A':   // 切割伤害 slasDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Slash");
          if (oriDmg)
            return mod.props[0][1] * oriDmg[1] / this.originalDamage / this._extraDmgMul;
          break;
        case 'G':     // 对Grineer伤害 grinDmg
          return this.enemyDmgType === "G" ? mod.props[0][1] / this._enemyDmgMul[0] : 0;
        case 'C':     // 对Corpus伤害 corpDmg
          return this.enemyDmgType === "C" ? mod.props[0][1] / this._enemyDmgMul[1] : 0;
        case 'I':     // 对Infested伤害 infeDmg
          return this.enemyDmgType === "I" ? mod.props[0][1] / this._enemyDmgMul[2] : 0;
        case 'od':     // 对堕落者伤害
          return this.enemyDmgType === "O" ? mod.props[0][1] / this._enemyDmgMul[3] : 0;
      }
    }
    // 通用方法
    let oldVal = this.compareDamage;
    this._mods.push(mod);
    this.calcMods();
    let newVal = this.compareDamage;
    this._mods.pop();
    this.calcMods();
    return newVal / oldVal - 1;
  }

  /**
   * 自动按武器属性填充MOD
   * @param slots 可用的插槽数
   * @param useRiven 是否使用紫卡 0 = 不用 1 = 自动选择 2 = 必须用
   */
  fill(slots = 8, useRiven = 0) {
    // 初始化
    this.clear();
    this.fillEmpty(slots, useRiven);
  }

  /**
   * 自动按武器属性填充MOD(不移除已有,使用特定卡库)
   * @param slots 可用的插槽数
   * @param useRiven 是否使用紫卡 0 = 不用 1 = 自动选择 2 = 必须用
   */
  fillEmpty(slots = 8, useRiven = 0, lib = this.avaliableMods, rivenLimit = 0) {
    // 根据武器自动选择所有可安装的MOD
    let mods = lib.filter(v => !this._mods.some(k => v.id === k.id && (v.id === "RIVENFAKE" ? v.props[0][0] === k.props[0][0] : true) || v.id === k.primed));
    let rivenCount = this._mods.reduce((a, b) => a + (b.id === "RIVENFAKE" ? 1 : 0), 0), rivenSlots = rivenLimit ? slots + rivenLimit - 1 : slots;
    if (useRiven > 0) {
      if (useRiven == 2)
        this.applyMod(this.riven.normalMod); // 1. 将紫卡直接插入
      else
        mods.push(this.riven.normalMod); // 1. 将紫卡作为一张普卡进行计算
    }
    let sortableMods = mods.map(v => [v, 0] as [NormalMod, number]);
    while (this._mods.length < rivenSlots && sortableMods.length > (rivenSlots - this._mods.length)) {
      // 2. 计算收益
      // console.log("开始计算收益: ", this._mods.length)
      sortableMods.forEach(v => {
        if (v[0].id === "RIVENFAKE" ? rivenCount >= rivenLimit : this._mods.length - rivenCount >= rivenSlots - rivenLimit)
          v[1] = -2;
        else
          v[1] = this.testMod(v[0]);
        // v[0].id === "RIVENFAKE" && console.log("测试收益: ", this._mods.map(v => v.name).join(","), v[0].props[0][1], v[0].name, "的收益是", v[1]);
      });
      // 3. 把所有卡按收益排序
      sortableMods.sort((a, b) => b[1] == a[1] ? b[0].name.localeCompare(a[0].name) : b[1] - a[1]);
      if (sortableMods.length > 0) {
        // console.log("计算收益最高值: ", sortableMods[0][0].name, "的收益是", sortableMods[0][1]);
        // 4. 将收益最高的一项插入并移出数组
        let expMod = sortableMods.shift()[0];
        if (expMod.id === "RIVENFAKE") rivenCount++;
        this.applyMod(expMod);
        // 5. 重复以上步骤直到卡槽充满
      }
    }
  }
  /**
   * 自动按武器属性生成最佳紫卡
   * 算法4.0
   * 1. 过滤紫卡属性
   * 2. 将紫卡属性作为虚拟MOD参与正常fill
   * 3. 返回最终结算结果的紫卡
   * @param slots 可用的插槽数
   */
  findBestRiven(slots = 8): RivenMod {
    let newBuild: ModBuild = new (this.constructor as any)(this.weapon, this.riven, this.options);
    let riven1 = this.findBestRivenSub(slots, 1),
      riven2 = this.findBestRivenSub(slots, 2);
    if (riven1.qrCode == riven2.qrCode) return riven1;
    let score1, score2;
    newBuild.riven = riven1;
    newBuild.fill(slots, 2);
    newBuild.calcMods();
    score1 = newBuild.compareDamage;
    newBuild.riven = riven2;
    newBuild.fill(slots, 2);
    newBuild.calcMods();
    score2 = newBuild.compareDamage;
    console.log("offset=1 紫卡:", riven1, "分数:", score1, "offset=2 紫卡:", riven2, "分数:", score2)
    return score1 > score2 ? riven1 : riven2;
  }
  findBestRivenSub(slots = 8, offset = 1): RivenMod {
    let newBuild: ModBuild = new (this.constructor as any)(this.weapon, this.riven, this.options);
    newBuild.fill(slots - offset, 0);
    // 生成所有紫卡
    // 1. 列出所有属性
    let upLevel = toUpLevel(4, true), negaUpLevel = toNegaUpLevel(4, true);
    let avaliableProps = RivenPropertyDataBase[this.riven.mod].filter(v => {
      if (v.noDmg) return false;
      if (["G", "I", "C", "O"].includes(v.id)) return this.enemyDmgType === v.id;
      if (this.allowElementTypes) {
        if (["4", "5", "6", "7", "8", "9", "A"].includes(v.id) && !this.allowElementTypes.includes(v.id))
          return false;
      } else if (["4", "5", "6", "8", "9", "A"].includes(v.id)) return false;
      return true;
    }).map(v => {
      let base = RivenDataBase.getPropBaseValue(this.riven.name, v.id) * upLevel;
      return new ValuedRivenProperty(v, base, base, upLevel);
    });
    // 负面属性
    let negativeProp = RivenPropertyDataBase[this.riven.mod].find(v => v.id === (this.weapon.id === "Vectis Prime" ? "L" : "H") || v.id === "U");
    let valuedNegativeProp = new ValuedRivenProperty(negativeProp,
      this.weapon.id === "Vectis Prime" ? -28 : RivenDataBase.getPropBaseValue(this.riven.name, negativeProp.id) * -negaUpLevel,
      RivenDataBase.getPropBaseValue(this.riven.name, negativeProp.id), upLevel);

    // 将属性虚拟成MOD
    let fakeMods = avaliableProps.map(v => ({
      key: "01",
      id: "RIVENFAKE",
      name: v.prop.sName,
      type: "",
      desc: "裂罅MOD",
      polarity: "r",
      cost: 18,
      rarity: "x",
      props: [[v.prop.id, v.value / 100]] as [string, number][],
    } as NormalMod));
    let rivenArea = this.avaliableMods.concat(fakeMods);
    // 将紫卡属性作为虚拟MOD参与正常fill
    newBuild.fillEmpty(slots, 0, rivenArea, 3);

    // 计算有紫卡属性后收益最低的mod 如果不是紫卡就去掉收益最低的紫卡再计算一次
    let valueList = newBuild._mods.map((_, i) => [i, newBuild.modValue(i)]).filter(v => newBuild._mods[v[0]].id === "RIVENFAKE");
    let removeAble = _.minBy(valueList, v => v[1]);
    // console.log("去掉该卡", newBuild._mods[removeAble[0]].name);
    newBuild._mods.splice(removeAble[0], 1);
    newBuild.calcMods();
    newBuild.fillEmpty(slots, 0, fakeMods, 3);
    // 结算 生成紫卡
    let resultProps = newBuild.mods.filter(v => v.id === "RIVENFAKE").map(v => new ValuedRivenProperty(RivenDataBase.getPropByName(v.props[0][0]), v.props[0][1] * 100, v.props[0][1] * 100, 1));
    // console.log(newBuild.mods.map(v => v.name).join(","));
    let newRiven = new RivenMod(this.riven);
    newRiven.properties = resultProps;
    newRiven.properties.push(valuedNegativeProp);
    newRiven.upLevel = upLevel;
    newRiven.rank = 16;
    newRiven.subfix = "";
    newRiven.recycleTimes = 999;
    newRiven.hasNegativeProp = true;
    return newRiven;
  }
  /**
   * [已废弃]自动按武器属性生成最佳紫卡
   * 算法2.0 介绍 精度最高但效率太低: (复杂度: O(n!))
   * 1. 过滤紫卡属性
   * 2. 生成所有紫卡
   * 3. 计算所有紫卡的配置
   * 4. 返回收益最高的配置的紫卡
   * @param slots 可用的插槽数
   */
  findBestRiven2(slots = 8): RivenMod {
    let newBuild: ModBuild = new (this.constructor as any)(this.weapon, this.riven, this.options);
    // 生成所有紫卡
    // 1. 列出所有属性
    let upLevel = toUpLevel(4, true), negaUpLevel = toNegaUpLevel(3, true);
    let avaliableProps = RivenPropertyDataBase[this.riven.mod].filter(v => {
      if (v.noDmg) return false;
      if (!this.enemyDmgType && ["G", "I", "C", "O"].includes(v.id)) return false;
      if (this.allowElementTypes) {
        if (["4", "5", "6", "7", "8", "9", "A"].includes(v.id))
          if (!this.allowElementTypes.includes(v.id))
            return false;
      } else if (["4", "5", "6"].includes(v.id)) {
        return false;
      }
      return true;
    }).map(v => {
      let base = RivenDataBase.getPropBaseValue(this.riven.name, v.id) * upLevel;
      return new ValuedRivenProperty(v, base, base, upLevel);
    });
    let propsOfMods = choose(avaliableProps, 3);  // 只用三条属性 代表3+1-
    // 负面属性
    let negativeProp = RivenPropertyDataBase[this.riven.mod].find(v => v.id === (this.riven.id === "Vectis Prime" ? "L" : "H") || v.id === "U");
    let valuedNegativeProp = new ValuedRivenProperty(negativeProp, RivenDataBase.getPropBaseValue(this.riven.name, negativeProp.id) * -negaUpLevel, RivenDataBase.getPropBaseValue(this.riven.name, negativeProp.id), upLevel);

    let newRivens = propsOfMods.map(v => {
      let newRiven = new RivenMod(this.riven);
      newRiven.properties = v;
      newRiven.properties.push(valuedNegativeProp);
      newRiven.upLevel = 1;
      newRiven.rank = 16;
      newRiven.subfix = "";
      newRiven.recycleTimes = 999;
      newRiven.hasNegativeProp = true;
      return newRiven;
    });
    let bestRiven = _.maxBy(newRivens, v => {
      newBuild.riven = v;
      newBuild.fill(slots, 2);
      return newBuild.compareDamage;
    });
    return bestRiven;
  }
  /**
   * 应用通用属性
   * @param mod MOD
   * @param pName 属性id或名称
   * @param pValue 属性值
   */
  applyProp(mod: NormalMod | Arcane, pName: string, pValue: number) {
    let oriDmg: [string, number];
    switch (pName) {
      case '0': /* 暴击率 critChance */ this._critChanceMul = hAccSum(this._critChanceMul, pValue); break;
      case '1': /* 暴击伤害 critMul */ this._critMulMul = hAccSum(this._critMulMul, pValue); break;
      case '2': /* 触发几率 procChance */ this._procChanceMul = hAccSum(this._procChanceMul, pValue); break;
      case '3': /* 触发时间 procDuration */ this._procDurationMul = hAccSum(this._procDurationMul, pValue); break;
      case '4': /* 火焰伤害 heatDmg */ this.heatMul = hAccSum(this.heatMul, pValue); break;
      case '5': /* 冰冻伤害 coldDmg */ this.coldMul = hAccSum(this.coldMul, pValue); break;
      case '6': /* 毒素伤害 toxinDmg */ this.toxinMul = hAccSum(this.toxinMul, pValue); break;
      case '7': /* 电击伤害 electricityDmg */ this.electricityMul = hAccSum(this.electricityMul, pValue); break;
      case '8': /* 冲击伤害 impaDmg */ this.impactMul = hAccSum(this.impactMul, pValue); break;
      case '9': /* 穿刺伤害 puncDmg */ this.punctureMul = hAccSum(this.punctureMul, pValue); break;
      case 'A': /* 切割伤害 slasDmg */ this.slashMul = hAccSum(this.slashMul, pValue); break;
      case 'G': /* 对Grineer伤害 grinDmg */ this._enemyDmgMul[0] = hAccSum(this._enemyDmgMul[0], pValue); break;
      case 'C': /* 对Corpus伤害 corpDmg */ this._enemyDmgMul[1] = hAccSum(this._enemyDmgMul[1], pValue); break;
      case 'I': /* 对Infested伤害 infeDmg */ this._enemyDmgMul[2] = hAccSum(this._enemyDmgMul[2], pValue); break;
      case 'od': /* 对堕落者伤害 */ this._enemyDmgMul[3] = hAccSum(this._enemyDmgMul[3], pValue); break;
      case 'smd': /* 对Sentient伤害 */ this._enemyDmgMul[4] = hAccSum(this._enemyDmgMul[4], pValue); break;
      case 'hm': /* 爆头伤害 headShotMul */ this._headShotMulMul = hAccSum(this._headShotMulMul, pValue); break;
      case 'da': /* 正中红心 overallMul */
      case 'oad': /* 全局伤害 overallMul */ this._overallMul = hAccMul(this._overallMul, 1 + pValue); break;
      case 'sd': /* 触发伤害 procDamageMul */ this._procDamageMul = hAccMul(this._procDamageMul, 1 + pValue); break;
      case 'fcd': /* 最终暴伤 finalCritMulMul */ this._finalCritMulMul = hAccMul(this._finalCritMulMul, 1 + pValue); break;
      case 'eca': /* 加法暴击 critChanceAdd */ this._critChanceAdd = hAccSum(this._critChanceAdd, pValue); break;
      case 'dmg': /* 伤害 baseDamageMul */ this._baseDamageMul = hAccSum(this._baseDamageMul, pValue); break;
      case 'erd': /* 辐射伤害 */ this.applyStandaloneElement("Radiation", pValue); break;
      case 'ecd': /* 腐蚀伤害 */ this.applyStandaloneElement("Corrosive", pValue); break;
      case 'eed': /* 电击伤害 */ this.electricityMul = hAccSum(this.electricityMul, pValue); break;
      case 'efd': /* 火焰伤害 */ this.heatMul = hAccSum(this.heatMul, pValue); break;
      case 'aed': /* 对全种族伤害 allEnemyDmgMul */ this._allEnemyDmgMul = hAccSum(this._allEnemyDmgMul, pValue); break;
      default:
    }
  }
  /**
   * 添加独立元素
   * @param vn 属性名称
   * @param vv 属性值
   */
  applyStandaloneElement(vn: string, vv: number) {
    let idx = this.standaloneElements.findIndex(v => v[0] === vn);
    if (idx >= 0) {
      this.standaloneElements[idx][1] = hAccSum(this.standaloneElements[idx][1], vv);
    } else {
      this.standaloneElements.push([vn, vv]);
    }
  }
}
