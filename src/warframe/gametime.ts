import { i18n } from "../i18n";

export class EarthTime {
  /** 现在到夜晚的秒数 */
  static get secords() { return ~~(28800 - (Date.now() / 1e3 - 14400) % 28800); }
  /** 现在是否是夜晚 */
  static get isNight() { return this.secords > 14400; }
  /** 现在是否是白天 */
  static get isDay() { return !this.isNight; }
  /** 返回一个值代表当前时间在一个圆形转盘的顺时针角度 以0°代表凌晨 */
  static get angel() { return 180 - this.secords * 360 / 28800; }
  static get text() {
    let sec = this.secords;
    if (this.isNight)
      sec -= 14400;
    let min = ~~(sec / 60);
    let hou = ~~(min / 60);
    min = min % 60;
    sec = sec % 60;
    return `${hou < 10 ? "0" + hou : hou}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }
  /** 返回 白昼/夜晚 */
  static get phaseText() {
    return this.isDay ? i18n.t("time.day").toString() : i18n.t("time.night").toString();
  }
}
export class SentientTime {
  /** 现在到结束的秒数 */
  static get secords() { return ~~(9900 - (Date.now() / 1e3 - 5400) % 9900); }
  /** 现在是否是出现 */
  static get isActive() { return this.secords < 1800; }
  static get text() {
    let sec = this.secords;
    if (!this.isActive)
      sec -= 1800;
    let min = ~~(sec / 60);
    let hou = ~~(min / 60);
    min = min % 60;
    sec = sec % 60;
    return `${hou < 10 ? "0" + hou : hou}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }
}
export class CetusTime {
  static offset = 1500;
  /** 校准 */
  static calibration(dateString: string, isDay: boolean) {
    this.offset = new Date(dateString).getTime() % 9e6 / 1e3;
    if (!isDay) this.offset = this.offset - 3e3;
    console.log("[CetusTime] calibration", dateString, isDay, this.offset)
  }
  /** 现在到夜晚的秒数 */
  static get secords() { return ~~(9e3 - (Date.now() / 1e3 - this.offset) % 9e3); }
  /** 现在是否是夜晚 */
  static get isNight() { return this.secords > 6e3; }
  /** 现在是否是白天 */
  static get isDay() { return !this.isNight; }
  /** 返回一个值代表当前时间在一个圆形转盘的顺时针角度 以0°代表凌晨 */
  static get angel() { return 270 - this.secords * 360 / 9e4; }
  static get text() {
    let sec = this.secords;
    if (this.isNight)
      sec -= 6e3;
    let min = ~~(sec / 60);
    let hou = ~~(min / 60);
    min = min % 60;
    sec = sec % 60;
    return `${hou < 10 ? "0" + hou : hou}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }
  /** 返回 白昼/黄昏/日落/夜晚/黎明/日出/早晨 */
  static get phaseText() {
    let sec = this.secords;
    if (sec > 6000) return i18n.t("time.night").toString(); // 02:30 ~ 01:40
    if (sec > 5580) return i18n.t("time.dawn").toString(); // 01:40 ~ 01:33
    if (sec > 5220) return i18n.t("time.sunrise").toString(); // 01:33 ~ 01:27
    if (sec > 4080) return i18n.t("time.morning").toString(); // 01:27 ~ 01:08
    if (sec > 600) return i18n.t("time.day").toString(); // 01:08 ~ 00:10
    if (sec > 180) return i18n.t("time.dusk").toString(); // 00:10 ~ 00:03
    return i18n.t("time.sunset").toString(); // 00:03 ~ 00:00
  }
  static futures(count: number = 5) {
    let lay = this.secords;
    return Array(count).fill(0).map((_, i) => (~~(Date.now() / 1e3) + lay + 9e3 * i) * 1e3);
  }
}

export class FortunaTime {
  /** 现在到夜晚的秒数 */
  static get secords() { return ~~(1600 - (Date.now() / 1e3 - 1226) % 1600); }
  /** 现在是否是夜晚 */
  static get isNight() { return this.secords > 400; }
  /** 现在是否是白天 */
  static get isDay() { return !this.isNight; }
  /** 返回一个值代表当前时间在一个圆形转盘的顺时针角度 以0°代表凌晨 */
  static get angel() { return 270 - this.secords * 360 / 1600; }
  static get text() {
    let sec = this.secords;
    if (sec > 400) sec -= 400; // 400 ~ 1600s
    let min = ~~(sec / 60);
    let hou = ~~(min / 60);
    min = min % 60;
    sec = sec % 60;
    return `${hou < 10 ? "0" + hou : hou}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }
  /** 返回 温暖/寒冷/刺骨 */
  static get phaseText() {
    let sec = this.secords;
    if (sec > 1200) return i18n.t("time.cold").toString(); // 1200 ~ 1600s
    if (sec > 734) return i18n.t("time.freezing").toString(); // 800-66 ~ 1200s
    if (sec > 400) return i18n.t("time.cold").toString(); // 400+66 ~ 800-66s
    return i18n.t("time.warm").toString(); // 0 ~ 400s
  }
}

export class CambionTime extends CetusTime{
  /** 返回 Fass/Vome */
  static get phaseText() {
        return this.isDay ? i18n.t("time.fass").toString() : i18n.t("time.vome").toString();
  }
}
