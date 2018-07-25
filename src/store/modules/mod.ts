import { RivenMod } from "@/warframe";

let state = {
  rivenModText: "",
}

const mutations = {
  newModTextInput(state, newModText) {
    state.rivenModText = newModText
  }
}

const getters = {
  rivenModText: state => state.rivenModText,
  mod: state => {
    return new RivenMod(state.rivenModText);
  }
}

export default {
  state,
  mutations,
  actions: {},
  getters
}
