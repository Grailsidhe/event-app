export const state = {
  activeDayMenu: { number: 0, filter: "", menu: 0 },
  // number = determines the active button in day menu components
  // filter = text that displays on the button/select option
  // menu = which menu Main.vue: (artist, a-z, by day), Schedule.vue: (by day, by hour)

  selectFilters: { programId: "", guestType: "", tag: [] },
  selectWindow: { open: false, title: "" },
  // open = if it's open or not
  // title = the title of each select

  searchResults: "",
  language: "fr",
};

export type State = typeof state;
