import { camelCase, cloneDeep, forEachRight, compact, clone } from "lodash-es";
import { Codex, Weapon } from "./codex";
import { i18n } from "@/i18n";
import { NormalMod, NormalModDatabase } from "./codex/mod";
import { hAccSum } from "./util";
import { Buff, BuffList } from "./codex/buff";
import { base62, debase62 } from "./lib/base62";
import { HH } from "@/var";
import { Companion, CompanionDataBase } from "./codex/companion";
import { CommonBuild } from "./commonbuild";
import { MeleeModBuild } from "./meleemodbuild";
// TODO
export enum CompanionCompareMode {
  EffectiveHealth, // 有效血量
  Health, // 血量
  Armor, // 护甲
  Shield, // 护盾
  Attack, // 攻击
}
export interface CompanionBuildOptions {
  compareMode?: CompanionCompareMode;
  healthLinkRef?: number;
  shieldLinkRef?: number;
  armorLinkRef?: number;
}

export class CompanionBuild implements CommonBuild {
  data: Companion;
  protected _rawmods: NormalMod[] = [];
  protected _mods: NormalMod[] = [];
  protected _buffs: Buff[] = [];

  /** 所有适用的MOD */
  protected avaliableMods: NormalMod[] = [];

  /** 原型MOD列表 */
  get rawMods() {
    return this._rawmods;
  }
  /** MOD列表 */
  get mods() {
    return cloneDeep(this._mods);
  }
  set mods(value) {
    this._rawmods = cloneDeep(value);
    this._mods = this.mapRankUpMods(value);
    this.calcMods();
    this.recalcPolarizations();
  }
  /** 加成列表 */
  get buffs() {
    return cloneDeep(this._buffs);
  }
  set buffs(value) {
    this._buffs = cloneDeep(value);
    this.calcMods();
  }

  /** ID */
  get id() {
    return this.data.id;
  }
  /** 本地化名称 */
  get name() {
    return i18n.t(`messages.${camelCase(this.data.id)}`);
  }
  /** 类型 */
  get type() {
    return "Companion";
  }
  /** 基础ID */
  get baseId() {
    return this.data.className || this.data.id;
  }
  /** 属性标记 */
  get tags() {
    return this.data.tags.concat(["Companion", this.baseId]);
  }

  protected _healthMul: number;
  protected _healthAdd: number;
  protected _shieldMul: number;
  protected _armorMul: number;
  protected _armorAdd: number;
  protected _shieldRecharge: number;
  protected _enemyRadarAdd: number;
  protected _lootRadarAdd: number;
  protected _damageResistance: number;
  /** 链接 */
  protected _healthLink: number;
  protected _shieldLink: number;
  protected _armorLink: number;

  // ### 参数 ###

  compareMode = CompanionCompareMode.EffectiveHealth;

  healthLinkRef = 740;
  shieldLinkRef = 300;
  armorLinkRef = 150;

  // ### 基础属性 ###

  /** 生命 */
  get health() {
    return (this.data.health * this._healthMul) / 100 + this._healthAdd + (this.healthLinkRef * this._healthLink) / 100;
  }
  /** 护盾 */
  get shield() {
    return (this.data.shield * this._shieldMul) / 100 + (this.shieldLinkRef * this._shieldLink) / 100;
  }
  /** 护甲 */
  get armor() {
    return (this.data.armor * this._armorMul) / 100 + this._armorAdd + (this.armorLinkRef * this._armorLink) / 100;
  }
  /** 敌人雷达 */
  get enemyRadar() {
    return this._enemyRadarAdd / 100;
  }
  /** 物品雷达 */
  get lootRadar() {
    return this._lootRadarAdd / 100;
  }
  /** 伤害减免 */
  get damageResistance() {
    return this._damageResistance / 100;
  }
  /** 有效生命 */
  get effectiveHealth() {
    return (this.shield + this.health * (1 + this.armor / 300)) / (1 - this.damageResistance);
  }
  /** 对比参数 */
  get compareValue() {
    switch (this.compareMode) {
      default:
      case CompanionCompareMode.EffectiveHealth:
        return this.effectiveHealth;
      case CompanionCompareMode.Health:
        return this.health;
      case CompanionCompareMode.Armor:
        return this.armor;
      case CompanionCompareMode.Shield:
        return this.shield;
      case CompanionCompareMode.Attack:
        return this.attackBuild.normalDamage;
    }
  }

