import _ from "lodash";
import { i18n } from "@/i18n";
import { ValuedProperty } from "./prop";

export interface NormalModData {
  /** 索引 */
  key: string
  /** ID */
  id: string
  /** 名称 */
  name?: string
  /** 描述 */
  desc?: string
  /** 适用对象 */
  type: string
  /** 极性 */
  polarity: Polarity
  /** 消耗 */
  cost: number
  /** 等级 */
  level: number
  /** 稀有度 */
  rarity: Rarity
  /** 属性 */
  props: [string, number][]
  /** 等价的MOD 如元素卡 */
  canReplaceBy?: string[]
  /** P卡或其他种类高级卡对应的普通卡的名称 */
  primed?: string
  /** 紫卡元数据 */
  riven?: string
}

export type Polarity = "r" | "-" | "d" | "=" | "w"
export type Rarity = "n" | "c" | "r" | "l" | "x"
/**
 * 普通MOD信息
 */
export class NormalMod implements NormalModData {
  key: string
  id: string
  customName?: string
  type: string
  polarity: Polarity
  maxCost: number;
  level: number
  maxLevel: number
  rarity: Rarity
  _props: [string, number][]
  canReplaceBy?: string[]
  primed?: string
  riven?: string
  setMul: number = 1

  get props() {
    if (this.setMul === 1 && this.level === this.maxLevel) return this._props;
    return this._props.map(([vn, vv]) => [vn, +(vv / (this.maxLevel + 1) * (this.level + 1) * this.setMul).toFixed(4)] as [string, number])
  }
  /**
   * 显示用Props
   *
   * @readonly
   * @memberof NormalMod
   */
  get vProps() {
    return this.props.map(prop => {
      let vp = ValuedProperty.parse(prop)
      return {
        id: vp.id,
        fullName: vp.fullString,
        shortName: vp.shortString,
        value: vp.value,
      }
    })
  }

  get cost(): number { return this.maxCost + this.level - this.maxLevel; }
  get name() {
    let name = this.customName || i18n.t(`messages.${this.id}`) as string;
    return name || "";
  }
  /** 描述 */
  get desc() {
    let desc = i18n.t(`moddesc.${this.id}`) as string;
    return desc || "";
  }

  /** 计算实际容量消耗 */
  calcCost(polarity: string) {
    if (polarity)
      return Math.ceil(polarity === this.polarity ? this.cost / 2 : this.cost * 1.25);
    else
      return this.cost;
  }

  /** 调整等级 */
  scaleLevel(level: number) {
    if (level >= this.maxLevel) return this;
    let { key, id, customName, type, polarity, rarity, maxLevel, props, canReplaceBy, primed, riven } = this;
    return new NormalMod({
      key, id, type, polarity, rarity, canReplaceBy, primed, riven, props,
      name: customName,
      level: maxLevel,
      cost: this.maxCost,
    }, level)
  }

  constructor(data: NormalModData, userLevel?: number) {
    this.key = data.key;
    this.id = data.id;
    this.customName = data.name;
    this.type = data.type;
    this.polarity = data.polarity;
    this.maxCost = data.cost;
    this.level = userLevel || data.level;
    this.maxLevel = data.level;
    this.rarity = data.rarity;
    this._props = data.props;
    this.canReplaceBy = data.canReplaceBy;
    this.primed = data.primed;
    this.riven = data.riven;
  }
}

