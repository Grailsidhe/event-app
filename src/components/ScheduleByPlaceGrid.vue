<template>
  <section class="schedule-place">
    <div :key="event.id" v-for="event in filteredEvents()">
      <ScheduleCardByPlace
        :id="event.id"
        :hour="event.hour"
        :title="event.title"
        :image="event.image"
        class="card"
        @click="routeChoice(event)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ScheduleCardByPlace from "./ScheduleCardByPlace.vue";
import { routeChoice, searchFilter } from "../data/functions";
import { useStore } from "../store";

@Options({
  components: {
    ScheduleCardByPlace,
  },
  props: {
    placeId: String,
  },
  methods: {
    filteredEvents() {
      const events = this.searchFilter(
        this.store.state.searchResults,
        "schedule"
      ).filter((event: { sceneId: string }) => event.sceneId === this.placeId);
      const morning = events.filter(
        (event: { showStartDate: number }) =>
          new Date(event.showStartDate).getHours().toString().length === 1 &&
          "6789".includes(new Date(event.showStartDate).getHours().toString())
      );
      const day = events.filter(
        (event: { showStartDate: number }) =>
          new Date(event.showStartDate).getHours().toString().length === 2
      );
      const night = events.filter(
        (event: { showStartDate: number }) =>
          new Date(event.showStartDate).getHours().toString().length === 1 &&
          "012345".includes(new Date(event.showStartDate).getHours().toString())
      );
      const result = [];
      result.push(
        morning.sort(
          (a: { showStartDate: Date }, b: { showStartDate: Date }) =>
            new Date(a.showStartDate).getHours() -
            new Date(b.showStartDate).getHours()
        ),
        day.sort(
          (a: { showStartDate: Date }, b: { showStartDate: Date }) =>
            new Date(a.showStartDate).getHours() -
            new Date(b.showStartDate).getHours()
        ),
        night.sort(
          (a: { showStartDate: Date }, b: { showStartDate: Date }) =>
            new Date(a.showStartDate).getHours() -
            new Date(b.showStartDate).getHours()
        )
      );
      return result.flat();
    },
  },
})
export default class ScheduleByPlaceGrid extends Vue {
  store = useStore();
  roundedStyle!: boolean;
  routeChoice = routeChoice;
  searchFilter = searchFilter;
  placeId!: string;
}
</script>

<style scoped>
.schedule-place {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  cursor: pointer;
}

.schedule-place > div {
  width: 49.8%;
}

@media (max-width: 670px) {
  .schedule-place > div {
    width: 100%;
  }
}
</style>
