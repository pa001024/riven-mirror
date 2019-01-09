<template>
  <el-row type="flex" :gutter="20" justify="center">
    <el-card class="setting">
      <span slot="header">{{$t("setting.lang")}}</span>
      <div class="switch-lang">
        <span class="lang" @click="setlang('')">{{$t("setting.default")}}</span>
        <span class="lang" @click="setlang('en')">English</span>
        <span class="lang" @click="setlang('zh-CN')">简体中文</span>
        <span class="lang" @click="setlang('zh-TW')">繁體中文</span>
        <span class="lang" @click="setlang('zh-CY')">国服中文</span>
      </div>
    </el-card>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { changeLocale } from "@/i18n/plugin";

@Component
export default class Setting extends Vue {
  setlang(lang: string) {
    changeLocale(lang || navigator.language)
    // location.reload();
  }
}
</script>
<style lang="less">
.lang {
  margin: 5px;
  color: cornflowerblue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
