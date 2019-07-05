import axios from "axios";
import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { User } from "@/service/user";
import RootState from "../state";
import shajs from "sha.js";
import { Base64 } from "@/warframe/util";

// user authentication with JWT
interface UserState {
  session: User;
  loginLoading: boolean;
  platform: "pc" | "ps4" | "xb1" | "swi";
}
interface BasicResult {
  code: number;
  error: string;
}

// mutations
const SET_USER_LOADING = "SET_USER_LOADING";
const SET_USER_SESSION = "SET_USER_SESSION";
const SET_PLATFORM = "SET_PLATFORM";

// axios.defaults.baseURL = "https://api.riven.im"
axios.defaults.timeout = 15e3;
// axios.defaults.xsrfHeaderName = "x-csrf-token"
// axios.defaults.xsrfCookieName = "csrfToken"

export default class UserModule implements Module<UserState, RootState> {
  state: UserState;

  mutations: MutationTree<UserState> = {
    [SET_USER_SESSION](state, session: User) {
      state.session = session;
    },
    [SET_USER_LOADING](state, isloading: boolean) {
      state.loginLoading = isloading;
    },
    [SET_PLATFORM](state, platform: UserState["platform"]) {
      if (!["pc", "ps4", "xb1", "swi"].includes(platform)) platform = "pc";
      state.platform = platform;
      localStorage.setItem("platform", platform);
    }
  };

  actions: ActionTree<UserState, RootState> = {
    async login(ctx, { login, password }: { login: string; password: string }) {
      ctx.commit(SET_USER_LOADING, true);
      try {
        const res = await axios.post(`${ctx.rootState.origin}/login`, {
          user: login,
          hash: shajs("sha256")
            .update(`_R_M^${password}^P_A_`)
            .digest("hex")
        });
        const data = res.data as BasicResult;
        if (data && data.code === 200) {
          let jwt = res.headers["Authorization"];
          let user = JSON.parse(Base64.decode(jwt));
          localStorage.setItem("login", jwt);
          ctx.commit(SET_USER_SESSION, user);
        }
      } catch (e) {}
      ctx.commit(SET_USER_LOADING, false);
    },
    async resetpassword(ctx, { login }: { login: string }) {},
    async setPlatform(ctx, platform: string) {
      ctx.commit(SET_PLATFORM, platform);
    }
  };

  getters: GetterTree<UserState, RootState> = {
    session: state => state.session,
    loginLoading: state => state.loginLoading,
    platform: state => state.platform
  };

  constructor(initState: UserState) {
    let platform = localStorage.getItem("platform");
    if (platform && !["pc", "ps4", "xb1", "swi"].includes(platform)) platform = "pc";
    this.state = {
      session: null,
      loginLoading: false,
      platform: platform || "pc",
      ...initState
    };
  }
}
