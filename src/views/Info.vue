<template>
  <el-container class="weapon-info">
    <el-header class="info-bar">
      <div class="info-header-outer">
        <header class="info-header">
          <div class="header-block">
            <h1 :class="{en:!$t('zh')}" v-t="weapon.id"></h1>
            <h2 v-if="$t('zh')" v-text="weapon.name"></h2>
          </div>
        </header>
      </div>
      <div>
        <el-tabs class="info-vistab" v-model="activeTab">
          <el-tab-pane :label="$t('info.data')" name="data"></el-tab-pane>
          <el-tab-pane :label="$t('info.eco')" name="eco"></el-tab-pane>
          <el-tab-pane :label="$t('info.build')" name="build"></el-tab-pane>
        </el-tabs>
      </div>
    </el-header>
    <div class="info-body">
      <div class="info-box">
        <WeaponInfobox :weapon="weapon"/>
      </div>
      <div class="info-data" v-show="activeTab === 'data'">
        <header class="nav-header">
          <WfIcon type="compass"/>
          {{$t("info.nav")}}
        </header>
        <div class="info-btn-box">
          <router-link :to="'/weapon/'+weapon.url" class="info-btn">
            <WfIcon type="extension"/>
            {{$t("navigate.weapon")}}
          </router-link>
          <a :href="$t('otherinfo.wikiurl', [weapon.url])" target="_blank" rel="noopener noreferrer" class="info-btn">
            {{$t("otherinfo.wiki")}}
          </a>
          <a v-if="$t('zh')" :href="$t('otherinfo.wikiurlen', [weapon.url])" target="_blank" rel="noopener noreferrer" class="info-btn">
            {{$t("otherinfo.wikien")}}
          </a>
          <a :href="weapon.wmrivenurl" target="_blank" rel="noopener noreferrer" class="info-btn">
            {{$t("otherinfo.wmriven")}}
          </a>
          <a :href="`https://riven.market/list/PC/${weapon.baseurl}`" target="_blank" rel="noopener noreferrer" class="info-btn">
            {{$t("otherinfo.rm")}}
          </a>
          <a v-if="weapon.wmurl" :href="`https://warframe.market/items/${weapon.wmurl}`" target="_blank" rel="noopener noreferrer" class="info-btn">
            {{$t("otherinfo.wm")}}
          </a>
        </div>
        <header class="nav-header">
          <WfIcon type="stats"/>
          {{$t("info.riven")}}
        </header>
        <div class="info-riven-price riven-price">
          <RivenPriceView :weapon="weapon"/>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { Zaw, Kitgun, Amp, RivenDatabase, Weapon, WeaponDatabase } from "@/warframe/codex";
import WeaponInfobox from "@/components/infobox/WeaponInfobox.vue";
import RivenPriceView from "@/components/RivenPriceView.vue";
import { RivenMod } from "../warframe/rivenmod";
// import InfoRadar from "@/components/InfoRadar.vue";
import { Getter, Action } from "vuex-class";

function loadWeapon(id: string) {
  if (id.startsWith("ZAW-")) {
    return new Zaw(id);
  } else if (id.startsWith("KITGUN-")) {
    return new Kitgun(id);
  } else if (id.startsWith("AMP-")) {
    return new Amp(id);
  } else {
    return WeaponDatabase.getWeaponByName(id.replace(/_/g, " "));
  }
}
@Component({
  components: { WeaponInfobox, RivenPriceView },
  beforeRouteEnter(to, from, next) {
    const weapon = loadWeapon(to.params.id);
    if (weapon) {
      document.title = i18n.t("title.sub", [i18n.t("title.info", [weapon.displayName])]);
      next();
    } else next("/NotFound");
  }
})
export default class WeaponInfo extends Vue {
  @Prop() id: string;
  private _weapon: Weapon;
  private _lastid = "";
  @Getter("lastWeekly") lastWeekly: number;
  @Action("getWeekly") getWeekly: () => void;

  activeTab = "data";

  get weapon() {
    if (this.id !== this._lastid) this.reload();
    return this._weapon;
  }
  @Watch("id")
  reload() {
    if (!this.id || this._lastid === this.id || this.$route.name !== "Info") return;
    this._lastid = this.id;
    this._weapon = loadWeapon(this.id);
  }

  mounted() {
    this.reload();
    // 紫卡交易数据初始化
    if (Date.now() - this.lastWeekly > 36e5) {
      console.log("update riven price...");
      this.getWeekly();
    }
  }
}
</script>

<style lang="less" >
@import "../less/common.less";
.weapon-info {
  margin: 0;
  .info-bar {
    padding: 0;
    border-bottom: 2px solid #e4e7ed;
    background: @text_darkerblue;
    display: flex;
  }
  .info-header-outer {
    flex: 1;
    max-width: 314px;
  }
  .info-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    text-shadow: 1px 1px 1px @shadow;

    .header-block {
      height: 60px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      padding: 0 20px;
      background: @theme_main;
      color: @text_light;
    }
    h1 {
      font-size: 1.53rem;
    }
    h2 {
      font-size: 1.1rem;
      font-weight: 400;
      font-family: SAOUI;
    }
    h1.en {
      font-size: 1.42rem;
      font-family: SAOUI;
    }
  }
  .info-vistab {
    line-height: 60px;
    padding-right: 20px;
    .el-tabs__item {
      font-size: 1.2rem;
      color: #ffffff80;
      &.is-active {
        color: #6199ff;
      }
    }
    .el-tabs__active-bar {
      height: 4px;
    }
  }
  .info-body {
    .weapon-infobox {
      margin: 8px;
    }
    display: flex;
    flex-wrap: wrap;
  }
  .info-box {
    width: 314px;
  }
  .info-data {
    flex: 1;
    padding: 8px;
  }
  .nav-header {
    font-size: 22px;
    font-weight: 600;
    padding: 12px 8px 8px;
    margin-bottom: 8px;
  }
}
// 紫卡
.riven-price.info-riven-price {
  .price-box.price-box {
    padding: 0;
  }
  .price.price.avg {
    border-radius: 8px;
  }
}
.info-btn-box {
  display: flex;
  flex-wrap: wrap;
  > * {
    flex: 1;
  }
}
// 导航
.info-btn {
  height: 80px;
  min-width: 80px;
  display: inline-flex;
  margin: 0.5px;
  padding: 0 20px;
  background: @theme_main;
  color: @text_light;
  text-decoration: none;
  box-shadow: 4px 4px @theme_back;
  transition: 0.4s;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    background: @theme_leaf;
  }
}
@media only screen and (max-width: 767px) {
  .weapon-info {
    .info-box,
    .info-data {
      width: 100%;
      max-width: unset;
    }
  }
}
</style>

