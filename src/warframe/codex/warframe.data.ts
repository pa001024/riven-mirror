import { WarframeData, WarframeProperty, AbilityData } from "./warframe.i";

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
    props: { Damage: { damage: [["Slash", S(500)]], amount: 2, prjSpeed: 65 } }
  },
  {
    id: "Smoke Screen",
    tags: 8,
    energyCost: 50,
    props: {
      Buff: { effect: [["ivb", 1]], duration: D(8) },
      Control: { range: R(10), duration: 1 }
    }
  },
  {
    id: "Teleport",
    tags: 4,
    energyCost: 25,
    props: { Move: { directive: "2", distance: R(60) } }
  },
  {
    id: "Blade Storm",
    tags: 1,
    energyCost: 0,
    energyCostN: 12,
    props: { Damage: { damage: [["True", S(2000)]], distance: R(50) } }
  },
  {
    id: "Landslide",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: { damage: [["Impact", S(350)]], distance: R(15) },
      Move: { directive: "2", distance: R(15) }
    }
  },
  {
    id: "Tectonics",
    tags: 32,
    energyCost: 50,
    props: { Summon: { health: S(3750), range: R(5), distance: R(15) } }
  },
  {
    id: "Petrify",
    tags: 16,
    energyCost: 75,
    props: {
      Control: { range: R(14), angel: 60, duration: D(20) },
      Buff: { effect: [["oad", 0.5]] }
    }
  },
  { id: "Rumblers", tags: 32, energyCost: 100, props: {} },
  {
    id: "Sonic Boom",
    tags: 17,
    energyCost: 25,
    props: {
      Damage: { angel: 180, damage: [["Impact", S(50)]], distance: R(15) }
    }
  },
  {
    id: "Sonar",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["oad", S(5)]], range: R(35), duration: D(30) } }
  },
  {
    id: "Silence",
    tags: 1,
    energyCost: 75,
    props: { Control: { range: R(20), duration: D(30) } }
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
      props: { Damage: { range: R(35), damage: [["Blast", S(4000)]] } }
    }
  },
  {
    id: "Spectral Scream",
    tags: 1,
    energyCost: 25,
    props: { Damage: { range: R(10), damage: [["Heat", S(200)]] } }
  },
  {
    id: "Elemental Ward",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["h", S(2)]] } }
  },
  {
    id: "Vex Armor",
    tags: 2,
    energyCost: 75,
    props: { Buff: { effect: [["a", S(3.5)], ["dmg", S(2.75)]] } }
  },
  {
    id: "Effigy",
    tags: 32,
    energyCost: 50,
    energyCostPS: 10,
    props: {
      Summon: { health: S(8000), range: R(20), damage: [["Heat", S(200)]] }
    }
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
        prjSpeed: 50
      }
    }
  },
  {
    id: "Accelerant",
    tags: 2,
    energyCost: 50,
    props: {
      Control: { range: R(20) },
      Buff: { effect: [["c", S(0.5)]], duration: D(30) },
      Debuff: { duration: D(15), effect: [["fed", S(2.5)]] }
    }
  },
  {
    id: "Fire Blast",
    tags: 3,
    energyCost: 75,
    props: {
      Damage: { range: R(15), damage: [["Heat", S(200)]] },
      Buff: { range: R(4), effect: [["efd", 0.5]] }
    }
  },
  {
    id: "World On Fire",
    tags: 1,
    energyCost: 25,
    energyCostPS: 5,
    props: {
      Damage: {
        range: R(15),
        damage: [["Heat", S(400)]],
        rangeDamage: [["Heat", S(400)]]
      }
    }
  },
  {
    id: "Metamorphosis",
    tags: 2,
    energyCost: 25,
    props: { Buff: { duration: D(25), effect: [["a", 2.5], ["s", 1.5]] } }
  },
  {
    id: "Rest & Rage",
    tags: 16,
    energyCost: 25,
    props: { Control: { duration: D(22), range: R(5), distance: R(50) } }
  },
  {
    id: "Pacify & Provoke",
    tags: 2,
    energyCost: 10,
    props: { Buff: { effect: [["t", { value: 20, maxValue: 50, bind: [["t", 0]] }]] } }
  },
  {
    id: "Mend & Maim",
    tags: 1,
    energyCost: 50,
    energyCostPS: 3.5,
    props: { Damage: { damage: [["Slash", S(150)]], range: R(18) } }
  },
  {
    id: "Slash Dash",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(37.5)], ["Puncture", S(37.5)], ["Slash", S(175)]],
        affectBy: "melee"
      },
      Move: { directive: "1", distance: R(12) }
    }
  },
  {
    id: "Radial Blind",
    tags: 16,
    energyCost: 50,
    props: { Control: { range: R(25), duration: D(15) } }
  },
  {
    id: "Radial Javelin",
    tags: 0,
    energyCost: 75,
    props: {
      Damage: {
        range: R(25),
        damage: [["Physical", S(1000)]]
      }
    }
  },
  {
    id: "Exalted Blade",
    tags: 0,
    energyCost: 100,
    props: {
      ExaltedWeapon: {
        weaponName: "Exalted Blade",
        effect: [["oad", S(100, -100)]]
      }
    }
  },
  { id: "Radial Howl", tags: 0, energyCost: 25, props: {} },
  {
    id: "Freeze",
    tags: 17,
    energyCost: 50,
    props: {
      Damage: { damage: [["Cold", S(350)]], rangeDamage: [["Cold", S(150)]] },
      Control: { duration: D(15) },
      Debuff: {}
    },
    oneHand: true
  },
  {
    id: "Ice Wave",
    tags: 17,
    energyCost: 75,
    props: {
      Damage: { damage: [["Cold", S(700)]], angel: R(45), distance: R(20) }
    }
  },
  {
    id: "Snow Globe",
    tags: 49,
    energyCost: 100,
    props: {
      Summon: { health: S(5000) },
      Damage: { damage: [["Blast", S(150)]] }
    }
  },
  {
    id: "Avalanche",
    tags: 17,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Cold", S(1500)]],
        rangeDamage: [["Cold", S(400)]],
        distance: R(15)
      },
      Control: { duration: D(8), range: R(15) }
    }
  },
  {
    id: "Shattered Lash",
    tags: 1,
    energyCost: 50,
    props: {
      Damage: {
        damage: [["Puncture", S(800)]],
        rangeDamage: [["Slash", S(800)]]
      }
    }
  },
  {
    id: "Splinter Storm",
    tags: 2,
    energyCost: 50,
    props: {
      DamageReduce: { rate: { value: 70, bind: [["t", 0]], maxValue: 90 } },
      Damage: {
        damage: [["Physical", S(250)]]
      }
    }
  },
  {
    id: "Spectrorage",
    tags: 16,
    energyCost: 75,
    props: {
      Summon: {
        damage: [["Physical", S(1500)]],
        distance: R(100),
        health: 800
      }
    }
  },
  {
    id: "Mass Vitrify",
    tags: 49,
    energyCost: 100,
    props: {
      Summon: {
        health: S(2225),
        rangeDamage: [["Puncture", S(600)]],
        range: R(8),
        distance: R(11),
        duration: D(3)
      }
    }
  },
  {
    id: "Dread Mirror",
    tags: 5,
    energyCost: 25,
    props: {
      Move: { distance: R(30) },
      Damage: { damage: [["Impact", 100]], distance: R(30) }
    }
  },
  { id: "Blood Altar", tags: 0, energyCost: 50, props: {} },
  {
    id: "Bloodletting",
    tags: 0,
    energyCost: 0,
    props: { Special: [{ desc: "energyObtained", val: E(25) }] }
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
        amount: 8
      },
      Buff: { desc: "causingExtraSlash" }
    }
  },
  {
    id: "Condemn",
    tags: 16,
    energyCost: 25,
    props: {
      Control: { duration: D(6), range: 20, angel: 15 },
      Special: [{ desc: "recoverShield", val: S(150) }]
    }
  },
  {
    id: "Penance",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["R", S(35)], ["F", S(70)]], duration: D(4) } }
  },
  {
    id: "Thurible",
    tags: 2,
    energyCost: 75,
    props: { Buff: { desc: "headshotEnergy", effect: [] } }
  },
  {
    id: "Covenant",
    tags: 2,
    energyCost: 10,
    props: { Buff: { effect: [["eca", 50]], duration: D(6) } }
  },
  {
    id: "Tempest Barrage",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Impact", 150]], range: R(10), duration: D(5) }
    },
    oneHand: true
  },
  {
    id: "Tidal Surge",
    tags: 5,
    energyCost: 50,
    props: {
      Move: { directive: "0", distance: D(30) },
      Damage: { damage: [["Slash", S(300)]] }
    }
  },
  {
    id: "Undertow",
    tags: 17,
    energyCost: 75,
    props: {
      Damage: { damage: [["Impact", S(25)]], range: R(4) },
      Control: { range: R(4) }
    }
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
        amount: 8
      }
    }
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
        range: R(15)
      }
    }
  },
  {
    id: "Devour",
    tags: 17,
    energyCost: 50,
    props: { Control: { distance: R(50), duration: D(30) } }
  },
  {
    id: "Sandstorm",
    tags: 17,
    energyCost: 75,
    energyCostPS: 10,
    props: { Damage: { damage: [["Slash", S(500)]], range: R(7.5) } }
  },
  {
    id: "Scarab Swarm",
    tags: 3,
    energyCost: 25,
    props: {
      Buff: { effect: [["a", 100]] },
      Damage: { damage: [["Slash", S(200)]], distance: R(30) }
    },
    oneHand: true
  },
  {
    id: "Quiver",
    tags: 16,
    energyCost: 25,
    props: {
      Control: { range: R(6), duration: D(10) },
      Buff: { effect: [["ivb", 1]], duration: D(12), range: R(2.5) }
    }
  },
  {
    id: "Navigator",
    tags: 2,
    energyCost: 25,
    energyCostPS: 3,
    props: { Buff: { target: 1, effect: [["oad", S(500)]] } }
  },
  {
    id: "Prowl",
    tags: 10,
    energyCost: 25,
    props: { Buff: { effect: [["ivb", 1]] } }
  },
  {
    id: "Artemis Bow",
    tags: 2,
    energyCost: 25,
    props: {
      ExaltedWeapon: {
        weaponName: "Artemis Bow",
        effect: [["oad", S(100, -100)]]
      }
    }
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
        distance: R(10)
      }
    },
    oneHand: true
  },
  {
    id: "Ensnare",
    tags: 16,
    energyCost: 50,
    props: { Control: { distance: R(30), duration: D(15) } }
  },
  {
    id: "Venari",
    tags: 32,
    energyCost: 0,
    props: { Summon: { damage: [["Slash", 350]] } }
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
        duration: D(20)
      },
      Control: { distance: R(5), range: R(10), duration: D(20) }
    }
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
        angel: 75
      },
      Special: [{ desc: "banish" }]
    }
  },
  {
    id: "Stasis",
    tags: 16,
    energyCost: 50,
    props: { Control: { duration: D(15) } }
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
        duration: D(18)
      }
    }
  },
  { id: "Cataclysm", tags: 0, energyCost: 100, props: {} },
  {
    id: "Decoy",
    tags: 32,
    energyCost: 25,
    props: { Summon: { health: 200, duration: D(25) } }
  },
  {
    id: "Invisibility",
    tags: 2,
    energyCost: 50,
    props: { Buff: { effect: [["ivb", 1]], duration: D(12) } }
  },
  {
    id: "Switch Teleport",
    tags: 4,
    energyCost: 25,
    props: { Move: { directive: "2", distance: R(75) } }
  },
  {
    id: "Radial Disarm",
    tags: 16,
    energyCost: 100,
    props: { Special: [{ desc: "disarm" }], Control: { range: R(20) } }
  },
  {
    id: "Pull",
    tags: 17,
    energyCost: 25,
    props: {
      Damage: { damage: [["Magnetic", S(300)]], range: R(25), angel: 85 },
      Special: [{ desc: "traction" }]
    }
  },
  {
    id: "Magnetize",
    tags: 17,
    energyCost: 50,
    props: {
      Damage: { damage: [["Blast", S(300)]], duration: D(15), range: R(4) },
      Special: [{ desc: "attractBullets" }]
    },
    oneHand: true
  },
  {
    id: "Polarize",
    tags: 0,
    energyCost: 75,
    props: {
      Damage: { damage: [["Impact", S(400)]], range: R(8), duration: D(5) },
      Special: [{ desc: "recoverShield" }]
    }
  },
  {
    id: "Crush",
    tags: 1,
    energyCost: 100,
    props: { Damage: { damage: [["Magnetic", S(1500)]], range: R(18) } }
  },
  {
    id: "Ballistic Battery",
    tags: 2,
    energyCost: 25,
    props: {
      Buff: { effect: [["exd", S(1600)]], target: 1 },
      Special: [{ desc: "storePerAttack", val: S(140) }]
    }
  },
  {
    id: "Shooting Gallery",
    tags: 18,
    energyCost: 50,
    props: {
      Buff: { effect: [["D", S(25)]], duration: D(30) },
      Control: { range: R(16) }
    }
  },
  {
    id: "Shatter Shield",
    tags: 2,
    energyCost: 75,
    props: {
      DamageReduce: {
        rate: { value: 80, bind: [["t", 0]], maxValue: 95 },
        target: 1
      }
    }
  },
  {
    id: "Peacemaker",
    tags: 1,
    energyCost: 25,
    energyCostPS: 4,
    props: {
      ExaltedWeapon: { weaponName: "Regulators", effect: [["D", S(150)]] }
    }
  },
  {
    id: "Hall Of Mirrors",
    tags: 32,
    energyCost: 25,
    props: {
      Summon: { duration: D(25) },
      Special: [{ desc: "damagePercent", val: S(20) }]
    }
  },
  {
    id: "Sleight Of Hand",
    tags: 1,
    energyCost: 50,
    props: {
      Damage: { damage: [["Impact", S(400)]], duration: D(20), range: R(12) }
    }
  },
  {
    id: "Eclipse",
    tags: 2,
    energyCost: 25,
    props: {
      DamageReduce: { rate: { value: 75, bind: [["t", 0]], maxValue: 95 } },
      Buff: { effect: [["dmg", S(200)]], duration: D(25) }
    }
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
        duration: D(12)
      },
      Control: { duration: D(15), range: R(25) }
    }
  },
  {
    id: "Soul Punch",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(500)]],
        distance: R(50),
        rangeDamage: [["Impact", 100]]
      }
    },
    oneHand: true
  },
  {
    id: "Terrify",
    tags: 16,
    energyCost: 50,
    props: {
      Control: { range: R(15), duration: D(25) },
      Debuff: {
        effect: [["a", { value: -20, bind: [["t", 0]] }]],
        angel: R(15)
      }
    }
  },
  {
    id: "Desecrate",
    tags: 0,
    energyCost: 75,
    props: {
      Special: [{ desc: "extraDrop", val: 54 }, { desc: "range", val: R(25) }]
    }
  },
  {
    id: "Shadows Of The Dead",
    tags: 32,
    energyCost: 100,
    props: { Summon: { range: 10, duration: D(33) } }
  },

  {
    id: "Fire Walker",
    tags: 3,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Heat", S(200)]],
        duration: D(10),
        rangeDamage: [["Heat", S(1250)]]
      },
      Buff: { effect: [["f", 25]] }
    }
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
        range: 50
      }
    }
  },
  {
    id: "Warding Halo",
    tags: 3,
    energyCost: 75,
    props: {
      DamageReduce: { durability: { value: 1000, bind: [[WarframeProperty.Armor, 0, 2.5], [WarframeProperty.AbilityStrength, 0]] }, rate: 90 },
      Special: [{ desc: "invincibleTime", val: 3 }],
      Damage: { damage: [["Heat", S(125)]] }
    }
  },
  {
    id: "Divine Spears",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Puncture", S(600)]],
        range: R(19),
        rangeDamage: [["Impact", S(600)]]
      },
      Control: { duration: D(12), range: R(19) }
    }
  },
  {
    id: "Virulence",
    tags: 1,
    energyCost: 25,
    props: { Damage: { damage: [["Puncture", 200]], angel: 10, range: R(16) } }
  },
  {
    id: "Larva",
    tags: 16,
    energyCost: 50,
    props: { Control: { duration: D(7), range: R(12) } }
  },
  {
    id: "Parasitic Link",
    tags: 2,
    energyCost: 75,
    props: {
      Buff: { effect: [["t", S(25)]] },
      DamageReduce: { rate: { value: 50, bind: [["t", 0]], maxValue: 90 } }
    }
  },
  {
    id: "Ravenous",
    tags: 3,
    energyCost: 100,
    props: {
      Damage: { damage: [["Blast", S(150)]], range: R(8) },
      Buff: { effect: [["hps", S(20)]] }
    }
  },
  {
    id: "Null Star",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Slash", S(200)]], amount: D(6), range: R(12) }
    }
  },
  {
    id: "Antimatter Drop",
    tags: 1,
    energyCost: 50,
    props: { Damage: { damage: [["Radiation", S(200)]] } },
    oneHand: true
  },
  {
    id: "Worm Hole",
    tags: 4,
    energyCost: 75,
    props: { Move: { directive: "0", distance: R(50) } },
    oneHand: true
  },
  {
    id: "Molecular Prime",
    tags: 2,
    energyCost: 100,
    props: { Buff: { range: D(35), duration: D(30), effect: [["oad", 100]] } }
  },
  {
    id: "Mind Control",
    tags: 16,
    energyCost: 25,
    props: { Control: { range: R(60), duration: D(30) } }
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
        range: 60
      }
    },
    oneHand: true
  },
  {
    id: "Chaos",
    tags: 16,
    energyCost: 75,
    props: { Control: { duration: D(25), range: R(25) } }
  },
  {
    id: "Absorb",
    tags: 1,
    energyCost: 25,
    energyCostPS: 4,
    props: { Damage: { damage: [["Magnetic", S(200)]], range: R(10) } }
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
        prjSpeed: 40
      }
    },
    oneHand: true
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
        range: R(15)
      }
    }
  },
  {
    id: "Renewal",
    tags: 2,
    energyCost: 25,
    energyCostPS: 3,
    props: { Buff: { effect: [["hps", S(40)]], range: R(25) } }
  },
  {
    id: "Reckoning",
    tags: 17,
    energyCost: 100,
    props: { Damage: { damage: [["Radiation", S(1250)]], range: R(15) } }
  },
  {
    id: "Mallet",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Blast", S(100)]], range: R(10), duration: D(20) }
    }
  },
  {
    id: "Resonator",
    tags: 32,
    energyCost: 50,
    props: {
      Summon: { duration: D(20), range: R(6), damage: [["Blast", S(125)]] }
    }
  },
  {
    id: "Metronome",
    tags: 2,
    energyCost: 75,
    props: {
      Buff: {
        effect: [["K", S(30)], ["S", S(30)]],
        duration: D(15),
        range: R(12)
      }
    }
  },
  {
    id: "Amp",
    tags: 2,
    energyCost: 100,
    props: { Buff: { effect: [["K", S(200)]], duration: D(30), range: R(14) } }
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
        range: R(2)
      }
    }
  },
  {
    id: "Mesmer Skin",
    tags: 18,
    energyCost: 50,
    props: {
      DamageReduce: { rate: 100, durability: S(6) },
      Control: { duration: D(5) }
    }
  },
  {
    id: "Reave",
    tags: 4,
    energyCost: 75,
    props: { Move: { directive: "0", distance: D(15) } }
  },
  {
    id: "Danse Macabre",
    tags: 1,
    energyCost: 25,
    energyCostPS: 20,
    props: { Damage: { damage: [["Void", S(1250)]] } }
  },
  {
    id: "Rhino Charge",
    tags: 5,
    energyCost: 25,
    props: {
      Move: { directive: "0", distance: R(48) },
      Damage: { damage: [["Impact", S(650)]], range: R(2) }
    }
  },
  {
    id: "Iron Skin",
    tags: 2,
    energyCost: 50,
    props: {
      DamageReduce: {
        durability: { value: 1000, bind: [[WarframeProperty.Armor, 0, 2.5], [WarframeProperty.AbilityStrength, 0]] },
        rate: 100
      }
    }
  },
  {
    id: "Roar",
    tags: 2,
    energyCost: 75,
    props: { Buff: { effect: [["aed", S(50)]], duration: D(30), range: R(25) } }
  },
  {
    id: "Rhino Stomp",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: { damage: [["Blast", S(800)]], range: R(25) },
      Control: { duration: D(8), range: R(25) }
    }
  },
  {
    id: "Spores",
    tags: 0,
    energyCost: 25,
    props: {
      Damage: { damage: [["Corrosive", S(10)]], amount: 3, distance: R(60) }
    },
    oneHand: true
  },
  {
    id: "Molt",
    tags: 32,
    energyCost: 50,
    props: {
      Summon: { health: S(500), duration: D(40), damage: [["Toxin", S(400)]] }
    },
    oneHand: true
  },
  {
    id: "Toxic Lash",
    tags: 2,
    energyCost: 75,
    props: { Buff: { effect: [["6", S(30)]], duration: D(45) } }
  },
  {
    id: "Miasma",
    tags: 1,
    energyCost: 100,
    props: {
      Damage: { damage: [["Viral", S(150)]], duration: D(6), range: R(20) }
    }
  },
  {
    id: "Spellbind",
    tags: 16,
    energyCost: 25,
    props: { Control: { duration: D(16), range: R(5), distance: R(50) } }
  },
  {
    id: "Tribute",
    tags: 3,
    energyCost: 50,
    props: {
      Damage: { damage: [["Impact", S(500)]], distance: R(25) },
      Debuff: { effect: [["dmg", { value: -75 }]], duration: D(12) }
    }
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
        distance: R(25)
      },
      Special: [{ desc: "attractionRadius", val: R(20) }, { desc: "explosionRadius", val: R(8) }]
    }
  },
  {
    id: "Razorwing",
    tags: 1,
    energyCost: 25,
    energyCostPS: 4,
    props: {
      ExaltedWeapon: { weaponName: "Dex Pixia", effect: [["oad", S(100, -100)]] }
    }
  },
  {
    id: "Well Of Life",
    tags: 16,
    energyCost: 25,
    props: { Control: { duration: D(12), distance: R(100) } }
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
        tick: 4
      }
    }
  },
  {
    id: "Link",
    tags: 2,
    energyCost: 75,
    props: {
      DamageReduce: { rate: 75 },
      Buff: { duration: D(12), range: R(20) }
    }
  },
  {
    id: "Blessing",
    tags: 2,
    energyCost: 100,
    props: {
      Buff: { range: 50, duration: D(10), effect: [["hps", S(80)]] },
      DamageReduce: { rate: { value: 50, bind: [["t", 0]], maxValue: 75 } }
    }
  },
  {
    id: "Rip Line",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: { damage: [["Slash", S(60)]], distance: R(75) },
      Move: { directive: "0", distance: R(75) }
    }
  },
  {
    id: "Warcry",
    tags: 2,
    energyCost: 50,
    props: {
      Buff: {
        effect: [["J", S(50)], ["a", S(50)]],
        duration: D(15),
        range: R(25)
      }
    }
  },
  {
    id: "Paralysis",
    tags: 16,
    energyCost: 75,
    props: { Damage: { damage: [["Impact", S(100)]], angel: 45, range: R(10) } }
  },
  {
    id: "Hysteria",
    tags: 1,
    energyCost: 100,
    props: {
      ExaltedWeapon: { weaponName: "Valkyr Talons", effect: [["oad", S(100, -100)]] }
    }
  },
  {
    id: "Tesla",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Electricity", S(150)]], tick: D(10), range: R(12) }
    },
    oneHand: true
  },
  { id: "Minelayer", tags: 0, energyCost: 50, props: {} },
  {
    id: "Bastille",
    tags: 16,
    energyCost: 75,
    props: { Control: { duration: D(15), range: R(10) } }
  },
  {
    id: "Vortex",
    tags: 16,
    energyCost: 100,
    props: { Control: { duration: D(12), range: R(8.5) } }
  },
  {
    id: "Shock",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: { damage: [["Electricity", S(200)]], distance: R(15), tick: 5 }
    },
    oneHand: true
  },
  {
    id: "Speed",
    tags: 2,
    energyCost: 50,
    props: {
      Buff: {
        effect: [["f", S(50)], ["J", S(50)]],
        duration: D(10),
        range: R(25)
      }
    },
    oneHand: true
  },
  {
    id: "Electric Shield",
    tags: 2,
    energyCost: 75,
    props: {
      Buff: { target: 1, effect: [["1", 100], ["eed", 50]], duration: D(25) }
    }
  },
  {
    id: "Discharge",
    tags: 17,
    energyCost: 100,
    props: {
      Damage: {
        damage: [["Electricity", S(1200)]],
        duration: D(6),
        range: R(20)
      },
      Control: { duration: D(6), range: R(20) },
      Special: [{ desc: "chainDistance", val: R(8) }]
    }
  },
  {
    id: "Iron Jab",
    tags: 1,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(800)]],
        range: 10
      },
      Control: {
        range: R(2)
      }
    }
  },
  {
    id: "Defy",
    tags: 2,
    energyCost: 50,
    props: {
      Special: [{ desc: "invincibleTime", val: D(5) }]
    }
  },
  {
    id: "Cloud Walker",
    tags: 4,
    energyCost: 75,
    props: {
      Control: {
        range: R(8)
      }
    }
  },
  {
    id: "Primal Fury",
    tags: 0,
    energyCost: 0,
    energyCostPS: 3,
    props: {
      ExaltedWeapon: {
        weaponName: "Iron Staff",
        effect: [["oad", S(100, -100)]]
      }
    }
  },
  {
    id: "Tail Wind",
    tags: 5,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Slash", S(500)]],
        range: R(2)
      },
      Move: {
        directive: "1",
        distance: R(30)
      },
      Control: {
        range: R(2)
      }
    }
  },
  {
    id: "Airburst",
    tags: 1,
    energyCost: 50,
    props: {
      Damage: {
        damage: [["Slash", S(500)]],
        range: R(8),
        distance: 100
      }
    },
    oneHand: true
  },
  {
    id: "Turbulence",
    tags: 2,
    energyCost: 75,
    props: {
      Buff: {
        desc: "偏转子弹",
        duration: D(20),
        target: 1,
        range: R(6)
      }
    }
  },
  {
    id: "Tornado",
    tags: 49,
    energyCost: 100,
    props: {
      Damage: {
        amount: 4,
        duration: D(20),
        damage: [["Impact", S(120)]],
        range: R(25)
      },
      Control: {
        duration: D(20),
        range: 5
      }
    }
  },
  {
    id: "Elude",
    tags: 2,
    energyCost: 25,
    energyCostPS: 2.5,
    props: {
      Buff: {
        angel: { value: 180, bind: [["g", 0]], maxValue: 360 },
        desc: "闪避",
        target: 1
      }
    }
  },
  {
    id: "Lull",
    tags: 16,
    energyCost: 50,
    props: { Control: { duration: D(20), angel: 30, distance: R(25) } }
  },
  {
    id: "Desolate Hands",
    tags: 0,
    energyCost: 75,
    props: {
      Damage: { damage: [["Puncture", S(250)]], amount: S(8) },
      Debuff: { effect: [["D", { value: -80 }]] }
    }
  },
  {
    id: "Serene Storm",
    tags: 0,
    energyCost: 0,
    props: {
      ExaltedWeapon: { weaponName: "Desert Wind", effect: [["oad", S(100, -100)]] }
    }
  },
  {
    id: "Balefire",
    tags: 1,
    energyCost: 50,
    energyCostN: 100,
    props: { Damage: { damage: [["Electricity", S(500)]] }, ExaltedWeapon: { weaponName: "Balefire" } }
  },
  {
    id: "Shield Pillage",
    tags: 2,
    energyCost: 150,
    props: { Debuff: { desc: "消耗护盾和护甲", duration: D(2), range: R(8), effect: [["s", { value: -25, bind: [["t", 0]] }]] }, Special: [{ desc: "清除负面状态" }] }
  },
  {
    id: "Haven",
    tags: 2,
    energyCost: 250,
    props: { Buff: { effect: [["r", S(80)], ["s", S(500)]] } }
  },
  {
    id: "Aegis Storm",
    tags: 1,
    energyCost: 100,
    energyCostPS: 25,
    props: { Damage: { damage: [["Radiation", S(200)]], rangeDamage: [["Impact", S(500)]] } }
  }
];

