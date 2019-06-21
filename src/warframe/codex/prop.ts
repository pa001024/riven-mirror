import { i18n } from "@/i18n";
import _ from "lodash";

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

/**
Property Calculate System

@summary
OPERATORS:
base: the base prop value 任意属性的基础值
abs-inc: increase by percent before all 按比例增加 绝对
abs-more: scale by percent before all 按比例缩放 绝对
abs-extra: increase by number before all 可被影响的绝对数值
inc: increase by percent 按比例增加 相对
more: scale by percent 按比例缩放 相对
extra: increase by number after all 不可被影响的绝对数值

* damage inc reducer (毒化者机制)

Final Calculate Formula:

(base * (1 + abs-inc1 + abs-inc2) * (1 + abs-more1) * (1 + abs-more2) + abs-extra) * (1 + inc1 + inc2) * (1 + more1) * (1 + more2) + extra

@example
base=30% crit chance
abs-inc=90% True Steel
abs-extra=30% Arcane Avenger
more=165%*2=330% Blood Rush
RESULT = (30% * (1 + 90%) + 30%) * (1 + 330%) = 374.1%

base=300 Blast
layer: Weapon Damage
abs-more=-100% Weapon Damage
abs-extra=700 Heat
layer: Element Damage
abs-inc=90% Hellfire
RESULT = (300 * (1 - 100%) + 700) * (1 + 90%) = 1330 Heat

* ! System Layers
* Weapon Damage 武器伤害 基本输入 "基伤"
* Element Damage 元素伤害 基本输入 "元素"
* Crit Damage 暴击伤害 关联性引用 "暴击"
* Enemy Damage 派系伤害 关联性引用 "歧视"
* Status Damage 触发伤害 关联性引用 "触发"
* Final Damage 总伤害  结算 "总伤"

* ? prefix
* i abs-extra (percent)
* e abs-extra
* m more
* b extra

* ! innate 固有 - 以下属性天生具有不同的等级
* P (穿透) - abs-extra
* N (连击) - abs-extra

 */