  constructor(data: Companion | string, options: CompanionBuildOptions = null) {
    if (typeof data === "string") data = CompanionDataBase.getCompanionById(data);
    if (!data) return;
    if ((this.data = data)) {
      this.avaliableMods = NormalModDatabase.filter(v => this.tags.includes(v.type));
    }
    if (options) {
      this.options = options;
    }
    // 狗里藏刀
    if (this.data.damage) {
      this.attackBuild = new MeleeModBuild(
        new Weapon({
          name: this.id,
          tags: ["Companion"],
          modes: [
            {
              damage: data.damage,
              critChance: data.critChance / 100,
              critMul: data.critMul,
              procChance: data.procChance / 100,
              fireRate: 60,
            },
          ],
        }),
        null,
        null,
        true
      );
      this.attackBuild.compareMode = 0;
    }
    this.reset();
  }

  set options(options: CompanionBuildOptions) {
    this.compareMode = typeof options.compareMode !== "undefined" ? options.compareMode : this.compareMode;
    this.healthLinkRef = typeof options.healthLinkRef !== "undefined" ? options.healthLinkRef : this.healthLinkRef;
    this.shieldLinkRef = typeof options.shieldLinkRef !== "undefined" ? options.shieldLinkRef : this.shieldLinkRef;
    this.armorLinkRef = typeof options.armorLinkRef !== "undefined" ? options.armorLinkRef : this.armorLinkRef;
  }
  get options(): CompanionBuildOptions {
    return {
      compareMode: this.compareMode,
      healthLinkRef: this.healthLinkRef,
      shieldLinkRef: this.shieldLinkRef,
      armorLinkRef: this.armorLinkRef,
    };
  }

  /** 重置属性 */
  reset() {
    this._healthMul = 100;
    this._healthAdd = 0;
    this._shieldMul = 100;
    this._armorMul = 100;
    this._armorAdd = 0;
    this._shieldRecharge = 100;
    this._enemyRadarAdd = 0;
    this._lootRadarAdd = 0;
    this._damageResistance = 0;
    this._healthLink = 0;
    this._shieldLink = 0;
    this._armorLink = 0;
    this.recalcPolarizations();

    if (this.attackBuild) {
      this.attackBuild.reset();
    }
  }

