import { gunWeaponData, meleeWeaponData } from "@/warframe/codex/weapon.data";
import { WeaponData } from "@/warframe/codex/weapon.i";

let a = (gunWeaponData as WeaponData[])
  .concat(meleeWeaponData)
  .filter(v => !v.mode && !v.tags.includes("Exalted"))
  .filter(v => !v.tags.includes("Archgun") && !v.tags.includes("Archmelee"))
  .filter(v => v.tags.includes("Robotic"))
  .map(v => v.id);

console.log(a.join("\n"));
