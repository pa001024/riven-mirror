import { isArray, map, mapValues, reverse } from "lodash-es";
import axios from "axios";
import { Translator } from "@/warframe/translate";
import { i18n } from "../i18n";

export interface WarframeStat {
  timestamp: string;
  news: News[];
  events: Event[];
  alerts: Alert[];
  sortie: Sortie;
  steelPath: SteelPath;
  syndicateMissions: SyndicateMission[];
  fissures: Fissure[];
  globalUpgrades: GlobalUpgrade[];
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
  vallisCycle: VallisCycle;
  cambionCycle: CambionCycle;
  nightwave: Nightwave;
  sentientOutposts: SentientOutpost;
  kuva: Kuva[];
  arbitration: Arbitration;
  twitter: Twitter[];
}

export interface SentientOutpost {
  mission: Mission;
  activation: string;
  expiry: string;
  active: boolean;
}

export interface Kuva {
  activation: string;
  expiry: string;
  solnode: string;
  node: string;
  name: string;
  tile: string;
  planet: string;
  enemy: string;
  type: string;
  node_type: string;
  archwing: boolean;
  sharkwing: boolean;
}

export interface Arbitration {
  activation: string;
  expiry: string;
  solnode: string;
  node: string;
  name: string;
  tile: string;
  planet: string;
  enemy: string;
  type: string;
  node_type: string;
  archwing: boolean;
  sharkwing: boolean;
}

export interface Nightwave {
  id: string;
  activation: string;
  startString: string;
  expiry: string;
  active: boolean;
  season: number;
  tag: string;
  phase: number;
  params: Param;
  possibleChallenges: ActiveChallenge[];
  activeChallenges: ActiveChallenge[];
  rewardTypes: string[];
}

export interface ActiveChallenge {
  id: string;
  activation: string;
  startString: string;
  expiry: string;
  active: boolean;
  isDaily: boolean;
  isElite: boolean;
  desc: string;
  title: string;
  reputation: number;
  // extend
  type: string;
}

export interface Param {
  wgsc: number;
  wsr: number;
}

export interface VallisCycle {
  id: string;
  expiry: string;
  isWarm: boolean;
  timeLeft: string;
  shortString: string;
}

export interface CambionCycle {
  id: string;
  expiry: string;
  timeLeft: string;
  active: string;
  shortString: string;
}

export interface GlobalUpgrade {
  start: string;
  end: string;
  upgrade: string;
  operation: string;
  operationSymbol: string;
  upgradeOperationValue: number;
  expired: boolean;
  eta: string;
  desc: string;
}

export interface Twitter {
  id: string;
  uniqueId: string;
  tweets: Tweet[];
}

export interface Tweet {
  created_at: string;
  id: number;
  id_str: string;
  full_text: string;
  truncated: boolean;
  display_text_range: number[];
  entities: any;
  extended_entities?: any;
  source: string;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str?: string;
  in_reply_to_screen_name?: string;
  user: TwitterUser;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: any;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive?: boolean;
  lang: string;
  retweeted_status?: any;
}

interface TwitterUser {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url?: string;
  entities: any;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset?: any;
  time_zone?: any;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: string;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following?: any;
  follow_request_sent?: any;
  notifications?: any;
  translator_type: string;
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
  startString: string;
  expiry: string;
  active: boolean;
  character: string;
  location: string;
  inventory: Inventory[];
  psId: string;
  endString: string;
}

export interface Inventory {
  item: string;
  ducats: number;
  credits: number;
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
  activation: string;
  startString: string;
  node: string;
  desc: string;
  attackerReward: InvasionReward;
  attackingFaction: string;
  defenderReward: InvasionReward;
  defendingFaction: string;
  vsInfestation: boolean;
  count: number;
  requiredRuns: number;
  completion: number;
  completed: boolean;
  eta: string;
  rewardTypes: string[];
}

export interface InvasionReward {
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
  syndicateKey: string;
  nodes: string[];
  jobs: Job[];
  eta: string;
}

