import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import RootState from "../state";

// user authentication with JWT
interface ThemeState {
  invert: boolean;
  theme: string;
}

// mutations
const SET_INVERT = "SET_INVERT";
const SET_THEME = "SET_THEME";

export default class ThemeModule implements Module<ThemeState, RootState> {
  state: ThemeState;

  mutations: MutationTree<ThemeState> = {
    [SET_THEME](state, theme: string) {
      state.theme = theme;
    },
    [SET_INVERT](state, invert: boolean) {
      state.invert = invert;
    }
  };

  actions: ActionTree<ThemeState, RootState> = {
    async setInvert(ctx, invert: boolean) {
      ctx.commit(SET_INVERT, invert);
    }
  };

  getters: GetterTree<ThemeState, RootState> = {
    invert: state => state.invert,
    theme: state => state.theme
  };

  constructor(initState: ThemeState) {
    this.state = {
      invert: false,
      theme: "defalut",
      ...initState
    };
  }
}