export const CommonPropertyDataBase: { [key: string]: CommonProperty } = [
  // abs-inc 绝对增加
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
  { id: "P" }, // 穿透 // abs-extra 绝对数值增加
  { id: "H" }, // 变焦
  { id: "V" }, // 弹道 Projectile Flight Speed
  { id: "Z" }, // 后坐
  { id: "K", dmg: true }, // 近战伤害
  { id: "T" }, // 范围 Range
  { id: "J", dmg: true }, // 攻速 Attack Speed
  { id: "B", dmg: true }, // 导引伤害
  { id: "U" }, // 导引效率
  { id: "N", nopercent: true }, // 连击 Combo Duration // abs-extra 绝对数值增加
  { id: "E", dmg: true }, // 滑暴 Critical Hit Chance for Slide Attack
  // abs-inc 绝对增加
  { id: "X" }, // 处决 Finisher Damage
  // convert 伤害转换
  { id: "p4", dmg: true }, // 物理转火伤 Physical to Heat
  { id: "p5", dmg: true }, // 物理转冰伤 Physical to Cold
  { id: "p6", dmg: true }, // 物理转毒伤 Physical to Toxin
  { id: "p7", dmg: true }, // 物理转电伤 Physical to Electricity
  // 战甲
  { id: "h" }, // Health
  { id: "s" }, // Shield
  { id: "a" }, // Amror
  { id: "e" }, // Energy
  { id: "f" }, // Sprint
  { id: "r" }, // ShieldRecharge
  { id: "t" }, // AbilityStrength S=>t
  { id: "u" }, // AbilityDuration D=>u
  { id: "x" }, // AbilityEfficiency E=>x
  { id: "g" }, // AbilityRange R=>g
  { id: "c" }, // CastSpeed
  { id: "k" }, // KnockdownResistance
  { id: "y" }, // KnockdownRecovery h=>y
  { id: "l" }, // Slide
  { id: "i" }, // Friction F=>i
  { id: "v" }, // ParkourVelocity
  { id: "z" }, // QuickThinking
  { id: "rg" }, // Rage A=>rg
  { id: "hc", nopercent: true }, // HealthConversion
  { id: "ec" }, // EnergyConversion
  { id: "tr" }, // TauResist
  { id: "as" }, // AuraStrength
  { id: "ae" }, // AuraEffectiveness
  { id: "at" }, // AimGlideWallLatchTime
  { id: "er", nopercent: true }, // EnemyRadar
  { id: "lr", nopercent: true }, // LootRadar
  { id: "ea", nopercent: true }, // extra armor
  { id: "fsr" }, // fully shield recovery
  { id: "psr" }, // persecond shield recovery
  { id: "phr" }, // persecond health recovery
  { id: "ivb" }, // invisible
  { id: "ivc" }, // invulnerable
  { id: "ehb" }, // extra health orb
  { id: "eeb" }, // extra energy orb
  { id: "rgd" }, // range knockdown
  { id: "tt" }, // team AbilityStrength
  { id: "ab" }, // Resistance to that Damage Type for 10s. Stacks up to 90%.
  { id: "cc" }, // Counter Chance
  { id: "ddb" }, // Damage during Bleedout
  { id: "pr" }, // Toxin Resistance
  { id: "rr" }, // Radiation Resistance
  { id: "drk" }, // Damage Resistance on Knockdown
  { id: "cr" }, // Cold Resistance
  { id: "fr" }, // Heat Resistance
  { id: "ir" }, // Electricity Resistance
  { id: "ll" }, // chance to unlock locked lockers
  { id: "br" }, // Bleedout Reduction
  { id: "apc" }, // Parry Angle
  { id: "sr" }, // Faster Stagger Recovery
  { id: "fl" }, // Flight Speed (Archwing)
  { id: "es" }, // Energy Rate (Aura)
  { id: "ap" }, // Ammo Pickup (Aura)
  { id: "ev" }, // Evasion
  { id: "eq" }, // Convert Health/Energy Ball
  { id: "m" }, // Movement Speed when Aiming
  { id: "wc" }, // Shield Resistance to Ice Levels
  { id: "adr" }, // Reduces damage by |val|% when Airborne.
  { id: "her" }, // EnergyOnHeadshotRifle
  { id: "ens" }, // Enemy Shield
  { id: "ena" }, // Enemy Amror
  { id: "ref" }, // % Damage taken is reflected when Blocking attacks while Channeling.
  { id: "hps", nopercent: true }, // Heal Rate/s
  { id: "eac" }, // % Hit Chance
  { id: "esp" }, // % Speed
  { id: "ovs", dmg: true }, // % Overall Strength
  { id: "ovr", dmg: true }, // % Overall Range
  { id: "res", dmg: true }, // Damage Resistance
  // 集团
  { id: "vp", nopercent: true }, // 'Purity'
  { id: "vt", nopercent: true }, // 'Truth'
  { id: "ve", nopercent: true }, // 'Entropy'
  { id: "vs", nopercent: true }, // 'Sequence'
  { id: "vj", nopercent: true }, // 'Justice'
  { id: "vb", nopercent: true }, // 'Blight'

  // ========================

  // Special 特殊

  // abs-extra 绝对加法
  { id: "erd", dmg: true }, // 辐射伤害
  { id: "ecd", dmg: true }, // 腐蚀伤害
  { id: "eed", dmg: true }, // 电击伤害
  { id: "efd", dmg: true }, // 火焰伤害
  { id: "etd", dmg: true }, // 毒素伤害
  { id: "eid", dmg: true }, // Initial damage 初始伤害
  { id: "e4", dmg: true, nopercent: true }, // Initial Heat 初始火伤
  { id: "e5", dmg: true, nopercent: true }, // Initial Cold 初始冰伤
  { id: "e6", dmg: true, nopercent: true }, // Initial Toxin 初始毒伤
  { id: "e7", dmg: true, nopercent: true }, // Initial Electricity 初始电伤
  { id: "e8", dmg: true, nopercent: true }, // Initial Impact 初始冲击
  { id: "e9", dmg: true, nopercent: true }, // Initial Puncture 初始穿刺
  { id: "eA", dmg: true, nopercent: true }, // Initial Slash 初始切割

  // extra
  { id: "bL", dmg: true, nopercent: true }, // 基础弹匣 Magazine Capacity

  // abs-extra (percent) 绝对加法 (百分比)
  { id: "i0", dmg: true }, // 暴击率 Critical Chance
  { id: "i1", dmg: true }, // 暴击伤害 Critical Damage
  { id: "i2" }, // 触发率
  { id: "i3" }, // 触发时间
  { id: "iG", dmg: true }, // G系伤害 Damage to Grineer
  { id: "iI", dmg: true }, // I系伤害 Damage to Infested
  { id: "iC", dmg: true }, // C系伤害 Damage to Corpus
  { id: "iD", dmg: true, nopercent: true }, // 伤害 Damage
  { id: "iS", dmg: true, nopercent: true }, // 多重 Multishot
  { id: "iR", dmg: true }, // 射速 Fire Rate
  { id: "iF", dmg: true }, // 装填
  { id: "iM" }, // 弹药 Ammo Maximum
  { id: "iP" }, // 穿透
  { id: "iH" }, // 变焦
  { id: "iV" }, // 弹道 Projectile Flight Speed
  { id: "iZ" }, // 后坐
  { id: "iK", dmg: true }, // 近战伤害
  { id: "iT" }, // 范围 Range
  { id: "iJ", dmg: true }, // 攻速 Attack Speed
  { id: "iB", dmg: true }, // 导引伤害
  { id: "iU" }, // 导引效率
  { id: "iE", dmg: true }, // 滑暴 Critical Hit Chance for Slide Attack
  { id: "iX" }, // 处决 Finisher Damage

  // rel-inc extend 扩展相对增加
  { id: "aed", dmg: true }, // 全派系伤害
  { id: "od", dmg: true }, // O系伤害
  { id: "fsb", dmg: true }, // 首发伤害 Damage on first shot in Magazine
  { id: "da", dmg: true }, // 正中红心 Dead Aim
  { id: "oad", dmg: true }, // 最终伤害
  { id: "ds", dmg: true }, // 偷袭伤害
  { id: "sd", dmg: true }, // 触发伤害
  { id: "fcd", dmg: true }, // 最终暴伤
  { id: "smd", dmg: true }, // 对Sentient伤害 Damage to Sentients
  { id: "dmg", dmg: true }, // 伤害
  { id: "cwh", dmg: true }, // 爆头暴击率
  { id: "rse", dmg: true }, // Weapon Range for 4s on Status Effect
  { id: "lsb", dmg: true }, // Bonus Damage on final shot. Requires Magazine 6 or higher. 末发伤害
  { id: "edm", dmg: true }, // Extra Damage against a Marked Enemy 对标记敌人增伤
  { id: "bsk", dmg: true }, // 最终攻速 Attack Speed (Max: 75%) for 4s on Critical Hit
  { id: "ce", dmg: true }, // 暴击强化
  { id: "ac", dmg: true, noplus: true }, // 暴击造成切割触发 chance to apply <DT_SLASH> on Critical
  { id: "bldr", dmg: true }, // 连击暴击率 Critical Chance stacks with Combo Multiplier
  { id: "fca" }, // Faster Charge Attack
  { id: "esc", dmg: true, nopercent: true }, // extra status count
  { id: "ess", dmg: true }, // extra slash state
  { id: "hm", dmg: true }, // 爆头倍率 to Headshot Multiplier
  { id: "range", nopercent: true }, // 射程

  // ========================

  // Other 其他

  { id: "acc" }, // 精准
  { id: "stick" }, // 壁面附着
  { id: "aimm" }, // 瞄准移速
  { id: "ckm" }, // 移动速度
  { id: "kb", nopercent: true, noplus: true }, // 死亡爆炸
  { id: "kbr", noplus: true }, // 死亡爆炸 (percent)
  { id: "brad" }, // 爆炸半径 Blast Radius
  { id: "hr" }, // 拔枪速度 Holster Speed
  { id: "am" }, // 弹药转换
  { id: "lal" }, // 自动装填
  { id: "spr" }, // 扩散 Spread
  { id: "slc" }, // 消音 Reduces the chance an enemy will hear gunfire by
  { id: "bnc", nopercent: true }, // 反弹 Bounce
  { id: "exp", dmg: true }, // 爆炸 Chance to Explode (Use with Caution)
  { id: "ls" }, // 生命窃取 Life Steal
  { id: "sccm" }, // 连击触发几率 Status Chance per Combo Multiplier
  { id: "ccws" }, // 切割增加连击数 chance to increase Melee Combo Counter when <DT_SLASH>Slash Status deals damage.
  { id: "co", dmg: true }, // 异常状态增加伤害 Melee Damage per Status Type affecting the target.
  { id: "gdr", nopercent: true }, // 嘲讽
  { id: "hlr", nopercent: true, noplus: true }, // 治愈
  { id: "exd", nopercent: true }, // 额外伤害
  { id: "amr" }, // 护甲
  { id: "par", noplus: true }, // 反击几率
  { id: "msd" }, // 近战震波伤害
  { id: "fs" }, // 飞行速度 (战刃)
  { id: "ld", nopercent: true }, // Extra Damage on Melee Attacks, or Lethal Damage on Finishers.
  { id: "ar", nopercent: true }, // + Range (nopercent)
  { id: "cd", dmg: true }, // Critical Chance and Damage when Aiming
  { id: "ca" }, // Charge Rate
  { id: "ck" }, // Chance to Resist Staggers/Knockdowns when Aiming
  { id: "sds" }, // Status Duration on Self
  { id: "but" }, // Shots now bounce up to 1x and travel 5% further.
  { id: "el" }, // Grenades tether up to 2 enemies from 4m away.
  { id: "sb" }, // Self-damage
  { id: "si", nopercent: true }, // Impact damage reduces enemy armor by 1.
  { id: "rc" }, // Fire/Charge Rate
  { id: "scan" }, // Fatal strikes against an enemy also perform a Codex Scan
  { id: "apd" }, // first Pellet Damage additionally
  { id: "ccl", noplus: true }, // crit chance lock
  { id: "erc" }, // energy recovery
  { id: "rvs" }, // Revive Speed
  { id: "dgs" }, // Dodge Speed

  // no parameter 无参数
  { id: "sp" }, // 魔改

  // ========================

  // Amp damage convert
  { id: "vte", dmg: true }, // to Electricity
  { id: "vtv", dmg: true }, // to Viral
  { id: "vtp", dmg: true }, // to Puncture
  { id: "vth", dmg: true }, // to Heat

  // 条件
  { id: "ify" }, // if the target is over 45m away.
  { id: "onHeadshot" },
  { id: "onHeadshotKill" },
  { id: "onKill" },
  { id: "onReload" },
  { id: "onHit" },
  { id: "onAbilityCast" },
  { id: "onMeleeChannelKill" },
  { id: "onReloadFromEmpty" },
  { id: "onDodge" },
  { id: "onEquip" }
].reduce((a, b) => ((a[b.id] = b), a), {});

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
      get fullString() {
        if (vn.endsWith(" Augment")) {
          const skillName = "skill." + _.camelCase(vn.substr(0, vn.length - 8));
          return i18n.t("prop.fullName.augment", [i18n.te(skillName) ? i18n.t(skillName) : vn.substr(0, vn.length - 8)]);
        }
        if (i18n.te(`prop.fullName.${vn}`)) return i18n.t(`prop.fullName.${vn}`);
        return vn;
      },
      get shortString() {
        if (vn.endsWith(" Augment")) {
          const skillName = "skill." + _.camelCase(vn.substr(0, vn.length - 8));
          return i18n.t("prop.fullName.augment", [i18n.te(skillName) ? i18n.t(skillName) : vn.substr(0, vn.length - 8)]);
        }
        if (i18n.te(`prop.fullName.${vn}`)) return i18n.t(`prop.fullName.${vn}`);
        return vn;
      },
      value: vv,
      prop: { id: vn }
    };
  }
  /** 属性原型 */
  prop: CommonProperty;
  /** 属性值 */
  value: number;
  constructor(prop: CommonProperty, value: number) {
    this.prop = prop;
    this.value = value;
  }
  /**
   * 属性值显示
   */
  get displayValue() {
    let dv = this.prop.nopercent ? this.value.toString() : +this.value.toFixed(1) + "%";
    if (!this.prop.noplus && dv[0] != "-") return "+" + dv;
    return dv;
  }

  get id() {
    return this.prop.id;
  }
  /**
   * 完整属性显示
   */
  get fullString() {
    return (i18n.te("prop.fullName." + this.prop.id) && i18n.t("prop.fullName." + this.prop.id, [this.displayValue])) || this.prop.id;
  }
  /**
   * 属性简称
   */
  get shortString() {
    return (i18n.te("prop.shortName." + this.prop.id) && i18n.t("prop.shortName." + this.prop.id)) || this.prop.id;
  }
}
