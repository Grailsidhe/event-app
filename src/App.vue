<template>
  <article class="main" :style="cssVars">
    <PreLoader v-show="preloader" />
    <router-view v-show="!preloader" />
  </article>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ComponentLibrary from "./ComponentLibrary.vue";
import * as data from "./data/data.json";
import Main from "./Main.vue";
import Guest from "./Guest.vue";
import Event from "./Event.vue";
import EventNoMedia from "./EventNoMedia.vue";
import GuestNoMedia from "./GuestNoMedia.vue";
// @ts-ignore
import PreLoader from "./components/PreLoader.vue";
import Schedule from "./Schedule.vue";

@Options({
  components: {
    ComponentLibrary,
    Main,
    Guest,
    GuestNoMedia,
    Event,
    EventNoMedia,
    Schedule,
    PreLoader,
  },
  data() {
    return {
      preloader: true,
    };
  },
  created() {
    setTimeout(() => (this.preloader = false), 2500);
  },
  methods: {
    removeTransparency(color: string) {
      const value = color.slice(3);
      return color.length > 7 ? `#${value}` : color;
    },
    hexToRgb(hex: any) {
      const result = hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (m: any, r: any, g: any, b: any) => "#" + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x: any) => parseInt(x, 16));
      return `rgba(${result.toString()},0.3)`;
    },
  },
  computed: {
    cssVars() {
      return {
        "--colorPrimary": this.removeTransparency(this.path.colorPrimary),
        "--colorPrimaryDark": this.removeTransparency(
          this.path.colorPrimaryDark
        ),
        "--colorPrimaryLight": this.removeTransparency(
          this.path.colorPrimaryLight
        ),
        "--colorAccent": this.removeTransparency(this.path.colorAccent),
        "--colorControlActivated": this.removeTransparency(
          this.path.colorControlActivated
        ),
        "--colorControlHighlight": this.removeTransparency(
          this.path.colorControlHighlight
        ),
        "--colorMenuBackground": this.removeTransparency(
          this.path.colorMenuBackground
        ),
        "--colorMenuForeground": this.removeTransparency(
          this.path.colorMenuForeground
        ),
        "--colorPrimaryLightest": this.hexToRgb(
          this.removeTransparency(this.path.colorPrimaryLight)
        ),
      };
    },
  },
})
export default class App extends Vue {
  path = data.data.applicationConfig;
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
* {
  text-decoration: none;
  font-family: "Poppins", sans-serif;
}

a {
  color: var(--colorPrimaryLight);
}

a:hover {
  color: var(--colorAccent);
}

input:focus,
textarea:focus,
select:focus,
button:focus {
  outline: none;
}

.main {
  margin: 30px;
  position: relative;
}
@media (max-width: 670px) {
  .main {
    margin: 0 5px;
  }
}
</style>
