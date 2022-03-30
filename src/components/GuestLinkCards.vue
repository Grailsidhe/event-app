<template>
  <section class="guest-links-container">
    <div :key="index" v-for="(guest, index) in guests">
      <div
        class="guest-link"
        :style="{ 'background-image': `url(${getFormattedImage(guest._id)})` }"
        @click="sortGuestPath(guest)"
      >
        <span :id="guest._id">{{ guest.name }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
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
  },
})
export default class GuestLinkCards extends Vue {
  guests!: [];
  guestData = guests;
}
</script>

<style scoped>
.guest-links-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
}

.guest-link {
  width: 100%;
  aspect-ratio: 2.5 / 1;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 30%;
  background-size: cover;
  margin: 0 0 5px;
  color: white;
  text-transform: uppercase;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
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

.guest-link :first-child,
.round .guest-link :first-child {
  padding: 10px;
  filter: drop-shadow(0 0 1px #000000);
}
</style>
