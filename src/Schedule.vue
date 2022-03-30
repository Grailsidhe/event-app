<template>
  <section class="schedule-container">
    <header class="schedule-header">
      <MainHeader
        :guestTypes="guestType"
        :programs="programs"
        :route="{ name: 'main', type: 'type', id: 'id' }"
        text="Accueil"
        :showSelect="false"
      />
      <MainHeaderSortMenu
        :category="categorySchedule"
        :selectItems="tags"
        route="schedule"
      />
      <ScheduleDayMenuButtons :text="sortedDays()" />
    </header>
    <main>
      <NoResults v-show="noResults()" />
      <section
        :key="place._id"
        v-for="place in places"
        v-show="$store.state.activeDayMenu.menu === 0"
        ref="displayed0"
      >
        <SeparatorBar
          :id="index"
          :text="place.name"
          v-show="filteredEventsPlace(place._id)"
        />

        <div class="schedule-body">
          <ScheduleByPlaceGrid :placeId="place._id" />
        </div>
      </section>

      <section
        :key="hour"
        v-for="hour in filterHours()"
        v-show="$store.state.activeDayMenu.menu === 1"
        ref="displayed1"
      >
        <SeparatorBar
          :id="hour"
          :text="`${new Date(hour).getHours()}:00`"
          v-show="filterEventsHour(hour)"
        />
        <div class="schedule-body">
          <ScheduleByHourGrid :hour="hour" />
        </div>
      </section>
    </main>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MainHeader from "./components/MainHeader.vue";
import MainHeaderSortMenu from "./components/MainHeaderSortMenu.vue";
import ScheduleDayMenuButtons from "./components/ScheduleDayMenuButtons.vue";
import SeparatorBar from "./components/SeparatorBar.vue";
import ScheduleByPlaceGrid from "./components/ScheduleByPlaceGrid.vue";
import ScheduleByHourGrid from "./components/ScheduleByHourGrid.vue";
import NoResults from "./components/NoResults.vue";
import { MutationTypes } from "./store/mutation-types";
import { useStore } from "./store";
import { sortedDays, searchFilter } from "./data/functions";
// @ts-ignore
import guest from "./data/guestData.js";
// @ts-ignore
import * as data from "./data/data.json";

@Options({
  components: {
    MainHeader,
    MainHeaderSortMenu,
    ScheduleDayMenuButtons,
    SeparatorBar,
    ScheduleByPlaceGrid,
    ScheduleByHourGrid,
    NoResults,
  },
  props: {
    eventData: Array,
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
  methods: {
    filteredEventsPlace(placeId: string) {
      // returns true if the events share the same place(scène) as those in the filterData array
      const filteredEvents = this.searchFilter(
        this.store.state.searchResults,
        "schedule"
      ).map((event: { sceneId: string }) => event.sceneId); // chosen by select
      return filteredEvents.includes(placeId);
    },
    filterEventsHour(hour: string) {
      // returns true if the events share the same start hour as those in the filterData array
      const filteredEvents = this.searchFilter(
        this.store.state.searchResults,
        "schedule"
      ).map((event: { showStartDate: Date }) => event.showStartDate);
      return filteredEvents.includes(hour);
    },
    filterHours() {
      // gives unique hours
      const date = this.searchFilter(
        this.store.state.searchResults,
        "schedule"
      ).map((item: any) => item.showStartDate);

      const dates = date.reduce((unique: any, item: any) => {
        const h = new Date(item).getHours();
        return unique.find((i: any) => new Date(i).getHours() === h) !==
          undefined
          ? unique
          : [...unique, item];
      }, []);

      // orders the hours
      const result = [];
      const morning = dates.filter(
        (date: any) =>
          new Date(date).getHours().toString().length === 1 &&
          "6789".includes(new Date(date).getHours().toString())
      );
      const day = dates.filter(
        (date: any) => new Date(date).getHours().toString().length === 2
      );
      const night = dates.filter(
        (date: any) =>
          new Date(date).getHours().toString().length === 1 &&
          "012345".includes(new Date(date).getHours().toString())
      );
      result.push(morning.sort(), day.sort(), night.sort());
      return result.flat();
    },
    noResults() {
      const menu = this.$store.state.activeDayMenu.menu;
      if (menu === 0) {
        const result = this.searchFilter(
          this.store.state.searchResults,
          "schedule"
        ).map((event: { sceneId: string }) => event.sceneId);
        return result.length > 0 ? false : true;
      }
      if (menu === 1) {
        const result = this.searchFilter(
          this.store.state.searchResults,
          "schedule"
        ).map((event: { showStartDate: Date }) => event.showStartDate);
        return result.length > 0 ? false : true;
      }
    },
  },
})
export default class ScheduleByPlace extends Vue {
  categorySchedule = ["par lieu", "par heure"];
  store = useStore();
  sortedDays = sortedDays;
  searchFilter = searchFilter;
  data: any = data;
  guestType: string[] | unknown[] = [
    ...new Set(guest.map((guest: any) => guest.type).flat()),
  ];
  tags: string[] | unknown[] = [
    ...new Set(guest.map((guest: any) => guest.tags).flat()),
  ];
  places: Object[] = data.data.scenes;
  programs: string[] = data.data.programs.map((program) => program.name).flat();
}
</script>

<style scoped>
.schedule-container {
  max-width: 1100px;
  margin: auto;
}

.schedule-header {
  display: flex;
  align-items: space-between;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.schedule-body {
  width: 100%;
}

@media (max-width: 670px) {
  .schedule-body {
    width: 100%;
  }
}
</style>
