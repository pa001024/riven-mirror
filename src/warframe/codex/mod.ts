/**
 * 普通MOD信息
 */
export interface NormalMod {
  /** 索引 */
  key: string
  /** 英文名 */
  id: string
  /** 中文名 */
  name: string
  /** 适用武器 */
  type: string
  /** 描述 */
  desc: string
  /** 极性 */
  polarity: "r" | "-" | "d" | "="
  /** 消耗 */
  cost: number
  /** 稀有度 */
  rarity: "n" | "c" | "r" | "l" | "x"
  /** 属性 */
  props: [string, number][]
  canReplaceBy?: string[] // 等价的MOD 如元素卡
  primed?: string // P卡或其他种类高级卡对应的普通卡的名称
}

const _normalModSource = [
  // 00 为空槽 01 为紫卡
  // 主要武器 00 ~ 0z
  ["02", "Hunter Munitions", "猎人 战备", [["暴击时触发切割伤害", 0.3]], "暴击时，有几率触发切割伤害", "主要武器", "r", "c", 9],
  ["03", "Vigilante Armaments", "私法 军备", [["S", 0.6], ["暴击强化", 0.05]], "增加多重射击的几率", "主要武器", "-", "n", 9],
  ["04", "Vigilante Fervor", "私法 热诚", [["R", 0.45], ["暴击强化", 0.05]], "增加射速", "主要武器", "r", "c", 9],
  ["05", "Vigilante Offense", "私法 侵犯", [["P", 1.5], ["暴击强化", 0.05]], "增加穿透", "主要武器", "-", "r", 9],

  // 步枪 10 ~ 4z
  ["10", "Serration", "膛线", [["D", 1.65]], "提升基础伤害", "步枪", "r", "c", 14],
  ["11", "Split Chamber", "分裂膛室", [["S", 0.9]], "增加多重射击的几率", "步枪", "r", "r", 15],
  ["12", "Heavy Caliber", "重口径", [["D", 1.65], ["精准度", -0.55]], "提升伤害，降低精准度", "步枪", "r", "r", 16],
  ["13", "Point Strike", "致命一击", [["0", 1.5]], "提升暴击几率", "步枪", "r", "n", 9],
  ["14", "Vital Sense", "弱点感应", [["1", 1.2]], "提升暴击伤害", "步枪", "r", "r", 9],
  ["15", "Argon Scope", "氩晶瞄具", [["0", 1.35]], "在爆头之后的一段时间内提升瞄准时的暴击几率", "步枪", "r", "r", 7],
  ["16", "Bladed Rounds", "尖刃弹头", [["1", 1.2]], "完成击杀后的一段时间内提升瞄准时的暴击伤害", "步枪", "r", "c", 9],
  ["17", "Hammer Shot", "重锤射击", [["1", 0.6], ["2", 0.4]], "提升暴击伤害，提升触发几率", "步枪", "d", "r", 9],
  ["18", "Cryo Rounds", "低温弹头", [["5", 0.9]], "增加冰冻伤害", "步枪", "d", "c", 11],
  ["19", "Primed Cryo Rounds", "低温弹头 Prime", [["5", 1.65]], "增加冰冻伤害", "步枪", "d", "l", 16],
  ["1A", "Infected Clip", "污染弹匣", [["6", 0.9]], "增加毒素伤害", "步枪", "-", "c", 11],
  ["1B", "Stormbringer", "暴风使者", [["7", 0.9]], "增加电击伤害", "步枪", "-", "c", 11],
  ["1C", "Hellfire", "地狱火", [["4", 0.9]], "增加火焰伤害", "步枪", "-", "c", 11],
  ["1D", "Malignant Force", "致命火力", [["6", 0.6], ["2", 0.6]], "提升异常触发几率 增加毒素伤害", "步枪", "r", "r", 7],
  ["1E", "High Voltage", "高压电流", [["7", 0.6], ["2", 0.6]], "提升异常触发几率 增加电击伤害", "步枪", "r", "r", 7],
  ["1F", "Rime Rounds", "白霜弹头", [["5", 0.6], ["2", 0.6]], "提升异常触发几率 增加冰冻伤害", "步枪", "r", "r", 7],
  ["1G", "Thermite Rounds", "铝热焊弹", [["4", 0.6], ["2", 0.6]], "提升异常触发几率 增加火焰伤害", "步枪", "r", "r", 7],
  ["1H", "Piercing Hit", "穿甲伤害", [["9", 0.3]], "提升穿刺伤害", "步枪", "-", "n", 9],
  ["1I", "Piercing Caliber", "穿甲口径", [["9", 1.2]], "提升穿刺伤害", "步枪", "-", "r", 11],
  ["1J", "Sawtooth Clip", "锯齿弹链", [["A", 0.3]], "增加切割伤害", "步枪", "-", "n", 9],
  ["1K", "Fanged Fusillade", "尖牙连射", [["A", 1.2]], "增加步枪的 切割伤害", "步枪", "-", "r", 11],
  ["1L", "Rupture", "破裂", [["8", 0.3]], "提升冲击伤害", "步枪", "-", "n", 9],
  ["1M", "Crash Course", "连续冲击", [["8", 1.2]], "增加冲击伤害", "步枪", "-", "r", 11],
  ["1N", "Critical Delay", "关键延迟", [["0", 0.48], ["R", -0.36]], "提升暴击几率，降低攻击速度", "步枪", "-", "r", 9],
  ["1O", "Adhesive Blast", "凝胶爆破", [["壁面附着", 1]], "武器发射出的榴弹能够附着于壁面", "特定武器", "r", "r", 9],
  ["1P", "Sinister Reach", "凶恶延伸", [["射程", 12]], "增加喷射型的主武器射程", "喷射型武器", "-", "c", 5],
  ["1Q", "Vile Acceleration", "卑劣加速", [["R", 0.9], ["D", -0.15]], "提升射速，降低伤害", "步枪", "-", "r", 9],
  ["1R", "Metal Auger", "合金钻头", [["P", 2.1]], "增加穿透", "步枪", "-", "r", 15],
  ["1S", "Magazine Warp", "弹匣增幅", [["L", 0.3]], "提升弹匣容量", "步枪", "-", "n", 9],
  ["1T", "Ammo Drum", "弹鼓", [["M", 0.3]], "增加武器的携带弹药上限", "步枪", "-", "n", 7],
  ["1U", "Shred", "撕裂", [["R", 0.3], ["P", 1.2]], "增加射速和穿透", "步枪", "r", "r", 9],
  ["1V", "Continuous Misery", "无尽苦难", [["3", 1]], "提升触发的异常持续时间", "步枪", "r", "n", 7],
  ["1W", "Agile Aim", "机动瞄准", [["移动速度", 0.2]], "提升瞄准时的移动速度", "步枪", "r", "c", 5],
  ["1X", "Vile Precision", "极恶精准", [["Z", -0.6], ["R", -0.36]], "提升精确度，降低攻击速度", "步枪", "-", "r", 11],
  ["1Y", "Terminal Velocity", "极限速度", [["V", 0.6]], "提升抛射物飞行速度", "步枪", "r", "c", 7],
  ["1Z", "Rifle Aptitude", "步枪才能", [["2", 0.15]], "提升异常触发几率", "步枪", "d", "c", 9],
  ["1a", "Hush", "消音器", [["噪音", -1]], "降低开火造成的声音", "步枪", "-", "n", 5],
  ["1b", "Bane of Corpus", "灭亡 Corpus", [["C", 0.3]], "提升对 Corpus单位的伤害", "步枪", "r", "c", 9],
  ["1c", "Primed Bane of Corpus", "灭亡 Corpus Prime", [["C", 0.55]], "提升对 Corpus单位的伤害", "步枪", "r", "l", 12],
  ["1d", "Bane of Grineer", "灭亡 Grineer", [["G", 0.3]], "提升对 Grineer单位的伤害", "步枪", "r", "c", 9],
  ["1e", "Primed Bane of Grineer", "灭亡 Grineer Prime", [["G", 0.55]], "提升对 Grineer单位的伤害", "步枪", "r", "l", 12],
  ["1f", "Bane of Infested", "灭亡 Infested", [["I", 0.3]], "提升对 Infested单位的伤害", "步枪", "r", "c", 9],
  ["1g", "Primed Bane of Infested", "灭亡 Infested Prime", [["I", 0.55]], "提升对 Infested单位的伤害", "步枪", "r", "l", 12],
  ["1h", "Bane of Corrupted", "灭亡堕落者", [["对堕落者伤害", 0.3]], "提升对堕落者单位的伤害", "步枪", "r", "c", 9],
  ["1i", "Primed Bane of Corrupted", "灭亡堕落者 Prime", [["对堕落者伤害", 0.55]], "提升对堕落者单位的伤害", "步枪", "r", "l", 12],
  ["1j", "Speed Trigger", "灵敏扳机", [["R", 0.6]], "提升射速", "步枪", "r", "c", 9],
  ["1k", "Combustion Beam", "灼热光束", [["一段时间后敌人爆炸", 600]], "让被该武器击杀的敌人爆炸", "喷射型武器", "r", "r", 9],
  ["1l", "Firestorm", "烈焰风暴", [["增加爆炸半径", 0.24]], "增加特定武器的攻击范围", "特定武器", "r", "r", 9],
  ["1m", "Fast Hands", "爆发装填", [["F", 0.3]], "降低装填时间", "步枪", "-", "n", 7],
  ["1n", "Primed Fast Hands", "爆发装填 Prime", [["F", 0.55]], "降低装填时间", "步枪", "-", "l", 12],
  ["1o", "Stabilizer", "稳定", [["Z", -0.6]], "降低射击时产生的后坐力", "步枪", "-", "r", 9],
  ["1p", "Guided Ordinance", "制导弹药", [["精准度", 0.3]], "命中敌人后的一段时间内提升瞄准时的精准度", "突击步枪", "r", "c", 7],
  ["1q", "Spring-Loaded Chamber", "簧压膛室", [["R", 0.75]], "提升在上弹之后的一段时间内瞄准时的射速", "突击步枪", "r", "c", 9],
  ["1r", "Kinetic Ricochet", "动力回弹", [["魔改", 0]], "让特拉发射的子弹回弹并延长飞行距离", "特拉", "-", "r", 7],
  ["1s", "Tether Grenades", "系绳榴弹", [["魔改", 0]], "让武器的榴弹对其周围敌人产生牵引效果", "潘塔系列武器", "-", "c", 9],
  ["1t", "Catalyzer Link", "触媒连动", [["2", 0.6]], "在施展技能后一段时间内提升瞄准时的异常状态触发率", "步枪", "r", "n", 9],
  ["1u", "Twitch", "迅速抽换", [["切换速度", 2]], "提升拔枪速度", "步枪", "-", "c", 7],
  ["1v", "Wildfire", "野火", [["L", 0.2], ["4", 0.6]], "提升弹夹容量，增加 火焰伤害", "步枪", "r", "r", 9],
  ["1w", "Eagle Eye", "鹰眼", [["H", 0.4]], "提升变焦", "步枪", "-", "c", 7],
  ["1x", "Charged Chamber", "蓄力装填", [["第一发子弹伤害加成", 0.4]], "提升更换弹匣后第一次射击的基础伤害", "狙击枪", "r", "c", 9],
  // ["1y","Primed Charged Chamber", "蓄力装填 Prime", [["第一发子弹伤害加成", 1.1]], "提升更换弹匣后第一次射击的基础伤害", "狙击枪", "r", "l", 16],
  ["1z", "Primed Chamber", "膛室 Prime", [["第一发子弹伤害加成", 1]], "提升更换弹匣后第一次射击的基础伤害", "狙击枪", "r", "r", 7],
  ["20", "Rifle Ammo Mutation", "步枪弹药转换", [["弹药转换", 0.375]], "将任何未使用的弹药补给转换成狙击枪枪弹药", "突击步枪", "-", "r", 9],
  ["21", "Arrow Mutation", "箭矢转换", [["弹药转换", 0.375]], "将任何未使用的弹药补给转换成狙击枪枪弹药", "弓", "-", "r", 9],
  ["22", "Sniper Ammo Mutation", "狙击枪弹药转换", [["弹药转换", 0.375]], "将任何未使用的弹药补给转换成狙击枪枪弹药", "狙击枪", "-", "r", 9],
  ["23", "Target Acquired", "锁定目标", [["爆头倍率", 0.6]], "增加狙击步枪的爆头伤害倍率", "狙击枪", "r", "r", 9],
  ["24", "Entropy Burst", "熵数爆发", [["加基础状态触发率", 20]], "提升异常触发几率并附加熵数效果", "苏普拉", "r", "r", 7],
  ["25", "Lasting Purity", "永恒纯净", [["正中红心", 0.6]], "附加正中红心和纯净效果", "金工火神", "-", "r", 7],
  ["26", "Nightwatch Napalm", "夜巡燃烧弹", [["魔改", 0]], "让武器所发射出的导弹在爆炸后产生持续爆炎", "食人女魔", "r", "r", 9],
  ["27", "Flux Overdrive", "通量射线步枪超载", [["魔改", 0]], "让武器在持续开火时的触发几率得到随机提升", "通量射线步枪", "r", "c", 9],
  ["28", "Neutralizing Justice", "抵消正义", [["魔改", 0]], "让发射出的刀片有几率立刻摧毁虚能船员的护罩，附加正义特效", "米特尔", "d", "r", 7],
  ["29", "Voltage Sequence", "电压数列", [["电击陷阱", 1]], "让武器在击杀飞行敌人的时候将他们转换成一个电击陷阱，附加数列特效", "兰卡", "-", "r", 7],
  ["2A", "Disarming Purity", "缴械纯净", [["缴械", 0.4]], "让武器的次要攻击有几率解除敌人的武装，附加纯净特效", "猎豹", "-", "r", 7],
  ["2B", "Deadly Sequence", "致命数列", [["0", 2]], "提升暴击几率，附加数列特效", "葛恩火枪", "r", "r", 7],
  ["2C", "Gilded Truth", "镀金真相", [["R", 0.8]], "提升射速，附加真相效果", "伯斯顿 Prime", "r", "r", 7],
  ["2D", "Spring-Loaded Broadhead", "簧压猎箭", [["最终伤害", 0.4]], "在目标距离15m以上提高伤害", "大久和弓", "r", "r", 15],
  // ["2E", "Apex Predator", "顶级掠食者", [["PVP", 0]], "让被击中的目标暂时出现在小地图上（限武形秘仪）", "步枪", "-", "c", 7],
  // ["2F", "Lucky Shot", "幸运射击", [["PVP", 0]], "提升武器的抛射物飞行速度，降低精准度（限武形秘仪）", "步枪", "r", "c", 9],
  // ["2G", "Vanquished Prey", "战无不克", [["PVP", 0]], "击败另一名玩家后降低一段时间的护盾回充延迟，降低生命球的回血量（限武形秘仪）", "突击步枪", "d", "r", 9],
  // ["2H", "Comet Rounds", "彗星弹头", [["PVP", 0]], "将一部分物理伤害转化为冲击伤害（限武形秘仪）", "步枪", "r", "c", 5],
  // ["2I", "Serrated Rounds", "锯刃弹头", [["PVP", 0]], "一部分物理伤害转换为切割伤害（限武形秘仪）", "步枪", "r", "c", 5],
  // ["2J", "Ripper Rounds", "撕裂弹头", [["PVP", 0]], "将一部分物理伤害转化为穿刺伤害（限武形秘仪）", "步枪", "r", "c", 5],
  // 霰弹枪 50 ~ 8z
  ["50", "Point Blank", "抵近射击", [["D", 0.9]], "增加伤害", "霰弹枪", "r", "c", 9],
  ["51", "Primed Point Blank", "抵近射击 Prime", [["D", 1.65]], "增加伤害", "霰弹枪", "r", "l", 14],
  ["52", "Hell's Chamber", "地狱弹膛", [["S", 1.2]], "增加多重射击", "霰弹枪", "r", "r", 15],
  ["53", "Vicious Spread", "恶性扩散", [["D", 0.9], ["扩散", 0.6]], "增加伤害和扩散", "霰弹枪", "r", "r", 9],
  ["54", "Blaze", "烈焰", [["D", 0.6], ["4", 0.6]], "增加伤害和火焰伤害", "霰弹枪", "r", "r", 9],
  ["55", "Toxic Barrage", "毒素弹幕", [["6", 0.6], ["2", 0.6]], "增加 毒素伤害和触发几率", "霰弹枪", "r", "r", 7],
  ["56", "Scattering Inferno", "炼狱轰击", [["4", 0.6], ["2", 0.6]], "增加 火焰伤害和触发几率", "霰弹枪", "r", "r", 7],
  ["57", "Frigid Blast", "冰冷疾风", [["5", 0.6], ["2", 0.6]], "增加冰冻伤害和触发几率", "霰弹枪", "r", "r", 7],
  ["58", "Shell Shock", "电冲弹药", [["7", 0.6], ["2", 0.6]], "增加电击伤害和异常触发几率", "霰弹枪", "r", "r", 7],
  ["59", "Incendiary Coat", "燃烧外壳", [["4", 0.9]], "增加 火焰伤害", "霰弹枪", "-", "c", 11],
  ["5A", "Chilling Grasp", "急冻控场", [["5", 0.9]], "增加冰冻伤害", "霰弹枪", "d", "c", 11],
  ["5B", "Contagious Spread", "传染蔓延", [["6", 0.9]], "增加毒素伤害", "霰弹枪", "-", "c", 11],
  ["5C", "Charged Shell", "充电弹头", [["7", 0.9]], "增加电击伤害", "霰弹枪", "-", "c", 11],
  ["5D", "Shredder", "粉碎器", [["A", 0.3]], "增加切割伤害", "霰弹枪", "-", "n", 9],
  ["5E", "Sweeping Serration", "扫荡锯齿", [["A", 1.2]], "增加切割伤害", "霰弹枪", "-", "r", 11],
  ["5F", "Flechette", "箭型弹头", [["9", 0.3]], "增加穿刺伤害", "霰弹枪", "-", "n", 9],
  ["5G", "Breach Loader", "破裂填装", [["9", 1.2]], "增加穿刺伤害", "霰弹枪", "-", "r", 11],
  ["5H", "Disruptor", "冲击干扰", [["8", 0.3]], "增加冲击伤害", "霰弹枪", "-", "n", 9],
  ["5I", "Full Contact", "全面接触", [["8", 1.2]], "增加冲击伤害", "霰弹枪", "-", "r", 11],
  ["5J", "Accelerated Blast", "加速冲击", [["R", 0.6], ["9", 0.6]], "增加攻击速度和穿刺伤害", "霰弹枪", "r", "r", 9],
  ["5K", "Cleanse Corpus", "净化 Corpus", [["C", 0.3]], "增加对 Corpus的伤害", "霰弹枪", "r", "c", 9],
  ["5L", "Cleanse Grineer", "净化 Grineer", [["G", 0.3]], "增加对 Grineer的伤害", "霰弹枪", "r", "c", 9],
  ["5M", "Cleanse Infested", "净化 Infested", [["I", 0.3]], "增加对 Infested的伤害", "霰弹枪", "r", "c", 9],
  ["5N", "Cleanse Corrupted", "净化堕落者", [["对堕落者伤害", 0.3]], "增加对Corrupted的伤害", "霰弹枪", "r", "c", 9],
  ["5O", "Shell Compression", "压缩弹药", [["M", 0.3]], "增加弹药最大值", "霰弹枪", "-", "c", 7],
  ["5P", "Lock and Load", "填弹上膛", [["收起武器时弹夹每秒自动装填", 0.2]], "增加收起霰弹枪以后，自动填装弹药的几率", "霰弹枪", "-", "r", 13],
  ["5Q", "Silent Battery", "寂静炮组", [["噪音", -1]], "减少武器噪音等级", "霰弹枪", "-", "c", 5],
  ["5R", "Tactical Pump", "战术上膛", [["F", 0.3]], "增加装填速度", "霰弹枪", "-", "c", 7],
  ["5S", "Lingering Torment", "恒久折磨", [["3", 0.3]], "增加触发时间", "霰弹枪", "r", "n", 11],
  ["5T", "Scattered Justice", "散射正义", [["S", 2]], "为武器增加多重射击以及正义效果", "海克", "r", "r", 7],
  ["5U", "Tainted Shell", "污秽弹药", [["扩散", -0.77], ["R", -0.55]], "减少弹片扩散和射速", "霰弹枪", "d", "r", 14],
  ["5V", "Chilling Reload", "激冷装填", [["5", 0.6], ["F", 0.4]], "增加 冰冻伤害和装填速度", "霰弹枪", "r", "r", 5],
  ["5W", "Seeking Fury", "狂暴追猎", [["F", 0.15], ["P", 1.2]], "提升装填速度和穿透", "霰弹枪", "r", "r", 11],
  ["5X", "Ravage", "破灭", [["1", 0.6]], "增加暴击伤害", "霰弹枪", "r", "r", 9],
  ["5Y", "Primed Ravage", "破灭 Prime", [["1", 1.1]], "提升暴击伤害", "霰弹枪", "r", "l", 14],
  ["5Z", "Shrapnel Shot", "破片射击", [["1", 0.99]], "完成击杀后的一段时间内提升瞄准时的暴击伤害。", "霰弹枪", "r", "n", 9],
  ["5a", "Narrow Barrel", "狭窄枪膛", [["扩散", -0.3]], "命中敌人后的一段时间内提升瞄准时的精准度", "霰弹枪", "r", "r", 9],
  ["5b", "Shattering Justice", "破碎正义", [["加法触发", 0.2]], "增加武器的触发几率和正义集团特效", "鳄神", "-", "r", 7],
  ["5c", "Seeking Force", "穿透力", [["P", 0.3]], "增加穿透", "霰弹枪", "-", "r", 15],
  ["5d", "Nano-Applicator", "纳米涂覆", [["2", 0.9]], "在使用技能后的一段时间内提升瞄准时的异常状态触发率。", "霰弹枪", "r", "r", 9],
  ["5e", "Fatal Acceleration", "致死加速", [["V", 0.4]], "增加抛射物飞行速度", "霰弹枪", "r", "c", 7],
  ["5f", "Frail Momentum", "虚弱动能", [["R", 0.9], ["D", -0.15]], "增加攻击速度但降低伤害", "霰弹枪", "-", "r", 9],
  ["5g", "Shotgun Spazz", "表演时间", [["R", 0.9]], "增加攻击速度", "霰弹枪", "r", "c", 9],
  ["5h", "Repeater Clip", "转轮弹匣", [["R", 1.05]], "在上弹之后的一段时间内提升瞄准时的射速", "霰弹枪", "r", "c", 9],
  ["5i", "Burdened Magazine", "过载弹匣", [["L", 0.6], ["F", -0.18]], "增加弹匣容量和装填时间", "霰弹枪", "-", "r", 11],
  ["5j", "Shotgun Savvy", "通晓霰弹枪", [["2", 0.3]], "增加触发几率", "霰弹枪", "d", "c", 9],
  ["5k", "Critical Deceleration", "降速暴击", [["0", 0.48], ["R", -0.3]], "增加暴击几率但降低攻击速度", "霰弹枪", "r", "r", 9],
  ["5l", "Laser Sight", "雷射瞄具", [["0", 1.2]], "在爆头后的一段时间内提升瞄准时的暴击几率.", "霰弹枪", "r", "c", 9],
  ["5m", "Blunderbuss", "雷筒", [["0", 0.9]], "增加暴击几率", "霰弹枪", "r", "n", 9],
  // ["5n","Primed Blunderbuss", "雷筒 Prime", [["0", 1.65]], "增加暴击几率", "霰弹枪", "r", "l", 14],
  ["5o", "Ammo Stock", "霰弹扩充", [["L", 0.6]], "增加弹匣容量", "霰弹枪", "-", "c", 9],
  ["5p", "Shotgun Ammo Mutation", "霰弹枪弹药转换", [["弹药转换", 0.375]], "捡取未使用的弹药转换成霰弹枪弹药", "霰弹枪", "-", "r", 9],
  ["5q", "Primed Shotgun Ammo Mutation", "霰弹枪弹药转换 Prime", [["弹药转换", 0.6875]], "捡取未使用的弹药转换成霰弹枪弹药", "霰弹枪", "-", "l", 14],
  ["5r", "Soft Hands", "精湛快手", [["拔枪速度", 2]], "增加霰弹枪的切换速度", "霰弹枪", "-", "c", 7],
  ["5s", "Acid Shells", "酸性弹药", [["魔改", 450]], "让被击杀的敌人爆炸", "鳄神", "r", "c", 9],
  ["5t", "Fomorian Accelerant", "巨人促进剂", [["F", 0.6], ["反弹", 4]], "提高子弹飞行速度并使其具有反弹能力", "龙骑兵", "r", "c", 7],
  // ["5u", "Snap Shot", "速射", [["PVP", 0]], "增加瞄准时的 移动速度", "霰弹枪", "r", "c", 9],
  // ["5v", "Broad Eye", "广域之视", [["PVP", 0]], "瞄准时，减少变焦", "霰弹枪", "-", "c", 7],
  // ["5w", "Kill Switch", "屠戮换弹", [["PVP", 0]], "在击杀时，增加换弹速度", "霰弹枪", "r", "r", 13],
  // ["5x", "Momentary Pause", "片刻喘息", [["PVP", 0]], "击杀时回复生命 减少从生命球中获得的生命回复", "霰弹枪", "d", "r", 9],
  // ["5y", "Loaded Capacity", "加载弹容", [["PVP", 0]], "增加弹药容量 减少填装速度", "霰弹枪", "-", "n", 9],
  // ["5z", "Bounty Hunter", "赏金猎人", [["PVP", 0]], "被命中的敌人会暂时的暴露在小地图上", "霰弹枪", "-", "c", 7],
  // ["60", "Loose Chamber", "松弛枪膛", [["PVP", 0]], "增加霰弹枪的填装速度和武器后坐力", "霰弹枪", "-", "n", 9],
  // ["61", "Hydraulic Chamber", "液压枪膛", [["PVP", 0]], "减少弹药容量和武器后坐力", "霰弹枪", "-", "r", 9],
  // ["62", "Double-Barrel Drift", "游离双管", [["PVP", 0]], "滑行时,降低霰弹枪的后坐力和弹片扩散程度", "霰弹枪", "r", "r", 9],
  // ["63", "Shred Shot", "撕碎射击", [["PVP", 0]], "转换霰弹枪部分物理伤害为穿刺伤害", "霰弹枪", "r", "c", 5],
  // ["64", "Crash Shot", "溃散射击", [["PVP", 0]], "转换霰弹枪部分物理伤害为冲击伤害", "霰弹枪", "r", "c", 5],
  // ["65", "Flak Shot", "高射炮击", [["PVP", 0]], "转换霰弹枪部分物理伤害为切割伤害", "霰弹枪", "r", "c", 5],
  // 手枪 90 ~ Bz
  ["90", "Hornet Strike", "黄蜂蛰刺", [["D", 2.2]], "增加基础伤害", "手枪", "r", "c", 14],
  ["91", "Barrel Diffusion", "弹头扩散", [["S", 1.2]], "增加多重射击", "手枪", "r", "r", 11],
  ["92", "Lethal Torrent", "致命洪流", [["R", 0.6], ["S", 0.6]], "增加攻击速度 增加多重射击", "手枪", "r", "r", 11],
  ["93", "Pistol Gambit", "手枪精通", [["0", 1.2]], "增加暴击几率", "手枪", "r", "n", 9],
  ["94", "Primed Pistol Gambit", "手枪精通 Prime", [["0", 1.87]], "增加暴击几率", "手枪", "r", "l", 14],
  ["95", "Target Cracker", "弱点专精", [["1", 0.6]], "增加暴击伤害", "手枪", "r", "c", 9],
  ["96", "Primed Target Cracker", "弱点专精 Prime", [["1", 1.2]], "增加暴击伤害", "手枪", "r", "l", 14],
  ["97", "Hydraulic Crosshairs", "液压准心", [["0", 1.35]], "在爆头后的一段时间内增加瞄准时的暴击几率", "手枪", "r", "n", 7],
  ["98", "Embedded Catalyzer", "内置触媒", [["2", 0.9]], "在使用技能后的一段时间内增加瞄准时的异常状态触发几率", "手枪", "r", "c", 9],
  ["99", "Pressurized Magazine", "增压弹匣", [["R", 0.9]], "在上弹后的一段时间内提升瞄准时的射速", "手枪", "r", "r", 9],
  ["9A", "Targeting Subsystem", "定位辅助", [["精准度", 0.3]], "在命中敌人后的一段时间内提升瞄准时的精准度", "手枪", "r", "c", 7],
  ["9B", "Sharpened Bullets", "尖锐子弹", [["1", 0.75]], "在完成击杀后的一段时间内提升瞄准时的暴击伤害", "手枪", "r", "c", 7],
  ["9C", "No Return", "有去无回", [["9", 0.6]], "增加基础穿刺伤害", "手枪", "-", "c", 7],
  ["9D", "Bore", "枪膛", [["9", 1.2]], "增加基础穿刺伤害", "手枪", "-", "r", 11],
  ["9E", "Razor Shot", "剃刀射击", [["A", 0.6]], "增加基础切割伤害", "手枪", "-", "c", 7],
  ["9F", "Maim", "致残枪弹", [["A", 1.2]], "增加基础切割伤害", "手枪", "-", "c", 11],
  ["9G", "Concussion Rounds", "震荡弹头", [["8", 0.6]], "增加基础冲击伤害", "手枪", "-", "c", 7],
  ["9H", "Pummel", "强力猛击", [["8", 1.2]], "增加基础冲击伤害", "手枪", "-", "c", 11],
  ["9I", "Heated Charge", "火焰装填", [["4", 0.9]], "使武器攻击附加火焰伤害", "手枪", "-", "c", 11],
  ["9J", "Primed Heated Charge", "火焰装填 Prime", [["4", 1.65]], "使武器攻击附加火焰伤害", "手枪", "-", "l", 16],
  ["9K", "Convulsion", "痉挛", [["7", 0.9]], "使武器攻击附加电击伤害", "手枪", "-", "c", 11],
  ["9L", "Deep Freeze", "深层冷冻", [["5", 0.9]], "使武器攻击附加冰冻伤害", "手枪", "d", "c", 11],
  ["9M", "Pathogen Rounds", "病原弹头", [["6", 0.9]], "使武器攻击附加毒素伤害", "手枪", "-", "c", 11],
  ["9N", "Pistol Pestilence", "瘟疫手枪", [["6", 0.6], ["2", 0.6]], "使武器攻击附加毒素伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["9O", "Jolt", "电流震击", [["7", 0.6], ["2", 0.6]], "使武器攻击附加电击伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["9P", "Scorch", "灼痕焦点", [["4", 0.6], ["2", 0.6]], "使武器攻击附加火焰伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["9Q", "Frostbite", "结霜侵蚀", [["5", 0.6], ["2", 0.6]], "使武器攻击附加冰冻伤害 增加异常触发几率", "手枪", "r", "r", 7],
  ["9R", "Ice Storm", "冰风暴", [["L", 0.4], ["5", 0.4]], "使武器攻击附加冰冻伤害 增加弹匣容量", "手枪", "r", "r", 9],
  ["9S", "Creeping Bullseye", "匍匐靶心", [["0", 0.48], ["R", -0.36]], "增加暴击几率 减少攻击速度", "手枪", "-", "r", 9],
  ["9T", "Expel Corpus", "驱逐 Corpus", [["C", 0.3]], "增加对 Corpus单位的伤害", "手枪", "r", "c", 9],
  ["9U", "Expel Grineer", "驱逐 Grineer", [["G", 0.3]], "增加对 Grineer单位的伤害", "手枪", "r", "c", 9],
  ["9V", "Expel Infested", "驱逐 Infested", [["I", 0.3]], "增加对 Infested单位的伤害", "手枪", "r", "c", 9],
  ["9W", "Expel Corrupted", "驱逐堕落者", [["对堕落者伤害", 0.3]], "提升对堕落者单位的伤害", "手枪", "r", "c", 9],
  ["9X", "Anemic Agility", "乏能迅敏", [["R", 0.9], ["D", -0.15]], "增加攻击速度 减少基础伤害", "手枪", "-", "r", 9],
  ["9Y", "Gunslinger", "神枪手", [["R", 0.72]], "增加攻击速度", "手枪", "r", "c", 9],
  ["9Z", "Hawk Eye", "隼目", [["H", 0.8]], "增加瞄准变焦", "手枪", "-", "c", 9],
  ["9a", "Hollow Point", "空尖弹", [["1", 0.6], ["D", -0.15]], "增加暴击伤害 减少基础伤害", "手枪", "-", "r", 9],
  ["9b", "Magnum Force", "重装火力", [["D", 0.66], ["精准度", -0.33]], "增加基础伤害减少精准度", "手枪", "r", "r", 14],
  ["9c", "Quickdraw", "持续火力", [["F", 0.48]], "减少上弹时间", "手枪", "-", "n", 7],
  ["9d", "Primed Quickdraw", "持续火力 Prime", [["F", 0.88]], "减少上弹时间", "手枪", "-", "l", 12],
  ["9e", "Seeker", "弹头导引", [["P", 2.1]], "使子弹附加穿透效果", "手枪", "-", "r", 9],
  ["9f", "Slip Magazine", "串联弹匣", [["L", 0.3]], "增加弹匣容量", "手枪", "-", "n", 9],
  ["9g", "Primed Slip Magazine", "串联弹匣 Prime", [["L", 0.55]], "增加弹匣容量", "手枪", "-", "l", 14],
  ["9h", "Steady Hands", "稳定枪手", [["Z", -0.6]], "减少开火时造成的准星偏移", "手枪", "-", "r", 9],
  ["9i", "Stunning Speed", "慑人神速", [["F", 0.4], ["2", 0.1]], "增加异常触发几率 减少上弹时间", "手枪", "-", "r", 9],
  ["9j", "Suppress", "消音", [["噪音", -1]], "减少开火时发出的噪音", "手枪", "-", "n", 5],
  ["9k", "Sure Shot", "准确射手", [["2", 0.15]], "增加异常触发几率", "手枪", "d", "c", 7],
  ["9l", "Tainted Clip", "感染弹匣", [["L", 0.6], ["F", -0.3]], "增加弹匣容量 增加上弹时间", "手枪", "-", "r", 9],
  ["9m", "Trick Mag", "戏法增幅", [["M", 0.9]], "增加弹药最大值", "手枪", "-", "n", 7],
  ["9n", "Pistol Ammo Mutation", "手枪弹药转换", [["弹药转换", 0.375]], "将任意尚未被拾起的其他种类弹药转换成手枪弹药", "手枪", "-", "r", 9],
  ["9o", "Primed Pistol Ammo Mutation", "手枪弹药转换 Prime", [["弹药转换", 0.6875]], "将任意尚未被拾起的其他种类弹药转换成手枪弹药", "手枪", "-", "r", 14],
  ["9p", "Ruinous Extension", "毁灭扩展", [["射程", 8]], "增加射线类武器的射程", "手枪", "-", "c", 5],
  ["9q", "Eroding Blight", "侵蚀毁坏", [["L", 2]], "增加弹匣容量和毁坏效果", "安柏勒斯", "d", "r", 7],
  ["9r", "Stockpiled Blight", "积存毁坏", [["L", 2]], "增加弹匣容量和毁坏效果", "苦无", "d", "r", 7],
  ["9s", "Entropy Spike", "熵数尖钉", [["子弹爆炸几率", 0.2]], "增加了子弹爆炸几率和熵数效果", "螺钉手枪", "-", "r", 7],
  ["9t", "Sequence Burn", "延烧数列", [["射程", 20]], "增加攻击范围和数列效果", "光谱切割器", "-", "r", 7],
  ["9u", "Toxic Sequence", "毒素数列", [["3", 2]], "增加触发时间和数列效果", "阿克里德", "d", "r", 7],
  ["9v", "Winds of Purity", "纯净之风", [["生命窃取", 0.2]], "增加生命窃取和纯净效果", "盗贼", "d", "r", 7],
  ["9w", "Stinging Truth", "过激真相", [["弹匣", 40]], "增加弹匣和真相效果", "蝰蛇", "d", "r", 7],
  ["9x", "Augur Pact", "预言 契约", [["D", 0.9]], "提升副武器伤害", "手枪", "-", "c", 7],
  // 近战 C0 ~ Fz
  ["C0", "Pressure Point", "压迫点", [["K", 1.2]], "增加基础近战伤害", "近战", "r", "n", 9],
  ["C1", "Primed Pressure Point", "压迫点 Prime", [["K", 1.65]], "增加基础近战伤害", "近战", "r", "l", 14],
  ["C2", "Spoiled Strike", "腐坏打击", [["K", 1], ["J", -0.2]], "增加 基础伤害减少 攻击速度", "近战", "r", "r", 7],
  ["C3", "Reach", "剑风", [["T", 0.6]], "增加近战攻击的攻击范围", "近战", "r", "n", 9],
  ["C4", "Primed Reach", "剑风 Prime", [["T", 1.65]], "增加近战攻击的攻击范围", "近战", "r", "l", 14],
  ["C5", "Maiming Strike", "致残突击", [["E", 0.9]], "滑行攻击时增加暴击机率", "近战", "r", "r", 7],
  ["C6", "Blood Rush", "急进猛突", [["连击数增加暴击率", 1.65]], "随着近战连击数增加暴击机率", "近战", "r", "c", 14],
  ["C7", "Body Count", "杀伤计数", [["N", 12]], "延长近战连击数的判定时间", "近战", "r", "n", 9],
  ["C8", "Weeping Wounds", "创口溃烂", [["连击数增加触发率", 0.45]], "随着近战连击数增加触发机率", "近战", "r", "c", 9],
  ["C9", "Relentless Combination", "残酷组合", [["残酷组合", 1]], "当攻击触发了切割状态的目标时，有几率获得额外的近战连击数", "近战", "-", "c", 9],
  ["CA", "Berserker", "狂战士", [["J", 0.75]], "在暴击后一段时间内增加攻击速度", "近战", "r", "r", 9],
  ["CB", "Fury", "狂暴", [["J", 0.3]], "增加攻击速度", "近战", "r", "c", 9],
  ["CC", "True Steel", "斩铁", [["0", 0.6]], "增加暴击机率", "近战", "r", "n", 9],
  ["CD", "Sacrificial Steel", "牺牲 斩铁", [["0", 1.1], ["K", -0.275]], "增加暴击机率", "近战", "w", "l", 14],
  ["CE", "Organ Shatter", "肢解", [["1", 0.9]], "增加暴击伤害", "近战", "r", "n", 9],
  ["CF", "Heavy Trauma", "重创", [["8", 0.9]], "增加冲击伤害", "近战", "-", "r", 9],
  ["CG", "Collision Force", "冲击巨力", [["8", 1.2]], "增加冲击伤害", "近战", "-", "r", 11],
  ["CH", "Primed Heavy Trauma", "重创 Prime", [["8", 1.65]], "增加基础冲击伤害", "近战", "-", "l", 14],
  ["CI", "Sundering Strike", "破甲", [["9", 0.9]], "增加穿刺伤害", "近战", "-", "r", 9],
  ["CJ", "Auger Strike", "螺钻打击", [["9", 1.2]], "增加穿刺伤害", "近战", "-", "r", 11],
  ["CK", "Jagged Edge", "锯刃", [["A", 0.9]], "增加切割伤害", "近战", "-", "r", 9],
  ["CL", "Buzz Kill", "败兴虐杀", [["A", 1.2]], "增加切割伤害", "近战", "-", "r", 11],
  ["CM", "Fever Strike", "热病打击", [["6", 0.9]], "使武器攻击附加毒素伤害", "近战", "-", "c", 11],
  ["CN", "Primed Fever Strike", "热病打击 Prime", [["6", 1.65]], "使武器攻击附加毒素伤害", "近战", "-", "l", 16],
  ["CO", "Molten Impact", "熔岩冲击", [["4", 0.9]], "使武器攻击附加火焰伤害", "近战", "-", "c", 11],
  ["CP", "North Wind", "北风", [["5", 0.9]], "使武器攻击附加冰冻伤害", "近战", "d", "c", 11],
  ["CQ", "Shocking Touch", "电击触点", [["7", 0.9]], "使武器攻击附加电击伤害", "近战", "-", "c", 11],
  ["CR", "Vicious Frost", "蚀骨寒霜", [["5", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入冰冻伤害", "近战", "r", "r", 7],
  ["CS", "Virulent Scourge", "剧毒灾害", [["6", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入毒素伤害", "近战", "r", "r", 7],
  ["CT", "Volcanic Edge", "爆裂刀刃", [["4", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入火焰伤害", "近战", "r", "r", 7],
  ["CU", "Voltaic Strike", "伏打电能", [["7", 0.6], ["2", 0.6]], "增加触发机率 在攻击中加入电击伤害", "近战", "r", "r", 7],
  ["CV", "Finishing Touch", "画龙点睛", [["X", 0.6]], "增加终结伤害", "近战", "r", "c", 9],
  ["CW", "Corrupt Charge", "邪恶蓄力", [["B", 1], ["U", -0.4]], "增加导引伤害 减少导引效率", "近战", "r", "r", 7],
  ["CX", "Dispatch Overdrive", "超速击杀", [["移动速度", 0.6]], "在导引期间增加移动速度", "近战", "-", "c", 9],
  ["CY", "Drifting Contact", "漂移接触", [["N", 10], ["2", 0.4]], "增加 近战连击数的判定时间/增加 触发机率", "近战", "d", "r", 5],
  ["CZ", "Condition Overload", "异况超量", [["异常状态增加近战伤害", 0.6]], "根据已触发的异常状态增加对目标的近战伤害", "近战", "r", "r", 15],
  ["Ca", "Guardian Derision", "奚落守护", [["格挡时增加", 1]], "当格挡时增加 攻击者对你的仇恨值", "近战", "d", "r", 11],
  ["Cb", "Healing Return", "治愈归复", [["攻击触发异常的敌人回血", 1]], "当攻击触发了异常状态的目标时恢复生命值", "近战", "d", "r", 16],
  ["Cc", "Energy Channel", "能量导引", [["能量消耗增加额外近战伤害", 1]], "在攻击中加入基于战甲能力的能量消耗量的额外近战伤害", "近战", "r", "r", 7],
  ["Cd", "Enduring Affliction", "长时苦难", [["击中时的状态持续时间", 1.5]], "当导引时增加额外的触发时间 减少导引效率", "近战", "d", "c", 9],
  ["Ce", "Enduring Strike", "不朽打击", [["2", 0.6], ["U", -0.4]], "增加触发机率 减少导引效率", "近战", "=", "n", 7],
  ["Cf", "Focus Energy", "聚焦能量", [["U", 0.4], ["7", 0.6]], "增加导引效率 / 使武器攻击附加电击伤害 ", "近战", "r", "r", 9],
  ["Cg", "Focused Defense", "重点防御", [["护甲", 0.2], ["U", -1.4]], "增加护甲 当导引时减少导引效率", "近战", "d", "n", 9],
  ["Ch", "Life Strike", "生命打击", [["生命窃取", 0.2], ["U", -1.4]], "使用导引近战攻击时偷取一定生命/减少 导引效率", "近战", "d", "r", 9],
  ["Ci", "Primed Fury", "狂暴 Prime", [["J", 0.55]], "增加攻击速度", "近战", "r", "c", 14],
  ["Cj", "Killing Blow", "一击必杀", [["B", 1.2]], "增加导引伤害", "近战", "r", "c", 9],
  ["Ck", "Lasting Sting", "未完之刺", [["3", 1.1]], "增加异常状态的持续时间", "近战", "r", "n", 9],
  ["Cl", "Melee Prowess", "非凡技巧", [["2", 0.15]], "增加异常状态触发机率", "近战", "d", "n", 9],
  ["Cm", "Blocking", "格挡", [["反击几率", 0.9]], "使格挡有几率击倒近战攻击者", "近战", "d", "n", 9],
  ["Cn", "Speed", "加速", [["J", 0.2], ["U", -0.8]], "增加攻击速度 减少导引效率", "近战", "r", "r", 9],
  ["Co", "Reflex Coil", "增幅线圈", [["U", 0.6]], "增加导引效率", "近战", "-", "c", 9],
  ["Cp", "Rending Strike", "撕裂打击", [["A", 0.6], ["9", 0.8]], "增加基础穿刺和切割伤害", "近战", "-", "r", 9],
  ["Cq", "Smite Corpus", "毁灭 Corpus", [["C", 0.3]], "增加对 Corpus 位造成的伤害", "近战", "r", "c", 9],
  ["Cr", "Smite Grineer", "毁灭 Grineer", [["G", 0.3]], "增加对 Grineer单位造成的伤害", "近战", "r", "c", 9],
  ["Cs", "Smite Infested", "毁灭 Infested", [["I", 0.3]], "增加对 Infested 单位造成的伤害", "近战", "r", "c", 9],
  ["Ct", "Smite Corrupted", "毁灭堕落者", [["对堕落者伤害", 0.3]], "增加对堕落者单位造成的伤害", "近战", "r", "c", 9],
  ["Cu", "Seismic Wave", "震波", [["近战震地伤害", 2]], "增加近战武器震地攻击伤害", "近战", "r", "n", 9],
  ["Cv", "True Punishment", "真实惩罚", [["0", 0.4], ["U", -0.6]], "增加暴击机率 减少导引效率", "近战", "=", "n", 7],
  ["Cw", "Power Throw", "奋力一掷", [["P", 0.6]], "增加投掷武器的穿透 （如战刃, 战刃 Prime, 哈利卡,和红隼），对其他武器无效", "Glaive", "r", "r", 9],
  ["Cx", "Quick Return", "快速收回", [["弹跳", -4]], "减少投掷武器（如战刃, 战刃 Prime, 哈利卡,和红隼）的弹跳次数", "Glaive", "-", "n", 7],
  ["Cy", "Rebound", "弹跳", [["弹跳", 4]], "增加投掷武器（如战刃, 战刃 Prime, 哈利卡,和红隼）的弹跳次数", "Glaive", "-", "n", 7],
  ["Cz", "Whirlwind", "旋风", [["飞行速度", 1.8]], "增加投掷武器（如战刃, 战刃 Prime, 哈利卡,和红隼）的飞行速度", "Glaive", "-", "r", 7],
  ["D0", "Gladiator Rush", "角斗士 猛突", [["N", 6], ["连击数增加暴击率", 0.15]], "随着近战连击数增加触发机率", "近战", "r", "n", 9],
  ["D1", "Gladiator Vice", "角斗士 钳制", [["J", 0.3], ["连击数增加暴击率", 0.15]], "随着近战连击数增加触发机率", "近战", "r", "r", 9],
  ["D2", "Gladiator Might", "角斗士 威猛", [["1", 0.6], ["连击数增加暴击率", 0.15]], "随着近战连击数增加触发机率", "近战", "r", "c", 9],
  ["D3", "Justice Blades", "正义刀锋", [["K", 1]], "增加近战伤害和正义效果", "斩肉双刀", "r", "r", 7],
  ["D4", "Blade of Truth", "真相之刃", [["K", 1]], "增加近战伤害和真相效果", "蛇颚刀", "r", "r", 7],
  ["D5", "Gleaming Blight", "毁坏微光", [["2", 1]], "增加近战伤害和毁坏效果", "暗黑匕首", "-", "r", 7],
  ["D6", "Toxic Blight", "毁坏毒素", [["6", 1]], "增加毒素伤害和毁坏效果", "米尔", "r", "r", 7],
  ["D7", "Entropy Flight", "飞逝熵数", [["飞行速度", 1.4]], "增加抛射物飞行速度和熵数效果", "红隼", "-", "r", 7],
  ["D8", "Entropy Detonation", "熵数起爆", [["处决的敌人爆炸", 1]], "使死于地面处决的敌人爆炸，对邻近的敌人造成伤害。它同样拥有熵数效果", "奥比克斯", "-", "r", 7],
  ["D9", "Bright Purity", "光明纯净", [["处决的敌人爆炸", 1]], "增加近战伤害和纯净效果", "空刃", "r", "r", 7],
  ["DA", "Avenging Truth", "复仇真相", [["格挡增加蓄力伤害", 1]], "格挡时吸收一定比例的伤害，作为下一次蓄力攻击的额外伤害。附加真相效果", "席瓦 & 神盾", "r", "r", 7],
  ["DB", "Electromagnetic Shielding", "电磁屏障", [["守护", 0.5]], "格挡时将一定百分比的伤害和所有的异常状态从友军转移至自身", "认知 & 冲击", "r", "r", 7],
  ["DC", "Rift Strike", "裂缝打击", [["瞬移攻击", 25]], "蓄力动作结束前将玩家传送至目标前", "双子巴萨克", "r", "r", 7],
] as [string, string, string, [string, number][], string, string, "r" | "-" | "d" | "=", "n" | "c" | "r" | "l" | "x", number][];
/**
 * 普通MOD信息
 */
export const NormalModDatabase = _normalModSource.map(v => {
  let pr = _normalModSource.find(k => k[1] === "Primed " + v[1]);
  return {
    key: v[0],
    id: v[1],
    name: v[2],
    props: v[3],
    desc: v[4],
    type: v[5],
    cost: v[8],
    polarity: v[6],
    rarity: v[7],
    primed: pr && pr[1]
  } as NormalMod;
});

export const NormalCardDependTable: [string, string][] = [
  ["尖刃弹头", "弱点感应"],
  ["重口径", "膛线"],
  ["增压弹匣", "乏能迅敏"],
];

export const AcolyteModsList: string[] = [
  "创口溃烂", "急进猛突", "杀伤计数", "致残突击", "重点防御",
  "制导弹药", "尖刃弹头", "氩晶瞄具", "簧压膛室", "触媒连动",
  "狭窄枪膛", "破片射击", "纳米涂覆", "转轮弹匣", "雷射瞄具",
  "内置触媒", "增压弹匣", "定位辅助", "尖锐子弹", "液压准心",
];
