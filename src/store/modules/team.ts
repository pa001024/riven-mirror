import { ActionContext } from "vuex";
import { WarframeBuild, Warframe, WarframeDataBase } from "@/warframe/warframebuild";
import { NormalMod } from "@/warframe/codex";

/**
 * 团队配置
 *
 * @interface State
 */
interface State {
  core: Warframe // 团队核心
  mainBuild: WarframeBuild
  slaveBuilds: WarframeBuild[]
}

let state: State = {
  core: null,
  mainBuild: null,
  slaveBuilds: [],
}

const mutations = {
  setCore(state: State, coreId: string) {
    state.core = WarframeDataBase.getWarframeById(coreId);
  },
  setMods(state: State, mods: NormalMod[]) {
    state.mainBuild.mods = mods;
  }
}

const actions = {
  setMods(context: ActionContext<State, any>, mods: NormalMod[]) {
    context.commit("setMods", mods)
  }
}

const getters = {
  mainBuild: (state: State) => state.mainBuild,
  mods: (state: State) => state.mainBuild.mods,
}

export default {
  state,
  mutations,
  actions,
  getters
}
