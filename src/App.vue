<template>
  <el-container id="app">
    <el-header>
      <router-link tag="div" class="site-logo" to="/">
        <i class="i-mirror-logo"></i>
        <h1>Riven.IM
          <span class="beta">{{magic}} {{version}}</span>
        </h1>
      </router-link>
      <MiniClock v-if="isIndexPage" class="hidden-xs-only header-watch">
      </MiniClock>
      <div class="app-nav-pad hidden-sm-and-up">
      </div>
      <button class="app-nav-button hidden-sm-and-up" @click="menuOpen = !menuOpen">
        <i class="el-icon-arrow-down"></i>
      </button>
    </el-header>
    <transition name="el-zoom-in-top">
      <div class="app-nav-menu" v-if="menuOpen" @click="menuOpen=false">
        <router-link v-for="link in links" :key="link.title" tag="div" :to="link.path" class="menu-item" :exact="link.exact">
          <i :class="link.icon"></i>
          <span class="app-nav-title">{{$t(link.title)}}</span>
        </router-link>
      </div>
    </transition>
    <el-container class="body-container">
      <el-aside width="60px" class="hidden-xs-only" v-show="isIndexPage">
        <div class="aside-nav-menu">
          <el-tooltip v-for="link in links" :key="link.title" :content="$t(link.title)" placement="right" :enterable="false">
            <router-link tag="div" :to="link.path" class="menu-item" :exact="link.exact">
              <i :class="link.icon"></i>
            </router-link>
          </el-tooltip>
        </div>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view/>
        </keep-alive>
        <el-dialog
          class="update-dialog"
          :title="$t('update.title')"
          :visible.sync="updateMessageVisible"
          :before-close="readUpdate">
          <div class="update-item" :key="i" v-for="(v,i) in updateLogs">
            <div class="title">{{v.version}}</div>
            <article class="md markdown-body" v-html="renderMD($t('zh') ? v.md.cn : v.md.en)"></article>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="readUpdate">{{$t('update.confirm')}}</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import MiniClock from "./components/MiniClock.vue";
import { RivenDataBase } from "@/warframe/codex";
import { i18n } from "@/i18n";
import markdown from "markdown-it";
import { magic, version, updateLogs } from "@/version";

const md = markdown()

@Component({ components: { MiniClock } })
export default class App extends Vue {
  menuOpen = false;
  updateMessageVisible = false;
  get isIndexPage() { return this.$route.path !== '/' }
  get magic() { return magic }
  get version() { return version }
  get updateLogs() { return updateLogs }
  get links() {
    return [
      { title: "navigate.index", path: "/alerts", icon: "el-icon-news", exact: true },
      { title: "navigate.riven", path: "/riven", icon: "el-icon-view" },
      { title: "navigate.weapon", path: "/weapon", icon: "el-icon-edit-outline" },
      { title: "navigate.warframe", path: "/warframe", icon: "el-icon-tickets" },
      { title: "navigate.simulator", path: "/sim", icon: "el-icon-refresh" },
      { title: "navigate.huangli", path: "/huangli", icon: "el-icon-date" },
      // { title: "navigate.about", path: "/about", icon: "el-icon-info" },
      { title: "navigate.palette", path: "/palette", icon: "el-icon-menu" },
      { title: "navigate.setting", path: "/setting", icon: "el-icon-setting" },
    ].filter(v => v.title !== "navigate.huangli" || i18n.locale !== "en");
  }
  renderMD(text: string) {
    return md.render(text)
  }
  readUpdate() {
    this.updateMessageVisible = false
    localStorage.setItem("lastVersion", version)
  }
  mounted() {
    RivenDataBase.reload();
    const lastVersion = localStorage.getItem("lastVersion") || "0.0.0"
    if (lastVersion !== version) {
      this.updateMessageVisible = true
    }
    // let isNewUser = !localStorage.getItem("0w0");
    // if (this.$route.path === "/" && isNewUser) {
    //   this.$router.push("/welcome");
    // }
  }
}
</script>

