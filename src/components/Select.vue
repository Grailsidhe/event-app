<template>
  <section class="select-container" @focusout="hideMenu()" tabindex="0">
    <!-- if there's only one name, display it instead -->
    <div class="single-element" v-show="this.selectItems.length === 1">
      {{ this.selectItems[0] }}
    </div>
    <!-- display select otherwise -->
    <div class="input-wrapper" v-show="this.selectItems.length > 1">
      <div class="select" @click="showMenu()">
        {{ titleChoice() }}
      </div>
      <svg
        @click="clear()"
        xmlns="http://www.w3.org/2000/svg"
        class="closing-x"
        viewBox="0 0 16 16"
        v-show="
          (this.arrow === 'up' &&
            this.$store.state.selectFilters.guestType.includes(
              titleChoice()
            )) ||
          (this.$store.state.selectFilters.programId?.length > 0 &&
            this.title.includes('Program'))
        "
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="arrow"
        viewBox="0 0 16 16"
        @click="showMenu()"
        v-show="
          (this.arrow === 'up' &&
            !this.$store.state.selectWindow.open &&
            this.$store.state.selectWindow.title === this.title) ||
          this.$store.state.selectWindow.title != this.title
        "
      >
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="arrow"
        viewBox="0 0 16 16"
        @click="showMenu()"
        v-show="
          this.$store.state.selectWindow.open &&
          this.$store.state.selectWindow.title === this.title
        "
      >
        <path
          d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
        />
      </svg>
    </div>

    <div
      v-show="
        this.$store.state.selectWindow.open &&
        this.$store.state.selectWindow.title === this.title
      "
      class="select-items-container"
    >
      <div
        class="select-items"
        :key="item"
        v-for="(item, index) in selectItems"
      >
        <div :id="index" @click="onClick(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { MutationTypes } from "../store/mutation-types";
import { Options, Vue } from "vue-class-component";
import * as data from "../data/data.json";
import { useStore } from "../store";

@Options({
  props: {
    selectItems: Array,
    title: String,
  },
  data() {
    return {
      arrow: "up",
    };
  },
  methods: {
    onClick(item: string) {
      const path = this.store.state.selectFilters;
      if (this.title.includes("Program")) {
        const chosenProgramId: string = data.data.programs
          .filter((program: { name: string }) => program.name === item)
          .map((program: { _id: string }) => program._id)[0];
        return (
          this.store.commit(MutationTypes.SET_SELECT_FILTERS, {
            programId: chosenProgramId,
            guestType: path.guestType,
            tag: path.tag,
          }),
          this.showMenu()
        );
      } else {
        return (
          this.store.commit(MutationTypes.SET_SELECT_FILTERS, {
            programId: path.programId,
            guestType: item,
            tag: path.tag,
          }),
          this.showMenu()
        );
      }
    },
    // set selected choice as display title
    titleChoice() {
      const path = this.store.state.selectFilters;
      const programName = data.data.programs.filter(
        (program) => program._id === path.programId
      )[0]?.name;
      return this.title.includes("Type") && path.guestType != ""
        ? path.guestType
        : this.title.includes("Program") && path.programId != ""
        ? programName
        : this.title;
    },
    // menu toggle
    showMenu() {
      const path = this.store.state.selectWindow;
      if (!path.open) {
        return (
          this.store.commit(MutationTypes.SET_SELECT_WINDOW, {
            open: true,
            title: this.title,
          }),
          (this.arrow = "down")
        );
      }
      if (path.open && path.title === this.title) {
        return this.hideMenu();
      }
    },
    hideMenu() {
      return (
        this.store.commit(MutationTypes.SET_SELECT_WINDOW, {
          open: false,
          title: this.title,
        }),
        (this.arrow = "up")
      );
    },
    // reset the select values in the state
    clear() {
      const path = this.store.state.selectFilters;
      if (path.programId != "" && this.title.includes("Program")) {
        return (
          this.store.commit(MutationTypes.SET_SELECT_FILTERS, {
            programId: "",
            guestType: path.guestType,
            tag: path.tag,
          }),
          (this.arrow = "up")
        );
      }
      if (path.guestType != "" && this.title.includes("Type")) {
        return (
          this.store.commit(MutationTypes.SET_SELECT_FILTERS, {
            programId: path.programId,
            guestType: "",
            tag: path.tag,
          }),
          this.store.commit(MutationTypes.SET_SELECT_WINDOW, {
            open: false,
            title: this.title,
          }),
          (this.arrow = "up")
        );
      }
    },
  },
})
export default class Select extends Vue {
  store = useStore();
  selectItems!: [string];
  title!: string;
  arrow: string = "up";
}
</script>

<style scoped>
.select-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 35px;
  width: fit-content;
}

.single-element {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.2em;
  margin: auto 0;
  color: var(--colorAccent);
}

.input-wrapper {
  display: flex;
  border-bottom-style: groove;
  align-items: center;
  border-bottom: 2px solid var(--colorAccent);
  cursor: pointer;
  width: 100%;
}

.select {
  padding: 5px 5px 5px 0;
  text-transform: uppercase;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
  background-color: rgba(0, 0, 0, 0);
  color: var(--colorAccent);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.closing-x {
  height: 20px;
  width: 20px;
  margin: auto 0 auto 5px;
  cursor: pointer;
  fill: red;
}

.select-items-container {
  border: solid 2px var(--colorMenuBackground);
  padding: 15px;
  background-color: var(--colorMenuBackground);
  position: absolute;
  top: 34px;
  width: 171px;
  z-index: 99;
  transition-duration: 0.5s;
}

.round .select-items-container {
  border: solid 2px var(--colorAccent);
  border-radius: 0 0 5px 5px;
}

.arrow {
  fill: var(--colorAccent);
  height: 16px;
  width: 16px;
  cursor: pointer;
  margin-left: 10px;
}

.select-items {
  padding: 5px;
  color: var(--colorMenuForeground);
  cursor: pointer;
  width: fit-content;
}

.select-items > * {
  color: var(--colorMenuForeground);
}

.select-items:hover {
  color: var(--colorAccent);
}

@media (max-width: 670px) {
  .select-container,
  .round .select-items-container {
    width: 100%;
  }
}
</style>
