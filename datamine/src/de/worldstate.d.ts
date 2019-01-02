export declare interface WorldState {
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

export declare interface FeaturedGuild {
  _id: Id;
  Name: string;
  Tier: number;
  AllianceId: Id;
}

export declare interface WeeklyChallenges {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  Challenges: Challenge[];
}

export declare interface Challenge {
  Type: string;
  MinimumEnemyLevel: number;
  RequiredCount: number;
  ProgressIndicatorFreq: number;
  DamageType?: string;
  Script?: Script;
  VictimType?: string[];
}

export declare interface Script {
  Script: string;
  Function: string;
  _faction: string;
}

export declare interface PVPChallengeInstance {
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

export declare interface Param {
  n: string;
  v: number;
}

export declare interface LibraryInfo {
  LastCompletedTargetType: string;
}

export declare interface DailyDeal {
  StoreItem: string;
  Activation: Date2;
  Expiry: Date2;
  Discount: number;
  OriginalPrice: number;
  SalePrice: number;
  AmountTotal: number;
  AmountSold: number;
}

export declare interface PrimeAccessAvailability {
  State: string;
}

export declare interface VoidTrader {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  Character: string;
  Node: string;
  Manifest: Manifest[];
}

export declare interface Manifest {
  ItemType: string;
  PrimePrice: number;
  RegularPrice: number;
}

export declare interface BadlandNode {
  _id: Id;
  DefenderInfo: DefenderInfo;
  Node: string;
}

export declare interface DefenderInfo {
  IsAlliance: boolean;
  Id: Id;
  Name: string;
  MOTD: string;
  DeployerName: string;
  DeployerClan?: string;
}

export declare interface NodeOverride {
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

export declare interface Invasion {
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

export declare interface DefenderMissionInfo {
  seed: number;
  faction: string;
  missionReward?: any[];
}

export declare interface AttackerMissionInfo {
  seed: number;
  faction: string;
}

export declare interface AttackerReward2 {
  countedItems: CountedItem[];
}

export declare interface FlashSale {
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

export declare interface ActiveMission {
  _id: Id;
  Region: number;
  Seed: number;
  Activation: Date2;
  Expiry: Date2;
  Node: string;
  MissionType: string;
  Modifier: string;
}

export declare interface SyndicateMission {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  Tag: string;
  Seed: number;
  Nodes: string[];
  Jobs?: Job[];
}

export declare interface Job {
  jobType: string;
  rewards: string;
  masteryReq: number;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  xpAmounts: number[];
}

export declare interface Sorty {
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

export declare interface Variant {
  missionType: string;
  modifierType: string;
  node: string;
  tileset: string;
}

export declare interface Alert {
  _id: Id;
  Activation: Date2;
  Expiry: Date2;
  MissionInfo: MissionInfo2;
}

export declare interface MissionInfo2 {
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

export declare interface MissionReward2 {
  credits: number;
  countedItems?: CountedItem[];
}

export declare interface CountedItem {
  ItemType: string;
  ItemCount: number;
}

export declare interface Goal {
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

export declare interface Reward {
  credits: number;
  items: string[];
}

export declare interface ContinuousHubEvent {
  Transmission: string;
  Activation: Date2;
  Expiry: Date2;
  RepeatInterval: number;
}

export declare interface MissionInfo {
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

export declare interface MissionReward {
  randomizedItems: string;
}

export declare interface Event {
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

export declare interface Date2 {
  '$date': Date;
}

export declare interface Date {
  '$numberLong': string;
}

export declare interface Message {
  LanguageCode: string;
  Message: string;
}

export declare interface Id {
  '$oid': string;
}
