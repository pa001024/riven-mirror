<template>
  <div class="welcome-container">
    <el-card class="welcome">
      <span slot="header">欢迎!</span>
      <div class="content">
        你可能是第一次来到本网站，请务必查看<a target="_blank" href="https://www.bilibili.com/video/av31311040/">使用教程</a>：<br>
        <iframe class="biliplayer" src="//player.bilibili.com/player.html?aid=31311040&cid=54712295&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe><br>
        (注: 如果你是手机打开，菜单在右上角)
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { changeLocale } from "@/i18n";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  mounted() {
    setTimeout(() => {
      localStorage.setItem("0w0", "yes");
    }, 5e3);
  }
}
</script>
<style lang="less">
.biliplayer {
  margin: 12px 0;
  width: calc(100vw - 82px);
  height: calc(63vw - 49px);
}
@media only screen and (min-width: 767px) {
  .biliplayer {
    width: calc(100vw - 142px);
    height: calc(63vw - 67px);
  }
}
@media only screen and (min-width: 1200px) {
  .biliplayer {
    width: 1058px;
    height: 689px;
  }
}
</style>
