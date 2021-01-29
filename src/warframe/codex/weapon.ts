import { map, mapValues, repeat, lowerCase, camelCase, reduce, maxBy } from "lodash-es";
import { i18n } from "@/i18n";
import { ProtoWeapon, Zoom, WeaponMode } from "./weapon.i";
import Axios from "axios";
import base64arraybuffer from "base64-arraybuffer";
// build from riven-mirror-data
import data from "../../../data/dist/weapons.data";
import proto from "../../../data/src/proto/weapon.proto";
import { strSimilarity } from "../util";
import { RivenDatabase, KitgunChamberData, ZawStrikeData } from ".";

export enum MainTag {
  Rifle,
  Shotgun,
  Secondary,
  Kitgun,
  Melee,
  Zaw,
  "Arch-Gun",
  "Arch-Melee",
  Amp,
}

export class WeaponTag {
  private _set: Set<string>;
  mainTag: MainTag;
  constructor(init?: string[]) {
    this._set = new Set(init || []);
    this.mainTag = MainTag[init.find(v => v != "Primary" && v != "Robotic Weapon")];
  }
  has(...tags: string[]) {
    return tags.every(v => {
      if (v === "Gun") return ![MainTag.Melee, MainTag.Zaw, MainTag.Amp, MainTag["Arch-Melee"]].includes(this.mainTag);
      return this._set.has(v);
    });
  }
  toArray() {
    return Array.from(this._set);
  }
}

export interface CoreWeaponMode extends Omit<WeaponMode, "damage"> {
  /** 本地化名称 */
  locName: string;
  /** 伤害 */
  damage: [string, number][];
}

export class Weapon {
  // 裂罅基础名称
  base?: string;
  // base
  name: string;
  /** MOD中可能出现的词缀 */
  tags: WeaponTag;
  /** 次要tag Tenno/G/C/I/Prime 等 */
  traits?: string[];
  /** 段位 */
  mastery?: number;
  /** 极性 */
  polarities?: string;
  /** 裂罅倾向 */
  disposition: number = 0;
  /** 主Tag Rifle/Melee 等 */
  mod: MainTag;
  get modText() {
    return MainTag[this.mod];
  }

  // gun
  reload?: number;
  magazine?: number;
  maxAmmo?: number;
  reloadStyle?: number; // Normal=0 Regenerate=1 ByRound=2
  // deep extra
  sniperComboMin?: number;
  sniperComboReset?: number;
  /** 缩放 */
  zoom?: Zoom[]; // "3x (+20% Critical Chance)"

  /** 最大开镜等级 */
  get maxZoomLevel() {
    return (this.zoom && this.zoom.length) || 0;
  }
  // melee
  stancePolarity?: string;
  comboDur?: number;
  followThrough?: number;
  meleeRange?: number;
  slamAttack?: number;
  slamRadialDmg?: number;
  slamRadius?: number;
  heavyAttack?: number;
  windUp?: number;
  heavySlamAttack?: number;
  heavyRadialDmg?: number;
  heavySlamRadius?: number;
  slideAttack?: number;

  // attack
  modes: CoreWeaponMode[];

