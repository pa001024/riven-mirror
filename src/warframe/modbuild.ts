import { NormalMod, Weapon, RivenPropertyDataBase, RivenDataBase, RivenMod, ValuedRivenProperty, CombElementMap, Damage2_0, DamageType, ExtraDmgSet, NormalCardDependTable } from "@/warframe";
import _ from "lodash";
import { choose, hAccSum, hAccMul, hAccDiv } from "@/warframe/util";

// 基础类
export abstract class ModBuild {
  // ### 变量 ###

  public abstract weapon: Weapon
  public riven: RivenMod

  /** 所有适用的MOD */
  protected avaliableMods: NormalMod[] = []
  protected _mods: NormalMod[] = []; /** MOD列表 */  get mods() { return _.cloneDeep(this._mods); }

  // ### 属性 ###

  protected _baseDamageMul = 1; /** 基伤增幅倍率 */ get baseDamageMul() { return this._baseDamageMul; }
  protected _extraDmgMul = 1; /** 额伤增幅倍率 */  get extraDmgMul() { return this._extraDmgMul; }
  protected _critChanceMul = 1; /** 暴击率增幅倍率 */  get critChanceMul() { return this._critChanceMul; }
  protected _critMulMul = 1; /** 暴击伤害增幅倍率 */  get critMulMul() { return this._critMulMul; }
  protected _procChanceMul = 1; /** 触发几率增幅倍率 */  get procChanceMul() { return this._procChanceMul; }
  protected _procDurationMul = 1; /** 触发时间增幅倍率 */  get procDurationMul() { return this._procDurationMul; }
  protected _enemyDmgMul = 1; /** 种族伤害增幅倍率 */  get enemyDmgMul() { return this._enemyDmgMul; }
  protected _fireRateMul = 1; /** 攻速增幅倍率 */  get fireRateMul() { return this._fireRateMul; }
  protected _handShotMulMul = 1; /** 爆头倍率增幅倍率 */  get handShotMulMul() { return this._handShotMulMul; }
  protected _originalDamage: number;
  abstract get compareDamage(): number;
  abstract set options(val: any);
  abstract get options(): any;

  // 额外参数

  /** 基伤加成 */
  extraBaseDamage = 0;

  private _handShotChance = 0; /** 爆头概率 */  get handShotChance() { return this._handShotChance; }
  /** 设置爆头概率 */
  set handShotChance(value) {
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    this._handShotChance = value;
  }

