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

let rmw = userWeapons.filter(uw => uw.Type === "Robotic").map(uw => {
  let rivenName = uw.Family || uw.Name;
  let atk = uw.NormalAttack || uw.ChargeAttack
  return {
    id: uw.Name,
    name: _.camelCase(uw.Name),
    // mode: "atmosphere",
    rivenName,
    tags: ["Gun", "Robotic", uw.Class],
    dmg: _.map(atk.Damage, (v, i) => [i, v]),
    critMul: atk.CritMultiplier,
    critChance: atk.CritChance,
    fireRate: atk.FireRate,
    status: atk.StatusChance,

    accuracy: uw.Accuracy,
    bullets: atk.PelletCount,
    magazine: uw.Magazine,
    reload: uw.Reload,
    ammo: uw.MaxAmmo,
  } as GunWeaponData
})

fs.writeFileSync("rmw.js", "exports = [\n" + JSON.stringify(rmw).replace(/},{/g, "},\n{").replace(/"(\w+)":/g, (_, v) => v + ":").replace(/^\[|\]$/g, v => "") + "\n]")
