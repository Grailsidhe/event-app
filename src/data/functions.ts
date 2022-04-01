import * as fr from "./data.json";
import * as en from "./en.json";
// @ts-ignore
import guests from "./guestData.js";
// @ts-ignore
import event from "./eventData.js";
import { useStore } from "../store";
import { MutationTypes } from "../store/mutation-types";

const events = event;
const store = useStore();
const fiche: any = { data: store.state.language === "fr" ? fr : en };
const data = fiche.data;

export type GuestEvent = {
  guests: [GuestEvent];
  links?: { spotify: string; youtubeChannel: string };
  name: string;
  id?: string;
  _id?: string;
  type?: string;
  tags: [] | string;
  programId: string;
  musicGroupsIds?: [];
  origin?: string;
  route: string;
};

//--------------------------------------------------------------
// makes an array of unique event days in ascending order
export function sortedDays(): string[] {
  const formattedDays = data.default.data.events
    .map((event: any) => event.showStartDate)
    .flat()
    .sort()
    .map((day: any) =>
      new Date(day).toLocaleDateString("fr-fr", {
        weekday: "long",
        day: "numeric",
      })
    );
  return Array.from(new Set(formattedDays));
}

//--------------------------------------------------------------
// chooses correct route for each screen
// item = iterated guest or event from eventData.js / guestData.js
export function routeChoice(this: any, item: GuestEvent) {
  const clearStore = this.$store.commit(MutationTypes.SET_SELECT_FILTERS, {
    programId: "",
    guestType: "",
    tag: "",
  });
  // checks that the media links are good
  // the same check also happens in GuestLinkCard.vue
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
  // if it's 'event'
  if (item.route === "event" && item.musicGroupsIds) {
    return (
      this.$router.push({ name: "event", params: { id: `${item.id}` } }),
      clearStore
    );
  } // if it's 'guest'
  else if (item.route === "guest") {
    // if guest has media, give "guest" and guest id
    if (
      (item.links?.youtubeChannel &&
        youtubeLinkCheck(item.links.youtubeChannel)) ||
      (item.links?.spotify && spotifyLinkCheck(item.links.spotify))
    ) {
      return (
        this.$router.push({ name: "guest", params: { id: `${item._id}` } }),
        clearStore
      );
    } else {
      return (
        this.$router.push({
          name: "guest_no_media",
          params: { id: `${item._id}` },
        }),
        clearStore
      );
    }
  } // else, give 'event_no_media' and event id
  else {
    return (
      this.$router.push({
        name: "event_no_media",
        params: { id: `${item.id}` },
      }),
      clearStore
    );
  }
}

//--------------------------------------------------------------
// filters guests/events by select choice
export function sortByFilter(route: string) {
  const buttonTitle = store.state.activeDayMenu.filter;
  const path: { programId: string; guestType: string; tag: any } =
    store.state.selectFilters;
  // dynamic filtered guests/events array
  let result = route === "schedule" ? events : guests;

  // takes filter variable and returns the filtered EVENTS
  // source = dynamic array | key = name of select | filter = selected value from the state
  const eventsInFilter = (source: [], key: string, filter: string) => {
    if (key === "programId") {
      return source.filter((event: GuestEvent) =>
        event.programId?.includes(filter)
      );
    }
    if (key === "tag") {
      // return guests that have the same tags as in the selected tags array
      const tagsArray: string[] = Object.values(filter);
      return source.filter((event: GuestEvent) =>
        // @ts-ignore
        tagsArray.some((tags: string | string[]) => event.tags.includes(tags))
      );
    }
    if (key === "guestType") {
      // filtered guests array with no day value
      const eventsGuests = [
        ...new Set(source.map((event: GuestEvent) => event.guests)),
      ]
        .flat()
        .filter((guest: any) => guest.type === filter);
      // returns formatted guests with day value
      return guests.filter((guest: GuestEvent) =>
        eventsGuests.some((filtered: GuestEvent) => filtered._id === guest._id)
      );
    }
  };
  // takes filter variable and returns the filtered GUESTS
  // source = dynamic array | key = name of select | filter = selected value from the state
  const guestsInFilter = (source: [], key: string, filter: string) => {
    if (key === "programId") {
      // guests array with no day value
      const eventsGuests: Object[] = [
        ...new Set(
          source
            .filter((event: { programId: string }) =>
              event.programId?.includes(filter)
            )
            .map((event: GuestEvent) => event.guests)
            .flat()
        ),
      ];
      // returns formatted guests with day value
      return guests.filter((guest: GuestEvent) =>
        eventsGuests.some((filtered: any) => filtered._id === guest._id)
      );
    }
    if (key === "tag") {
      // return guests that have the same tags as in the selected tags array
      const tagsArray: string[] = Object.values(filter);
      return source.filter((guest: GuestEvent) =>
        // @ts-ignore
        tagsArray.some((tags: string | string[]) => guest.tags.includes(tags))
      );
    }
    if (key === "guestType") {
      return source.filter((guest: GuestEvent) => guest.type === filter);
    }
  };

  // SELECT FILTERS
  if (route === "schedule") {
    // filter events - Schedule.vue
    if (path.programId != "") {
      result = eventsInFilter(events, "programId", path.programId);
    }
    if (path.tag.length > 0) {
      // filter tag
      result = eventsInFilter(result, "tag", path.tag);
    }
    return result;
  } else {
    // filter guests - Main.vue
    if (path.programId != "") {
      // if filtered by program
      result =
        store.state.activeDayMenu.menu === 2 // if the day menu is active (index 2 of the buttons array), respect it
          ? guestsInFilter(events, "programId", path.programId).filter(
              (item: { day: string }) => item.day?.includes(buttonTitle)
            )
          : guestsInFilter(events, "programId", path.programId);
    }
    if (path.tag.length > 0) {
      // if filtered by tag
      if (store.state.activeDayMenu.menu === 2) {
        // if the day menu is active (index 2 of the buttons array), respect it
        result = guestsInFilter(result, "tag", path.tag).filter(
          (item: { day: string }) => item.day?.includes(buttonTitle)
        );
      } else {
        result = guestsInFilter(result, "tag", path.tag);
      }
    }
    if (path.guestType != "") {
      // if filtered by guest type
      if (store.state.activeDayMenu.menu === 2) {
        // if the day menu is active (index 2 of the buttons array), respect it
        result = guestsInFilter(result, "guestType", path.guestType).filter(
          (item: { day: string }) => item.day?.includes(buttonTitle)
        );
      } else {
        result = guestsInFilter(result, "guestType", path.guestType);
      }
    }
    if (store.state.activeDayMenu.menu === 2) {
      // sorts guests by day chosen on the by day option (index 2 of the buttons array)
      result = result.filter((item: { day: string }) =>
        item.day?.includes(buttonTitle)
      );
    }
    return result;
  }
}

