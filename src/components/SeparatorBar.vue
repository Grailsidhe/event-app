<template>
  <section class="separator-bar">
    {{ text }}
    <hr />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    text: String,
  },
})
export default class SeparatorBar extends Vue {
  text!: string | number | Date;
}
</script>

<style scoped>
.separator-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0 5px;
  color: var(--colorAccent);
  font-weight: 600;
  font-size: 0.9em;
  text-transform: uppercase;
}

.separator-bar > hr {
  margin-top: 1px;
  width: 100%;
  background-color: var(--colorAccent);
  height: 1px;
  opacity: 0.5;
}
</style>
