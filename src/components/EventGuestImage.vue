<template>
  <section class="eg-img-container">
    <img :src="image" alt="" />
    <span>{{ title }}</span>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as data from "../data/data.json";
// @ts-ignore
import Croppa from "vue-croppa";

@Options({
  props: {
    image: String,
    title: String,
  },
  methods: {
    imageValues: function (value: string) {
      const direction =
        value === "x"
          ? this.transformedImage[0]?.banner.x
          : this.transformedImage[0]?.banner.y;
      console.log(direction);
      return typeof direction === "number" ? direction * 100 + "%" : "50%";
    },
  },
  data() {
    // @ts-ignore
    console.log(this.imageValues("x"));
    return {
      styles: {
        // @ts-ignore
        "object-position": `${this.imageValues("x")} ${this.imageValues("y")}`,
      },
    };
  },
})
export default class EventGuestImage extends Vue {
  croppa = Croppa;
  guest!: string;
  title!: string;
  // @ts-ignore
  img = typeof this.image === "string" && this.image.slice(36);
  transformedImage = data.data.transformedImages.filter(
    (images: any) => images.id.slice(1, images.id.length - 4) === this.img
  );
}
</script>

<style scoped>
.eg-img-container {
  color: white;
  text-transform: uppercase;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 1.6em;
  text-transform: uppercase;
  position: relative;
}

.eg-img-container img {
  object-fit: cover;
  height: 300px;
  width: 100%;
}

.eg-img-container span {
  position: absolute;
  z-index: 1;
  padding: 10px;
  filter: drop-shadow(0 0 3px #000000);
}
</style>
