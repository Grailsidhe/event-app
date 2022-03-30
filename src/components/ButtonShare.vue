<template>
  <button class="btn-share">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    text: String,
  },
})
export default class ButtonShare extends Vue {
  text!: string;
}
</script>

<style scoped>
.btn-share {
  color: var(--colorAccent);
  border: 2px solid var(--colorAccent);
  box-shadow: 4px 4px 0px 1px var(--colorAccent);
  font-weight: 600;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  padding: 5px 15px;
  font-size: 0.8em;
  font-family: "Poppins", sans-serif;
  margin-bottom: 5px;
}

.round .btn-share {
  border-radius: 30px;
}

.btn-share:hover,
.round .btn-share:hover,
.btn-share:active,
.round .btn-share:active {
  color: var(--colorPrimary);
  border: 2px solid var(--colorPrimary);
  box-shadow: 4px 4px 0px 1px var(--colorPrimary);
  transition: all 500ms ease;
}

.btn-share:active,
.round .btn-share:active {
  box-shadow: 2px 2px 0px 1px var(--colorPrimary);
  transform: translate(2px, 2px);
  transition: all 0.2s;
}
</style>
