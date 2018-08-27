/**
 * 赋能
 */
export interface Arcane {
  id: string;
  name: string;
  /** 属性 */
  prop: [string, number];
  /** 生效条件 */
  condition: string;
  /** 生效目标 */
  type: string;
  /** 生效几率 */
  chance: number;
  /** 持续 */
  duration: number;
}
const _arcaneListSource = [
  ["Pulse", "生机", ["额外生命", 100], "拾起生命", "Warframe", 0.2, 0],
  ["Energize", "充沛", ["额外能量", 100], "拾起能量", "Warframe", 0.4, 0],
  ["Eruption", "爆发", ["击倒", 1], "拾起能量", "Warframe", 0.4, 0],
  ["Agility", "灵敏", ["移动速度", 0.40], "受到伤害", "Warframe", 0.12, 8],
  ["Barrier", "壁垒", ["回满护盾", 1], "受到伤害", "Warframe", 0.04, 0],
  ["Aegis", "神盾", ["护盾回复", 60], "受到伤害", "Warframe", 0.06, 20],
  ["Trickery", "诡计", ["隐身", 1], "终结攻击", "Warframe", 0.1, 20],
  ["Ultimatum", "通牒", ["护甲", 600], "终结攻击", "Warframe", 1, 20],
  ["Arachne", "蜘蛛", ["额外伤害", 1], "壁面攀附", "Warframe", 0.6, 0],
  ["Grace", "优雅", ["生命回复", 0.04], "受到伤害", "Warframe", 0.06, 6],
  ["Guardian", "保卫者", ["护甲", 600], "受到伤害", "Warframe", 0.2, 20],
  ["Phantasm", "幻象", ["移动速度", 0.4], "格挡", "Warframe", 0.32, 12],
  ["Healing", "复原", ["抵挡辐射", 1], "被动", "Warframe", 0.8, 0],
  ["Resistance", "抗毒", ["抵挡毒素", 1], "被动", "Warframe", 0.8, 0],
  ["Deflection", "偏折", ["抵挡切割", 1], "被动", "Warframe", 0.8, 0],
  ["Ice", "冰冷", ["抵挡火焰", 1], "被动", "Warframe", 0.8, 0],
  ["Warmth", "温暖", ["抵挡冰冻", 1], "被动", "Warframe", 0.8, 0],
  ["Nullifier", "消磁", ["抵挡磁力", 1], "被动", "Warframe", 0.8, 0],
  ["Consequence", "结果", ["旋身飞跃", 0.4], "造成爆头", "Warframe", 1, 12],
  ["Acceleration", "加速", ["R", 0.6], "造成暴击", "步枪", 0.2, 6],
  ["Avenger", "复仇者", ["加法暴击", 0.3], "受到伤害", "全域", 0.14, 8],
  ["Awakening", "觉醒", ["D", 1], "装弹", "手枪", 0.4, 16],
  ["Fury", "狂怒", ["K", 1.2], "造成暴击", "近战", 0.4, 12],
  ["Strike", "速攻", ["J", 0.4], "击中", "近战", 0.1, 12],
  ["Momentum", "动量", ["F", 1], "造成暴击", "狙击枪", 0.4, 8],
  ["Precision", "精确", ["D", 1.2], "造成爆头", "手枪", 0.8, 8],
  ["Rage", "愤怒", ["D", 0.1], "造成爆头", "主要武器", 0.1, 16],
  ["Tempo", "节奏", ["R", 0.6], "造成暴击", "霰弹枪", 0.1, 8],
  ["Velocity", "迅速", ["R", 0.8], "造成暴击", "手枪", 0.6, 6],
  ["Victory", "胜利", ["生命回复", 0.02], "造成爆头", "Warframe", 0.08, 8],
] as [string, string, [string, number], string, string, number, number][];

export const ArcaneList: Arcane[] = _arcaneListSource.map(v => ({
  id: v[0],
  name: v[1],
  prop: v[2],
  condition: v[3],
  type: v[4],
  chance: v[5],
  duration: v[6],
}));
