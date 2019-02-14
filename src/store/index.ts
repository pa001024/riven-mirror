import Vue from 'vue'
import Vuex from 'vuex'

import mod from '@/store/modules/mod'
import user from '@/store/modules/user'

Vue.use(Vuex)

interface State {
}

export function createStore() {
  const store = new Vuex.Store<State>({
    modules: {
      mod,
      user,
    }
  })

  return store
}
