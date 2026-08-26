<template>
  <el-row>
    <el-col>
      <el-card class="setting">
        <template #header
          ><span>{{ $t("setting.lang") }}</span></template
        >
        <div class="switch-lang">
          <span class="lang" @click="setDefaultLang()">{{ $t("setting.default") }}</span>
          <span class="lang" @click="setlang('en')">English</span>
          <span class="lang" @click="setlang('zh-CN')">简体中文</span>
          <span class="lang" @click="setlang('zh-TW')">繁體中文</span>
          <span class="lang" @click="setlang('zh-CY')">国服中文</span>
        </div>
      </el-card>
    </el-col>
    <el-col>
      <el-card class="setting">
        <template #header
          ><span>{{ $t("setting.bugreport") }}</span></template
        >
        <div class="bug-report">
          <a class="link-btn" v-if="$t('zh')" href="https://shimo.im/forms/asziAvyhSicaOQQy/fill" target="_blank" rel="noopener">极镜用户反馈单</a>
          <a class="link-btn" v-else href="https://shimo.im/forms/olzb8RdscGgJzOZx/fill" target="_blank" rel="noopener">Riven.IM User Feedback</a>
          |
          <a class="link-btn" href="https://github.com/pa001024/riven-mirror/issues/new/choose" target="_blank" rel="noopener">GitHub</a>
        </div>
      </el-card>
    </el-col>
    <el-col>
      <el-card class="setting">
        <template #header
          ><span>{{ $t("setting.ui") }}</span></template
        >
        <div class="setting-items">
          <!-- 平台设置 -->
          <div class="setting-item">
            <div class="title">
              {{ $t("setting.platform") }}
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-radio-group class="will-invert" v-model="platform" size="small">
                <el-radio-button label="pc">{{ $t("setting.pc") }}</el-radio-button>
                <el-radio-button label="ps4">{{ $t("setting.ps4") }}</el-radio-button>
                <el-radio-button label="xb1">{{ $t("setting.xb1") }}</el-radio-button>
                <el-radio-button label="swi">{{ $t("setting.swi") }}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <!-- 夜间设置 -->
          <div class="setting-item">
            <div class="title">
              {{ $t("setting.nightmode") }}
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-switch size="small" v-model="nightMode" />
            </div>
          </div>
          <!-- 大屏模式 -->
          <div class="setting-item">
            <div class="title">
              {{ $t("setting.bigmode") }}
              <Tip :content="$t('setting.bigmodeTip')" />
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-switch size="small" v-model="bigScreen" />
            </div>
          </div>
          <!-- 紫卡编辑器 -->
          <div class="setting-item">
            <div class="title">
              {{ $t("setting.legacyriven") }}
              <Tip :content="$t('setting.legacyrivenTip')" />
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-switch size="small" v-model="legacyRivenEditor" />
            </div>
          </div>
          <!-- 爆发采样大小 -->
          <div class="setting-item">
            <div class="title">
              {{ $t("setting.burstsamplesize") }}
              <Tip :content="$t('setting.burstsamplesizeTip')" />
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-radio-group class="will-invert" v-model="burstSampleSize" size="small">
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
              {{ $t("setting.savedBuilds") }}
            </div>
            <div class="padding"></div>
            <div class="content">
              <el-button type="danger" size="small" @click="handleClearBuilds">{{ $t("setting.clear") }}</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, toNative } from "vue-facing-decorator";
import { nextTick } from "vue";
import { i18n } from "@/i18n";
import { changeLocale } from "@/i18n/plugin";
import { HMT } from "@/service/HMT";

@Component
class Setting extends Vue {
  setlang(lang: string) {
    changeLocale(lang);
    HMT.langSelect(lang);
    nextTick(() => location.reload());
  }
  setDefaultLang() {
    changeLocale(null);
    nextTick(() => location.reload());
  }

  get invert(): boolean {
    return this.$store.getters.invert;
  }
  setInvert(value: boolean): any {
    return this.$store.dispatch("setInvert", value);
  }
  // 夜间模式
  get nightMode() {
    return this.invert;
  }
  set nightMode(val: boolean) {
    this.setInvert(val);
  }

  get _bigScreen(): boolean {
    return this.$store.getters.bigScreen;
  }
  setBigScreen(value: boolean): any {
    return this.$store.dispatch("setBigScreen", value);
  }
  // 大屏模式
  get bigScreen() {
    return this._bigScreen;
  }
  set bigScreen(val: boolean) {
    this.setBigScreen(val);
  }

  get _legacyRivenEditor(): boolean {
    return this.$store.getters.legacyRivenEditor;
  }
  setLegacyRivenEditor(value: boolean): any {
    return this.$store.dispatch("setLegacyRivenEditor", value);
  }
  // 老版本紫卡编辑器
  get legacyRivenEditor() {
    return this._legacyRivenEditor;
  }
  set legacyRivenEditor(val: boolean) {
    this.setLegacyRivenEditor(val);
  }

  get _burstSampleSize(): number {
    return this.$store.getters.burstSampleSize;
  }
  setBurstSampleSize(value: number): any {
    return this.$store.dispatch("setBurstSampleSize", value);
  }
  // 老版本紫卡编辑器
  get burstSampleSize() {
    return this._burstSampleSize;
  }
  set burstSampleSize(val: number) {
    this.setBurstSampleSize(+val);
  }

  get _platform(): string {
    return this.$store.getters.platform;
  }
  setPlatform(value: string): any {
    return this.$store.dispatch("setPlatform", value);
  }
  // 老版本紫卡编辑器
  get platform() {
    return this._platform;
  }
  set platform(val: string) {
    this.setPlatform(val);
  }

  clearBuilds(): any {
    return this.$store.dispatch("clearBuilds");
  }

  handleClearBuilds() {
    this.clearBuilds();
    this.$message.success(this.$t("setting.cleared") as string);
  }
}

export default toNative(Setting);
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
  .bug-report {
    margin: 0 -8px;
    .link-btn {
      margin: 0 8px;
    }
  }
}
</style>