  constructor(data: ProtoWeapon, base?: ProtoWeapon) {
    // 修复过高精度
    const fixBuf = <T>(v: T) => {
      if (typeof v === "number") return +v.toFixed(3);
      if (Array.isArray(v)) return map(v, fixBuf);
      if (typeof v === "object") return mapValues(v as any, fixBuf);
      return v;
    };
    if (data) {
      // 国服切换回老版本
      const { variants, modes, tags, ...weapon } = data;
      Object.assign(this, fixBuf(weapon));

      if (tags) {
        this.tags = new WeaponTag(tags);
        this.mod = this.tags.mainTag;
      }
      if (modes) {
        const defaultMode = modes[0];
        // 根据默认补全属性
        this.modes = modes.map(({ damage, ...mode }) => {
          const newMode = {
            damage: map(damage, (vv, vn) => [vn, fixBuf(vv)] as [string, number]),
            ...mode,
          } as CoreWeaponMode;
          if (mode.name || mode.type) {
            const locKey = `weaponmode.${camelCase(mode.name || mode.type || "default")}`;
            if (i18n.te(locKey)) {
              newMode.locName = i18n.t(locKey);
            } else {
              console.log("missing", locKey);
              newMode.locName = mode.name;
            }
          } else newMode.locName = i18n.t("weaponmode.default");
          if (newMode.chargeTime) newMode.fireRate = (1 / newMode.chargeTime) * 60;

          if (!newMode.fireRate) {
            if (newMode.chargeTime) newMode.fireRate = 1 / newMode.chargeTime;
            else newMode.fireRate = defaultMode.fireRate || 60;
          }

          if (typeof newMode.critChance === "undefined") newMode.critChance = defaultMode.critChance || 0;
          if (typeof newMode.critMul === "undefined") newMode.critMul = defaultMode.critMul || 2;
          if (typeof newMode.procChance === "undefined") newMode.procChance = defaultMode.procChance || 0;
          return newMode;
        });
      }
    }
    if (base) {
      this.base = base.name;
    }
    // this.disposition = RivenDatabase.getRatio(this.name) || 0;
  }
  /** proto名 */
  get baseName() {
    return this.base || this.name;
  }
  // 辅助函数
  /** URL */
  get url() {
    return this.name.replace(/ /g, "_").replace(" (Atmosphere)", "");
  }
  get baseurl() {
    return this.baseName.replace(/ /g, "_").replace(" (Atmosphere)", "");
  }
  /** WM URL */
  get wmurl() {
    const setlist = ["Lato Vandal", "Braton Vandal"];
    if (this.name.includes(" Prime") || setlist.includes(this.name)) return this.name.toLowerCase().replace(/ /g, "_") + "_set";
    const slist = ["Prisma ", "Secura ", "Vaykor ", "Sancti ", "Synoid ", "Telos ", "Mara ", " Vandal"];
    if (slist.some(v => this.name.includes(v))) return this.name.toLowerCase().replace(/ /g, "_");
    return "";
  }
  /** WM RIEVN URL */
  get wmrivenurl() {
    const name = lowerCase(this.baseName.replace(/&/g, "and"));
    const tpl = `https://warframe.market/auctions/search?type=riven&weapon_url_name=${name}&polarity=any&sort_by=price_desc`;
    return tpl;
  }
  /** i18n的key */
  get id() {
    return `messages.${camelCase(this.name)}`;
  }
  get baseId() {
    return `messages.${camelCase(this.baseName)}`;
  }
  get locName() {
    return i18n.te(this.id) ? i18n.t(this.id) : this.name;
  }
  /** 是否是陆地用 */
  get isAtmosphere() {
    return this.name.endsWith(" (Atmosphere)");
  }
  get displayName() {
    if (i18n.te(this.id)) return i18n.t(this.id);
    else {
      console.warn(`missing i18n: ${this.id}:"${this.name}"`);
      return this.name;
    }
  }

  /** 武器倾向星数 */
  get star() {
    return [0.1, 0.7, 0.875, 1.125, 1.305, Infinity].findIndex(v => this.disposition < v);
  }
  get starText() {
    return repeat("●", this.star) + repeat("○", 5 - this.star);
  }
  /** 是否是Gun */
  get isGun() {
    return this.mod !== MainTag.Melee && this.mod !== MainTag.Zaw && this.mod !== MainTag["Arch-Melee"];
  }
  /** 是否是Melee */
  get isMelee() {
    return this.mod === MainTag.Melee || this.mod === MainTag.Zaw;
  }
  /** 是否是Pistol */
  get isPistol() {
    return this.mod === MainTag.Secondary || this.mod === MainTag.Kitgun;
  }
  /** 是否是Rifle */
  get isRifle() {
    return this.mod === MainTag.Rifle;
  }
  /** 是否是Sniper */
  get isSniper() {
    return this.isRifle && this.tags.has("Sniper");
  }
  /** 是否是Zaw */
  get isZaw() {
    return this.mod === MainTag.Zaw;
  }
  /** 是否是Kitgun */
  get isKitgun() {
    return this.mod === MainTag.Kitgun;
  }
  /** 是否是Amp */
  get isAmp() {
    return this.mod === MainTag.Amp;
  }
  /** 是否是Virtual */
  get isVirtual() {
    return this.tags.has("Virtual");
  }
  /** 是否是Exalted */
  get isExalted() {
    return this.tags.has("Exalted");
  }

  /** 获取武器对应紫卡属性范围 */
  getPropBaseValue(prop: string) {
    return RivenDatabase.getPropBaseValue(this.disposition, this.modText, prop);
  }

  /** 获取全部变种 */
  get variants() {
    return WeaponDatabase.getWeaponsByBase(this.base || this.name);
  }

  /** 获取攻击模式 */
  getMode(mode: number | string = 0) {
    return new WeaponBuildMode(this, mode);
  }

