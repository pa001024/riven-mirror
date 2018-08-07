import Vue from 'vue'
import Router from 'vue-router'
import Mod from '@/components/Mod.vue'
import Huangli from '@/components/Huangli.vue'
import About from '@/components/About.vue'
import Index from '@/components/Index.vue'
import BuildEditor from '@/components/BuildEditor.vue'
import Simulator from '@/components/Simulator.vue'
import WeaponSelector from '@/components/WeaponSelector.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Index', component: Index },
    // { path: '/news', name: 'IndexNews', component: Index },
    { path: '/about', name: 'About', component: About },
    { path: '/sim', name: 'Simulator', component: Simulator },
    { path: '/weapon', name: 'WeaponSelector', component: WeaponSelector },
    { path: '/weapon/:id', name: 'BuildEditor', component: BuildEditor },
    { path: '/huangli', name: 'Huangli', component: Huangli },
    { path: '/riven', name: 'Mod', component: Mod },
    { path: '/riven/:source', name: 'ModWithSource', component: Mod, props: true },
  ]
})
