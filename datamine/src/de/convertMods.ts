let warframes = (require("./ExportWarframe.json") as import("./exports").Warframe).ExportWarframes
let mods = (require("./ExportUpgrades.json") as import("./exports").Upgrade).ExportUpgrades
const fs = require("fs") //as typeof import("fs")
const _ = require("lodash") as typeof import("lodash")
mods = mods.map(v => (v.description = v.description && [].concat(...v.description.map(k => k.replace(/﻿/g, "").split("\r\n"))), v));

let imods = mods.filter(v =>
  !v.uniqueName.includes("/Beginner/")
  && !v.uniqueName.includes("/PvPMods/")
  && !v.uniqueName.includes("PvPAugmentCard")
  && !v.uniqueName.includes("/Pets/")
  && !v.uniqueName.includes("/Hoverboard/")
  && v.type !== "SENTINEL"
  && v.type !== "---"
  && v.type !== "KUBROW"
  && v.type !== "KAVAT"
);
let pmods = mods.filter(v =>
  !v.uniqueName.includes("/Beginner/")
  // && !v.uniqueName.includes("/PvPMods/")
  // && !v.uniqueName.includes("PvPAugmentCard")
  && !v.uniqueName.includes("/Pets/")
  && !v.uniqueName.includes("/Hoverboard/")
  && v.type !== "SENTINEL"
  // && v.type !== "---"
  && v.type !== "KUBROW"
  && v.type !== "KAVAT"
);

let baseToWarframe = new Map(warframes.map(v => [v.parentName === "/Lotus/Types/Game/PowerSuits/PlayerPowerSuit" ? v.uniqueName : v.parentName, v.name] as [string, string]).filter(([, vv]) => !vv.includes("PRIME") && !vv.includes("UMBRA")))

baseToWarframe.delete("/Lotus/Types/Game/PowerSuits/PlayerPowerSuit")
// let polarities = new Set(mods.map(v => v.polarity));
// let rarities = new Set(mods.map(v => v.rarity));
let props = _.uniq([].concat(...imods
  .map(v => v.description && v.description.map(v => {
    let m = v.match(/^[\+\-]\d+(?:\.\d+)?(.* .+)/);
    return m ? m[1] : "";
  })))).filter(Boolean)

const polarityMap = {
  'AP_POWER': "=",
  'AP_DEFENSE': "d",
  'AP_TACTIC': "-",
  'AP_ATTACK': "r",
  'AP_WARD': "t",
  'AP_UMBRA': "w",
  'AP_PRECEPT': "k",
  'AP_UNIVERSAL': ""
};

const rarityMap = {
  'COMMON': "n",
  'UNCOMMON': "c",
  'RARE': "r",
  'LEGENDARY': "l"
};

const damageTypeMap = {
  "DT_POISON": "T",
  "DT_SLASH": "S",
  "DT_PUNCTURE": "P",
  "DT_IMPACT": "I",
  "DT_FREEZE": "C",
  "DT_FIRE": "H",
  "DT_ELECTRICITY": "E",
  "DT_RADIATION": "R",
  "DT_EXPLOSION": "B",
  "DT_SENTIENT": "U",
}