  /** 默认攻击模式 */
  get defaultMode() {
    return this.getMode();
  }

  // melee

  /** 滑砍伤害 */
  get slideDmg() {
    return this.defaultMode.panelDamage * this.slideAttack;
  }
}

/**
 * 包含某一种射击模式中全部数据的类
 */
export class WeaponBuildMode implements CoreWeaponMode {
  weapon: Weapon;
  mode: number;

  constructor(weapon: Weapon, mode: number | string = 0) {
    this.weapon = weapon;
    if (typeof mode === "number") this.mode = mode;
    else {
      this.mode = this.weapon.modes.findIndex(v => v.type === mode || v.name === mode);
    }
  }

  get url() {
    if (this.mode) return this.weapon.url + `_(${this.weapon.modes[this.mode].name})`;
    return this.weapon.url;
  }

  //### weapon 数据获取
  get reload() {
    return this.weapon.reload;
  }
  get magazine() {
    return this.weapon.magazine;
  }
  get maxAmmo() {
    return this.weapon.maxAmmo;
  }
  get reloadStyle() {
    return this.weapon.reloadStyle;
  }
  get comboDur() {
    return this.weapon.comboDur;
  }
  get followThrough() {
    return this.weapon.followThrough;
  }
  get meleeRange() {
    return this.weapon.meleeRange;
  }
  get slamAttack() {
    return this.weapon.slamAttack;
  }
  get slamRadialDmg() {
    return this.weapon.slamRadialDmg;
  }
  get slamRadius() {
    return this.weapon.slamRadius;
  }
  get heavyAttack() {
    return this.weapon.heavyAttack;
  }
  get windUp() {
    return this.weapon.windUp;
  }
  get heavySlamAttack() {
    return this.weapon.heavySlamAttack;
  }
  get heavyRadialDmg() {
    return this.weapon.heavyRadialDmg;
  }
  get heavySlamRadius() {
    return this.weapon.heavySlamRadius;
  }
  get slideAttack() {
    return this.weapon.slideAttack;
  }

  //### mode 数据获取
  /** 类型 default/secondary/charge/chargedThrow/throw/area/secondaryArea */
  get type() {
    return this.weapon.modes[this.mode].type || "default";
  }
  /** 名字 */
  get name() {
    return this.weapon.modes[this.mode].name;
  }
  /** 本地化名字 */
  get locName() {
    return this.weapon.modes[this.mode].locName;
  }
  /** 伤害 {Heat:100} */
  get damage() {
    return this.weapon.modes[this.mode].damage;
  }
  // 隐性必填
  /** 射速 */
  get fireRate() {
    return this.weapon.modes[this.mode].fireRate;
  }
  /** 暴击 */
  get critChance() {
    return this.weapon.modes[this.mode].critChance;
  }
  /** 暴伤 */
  get critMul() {
    return this.weapon.modes[this.mode].critMul;
  }
  /** 触发 */
  get procChance() {
    return this.weapon.modes[this.mode].procChance;
  }
  /** 精准 xx (100 when aimed) */
  get accuracy() {
    return this.weapon.modes[this.mode].accuracy;
  }
  /** 自带穿透 */
  get punchThrough() {
    return this.weapon.modes[this.mode].punchThrough;
  }
  /** 弹片数 */
  get pellets() {
    return this.weapon.modes[this.mode].pellets || 1;
  }
  /** 溅射半径 */
  get radius() {
    return this.weapon.modes[this.mode].radius;
  }
  /** 射程 */
  get range() {
    return this.weapon.modes[this.mode].range;
  }
  /** 子弹消耗 */
  get ammoCost() {
    return this.weapon.modes[this.mode].ammoCost;
  }
  /** 蓄力时间 */
  get chargeTime() {
    return this.weapon.modes[this.mode].chargeTime;
  }
  /** 扳机 Semi-Auto/Held/Auto/Charge*/
  get trigger() {
    return this.weapon.modes[this.mode].trigger;
  }
  /** 点射数量 */
  get burstCount() {
    return this.weapon.modes[this.mode].burstCount;
  }
  /** 投射物速度 */
  get prjSpeed() {
    return this.weapon.modes[this.mode].prjSpeed;
  }
  /** 启动子弹数 */
  get spool() {
    return this.weapon.modes[this.mode].spool;
  }
  /** 静音 */
  get silent() {
    return this.weapon.modes[this.mode].silent;
  }
  /** 衰减 [起始,中止,最大衰减] */
  get falloff() {
    return this.weapon.modes[this.mode].falloff;
  }
  /** 面板伤害 */
  get panelDamage() {
    return reduce(this.damage, (a, b) => a + b[1], 0);
  }
}