const _normalModSource = [
  // 00 为空槽 01 为紫卡
  // 主要武器 00 ~ 0z
  ["02", "hunterMunitions", [["ac", 0.3]], "Primary", "r", "c", 9],
  ["03", "vigilanteArmaments", [["S", 0.6], ["ce", 0.05]], "Primary", "-", "n", 9],
  ["04", "vigilanteFervor", [["R", 0.45], ["ce", 0.05]], "Primary", "r", "c", 9],
  ["05", "vigilanteOffense", [["P", 1.5], ["ce", 0.05]], "Primary", "-", "r", 9],

  // 步枪 10 ~ 4z
  ["10", "serration", [["D", 1.65]], "Rilfe", "r", "c", 14, 10],
  ["11", "splitChamber", [["S", 0.9]], "Rilfe", "r", "r", 15, 10],
  ["12", "heavyCaliber", [["D", 1.65], ["acc", -0.55]], "Rilfe", "r", "r", 16, 10],
  ["13", "pointStrike", [["0", 1.5]], "Rilfe", "r", "n", 9],
  ["14", "vitalSense", [["1", 1.2]], "Rilfe", "r", "r", 9],
  ["15", "argonScope", [["0", 1.35]], "Rilfe", "r", "r", 7],
  ["16", "bladedRounds", [["1", 1.2]], "Rilfe", "r", "c", 9],
  ["17", "hammerShot", [["1", 0.6], ["2", 0.4]], "Rilfe", "d", "r", 9],
  ["18", "cryoRounds", [["5", 0.9]], "Rilfe", "d", "c", 11],
  ["19", "primedCryoRounds", [["5", 1.65]], "Rilfe", "d", "l", 16, 10],
  ["1A", "infectedClip", [["6", 0.9]], "Rilfe", "-", "c", 11],
  ["1B", "stormbringer", [["7", 0.9]], "Rilfe", "-", "c", 11],
  ["1C", "hellfire", [["4", 0.9]], "Rilfe", "-", "c", 11],
  ["1D", "malignantForce", [["6", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7, 3],
  ["1E", "highVoltage", [["7", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7, 3],
  ["1F", "rimeRounds", [["5", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7, 3],
  ["1G", "thermiteRounds", [["4", 0.6], ["2", 0.6]], "Rilfe", "r", "r", 7, 3],
  ["1H", "piercingHit", [["9", 0.3]], "Rilfe", "-", "n", 9],
  ["1I", "piercingCaliber", [["9", 1.2]], "Rilfe", "-", "r", 11],
  ["1J", "sawtoothClip", [["A", 0.3]], "Rilfe", "-", "n", 9],
  ["1K", "fangedFusillade", [["A", 1.2]], "Rilfe", "-", "r", 11],
  ["1L", "rupture", [["8", 0.3]], "Rilfe", "-", "n", 9],
  ["1M", "crashCourse", [["8", 1.2]], "Rilfe", "-", "r", 11],
  ["1N", "criticalDelay", [["0", 0.48], ["R", -0.36]], "Rilfe", "-", "r", 9],
  ["1O", "adhesiveBlast", [["stick", 1]], "Launcher", "r", "r", 9],
  ["1P", "sinisterReach", [["range", 12]], "Continuous", "-", "c", 5, 3],
  ["1Q", "vileAcceleration", [["R", 0.9], ["D", -0.15]], "Rilfe", "-", "r", 9],
  ["1R", "metalAuger", [["P", 2.1]], "Rilfe", "-", "r", 15],
  ["1S", "magazineWarp", [["L", 0.3]], "Rilfe", "-", "n", 9],
  ["1T", "ammoDrum", [["M", 0.3]], "Rilfe", "-", "n", 7],
  ["1U", "shred", [["R", 0.3], ["P", 1.2]], "Rilfe", "r", "r", 11],
  ["1V", "continuousMisery", [["3", 1]], "Rilfe", "r", "n", 7],
  ["1W", "agileAim", [["aimm", 0.2]], "Rilfe", "r", "c", 5],
  ["1X", "vilePrecision", [["Z", -0.6], ["R", -0.36]], "Rilfe", "-", "r", 11],
  ["1Y", "terminalVelocity", [["V", 0.6]], "Rilfe", "r", "c", 7],
  ["1Z", "rifleAptitude", [["2", 0.15]], "Rilfe", "d", "c", 9],
  ["1a", "hush", [["slc", 1]], "Rilfe", "-", "n", 5],
  ["1b", "baneOfCorpus", [["C", 0.3]], "Rilfe", "r", "c", 9],
  ["1c", "primedBaneOfCorpus", [["C", 0.55]], "Rilfe", "r", "l", 12, 10],
  ["1d", "baneOfGrineer", [["G", 0.3]], "Rilfe", "r", "c", 9],
  ["1e", "primedBaneOfGrineer", [["G", 0.55]], "Rilfe", "r", "l", 12, 10],
  ["1f", "baneOfInfested", [["I", 0.3]], "Rilfe", "r", "c", 9],
  ["1g", "primedBaneOfInfested", [["I", 0.55]], "Rilfe", "r", "l", 12, 10],
  ["1h", "baneOfCorrupted", [["od", 0.3]], "Rilfe", "r", "c", 9],
  ["1i", "primedBaneOfCorrupted", [["od", 0.55]], "Rilfe", "r", "l", 12, 10],
  ["1j", "speedTrigger", [["R", 0.6]], "Rilfe", "r", "c", 9],
  ["1k", "combustionBeam", [["kb", 600]], "Continuous", "r", "r", 9],
  ["1l", "firestorm", [["brad", 0.24]], "Launcher", "r", "r", 9],
  ["1m", "fastHands", [["F", 0.3]], "Rilfe", "-", "n", 7, 3],
  ["1n", "primedFastHands", [["F", 0.55]], "Rilfe", "-", "l", 12, 10],
  ["1o", "stabilizer", [["Z", -0.6]], "Rilfe", "-", "r", 9],
  ["1p", "guidedOrdinance", [["acc", 0.3]], "AssaultRifle", "r", "c", 7, 3],
  ["1q", "springLoadedChamber", [["R", 0.75]], "AssaultRifle", "r", "c", 9],
  ["1r", "kineticRicochet", [["sp", 1]], "Tetra", "-", "r", 7, 3],
  ["1s", "tetherGrenades", [["sp", 1]], "Penta", "-", "c", 9],
  ["1t", "catalyzerLink", [["2", 0.6]], "Rilfe", "r", "n", 9],
  ["1u", "twitch", [["hr", 2]], "Rilfe", "-", "c", 7],
  ["1v", "wildfire", [["L", 0.2], ["4", 0.6]], "Rilfe", "r", "r", 9],
  ["1w", "eagleEye", [["H", 0.4]], "Rilfe", "-", "c", 7],
  ["1x", "chargedChamber", [["fsb", 0.4]], "Sniper", "r", "c", 9],
  // ["1y","Primed Charged Chamber", "蓄力装填 Prime", [["fsb", 1.1]], "提升更换弹匣后第一次射击的基础伤害", "Sniper", "r", "l", 16],
  ["1z", "primedChamber", [["fsb", 1]], "Sniper", "r", "r", 7, 3],
  ["20", "rifleAmmoMutation", [["am", 0.375]], "AssaultRifle", "-", "r", 9],
  ["21", "arrowMutation", [["am", 0.375]], "Bow", "-", "r", 9],
  ["22", "sniperAmmoMutation", [["am", 0.375]], "Sniper", "-", "r", 9],
  ["23", "targetAcquired", [["hm", 0.6]], "Sniper", "r", "r", 9],
  ["24", "entropyBurst", [["bsc", 20]], "Supra", "r", "r", 7, 3],
  ["25", "lastingPurity", [["da", 0.6]], "Vulkar", "-", "r", 7, 3],
  ["26", "nightwatchNapalm", [["sp", 1]], "Ogris", "r", "r", 9],
  ["27", "fluxOverdrive", [["sp", 0]], "Flux Rifle", "r", "c", 9],
  ["28", "neutralizingJustice", [["sp", 1]], "Miter", "d", "r", 7, 3],
  ["29", "voltageSequence", [["sp", 1]], "Lanka", "-", "r", 7, 3],
  ["2A", "disarmingPurity", [["sp", 0.4]], "Panthera", "-", "r", 7, 3],
  ["2B", "deadlySequence", [["0", 2]], "Grinlok", "r", "r", 7, 3],
  ["2C", "gildedTruth", [["R", 0.8]], "Burston Prime", "r", "r", 7, 3],
  ["2D", "springLoadedBroadhead", [["oad", 0.4]], "Daikyu", "r", "r", 15],
  // ["2E", "Apex Predator", "顶级掠食者", [["PVP", 0]], "让被击中的目标暂时出现在小地图上（限武形秘仪）", "Rilfe", "-", "c", 7],
  // ["2F", "Lucky Shot", "幸运射击", [["PVP", 0]], "提升武器的弹道fs，降低acc（限武形秘仪）", "Rilfe", "r", "c", 9],
  // ["2G", "Vanquished Prey", "战无不克", [["PVP", 0]], "击败另一名玩家后降低一段时间的护盾回充延迟，降低生命球的回血量（限武形秘仪）", "AssaultRifle", "d", "r", 9],
  // ["2H", "Comet Rounds", "彗星弹头", [["PVP", 0]], "将一部分物理伤害转化为冲击伤害（限武形秘仪）", "Rilfe", "r", "c", 5],
  // ["2I", "Serrated Rounds", "锯刃弹头", [["PVP", 0]], "一部分物理伤害转换为切割伤害（限武形秘仪）", "Rilfe", "r", "c", 5],
  // ["2J", "Ripper Rounds", "撕裂弹头", [["PVP", 0]], "将一部分物理伤害转化为穿刺伤害（限武形秘仪）", "Rilfe", "r", "c", 5],
  ["2K", "depletedReload", [["L", -0.6], ["F", 0.48]], "Sniper", "-", "r", 7],
  ["2L", "primedShred", [["R", 0.55], ["P", 2.2]], "Rilfe", "r", "l", 16, 10],
  ["2M", "primedRifleAmmoMutation", [["am", 0.6875]], "AssaultRifle", "-", "l", 14, 10],
  ["2N", "primedSniperAmmoMutation", [["am", 0.6875]], "Sniper", "-", "l", 14, 10],

  // 霰弹枪 50 ~ 8z
  ["50", "pointBlank", [["D", 0.9]], "Shotgun", "r", "c", 9],
  ["51", "primedPointBlank", [["D", 1.65]], "Shotgun", "r", "l", 14, 10],
  ["52", "hellsChamber", [["S", 1.2]], "Shotgun", "r", "r", 15],
  ["53", "viciousSpread", [["D", 0.9], ["spr", 0.6]], "Shotgun", "r", "r", 9],
  ["54", "blaze", [["D", 0.6], ["4", 0.6]], "Shotgun", "r", "r", 9],
  ["55", "toxicBarrage", [["6", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7, 3],
  ["56", "scatteringInferno", [["4", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7, 3],
  ["57", "frigidBlast", [["5", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7, 3],
  ["58", "shellShock", [["7", 0.6], ["2", 0.6]], "Shotgun", "r", "r", 7, 3],
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
  ["5N", "cleanseCorrupted", [["od", 0.3]], "Shotgun", "r", "c", 9],
  ["5O", "shellCompression", [["M", 0.3]], "Shotgun", "-", "c", 7],
  ["5P", "lockAndLoad", [["lal", 0.2]], "Shotgun", "-", "r", 13, 3],
  ["5Q", "silentBattery", [["slc", 1]], "Shotgun", "-", "c", 5],
  ["5R", "tacticalPump", [["F", 0.3]], "Shotgun", "-", "c", 7],
  ["5S", "lingeringTorment", [["3", 0.3]], "Shotgun", "r", "n", 11],
  ["5T", "scatteredJustice", [["S", 2]], "Hek", "r", "r", 7, 3],
  ["5U", "taintedShell", [["spr", -0.77], ["R", -0.55]], "Shotgun", "d", "r", 14, 10],
  ["5V", "chillingReload", [["5", 0.6], ["F", 0.4]], "Shotgun", "r", "r", 5, 3],
  ["5W", "seekingFury", [["F", 0.15], ["P", 1.2]], "Shotgun", "r", "r", 11],
  ["5X", "ravage", [["1", 0.6]], "Shotgun", "r", "r", 9],
  ["5Y", "primedRavage", [["1", 1.1]], "Shotgun", "r", "l", 14],
  ["5Z", "shrapnelShot", [["1", 0.99]], "Shotgun", "r", "n", 9],
  ["5a", "narrowBarrel", [["spr", -0.3]], "Shotgun", "r", "r", 9],
  ["5b", "shatteringJustice", [["bsc", 0.2]], "Sobek", "-", "r", 7, 3],
  ["5c", "seekingForce", [["P", 2.1]], "Shotgun", "-", "r", 15],
  ["5d", "nanoApplicator", [["2", 0.9]], "Shotgun", "r", "r", 9],
  ["5e", "fatalAcceleration", [["V", 0.4]], "Shotgun", "r", "c", 7, 3],
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
  ["5p", "shotgunAmmoMutation", [["am", 0.375]], "Shotgun", "-", "r", 9],
  ["5q", "primedShotgunAmmoMutation", [["am", 0.6875]], "Shotgun", "-", "l", 14, 10],
  ["5r", "softHands", [["hr", 2]], "Shotgun", "-", "c", 7, 3],
  ["5s", "acidShells", [["sp", 450]], "Sobek", "r", "c", 9],
  ["5t", "fomorianAccelerant", [["F", 0.6], ["bnc", 4]], "Drakgoon", "r", "c", 7, 3],
  ["5u", "primedChargedShell", [["7", 1.65]], "Shotgun", "-", "l", 16, 10],

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
  ["90", "hornetStrike", [["D", 2.2]], "Secondary", "r", "c", 14, 10],
  ["91", "barrelDiffusion", [["S", 1.2]], "Secondary", "r", "r", 11],
  ["92", "lethalTorrent", [["R", 0.6], ["S", 0.6]], "Secondary", "r", "r", 11],
  ["93", "pistolGambit", [["0", 1.2]], "Secondary", "r", "n", 9],
  ["94", "primedPistolGambit", [["0", 1.87]], "Secondary", "r", "l", 14, 10],
  ["95", "targetCracker", [["1", 0.6]], "Secondary", "r", "c", 9],
  ["96", "primedTargetCracker", [["1", 1.1]], "Secondary", "r", "l", 14, 10],
  ["97", "hydraulicCrosshairs", [["0", 1.35]], "Secondary", "r", "n", 7],
  ["98", "embeddedCatalyzer", [["2", 0.9]], "Secondary", "r", "c", 9],
  ["99", "pressurizedMagazine", [["R", 0.9]], "Secondary", "r", "r", 9],
  ["9A", "targetingSubsystem", [["acc", 0.3]], "Secondary", "r", "c", 7],
  ["9B", "sharpenedBullets", [["1", 0.75]], "Secondary", "r", "c", 7],
  ["9C", "noReturn", [["9", 0.6]], "Secondary", "-", "c", 7],
  ["9D", "bore", [["9", 1.2]], "Secondary", "-", "r", 11],
  ["9E", "razorShot", [["A", 0.6]], "Secondary", "-", "c", 7],
  ["9F", "maim", [["A", 1.2]], "Secondary", "-", "c", 11],
  ["9G", "concussionRounds", [["8", 0.6]], "Secondary", "-", "c", 7],
  ["9H", "pummel", [["8", 1.2]], "Secondary", "-", "c", 11],
  ["9I", "heatedCharge", [["4", 0.9]], "Secondary", "-", "c", 11],
  ["9J", "primedHeatedCharge", [["4", 1.65]], "Secondary", "-", "l", 16, 10],
  ["9K", "convulsion", [["7", 0.9]], "Secondary", "-", "c", 11],
  ["9L", "deepFreeze", [["5", 0.9]], "Secondary", "d", "c", 11],
  ["9M", "pathogenRounds", [["6", 0.9]], "Secondary", "-", "c", 11],
  ["9N", "pistolPestilence", [["6", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7, 3],
  ["9O", "jolt", [["7", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7, 3],
  ["9P", "scorch", [["4", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7, 3],
  ["9Q", "frostbite", [["5", 0.6], ["2", 0.6]], "Secondary", "r", "r", 7, 3],
  ["9R", "iceStorm", [["L", 0.4], ["5", 0.4]], "Secondary", "r", "r", 9, 3],
  ["9S", "creepingBullseye", [["0", 0.48], ["R", -0.36]], "Secondary", "-", "r", 9],
  ["9T", "expelCorpus", [["C", 0.3]], "Secondary", "r", "c", 9],
  ["9U", "expelGrineer", [["G", 0.3]], "Secondary", "r", "c", 9],
  ["9V", "expelInfested", [["I", 0.3]], "Secondary", "r", "c", 9],
  ["9W", "expelCorrupted", [["od", 0.3]], "Secondary", "r", "c", 9],
  ["9X", "anemicAgility", [["R", 0.9], ["D", -0.15]], "Secondary", "-", "r", 9],
  ["9Y", "gunslinger", [["R", 0.72]], "Secondary", "r", "c", 9],
  ["9Z", "hawkEye", [["H", 0.8]], "Secondary", "-", "c", 9],
  ["9a", "hollowPoint", [["1", 0.6], ["D", -0.15]], "Secondary", "-", "r", 9],
  ["9b", "magnumForce", [["D", 0.66], ["acc", -0.33]], "Secondary", "r", "r", 14],
  ["9c", "quickdraw", [["F", 0.48]], "Secondary", "-", "n", 7],
  ["9d", "primedQuickdraw", [["F", 0.88]], "Secondary", "-", "l", 12],
  ["9e", "seeker", [["P", 2.1]], "Secondary", "-", "r", 9],
  ["9f", "slipMagazine", [["L", 0.3]], "Secondary", "-", "n", 9],
  ["9g", "primedSlipMagazine", [["L", 0.55]], "Secondary", "-", "l", 14],
  ["9h", "steadyHands", [["Z", -0.6]], "Secondary", "-", "r", 9],
  ["9i", "stunningSpeed", [["F", 0.4], ["2", 0.1]], "Secondary", "-", "r", 9],
  ["9j", "suppress", [["slc", -1]], "Secondary", "-", "n", 5],
  ["9k", "sureShot", [["2", 0.15]], "Secondary", "d", "c", 7],
  ["9l", "taintedClip", [["L", 0.6], ["F", -0.3]], "Secondary", "-", "r", 9],
  ["9m", "trickMag", [["M", 0.9]], "Secondary", "-", "n", 7],
  ["9n", "pistolAmmoMutation", [["am", 0.375]], "Secondary", "-", "r", 9],
  ["9o", "primedPistolAmmoMutation", [["am", 0.6875]], "Secondary", "-", "r", 14, 10],
  ["9p", "ruinousExtension", [["range", 8]], "Secondary", "-", "c", 5, 3],
  ["9q", "erodingBlight", [["L", 2]], "Embolist", "d", "r", 7, 3],
  ["9r", "stockpiledBlight", [["L", 2]], "Kunai", "d", "r", 7, 3],
  ["9s", "entropySpike", [["exp", 0.2]], "Bolto", "-", "r", 7, 3],
  ["9t", "sequenceBurn", [["range", 20]], "Spectra", "-", "r", 7, 3],
  ["9u", "toxicSequence", [["3", 2]], "Acrid", "d", "r", 7, 3],
  ["9v", "windsOfPurity", [["ls", 0.2]], "Furis", "d", "r", 7, 3],
  ["9w", "stingingTruth", [["maga", 40]], "Viper", "d", "r", 7, 3],
  ["9x", "augurPact", [["D", 0.9]], "Secondary", "-", "c", 7, 3],
  ["9y", "primedExpelCorpus", [["C", 0.55]], "Secondary", "r", "l", 14, 10],
  ["9z", "primedExpelGrineer", [["G", 0.55]], "Secondary", "r", "l", 14, 10],
  ["A0", "primedExpelInfested", [["I", 0.55]], "Secondary", "r", "l", 14, 10],
  ["A1", "primedExpelCorrupted", [["od", 0.55]], "Secondary", "r", "l", 14, 10],
  ["A2", "concealedExplosives", [["exp", 0.8]], "Secondary", "r", "r", 9],

  // 近战 C0 ~ Fz
  ["C0", "pressurePoint", [["K", 1.2]], "Melee", "r", "n", 9],
  ["C1", "primedPressurePoint", [["K", 1.65]], "Melee", "r", "l", 14, 10],
  ["C2", "spoiledStrike", [["K", 1], ["J", -0.2]], "Melee", "r", "r", 7, 3],
  ["C3", "reach", [["T", 0.6]], "Melee", "r", "n", 9],
  ["C4", "primedReach", [["T", 1.65]], "Melee", "r", "l", 14, 10],
  ["C5", "maimingStrike", [["E", 0.9]], "Melee", "r", "r", 7, 3],
  ["C6", "bloodRush", [["bldr", 1.65]], "Melee", "r", "c", 14, 10],
  ["C7", "bodyCount", [["N", 12]], "Melee", "r", "n", 9],
  ["C8", "weepingWounds", [["sccm", 0.45]], "Melee", "r", "c", 9],
  ["C9", "relentlessCombination", [["ccws", 1]], "Melee", "-", "c", 9],
  ["CA", "berserker", [["bsk", 0.75]], "Melee", "r", "r", 9],
  ["CB", "fury", [["J", 0.3]], "Melee", "r", "c", 9],
  ["CC", "trueSteel", [["0", 0.6]], "Melee", "r", "n", 9],
  ["CD", "sacrificialSteel", [["0", 0.88]], "Melee", "w", "l", 14],
  ["CE", "organShatter", [["1", 0.9]], "Melee", "r", "n", 9],
  ["CF", "heavyTrauma", [["8", 0.9]], "Melee", "-", "r", 9],
  ["CG", "collisionForce", [["8", 1.2]], "Melee", "-", "r", 11],
  ["CH", "primedHeavyTrauma", [["8", 1.65]], "Melee", "-", "l", 14, 10],
  ["CI", "sunderingStrike", [["9", 0.9]], "Melee", "-", "r", 9],
  ["CJ", "augerStrike", [["9", 1.2]], "Melee", "-", "r", 11],
  ["CK", "jaggedEdge", [["A", 0.9]], "Melee", "-", "r", 9],
  ["CL", "buzzKill", [["A", 1.2]], "Melee", "-", "r", 11],
  ["CM", "feverStrike", [["6", 0.9]], "Melee", "-", "c", 11],
  ["CN", "primedFeverStrike", [["6", 1.65]], "Melee", "-", "l", 16, 10],
  ["CO", "moltenImpact", [["4", 0.9]], "Melee", "-", "c", 11],
  ["CP", "northWind", [["5", 0.9]], "Melee", "d", "c", 11],
  ["CQ", "shockingTouch", [["7", 0.9]], "Melee", "-", "c", 11],
  ["CR", "viciousFrost", [["5", 0.6], ["2", 0.6]], "Melee", "r", "r", 7, 3],
  ["CS", "virulentScourge", [["6", 0.6], ["2", 0.6]], "Melee", "r", "r", 7, 3],
  ["CT", "volcanicEdge", [["4", 0.6], ["2", 0.6]], "Melee", "r", "r", 7, 3],
  ["CU", "voltaicStrike", [["7", 0.6], ["2", 0.6]], "Melee", "r", "r", 7, 3],
  ["CV", "finishingTouch", [["X", 0.6]], "Melee", "r", "c", 9],
  ["CW", "corruptCharge", [["B", 1], ["U", -0.4]], "Melee", "r", "r", 7],
  ["CX", "dispatchOverdrive", [["ckm", 0.6]], "Melee", "-", "c", 9],
  ["CY", "driftingContact", [["N", 10], ["2", 0.4]], "Melee", "d", "r", 5],
  ["CZ", "conditionOverload", [["co", 0.6]], "Melee", "r", "r", 15],
  ["Ca", "guardianDerision", [["gdr", 15]], "Melee", "d", "r", 11],
  ["Cb", "healingReturn", [["hlr", 1]], "Melee", "d", "r", 16],
  ["Cc", "energyChannel", [["exd", 300]], "Melee", "r", "r", 7],
  ["Cd", "enduringAffliction", [["3", 1.5]], "Melee", "d", "c", 9],
  ["Ce", "enduringStrike", [["2", 0.6], ["U", -0.4]], "Melee", "=", "n", 7],
  ["Cf", "focusEnergy", [["U", 0.4], ["7", 0.6]], "Melee", "r", "r", 9],
  ["Cg", "focusedDefense", [["amr", 0.2], ["U", -1.4]], "Melee", "d", "n", 9],
  ["Ch", "lifeStrike", [["ls", 0.2], ["U", -1.4]], "Melee", "d", "r", 9],
  ["Ci", "primedFury", [["J", 0.55]], "Melee", "r", "c", 14, 10],
  ["Cj", "killingBlow", [["B", 1.2]], "Melee", "r", "c", 9],
  ["Ck", "lastingSting", [["3", 1.1]], "Melee", "r", "n", 9],
  ["Cl", "meleeProwess", [["2", 0.15]], "Melee", "d", "n", 9],
  ["Cm", "parry", [["par", 0.9]], "Melee", "d", "n", 9],
  ["Cn", "speed", [["J", 0.2], ["U", -0.8]], "Melee", "r", "r", 9],
  ["Co", "reflexCoil", [["U", 0.6]], "Melee", "-", "c", 9],
  ["Cp", "rendingStrike", [["A", 0.6], ["9", 0.8]], "Melee", "-", "r", 9],
  ["Cq", "smiteCorpus", [["C", 0.3]], "Melee", "r", "c", 9],
  ["Cr", "smiteGrineer", [["G", 0.3]], "Melee", "r", "c", 9],
  ["Cs", "smiteInfested", [["I", 0.3]], "Melee", "r", "c", 9],
  ["Ct", "smiteCorrupted", [["od", 0.3]], "Melee", "r", "c", 9],
  ["Cu", "seismicWave", [["msd", 2]], "Melee", "r", "n", 9],
  ["Cv", "truePunishment", [["0", 0.4], ["U", -0.6]], "Melee", "=", "n", 7],
  ["Cw", "powerThrow", [["P", 0.6]], "Glaive", "r", "r", 9],
  ["Cx", "quickReturn", [["bnc", -4]], "Glaive", "-", "n", 7, 3],
  ["Cy", "rebound", [["bnc", 4]], "Glaive", "-", "n", 7, 3],
  ["Cz", "whirlwind", [["fs", 1.8]], "Glaive", "-", "r", 7],
  ["D0", "gladiatorRush", [["N", 6], ["bldr", 0.15]], "Melee", "r", "n", 9],
  ["D1", "gladiatorVice", [["J", 0.3], ["bldr", 0.15]], "Melee", "r", "r", 9],
  ["D2", "gladiatorMight", [["1", 0.6], ["bldr", 0.15]], "Melee", "r", "c", 9],
  ["D3", "justiceBlades", [["K", 1]], "Dual Cleavers", "r", "r", 7, 3],
  ["D4", "bladeOfTruth", [["K", 1]], "Jaw Sword", "r", "r", 7, 3],
  ["D5", "gleamingBlight", [["2", 1]], "Dark Dagger", "-", "r", 7, 3],
  ["D6", "toxicBlight", [["6", 1]], "Mire", "r", "r", 7, 3],
  ["D7", "entropyFlight", [["fs", 1.4]], "Kestrel", "-", "r", 7, 3],
  ["D8", "entropyDetonation", [["sp", 1]], "Obex", "-", "r", 7, 3],
  ["D9", "brightPurity", [["sp", 1]], "Skana", "r", "r", 7, 3],
  ["DA", "avengingTruth", [["sp", 1]], "Silva & Aegis", "r", "r", 7, 3],
  ["DB", "electromagneticShielding", [["sp", 0.5]], "Ack & Brunt", "r", "r", 7, 3],
  ["DC", "riftStrike", [["sp", 25]], "Twin Basolk", "r", "r", 7, 3],
  ["DD", "sacrificialPressure", [["K", 1.375], ["0", 0.25]], "Melee", "w", "l", 16, 10],

  // 战甲 G0 ~ Nz
  // 光环
  ["G0", "growingPower", [["t", 0.255]], "Aura", "r", "r", 7],
  ["G1", "pistolAmp", [["手枪增幅"]], "Aura", "r", "c", 7],
  ["G2", "rifleAmp", [["步枪增幅"]], "Aura", "r", "c", 7],
  ["G3", "deadEye", [["死亡之眼"]], "Aura", "r", "c", 7],
  ["G4", "powerDonation", [["献出力量"]], "Aura", "r", "r", 9],
  ["G5", "steelCharge", [["钢铁充能"]], "Aura", "r", "c", 9],
  ["G6", "shotgunAmp", [["霰弹枪增幅"]], "Aura", "r", "c", 7],
  ["G7", "physique", [["体魄"]], "Aura", "d", "c", 7],
  ["G8", "standUnited", [["团结一致"]], "Aura", "d", "c", 7],
  ["G9", "infestedImpedance", [["感染者阻抗"]], "Aura", "d", "c", 7],
  ["GA", "toxinResistance", [["毒素抵抗"]], "Aura", "d", "c", 7],
  ["GB", "empAura", [["电磁脉冲场"]], "Aura", "d", "c", 7],
  ["GC", "rejuvenation", [["返老还童"]], "Aura", "d", "c", 7],
  ["GD", "enemyRadar", [["侦敌雷达"]], "Aura", "-", "c", 7],
  ["GE", "sprintBoost", [["冲刺提升"]], "Aura", "-", "c", 7],
  ["GF", "empoweredBlades", [["强化刀锋"]], "Aura", "-", "r", 7],
  ["GG", "speedHolster", [["快速切换"]], "Aura", "-", "c", 7],
  ["GH", "lootDetector", [["战利品探测器"]], "Aura", "-", "c", 7],
  ["GI", "pistolScavenger", [["手枪弹药搜集者"]], "Aura", "-", "c", 7],
  ["GJ", "shieldDisruption", [["护盾瓦解"]], "Aura", "-", "c", 7],
  ["GK", "mechaEmpowered", [["机甲强化"]], "Aura", "-", "r", 7],
  ["GL", "rifleScavenger", [["步枪弹药搜集者"]], "Aura", "-", "c", 7],
  ["GM", "sniperScavenger", [["狙击枪弹药搜集者"]], "Aura", "-", "c", 7],
  ["GN", "energySiphon", [["能量虹吸"]], "Aura", "-", "c", 7],
  ["GO", "corrosiveProjection", [["腐蚀投射"]], "Aura", "-", "c", 7],
  ["GP", "shotgunScavenger", [["霰弹枪弹药搜集者"]], "Aura", "-", "c", 7],
  ["GQ", "briefRespite", [["快速休整"]], "Aura", "=", "c", 7],

  // 战甲
  ["Gl", "intensify", [["t", 0.3]], "Warframe", "r", "r", 11],
  ["Gm", "stretch", [["g", 0.45]], "Warframe", "-", "c", 9],
  ["Gn", "streamline", [["x", 0.3]], "Warframe", "-", "r", 9],
  ["Go", "continuity", [["u", 0.3]], "Warframe", "r", "r", 9],
  ["Gp", "primedContinuity", [["u", 0.55]], "Warframe", "r", "l", 14, 10],
  ["Gq", "flow", [["e", 1.5]], "Warframe", "-", "r", 9],
  ["Gr", "primedFlow", [["e", 2.75]], "Warframe", "-", "l", 14, 10],
  ["Gs", "blindRage", [["t", 0.99], ["x", -0.55]], "Warframe", "r", "r", 16, 10],
  ["Gt", "fleetingExpertise", [["x", 0.6], ["u", -0.6]], "Warframe", "-", "r", 11],
  ["Gu", "narrowMinded", [["u", 0.99], ["g", -0.66]], "Warframe", "d", "r", 16, 10],
  ["Gv", "overextended", [["g", 0.9], ["t", -0.6]], "Warframe", "d", "r", 11],
  ["Gw", "transientFortitude", [["t", 0.55], ["x", -0.275]], "Warframe", "r", "r", 16, 10],
  ["Gx", "vitality", [["h", 4.4]], "Warframe", "d", "n", 12, 10],
  ["Gy", "redirection", [["s", 4.4]], "Warframe", "d", "n", 12, 10],
  ["Gz", "steelFiber", [["a", 1.1]], "Warframe", "d", "n", 12, 10],
  ["H0", "fortitude", [["k", 0.2], ["r", 0.8]], "Warframe", "-", "r", 9, 3],
  ["H1", "vigor", [["h", 1.2], ["s", 1.2]], "Warframe", "d", "r", 11],
  ["H2", "primedVigor", [["h", 2.2], ["s", 2.2]], "Warframe", "d", "l", 16, 10],
  ["H3", "armoredAgility", [["f", 0.15], ["a", 0.45]], "Warframe", "d", "r", 11],
  ["H4", "constitution", [["y", 0.4], ["u", 0.28]], "Warframe", "-", "r", 13, 3],
  ["H5", "quickThinking", [["z", 2.4]], "Warframe", "d", "r", 15],
  ["H6", "rage", [["rg", 0.4]], "Warframe", "r", "r", 9, 3],
  ["H7", "warmCoat", [["保温服"]], "Warframe", "d", "n", 9, 3],
  ["H8", "insulation", [["隔热"]], "Warframe", "d", "n", 9],
  ["H9", "flameRepellent", [["火焰防护"]], "Warframe", "d", "n", 9],
  ["HA", "lightningRod", [["避雷针"]], "Warframe", "d", "n", 9],
  ["HB", "antitoxin", [["毒抗"]], "Warframe", "d", "c", 9],
  ["HC", "diamondSkin", [["钻石皮肤"]], "Warframe", "d", "c", 9],
  ["HD", "rapidResilience", [["极速复元"]], "Warframe", "d", "r", 11],
  ["HE", "healthConversion", [["hc"]], "Warframe", "d", "r", 15],
  ["HF", "energyConversion", [["ec"], 0.5], "Warframe", "r", "r", 15],
  ["HG", "equilibrium", [["均衡点"]], "Warframe", "-", "c", 14, 10],
  ["HH", "fastDeflection", [["r", 0.9]], "Warframe", "d", "c", 9],
  ["HI", "provoked", [["激怒"]], "Warframe", "r", "c", 14, 10],
  ["HJ", "undyingWill", [["不朽意志"]], "Warframe", "d", "r", 7],
  ["HK", "reflexGuard", [["反射防御"]], "Warframe", "d", "r", 14, 10],
  ["HL", "vigorousSwap", [["强力切换"]], "Warframe", "-", "r", 12, 10],
  ["HM", "rollingGuard", [["翻滚防护"]], "Warframe", "d", "r", 12, 10],
  ["HN", "adaptation", [["适应"]], "Warframe", "d", "r", 12, 10],
  ["HO", "naturalTalent", [["c", 0.5]], "Warframe", "-", "r", 9],

  // 组合
  ["HP", "umbralVitality", [["h", 4.4], ["tr", 0.11]], "Warframe", "w", "l", 16, 10],
  ["HQ", "umbralFiber", [["a", 1.1], ["tr", 0.11]], "Warframe", "w", "l", 16, 10],
  ["HR", "umbralIntensify", [["t", 0.44], ["tr", 0.11]], "Warframe", "w", "l", 16, 10],
  ["HS", "augurAccord", [["s", 1.8]], "Warframe", "d", "c", 7],
  ["HT", "augurMessage", [["u", 0.24]], "Warframe", "-", "n", 7],
  ["HU", "augurReach", [["g", 0.3]], "Warframe", "-", "c", 7],
  ["HV", "augurSecrets", [["t", 0.24]], "Warframe", "-", "r", 7],
  ["HW", "gladiatorAegis", [["a", 0.45]], "Warframe", "d", "n", 9],
  ["HX", "gladiatorFinesse", [["z", 0.6]], "Warframe", "d", "r", 9],
  ["HY", "gladiatorResolve", [["h", 1.8]], "Warframe", "d", "c", 9],
  ["HZ", "hunterAdrenaline", [["rg"], 0.45], "Warframe", "r", "n", 11],
  ["Ha", "vigilantePursuit", [["私法追踪"]], "Warframe,Exilus", "-", "c", 9],
  ["Hb", "vigilanteVigor", [["r", 0.6]], "Warframe", "d", "n", 9],
  ["Hc", "tekCollateral", [["技法连带"]], "Warframe", "-", "r", 5, 3],
  ["Hd", "mechaPulse", [["机甲脉冲"]], "Warframe", "r", "r", 9, 3],
  ["He", "synthReflex", [["hr", 1]], "Warframe,Exilus", "r", "r", 7, 3],

  // 特殊功能
  ["I7", "agilityDrift", [["矫捷窜升"]], "Warframe,Exilus", "d", "r", 9],
  ["I8", "coactionDrift", [["as", 0.15], ["ae", 0.15]], "Warframe,Exilus", "-", "r", 9],
  ["I9", "cunningDrift", [["l", 0.12], ["i", -0.3], ["g", 0.15]], "Warframe,Exilus", "r", "r", 9],
  ["IA", "enduranceDrift", [["e", 0.15], ["v", 0.12]], "Warframe,Exilus", "=", "r", 9],
  ["IB", "powerDrift", [["t", 0.15], ["k", 0.3]], "Warframe,Exilus", "=", "r", 9],
  ["IC", "speedDrift", [["f", 0.12], ["c", 0.15]], "Warframe,Exilus", "r", "r", 9],
  ["ID", "stealthDrift", [["er", 18], ["at", 0.12]], "Warframe,Exilus", "-", "r", 9],
  ["IE", "batteringManeuver", [["机动冲撞"]], "Warframe,Exilus", "d", "c", 9],
  ["IF", "piercingStep", [["穿刺步伐"]], "Warframe,Exilus", "-", "c", 9],
  ["IG", "rendingTurn", [["撕裂翻转"]], "Warframe,Exilus", "r", "c", 9],
  ["IH", "firewalker", [["火焰行者"]], "Warframe,Exilus", "r", "r", 12, 10],
  ["II", "iceSpring", [["冰冷跃动"]], "Warframe,Exilus", "d", "r", 12, 10],
  ["IJ", "lightningDash", [["电光冲刺"]], "Warframe,Exilus", "r", "r", 12, 10],
  ["IK", "toxicFlight", [["剧毒飞腾"]], "Warframe,Exilus", "-", "r", 12, 10],
  ["IL", "maglev", [["l", 0.3], ["i", -0.3]], "Warframe,Exilus", "-", "c", 11],
  ["IM", "mobilize", [["全面驱动"]], "Warframe,Exilus", "-", "c", 5, 3],
  ["IN", "patagium", [["at"], 0.9], "Warframe,Exilus", "-", "c", 7],
  ["IO", "rush", [["f", 0.3]], "Warframe,Exilus", "-", "c", 11],
  ["IP", "streamlinedForm", [["hr", 0.6], ["l", 0.15], ["i", -0.15]], "Warframe,Exilus", "-", "r", 7],
  ["IQ", "aviator", [["飞行员"]], "Warframe,Exilus", "d", "n", 7, 3],
  ["IR", "shockAbsorbers", [["减震器"]], "Warframe,Exilus", "d", "r", 7, 3],
  ["IS", "sureFooted", [["k", 0.6]], "Warframe,Exilus", "d", "r", 9, 3],
  ["IT", "primedSureFooted", [["k", 0.999167]], "Warframe,Exilus", "d", "l", 16, 10],
  ["IU", "warmCoat", [["保温服"]], "Warframe,Exilus", "d", "n", 9, 3],
  ["IV", "enemySense", [["er", 30]], "Warframe,Exilus", "-", "r", 9],
  ["IW", "handspring", [["y", 1.6]], "Warframe,Exilus", "-", "r", 9, 3],
  ["IX", "heavyImpact", [["震地冲击"]], "Warframe,Exilus", "-", "c", 9],
  ["IY", "intruder", [["入侵者"]], "Warframe,Exilus", "-", "n", 7],
  ["IZ", "masterThief", [["盗贼大师"]], "Warframe,Exilus", "-", "r", 13, 3],
  ["Ia", "painThreshold", [["痛苦阈值"]], "Warframe,Exilus", "-", "r", 9, 3],
  ["Ib", "peculiarBloom", [["花开怪奇"]], "Warframe,Exilus", "-", "g", 7],
  ["Ic", "peculiarGrowth", [["生长怪奇"]], "Warframe,Exilus", "-", "g", 7],
  ["Id", "retribution", [["惩戒"]], "Warframe,Exilus", "d", "r", 9, 3],
  ["Ie", "thiefsWit", [["lr", 48]], "Warframe,Exilus", "-", "n", 7],

  // 技能强化
  ["JX", "seekingShuriken", [["削甲手里剑"]], "Ash", "=", "r", 9, 3],
  ["JY", "smokeShadow", [["庇护烟幕"]], "Ash", "=", "r", 9, 3],
  ["JZ", "fatalTeleport", [["致命传送"]], "Ash", "=", "r", 9, 3],
  ["Ja", "risingStorm", [["风起云涌"]], "Ash", "=", "r", 9, 3],
  ["Jb", "pathOfStatues", [["化像之道"]], "Atlas", "=", "r", 9, 3],
  ["Jc", "titanicRumbler", [["巨大石者"]], "Atlas", "=", "r", 9, 3],
  ["Jd", "tectonicFracture", [["构造裂缝"]], "Atlas", "=", "r", 9, 3],
  ["Je", "oreGaze", [["矿石凝视"]], "Atlas", "=", "r", 9, 3],
  ["Jf", "resonance", [["残响共鸣"]], "Banshee", "=", "r", 9, 3],
  ["Jg", "savageSilence", [["残酷无息"]], "Banshee", "=", "r", 9, 3],
  ["Jh", "sonicFracture", [["破碎声波"]], "Banshee", "=", "r", 9, 3],
  ["Ji", "resonatingQuake", [["震地共鸣"]], "Banshee", "=", "r", 9, 3],
  ["Jj", "guidedEffigy", [["导路龙骸"]], "Chroma", "=", "r", 9, 3],
  ["Jk", "vexingRetaliation", [["怨怒报复"]], "Chroma", "=", "r", 9, 3],
  ["Jl", "everlastingWard", [["永恒之护"]], "Chroma", "=", "r", 9, 3],
  ["Jm", "afterburn", [["续燃"]], "Chroma", "=", "r", 9, 3],
  ["Jn", "fireFright", [["惊惧热浪"]], "Ember", "=", "r", 9, 3],
  ["Jo", "firequake", [["烈焰爆震"]], "Ember", "=", "r", 9, 3],
  ["Jp", "fireballFrenzy", [["狂热火球"]], "Ember", "=", "r", 9, 3],
  ["Jq", "flashAccelerant", [["闪耀助燃"]], "Ember", "=", "r", 9, 3],
  ["Jr", "duality", [["二元性状"]], "Equinox", "=", "r", 9, 3],
  ["Js", "calmFrenzy", [["冷静与疯狂"]], "Equinox", "=", "r", 9, 3],
  ["Jt", "peacefulProvocation", [["和平挑衅"]], "Equinox", "=", "r", 9, 3],
  ["Ju", "energyTransfer", [["能量转移"]], "Equinox", "=", "r", 9, 3],
  ["Jv", "chromaticBlade", [["华彩刀剑"]], "Excalibur", "=", "r", 9, 3],
  ["Jw", "surgingDash", [["涌流突进"]], "Excalibur", "=", "r", 9, 3],
  ["Jx", "furiousJavelin", [["狂怒标枪"]], "Excalibur", "=", "r", 9, 3],
  ["Jy", "radiantFinish", [["终结闪光"]], "Excalibur", "=", "r", 9, 3],
  ["Jz", "icyAvalanche", [["冰冷雪崩"]], "Frost", "=", "r", 9, 3],
  ["K0", "chillingGlobe", [["冰封护罩"]], "Frost", "=", "r", 9, 3],
  ["K1", "freezeForce", [["寒冰之力"]], "Frost", "=", "r", 9, 3],
  ["K2", "iceWaveImpedance", [["滞痕冰浪"]], "Frost", "=", "r", 9, 3],
  ["K3", "mendingSplinters", [["治愈玻片"]], "Gara", "=", "r", 9, 3],
  ["K4", "wardingThurible", [["庇护焚炉"]], "Harrow", "=", "r", 9, 3],
  ["K5", "lastingCovenant", [["持久誓约"]], "Harrow", "=", "r", 9, 3],
  ["K6", "tidalImpunity", [["潮汐涌净"]], "Hydroid", "=", "r", 9, 3],
  ["K7", "curativeUndertow", [["疗愈漩涡"]], "Hydroid", "=", "r", 9, 3],
  ["K8", "corrodingBarrage", [["腐蚀弹幕"]], "Hydroid", "=", "r", 9, 3],
  ["K9", "pilferingSwarm", [["贪夺触角"]], "Hydroid", "=", "r", 9, 3],
  ["KA", "elementalSandstorm", [["元素沙暴"]], "Inaros", "=", "r", 9, 3],
  ["KB", "negationSwarm", [["抵消虫群"]], "Inaros", "=", "r", 9, 3],
  ["KC", "empoweredQuiver", [["强化箭袋"]], "Ivara", "=", "r", 9, 3],
  ["KD", "infiltrate", [["渗透"]], "Ivara", "=", "r", 9, 3],
  ["KE", "piercingNavigator", [["穿刺抛体"]], "Ivara", "=", "r", 9, 3],
  ["KF", "concentratedArrow", [["集中箭矢"]], "Ivara", "=", "r", 9, 3],
  ["KG", "accumulatingWhipclaw", [["蓄积长鞭"]], "Khora", "=", "r", 9, 3],
  ["KH", "cataclysmicContinuum", [["灾变连连"]], "Limbo", "=", "r", 9, 3],
  ["KI", "riftTorrent", [["裂隙洪流"]], "Limbo", "=", "r", 9, 3],
  ["KJ", "haven", [["避难所"]], "Limbo", "=", "r", 9, 3],
  ["KK", "safeguardSwitch", [["护卫传送"]], "Loki", "=", "r", 9, 3],
  ["KL", "saviorDecoy", [["救星诱饵"]], "Loki", "=", "r", 9, 3],
  ["KM", "irradiatingDisarm", [["辐射缴械"]], "Loki", "=", "r", 9, 3],
  ["KN", "hushedInvisibility", [["静谧无踪"]], "Loki", "=", "r", 9, 3],
  ["KO", "counterPulse", [["反转脉冲"]], "Mag", "=", "r", 9, 3],
  ["KP", "magnetizedDischarge", [["磁吸释放"]], "Mag", "=", "r", 9, 3],
  ["KQ", "greedyPull", [["贪婪吸引"]], "Mag", "=", "r", 9, 3],
  ["KR", "fracturingCrush", [["高压粉碎"]], "Mag", "=", "r", 9, 3],
  ["KS", "mesasWaltz", [["Mesa的华尔兹"]], "Mesa,Exilus", "=", "r", 9, 3],
  ["KT", "staggeringShield", [["失衡护盾"]], "Mesa", "=", "r", 9, 3],
  ["KU", "ballisticBullseye", [["弹道靶心"]], "Mesa", "=", "r", 9, 3],
  ["KV", "muzzleFlash", [["枪口闪焰"]], "Mesa", "=", "r", 9, 3],
  ["KW", "totalEclipse", [["全蚀"]], "Mirage", "=", "r", 9, 3],
  ["KX", "hallOfMalevolence", [["恶怨厅"]], "Mirage", "=", "r", 9, 3],
  ["KY", "explosiveLegerdemain", [["爆炸戏法"]], "Mirage", "=", "r", 9, 3],
  ["KZ", "soulSurvivor", [["幸存生灵"]], "Nekros", "=", "r", 9, 3],
  ["Ka", "shieldOfShadows", [["幽影之护"]], "Nekros", "=", "r", 9, 3],
  ["Kb", "despoil", [["掠夺"]], "Nekros", "=", "r", 9, 3],
  ["Kc", "creepingTerrify", [["缓动惊骇"]], "Nekros", "=", "r", 9, 3],
  ["Kd", "reapingChakram", [["割魂火圈"]], "Nezha", "=", "r", 9, 3],
  ["Ke", "pyroclasticFlow", [["火成碎流"]], "Nezha", "=", "r", 9, 3],
  ["Kf", "safeguard", [["火绫守护"]], "Nezha", "=", "r", 9, 3],
  ["Kg", "insatiable", [["不竭贪婪"]], "Nidus", "=", "r", 9, 3],
  ["Kh", "larvaBurst", [["幼体爆发"]], "Nidus", "=", "r", 9, 3],
  ["Ki", "neutronStar", [["中子星爆"]], "Nova", "=", "r", 9, 3],
  ["Kj", "antimatterAbsorb", [["反物质吸收"]], "Nova", "=", "r", 9, 3],
  ["Kk", "escapeVelocity", [["脱离速度"]], "Nova,Exilus", "=", "r", 9, 3],
  ["Kl", "assimilate", [["同化"]], "Nyx", "=", "r", 9, 3],
  ["Km", "pacifyingBolts", [["抚慰之风"]], "Nyx", "=", "r", 9, 3],
  ["Kn", "chaosSphere", [["混乱领域"]], "Nyx", "=", "r", 9, 3],
  ["Ko", "mindFreak", [["精神狂怒"]], "Nyx", "=", "r", 9, 3],
  ["Kp", "phoenixRenewal", [["凤凰新生"]], "Oberon", "=", "r", 9, 3],
  ["Kq", "hallowedEruption", [["圣域爆发"]], "Oberon", "=", "r", 9, 3],
  ["Kr", "smiteInfusion", [["惩击洗礼"]], "Oberon", "=", "r", 9, 3],
  ["Ks", "hallowedReckoning", [["神圣清算"]], "Oberon", "=", "r", 9, 3],
  ["Kt", "partitionedMallet", [["分裂槌音"]], "Octavia", "=", "r", 9, 3],
  ["Ku", "conductor", [["指挥家"]], "Octavia,Exilus", "=", "r", 9, 3],
  ["Kv", "piercingRoar", [["刺骨战吼"]], "Rhino", "=", "r", 9, 3],
  ["Kw", "ironShrapnel", [["碎铁弹片"]], "Rhino", "=", "r", 9, 3],
  ["Kx", "reinforcingStomp", [["践踏加固"]], "Rhino", "=", "r", 9, 3],
  ["Ky", "ironcladCharge", [["铁甲冲锋"]], "Rhino", "=", "r", 9, 3],
  ["Kz", "contagionCloud", [["感染毒雾"]], "Saryn", "=", "r", 9, 3],
  ["L0", "venomDose", [["猛毒附加"]], "Saryn", "=", "r", 9, 3],
  ["L1", "regenerativeMolt", [["蜕化再生"]], "Saryn", "=", "r", 9, 3],
  ["L2", "razorwingBlitz", [["刀翼闪击"]], "Titania", "=", "r", 9, 3],
  ["L3", "beguilingLantern", [["欺幻魔灯"]], "Titania", "=", "r", 9, 3],
  ["L4", "vampireLeech", [["汲能榨取"]], "Trinity", "=", "r", 9, 3],
  ["L5", "poolOfLife", [["生命之池"]], "Trinity", "=", "r", 9, 3],
  ["L6", "abatingLink", [["耗弱链接"]], "Trinity", "=", "r", 9, 3],
  ["L7", "swingLine", [["摆荡钩索"]], "Valkyr", "=", "r", 9, 3],
  ["L8", "eternalWar", [["永恒战意"]], "Valkyr", "=", "r", 9, 3],
  ["L9", "hystericalAssault", [["狂化突击"]], "Valkyr,Exilus", "=", "r", 9, 3],
  ["LA", "prolongedParalysis", [["长时瘫痪"]], "Valkyr", "=", "r", 9, 3],
  ["LB", "perpetualVortex", [["永动旋涡"]], "Vauban", "=", "r", 9, 3],
  ["LC", "teslaLink", [["特斯拉陷阱"]], "Vauban", "=", "r", 9, 3],
  ["LD", "repellingBastille", [["驱逐力场"]], "Vauban", "=", "r", 9, 3],
  ["LE", "transistorShield", [["晶管屏障"]], "Volt", "=", "r", 9, 3],
  ["LF", "shockingSpeed", [["电击加速"]], "Volt", "=", "r", 9, 3],
  ["LG", "shockTrooper", [["电击奇兵"]], "Volt", "=", "r", 9, 3],
  ["LH", "capacitance", [["电容"]], "Volt", "=", "r", 9, 3],
  ["LI", "envelopingCloud", [["包覆游云"]], "Wukong", "=", "r", 9, 3],
  ["LJ", "primalRage", [["原始暴怒"]], "Wukong", "=", "r", 9, 3],
  ["LK", "ironVault", [["神针腾跃"]], "Wukong", "=", "r", 9, 3],
  ["LL", "jetStream", [["急流"]], "Zephyr", "=", "r", 9, 3],
  ["LM", "funnelClouds", [["漏斗状云"]], "Zephyr", "=", "r", 9, 3],
  ["LN", "targetFixation", [["目标入定"]], "Zephyr", "=", "r", 9, 3],
] as [string, string, [string, number][], string, Polarity, Rarity, number, number][];
/**
 * 普通MOD信息
 */
export const NormalModDatabase = _normalModSource.map(v => {
  let pr =
    v[1] === "sacrificialPressure" ? ["C1", "primedPressurePoint"] :
      v[1] === "trueSteel" ? ["CD", "sacrificialSteel"] :
        v[1] === "vitality" ? ["HO", "umbralVitality"] :
          v[1] === "steelFiber" ? ["HP", "umbralFiber"] :
            v[1] === "intensify" ? ["HQ", "umbralIntensify"] :
              _normalModSource.find(k => k[1] === _.camelCase("primed " + v[1]));
  return new NormalMod({
    key: v[0],
    id: v[1],
    props: v[2],
    type: v[3],
    cost: v[6],
    level: v[7] || 5,
    polarity: v[4],
    rarity: v[5],
    primed: pr && pr[1],
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