const propMap = {
  "% to Bullet Jump": "v",
  "% Aim Glide and Wall Latch": "at",
  "% Sprint Speed": "f",
  "% Slide": "l",
  "% Shield Recharge": "r",
  "% Shield Capacity": "s",
  " <DT_ELECTRICITY>Electricity": "7",
  "% Energy Max": "e",
  "% Counter Chance": "cc",
  " Loot Radar": "lr",
  "% Chance to Resist Knockdown": "k",
  "% Faster Knockdown Recovery": "y",
  "% Health": "h",
  "% Damage during Bleedout": "ddb",
  " Enemy Radar": "er",
  "% <DT_POISON>Toxin Resistance": "pr",
  "% <DT_RADIATION>Radiation Resistance": "rr",
  "% Damage Resistance on Knockdown": "drk",
  "% <DT_FREEZE>Cold Resistance": "cr",
  "% <DT_FIRE>Heat Resistance": "fr",
  "% <DT_ELECTRICITY>Electricity Resistance": "ir",
  "% chance to unlock locked lockers.": "ll",
  "% Casting Speed": "c",
  "% Bleedout Reduction": "br",
  "% Auto Parry Chance": "apc",
  "% Armor": "a",
  "% Ability Strength": "t",
  "% Ability Range": "g",
  "% Ability Efficiency": "x",
  "% Ability Duration": "u",
  "% Faster Stagger Recovery": "sr",
  "% Holster Speed": "hr",
  "% Dead Aim": "da",
  " 'Purity'": "vp",
  " Magazine Capacity": "bL",
  " 'Truth'": "vt",
  " Base Status Chance": "i2",
  " 'Entropy'": "ve",
  " Range": "ar",
  " 'Sequence'": "vs",
  "% Status Chance": "2",
  " 'Justice'": "vj",
  "% Melee Damage": "K",
  "% <DT_POISON>Toxin": "6",
  " 'Blight'": "vb",
  "% Weapon Range for 4s on Status Effect.": "rse",
  "% Projectile Flight Speed": "V",
  "% Multishot": "S",
  "% Critical Chance": "0",
  "% Life Steal": "ls",
  "% Magazine Capacity": "L",
  "% Fire Rate": "R",
  "% Chance to Explode (Use with Caution)": "exp",
  "% Status Duration": "3",
  "% <DT_SLASH>Slash": "A",
  "% Damage to Infested": "I",
  "% Damage to Grineer": "G",
  "% Damage to Corrupted": "od",
  "% Damage to Corpus": "C",
  "% Reload Speed": "F",
  " Punch Through": "P",
  "% <DT_IMPACT>Impact": "8",
  "% <DT_FREEZE>Cold": "5",
  "% <DT_FIRE>Heat": "4",
  "% <DT_PUNCTURE>Puncture": "9",
  "% <DT_ELECTRICITY>Electricity": "7",
  "% Damage": "D",
  "% Critical Damage": "1",
  "% Ammo Maximum": "M",
  "% Spread": "spr",
  "% Fire Rate (x2 for Bows)": "R",
  "% <DT_SENTIENT>Tau Resistance": "tr",
  "% Bonus Damage on final shot. Requires Magazine 6 or higher.": "lsb",
  "% Damage to Sentients": "smd",
  "% Extra Damage against a Marked Enemy": "edm",
  "% chance to apply <DT_SLASH> on Critical": "ac",
  "% Attack Speed": "J",
  "s Combo Duration": "N",
  "% Finisher Damage": "X",
  "% Zoom": "H",
  "% Weapon Recoil": "Z",
  "% Blast Radius": "brad",
  "% Damage on first shot in Magazine": "fsb",
  "% to Headshot Multiplier": "hm",
  "s Combo Duration when Aiming": "N",
  "% Accuracy": "acc",
  " Extra Damage on Melee Attacks, or Lethal Damage on Finishers.": "ld",
  "% Melee Slam Damage": "msd",
  "% Range": "T",
  "% Channeling Damage": "B",
  "% chance to increase Melee Combo Counter when <DT_SLASH>Slash Status deals damage.": "ccws",
  "% Channeling Efficiency": "U",
  " Bounce": "bnc",
  "% Melee Damage per Status Type affecting the target.": "co",
  "% Attack Speed (Max: 75%) for 4s on Critical Hit": "bsk",
  "% Critical Hit Chance for Slide Attack": "E",
  "% Status Chance per Combo Multiplier": "sccm",
  "% Critical Chance stacks with Combo Multiplier": "bldr",
  "% Status Duration on Hit": "3",
  "% Ammo Pickup": "ap",
  " Energy Rate": "es",
  "% Flight Speed": "fl",
  "% Status Chance when Aiming": "2",
  "% DAMAGE": "D",
  " PUNCH THROUGH": "P",
  "% Critical Chance and Damage when Aiming": "cd",
  "% Charge Rate": "ca",
  "% Chance to Resist Staggers/Knockdowns when Aiming": "ck",
  "% Aim Glide/Latch Time": "at",
  "% Parkour Velocity": "at",
  "% Aura Strength": "as",
  "% Aura Effectiveness": "ae",
  "% Evasion": "ev",
  "% Friction": "i",
  "% Critical Chance when Aiming for 1.5s": "0",
  "% Critical Damage when Aiming for 1.5s": "1",
  "% Accuracy when Aiming for 1.5s": "acc",
  "% Fire Rate when Aiming for 1.5s": "R",
  "% Status Chance when Aiming for 1.5s": "2",
  "% Movement Speed when Aiming": "m",
  "% Status Duration on Self": "sds",
  "% Magazine Reloaded/s when Holstered": "lal",
  "% Movement Speed for 2.5s": "ckm",
  "% Ability Strength of Squadmates": "tt",
  "% Shield Resistance to Ice Levels": "wc",
  " Energy": "her",
  "% Total Damage": "oad",
  "% Self-damage": "sb",
  "% Fire/Charge Rate": "rc",
  "% Reload Speed for 1.5s": "F",
  "% Damage for 1.5s": "D",
  "% Spread when Aiming": "spr",
  "% Damage for 3s": "dmg",
  " Heal Rate/s": "hps",
  "% Hit Chance": "eac",
  "% Speed": "esp",
}

