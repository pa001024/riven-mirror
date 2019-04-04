import { Vue, Component, Prop } from "vue-property-decorator";
import "./ProbabilityVisualization.less";

@Component({})
export default class ProbabilityVisualization extends Vue {
  @Prop({ type: Number }) criti: number;
  @Prop({ type: Number }) critMul: number;
  @Prop({ type: Number, default: 1 }) multi: number;
  @Prop({ type: Number }) totalDamageFloor: number;
  @Prop({ type: Number }) totalDamageCeil: number;

  get lowerMulti() {
    return Math.floor(this.multi);
  }
  get higherMulti() {
    return Math.floor(this.multi) + 1;
  }
  get lowerCriti() {
    return Math.floor(this.criti);
  }
  get higherCriti() {
    return Math.floor(this.criti) + 1;
  }

  get lowerMultiWidth() {
    return this.higherMulti - this.multi;
  }
  get higherMultiWidth() {
    return 1 - this.lowerMultiWidth;
  }
  get lowerCritiWidth() {
    return this.higherCriti - this.criti;
  }
  get higherCritiWidth() {
    return 1 - this.lowerCritiWidth;
  }

  get lowerMultiLowerCritiDamage() {
    let rawValue = (this.totalDamageFloor * this.lowerMulti) / this.multi;
    return +rawValue.toFixed(1);
  }
  get lowerMultiHigherCritiDamage() {
    let rawValue = (this.totalDamageCeil * this.lowerMulti) / this.multi;
    return +rawValue.toFixed(1);
  }
  get higherMultiLowerCritiDamage() {
    let rawValue = (this.totalDamageFloor * this.higherMulti) / this.multi;
    return +rawValue.toFixed(1);
  }
  get higherMultiHigherCritiDamage() {
    let rawValue = (this.totalDamageCeil * this.higherMulti) / this.multi;
    return +rawValue.toFixed(1);
  }
  render() {
    const {
      multi,
      criti,
      lowerMulti,
      higherMulti,
      lowerCriti,
      higherCriti,
      lowerMultiWidth,
      higherMultiWidth,
      lowerCritiWidth,
      higherCritiWidth,
      lowerMultiLowerCritiDamage,
      lowerMultiHigherCritiDamage,
      higherMultiLowerCritiDamage,
      higherMultiHigherCritiDamage
    } = this;
    const singleHighlevel = multi === 1 && criti > 1;
    const genLabel = (isMultiHigh: boolean, isCritiHigh: boolean) =>
      multi > 1
        ? this.$t("build.provislabel", [
            isMultiHigh ? higherMulti : lowerMulti, //
            isCritiHigh ? higherCriti : lowerCriti
          ]) + ` ( ${+((isMultiHigh ? higherMultiWidth : lowerMultiWidth) * (isCritiHigh ? higherCritiWidth : lowerCritiWidth) * 100).toFixed(1)}% )`
        : this.$t("build.provislabel0", [isCritiHigh ? higherCriti : lowerCriti]) + ` ( ${+((isCritiHigh ? higherCritiWidth : lowerCritiWidth) * 100).toFixed(1)}% )`;

    return (
      <div class="provis-container">
        <div class="lower-level multishot" vShow={!singleHighlevel && lowerMultiWidth > 0} style={{ height: 100 * lowerMultiWidth + "%" }}>
          <div vShow={lowerCritiWidth > 0.005} class={["lower-level critshot", { big: lowerCritiWidth > 0.1 }]} style={{ width: "calc(" + 100 * lowerCritiWidth + "% - 4px)" }}>
            <div class="ganta">
              <div class="title">{genLabel(false, false)}</div>
              <div class="value">{lowerMultiLowerCritiDamage}</div>
            </div>
          </div>
          <div vShow={higherCritiWidth > 0.005} class={["higher-level critshot", { big: higherCritiWidth > 0.1 }]} style={{ width: "calc(" + 100 * higherCritiWidth + "% - 4px)" }}>
            <div class="ganta">
              <div class="title">{genLabel(false, true)}</div>
              <div class="value">{lowerMultiHigherCritiDamage}</div>
            </div>
          </div>
        </div>
        <div class="higher-level multishot" vShow={singleHighlevel || higherMultiWidth > 0} style={{ height: 100 * (multi > 1 ? higherMultiWidth : 1) + "%" }}>
          <div vShow={lowerCritiWidth > 0.005} class={["lower-level critshot", { big: lowerCritiWidth > 0.1 }]} style={{ width: "calc(" + 100 * lowerCritiWidth + "% - 4px)" }}>
            <div class="ganta">
              <div class="title">{genLabel(true, false)}</div>
              <div class="value">{higherMultiLowerCritiDamage}</div>
            </div>
          </div>
          <div vShow={higherCritiWidth > 0.005} class={["higher-level critshot", { big: higherCritiWidth > 0.1 }]} style={{ width: "calc(" + 100 * higherCritiWidth + "% - 4px)" }}>
            <div class="ganta">
              <div class="title">{genLabel(true, true)}</div>
              <div class="value">{higherMultiHigherCritiDamage}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
