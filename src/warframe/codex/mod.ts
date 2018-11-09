import _ from "lodash";
import { i18n } from "@/i18n";

export interface NormalModData {
  /** 索引 */
  key: string
  /** ID */
  id: string
  /** 名称 */
  name: string
  /** 描述 */
  desc: string
  /** 适用武器 */
  type: string
  /** 极性 */
  polarity: "r" | "-" | "d" | "="
  /** 消耗 */
  cost: number
  /** 稀有度 */
  rarity: "n" | "c" | "r" | "l" | "x"
  /** 属性 */
  props: [string, number][]
  /** 等价的MOD 如元素卡 */
  canReplaceBy?: string[]
  /** P卡或其他种类高级卡对应的普通卡的名称 */
  primed?: string
  /** 紫卡元数据 */
  riven?: string
}

/**
 * 普通MOD信息
 */
export class NormalMod implements NormalModData {
  key: string
  id: string
  type: string
  polarity: "r" | "-" | "d" | "="
  cost: number
  rarity: "n" | "c" | "r" | "l" | "x"
  props: [string, number][]
  canReplaceBy?: string[]
  primed?: string
  riven?: string

  get name() {
    let name = i18n.t(`messages.${this.id}`) as string;
    name || console.log(`warn: missing ${this.id}`);
    return name || "";
  }
  /** 描述 */
  get desc() {
    let desc = i18n.t(`moddesc.${this.id}`) as string;
    return desc || "";
  }

  constructor(data: NormalModData) {
    this.key = data.key;
    this.id = data.id;
    this.type = data.type;
    this.polarity = data.polarity;
    this.cost = data.cost;
    this.rarity = data.rarity;
    this.props = data.props;
    this.canReplaceBy = data.canReplaceBy;
    this.primed = data.primed;
    this.riven = data.riven;
  }
}

