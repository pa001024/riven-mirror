<template>
  <div class="weapon-infobox">
    <div class="showcase">
      <div class="pic">
        <div class="pic-img">
          <img :src="imgSrc" :alt="name">
        </div>
      </div>
    </div>
    <div class="props">
      <el-tabs value="0" stretch>
        <el-tab-pane  class="mode" :label="mode.locName" :name="mid+''" :key="mid" v-for="(mode, mid) in weapon.modes">
          <div class="prop damage">
            <div class="title">{{$t(`build.damage`)}}</div>
            <div class="value">
              <div class="elem" :style="{flex:d.val}" v-for="d in renderDamage(mode.damage)" :key="d.icon">
                <div class="elem-name">
                  <WfIcon :type="d.icon" />
                </div>
                <div class="elem-val">
                  {{d.val}}
                </div>
              </div>
            </div>
          </div>
          <div class="prop" v-if="mode.fireRate">
            <div class="title">{{$t(`build.fireRate`)}}</div>
            <div class="value">{{toFixed(mode.fireRate / 60, 2)}}</div>
          </div>
          <div class="prop">
            <div class="title">{{$t(`build.crit`)}}</div>
            <div class="value">{{toPercent(mode.critChance)}}% / {{toFixed(mode.critMul, 1)}}x</div>
          </div>
          <div class="prop">
            <div class="title">{{$t(`build.proc`)}}</div>
            <div class="value">{{toPercent(mode.procChance)}}%{{mode.pellets > 1 ? ` / ${toFixed(mode.pellets, 1)}` : ''}}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { Weapon } from "@/warframe/codex";
import { CachedWikiApi } from "@/service/wiki";
// import InfoRadar from "@/components/InfoRadar.vue";

@Component({
  components: {}
})
export default class WeaponInfobox extends Vue {
  @Prop() weapon: Weapon;
  imgSrc = "/img/LOGO@4x.png";
  name = "Loading...";

  toFixed(val: number, num: number) {
    return +val.toFixed(num);
  }

  toPercent(val: number) {
    return +(val * 100).toFixed(1);
  }
  renderDamage(damage: [string, number][]) {
    return damage.map(v => ({ icon: v[0].toLowerCase(), val: v[1] }));
  }
  @Watch("weapon")
  async loadImgFromOnline() {
    this.name = "Loading...";
    this.imgSrc = await CachedWikiApi.instance.getMainImage(this.weapon.name);
    this.name = this.weapon.name;
  }
  mounted() {
    this.loadImgFromOnline();
  }
}
</script>

<style lang="less" >
@import "../../less/common.less";

.weapon-infobox {
  .showcase {
    padding: 50px;
  }
  .pic {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: "";
      border: 2px solid @theme_main;
      width: 100%;
      height: 100%;
      position: absolute;
      transform: rotate(45deg);
      transition: 1s transform;
    }
    &::after {
      content: "";
      border: 6px solid @theme_main;
      width: 100%;
      height: 100%;
      position: absolute;
      transform: rotate(45deg) scale(0.9);
      transition: 1s transform, 1s background-color;
    }
    &:hover::before {
      transform: rotate(405deg);
    }
    &:hover::after {
      background: #fff;
      transform: rotate(360deg);
    }
    .pic-img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    img {
      max-width: 95%;
      max-height: 95%;
    }
    img::after {
      content: attr(alt);
      line-height: 200px;
      text-align: center;
      font-family: SAOUI;
      font-size: 16px;
      color: #646464;
      display: block;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
  .props {
    padding: 0 4px;
    overflow: hidden;
    // 模式tab页
    .mode {
      padding: 0 2px;
      .el-tabs__nav {
        width: 100%;
        display: flex;
      }
    }
    // 属性
    .prop {
      // margin: 16px 8px;
      margin: 20px 8px;
      position: relative;
      height: 36px;
      // border: 2px solid;
      &::after {
        content: "";
        border: 2px solid @theme_main;
        width: 100%;
        height: 100%;
        position: absolute;
        transition: 1s transform;
      }
      .title {
        position: absolute;
        background: @theme_mainback;
        padding: 0px 6px;
        font-size: 14px;
        font-weight: bold;
        z-index: 1;
        // left: 8px;
        // top: -10px;
        right: 8px;
        bottom: -10px;
      }
      .value {
        position: absolute;
        z-index: 1;
        // bottom: 4px;
        // right: 8px;
        // font-size: 18px;
        top: -12px;
        left: 8px;
        font-size: 28px;
        background: @theme_mainback;
        padding: 0 14px;
      }
      &.damage {
        height: 50px;
        margin-top: 28px;
        .value {
          display: flex;
          padding: 0;
          width: 100%;
          left: -8px;
          top: -12px;
        }
        .elem {
          text-align: center;
          cursor: pointer;
          transition: 0.6s background-color;
          padding: 4px 8px;
          // border-left: 2px solid @theme_main;
          // border-right: 2px solid @theme_main;
          border: 2px solid @theme_main;
          margin: 0 -1px;
          &:hover {
            background: @light;
            // background: @theme_leaf;
          }
        }
        .elem-name {
          font-size: 20px;
        }
        .elem-val {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