//--------------------------------------------------------------
// SORT BY MENU FILTERS - Main.vue
export function filterData(route: string) {
  const buttonTitle = store.state.activeDayMenu.filter;
  // if the alphabet menu (index 1 of the buttons array) is selected, start with all artists before a letter is chosen
  if (store.state.activeDayMenu.menu === 1 && buttonTitle === "")
    return sortByFilter(route).sort(
      (a: { weight: number }, b: { weight: number }) =>
        (b.weight != undefined ? b.weight : 0) -
        (a.weight != undefined ? a.weight : 0)
    );
  // if it's the alphabet menu, send guests starting with the chosen letter
  if (buttonTitle.length === 1) {
    // if it's X on the alphabet menu, send guests starting with number/character
    const specialChars = (characters: string) => {
      return sortByFilter(route).filter((item: { title: string[] }) =>
        characters.includes(item.title[0].toLowerCase())
      );
    };
    return buttonTitle === "#"
      ? specialChars(`0123456789$%&@+#?¥Ðßƒþ£'^*€£§"=-`)
      : buttonTitle === "a"
      ? specialChars("âäãàáåæa")
      : buttonTitle === "e"
      ? specialChars("éèêëe")
      : buttonTitle === "i"
      ? specialChars("îíìïi")
      : buttonTitle === "o"
      ? specialChars("óòöôøõœo")
      : buttonTitle === "u"
      ? specialChars("úùüûůu")
      : buttonTitle === "y"
      ? specialChars("ŷÿýy")
      : buttonTitle === "c"
      ? specialChars("cç")
      : buttonTitle === "n"
      ? specialChars("nñ")
      : sortByFilter(route).filter(
          (item: { title: string }) =>
            item.title[0].toLowerCase() === buttonTitle
        );
  }
  // if it's the day menu, send guests for the day, or all guests
  if (sortedDays().includes(buttonTitle)) {
    return sortByFilter(route).filter((item: { day: string }) =>
      item.day?.includes(buttonTitle)
    );
  } else {
    return sortByFilter(route).sort(
      (a: { weight: number }, b: { weight: number }) =>
        (b.weight != undefined ? b.weight : 0) -
        (a.weight != undefined ? a.weight : 0)
    );
  }
}

//--------------------------------------------------------------
// SEARCH FILTER
export function searchFilter(value: string, route: string) {
  const results = filterData(route)
    .map((item: GuestEvent) => {
      return {
        ...item,
        name: item.name.toLowerCase(), //makes case-insensitive to get a match
      };
    })
    .filter((item: GuestEvent) => item.name.includes(value));

  return value.length > 0 ? results : filterData(route);
}
