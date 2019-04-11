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
          <div class="setting-item">
            <div class="title">
              {{$t('setting.nightmode')}}
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-switch size="small" v-model="nightMode"/>
            </div>
          </div>
          <!-- 大屏模式 -->
          <div class="setting-item">
            <div class="title">
              {{$t('setting.bigmode')}}
              <Tip :content="$t('setting.bigmodeTip')"/>
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-switch size="small" v-model="bigScreen"/>
            </div>
          </div>
          <!-- 紫卡编辑器 -->
          <div class="setting-item">
            <div class="title">
              {{$t('setting.legacyriven')}}
              <Tip :content="$t('setting.legacyrivenTip')"/>
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-switch size="small" v-model="legacyRivenEditor"/>
            </div>
          </div>
          <!-- 爆发采样大小 -->
          <div class="setting-item">
            <div class="title">
              {{$t('setting.burstsamplesize')}}
              <Tip :content="$t('setting.burstsamplesizeTip')"/>
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-radio-group v-model="burstSampleSize" size="mini">
                <el-radio-button :label="0"></el-radio-button>
                <el-radio-button :label="0.5"></el-radio-button>
                <el-radio-button :label="1"></el-radio-button>
                <el-radio-button :label="2"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <!-- 配置缓存 -->
          <div class="setting-item">
            <div class="title">
              {{$t('setting.savedBuilds')}}
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-button type="danger" size="mini">{{$t('setting.clear')}}</el-button>
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
  setlang(lang: string) {
    changeLocale(lang);
    HMT.langSelect(lang);
    Vue.nextTick(() => location.reload());
  }
  setDefaultLang() {
    changeLocale(null);
    Vue.nextTick(() => location.reload());
  }

  @Getter("invert") invert: boolean;
  @Action("setInvert") setInvert: (value: boolean) => void;
  // 夜间模式
  get nightMode() {
    return this.invert;
  }
  set nightMode(val: boolean) {
    this.setInvert(val);
  }

  @Getter("bigScreen") _bigScreen: boolean;
  @Action("setBigScreen") setBigScreen: (value: boolean) => void;
  // 大屏模式
  get bigScreen() {
    return this._bigScreen;
  }
  set bigScreen(val: boolean) {
    this.setBigScreen(val);
  }

  @Getter("legacyRivenEditor") _legacyRivenEditor: boolean;
  @Action("setLegacyRivenEditor") setLegacyRivenEditor: (value: boolean) => void;
  // 老版本紫卡编辑器
  get legacyRivenEditor() {
    return this._legacyRivenEditor;
  }
  set legacyRivenEditor(val: boolean) {
    this.setLegacyRivenEditor(val);
  }

  @Getter("burstSampleSize") _burstSampleSize: number;
  @Action("setBurstSampleSize") setBurstSampleSize: (value: number) => void;
  // 老版本紫卡编辑器
  get burstSampleSize() {
    return this._burstSampleSize;
  }
  set burstSampleSize(val: number) {
    this.setBurstSampleSize(+val);
  }

  @Action("clearBuilds") clearBuilds: () => void;
}
</script>
<style lang="less">
@import "../less/common.less";

.setting {
  margin: 8px;
  min-width: 20px;
  .switch-lang {
    margin: 0 -5px;
    .lang {
      margin: 5px;
      color: @theme_main;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .setting-items {
    margin: -16px 0;
    .setting-item {
      display: flex;
      flex-wrap: wrap;
      padding: 8px 0;
      margin: 0;
      border-bottom: 1px solid @text_sliver_light;

      .title {
        text-align: right;
        float: left;
        line-height: 40px;
        padding: 0 12px 0 0;
        color: @text_grey;
        vertical-align: middle;
      }
      .content {
        line-height: 40px;
      }
      &:last-child {
        margin-bottom: 0;
        border-bottom: 0;
      }
    }
  }
}
</style>
