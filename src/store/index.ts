import Vue from 'vue'
import Vuex from 'vuex'

import mod from '@/store/modules/mod'
import user from '@/store/modules/user'

Vue.use(Vuex)

interface State {
}

const store = new Vuex.Store<State>({
  modules: {
    mod,
    user,
  }
})

export default store
