<template>
  <article class="main">
    The images are broken due to the specific URL formatting
    <div class="demo">PreLoader</div>
    <PreLoader />

    <div class="demo">Language</div>
    <Language />

    <div class="demo">
      TagSelect <span>title: string + selectItems: [string]</span>
    </div>
    <TagSelect title="Tag" :selectItems="selectItems" />

    <div class="demo">ButtonShare<span>text: string</span></div>
    <ButtonShare text="partager" @click="togglePopup()" />

    <div ref="sharepopup" @focusout="closePopup()" tabindex="0">
      <SharePopup
        v-show="this.popup"
        :style="this.origin === 'anEvent' ? { top: '100px' } : { top: '40px' }"
      />
    </div>

    <div class="demo">SharePopup</div>
    <SharePopup />

    <div class="demo">DayMenuButtons <span>text: [string]</span></div>
    <DayMenuButtons :text="btnDay" />

    <div class="demo">ScheduleDayMenuButtons <span>text: [string]</span></div>
    <ScheduleDayMenuButtons :text="btnDay" />

    <div class="demo">TagContainer <span>text: [string]</span></div>
    <TagContainer :text="tagText" />

    <div class="demo">SearchBar</div>
    <SearchBar />

    <div class="demo">
      Select<span>selectItems: [string] + title: string</span>
    </div>
    <Select :selectItems="selectItems" title="Programme" />

    <div class="demo">
      Button
      <span
        >mainColor: string + hoverColor: string + text: string + padd: string +
        link: string</span
      >
    </div>
    <Button
      :link="button.link"
      :mainColor="button.mainColor"
      :hoverColor="button.hoverColor"
      text="accueil"
    />

    <div class="demo">
      SocialMediaButtons
      <span>facebook: string + twitter: string + instagram: string + etc</span>
    </div>
    <SocialMediaButtons
      :youtube="socialMedia.youtube"
      :spotify="socialMedia.spotify"
      :soundcloud="socialMedia.soundcloud"
      :facebook="socialMedia.facebook"
      :twitter="socialMedia.twitter"
      :instagram="socialMedia.instagram"
      :deezer="socialMedia.deezer"
    />

    <div class="demo">
      ScheduleCardByHour
      <span
        >event: {} + id: string + link: string + hour: string + title: string +
        image: string + place: string</span
      >
    </div>
    <ScheduleCardByHour
      :hour="scheduleCardByHour.hour"
      :place="scheduleCardByHour.place"
      :title="scheduleCardByHour.name"
      :image="scheduleCardByHour.image"
      :id="scheduleCardByHour.id"
      :event="scheduleCardByHour"
      :link="scheduleCardByHour.link"
    />

    <div class="demo">
      ScheduleCardByPlace
      <span>hour: string + title: string + image: string</span>
    </div>
    <ScheduleCardByPlace
      :hour="scheduleCardByPlace.hour"
      :title="scheduleCardByPlace.event"
      :image="scheduleCardByPlace.image"
    />

    <div class="demo">AlphabetMenu</div>
    <AlphabetMenu />

    <div class="demo">
      GuestLinkCards <span>guests: [ { name: string + image: string } ]</span>
    </div>
    <GuestLinkCards :guests="guestData" />

    <div class="demo">
      GuestCard
      <span
        >name: string + date: string + hour: string + place: string + image:
        string</span
      >
    </div>
    <GuestCard
      :name="guestCard.name"
      :date="guestCard.date"
      :hour="guestCard.hour"
      :place="guestCard.place"
      :image="guestCard.image"
    />

    <div class="demo">Copyrights <span>text: string</span></div>
    <Copyrights :text="copyright" />

    <div class="demo">SeparatorBar <span>text: string</span></div>
    <SeparatorBar :text="separatorText" />

    <div class="demo">
      EventGuestImage <span>title: string + image: string</span>
    </div>
    <EventGuestImage
      :image="eventGuestImage.image"
      :title="eventGuestImage.title"
    />

    <div class="demo">
      Contact <span>telephone: string + website: string + email: string</span>
    </div>
    <Contact
      :telephone="contact.telephone"
      :website="contact.website"
      :email="contact.email"
    />

    <div class="demo">
      ContactLeft
      <span>telephone: string + website: string + email: string</span>
    </div>
    <ContactLeft
      :telephone="contact.telephone"
      :website="contact.website"
      :email="contact.email"
    />

    <div class="demo">TextField <span>text: string</span></div>
    <TextField :text="text" />

    <div class="demo"><br />COLLECTIONS<br /><br /></div>

    <div class="demo">
      EventGuestTitleBar<span
        >country: string + eventTitle: string + btnText: string + tagText:
        [string] + origin: string</span
      >
    </div>
    <EventGuestTitleBar
      :country="eventGuestTitleBar.country"
      :eventTitle="eventGuestTitleBar.eventTitle"
      :btnText="btnShareText"
      :tagText="tagText"
      origin="anEvent"
    />

    <div class="demo">
      EventSchedule<span>date: string + hour: string + place: [string]</span>
    </div>
    <EventSchedule
      :link="eventSchedule.link"
      :date="eventSchedule.date"
      :hour="eventSchedule.hour"
      :place="eventSchedule.place"
      :name="eventSchedule.name"
    />

    <div class="demo">
      EventGuestHeader<span
        >routeName: string + params: { type: string, id: string } +
        stateMenuFilter: string</span
      >
    </div>
    <EventGuestHeader
      :routeName="schedule"
      :params="{ type: 'TYPE', id: 'ID' }"
      stateMenuFilter="monday 1"
    />

    <div class="demo">ScheduleByHourGrid<span>hour: date | number</span></div>
    The cards that populate the grid require a match with the hour prop
    <ScheduleByHourGrid hour="1647484200000" />

    <div class="demo">ScheduleByPlaceGrid<span>placeId: string</span></div>
    The cards that populate the grid require a match with the placeId prop
    <ScheduleByPlaceGrid :placeId="scheduleByHour[0].id" />

    <div class="demo">
      MainHeader<span
        >route: { name: string, type: string, id: string } + guestTypes:
        [string] + programs: [ {} ] + text: string + stateMenuFilter: [string] +
        showSelect: boolean</span
      >
    </div>
    <MainHeader
      :route="{ name: 'main', type: 'type', id: 'id' }"
      :showSelect="true"
      text="programmation"
      :programs="programs"
      :guestTypes="guestTypes"
      :stateMenuFilter="sortedDays[0]"
    />

    <div class="demo">
      MainHeaderSortMenu<span
        >category: [string] + selectItems: [string] + route: string</span
      >
    </div>
    <MainHeaderSortMenu
      :category="categorySchedule"
      :selectItems="selectItems"
      route="main"
    />
  </article>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TagSelect from "./components/TagSelect.vue";
