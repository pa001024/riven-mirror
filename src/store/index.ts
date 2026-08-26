import { createStore as createVuexStore, Store } from "vuex";
import RootState from "./state";
import Mod from "@/store/modules/mod";
import User from "@/store/modules/user";
import Theme from "@/store/modules/theme";
import Build from "./modules/build";

export function createStore(initState: any = {}): Store<RootState> {
  const { title, url, origin, locale, csrf, mod, user, theme, build } = initState;
  const state = { title, url, origin, locale, csrf } as RootState;
  const store = createVuexStore<RootState>({
    state,
    modules: {
      mod: new Mod(mod),
      user: new User(user),
      theme: new Theme(theme),
      build: new Build(build),
    },
  });
  return store;
}
