import { WarframeData, WarframeProperty, AbilityType, AbilityData } from "./warframe.i";

// 一些工具函数

/** 将属性绑定到技能强度 S(数值, 加数) */
const S = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityStrength, n] as [WarframeProperty, number]] })
/** 将属性绑定到技能持续 D(数值, 加数) */
const D = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityDuration, n] as [WarframeProperty, number]] })
/** 将属性绑定到效率 E(数值, 加数) */
const E = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityEfficiency, n] as [WarframeProperty, number]] })
/** 将属性绑定到技能范围 R(数值, 加数) */
const R = (v: number, n = 0) => ({ value: v, bind: [[WarframeProperty.AbilityRange, n] as [WarframeProperty, number]] })

// data from https://github.com/WFCD/warframe-items
export const _abilityData: AbilityData[] = [
  {
    id: "Shuriken", // https://warframe.huijiwiki.com/wiki/Shuriken
    // name: "shuriken",
    // description: "Launches a spinning blade of pain, dealing high damage and impaling enemies to walls.",
    oneHand: true,
    tags: AbilityType.Damage,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Slash", S(500)]],// 每个手里剑造成100 / 250 / 350 / 500 切割伤害
        amount: 2, // Ash投出1 / 1 / 2 / 2个手里剑
        prjSpeed: 65, // 飞行时间估测
      }
    },
  },
  {
    id: "Smoke Screen", // https://warframe.huijiwiki.com/wiki/Smoke_Screen
    // name: "smokeScreen",
    // description: "Drops a smoke bomb that stuns enemies and obscures their vision, rendering Ash invisible for a short time.",
    tags: AbilityType.Perception,
    energyCost: 50,
    props: {
      Buff: {
        effect: [["ivb", 1]],
        duration: D(8), // 在接下来的2 / 4 / 6 / 8秒内，Ash不会受到敌方的直接攻击
      },
      Control: {
        range: R(10), // Ash丢出一个能击退10米范围内敌人的烟幕弹
        duration: 1,
      }
    }
  },
  {
    id: "Teleport", // https://warframe.huijiwiki.com/wiki/Teleport
    // name: "teleport",
    // description: "Ash teleports towards the target, bringing him into melee range and making enemies vulnerable to finishers.",
    tags: AbilityType.Mobility,
    energyCost: 25,
    props: {
      Move: {
        directive: 2,
        distance: R(60)//瞬移至20 / 45 / 45 / 60米范围
      }
    },
  },
  {
    id: "Blade Storm", // 剑刃风暴 https://warframe.huijiwiki.com/wiki/Blade_Storm
    // name: "bladeStorm",
    // description: "Project fierce shadow clones of Ash upon groups of distant enemies. Join the fray using Teleport.",
    tags: AbilityType.Damage,
    energyCost: 0,
    energyCostN: 12,
    props: {
      Damage: {
        damage: [["True", S(2000)]],// 造成750 / 1000 / 1500 / 2000真实伤害
        distance: R(50), // 50米范围
      }
    },
  },
  {
    id: "Landslide", // https://warframe.huijiwiki.com/wiki/Landslide
    // name: "landslide",
    // description: "Bash enemies with an explosive sliding punch, and repeat for a devastating combo. Petrified enemies take extra damage, and drop Rubble when destroyed. Rubble can heal Atlas and bolster his armor.",
    tags: AbilityType.Damage | AbilityType.Mobility,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(350)]],  // 造成100 / 200 / 300 / 350 点Impact b.png 冲击基础伤害
        distance: R(15),// 距离自身8 / 10 / 12 / 15米处的敌人
      },
      Move: {
        directive: 2,
        distance: R(15),// 距离自身8 / 10 / 12 / 15米处的敌人
      },
    },
  },
  {
    id: "Tectonics", // https://warframe.huijiwiki.com/wiki/Tectonics
    // name: "tectonics",
    // description: "Summon a rock-wall, activate again to send the rocks crashing toward the enemy.",
    tags: AbilityType.Summon,
    energyCost: 50,
  },
  {
    id: "Petrify", // https://warframe.huijiwiki.com/wiki/Petrify
    // name: "petrify",
    // description: "Atlas' hardened gaze will fossilize foes, heal Rumblers, and create Petrified Bulwarks. When shattered, petrified enemies drop healing Rubble for Atlas.",
    tags: AbilityType.Control,
    energyCost: 75,
    props: {
      Control: {
        range: R(14), // Atlas放出石化射线，射线覆盖其前方半径10 / 11 / 12 / 14米
        angel: 60, // 60度角的扇形区域
        duration: D(20), // 并且在5 / 10 / 15 / 20秒内无法行动
      },
      Buff: {
        effect: [["oad", 0.5]]// 被石化的敌人受到的所有来源的伤害都会+50%
      }
    },
  },
  {
    id: "Rumblers", // https://warframe.huijiwiki.com/wiki/Rumblers
    // name: "rumblers",
    // description: "Summon two elemental stone brawlers to the melee. Summoning petrifies enemies in close proximity to Atlas. When finished, Rumblers collapse into a pile of healing Rubble.",
    tags: AbilityType.Summon,
    energyCost: 100,
  },
  {
    id: "Sonic Boom", // https://warframe.huijiwiki.com/wiki/Sonic_Boom
    // name: "sonicBoom",
    // description: "Banshee emits a sonic shockwave that pushes targets in range with enough force to incapacitate or kill attackers.",
    tags: AbilityType.Damage | AbilityType.Control,
    energyCost: 25,
    props: {
      Damage: {
        angel: 180, // 空气中以180度传播
        damage: [["Impact", S(50)]], // 时造成25 / 35 / 40 / 50的Impact b.png 冲击伤害
        distance: R(15), // 这个冲击波会传递10 / 12 / 13 / 15米。
      }
    },
  },
  {
    id: "Sonar", // https://warframe.huijiwiki.com/wiki/Sonar
    // name: "sonar",
    // description: "Using acoustic location, Banshee's Sonar power finds and tracks enemies, and exposes critical weak spots to everyone in your squad.",
    tags: AbilityType.BuffDebuff,
    energyCost: 50,
    props: {
      Buff: {
        effect: [["oad", S(5)]], // 伤害将提升200% / 300% / 400% / 500%。
        range: R(35),// 在20 / 25 / 30 / 35的技能范围内
        duration: D(30),  // 持续10 / 15 / 20 / 30秒
      }
    },
  },
  {
    id: "Silence", // https://warframe.huijiwiki.com/wiki/Silence
    // name: "silence",
    // description: "Using Silence surrounds Banshee in an aura that stuns enemies and will limit their perceptions and tactical response to gunfire and Warframe attacks.",
    tags: 0,
    energyCost: 75,
  },
  {
    id: "Sound Quake", // https://warframe.huijiwiki.com/wiki/Sound_Quake
    // name: "soundQuake",
    // description: "Channeling all of her acoustic energy into the environment, Banshee uses ultrasonic reverberations to violently shake the ground.",
    tags: 0,
    energyCost: 25,
    energyCostPS: 12,
    props: {
      Damage: {
        range: R(20),// 12 / 15 / 18 / 20米范围内的敌人
        damage: [["Blast", S(200)]], // 每秒受到125 / 150 / 175 / 200点Blast b.png 爆炸
      }
    },
    enhance: {
      modName: "Ji",
      energyCost: 100,
      props: {
        Damage: {
          range: R(35), // 额外增加15m的基础范围
          damage: [["Blast", S(4000)]],
        },
      }
    },
  },
  {
    id: "Spectral Scream",
    // name: "spectralScream",
    // description: "Exhale a deep breath of elemental destruction. Chroma's energy color determines the element.",
    tags: AbilityType.Damage,
    energyCost: 25,
    props: {
      Damage: {
        // 喷射扇形区域长度受技能范围影响。计算公式为：10 × (1 + 技能范围)^1/3
        range: R(10), // Chroma向前持续喷出元素能量，对面前4 / 5 / 6.5 / 10米扇形范围内敌人每秒造成100 / 125 / 150 / 200点Heat b.png 火焰, Electricity b.png 电击, Toxin b.png 毒素, 或Cold b.png 冰冻伤害，并附带40% / 45% / 50% / 60%几率触发异常。
        damage: [["Heat", S(200)]],
      },
    }
  },
  {
    id: "Elemental Ward",
    // name: "elementalWard",
    // description: "Depending on Chroma's elemental alignment, an offensive area-of-effect is created. Chroma and its nearby allies are imbued with defensive energy.",
    tags: AbilityType.BuffDebuff,
    energyCost: 50,
    props: {
      Buff: {
        // Chroma释放出光环效果，为6 / 8 / 10 / 12米半径内的友军和自身提供进攻和防御加成。该效果持续10 / 15 / 20 / 25秒。
        effect: [["h", S(2)]], // 基础生命值50% / 75% / 100% / 200%的数量加成
      },
    }
  },
  {
    id: "Vex Armor", // 怨怒护甲
    // name: "vexArmor",
    // description: "When shields are hit, Chroma's armor grows stronger, when health takes a hit, weapon damage increases.",
    tags: AbilityType.BuffDebuff,
    energyCost: 75,
    props: {
      Buff: {
        // 蔑视，每损伤1点护盾就会增加Chroma 0.5% / 0.625% / 0.75% / 0.875% 的护甲，最大加成可以提高至200% / 250% / 300% / 350%。
        // 盛怒，每损伤1点生命值就会增加Chroma 2% / 2.25% / 2.75% 的额外武器伤害，最大加成可以提高至 200% / 225% / 250% / 275% 。
        effect: [
          ["a", S(3.5)],
          ["dmg", S(2.75)]
        ],
      },
    }
  },
  {
    id: "Effigy",
    // name: "effigy",
    // description: "Chroma turns his pelt into a massive sentry that strengthens nearby allies and engulfs enemies in elemental attacks.",
    tags: AbilityType.Summon,
    energyCost: 50,
    energyCostPS: 10,
    props: {
      Summon: {
        // Chroma与其外甲分离，并赋予它元素力量，使它成为一个悬浮于空中的哨兵。哨兵的生命值为1000 / 2000 / 4000 / 8000。哨兵会使用能量喷射攻击20米范围内的敌人，
        // 单次攻击造成100 / 200 / 300 / 400 Heat b.png 火焰, Electricity b.png 电击, Toxin b.png 毒素, 或Cold b.png 冰冻伤害。
        // 哨兵还可以对5米范围内的敌人造成200点Heat b.png 火焰, Electricity b.png 电击, Toxin b.png 毒素, 或Cold b.png 冰冻范围伤害。
        // 另外，哨兵还可以进行怒吼并暂时眩晕30米范围内的敌人。
        health: S(8000),
        range: R(20),
        damage: [["Heat", S(200)]]
      },
    }
  },
  {
    id: "Fireball", // 火球
    // name: "fireball",
    // description: "Charge and release a fiery projectile that ignites enemies on contact and leaves behind a treacherous patch of flame.",
    tags: AbilityType.Damage,
    oneHand: true,
    energyCost: 25,
    props: {
      Damage: {
        // 与敌人接触时造成150 / 275 / 300 / 400Heat b.png 火焰伤害并且100%触发异常状态。
        // 火球还会产生50 / 100 / 125 / 150Heat b.png 火焰范围伤害，有50% 的异常状态触发几率。5米的爆炸范围不受技能范围影响
        damage: [["Heat", S(400)]],
        rangeDamage: [["Heat", S(150)]],
        range: 5,
        prjSpeed: 50,
      }
    }
  },
  {
    id: "Accelerant", // 助燃
    // name: "accelerant",
    // description: "Stun nearby enemies with strong accelerant. Increases all fire damage dealt.",
    tags: AbilityType.BuffDebuff,
    energyCost: 50,
    props: {
      Control: {
        range: R(20),
      },
      Buff: {
        // Ember施放出一波助燃剂，暂时击晕 8 / 12 / 15 / 20米范围内的所有敌人。而Ember自身的技能施放速度也会得到50%的加成，助燃的效果会持续30秒。
        effect: [["c", S(0.5)]],
        duration: D(30),
      },
      Debuff: {
        // 所有中招的敌人会在7 / 10 / 12 / 15秒内对受到的Heat b.png 火焰伤害有150% / 175% / 200% / 250%加成。
        duration: D(15),
        effect: [["fed", S(2.5)]],
      }
    }
  },
  {
    id: "Fire Blast",
    // name: "fireBlast",
    // description: "Slam the ground to create a wave of plasma that incinerates nearby enemies and forms a persistent ring of fire. Add <DT_FIRE>Heat Damage to weapons by firing them through the ring.",
    tags: AbilityType.Damage | AbilityType.BuffDebuff,
    energyCost: 75,
    props: {
      // Ember对地面重击，产生出一个向外扩散至半径5 / 10 / 12 / 15米的爆炎，造成66 / 100 / 141 / 200 Heat b.png 火焰伤害，接触到爆炎的敌人会100%陷入火焰异常，并且会被击退。
      // 之后地面上会形成一个半径4米、粗1米的水平放置的火圈。火圈持续时间为9 / 12 / 15 / 20秒。进入与火圈接触的敌人每秒会受到37 / 112 / 150 / 225Heat b.png 火焰伤害。
      Damage: {
        range: R(15),
        damage: [["Heat", S(200)]]
      },
      Buff: {
        range: R(4),
        effect: [["efd", 0.5]]
      }
    }
  },
  {
    id: "World On Fire",
    // name: "worldOnFire",
    // description: "Blast nearby foes with a burst of fire, and follow that up with a barrage of fireballs against any enemy who dares approach. Over time, these fireballs burn hotter as they consume more energy.",
    tags: AbilityType.Damage,
    energyCost: 25,
    energyCostPS: 5,
    props: {
      Damage: {
        // Ember用手重击地面，对7 / 10 / 12 / 15米范围内最多5个敌人造成250 / 300 / 350 / 400Heat b.png 火焰伤害，并引发一系列的爆炸。
        // 每次爆炸造成250 / 300 / 350 / 400Heat b.png 火焰伤害。每秒大约会出2到4.5次爆炸。所有技能伤害都有10% / 20% / 25% / 35%的异常触发几率。
        range: R(15),
        damage: [["Heat", S(400)]],
        rangeDamage: [["Heat", S(400)]],
      }
    }
  },
  {
    id: "Metamorphosis", // 昼夜交替
    // name: "metamorphosis",
    // description: "Switch forms, temporarily gaining bonus Shields and Armor in Night-Form, or bonus Damage and Speed in Day-Form.",
    tags: AbilityType.BuffDebuff,
    energyCost: 25,
    props: {
      Buff: {
        // Equinox在白昼和黑夜形态之间转换，每种形态都有其特有的能力。每次转化需要1秒左右。转化完成后，Equinox会得到一些暂时属性加成，这些加成会在之后的10 / 15 / 20 / 25秒内逐渐消退。
        duration: D(25),
        // 在切换至黑夜形态后，Equinox会在随后的10 / 15 / 20 / 25秒内得到100 / 150 / 200 / 250的护甲和50 / 75 / 100 / 150的护盾容量加成
        effect: [["a", 2.5], ["s", 1.5]]
      }
    }
  },
  {
    id: "Rest & Rage", // 暂息-怒气
    // name: "restRage",
    // description: "In Night Form, targets are put to sleep. In Day Form, targets become more vulnerable to damage.",
    tags: AbilityType.Control,
    energyCost: 50,
    props: {

    }
  },
  {
    id: "Pacify & Provoke",
    // name: "pacifyProvoke",
    // description: "In Night Form, reduces damage inflicted by nearby enemies. In Day Form, increases Ability Strength of nearby allies.",
    tags: 0,
    energyCost: 75,
  },
  {
    id: "Mend & Maim",
    // name: "mend&Maim",
    // description: "In Night Form, allies are healed with each nearby enemy killed. In Day Form, nearby enemies are bled and then subjected to a wave of slashing force.",
    tags: 0,
    energyCost: 100,
  },
  {
    id: "Slash Dash", // 咖喱
    // name: "slashDash",
    // description: "Dash between enemies while slashing with the Exalted Blade.",
    tags: AbilityType.Damage | AbilityType.Mobility,
    energyCost: 25,
    props: {
      Damage: {
        damage: [["Impact", S(37.5)], ["Puncture", S(37.5)], ["Slash", S(175)]], // 250点基础 15%的Impact b.png 冲击、15%的Puncture b.png 穿刺和70%Slash b.png 切割
        affectBy: "melee",
      },
      Move: {
        directive: 1,
        distance: R(12),// 对前方6 / 8 / 10 / 12米半径
      },
    },
  },
  {
    id: "Radial Blind",
    // name: "radialBlind",
    // description: "Emits a bright flash of light, blinding all enemies in a small radius for several seconds.",
    tags: AbilityType.Control,
    energyCost: 50,
    props: {
      Control: {
        // 使8 / 12 / 15 / 25米范围的敌人失明7 / 10 / 12 / 15秒。
        range: R(25),
        duration: D(15),
      },
    },
  },
  {
    id: "Radial Javelin",
    // name: "radialJavelin",
    // description: "Launches javelins towards enemies, dealing high damage and impaling them to walls.",
    tags: 0,
    energyCost: 75,
    props: {
      // 在15 / 18 / 22 / 25米范围内的 5 / 7 / 10 / 12 个敌人
      // 1000总伤害 3伤害数值均等
      Damage: {
        range: R(25),
        damage: [["Impact", S(333.3)], ["Puncture", S(333.3)], ["Slash", S(333.3)]],
      },
    },
  },
  {
    id: "Exalted Blade",
    // name: "exaltedBlade",
    // description: "Summon a sword of pure light and immense power.",
    tags: 0,
    energyCost: 100,
    props: {
      ExaltedWeapon: {
        weaponName: "Exalted Blade",
        effect: [["oad", S(1, -1)]],
      }
    },
  },
  {
    id: "Radial Howl",
    // name: "radialHowl",
    // description: "Let out ferocious howl that stuns nearby enemies and causes Sentients to shed any built up resistances.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Freeze",
    // name: "freeze",
    // description: "A frigid energy blast that freezes targets in their tracks.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Ice Wave",
    // name: "iceWave",
    // description: "Sends a wave of razor sharp, crystalized ice toward an enemy, dealing heavy damage.",
    tags: 0,
    energyCost: 75,
  },
  {
    id: "Snow Globe",
    // name: "snowGlobe",
    // description: "Frost deep freezes any vapor and moisture in the area, creating a protective sphere with brief invulnerability to boost its strength.",
    tags: AbilityType.Damage | AbilityType.Control,
    energyCost: 100,
  },
  {
    id: "Avalanche",
    // name: "avalanche",
    // description: "Summons a treacherous landslide of ice that instantly freezes and shatters all enemies in its radius.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Shattered Lash",
    // name: "shatteredLash",
    // description: "Lash out with stream of shattered glass, or hold for an arcing strike.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Splinter Storm",
    // name: "splinterStorm",
    // description: "Gara’s armor splinters into a maelstrom of shattered glass. Allies who contact the cloud are fortified against damage.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Spectrorage",
    // name: "spectrorage",
    // description: "Trap enemies in a carousel of mirrors, forcing them to attack visions of their true selves. Destroyed mirrors damage their attackers, as does the collapse of the carousel.",
    tags: 0,
    energyCost: 75,
  },
  {
    id: "Mass Vitrify",
    // name: "massVitrify",
    // description: "Create an expanding ring of molten glass that slowly crystallizes enemies who enter. When the expansion is complete, the ring hardens to block weapons fire. The ring draws extra strength from the health and shields of crystallized enemies. Use Shattered Lash to smash the ring and send razor-sharp glass flying outward.",
    tags: 0,
    energyCost: 100,
  },
  {
    id: "Dread Mirror",
    // name: "dreadMirror",
    // description: "Rip the life force from an enemy and use it as a shield that captures damage, this kills significantly weakened enemies instantly. Charge to channel the captured damage into an explosive projectile.",
    tags: AbilityType.Damage,
    energyCost: 25,
  },
  {
    id: "Blood Altar",
    // name: "bloodAltar",
    // description: "Impale an enemy on an altar of talons and siphon health for Garuda and her allies.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Bloodletting",
    // name: "bloodletting",
    // description: "Garuda sacrifices her health to generate energy.",
    tags: 0,
    energyCost: 0,
  },
  {
    id: "Seeking Talons",
    // name: "seekingTalons",
    // description: "Charge to expand the targeting area, release to send Garuda’s talons careening toward each target in area. Surviving enemies are prone to bleeding.",
    tags: 0,
    energyCost: 100,
  },
  {
    id: "Condemn",
    // name: "condemn",
    // description: "Cast a wave of energy that chains them where they stand. Each enemy held reinforces Harrow’s shields.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Penance",
    // name: "penance",
    // description: "Sacrifice shields to boost reload, and Fire Rate while converting damage inflicted on enemies into health for Harrow and nearby allies.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Thurible",
    // name: "thurible",
    // description: "Channel Harrow’s energy into the Thurible to generate a buff. Once finished, kill enemies to bestow nearby allies with bursts of energy. The more energy channeled the greater the reward for each kill. Headshots produce extra energy.",
    tags: 0,
    energyCost: 75,
  },
  {
    id: "Covenant",
    // name: "covenant",
    // description: "Protect nearby allies with an energy force that absorbs all damage and converts it to a Critical Chance bonus for all those under the Covenant. Headshots are amplified even further.",
    tags: 0,
    energyCost: 10,
  },
  {
    id: "Tempest Barrage",
    // name: "tempestBarrage",
    // description: "Target an area and call down a barrage of liquid fury. Charge this attack to increase the lethality of the onslaught.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Tidal Surge",
    // name: "tidalSurge",
    // description: "Crash through enemies in a ferocious wall of water.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Undertow",
    // name: "undertow",
    // description: "Become a water trap and drown unsuspecting enemies.",
    tags: 0,
    energyCost: 75,
  },
  {
    id: "Tentacle Swarm", // 水男4
    // name: "tentacleSwarm",
    // description: "Tap to spawn watery tentacles from all nearby surfaces to wreak havoc. Charge to increase the number of tentacles and spawn area. Use while in Undertow to have the tentacles emerge from the pool.",
    tags: 0,
    energyCost: 100,
  },
  {
    id: "Desiccation", // 沙甲
    // name: "desiccation",
    // description: "Blast enemies with a wave of cursed sand that blinds them and steals their health.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Devour",
    // name: "devour",
    // description: "Hold power to trap target in quicksand and draw them in for devouring; this steals health and ultimately creates a friendly Sand Shadow.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Sandstorm",
    // name: "sandstorm",
    // description: "Become a whirling spiral of sand that sends enemies flying and devours those trapped in quicksand.",
    tags: AbilityType.Damage | AbilityType.Control,
    energyCost: 75,
    energyCostPS: 10,
  },
  {
    id: "Scarab Swarm",
    // name: "scarabSwarm",
    // description: "Charge to transform Health into hardened Scarab Armor. Discharge to blast enemies with a scarab swarm. Survivors have their Health drained and bestowed on allies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Quiver", // 弓
    // name: "quiver",
    // description: "Cycle through and shoot one of four tactical arrows: Cloak, Dashwire, Noise and Sleep. In the Conclave, use the Null-Shield and Slow Arrows.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Navigator",
    // name: "navigator",
    // description: "Assume control of a projectile and guide it to the target.",
    tags: AbilityType.BuffDebuff,
    energyCost: 25,
    energyCostPS: 3,// 能量消耗： (3 + 2 × 控制时长) 点/秒
  },
  {
    id: "Prowl",
    // name: "prowl",
    // description: "Become invisible and steal loot from unsuspecting enemies or take out prey with deadly headshots.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Artemis Bow",
    // name: "artemisBow",
    // description: "Summon a mighty bow and unleash a volley of devastating arrows.",
    tags: AbilityType.BuffDebuff,
    energyCost: 25,
    props: {
      ExaltedWeapon: {
        weaponName: "Artemis Bow",
        effect: [["oad", S(1, -1)]],
      }
    }
  },
  {
    id: "Whipclaw", // 猫
    // name: "whipclaw",
    // description: "Send enemies reeling with a deafening whipcrack.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Ensnare",
    // name: "ensnare",
    // description: "Bind a hapless target in living metal, entangling others who stray too close. Whipclaw will refresh the trap allowing it to capture more enemies.",
    tags: AbilityType.Control,
    energyCost: 50,
    props: {
      // 15 / 20 / 25 / 30米内
      // 困于活动的金属10 / 12 / 13 / 15秒
      Control: {
        distance: R(30),
        duration: D(15),
      },
    },
  },
  {
    id: "Venari",
    // name: "venari",
    // description: "Command Venari to focus on a target. Hold to cycle between Attack, Protect, and Heal postures. If Venari is killed, use this ability to revive her instantly.",
    tags: AbilityType.Summon,
    energyCost: 0,
  },
  {
    id: "Strangledome",
    // name: "strangledome",
    // description: "Weave a dome of living chain that ensnares and strangles any enemy within, and any foolish enough to approach. Foes outside the trap will try to hasten their comrade's deaths by shooting them. Crack Whipclaw on the dome to further damage any trapped enemies.",
    tags: AbilityType.Damage | AbilityType.Control,
    energyCost: 100,
    props: {
      // 持续5 / 10 / 15 / 20秒
      Damage: {
        // 250 333分布
        damage: [["Impact", S(80)], ["Puncture", S(80)], ["Slash", S(90)]],
        // 5 m (穹顶半径)
        // 5 / 5 / 6 / 10 米 (抓取半径)
        distance: R(5),
        range: R(10),
        duration: D(20),
      },
      Control: {
        distance: R(5),
        range: R(10),
        duration: D(20),
      },
    },
  },
  {
    id: "Banish", // 小明
    // name: "banish",
    // description: "Casts a wave of Rift energy that damages hostiles while pushing enemies and allies out of Limbo’s current plane of existence.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Stasis",
    // name: "stasis",
    // description: "Freezes Rift-bound enemies. While active, enemy projectiles are arrested in mid-air, resuming its trajectory when stasis ends.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Rift Surge",
    // name: "riftSurge",
    // description: "Surges nearby Rift-bound enemies with Rift energy. When killed the Rift Surge is transferred to a nearby enemy outside the rift. Surged enemies that leave the Rift perform a radial Banish.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Cataclysm",
    // name: "cataclysm",
    // description: "A violent blast of Void energy tears open a pocket of rift plane which can sustain itself for a short period before collapsing in another lethal blast.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Decoy",
    // name: "decoy",
    // description: "Loki deploys a holographic copy of himself, drawing enemy fire.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Invisibility",
    // name: "invisibility",
    // description: "Loki camouflages himself, becoming invisible to enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Switch Teleport",
    // name: "switchTeleport",
    // description: "Loki instantaneously swaps positions with a target, confusing the enemy.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Radial Disarm",
    // name: "radialDisarm",
    // description: "Lets forth a wave of energy, disrupting the projectile weapons of enemies in range and forcing them to revert to melee combat.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Pull",
    // name: "pull",
    // description: "Magnetic force pulls enemies toward you, stunning them and bringing them into melee range.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Magnetize",
    // name: "magnetize",
    // description: "Creates a magnetic field around a target, ensnaring nearby enemies and dealing damage over time. The field reacts to bullets and shards created from Polarize to increase the damage.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Polarize",
    // name: "polarize",
    // description: "Emit an energy pulse that depletes enemy shields and armor, creating shards which become deadly when mixed with Magnetize. Shields of allies touched by the pulse are restored.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Crush",
    // name: "crush",
    // description: "Magnetizes the bones of nearby enemies, causing them to collapse upon themselves.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Ballistic Battery",
    // name: "ballisticBattery",
    // description: "When activated, this power stores damage caused by guns. When triggered again, that damage is channelled through the next gunshot.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Shooting Gallery",
    // name: "shootingGallery",
    // description: "Gives an ally extra damage while jamming the guns of nearby enemies. This power shifts between team members.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Shatter Shield",
    // name: "shatterShield",
    // description: "Envelops Mesa in a barrier of energy, reflecting back incoming bullet damage.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Peacemaker",
    // name: "peacemaker",
    // description: "With intense focus, Mesa draws her Regulator pistols, shooting down her foes in rapid succession.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Hall Of Mirrors",
    // name: "hallOfMirrors",
    // description: "Mirage creates an entourage of doppelgangers to confuse and distract the enemy.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Sleight Of Hand",
    // name: "sleightOfHand",
    // description: "Booby trap nearby objects while conjuring an irresistible jewel that bursts with radial blind when touched in darkness, or a radial explosion in light. Conjure multiple smaller jewels with the help of Hall of Mirrors.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Eclipse",
    // name: "eclipse",
    // description: "Standing in light, Mirage deals heavy damage, while the shadows make Mirage difficult to track and even harder to hurt.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Prism",
    // name: "prism",
    // description: "Fires an energy prism that shoots lasers in all directions. Activating again detonates the prism, blinding nearby foes.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Soul Punch",
    // name: "soulPunch",
    // description: "A blow so powerful, it turns the enemy's very soul into a deadly projectile, damaging all in its path.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Terrify",
    // name: "terrify",
    // description: "Cast fear into the hearts of nearby enemies, causing them to run away in terror.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Desecrate",
    // name: "desecrate",
    // description: "Forces fallen enemies around you to drop additional loot.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Shadows Of The Dead",
    // name: "shadowsOfTheDead",
    // description: "Summon shadow versions of vanquished enemies to fight alongside you for a short period.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Fire Walker",
    // name: "fireWalker",
    // description: "Blaze a trail of flames, scorching enemies and cleansing allies. Teleporting blasts the landing area with a ring of fire.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Blazing Chakram",
    // name: "blazingChakram",
    // description: "Hurl a flaming ring that sets enemies ablaze making them vulnerable to any damage. Flaming enemies drop Restorative Orbs on death. Charge to amplify the power of the ring, and reactivate to instantly travel to the ring's location.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Warding Halo", // 混天火绫
    // name: "wardingHalo",
    // description: "Create a protective ring of fire, that also stuns and damages enemies who get too close.",
    tags: AbilityType.BuffDebuff,
    energyCost: 75,
    props: {
    }
  },
  {
    id: "Divine Spears", // 圣火尖枪
    // name: "divineSpears",
    // description: "Impale nearby enemies on spears that erupt from the below. Activate again to slam surviving enemies back into the ground.",
    tags: AbilityType.Damage | AbilityType.Control,
    energyCost: 100,
    props: {
      Damage: {
        // 光枪从地面爆发，刺穿半径10 / 13 / 16 / 19米内的敌人
        // 并造成150 / 300 / 450 / 600点Puncture b.png 穿刺伤害。
        // 在技能持续时间结束或玩家手动解除技能（默认4）后，被刺穿的敌人会被砸到地面并受到 150 / 300 / 450 / 600点Impact b.png 冲击 伤害。
        damage: [["Puncture", S(600)]],
        range: R(19),
      },
      Control: {
        // 并将其钉在原地6 / 8 / 10 / 12秒。在此期间，敌人无法移动或攻击。
        duration: D(12),
        range: R(19),
      }
    }
  },
  {
    id: "Virulence",
    // name: "virulence",
    // description: "Rupture the ground with a damaging fungal growth that steals energy from each enemy it strikes. For every five enemies hit, the Infestation mutates, multiplying its destructive force.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Larva",
    // name: "larva",
    // description: "Spawn an Infested pod that erupts with tendrils, latches onto nearby enemies and pulls them in.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Parasitic Link",
    // name: "parasiticLink",
    // description: "Bind to a target with a parasitic link. For allies, both the host and Nidus deal increased damage. Linked enemies take the damage inflicted on Nidus.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Ravenous",
    // name: "ravenous",
    // description: "Gluttonous maggots swarm nearby enemies, feasting until they are hit with Virulence and burst with Infestation. The maggots benefit from Mutation and each enemy hit adds to the Mutation stack.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Null Star",
    // name: "nullStar",
    // description: "Creates antimatter particles that orbit Nova and seek nearby targets. Each active particle gives +5% damage reduction to Nova's health, stacking up to 90%.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Antimatter Drop",
    // name: "antimatterDrop",
    // description: "Launches a contained particle of antimatter that will detonate upon collision with increased deadliness when targeted by weapons.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Worm Hole",
    // name: "wormHole",
    // description: "Creates a wormhole allowing instantaneous travel.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Molecular Prime",
    // name: "molecularPrime",
    // description: "Primes all enemies in a radius with volatile antimatter.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Mind Control",
    // name: "mindControl",
    // description: "Nyx invades the psyche of a target, confusing enemies and making them fight for the Tenno cause.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Psychic Bolts",
    // name: "psychicBolts",
    // description: "Nyx launches a cluster of force bolts at enemies, using telekinesis to adjust flight paths and seek nearby targets.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Chaos",
    // name: "chaos",
    // description: "With a powerful psychic blast, Nyx causes mass hysteria on the battlefield by confusing all enemies to attack random factions.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Absorb",
    // name: "absorb",
    // description: "Nyx absorbs all incoming damage and channels that collected energy into an explosive radial discharge.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Smite",
    // name: "smite",
    // description: "Focuses deadly energy within a target and then projects it outwards, damaging both the target and surrounding enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Hallowed Ground",
    // name: "hallowedGround",
    // description: "Sanctifies the ground before Oberon with righteous fire, inflicting damage to any enemy that stands in the flames.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Renewal",
    // name: "renewal",
    // description: "Healing waves of energy flow outward from Oberon to his allies, regenerating Health over time.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Reckoning",
    // name: "reckoning",
    // description: "Quickly lifts enemies into the air and then hurls them down with conviction. Enemies who succumb to this power have a chance to spawn a Health Sphere.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Mallet",
    // name: "mallet",
    // description: "Rhythmically beats damage into nearby enemies and draws their fire. Damage inflicted on the Mallet increases its lethality.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Resonator",
    // name: "resonator",
    // description: "Launches a rollerball that charms foes to follow it. Combines with the Mallet to create a roving ball of sonic destruction.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Metronome",
    // name: "metronome",
    // description: "Grants buffs to those who consistently perform actions in time to Octavia’s music. Timed jumps offer the Vivace speed buff. Crouching on the beat grants cloaking with the Nocturne buff. Firing rhythmically bestows Opera multishot buff. Timed melee swings give the Forte damage buff.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Amp",
    // name: "amp",
    // description: "Draws power from the decibel level of sound in the area and uses it to amplify a damage buff for Octavia and her allies. It also doubles the damage and range of nearby Mallets.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Enthrall",
    // name: "enthrall",
    // description: "Convert a target into a zealous thrall. Thralls turn on their allies and enthrall through damage. On death, they disintegrate into a damaging pillar of energy. The thrall horde remains under Revenants spell until this ability runs out.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Mesmer Skin",
    // name: "mesmerSkin",
    // description: "Become enveloped in Sentient energy, redirecting damage and stunning all those who dare attack. Stunned enemies can be Enthralled at no energy cost.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Reave",
    // name: "reave",
    // description: "Dash through enemies as a wall of sentient energy, leeching shields and health from any encountered, enhanced for thralls.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Danse Macabre",
    // name: "danseMacabre",
    // description: "Erupt with a multitude of Eidolon energy beams and sweep a circle of death around Revenant. The beams will modify their Damage Type to target select defenses, while incoming damage is redirected back into the beams. Hold fire to boost Status Effects and Damage, at the cost of increased energy consumption. Thralls killed by this ability leave overshield pickups.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Rhino Charge",
    // name: "rhinoCharge",
    // description: "Rhino charges towards a target, clobbering any in his path and goring his victim.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Iron Skin",
    // name: "ironSkin",
    // description: "Rhino hardens his skin, insulating himself from all damage.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Roar",
    // name: "roar",
    // description: "Grants all nearby Warframes increased damage for a short duration.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Rhino Stomp",
    // name: "rhinoStomp",
    // description: "Rhino stomps with force sufficient to disrupt time, tumbling enemies around him in stasis.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Spores",
    // name: "spores",
    // description: "Inflict a target with a pox of <DT_CORROSIVE>Corrosive spores. Spread spores to nearby enemies by destroying them or killing their host. The longer the Spore spreads, its damage will increase.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Molt",
    // name: "molt",
    // description: "Shedding her skin like a snake, Saryn leaves a decoy behind to draw fire from enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Toxic Lash",
    // name: "toxicLash",
    // description: "While active, attacks deal additional <DT_POISON>Toxin Damage; this effect is doubled for Melee Strikes. Instantly burst spores when attacking afflicted enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Miasma",
    // name: "miasma",
    // description: "Release a poisonous miasma that deals <DT_VIRAL>Viral Damage to enemies in range. Foes afflicted by spores are more susceptible to the mist.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Spellbind",
    // name: "spellbind",
    // description: "Enemies fumble their weapons as they are whisked into the air. Nearby allies become immune to Status Effects.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Tribute",
    // name: "tribute",
    // description: "Extract an offering from an enemy in the form of a random Ability Buff. Survivor’s attacks are weakened.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Lantern",
    // name: "lantern",
    // description: "Create a swarm of razorflies that transform an enemy into an irresistible floating beacon, attracting witless comrades and finally exploding.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Razorwing",
    // name: "razorwing",
    // description: "Shrink down and take flight, while razorflies attack nearby enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Well Of Life",
    // name: "wellOfLife",
    // description: "Create a well of life on an enemy. Allies will gain health when damaging the target.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Energy Vampire",
    // name: "energyVampire",
    // description: "Allies will gain energy over time when enemies are marked with Energy Vampire.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Link",
    // name: "link",
    // description: "Any damage taken while Link is active will be channeled to a nearby enemy.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Blessing",
    // name: "blessing",
    // description: "Restore the health and shields of allies within Trinity's affinity aura while giving them some damage resistance.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Rip Line",
    // name: "ripLine",
    // description: "Valkyr hurls forth a hook. If it hits an enemy, she pulls them to her. If it hits terrain, she pulls herself to the hook's location.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Warcry",
    // name: "warcry",
    // description: "Valkyr lets out a rallying cry that bolsters her allies melee speed while slowing down nearby enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Paralysis",
    // name: "paralysis",
    // description: "Valkyr unleashes her shields, stunning and damaging enemies around her.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Hysteria",
    // name: "hysteria",
    // description: "Valkyr is imbued with energy and becomes a ball of vicious rage, capable of unleashing a torrent of deadly claw attacks on unsuspecting foes.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Tesla",
    // name: "tesla",
    // description: "Launches a grenade that holds an electrical charge, zapping enemies that come within range.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Minelayer",
    // name: "minelayer",
    // description: "Cycle through four deployable trap mines: Bounce, Trip Laser, Shred and Concuss.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Bastille",
    // name: "bastille",
    // description: "Creates an energy-based containment field in which captives are held suspended in stasis.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Vortex",
    // name: "vortex",
    // description: "Creates a whirling mass of energy that violently attracts nearby enemies, crushing their atoms into a tiny spec of matter.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Shock",
    // name: "shock",
    // description: "Launches a shocking projectile. It stuns and deals high damage to a single target and chains damage to nearby enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Speed",
    // name: "speed",
    // description: "Gain a brief boost of Movement Speed which affects all allies in range.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Electric Shield",
    // name: "electricShield",
    // description: "Volt deploys an obstacle of energy, providing cover in any situation.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Discharge",
    // name: "discharge",
    // description: "Paralyze nearby hostiles with a damaging electric charge, this also shocks approaching enemies.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Iron Jab",
    // name: "ironJab",
    // description: "Explode the iron staff to its true length, knocking down anything in its path.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Defy",
    // name: "defy",
    // description: "Escape death by receiving a boost of health when killed.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Cloud Walker",
    // name: "cloudWalker",
    // description: "Evaporate into a cloud of mist and float through the battlefield.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Primal Fury",
    // name: "primalFury",
    // description: "Summon the iron staff and unleash fury.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Tail Wind",
    // name: "tailWind",
    // description: "From the ground, charge and release to launch Zephyr into an airborne hover. From the air, tap to dash forward, or aim down to dive bomb enemies below.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Airburst",
    // name: "airburst",
    // description: "Generate a burst of massively dense air that explodes on contact and sends enemies flying. Launch Airbursts into Tornadoes to make them grow.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Turbulence",
    // name: "turbulence",
    // description: "Creates a wind shield around Zephyr, redirecting all incoming projectiles.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Tornado",
    // name: "tornado",
    // description: "Create deadly tornadoes that seek out and engulf enemies. Tornadoes deal the elemental Damage Type they absorb the most. Shoot enemies engulfed in Tornadoes to do additional damage.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Elude",
    // name: "elude",
    // description: "Dodge all incoming projectiles, but only while not attacking. Use again to deactivate this ability.",
    tags: 0,
    energyCost: 25,
  },
  {
    id: "Lull",
    // name: "lull",
    // description: "A calming wave slows enemies until they fall into a slumber. Enemies woken by damage will be confused and disoriented. Short-term amnesia means all waking enemies forget anything that happened before the lull.",
    tags: 0,
    energyCost: 50,
  },
  {
    id: "Desolate Hands",
    // name: "desolateHands",
    // description: "Summon a bevy of orbiting daggers to seek out enemy guns, destroying them with a small explosion. Combine with Elude to double the range.",
    tags: 0,
    energyCost: 75,
  },
  {
    id: "Serene Storm",
    // name: "sereneStorm",
    // description: "With his Restraint eroded, Baruuk commands the Desert Wind to deliver powerful radial strikes with his fists and feet. Each moment commanding the storm restores his Restraint.",
    tags: 0,
    energyCost: 0,
  }
];
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
    sex: "Male",
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
    id: "Baruuk",
    // name: "baruuk",
    tags: ["DPS", "Tactics"],
    // description: "Beware the fury of the truly patient. Pushed beyond restraint, a reluctant master unleashes the storm within.",
    health: 75,
    shield: 100,
    armor: 150,
    energy: 200,
    sprint: 1.2,
    passiveDescription: "Each projectile dodged, each enemy lulled or disarmed, erodes Baruuk’s restraint and fuels the storm within. As Baruuk’s restraint is diminished he becomes more resistant to damage.",
    abilities: ["Elude", "Lull", "Desolate Hands", "Serene Storm"],
    aura: "-",
    exilus: "-",
    introduced: "24.2.0",
    polarities: ["r", "r"],
    sex: "Male"
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
    polarities: ["d", "r", "r"],
  }, {
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
    polarities: ["r", "w", "w", "w"],
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
    polarities: ["-", "-", "d", "r"],
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
    id: "Nova",
    // name: "nova",
    tags: ["Support", "Control"],
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  DPS = "DPS",// 输出
  Tactics = "Tactics",// 战术
  Tank = "Tank",// 坦克
  Support = "Support",// 辅助
  Control = "Control",// 控制
}