import Language from "./components/Language.vue";
import GuestCard from "./components/GuestCard.vue";
import SortByMenu from "./components/SortByMenu.vue";
import SharePopup from "./components/SharePopup.vue";
import AlphabetMenu from "./components/AlphabetMenu.vue";
import SearchBar from "./components/SearchBar.vue";
import Button from "./components/Button.vue";
import ButtonShare from "./components/ButtonShare.vue";
import DayMenuButtons from "./components/DayMenuButtons.vue";
import ScheduleDayMenuButtons from "./components/ScheduleDayMenuButtons.vue";
import TagContainer from "./components/TagContainer.vue";
import EventGuestTitleBar from "./components/EventGuestTitleBar.vue";
import Copyrights from "./components/Copyrights.vue";
import EventSchedule from "./components/EventSchedule.vue";
import Contact from "./components/Contact.vue";
import ContactLeft from "./components/ContactLeft.vue";
import GuestLinkCards from "./components/GuestLinkCards.vue";
import SocialMediaButtons from "./components/SocialMediaButtons.vue";
import MainHeaderSortMenu from "./components/MainHeaderSortMenu.vue";
import SeparatorBar from "./components/SeparatorBar.vue";
import ScheduleCardByPlace from "./components/ScheduleCardByPlace.vue";
import ScheduleCardByHour from "./components/ScheduleCardByHour.vue";
import ScheduleByHourGrid from "./components/ScheduleByHourGrid.vue";
import ScheduleByPlaceGrid from "./components/ScheduleByPlaceGrid.vue";
import EventGuestHeader from "./components/EventGuestHeader.vue";
import MainHeader from "./components/MainHeader.vue";
import EventGuestImage from "./components/EventGuestImage.vue";
import TextField from "./components/TextField.vue";
import Select from "./components/Select.vue";
// @ts-ignore
import PreLoader from "./components/PreLoader.vue";
// @ts-ignore

