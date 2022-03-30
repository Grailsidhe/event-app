<template>
  <article class="guest-container">
    <section class="guest-header">
      <EventGuestHeader
        :routeName="schedule"
        :stateMenuFilter="this.sortedDays()[0]"
      />
    </section>
    <article class="guest-content">
      <section class="guest-main">
        <EventGuestImage :image="image" :title="name" />
        <EventGuestTitleBar
          :tagText="tags"
          :country="country"
          origin="aGuest"
        />
        <div :key="event.id" v-for="event in events">
          <EventSchedule
            :date="event.day"
            :hour="event.hour"
            :place="event.place"
            :link="event.link"
            :name="event.name"
            :event="event"
          />
        </div>
        <TextField :text="description" />
        <Copyrights :text="copyright" :description="description" />
      </section>
      <section class="guest-sidebar">
        <div
          :style="[
            this.facebook ||
            this.deezer ||
            this.twitter ||
            this.youtube ||
            this.spotify ||
            this.instagram ||
            this.soundcloud
              ? { display: 'flex' }
              : { display: 'none' },
          ]"
        >
          <SocialMediaButtons
            :instagram="instagram"
            :twitter="twitter"
            :facebook="facebook"
            :deezer="deezer"
            :spotify="spotify"
            :soundcloud="soundcloud"
            :youtube="youtube"
          />
        </div>
        <Media :guestId="this.route.params.id" />
        <Contact :telephone="telephone" :website="website" :email="email" />
      </section>
    </article>
  </article>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EventGuestHeader from "./components/EventGuestHeader.vue";
import EventGuestImage from "./components/EventGuestImage.vue";
import EventGuestTitleBar from "./components/EventGuestTitleBar.vue";
import TextField from "./components/TextField.vue";
import EventSchedule from "./components/EventSchedule.vue";
import Copyrights from "./components/Copyrights.vue";
import SocialMediaButtons from "./components/SocialMediaButtons.vue";
import Contact from "./components/Contact.vue";
import Media from "./components/Media.vue";
// @ts-ignore
import guest from "./data/guestData.js";
import { useRoute } from "vue-router";
import { sortedDays } from "./data/functions";

@Options({
  components: {
    EventGuestHeader,
    EventGuestImage,
    EventGuestTitleBar,
    TextField,
    EventSchedule,
    Copyrights,
    SocialMediaButtons,
    Contact,
    Media,
  },
  props: {
    id: String,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
})
export default class Guest extends Vue {
  route = useRoute();
  sortedDays = sortedDays;
  id = this.route.params.id;
  guest = // @ts-ignore
    guest.filter((guest) => guest._id === this.id)?.[0];
  name: string = this.guest.name;
  image: string = this.guest.image;
  // @ts-ignore
  twitter?: string = this.guest.links.twitter;
  instagram?: string = this.guest.links.instagram;
  facebook?: string = this.guest.links.facebook;
  deezer?: string = this.guest.links.deezer;
  spotify?: string = this.guest.links.spotify;
  // @ts-ignore
  soundcloud?: string = this.guest.links.soundcloud;
  youtube?: string = this.guest.links.youtubeChannel;
  // @ts-ignore
  telephone?: string = this.guest.phone;
  // @ts-ignore
  email?: string = this.guest.email;
  website?: string = this.guest.website
    ? this.guest.website
    : this.guest.links.website;
  copyright?: string = this.guest.copyright;
  description?: string = this.guest.description;
  country?: string = this.guest.origin;
  tags: string[] = this.guest.tags;
  events: object[] = this.guest.events;
}
</script>

<style scoped>
.guest-container {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: auto;
  max-width: 1000px;
}

.guest-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;
}

.guest-header {
  width: 100%;
}

.guest-main {
  grid-area: 1 / 1 / 2 / 3;
}

.guest-sidebar {
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

@media (max-width: 670px) {
  .guest-content {
    display: flex;
    flex-direction: column;
  }

  .guest-sidebar {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
