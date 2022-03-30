import { createStore, Store as VuexStore, CommitOptions } from "vuex";
import { State, state } from "./state";
import { Mutations, mutations } from "./mutations";

export const store = createStore({
  state,
  mutations,
});

export type Store = Omit<VuexStore<State>, "commit"> & {
  commit<K extends keyof Mutations<Mutations[K]>>(
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

export function useStore() {
  return store as Store;
}
