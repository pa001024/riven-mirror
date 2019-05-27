import { i18n } from "@/i18n";
import { ProtoWeapon, Zoom, WeaponMode } from "./weapon.i";
import Axios from "axios";
import _ from "lodash";

export enum MainTag {
  Rifle,
  Shotgun,
  Pistol,
  Kitgun,
  Melee,
  Zaw,
  "Arch-Gun",
  "Arch-Melee",
  Amp
}
export class Weapon {
  // 裂罅基础名称
  base?: string;
  // base
  name: string;
  /** MOD中可能出现的词缀 */
  tags: string[] = [];
  /** 次要tag Tenno/G/C/I/Prime 等 */
  traits?: string[];
  /** 段位 */
  mastery?: number;
  /** 极性 */
  polarities?: string;
  /** 裂罅倾向 */
  disposition: number = 0;
  /** 主Tag Rifle/Melee 等 */
  mainTag: MainTag;

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

  // melee
  stancePolarity?: string;
  blockResist?: number;
  finisherDamage?: number;
  channelCost?: number;
  channelMult?: number;
  spinAttack?: number;
  jumpAttack?: number;
  leapAttack?: number;
  wallAttack?: number;
  /** 近战范围 */
  reach?: number[];

  // attack
  modes: WeaponMode[];

  constructor(data?: ProtoWeapon, base?: string) {
    if (data) {
      const { variants, modes, ...weapon } = data;
      // TODO 是否有问题需检验
      Object.assign(this, weapon);
      if (weapon.tags) this.mainTag = MainTag[weapon.tags.filter(v => v != "Robotic" && v != "Secondary")[0]];
      const defaultMode = modes[0];
      // 根据默认补全属性
      this.modes = modes.map(mode => {
        if (typeof mode.critChance === "undefined") mode.critChance = defaultMode.critChance || 0;
        if (typeof mode.critMul === "undefined") mode.critMul = defaultMode.critMul || 2;
        if (typeof mode.procChance === "undefined") mode.procChance = defaultMode.procChance || 0;
        return mode;
      });
    }
    if (this.base) this.base = base;
  }

  // 辅助函数
  /** URL */
  get url() {
    return this.name.replace(/ /g, "_");
  }
  /** WM URL */
  get wmurl() {
    const slist = ["Prisma ", "Secura ", "Vaykor ", "Sancti ", "Synoid ", "Telos ", "Mara "];
    if (slist.some(v => this.name.includes(v))) return this.name.toLowerCase().replace(/ /g, "_");
    return this.name.toLowerCase().replace(/ /g, "_") + "_set";
  }
  get displayName() {
    const key = `messages.${_.camelCase(this.name)}`;
    if (i18n.te(key)) return i18n.t(key);
    else {
      console.warn(`missing i18n: ${key}:"${this.name}"`);
      return this.name;
    }
  }

  /** 武器倾向星数 */
  get star() {
    return [0.1, 0.7, 0.875, 1.125, 1.305, Infinity].findIndex(v => this.disposition < v);
  }
  get starText() {
    return _.repeat("●", this.star) + _.repeat("○", 5 - this.star);
  }
  /** 是否是Gun */
  get isGun() {
    return this.mainTag !== MainTag.Melee && this.mainTag !== MainTag.Zaw && this.mainTag !== MainTag["Arch-Melee"];
  }
  /** 是否是Melee */
  get isMelee() {
    return this.mainTag === MainTag.Melee || this.mainTag === MainTag.Zaw;
  }
  /** 是否是Pistol */
  get isPistol() {
    return this.mainTag === MainTag.Pistol || this.mainTag === MainTag.Kitgun;
  }
  /** 是否是Rifle */
  get isRifle() {
    return this.mainTag === MainTag.Rifle;
  }
  /** 是否是Sniper */
  get isSniper() {
    return this.isRifle && this.tags.includes("Sniper");
  }
  /** 是否是Zaw */
  get isZaw() {
    return this.mainTag === MainTag.Zaw;
  }
  /** 是否是Kitgun */
  get isKitgun() {
    return this.mainTag === MainTag.Kitgun;
  }

  get panelDamage() {
    return _.reduce(this.modes[0].damage, (a, b) => a + b[1], 0);
  }
}

import data from "@/data/weapons.data";
import Weapons from "@/proto/weapons.proto";

/** split variants format to normal format */
export class WeaponDatabase {
  static weapons: Weapon[];

  static async loadDataOnline() {
    const rst = await Axios.get(data, { responseType: "arraybuffer" });
    const msg = Weapons.decode(rst.data);
    const decoded = Weapons.toObject(msg);
    // this.data = decoded.weapons;
    this.load(decoded.weapons as ProtoWeapon[]);
  }
  static load(weapons: ProtoWeapon[]) {
    let rst: Weapon[] = [];
    weapons.forEach(root => {
      const { variants, ...weapon } = root;
      rst.push(new Weapon(weapon));
      rst.push(new Weapon(weapon, weapon.name));
    });
    return (this.weapons = rst);
  }
}