@Options({
  components: {
    TagSelect,
    GuestCard,
    Language,
    AlphabetMenu,
    SharePopup,
    SortByMenu,
    SearchBar,
    Button,
    ButtonShare,
    DayMenuButtons,
    ScheduleDayMenuButtons,
    TagContainer,
    EventGuestTitleBar,
    Copyrights,
    EventSchedule,
    Contact,
    ContactLeft,
    GuestLinkCards,
    SocialMediaButtons,
    MainHeaderSortMenu,
    SeparatorBar,
    ScheduleCardByPlace,
    ScheduleCardByHour,
    ScheduleByHourGrid,
    ScheduleByPlaceGrid,
    EventGuestHeader,
    MainHeader,
    EventGuestImage,
    TextField,
    Select,
    PreLoader,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      popup: false,
    };
  },
  methods: {
    togglePopup() {
      return !this.popup
        ? ((this.popup = true), this.$refs.sharepopup.focus())
        : (this.popup = false);
    },
    closePopup() {
      return (this.popup = false);
    },
  },
})
export default class App extends Vue {
  guestCard = {
    name: "Meowsie",
    date: "wednesday 12",
    hour: "12h30 - 1h00",
    place: "Place Plum",
    image: "/img/meowsie.jpg",
  };
  categoryMain = ["artists", "a - z", "by day"];
  categorySchedule = ["par lieu", "par heure"];
  button = {
    mainColor: "purple",
    hoverColor: "blue",
    text: "accueil",
    link: "link",
  };
  btnShareText = "partager";
  btnDay = [
    "monday 1",
    "tuesday 2",
    "wednesday 3",
    "thursday 4",
    "friday 6",
    "saturday 7",
    "sunday 8",
  ];
  tagText = ["rock", "synthpop", "music"];
  eventGuestTitleBar = {
    eventTitle: "Awesome Event",
    country: "Aruba",
  };
  copyright = "This person.";
  eventSchedule = {
    date: "dimanche 23 octobre",
    hour: "12h00 - 13h00",
    place: "Scène La Roche",
    link: "#",
    name: "Super event",
  };
  contact = {
    telephone: "12 345 6789",
    email: "person@thisaddress.com",
    website: "http://thissite.com",
  };
  sortedDays = ["monday", "tuesday"];
  guestData = [
    {
      name: "Meowsie",
      image: "z5f5740cf8a935e28c0e8b4f7.jpg",
    },
    {
      name: "Cool Katt",
      image: "z5f5740cf8a935e28c0e8b4f7.jpg",
    },
  ];
  socialMedia = {
    instagram: "#",
    twitter: "#",
    facebook: "#",
    deezer: "#",
    soundcloud: "#",
    youtube: "#",
    spotify: "#",
  };
  separatorText = "Scène Royale";
  scheduleCardByPlace = {
    hour: "12h00",
    event: "Chouquette Royal",
    image: "5f5788b28a935e28c0e8b55e",
  };
  scheduleCardByHour = {
    name: "This event",
    hour: "12h00",
    place: "La Plage",
    image: "5f5788b28a935e28c0e8b55e",
    id: "123",
    link: "querty",
  };
  scheduleByHour = [
    {
      place: "La Plage",
      hour: 1647484200000,
      title: "Chouquette Royal",
      id: "id",
      image: "5f5788b28a935e28c0e8b55e",
    },
    {
      place: "La Plage",
      hour: "12h00",
      title: "Croissant Magnifique",
      image: "5f5788b28a935e28c0e8b55e",
      id: "id",
    },
    {
      place: "La Plage",
      hour: "12h00",
      title: "Tartelette Fabuleuse",
      image: "5f5788b28a935e28c0e8b55e",
      id: "id",
    },
    {
      place: "La Plage",
      hour: "12h00",
      title: "Macaron Melon",
      image: "5f5788b28a935e28c0e8b55e",
      id: "id",
    },
  ];
  guestTypes = ["artist", "librarian", "carnie"];
  programs = ["Festival 🎸", "Village 🏠", "Concerts Gratuits"];
  eventGuestImage = {
    title: "Meowsie",
    image: "5f5788b28a935e28c0e8b55e",
  };
  text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.`;
  selectItems = ["option 1", "option 2", "option 3", "option 4"];
}
</script>

<style>
.main {
  margin: 30px;
}

.demo {
  display: flex;
  flex-direction: column;
  background: rgb(92, 92, 94);
  margin: 40px 0 20px;
  padding: 5px 10px;
  color: white;
  font-weight: 400;
}
.demo > * {
  font-weight: 200;
  background: rgb(118, 118, 119);
  font-size: 0.7em;
  padding: 5px;
}
</style>
