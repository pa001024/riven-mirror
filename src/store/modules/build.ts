import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import localStorage from "universal-localstorage";
import RootState from "../state";

// user authentication with JWT
interface BuildState {
  burstSampleSize: number;
  savedBuilds: { [key: string]: string };
}

type Build = { id: string; miniCode: string };

// mutations
const SET_BURSTSAMPLESIZE = "SET_BURSTSAMPLESIZE";
const SET_BUILD = "SET_BUILD";
const CLEAR_BUILD = "CLEAR_BUILD";

export default class BuildModule implements Module<BuildState, RootState> {
  state: BuildState;

  mutations: MutationTree<BuildState> = {
    [SET_BURSTSAMPLESIZE](state, burstSampleSize: number) {
      state.burstSampleSize = isNaN(burstSampleSize) ? 0 : burstSampleSize;
      localStorage.setItem("burstSampleSize", JSON.stringify(state.burstSampleSize));
    },
    [SET_BUILD](state, { id, miniCode }: Build) {
      state.savedBuilds[id] = miniCode;
      localStorage.setItem("savedBuilds", JSON.stringify(state.savedBuilds));
    },
    [CLEAR_BUILD](state) {
      state.savedBuilds = {};
      localStorage.removeItem("savedBuilds");
    }
  };

  actions: ActionTree<BuildState, RootState> = {
    async setBurstSampleSize(ctx, burstSampleSize: number) {
      if (isNaN(burstSampleSize)) return;
      ctx.commit(SET_BURSTSAMPLESIZE, burstSampleSize);
    },
    async setBuild(ctx, build: Build) {
      ctx.commit(SET_BUILD, build);
    },
    async clearBuilds(ctx) {
      ctx.commit(CLEAR_BUILD);
    }
  };

  getters: GetterTree<BuildState, RootState> = {
    burstSampleSize: state => state.burstSampleSize,
    savedBuilds: state => state.savedBuilds
  };

  constructor(initState: BuildState) {
    this.state = {
      burstSampleSize: localStorage.getItem("burstSampleSize") || 0,
      savedBuilds: localStorage.getItem("savedBuilds") ? JSON.parse(localStorage.getItem("savedBuilds")) : {},
      ...initState
    };
  }
}
