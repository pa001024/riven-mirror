// polyfill
const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
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
  constructor(callback: (t: number) => void, ms: number, skip = true) {
    this.callback = callback;
    this.peroid = ms;
    this.skipMode = skip;
  }
  start() {
    if (this.isRunning) return;
    if (this.pauseTime) {
      this.startTime = performance.now() + this.pauseTime;
      this.pauseTime = 0;
    } else {
      this.startTime = performance.now();
    }
    this.isRunning = true;
    this.loop(this.startTime);
    return this;
  }
  pause() {
    this.pauseTime = performance.now() - this.startTime;
    this.isRunning = false;
    return this;
  }
  stop() {
    this.isRunning = false;
    this.step = 0;
    this.pauseTime = 0;
    return this;
  }

  loop = (t: number) => {
    if (!this.isRunning) return;
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
    requestAnimFrame(this.loop);
  };
}
