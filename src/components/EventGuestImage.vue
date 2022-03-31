<template>
  <section class="eg-img-container">
    <img :src="image" :alt="guest.name" :style="styles" />
    <span>{{ title }}</span>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as data from "../data/data.json";

@Options({
  props: {
    image: String,
    title: String,
  },
  methods: {
    imageValue: function (value: string) {
      const direction =
        value === "x"
          ? this.transformedImage[0]?.banner.x
          : this.transformedImage[0]?.banner.y;
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
export default class EventGuestImage extends Vue {
  guest!: string;
  title!: string;
  img =
    // @ts-ignore
    typeof this.image === "string" && this.image.slice(this.image.length - 24);
  transformedImage = data.data.transformedImages.filter((images: any) =>
    images.id.includes(this.img)
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
