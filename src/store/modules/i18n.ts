import { ActionContext } from "vuex";


interface State {
  locale: string
}

let state: State = {
  locale: "zh-CN"
}


const mutations = {
  changeLocale(state: State, locale: string) {
    state.locale = locale;
  }
}

const actions = {
  changeLocale(context: ActionContext<State, any>, locale: string) {
    context.commit("changeLocale", locale);
  }
};

const getters = {
  locale: state => state.locale
}

export default {
  state,
  mutations,
  actions,
  getters
}
