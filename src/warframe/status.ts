/** 触发持续时间表 */
export const procDurationMap = {
  Impact: 6,
  Puncture: 6,
  Slash: 6,
  Cold: 6,
  Electricity: 6,
  Heat: 6,
  Toxin: 6,
  Blast: 6,
  Corrosive: 8,
  Gas: 6,
  Magnetic: 6,
  Radiation: 12,
  Viral: 6,
  Void: 3,
};

/** 其他触发参数 */
export interface SpecialStatusInfo {
  // [所有类型]

  /** 弹片触发率 */
  appearRate?: number
  /** 比重 */
  proportion: number
  /** 持续时间 */
  duration: number
  /** 覆盖率 */
  coverage: number

  // [腐蚀 磁力]

  /** 每发触发量 */
  procPerHit?: number
  /** 每秒触发量 */
  procPerSecond?: number

  // [其他]

  /** 每发触发率 */
  appearRatePerHit?: number
  /** 每秒触发率 */
  appearRatePerSecond?: number

  // [切割 毒 毒气 电]

  /** 弹片立即触发伤害 */
  instantProcDamage?: number
  /** 每发立即触发伤害 */
  instantProcDamagePerHit?: number
  /** 每秒立即触发伤害 */
  instantProcDamagePerSecond?: number

  // [切割 毒 毒气]

  /** 弹片潜在触发伤害 */
  latentProcDamage?: number
  /** 每发潜在触发伤害 */
  latentProcDamagePerHit?: number
  /** 每秒潜在触发伤害 */
  latentProcDamagePerSecond?: number

  // [火 切割 毒 毒气]

  /** 弹片平均触发伤害 */
  averageProcDamage?: number
  /** 每发平均触发伤害 */
  averageProcDamagePerHit?: number
  /** 每秒平均触发伤害 */
  averageProcDamagePerSecond?: number
}
