import { i18n } from "@/i18n";

/**
 * 通用属性
 */
export interface CommonProperty {
  id: string;
  nopercent?: boolean;
  dmg?: boolean;
  noplus?: boolean;
  negative?: boolean;
}

export const CommonPropertyDataBase: { [key: string]: CommonProperty } = [
  // 基础
  { id: "0", dmg: true }, // 暴击率 Critical Chance
  { id: "1", dmg: true }, // 暴击伤害 Critical Damage
  { id: "2" }, // 触发率
  { id: "3" }, // 触发时间
  { id: "4", dmg: true }, // 火伤 Heat
  { id: "5", dmg: true }, // 冰伤 Cold
  { id: "6", dmg: true }, // 毒伤 Toxin
  { id: "7", dmg: true }, // 电伤 Electricity
  { id: "8", dmg: true }, // 冲击 Impact
  { id: "9", dmg: true }, // 穿刺 Puncture
  { id: "A", dmg: true }, // 切割 Slash
  { id: "G", dmg: true }, // G系伤害 Damage to Grineer
  { id: "I", dmg: true }, // I系伤害 Damage to Infested
  { id: "C", dmg: true }, // C系伤害 Damage to Corpus
  { id: "D", dmg: true }, // 伤害 Damage
  { id: "S", dmg: true }, // 多重 Multishot
  { id: "R", dmg: true }, // 射速 Fire Rate
  { id: "L", dmg: true }, // 弹匣 Magazine Capacity
  { id: "F", dmg: true }, // 装填
  { id: "M" }, // 弹药 Ammo Maximum
  { id: "P" }, // 穿透
  { id: "H" }, // 变焦
  { id: "V" }, // 弹道 Projectile Flight Speed
  { id: "Z" }, // 后坐
  { id: "K", dmg: true }, // 近战伤害
  { id: "T" }, // 范围 Range
  { id: "J", dmg: true }, // 攻速 Attack Speed
  { id: "B", dmg: true }, // 导引伤害
  { id: "U" }, // 导引效率
  { id: "N", nopercent: true }, // 连击 Combo Duration
  { id: "E", dmg: true }, // 滑暴 Critical Hit Chance for Slide Attack
  { id: "X" }, // 处决 Finisher Damage
  // 战甲
  { id: "h", }, // Health
  { id: "s", }, // Shield
  { id: "a", }, // Amror
  { id: "e", }, // Energy
  { id: "f", }, // Sprint
  { id: "r", }, // ShieldRecharge
  { id: "t", }, // AbilityStrength S=>t
  { id: "u", }, // AbilityDuration D=>u
  { id: "x", }, // AbilityEfficiency E=>x
  { id: "g", }, // AbilityRange R=>g
  { id: "c", }, // CastSpeed
  { id: "k", }, // KnockdownResistance
  { id: "y", }, // KnockdownRecovery h=>y
  { id: "l", }, // Slide
  { id: "i", }, // Friction F=>i
  { id: "v", }, // ParkourVelocity
  { id: "z", }, // QuickThinking
  { id: "rg", }, // Rage A=>rg
  { id: "hc", nopercent: true, }, // HealthConversion
  { id: "ec", }, // EnergyConversion
  { id: "tr", }, // TauResist
  { id: "as", }, // AuraStrength
  { id: "ae", }, // AuraEffectiveness
  { id: "at", }, // AimGlideWallLatchTime
  { id: "er", nopercent: true, }, // EnemyRadar
  { id: "lr", nopercent: true, }, // LootRadar
  { id: "ea", nopercent: true, }, // extra armor
  { id: "fsr", }, // fully shield recovery
  { id: "psr", }, // persecond shield recovery
  { id: "phr", }, // persecond health recovery
  { id: "ivb", }, // invisible
  { id: "ehb", }, // extra health orb
  { id: "eeb", }, // extra energy orb
  { id: "rgd", }, // range knockdown
  { id: "tt", }, // team AbilityStrength
  { id: "ab", }, // Resistance to that Damage Type for 10s. Stacks up to 90%.
  { id: "cc", }, // Counter Chance
  { id: "ddb", }, // Damage during Bleedout
  { id: "pr", }, // Toxin Resistance
  { id: "rr", }, // Radiation Resistance
  { id: "drk", }, // Damage Resistance on Knockdown
  { id: "cr", }, // Cold Resistance
  { id: "fr", }, // Heat Resistance
  { id: "ir", }, // Electricity Resistance
  { id: "ll", }, // chance to unlock locked lockers
  { id: "br", }, // Bleedout Reduction
  { id: "apc", }, // Auto Parry Chance
  { id: "sr", }, // Faster Stagger Recovery
  { id: "fl", }, // Flight Speed (Archwing)
  { id: "es", }, // Energy Rate (Aura)
  { id: "ap", }, // Ammo Pickup (Aura)
  { id: "ev", }, // Evasion
  { id: "m", }, // Movement Speed when Aiming
  { id: "wc", }, // Shield Resistance to Ice Levels
  { id: "adr", }, // Reduces damage by |val|% when Airborne.
  { id: "her", }, // EnergyOnHeadshotRifle
  { id: "ens", }, // Enemy Shield
  { id: "ena", }, // Enemy Amror
  { id: "ref", }, // % Damage taken is reflected when Blocking attacks while Channeling.
  { id: "hps", nopercent: true }, // Heal Rate/s
  { id: "eac", }, // % Hit Chance
  { id: "esp", }, // % Speed
  // 集团
  { id: "vp", nopercent: true }, // 'Purity'
  { id: "vt", nopercent: true }, // 'Truth'
  { id: "ve", nopercent: true }, // 'Entropy'
  { id: "vs", nopercent: true }, // 'Sequence'
  { id: "vj", nopercent: true }, // 'Justice'
  { id: "vb", nopercent: true }, // 'Blight'

  // 其他
  { id: "acc" }, // 精准
  { id: "range", nopercent: true }, // 射程
  { id: "stick" }, // 壁面附着
  { id: "aimm" }, // 瞄准移速
  { id: "ckm" }, // 移动速度
  { id: "od", dmg: true }, // O系伤害
  { id: "kb", nopercent: true, noplus: true }, // 死亡爆炸
  { id: "brad" }, // 爆炸半径 Blast Radius
  { id: "sp" }, // 魔改
  { id: "hr" }, // 拔枪速度 Holster Speed
  { id: "fsb", dmg: true }, // 首发伤害 Damage on first shot in Magazine
  { id: "am" }, // 弹药转换
  { id: "hm", dmg: true }, // 爆头倍率 to Headshot Multiplier
  { id: "bsc" }, // 基础触发几率
  { id: "da", dmg: true }, // 正中红心 Dead Aim
  { id: "oad", dmg: true }, // 最终伤害
  { id: "lal" }, // 自动装填
  { id: "spr" }, // 扩散 Spread
  { id: "slc" }, // 消音 Reduces the chance an enemy will hear gunfire by
  { id: "bnc", nopercent: true }, // 反弹 Bounce
  { id: "exp", dmg: true }, // 爆炸 Chance to Explode (Use with Caution)
  { id: "ls" }, // 生命窃取 Life Steal
  { id: "maga", nopercent: true }, // 加法弹匣容量
  { id: "bldr", dmg: true }, // 连击暴击率 Critical Chance stacks with Combo Multiplier
  { id: "sccm" }, // 连击触发几率 Status Chance per Combo Multiplier
  { id: "ccws" }, // 切割增加连击数 chance to increase Melee Combo Counter when <DT_SLASH>Slash Status deals damage.
  { id: "bsk", dmg: true }, // 最终攻速 Attack Speed (Max: 75%) for 4s on Critical Hit
  { id: "co", dmg: true }, // 异常状态增加伤害 Melee Damage per Status Type affecting the target.
  { id: "gdr", nopercent: true }, // 嘲讽
  { id: "hlr", nopercent: true, noplus: true }, // 治愈
  { id: "exd", nopercent: true }, // 额外伤害
  { id: "amr" }, // 护甲
  { id: "par", noplus: true }, // 反击几率
  { id: "msd" }, // 近战震波伤害
  { id: "fs" }, // 飞行速度 (战刃)
  { id: "ce", dmg: true }, // 暴击强化
  { id: "ac", dmg: true, noplus: true }, // 暴击造成切割触发 chance to apply <DT_SLASH> on Critical
  { id: "ds", dmg: true }, // 偷袭伤害
  { id: "sd", dmg: true }, // 触发伤害
  { id: "fcd", dmg: true }, // 最终暴伤
  { id: "eca", dmg: true }, // 加法暴击率
  { id: "smd", dmg: true }, // 对Sentient伤害 Damage to Sentients
  { id: "dmg", dmg: true }, // 伤害
  { id: "cwh", dmg: true }, // 爆头暴击率
  { id: "erd", dmg: true }, // 辐射伤害
  { id: "ecd", dmg: true }, // 腐蚀伤害
  { id: "eed", dmg: true }, // 电击伤害
  { id: "efd", dmg: true }, // 火焰伤害
  { id: "etd", dmg: true }, // 毒素伤害
  { id: "aed", dmg: true }, // 全派系伤害
  { id: "rse", dmg: true }, // Weapon Range for 4s on Status Effect
  { id: "lsb", dmg: true }, // Bonus Damage on final shot. Requires Magazine 6 or higher.
  { id: "edm", dmg: true }, // Extra Damage against a Marked Enemy
  { id: "ld", nopercent: true }, // Extra Damage on Melee Attacks, or Lethal Damage on Finishers.
  { id: "ar", nopercent: true }, // + Range (nopercent)
  { id: "cd", }, // Critical Chance and Damage when Aiming
  { id: "ca", }, // Charge Rate
  { id: "ck", }, // Chance to Resist Staggers/Knockdowns when Aiming
  { id: "sds", }, // Status Duration on Self
  { id: "but", }, // Shots now bounce up to 1x and travel 5% further.
  { id: "el", }, // Grenades tether up to 2 enemies from 4m away.
  { id: "sb", }, // Self-damage
  { id: "si", nopercent: true }, // Impact damage reduces enemy armor by 1.
  { id: "rc", }, // Fire/Charge Rate
  { id: "scan", }, // Fatal strikes against an enemy also perform a Codex Scan
  { id: "apd", }, // first Pellet Damage additionally
  { id: "ccl", noplus: true }, // crit chance lock
  { id: "erc", }, // energy recovery
  { id: "esc", dmg: true, nopercent: true }, // extra status count

  // Amp damage convert
  { id: "vte", dmg: true },
  { id: "vtv", dmg: true },
  { id: "vtp", dmg: true },
  { id: "vth", dmg: true },

  // 条件
  { id: "ify", }, // if the target is over 45m away.
  { id: "onHeadshot", },
  { id: "onHeadshotKill", },
  { id: "onKill", },
  { id: "onReload", },
  { id: "onHit", },
  { id: "onAbilityCast", },
  { id: "onMeleeChannelKill", },
  { id: "onReloadFromEmpty", },
  { id: "onDodge", },
  { id: "onEquip", },
].reduce((a, b) => (a[b.id] = b, a), {});

