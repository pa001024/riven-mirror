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
  /** 元素 */
  private _spec: { [key: string]: SpecialStatusInfo }

  constructor(dotDamage: [string, number][], procChanceMap: [string, number][], procChance: number, bullets = 1, firerate = 1) {
    // TODO let mergedProcInfo = new Map<string, {}>();
  }

  get(dname) { return this._spec[dname]; }
  get Impact() { return this.get("Impact"); }
  get Puncture() { return this.get("Puncture"); }
  get Slash() { return this.get("Slash"); }
  get Cold() { return this.get("Cold"); }
  get Electricity() { return this.get("Electricity"); }
  get Heat() { return this.get("Heat"); }
  get Toxin() { return this.get("Toxin"); }
  get Blast() { return this.get("Blast"); }
  get Corrosive() { return this.get("Corrosive"); }
  get Gas() { return this.get("Gas"); }
  get Magnetic() { return this.get("Magnetic"); }
  get Radiation() { return this.get("Radiation"); }
  get Viral() { return this.get("Viral"); }
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