export interface Event {
  id: string;
  activation: string;
  startString: string;
  expiry: string;
  active: boolean;
  maximumScore: number;
  currentScore: number;
  description: string;
  tooltip: string;
  node: string;
  concurrentNodes: any[];
  victimNode: string;
  scoreLocTag: string;
  rewards: Reward[];
  expired: boolean;
  health: string;
  interimSteps: InterimStep[];
  affiliatedWith: string;
  jobs: Job[];
  progressSteps: any[];
  showTotalAtEndOfMission: boolean;
  isPersonal: boolean;
  isCommunity: boolean;
  regionDrops: string[];
  archwingDrops: string[];
  asString: string;
}

export interface InterimStep {
  goal: number;
  reward: Reward;
  message: Message;
  winnerCount: number;
}

export interface Message {
  sender: string;
  subject: string;
  message: string;
  senderIcon: string;
  attachments: string[];
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
  reward?: Reward;
  minEnemyLevel?: number;
  maxEnemyLevel?: number;
  nightmare?: boolean;
  archwingRequired?: boolean;
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

export interface SteelPath {
  currentReward: CurrentReward;
  activation: string;
  expiry: string;
  remaining: string;
  rotation: CurrentReward[];
  evergreens: CurrentReward[];
  incursions: Incursions;
}

export interface Incursions {
  id: string;
  activation: string;
  expiry: string;
}

export interface CurrentReward {
  name: string;
  cost: number;
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
  get APIBase() {
    return "https://api.warframestat.us/" + this.platform;
  }
  /**
   * 获取最新数据
   */
  fetch() {
    return new Promise((resolve, reject) => {
      axios
        .get(this.APIBase, {
          timeout: 10e3,
          headers: {
            // "Accept-Language": "English",
          },
        })
        .then(data => {
          this.data = data.data;
          resolve(this.data);
        })
        .catch(reject);
    });
  }

  /**
   * 深层递归翻译
   * @param obj 需要翻译的对象
   */
  deepTranslate<T extends Object>(obj: T, namespace = "messages"): T {
    if (isArray(obj))
      return map(obj, v => (typeof v === "string" ? Translator.getLocText(v, namespace) : typeof v === "object" ? this.deepTranslate(v, namespace) : v)) as any;
    else
      return mapValues(obj, (v, i) =>
        typeof v === "string"
          ? i === "node" || i === "location"
            ? this.nodeTranslate(v)
            : Translator.getLocText(v, namespace)
          : typeof v === "object"
          ? this.deepTranslate(v, namespace)
          : v
      ) as T;
  }
  /**
   * 地图节点翻译
   * @param node 节点
   */
  nodeTranslate(node: string) {
    return node.replace(/(.+) \((.+)\)/, (_, a, b) => `${this.nodeNameTranslate(a)} | ${Translator.getLocText(b)}`);
  }

  nodeNameTranslate(node: string) {
    node = node.replace(/Relay$/, Translator.getLocText("Relay"));
    const tranlate = Translator.getLocText(node);
    if (node.startsWith("War") || tranlate.toLowerCase() === node.toLowerCase()) return node;
    else return tranlate;
  }
  /**
   * 突击信息
   */
  get sortie() {
    if (!this.data)
      return {
        id: "",
        activation: "",
        expiry: "",
        rewardPool: "Sortie Rewards",
        variants: [],
        boss: "",
        faction: "",
        expired: false,
        eta: "",
      };
    return this.deepTranslate(this.data.sortie);
  }

  filterType = [
    "nightmare",
    "endo",
    "traces",
    "credits",
    "resource",
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
    if (!this.data || !this.data.alerts) return [];
    return this.deepTranslate(this.data.alerts.filter(v => !this.filterType.includes(v.rewardTypes[0])));
  }

  filterMission = ["Mobile Defense"];
  /**
   * 裂缝信息
   */
  get fissures() {
    if (!this.data) return [];
    return this.deepTranslate(this.data.fissures.filter(v => !this.filterMission.includes(v.missionType)).sort((a, b) => a.tierNum - b.tierNum));
  }

