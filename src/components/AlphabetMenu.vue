<template>
  <section class="alphabet-bar">
    <nav :key="letter" v-for="letter in lettersDisplay()">
      <div
        :id="letter"
        :class="this.selectLetter(letter)"
        @click="this.activeLetter(0, letter, 1)"
        v-show="letter"
      >
        {{ letter.toUpperCase() }}
      </div>
    </nav>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "../store";
import { MutationTypes } from "../store/mutation-types";
import { sortByFilter } from "../data/functions";
// @ts-ignore
import guests from "../data/guestData.js";

@Options({
  methods: {
    activeLetter(number: number, filter: string, menu: number) {
      const data = { number: number, filter: filter, menu: menu };
      return this.$store.commit(MutationTypes.SET_DAY_MENU, data);
    },
    // sets active css on chosen letter
    selectLetter(letter: string) {
      return this.$store.state.activeDayMenu.filter === letter
        ? "alphabet-square-active"
        : "alphabet-square";
    },
    lettersDisplay() {
      const regex = new RegExp(/[a-zà-ÿ]/);
      const guestFirstLetters = new Set(
        this.guests
          .map((guest: any) => guest.name[0].toLowerCase())
          .filter((letter: string) => regex.test(letter))
          .flat()
      );
      const array: any = Array.from(guestFirstLetters).sort();
      array.map((letter: any) =>
        letter.normalize("NFD").replace(/[\u0300-\u036f]/, "")
      );
      const parsed = array
        .map((letter: any) =>
          letter.normalize("NFD").replace(/[\u0300-\u036f]/, "")
        )
        .sort((a: any, b: any) => a.localeCompare(b));
      parsed.push("#");
      return parsed;
    },
  },
})
export default class AlphabetMenu extends Vue {
  store = useStore();
  sortByFilter = sortByFilter;
  guests = guests;
}
</script>

<style scoped>
.alphabet-bar {
  display: flex;
  height: 25px;
  border: solid 3px var(--colorMenuBackground);
  border-right: 0;
  box-shadow: 4px 4px 0px 1px var(--colorMenuBackground);
  margin: 20px 0 30px;
  background-color: rgba(0, 0, 0, 0);
  width: fit-content;
  font-size: 1.3em;
}

.alphabet-square,
.alphabet-square-active {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 25px;
  border-right: solid 3px var(--colorMenuBackground);
  background-color: rgba(0, 0, 0, 0);
  color: var(--colorMenuBackground);
  cursor: pointer;
}

.alphabet-square:hover,
.alphabet-square:active,
.alphabet-square-active {
  background-color: var(--colorMenuBackground);
  color: var(--colorMenuForeground);
  transition: all 200ms ease;
}

.alphabet-square:active,
.alphabet-square-active {
  transition: all 0.2s;
}

.round .alphabet-bar {
  border: 0;
  font-size: 1.2em;
  background-color: var(--colorMenuBackground);
  border-radius: 30px;
  padding: 5px 10px;
  justify-content: center;
  box-shadow: 0 0 0 0;
}

.round .alphabet-square,
.round .alphabet-square-active {
  color: var(--colorMenuForeground);
  border-radius: 30px;
  margin: 0 1px;
}

.round .alphabet-square:hover,
.round .alphabet-square:active,
.round .alphabet-square-active {
  background-color: var(--colorAccent);
  color: var(--colorMenuBackground);
}

@media (max-width: 800px) {
  .alphabet-bar {
    justify-content: center;
    height: fit-content;
    margin: auto auto 20px;
    flex-wrap: wrap;
    width: fit-content;
    font-size: 1.3em;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    border: 0;
  }

  .alphabet-square,
  .alphabet-square-active {
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: 30px;
    margin: 0;
    padding: 1px;
    border: solid 3px var(--colorMenuBackground);
    box-shadow: 4px 4px 0px 1px var(--colorMenuBackground);
  }

  .round .alphabet-bar {
    background-color: rgba(0, 0, 0, 0);
  }

  .round .alphabet-square,
  .round .alphabet-square-active {
    background-color: var(--colorMenuBackground);
    padding: 3px;
    margin: 2px;
  }

  .round .alphabet-square-active {
    background-color: var(--colorAccent);
  }
}
</style>
