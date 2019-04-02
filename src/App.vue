<template>
  <el-container id="app" :class="{fullpage:isFullPage, nosidebar:isIndexPage}">
    <header class="main-header" v-if="!isFullPage">
      <router-link tag="div" class="site-logo" to="/">
        <i class="i-mirror-logo"></i>
        <h1>Riven.IM
          <span class="beta">{{magic}} {{version}}</span>
        </h1>
      </router-link>
      <MiniClock v-if="!isIndexPage" class="hidden-xs-only header-watch"/>
      <!-- padding -->
      <div class="app-nav-pad"></div>
      <!-- PC端用户登录界面 -->
      <!-- <router-link to="/login" class="app-login-container">
        <div class="hidden-xs-only app-login">
          <WfIcon type="fingerprint"/>
          <span class="app-login-title">{{$t("app.login")}}</span>
        </div>
      </router-link> -->
      <!-- 移动端菜单按钮 -->
      <button class="app-nav-button hidden-sm-and-up" @click="menuOpen = !menuOpen">
        <WfIcon type="menu"></WfIcon>
      </button>
    </header>
    <!-- 移动端弹出菜单 -->
    <transition name="el-zoom-in-top">
      <div class="app-nav-menu hidden-sm-and-up" v-if="menuOpen" @click="menuOpen=false" tabindex="0">
        <router-link v-for="link in links" :key="link.title" tag="div" :to="link.path" class="menu-item" :exact="link.exact">
          <WfIcon :type="link.icon"></WfIcon>
          <span class="app-nav-title">{{$t(link.title)}}</span>
        </router-link>
      </div>
    </transition>
    <el-container class="body-container">
      <!-- 桌面端侧边菜单 -->
      <el-aside width="60px" class="pc-aside hidden-xs-only" v-if="!isIndexPage">
        <div class="aside-nav-menu">
          <el-tooltip v-for="link in links" :key="link.title" :content="$t(link.title)" placement="right" :enterable="false">
            <router-link tag="div" :to="link.path" class="menu-item" :exact="link.exact">
              <WfIcon :type="link.icon"></WfIcon>
            </router-link>
          </el-tooltip>
        </div>
      </el-aside>
      <main class="main-container" @click="menuOpen=false">
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
            <div class="date">{{$d(new Date(v.date), 'short')}}</div>
            <article class="md markdown-body" v-html="renderMD($t('zh') ? v.md.cn : v.md.en)"></article>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="readUpdate">{{$t('update.confirm')}}</el-button>
          </span>
        </el-dialog>
      </main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import MiniClock from "@/components/MiniClock.vue";
import WfIcon from "@/components/WfIcon.vue";
import { RivenDataBase } from "@/warframe/codex";
import { i18n } from "@/i18n";
import markdown from "markdown-it";
import { magic, version, updateLogs } from "@/version";
import localStorage from "universal-localstorage";
import { Getter, Action } from "vuex-class";
import "./less/app.less";

const md = markdown();

@Component({ components: { MiniClock, WfIcon } })
export default class App extends Vue {
  menuOpen = false;
  updateMessageVisible = false;

  @Getter("invert") invert: boolean;

  @Watch("invert")
  themeChange() {
    document.body.className = this.invert ? "invert-theme" : "";
  }

  get isIndexPage() {
    return this.isFullPage || ["VisualSkillEditor", "Login", "ForgetPass", "EULA"].includes(this.$route.name);
  }
  get isFullPage() {
    return [].includes(this.$route.name);
  }
  get magic() {
    return magic;
  }
  get version() {
    return version;
  }
  get updateLogs() {
    return updateLogs;
  }
  get links() {
    return [
      // { title: "app.login", path: "/login", icon: "fingerprint" },
      { title: "navigate.index", path: "/alerts", icon: "world", exact: true },
      { title: "navigate.riven", path: "/riven", icon: "motion" },
      { title: "navigate.weapon", path: "/weapon", icon: "extension" },
      { title: "navigate.warframe", path: "/warframe", icon: "people" },
      { title: "navigate.simulator", path: "/sim", icon: "renew" },
      { title: "navigate.huangli", path: "/huangli", icon: "date" },
      // { title: "navigate.about", path: "/about", icon: "el-icon-info" },
      { title: "navigate.palette", path: "/palette", icon: "palette" },
      { title: "navigate.setting", path: "/setting", icon: "settings" }
    ].filter(v => v.title !== "navigate.huangli" || i18n.locale !== "en");
  }
  renderMD(text: string) {
    return md.render(text);
  }
  readUpdate() {
    this.updateMessageVisible = false;
    localStorage.setItem("lastVersion", version);
  }
  mounted() {
    RivenDataBase.reload();
    const lastVersion = localStorage.getItem("lastVersion") || "0.0.0";
    if (lastVersion !== version) this.updateMessageVisible = true;
  }
}
</script>
