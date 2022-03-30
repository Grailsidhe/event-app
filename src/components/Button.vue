<template>
  <a :href="link" target="_new">
    <button
      :class="styleButton()"
      :style="btnOptions"
      @click="this.resetMenu(this.text)"
    >
      {{ text }}
    </button>
  </a>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "../store/mutation-types";
import { useStore } from "../store";

@Options({
  props: {
    mainColor: String,
    hoverColor: String,
    text: String,
    padd: String,
    link: String,
    stateMenuNumber: Number,
    stateMenuFilter: String,
    stateMenuMenu: Number,
  },
  computed: {
    btnOptions() {
      const val = this.padd ? this.padd : "6px 25px";
      return {
        "--color": this.mainColor,
        "--hovercolor": this.hoverColor,
        "--padd": val,
      };
    },
  },
  methods: {
    resetMenu() {
      const number = this.stateMenuNumber ? this.stateMenuNumber : 0;
      const filter = this.stateMenuFilter ? this.stateMenuFilter : "";
      const menu = this.stateMenuMenu ? this.stateMenuMenu : 0;
      if (this.text != "billetterie") {
        this.store.commit(MutationTypes.SET_DAY_MENU, {
          number: number,
          filter: filter,
          menu: menu,
        }),
          // clears select
          this.store.commit(MutationTypes.SET_SELECT_FILTERS, {
            programId: "",
            guestType: "",
            tag: "",
          });
      }
    },
    styleButton() {
      // changes style if rounded theme is on, is on mobile, is a billetterie button on mobile
      if (this.$route.path.includes("schedule")) {
        return this.text === "Billetterie" ? "btn tickets home" : "btn home";
      } else {
        return this.text === "Billetterie" ? "btn tickets" : "btn";
      }
    },
  },
})
export default class Button extends Vue {
  text!: string;
  mainColor!: string;
  hoverColor!: string;
  padd!: string;
  link!: string;
  store = useStore();
  stateMenuNumber!: number;
  stateMenuFilter!: string;
  stateMenuMenu!: number;
}
</script>

<style scoped>
.btn {
  color: var(--color);
  border: 2px solid var(--color);
  box-shadow: 4px 4px 0px 1px var(--color);
  font-weight: 800;
  padding: var(--padd);
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
  min-width: fit-content;
}

.round .btn {
  border-radius: 30px;
}

.btn:hover,
.round .btn:hover {
  color: var(--hovercolor);
  border: 2px solid var(--hovercolor);
  box-shadow: 4px 4px 0px 1px var(--hovercolor);
  transition: all 500ms ease;
}

.btn:active,
.round .btn:active {
  color: var(--hovercolor);
  border: 2px solid var(--hovercolor);
  box-shadow: 2px 2px 0px 1px var(--hovercolor);
  transform: translate(2px, 2px);
  transition: all 0.1s;
}

@media (max-width: 670px) {
  .tickets {
    padding: 10px 70px;
  }

  .home {
    padding: 10px 100px;
  }
}
</style>
