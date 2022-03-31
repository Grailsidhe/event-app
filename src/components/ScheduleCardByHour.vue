<template>
  <section class="card">
    <div @click="routeChoice(event)">
      <h3>{{ title }}</h3>
      <h5>{{ place }} &nbsp;•&nbsp; {{ hour }}</h5>
    </div>
    <div class="card-button-img-container">
      <a :href="link" target="_new">
        <Button
          text="billetterie"
          mainColor="var(--colorAccent)"
          hoverColor="var(--colorPrimary)"
          v-show="this.link?.length > 0"
        />
      </a>
      <img
        class="card-img-container"
        :src="this.image"
        :alt="title"
        :style="styles"
        @click="routeChoice(event)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "./Button.vue";
import { routeChoice } from "../data/functions";
import * as data from "../data/data.json";

@Options({
  components: {
    Button,
  },
  props: {
    place: String,
    title: String,
    image: String,
    hour: String,
    link: String,
    event: Object,
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
export default class ScheduleCardByHour extends Vue {
  place!: string;
  title!: string;
  image!: string;
  hour!: string;
  link!: string;
  event!: object;
  routeChoice = routeChoice;
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

.card {
  width: 100%;
  height: 70px;
  background-color: var(--colorPrimaryLightest);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px;
  border-radius: 5px;
}

.card :first-child {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card :first-child :first-child {
  margin: auto 0 auto 10px;
}

.card :first-child :last-child {
  margin: auto 0 auto 10px;
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

.round .card-img-container {
  border-radius: 30px;
}

@media (max-width: 670px) {
  .card-button-img-container {
    display: none;
  }
}
</style>
