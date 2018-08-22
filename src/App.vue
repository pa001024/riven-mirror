<template>
  <el-container id="app">
    <el-header>
      <router-link tag="div" class="site-logo" to="/">
        <i class="i-mirror-logo"></i>
        <h1>Riven Mirror
          <span class="beta">ALPHA</span>
        </h1>
      </router-link>
      <MiniClock class="hidden-xs-only header-watch">
      </MiniClock>
      <div class="app-nav-pad hidden-sm-and-up">
      </div>
      <button class="app-nav-button hidden-sm-and-up" @click="menuOpen = !menuOpen">
        <!-- <i class="el-icon-more"></i> -->
        ☰
      </button>
    </el-header>
    <transition name="el-zoom-in-top">
      <ul class="app-nav-menu" v-if="menuOpen" @click="menuOpen=false">
        <router-link v-for="link in links" :key="link.title" tag="li" :to="link.path" class="menu-item" :exact="link.exact">
          <i :class="link.icon"></i>
          <span class="app-nav-title">{{link.title}}</span>
        </router-link>
      </ul>
    </transition>
    <el-container class="body-container">
      <el-aside width="60px" class="hidden-xs-only">
        <ul class="aside-nav-menu">
          <el-tooltip v-for="link in links" :key="link.title" :content="link.title" placement="right" :enterable="false">
            <router-link tag="li" :to="link.path" class="menu-item" :exact="link.exact">
              <i :class="link.icon"></i>
            </router-link>
          </el-tooltip>
        </ul>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import MiniClock from "./components/MiniClock.vue";

@Component({
  components: { MiniClock }
})
export default class App extends Vue {
  menuOpen = false;
  links = [
    { title: "主页", path: "/", icon: "el-icon-news", exact: true },
    { title: "紫卡分析", path: "/riven", icon: "el-icon-view" },
    { title: "武器配装", path: "/weapon", icon: "el-icon-edit-outline" },
    { title: "洗卡模拟", path: "/sim", icon: "el-icon-refresh" },
    { title: "WF黄历", path: "/huangli", icon: "el-icon-date" },
    { title: "关于", path: "/about", icon: "el-icon-info" },
  ];
}
</script>

<style>
.app-nav-pad {
  flex: 1;
}
/* APP */
.app-nav-menu {
  background: #3952e0;
  color: white;
  padding: 8px 0;
  transition: 0.5s;
  position: absolute;
  overflow: hidden;
  z-index: 999;
  width: 100%;
  top: 60px;
}
.app-nav-menu .menu-item {
  display: flex;
  align-items: center;
}
.app-nav-menu .menu-item.router-link-active {
  background: #3d5afe;
}
.app-nav-menu .menu-item:hover {
  background: #5c6de8;
}
.app-nav-menu .menu-item:active {
  background: #707de2;
}
.app-nav-menu .menu-item i {
  padding: 20px;
  font-size: 24px;
}
.app-nav-button {
  background: #3d5afe;
  color: white;
  border-color: #3d5afe;
  font-size: 25px;
  line-height: 1;
  padding: 6px 12px;
  border: 1px solid #768aff;
  border-radius: 4px;
  box-sizing: border-box;
  outline: 0;
  -webkit-appearance: none;
  cursor: pointer;
  white-space: nowrap;
}
.app-nav-button:active {
  border-color: #768aff;
  background-color: #768aff;
}
/* ASIDE */
.el-aside {
  background-color: #ffffff80;
  color: #333;
  text-align: center;
  box-shadow: inset 0 0 8px 0px #0000001f;
}
.aside-nav-menu .menu-item i {
  font-size: 24px;
  padding: 18px;
}
.aside-nav-menu .menu-item {
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  background-color: transparent;
  transition: 0.2s;
  line-height: 36px;
  display: block;
  color: #6199ff;
}
.aside-nav-menu .menu-item.router-link-active {
  background-color: #89b2fd;
  color: white;
}
.aside-nav-menu .menu-item:hover {
  background-color: #6199ff;
  color: white;
}
.aside-nav-menu .menu-item-title {
  font-size: 16px;
  font-weight: normal;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  white-space: nowrap;
  float: left;
}

.beta {
  font-size: 0.4em;
}
#app .el-header {
  display: flex;
  align-items: center;
  background-color: #3d5afe;
  color: #fff;
  padding: 0 10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.25);
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.el-header h1 {
  margin: 0 0 0 16px;
  font-weight: normal;
  font-family: FuturaPT, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 24px;
  user-select: none;
}
.el-main {
  background-color: #ecf0f1;
  color: #333;
}
.site-logo {
  display: flex;
  align-items: inherit;
  cursor: pointer;
}
.header-watch {
  margin-left: 60px;
}
.i-mirror-logo {
  background-image: url("assets/LOGO@4x.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  background-repeat: no-repeat;
  background-position: center;
  float: left;
}
/* 字体 */

@font-face {
  font-family: FuturaPT;
  src: url("/static/fonts/Futura Heavy Italic BT.ttf");
}
@font-face {
  font-family: SAOUI;
  src: url("/static/fonts/SAOUI-Regular.otf");
}
@font-face {
  font-family: WF;
  src: url("/static/fonts/WF.ttf");
}

[class*=" wf-icon-"],
[class^="wf-icon-"] {
  font-family: WF !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}

.wf-icon-sortie::before {
  content: "";
}
.wf-icon-alert::before {
  content: "";
}
.wf-icon-fissure::before {
  content: "";
}
.wf-icon-earth::before {
  content: "";
}
.wf-icon-grineer::before {
  content: "";
}
.wf-icon-corpus::before {
  content: "";
}
.wf-icon-infestation::before,
.wf-icon-infested::before {
  content: "";
}
.wf-icon-orokin::before,
.wf-icon-corrupted::before {
  content: "";
}
.wf-icon-crossfire::before {
  content: "";
}
.wf-icon-madurai::before {
  content: "";
}
.wf-icon-naramon::before {
  content: "";
}
.wf-icon-vazarin::before {
  content: "";
}
/* .wf-icon-zenurik::before {
  content: "";
}
.wf-icon-umbra::before {
  content: "";
}
.wf-icon-unairu::before {
  content: "";
} */

/* 全局样式 */

html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}
.block {
  display: block;
  width: 100%;
}
ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
