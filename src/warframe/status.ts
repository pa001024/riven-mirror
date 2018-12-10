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

/** 各触发参数 */
export class StatusInfo {
  /** 元素 */
  private _spec: { [key: string]: SpecialStatusInfo }

  /** 列表 */
  toArray() {
    return Object.keys(this._spec).map(v => this._spec[v]);
  }

  constructor(dotDamage: [string, number][], procChanceMap: [string, number][], procWeights: [string, number][], procDurationMul: number, bullets = 1, firerate = 1, dutyCycle = 0) {
    let dotMap = new Map(dotDamage);
    let pwMap = new Map(procWeights);
    this._spec = {};
    procChanceMap.forEach(([vn, vv]) => {
      let dur = procDurationMap[vn] * procDurationMul;
      let durTick = Math.max(0, ~~dur) + 1;
      let cor = vv * bullets * firerate * dur;
      this._spec[vn] = {
        chance: vv,
        proportion: pwMap.get(vn),
        duration: dur,
        coverage: cor > 1 ? 1 : cor < 0 ? 0 : cor
      };
      // [腐蚀 磁力]
      if (vn === "Corrosive" || vn === "Magnetic") {
        this._spec[vn].procPerHit = vv * bullets;
        this._spec[vn].procPerSecond = vv * bullets * firerate;
      } else {
        this._spec[vn].chancePerHit = 1 - (1 - vv) ** bullets;
        this._spec[vn].chancePerSecond = 1 - (1 - vv) ** (bullets * firerate);
      }
      if (vn === "Slash" || vn === "Toxin" || vn === "Gas" || vn === "Electricity" || vn === "Heat") {
        // [切割 毒 毒气 电]
        if (vn !== "Heat") {
          this._spec[vn].instantProcDamage = dotMap.get(vn);
          this._spec[vn].instantProcDamagePerHit = this._spec[vn].instantProcDamage * bullets;
          this._spec[vn].instantProcDamagePerSecond = this._spec[vn].instantProcDamagePerHit * firerate;
        }
        // [切割 毒 毒气]
        if (vn !== "Electricity" && vn !== "Heat") {
          this._spec[vn].latentProcDamage = this._spec[vn].instantProcDamage * durTick;
          this._spec[vn].latentProcDamagePerHit = this._spec[vn].instantProcDamagePerHit * durTick;
          this._spec[vn].latentProcDamagePerSecond = this._spec[vn].instantProcDamagePerSecond * durTick;
        }
        // [切割 毒 毒气 火]
        if (vn !== "Electricity") {
          this._spec[vn].averageProcDamage = this._spec[vn].latentProcDamage * (1 - dutyCycle);
          this._spec[vn].averageProcDamagePerHit = this._spec[vn].latentProcDamagePerHit * (1 - dutyCycle);
          this._spec[vn].averageProcDamagePerSecond = this._spec[vn].latentProcDamagePerSecond * (1 - dutyCycle);
        }
      }
    });
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
export interface SpecialStatusInfo {
  // [所有类型]

  /** 弹片触发率 */
  chance: number
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
  chancePerHit?: number
  /** 每秒触发率 */
  chancePerSecond?: number

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
