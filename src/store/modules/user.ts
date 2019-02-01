import { ActionContext } from "vuex";
import { UserSession } from "@/service/user";

// user authentication with JWT
interface State {
  session: UserSession
}

let state: State = {
  session: null
}

const mutations = {
  newUser(state: State, { user, pass }: { user: string, pass: string }) {
    let session = new UserSession(user, pass);
    session.login().then(success => {
      if (success) state.session = session
    })
  },
}

const actions = {

}


const getters = {
  session: (state: State) => state.session,
}

export default {
  state,
  mutations,
  actions,
  getters
}
