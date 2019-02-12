import { ActionContext } from "vuex";
import { UserSession } from "@/service/user";

// user authentication with JWT
interface State {
  session: UserSession
  loginLoading: boolean
}

let state: State = {
  session: null,
  loginLoading: false
}

const mutations = {
  newSession(state: State, session: UserSession) {
    state.session = session;
  },
  startLoading(state: State) {
    state.loginLoading = true;
  },
  endLoading(state: State) {
    state.loginLoading = false;
  },
}

const actions = {
  async login(context: ActionContext<State, any>, { login, password }: { login: string, password: string }) {
    let session = new UserSession(login, password);
    context.commit("startLoading");
    try {
      let success = await session.login();
      if (success) context.commit("newSession", session);
    } catch (e) { }
    context.commit("endLoading");
  },
  async resetpassword(context: ActionContext<State, any>, { login }: { login: string }) {
    let session = new UserSession(login, "");
    context.commit("startLoading");
    try {
      let success = await session.resetpassword();
      if (success) context.commit("newSession", session);
    } catch (e) { }
    context.commit("endLoading");
  },
}

const getters = {
  session: (state: State) => state.session,
  loginLoading: (state: State) => state.loginLoading,
}

export default {
  state,
  mutations,
  actions,
  getters
}
