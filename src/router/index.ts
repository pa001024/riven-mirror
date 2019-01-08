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
import ErrorPage from '@/views/Error.vue'
import NewUserWelcome from '@/views/NewUserWelcome.vue'
import WeaponSelector from '@/components/WeaponSelector.vue'
import WarframeSelector from '@/components/WarframeSelector.vue'
import WarframeEditor from '@/views/team/WarframeEditor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Alerts', component: Alerts },
    { path: '/news', name: 'News', component: Alerts },
    { path: '/about', name: 'About', component: About },
    { path: '/setting', name: 'Setting', component: Setting },
    { path: '/sim', name: 'Simulator', component: Simulator },
    { path: '/warframe', name: 'WarframeSelector', component: WarframeSelector },
    { path: '/warframe/:id', name: 'WarframeEditor', component: WarframeEditor },
    { path: '/warframe/:id/:code', name: 'WarframeEditorWithCode', component: WarframeEditor },
    // lazy load
    // { path: '/warframe', name: 'WarframeSelector', component: () => import(/* webpackChunkName: "team" */ "@/components/WarframeSelector.vue") },
    // { path: '/warframe/:id', name: 'WarframeEditor', component: () => import(/* webpackChunkName: "team" */ "@/components/WarframeEditor.vue") },
    // { path: '/warframe/:id/:code', name: 'WarframeEditorWithCode', component: () => import(/* webpackChunkName: "team" */ "@/components/WarframeEditor.vue") },
    { path: '/weapon', name: 'WeaponSelector', component: WeaponSelector },
    { path: '/weapon/:id', name: 'BuildEditor', component: BuildEditor },
    { path: '/weapon/:id/:code', name: 'BuildEditorWithCode', component: BuildEditor },
    { path: '/huangli', name: 'Huangli', component: Huangli },
    { path: '/riven', name: 'Mod', component: Mod },
    { path: '/riven/:source', name: 'ModWithSource', component: Mod, props: true },
    // { path: '/palette', name: 'Palette', component: () => import(/* webpackChunkName: "palette" */ "@/views/Palette.vue") },
    { path: '/palette', name: 'Palette', component: Palette },
    { path: '/eula', name: 'EULA', component: EULA },
    { path: '/welcome', name: 'NewUserWelcome', component: NewUserWelcome },
    { path: '/*', name: 'Error', component: ErrorPage },
  ]
})
