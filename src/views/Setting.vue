<template>
  <el-row type="flex" :gutter="20" justify="center">
    <el-card class="setting">
      <span slot="header">{{$t("setting.lang")}}</span>
      <div class="switch-lang">
        <span class="lang" @click="setDefaultLang()">{{$t("setting.default")}}</span>
        <span class="lang" @click="setlang('en')">English</span>
        <span class="lang" @click="setlang('zh-CN')">简体中文</span>
        <span class="lang" @click="setlang('zh-TW')">繁體中文</span>
        <span class="lang" @click="setlang('zh-CY')">国服中文</span>
      </div>
      <div class="bug-report">
        <a href="https://github.com/pa001024/riven-mirror/issues/new/choose" target="_blank" rel="noopener noreferrer" v-t="'setting.bugreport'"></a>
      </div>
    </el-card>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { changeLocale } from "@/i18n/plugin";
import { HMT } from "@/service/HMT";

@Component
export default class Setting extends Vue {
  setlang(lang: string) {
    changeLocale(lang);
    HMT.langSelect(lang);
  }
  setDefaultLang() {
    changeLocale(null);
  }
}
</script>
<style lang="less">
.setting {
  .lang {
    margin: 5px;
    color: cornflowerblue;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .bug-report {
    padding: 12px 4px 8px;
  }
}
</style>
