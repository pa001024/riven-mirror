<template>
  <div class="riven-price" v-if="enable">
    <el-collapse>
      <el-collapse-item :title="$t(`riven.viewprice`)" name="1">
        <el-row class="price-box">
          <el-col :xs="24" :md="8" v-for="price in prices" :key="price.name" class="price-view" :class=[price.name]>
            <div class="price avg">
              <div class="header">
                {{price.name === "veliedPrice" ? $t(`weaponselector.${mod.weapon.modcn.name}`) : mod.weapon.name}} {{$t(`riven.${price.name}`)}}
              </div>
              <div class="value">{{formatPrice(price.avg)}}</div>
              <div class="title" v-t="'riven.avg'"></div>
            </div>
            <div class="price stddev">
              <div class="value">{{formatPrice(price.stddev)}}</div>
              <div class="title" v-t="'riven.stddev'"></div>
            </div>
            <div class="price min">
              <div class="value">{{formatPrice(price.min)}}</div>
              <div class="title" v-t="'riven.min'"></div>
            </div>
            <div class="price max">
              <div class="value">{{formatPrice(price.max)}}</div>
              <div class="title" v-t="'riven.max'"></div>
            </div>
            <div class="price pop">
              <div class="value">{{formatPrice(price.pop)}}</div>
              <div class="title" v-t="'riven.pop'"></div>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ModBuild } from "@/warframe/modbuild";
import { CachedWikiApi } from "@/service/wiki";
import { RivenMod } from "@/warframe/rivenmod";
import { WeeklyRivenInfo } from "@/warframe/weeklyriven";
import { Getter, Action } from "vuex-class";

@Component({ components: {} })
export default class RivenPrice extends Vue {
  @Prop() mod: RivenMod;
  @Getter("priceData") priceData: WeeklyRivenInfo[];

  get enable() {
    return this.priceData;
  }

  // 未开价格
  get veliedPrice() {
    const query = `${this.mod.weapon.mod} Riven Mod`;
    return this.priceData.find(v => v.itemType === query && !v.compatibility);
  }
  // 普卡
  get rolledPrice() {
    return this.priceData.find(v => v.compatibility === this.mod.name.toUpperCase() && v.rerolled);
  }
  // 未洗
  get unrolledPrice() {
    return this.priceData.find(v => v.compatibility === this.mod.name.toUpperCase() && !v.rerolled);
  }

  get prices() {
    return [
      { name: "veliedPrice", ...this.veliedPrice }, //
      { name: "unrolledPrice", ...this.unrolledPrice },
      { name: "rolledPrice", ...this.rolledPrice }
    ];
  }

  formatPrice(n: number) {
    if (!n) return;
    const base = n < 0 ? n.toFixed(1).substr(1) : n.toFixed(1);
    if (base.length < 5) return (n < 0 ? "-" : "") + base;
    const head = base.substr(0, (base.length - 2) % 3 || 3);
    const tail = base.substr(base.length - 2);
    const body = base.substr(head.length, base.length - head.length - tail.length);
    return (n < 0 ? "-" : "") + head + body.replace(/\d{3}(?=)/g, v => "," + v) + tail;
  }
  // mounted() {}
}
</script>
<style lang="less">
@import "../less/common.less";

.riven-price {
  .el-collapse {
    border: 0;
  }
  .el-collapse-item {
    & + .el-collapse-item {
      .el-collapse-item__header {
        padding-top: 0;
      }
    }
  }
  .el-collapse-item__header {
    color: @text_light !important;
    padding: 0px 0 0 16px;
    line-height: 32px;
    background: unset;
    border: 0;
    margin: 8px 8px 0;
    height: auto;
    border-radius: 20px;
    background-color: @theme_primary;
    background-image: linear-gradient(90deg, @theme_primary 0%, @theme_lighter2 100%);
  }
  .el-collapse-item__wrap {
    background: unset;
    border: 0;
  }
  .el-collapse-item__content {
    padding-bottom: 14px;
  }
  .el-collapse-item__arrow {
    line-height: 32px;
    margin-right: 16px;
    color: @text_light;
  }
  .price-box {
    padding: 0 24px;
  }
  .price {
    display: inline-block;
    padding: 4px;
    margin: 0 4px;
    .value {
      font-size: 0.9rem;
      white-space: nowrap;
    }
    .title {
      color: @text_grey;
      font-size: 0.6rem;
    }
    .header {
      color: @theme_highlight;
      text-shadow: 1px 1px 2px @shadow;
      border-bottom: 1px solid;
      padding: 0 0 4px;
    }
  }
  .price.avg {
    display: block;
    background: @theme_back;
    padding: 8px;
    border-radius: 0 0 8px 8px;
    margin: 0 4px;
    .value {
      font-size: 1.4rem;
    }
    .title {
      font-size: 0.8rem;
    }
  }
}
</style>
