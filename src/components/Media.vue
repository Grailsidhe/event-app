<template>
  <section class="media">
    <div :style="[youtubeLink ? { display: 'flex' } : { display: 'none' }]">
      <iframe
        :src="formatYoutubeLink(this.youtubeLink)"
        class="youtube-player"
        frameborder="0"
        allow="accelerometer; 
                    clipboard-write; 
                    gyroscope; 
                    picture-in-picture"
      >
      </iframe>
    </div>
    <div :style="[spotifyLink ? { display: 'flex' } : { display: 'none' }]">
      <iframe
        :src="`https://open.spotify.com/embed/artist/${this.spotifyLink}?utm_source=generator`"
        class="spotify-player"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      >
      </iframe>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// @ts-ignore
import guest from "../data/guestData.js";
import { useRoute } from "vue-router";

@Options({
  props: {
    guestId: String,
  },
  methods: {
    formatYoutubeLink(link: string) {
      if (link && link.includes("user")) {
        const code = this.youtube?.slice(29);
        return `https://www.youtube.com/embed/?listType=user_uploads&list=${code}`;
      }
      if (link && link.includes("channel")) {
        const code = this.youtube?.slice(34, 56);
        return `http://www.youtube.com/embed/videoseries?list=UU${code}`;
      }
    },
  },
})
export default class Media extends Vue {
  route = useRoute();
  id = this.route.params.id;
  guest = guest.filter((guest: { _id: string }) => guest._id === this.id)?.[0];
  youtube?: string = this.guest.links?.youtubeChannel;
  spotify?: string = this.guest.links?.spotify;
  youtubeLink?: string | false =
    this.youtube?.includes("http") &&
    this.youtube?.includes("youtube.com") &&
    this.youtube?.length > 15 &&
    !this.youtube?.includes("/c/")
      ? this.youtube
      : false;
  spotifyLink?: string | false = this.spotify?.includes(
    "open.spotify.com/artist"
  )
    ? this.spotify?.slice(32, 54)
    : this.spotify?.includes("spotify:artist:")
    ? this.spotify?.slice(15, 37)
    : false;
}
</script>

<style scoped>
.media {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
}

.media > * {
  width: 100%;
  margin-bottom: 10px;
}

.youtube-player {
  width: 100%;
  aspect-ratio: 1.8 / 1;
}

.spotify-player {
  width: 100%;
  height: 380px;
}
</style>
