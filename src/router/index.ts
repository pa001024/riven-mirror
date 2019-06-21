import Vue from "vue";
import Router from "vue-router";
import EULA from "@/views/EULA.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import Intro from "@/views/Intro.vue";
import Login from "@/views/Login.vue";
import ForgetPass from "@/views/ForgetPass.vue";
import { i18n } from "@/i18n";
import { HMT } from "@/service/HMT";

// import Alerts from "@/views/Alerts.vue"
// import Mod from "@/views/Mod.vue"
// import WarframeSelector from "@/components/WarframeSelector.vue"
// import WarframeEditor from "@/views/WarframeEditor.vue"
// import Setting from "@/views/Setting.vue"
// import Simulator from "@/views/Simulator.vue"
// import BuildEditor from "@/views/BuildEditor.vue"
// import WeaponSelector from "@/components/WeaponSelector.vue"
// import Huangli from "@/views/Huangli.vue"
// import Palette from "@/views/Palette.vue"

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: "history",
    // base: "https://riven.im/",
    routes: [
      { path: "/", name: "Intro", component: Intro },
      { path: "/eula", name: "EULA", component: EULA },
      { path: "/login", name: "Login", component: Login },
      { path: "/forgetpass", name: "ForgetPass", component: ForgetPass },
      // ! 技能编辑器
      { path: "/vse", name: "VisualSkillEditor", component: () => import(/* webpackChunkName: "vse" */ "@/views/VisualSkillEditor.vue") },
      // 动态加载
      { path: "/info/:id", name: "Info", component: () => import(/* webpackChunkName: "main" */ "@/views/Info.vue"), props: true },
      { path: "/alerts", name: "Alerts", component: () => import(/* webpackChunkName: "main" */ "@/views/Alerts.vue") },
      { path: "/riven", name: "Mod", component: () => import(/* webpackChunkName: "main" */ "@/views/Mod.vue") },
      { path: "/riven/:source", name: "ModWithSource", component: () => import(/* webpackChunkName: "main" */ "@/views/Mod.vue"), props: true },
      { path: "/warframe", name: "WarframeSelector", component: () => import(/* webpackChunkName: "main" */ "@/components/WarframeSelector.vue") },
      { path: "/warframe/:id", name: "WarframeEditor", component: () => import(/* webpackChunkName: "main" */ "@/views/build/WarframeBuildEditor.vue") },
      { path: "/warframe/:id/:code", name: "WarframeEditorWithCode", component: () => import(/* webpackChunkName: "main" */ "@/views/build/WarframeBuildEditor.vue") },
      { path: "/setting", name: "Setting", component: () => import(/* webpackChunkName: "main" */ "@/views/Setting.vue") },
      { path: "/sim", name: "Simulator", component: () => import(/* webpackChunkName: "main" */ "@/views/Simulator.vue") },
      { path: "/weapon", name: "WeaponSelector", component: () => import(/* webpackChunkName: "main" */ "@/components/WeaponSelector.vue") },
      { path: "/fweapon", name: "FlexWeaponSelector", component: () => import(/* webpackChunkName: "main" */ "@/components/FlexWeaponSelector.vue") },
      { path: "/weapon/:id", name: "BuildEditor", component: () => import(/* webpackChunkName: "main" */ "@/views/BuildEditor.vue") },
      { path: "/weapon/:id/m/:mode", name: "BuildEditorMode", component: () => import(/* webpackChunkName: "main" */ "@/views/BuildEditor.vue") },
      { path: "/weapon/:id/:code", name: "BuildEditorWithCode", component: () => import(/* webpackChunkName: "main" */ "@/views/BuildEditor.vue") },
      { path: "/weapon/:id/m/:mode/:code", name: "BuildEditorWithCodeMode", component: () => import(/* webpackChunkName: "main" */ "@/views/BuildEditor.vue") },
      { path: "/huangli", name: "Huangli", component: () => import(/* webpackChunkName: "main" */ "@/views/Huangli.vue") },
      { path: "/palette", name: "Palette", component: () => import(/* webpackChunkName: "main" */ "@/views/Palette.vue") },
      { path: "/debug", name: "Debug", component: () => import(/* webpackChunkName: "main" */ "@/views/Debug.vue") },
      // { path: '/alerts', name: 'Alerts', component: Alerts },
      // { path: '/riven', name: 'Mod', component: Mod },
      // { path: '/riven/:source', name: 'ModWithSource', component: Mod, props: true },
      // { path: '/warframe', name: 'WarframeSelector', component: WarframeSelector },
      // { path: '/warframe/:id', name: 'WarframeEditor', component: WarframeEditor },
      // { path: '/warframe/:id/:code', name: 'WarframeEditorWithCode', component: WarframeEditor },
      // { path: '/setting', name: 'Setting', component: Setting },
      // { path: '/sim', name: 'Simulator', component: Simulator },
      // { path: '/weapon', name: 'WeaponSelector', component: WeaponSelector },
      // { path: '/weapon/:id', name: 'BuildEditor', component: BuildEditor },
      // { path: '/weapon/:id/:code', name: 'BuildEditorWithCode', component: BuildEditor },
      // { path: '/huangli', name: 'Huangli', component: Huangli },
      // { path: '/palette', name: 'Palette', component: Palette },
      { path: '/*', name: 'Error', component: ErrorPage },
    ]
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
      case "WeaponSelector":
        document.title = i18n.t("title.sub", [i18n.t("navigate.weapon")]);
        break;
      case "WarframeEditor":
      case "WarframeEditorWithCode":
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
