import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
// import localStorage from "universal-localstorage";
import RootState from "../state";

// user authentication with JWT
interface ThemeState {
  invert: boolean;
  theme: string;
  bigScreen: boolean;
}

// mutations
const SET_INVERT = "SET_INVERT";
const SET_THEME = "SET_THEME";
const SET_BIGSCREEN = "SET_BIGSCREEN";

export default class ThemeModule implements Module<ThemeState, RootState> {
  state: ThemeState;

  mutations: MutationTree<ThemeState> = {
    [SET_THEME](state, theme: string) {
      state.theme = theme;
    },
    [SET_INVERT](state, invert: boolean) {
      state.invert = invert;
    },
    [SET_BIGSCREEN](state, bigScreen: boolean) {
      state.bigScreen = bigScreen;
      localStorage.setItem("bigScreen", bigScreen ? "1" : "0");
    }
  };

  actions: ActionTree<ThemeState, RootState> = {
    async setInvert(ctx, invert: boolean) {
      ctx.commit(SET_INVERT, invert);
    },
    async setBigScreen(ctx, bigScreen: boolean) {
      ctx.commit(SET_BIGSCREEN, bigScreen);
    }
  };

  getters: GetterTree<ThemeState, RootState> = {
    invert: state => state.invert,
    theme: state => state.theme,
    bigScreen: state => state.bigScreen
  };

  constructor(initState: ThemeState) {
    this.state = {
      invert: false,
      theme: "defalut",
      bigScreen: !!localStorage.getItem("bigScreen"),
      ...initState
    };
  }
}