  /**
   * 新闻信息
   */
  get news() {
    if (!this.data) return [];
    return reverse(
      this.deepTranslate(this.data.news.filter(v => v.translations.en)).map(v => {
        if (v.translations[i18n.locale.substr(0, 2)]) v.message = v.translations[i18n.locale.substr(0, 2)];
        return v;
      })
    );
  }

  /** 事件 */
  get event() {
    if (!this.data) return [];
    return reverse(
      this.deepTranslate(this.data.news.filter(v => v.translations.en)).map(v => {
        if (v.translations[i18n.locale.substr(0, 2)]) v.message = v.translations[i18n.locale.substr(0, 2)];
        return v;
      })
    );
  }

  filterInvasion = ["fieldron", "detonite", "mutagen"];
  /**
   * 入侵信息
   */
  get invasions() {
    if (!this.data) return [];
    return this.deepTranslate(this.data.invasions.filter(v => !v.completed && !v.rewardTypes.every(k => this.filterInvasion.includes(k))));
  }

  /**
   * 地球平原赏金信息
   */
  get ostrons() {
    if (!this.data) return [];
    let data = this.data.syndicateMissions.find(v => v.syndicateKey === "Ostrons");
    if (!data) return [];
    return this.deepTranslate(data.jobs.map(v => (v.rewardPool && (v.rewardPool = v.rewardPool.map(k => k.replace(/(\d+)X (.+)$/, "$1 $2"))), v)));
  }

  /**
   * 金星平原赏金信息
   */
  get solarisUnited() {
    if (!this.data) return [];
    let data = this.data.syndicateMissions.find(v => v.syndicateKey === "Solaris United");
    if (!data) return [];
    return this.deepTranslate(data.jobs.map(v => (v.rewardPool && (v.rewardPool = v.rewardPool.map(k => k.replace(/(\d+)X (.+)$/, "$1 $2"))), v)));
  }

  /**
   * 火卫二平原赏金信息
   */
  get entrati() {
    if (!this.data) return [];
    let data = this.data.syndicateMissions.find(v => v.syndicateKey === "Entrati");
    if (!data) return [];
    return this.deepTranslate(data.jobs.map(v => (v.rewardPool && (v.rewardPool = v.rewardPool.map(k => k.replace(/(\d+)X (.+)$/, "$1 $2"))), v)));
  }

  /**
   * 虚空商人
   */
  get voidTrader() {
    if (!this.data) return null;
    let data = this.data.voidTrader;
    if (!data) return null;
    return this.deepTranslate(data);
  }

  /**
   * 午夜电波
   */
  get nightwave() {
    if (!this.data) return null;
    let data = this.data.nightwave;
    if (!data) return null;
    data.activeChallenges = data.activeChallenges.map(v => {
      v.type = v.isDaily ? (v.isElite ? "Daily Elite" : "Daily") : v.isElite ? "Weekly Elite" : "Weekly";
      return v;
    });
    return this.deepTranslate(data, "nightwave");
  }

  /**
   * 赤毒
   */
  get kuva() {
    if (!this.data) return null;
    let data = this.data.kuva;
    if (!data) return null;
    return this.deepTranslate(data);
  }

  /**
   * 仲裁
   */
  get arbitration() {
    if (!this.data) return null;
    let data = this.data.arbitration;
    if (!data) return null;
    return this.deepTranslate(data);
  }

  /**
   * S船
   */
  get sentientOutposts() {
    if (!this.data) return null;
    let data = this.data.sentientOutposts;
    if (!data) return null;
    return this.deepTranslate(data);
  }

  /**
   * 希图斯时间
   */
  get cetusCycle() {
    return this.data.cetusCycle;
  }

  /**
   * 福尔图娜时间
   */
  get vallisCycle() {
    return this.data.vallisCycle;
  }

  /**
   * 殁世幽都时间
   */
  get cambionCycle() {
    return this.data.cambionCycle;
  }
}
