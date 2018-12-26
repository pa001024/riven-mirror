import Vue from 'vue'
import Vuex from 'vuex'

import mod from '@/store/modules/mod'

Vue.use(Vuex)

interface State {
}

const store = new Vuex.Store<State>({
  modules: {
    mod,
  }
})

export default store
