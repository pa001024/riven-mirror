const _ = require("lodash") as typeof import("lodash");
const fs = require("fs");

const userWeapons = require("./userType.json") as import("./wikiaWeapon").WikiaWeapon[];
/**
 * 武器信息
 */
export interface WeaponData {
  id: string;
  name: string;
  mode?: string;
  rivenName?: string;
  tags: string[];
  dmg: [string, number][];
  critMul: number;
  critChance: number;
  fireRate: number;
  status: number;
  defaultMode?: number;
}
/**
 * 枪武器信息
 */
export interface GunWeaponData extends WeaponData {
  accuracy: number;
  bullets?: number;
  magazine: number;
  reload: number;
  ammo: number;
  ammoMode?: number;
  prjSpeed?: number;
  rangeLimit?: number;
}
export interface MeleeWeaponData extends WeaponData {
  slideDmg: number;
  fltSpeed?: number;
}
let rmw: any[];
if (false) {
  rmw = [].concat(
    ...userWeapons
      .sort((a, b) => (a.Family || a.Name).localeCompare(b.Family || b.Name))
      .filter(uw => uw.Type === "Secondary" || uw.Type === "Primary")
      .map(uw => {
        let rivenName = uw.Family || uw.Name;
        let atk = uw.NormalAttack;
        let rst = [] as GunWeaponData[];
        let acc = typeof uw.Accuracy === "string" ? +uw.Accuracy.split(" ")[0] : uw.Accuracy;
        let tp = uw.Type === "Secondary" ? ["Gun", "Secondary"] : ["Gun", "Primary", uw.Class];
        if (uw.NormalAttack) {
          atk = uw.NormalAttack;
          rst.push({
            id: uw.Name,
            name: _.camelCase(uw.Name),
            // mode: "charge",
            rivenName: uw.Name !== rivenName ? rivenName : undefined,
            tags: tp,
            dmg: atk.Damage && _.map(atk.Damage, (v, i) => [i, v]),
            accuracy: acc,
            bullets: atk.PelletCount,
            fireRate: atk.FireRate,
            critChance: atk.CritChance,
            critMul: atk.CritMultiplier,
            status: atk.StatusChance,
            magazine: uw.Magazine,
            reload: uw.Reload,
            ammo: uw.MaxAmmo
          } as GunWeaponData);
        }
        if (uw.ChargeAttack) {
          atk = uw.ChargeAttack;
          rst.push({
            id: uw.Name + " (charged)",
            name: _.camelCase(uw.Name),
            rivenName,
            mode: "charged",
            tags: tp,
            dmg: atk.Damage && _.map(atk.Damage, (v, i) => [i, v]),
            accuracy: acc,
            bullets: atk.PelletCount,
            fireRate: atk.FireRate,
            critChance: atk.CritChance,
            critMul: atk.CritMultiplier,
            status: atk.StatusChance,
            magazine: uw.Magazine,
            reload: uw.Reload,
            ammo: uw.MaxAmmo
          } as GunWeaponData);
        }
        return rst;
      })
  );
}

if (false) {
  rmw = userWeapons
    .sort((a, b) => (a.Family || a.Name).localeCompare(b.Family || b.Name) || (b.Family || b.Name).length - (a.Family || a.Name).length)
    .filter(uw => (uw.Type === "Secondary" || uw.Type === "Primary") && (uw.NormalAttack || uw.ChargeAttack))
    .map(v => ({
      id: v.Name,
      rangeLimit: (v.NormalAttack || v.ChargeAttack).Range
    }));
}

// 导出武器极性
let list = [];
if (false) {
  rmw = list.map(v => {
    let w = userWeapons.find(k => k.Name === v.id);
    if (w) v.pol = w.Polarities ? w.Polarities.map(v => ({ V: "r", Bar: "-", D: "d", U: "w" }[v])).join("") : "";
    return v;
  });
}

// 空战武器
if (true) {
  rmw = [].concat(
    ...userWeapons
      .sort((a, b) => (a.Family || a.Name).localeCompare(b.Family || b.Name) || (a.Family || a.Name).length - (b.Family || b.Name).length)
      .filter(uw => uw.Type === "Arch-Melee")
      .map(uw => {
        let rivenName = uw.Family || uw.Name;
        let atk = uw.NormalAttack;
        let rst = [] as MeleeWeaponData[];
        let acc = typeof uw.Accuracy === "string" ? +uw.Accuracy.split(" ")[0] : uw.Accuracy;
        let tp = ["Melee", "Archmelee"];
        if (uw.NormalAttack) {
          atk = uw.NormalAttack;
          rst.push({
            id: uw.Name,
            name: _.camelCase(uw.Name),
            // mode: "charge",
            rivenName: uw.Name !== rivenName ? rivenName : undefined,
            tags: tp,
            dmg: atk.Damage && _.map(atk.Damage, (v, i) => [i, v]),
            critChance: atk.CritChance,
            critMul: atk.CritMultiplier,
            fireRate: atk.FireRate,
            slideDmg: 0,
            status: atk.StatusChance
          } as MeleeWeaponData);
        }
        return rst;
      })
  );
}

fs.writeFileSync(
  "rmw.js",
  "exports = [\n" +
    JSON.stringify(rmw)
      .replace(/},{/g, "},\n{")
      .replace(/"(\w+)":/g, (_, v) => v + ":")
      .replace(/^\[|\]$/g, v => "") +
    "\n]"
);
