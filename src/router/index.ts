import Vue from 'vue'
import Router from 'vue-router'
import EULA from '@/views/EULA.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import Intro from '@/views/Intro.vue'
import NewUserWelcome from '@/views/NewUserWelcome.vue'
import Login from '@/views/Login.vue'
import ForgetPass from '@/views/ForgetPass.vue'
import { i18n } from '@/i18n';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Intro', component: Intro },
    { path: '/eula', name: 'EULA', component: EULA },
    { path: '/login', name: 'Login', component: Login },
    { path: '/forgetpass', name: 'ForgetPass', component: ForgetPass },
    { path: '/welcome', name: 'NewUserWelcome', component: NewUserWelcome },
    // ! 技能编辑器
    { path: '/vse', name: 'VisualSkillEditor', component: () => import(/* webpackChunkName: "vse" */ "@/views/VisualSkillEditor.vue") },
    // 动态加载
    { path: '/alerts', name: 'Alerts', component: () => import(/* webpackChunkName: "main" */ "@/views/Alerts.vue") },
    // { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "main" */ "@/views/About.vue") },
    { path: '/riven', name: 'Mod', component: () => import(/* webpackChunkName: "main" */ "@/views/Mod.vue") },
    { path: '/riven/:source', name: 'ModWithSource', component: () => import(/* webpackChunkName: "main" */ "@/views/Mod.vue"), props: true },
    { path: '/warframe', name: 'WarframeSelector', component: () => import(/* webpackChunkName: "main" */ "@/components/WarframeSelector.vue") },
    { path: '/warframe/:id', name: 'WarframeEditor', component: () => import(/* webpackChunkName: "main" */ "@/views/WarframeEditor.vue") },
    { path: '/warframe/:id/:code', name: 'WarframeEditorWithCode', component: () => import(/* webpackChunkName: "main" */ "@/views/WarframeEditor.vue") },
    { path: '/setting', name: 'Setting', component: () => import(/* webpackChunkName: "main" */ "@/views/Setting.vue") },
    { path: '/sim', name: 'Simulator', component: () => import(/* webpackChunkName: "main" */ "@/views/Simulator.vue") },
    { path: '/weapon', name: 'WeaponSelector', component: () => import(/* webpackChunkName: "main" */ "@/components/WeaponSelector.vue") },
    { path: '/weapon/:id', name: 'BuildEditor', component: () => import(/* webpackChunkName: "main" */ "@/views/BuildEditor.vue") },
    { path: '/weapon/:id/:code', name: 'BuildEditorWithCode', component: () => import(/* webpackChunkName: "main" */ "@/views/BuildEditor.vue") },
    { path: '/huangli', name: 'Huangli', component: () => import(/* webpackChunkName: "ex" */ "@/views/Huangli.vue") },
    { path: '/palette', name: 'Palette', component: () => import(/* webpackChunkName: "ex" */ "@/views/Palette.vue") },
    { path: '/*', name: 'Error', component: ErrorPage },
  ]
})

// 标题router
router.afterEach((to) => {
  switch (to.name) {
    case "VisualSkillEditor":
      document.title = i18n.t("title.sub", ["Skill Editor"]);
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
    case "WarframeEditor":
    case "WarframeEditorWithCode":
      // 交给组件处理
      break;
    case "WeaponSelector":
      document.title = i18n.t("title.sub", [i18n.t("navigate.weapon")]);
      break;
    case "BuildEditor":
    case "BuildEditorWithCode":
      // 交给组件处理
      break
    case "Mod":
    case "ModWithSource":
      document.title = i18n.t("title.sub", [i18n.t("navigate.riven")]);
      break;
    default:
      document.title = i18n.t("title.main");
      break;
  }
})

export default router