const extraDispositionTable = [
  // kitguns
  ...KitgunChamberData.map(v => [v.name, v.disposition]),
  // zaw
  ...ZawStrikeData.map(v => [v.name, v.disposition]),
  // Amp
  ["Amp", "Amp", 0],
] as [string, string, number][];

/** split variants format to normal format */
export class WeaponDatabase {
  static weapons: Weapon[];
  static weaponMap = new Map<string, Weapon>();
  static protos: Weapon[];
  static variantsMap = new Map<string, Weapon[]>();

  static async loadDataOnline() {
    // 缓存
    const cache = localStorage.getItem("weapons.data");
    let bin: ArrayBuffer;
    if (cache) {
      bin = base64arraybuffer.decode(cache);
    }
    try {
      const rst = await Axios.get(data || "https://api.riven.im/data/weapons.data", { responseType: "arraybuffer" });
      bin = rst.data;
      localStorage.setItem("weapons.data", base64arraybuffer.encode(bin));
    } catch {}
    const msg = proto.Weapons.decode(new Uint8Array(bin));
    const decoded = proto.Weapons.toObject(msg);
    this.load(decoded.weapons as ProtoWeapon[]);
  }
  static load(weapons: ProtoWeapon[]) {
    let rst: Weapon[] = [];
    this.protos = [];
    weapons.forEach(root => {
      const { variants, ...weapon } = root;
      const p = new Weapon(weapon);
      rst.push(p);
      this.protos.push(p);
      if (variants) {
        const variantsWeapons = variants.map(subweapon => {
          const v = new Weapon(subweapon, weapon);
          rst.push(v);
          return v;
        });
        this.variantsMap.set(p.name, [p, ...variantsWeapons]);
      } else {
        this.variantsMap.set(p.name, [p]);
      }
    });
    extraDispositionTable.forEach(weapon => {
      const [name, tag, disposition] = weapon;
      const p = new Weapon({ name, tags: [tag], disposition });
      rst.push(p);
      this.protos.push(p);
      this.variantsMap.set(p.name, [p]);
    });
    // 按倾向性排序
    this.protos.sort((a, b) => b.disposition - a.disposition);
    rst.forEach(weapon => {
      this.weaponMap.set(weapon.name, weapon);
    });
    return (this.weapons = rst);
  }

  /**
   * 查询是否有这个武器
   * @param name 武器通用名称
   */
  static hasWeapon(name: string) {
    return this.weaponMap.has(name);
  }

  /**
   * 获取武器
   * @param name 武器通用名称
   */
  static getWeaponByName(name: string) {
    return this.weaponMap.get(name);
  }

  /**
   * 模糊识别武器名称
   * @param name 模糊匹配的名称
   */
  static findMostSimRivenWeapon(name: string) {
    name = name.trim();
    if (this.hasWeapon(name)) return this.getWeaponByName(name);
    let weaponFinded = maxBy(this.weapons, v => Math.max(strSimilarity(name, v.locName), strSimilarity(name, v.name)));
    return weaponFinded;
  }

  /**
   * 通过武器具体名称获取武器实例
   * @param name 武器具体名称
   */
  static getWeaponsByTags(tags: (string | number)[]) {
    return WeaponDatabase.weapons.filter(v => tags.every(tag => v.tags.has(typeof tag === "number" ? MainTag[tag] : tag)));
  }

  /**
   * 通过武器标签(OR)获取武器实例
   * @param name 武器具体名称
   */
  static getProtosByMultiTags(tags: (string | number)[]) {
    return WeaponDatabase.protos.filter(v => tags.some(tag => v.tags.has(typeof tag === "number" ? MainTag[tag] : tag)));
  }

  /**
   * 通过武器标签(AND)获取武器实例
   * @param name 武器具体名称
   */
  static getProtosByTags(tags: (string | number)[]) {
    return WeaponDatabase.protos.filter(v => tags.every(tag => v.tags.has(typeof tag === "number" ? MainTag[tag] : tag)));
  }

  /**
   * 通过武器通用名称获取武器实例
   * @param base 武器通用名称
   */
  static getWeaponsByBase(base: string) {
    return this.variantsMap.get(base) || [];
  }
}

window["WeaponDatabase"] = WeaponDatabase;