<style lang="less">
@import "./less/common.less";
@import "./less/markdown.less";
@font_logo: FuturaPT;

/* APP */
.update-dialog {
  .el-dialog {
    min-width: 320px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
}
.update-item {
  .title {
    font-size: 1.25rem;
    margin: 4px 0;
    &::before {
      content: "";
      display: inline-block;
      height: 1.25rem;
      width: 4px;
      border-radius: 4px;
      background: #6199ff;
      margin: 0 8px -2px 2px;
    }
  }
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 14px;
  }
}

/* 字体 */
@font-face {
  font-family: FuturaPT;
  src: url("/fonts/FuturaBT.ttf");
}
@font-face {
  font-family: SAOUI;
  src: url("/fonts/SAOUI-Regular.otf");
}
/* 全局样式 */
.app-nav-pad {
  flex: 1;
}
.app-nav-menu {
  background: #3952e0;
  color: @text_light;
  padding: 8px 0;
  position: absolute;
  overflow: hidden;
  z-index: 999;
  width: 100%;
  top: 50px;
  .menu-item {
    display: flex;
    align-items: center;
    &:hover {
      background: #5c6de8;
    }
    &:active {
      background: #707de2;
    }
    i {
      padding: 20px;
      font-size: 24px;
    }
  }
  .menu-item.router-link-active {
    background: @theme_primary;
  }
}
.app-nav-button {
  background: @theme_primary;
  color: @text_light;
  border-color: @theme_primary;
  font-size: 22px;
  line-height: 1;
  padding: 6px 12px;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  outline: 0;
  -webkit-appearance: none;
  cursor: pointer;
  white-space: nowrap;
  &:active {
    border-color: @theme_highlight;
    background-color: @theme_highlight;
  }
}
/* ASIDE */
.el-aside {
  background-color: #ffffff80;
  color: @text_main;
  text-align: center;
  box-shadow: inset 0 0 8px 0px #0000001f;
}
.aside-nav-menu {
  .menu-item {
    i {
      font-size: 24px;
      padding: 18px;
    }
    width: 100%;
    cursor: pointer;
    overflow: hidden;
    background-color: transparent;
    transition: 0.2s;
    line-height: 36px;
    display: block;
    color: @theme_main;
    &:hover {
      background-color: @theme_main;
      color: @text_light;
    }
  }
  .menu-item.router-link-active {
    background-color: @theme_leaf;
    color: @text_light;
  }
  .menu-item-title {
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    box-sizing: border-box;
    height: 100%;
    white-space: nowrap;
    float: left;
  }
}
.beta {
  font-size: 0.4em;
}
#app {
  .el-header {
    display: flex;
    align-items: center;
    background-color: @theme_primary;
    color: @text_light;
    padding: 0 10px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.25);
    text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .el-main {
    background-color: @theme_mainback;
    color: @text_main;
    padding: 0;
    > * {
      margin: 14px;
    }
  }
}
.el-header {
  h1 {
    margin: 0 0 0 16px;
    font-weight: normal;
    font-family: @font_logo;
    font-size: 24px;
    user-select: none;
  }
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
html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  font-size: 14px;
  font-family: @font_main;
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
.right {
  float: right;
}
@media only screen and (max-width: 767px) {
  #app {
    .el-header {
      height: 50px !important;
    }
  }
  .el-header {
    h1 {
      font-size: 22px;
    }
  }
  .i-mirror-logo {
    width: 50px;
    height: 50px;
  }
}
@media only screen and (max-width: 360px) {
  .el-header {
    h1 {
      font-size: 18px;
    }
  }
}
/* 移动端缩小字体 */
@media only screen and (max-width: 444px) {
  html {
    font-size: 13px;
  }
  body {
    font-size: 13px;
  }
}
</style>
