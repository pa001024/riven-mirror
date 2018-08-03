import Vue from 'vue'
import Router from 'vue-router'
import Mod from '@/components/Mod.vue'
import Huangli from '@/components/Huangli.vue'
import About from '@/components/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/huangli',
      name: 'Huangli',
      component: Huangli
    },
    {
      path: '/riven',
      name: 'Mod',
      component: Mod
    },
    {
      path: '/riven/:source',
      name: 'ModWithSource',
      component: Mod,
      props: true
    },
    // {
    //   path: '/time',
    //   name: 'Time',
    //   component: Time
    // },
  ]
})
