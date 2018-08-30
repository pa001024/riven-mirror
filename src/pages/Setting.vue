<template>
  <el-row type="flex" :gutter="20" justify="center">
    <el-card class="about">
      <span slot="header">{{$t("setting.lang")}}</span>
      <div class="swtich-lang">
        <span class="lang" @click="setlang('')">{{$t("setting.default")}}</span>
        <span class="lang" @click="setlang('en')">English</span>
        <span class="lang" @click="setlang('zh-CN')">简体中文</span>
        <span class="lang" @click="setlang('zh-TW')">台灣正體</span>
      </div>
    </el-card>
  </el-row>
</template>
<script lang="ts">
import _ from "lodash";
import { changeLocale } from "@/i18n";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  setlang(lang: string) {
    changeLocale(lang || navigator.language);
    location.reload();
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
