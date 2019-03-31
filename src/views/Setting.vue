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
          <a href="https://github.com/pa001024/riven-mirror/issues/new/choose" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </el-card>
    </el-col>
    <el-col>
      <el-card class="setting">
        <span slot="header">{{$t("setting.nightmode")}}</span>
        <div class="nightmode">
          <el-switch v-model="nightMode"></el-switch>
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

  setlang(lang: string) {
    changeLocale(lang);
    HMT.langSelect(lang);
  }
  setDefaultLang() {
    changeLocale(null);
  }

  get nightMode() {
    return this.invert;
  }
  set nightMode(val: boolean) {
    this.setInvert(val);
  }
}
</script>
<style lang="less">
.setting {
  margin: 8px;
  min-width: 200px;
  .lang {
    margin: 5px;
    color: cornflowerblue;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
