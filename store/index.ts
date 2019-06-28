import { GetterTree, ActionTree, MutationTree } from 'vuex';
export interface RootState {
  counter: number;
}

export const state = () =>
  ({
    counter: 0,
  } as RootState);

// mutations
export const mutations: MutationTree<RootState> = {
  addCounter(state) {
    state.counter++;
  },
};

// actions
export const actions: ActionTree<RootState, {}> = {
  async addCounter(ctx) {
    ctx.commit('addCounter');
  },
};

// getters
export const getters: GetterTree<RootState, {}> = {
  counter: state => state.counter,
};
