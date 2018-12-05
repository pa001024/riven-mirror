/** 触发持续时间表 */
export const procDurationMap = {
  Impact: 2,
  Puncture: 6,
  Slash: 6,
  Cold: 6,
  Electricity: 6,
  Heat: 6,
  Toxin: 8,
  Blast: 2,
  Corrosive: 6,
  Gas: 0,
  Magnetic: 4,
  Radiation: 12,
  Viral: 6,
};

export class ProbInfo {
  /** 最低值 */
  MIN: number
  /** 平均值 */
  AVG: number
  /** 最高值 */
  MAX: number
}

/** 各触发参数 */
export class StatusInfo {
  // [总体]

  /** 每弹片触发率 */
  CPB: number
  /** 每发触发率 */
  CPH: number
  /** 每秒触发率 */
  CPS: number
  /** 平均状态量期望 */
  ASQE: number

  /** 元素 */
  SPEC: { [key: string]: SpecialStatusInfo }

  constructor(totalDmg: [string, number][], procChanceMap: [string, number][], procChance: number, bullets = 1, ) {

  }
}

/** 其他触发参数 */
export class SpecialStatusInfo {
  // [所有类型]

  /** 总体占比 */
  COP: number
  /** 平均覆盖率 */
  SAC: number

  // [腐蚀 磁力]

  /** 每弹片触发量 */
  SPB?: number
  /** 每发触发量 */
  SPH?: number
  /** 每秒触发量 */
  SPS?: number

  // [火 病毒 冲击 爆炸 冰冻 穿刺 辐射 电]

  /** 每发触发率 */
  KSPH?: number
  /** 每秒触发率 */
  KSPS?: number

  // [切割 毒 毒气 电]

  /** 每弹片立即触发伤害 */
  ISDPB?: number
  /** 每发立即触发伤害 */
  ISDPH?: number
  /** 每秒立即触发伤害 */
  ISDPS?: number

  // [切割 毒 毒气]

  /** 每弹片潜在触发伤害 */
  PSDPB?: number
  /** 每发潜在触发伤害 */
  PSDPH?: number
  /** 每秒潜在触发伤害 */
  PSDPS?: number

  // [火 切割 毒 毒气]

  /** 每弹片平均触发伤害 */
  ASDPB?: number
  /** 每发平均触发伤害 */
  ASDPH?: number
  /** 每秒平均触发伤害 */
  ASDPS?: number
}
