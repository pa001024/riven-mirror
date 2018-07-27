import { GunWeapon, NormalMod, NormalModDatabase, NormalCardDependTable } from "./data";
import { RivenMod } from "./rivenmod";
import _ from "lodash";


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

export enum CompareMode {
  TotalDamage,// 单发伤害
  BurstDamage,// 爆发伤害
  SustainedDamage // 持续伤害
}
/** 枪类 */
export class GunModBuild {
  db: NormalMod[]
  weapon: GunWeapon
  riven: RivenMod
  /** 所有适用的MOD */
  modDB: NormalMod[]
  private _mods: NormalMod[] = [];
  private _originalDamage: number;
  // 增幅器
  private _baseDamageMul = 1;
  private _critChanceMul = 1;
  private _critMulMul = 1;
  private _multishotMul = 1;
  private _extraDmgMul = 1;
  private _magazineMul = 1;
  private _fireRateMul = 1;
  private _reloadSpeedMul = 1;
  private _handShotMulMul = 1;
  private _procChanceMul = 1;
  private _procDurationMul = 1;
  private _enemyDmgMul = 1;
  private _maxAmmoMul = 1;
  private _zoomMul = 1;
  private _projectileSpeedMul = 1;
  private _recoilMul = 1;
  private _punchThrough = 0;
  // 额外参数
  private _handShotChance = 0;
  private _enemyDmgType = "";
  compareMode: CompareMode = CompareMode.TotalDamage;
  /** 歧视伤害类型 */
  get enemyDmgType() {
    return this._enemyDmgType;
  }
  /** 设置歧视伤害类型 */
  set enemyDmgType(value) {
    if (value !== "G" && value !== "C" && value !== "G" && value !== "O" && value !== "S") return;
    this._enemyDmgType = value;
  }

