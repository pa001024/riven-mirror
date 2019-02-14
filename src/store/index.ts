import Vue from 'vue'
import Vuex from 'vuex'
import RootState from './state';
import Mod from '@/store/modules/mod'
import User from '@/store/modules/user'

Vue.use(Vuex)

export function createStore(initState: any = {}) {
  const { title, url, origin, locale, csrf, mod, user } = initState
  const state = { title, url, origin, locale, csrf }
  const store = new Vuex.Store<RootState>({
    state,
    modules: {
      mod: new Mod(mod),
      user: new User(user),
    }
  })
  return store
}
