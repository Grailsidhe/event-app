<template>
  <section :class="[this.category.length === 2 ? 'sort-menu-2' : 'sort-menu']">
    <nav :key="item" v-for="(item, index) in category">
      <button
        :id="index"
        :class="this.chooseDisplay(index)"
        @click="this.activeButton(index)"
      >
        {{ item }}
      </button>
    </nav>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "../store";
import { MutationTypes } from "../store/mutation-types";
import { sortedDays, filterData } from "../data/functions";
import { useRoute } from "vue-router";

@Options({
  props: {
    category: Array,
    roundedStyle: Boolean,
  },
  methods: {
    activeButton(value: number) {
      const push = (f: string) => {
        return this.store.commit(MutationTypes.SET_DAY_MENU, {
          number: 0,
          filter: f,
          menu: value,
        });
      };

      if (this.route.path.includes("schedule")) {
        // if the component is in Schedule.vue
        // puts the first day name (DayMenu) in the state when either button is clicked
        return push(sortedDays()[0]);
      } else {
        // if the component is in any other screen (Main.vue)
        // puts the first day name (DayMenu) in the state if the third button is clicked
        const filter = value === 2 ? sortedDays()[0] : "";
        return push(filter);
      }
    }, // sets the style (rounded or squared)
    chooseDisplay(index: number) {
      const menu = this.$store.state.activeDayMenu.menu;
      const two = this.category.length === 2;

      if (index === menu) {
        return "button-div-active";
      } else if (index != menu) {
        return "button-div";
      } else if (two && index === 0 && menu === index) {
        return "first-div-active";
      } else if (two && index === 0 && menu != 0) {
        return "first-div";
      } else if (two && index != 0 && menu === index) {
        return "second-div-active";
      } else {
        return "second-div";
      }
    },
  },
})
export default class SortByMenu extends Vue {
  category!: string[];
  roundedStyle!: boolean;
  store = useStore();
  route = useRoute();
  sortedDays = sortedDays;
  filterData = filterData;
}
</script>

<style scoped>
.sort-menu-2,
.sort-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  padding: auto 25px;
  height: 41px;
  min-width: fit-content;
}

.sort-menu > nav {
  width: 100%;
  min-width: fit-content;
}

.button-div,
.button-div-active {
  background: var(--colorMenuBackground);
  color: var(--colorMenuForeground);
  border-color: rgba(0, 0, 0, 0);
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9em;
  width: 100%;
  height: 100%;
  padding: 7px 15px;
  font-family: "Poppins", sans-serif;
}

.button-div-active,
.button-div:hover {
  border-bottom: solid 3px var(--colorMenuForeground);
  color: var(--colorMenuForeground);
  background: var(--colorControlActivated);
}

.button-div:hover {
  background: var(--colorControlHighlight);
}

.round .sort-menu,
.round .sort-menu-2 {
  background: var(--colorMenuBackground);
  border: solid 3px var(--colorMenuBackground);
  border-radius: 30px;
  height: 30px;
  width: 100%;
}

.round .button-div,
.round .button-div-active,
.round .first-div,
.round .second-div,
.round .first-div-active,
.round .second-div-active {
  background: rgba(0, 0, 0, 0);
  border: 0;
  padding: 3px 15px;
  font-size: 1em;
}

.round .button-div:hover,
.round .button-div-active {
  color: var(--colorControlActivated);
}

.round .first-div:hover,
.round .first-div-active {
  color: var(--colorMenuForeground);
  background: var(--colorControlActivated);
  border-radius: 20px 0 0 20px;
}

.round .second-div:hover,
.round .second-div-active {
  color: var(--colorMenuForeground);
  background: var(--colorControlActivated);
  border-radius: 0 20px 20px 0;
}

.round .button-div:hover,
.round .first-div:hover,
.round .second-div:hover {
  color: var(--colorMenuForeground);
  background: var(--colorControlHighlight);
  border-bottom: 0;
}

@media (max-width: 670px) {
  .round .sort-menu-2 nav,
  .sort-menu-2 nav {
    width: 100%;
  }
}
</style>
