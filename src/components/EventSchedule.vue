<template>
  <section class="schedule">
    <div
      @click="event && routeChoice(event)"
      :style="[event ? { cursor: 'pointer' } : null]"
    >
      <h2 v-show="!this.$route.path.includes('event')">
        {{ name }}
      </h2>
      <h5
        :style="this.$route.path.includes('event') ? { margin: '10px 0' } : {}"
      >
        {{ date }} · {{ hour }}
      </h5>
      <h3>{{ place }}</h3>
    </div>
    <Button
      :link="link"
      padd="10px 20px"
      text="Billetterie"
      mainColor="var(--colorPrimary)"
      hoverColor="var(--colorPrimaryDark)"
      v-show="this.link"
    />
  </section>
  <hr />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { routeChoice } from "../data/functions";
import Button from "./Button.vue";

@Options({
  components: {
    Button,
  },
  props: {
    date: String,
    hour: String,
    place: String,
    link: String,
    name: String,
    event: Object,
  },
})
export default class EventSchedule extends Vue {
  date!: string;
  hour!: string;
  place!: string;
  link!: string;
  name!: string;
  event!: object;
  routeChoice = routeChoice;
}
</script>

<style scoped>
.schedule {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-weight: 400;
  font-size: 1.4em;
  color: var(--colorAccent);
  margin: 10px 0;
}

h3 {
  font-weight: 400;
  font-size: 1em;
  opacity: 0.7;
  letter-spacing: 0.5;
  margin: 10px 0;
}

h5 {
  font-weight: 250;
  margin: -5px 0;
  font-size: 1em;
}

@media (max-width: 670px) {
  .schedule {
    align-items: flex-start;
    flex-direction: column;
  }

  .schedule > :last-child {
    margin: 20px auto;
  }
}
</style>
