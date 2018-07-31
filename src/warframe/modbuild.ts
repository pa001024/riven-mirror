import { NormalMod, Weapon } from "@/warframe/data";
import { RivenMod } from "@/warframe/rivenmod";
import _ from "lodash";

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
  protected _originalDamage: number;
  abstract get compareDamage(): any;

  // 额外参数
  allowElementTypes: string[] = null;

  // ### 计算属性 ###

  /** 攻速 */
  get fireRate() { return this.weapon.fireRate * this.fireRateMul; }

  /** 武器原本伤害 */
  get originalDamage(): number {
    if (!this._originalDamage)
      this._originalDamage = this.weapon.dmg.reduce((a, b) => a + b[1], 0);
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
    if (value !== "G" && value !== "C" && value !== "G" && value !== "O" && value !== "S") return;
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
      return ((1 + (1 - v) * p) * (m * (n - 1) + 1) + m * n * p * v) / (p + 1);
    if (p != 0)
      return m * (n - 1) + 1 + 2 * m * n * p / (p + 1);
    return m * (n - 1) + 1;
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
    })
  }
  /** 重置所有属性增幅器 */
  reset() {
    this._baseDamageMul = 1;
    this._extraDmgMul = 1;
    this._critChanceMul = 1;
    this._critMulMul = 1;
    this._procChanceMul = 1;
    this._procDurationMul = 1;
    this._enemyDmgMul = 1;
    this._fireRateMul = 1;
  };
  /** 检测当前MOD是否可用 */
  isValidMod(mod: NormalMod) {
    // 如果相应的P卡已经存在则不使用
    if (this._mods.some(v => v.id === mod.primed))
      return false;
    // 只允许选择的元素
    if (this.allowElementTypes)
      if (mod.props.some(v => ["4", "5", "6", "7", "8", "9", "A"].includes(v[0])))
        if (!mod.props.every(v => this.allowElementTypes.includes(v[0])))
          return false;
    return true;
  };
  /** 返回MOD增幅数值 */
  testMod(mod: NormalMod) {
    // MOD查重
    if (!this.isValidMod(mod)) return -1;
    // 效率优化
    if (mod.props.length == 1) {
      let oriDmg: [string, number];
      switch (mod.props[0][0]) {
        case 'D': // 伤害 baseDmg
          return mod.props[0][1] / this._baseDamageMul;
        case '4': // 火焰伤害 fireDmg
        case '5': // 冰冻伤害 iceDmg
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
        console.log("计算收益最高值: ", sortableMods[0][0].name, "的收益是", sortableMods[0][1]);
        // 4. 将收益最高的一项插入并移出数组
        this.applyMod(sortableMods.shift()[0]);
        // 5. 重复以上步骤直到卡槽充满
      }
    }
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
        this._critChanceMul += pValue;
        break;
      case '1': // 暴击伤害 critMul
        this._critMulMul += pValue;
        break;
      case '2': // 触发几率 procChance
        this._procChanceMul += pValue;
        break;
      case '3': // 触发时间 procDuration
        this._procDurationMul += pValue;
        break;
      case '4': // 火焰伤害 fireDmg
      case '5': // 冰冻伤害 iceDmg
      case '6': // 毒素伤害 toxiDmg
      case '7': // 电击伤害 elecDmg
        this._extraDmgMul += pValue;
        break;
      case '8': // 冲击伤害 impaDmg
        oriDmg = this.weapon.dmg.find(v => v[0] == "Impact");
        if (oriDmg)
          this._extraDmgMul += pValue * oriDmg[1] / this.originalDamage;
        break;
      case '9': // 穿刺伤害 puncDmg
        oriDmg = this.weapon.dmg.find(v => v[0] == "Puncture");
        if (oriDmg)
          this._extraDmgMul += pValue * oriDmg[1] / this.originalDamage;
        break;
      case 'A': // 切割伤害 slasDmg
        oriDmg = this.weapon.dmg.find(v => v[0] === "Slash");
        if (oriDmg)
          this._extraDmgMul += pValue * oriDmg[1] / this.originalDamage;
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
      default:
    }
  }
}
