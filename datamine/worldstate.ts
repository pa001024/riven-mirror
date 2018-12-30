interface WorldState {
  WorldSeed: string;
  Version: number;
  MobileVersion: string;
  BuildLabel: string;
  Time: number;
  Date: number;
  Events: Event[];
  Goals: Goal[];
  Alerts: Alert[];
  Sorties: Sorty[];
  SyndicateMissions: SyndicateMission[];
  ActiveMissions: ActiveMission[];
  GlobalUpgrades: any[];
  FlashSales: FlashSale[];
  Invasions: Invasion[];
  HubEvents: any[];
  NodeOverrides: NodeOverride[];
  BadlandNodes: BadlandNode[];
  VoidTraders: VoidTrader[];
  PrimeAccessAvailability: PrimeAccessAvailability;
  PrimeVaultAvailabilities: boolean[];
  DailyDeals: DailyDeal[];
  LibraryInfo: LibraryInfo;
  PVPChallengeInstances: PVPChallengeInstance[];
  PersistentEnemies: any[];
  PVPAlternativeModes: any[];
  PVPActiveTournaments: any[];
  ProjectPct: number[];
  ConstructionProjects: any[];
  TwitchPromos: any[];
  WeeklyChallenges: WeeklyChallenges;
  FeaturedGuilds: FeaturedGuild[];
}

interface FeaturedGuild {
  _id: Id;
  Name: string;
  Tier: number;
  AllianceId: Id;
}

interface WeeklyChallenges {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  Challenges: Challenge[];
}

interface Challenge {
  Type: string;
  MinimumEnemyLevel: number;
  RequiredCount: number;
  ProgressIndicatorFreq: number;
  DamageType?: string;
  Script?: Script;
  VictimType?: string[];
}

interface Script {
  Script: string;
  Function: string;
  _faction: string;
}

interface PVPChallengeInstance {
  _id: Id;
  challengeTypeRefID: string;
  startDate: Date2;
  endDate: Date2;
  params: Param[];
  isGenerated: boolean;
  PVPMode: string;
  subChallenges: Id[];
  Category: string;
}

interface Param {
  n: string;
  v: number;
}

interface LibraryInfo {
  LastCompletedTargetType: string;
}

interface DailyDeal {
  StoreItem: string;
  Activation: Date2;
  Expiry: Date2;
  Discount: number;
  OriginalPrice: number;
  SalePrice: number;
  AmountTotal: number;
  AmountSold: number;
}

interface PrimeAccessAvailability {
  State: string;
}

interface VoidTrader {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  Character: string;
  Node: string;
  Manifest: Manifest[];
}

interface Manifest {
  ItemType: string;
  PrimePrice: number;
  RegularPrice: number;
}

interface BadlandNode {
  _id: Id;
  DefenderInfo: DefenderInfo;
  Node: string;
}

interface DefenderInfo {
  IsAlliance: boolean;
  Id: Id;
  Name: string;
  MOTD: string;
  DeployerName: string;
  DeployerClan?: string;
}

interface NodeOverride {
  _id: Id;
  Node: string;
  Hide?: boolean;
  Seed?: number;
  LevelOverride?: string;
  Activation?: Date2;
  Faction?: string;
  EnemySpec?: string;
  ExtraEnemySpec?: string;
  Expiry?: Date2;
}

interface Invasion {
  _id: Id;
  Faction: string;
  Node: string;
  Count: number;
  Goal: number;
  LocTag: string;
  Completed: boolean;
  AttackerReward: any[] | AttackerReward2;
  AttackerMissionInfo: AttackerMissionInfo;
  DefenderReward: AttackerReward2;
  DefenderMissionInfo: DefenderMissionInfo;
  Activation: Date2;
}

interface DefenderMissionInfo {
  seed: number;
  faction: string;
  missionReward?: any[];
}

interface AttackerMissionInfo {
  seed: number;
  faction: string;
}

interface AttackerReward2 {
  countedItems: CountedItem[];
}

interface FlashSale {
  TypeName: string;
  StartDate: Date2;
  EndDate: Date2;
  Featured: boolean;
  Popular: boolean;
  ShowInMarket: boolean;
  BannerIndex: number;
  Discount: number;
  RegularOverride: number;
  PremiumOverride: number;
  BogoBuy: number;
  BogoGet: number;
  ProductExpiryOverride?: Date2;
}

interface ActiveMission {
  _id: Id;
  Region: number;
  Seed: number;
  Activation: Date2;
  Expiry: Date2;
  Node: string;
  MissionType: string;
  Modifier: string;
}

interface SyndicateMission {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  Tag: string;
  Seed: number;
  Nodes: string[];
  Jobs?: Job[];
}

interface Job {
  jobType: string;
  rewards: string;
  masteryReq: number;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  xpAmounts: number[];
}

interface Sorty {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  Boss: string;
  Reward: string;
  ExtraDrops: any[];
  Seed: number;
  Variants: Variant[];
  Twitter: boolean;
}

interface Variant {
  missionType: string;
  modifierType: string;
  node: string;
  tileset: string;
}

interface Alert {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  MissionInfo: MissionInfo2;
}

interface MissionInfo2 {
  missionType: string;
  faction: string;
  location: string;
  levelOverride: string;
  enemySpec: string;
  extraEnemySpec: string;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  difficulty: number;
  seed: number;
  missionReward: MissionReward2;
}

interface MissionReward2 {
  credits: number;
  countedItems?: CountedItem[];
}

interface CountedItem {
  ItemType: string;
  ItemCount: number;
}

interface Goal {
  _id: Id;
  Fomorian: boolean;
  Activation: Date2;
  Expiry: Date2;
  Count: number;
  Goal: number;
  HealthPct: number;
  VictimNode: string;
  Personal: boolean;
  Best: boolean;
  ScoreVar: string;
  ScoreMaxTag: string;
  Success: number;
  Node: string;
  Faction: string;
  Desc: string;
  Icon: string;
  RegionDrops: any[];
  ArchwingDrops: string[];
  ScoreLocTag: string;
  Tag: string;
  MissionInfo: MissionInfo;
  ContinuousHubEvent: ContinuousHubEvent;
  Reward: Reward;
}

interface Reward {
  credits: number;
  items: string[];
}

interface ContinuousHubEvent {
  Transmission: string;
  Activation: Date2;
  Expiry: Date2;
  RepeatInterval: number;
}

interface MissionInfo {
  missionType: string;
  faction: string;
  location: string;
  levelOverride: string;
  enemySpec: string;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  difficulty: number;
  archwingRequired: boolean;
  requiredItems: string[];
  consumeRequiredItems: boolean;
  missionReward: MissionReward;
  vipAgent: string;
  leadersAlwaysAllowed: boolean;
  goalTag: string;
  levelAuras: string[];
  icon: string;
}

interface MissionReward {
  randomizedItems: string;
}

interface Event {
  _id: Id;
  Messages: Message[];
  Prop: string;
  Date: Date2;
  ImageUrl?: string;
  Priority: boolean;
  MobileOnly: boolean;
  EventStartDate?: Date2;
  EventEndDate?: Date2;
  EventLiveUrl?: string;
}

interface Date2 {
  '$date': Date;
}

interface Date {
  '$numberLong': string;
}

interface Message {
  LanguageCode: string;
  Message: string;
}

interface Id {
  '$oid': string;
}
