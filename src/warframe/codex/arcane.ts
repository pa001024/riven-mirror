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
  ["a2", "arcaneEruption", [["rgd", 1]], "pickmp", "Warframe", 0.4, 0],
  ["a3", "arcaneAgility", [["f", 0.40]], "damaged", "Warframe", 0.12, 8],
  ["a4", "arcaneBarrier", [["fsr", 1]], "damaged", "Warframe", 0.04, 0],
  ["a5", "arcaneAegis", [["psr", 60]], "damaged", "Warframe", 0.06, 20],
  ["a6", "arcaneTrickery", [["ivb", 1]], "finish", "Warframe", 0.1, 20],
  ["a7", "arcaneUltimatum", [["ea", 600]], "finish", "Warframe", 1, 20],
  ["a8", "arcaneArachne", [["oad", 1]], "walllatch", "Warframe", 0.6, 0],
  ["a9", "arcaneGrace", [["phr", 0.04]], "damaged", "Warframe", 0.06, 6],
  ["aA", "arcaneGuardian", [["ea", 600]], "damaged", "Warframe", 0.2, 20],
  ["aB", "arcanePhantasm", [["f", 0.4]], "block", "Warframe", 0.32, 12],
  ["aC", "arcaneHealing", [["抵挡辐射", 0.8]], "passive", "Warframe", 1, 0],
  ["aD", "arcaneResistance", [["抵挡毒素", 0.8]], "passive", "Warframe", 1, 0],
  ["aE", "arcaneDeflection", [["抵挡切割", 0.8]], "passive", "Warframe", 1, 0],
  ["aF", "arcaneIce", [["抵挡火焰", 0.8]], "passive", "Warframe", 1, 0],
  ["aG", "arcaneWarmth", [["抵挡冰冻", 0.8]], "passive", "Warframe", 1, 0],
  ["aH", "arcaneNullifier", [["抵挡磁力", 0.8]], "passive", "Warframe", 1, 0],
  ["aI", "arcaneConsequence", [["at", 0.4]], "headshot", "Warframe", 1, 12],
  ["aJ", "arcaneAcceleration", [["R", 0.6]], "crithit", "Rilfe", 0.2, 6],
  ["aK", "arcaneAvenger", [["eca", 0.3]], "damaged", "Weapon", 0.14, 8],
  ["aL", "arcaneAwakening", [["D", 1]], "reload", "Secondary", 0.4, 16],
  ["aM", "arcaneFury", [["K", 1.2]], "crithit", "Melee", 0.4, 12],
  ["aN", "arcaneStrike", [["J", 0.4]], "hit", "Melee", 0.1, 12],
  ["aO", "arcaneMomentum", [["F", 1]], "crithit", "Sniper", 0.4, 8],
  ["aP", "arcanePrecision", [["D", 1.2]], "headshot", "Secondary", 0.8, 8],
  ["aQ", "arcaneRage", [["D", 0.1]], "headshot", "Primary", 0.1, 16],
  ["aR", "arcaneTempo", [["R", 0.6]], "crithit", "Shotgun", 0.1, 8],
  ["aS", "arcaneVelocity", [["R", 0.8]], "crithit", "Secondary", 0.6, 6],
  ["aT", "arcaneVictory", [["phr", 0.02]], "headshot", "Warframe", 0.08, 8],
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