  private _compareMode: number = 0;
  public get compareMode(): number {
    return this._compareMode;
  }
  public set compareMode(value: number) {
    this._compareMode = value;
    this.calcMods();
  }
  /** 暴击率 */
  get critChance() {
    return this.weapon.criticalChances * this.critChanceMul;
  }
  /** 暴击倍率 */
  get critMul() {
    return this.weapon.criticalMultiplier * this.critMulMul;
  }
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
    this.recalcElements();
  }
  protected _coldMul = 0;
  /** 冰冻伤害增幅倍率 */
  public get coldMul() { return this._coldMul; }
  public set coldMul(value) {
    this._coldMul = value;
    this.elementsOrder.includes("Cold") || this.elementsOrder.push("Cold");
    this.recalcElements();
  }
  protected _toxinMul = 0;
  /** 毒素伤害增幅倍率 */
  public get toxinMul() { return this._toxinMul; }
  public set toxinMul(value) {
    this._toxinMul = value;
    this.elementsOrder.includes("Toxin") || this.elementsOrder.push("Toxin");
    this.recalcElements();
  }
  protected _electricityMul = 0;
  /** 电击伤害增幅倍率 */
  public get electricityMul() { return this._electricityMul; }
  public set electricityMul(value) {
    this._electricityMul = value;
    this.elementsOrder.includes("Electricity") || this.elementsOrder.push("Electricity");
    this.recalcElements();
  }
  private _impactMul = 0;
  /** 穿刺伤害增幅倍率 */
  public get impactMul() { return this._impactMul; }
  public set impactMul(value) {
    this._impactMul = value;
    this.recalcElements();
  }
  private _punctureMul = 0;
  /** 冲击伤害增幅倍率 */
  public get punctureMul() { return this._punctureMul; }
  public set punctureMul(value) {
    this._punctureMul = value;
    this.recalcElements();
  }
  private _slashMul = 0;
  /** 切割伤害增幅倍率 */
  public get slashMul() { return this._slashMul; }
  public set slashMul(value) {
    this._slashMul = value;
    this.recalcElements();
  }
  /** 所有元素增幅倍率 */
  public get elementsMul() { return { Heat: this.heatMul, Cold: this.coldMul, Toxin: this.toxinMul, Electricity: this.electricityMul }; }

  /** 复合元素顺序 */
  private _combElementsOrder: [string, number][] = [];
  public get combElementsOrder(): [string, number][] { return this._combElementsOrder; }

  /** 重新计算元素顺序 */
  recalcElements() {
    this._extraDmgMul = 1 + hAccSum(this.heatMul, this.coldMul, this.toxinMul, this.electricityMul);
    let combs = _.chunk(this.elementsOrder, 2);
    this._combElementsOrder = combs.map(comb => {
      if (comb.length > 1) {
        let combElement = CombElementMap[comb.sort().join("+")];
        let etype = Damage2_0.getDamageType(combElement);
        return [etype.id, hAccSum(this.elementsMul[etype.combinedBy[0]], this.elementsMul[etype.combinedBy[1]])] as [string, number];
      } else {
        return [comb[0], this.elementsMul[comb[0]]] as [string, number];
      }
    });
    // 计算物理
    if (this.weapon.dmg.some(v => ["Impact", "Puncture", "Slash"].includes(v[0]))) {
      ["Impact", "Puncture", "Slash"].forEach(dname => {
        let pD = this.weapon.dmg.find(v => v[0] === dname);
        if (pD && this["_" + dname.toLowerCase() + "Mul"] > -1) {
          let dvalue = this["_" + dname.toLowerCase() + "Mul"] * pD[1] / this.originalDamage;
          this._extraDmgMul = hAccSum(this._extraDmgMul, dvalue);
          this._combElementsOrder.push([dname, dvalue]);
        }
      });
    }
  }

  /**
   * 所有伤害类型
   */
  get dmg() {
    let extra = this.combElementsOrder;
    let ori = this.originalDamage;
    let rst = {};

    this.weapon.dmg.forEach(([dname, dvalue]) => {
      let dtype = Damage2_0.getDamageType(dname as DamageType);
      let ltype = extra.length > 0 && Damage2_0.getDamageType(_.last(extra)[0] as DamageType);
      let targetElement = dname;
      // 将自带元素与MOD元素进行合成
      if (dname !== ltype.id && dtype.type === "Elemental" && ltype && ltype.type === "Elemental") {
        let [lname, lvalue] = extra.pop();
        targetElement = CombElementMap[[dname, lname].sort().join("+")];
        if (rst[targetElement]) rst[targetElement] = hAccSum(rst[targetElement], lvalue);
        else rst[targetElement] = lvalue;
      }
      if (rst[targetElement]) rst[targetElement] = hAccSum(rst[targetElement], dvalue / ori);
      else rst[targetElement] = dvalue / ori;
    });
    extra.forEach(([dname, dpart]) => {
      let targetElement = dname;
      if (rst[targetElement]) rst[targetElement] = hAccSum(rst[targetElement], dpart);
      else rst[targetElement] = dpart;
    });
    return _.map(rst, (v, i) => [i, v * this.panelBaseDamage]).filter(v => v[1] > 0) as [string, number][];
  }

  // ### 额外参数 ###
  allowElementTypes: string[] = null;
  useStatus = false;

  // ### 计算属性 ###
  /** 原爆头倍率 */
  get oriHandShotMul() { return 2; }
  /** 爆头倍率 */
  get handShotMul() { return hAccMul(this.oriHandShotMul, this.handShotMulMul); }

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
  abstract get realProcChance(): number;

  /** 触发权重 */
  get procWeights() {
    let pD = this.panelDamage;
    return this.dmg.map(([vn, vv]) => ["Impact", "Puncture", "Slash"].includes(vn) ? [vn, hAccDiv(hAccMul(vv, 4), pD)] : [vn, hAccDiv(vv, pD)]) as [string, number][];;
  }

  /** 真实触发几率(各属性) */
  get procChanceMap() {
    let pC = this.realProcChance;
    let pW = this.procWeights;
    // 将触发率乘权重
    return pW.map(([vn, vv]) => [vn, hAccMul(vv, pC)]) as [string, number][];
  }

  /** 触发伤害(各属性) */
  get dotDamageMap() {
    let procs = this.procChanceMap;
    return procs.map(([vn, vv]) => {
      switch (vn) {
        // 切割伤害: https://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0/%E5%88%87%E5%89%B2%E4%BC%A4%E5%AE%B3
        case "Slash":
          return vv * this.baseDamage * 0.35 * ~~(6 * this.procDurationMul + 1);
        // 毒素伤害: https://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0/%E6%AF%92%E7%B4%A0%E4%BC%A4%E5%AE%B3
        case "Toxin":
        case "Gas":
          return vv * this.toxinBaseDamage * 0.5 * ~~(8 * this.procDurationMul + 1);
        // 火焰伤害: https://warframe.huijiwiki.com/wiki/%E4%BC%A4%E5%AE%B3_2.0/%E7%81%AB%E7%84%B0%E4%BC%A4%E5%AE%B3
        // 火焰触发不会叠加所以只计算一跳
        case "Heat":
          return vv * this.heatBaseDamage * 0.5;
      }
      return null;
    }).filter(Boolean);
  }

  /** 总触发伤害 */
  get dotDamage() { return this.dotDamageMap.reduce((a, b) => a + b[1], 0); }
  /** 面板基础伤害增幅倍率 */
  get panelBaseDamageMul() { return this.baseDamageMul; }
  /** 原平均爆头增伤倍率 */
  get oriHandShotDmgMul() { return hAccMul(this.handShotChance, this.oriHandShotMul - 1) + 1; }
  /** 平均爆头增伤倍率 */
  get handShotDmgMul() { return hAccMul(this.handShotChance, this.handShotMul - 1) + 1; }
  /** 面板伤害增幅倍率 */
  get panelDamageMul() { return hAccMul(this.panelBaseDamageMul, this.extraDmgMul); }
  /** 面板基础伤害 */
  get panelBaseDamage() { return hAccMul(this.originalDamage, this.panelBaseDamageMul); }
  /** 面板伤害 */
  get panelDamage() { return hAccMul(this.originalDamage, this.panelDamageMul); }
  /** 总伤增幅倍率 */
  get totalDamageMul() { return hAccMul(this.panelDamageMul, this.critDamageMul, this.handShotDmgMul); }
  /** 总伤害 */
  get totalDamage() { return hAccMul(this.originalDamage, this.totalDamageMul); }
  /** 原总伤害 */
  get oriTotalDamage() { return hAccMul(this.originalDamage, this.oriCritDamageMul, this.handShotDmgMul); }
  /** 基伤 */
  get baseDamage() { return hAccMul(this.originalDamage, this.baseDamageMul, this.critDamageMul); }
  /** 毒和毒气DoT的基伤 */
  get toxinBaseDamage() { return hAccMul(this.baseDamage, (1 + this.toxinMul)); }
  /** 火DoT的基伤 */
  get heatBaseDamage() { return hAccMul(this.baseDamage, (1 + this.heatMul)); }
  /** 攻速 */
  get fireRate() {
    let fr = hAccMul(this.weapon.fireRate, this.fireRateMul);
    // 攻速下限
    return fr < 0.05 ? 0.05 : fr;
  }
  /** 原平均暴击区增幅倍率 */
  get oriCritDamageMul() { return this.calcCritDamage(this.weapon.criticalChances, this.weapon.criticalMultiplier, this.handShotChance, this.oriHandShotMul); }
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
  protected _enemyDmgType = "";
  /** 歧视伤害类型 */
  get enemyDmgType() {
    return this._enemyDmgType;
  }
  /** 设置歧视伤害类型 */
  set enemyDmgType(value) {
    if (value !== "G" && value !== "C" && value !== "O" && value !== "S") return;
    this._enemyDmgType = value;
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

  /** 将Mod属性写入到增幅上 */
  calcMods() {
    this.reset();
    this._mods.forEach(mod => {
      mod.props.forEach(prop => this.applyProp(mod, prop[0], prop[1]));
    });
  }

  /** 重置所有属性增幅器 */
  reset() {
    this._baseDamageMul = 1 + this.extraBaseDamage;
    this._extraDmgMul = 1;
    this._critChanceMul = 1;
    this._critMulMul = 1;
    this._procChanceMul = 1;
    this._procDurationMul = 1;
    this._enemyDmgMul = 1;
    this._handShotMulMul = 1;
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
  }

  /** 清除所有MOD并重置属性增幅器 */
  clear() {
    this._mods = [];
    this.reset();
  }

  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    // 如果相应的P卡已经存在则不使用
    if (this._mods.some(v => v.id === mod.primed))
      return false;
    // 只允许选择的元素
    if (this.allowElementTypes)
      if (mod.props.some(v => ExtraDmgSet.has(v[0])))
        if (!mod.props.some(v => this.allowElementTypes.includes(v[0])))
          return false;
    // 过滤一些需要前置MOD的MOD
    for (let i = 0; i < NormalCardDependTable.length; i++) {
      const depend = NormalCardDependTable[i];
      if (mod.name === depend[0]) {
        if (!this._mods.some(v => v.name === depend[1]))
          return false;
      }
    }
    return true;
  }

  /**
   * 返回MOD价值收益
   * @param index 也可以是mod.id
   * @return MOD价值收益
   */
  modValue(index: number | string) {
    if (typeof index === "string")
      index = this._mods.findIndex(v => v.id === index);
    if (!this._mods[index]) return 0;
    let nb = new (this.constructor as any)(this.weapon, this.riven, this.options);
    nb._mods = this.mods;
    nb.calcMods();
    let oldVal = nb.compareDamage;
    nb._mods.splice(index, 1);
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
        case 'D': // 伤害 baseDmg
          return mod.props[0][1] / this._baseDamageMul;
        case '4': // 火焰伤害 heatDmg
        case '5': // 冰冻伤害 coldDmg
        case '6': // 毒素伤害 toxiDmg
        case '7': // 电击伤害 elecDmg
          return mod.props[0][1] / this._extraDmgMul;
        case '8': // 冲击伤害 impaDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Impact");
          if (oriDmg)
            return mod.props[0][1] * oriDmg[1] / this.originalDamage / this._extraDmgMul;
          break;
        case '9': // 穿刺伤害 puncDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Puncture");
          if (oriDmg)
            return mod.props[0][1] * oriDmg[1] / this.originalDamage / this._extraDmgMul;
          break;
        case 'A': // 切割伤害 slasDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Slash");
          if (oriDmg)
            return mod.props[0][1] * oriDmg[1] / this.originalDamage / this._extraDmgMul;
          break;
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
   * @param useRiven 是否使用紫卡 0=不用 1=自动选择 2=必须用
   */
  fill(slots = 8, useRiven = 1) {
    // 初始化
    this.clear();
    this.fillEmpty(slots, useRiven);
  }

  /**
   * 自动按武器属性填充MOD(不移除已有)
   * @param slots 可用的插槽数
   * @param useRiven 是否使用紫卡 0=不用 1=自动选择 2=必须用
   */
  fillEmpty(slots = 8, useRiven = 1) {
    // 根据武器自动选择所有可安装的MOD
    let mods = this.avaliableMods.slice();// 通过.slice()返回一个COPY
    if (useRiven > 0) {
      if (useRiven == 2)
        this.applyMod(this.riven.normalMod); // 1. 将紫卡直接插入
      else
        mods.push(this.riven.normalMod); // 1. 将紫卡作为一张普卡进行计算
    }
    let sortableMods = mods.map(v => [v, 0] as [NormalMod, number]);
    while (this._mods.length < slots) {
      // 2. 计算收益
      sortableMods.forEach(v => {
        v[1] = this.testMod(v[0]);
        // v[1] > 0 && console.log("测试收益: ", v[0].name, "的收益是", v[1]);
      });
      // 3. 把所有卡按收益排序
      sortableMods.sort((a, b) => b[1] == a[1] ? b[0].name.localeCompare(a[0].name) : b[1] - a[1]);
      if (sortableMods.length > 0) {
        // console.log("计算收益最高值: ", sortableMods[0][0].name, "的收益是", sortableMods[0][1]);
        // 4. 将收益最高的一项插入并移出数组
        this.applyMod(sortableMods.shift()[0]);
        // 5. 重复以上步骤直到卡槽充满
      }
    }
  }
  /**
   * 自动按武器属性生成最佳紫卡
   */
  findBestRiven(slots = 8): RivenMod {
    let newBuild: ModBuild = new (this.constructor as any)(this.weapon, this.riven, this.options);
    // 生成所有紫卡

    // 1. 列出所有属性
    let avaliableProps = RivenPropertyDataBase[this.riven.mod].filter(v => {
      if (v.noDmg) return false;
      if (!this.enemyDmgType && ["G", "I", "C", "O"].includes(v.id)) return false;
      if (this.allowElementTypes) {
        if (["4", "5", "6", "7", "8", "9", "A"].includes(v.id))
          if (!this.allowElementTypes.includes(v[0]))
            return false;
      } else if (["4", "5", "6"].includes(v.id)) {
        return false;
      }
      return true;
    }).map(v => {
      let base = RivenDataBase.getPropBaseValue(this.riven.name, v.id);
      return new ValuedRivenProperty(v, base, base, 1);
    });
    let propsOfMods = choose(avaliableProps, 3); // 只用三条属性 代表3+1-
    // 负面属性
    let negativeProp = RivenPropertyDataBase[this.riven.mod].find(v => v.name === "变焦" || v.name === "处决伤害");
    let valuedNegativeProp = new ValuedRivenProperty(negativeProp, RivenDataBase.getPropBaseValue(this.riven.name, negativeProp.id) * -0.83, RivenDataBase.getPropBaseValue(this.riven.name, negativeProp.id), 1);

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
  applyProp(mod: NormalMod, pName: string, pValue: number) {
    let oriDmg: [string, number];
    switch (pName) {
      case '0': // 暴击率 critChance
        this._critChanceMul = hAccSum(this._critChanceMul, pValue);
        break;
      case '1': // 暴击伤害 critMul
        this._critMulMul = hAccSum(this._critMulMul, pValue);
        break;
      case '2': // 触发几率 procChance
        this._procChanceMul = hAccSum(this._procChanceMul, pValue);
        break;
      case '3': // 触发时间 procDuration
        this._procDurationMul = hAccSum(this._procDurationMul, pValue);
        break;
      case '4': // 火焰伤害 heatDmg
        this.heatMul = hAccSum(this.heatMul, pValue);
        break;
      case '5': // 冰冻伤害 coldDmg
        this.coldMul = hAccSum(this.coldMul, pValue);
        break;
      case '6': // 毒素伤害 toxinDmg
        this.toxinMul = hAccSum(this.toxinMul, pValue);
        break;
      case '7': // 电击伤害 electricityDmg
        this.electricityMul = hAccSum(this.electricityMul, pValue);
        break;
      case '8': // 冲击伤害 impaDmg
        this.impactMul = hAccSum(this.impactMul, pValue);
        break;
      case '9': // 穿刺伤害 puncDmg
        this.punctureMul = hAccSum(this.punctureMul, pValue);
        break;
      case 'A': // 切割伤害 slasDmg
        this.slashMul = hAccSum(this.slashMul, pValue);
        break;
      case 'G': // 对Grineer伤害 grinDmg
        if (this._enemyDmgType === "G")
          this._enemyDmgMul += pValue;
        break;
      case 'I': // 对Infested伤害 infeDmg
        if (this._enemyDmgType === "I")
          this._enemyDmgMul += pValue;
        break;
      case 'C': // 对Corpus伤害 corpDmg
        if (this._enemyDmgType === "C")
          this._enemyDmgMul += pValue;
        break;
      case 'O': // 对堕落者伤害
        if (this._enemyDmgType === "O")
          this._enemyDmgMul += pValue;
        break;
      case '爆头伤害': /* 爆头伤害 handShotMul */this._handShotMulMul += pValue; break;
      default:
    }
  }
}
