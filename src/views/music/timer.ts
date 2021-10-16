// polyfill
const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window["webkitRequestAnimationFrame"] ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    function(callback: Function) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

/** setInterval的requestAnimationFrame版本 高性能 */
export class Timer {
  peroid: number;
  startTime: number;
  pauseTime: number;
  callback: (t: number) => void;
  isRunning = false;
  step = 0;
  skipMode = false;
  _nativetimer: number;
  constructor(callback: (t: number) => void, ms: number, skip = true) {
    this.callback = callback;
    this.peroid = ms;
    this.skipMode = skip;
  }
  /** 开始 */
  start() {
    if (this.isRunning) return;
    this.seek();
    this.isRunning = true;
    document.addEventListener("visibilitychange", this.visibilitychange);
    this.tick(this.startTime);
    return this;
  }
  /** 重新定位 */
  seek(offest = 0) {
    this.step = 0;
    this.pauseTime = 0;
    this.startTime = performance.now() - offest;
    return this;
  }
  /** 重新开始 */
  seekStep(step = 0) {
    this.seek(step * this.peroid);
    return this;
  }
  /** 暂停 */
  pause() {
    this.pauseTime = performance.now() - this.startTime;
    this.isRunning = false;
    if (this._nativetimer) clearInterval(this._nativetimer);
    document.removeEventListener("visibilitychange", this.visibilitychange);
    return this;
  }
  /** 停止 */
  stop() {
    this.isRunning = false;
    this.step = 0;
    this.pauseTime = 0;
    if (this._nativetimer) clearInterval(this._nativetimer);
    document.removeEventListener("visibilitychange", this.visibilitychange);
    return this;
  }

  visibilitychange = () => {
    if (document.hidden) this.tick();
  };

  tick = (t?: number) => {
    if (!this.isRunning) return;
    let useNative = !t;
    if (!t) t = performance.now();
    const delta = t - this.startTime;
    if (delta / this.peroid > this.step) {
      if (this.skipMode) {
        this.step = ~~(delta / this.peroid) + 1;
        this.callback(this.step);
      } else {
        this.callback(~~(delta / this.peroid));
        this.step++;
      }
    }
    if (!useNative) requestAnimFrame(this.tick);
    else setTimeout(this.tick, 1e3 / 60);
  };
}