const extPropMap = {
  "On Headshot:": "onHeadshot",
  "On Headshot Kill:": "onHeadshotKill",
  "On Kill:": "onKill",
  "On Reload:": "onReload",
  "On Hit:": "onHit",
  "On Ability Cast:": "onAbilityCast",
  "On Melee Channel Kill:": "onMeleeChannelKill",
  "On Reload From Empty:": "onReloadFromEmpty",
  "On Dodge:": "onDodge",
  "On Equip:": "onEquip",
  "Fatal strikes against an enemy also perform a Codex Scan. Scans require an equipped Codex Scanner and an available charge.": "scan",
}

const extRexProp = {
  "Grenades have 17% chance to stick to surfaces.": ["stick", 17],
  "Reduces the chance an enemy will hear gunfire by 25%.": ["slc", 25],
  "Enemies killed explode, dealing 100 Damage shortly after death.": ["kb", 100],
  "Shots now bounce up to 1x and travel 5% further.": ["but", 1],
  "Grenades tether up to 2 enemies from 4m away.": ["el", 2],
  "Increase damage by +40%": ["!oad", 40],
  "if the target is over 45m away.": ["ify", 15],
  "Increases Magazine Capacity by +50%.": ["L", 50],
  "Blocking taunts enemies within 6 meters to target you instead of allies.": ["!gdr", 15],
  "Restores 1 Health per Status Type affecting the target.": ["hlr", 1],
  "Converts 50% of Energy used to up to 50 Bonus Damage on next Melee Attack.": ["exd", 50],
  "Applying Status Effects with weapons increase Ability Strength by 4% for 1s.": ["t", 25.5],
  "Convert +7.5% of Damage on Health to Energy": ["rg", 7.5],
  "Convert +10% of Damage on Health to Energy": ["rg", 10],
  "Drains Energy to stop Lethal Damage with 10% Efficiency.": ["z", 10],
  "Drains Energy to stop Lethal Damage with 40% Efficiency.": ["z", 40],
  "Health Orbs grant 75 Armor, stacking up to 3x. Taking damage will consume a stack after 3s.": ["hc", 50],
  "Energy orbs grant 9% more Ability Strength to your next cast.": ["ec", 50 / 6],
  "Health pickups give +10% Energy. Energy pickups give +10% Health.": ["eq", 10],
  "Reduces damage by 2% when Airborne.": ["adr", 2],
  "Reduces damage by 10% when Airborne.": ["adr", 10],
  "<DT_IMPACT>Impact damage reduces enemy armor by 1.": ["si", 1],
  "16% Damage taken is reflected when Blocking attacks while Channeling.": ["ref", 16],
  "Converts unused Ammo Pickups into Primary Weapon Ammo. Pistol <AMMO_MUTATION> 1 and Shotgun/Sniper <AMMO_MUTATION> 2.": ["am", 30]
}

const filterProps = [/^\D+$/]

// console.log(JSON.stringify(props.map(v => [v, propMap[v]]).reduce((a, b) => (a[b[0]] = b[1], a), {})))

const enum PropType {
  BulletJump = "v",
}

function parseDescription(desc: string[]) {
  return desc && desc.map(dd => {
    let m = dd.match(/^([\+\-]\d+(?:\.\d+)?)(.* .+)/);
    if (m && propMap[m[2]]) return [propMap[m[2]], +m[1]];
    if (extPropMap[dd]) return [extPropMap[dd]];
    if (extRexProp[dd]) return extRexProp[dd];
    if (filterProps.some(r => !!dd.match(r))) return null;
    else return [dd];
  }).filter(Boolean)
}

let outputMods = imods.map(
  ({ name, polarity, rarity,
    type, subtype,
    baseDrain, fusionLimit,
    description
  }) => ({
    name,
    type: [type, baseToWarframe.get(subtype)].join(","),
    props: parseDescription(description),
    polarity: polarityMap[polarity],
    rarity: rarityMap[rarity],
    baseDrain,
    fusionLimit,
  })
).filter(v => v.polarity);

let outputArrays = imods.map(
  ({ name, polarity, rarity,
    type, subtype,
    baseDrain, fusionLimit,
    description
  }) => ([
    name,
    type === "STANCE" ? [description] : parseDescription(description),
    baseToWarframe.get(subtype) || type,
    polarityMap[polarity],
    rarityMap[rarity],
    baseDrain, //> 0 ? baseDrain + fusionLimit : baseDrain - fusionLimit,
    fusionLimit === 5 ? null : fusionLimit,
  ].filter(Boolean))
).filter(v => v[3])

