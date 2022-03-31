<template>
  <section class="guest-links-container">
    <div :key="guest" v-for="guest in guests" class="guest-link-img-wrapper">
      <img
        :src="getFormattedImage(guest._id)"
        :alt="guest.name"
        @click="sortGuestPath(guest)"
        class="guest-link"
      />
      <span :id="guest._id">{{ guest.name }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
//import * as data from "../data/data.json";
// @ts-ignore
import guests from "../data/guestData.js";

@Options({
  props: {
    guests: Array,
  },
  methods: {
    // if they have no media, route to no media page
    sortGuestPath(guest: {
      links?: {
        spotify: string;
        youtubeVideoKey: string;
        youtubeChannel: string;
      };
      _id: string;
    }) {
      // check that media links are good
      const youtubeLinkCheck = (link: string): boolean => {
        return (
          link.includes("http") &&
          link.includes("youtube.com") &&
          link.length > 15 &&
          !link.includes("/c/")
        );
      };
      const spotifyLinkCheck = (link: string): boolean => {
        return (
          link.includes("open.spotify.com/artist") ||
          link.includes("spotify:artist:")
        );
      };
      if (
        (guest.links?.youtubeChannel &&
          youtubeLinkCheck(guest.links?.youtubeChannel)) ||
        (guest.links?.spotify && spotifyLinkCheck(guest.links?.spotify))
      ) {
        this.$router.push({ name: "guest", params: { id: `${guest._id}` } });
      } else {
        this.$router.push({
          name: "guest_no_media",
          params: { id: `${guest._id}` },
        });
      }
    },
    getFormattedImage(guestId: string) {
      return this.guestData
        .filter((guest: { _id: string }) => guest._id === guestId)
        .map((guest: { image: any }) => guest.image);
    },
    /*
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
  */
  },
})
export default class GuestLinkCards extends Vue {
  guests!: [];
  guestData = guests;
  /*
  img =
    // @ts-ignore
    typeof this.image === "string" && this.image.slice(this.image.length - 24);
  transformedImage = data.data.transformedImages.filter((images: any) =>
    images.id.includes(this.img)
  );
  */
}
</script>

<style scoped>
.guest-links-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
}

.guest-link-img-wrapper {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.guest-link {
  aspect-ratio: 2.5 / 1;
  object-fit: cover;
  object-position: 100% 40%;
  height: 130px;
  width: 100%;
  margin: 0 0 5px;
  text-transform: uppercase;
  cursor: pointer;
}

.round .guest-link {
  margin: 5px 0;
  border-radius: 20px;
}

.guest-link:hover,
.round .guest-link:hover {
  filter: contrast(1.1);
}

.guest-link-img-wrapper span,
.guest-link-img-wrapper span {
  position: absolute;
  z-index: 1;
  padding: 10px;
  color: white;
  filter: drop-shadow(0 0 1px #000000);
}
</style>
