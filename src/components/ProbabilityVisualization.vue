<template>
  <div class="provis-container">
    <div class="lower-level multishot" v-if="lowerMultiWidth > 0" :style="{ height: 100 * lowerMultiWidth + '%' }">
      <div class="lower-level critshot" :class="{ big: lowerCritiWidth > 0.2 }" :style="{ width: 'calc(' + 100 * lowerCritiWidth + '% - 4px)' }">
        <div class="ganta">
          <div class="title">{{$t("build.provislabel", [lowerMulti, lowerCriti])}}</div>
          <div class="value">{{lowerMultiLowerCritiDamage}}</div>
        </div>
      </div>
      <div class="higher-level critshot" :class="{ big: higherCritiWidth > 0.2 }" :style="{ width: 'calc(' + 100 * higherCritiWidth + '% - 4px)' }">
        <div class="ganta">
          <div class="title">{{$t("build.provislabel", [lowerMulti, higherCriti])}}</div>
          <div class="value">{{lowerMultiHigherCritiDamage}}</div>
        </div>
      </div>
    </div>
    <div class="higher-level multishot" :style="{ height: 100 * higherMultiWidth + '%' }">
      <div class="lower-level critshot" :class="{ big: lowerCritiWidth > 0.2 }" :style="{ width: 'calc(' + 100 * lowerCritiWidth + '% - 4px)' }">
        <div class="ganta">
          <div class="title">{{lowerMultiWidth > 0 ? $t("build.provislabel", [higherMulti, lowerCriti]) : $t("build.provislabel0", [lowerCriti])}}</div>
          <div class="value">{{higherMultiLowerCritiDamage}}</div>
        </div>
      </div>
      <div class="higher-level critshot" :class="{ big: higherCritiWidth > 0.2 }" :style="{ width: 'calc(' + 100 * higherCritiWidth + '% - 4px)' }">
        <div class="ganta">
          <div class="title">{{lowerMultiWidth > 0 ? $t("build.provislabel", [higherMulti, higherCriti]) : $t("build.provislabel0", [higherCriti])}}</div>
          <div class="value">{{higherMultiHigherCritiDamage}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ProbabilityVisualization extends Vue {
  @Prop({ type: Number }) criti: number;
  @Prop({ type: Number }) critMul: number;
  @Prop({ type: Number, default: 0 }) multi: number;
  @Prop({ type: Number }) totalDamage: number;

  get lowerMulti() { return Math.floor(this.multi); }
  get higherMulti() { return Math.ceil(this.multi); }
  get lowerCriti() { return Math.floor(this.criti); }
  get higherCriti() { return Math.ceil(this.criti); }

  get lowerMultiWidth() { return this.higherMulti - this.multi; }
  get higherMultiWidth() { return 1 - this.lowerMultiWidth; }
  get lowerCritiWidth() { return this.higherCriti - this.criti; }
  get higherCritiWidth() { return 1 - this.lowerCritiWidth; }

  get lowerMultiLowerCritiDamage() {
    let rawValue = this.totalDamage * this.lowerMulti / this.multi * this.calcCD(this.lowerCriti) / this.calcCD(this.criti);
    return +rawValue.toFixed(1)
  }
  get lowerMultiHigherCritiDamage() {
    let rawValue = this.totalDamage * this.lowerMulti / this.multi * this.calcCD(this.higherCriti) / this.calcCD(this.criti);
    return +rawValue.toFixed(1)
  }
  get higherMultiLowerCritiDamage() {
    let rawValue = this.totalDamage * this.higherMulti / this.multi * this.calcCD(this.lowerCriti) / this.calcCD(this.criti);
    return +rawValue.toFixed(1)
  }
  get higherMultiHigherCritiDamage() {
    let rawValue = this.totalDamage * this.higherMulti / this.multi * this.calcCD(this.higherCriti) / this.calcCD(this.criti);
    return +rawValue.toFixed(1)
  }

  calcCD(critChance: number) {
    return critChance * (this.critMul - 1) + 1
  }
}
</script>

<style lang="less">
@lmlc-color: #e2e2e2;
@lmhc-color: #ddf8ab;
@hmlc-color: #f3e098;
@hmhc-color: #ffbbbb;

.provis-container {
  height: 400px;
  .lower-level {
    .lower-level {
      background-color: @lmlc-color;
      .ganta {
        top: 4px;
        left: 4px;
      }
    }
    .higher-level {
      background-color: @lmhc-color;
      .ganta {
        top: 4px;
        right: 4px;
      }
    }
  }
  .higher-level {
    .lower-level {
      background-color: @hmlc-color;
      .ganta {
        left: 4px;
        bottom: 4px;
      }
    }
    .higher-level {
      background-color: @hmhc-color;
      .ganta {
        right: 4px;
        bottom: 4px;
      }
    }
  }
  .critshot {
    float: left;
    height: 100%;
    margin: 2px;
    border-radius: 4px;
    border: 2px solid #c0c4cc;
    box-sizing: border-box;
    transition: all 0.4s;
    position: relative;
    &:hover,
    &.big {
      border-color: #fff;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
      .ganta {
        opacity: 1;
      }
    }
  }
  .ganta {
    z-index: 1;
    position: absolute;
    opacity: 0;
    padding: 4px 8px;
    background: #fafafa;
    border-radius: 4px;
    border: 1px solid #909399;
    .title {
      height: 17px;
      color: #606c80;
      font-size: 0.85rem;
    }
    .value {
      font-size: 1.8rem;
    }
  }
}
</style>

