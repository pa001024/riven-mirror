import Vue from 'vue'
import Router from 'vue-router'
import Mod from '@/components/Mod.vue'
import Time from '@/components/Time.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
