import Vue from 'vue'
import Vuex from 'vuex'

import mod from '@/store/modules/mod'
import i18n from '@/store/modules/i18n'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mod,
    i18n
  }
})

export default store
