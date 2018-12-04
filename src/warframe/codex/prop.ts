import { i18n } from "@/i18n";

/**
 * 通用属性
 */
export interface CommonProperty {
  id: string;
  nopercent?: boolean;
  dmg?: boolean;
  noplus?: boolean;
}

export const CommonPropertyDataBase: { [key: string]: CommonProperty } = [
  { id: "acc" }, // 精准
  { id: "range", nopercent: true }, // 射程
  { id: "stick" }, // 壁面附着
  { id: "aimm" }, // 瞄准移速
  { id: "ckm" }, // 移动速度
  { id: "od", dmg: true }, // O系伤害
  { id: "kb", nopercent: true }, // 死亡爆炸
  { id: "brad" }, // 爆炸半径
  { id: "sp" }, // 魔改
  { id: "hr" }, // 拔枪速度
  { id: "fsb", dmg: true }, // 首发伤害
  { id: "am" }, // 弹药转换
  { id: "hm", dmg: true }, // 爆头倍率
  { id: "bsc" }, // 基础触发几率
  { id: "da", dmg: true }, // 正中红心
  { id: "oad", dmg: true }, // 最终伤害
  { id: "lal" }, // 自动装填。
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
  { id: "hlr", nopercent: true }, // 治愈
  { id: "exd", nopercent: true }, // 额外伤害
  { id: "amr" }, // 护甲
  { id: "par" }, // 反击几率
  { id: "msd" }, // 近战震波伤害
  { id: "fs" }, // 飞行速度
  { id: "ce", dmg: true }, // 暴击强化
  { id: "ac", dmg: true }, // 暴击造成切割触发
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
    return null;
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
  /**
   * 完整属性显示
   */
  fullString() {
    return i18n.t("exprop.fullName." + this.prop.id, [this.displayValue])
  }
}