  /**
   * 应用通用属性
   *
   * @param {(NormalMod)} mod MOD
   * @param {string} pName 属性id或名称
   * @param {number} pValue 属性值
   * @memberof companionBuild
   */
  applyProp(mod: NormalMod, pName: string, pValue: number = 0) {
    switch (pName) {
      /** Health */ case "h":
        this._healthMul = hAccSum(this._healthMul, pValue);
        break;
      /** Health Link */ case "hl":
        this._healthLink = hAccSum(this._healthLink, pValue);
        break;
      /** extra Health */ case "eh":
        this._healthAdd = hAccSum(this._healthAdd, pValue);
        break;
      /** Shield */ case "s":
        this._shieldMul = hAccSum(this._shieldMul, pValue);
        break;
      /** Shield Link */ case "sl":
        this._shieldLink = hAccSum(this._shieldLink, pValue);
        break;
      /** Amror */ case "a":
        this._armorMul = hAccSum(this._armorMul, pValue);
        break;
      /** Amror Link */ case "al":
        this._armorLink = hAccSum(this._armorLink, pValue);
        break;
      /** AmrorAdd */ case "ea":
        this._armorAdd = hAccSum(this._armorAdd, pValue);
        break;
      /** ShieldRecharge */ case "r":
        this._shieldRecharge = hAccSum(this._shieldRecharge, pValue);
        break;
      /** EnemyRadar */ case "er":
        this._enemyRadarAdd = hAccSum(this._enemyRadarAdd, pValue);
        break;
      /** LootRadar */ case "lr":
        this._lootRadarAdd = hAccSum(this._lootRadarAdd, pValue);
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
   * @memberof companionBuild
   */
  applyMod(mod: NormalMod) {
    this._mods.push(mod);
    this.calcMods();
    return this;
  }

  /**
   * 应用加成
   *
   * @param {Buff} buff
   * @returns
   * @memberof companionBuild
   */
  applyBuff(buff: Buff) {
    this._buffs.push(buff);
    this.calcMods();
    return this;
  }

  /**
   * 将Mod属性写入到增幅上
   *
   * @memberof companionBuild
   */
  calcMods() {
    this.reset();
    this._mods.forEach(mod => {
      mod && forEachRight(mod.props, prop => this.applyProp(mod, prop[0], prop[1]));
    });
    // 加载Buff
    this._buffs.forEach(buff => {
      buff && buff.props.forEach(prop => this.applyProp(null, prop[0], prop[1]));
    });

    if (this.attackBuild) {
      this.attackBuild.mods = this.mods;
      this.attackBuild.buffs = this.buffs;
    }
  }

  /**
   * 清除所有MOD并重置属性增幅器
   *
   * @memberof companionBuild
   */
  clear() {
    this._mods = [];
    this.reset();
  }

  /**
   * 检测当前MOD是否可用
   *
   * @param {NormalMod} mod MOD
   * @returns {boolean}
   * @memberof companionBuild
   */
  isValidMod(mod: NormalMod): boolean {
    let mods = compact(this._mods);
    // 如果相应的P卡已经存在则不使用
    if (mods.some(v => v.id === mod.primed || v.primed === mod.id || (mod.primed && v.primed === mod.primed))) return false;
    return true;
  }

  /**
   * [纯函数] 映射组合MOD加成
   *
   * @param {NormalMod[]} mods
   * @returns {NormalMod[]}
   * @memberof companionBuild
   */
  mapRankUpMods(mods: NormalMod[]): NormalMod[] {
    return mods;
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
    nb.compareMode = this.compareMode;
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
    nb.compareMode = this.compareMode;
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
  fill(slots = 10, useRiven = 0) {
    // 初始化
    this.clear();
    this.fillEmpty(slots, useRiven);
  }
  /**
   * MOD自动填充V1
   *
   * @description 根据所需的属性计算最大化或最小化以填充空白
   * @memberof companionBuild
   */
  fillEmpty(slots = 10, useRiven = 0, lib = this.avaliableMods, rivenLimit = 0) {
    let mods = (this._mods = compact(this._mods));
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
    this._mods.length = 10;
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

  // === 计算属性 ===

  /**
   * 序列化支持
   * 20位 普通MOD序列 如00001A1B000000000000
   * 等级修饰符@0-A 如00001A@01B000000000000
   * 不定长buff序列 ![id]: [base62 encoded power]: [layer]
   * @type {string}
   * @memberof companionBuild
   */
  get miniCode(): string {
    let mods = this.mods;
    while (mods.length < 10) mods.push(null);
    let normal = mods.map(v => (v && v.key + (v.level !== v.maxLevel ? "@" + base62(v.level) : "")) || "00").join("");
    let buffseq = this.buffs.map(v => `_${v.data.id}:${v.powerEnable && v.power ? base62(v.power * 10) : ""}${v.layerEnable ? ":" + v.layer : ""}`).join("");
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
        if (w[1]) newBuff.power = debase62(w[1]) / 10;
        if (w[2]) newBuff.layer = +w[2];
        bufflist.push(newBuff);
      }
    });
    let mods = normal.map(v => {
      let key = v.substr(0, 2),
        level = v.substr(3, 4);
      let mod = cloneDeep(Codex.getNormalMod(key));
      if (level) mod.level = debase62(level);
      return mod;
    });
    this._buffs = bufflist;
    this.mods = mods;
  }
  get miniCodeURL() {
    return this.miniCode ? `https://${HH}/companion/${this.data.url}/${this.miniCode}` : `https://${HH}/companion/${this.data.url}`;
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

  // 容量计算与极化

  protected _polarizations: string[] = Array(10);
  get polarizations() {
    return this._polarizations;
  }
  /** 容量 */
  get totalCost() {
    let total = this.mods.reduce((a, _, i) => (a += this.getCost(i)), 0);
    return total;
  }

  /** 获取指定位置MOD的容量 */
  getCost(modIndex: number) {
    let mod = this.mods[modIndex];
    if (mod) return mod.calcCost(this.polarizations[modIndex]);
    return 0;
  }

  /** 最大容量 */
  get maxCost() {
    return 60;
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
  recalcPolarizations(allowedUmbra = 0) {
    // 自带的极性
    let defaultPolarities = this.data.polarities.slice();
    this._polarizations = Array(10).fill(null);
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
    let remainUmbra = allowedUmbra;
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

      if (remainUmbra || pol !== "w") {
        // console.log(`set pol [[${this._polarizations}]] ${modIndex - 2}: ${this._polarizations[modIndex - 2]} to ${pol}`)
        if (this._polarizations[modIndex] !== pol) {
          this._polarizations[modIndex] = pol;

          if (pol === "w") {
            --remainUmbra;
            ++this._umbraCount;
          } else {
            ++this._formaCount;
          }
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
          if (this._polarizations[modIndex] !== pol) {
            this._polarizations[modIndex] = pol;
            ++this._umbraCount;
          }
        }
      }
    }
    // console.log(this.allMods, this.allPolarizations)
    return this.polarizations;
  }

  // 野兽类同伴的攻击计算

  attackBuild: MeleeModBuild;

  get weapon() {
    return this.attackBuild && this.attackBuild.weapon;
  }
}

export * from "./codex/companion";
