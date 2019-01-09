import Vue from 'vue'
import Router from 'vue-router'
import Mod from '@/views/Mod.vue'
import Huangli from '@/views/Huangli.vue'
import About from '@/views/About.vue'
import Setting from '@/views/Setting.vue'
import Alerts from '@/views/Alerts.vue'
import BuildEditor from '@/views/BuildEditor.vue'
import Simulator from '@/views/Simulator.vue'
import Palette from '@/views/Palette.vue'
import EULA from '@/views/EULA.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import Intro from '@/views/Intro.vue'
import NewUserWelcome from '@/views/NewUserWelcome.vue'
import Login from '@/views/Login.vue'
import WeaponSelector from '@/components/WeaponSelector.vue'
import WarframeSelector from '@/components/WarframeSelector.vue'
import WarframeEditor from '@/views/team/WarframeEditor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Intro', component: Intro },
    { path: '/eula', name: 'EULA', component: EULA },
    { path: '/login', name: 'Login', component: Login },
    { path: '/welcome', name: 'NewUserWelcome', component: NewUserWelcome },
    { path: '/alerts', name: 'Alerts', component: () => import(/* webpackChunkName: "main" */ "@/views/Alerts.vue") },
    { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "main" */ "@/views/About.vue") },
    { path: '/riven', name: 'Mod', component: () => import(/* webpackChunkName: "main" */ "@/views/Mod.vue") },
    { path: '/riven/:source', name: 'ModWithSource', component: () => import(/* webpackChunkName: "main" */ "@/views/Mod.vue"), props: true },
    { path: '/warframe', name: 'WarframeSelector', component: () => import(/* webpackChunkName: "main" */ "@/components/WarframeSelector.vue") },
    { path: '/warframe/:id', name: 'WarframeEditor', component: () => import(/* webpackChunkName: "main" */ "@/views/team/WarframeEditor.vue") },
    { path: '/warframe/:id/:code', name: 'WarframeEditorWithCode', component: () => import(/* webpackChunkName: "main" */ "@/views/team/WarframeEditor.vue") },
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
