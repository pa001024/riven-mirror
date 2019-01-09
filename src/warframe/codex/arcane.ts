/**
 * 赋能
 */
export interface Arcane {
  id: string;
  name: string;
  /** 属性 */
  props: [string, number][];
  /** 生效条件 */
  condition: string;
  /** 生效目标 */
  type: string;
  /** 生效几率 */
  chance: number;
  /** 持续 */
  duration: number;
}
const _arcaneListSource = [
  ["a0", "arcanePulse", [["ehb", 100]], "pickhp", "Warframe", 0.2, 0],
  ["a1", "arcaneEnergize", [["eeb", 100]], "pickmp", "Warframe", 0.4, 0],
  ["a2", "arcaneEruption", [["rgd", 100]], "pickmp", "Warframe", 0.4, 0],
  ["a3", "arcaneAgility", [["f", 40]], "damaged", "Warframe", 0.12, 8],
  ["a4", "arcaneBarrier", [["fsr", 100]], "damaged", "Warframe", 0.04, 0],
  ["a5", "arcaneAegis", [["psr", 60]], "damaged", "Warframe", 0.06, 20],
  ["a6", "arcaneTrickery", [["ivb", 100]], "finish", "Warframe", 0.1, 20],
  ["a7", "arcaneUltimatum", [["ea", 600]], "finish", "Warframe", 1, 20],
  ["a8", "arcaneArachne", [["oad", 100]], "walllatch", "Warframe", 0.6, 0],
  ["a9", "arcaneGrace", [["phr", 4]], "damaged", "Warframe", 0.06, 6],
  ["aA", "arcaneGuardian", [["ea", 600]], "damaged", "Warframe", 0.2, 20],
  ["aB", "arcanePhantasm", [["f", 40]], "block", "Warframe", 0.32, 12],
  ["aC", "arcaneHealing", [["抵挡辐射", 80]], "passive", "Warframe", 1, 0],
  ["aD", "arcaneResistance", [["抵挡毒素", 80]], "passive", "Warframe", 1, 0],
  ["aE", "arcaneDeflection", [["抵挡切割", 80]], "passive", "Warframe", 1, 0],
  ["aF", "arcaneIce", [["抵挡火焰", 80]], "passive", "Warframe", 1, 0],
  ["aG", "arcaneWarmth", [["抵挡冰冻", 80]], "passive", "Warframe", 1, 0],
  ["aH", "arcaneNullifier", [["抵挡磁力", 80]], "passive", "Warframe", 1, 0],
  ["aI", "arcaneConsequence", [["at", 40]], "headshot", "Warframe", 1, 12],
  ["aJ", "arcaneAcceleration", [["R", 60]], "crithit", "Rifle", 0.2, 6],
  ["aK", "arcaneAvenger", [["eca", 30]], "damaged", "Weapon", 0.14, 8],
  ["aL", "arcaneAwakening", [["D", 100]], "reload", "Secondary", 0.4, 16],
  ["aM", "arcaneFury", [["K", 120]], "crithit", "Melee", 0.4, 12],
  ["aN", "arcaneStrike", [["J", 40]], "hit", "Melee", 0.1, 12],
  ["aO", "arcaneMomentum", [["F", 100]], "crithit", "Sniper", 0.4, 8],
  ["aP", "arcanePrecision", [["D", 120]], "headshot", "Secondary", 0.8, 8],
  ["aQ", "arcaneRage", [["D", 100]], "headshot", "Primary", 0.1, 16],
  ["aR", "arcaneTempo", [["R", 60]], "crithit", "Shotgun", 0.1, 8],
  ["aS", "arcaneVelocity", [["R", 80]], "crithit", "Secondary", 0.6, 6],
  ["aT", "arcaneVictory", [["phr", 2]], "headshot", "Warframe", 0.08, 8],
] as [string, string, [string, number][], string, string, number, number][];

export const ArcaneList: Arcane[] = _arcaneListSource.map(v => ({
  id: v[0],
  name: v[1],
  props: v[2],
  condition: v[3],
  type: v[4],
  chance: v[5],
  duration: v[6],
}));
