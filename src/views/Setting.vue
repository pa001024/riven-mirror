<template>
  <el-row>
    <el-col>
      <el-card class="setting">
        <span slot="header">{{$t("setting.lang")}}</span>
        <div class="switch-lang">
          <span class="lang" @click="setDefaultLang()">{{$t("setting.default")}}</span>
          <span class="lang" @click="setlang('en')">English</span>
          <span class="lang" @click="setlang('zh-CN')">简体中文</span>
          <span class="lang" @click="setlang('zh-TW')">繁體中文</span>
          <span class="lang" @click="setlang('zh-CY')">国服中文</span>
        </div>
      </el-card>
    </el-col>
    <el-col>
      <el-card class="setting">
        <span slot="header">{{$t("setting.bugreport")}}</span>
        <div class="bug-report">
          <a class="link-btn" href="https://github.com/pa001024/riven-mirror/issues/new/choose" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </el-card>
    </el-col>
    <el-col>
      <el-card class="setting">
        <span slot="header">{{$t("setting.ui")}}</span>
        <div class="nightmode">
        </div>
        <div class="setting-items">
          <!-- 夜间设置 -->
          <div class="item">
            <label>
              {{$t('setting.nightmode')}}
            </label>
            <div class="content">
              <el-switch class="right-side" size="small" v-model="nightMode"></el-switch>
            </div>
          </div>
          <!-- 夜间设置 -->
          <div class="item" :label="$t('setting.bigmode')">
            <label>
              {{$t('setting.bigmode')}}
              <Tip :content="$t('setting.bigmodeTip')"/>
            </label>
            <div class="content">
              <el-switch class="right-side" size="small" v-model="bigScreenMode"></el-switch>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { changeLocale } from "@/i18n/plugin";
import { HMT } from "@/service/HMT";
import { Getter, Action } from "vuex-class";

@Component
export default class Setting extends Vue {
  @Getter("invert") invert: boolean;
  @Action("setInvert") setInvert: (text: boolean) => void;
  @Getter("bigScreen") bigScreen: boolean;
  @Action("setBigScreen") setBigScreen: (text: boolean) => void;

  setlang(lang: string) {
    changeLocale(lang);
    HMT.langSelect(lang);
    Vue.nextTick(() => location.reload());
  }
  setDefaultLang() {
    changeLocale(null);
    Vue.nextTick(() => location.reload());
  }

  // 夜间模式
  get nightMode() {
    return this.invert;
  }
  set nightMode(val: boolean) {
    this.setInvert(val);
  }

  // 大屏模式
  get bigScreenMode() {
    return this.bigScreen;
  }
  set bigScreenMode(val: boolean) {
    this.setBigScreen(val);
  }
}
</script>
<style lang="less">
@import "../less/common.less";

.setting {
  margin: 8px;
  min-width: 200px;
  .lang {
    margin: 5px;
    color: @theme_main;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .setting-items {
    margin: -16px 0;
    .item {
      padding: 8px 0;
      margin: 0;
      border-bottom: 1px solid @text_sliver_light;

      label {
        text-align: right;
        float: left;
        line-height: 40px;
        padding: 0 12px 0 0;
        color: @text_grey;
        vertical-align: middle;
      }
      .content {
        line-height: 40px;
        position: relative;
        .safebox();
      }
      &:last-child {
        margin-bottom: 0;
        border-bottom: 0;
      }
      .safebox();
    }
  }
}
</style>
