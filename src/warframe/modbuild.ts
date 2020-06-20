import { cloneDeep, map, clone, chunk, forEachRight, compact, minBy, maxBy } from "lodash-es";
import { choose } from "./util";
import { base62, debase62 } from "./lib/base62";
import { procDurationMap, SpecialStatusInfo } from "./status";
import {
  Weapon,
  NormalMod,
  RivenDatabase,
  Buff,
  Enemy,
  EnemyTimelineState,
  BuffList,
  Codex,
  CombElementMap,
  Damage2_0,
  DamageType,
  ExtraDmgSet,
  NormalCardDependTable,
  RivenPropertyDataBase,
  SimpleDamageModel,
  WeaponBuildMode,
  MainTag,
} from "./codex";
import { RivenMod, toUpLevel, toNegaUpLevel, ValuedRivenProperty } from "./rivenmod";
import { HH } from "@/var";
import { CommonBuild } from "./commonbuild";

export type StatusInfo = { [key: string]: SpecialStatusInfo };

// 基础类
export abstract class ModBuild implements CommonBuild {
  // ### 变量 ###

  public abstract weapon: Weapon;
  public riven: RivenMod;
  protected _modeIndex = 0;
  protected _mode: WeaponBuildMode;
  get modeName() {
    return this.mode.name;
  }
  set modeName(value: string) {
    this._mode = this.weapon.getMode(value);
    this.recalcElements();
  }
  get modeIndex() {
    return this._modeIndex;
  }
  set modeIndex(value: number) {
    this._modeIndex = value;
    this._mode = this.weapon.getMode(value);
    this.recalcElements();
  }
  get mode() {
    return this._mode;
  }

  /** 所有适用的MOD */
  protected avaliableMods: NormalMod[] = [];
  protected _rawmods: NormalMod[] = [];
  protected _mods: NormalMod[] = [];
  protected _buffs: Buff[] = [];

  /** 配置id */
  get id() {
    return this.weapon.name;
  }
  /** 基本id */
  get baseId() {
    return this.weapon.baseName;
  }
  /** 标签 */
  get tags() {
    return this.weapon.tags.toArray();
  }
  /** 类型 */
  get type() {
    return MainTag[this.weapon.mod];
  }
  /** 原型MOD列表 */
  get rawMods() {
    return this._rawmods;
  }
  /** MOD列表 */
  get mods() {
    return cloneDeep(this._mods);
  }
  /** filtered mods */
  get vmods() {
    return this.mods.filter(Boolean);
  }
  set mods(value) {
    this._rawmods = cloneDeep(value);
    this._mods = this.mapRankUpMods(value);
    this.calcMods();
    this.fastMode || this.recalcPolarizations();
  }
  /** 加成列表 */
  get buffs() {
    return cloneDeep(this._buffs);
  }
  set buffs(value) {
    this._buffs = cloneDeep(value);
    this.calcMods();
  }

  // ### 属性 ###
  protected _baseDamageMul = 100;
  protected _extraDmgMul = 100;
  protected _critChanceMul = 100;
  protected _critChanceAdd = 0;
  protected _critWhenHeadshotAdd = 0;
  protected _critMulMul = 100;
  protected _procChanceMul = 100;
  protected _procChanceAdd = 0;
  protected _procDurationMul = 100;
  protected _procDamageMul = 100;
  protected _enemyDmgMul = [100, 100, 100, 100, 100];
  protected _fireRateMul = 100;
  protected _headShotMulMul = 100;
  protected _overallMul = 100;
  protected _finalCritMulMul = 100;
  protected _allEnemyDmgMul = 0;
  protected _multishotMul = 100;
  protected _critChanceLock = -100;
  protected _finalSpeedMul = 100;
  protected _initialDamageMul = 100;

  protected _extraProcChance: [string, number][] = [];
  protected _statusInfo: StatusInfo = null;
  /** 快速模式 */
  fastMode = false;

  /** 总攻速(狂战士) */
  get finalSpeedMul() {
    return this._finalSpeedMul / 100;
  }
  /** 基伤增幅倍率 */
  get baseDamageMul() {
    return this._baseDamageMul / 100;
  }
  /** 额伤增幅倍率 */
  get extraDmgMul() {
    return this._extraDmgMul / 100;
  }
  /** 暴击率增幅倍率 */
  get critChanceMul() {
    return this._critChanceMul / 100;
  }
  /** 加法暴击率增幅倍率 */
  get critChanceAdd() {
    return this._critChanceAdd / 100;
  }
  /** 爆头加法暴击率增幅倍率 */
  get critWhenHeadshotAdd() {
    return this._critWhenHeadshotAdd / 100;
  }
  /** 暴击伤害增幅倍率 */
  get critMulMul() {
    return this._critMulMul / 100;
  }
  /** 触发几率增幅倍率 */
  get procChanceMul() {
    return this._procChanceMul / 100;
  }
  /** 加法触发几率增幅倍率 */
  get procChanceAdd() {
    return this._procChanceAdd / 100;
  }
  /** 触发时间增幅倍率 */
  get procDurationMul() {
    return this._procDurationMul / 100;
  }
  /** 触发伤害增幅倍率 */
  get procDamageMul() {
    return (this.enemyDmgMul * this._procDamageMul) / 100;
  }
  /** 全种族伤害增幅倍率 */
  get allEnemyDmgMul() {
    return this._allEnemyDmgMul / 100;
  }
  /** 种族伤害增幅倍率 */
  get enemyDmgMul() {
    if (this.enemyDmgTypeIndex >= 0)
      return this.allEnemyDmgMul + (this._enemyDmgMul[this.enemyDmgTypeIndex] <= 0 ? 0 : this._enemyDmgMul[this.enemyDmgTypeIndex] / 100);
    else return this.allEnemyDmgMul + 1;
  }
  /** 攻速增幅倍率 */
  get fireRateMul() {
    return this._fireRateMul / 100;
  }
  /** 爆头倍率增幅倍率 */
  get headShotMulMul() {
    return this._headShotMulMul / 100;
  }
  /** 全局伤害增幅倍率 */
  get overallMul() {
    return this._overallMul / 100;
  }
  /** 全局暴击伤害增幅倍率 */
  get finalCritMulMul() {
    return this._finalCritMulMul / 100;
  }
  /** 额外触发几率 */
  get extraProcChance() {
    return this._extraProcChance.map(v => [v[0], v[1] / 100] as [string, number]);
  }
  /** 弹片数 */
  get pellets() {
    return this.mode.pellets || 1;
  }
  /** 空占比 */
  get dutyCycle() {
    return 0;
  }
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
  /** 爆发取样大小 */
  burstSampleSize = 0;

  private _headShotChance = 0;
  /** 爆头概率 */
  get headShotChance() {
    return this._headShotChance;
  }
  set headShotChance(value) {
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    this._headShotChance = value;
  }

  private _compareMode: number = 0;
  /** 对比模式 */
  get compareMode(): number {
    return this._compareMode;
  }
  set compareMode(value: number) {
    this._compareMode = value;
  }

  // 修改武器基础数据

  // abs-extra prop
  _absExtra: [string, number][] = [];
  // rel-extra prop
  _relExtra: [string, number][] = [];
  // 物理转伤
  _physicalConv: [string, number][] = [];
  // 虚空转伤
  _voidConvs: [string, number][] = [];

  /** 武器原本伤害增幅倍率 */
  get initialDamageMul() {
    return this._initialDamageMul / 100;
  }

