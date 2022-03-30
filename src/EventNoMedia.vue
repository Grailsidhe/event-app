<template>
  <article class="event-container">
    <section class="event-header">
      <EventGuestHeader
        :programs="programs"
        :routeName="schedule"
        :params="{ type: 'TYPE', id: 'ID' }"
        :stateMenuFilter="this.sortedDays()[0]"
      />
    </section>
    <article class="event-content">
      <section class="event-main">
        <EventGuestImage :image="image" v-show="!image.includes('undefined')" />
        <EventGuestTitleBar
          :eventTitle="name"
          :tagText="tags"
          :country="country"
          origin="anEvent"
        />
        <EventSchedule
          :date="day"
          :hour="hour"
          :place="place"
          :link="link"
          :name="name"
        />
      </section>
      <section class="event-sidebar">
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
        <TextField :text="description" />
        <Copyrights :text="copyright" :description="description" />
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
import GuestLinkCards from "./components/GuestLinkCards.vue";
// @ts-ignore
import eventData from "./data/eventData.js";
import { useRoute } from "vue-router";
import { sortedDays } from "./data/functions";
import type { Event } from "./types/types";

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
    GuestLinkCards,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
})
export default class EventNoMedia extends Vue {
  route = useRoute();
  sortedDays = sortedDays;
  id: string | string[] = this.route.params.id;
  // @ts-ignore
  event: Event = eventData.filter(
    (event: { id: string }) => event.id === this.id
  )?.[0];
  name: string = this.event.title;
  image: string = this.event.image;
  day: string = this.event.day;
  twitter?: string = this.event.links?.twitter;
  instagram?: string = this.event.links?.instagram;
  facebook?: string = this.event.links?.facebook;
  deezer?: string = this.event.links?.deezer;
  spotify?: string = this.event.links?.spotify;
  soundcloud?: string = this.event.links?.soundcloud;
  youtube?: string = this.event.links?.youtubeChannel;
  telephone?: string = this.event.phone;
  email?: string = this.event.email;
  website?: string = this.event.website;
  copyright?: string = this.event.copyright;
  description?: string = this.event.description;
  country?: string = this.event.origin;
  tags: string[] = this.event.genres;
  events: object[] = this.event.events;
  link: string = this.event.link;
  place: string = this.event.place;
  hour: string = this.event.hour;
}
</script>

<style scoped>
.event-container {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: auto;
  max-width: 1000px;
}

.event-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;
}

.event-header {
  width: 100%;
}

.event-main {
  grid-area: 1 / 1 / 2 / 3;
}

.event-sidebar {
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

@media (max-width: 670px) {
  .event-content {
    display: flex;
    flex-direction: column;
  }

  .event-sidebar {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
