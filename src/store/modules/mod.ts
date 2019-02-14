import { ActionContext } from "vuex";
import { RivenMod } from "@/warframe/rivenmod";
import localStorage from "universal-localstorage";

interface State {
  mod: RivenMod
  history: RivenMod[]
}

let state: State = {
  mod: null,
  history: []
}

const MAX_HISTORY_COUNT = 10;

const mutations = {
  newRiven(state: State, riven: RivenMod) {
    state.mod = riven;
    localStorage.setItem("lastMod", riven.qrCode);
    if (state.history.length === 0 || riven.qrCode !== state.history[0].qrCode)
      state.history = [riven].concat(state.history.filter((v, i) => v.qrCode !== riven.qrCode && i < MAX_HISTORY_COUNT));
    localStorage.setItem("modHistory", JSON.stringify(state.history.map(v => v.qrCode)));
  },
  removeHistory(state: State, qrCode: string) {
    state.history = state.history.filter((v, i) => v.qrCode !== qrCode);
    localStorage.setItem("modHistory", JSON.stringify(state.history.map(v => v.qrCode)));
  },
  load(state: State, newState: State) {
    Object.assign(state, newState);
  }
}

const actions = {
  newModTextInput(context: ActionContext<State, any>, newModText: string) {
    let rm = new RivenMod(newModText);
    if (rm.id)
      context.commit("newRiven", rm);
  },
  newBase64Text(context: ActionContext<State, any>, text: string) {
    let rm = new RivenMod();
    rm.qrCodeBase64 = text;
    if (rm.id)
      context.commit("newRiven", rm);
  },
  removeHistory(context: ActionContext<State, any>, qrcode: string) {
    context.commit("removeHistory", qrcode);
  },
  load(context: ActionContext<State, any>) {
    context.commit("load", {
      mod: new RivenMod(localStorage.getItem("lastMod") || "Lanka|1DS|C3l|DOk.SCn.1Hl.H-6x", true),
      history: localStorage.getItem("modHistory") ? JSON.parse(localStorage.getItem("modHistory")).map(v => new RivenMod(v)) : [],
    });
  }
};

const getters = {
  rivenModText: (state: State) => state.mod && state.mod.modText,
  mod: (state: State) => state.mod,
  modHistoty: (state: State) => state.history
}

export default {
  state,
  mutations,
  actions,
  getters
}
