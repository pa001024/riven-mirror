import { createRouter as createVueRouter, createWebHistory, createWebHashHistory } from "vue-router";
import EULA from "@/views/EULA.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import Intro from "@/views/Intro.vue";
import Login from "@/views/Login.vue";
import ForgetPass from "@/views/ForgetPass.vue";
import { i18n } from "@/i18n";
import { HMT } from "@/service/HMT";

export function createRouter() {
  const router = createVueRouter({
    // Electron 打包后走 file:// 协议，history 模式无法工作，退化成 hash 模式
    history: location.protocol === "file:" ? createWebHashHistory() : createWebHistory(),
    routes: [
      { path: "/", name: "Intro", component: Intro },
      // Vue Router 4+ 不允许重名路由，/index.html 直接重定向到 /
      { path: "/index.html", redirect: "/" },
      { path: "/eula", name: "EULA", component: EULA },
      { path: "/login", name: "Login", component: Login },
      { path: "/forgetpass", name: "ForgetPass", component: ForgetPass },
      // ! 技能编辑器
      { path: "/vse", name: "VisualSkillEditor", component: () => import("@/views/VisualSkillEditor.vue") },
      // ! 音乐
      { path: "/music", name: "MusicEdit", component: () => import("@/views/music/MusicEdit.vue") },
      { path: "/music/:code", name: "MusicEditWithCode", component: () => import("@/views/music/MusicEdit.vue"), props: true },
      // 动态加载
      { path: "/info/:id", name: "Info", component: () => import("@/views/Info.vue"), props: true },
      { path: "/alerts", name: "Alerts", component: () => import("@/views/Alerts.vue") },
      { path: "/riven", name: "Mod", component: () => import("@/views/Mod.vue") },
      { path: "/riven-v1/:source", name: "ModRedirect", component: () => import("@/views/ModRedirect.vue"), props: true },
      { path: "/riven/:source", name: "ModWithSource", component: () => import("@/views/Mod.vue"), props: true },
      { path: "/warframe", name: "WarframeSelector", component: () => import("@/components/WarframeSelector.vue") },
      { path: "/warframe/:id", name: "WarframeEditor", component: () => import("@/views/build/WarframeBuildEditor.vue") },
      { path: "/warframe/:id/:code", name: "WarframeEditorWithCode", component: () => import("@/views/build/WarframeBuildEditor.vue") },
      { path: "/companion/:id", name: "CompanionEditor", component: () => import("@/views/build/CompanionBuildEditor.vue") },
      { path: "/companion/:id/:code", name: "CompanionEditorWithCode", component: () => import("@/views/build/CompanionBuildEditor.vue") },
      { path: "/setting", name: "Setting", component: () => import("@/views/Setting.vue") },
      { path: "/sim", name: "Simulator", component: () => import("@/views/Simulator.vue") },
      { path: "/weapon", name: "WeaponSelector", component: () => import("@/components/WeaponSelector.vue") },
      { path: "/weapon/:id", name: "BuildEditor", component: () => import("@/views/BuildEditor.vue") },
      { path: "/weapon/:id/m/:mode", name: "BuildEditorMode", component: () => import("@/views/BuildEditor.vue") },
      { path: "/weapon/:id/:code", name: "BuildEditorWithCode", component: () => import("@/views/BuildEditor.vue") },
      { path: "/weapon/:id/m/:mode/:code", name: "BuildEditorWithCodeMode", component: () => import("@/views/BuildEditor.vue") },
      { path: "/huangli", name: "Huangli", component: () => import("@/views/Huangli.vue") },
      { path: "/palette", name: "Palette", component: () => import("@/views/Palette.vue") },
      { path: "/debug", name: "Debug", component: () => import("@/views/Debug.vue") },
      // Vue Router 4+ 的 catch-all 写法
      { path: "/:pathMatch(.*)*", name: "Error", component: ErrorPage },
    ],
  });

  // 标题router
  router.afterEach(to => {
    switch (to.name) {
      case "VisualSkillEditor":
        document.title = i18n.t("title.sub", ["Skill Editor"]);
        break;
      case "Login":
        document.title = i18n.t("title.sub", [i18n.t("navigate.login")]);
        break;
      case "Alerts":
        document.title = i18n.t("title.sub", [i18n.t("navigate.index")]);
        break;
      case "Setting":
        document.title = i18n.t("title.sub", [i18n.t("navigate.setting")]);
        break;
      case "Palette":
        document.title = i18n.t("title.sub", [i18n.t("navigate.palette")]);
        break;
      case "Huangli":
        document.title = i18n.t("title.sub", [i18n.t("navigate.huangli")]);
        break;
      case "Simulator":
        document.title = i18n.t("title.sub", [i18n.t("navigate.simulator")]);
        break;
      case "WarframeSelector":
        document.title = i18n.t("title.sub", [i18n.t("navigate.warframe")]);
        break;
      case "MusicEdit":
        document.title = i18n.t("title.sub", [i18n.t("navigate.shawzin")]);
        break;
      case "WeaponSelector":
        document.title = i18n.t("title.sub", [i18n.t("navigate.weapon")]);
        break;
      case "WarframeEditor":
      case "WarframeEditorWithCode":
      case "CompanionEditor":
      case "CompanionEditorWithCode":
      case "Info":
      case "BuildEditor":
      case "BuildEditorWithCode":
        // 交给组件处理
        break;
      case "Mod":
      case "ModWithSource":
        document.title = i18n.t("title.sub", [i18n.t("navigate.riven")]);
        break;
      default:
        document.title = i18n.t("title.main");
        break;
    }
    HMT.pageViewed(to.fullPath);
  });

  return router;
}
