import _ from "lodash";
import axios from 'axios';
import { Translator } from "@/warframe/translate";

export interface WarframeStat {
  timestamp: string;
  news: News[];
  events: Event[];
  alerts: Alert[];
  sortie: Sortie;
  syndicateMissions: SyndicateMission[];
  fissures: Fissure[];
  globalUpgrades: any[];
  flashSales: FlashSale[];
  invasions: Invasion[];
  darkSectors: DarkSector[];
  voidTrader: VoidTrader;
  dailyDeals: DailyDeal[];
  simaris: Simaris;
  conclaveChallenges: ConclaveChallenge[];
  persistentEnemies: any[];
  earthCycle: EarthCycle;
  cetusCycle: CetusCycle;
  constructionProgress: ConstructionProgress;
}

export interface ConstructionProgress {
  id: string;
  fomorianProgress: string;
  razorbackProgress: string;
  unknownProgress: string;
}

export interface CetusCycle {
  id: string;
  expiry: string;
  isDay: boolean;
  timeLeft: string;
  isCetus: boolean;
  shortString: string;
}

export interface EarthCycle {
  id: string;
  expiry: string;
  isDay: boolean;
  timeLeft: string;
}

export interface ConclaveChallenge {
  id: string;
  description: string;
  expiry: string;
  amount: number;
  mode: string;
  category: string;
  eta: string;
  expired: boolean;
  daily: boolean;
  rootChallenge: boolean;
  endString: string;
  asString: string;
}

export interface Simaris {
  target: string;
  isTargetActive: boolean;
  asString: string;
}

export interface DailyDeal {
  item: string;
  expiry: string;
  originalPrice: number;
  salePrice: number;
  total: number;
  sold: number;
  id: string;
  eta: string;
  discount: number;
}

export interface VoidTrader {
  id: string;
  activation: string;
  expiry: string;
  character: string;
  location: string;
  inventory: any[];
  psId: string;
  active: boolean;
  startString: string;
  endString: string;
}

export interface DarkSector {
  id: string;
  isAlliance: boolean;
  defenderName: string;
  defenderDeployemntActivation: number;
  defenderMOTD: string;
  deployerName: string;
  deployerClan?: string;
  history: any[];
}

export interface Invasion {
  id: string;
  node: string;
  desc: string;
  attackerReward: AttackerReward;
  attackingFaction: string;
  defenderReward: DefenderReward;
  defendingFaction: string;
  vsInfestation: boolean;
  activation: string;
  count: number;
  requiredRuns: number;
  completion: number;
  completed: boolean;
  eta: string;
  rewardTypes: string[];
}

export interface DefenderReward {
  items: any[];
  countedItems: CountedItem[];
  credits: number;
  asString: string;
  itemString: string;
  thumbnail: string;
  color: number;
}

export interface AttackerReward {
  items: any[];
  countedItems: CountedItem[];
  credits: number;
  asString: string;
  itemString: string;
  thumbnail: string;
  color: number;
}

export interface CountedItem {
  count: number;
  type: string;
}

export interface FlashSale {
  item: string;
  expiry: string;
  discount: number;
  premiumOverride: number;
  isFeatured: boolean;
  isPopular: boolean;
  id: string;
  expired: boolean;
  eta: string;
}

export interface Fissure {
  id: string;
  node: string;
  missionType: string;
  enemy: string;
  tier: string;
  tierNum: number;
  activation: string;
  expiry: string;
  expired: boolean;
  eta: string;
}

export interface SyndicateMission {
  id: string;
  activation: string;
  expiry: string;
  syndicate: string;
  nodes: string[];
  jobs: Job[];
  eta: string;
}

export interface Event {
  id: string;
  expiry: string;
  description: string;
  tooltip: string;
  concurrentNodes: any[];
  victimNode: string;
  rewards: any[];
  expired: boolean;
  health: string;
  affiliatedWith: string;
  jobs: Job[];
  asString: string;
}
export interface Job {
  id: string;
  type: string;
  enemyLevels: number[]; // [10,30]
  standingStages: number[];
  rewardPool: string[];
}

export interface Sortie {
  id: string;
  activation: string;
  expiry: string;
  rewardPool: string;
  variants: Variant[];
  boss: string;
  faction: string;
  expired: boolean;
  eta: string;
}

export interface Variant {
  boss: string; // Deprecated
  planet: string; // Deprecated
  missionType: string;
  modifier: string;
  modifierDescription: string;
  node: string; // "Cassini (Saturn)"
}

export interface Alert {
  id: string;
  activation: string;
  expiry: string;
  mission: Mission;
  expired: boolean;
  eta: string;
  rewardTypes: string[];
}

