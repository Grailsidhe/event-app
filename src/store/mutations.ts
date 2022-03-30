import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationTypes.SET_DAY_MENU](state: S, menu: object): void;
  [MutationTypes.SET_SELECT_FILTERS](state: S, filters: object): void;
  [MutationTypes.SET_SELECT_WINDOW](state: S, menu: object): void;
  [MutationTypes.SET_SEARCH](state: S, menu: string): void;
  [MutationTypes.SET_LANGUAGE](state: S, language: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_DAY_MENU](
    state,
    menu: { number: number; filter: string; menu: number }
  ) {
    state.activeDayMenu = menu;
  },
  [MutationTypes.SET_SELECT_FILTERS](
    state,
    filters: { programId: string; guestType: string; tag: [] }
  ) {
    state.selectFilters = filters;
  },
  [MutationTypes.SET_SELECT_WINDOW](
    state,
    menu: { open: boolean; title: string }
  ) {
    state.selectWindow = menu;
  },
  [MutationTypes.SET_SEARCH](state, results: string) {
    state.searchResults = results;
  },
  [MutationTypes.SET_LANGUAGE](state, language: string) {
    state.language = language;
  },
};
