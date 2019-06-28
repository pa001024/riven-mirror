import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from '.';

interface ModState {
  history: string[];
  lastWeekly: number;
}

export const state = () =>
  ({
    history: [],
    lastWeekly: 0,
  } as ModState);

// mutations
export const mutations: MutationTree<ModState> = {
  deleteHistory(state, code: string) {
    state.history = state.history.filter((v, i) => v !== code);
    // localStorage.setItem('modHistory', JSON.stringify(state.history));
  },
};

// actions
export const actions: ActionTree<ModState, RootState> = {
  async removeHistory(ctx, qrcode: string) {
    ctx.commit('removeHistory', qrcode);
  },
  // 服务端传递数据
  nuxtServerInit({ commit }, { req }) {
    if (req.session.user) {
      // commit('user', req.session.user);
    }
  },
};

// getters
export const getters: GetterTree<ModState, RootState> = {
  lastWeekly: state => state.lastWeekly,
};
