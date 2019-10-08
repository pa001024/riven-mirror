import { WarframeProperty, AbilityData } from "./warframe.i";

// 一些工具函数

/** 将属性绑定到技能强度 S(数值, 加数) */
const S = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityStrength, n] as [string, number]] });
/** 将属性绑定到技能持续 D(数值, 加数) */
const D = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityDuration, n] as [string, number]] });
/** 将属性绑定到效率 E(数值, 加数) */
const E = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityEfficiency, n] as [string, number]] });
/** 将属性绑定到技能范围 R(数值, 加数) */
const R = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityRange, n] as [string, number]] });

// data from https://github.com/WFCD/warframe-items
export let _abilityData: AbilityData[] = [
  {
    id: "Shuriken",
    oneHand: true,
    tags: 1,
    energyCost: 25,
    props: { Damage: { damage: [["Slash", S(500)]], amount: 2, prjSpeed: 65 } },
  },
  {
    id: "Smoke Screen",
    tags: 8,
    energyCost: 50,
    props: {
      Buff: { effect: [["ivb", 1]], duration: D(8) },
      Control: { range: R(10), duration: 1 },
    },
  },
  {
    id: "Teleport",
    tags: 4,
    energyCost: 25,
    props: { Move: { directive: "2", distance: R(60) } },
  },
  {
    id: "Blade Storm",
    tags: 1,
    energyCost: 0,
    energyCostN: 12,
    props: { Damage: { damage: [["True", S(2000)]], distance: R(50) } },
  },
  {
    id: "Landslide",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: { damage: [["Impact", S(350)]], distance: R(15) },
      Move: { directive: "2", distance: R(15) },
    },
  },
  {
    id: "Tectonics",
    tags: 32,
    energyCost: 50,
    props: { Summon: { health: S(3750), range: R(5), distance: R(15) } },
  },
  {
    id: "Petrify",
    tags: 16,
    energyCost: 75,
    props: {
      Control: { range: R(14), angel: 60, duration: D(20) },
      Buff: { effect: [["oad", 50]] },
    },
  },
  { id: "Rumblers", tags: 32, energyCost: 100, props: {} },
  {
    id: "Sonic Boom",
    tags: 17,
    energyCost: 25,
    props: {
      Damage: { angel: 180, damage: [["Impact", S(50)]], distance: R(15) },
    },
  },
  {
    id: "Sonar",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["oad", S(500)]], range: R(35), duration: D(30) } },
  },
  {
    id: "Silence",
    tags: 1,
    energyCost: 75,
    props: { Control: { range: R(20), duration: D(30) } },
  },
  {
    id: "Sound Quake",
    tags: 0,
    energyCost: 25,
    energyCostPS: 12,
    props: { Damage: { range: R(20), damage: [["Blast", S(200)]] } },
    enhance: {
      modName: "Ji",
      energyCost: 100,
      props: { Damage: { range: R(35), damage: [["Blast", S(4000)]] } },
    },
  },
  {
    id: "Spectral Scream",
    tags: 1,
    energyCost: 25,
    props: { Damage: { range: R(10), damage: [["Heat", S(200)]] } },
  },
  {
    id: "Elemental Ward",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["h", S(200)]] } },
  },
  {
    id: "Vex Armor",
    tags: 2,
    energyCost: 75,
    props: { Buff: { effect: [["a", S(350)], ["dmg", S(275)]] } },
  },
  {
    id: "Effigy",
    tags: 32,
    energyCost: 50,
    energyCostPS: 10,
    props: {
      Summon: { health: S(8000), range: R(20), damage: [["Heat", S(200)]] },
    },
  },
  {
    id: "Fireball",
    tags: 1,
    oneHand: true,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Heat", S(400)]],
        rangeDamage: [["Heat", S(150)]],
        range: 5,
        prjSpeed: 50,
      },
    },
  },
  {
    id: "Accelerant",
    tags: 2,
    energyCost: 50,
    props: {
      Control: { range: R(20) },
      Buff: { effect: [["c", S(50)]], duration: D(30) },
      Debuff: { duration: D(15), effect: [["fed", S(250)]] },
    },
  },
  {
    id: "Fire Blast",
    tags: 3,
    energyCost: 75,
    props: {
      Damage: { range: R(15), damage: [["Heat", S(200)]] },
      Buff: { range: R(4), effect: [["efd", 50]] },
    },
  },
  {
    id: "World On Fire",
    tags: 1,
    energyCost: 25,
    energyCostPS: 3,
    props: {
      Damage: {
        range: R(15),
        damage: [["Heat", S(400)]],
        rangeDamage: [["Heat", S(400)]],
      },
    },
  },
  {
    id: "Metamorphosis",
    tags: 2,
    energyCost: 25,
    props: { Buff: { duration: D(25), effect: [["a", 250], ["s", 150]] } },
  },
  {
    id: "Rest & Rage",
    tags: 16,
    energyCost: 25,
    props: { Control: { duration: D(22), range: R(5), distance: R(50) } },
  },
  {
    id: "Pacify & Provoke",
    tags: 2,
    energyCost: 10,
    props: { Buff: { effect: [["t", { value: 20, maxValue: 50, bind: [["t", 0]] }]] } },
  },
  {
    id: "Mend & Maim",
    tags: 1,
    energyCost: 50,
    energyCostPS: 3.5,
    props: { Damage: { damage: [["Slash", S(150)]], range: R(18) } },
  },
  {
    id: "Slash Dash",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(37.5)], ["Puncture", S(37.5)], ["Slash", S(175)]],
        affectBy: "melee",
      },
      Move: { directive: "1", distance: R(12) },
    },
  },
  {
    id: "Radial Blind",
    tags: 16,
    energyCost: 50,
    props: { Control: { range: R(25), duration: D(15) } },
  },
  {
    id: "Radial Javelin",
    tags: 0,
    energyCost: 75,
    props: {
      Damage: {
        range: R(25),
        damage: [["Physical", S(1000)]],
      },
    },
  },
  {
    id: "Exalted Blade",
    tags: 0,
    energyCost: 25,
    energyCostPS: 2.5,
    props: {
      ExaltedWeapon: {
        weaponName: "Exalted Blade",
        effect: [["oad", S(100, -100)]],
      },
    },
  },
  {
    id: "Radial Howl",
    tags: 16,
    energyCost: 50,
    props: { Control: { range: R(25), duration: D(15) } },
  },
  {
    id: "Freeze",
    tags: 17,
    energyCost: 25,
    props: {
      Damage: { damage: [["Cold", S(350)]], rangeDamage: [["Cold", S(150)]] },
      Control: { duration: D(15) },
      Debuff: {},
    },
    oneHand: true,
  },
  {
    id: "Ice Wave",
    tags: 17,
    energyCost: 50,
    props: {
      Damage: { damage: [["Cold", S(700)]], angel: R(45), distance: R(20) },
    },
  },
  {
    id: "Snow Globe",
    tags: 49,
    energyCost: 75,
    props: {
      Summon: { health: S(5000) },
      Damage: { damage: [["Blast", S(150)]] },
    },
  },
  {
    id: "Avalanche",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Cold", S(1500)]],
        rangeDamage: [["Cold", S(400)]],
        distance: R(15),
      },
      Control: { duration: D(8), range: R(15) },
    },
  },
  {
    id: "Shattered Lash",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Puncture", S(800)]],
        rangeDamage: [["Slash", S(800)]],
      },
      ExaltedWeapon: {
        weaponName: "Shattered Lash",
        effect: [["oad", S(100, -100)]],
      },
    },
  },
  {
    id: "Splinter Storm",
    tags: 2,
    energyCost: 50,
    props: {
      DamageReduce: { rate: { value: 70, bind: [["t", 0]], maxValue: 90 } },
      Damage: {
        damage: [["Physical", S(250)]],
      },
    },
  },
  {
    id: "Spectrorage",
    tags: 16,
    energyCost: 75,
    props: {
      Summon: {
        damage: [["Physical", S(1500)]],
        distance: R(100),
        health: 800,
      },
    },
  },
  {
    id: "Mass Vitrify",
    tags: 49,
    energyCost: 100,
    props: {
      Summon: {
        health: S(2225),
        rangeDamage: [["Physical", S(600)]],
        range: R(8),
        distance: R(11),
        duration: D(3),
      },
    },
  },
  {
    id: "Dread Mirror",
    tags: 5,
    energyCost: 25,
    props: {
      Move: { distance: R(30) },
      Damage: { damage: [["Impact", 100]], distance: R(30) },
    },
  },
  {
    id: "Blood Altar",
    tags: 22,
    energyCost: 50,
    props: {
      Buff: { effect: [["hps", S(25)]], duration: D(20), distance: R(30), range: R(6) },
      Move: { directive: "2", distance: R(30) },
    },
  },
  {
    id: "Bloodletting",
    tags: 0,
    energyCost: 0,
    props: {
      Special: [{ desc: "energyObtained", val: E(25) }],
    },
  },
  {
    id: "Seeking Talons",
    tags: 3,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Slash", S(150)]],
        angel: 95,
        distance: 60,
        prjSpeed: 80,
        amount: 8,
      },
      Buff: {
        effect: [["ess", { value: 50, bind: [["t", 0]], maxValue: 100 }]],
        duration: D(10),
      },
    },
  },
  {
    id: "Condemn",
    tags: 16,
    energyCost: 25,
    props: {
      Control: { duration: D(6), range: 20, angel: 15 },
      Special: [{ desc: "recoverShield", val: S(150) }],
    },
  },
  {
    id: "Penance",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["R", S(35)], ["F", S(70)]], duration: D(4) } },
  },
  {
    id: "Thurible",
    tags: 2,
    energyCost: 75,
    props: { Buff: { desc: "headshotEnergy", effect: [] } },
  },
  {
    id: "Covenant",
    tags: 2,
    energyCost: 100,
    props: { Buff: { effect: [["i0", 50]], duration: D(6) } },
  },
  {
    id: "Tempest Barrage",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Impact", 150]], range: R(10), duration: D(5) },
    },
    oneHand: true,
  },
  {
    id: "Tidal Surge",
    tags: 5,
    energyCost: 50,
    props: {
      Move: { directive: "0", distance: D(30) },
      Damage: { damage: [["Slash", S(300)]] },
    },
  },
  {
    id: "Undertow",
    tags: 17,
    energyCost: 75,
    props: {
      Damage: { damage: [["Impact", S(25)]], range: R(4) },
      Control: { range: R(4) },
    },
  },
  {
    id: "Tentacle Swarm",
    tags: 1,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Magnetic", S(300)], ["True", S(200)]],
        duration: D(20),
        range: R(5),
        amount: 8,
      },
    },
  },
  {
    id: "Desiccation",
    tags: 16,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Slash", S(150)]],
        duration: D(8),
        angel: 75,
        range: R(15),
      },
    },
  },
  {
    id: "Devour",
    tags: 17,
    energyCost: 50,
    props: { Control: { distance: R(50), duration: D(30) } },
  },
  {
    id: "Sandstorm",
    tags: 17,
    energyCost: 75,
    energyCostPS: 10,
    props: { Damage: { damage: [["Slash", S(500)]], range: R(7.5) } },
  },
  {
    id: "Scarab Swarm",
    tags: 3,
    energyCost: 25,
    props: {
      Buff: { effect: [["a", 100]] },
      Damage: { damage: [["Slash", S(200)]], distance: R(30) },
    },
    oneHand: true,
  },
  {
    id: "Quiver",
    tags: 16,
    energyCost: 25,
    props: {
      Control: { range: R(6), duration: D(10) },
      Buff: { effect: [["ivb", 1]], duration: D(12), range: R(2.5) },
    },
  },
  {
    id: "Navigator",
    tags: 2,
    energyCost: 25,
    energyCostPS: 3,
    props: { Buff: { target: 1, effect: [["oad", S(500)]] } },
  },
  {
    id: "Prowl",
    tags: 10,
    energyCost: 25,
    props: { Buff: { effect: [["ivb", 1]] } },
  },
  {
    id: "Artemis Bow",
    tags: 2,
    energyCost: 25,
    energyCostN: 10,
    props: {
      ExaltedWeapon: {
        weaponName: "Artemis Bow",
        effect: [["oad", S(100, -100)]],
      },
    },
  },
  {
    id: "Whipclaw",
    tags: 0,
    energyCost: 25,
    props: {
      ExaltedWeapon: { weaponName: "Whipclaw", effect: [["oad", S(100, -100)]] },
      Damage: {
        damage: [["Physical", S(300)]],
        range: R(5),
        distance: R(10),
      },
    },
    oneHand: true,
  },
  {
    id: "Ensnare",
    tags: 16,
    energyCost: 50,
    props: { Control: { distance: R(30), duration: D(15) } },
  },
  {
    id: "Venari",
    tags: 32,
    energyCost: 0,
    props: { Summon: { damage: [["Slash", 350]] } },
  },
  {
    id: "Strangledome",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Physical", S(250)]],
        distance: R(5),
        range: R(10),
        duration: D(20),
      },
      Control: { distance: R(5), range: R(10), duration: D(20) },
    },
  },
  {
    id: "Banish",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(250)]],
        range: R(35),
        rangeDamage: [["Impact", 300]],
        angel: 75,
      },
      Special: [{ desc: "banish" }],
    },
  },
  {
    id: "Stasis",
    tags: 16,
    energyCost: 50,
    props: { Control: { duration: D(15) } },
  },
  {
    id: "Rift Surge",
    tags: 17,
    energyCost: 75,
    props: {
      Damage: {
        damage: [["Impact", S(250)]],
        rangeDamage: [["Impact", 300]],
        range: R(25),
        duration: D(18),
      },
    },
  },
  { id: "Cataclysm", tags: 0, energyCost: 100, props: {} },
  {
    id: "Decoy",
    tags: 32,
    energyCost: 25,
    props: { Summon: { health: 200, duration: D(25) } },
  },
  {
    id: "Invisibility",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["ivb", 1]], duration: D(12) } },
  },
  {
    id: "Switch Teleport",
    tags: 4,
    energyCost: 25,
    props: { Move: { directive: "2", distance: R(75) } },
  },
  {
    id: "Radial Disarm",
    tags: 16,
    energyCost: 100,
    props: { Special: [{ desc: "disarm" }], Control: { range: R(20) } },
  },
  {
    id: "Pull",
    tags: 17,
    energyCost: 25,
    props: {
      Damage: { damage: [["Magnetic", S(300)]], range: R(25), angel: 85 },
      Special: [{ desc: "traction" }],
    },
  },
  {
    id: "Magnetize",
    tags: 17,
    energyCost: 50,
    props: {
      Damage: { damage: [["Blast", S(300)]], duration: D(15), range: R(4) },
      Special: [{ desc: "attractBullets" }],
    },
    oneHand: true,
  },
  {
    id: "Polarize",
    tags: 0,
    energyCost: 75,
    props: {
      Damage: { damage: [["Impact", S(400)]], range: R(8), duration: D(5) },
      Special: [{ desc: "recoverShield" }],
    },
  },
  {
    id: "Crush",
    tags: 1,
    energyCost: 100,
    props: { Damage: { damage: [["Magnetic", S(1500)]], range: R(18) } },
  },
  {
    id: "Ballistic Battery",
    tags: 2,
    energyCost: 25,
    props: {
      Buff: { effect: [["exd", S(1600)]], target: 1 },
      Special: [{ desc: "storePerAttack", val: S(140) }],
    },
  },
  {
    id: "Shooting Gallery",
    tags: 18,
    energyCost: 50,
    props: {
      Buff: { effect: [["D", S(25)]], duration: D(30) },
      Control: { range: R(16) },
    },
  },
  {
    id: "Shatter Shield",
    tags: 2,
    energyCost: 75,
    props: {
      DamageReduce: {
        rate: { value: 80, bind: [["t", 0]], maxValue: 95 },
        target: 1,
      },
    },
  },
  {
    id: "Peacemaker",
    tags: 1,
    energyCost: 25,
    energyCostPS: 15,
    props: {
      ExaltedWeapon: { weaponName: "Regulators", effect: [["D", S(150)]] },
    },
  },
  {
    id: "Hall Of Mirrors",
    tags: 32,
    energyCost: 25,
    props: {
      Summon: { duration: D(25) },
      Special: [{ desc: "damagePercent", val: S(20) }],
    },
  },
  {
    id: "Sleight Of Hand",
    tags: 1,
    energyCost: 50,
    props: {
      Damage: { damage: [["Impact", S(400)]], duration: D(20), range: R(12) },
    },
  },
  {
    id: "Eclipse",
    tags: 2,
    energyCost: 25,
    props: {
      DamageReduce: { rate: { value: 75, bind: [["t", 0]], maxValue: 95 } },
      Buff: { effect: [["dmg", S(200)]], duration: D(25) },
    },
  },
  {
    id: "Prism",
    tags: 17,
    energyCost: 50,
    energyCostPS: 10,
    props: {
      Damage: {
        damage: [["Radiation", S(500)]],
        range: S(30),
        duration: D(12),
      },
      Control: { duration: D(15), range: R(25) },
    },
  },
  {
    id: "Soul Punch",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(500)]],
        distance: R(50),
        rangeDamage: [["Impact", 100]],
      },
    },
    oneHand: true,
  },
  {
    id: "Terrify",
    tags: 16,
    energyCost: 50,
    props: {
      Control: { range: R(15), duration: D(25) },
      Debuff: {
        effect: [["a", { value: -20, bind: [["t", 0]] }]],
        angel: R(15),
      },
    },
  },
  {
    id: "Desecrate",
    tags: 0,
    energyCost: 75,
    props: {
      Special: [{ desc: "extraDrop", val: 54 }, { desc: "range", val: R(25) }],
    },
  },
  {
    id: "Shadows Of The Dead",
    tags: 32,
    energyCost: 100,
    props: { Summon: { range: 10, duration: D(33) } },
  },

  {
    id: "Fire Walker",
    tags: 3,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Heat", S(200)]],
        duration: D(10),
        rangeDamage: [["Heat", S(1250)]],
      },
      Buff: { effect: [["f", 25]] },
    },
  },
  {
    id: "Blazing Chakram",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Heat", S(250)]],
        rangeDamage: [["Heat", S(1000)]],
        prjSpeed: 70,
        range: 50,
      },
    },
  },
  {
    id: "Warding Halo",
    tags: 3,
    energyCost: 75,
    props: {
      DamageReduce: { durability: { value: 1000, bind: [[WarframeProperty.Armor, 0, 2.5], [WarframeProperty.AbilityStrength, 0]] }, rate: 90 },
      Special: [{ desc: "invincibleTime", val: 3 }],
      Damage: { damage: [["Heat", S(125)]] },
    },
  },
  {
    id: "Divine Spears",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Puncture", S(600)]],
        range: R(19),
        rangeDamage: [["Impact", S(600)]],
      },
      Control: { duration: D(12), range: R(19) },
    },
  },
  {
    id: "Virulence",
    tags: 1,
    energyCost: 25,
    props: { Damage: { damage: [["Puncture", 200]], angel: 10, range: R(16) } },
  },
  {
    id: "Larva",
    tags: 16,
    energyCost: 50,
    props: { Control: { duration: D(7), range: R(12) } },
  },
  {
    id: "Parasitic Link",
    tags: 2,
    energyCost: 75,
    props: {
      Buff: { effect: [["t", S(25)]] },
      DamageReduce: { rate: { value: 50, bind: [["t", 0]], maxValue: 90 } },
    },
  },
  {
    id: "Ravenous",
    tags: 3,
    energyCost: 100,
    props: {
      Damage: { damage: [["Blast", S(150)]], range: R(8) },
      Buff: { effect: [["hps", S(20)]] },
    },
  },
  {
    id: "Null Star",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Slash", S(200)]], amount: D(6), range: R(12) },
    },
  },
  {
    id: "Antimatter Drop",
    tags: 1,
    energyCost: 50,
    props: { Damage: { damage: [["Radiation", S(200)]] } },
    oneHand: true,
  },
  {
    id: "Worm Hole",
    tags: 4,
    energyCost: 75,
    props: { Move: { directive: "0", distance: R(50) } },
    oneHand: true,
  },
  {
    id: "Molecular Prime",
    tags: 2,
    energyCost: 100,
    props: { Buff: { range: D(35), duration: D(30), effect: [["oad", 100]] } },
  },
  {
    id: "Mind Control",
    tags: 16,
    energyCost: 25,
    props: { Control: { range: R(60), duration: D(30) } },
  },
  {
    id: "Psychic Bolts",
    tags: 2,
    energyCost: 50,
    props: {
      Debuff: {
        effect: [["a", { value: 80, bind: [["t", 0]], maxValue: 100 }]],
        duration: D(11),
        angel: 108,
        range: 60,
      },
    },
    oneHand: true,
  },
  {
    id: "Chaos",
    tags: 16,
    energyCost: 75,
    props: { Control: { duration: D(25), range: R(25) } },
  },
  {
    id: "Absorb",
    tags: 1,
    energyCost: 25,
    energyCostPS: 4,
    props: { Damage: { damage: [["Magnetic", S(200)]], range: R(10) } },
  },

  {
    id: "Smite",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Radiation", S(250)], ["Impact", S(250)]],
        amount: 6,
        rangeDamage: [["Radiation", S(150)]],
        duration: D(12),
        distance: R(50),
        range: R(12.5),
        prjSpeed: 40,
      },
    },
    oneHand: true,
  },
  {
    id: "Hallowed Ground",
    tags: 1,
    energyCost: 50,
    props: {
      Damage: {
        damage: [["Radiation", S(100)]],
        angel: R(180),
        duration: D(20),
        range: R(15),
      },
    },
  },
  {
    id: "Renewal",
    tags: 2,
    energyCost: 25,
    energyCostPS: 3,
    props: { Buff: { effect: [["hps", S(40)]], range: R(25) } },
  },
  {
    id: "Reckoning",
    tags: 17,
    energyCost: 100,
    props: { Damage: { damage: [["Radiation", S(1250)]], range: R(15) } },
  },
  {
    id: "Mallet",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Blast", S(100)]], range: R(10), duration: D(20) },
    },
  },
  {
    id: "Resonator",
    tags: 32,
    energyCost: 50,
    props: {
      Summon: { duration: D(20), range: R(6), damage: [["Blast", S(125)]] },
    },
  },
  {
    id: "Metronome",
    tags: 2,
    energyCost: 75,
    props: {
      Buff: {
        effect: [["K", S(30)], ["S", S(30)]],
        duration: D(15),
        range: R(12),
      },
    },
  },
  {
    id: "Amp",
    tags: 2,
    energyCost: 100,
    props: { Buff: { effect: [["K", S(200)]], duration: D(30), range: R(14) } },
  },
  {
    id: "Enthrall",
    tags: 17,
    energyCost: 25,
    props: {
      Control: { duration: D(30), distance: R(25) },
      Damage: {
        damage: [["Puncture", S(1000)]],
        rangeDamage: [["Impact", S(500)]],
        duration: D(10),
        range: R(2),
      },
    },
  },
  {
    id: "Mesmer Skin",
    tags: 18,
    energyCost: 50,
    props: {
      DamageReduce: { times: S(6) },
      Control: { duration: D(5) },
    },
  },
  {
    id: "Reave",
    tags: 4,
    energyCost: 75,
    props: { Move: { directive: "0", distance: D(15) } },
  },
  {
    id: "Danse Macabre",
    tags: 1,
    energyCost: 25,
    energyCostPS: 20,
    props: { Damage: { damage: [["Void", S(1250)]] } },
  },
  {
    id: "Rhino Charge",
    tags: 5,
    energyCost: 25,
    props: {
      Move: { directive: "0", distance: R(48) },
      Damage: { damage: [["Impact", S(650)]], range: R(2) },
    },
  },
  {
    id: "Iron Skin",
    tags: 2,
    energyCost: 50,
    props: {
      DamageReduce: {
        durability: { value: 1000, bind: [[WarframeProperty.Armor, 0, 2.5], [WarframeProperty.AbilityStrength, 0]] },
        rate: 100,
      },
    },
  },
  {
    id: "Roar",
    tags: 2,
    energyCost: 75,
    props: { Buff: { effect: [["aed", S(50)]], duration: D(30), range: R(25) } },
  },
  {
    id: "Rhino Stomp",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: { damage: [["Blast", S(800)]], range: R(25) },
      Control: { duration: D(8), range: R(25) },
    },
  },
  {
    id: "Spores",
    tags: 0,
    energyCost: 25,
    props: {
      Damage: { damage: [["Corrosive", S(10)]], amount: 3, distance: R(60) },
    },
    oneHand: true,
  },
  {
    id: "Molt",
    tags: 32,
    energyCost: 50,
    props: {
      Summon: { health: S(500), duration: D(40), damage: [["Toxin", S(400)]] },
    },
    oneHand: true,
  },
  {
    id: "Toxic Lash",
    tags: 2,
    energyCost: 75,
    props: { Buff: { effect: [["6", S(30)]], duration: D(45) } },
  },
  {
    id: "Miasma",
    tags: 1,
    energyCost: 100,
    props: {
      Damage: { damage: [["Viral", S(150)]], duration: D(6), range: R(20) },
    },
  },
  {
    id: "Spellbind",
    tags: 16,
    energyCost: 25,
    props: { Control: { duration: D(16), range: R(5), distance: R(50) } },
  },
  {
    id: "Tribute",
    tags: 3,
    energyCost: 50,
    props: {
      Damage: { damage: [["Impact", S(500)]], distance: R(25) },
      Debuff: { effect: [["dmg", { value: -75 }]], duration: D(12) },
    },
  },
  {
    id: "Lantern",
    tags: 1,
    energyCost: 75,
    props: {
      Damage: {
        damage: [["Slash", S(350)]],
        duration: D(25),
        range: R(8),
        distance: R(25),
      },
      Special: [{ desc: "attractionRadius", val: R(20) }, { desc: "explosionRadius", val: R(8) }],
    },
  },
  {
    id: "Razorwing",
    tags: 1,
    energyCost: 25,
    energyCostPS: 5,
    props: {
      ExaltedWeapon: { weaponName: "Dex Pixia", effect: [["oad", S(100, -100)]] },
    },
  },
  {
    id: "Well Of Life",
    tags: 16,
    energyCost: 25,
    props: { Control: { duration: D(12), distance: R(100) } },
  },
  {
    id: "Energy Vampire",
    tags: 1,
    energyCost: 50,
    props: {
      Damage: {
        damage: [["True", S(6.25)]],
        range: R(25),
        distance: R(100),
        tick: 4,
      },
    },
  },
  {
    id: "Link",
    tags: 2,
    energyCost: 75,
    props: {
      DamageReduce: { rate: 75 },
      Buff: { duration: D(12), range: R(20) },
    },
  },
  {
    id: "Blessing",
    tags: 2,
    energyCost: 100,
    props: {
      Buff: { range: 50, duration: D(10), effect: [["hps", S(80)]] },
      DamageReduce: { rate: { value: 50, bind: [["t", 0]], maxValue: 75 } },
    },
  },
  {
    id: "Rip Line",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: { damage: [["Slash", S(60)]], distance: R(75) },
      Move: { directive: "0", distance: R(75) },
    },
  },
  {
    id: "Warcry",
    tags: 2,
    energyCost: 50,
    props: {
      Buff: {
        effect: [["J", S(50)], ["a", S(50)]],
        duration: D(15),
        range: R(25),
      },
    },
  },
  {
    id: "Paralysis",
    tags: 16,
    energyCost: 75,
    props: { Damage: { damage: [["Impact", S(100)]], angel: 45, range: R(10) } },
  },
  {
    id: "Hysteria",
    tags: 1,
    energyCost: 25,
    energyCostPS: 15,
    props: {
      ExaltedWeapon: { weaponName: "Valkyr Talons", effect: [["oad", S(100, -100)]] },
    },
  },
  {
    id: "Tesla",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Electricity", S(150)]], tick: D(10), range: R(12) },
    },
    oneHand: true,
  },
  { id: "Minelayer", tags: 0, energyCost: 50, props: {} },
  {
    id: "Bastille",
    tags: 16,
    energyCost: 75,
    props: { Control: { duration: D(15), range: R(10) } },
  },
  {
    id: "Vortex",
    tags: 16,
    energyCost: 100,
    props: { Control: { duration: D(12), range: R(8.5) } },
  },
  {
    id: "Shock",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Electricity", S(200)]], distance: R(15), tick: 5 },
    },
    oneHand: true,
  },
  {
    id: "Speed",
    tags: 2,
    energyCost: 50,
    props: {
      Buff: {
        effect: [["f", S(50)], ["J", S(50)]],
        duration: D(10),
        range: R(25),
      },
    },
    oneHand: true,
  },
  {
    id: "Electric Shield",
    tags: 2,
    energyCost: 50,
    props: {
      Buff: { target: 1, effect: [["1", 100], ["eed", 50]], duration: D(25) },
    },
  },
  {
    id: "Discharge",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Electricity", S(1200)]],
        duration: D(6),
        range: R(20),
      },
      Control: { duration: D(6), range: R(20) },
      Special: [{ desc: "chainDistance", val: R(8) }],
    },
  },
  {
    id: "Celestial Twin",
    tags: 32,
    energyCost: 25,
    props: {
      Summon: { health: { value: 2, bind: [["h", 0], ["t", 0]] } },
    },
  },
  {
    id: "Cloud Walker",
    tags: 20,
    energyCost: 25,
    props: {
      Control: { range: R(8) },
    },
  },
  {
    id: "Defy",
    tags: 2,
    energyCost: 50,
    props: {
      Buff: { effect: [["ivc", 1]], duration: D(5), range: R(12) },
    },
  },
  {
    id: "Primal Fury",
    tags: 0,
    energyCost: 10,
    energyCostPS: 5,
    props: { ExaltedWeapon: { weaponName: "Iron Staff", effect: [["oad", S(100, -100)]] } },
  },
  {
    id: "Tail Wind",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: { damage: [["Slash", S(500)]], range: R(2) },
      Move: { directive: "2", distance: R(30) },
      Control: { range: R(2) },
    },
  },
  {
    id: "Airburst",
    tags: 1,
    energyCost: 50,
    props: {
      Damage: {
        damage: [["Slash", S(500)]],
        range: R(8),
        distance: 100,
      },
    },
    oneHand: true,
  },
  {
    id: "Turbulence",
    tags: 2,
    energyCost: 75,
    props: {
      Buff: {
        desc: "deflectionBullet",
        duration: D(20),
        target: 1,
        range: R(6),
      },
    },
  },
  {
    id: "Tornado",
    tags: 49,
    energyCost: 100,
    props: {
      Damage: { amount: 4, duration: D(20), damage: [["Impact", S(120)]], range: R(25) },
      Control: { duration: D(20), range: 5 },
    },
  },
  {
    id: "Elude",
    tags: 2,
    energyCost: 25,
    energyCostPS: 2.5,
    props: {
      Buff: {
        angel: { value: 180, bind: [["g", 0]], maxValue: 360 },
        desc: "dodgeAttack",
        target: 1,
      },
    },
  },
  {
    id: "Lull",
    tags: 16,
    energyCost: 50,
    props: { Control: { duration: D(20), angel: 30, distance: R(25) } },
  },
  {
    id: "Desolate Hands",
    tags: 0,
    energyCost: 75,
    props: {
      Damage: { damage: [["Puncture", S(250)]], amount: S(8), range: R(3), distance: R(4) },
      DamageReduce: { rate: { value: 80, bind: [["t", 0]], maxValue: 90 } },
    },
  },
  {
    id: "Serene Storm",
    tags: 0,
    energyCost: 0,
    props: {
      ExaltedWeapon: { weaponName: "Desert Wind", effect: [["oad", S(100, -100)]] },
    },
  },
  {
    id: "Balefire",
    tags: 1,
    energyCost: 50,
    energyCostN: 100,
    props: {
      Damage: { damage: [["Electricity", S(500)]] },
      ExaltedWeapon: { weaponName: "Balefire Charger", effect: [["oad", S(100, -100)]] },
    },
  },
  {
    id: "Shield Pillage",
    tags: 2,
    energyCost: 150,
    props: {
      Debuff: {
        desc: "deprivationOfShieldAndArmor",
        duration: D(2),
        range: R(8),
        effect: [["s", { value: -25, bind: [["t", 0]] }]],
      },
      Special: [{ desc: "clearNegativeState" }],
    },
  },
  {
    id: "Haven",
    tags: 2,
    energyCost: 250,
    props: { Buff: { effect: [["r", S(80)], ["s", S(500)]] } },
  },
  {
    id: "Aegis Storm",
    tags: 1,
    energyCost: 100,
    energyCostPS: 25,
    props: { Damage: { damage: [["Radiation", S(200)]], rangeDamage: [["Impact", S(500)]] } },
  },
  {
    id: "Reservoirs",
    tags: 2,
    energyCost: 25,
  },
  {
    id: "Reservoirs",
    tags: 2,
    energyCost: 25,
    props: { Buff: { duration: D(30), effect: [["hps", S(30)], ["ckm", S(20)], ["J", S(30)]], range: R(5) } },
  },
  {
    id: "Wil-O-Wisp",
    tags: 36,
    energyCost: 35,
    props: { Summon: { duration: D(4) } },
    oneHand: true,
  },
  {
    id: "Breach Surge",
    tags: 16,
    energyCost: 50,
    props: { Control: { duration: D(16), range: R(15) } },
  },
  {
    id: "Sol Gate",
    tags: 1,
    energyCost: 25,
    energyCostPS: 12,
    props: { Damage: { damage: [["Heat", S(500)], ["Radiation", S(1000)]], range: R(40) } },
  },
  // Archwing
  {
    id: "Watchful Swarm",
    tags: 2,
    energyCost: 25,
    props: { DamageReduce: { times: S(15) } },
  },
  {
    id: "Benevolent Decoy",
    tags: 2,
    energyCost: 50,
    props: { Buff: { range: R(80), duration: D(25) } },
  },
  {
    id: "Warding Grace",
    tags: 18,
    energyCost: 25,
    energyCostPS: 10,
    props: { Debuff: { effect: [["J", { value: -50, bind: [["t", 0]] }], ["fl", { value: -50, bind: [["t", 0]] }]], range: R(400) } },
  },
  {
    id: "Vengeful Rush",
    tags: 2,
    energyCost: 100,
    props: { Buff: { range: R(400), effect: [["t", 10], ["u", 10], ["g", 10]], duration: D(30) } },
  },
  {
    id: "Bloomer",
    tags: 1,
    energyCost: 25,
    props: { Damage: { damage: [["Blast", S(1000)]], range: R(240) } },
  },
  {
    id: "Core Vent",
    tags: 2,
    energyCost: 50,
    props: { Buff: { duration: D(9) }, DamageReduce: { target: 3 } },
  },
  {
    id: "Thumper",
    tags: 1,
    energyCost: 75,
    props: { Damage: { damage: [["Blast", S(500)]], duration: D(45), range: R(80) } },
  },
  {
    id: "Warhead",
    tags: 1,
    energyCost: 100,
    props: { Damage: { damage: [["Blast", S(1750)]], range: R(240), prjSpeed: 50 } },
  },
  {
    id: "Blink",
    tags: 4,
    energyCost: 25,
    props: { Move: { directive: "0", distance: R(400) } },
    oneHand: true,
  },
  {
    id: "Penumbra",
    tags: 2,
    energyCost: 15,
    energyCostPS: 5,
    props: { Buff: { effect: [["ivb", 1]] } },
    oneHand: true,
  },
  {
    id: "Cosmic Crush",
    tags: 1,
    energyCost: 75,
    props: { Damage: { damage: [["Blast", S(1500)]], range: R(140) } },
  },
  {
    id: "Fighter Escort",
    tags: 33,
    energyCost: 100,
    props: { Damage: { damage: [["Blast", S(2500)]], amount: 8, duration: 30, range: R(80) } },
  },
  {
    id: "Energy Shell",
    tags: 2,
    energyCost: 25,
    props: { Buff: { effect: [["4", 50], ["fcd", 200]], duration: D(22) } },
  },
  {
    id: "Disarray",
    tags: 0,
    energyCost: 50,
    props: { Buff: { duration: D(8), range: R(180) } },
  },
  {
    id: "Seeking Fire",
    tags: 1,
    energyCost: 75,
    props: { Damage: { damage: [["Blast", 300]], amount: S(16), distance: 600, rangeDamage: [["Blast", 40]] } },
  },
  {
    id: "Repel",
    tags: 1,
    energyCost: 100,
    props: { Damage: { damage: [["Impact", S(1500)]], range: R(140) }, Control: { duration: D(11) } },
    oneHand: true,
  },
  {
    id: "Mach Rush",
    tags: 5,
    energyCost: 15,
    props: { Move: { directive: "0", distance: R(12) }, Damage: { damage: [["Impact", S(800)]], range: R(10) } },
  },
  {
    id: "Kinetic Plating",
    tags: 2,
    energyCost: 50,
    props: { Buff: { duration: D(30) } },
  },
  {
    id: "Thermal Sunder",
    tags: 3,
    energyCost: 50,
    props: { Damage: { damage: [["Cold", S(750)]], rangeDamage: [["Blast", S(1500)]], duration: D(8) } },
  },
  {
    id: "Redline",
    tags: 2,
    energyCost: 100,
    props: { Buff: { effect: [["R", D(75)], ["J", D(40)], ["F", D(50)], ["hr", D(100)]] }, Damage: { damage: [["Impact", S(200)], ["Puncture", S(200)]] } },
  },
];

export function registerAbilityData(newData: AbilityData[]) {
  _abilityData = newData;
}