fs.writeFileSync("mods.json", JSON.stringify(outputMods).replace(/},{/g, "},\n{"))
fs.writeFileSync("arr.json", JSON.stringify(outputArrays).replace(/\]\].+?\],/g, v => v + "\n"))

const _normalModSource = require("../../../src/warframe/codex/mod.data")
let mergeArrays = pmods.map(
  ({ name, polarity, rarity,
    type, subtype,
    baseDrain, fusionLimit,
    description
  }) => ([
    name,
    type === "STANCE" ? [description] : parseDescription(description),
    baseToWarframe.get(subtype) || type,
    polarityMap[polarity],
    rarityMap[rarity],
    baseDrain, //> 0 ? baseDrain + fusionLimit : baseDrain - fusionLimit,
    fusionLimit === 5 ? null : fusionLimit,
  ].filter(v => v !== null))
).filter(v => v[3])

let merged = _normalModSource.map(mod => {
  let name = mod[1]
  let found = mergeArrays.find(v => v[0] === name);

  if (found) {
    found[2] = mod[3]
    if (found[6] === 5) found.length--
    return [mod[0], ...found];
  }
  mod[1] = "!!!" + mod[1]
  return mod;
})
let unmerged = outputArrays.filter(v => !merged.some(k => k[1] === v[0]))
fs.writeFileSync("merged.json", JSON.stringify(merged).replace(/\]\].+?\],/g, v => v + "\n"))
fs.writeFileSync("unmerged.json", JSON.stringify(unmerged).replace(/\]\].+?\],/g, v => v + "\n"))

function parseDescriptionWIKI(desc: string[]) {
  return desc && desc.map(dd => {
    let m = dd.match(/^([\+\-]\d+(?:\.\d+)?)(.* .+)/);
    if (m && propMap[m[2]]) return [m[2].trim(), +m[1]]
    else return [dd];
  })
}

let outputwikis = mods.map(
  ({ name, polarity, rarity,
    type, subtype,
    baseDrain, fusionLimit,
    description
  }) => {
    let props = parseDescriptionWIKI(description);

    return [
      name,
      type,
      baseToWarframe.get(subtype),
      polarity,
      rarity,
      baseDrain,
      fusionLimit,
      props && props[0] && props[0][0],
      props && props[0] && props[0][1],
      props && props[1] && props[1][0],
      props && props[1] && props[1][1],
      props && props[2] && props[2][0],
      props && props[2] && props[2][1],
    ]
  }
).filter(v => v[3])
// to wiki data:mods.tab
let wikibase = {
  "license": "CC0-1.0",
  "description": {
    "zh": "全MOD列表 convert at " + new Date().toDateString() + " by pa001024"
  },
  "sources": "Converted from [http://content.warframe.com/MobileExport/Manifest/ExportUpgrades.json]",
  "schema": {
    "fields": [
      {
        "name": "name",
        "type": "string",
        "title": {
          "en": "名称"
        }
      },
      {
        "name": "type",
        "type": "string",
        "title": {
          "en": "类型"
        }
      },
      {
        "name": "subtype",
        "type": "string",
        "title": {
          "en": "子类型"
        }
      },
      {
        "name": "polarity",
        "type": "string",
        "title": {
          "en": "极性"
        }
      },
      {
        "name": "rarity",
        "type": "string",
        "title": {
          "en": "稀有度"
        }
      },
      {
        "name": "baseDrain",
        "type": "number",
        "title": {
          "en": "基础消耗"
        }
      },
      {
        "name": "fusionLimit",
        "type": "number",
        "title": {
          "en": "等级上限"
        }
      },
      {
        "name": "propName1",
        "type": "string",
        "title": {
          "en": "属性名1"
        }
      },
      {
        "name": "propValue1",
        "type": "number",
        "title": {
          "en": "属性值1"
        }
      },
      {
        "name": "propName2",
        "type": "string",
        "title": {
          "en": "属性名2"
        }
      },
      {
        "name": "propValue2",
        "type": "number",
        "title": {
          "en": "属性值2"
        }
      },
      {
        "name": "propName3",
        "type": "string",
        "title": {
          "en": "属性名3"
        }
      },
      {
        "name": "propValue3",
        "type": "number",
        "title": {
          "en": "属性值3"
        }
      }
    ]
  },
  "data": outputwikis
}

fs.writeFileSync("wiki.json", JSON.stringify(wikibase).replace(/".+?":/g, v => "\n" + v).replace(/\],\[/g, "],\n["))