  constructor(riven: RivenMod, selected: string) {
    let weapons = riven.weapons;
    this.weapon = weapons.find(v => selected === v.name) || weapons[0];
    this.riven = riven;
    this.modDB = NormalModDatabase.filter(v => this.weapon.tags.includes(v.type));
  }
  /** 获取MOD列表 */
  get mods() {
    return _.cloneDeep(this._mods);
  }
  //region 属性
  /** 变焦增幅倍率 */
  get zoomMul() {
    return this._zoomMul;
  }
  /** 抛射物飞行速度增幅倍率 */
  get projectileSpeedMul() {
    return this._projectileSpeedMul;
  }
  /** 后坐力增幅倍率 */
  get recoilMul() {
    return this._recoilMul;
  }
  //regionend 属性
  /** 穿透增幅量 */
  get punchThrough() {
    return this._punchThrough;
  }
  /** 触发时间增幅倍率 */
  get procDurationMul() {
    return this._procDurationMul;
  }
  /** 种族伤害增幅倍率 */
  get enemyDmgMul() {
    return this._enemyDmgMul;
  }
  /** 最大弹容增幅倍率 */
  get maxAmmoMul() {
    return this._maxAmmoMul;
  }
  /** 爆头概率 */
  get handShotChance() {
    return this._handShotChance;
  }
  /** 设置爆头概率 */
  set handShotChance(value) {
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    this._handShotChance = value;
  }
  /** 爆头倍率 */
  get handShotMul() {
    return 2 * this._handShotMulMul;
  }
  /** 武器原本伤害 */
  get originalDamage(): number {
    if (!this._originalDamage)
      this._originalDamage = this.weapon.dmg.reduce((a, b) => a + b[1], 0);
    return this._originalDamage;
  }
  /** 基伤增幅倍率 */
  get baseDamageMul() {
    return this._baseDamageMul;
  }
  /** 触发几率增幅倍率 */
  get procChanceMul() {
    return this._procChanceMul;
  }
  /** 额伤增幅倍率 */
  get extraDmgMul() {
    return this._extraDmgMul;
  }
  /** 多重增幅倍率 */
  get multishotMul() {
    return this._multishotMul;
  }
  /** 暴击率增幅倍率 */
  get critChanceMul() {
    return this._critChanceMul;
  }
  /** 暴击伤害增幅倍率 */
  get critMulMul() {
    return this._critMulMul;
  }
  /** 射速增幅倍率 */
  get fireRateMul() {
    return this._fireRateMul;
  }
  get fireRate() {
    return this.weapon.fireRate * this.fireRateMul;
  }
  /** 换弹增幅倍率 */
  get reloadSpeedMul() {
    return this._reloadSpeedMul;
  }
  /** 换弹时间 */
  get reloadTIme() {
    return this.weapon.reload / this.reloadSpeedMul;
  }
  /** 弹夹容量增幅倍率 */
  get magazineMul() {
    return this._magazineMul;
  }
  /** 弹夹容量 */
  get magazineSize() {
    return Math.round(this.weapon.magazine * this.magazineMul);
  }
  /** 平均暴击区增幅倍率 */
  get critDamageMul() {
    return this.calcCritDamage(this.weapon.criticalChances / 100 * this.critChanceMul, this.weapon.criticalMultiplier * this.critMulMul, this.handShotChance, this.handShotMul);
  }
  /** 爆发伤害增幅倍率 */
  get burstDamageMul() {
    return this.totalDamageMul * this.fireRateMul;
  }
  /** 总伤增幅倍率 */
  get totalDamageMul() {
    return this.baseDamageMul * this.multishotMul * this.extraDmgMul * this.critDamageMul;
  }
  /** 平均射速增幅倍率  */
  get sustainedFireRateMul() {
    return (1 / this.weapon.fireRate + this.weapon.reload / this.weapon.magazine) * this.sustainedFireRate;
  }
  /** 平均射速=1/(1/射速+装填/弹匣) */
  get sustainedFireRate() {
    return 1 / (1 / this.fireRate + this.reloadTIme / this.magazineSize);
  }
  /** 持续伤害增幅倍率  */
  get sustainedDamageMul() {
    return this.totalDamageMul * this.sustainedFireRateMul;
  }
  /** 总伤害 */
  get totalDamage() {
    return this.originalDamage * this.totalDamageMul;
  }
  /** 爆发伤害 */
  get burstDamage() {
    return this.totalDamage * this.fireRate;
  }
  /** 持续伤害 */
  get sustainedDamage() {
    return this.totalDamage * this.sustainedFireRate;
  }
  get compareDamage() {
    return this.compareMode == CompareMode.TotalDamage ? this.totalDamage : this.compareMode == CompareMode.BurstDamage ? this.burstDamage : this.sustainedDamage;
  }
  /** 应用MOD */
  applyMod(mod: NormalMod) {
    this._mods.push(mod);
    this.calcMods();
    return this;
  }
  /** 检测相应的P卡是否已存在 */
  isValidMod(mod: NormalMod) {
    if (mod.primed && this._mods.some(v => v.id === mod.primed))
      return false;
    for (let i = 0; i < NormalCardDependTable.length; i++) {
      const depend = NormalCardDependTable[i];
      if (mod.name === depend[0]) {
        if (!this._mods.some(v => v.name === depend[1]))
          return false;
      }
    }
    return true;
  }
  /** 返回MOD增幅数值 */
  testMod(mod: NormalMod) {
    // MOD查重
    if (!this.isValidMod(mod)) return 0;
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
        case '8': // 冲击伤害 puncDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Puncture");
          if (oriDmg)
            return mod.props[0][1] * oriDmg[1] / this.originalDamage / this._extraDmgMul;
          break;
        case '9': // 穿刺伤害 impaDmg
          oriDmg = this.weapon.dmg.find(v => v[0] == "Impact");
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
  /**
   * 自动按武器属性填充MOD
   * @param slots 可用的插槽数
   * @param useRiven 是否使用紫卡 0=不用 1=自动选择 2=必须用
   */
  fill(slots = 8, useRiven = 1) {
    // 根据武器自动选择所有可安装的MOD
    let mods = this.modDB.slice();// 通过.slice()返回一个COPY
    if (useRiven > 0) {
      if (useRiven == 2)
        this.applyMod(this.riven.normalMod); // 1. 将紫卡直接插入
      else
        mods.push(this.riven.normalMod); // 1. 将紫卡作为一张普卡进行计算
    }
    let sortableMods = mods.map(v => [v, 0] as [NormalMod, number]);
    while (this._mods.length < slots) {
      // 2. 计算收益
      sortableMods.forEach(v => { v[1] = this.testMod(v[0]); });
      // 3. 把所有卡按收益排序
      sortableMods.sort((a, b) => b[1] - a[1]);
      // console.log("sortableMods[0]", sortableMods[0][0].name);
      // 4. 将收益最高的一项插入并移出数组
      this.applyMod(sortableMods.shift()[0]);
      // 5. 重复以上步骤直到卡槽充满
      // console.log("compareDamage", this.compareDamage);
    }
  }
  /** 重置所有属性增幅器 */
  reset() {
    this._baseDamageMul = 1;
    this._critChanceMul = 1;
    this._critMulMul = 1;
    this._multishotMul = 1;
    this._extraDmgMul = 1;
    this._magazineMul = 1;
    this._fireRateMul = 1;
    this._reloadSpeedMul = 1;
    this._handShotMulMul = 1;
    this._procChanceMul = 1;
    this._procDurationMul = 1;
    this._enemyDmgMul = 1;
    this._maxAmmoMul = 1;
    this._zoomMul = 1;
    this._projectileSpeedMul = 1;
    this._recoilMul = 1;
    this._punchThrough = 0;
  }
  /** 将Mod属性写入到增幅上 */
  calcMods() {
    this.reset();
    this._mods.forEach(mod => {
      mod.props.forEach(prop => {
        let oriDmg: [string, number];
        switch (prop[0]) {
          case '0': // 暴击率 critChance
            this._critChanceMul += prop[1];
            break;
          case '1': // 暴击伤害 critMul
            this._critMulMul += prop[1];
            break;
          case '2': // 触发几率 procChance
            this._procChanceMul += prop[1];
            break;
          case '3': // 触发时间 procDuration
            this._procDurationMul += prop[1];
            break;
          case '4': // 火焰伤害 fireDmg
          case '5': // 冰冻伤害 iceDmg
          case '6': // 毒素伤害 toxiDmg
          case '7': // 电击伤害 elecDmg
            this._extraDmgMul += prop[1];
            break;
          case '8': // 冲击伤害 puncDmg
            oriDmg = this.weapon.dmg.find(v => v[0] === "Puncture");
            if (oriDmg)
              this._extraDmgMul += prop[1] * oriDmg[1] / this.originalDamage;
            break;
          case '9': // 穿刺伤害 impaDmg
            oriDmg = this.weapon.dmg.find(v => v[0] === "Impact");
            if (oriDmg)
              this._extraDmgMul += prop[1] * oriDmg[1] / this.originalDamage;
            break;
          case 'A': // 切割伤害 slasDmg
            oriDmg = this.weapon.dmg.find(v => v[0] === "Slash");
            if (oriDmg)
              this._extraDmgMul += prop[1] * oriDmg[1] / this.originalDamage;
            break;
          case 'G': // 对Grineer伤害 grinDmg
            if (this._enemyDmgType === "G")
              this._enemyDmgMul += prop[1];
            break;
          case 'I': // 对Infested伤害 infeDmg
            if (this._enemyDmgType === "I")
              this._enemyDmgMul += prop[1];
            break;
          case 'C': // 对Corpus伤害 corpDmg
            if (this._enemyDmgType === "C")
              this._enemyDmgMul += prop[1];
            break;
          case 'O':
            if (this._enemyDmgType === "O")
              this._enemyDmgMul += prop[1];
            break;
          case 'D': // 伤害 baseDmg
            this._baseDamageMul += prop[1];
            break;
          case 'S': // 多重射击 multiShot
            this._multishotMul += prop[1];
            break;
          case 'R': // 射速（弓类武器效果加倍） fireRate
            this._fireRateMul += prop[1];
            break;
          case 'L': // 弹匣容量 magazine
            this._magazineMul += prop[1];
            break;
          case 'F': // 装填速度 reloadSpeed
            this._reloadSpeedMul += prop[1];
            break;
          case 'M': // 弹药最大值 maxAmmo'
            this._maxAmmoMul += prop[1];
            break;
          case 'P': // 穿透 punchThrough
            this._punchThrough += prop[1];
            break;
          case 'H': // 变焦 zoom
            this._zoomMul += prop[1];
            break;
          case 'V': // 抛射物飞行速度 projectileSpeed
            this._projectileSpeedMul += prop[1];
            break;
          case 'Z': // 后坐力 recoil
            this._recoilMul += prop[1];
            break;
          default:
        }
      });
    })
  }
}

/** 枪类 */
export class ModBuildMelee {
  db: NormalMod[]
  weapon: GunWeapon
  riven: RivenMod
  private _mods: NormalMod[]
  private _originalDamage: number;
  // 增幅器
  private _baseDamageMul = 1;
  private _critChanceMul = 1;
  private _critMulMul = 1;
  private _extraDmgMul = 1;
  private _procChanceMul = 1;
  private _procDurationMul = 1;
  private _enemyDmgMul = 1;
  private _rangeMul = 1;
  private _attackSpeedMul = 1;
  private _chargeMulMul = 1;
  private _chargeEffMul = 1;
  private _comboDurationAdd = 0;
  private _slideCritChanceMul = 1;
  private _execDmgMul = 1;
  // 额外参数
  private _handShotChance = 0;
  private _enemyDmgType = "";
  /** 歧视伤害类型 */
  get enemyDmgType() {
    return this._enemyDmgType;
  }
  /** 设置歧视伤害类型 */
  set enemyDmgType(value) {
    if (value !== "G" && value !== "C" && value !== "G" && value !== "O" && value !== "S") return;
    this._enemyDmgType = value;
  }
  /** 爆头概率 */
  get handShotChance() {
    return this._handShotChance;
  }
  /** 设置爆头概率 */
  set handShotChance(value) {
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    this._handShotChance = value;
  }
  // 属性
  /** 基伤增幅倍率 */
  get baseDamageMul() {
    return this._baseDamageMul;
  }
  /** 触发几率增幅倍率 */
  get procChanceMul() {
    return this._procChanceMul;
  }
  /** 额伤增幅倍率 */
  get extraDmgMul() {
    return this._extraDmgMul;
  }
  /** 暴击率增幅倍率 */
  get critChanceMul() {
    return this._critChanceMul;
  }
  /** 暴击伤害增幅倍率 */
  get critMulMul() {
    return this._critMulMul;
  }
  /** 范围增幅倍率 */
  get rangeMul() {
    return this._rangeMul;
  }
  /** 攻击速度增幅倍率 */
  get attackSpeedMul() {
    return this._attackSpeedMul;
  }
  /** 充能倍率增幅倍率 */
  get chargeMulMul() {
    return this._chargeMulMul;
  }
  /** 充能效率增幅倍率 */
  get chargeEffMul() {
    return this._chargeEffMul;
  }
  /** 连击时间增值 */
  get comboDurationAdd() {
    return this._comboDurationAdd;
  }
  /** 滑行暴击增幅倍率 */
  get slideCritChanceMul() {
    return this._slideCritChanceMul;
  }
  /** 处决伤害增幅倍率 */
  get execDmgMul() {
    return this._execDmgMul;
  }
  /** 触发时间增幅倍率 */
  get procDurationMul() {
    return this._procDurationMul;
  }
  /** 种族伤害增幅倍率 */
  get enemyDmgMul() {
    return this._enemyDmgMul;
  }
  /** 武器原本伤害 */
  get originalDamage(): number {
    if (!this._originalDamage)
      this._originalDamage = this.weapon.dmg.reduce((a, b) => a + b[1], 0);
    return this._originalDamage;
  }
  /** 平均暴击区增幅倍率 */
  get critDamageMul() {
    return this.calcCritDamage(this.weapon.criticalChances * this.critChanceMul, this.weapon.criticalMultiplier * this.critMulMul, this.handShotChance);
  }
  /** 总伤害 */
  get totalDamage() {
    return 0;
  }
  /** 应用MOD */
  applyMod(mod: NormalMod) {
    this._mods.push(mod);
    this.calcMods();
    return this;
  }
  /** 返回MOD增幅数值 */
  testMod(mod) {
    let oldVal = this.totalDamage;
    this._mods.push(mod);
    this.calcMods();
    let newVal = this.totalDamage;
    this._mods.pop();
    this.calcMods();
    return newVal / oldVal;
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
  /**
   * 自动按武器属性填充MOD
   */
  fill() {
    // 根据武器自动选择所有可安装的MOD
    let mods = this.db.filter(Boolean);// TODO
    // 1. 将紫卡作为一张普卡进行计算
    mods.push(this.riven.normalMod);
    let sortableMods = mods.map(v => [v, this.testMod(v)] as [NormalMod, number]);
    while (this._mods.length < 8) {
      // 2. 把所有卡按收益排序
      sortableMods.sort((a, b) => b[1] - a[1]);
      // 3. 将收益最高的一项插入并移出数组
      console.log("insert mod", sortableMods[0]);
      this.applyMod(sortableMods.shift()[0]);
      // 4. 重复以上步骤直到卡槽充满
    }
  }
  /** 重置所有属性增幅器 */
  reset() {
    this._baseDamageMul = 1;
    this._critChanceMul = 1;
    this._critMulMul = 1;
    this._extraDmgMul = 1;
    this._procChanceMul = 1;
    this._procDurationMul = 1;
    this._enemyDmgMul = 1;
    this._rangeMul = 1;
    this._attackSpeedMul = 1;
    this._chargeMulMul = 1;
    this._chargeEffMul = 1;
    this._comboDurationAdd = 0;
    this._slideCritChanceMul = 1;
    this._execDmgMul = 1;
  }
  /** 将Mod属性写入到增幅上 */
  calcMods() {
    this.reset();
    this._mods.forEach(mod => {
      mod.props.forEach(prop => {
        let oriDmg: [string, number];
        switch (prop[0]) {
          case '0': // 暴击率 critChance
            this._critChanceMul += prop[1];
            break;
          case '1': // 暴击伤害 critMul
            this._critMulMul += prop[1];
            break;
          case '2': // 触发几率 procChance
            this._procChanceMul += prop[1];
            break;
          case '3': // 触发时间 procDuration
            this._procDurationMul += prop[1];
            break;
          case '4': // 火焰伤害 fireDmg
          case '5': // 冰冻伤害 iceDmg
          case '6': // 毒素伤害 toxiDmg
          case '7': // 电击伤害 elecDmg
            this._extraDmgMul += prop[1];
            break;
          case '8': // 冲击伤害 puncDmg
            oriDmg = this.weapon.dmg.find(v => v[0] == "Puncture");
            if (oriDmg)
              this._extraDmgMul += prop[1] * oriDmg[1] / this.originalDamage;
            break;
          case '9': // 穿刺伤害 impaDmg
            oriDmg = this.weapon.dmg.find(v => v[0] == "Impact");
            if (oriDmg)
              this._extraDmgMul += prop[1] * oriDmg[1] / this.originalDamage;
            break;
          case 'A': // 切割伤害 slasDmg
            oriDmg = this.weapon.dmg.find(v => v[0] == "Slash");
            if (oriDmg)
              this._extraDmgMul += prop[1] * oriDmg[1] / this.originalDamage;
            break;
          case 'G': // 对Grineer伤害 grinDmg
            if (this._enemyDmgType === "G")
              this._enemyDmgMul += prop[1];
            break;
          case 'I': // 对Infested伤害 infeDmg
            if (this._enemyDmgType === "I")
              this._enemyDmgMul += prop[1];
            break;
          case 'C': // 对Corpus伤害 corpDmg
            if (this._enemyDmgType === "C")
              this._enemyDmgMul += prop[1];
            break;
          case 'O':
            if (this._enemyDmgType === "O")
              this._enemyDmgMul += prop[1];
            break;
          case 'K': // 近战伤害 baseDmg
            this._baseDamageMul += prop[1];
            break;
          case 'T': // 攻击范围 range
            this._rangeMul += prop[1];
            break;
          case 'J': // 攻击速度 attackSpeed
            this._attackSpeedMul += prop[1];
            break;
          case 'B': // 充能伤害 chargeMul
            this._chargeMulMul += prop[1];
            break;
          case 'U': // 充能效率 chargeEff
            this._chargeEffMul += prop[1];
            break;
          case 'N': // 连击持续时间 comboDuration
            this._comboDurationAdd += prop[1];
            break;
          case 'E': // 滑行攻击造成暴击几率 slideCritChance
            this._slideCritChanceMul += prop[1];
            break;
          case 'X': // 处决伤害 execDmg
            this._execDmgMul += prop[1];
            break;
          default:
        }
      });
    })
  }
  constructor() {

  }
}