export interface Mission {
  description?: string;
  node: string;
  type: string;
  faction: string;
  reward: Reward;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  nightmare: boolean;
  archwingRequired: boolean;
  maxWaveNum?: number;
}

export interface Reward {
  items: string[];
  countedItems: any[];
  credits: number;
  asString: string;
  itemString: string;
  thumbnail: string;
  color: number;
}

export interface News {
  id: string;
  message: string;
  link: string;
  imageLink: string;
  priority: boolean;
  date: string;
  eta: string;
  update: boolean;
  primeAccess: boolean;
  stream: boolean;
  translations: Translations;
  asString: string;
}

export interface Translations {
  en: string;
  fr?: string;
  it?: string;
  de?: string;
  es?: string;
  pt?: string;
  ru?: string;
  tr?: string;
  ja?: string;
  zh?: string;
  ko?: string;
  tc?: string;
}

/**
 * Warframe World Stat from https://api.warframestat.us/
 *
 * @export
 * @class WorldStat
 */
export class WorldStat {
  data: WarframeStat;
  platform = "pc";
  get APIBase() { return "https://api.warframestat.us/" + this.platform; }
  /**
   * 获取最新数据
   */
  fetch() {
    return new Promise((resolve, reject) => {
      axios.get(this.APIBase, { timeout: 3000 })
        .then(data => {
          this.data = data.data;
          resolve();
        }).catch(reject);
    })
  }

  /**
   * 深层递归翻译
   * @param obj 需要翻译的对象
   */
  deepTranslate<T extends Object>(obj: T): T {
    if (_.isArray(obj))
      return _.map(obj, v =>
        typeof v === "string" ? Translator.getLocText(v) :
          typeof v === "object" ? this.deepTranslate(v) : v) as any;
    else
      return _.mapValues(obj, (v, i) =>
        typeof v === "string" ?
          i === "node" ? this.nodeTranslate(v) : Translator.getLocText(v) :
          typeof v === "object" ? this.deepTranslate(v) : v) as T;
  }
  /**
   * 地图节点翻译
   * @param node 节点
   */
  nodeTranslate(node: string) {
    return node.replace(/(.+) \((.+)\)/, (_, a, b) => `${Translator.getLocText(a)} | ${Translator.getLocText(b)}`);
  }
  /**
   * 突击信息
   */
  get sortie() {
    if (!this.data) return {
      id: "",
      activation: "",
      expiry: "",
      rewardPool: "Sortie Rewards",
      variants: [],
      boss: "",
      faction: "",
      expired: false,
      eta: ""
    };
    return this.deepTranslate(this.data.sortie);
  }

  filterType = ["nightmare", "endo", "traces", "credits", "resource",
    "ferrite",
    "nanoSpores",
    "alloyPlate",
    "salvage",
    "polymerBundle",
    "cryotic",
    "circuits",
    "plastids",
    "rubedo",
    "argonCrystal",
    "controlModule",
    "gallium",
    "morphics",
    "neuralSensors",
    "neurodes",
    "orokinCell",
    "oxium",
    "tellurium",
  ];
  /**
   * 警报信息
   */
  get alerts() {
    if (!this.data) return [];
    return this.deepTranslate(this.data.alerts
      .filter(v => !this.filterType.includes(v.rewardTypes[0])));
  }

  filterMission = ["Mobile Defense"];
  /**
   * 裂缝信息
   */
  get fissures() {
    if (!this.data) return [];
    return this.deepTranslate(this.data.fissures
      .filter(v => !this.filterMission.includes(v.missionType))
      .sort((a, b) => a.tierNum - b.tierNum));
  }

  /**
   * 新闻信息
   */
  get news() {
    if (!this.data) return [];
    return _.reverse(this.deepTranslate(this.data.news.filter(v => v.translations.en)).map(v => {
      if (v.translations[Translator.Locale.substr(0, 2)])
        v.message = v.translations[Translator.Locale.substr(0, 2)];
      return v;
    }));
  }

  filterInvasion = ["fieldron", "detonite", "mutagen"];
  /**
   * 入侵信息
   */
  get invasions() {
    if (!this.data) return [];
    return this.deepTranslate(this.data.invasions
      .filter(v => !v.completed && !v.rewardTypes.every(k => this.filterInvasion.includes(k))))
  }

  /**
   * 平原赏金信息
   */
  get ostrons() {
    if (!this.data) return [];
    let data = this.data.syndicateMissions.find(v => v.syndicate === "Ostrons")
    if (!data) return [];
    return this.deepTranslate(data.jobs
      .map(v => (v.rewardPool = v.rewardPool.map(k => k.replace(/(.+) X(\d+)$/, "$2 $1")), v)));
  }
}
