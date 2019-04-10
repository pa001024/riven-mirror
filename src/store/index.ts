import Vue from "vue";
import Vuex from "vuex";
import RootState from "./state";
import Mod from "@/store/modules/mod";
import User from "@/store/modules/user";
import Theme from "@/store/modules/theme";
import Build from "./modules/build";

Vue.use(Vuex);

export function createStore(initState: any = {}) {
  const { title, url, origin, locale, csrf, mod, user, theme, build } = initState;
  const state = { title, url, origin, locale, csrf };
  const store = new Vuex.Store<RootState>({
    state,
    modules: {
      mod: new Mod(mod),
      user: new User(user),
      theme: new Theme(theme),
      build: new Build(build)
    }
  });
  return store;
}
