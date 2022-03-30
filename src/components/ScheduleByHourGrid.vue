<template>
  <section class="cards-grid">
    <div :key="event.id" v-for="event in filteredEvents()">
      <ScheduleCardByHour
        :id="event.id"
        :place="event.place"
        :title="event.title"
        :image="event.image"
        :hour="event.hour"
        :link="event.link"
        :event="event"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ScheduleCardByHour from "./ScheduleCardByHour.vue";
import { searchFilter } from "../data/functions";
import { useStore } from "../store";

@Options({
  components: {
    ScheduleCardByHour,
  },
  props: {
    hour: Number,
  },
  methods: {
    // returns the events that have the same start hour as the hour displayed on the bar
    filteredEvents() {
      return searchFilter(this.store.state.searchResults, "schedule")
        .filter(
          (event: { showStartDate: Date }) =>
            new Date(event.showStartDate).getHours() ===
            new Date(this.hour).getHours()
        )
        .sort(
          (a: { showStartDate: Date }, b: { showStartDate: Date }) =>
            new Date(a.showStartDate).getMinutes() -
            new Date(b.showStartDate).getMinutes()
        );
    },
  },
})
export default class ScheduleByHourGrid extends Vue {
  store = useStore();
  searchFilter = searchFilter;
  hour!: number;
}
</script>

<style scoped>
.cards-grid {
  display: flex;
  flex-direction: column;
}

.cards-grid > * {
  width: 100%;
}
</style>
