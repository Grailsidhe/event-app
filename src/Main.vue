<template>
  <section class="main-container">
    <header class="main-header">
      <MainHeader
        :guestTypes="guestType"
        :programs="programs"
        :route="{ name: 'schedule', type: 'type', id: 'id' }"
        :text="
          this.$store.state.language === 'fr' ? 'Programmation' : 'Schedule'
        "
        :stateMenuFilter="this.sortedDays()[0]"
        :showSelect="true"
      />
      <MainHeaderSortMenu
        :category="categorySchedule"
        :selectItems="tags"
        route="main"
      />
    </header>
    <section class="popup-menu">
      <AlphabetMenu
        v-show="$store.state.activeDayMenu.menu === 1"
        class="show"
      />
      <DayMenuButtons
        :text="sortedDays()"
        v-show="$store.state.activeDayMenu.menu === 2"
        class="show"
      />
    </section>
    <NoResults
      v-show="searchFilter(this.store.state.searchResults, 'main').length == 0"
    />
    <main class="main-body">
      <!-- searchFilter sends the search input value and route -->
      <div
        :key="item.id"
        v-for="item in searchFilter(this.store.state.searchResults, 'main')"
      >
        <GuestCard
          :id="item.id"
          :name="item.name"
          :title="item.title"
          :place="item.place?.place ? item.place?.place : item.place"
          :image="item.image"
          :date="item.day"
          :hour="item.hour"
          @click="routeChoice(item)"
        />
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GuestCard from "./components/GuestCard.vue";
import MainHeader from "./components/MainHeader.vue";
import MainHeaderSortMenu from "./components/MainHeaderSortMenu.vue";
import AlphabetMenu from "./components/AlphabetMenu.vue";
import DayMenuButtons from "./components/DayMenuButtons.vue";
import NoResults from "./components/NoResults.vue";
// @ts-ignore
import guests from "./data/guestData.js";
import * as data from "./data/data.json";
import { sortedDays, routeChoice, searchFilter } from "./data/functions";
import { MutationTypes } from "./store/mutation-types";
import { useStore } from "./store";

@Options({
  components: {
    MainHeader,
    MainHeaderSortMenu,
    GuestCard,
    AlphabetMenu,
    DayMenuButtons,
    NoResults,
  },
  mounted() {
    window.scrollTo(0, 0);
    // removes filter results on load
    this.store.commit(MutationTypes.SET_SEARCH, "");
    this.store.commit(MutationTypes.SET_SELECT_FILTERS, {
      programId: "",
      guestType: "",
      tag: [],
    }),
      this.store.commit(MutationTypes.SET_SELECT_WINDOW, {
        open: false,
        title: "",
      });
  },
  computed: {
    categorySchedule: function () {
      const guest = this.store.state.selectFilters?.guestType
        ? this.store.state.selectFilters?.guestType
        : this.guestType[0];
      const en = "by day";
      const fr = "par jour";
      return [guest, "a - z", this.$store.state.language === "fr" ? fr : en];
    },
  },
})
export default class Main extends Vue {
  store = useStore();
  guests = guests;
  sortedDays = sortedDays;
  routeChoice = routeChoice;
  searchFilter = searchFilter;
  show = this.store.state.activeDayMenu.menu;
  tags: string[] | unknown[] = [
    ...new Set(
      guests
        .map((guest: { tags: string[] }) => guest.tags)
        .flat()
        .sort()
    ),
  ];
  guestType: string[] | unknown[] = [
    ...new Set(
      guests
        .map((guest: { type: string }) => guest.type)
        .flat()
        .sort()
    ),
  ];
  programs: string[] = data.data.programs
    .map((program) => program.name)
    .flat()
    .sort();
}
</script>

<style scoped>
@keyframes append-animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.show {
  animation: append-animate 0.3s ease-in-out;
}

.main-container {
  max-width: 1100px;
  margin: auto;
}

.main-header {
  display: flex;
  align-items: space-between;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.popup-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.main-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 5px;
}

.main-body > div {
  width: 100%;
  aspect-ratio: 1 / 1;
}
</style>
