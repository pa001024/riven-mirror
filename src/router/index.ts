import Vue from 'vue'
import Router from 'vue-router'
import Mod from '@/views/Mod.vue'
import Huangli from '@/views/Huangli.vue'
import About from '@/views/About.vue'
import Setting from '@/views/Setting.vue'
import Index from '@/views/Index.vue'
import BuildEditor from '@/views/BuildEditor.vue'
import Simulator from '@/views/Simulator.vue'
import Palette from '@/views/Palette.vue'
import EULA from '@/views/EULA.vue'
import ErrorPage from '@/views/Error.vue'
import NewUserWelcome from '@/views/NewUserWelcome.vue'
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
    { path: '/weapon/zaw', name: 'WeaponSelector', component: WeaponSelector },
    { path: '/weapon/kitgun', name: 'WeaponSelector', component: WeaponSelector },
    { path: '/weapon/:id', name: 'BuildEditor', component: BuildEditor },
    { path: '/weapon/:id/:code', name: 'BuildEditorWithCode', component: BuildEditor },
    { path: '/huangli', name: 'Huangli', component: Huangli },
    { path: '/riven', name: 'Mod', component: Mod },
    { path: '/riven/:source', name: 'ModWithSource', component: Mod, props: true },
    { path: '/palette', name: 'Palette', component: Palette },
    { path: '/eula', name: 'EULA', component: EULA },
    { path: '/welcome', name: 'NewUserWelcome', component: NewUserWelcome },
    { path: '/*', name: 'Error', component: ErrorPage },
  ]
})
