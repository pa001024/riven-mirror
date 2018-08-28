import { RivenMod } from "@/warframe";
import { ActionContext } from "vuex";

interface State {
  mod: RivenMod
  history: RivenMod[]
}

let state: State = {
  mod: new RivenMod(localStorage.getItem("modText") || "兰卡\nAcri-satiata\n+135.5%暴击伤害\n+97.9%多重射击\n+171.9%伤害\n-47.3%变焦\n段位160233"),
  history: localStorage.getItem("modHistory") ? JSON.parse(localStorage.getItem("modHistory")).map(v => new RivenMod(v)) : [],
}

const MAX_HISTORY_COUNT = 10;

const mutations = {
  newRiven(state: State, riven: RivenMod) {
    state.mod = riven;
    if (state.history.length === 0 || riven.qrCode !== state.history[0].qrCode)
      state.history = [riven].concat(state.history.filter((v, i) => v.qrCode !== riven.qrCode && i < MAX_HISTORY_COUNT));
    localStorage.setItem("modHistory", JSON.stringify(state.history.map(v => v.qrCode)));
  },
  removeHistory(state: State, qrCode: string) {
    state.history = state.history.filter((v, i) => v.qrCode !== qrCode);
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
  }
};

const getters = {
  rivenModText: state => state.mod.modText,
  mod: state => state.mod,
  modHistoty: state => state.history
}

export default {
  state,
  mutations,
  actions,
  getters
}
