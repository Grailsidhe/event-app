<template>
  <section class="day-menu">
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
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "../store";
import { MutationTypes } from "../store/mutation-types";

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
  methods: {
    activeButton(value: number, text: string) {
      const data = { number: value, filter: text, menu: 2 };
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
export default class DayMenuButtons extends Vue {
  store = useStore();
  text!: string[];
}
</script>

<style scoped>
.day-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 30px;
  min-width: fit-content;
  position: relative;
  width: fit-content;
  padding: 0 30px;
}

.day-menu > nav {
  display: flex;
  justify-content: center;
  width: 180px;
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
  width: 30px;
  margin: 0;
  position: absolute;
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
  padding: 10px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
}

.round .btn,
.round .btn-active {
  padding: 10px 25px;
  border-radius: 30px;
}

.btn:hover,
.btn-active,
.round .btn:hover,
.round .btn-active {
  color: var(--colorControlHighlight);
  border: 2px solid var(--colorControlHighlight);
  box-shadow: 4px 4px 0px 1px var(--colorControlHighlight);
  transition: all 300ms ease;
}

.btn:active,
.btn-active,
.round .btn:active,
.round .btn-active {
  color: var(--colorControlActivated);
  border: 2px solid var(--colorControlActivated);
  box-shadow: 2px 2px 0px 1px var(--colorControlActivated);
  transform: translate(2px, 2px);
  transition: all 0.2s;
}

@media (max-width: 670px) {
  .day-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-width: fit-content;
    margin-top: 0;
    width: 100%;
    font-size: 0.9em;
  }

  .day-menu > nav {
    width: 35%;
    margin: 10px;
  }

  .btn,
  .btn-active,
  .round .btn,
  .round .btn-active,
  .day-menu > nav > button {
    min-width: fit-content;
    width: 100%;
    padding: 10px 5px;
    margin: auto 0;
  }
}
</style>