  /** 武器原本伤害 */
  get initialDamage() {
    if (this.initialDamageMul === 1 && !this._absExtra.length && !this._relExtra.length) {
      this._originalDamage = 0;
      return this.mode.damage;
    }
    let dmg = map(this.mode.damage, ([n, v]) => [n, v * this.initialDamageMul] as [string, number]);
    const base = dmg.reduce((r, v) => ((r += v[1]), r), 0);
    if (this._relExtra.length) dmg = dmg.concat(this._relExtra.map(([n, v]) => [n, (v * base) / 100]));
    if (this._absExtra.length) dmg = dmg.concat(this._absExtra);
    this._originalDamage = 0;
    return dmg;
  }

  protected _target: Enemy;
  /** 打击目标 */
  get target() {
    return this._target;
  }
  set target(value) {
    this.enemyDmgType = value ? "TGCIOSW"[value.faction] : " ";
    this._target = value;
  }

  abstract getTimeline(limit?: number): EnemyTimelineState[];

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
    let normal = mods.map(v => (v && v.key + (v.level !== v.maxLevel ? "@" + base62(v.level) : "")) || "00").join("");
    let buffseq = this.buffs.map(v => `_${v.data.id}:${v.powerEnable && v.power ? base62(v.power * 10) : ""}${v.layerEnable ? ":" + v.layer : ""}`).join("");
    if (this.riven && mods.some(v => v && v.key === "01") && this.riven.properties.length > 1) return normal + this.riven.qrCodeBase64 + buffseq;
    if (normal === "0000000000000000") return buffseq;
    else return normal + buffseq;
  }

  set miniCode(code: string) {
    if (code.startsWith("!") || code.startsWith("_")) code = "0000000000000000" + code;
    let normal = code.match(/..(?:@.)?/g).slice(0, 8);
    let subPart = code.substr(normal.join("").length);
    let buffIdx = subPart.indexOf("_");
    if (buffIdx < 0) buffIdx = subPart.indexOf("!");
    let riven = buffIdx >= 0 ? subPart.substr(0, buffIdx) : subPart;
    let buffseq = subPart.substr(buffIdx + 1);
    let bufflist = [];
    buffseq.split(/[!_]/g).forEach(buff => {
      let w = buff.split(":");
      let bdata = BuffList.find(v => v.id === w[0]);
      if (bdata) {
        let newBuff = new Buff(bdata);
        if (w[1]) newBuff.power = debase62(w[1]) / 10;
        if (w[2]) newBuff.layer = +w[2];
        bufflist.push(newBuff);
      }
    });
    this.riven = riven && new RivenMod(riven, true);
    let mods = normal.map(v => {
      let key = v.substr(0, 2),
        level = v.substr(3, 4);
      let mod = v === "01" ? this.riven.normalMod(this.weapon) : cloneDeep(Codex.getNormalMod(key));
      if (level) mod.level = debase62(level);
      return mod;
    });
    this._mods = mods;
    this._buffs = bufflist;
    this.calcMods();
    this.fastMode || this.recalcPolarizations();
  }

  get miniCodeURL() {
    return this.miniCode ? `https://${HH}/weapon/${this.weapon.url}/${this.miniCode}` : `https://${HH}/weapon/${this.weapon.url}`;
  }

  get critChanceLock() {
    return this._critChanceLock / 100;
  }
  /** 暴击率 */
  get critChance() {
    if (this.critChanceLock != -1) return this.critChanceLock;
    return Math.max(0, this.mode.critChance * this.critChanceMul + this.critChanceAdd + this.headShotChance * this.critWhenHeadshotAdd);
  }
  /** 暴击倍率 */
  get critMul() {
    return this.mode.critMul * this.critMulMul * this.finalCritMulMul;
  }
  /** 平均暴击区增幅倍率 */
  get critDamageMul() {
    return this.calcCritDamage(this.critChance, this.critMul);
  }
  /** 平均暴击区增幅倍率(暴击向下取整) */
  get critDamageMulFloor() {
    return this.calcCritDamage(Math.floor(this.critChance), this.critMul);
  }
  /** 平均暴击区增幅倍率(暴击向上取整) */
  get critDamageMulCeil() {
    return this.calcCritDamage(Math.ceil(this.critChance), this.critMul);
  }

  /** 元素顺序 */
  elementsOrder: string[] = [];
  protected _heatMul = 0;
  /** 火焰伤害增幅倍率 */
  public get heatMul() {
    return this._heatMul / 100;
  }
  public set heatMul(value) {
    this._heatMul = value;
    this.elementsOrder.includes("Heat") || this.elementsOrder.push("Heat");
  }
  protected _coldMul = 0;
  /** 冰冻伤害增幅倍率 */
  public get coldMul() {
    return this._coldMul / 100;
  }
  public set coldMul(value) {
    this._coldMul = value;
    this.elementsOrder.includes("Cold") || this.elementsOrder.push("Cold");
  }
  protected _toxinMul = 0;
  /** 毒素伤害增幅倍率 */
  public get toxinMul() {
    return this._toxinMul / 100;
  }
  public set toxinMul(value) {
    this._toxinMul = value;
    this.elementsOrder.includes("Toxin") || this.elementsOrder.push("Toxin");
  }
  protected _electricityMul = 0;
  /** 电击伤害增幅倍率 */
  public get electricityMul() {
    return this._electricityMul / 100;
  }
  public set electricityMul(value) {
    this._electricityMul = value;
    this.elementsOrder.includes("Electricity") || this.elementsOrder.push("Electricity");
  }
  private _impactMul = 0;
  /** 穿刺伤害增幅倍率 */
  public get impactMul() {
    return this._impactMul / 100;
  }
  public set impactMul(value) {
    this._impactMul = value;
  }
  private _punctureMul = 0;
  /** 冲击伤害增幅倍率 */
  public get punctureMul() {
    return this._punctureMul / 100;
  }
  public set punctureMul(value) {
    this._punctureMul = value;
  }
  private _slashMul = 0;
  /** 切割伤害增幅倍率 */
  public get slashMul() {
    return this._slashMul / 100;
  }
  public set slashMul(value) {
    this._slashMul = value;
  }
  /** 所有元素增幅倍率 */
  public get elementsMul() {
    return {
      Heat: this.heatMul,
      Cold: this.coldMul,
      Toxin: this.toxinMul,
      Electricity: this.electricityMul,
      Impact: this.impactMul,
      Puncture: this.punctureMul,
      Slash: this.slashMul,
    };
  }
  /** 独立元素 */
  public standaloneElements: [string, number][] = [];

  private _combElementsOrder: [string, number][] = [];
  /** 复合元素顺序 */
  public get combElementsOrder(): [string, number][] {
    if (!this._combElementsOrder.length) this.recalcElements();
    return this._combElementsOrder;
  }

  /** 重新计算元素顺序 */
  recalcElements() {
    this._extraDmgMul = this._heatMul + this._coldMul + this._toxinMul + this._electricityMul;
    let eleOrder = clone(this.elementsOrder),
      otherOrder = [],
      eleMul = this.elementsMul;
    let oridmg = this.initialDamage;
    if (this._voidConvs.length > 0) {
      let extraDmg = [];
      oridmg = oridmg.map(([vn, vv]) => {
        if (vn === "Void") {
          this._voidConvs.forEach(([cn, cv]) => {
            extraDmg.push([cn, (vv * cv) / 100]);
            vv = (vv * (100 - cv)) / 100;
          });
        }
        return [vn, vv] as [string, number];
      });
      extraDmg.forEach(([vn, vv]) => {
        let i = oridmg.findIndex(v => v[0] === vn);
        if (i >= 0) oridmg[i][1] += vv;
        else oridmg.push([vn, vv]);
      });
      oridmg = oridmg.filter(v => v[1]);
    }
    if (this._physicalConv.length > 0) {
      let extraDmg = [];
      oridmg = oridmg.map(([vn, vv]) => {
        if (["Impact", "Puncture", "Slash"].includes(vn)) {
          this._physicalConv.forEach(([cn, cv]) => {
            extraDmg.push([cn, (vv * cv) / 100]);
            vv = (vv * (100 - cv)) / 100;
          });
        }
        return [vn, vv] as [string, number];
      });
      extraDmg.forEach(([vn, vv]) => {
        let i = oridmg.findIndex(v => v[0] === vn);
        if (i >= 0) oridmg[i][1] += vv;
        else oridmg.push([vn, vv]);
      });
      oridmg = oridmg.filter(v => v[1]);
    }
    // 计算武器原本属性
    oridmg.forEach(([vn, vv]) => {
      let eMul = vn in eleMul ? eleMul[vn] + 1 : 1; // 1是复合属性
      let totalMul = vv / this.originalDamage;
      switch (vn) {
        // 单元素组合
        case "Heat":
        case "Cold":
        case "Toxin":
        case "Electricity":
          this._extraDmgMul = this._extraDmgMul + totalMul * 100;
          eleMul[vn] = eleMul[vn] + totalMul;
          eleOrder.includes(vn) || eleOrder.push(vn);
          break;
        // 物理
        case "Impact":
        case "Puncture":
        case "Slash":
          totalMul = (eMul > 0 ? eMul : 0) * totalMul;
        default:
          this._extraDmgMul = this._extraDmgMul + totalMul * 100;
          otherOrder.push([vn, totalMul]);
          break;
      }
    });
    let combs = chunk(eleOrder, 2);
    // 复合元素合成
    let tmpCombs = combs.map(comb => {
      if (comb.length > 1) {
        let combElement = CombElementMap[comb.sort().join("+")];
        let etype = Damage2_0.getDamageType(combElement);
        return [etype.id, eleMul[etype.combinedBy[0]] + eleMul[etype.combinedBy[1]]] as [string, number];
      } else {
        return [comb[0], eleMul[comb[0]]] as [string, number];
      }
    });
    // 将独立元素合并或加入到元素列表中
    this.standaloneElements.forEach(([vn, vv]) => {
      this._extraDmgMul = this._extraDmgMul + vv * 100;
      let idx = tmpCombs.findIndex(v => v[0] === vn);
      if (idx >= 0) {
        tmpCombs[idx][1] = tmpCombs[idx][1] + vv;
      } else {
        tmpCombs.push([vn, vv]);
      }
    });
    this._combElementsOrder = tmpCombs.concat(otherOrder);
  }
  /** 重新计算触发信息 */
  recalcStatusInfo() {
    let dotMap = new Map(this.dotBaseDamageMap as [string, number][]);
    let pwAll = this.procChanceMap.reduce((a, b) => a + b[1], 0);
    this._statusInfo = {};
    const { pellets, fireRate, dutyCycle } = this;
    const hits = this.weapon.tags.has("Continuous") ? 1 : pellets;
    this.procChanceMap.forEach(([vn, vv]) => {
      if (vv <= 0) return;
      let dur = procDurationMap[vn] * this.procDurationMul;
      let durTick = Math.max(0, ~~dur) + 1;
      let cor = Math.min(1, Math.max(vv * hits * fireRate * dur, 0));
      this._statusInfo[vn] = {
        proportion: vv / pwAll,
        duration: dur,
        coverage: cor,
      };
      if (pellets !== 1) this._statusInfo[vn].appearRate = vv;
      // [腐蚀 磁力]
      if (vn === "Corrosive" || vn === "Magnetic") {
        this._statusInfo[vn].procPerHit = vv * hits;
        this._statusInfo[vn].procPerSecond = vv * hits * fireRate;
      } else {
        this._statusInfo[vn].appearRatePerHit = 1 - (1 - vv) ** hits;
        this._statusInfo[vn].appearRatePerSecond = 1 - (1 - vv) ** (hits * fireRate);
      }
      if (vn === "Slash" || vn === "Toxin" || vn === "Gas" || vn === "Electricity" || vn === "Heat") {
        let dd = dotMap.get(vn);
        // [切割 毒 毒气 电]
        if (vn !== "Heat") {
          let id = vn === "Gas" ? dotMap.get("Toxin") : dd;
          if (hits !== 1) this._statusInfo[vn].instantProcDamage = (id + dd) / hits;
          this._statusInfo[vn].instantProcDamagePerHit = id + dd;
          this._statusInfo[vn].instantProcDamagePerSecond = (id + dd) * fireRate;
        }
        // [切割 毒 毒气]
        if (vn !== "Electricity" && vn !== "Heat") {
          let id = vn === "Gas" ? dotMap.get("Toxin") : 0;
          if (hits !== 1) this._statusInfo[vn].latentProcDamage = id + (dd / hits) * durTick;
          this._statusInfo[vn].latentProcDamagePerHit = id + dd * durTick;
          this._statusInfo[vn].latentProcDamagePerSecond = id + dd * fireRate * durTick;
        }
        // [切割 毒 毒气 火]
        if (vn === "Heat") {
          if (hits !== 1) this._statusInfo[vn].averageProcDamage = (cor * dd) / hits;
          this._statusInfo[vn].averageProcDamagePerHit = cor * dd;
          this._statusInfo[vn].averageProcDamagePerSecond = cor * dd * fireRate;
        } else if (vn !== "Electricity") {
          if (hits !== 1) this._statusInfo[vn].averageProcDamage = ((vv * dd) / hits) * durTick * (1 - dutyCycle);
          this._statusInfo[vn].averageProcDamagePerHit = vv * dd * durTick * (1 - dutyCycle);
          this._statusInfo[vn].averageProcDamagePerSecond = vv * dd * fireRate * durTick * (1 - dutyCycle);
        }
      }
    });
  }

  /** 显示各触发参数 */
  get statusInfo() {
    return this._statusInfo;
  }

  /** 通用各触发参数 */
  get commonStatusInfo() {
    return {
      averageProcQE: this.averageProcQE,
      appearRate: this.realProcChance,
      appearRatePerHit: this.procChancePerHit,
      appearRatePerSecond: this.procChancePerSecond,
    };
  }

  /** 所有伤害 */
  get totalDmg() {
    return this.baseDmg.map(([i, v]) => [i, (v * this.totalDamage) / this.extraDmgMul]).filter(v => v[1] > 0) as [string, number][];
  }
  /** 无模型所有伤害 */
  get totalDmgRaw() {
    return this.baseDmg.map(([i, v]) => [i, (v * this.totalDamageRaw) / this.extraDmgMul]).filter(v => v[1] > 0) as [string, number][];
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
      if (rst[targetElement]) rst[targetElement] = rst[targetElement] + dpart;
      else rst[targetElement] = dpart;
    });
    return map(rst, (v, i) => [i, +v]) as [string, number][];
  }

  /** 模型护甲数值 */
  get modelArmor() {
    return this._damageModel ? this._damageModel.currentArmor : 0;
  }
  set modelArmor(value) {
    if (this._damageModel) this._damageModel.currentArmor = value;
  }
  protected _damageModel: SimpleDamageModel = null; // new SimpleDamageModel(DamageModelList[0], this.modelArmor)
  /** 伤害模型 */
  get damageModel() {
    return this._damageModel;
  }
  set damageModel(value) {
    this._damageModel = value;
    this.enemyDmgType = value && value.faction ? "TGCIOS"[value.faction] : this.enemyDmgType;
    this.recalcStatusInfo();
  }
  /** 所有伤害类型面板 */
  get dmgRaw() {
    return this.baseDmg.map(([i, v]) => [i, v * this.panelBaseDamage]).filter(v => v[1] > 0) as [string, number][];
  }
  /** 真实伤害模型映射输出 */
  get dmg() {
    if (this.damageModel)
      return this.damageModel.mapDamage(this.dmgRaw, this.critChance, this.weapon.tags.has("Sniper") ? 300 : 300 / this.fireRate) as [string, number][];
    return this.dmgRaw;
  }
  /** 真实伤害模型映射输出(暴击向下取整) */
  get dmgFloor() {
    if (this.damageModel)
      return this.damageModel.mapDamage(this.dmgRaw, Math.floor(this.critChance), this.weapon.tags.has("Sniper") ? 300 : 300 / this.fireRate) as [
        string,
        number
      ][];
    return this.dmgRaw;
  }
  /** 真实伤害模型映射输出(暴击向上取整) */
  get dmgCeil() {
    if (this.damageModel)
      return this.damageModel.mapDamage(this.dmgRaw, Math.ceil(this.critChance), this.weapon.tags.has("Sniper") ? 300 : 300 / this.fireRate) as [
        string,
        number
      ][];
    return this.dmgRaw;
  }

  // ### 额外参数 ###
  allowElementTypes: string[] = null;
  useStatus = false;

  /** 连击层数 */
  comboLevel = 0;
  /** 设置连击数 */
  set comboCount(value: number) {
    this.comboLevel = (value / 20) | 0 || 1;
  }

  // ### 计算属性 ###
  /** 原爆头倍率 */
  get oriHeadShotMul() {
    if (this.target) return this.target.headMul;
    return 2;
  }
  /** 爆头倍率 */
  get headShotMul() {
    return this.oriHeadShotMul * this.headShotMulMul;
  }

  /** 触发几率 */
  get procChance() {
    const s = ~~this.realProcChance + 1 - (1 - (this.realProcChance % 1)) ** this.pellets;
    return s < 0 ? 0 : s;
  }
  /** 真实触发几率 */
  get realProcChance() {
    let s = this.oriRealProcChance * this.procChanceMul;

    if (this.procChanceAdd) {
      const nc = 1 - (1 - s) ** this.pellets + this.procChanceAdd;
      s = 1 - (1 - nc) ** (1 / this.pellets);
    }
    return s < 0 ? 0 : s;
  }

  get oriRealProcChance() {
    // TODO: 临时 需更新data
    // const s = this.mode.procChance / this.mode.pellets;
    // const hasMulti = this.weapon.modes.some(v => v.pellets > 1);
    // return hasMulti ? s * 3 : s;
    return this.mode.procChance;
  }

  /** 触发权重 */
  get procWeights() {
    let pw = this.baseDmg.map(([vn, vv]) => [vn, vv]) as [string, number][];
    let pwT = pw.reduce((a, b) => a + b[1], 0);
    let rst = pw.map(([vn, vv]) => [vn, vv / pwT] as [string, number]);
    return rst;
  }

  /** 真实触发几率(各属性) */
  get procChanceMap(): [string, number][] {
    let pC = this.realProcChance;
    let pW = this.procWeights;
    // 将触发率乘权重
    let opM = pW.map(([vn, vv]) => [vn, vv * pC]) as [string, number][];
    // 加上额外触发率 (为了支持猎人切)
    if (this.extraProcChance.length > 0) {
      this.extraProcChance.forEach(([vn, vv]) => {
        let cp = opM.find(v => v[0] === vn);
        if (cp) cp[1] = cp[1] + vv;
        else opM.push([vn, vv]);
      });
    }
    // 防止触发率溢出
    // let totalChance = opM.reduce((a, b) => a + b[1], 0);
    // if (totalChance > 1) return opM.map(([vn, vv]) => [vn, vv / totalChance]) as [string, number][];
    return opM;
  }

  /** 无多重触发基伤(各属性) */
  get dotBaseDamageMap() {
    let procs = [
      // 切割伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Slash_Damage
      ["Slash", this.slashBaseDamage * this.procDamageMul],
      // 毒素伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Toxin_Damage
      ["Toxin", this.toxinBaseDamage * this.procDamageMul],
      // 毒气伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Gas_Damage
      ["Gas", this.gasBaseDamage * this.procDamageMul * this.enemyDmgMul],
      // 火焰伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Heat_Damage
      ["Heat", this.heatBaseDamage * this.procDamageMul],
      // 电击伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Electricity_Damage
      ["Electricity", this.electricityBaseDamage * this.procDamageMul],
    ] as [DamageType, number][];
    if (this.damageModel) return this.damageModel.mapProcDamage(procs);
    return procs;
  }
  /** 无多重触发伤害(各属性) */
  get dotDamageMap() {
    let procs = this.procChanceMap;
    return procs
      .map(([vn, vv]) => {
        switch (vn) {
          // 切割伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Slash_Damage
          case "Slash":
            return [vn, vv * this.slashBaseDamage];
          // 毒素伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Toxin_Damage
          case "Toxin":
            return [vn, vv * this.toxinBaseDamage];
          // 毒气伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Gas_Damage
          case "Gas":
            return [vn, vv * this.gasBaseDamage];
          // 火焰伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Heat_Damage
          case "Heat":
            return [vn, vv * this.heatBaseDamage];
          // 电击伤害: https://warframe.huijiwiki.com/wiki/Damage_2.0/Electricity_Damage
          case "Electricity":
            return [vn, vv * this.electricityBaseDamage];
        }
        return null;
      })
      .filter(Boolean) as [DamageType, number][];
  }
  /** 每发触发率 */
  get procChancePerHit() {
    return this.procChance;
  }
  /** 每秒触发率 */
  get procChancePerSecond() {
    return ~~this.procChancePerHit * this.fireRate + 1 - (1 - (this.procChancePerHit % 1)) ** this.fireRate;
  }
  /** 平均状态量期望 */
  get averageProcQE() {
    let mergedMap = {},
      asQE = 0;
    this.procChanceMap.forEach(v => {
      let k = v[0] === "Gas" ? "Toxin" : v[0];
      mergedMap[k] = (mergedMap[k] || 0) + v[1];
    });
    Object.keys(mergedMap).forEach(v => {
      let single = mergedMap[v] * procDurationMap[v] * this.procDurationMul;
      // 爆炸双倍异况
      asQE += (v === "Blast" ? 2 : 1) * (single > 1 ? 1 : single);
    });
    return asQE;
  }

  /** 面板基础伤害增幅倍率 */
  get panelBaseDamageMul() {
    return this.baseDamageMul;
  }
  /** 面板伤害增幅倍率 */
  get panelDamageMul() {
    return this.panelBaseDamageMul * this.extraDmgMul;
  }
  /** 面板基础伤害 */
  get panelBaseDamage() {
    return this.originalDamage * this.panelBaseDamageMul;
  }
  /** 面板伤害 */
  get panelDamage() {
    if (this.damageModel) {
      return this.dmg.reduce((r, [_, v]) => r + v, 0);
    }
    return this.panelDamageRaw;
  }
  /** 面板伤害(暴击向下取整) */
  get panelDamageFloor() {
    if (this.damageModel) {
      return this.dmgFloor.reduce((r, [_, v]) => r + v, 0);
    }
    return this.panelDamageRaw;
  }
  /** 面板伤害(暴击向上取整) */
  get panelDamageCeil() {
    if (this.damageModel) {
      return this.dmgCeil.reduce((r, [_, v]) => r + v, 0);
    }
    return this.panelDamageRaw;
  }
  /** 无模型面板伤害 */
  get panelDamageRaw() {
    return this.originalDamage * this.panelDamageMul;
  }
  /** 总伤增幅倍率 */
  get totalDamageMul() {
    return this.critDamageMul * this.overallMul * this.enemyDmgMul;
  }
  /** 总伤增幅倍率(暴击向下取整) */
  get totalDamageMulFloor() {
    return this.critDamageMulFloor * this.overallMul * this.enemyDmgMul;
  }
  /** 总伤增幅倍率(暴击向上取整) */
  get totalDamageMulCeil() {
    return this.critDamageMulCeil * this.overallMul * this.enemyDmgMul;
  }
  /** 总伤害 */
  get totalDamage() {
    return this.panelDamage * this.totalDamageMul;
  }
  /** 总伤害(暴击向下取整) */
  get totalDamageFloor() {
    return this.panelDamageFloor * this.totalDamageMulFloor;
  }
  /** 总伤害(暴击向上取整) */
  get totalDamageCeil() {
    return this.panelDamageCeil * this.totalDamageMulCeil;
  }
  /** 无模型总伤害 */
  get totalDamageRaw() {
    return this.panelDamageRaw * this.totalDamageMul;
  }
  /** 原总伤害 */
  get oriTotalDamage() {
    return this.originalDamage * this.oriCritDamageMul;
  }
  /** 基伤 触发计算中的基伤概念 包含多重暴击等 */
  get baseDamage() {
    return this.originalDamage * this.panelBaseDamageMul * this.critDamageMul * this.overallMul * this.enemyDmgMul;
  }
  /** 切割DoT的基伤 */
  get slashBaseDamage() {
    return this.baseDamage * 0.35;
  }
  /** 毒DoT的基伤 */
  get toxinBaseDamage() {
    return this.baseDamage * 0.5;
  }
  /** 毒气DoT的基伤 */
  get gasBaseDamage() {
    return this.baseDamage * 0.5;
  }
  /** 火DoT的基伤 */
  get heatBaseDamage() {
    return this.baseDamage * 0.5;
  }
  /** 电DoT的基伤 */
  get electricityBaseDamage() {
    return this.baseDamage * (1 + this.electricityMul) * 0.5;
  }
  /** 攻速 */
  get fireRate() {
    let fr = (this.mode.fireRate * this.fireRateMul * this.finalSpeedMul) / 60;
    // 攻速下限
    return fr < 0.05 ? 0.05 : fr;
  }
  /** 原平均暴击区增幅倍率 */
  get oriCritDamageMul() {
    return this.calcCritDamage(this.mode.critChance, this.mode.critMul, this.headShotChance, this.oriHeadShotMul);
  }

  protected _originalDamage: number;
  /** 武器原本伤害 */
  get originalDamage(): number {
    if (!this._originalDamage) this._originalDamage = this.initialDamage.reduce((a, b) => a + b[1], 0);
    return this._originalDamage;
  }

  constructor(weapon: Weapon = null, riven: RivenMod = null, fast = false) {
    this.riven = riven;
    this.fastMode = fast;
  }
  // 额外参数
  protected _enemyDmgType = " ";
  /** 歧视伤害类型 */
  get enemyDmgType() {
    return this._enemyDmgType;
  }
  set enemyDmgType(value) {
    if (this._enemyDmgType !== value && "GCIOS".includes(value)) {
      this._enemyDmgType = value;
    }
  }
  /** 歧视伤害类型索引 */
  get enemyDmgTypeIndex() {
    return "GCIOS".indexOf(this._enemyDmgType);
  }

  /**
   * 计算暴击伤害
   * @param m 暴击率
   * @param n 暴击倍率
   * @param p 爆头几率 [=0]
   * @param v 爆头倍率 [=2]
   */
  calcCritDamage(m: number, n: number, p = 0, v = 2) {
    if (v != 2) return m * (n * (p * (this.oriHeadShotMul * v - 1) + 1) - p * (v - 1) - 1) + p * (v - 1) + 1; // m (n (p (2 v - 1) + 1) - p (v - 1) - 1) + p (v - 1) + 1
    if (p != 0) return m * (n * (3 * p + 1) - p - 1) + p + 1;
    return m * (n - 1) + 1;
  }

  /** 应用MOD */
  applyMod(mod: NormalMod) {
    this._mods.push(mod);
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
    // 加载Mod
    this._mods.forEach(mod => {
      // 后者优先 主要用于紫卡有多个元素词条时
      mod && forEachRight(mod.props, prop => this.applyProp(mod, prop[0], prop[1]));
    });
    // 加载Buff
    this._buffs.forEach(buff => {
      buff && buff.props.forEach(prop => this.applyProp(null, prop[0], prop[1]));
    });
    this.recalcElements();
    if (!this.fastMode) {
      this.recalcStatusInfo();
    }
  }

  /** 重置所有属性增幅器 */
  reset() {
    this._baseDamageMul = 100 + this.extraBaseDamage;
    this._extraDmgMul = 100;
    this._critChanceMul = 100;
    this._critMulMul = 100;
    this._critChanceAdd = 0;
    this._critWhenHeadshotAdd = 0;
    this._procChanceMul = 100;
    this._procChanceAdd = 0;
    this._procDurationMul = 100;
    this._procDamageMul = 100;
    this._enemyDmgMul = [100, 100, 100, 100, 100];
    this._headShotMulMul = 100;
    this._fireRateMul = 100;
    this._heatMul = 0;
    this._coldMul = 0;
    this._toxinMul = 0;
    this._electricityMul = 0;
    this._impactMul = 0;
    this._punctureMul = 0;
    this._slashMul = 0;
    this.elementsOrder = [];
    this._combElementsOrder = [];
    this._extraProcChance = [];
    this._overallMul = 100 + this.extraOverall;
    this._finalCritMulMul = 100;
    this._allEnemyDmgMul = 0;
    this._multishotMul = 100;
    this._critChanceLock = -100;
    this._finalSpeedMul = 100;
    this._initialDamageMul = 100;
    this.standaloneElements = [];
    this._voidConvs = [];
    this._absExtra = [];
    this._relExtra = [];
    this._physicalConv = [];
    if (this.baseId === "Knell") this._procChanceAdd = 60;
  }

  /** 清除所有MOD并重置属性增幅器 */
  clear() {
    this._mods = [];
    this.reset();
  }

  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    let mods = compact(this._mods);
    // 如果相应的P卡已经存在则不使用
    if (mods.some(v => (mod.id !== "RIVENFAKE" && v.id === mod.id) || v.id === mod.primed || v.primed === mod.id || (mod.primed && v.primed === mod.primed)))
      return false;
    // 只允许选择的元素
    if (this.allowElementTypes) if (mod.props.some(v => ExtraDmgSet.has(v[0]))) if (!mod.props.some(v => this.allowElementTypes.includes(v[0]))) return false;
    // 过滤一些需要前置MOD的MOD
    // for (let i = 0; i < NormalCardDependTable.length; i++) {
    //   const depend = NormalCardDependTable[i];
    //   if (mod.id === depend[0]) {
    //     if (!mods.some(v => v.id === depend[1])) return false;
    //   }
    // }
    return true;
  }

  /** 检测当前MOD是否不自动使用 */
  isNoNeedMod(mod: NormalMod) {
    return false;
  }

  /**
   * [纯函数] 映射组合MOD加成
   *
   * @param {NormalMod[]} mods
   * @returns {NormalMod[]}
   */
  mapRankUpMods(mods: NormalMod[]): NormalMod[] {
    let umbraSet = { CD: [1, 1.25], DD: [1, 1.25] };
    let umbraSetCount = mods.filter(v => v && v.key in umbraSet).length - 1;
    let rst = mods.map(mod => {
      if (mod && mod.key in umbraSet) {
        let mapped = clone(mod);
        mapped.setMul = umbraSet[mod.key][umbraSetCount];
        return mapped;
      }
      return mod;
    });
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
    let nb = new (this.constructor as any)(this.weapon, this.riven, this.options);
    nb._mods = this.mods;
    nb._buffs = this.buffs;
    nb.damageModel = this.damageModel;
    nb.modelArmor = this.modelArmor;
    nb.modeIndex = this.modeIndex;
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
    if (typeof index === "string") index = this._buffs.findIndex(v => v.data.id === index);
    if (!this._buffs[index]) return 0;
    let nb = new (this.constructor as any)(this.weapon, this.riven, this.options);
    nb._mods = this.mods;
    nb._buffs = this.buffs;
    nb.damageModel = this.damageModel;
    nb.modelArmor = this.modelArmor;
    nb.modeIndex = this.modeIndex;
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
    if (this.isNoNeedMod(mod)) return -1;
    // 效率优化
    let props = mod.vProps ? mod.vProps.filter(v => v.dmg) : [null, null];
    if (props.length === 0) return -1;
    if (props.length === 1) {
      let oriDmg: [string, number];
      switch (props[0].id) {
        case "D": // 伤害 baseDmg
        case "K": // 近战伤害 baseDmg
          return props[0].value / this._baseDamageMul;
        case "da": // 正中红心 overallMul
        case "oad": // 总伤害 overallMul
          return props[0].value / 100;
        case "S": // 多重射击 multiShot
          return props[0].value / this._multishotMul;
        case "4": // 火焰伤害 heatDmg
        case "5": // 冰冻伤害 coldDmg
        case "6": // 毒素伤害 toxiDmg
        case "7": // 电击伤害 elecDmg
          return props[0].value / this._extraDmgMul;
        case "8": // 冲击伤害 impaDmg
          oriDmg = this.initialDamage.find(v => v[0] == "Impact");
          if (oriDmg) return (props[0].value * oriDmg[1]) / this.originalDamage / this._extraDmgMul;
          break;
        case "9": // 穿刺伤害 puncDmg
          oriDmg = this.initialDamage.find(v => v[0] == "Puncture");
          if (oriDmg) return (props[0].value * oriDmg[1]) / this.originalDamage / this._extraDmgMul;
          break;
        case "A": // 切割伤害 slasDmg
          oriDmg = this.initialDamage.find(v => v[0] == "Slash");
          if (oriDmg) return (props[0].value * oriDmg[1]) / this.originalDamage / this._extraDmgMul;
          break;
        case "G": // 对Grineer伤害 grinDmg
          return this.enemyDmgType === "G" ? props[0].value / this._enemyDmgMul[0] : 0;
        case "C": // 对Corpus伤害 corpDmg
          return this.enemyDmgType === "C" ? props[0].value / this._enemyDmgMul[1] : 0;
        case "I": // 对Infested伤害 infeDmg
          return this.enemyDmgType === "I" ? props[0].value / this._enemyDmgMul[2] : 0;
        case "od": // 对堕落者伤害
          return this.enemyDmgType === "O" ? props[0].value / this._enemyDmgMul[3] : 0;
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
   *
   * @param [slots=8] 可用的插槽数
   * @param [useRiven=0] 是否使用紫卡 0 = 不用 1 = 自动选择 2 = 必须用
   * @param [lib=this.avaliableMods] 卡库
   * @param [rivenLimit=0] 紫卡词条数
   */
  fillEmpty(slots = 8, useRiven = 0, lib = this.avaliableMods, rivenLimit = 0) {
    // 根据武器自动选择所有可安装的MOD
    let mods = (this._mods = compact(this._mods));
    let othermods = lib.filter(v => !mods.some(k => (v.id === k.id && (v.id === "RIVENFAKE" ? v.props[0][0] === k.props[0][0] : true)) || v.id === k.primed));
    let rivenCount = mods.reduce((a, b) => a + (b.id === "RIVENFAKE" ? 1 : 0), 0),
      rivenSlots = rivenLimit ? slots + rivenLimit - 1 : slots;
    if (useRiven > 0) {
      if (useRiven == 2) this.applyMod(this.riven.normalMod(this.weapon));
      // 1. 将紫卡直接插入
      else othermods.push(this.riven.normalMod(this.weapon)); // 1. 将紫卡作为一张普卡进行计算
    }
    // 有目标时计算复合元素收益
    if (this.damageModel || this.target) {
      const elmMods = lib.filter(v => v.isElement);
      console.log(elmMods);
    }

    let sortableMods = othermods.map(v => [v, 0] as [NormalMod, number]);
    while (mods.length < rivenSlots && sortableMods.length > 0) {
      // 2. 计算收益
      // console.log("开始计算收益: ", this._mods.length)
      sortableMods.forEach(v => {
        if (v[0].id === "RIVENFAKE" ? rivenCount >= rivenLimit : mods.length - rivenCount >= rivenSlots - rivenLimit) v[1] = -2;
        else v[1] = this.testMod(v[0]);
        // v[0].id === "RIVENFAKE" && console.log("测试收益: ", this._mods.map(v => v.name).join(","), v[0].props[0][1], v[0].name, "的收益是", v[1]);
      });
      // 3. 把所有卡按收益排序 []
      sortableMods.sort((a, b) => (b[1] == a[1] ? (NormalCardDependTable[a[0].id] === b[0].id ? 1 : b[0].name.localeCompare(a[0].name)) : b[1] - a[1]));
      if (sortableMods.length > 0) {
        // console.log("计算收益最高值: ", sortableMods[0][0].name, "的收益是", sortableMods[0][1]);
        // 4. 将收益最高的一项插入并移出数组
        let expMod = sortableMods.shift();
        // 跳过负收益 (可能是被过滤的)
        if (expMod[1] < 0) break;
        if (expMod[0].id === "RIVENFAKE") rivenCount++;
        this.applyMod(expMod[0]);
        // 5. 重复以上步骤直到卡槽充满
      }
    }
    if (this._mods.length < 8) this._mods.length = 8;
    if (!this.fastMode) this.recalcPolarizations();
  }
  /**
   * 自动按武器属性生成最佳紫卡
   * 算法4.0
   * 1. 过滤紫卡属性
   * 2. 将紫卡属性作为虚拟MOD参与正常fill
   * 3. 返回最终结算结果的紫卡
   * @param slots 可用的插槽数
   */
  findBestRiven4(slots = 8): RivenMod {
    let newBuild: ModBuild = new (this.constructor as any)(this.weapon, this.riven, this.options, true);
    let riven1 = this.findBestRivenSub(slots, 1),
      riven2 = this.findBestRivenSub(slots, 2);
    if (riven1.qrCode == riven2.qrCode) return riven1;
    let score1: number, score2: number;
    newBuild.riven = riven1;
    newBuild.fill(slots, 2);
    newBuild.calcMods();
    score1 = newBuild.compareDamage;
    newBuild.riven = riven2;
    newBuild.fill(slots, 2);
    newBuild.calcMods();
    score2 = newBuild.compareDamage;
    console.log("offset=1 紫卡:", riven1, "分数:", score1, "offset=2 紫卡:", riven2, "分数:", score2);
    return score1 > score2 ? riven1 : riven2;
  }
  findBestRivenSub(slots = 8, offset = 1): RivenMod {
    let newBuild: ModBuild = new (this.constructor as any)(this.weapon, this.riven, this.options, true);
    newBuild.fill(slots - offset, 0);
    // 生成所有紫卡
    // 1. 列出所有属性
    let upLevel = toUpLevel(4, true),
      negaUpLevel = toNegaUpLevel(4, true);
    let avaliableProps = RivenPropertyDataBase[this.riven.mod]
      .filter(v => {
        if (v.noDmg) return false;
        if (["G", "I", "C", "O"].includes(v.id)) return this.enemyDmgType === v.id;
        if (this.allowElementTypes) {
          if (["4", "5", "6", "7", "8", "9", "A"].includes(v.id) && !this.allowElementTypes.includes(v.id)) return false;
        } else if (["4", "5", "6", "8", "9", "A"].includes(v.id)) return false;
        return true;
      })
      .map(v => {
        let base = this.weapon.getPropBaseValue(v.id) * upLevel;
        return new ValuedRivenProperty(v, 1, base, upLevel);
      });
    // 负面属性
    let negativeProp = RivenPropertyDataBase[this.riven.mod].find(
      v => v.id === (this.weapon.name === "Vectis Prime" ? "L" : "H") || v.id === "U" || (this.riven.mod === "Shotgun" && v.id === "Z")
    );
    let valuedNegativeProp = new ValuedRivenProperty(
      negativeProp,
      this.weapon.name === "Vectis Prime" ? 1.1 : 1,
      this.weapon.getPropBaseValue(negativeProp.id),
      -negaUpLevel
    );

    // 将属性虚拟成MOD
    let fakeMods = avaliableProps.map(
      v =>
        ({
          key: "01",
          id: "RIVENFAKE",
          name: v.prop.sName,
          type: "",
          desc: "裂罅MOD",
          polarity: "r",
          cost: 18,
          rarity: "x",
          props: [[v.prop.id, v.value]] as [string, number][],
        } as NormalMod)
    );
    let rivenArea = this.avaliableMods.concat(fakeMods);
    // 将紫卡属性作为虚拟MOD参与正常fill
    newBuild.fillEmpty(slots, 0, rivenArea, 3);

    // 计算有紫卡属性后收益最低的mod 如果不是紫卡就去掉收益最低的紫卡再计算一次
    let valueList = newBuild._mods.map((_, i) => [i, newBuild.modValue(i)]).filter(v => newBuild._mods[v[0]].id === "RIVENFAKE");
    let removeAble = minBy(valueList, v => v[1]);
    // console.log("去掉该卡", newBuild._mods[removeAble[0]].name);
    newBuild._mods.splice(removeAble[0], 1);
    newBuild.calcMods();
    newBuild.fillEmpty(slots, 0, fakeMods, 3);
    // 结算 生成紫卡
    let resultProps = newBuild.mods
      .filter(v => v.id === "RIVENFAKE")
      .map(v => new ValuedRivenProperty(RivenDatabase.getPropByName(v.props[0][0]), v.props[0][1], v.props[0][1], 1));
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
  findBestRiven(slots = 8): RivenMod {
    let newBuild: ModBuild = new (this.constructor as any)(this.weapon, this.riven, this.options);
    // 生成所有紫卡
    // 1. 列出所有属性
    let upLevel = toUpLevel(4, true),
      negaUpLevel = toNegaUpLevel(3, true);
    let isDPS = this.testMod(
      new NormalMod({
        key: "aa",
        id: "DPSTEST",
        props: [["R", 100]],
        type: "Any",
        cost: 0,
        level: 5,
        polarity: "r",
        rarity: "r",
      })
    );
    const rivenRef = this.riven.weapon;
    let avaliableProps = RivenPropertyDataBase[this.riven.mod]
      .filter(v => {
        if (v.noDmg) return false;
        if (!this.enemyDmgType && ["G", "I", "C", "O"].includes(v.id)) return false;
        const dmgPropList = ["0", "1", "7", "D", "S", "R", "K"];
        if (!isDPS && v.id === "R") return false;
        if (!dmgPropList.includes(v.id)) return false;
        return true;
      })
      .map(v => {
        let base = rivenRef.getPropBaseValue(v.id) * upLevel;
        return new ValuedRivenProperty(v, 1, base, upLevel);
      });
    let propsOfMods = choose(avaliableProps, 3); // 只用三条属性 代表3+1-
    // 负面属性
    let negativeProp = RivenPropertyDataBase[this.riven.mod].find(
      v => v.id === (this.weapon.name === "Vectis Prime" ? "L" : "H") || v.id === "X" || (this.riven.mod === "Shotgun" && v.id === "Z")
    );
    let valuedNegativeProp = new ValuedRivenProperty(negativeProp, 1, rivenRef.getPropBaseValue(negativeProp.id), -negaUpLevel);

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
    let bestRiven = maxBy(newRivens, v => {
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
  applyProp(mod: NormalMod, pName: string, pValue: number) {
    let oriDmg: [string, number];
    switch (pName) {
      case "K": /* 近战伤害 baseDmg */
      case "D":
        /* 伤害 baseDmg */ this._baseDamageMul = this._baseDamageMul + pValue;
        break;
      case "0":
        /* 暴击率 critChance */ this._critChanceMul = this._critChanceMul + pValue;
        break;
      case "1":
        /* 暴击伤害 critMul */ this._critMulMul = this._critMulMul + pValue;
        break;
      case "cd":
        /* 暴击率/暴击伤害 critChance/critMul */ this._critChanceMul = this._critChanceMul + pValue;
        this._critMulMul = this._critMulMul + pValue;
        break;
      case "2":
        /* 触发几率 procChance */ this._procChanceMul = this._procChanceMul + pValue;
        break;
      case "3":
        /* 触发时间 procDuration */ this._procDurationMul = this._procDurationMul + pValue;
        break;
      case "4":
        /* 火焰伤害 heatDmg */ this.heatMul = this._heatMul + pValue;
        break;
      case "5":
        /* 冰冻伤害 coldDmg */ this.coldMul = this._coldMul + pValue;
        break;
      case "6":
        /* 毒素伤害 toxinDmg */ this.toxinMul = this._toxinMul + pValue;
        break;
      case "7":
        /* 电击伤害 electricityDmg */ this.electricityMul = this._electricityMul + pValue;
        break;
      case "8":
        /* 冲击伤害 impaDmg */ this.impactMul = this._impactMul + pValue;
        break;
      case "9":
        /* 穿刺伤害 puncDmg */ this.punctureMul = this._punctureMul + pValue;
        break;
      case "A":
        /* 切割伤害 slasDmg */ this.slashMul = this._slashMul + pValue;
        break;
      case "G":
        /* 对Grineer伤害 grinDmg */ this._enemyDmgMul[0] = this._enemyDmgMul[0] + pValue;
        break;
      case "C":
        /* 对Corpus伤害 corpDmg */ this._enemyDmgMul[1] = this._enemyDmgMul[1] + pValue;
        break;
      case "I":
        /* 对Infested伤害 infeDmg */ this._enemyDmgMul[2] = this._enemyDmgMul[2] + pValue;
        break;
      case "od":
        /* 对堕落者伤害 */ this._enemyDmgMul[3] = this._enemyDmgMul[3] + pValue;
        break;
      case "smd":
        /* 对Sentient伤害 */ this._enemyDmgMul[4] = this._enemyDmgMul[4] + pValue;
        break;
      case "hm":
        /* 爆头伤害 headShotMul */ this._headShotMulMul = this._headShotMulMul + pValue;
        break;
      case "da": /* 正中红心 overallMul */
      case "oad":
        /* 总伤害 overallMul */ this._overallMul = (this._overallMul * (100 + pValue)) / 100;
        break;
      case "sd":
        /* 触发伤害 procDamageMul */ this._procDamageMul = this._procDamageMul + pValue;
        break;
      case "fcd":
        /* 最终暴伤 finalCritMulMul */ this._finalCritMulMul = (this._finalCritMulMul * (100 + pValue)) / 100;
        break;
      case "i0":
        /* 加法暴击 critChanceAdd */ this._critChanceAdd = this._critChanceAdd + pValue;
        break;
      case "cwh":
        /* 爆头加法暴击 critWhenHeadshotAdd */ this._critWhenHeadshotAdd = this._critWhenHeadshotAdd + pValue;
        break;
      case "dmg":
        /* 伤害 baseDamageMul */ this._baseDamageMul = this._baseDamageMul + pValue;
        break;
      case "erd":
        /* 辐射伤害 */ this.applyStandaloneElement("Radiation", pValue / 100);
        break;
      case "ecd":
        /* 腐蚀伤害 */ this.applyStandaloneElement("Corrosive", pValue / 100);
        break;
      case "eed":
        /* 电击伤害 */ this.electricityMul = this._electricityMul + pValue;
        break;
      case "efd":
        /* 火焰伤害 */ this.heatMul = this._heatMul + pValue;
        break;
      case "etd":
        /* 毒素伤害 */ this.toxinMul = this._toxinMul + pValue;
        break;
      case "aed":
        /* 对全种族伤害 allEnemyDmgMul */ this._allEnemyDmgMul = this._allEnemyDmgMul + pValue;
        break;
      case "i2":
        /* 加法触发几率 */ this._procChanceAdd = this._procChanceAdd + pValue;
        break;
      case "ccl":
        /* 暴击率锁定 */ this._critChanceLock = pValue;
        break;
      case "bsk":
        /* 总攻速 */ this._finalSpeedMul = (this._finalSpeedMul * (100 + pValue)) / 100;
        break;
      case "eid":
        /* 初始伤害 */ this._initialDamageMul = this._initialDamageMul + pValue;
        break;
      case "e4":
        /* Initial Heat 初始火伤 */ this._absExtra.push(["Heat", pValue]);
        break;
      case "e5":
        /* Initial Cold 初始冰伤 */ this._absExtra.push(["Cold", pValue]);
        break;
      case "e6":
        /* Initial Toxin 初始毒伤 */ this._absExtra.push(["Toxin", pValue]);
        break;
      case "e7":
        /* Initial Electricity 初始电伤 */ this._absExtra.push(["Electricity", pValue]);
        break;
      case "p4":
        /* Physical to Heat 物理转火 */ this._physicalConv.push(["Heat", pValue]);
        break;
      case "p5":
        /* Physical to Cold 物理转冰 */ this._physicalConv.push(["Cold", pValue]);
        break;
      case "p6":
        /* Physical to Toxin 物理转毒 */ this._physicalConv.push(["Toxin", pValue]);
        break;
      case "p7":
        /* Physical to Electricity 物理转电 */ this._physicalConv.push(["Electricity", pValue]);
        break;
      case "e8":
        /* Initial Impact 初始冲击 */ this._absExtra.push(["Impact", pValue]);
        break;
      case "e9":
        /* Initial Puncture 初始穿刺 */ this._absExtra.push(["Puncture", pValue]);
        break;
      case "eA":
        /* Initial Slash 初始切割 */ this._absExtra.push(["Slash", pValue]);
        break;

      case "b4":
        /** Initial Heat 初始火伤 */ this._relExtra.push(["Heat", pValue]);
        break;
      case "b5":
        /** Initial Cold 初始冰伤 */ this._relExtra.push(["Cold", pValue]);
        break;
      case "b6":
        /** Initial Toxin 初始毒伤 */ this._relExtra.push(["Toxin", pValue]);
        break;
      case "b7":
        /** Initial Electricity 初始电伤 */ this._relExtra.push(["Electricity", pValue]);
        break;
      case "b8":
        /** Initial Impact 初始冲击 */ this._relExtra.push(["Impact", pValue]);
        break;
      case "b9":
        /** Initial Puncture 初始穿刺 */ this._relExtra.push(["Puncture", pValue]);
        break;
      case "bA":
        /** Initial Slash 初始切割 */ this._relExtra.push(["Slash", pValue]);
        break;
      case "bM":
        /** Initial Magnetic 初始磁力 */ this._relExtra.push(["Magnetic", pValue]);
        break;
      case "bR":
        /** Initial Radiation 初始辐射 */ this._relExtra.push(["Radiation", pValue]);
        break;
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
      this.standaloneElements[idx][1] = this.standaloneElements[idx][1] + vv;
    } else {
      this.standaloneElements.push([vn, vv]);
    }
  }

  // 容量计算与极化

  protected _polarizations: string[] = Array(8);
  get polarizations() {
    return this._polarizations;
  }
  /** 容量 */
  get totalCost() {
    let total = this._mods.reduce((a, _, i) => (a += this.getCost(i)), 0);
    return total;
  }

  /** 获取指定位置MOD的容量 */
  getCost(modIndex: number) {
    let mod = this._mods[modIndex];
    if (mod) return mod.calcCost(this._polarizations[modIndex]);
    return 0;
  }

  /** 极化次数增加最大容量 */
  get isExtendCost() {
    return this.weapon.tags.has("Kuva Weapon") || this.weapon.name == "Paracesis";
  }
  /** 最大容量 */
  get maxCost() {
    if (this.weapon.tags.has("Exalted") || this.weapon.tags.has("Virtual") || this.weapon.tags.has("Robotic Weapon") || this.weapon.tags.has("Arch-Melee"))
      return 60;
    const baseCost = this.isExtendCost ? this.formaCount + this.umbraCount * 2 + 60 : 60;
    const auraCost = this.weapon.tags.has("Melee") ? 10 : 0;
    return baseCost + auraCost;
  }
  _formaCount = 0;
  _umbraCount = 0;
  /** 极化次数 */
  get formaCount() {
    return this._formaCount;
  }
  /** 暗影极化次数 */
  get umbraCount() {
    return this._umbraCount;
  }
  /** 重新计算极化次数 */
  recalcPolarizations() {
    // 自带的极性
    let defaultPolarities = (this.weapon.polarities || "").split("");
    this._polarizations = Array(8).fill(null);
    this._formaCount = 0;
    this._umbraCount = 0;
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
    const mods = this.mods;
    enum polSeq {
      r,
      "-",
      d,
      "=",
      "w",
    }
    const delta = mods
      .map((v, i) => [i, v ? v.delta : 0])
      .sort((a, b) => {
        const costD = b[1] - a[1];
        if (costD) return costD;
        if (mods[b[0]] && mods[a[0]]) return polSeq[mods[a[0]].polarity] - polSeq[mods[b[0]].polarity] || a[0] - b[0]; // 先极化常用槽
        return a[0] - b[0]; // 点数相同优先极化前面
      });
    // 最多极化10次
    for (let i = 0; this.totalCost > this.maxCost && i < delta.length && mods[delta[i][0]]; ++i) {
      const [modIndex] = delta[i];
      const pol = mods[modIndex].polarity;
      if (pol !== "w") {
        // console.log(`set pol [[${this._polarizations}]] ${modIndex - 2}: ${this._polarizations[modIndex - 2]} to ${pol}`)
        if (this._polarizations[modIndex] !== pol) {
          this._polarizations[modIndex] = pol;
          ++this._formaCount;
        }
      } else if (thetaMod.includes(modIndex)) {
        // console.log(`set null [[${this._polarizations}]] ${modIndex - 2}: ${this._polarizations[modIndex - 2]} to null`)
        this._polarizations[modIndex] = "";
        thetaMod = thetaMod.filter(v => v != modIndex);
      }
    }
    // 如果还是负的 测试U福马数量
    if (this.totalCost > this.maxCost) {
      for (let i = 0; this.totalCost > this.maxCost && i < delta.length && mods[delta[i][0]]; ++i) {
        const [modIndex] = delta[i];
        const pol = mods[modIndex].polarity;
        if (pol === "w") {
          if (this._polarizations[modIndex - 2] !== pol) {
            this._polarizations[modIndex - 2] = pol;
            ++this._umbraCount;
          }
        }
      }
    }
    // console.log(this.allMods, this.allPolarizations)
    return this.polarizations;
  }
}
