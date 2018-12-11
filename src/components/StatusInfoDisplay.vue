<template>
  <div class="status-info">
    <div class="info-block" v-for="(elValue, elType) in elementTypes" :key="elType">
      <div class="info-element-title">
        {{$t(`elements.${elType}`)}}
      </div>
      <div class="info-inline-element" v-for="(valContent, valKey) in elValue" :key="valKey">
        <div class="info-title">{{$t(`statusinfo.${valKey}`)}}</div>
        <div class="info-value">{{renderProps(valKey, valContent)}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() info: any;

  get elementTypes() { return this.info; }
  renderProps(vn: string, vv: number) {
    switch (vn) {
      case "appearRate":
      case "proportion":
      case "coverage":
      case "appearRatePerHit":
      case "appearRatePerSecond":
        return `${+(vv * 100).toFixed(2)}%`;
      case "duration":
        return `${+vv.toFixed(1)} s`;
      default:
        return +vv.toFixed(2);
    }
  }
}
</script>
<style lang="less">
.status-info {
  .info-title {
    height: 17px;
    color: #606c80;
    font-size: 12px;
  }
  .info-element-title {
    font-size: 18px;
    margin: 8px 20px;
  }
  .info-value {
    height: 22px;
    color: #202d40;
    font-size: 16px;
  }
  .info-inline-element {
    display: inline-block;
    padding: 8px 16px;
    margin: 4px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
