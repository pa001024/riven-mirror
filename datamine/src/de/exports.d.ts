export declare interface Upgrade {
  ExportUpgrades: ExportUpgrade[]
}

export declare interface ExportUpgrade {
  uniqueName: string;
  name: string;
  polarity: string;
  rarity: string;
  codexSecret: boolean;
  baseDrain: number;
  fusionLimit: number;
  description?: string[];
  type?: string;
  subtype?: string;
  upgradeEntries?: UpgradeEntry[];
}

export declare interface UpgradeEntry {
  tag: string;
  prefixTag: string;
  suffixTag: string;
  upgradeValues: UpgradeValue[];
}

export declare interface UpgradeValue {
  value: number;
  locTag?: string;
}

export declare interface Warframe {
  ExportWarframes: ExportWarframe[]
}

export declare interface ExportWarframe {
  uniqueName: string;
  name: string;
  parentName: string;
  description: string;
  longDescription: string;
  health: number;
  shield: number;
  armor: number;
  stamina: number;
  power: number;
  codexSecret: boolean;
  abilities: Ability[];
  passiveDescription?: string;
}

export declare interface Ability {
  abilityUniqueName: string;
  abilityName: string;
  description: string;
}
