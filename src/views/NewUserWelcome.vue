<template>
  <div class="welcome-container">
    <el-card class="welcome index-card">
      <span class="header" slot="header">欢迎!</span>
      <ul class="welcome-body">
        <el-alert title="您可能是第一次来到本网站，请查看以下资料了解本站的使用方法" type="warning" :closable="false" />
        <el-button @click="goback" type="primary"><i class="el-icon-back"></i> 返回之前浏览</el-button>
        <a target="_blank" href="https://warframe.huijiwiki.com/wiki/blog:RivenMirror"><el-button type="success">使用说明(WIKI)</el-button></a>
        <a target="_blank" href="https://www.bilibili.com/video/av31311040/"><el-button type="success">视频教程(bilibili)</el-button></a>
        <br>
        <el-button type="info" @click="showVideo = !showVideo">{{videoTipText}}</el-button>
        <br>
        <transition name="el-zoom-in-top">
          <iframe v-show="showVideo" class="biliplayer" src="//player.bilibili.com/player.html?aid=31311040&cid=54712295&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
        </transition>
        <p>注: 如果使用手机浏览，请查看右上角菜单使用更多功能</p>
        <p><span style="color: #f66">如需帮助请加入QQ群: 165371868</span></p>
      </ul>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  showVideo = false;
  get videoTipText() { return this.showVideo ? "隐藏视频" : "点击显示内嵌视频"; }
  mounted() {
    setTimeout(() => {
      localStorage.setItem("0w0", "yes");
    }, 5e3);
  }
  goback() {
    localStorage.setItem("0w0", "yes");
    history.back();
  }
}
</script>
<style lang="less">
.welcome {
  .header {
    font-size: 1.3em;
  }
  .welcome-body {
    padding: 12px;
    & > * {
      margin: 8px 0;
    }
    button {
      margin-right: 16px;
    }
    p {
      font-size: 1.2em;
    }
  }
}
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
