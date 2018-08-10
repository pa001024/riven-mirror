export class IngameTime {
  type: string
  constructor(type: string) {
    this.type = type;
  }
  /** 现在到夜晚的秒数 */
  get secords() {
    if (this.type == "cetus")
      return ~~(9e3 - (Date.now() / 1e3 - 4860) % 9e3);
    else
      return ~~(28800 - (Date.now() / 1e3 - 14400) % 28800);
  }
  /** 现在是否是夜晚 */
  get isNight() {
    if (this.type == "cetus")
      return this.secords > 6e3;
    else
      return this.secords > 14400;
  }
  /** 现在是否是白天 */
  get isDay() {
    return !this.isNight;
  }
  /** 返回一个值代表当前时间在一个圆形转盘的顺时针角度 以0°代表凌晨 */
  get angel() {
    if (this.type == "cetus")
      return 270 - this.secords * 360 / 9e4;
    else
      return 180 - this.secords * 360 / 28800;
  }
  get text() {
    let sec = this.secords;
    if (this.isNight) {
      if (this.type == "cetus")
        sec -= 6e3;
      else
        sec -= 14400;
    }
    let min = ~~(sec / 60);
    let hou = ~~(min / 60);
    min = min % 60;
    sec = sec % 60;
    return `${hou === 0 ? "00" : hou < 10 ? "0" + hou : hou}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`
  }
}
