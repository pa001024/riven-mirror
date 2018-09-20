import Vue from 'vue'
import Router from 'vue-router'
import Mod from '@/pages/Mod.vue'
import Huangli from '@/pages/Huangli.vue'
import About from '@/pages/About.vue'
import Setting from '@/pages/Setting.vue'
import Index from '@/pages/Index.vue'
import BuildEditor from '@/pages/BuildEditor.vue'
import Simulator from '@/pages/Simulator.vue'
import Palette from '@/pages/Palette.vue'
import EULA from '@/pages/EULA.vue'
import NewUserWelcome from '@/pages/NewUserWelcome.vue'
import WeaponSelector from '@/components/WeaponSelector.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Index', component: Index },
    // { path: '/news', name: 'IndexNews', component: Index },
    { path: '/about', name: 'About', component: About },
    { path: '/setting', name: 'Setting', component: Setting },
    { path: '/sim', name: 'Simulator', component: Simulator },
    { path: '/weapon', name: 'WeaponSelector', component: WeaponSelector },
    { path: '/weapon/:id', name: 'BuildEditor', component: BuildEditor },
    { path: '/weapon/:id/:code', name: 'BuildEditorWithCode', component: BuildEditor },
    { path: '/huangli', name: 'Huangli', component: Huangli },
    { path: '/riven', name: 'Mod', component: Mod },
    { path: '/riven/:source', name: 'ModWithSource', component: Mod, props: true },
    { path: '/palette', name: 'Palette', component: Palette },
    { path: '/eula', name: 'EULA', component: EULA },
    { path: '/welcome', name: 'NewUserWelcome', component: NewUserWelcome },
  ]
})
