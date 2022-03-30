import { createApp } from "vue";
import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import { store } from "./store";
import router from "@/router";

const clickOutside = {
  beforeMount: (el: any, binding: any) => {
    el.clickOutsideEvent = (event: any) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: any) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

const app = createApp(App).directive("click-outside", clickOutside);

app.config.globalProperties.$store = store;
app.use(router).mount("#app");
