import { RivenMod } from "@/warframe";

let state = {
  rivenModText: "",
  mod: null
}

const mutations = {
  newModTextInput(state, newModText) {
    state.rivenModText = newModText;
    state.mod = new RivenMod(newModText);
  },
  newBase64Text(state, newBase64Text) {
    let rm = new RivenMod();
    rm.qrCodeBase64 = newBase64Text;
    state.mod = rm;
  }
}

const getters = {
  rivenModText: state => state.rivenModText,
  mod: state => state.mod
}

export default {
  state,
  mutations,
  actions: {},
  getters
}
