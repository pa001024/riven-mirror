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
  { id: "0", dmg: true }, // 暴击率
  { id: "1", dmg: true }, // 暴击伤害
  { id: "2", dmg: true }, // 触发率
  { id: "3", dmg: true }, // 触发时间
  { id: "4", dmg: true }, // 火伤
  { id: "5", dmg: true }, // 冰伤
  { id: "6", dmg: true }, // 毒伤
  { id: "7", dmg: true }, // 电伤
  { id: "8", dmg: true }, // 冲击
  { id: "9", dmg: true }, // 穿刺
  { id: "A", dmg: true }, // 切割
  { id: "G", dmg: true }, // G系伤害
  { id: "I", dmg: true }, // I系伤害
  { id: "C", dmg: true }, // C系伤害
  { id: "D", dmg: true }, // 伤害
  { id: "S", dmg: true }, // 多重
  { id: "R", dmg: true }, // 射速
  { id: "L", dmg: true }, // 弹匣
  { id: "F", dmg: true }, // 装填
  { id: "M" }, // 弹药
  { id: "P" }, // 穿透
  { id: "H" }, // 变焦
  { id: "V" }, // 弹道
  { id: "Z" }, // 后坐
  { id: "K", dmg: true }, // 近战伤害
  { id: "T" }, // 范围
  { id: "J", dmg: true }, // 攻速
  { id: "B", dmg: true }, // 导引伤害
  { id: "U" }, // 导引效率
  { id: "N", nopercent: true }, // 连击
  { id: "E", dmg: true }, // 滑暴
  { id: "X" }, // 处决
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

  // 其他
  { id: "acc" }, // 精准
  { id: "range", nopercent: true }, // 射程
  { id: "stick" }, // 壁面附着
  { id: "aimm" }, // 瞄准移速
  { id: "ckm" }, // 移动速度
  { id: "od", dmg: true }, // O系伤害
  { id: "kb", nopercent: true, noplus: true }, // 死亡爆炸
  { id: "brad" }, // 爆炸半径
  { id: "sp" }, // 魔改
  { id: "hr" }, // 拔枪速度
  { id: "fsb", dmg: true }, // 首发伤害
  { id: "am" }, // 弹药转换
  { id: "hm", dmg: true }, // 爆头倍率
  { id: "bsc" }, // 基础触发几率
  { id: "da", dmg: true }, // 正中红心
  { id: "oad", dmg: true }, // 最终伤害
  { id: "lal" }, // 自动装填
  { id: "spr" }, // 扩散
  { id: "slc" }, // 消音
  { id: "bnc", nopercent: true }, // 反弹
  { id: "exp", dmg: true }, // 爆炸
  { id: "ls" }, // 生命窃取
  { id: "maga", nopercent: true }, // 弹匣容量
  { id: "bldr", dmg: true }, // 连击暴击率
  { id: "sccm" }, // 连击触发几率
  { id: "ccws" }, // 切割增加连击数
  { id: "bsk" }, // 最终攻速
  { id: "co", dmg: true }, // 异常状态增加伤害
  { id: "gdr", nopercent: true }, // 嘲讽
  { id: "hlr", nopercent: true, noplus: true }, // 治愈
  { id: "exd", nopercent: true }, // 额外伤害
  { id: "amr" }, // 护甲
  { id: "par", noplus: true }, // 反击几率
  { id: "msd" }, // 近战震波伤害
  { id: "fs" }, // 飞行速度
  { id: "ce", dmg: true }, // 暴击强化
  { id: "ac", dmg: true, noplus: true }, // 暴击造成切割触发
  { id: "ds", dmg: true }, // 偷袭伤害
  { id: "sd", dmg: true }, // 触发伤害
  { id: "fcd", dmg: true }, // 最终暴伤
  { id: "eca", dmg: true }, // 加法暴击率
  { id: "smd", dmg: true }, // 对Sentient伤害
  { id: "dmg", dmg: true }, // 伤害
  { id: "cwh", dmg: true }, // 爆头暴击率
  { id: "erd", dmg: true }, // 辐射伤害
  { id: "ecd", dmg: true }, // 腐蚀伤害
  { id: "eed", dmg: true }, // 电击伤害
  { id: "efd", dmg: true }, // 火焰伤害
  { id: "aed", dmg: true }, // 火焰伤害
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
      fullString: vn,
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
    let dv = this.prop.nopercent ? this.value.toString() : +(this.value * 100).toFixed(1) + "%";
    if (!this.prop.noplus && dv[0] != "-")
      return "+" + dv;
    return dv;
  }

  get id() { return this.prop.id }
  /**
   * 完整属性显示
   */
  get fullString() {
    return i18n.t("prop.fullName." + this.prop.id, [this.displayValue])
  }
  /**
   * 属性简称
   */
  get shortString() {
    return i18n.t("prop.shortName." + this.prop.id)
  }

}
