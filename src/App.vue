<template>
  <el-container id="app">
    <el-header>
      <i class="i-mirror-logo"></i>
      <router-link tag="h1" to="/">Riven Mirror
        <span class="beta">BETA</span>
      </router-link>
      <wf-watch class="hidden-sm-and-down">
      </wf-watch>
      <button class="app-nav-button hidden-md-and-up" @click="menuOpen=!menuOpen">
        <i class="el-icon-more hidden-md-and-up"></i>
      </button>
    </el-header>
    <transition name="el-zoom-in-top">
      <ul class="app-nav-menu" v-if="menuOpen" @click="menuOpen=false">
        <router-link v-for="link in links" :key="link.title" tag="li" :to="link.path" class="menu-item">
          <i :class="link.icon"></i>
          <span class="app-nav-title">{{link.title}}</span>
        </router-link>
      </ul>
    </transition>
    <el-container class="body-container">
      <el-aside width="60px" class="hidden-sm-and-down">
        <ul class="aside-nav-menu">
          <el-tooltip v-for="link in links" :key="link.title" :content="link.title" placement="right" :enterable="false">
            <router-link tag="li" :to="link.path" class="menu-item">
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
import WarframeWatch from "./components/WarframeWatch.vue";

@Component({
  components: { "wf-watch": WarframeWatch }
})
export default class App extends Vue {
  menuOpen = false;
  links = [
    { title: "主页", path: "/news", icon: "el-icon-news" },
    { title: "紫卡分析", path: "/riven", icon: "el-icon-view" },
    { title: "武器配装", path: "/weapon", icon: "el-icon-edit-outline" },
    { title: "WF黄历", path: "/huangli", icon: "el-icon-date" },
    { title: "关于", path: "/about", icon: "el-icon-info" },
  ];
}
</script>

<style>
.app-nav-menu {
  background: #3147c1;
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
  background: #4c5ee4;
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
  margin: 10px;
  float: right;
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
  background-color: #a8c7ff;
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

html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
}
.beta {
  font-size: 0.4em;
}
.el-header,
.el-footer {
  background-color: #3d5afe;
  color: #fff;
  padding: 0 10px;
  box-shadow: 0 0 6px 0 #000;
}
.el-header h1 {
  line-height: 60px;
  margin: 0 0 0 16px;
  font-weight: normal;
  float: left;
}
ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

.el-aside {
  background-color: #ffffff80;
  color: #333;
  text-align: center;
  box-shadow: inset 0 0 8px 0px #0000001f;
}
.el-aside .el-button.is-circle {
  margin-top: 8px;
  padding: 14px;
}
.el-aside .el-button.is-circle:start {
  margin-top: 30px;
}

.el-main {
  background-color: #ececec80;
  color: #333;
}

.i-mirror-logo {
  background-image: url("assets/LOGO@2x.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  background-repeat: no-repeat;
  background-position: center;
  float: left;
}
</style>
