import { Store } from "@/store";
import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  interface State {
    roundedStyle: boolean;
  }
  interface ComponentCustomProperties {
    $store: Store;
  }
}
