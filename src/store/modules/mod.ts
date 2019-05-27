import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { RivenMod } from "@/warframe/rivenmod";
import localStorage from "universal-localstorage";
import RootState from "../state";
import { WeeklyRivenInfo } from "@/warframe/weeklyriven";
import axios from "axios";

interface ModState {
  mod: RivenMod;
  history: RivenMod[];
  priceData: WeeklyRivenInfo[];
  lastWeekly: number;
}

// mutations
const SET_NEW_RIVEN = "SET_NEW_RIVEN";
const DELETE_HISTORY = "DELETE_HISTORY";
const LOAD = "LOAD";
const NEW_PRICE_DATA = "NEW_PRICE_DATA";

const MAX_HISTORY_COUNT = 10;

export default class ModModule implements Module<ModState, RootState> {
  state: ModState;

  mutations: MutationTree<ModState> = {
    [SET_NEW_RIVEN](state, riven: RivenMod) {
      state.mod = riven;
      localStorage.setItem("lastMod", riven.qrCode);
      if (state.history.length === 0 || riven.qrCode !== state.history[0].qrCode) {
        state.history = [riven].concat(state.history.filter((v, i) => v.qrCode !== riven.qrCode && i < MAX_HISTORY_COUNT));
      }
      localStorage.setItem("modHistory", JSON.stringify(state.history.map(v => v.qrCode)));
    },
    [DELETE_HISTORY](state, qrCode: string) {
      state.history = state.history.filter((v, i) => v.qrCode !== qrCode);
      localStorage.setItem("modHistory", JSON.stringify(state.history.map(v => v.qrCode)));
    },
    [LOAD](state, newState: ModState) {
      Object.assign(state, newState);
    },
    [NEW_PRICE_DATA](state, priceData: WeeklyRivenInfo[]) {
      state.priceData = priceData;
      state.lastWeekly = Date.now();
      localStorage.setItem("priceData", JSON.stringify(state.priceData));
      localStorage.setItem("lastWeekly", state.lastWeekly);
    }
  };

  actions: ActionTree<ModState, RootState> = {
    async newModTextInput(ctx, newModText: string) {
      let rm = new RivenMod(newModText);
      if (rm.name) ctx.commit(SET_NEW_RIVEN, rm);
    },
    async newBase64Text(ctx, text: string) {
      let rm = new RivenMod();
      rm.qrCodeBase64 = text;
      if (rm.name) ctx.commit(SET_NEW_RIVEN, rm);
    },
    async removeHistory(ctx, qrcode: string) {
      ctx.commit(DELETE_HISTORY, qrcode);
    },
    async load(ctx) {
      ctx.commit(LOAD, {
        mod: new RivenMod(localStorage.getItem("lastMod") || "Rubico|01S|C3l|0Ii.1Eu.SBG.3-9Q", true),
        history: localStorage.getItem("modHistory") ? JSON.parse(localStorage.getItem("modHistory")).map((v: string) => new RivenMod(v)) : [],
        priceData: localStorage.getItem("priceData") ? JSON.parse(localStorage.getItem("priceData")) : [],
        lastWeekly: localStorage.getItem("lastWeekly") ? JSON.parse(localStorage.getItem("lastWeekly")) : 0
      });
    },
    async getWeekly(ctx) {
      const APIBASE = "https://api.riven.im/api/riven";
      const data = await axios.get(APIBASE);
      ctx.commit(NEW_PRICE_DATA, data.data);
    }
  };

  getters: GetterTree<ModState, RootState> = {
    rivenModText: state => state.mod && state.mod.modText,
    mod: state => state.mod,
    modHistoty: state => state.history,
    priceData: state => state.priceData,
    lastWeekly: state => state.lastWeekly
  };

  constructor(initState: ModState) {
    this.state = {
      mod: null,
      history: [],
      priceData: [],
      lastWeekly: 0,
      ...initState
    };
  }
}
