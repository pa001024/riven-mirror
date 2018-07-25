<template>
  <el-container id="app">
    <el-header>
      <i class="i-mirror-logo"></i>
      <h1>Riven Mirror</h1>
      <wf-watch>
      </wf-watch>
    </el-header>
    <el-container class="body-container">
      <el-aside width="80px">
        <router-link to="/">
          <el-button icon="el-icon-view" circle></el-button>
        </router-link>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IngameTime } from "./warframe";

@Component
export default class App extends Vue { }
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
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

.el-aside {
  background-color: #d9d9ff80;
  color: #333;
  text-align: center;
  padding: 4px 0;
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
  background-color: #fafafa80;
  color: #333;
}

.i-mirror-logo {
  background-image: url("assets/LOGO.png");
  width: 60px;
  height: 60px;
  background-repeat: no-repeat;
  background-position: center;
  float: left;
}
/* 高分屏适配 */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .i-mirror-logo {
    background-image: url("assets/LOGO@2x.png");
  }
}
</style>
