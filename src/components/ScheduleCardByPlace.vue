<template>
  <section class="schedule-place-card">
    <div>
      <h5>{{ hour }}</h5>
      <h3>{{ title }}</h3>
    </div>
    <div class="card-img-container" :style="styles"></div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    hour: String,
    title: String,
    image: String,
    id: String,
  },
})
export default class ScheduleCardByPlace extends Vue {
  hour!: string;
  title!: string;
  image!: string;
  id!: string;
  styles = {
    "background-image": `url(${this.image})`,
  };
}
</script>

<style scoped>
h3 {
  font-weight: 600;
  font-size: 1em;
  opacity: 0.7;
  letter-spacing: 0.5;
  color: var(--colorAccent);
}

h3:hover {
  color: var(--colorPrimary);
  transition: all 500ms ease;
}

h5 {
  font-weight: 250;
}

.schedule-place-card {
  width: 100%;
  height: 70px;
  background-color: var(--colorPrimaryLightest);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px;
  border-radius: 5px;
  min-width: fit-content;
  flex-wrap: nowrap;
}

.schedule-place-card :first-child {
  display: flex;
  flex-direction: column;
}

.schedule-place-card :first-child :first-child {
  margin: 10px 0 0 10px;
}

.schedule-place-card :first-child :last-child {
  margin: 0 0 10px 10px;
}

.card-button-img-container {
  display: flex;
  width: 250px;
  align-items: center;
  justify-content: space-between;
}

.card-img-container {
  height: 50px;
  width: 50px;
  margin: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.round .card-img-container-round {
  border-radius: 30px;
}
</style>
