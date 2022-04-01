<template>
  <section class="schedule-place-card">
    <div>
      <h5>{{ hour }}</h5>
      <h3>{{ title }}</h3>
    </div>
    <img
      class="card-img-container"
      :src="this.image"
      :alt="title"
      :style="styles"
      v-show="!this.image.includes(undefined)"
    />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as data from "../data/data.json";

@Options({
  props: {
    hour: String,
    title: String,
    image: String,
    id: String,
  },
  methods: {
    imageValue: function (value: string) {
      const direction =
        value === "x"
          ? this.transformedImage[0]?.square.x
          : this.transformedImage[0]?.square.y;
      return typeof direction != undefined ? direction * 100 + "%" : "100%";
    },
  },
  computed: {
    styles() {
      return {
        "object-position": `${this.imageValue("x")} ${this.imageValue("y")}`,
      };
    },
  },
})
export default class ScheduleCardByPlace extends Vue {
  hour!: string;
  title!: string;
  image!: string;
  id!: string;
  img =
    // @ts-ignore
    typeof this.image === "string" && this.image.slice(this.image.length - 24);
  transformedImage = data.data.transformedImages.filter((images: any) =>
    images.id.includes(this.img)
  );
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
  object-fit: cover;
  height: 50px;
  width: 50px;
  margin: 10px;
}

.round .card-img-container-round {
  border-radius: 30px;
}
</style>
