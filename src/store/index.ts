import Vue from 'vue'
import Vuex from 'vuex'

import mod from './modules/mod'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mod
  }
})

export default store
