const _ = require("lodash") as typeof import("lodash");
const fs = require("fs")

const userWeapons = require("./userType.json") as import("./wikiaWeapon").WikiaWeapon[]
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

let rmw = userWeapons.filter(uw => uw.Type === "Arch-Gun").map(uw => {
  let rivenName = uw.Name.replace(" (Atmosphere)", "");
  return {
    id: uw.Name,
    name: _.camelCase(rivenName),
    // mode: "atmosphere",
    rivenName,
    tags: ["Gun", "Archgun"],
    dmg: _.map(uw.NormalAttack.Damage, (v, i) => [i, v]),
    critMul: uw.NormalAttack.CritMultiplier,
    critChance: uw.NormalAttack.CritChance,
    fireRate: uw.NormalAttack.FireRate,
    status: uw.NormalAttack.StatusChance,

    accuracy: uw.Accuracy,
    bullets: uw.NormalAttack.PelletCount,
    magazine: uw.Magazine,
    reload: uw.Reload,
    ammo: uw.MaxAmmo,
  } as GunWeaponData
})

fs.writeFileSync("rmw.js", "exports = [\n" + JSON.stringify(rmw).replace(/},{/g, "},\n{").replace(/"(\w+)":/g, (_, v) => v + ":").replace(/^\[|\]$/g, v => "") + "\n]")