export function registerAbilityData(newData: AbilityData[]) {
  _abilityData = newData;
}

export const _warframeData: WarframeData[] = [
  {
    id: "Ash",
    // name: "ash",
    tags: ["DPS", "Tactics"],
    // description: "Ash is great for players looking for a stealthier approach to combat. Lethal abilities are complemented by powers of distraction.",
    health: 150,
    shield: 100,
    armor: 65,
    energy: 100,
    sprint: 1.15,
    passiveDescription: "Bleed effects inflicted on enemies do more damage and last longer.",
    abilities: ["Shuriken", "Smoke Screen", "Teleport", "Blade Storm"],
    aura: "r",
    introduced: "Vanilla",
    polarities: ["r", "r"],
    sex: "Male"
  },
  {
    id: "Ash Prime",
    // name: "ashPrime",
    className: "Ash",
    // description: "Distraction and subterfuge become lethal weapons with Ash Prime. Featuring altered mod polarities for greater customization.",
    health: 150,
    shield: 125,
    armor: 150,
    energy: 100,
    sprint: 1.2,
    introduced: "16.11",
    polarities: ["-", "r", "r"],
    releaseDate: "2015 07 07",
    vaultDate: "2017 05 30",
    estimatedVaultDate: "2017 05 30"
  },
  {
    id: "Atlas",
    // name: "atlas",
    tags: ["Tank", "Control", "Tactics"],
    // description: "Titan of stone, lord of the earthly elementals.",
    health: 100,
    shield: 100,
    armor: 450,
    energy: 150,
    sprint: 0.9,
    passiveDescription: "Becomes immune to Knockdown effects while on the ground.",
    abilities: ["Landslide", "Tectonics", "Petrify", "Rumblers"],
    aura: "r",
    introduced: "17.5",
    polarities: ["-", "d", "r"],
    sex: "Male"
  },
  {
    id: "Banshee",
    // name: "banshee",
    tags: ["DPS", "Support"],
    // description: "Using sonic attacks and acoustic target detection, Banshee is well suited for stealth gameplay and is capable of filling both attack and support roles.",
    health: 100,
    shield: 100,
    armor: 15,
    energy: 150,
    sprint: 1.1,
    passiveDescription: "Weapon noises are hushed so that enemies cannot hear them.",
    abilities: ["Sonic Boom", "Sonar", "Silence", "Sound Quake"],
    aura: "r",
    introduced: "7",
    polarities: ["r", "r"],
    sex: "Female"
  },
  {
    id: "Banshee Prime",
    // name: "bansheePrime",
    className: "Banshee",
    // description: "Banshee Prime assails her foes by manipulating sonic forces to deadly effect. Featuring altered mod polarities for greater customization.",
    health: 100,
    shield: 100,
    armor: 65,
    energy: 175,
    sprint: 1.15,
    passiveDescription: "Weapon noises are hushed so that enemies cannot hear them.",
    abilities: ["Sonic Boom", "Sonar", "Silence", "Sound Quake"],
    introduced: "19.11.5",
    masteryReq: 8,
    polarities: ["r", "r", "-"],
    releaseDate: "2017 02 28",
    vaultDate: "n/a",
    estimatedVaultDate: "2019 01 01"
  },
  {
    id: "Baruuk",
    // name: "baruuk",
    tags: ["DPS", "Tactics"],
    // description: "Beware the fury of the truly patient. Pushed beyond restraint, a reluctant master unleashes the storm within.",
    health: 75,
    shield: 100,
    armor: 150,
    energy: 200,
    sprint: 1.2,
    passiveDescription:
      "Each projectile dodged, each enemy lulled or disarmed, erodes Baruuk’s restraint and fuels the storm within. As Baruuk’s restraint is diminished he becomes more resistant to damage.",
    abilities: ["Elude", "Lull", "Desolate Hands", "Serene Storm"],
    aura: "-",
    exilus: "-",
    introduced: "24.2.0",
    polarities: ["r", "r"],
    sex: "Male"
  },
  {
    id: "Chroma",
    // name: "chroma",
    tags: ["Tactics"],
    // description: "A master of the deadly elements, Chroma can alter his damage output by changing his energy color.",
    health: 100,
    shield: 100,
    armor: 350,
    energy: 150,
    sprint: 1,
    passiveDescription: "Chosen Energy color dictates the type of Elemental damage dealt by abilities.",
    abilities: ["Spectral Scream", "Elemental Ward", "Vex Armor", "Effigy"],
    aura: "r",
    introduced: "16",
    polarities: ["-", "r"],
    sex: "Male"
  },
  {
    id: "Chroma Prime",
    // name: "chromaPrime",
    className: "Chroma",
    // description: "Bind the elements and unleash untold destruction with Chroma Prime. Featuring altered mod polarities for greater customization.",
    health: 100,
    shield: 100,
    armor: 425,
    energy: 200,
    sprint: 1,
    introduced: "23.9",
    masteryReq: 6,
    polarities: ["-", "d", "r", "-"],
    releaseDate: "2018 09 25",
    vaultDate: "n/a",
    estimatedVaultDate: "2020 08 11"
  },
  {
    id: "Ember",
    // name: "ember",
    tags: ["DPS"],
    // description: "Ember is a nightmare for light-armored targets. Ember can super-heat the air which opens up surprising crowd-control possibilities.",
    health: 100,
    shield: 100,
    armor: 100,
    energy: 150,
    sprint: 1.1,
    passiveDescription: "Regenerates Energy and deals more damage while on Fire.",
    abilities: ["Fireball", "Accelerant", "Fire Blast", "World On Fire"],
    aura: "r",
    introduced: "Vanilla",
    polarities: ["-", "-"],
    sex: "Female"
  },
  {
    id: "Ember Prime",
    // name: "emberPrime",
    className: "Ember",
    // description: "Ember Prime offers the same potential for wanton destruction as Ember but provides unique mod polarities, allowing for greater customization.",
    health: 100,
    shield: 125,
    armor: 125,
    energy: 150,
    sprint: 1.1,
    introduced: "11",
    polarities: ["r", "d"],
    releaseDate: "2013 11 20",
    vaultDate: "2015 10 06",
    estimatedVaultDate: "2015 10 06"
  },
  {
    id: "Equinox",
    // name: "equinox",
    tags: ["DPS", "Support", "Control"],
    // description: "Split between day and night, Equinox manifests aggressive and defensive forms at will.",
    health: 100,
    shield: 100,
    armor: 100,
    energy: 150,
    sprint: 1.15,
    passiveDescription: "Health Orbs generate a little Energy, while Energy Orbs restore a bit of Health.",
    abilities: ["Metamorphosis", "Rest & Rage", "Pacify & Provoke", "Mend & Maim"],
    aura: "-",
    introduced: "17",
    polarities: ["d", "r"],
    sex: "Female"
  },
  {
    id: "Equinox Prime",
    // name: "equinox",
    className: "Equinox",
    // description: "Split between day and night, Equinox manifests aggressive and defensive forms at will.",
    health: 125,
    shield: 100,
    armor: 120,
    energy: 165,
    sprint: 1.15,
    passiveDescription: "Health Orbs generate a little Energy, while Energy Orbs restore a bit of Health.",
    abilities: ["Metamorphosis", "Rest & Rage", "Pacify & Provoke", "Mend & Maim"],
    aura: "-",
    introduced: "24.6",
    polarities: ["d", "r"],
    sex: "Female"
  },
  {
    id: "Excalibur",
    // name: "excalibur",
    tags: ["DPS", "Control"],
    // description: "A perfect balance of mobility and offense, Excalibur is the ideal Warframe for new players.",
    health: 100,
    shield: 100,
    armor: 225,
    energy: 100,
    sprint: 1,
    passiveDescription: "Excalibur deals increased damage and attacks faster when wielding swords.",
    abilities: ["Slash Dash", "Radial Blind", "Radial Javelin", "Exalted Blade"],
    introduced: "Vanilla",
    polarities: ["d", "r"],
    sex: "Male"
  },
  {
    id: "Excalibur Prime",
    // name: "excaliburPrime",
    className: "Excalibur",
    // description: "Excalibur Prime is the epitome of mobility and offense, and features the same abilities as Excalibur, but has unique mod polarities installed allowing for greater customization.",
    health: 100,
    shield: 100,
    armor: 300,
    energy: 150,
    sprint: 1,
    aura: "r",
    introduced: "5",
    polarities: ["d", "r", "r"]
  },
  {
    id: "Excalibur Umbra",
    // name: "excaliburUmbra",
    className: "Excalibur",
    // description: "From the shadow of the long night emerges a new Excalibur.",
    health: 100,
    shield: 100,
    armor: 300,
    energy: 150,
    sprint: 1,
    passiveDescription: "Umbra exhibits sentience in combat without Transference control. Attacks faster and deals more damage while wielding swords.",
    abilities: ["Slash Dash", "Radial Howl", "Radial Javelin", "Exalted Blade"],
    aura: "r",
    introduced: "23",
    polarities: ["r", "w", "w", "w"]
  },
  {
    id: "Frost",
    // name: "frost",
    tags: ["DPS", "Tactics", "Control"],
    // description: "By channeling moisture and vapor in the surrounding environment, Frost creates formidable defenses and lethal attacks from sub zero conditions.",
    health: 100,
    shield: 150,
    armor: 300,
    energy: 100,
    sprint: 0.95,
    passiveDescription: "Striking Frost with a melee attack may freeze the attacker.",
    abilities: ["Freeze", "Ice Wave", "Snow Globe", "Avalanche"],
    aura: "d",
    introduced: "6",
    polarities: ["-", "d"],
    sex: "Male"
  },
  {
    id: "Frost Prime",
    // name: "frostPrime",
    className: "Frost",
    // description: "Frost Prime has the same chilling abilities as Frost but provides unique mod polarities, allowing for greater customization.",
    health: 100,
    shield: 175,
    armor: 300,
    energy: 100,
    sprint: 0.95,
    introduced: "7.10",
    polarities: ["-", "d", "d"],
    releaseDate: "2013 05 03",
    vaultDate: "2015 04 01",
    estimatedVaultDate: "2015 04 01"
  },
  {
    id: "Gara",
    // name: "gara",
    tags: ["DPS", "Tank"],
    // description: "The battlefield trembles before Gara's crystalline power, her ringing touch transforming opponents to targets of brittle beauty.",
    health: 100,
    shield: 100,
    armor: 125,
    energy: 150,
    sprint: 1.15,
    passiveDescription: "A chance to create a radial blind when exposed to bright light.",
    abilities: ["Shattered Lash", "Splinter Storm", "Spectrorage", "Mass Vitrify"],
    aura: "d",
    introduced: "22",
    polarities: ["r", "r"],
    sex: "Female"
  },
  {
    id: "Garuda",
    // name: "garuda",
    tags: ["DPS", "Support"],
    // description: "Death's crimson maiden, the blood of Garuda's foes imbue her with strength and vitality.",
    health: 100,
    shield: 100,
    armor: 300,
    energy: 120,
    sprint: 1,
    passiveDescription: "As Garuda nears death, her damage increases.\rSlashes with her talons if no melee weapon is equipped.",
    abilities: ["Dread Mirror", "Blood Altar", "Bloodletting", "Seeking Talons"],
    aura: "r",
    introduced: "24",
    polarities: ["-", "d"],
    sex: "Female",
    lvlUps: [["h", 200], ["e", 125], ["s", 200]]
  },
  {
    id: "Harrow",
    // name: "harrow",
    tags: ["Support", "Control"],
    // description: "Always prepared to sacrifice. This monastic Warframe uses the Void to bolster allies’ defenses and amplify their lethality.",
    health: 100,
    shield: 150,
    armor: 150,
    energy: 100,
    sprint: 1,
    passiveDescription: "Overshield cap doubled.",
    abilities: ["Condemn", "Penance", "Thurible", "Covenant"],
    aura: "-",
    introduced: "21",
    polarities: ["d", "-"],
    sex: "Male"
  },
  {
    id: "Hildryn",
    tags: ["DPS", "Tank", "Tactics"],
    // description: "Always prepared to sacrifice. This monastic Warframe uses the Void to bolster allies’ defenses and amplify their lethality.",
    health: 75,
    shield: 450,
    armor: 300,
    energy: 0,
    sprint: 1,
    passiveDescription: "",
    abilities: ["Balefire", "Shield Pillage", "Haven", "Aegis Storm"],
    aura: "-",
    exilus: "d",
    introduced: "24",
    polarities: ["d", "d"],
    sex: "Female"
  },
  {
    id: "Hydroid",
    // name: "hydroid",
    tags: ["Tactics"],
    // description: "Rising from the ocean depths, Hydroid harnesses the power of water to a devastating effect.",
    health: 100,
    shield: 125,
    armor: 200,
    energy: 125,
    sprint: 1.05,
    passiveDescription: "Slam Attacks have a chance to summon a tentacle.",
    abilities: ["Tempest Barrage", "Tidal Surge", "Undertow", "Tentacle Swarm"],
    aura: "-",
    introduced: "13",
    polarities: ["r", "-"],
    sex: "Male"
  },
  {
    id: "Hydroid Prime",
    // name: "hydroidPrime",
    className: "Hydroid",
    // description: "Command the ocean’s fury with this king of gold and silver. Featuring altered mod polarities for greater customization.",
    health: 100,
    shield: 175,
    armor: 250,
    energy: 150,
    sprint: 1.05,
    introduced: "21.6",
    masteryReq: 5,
    polarities: ["r", "d", "-", "-"],
    releaseDate: "2017 08 29",
    vaultDate: "n/a",
    estimatedVaultDate: "2019 07 16"
  },
  {
    id: "Inaros",
    // name: "inaros",
    tags: ["Tank", "Control"],
    // description: "Risen from the sands, Inaros commands the desert's fearsome power.",
    health: 550,
    shield: 0,
    armor: 200,
    energy: 100,
    sprint: 1,
    passiveDescription: "While bleeding-out, Inaros becomes entombed in a protective Sarcophagus. He can revive himself by draining the life-force from nearby enemies and allies.",
    abilities: ["Desiccation", "Devour", "Sandstorm", "Scarab Swarm"],
    aura: "-",
    exilus: "-",
    introduced: "18.5",
    polarities: ["d", "d"],
    sex: "Male",
    lvlUps: [["h", 300], ["e", 50]]
  },
  {
    id: "Ivara",
    // name: "ivara",
    tags: ["DPS", "Tactics", "Control"],
    // description: "With her quiver of tactical arrows, this huntress prowls unseen and strikes without warning.",
    health: 75,
    shield: 100,
    armor: 65,
    energy: 175,
    sprint: 1.15,
    passiveDescription: "Senses nearby enemies.",
    abilities: ["Quiver", "Navigator", "Prowl", "Artemis Bow"],
    aura: "-",
    introduced: "18",
    polarities: ["d", "-"],
    sex: "Female"
  },
  {
    id: "Khora",
    // name: "khora",
    tags: ["DPS", "Control"],
    // description: "Tenno and beast, red in whip and claw. Khora and her Kavat companion, Venari, embody lethal versatility. Two bodies, one will.",
    health: 125,
    shield: 100,
    armor: 275,
    energy: 125,
    sprint: 1.05,
    passiveDescription: "The ferocious kavat, Venari, fights by Khora’s side and provides her with a speed boost while active. If killed, Venari will reappear after a short time.",
    abilities: ["Whipclaw", "Ensnare", "Venari", "Strangledome"],
    aura: "d",
    exilus: "-",
    introduced: "22.18.0",
    polarities: ["r", "-"],
    sex: "Female"
  },
  {
    id: "Limbo",
    // name: "limbo",
    tags: ["Tank", "Support", "Control"],
    // description: "Limbo manipulates the very planes of existence to divide his enemies and conquer them in the rift.",
    health: 100,
    shield: 75,
    armor: 65,
    energy: 150,
    sprint: 1.15,
    passiveDescription: "Dodge to enter and exit the Rift. Entering leaves behind a small Rift portal. Energy slowly recharges in the Rift, and each enemy killed in there also gives energy.",
    abilities: ["Banish", "Stasis", "Rift Surge", "Cataclysm"],
    aura: "-",
    introduced: "15",
    polarities: ["r", "r"],
    sex: "Male"
  },
  {
    id: "Limbo Prime",
    // name: "limboPrime",
    className: "Limbo",
    // description: "Dance between realms with this golden rift walker. Featuring altered mod polarities for greater customization.",
    health: 100,
    shield: 100,
    armor: 85,
    energy: 175,
    sprint: 1.15,
    introduced: "23.0.3",
    masteryReq: 4,
    polarities: ["r", "r", "-", "d"],
    releaseDate: "2018 06 19",
    vaultDate: "n/a",
    estimatedVaultDate: "2020 05 05"
  },
  {
    id: "Loki",
    // name: "loki",
    tags: ["Tactics"],
    // description: "Desired by advanced players, Loki offers a variety of specialized reconfiguring abilities. The creativity of Loki's powers allows players to master the battlefield through manipulation.",
    health: 75,
    shield: 75,
    armor: 65,
    energy: 150,
    sprint: 1.25,
    passiveDescription: "Able to hang from walls for extended durations of time.",
    abilities: ["Decoy", "Invisibility", "Switch Teleport", "Radial Disarm"],
    aura: "-",
    introduced: "Vanilla",
    polarities: ["d", "r"],
    sex: "Male"
  },
  {
    id: "Loki Prime",
    // name: "lokiPrime",
    className: "Loki",
    // description: "Confuse, deceive and destroy with Loki Prime. Featuring altered mod polarities for greater customization.",
    health: 75,
    shield: 75,
    armor: 65,
    energy: 175,
    sprint: 1.25,
    introduced: "13.7",
    polarities: ["d", "d", "r", "-"],
    releaseDate: "2014 06 11",
    vaultDate: "2016 05 17",
    estimatedVaultDate: "2016 05 17"
  },
  {
    id: "Mag",
    // name: "mag",
    tags: ["DPS"],
    // description: "With full command of surrounding magnetic energy, Mag is an expert at enemy manipulation.",
    health: 75,
    shield: 150,
    armor: 65,
    energy: 125,
    sprint: 1,
    passiveDescription: "Bullet jumping pulls-in nearby items for easy collection.",
    abilities: ["Pull", "Magnetize", "Polarize", "Crush"],
    aura: "r",
    introduced: "Vanilla",
    polarities: ["-", "-"],
    sex: "Female"
  },
  {
    id: "Mag Prime",
    // name: "magPrime",
    className: "Mag",
    // description: "The exquisite Mag Prime offers the same abilities as Mag but with unique mod polarities for greater customization.",
    health: 100,
    shield: 150,
    armor: 65,
    energy: 175,
    sprint: 1,
    introduced: "10",
    polarities: ["-", "-", "r"],
    releaseDate: "2013 09 13",
    vaultDate: "2015 07 07",
    estimatedVaultDate: "2015 07 07"
  },
  {
    id: "Mesa",
    // name: "mesa",
    tags: ["DPS", "Control"],
    // description: "With a steady hand and quick reflexes, Mesa is a true gunfighter.",
    health: 125,
    shield: 75,
    armor: 65,
    energy: 100,
    sprint: 1.1,
    passiveDescription: "Shoot dual-wielded sidearms faster and reload single-handed sidearms more rapidly. Gain bonus health when not using Melee Weapons.",
    abilities: ["Ballistic Battery", "Shooting Gallery", "Shatter Shield", "Peacemaker"],
    aura: "r",
    introduced: "15.5",
    polarities: ["-", "-"],
    sex: "Female"
  },
  {
    id: "Mesa Prime",
    // name: "mesaPrime",
    className: "Mesa",
    // description: "Cast a long shadow with this lethal enforcer. Featuring altered mod polarities for greater customization.",
    health: 135,
    shield: 75,
    armor: 85,
    energy: 125,
    sprint: 1.1,
    introduced: "24.2.2",
    masteryReq: 2,
    polarities: ["-", "-", "d", "r"]
  },
  {
    id: "Mirage",
    // name: "mirage",
    tags: ["Tactics"],
    // description: "A master of illusion, Mirage confounds the enemy in a spectacle of style and power.",
    health: 80,
    shield: 80,
    armor: 65,
    energy: 150,
    sprint: 1.2,
    passiveDescription: "Long-lasting slide and faster acrobatic maneuvers.",
    abilities: ["Hall Of Mirrors", "Sleight Of Hand", "Eclipse", "Prism"],
    aura: "-",
    introduced: "14",
    polarities: ["d", "r"],
    sex: "Female"
  },
  {
    id: "Mirage Prime",
    // name: "miragePrime",
    className: "Mirage",
    // description: "Dazzle the opposition with this golden master of illusion and mayhem. Featuring altered mod polarities allow for greater customization.",
    health: 80,
    shield: 110,
    armor: 150,
    energy: 150,
    sprint: 1.2,
    introduced: "22.7",
    masteryReq: 8,
    polarities: ["d", "d", "-", "r"],
    releaseDate: "2017 12 12",
    vaultDate: "n/a",
    estimatedVaultDate: "2019 10 22"
  },
  {
    id: "Nekros",
    // name: "nekros",
    tags: ["Tactics"],
    // description: "Nekros uses his dark powers to manipulate his enemies, both living and dead.",
    health: 100,
    shield: 90,
    armor: 65,
    energy: 100,
    sprint: 1.1,
    passiveDescription: "Restore a small amount of health with every nearby enemy death.",
    abilities: ["Soul Punch", "Terrify", "Desecrate", "Shadows Of The Dead"],
    introduced: "10",
    polarities: ["d", "r"],
    sex: "Male"
  },
  {
    id: "Nekros Prime",
    // name: "nekrosPrime",
    className: "Nekros",
    // description: "Death's new master. Featuring altered mod polarities allow for greater customization.",
    health: 100,
    shield: 150,
    armor: 65,
    energy: 125,
    sprint: 1.1,
    introduced: "The Silver Grove 3",
    polarities: ["r", "d", "-"],
    releaseDate: "2016 08 23",
    vaultDate: "2018 06 19",
    estimatedVaultDate: "2018 06 19"
  },
  {
    id: "Nezha",
    // name: "nezha",
    tags: ["DPS", "Control"],
    // description: "A petite and playful facade conceals this frame’s immense power.",
    health: 125,
    shield: 50,
    armor: 175,
    energy: 150,
    sprint: 1.15,
    passiveDescription: "Slide faster and go farther.",
    abilities: ["Fire Walker", "Blazing Chakram", "Warding Halo", "Divine Spears"],
    aura: "-",
    introduced: "18.1",
    polarities: ["d", "r"],
    sex: "Male"
  },
  {
    id: "Nidus",
    // name: "nidus",
    tags: ["Tank", "Support"],
    // description: "Command the Infestation to mutate and grow ever more destructive.",
    health: 150,
    shield: 0,
    armor: 300,
    energy: 100,
    sprint: 1,
    passiveDescription: "If Nidus is killed with at least 15 stacks of Mutation, those 15 stacks are consumed; this grants 5 seconds of invulnerability and restores health to 50%.",
    abilities: ["Virulence", "Larva", "Parasitic Link", "Ravenous"],
    aura: "r",
    introduced: "19.5",
    polarities: ["r", "d"],
    sex: "Male",
    lvlUps: [["h", 300], ["e", 50], ["a", 50], ["t", 15]]
  },
  {
    id: "Nova",
    // name: "nova",
    tags: ["Support", "Control", "Tactics"],
    // description: "Nova uses electromagnetic energy to contain and control highly volatile antimatter that fuels her abilities.",
    health: 100,
    shield: 75,
    armor: 65,
    energy: 150,
    sprint: 1.2,
    passiveDescription: "When knocked-over, emit a defensive burst that topples attacking enemies.",
    abilities: ["Null Star", "Antimatter Drop", "Worm Hole", "Molecular Prime"],
    aura: "-",
    introduced: "9",
    polarities: ["r", "r"],
    sex: "Female"
  },
  {
    id: "Nova Prime",
    // name: "novaPrime",
    className: "Nova",
    // description: "Nova Prime wreaks devastation on her enemies using volatile antimatter. Featuring altered mod polarities for greater customization.",
    health: 100,
    shield: 100,
    armor: 65,
    energy: 175,
    sprint: 1.2,
    introduced: "15.7",
    polarities: ["r", "r", "r"],
    releaseDate: "2014 12 16",
    vaultDate: "2016 11 22",
    estimatedVaultDate: "2016 11 22"
  },
  {
    id: "Nyx",
    // name: "nyx",
    tags: ["Tank", "Control"],
    // description: "Mind control and psychic attacks make Nyx a very dangerous foe. Her ability to reach into enemy consciousness and manipulate their behavior can turn the tide of battle.",
    health: 100,
    shield: 100,
    armor: 15,
    energy: 150,
    sprint: 1.1,
    passiveDescription: "Enemies affected by Nyx’s abilities may suddenly choose to lay down their arms.",
    abilities: ["Mind Control", "Psychic Bolts", "Chaos", "Absorb"],
    aura: "-",
    introduced: "6",
    polarities: ["r", "-"],
    sex: "Female"
  },
  {
    id: "Nyx Prime",
    // name: "nyxPrime",
    className: "Nyx",
    // description: "Infiltrate the minds of your enemies with Nyx Prime. Featuring altered mod polarities for greater customization.",
    health: 100,
    shield: 125,
    armor: 50,
    energy: 150,
    sprint: 1.125,
    introduced: "14.8",
    polarities: ["r", "-", "d"],
    releaseDate: "2014 09 23",
    vaultDate: "2016 08 23",
    estimatedVaultDate: "2016 08 23"
  },
  {
    id: "Oberon",
    // name: "oberon",
    tags: ["DPS", "Support"],
    // description: "Equally adept at healing friends or striking down the enemy. Oberon embodies the balance Tenno are sworn to uphold.",
    health: 125,
    shield: 100,
    armor: 150,
    energy: 150,
    sprint: 1,
    passiveDescription: "Allied pets receive health, armor and shield buffs. In addition, your pet receives an instant revive per mission.",
    abilities: ["Smite", "Hallowed Ground", "Renewal", "Reckoning"],
    aura: "r",
    introduced: "11.5",
    polarities: ["r", "r"],
    sex: "Male"
  },
  {
    id: "Oberon Prime",
    // name: "oberonPrime",
    className: "Oberon",
    // description: "Protect the balance with this regal forest guardian. Featuring altered mod polarities for greater customization.",
    health: 125,
    shield: 100,
    armor: 225,
    energy: 175,
    sprint: 1,
    introduced: "20.6.2",
    masteryReq: 8,
    polarities: ["-", "-", "r", "r"],
    releaseDate: "2017 05 30",
    vaultDate: "n/a",
    estimatedVaultDate: "2019 04 09"
  },
  {
    id: "Octavia",
    // name: "octavia",
    tags: ["DPS", "Tactics"],
    // description: "Compose her song and then conduct the mighty Mandachord, turning bass, beat and melody into an anthem of devastation.",
    health: 100,
    shield: 75,
    armor: 125,
    energy: 150,
    sprint: 1.05,
    passiveDescription: "Briefly replenish energy for Octavia and nearby allies when abilities are activated.",
    abilities: ["Mallet", "Resonator", "Metronome", "Amp"],
    aura: "-",
    introduced: "20",
    polarities: ["-", "-"],
    sex: "Female"
  },
  {
    id: "Revenant",
    // name: "revenant",
    tags: ["DPS"],
    // description: "Rise from the broken remains of the Eidolon to seduce an army of zealous thralls.",
    health: 100,
    shield: 225,
    armor: 105,
    energy: 125,
    sprint: 1,
    passiveDescription: "Shield depletion smashes nearby enemies with a knockdown shockwave.",
    abilities: ["Enthrall", "Mesmer Skin", "Reave", "Danse Macabre"],
    aura: "-",
    introduced: "23.5",
    polarities: ["r", "d"],
    sex: "Male"
  },
  {
    id: "Rhino",
    // name: "rhino",
    tags: ["Tactics", "Tank", "Support", "Control"],
    // description: "Rhino is the heaviest Warframe, combining offensive and defensive capabilities.",
    health: 100,
    shield: 150,
    armor: 190,
    energy: 100,
    sprint: 0.95,
    passiveDescription: "Emit a shockwave after landing from a great height.",
    abilities: ["Rhino Charge", "Iron Skin", "Roar", "Rhino Stomp"],
    aura: "r",
    introduced: "Vanilla",
    polarities: ["d", "d"],
    sex: "Male"
  },
  {
    id: "Rhino Prime",
    // name: "rhinoPrime",
    className: "Rhino",
    // description: "Takes Rhino's ground-shaking abilities to the next level with altered mod polarities that offer greater customization.",
    health: 100,
    shield: 150,
    armor: 275,
    energy: 100,
    sprint: 1,
    introduced: "12.4",
    polarities: ["d", "d", "-"],
    releaseDate: "2014 03 06",
    vaultDate: "2016 02 16",
    estimatedVaultDate: "2016 02 16"
  },
  {
    id: "Saryn",
    // name: "saryn",
    tags: ["DPS"],
    // description: "Saryn's venomous attacks are horrifyingly effective against organic and synthetic enemies, and her ability to 'shed' her skin makes her very elusive.",
    health: 125,
    shield: 100,
    armor: 225,
    energy: 150,
    sprint: 0.95,
    passiveDescription: "Status Effects inflicted upon enemies last longer.",
    abilities: ["Spores", "Molt", "Toxic Lash", "Miasma"],
    aura: "d",
    introduced: "7",
    polarities: ["-", "d"],
    sex: "Female"
  },
  {
    id: "Saryn Prime",
    // name: "sarynPrime",
    className: "Saryn",
    // description: "A golden blossom conceals deadly nectar. Featuring altered mod polarities for greater customization.",
    health: 125,
    shield: 100,
    armor: 300,
    energy: 200,
    sprint: 1,
    introduced: "18.4.12",
    polarities: ["-", "d", "r"],
    releaseDate: "2016 02 16",
    vaultDate: "2017 12 12",
    estimatedVaultDate: "2017 12 12"
  },
  {
    id: "Titania",
    // name: "titania",
    tags: ["DPS"],
    // description: "Take flight with this mischievous pixie.",
    health: 100,
    shield: 100,
    armor: 65,
    energy: 100,
    sprint: 1,
    passiveDescription: "Bullet-jump creates a trampoline that enhances bullet-jump maneuvers when used by allies.",
    abilities: ["Spellbind", "Tribute", "Lantern", "Razorwing"],
    aura: "r",
    introduced: "The Silver Grove",
    polarities: ["r", "d"],
    sex: "Female"
  },
  {
    id: "Trinity",
    // name: "trinity",
    tags: ["Support"],
    // description: "Trinity is great for players who prefer a supportive role. Warframes with healing technology are rare making Trinity a great equalizer when the odds are stacked against the Tenno.",
    health: 100,
    shield: 100,
    armor: 15,
    energy: 150,
    sprint: 1,
    passiveDescription: "Revive fallen allies faster and from farther away.",
    abilities: ["Well Of Life", "Energy Vampire", "Link", "Blessing"],
    aura: "d",
    introduced: "Vanilla",
    polarities: ["d", "d"],
    sex: "Female"
  },
  {
    id: "Trinity Prime",
    // name: "trinityPrime",
    className: "Trinity",
    // description: "Become the bastion that defends allies using powerful healing abilities with Trinity Prime. Featuring altered mod polarities for greater customization.",
    health: 100,
    shield: 150,
    armor: 15,
    energy: 150,
    sprint: 1.1,
    introduced: "17.6",
    polarities: ["d", "d", "r", "-"],
    releaseDate: "2015 10 06",
    vaultDate: "2017 08 29",
    estimatedVaultDate: "2017 08 29"
  },
  {
    id: "Valkyr",
    // name: "valkyr",
    tags: ["Tank", "Support"],
    // description: "Forged in the labs of the Zanuka project, the original Valkyr was subject to cruel experiments, leaving her scarred, angry and frighteningly adept at killing.",
    health: 100,
    shield: 50,
    armor: 600,
    energy: 100,
    sprint: 1.1,
    passiveDescription: "Faster recovery from being knocked down.",
    abilities: ["Rip Line", "Warcry", "Paralysis", "Hysteria"],
    aura: "r",
    introduced: "11",
    polarities: ["r", "r"],
    sex: "Female"
  },
  {
    id: "Valkyr Prime",
    // name: "valkyrPrime",
    className: "Valkyr",
    // description: "A proud fighter emerges unscarred by time or malice. Featuring altered mod polarities allow for greater customization.",
    health: 100,
    shield: 50,
    armor: 700,
    energy: 150,
    sprint: 1.1,
    introduced: "19.0.7",
    polarities: ["r", "r", "r"],
    releaseDate: "2016 11 22",
    vaultDate: "2018 09 25",
    estimatedVaultDate: "2018 09 25"
  },
  {
    id: "Vauban",
    // name: "vauban",
    tags: ["Tactics", "Control"],
    // description: "The highly tactical Vauban uses his powers to create deadly traps that can zap, imprison and dimensionally crush enemies.",
    health: 100,
    shield: 75,
    armor: 50,
    energy: 150,
    sprint: 1,
    passiveDescription: "Deal 25% extra damage to incapacitated enemies.",
    abilities: ["Tesla", "Minelayer", "Bastille", "Vortex"],
    aura: "-",
    introduced: "7.11",
    polarities: ["-", "r"],
    sex: "Male"
  },
  {
    id: "Vauban Prime",
    // name: "vaubanPrime",
    className: "Vauban",
    // description: "Transform the battlefield into a weapon with this gilded tactician. Features unique mod polarities for extended customization.",
    health: 100,
    shield: 100,
    armor: 100,
    energy: 150,
    sprint: 1,
    introduced: "18.12",
    polarities: ["-", "r", "d"],
    releaseDate: "2016 05 17",
    vaultDate: "2018 03 20",
    estimatedVaultDate: "2018 03 20"
  },
  {
    id: "Volt",
    // name: "volt",
    tags: ["DPS", "Tactics"],
    // description: "Volt can create and harness electrical elements. This is a high-damage Warframe perfect for players who want a potent alternative to gun-play.",
    health: 100,
    shield: 150,
    armor: 15,
    energy: 100,
    sprint: 1,
    passiveDescription: "Grounded movement generates an electrical charge that is unleashed with the next attack.",
    abilities: ["Shock", "Speed", "Electric Shield", "Discharge"],
    aura: "r",
    introduced: "Vanilla",
    polarities: ["-", "r"],
    sex: "Male"
  },
  {
    id: "Volt Prime",
    // name: "voltPrime",
    className: "Volt",
    // description: "A glorious warrior from the past, Volt Prime features the same abilities as Volt but with unique mod polarities for greater customization.",
    health: 100,
    shield: 150,
    armor: 100,
    energy: 200,
    sprint: 1,
    introduced: "16.1",
    polarities: ["-", "r", "r"],
    releaseDate: "2015 03 24",
    vaultDate: "2017 02 28",
    estimatedVaultDate: "2017 02 28"
  },
  {
    id: "Wukong",
    // name: "wukong",
    tags: ["Tank"],
    // description: "A primal warrior with the heart of a trickster.",
    health: 100,
    shield: 125,
    armor: 225,
    energy: 100,
    sprint: 0.95,
    passiveDescription: "Increased combo duration.",
    abilities: ["Iron Jab", "Defy", "Cloud Walker", "Primal Fury"],
    aura: "r",
    introduced: "17.12",
    polarities: ["-", "d"],
    sex: "Male"
  },
  {
    id: "Zephyr",
    // name: "zephyr",
    tags: ["Tactics"],
    // description: "Specializing in air attacks and mobility, Zephyr dominates from above.",
    health: 150,
    shield: 150,
    armor: 15,
    energy: 100,
    sprint: 1.15,
    passiveDescription: "Move with increased agility while Airborne and fall more slowly.",
    abilities: ["Tail Wind", "Airburst", "Turbulence", "Tornado"],
    aura: "d",
    introduced: "12",
    polarities: ["r", "-"],
    sex: "Female"
  },
  {
    id: "Zephyr Prime",
    // name: "zephyrPrime",
    className: "Zephyr",
    // description: "Take to the skies with this golden bird of destruction.",
    health: 150,
    shield: 150,
    armor: 75,
    energy: 150,
    sprint: 1.2,
    introduced: "22.16.4",
    masteryReq: 6,
    polarities: ["r", "r", "d", "-"],
    releaseDate: "2018 03 20",
    vaultDate: "n/a",
    estimatedVaultDate: "2020 01 28"
  }
];

/** 战甲功能分类 */
export enum WarframeFunction {
  DPS = "DPS", // 输出
  Tactics = "Tactics", // 战术
  Tank = "Tank", // 坦克
  Support = "Support", // 辅助
  Control = "Control" // 控制
}