/**
 * 带值通用属性
 */
export class ValuedProperty {
  static parse([vn, vv]: [string, number]): ValuedProperty {
    let prop = CommonPropertyDataBase[vn];
    if (prop) {
      return new ValuedProperty(prop, vv);
    }
    return {
      id: vn,
      displayValue: String(vv),
      get fullString() { return vn },
      shortString: vn,
      value: vv,
      prop: { id: vn }
    };
  }
  /** 属性原型 */
  prop: CommonProperty
  /** 属性值 */
  value: number
  constructor(prop: CommonProperty, value: number) {
    this.prop = prop;
    this.value = value;
  }
  /**
   * 属性值显示
   */
  get displayValue() {
    let dv = this.prop.nopercent ? this.value.toString() : +this.value.toFixed(1) + "%";
    if (!this.prop.noplus && dv[0] != "-")
      return "+" + dv;
    return dv;
  }

  get id() { return this.prop.id }
  /**
   * 完整属性显示
   */
  get fullString() {
    return i18n.te("prop.fullName." + this.prop.id) && i18n.t("prop.fullName." + this.prop.id, [this.displayValue]) || this.prop.id
  }
  /**
   * 属性简称
   */
  get shortString() {
    return i18n.te("prop.shortName." + this.prop.id) && i18n.t("prop.shortName." + this.prop.id) || this.prop.id
  }

}
