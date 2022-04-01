<template>
  <section class="day-menu-wrapper">
    <div class="day-menu">
      <svg
        v-show="this.leftArrow"
        @click="handleClick('left')"
        xmlns="http://www.w3.org/2000/svg"
        class="chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
        />
      </svg>
      <nav :key="index" v-for="(text, index) in this.dayDisplay">
        <button
          :class="chooseDisplay(index)"
          :id="index"
          @click="this.activeButton(index, text)"
        >
          {{ text }}
        </button>
      </nav>
      <svg
        v-show="this.rightArrow"
        @click="handleClick('right')"
        xmlns="http://www.w3.org/2000/svg"
        class="chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
        />
      </svg>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "../store";
import { MutationTypes } from "../store/mutation-types";
import { filterData } from "../data/functions";

@Options({
  props: {
    text: Array,
  },
  data() {
    return {
      firstIndex: 0,
      currentDaySection: 0,
      // @ts-ignore
      dayDisplay: this.text.slice(0, 4),
    };
  },
  computed: {
    leftArrow: function () {
      return this.firstIndex > 0;
    },
    rightArrow: function () {
      return this.text.length > this.firstIndex + 4 ? true : false;
    },
  },
  mounted() {
    this.activeButton(0, this.text[0]);
  },
  methods: {
    // .menu: 0 for PAR LIEU, 1 for PAR HEURE
    activeButton(value: number, text: string) {
      const currentMenuValue = this.$store.state.activeDayMenu.menu;
      const data = { number: value, filter: text, menu: currentMenuValue };
      // pushes to the store the active menu and button text
      return this.$store.commit(MutationTypes.SET_DAY_MENU, data);
    },
    // determines the css
    chooseDisplay(index: number) {
      return this.$store.state.activeDayMenu.number === index
        ? "btn-active"
        : "btn";
    },
    // switch days when needed
    handleClick(arrow: string) {
      if (arrow === "right") {
        return this.firstIndex + 5 <= this.text.length
          ? ((this.firstIndex = this.firstIndex + 4),
            (this.rightArrow = true),
            (this.dayDisplay = this.text.slice(
              this.firstIndex,
              this.firstIndex + 4
            )))
          : (this.rightArrow = false);
      }
      if (arrow === "left") {
        return (
          (this.firstIndex = this.firstIndex - 4),
          (this.dayDisplay = this.text.slice(
            this.firstIndex,
            this.firstIndex + 4
          ))
        );
      }
    },
  },
})
export default class ScheduleDayMenuButtons extends Vue {
  store = useStore();
  filterData = filterData;
  text!: string[];
}
</script>

<style scoped>
.day-menu-wrapper {
  position: relative;
}

.day-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
  min-width: fit-content;
  width: 95%;
}

.day-menu > nav {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 5px;
}

.day-menu > nav > button {
  margin: auto 7px;
  min-width: fit-content;
  width: 100%;
}

.chevron-left,
.chevron-right {
  fill: var(--colorPrimaryDark);
  cursor: pointer;
  position: absolute;
  width: 40px;
  margin: 0;
}

.chevron-left {
  left: 0;
}

.chevron-right {
  right: 0;
}

.btn,
.btn-active {
  color: var(--colorPrimary);
  border: 2px solid var(--colorPrimary);
  box-shadow: 4px 4px 0px 1px var(--colorPrimary);
  font-weight: 800;
  padding: 15px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  font-size: clamp(0.6em, 1.8vw, 1em);
  font-family: "Poppins", sans-serif;
}

.btn:hover,
.btn-active {
  color: var(--colorControlHighlight);
  border: 2px solid var(--colorControlHighlight);
  box-shadow: 4px 4px 0px 1px var(--colorControlHighlight);
  transition: all 300ms ease;
}

.btn:active,
.btn-active {
  color: var(--colorControlActivated);
  border: 2px solid var(--colorControlActivated);
  box-shadow: 2px 2px 0px 1px var(--colorControlActivated);
  transform: translate(2px, 2px);
  transition: all 0.2s;
}

.round .btn,
.round .btn-active {
  font-size: 1.2em;
  color: var(--colorMenuForeground);
  border: 0;
  background: var(--colorPrimary);
  border-radius: 15px;
}

.round .btn:hover,
.round .btn-active {
  color: var(--colorMenuForeground);
  background: var(--colorControlHighlight);
  border: 0;
  box-shadow: 0 0 0 0;
}

.round .btn:active,
.round .btn-active {
  color: var(--colorMenuForeground);
  background: var(--colorControlActivated);
  border: 0;
  box-shadow: 0 0 0 0;
}

@media (max-width: 670px) {
  .day-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-width: fit-content;
    margin: -10px auto 10px;
    width: 100%;
  }

  .day-menu > nav {
    width: 40%;
    margin: 0;
  }

  .btn,
  .btn-active,
  .round .btn,
  .round .btn-active,
  .day-menu > nav > button {
    font-size: 0.8em;
    padding: 10px 7px;
    width: 100%;
    margin: 10px 5px;
  }

  .btn-active,
  .btn:active,
  .round .btn-active,
  .round .btn-:active {
    transform: translate(1px, 1px);
  }
}
</style>