const _normalModSource = [
  // 00 为空槽 01 为紫卡
  // 主要武器 00 ~ 0z
  ["02", "hunterMunitions", [["暴击时触发切割伤害", 0.3]], "Primary", "r", "c", 9],
  ["03", "vigilanteArmaments", [["S", 0.6], ["暴击强化", 0.05]], "Primary", "-", "n", 9],
  ["04", "vigilanteFervor", [["R", 0.45], ["暴击强化", 0.05]], "Primary", "r", "c", 9],
  ["05", "vigilanteOffense", [["P", 1.5], ["暴击强化", 0.05]], "Primary", "-", "r", 9],

  // 步枪 10 ~ 4z
  ["10", "serration", [["D", 1.65]], "Rilfe", "r", "c", 14],
  ["11", "splitChamber", [["S", 0.9]], "Rilfe", "r", "r", 15],
  ["12", "heavyCaliber", [["D", 1.65], ["精准度", -0.55]], "Rilfe", "r", "r", 16],
  ["13", "pointStrike", [["0", 1.5]], "Rilfe", "r", "n", 9],
  ["14", "vitalSense", [["1", 1.2]], "Rilfe", "r", "r", 9],
  ["15", "argonScope", [["0", 1.35]], "Rilfe", "r", "r", 7],
  ["16", "bladedRounds", [["1", 1.2]], "Rilfe", "r", "c", 9],
  ["17", "hammerShot", [["1", 0.6], ["2", 0.4]], "Rilfe", "d", "r", 9],
  ["18", "cryoRounds", [["5", 0.9]], "Rilfe", "d", "c", 11],
  ["19", "primedCryoRounds", [["5", 1.65]], "Rilfe", "d", "l", 16],
  ["1A", "infectedClip", [["6", 0.9]], "Rilfe", "-", "c", 11],
  ["1B", "stormbringer", [["7", 0.9]], "Rilfe", "-", "c", 11],
  ["1C", "hellfire", [["4", 0.9]], "Rilfe", "-", "c", 11],
  ["1D", "malignantForce", [["6", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7],
  ["1E", "highVoltage", [["7", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7],
  ["1F", "rimeRounds", [["5", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7],
  ["1G", "thermiteRounds", [["4", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7],
  ["1H", "piercingHit", [["9", 0.3]], "Rilfe", "-", "n", 9],
  ["1I", "piercingCaliber", [["9", 1.2]], "Rilfe", "-", "r", 11],
  ["1J", "sawtoothClip", [["A", 0.3]], "Rilfe", "-", "n", 9],
  ["1K", "fangedFusillade", [["A", 1.2]], "Rilfe", "-", "r", 11],
  ["1L", "rupture", [["8", 0.3]], "Rilfe", "-", "n", 9],
  ["1M", "crashCourse", [["8", 1.2]], "Rilfe", "-", "r", 11],
  ["1N", "criticalDelay", [["0", 0.48], ["R", -0.36]], "Rilfe", "-", "r", 9],
  ["1O", "adhesiveBlast", [["壁面附着", 1]], "Launcher", "r", "r", 9],
  ["1P", "sinisterReach", [["射程", 12]], "Continuous", "-", "c", 5],
  ["1Q", "vileAcceleration", [["R", 0.9], ["D", -0.15]], "Rilfe", "-", "r", 9],
  ["1R", "metalAuger", [["P", 2.1]], "Rilfe", "-", "r", 15],
  ["1S", "magazineWarp", [["L", 0.3]], "Rilfe", "-", "n", 9],
  ["1T", "ammoDrum", [["M", 0.3]], "Rilfe", "-", "n", 7],
  ["1U", "shred", [["R", 0.3], ["P", 1.2]], "Rilfe", "r", "r", 11],
  ["1V", "continuousMisery", [["3", 1]], "Rilfe", "r", "n", 7],
  ["1W", "agileAim", [["移动速度", 0.2]], "Rilfe", "r", "c", 5],
  ["1X", "vilePrecision", [["Z", -0.6], ["R", -0.36]], "Rilfe", "-", "r", 11],
  ["1Y", "terminalVelocity", [["V", 0.6]], "Rilfe", "r", "c", 7],
  ["1Z", "rifleAptitude", [["2", 0.15]], "Rilfe", "d", "c", 9],
  ["1a", "hush", [["噪音", -1]], "Rilfe", "-", "n", 5],
  ["1b", "baneOfCorpus", [["C", 0.3]], "Rilfe", "r", "c", 9],
  ["1c", "primedBaneOfCorpus", [["C", 0.55]], "Rilfe", "r", "l", 12],
  ["1d", "baneOfGrineer", [["G", 0.3]], "Rilfe", "r", "c", 9],
  ["1e", "primedBaneOfGrineer", [["G", 0.55]], "Rilfe", "r", "l", 12],
  ["1f", "baneOfInfested", [["I", 0.3]], "Rilfe", "r", "c", 9],
  ["1g", "primedBaneOfInfested", [["I", 0.55]], "Rilfe", "r", "l", 12],
  ["1h", "baneOfCorrupted", [["对堕落者伤害", 0.3]], "Rilfe", "r", "c", 9],
  ["1i", "primedBaneOfCorrupted", [["对堕落者伤害", 0.55]], "Rilfe", "r", "l", 12],
  ["1j", "speedTrigger", [["R", 0.6]], "Rilfe", "r", "c", 9],
  ["1k", "combustionBeam", [["一段时间后敌人爆炸", 600]], "Continuous", "r", "r", 9],
  ["1l", "firestorm", [["增加爆炸半径", 0.24]], "Launcher", "r", "r", 9],
  ["1m", "fastHands", [["F", 0.3]], "Rilfe", "-", "n", 7],
  ["1n", "primedFastHands", [["F", 0.55]], "Rilfe", "-", "l", 12],
  ["1o", "stabilizer", [["Z", -0.6]], "Rilfe", "-", "r", 9],
  ["1p", "guidedOrdinance", [["精准度", 0.3]], "AssaultRifle", "r", "c", 7],
  ["1q", "springLoadedChamber", [["R", 0.75]], "AssaultRifle", "r", "c", 9],
  ["1r", "kineticRicochet", [["魔改", 1]], "Tetra", "-", "r", 7],
  ["1s", "tetherGrenades", [["魔改", 1]], "Penta", "-", "c", 9],
  ["1t", "catalyzerLink", [["2", 0.6]], "Rilfe", "r", "n", 9],
  ["1u", "twitch", [["切换速度", 2]], "Rilfe", "-", "c", 7],
  ["1v", "wildfire", [["L", 0.2], ["4", 0.6]], "Rilfe", "r", "r", 9],
  ["1w", "eagleEye", [["H", 0.4]], "Rilfe", "-", "c", 7],
  ["1x", "chargedChamber", [["第一发子弹伤害加成", 0.4]], "Sniper", "r", "c", 9],
  // ["1y","Primed Charged Chamber", "蓄力装填 Prime", [["第一发子弹伤害加成", 1.1]], "提升更换弹匣后第一次射击的基础伤害", "Sniper", "r", "l", 16],
  ["1z", "primedChamber", [["第一发子弹伤害加成", 1]], "Sniper", "r", "r", 7],
  ["20", "rifleAmmoMutation", [["弹药转换", 0.375]], "AssaultRifle", "-", "r", 9],
  ["21", "arrowMutation", [["弹药转换", 0.375]], "Bow", "-", "r", 9],
  ["22", "sniperAmmoMutation", [["弹药转换", 0.375]], "Sniper", "-", "r", 9],
  ["23", "targetAcquired", [["爆头倍率", 0.6]], "Sniper", "r", "r", 9],
  ["24", "entropyBurst", [["加基础状态触发率", 20]], "Supra", "r", "r", 7],
  ["25", "lastingPurity", [["正中红心", 0.6]], "Vulkar", "-", "r", 7],
  ["26", "nightwatchNapalm", [["魔改", 1]], "Ogris", "r", "r", 9],
  ["27", "fluxOverdrive", [["魔改", 0]], "Flux Rifle", "r", "c", 9],
  ["28", "neutralizingJustice", [["魔改", 1]], "Miter", "d", "r", 7],
  ["29", "voltageSequence", [["电击陷阱", 1]], "Lanka", "-", "r", 7],
  ["2A", "disarmingPurity", [["缴械", 0.4]], "Panthera", "-", "r", 7],
  ["2B", "deadlySequence", [["0", 2]], "Grinlok", "r", "r", 7],
  ["2C", "gildedTruth", [["R", 0.8]], "Burston Prime", "r", "r", 7],
  ["2D", "springLoadedBroadhead", [["最终伤害", 0.4]], "Daikyu", "r", "r", 15],
  // ["2E", "Apex Predator", "顶级掠食者", [["PVP", 0]], "让被击中的目标暂时出现在小地图上（限武形秘仪）", "Rilfe", "-", "c", 7],
  // ["2F", "Lucky Shot", "幸运射击", [["PVP", 0]], "提升武器的抛射物飞行速度，降低精准度（限武形秘仪）", "Rilfe", "r", "c", 9],
  // ["2G", "Vanquished Prey", "战无不克", [["PVP", 0]], "击败另一名玩家后降低一段时间的护盾回充延迟，降低生命球的回血量（限武形秘仪）", "AssaultRifle", "d", "r", 9],
  // ["2H", "Comet Rounds", "彗星弹头", [["PVP", 0]], "将一部分物理伤害转化为冲击伤害（限武形秘仪）", "Rilfe", "r", "c", 5],
  // ["2I", "Serrated Rounds", "锯刃弹头", [["PVP", 0]], "一部分物理伤害转换为切割伤害（限武形秘仪）", "Rilfe", "r", "c", 5],
  // ["2J", "Ripper Rounds", "撕裂弹头", [["PVP", 0]], "将一部分物理伤害转化为穿刺伤害（限武形秘仪）", "Rilfe", "r", "c", 5],
  ["2K", "depletedReload", [["L", -0.6], ["F", 0.48]], "Sniper", "-", "r", 7],
  ["2L", "primedShred", [["R", 0.55], ["P", 2.2]], "Rilfe", "r", "l", 16],

  // 霰弹枪 50 ~ 8z
  ["50", "pointBlank", [["D", 0.9]], "Shotgun", "r", "c", 9],
  ["51", "primedPointBlank", [["D", 1.65]], "Shotgun", "r", "l", 14],
  ["52", "hellsChamber", [["S", 1.2]], "Shotgun", "r", "r", 15],
  ["53", "viciousSpread", [["D", 0.9], ["扩散", 0.6]], "Shotgun", "r", "r", 9],
  ["54", "blaze", [["D", 0.6], ["4", 0.6]], "Shotgun", "r", "r", 9],
  ["55", "toxicBarrage", [["6", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7],
  ["56", "scatteringInferno", [["4", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7],
  ["57", "frigidBlast", [["5", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7],
  ["58", "shellShock", [["7", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7],
  ["59", "incendiaryCoat", [["4", 0.9]], "Shotgun", "-", "c", 11],
  ["5A", "chillingGrasp", [["5", 0.9]], "Shotgun", "d", "c", 11],
  ["5B", "contagiousSpread", [["6", 0.9]], "Shotgun", "-", "c", 11],
  ["5C", "chargedShell", [["7", 0.9]], "Shotgun", "-", "c", 11],
  ["5D", "shredder", [["A", 0.3]], "Shotgun", "-", "n", 9],
  ["5E", "sweepingSerration", [["A", 1.2]], "Shotgun", "-", "r", 11],
  ["5F", "flechette", [["9", 0.3]], "Shotgun", "-", "n", 9],
  ["5G", "breachLoader", [["9", 1.2]], "Shotgun", "-", "r", 11],
  ["5H", "disruptor", [["8", 0.3]], "Shotgun", "-", "n", 9],
  ["5I", "fullContact", [["8", 1.2]], "Shotgun", "-", "r", 11],
  ["5J", "acceleratedBlast", [["R", 0.6], ["9", 0.6]], "Shotgun", "r", "r", 9],
  ["5K", "cleanseCorpus", [["C", 0.3]], "Shotgun", "r", "c", 9],
  ["5L", "cleanseGrineer", [["G", 0.3]], "Shotgun", "r", "c", 9],
  ["5M", "cleanseInfested", [["I", 0.3]], "Shotgun", "r", "c", 9],
  ["5N", "cleanseCorrupted", [["对堕落者伤害", 0.3]], "Shotgun", "r", "c", 9],
  ["5O", "shellCompression", [["M", 0.3]], "Shotgun", "-", "c", 7],
  ["5P", "lockAndLoad", [["收起武器时弹夹每秒自动装填", 0.2]], "Shotgun", "-", "r", 13],
  ["5Q", "silentBattery", [["噪音", -1]], "Shotgun", "-", "c", 5],
  ["5R", "tacticalPump", [["F", 0.3]], "Shotgun", "-", "c", 7],
  ["5S", "lingeringTorment", [["3", 0.3]], "Shotgun", "r", "n", 11],
  ["5T", "scatteredJustice", [["S", 2]], "Hek", "r", "r", 7],
  ["5U", "taintedShell", [["扩散", -0.77], ["R", -0.55]], "Shotgun", "d", "r", 14],
  ["5V", "chillingReload", [["5", 0.6], ["F", 0.4]], "Shotgun", "r", "r", 5],
  ["5W", "seekingFury", [["F", 0.15], ["P", 1.2]], "Shotgun", "r", "r", 11],
  ["5X", "ravage", [["1", 0.6]], "Shotgun", "r", "r", 9],
  ["5Y", "primedRavage", [["1", 1.1]], "Shotgun", "r", "l", 14],
  ["5Z", "shrapnelShot", [["1", 0.99]], "Shotgun", "r", "n", 9],
  ["5a", "narrowBarrel", [["扩散", -0.3]], "Shotgun", "r", "r", 9],
  ["5b", "shatteringJustice", [["加法触发", 0.2]], "Sobek", "-", "r", 7],
  ["5c", "seekingForce", [["P", 0.3]], "Shotgun", "-", "r", 15],
  ["5d", "nanoApplicator", [["2", 0.9]], "Shotgun", "r", "r", 9],
  ["5e", "fatalAcceleration", [["V", 0.4]], "Shotgun", "r", "c", 7],
  ["5f", "frailMomentum", [["R", 0.9], ["D", -0.15]], "Shotgun", "-", "r", 9],
  ["5g", "shotgunSpazz", [["R", 0.9]], "Shotgun", "r", "c", 9],
  ["5h", "repeaterClip", [["R", 1.05]], "Shotgun", "r", "c", 9],
  ["5i", "burdenedMagazine", [["L", 0.6], ["F", -0.18]], "Shotgun", "-", "r", 11],
  ["5j", "shotgunSavvy", [["2", 0.3]], "Shotgun", "d", "c", 9],
  ["5k", "criticalDeceleration", [["0", 0.48], ["R", -0.3]], "Shotgun", "r", "r", 9],
  ["5l", "laserSight", [["0", 1.2]], "Shotgun", "r", "c", 9],
  ["5m", "blunderbuss", [["0", 0.9]], "Shotgun", "r", "n", 9],
  // ["5n","Primed Blunderbuss", "雷筒 Prime", [["0", 1.65]], "增加暴击几率", "Shotgun", "r", "l", 14],
  ["5o", "ammoStock", [["L", 0.6]], "Shotgun", "-", "c", 9],
  ["5p", "shotgunAmmoMutation", [["弹药转换", 0.375]], "Shotgun", "-", "r", 9],
  ["5q", "primedShotgunAmmoMutation", [["弹药转换", 0.6875]], "Shotgun", "-", "l", 14],
  ["5r", "softHands", [["拔枪速度", 2]], "Shotgun", "-", "c", 7],
  ["5s", "acidShells", [["魔改", 450]], "Sobek", "r", "c", 9],
  ["5t", "fomorianAccelerant", [["F", 0.6], ["反弹", 4]], "Drakgoon", "r", "c", 7],
  ["5u", "primedChargedShell", [["7", 1.65]], "Shotgun", "-", "l", 16],

  // ["5v", "Broad Eye", "广域之视", [["PVP", 0]], "瞄准时，减少变焦", "Shotgun", "-", "c", 7],
  // ["5w", "Kill Switch", "屠戮换弹", [["PVP", 0]], "在击杀时，增加换弹速度", "Shotgun", "r", "r", 13],
  // ["5x", "Momentary Pause", "片刻喘息", [["PVP", 0]], "击杀时回复生命 减少从生命球中获得的生命回复", "Shotgun", "d", "r", 9],
  // ["5y", "Loaded Capacity", "加载弹容", [["PVP", 0]], "增加弹药容量 减少填装速度", "Shotgun", "-", "n", 9],
  // ["5z", "Bounty Hunter", "赏金猎人", [["PVP", 0]], "被命中的敌人会暂时的暴露在小地图上", "Shotgun", "-", "c", 7],
  // ["60", "Loose Chamber", "松弛枪膛", [["PVP", 0]], "增加霰弹枪的填装速度和武器后坐力", "Shotgun", "-", "n", 9],
  // ["61", "Hydraulic Chamber", "液压枪膛", [["PVP", 0]], "减少弹药容量和武器后坐力", "Shotgun", "-", "r", 9],
  // ["62", "Double-Barrel Drift", "游离双管", [["PVP", 0]], "滑行时,降低霰弹枪的后坐力和弹片扩散程度", "Shotgun", "r", "r", 9],
  // ["63", "Shred Shot", "撕碎射击", [["PVP", 0]], "转换霰弹枪部分物理伤害为穿刺伤害", "Shotgun", "r", "c", 5],
  // ["64", "Crash Shot", "溃散射击", [["PVP", 0]], "转换霰弹枪部分物理伤害为冲击伤害", "Shotgun", "r", "c", 5],
  // ["65", "Flak Shot", "高射炮击", [["PVP", 0]], "转换霰弹枪部分物理伤害为切割伤害", "Shotgun", "r", "c", 5],
  // ["66", "Snap Shot", "速射", [["PVP", 0]], "增加瞄准时的 移动速度", "Shotgun", "r", "c", 9],

  // 手枪 90 ~ Bz
  ["90", "hornetStrike", [["D", 2.2]], "Secondary", "r", "c", 14],
  ["91", "barrelDiffusion", [["S", 1.2]], "Secondary", "r", "r", 11],
  ["92", "lethalTorrent", [["R", 0.6], ["S", 0.6]], "Secondary", "r", "r", 11],
  ["93", "pistolGambit", [["0", 1.2]], "Secondary", "r", "n", 9],
  ["94", "primedPistolGambit", [["0", 1.87]], "Secondary", "r", "l", 14],
  ["95", "targetCracker", [["1", 0.6]], "Secondary", "r", "c", 9],
  ["96", "primedTargetCracker", [["1", 1.2]], "Secondary", "r", "l", 14],
  ["97", "hydraulicCrosshairs", [["0", 1.35]], "Secondary", "r", "n", 7],
  ["98", "embeddedCatalyzer", [["2", 0.9]], "Secondary", "r", "c", 9],
  ["99", "pressurizedMagazine", [["R", 0.9]], "Secondary", "r", "r", 9],
  ["9A", "targetingSubsystem", [["精准度", 0.3]], "Secondary", "r", "c", 7],
  ["9B", "sharpenedBullets", [["1", 0.75]], "Secondary", "r", "c", 7],
  ["9C", "noReturn", [["9", 0.6]], "Secondary", "-", "c", 7],
  ["9D", "bore", [["9", 1.2]], "Secondary", "-", "r", 11],
  ["9E", "razorShot", [["A", 0.6]], "Secondary", "-", "c", 7],
  ["9F", "maim", [["A", 1.2]], "Secondary", "-", "c", 11],
  ["9G", "concussionRounds", [["8", 0.6]], "Secondary", "-", "c", 7],
  ["9H", "pummel", [["8", 1.2]], "Secondary", "-", "c", 11],
  ["9I", "heatedCharge", [["4", 0.9]], "Secondary", "-", "c", 11],
  ["9J", "primedHeatedCharge", [["4", 1.65]], "Secondary", "-", "l", 16],
  ["9K", "convulsion", [["7", 0.9]], "Secondary", "-", "c", 11],
  ["9L", "deepFreeze", [["5", 0.9]], "Secondary", "d", "c", 11],
  ["9M", "pathogenRounds", [["6", 0.9]], "Secondary", "-", "c", 11],
  ["9N", "pistolPestilence", [["6", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7],
  ["9O", "jolt", [["7", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7],
  ["9P", "scorch", [["4", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7],
  ["9Q", "frostbite", [["5", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7],
  ["9R", "iceStorm", [["L", 0.4], ["5", 0.4]], "Secondary", "r", "r", 9],
  ["9S", "creepingBullseye", [["0", 0.48], ["R", -0.36]], "Secondary", "-", "r", 9],
  ["9T", "expelCorpus", [["C", 0.3]], "Secondary", "r", "c", 9],
  ["9U", "expelGrineer", [["G", 0.3]], "Secondary", "r", "c", 9],
  ["9V", "expelInfested", [["I", 0.3]], "Secondary", "r", "c", 9],
  ["9W", "expelCorrupted", [["对堕落者伤害", 0.3]], "Secondary", "r", "c", 9],
  ["9X", "anemicAgility", [["R", 0.9], ["D", -0.15]], "Secondary", "-", "r", 9],
  ["9Y", "gunslinger", [["R", 0.72]], "Secondary", "r", "c", 9],
  ["9Z", "hawkEye", [["H", 0.8]], "Secondary", "-", "c", 9],
  ["9a", "hollowPoint", [["1", 0.6], ["D", -0.15]], "Secondary", "-", "r", 9],
  ["9b", "magnumForce", [["D", 0.66], ["精准度", -0.33]], "Secondary", "r", "r", 14],
  ["9c", "quickdraw", [["F", 0.48]], "Secondary", "-", "n", 7],
  ["9d", "primedQuickdraw", [["F", 0.88]], "Secondary", "-", "l", 12],
  ["9e", "seeker", [["P", 2.1]], "Secondary", "-", "r", 9],
  ["9f", "slipMagazine", [["L", 0.3]], "Secondary", "-", "n", 9],
  ["9g", "primedSlipMagazine", [["L", 0.55]], "Secondary", "-", "l", 14],
  ["9h", "steadyHands", [["Z", -0.6]], "Secondary", "-", "r", 9],
  ["9i", "stunningSpeed", [["F", 0.4], ["2", 0.1]], "Secondary", "-", "r", 9],
  ["9j", "suppress", [["噪音", -1]], "Secondary", "-", "n", 5],
  ["9k", "sureShot", [["2", 0.15]], "Secondary", "d", "c", 7],
  ["9l", "taintedClip", [["L", 0.6], ["F", -0.3]], "Secondary", "-", "r", 9],
  ["9m", "trickMag", [["M", 0.9]], "Secondary", "-", "n", 7],
  ["9n", "pistolAmmoMutation", [["弹药转换", 0.375]], "Secondary", "-", "r", 9],
  ["9o", "primedPistolAmmoMutation", [["弹药转换", 0.6875]], "Secondary", "-", "r", 14],
  ["9p", "ruinousExtension", [["射程", 8]], "Secondary", "-", "c", 5],
  ["9q", "erodingBlight", [["L", 2]], "Embolist", "d", "r", 7],
  ["9r", "stockpiledBlight", [["L", 2]], "Kunai", "d", "r", 7],
  ["9s", "entropySpike", [["子弹爆炸几率", 0.2]], "Bolto", "-", "r", 7],
  ["9t", "sequenceBurn", [["射程", 20]], "Spectra", "-", "r", 7],
  ["9u", "toxicSequence", [["3", 2]], "Acrid", "d", "r", 7],
  ["9v", "windsOfPurity", [["生命窃取", 0.2]], "Furis", "d", "r", 7],
  ["9w", "stingingTruth", [["弹匣", 40]], "Viper", "d", "r", 7],
  ["9x", "augurPact", [["D", 0.9]], "Secondary", "-", "c", 7],
  ["9y", "primedExpelCorpus", [["C", 0.55]], "Secondary", "r", "l", 14],
  ["9z", "primedExpelGrineer", [["G", 0.55]], "Secondary", "r", "l", 14],
  ["A0", "primedExpelInfested", [["I", 0.55]], "Secondary", "r", "l", 14],
  ["A1", "primedExpelCorrupted", [["对堕落者伤害", 0.55]], "Secondary", "r", "l", 14],

  // 近战 C0 ~ Fz
  ["C0", "pressurePoint", [["K", 1.2]], "Melee", "r", "n", 9],
  ["C1", "primedPressurePoint", [["K", 1.65]], "Melee", "r", "l", 14],
  ["C2", "spoiledStrike", [["K", 1], ["J", -0.2]], "Melee", "r", "r", 7],
  ["C3", "reach", [["T", 0.6]], "Melee", "r", "n", 9],
  ["C4", "primedReach", [["T", 1.65]], "Melee", "r", "l", 14],
  ["C5", "maimingStrike", [["E", 0.9]], "Melee", "r", "r", 7],
  ["C6", "bloodRush", [["连击数增加暴击率", 1.65]], "Melee", "r", "c", 14],
  ["C7", "bodyCount", [["N", 12]], "Melee", "r", "n", 9],
  ["C8", "weepingWounds", [["连击数增加触发率", 0.45]], "Melee", "r", "c", 9],
  ["C9", "relentlessCombination", [["残酷组合", 1]], "Melee", "-", "c", 9],
  ["CA", "berserker", [["最终攻速", 0.75]], "Melee", "r", "r", 9],
  ["CB", "fury", [["J", 0.3]], "Melee", "r", "c", 9],
  ["CC", "trueSteel", [["0", 0.6]], "Melee", "r", "n", 9],
  ["CD", "sacrificialSteel", [["0", 0.88]], "Melee", "w", "l", 14],
  ["CE", "organShatter", [["1", 0.9]], "Melee", "r", "n", 9],
  ["CF", "heavyTrauma", [["8", 0.9]], "Melee", "-", "r", 9],
  ["CG", "collisionForce", [["8", 1.2]], "Melee", "-", "r", 11],
  ["CH", "primedHeavyTrauma", [["8", 1.65]], "Melee", "-", "l", 14],
  ["CI", "sunderingStrike", [["9", 0.9]], "Melee", "-", "r", 9],
  ["CJ", "augerStrike", [["9", 1.2]], "Melee", "-", "r", 11],
  ["CK", "jaggedEdge", [["A", 0.9]], "Melee", "-", "r", 9],
  ["CL", "buzzKill", [["A", 1.2]], "Melee", "-", "r", 11],
  ["CM", "feverStrike", [["6", 0.9]], "Melee", "-", "c", 11],
  ["CN", "primedFeverStrike", [["6", 1.65]], "Melee", "-", "l", 16],
  ["CO", "moltenImpact", [["4", 0.9]], "Melee", "-", "c", 11],
  ["CP", "northWind", [["5", 0.9]], "Melee", "d", "c", 11],
  ["CQ", "shockingTouch", [["7", 0.9]], "Melee", "-", "c", 11],
  ["CR", "viciousFrost", [["5", 0.6], ["2", 0.6]], "Melee", "r", "r", 7],
  ["CS", "virulentScourge", [["6", 0.6], ["2", 0.6]], "Melee", "r", "r", 7],
  ["CT", "volcanicEdge", [["4", 0.6], ["2", 0.6]], "Melee", "r", "r", 7],
  ["CU", "voltaicStrike", [["7", 0.6], ["2", 0.6]], "Melee", "r", "r", 7],
  ["CV", "finishingTouch", [["X", 0.6]], "Melee", "r", "c", 9],
  ["CW", "corruptCharge", [["B", 1], ["U", -0.4]], "Melee", "r", "r", 7],
  ["CX", "dispatchOverdrive", [["移动速度", 0.6]], "Melee", "-", "c", 9],
  ["CY", "driftingContact", [["N", 10], ["2", 0.4]], "Melee", "d", "r", 5],
  ["CZ", "conditionOverload", [["异常状态增加近战伤害", 0.6]], "Melee", "r", "r", 15],
  ["Ca", "guardianDerision", [["格挡时增加", 1]], "Melee", "d", "r", 11],
  ["Cb", "healingReturn", [["攻击触发异常的敌人回血", 1]], "Melee", "d", "r", 16],
  ["Cc", "energyChannel", [["能量消耗增加额外近战伤害", 1]], "Melee", "r", "r", 7],
  ["Cd", "enduringAffliction", [["击中时的状态持续时间", 1.5]], "Melee", "d", "c", 9],
  ["Ce", "enduringStrike", [["2", 0.6], ["U", -0.4]], "Melee", "=", "n", 7],
  ["Cf", "focusEnergy", [["U", 0.4], ["7", 0.6]], "Melee", "r", "r", 9],
  ["Cg", "focusedDefense", [["护甲", 0.2], ["U", -1.4]], "Melee", "d", "n", 9],
  ["Ch", "lifeStrike", [["生命窃取", 0.2], ["U", -1.4]], "Melee", "d", "r", 9],
  ["Ci", "primedFury", [["J", 0.55]], "Melee", "r", "c", 14],
  ["Cj", "killingBlow", [["B", 1.2]], "Melee", "r", "c", 9],
  ["Ck", "lastingSting", [["3", 1.1]], "Melee", "r", "n", 9],
  ["Cl", "meleeProwess", [["2", 0.15]], "Melee", "d", "n", 9],
  ["Cm", "blocking", [["反击几率", 0.9]], "Melee", "d", "n", 9],
  ["Cn", "speed", [["J", 0.2], ["U", -0.8]], "Melee", "r", "r", 9],
  ["Co", "reflexCoil", [["U", 0.6]], "Melee", "-", "c", 9],
  ["Cp", "rendingStrike", [["A", 0.6], ["9", 0.8]], "Melee", "-", "r", 9],
  ["Cq", "smiteCorpus", [["C", 0.3]], "Melee", "r", "c", 9],
  ["Cr", "smiteGrineer", [["G", 0.3]], "Melee", "r", "c", 9],
  ["Cs", "smiteInfested", [["I", 0.3]], "Melee", "r", "c", 9],
  ["Ct", "smiteCorrupted", [["对堕落者伤害", 0.3]], "Melee", "r", "c", 9],
  ["Cu", "seismicWave", [["近战震地伤害", 2]], "Melee", "r", "n", 9],
  ["Cv", "truePunishment", [["0", 0.4], ["U", -0.6]], "Melee", "=", "n", 7],
  ["Cw", "powerThrow", [["P", 0.6]], "Glaive", "r", "r", 9],
  ["Cx", "quickReturn", [["弹跳", -4]], "Glaive", "-", "n", 7],
  ["Cy", "rebound", [["弹跳", 4]], "Glaive", "-", "n", 7],
  ["Cz", "whirlwind", [["飞行速度", 1.8]], "Glaive", "-", "r", 7],
  ["D0", "gladiatorRush", [["N", 6], ["连击数增加暴击率", 0.15]], "Melee", "r", "n", 9],
  ["D1", "gladiatorVice", [["J", 0.3], ["连击数增加暴击率", 0.15]], "Melee", "r", "r", 9],
  ["D2", "gladiatorMight", [["1", 0.6], ["连击数增加暴击率", 0.15]], "Melee", "r", "c", 9],
  ["D3", "justiceBlades", [["K", 1]], "Dual Cleavers", "r", "r", 7],
  ["D4", "bladeOfTruth", [["K", 1]], "Jaw Sword", "r", "r", 7],
  ["D5", "gleamingBlight", [["2", 1]], "Dark Dagger", "-", "r", 7],
  ["D6", "toxicBlight", [["6", 1]], "Mire", "r", "r", 7],
  ["D7", "entropyFlight", [["飞行速度", 1.4]], "Kestrel", "-", "r", 7],
  ["D8", "entropyDetonation", [["处决的敌人爆炸", 1]], "Obex", "-", "r", 7],
  ["D9", "brightPurity", [["处决的敌人爆炸", 1]], "Skana", "r", "r", 7],
  ["DA", "avengingTruth", [["格挡增加蓄力伤害", 1]], "Silva & Aegis", "r", "r", 7],
  ["DB", "electromagneticShielding", [["守护", 0.5]], "Ack & Brunt", "r", "r", 7],
  ["DC", "riftStrike", [["瞬移攻击", 25]], "Twin Basolk", "r", "r", 7],
  ["DD", "sacrificialPressure", [["K", 1.375], ["0", 0.25]], "Melee", "w", "l", 16],
] as [string, string, [string, number][], string, "r" | "-" | "d" | "=", "n" | "c" | "r" | "l" | "x", number][];
/**
 * 普通MOD信息
 */
export const NormalModDatabase = _normalModSource.map(v => {
  let pr = v[1] === "sacrificialPressure" ? ["C1", "primedPressurePoint"] :
    v[1] === "trueSteel" ? ["CD", "sacrificialSteel"] :
      _normalModSource.find(k => k[1] === _.camelCase("primed " + v[1]));
  return new NormalMod({
    key: v[0],
    id: v[1],
    props: v[2],
    type: v[3],
    cost: v[6],
    polarity: v[4],
    rarity: v[5],
    primed: pr && pr[1]
  } as NormalModData);
});

export const NormalCardDependTable: [string, string][] = [
  ["bladedRounds", "vitalSense"],
  ["heavyCaliber", "serration"],
  ["pressurizedMagazine", "anemicAgility"],
];

export const AcolyteModsList: string[] = [
  "weepingWounds", "bloodRush", "bodyCount", "maimingStrike", "focusedDefense", // "创口溃烂", "急进猛突", "杀伤计数", "致残突击", "重点防御",
  "guidedOrdinance", "bladedRounds", "argonScope", "springLoadedChamber", "catalyzerLink", // "制导弹药", "尖刃弹头", "氩晶瞄具", "簧压膛室", "触媒连动",
  "narrowBarrel", "shrapnelShot", "nanoApplicator", "repeaterClip", "laserSight", // "狭窄枪膛", "破片射击", "纳米涂覆", "转轮弹匣", "雷射瞄具",
  "embeddedCatalyzer", "pressurizedMagazine", "targetingSubsystem", "sharpenedBullets", "hydraulicCrosshairs", // "内置触媒", "增压弹匣", "定位辅助", "尖锐子弹", "液压准心",
];

export const VisualMeleeMods = ["D3", "D4", "D5", "D6"];
