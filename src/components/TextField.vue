<template>
  <section
    class="text-field"
    :style="[$route.path.includes('no_media') ? { 'margin-top': '-20px' } : {}]"
  >
    <span v-html="text"></span>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useRoute } from "vue-router";

@Options({
  props: {
    text: String,
  },
})
export default class TextField extends Vue {
  text!: string;
  route = useRoute();
}
</script>

<style scoped>
.text-field > img {
  width: 100%;
}
</style>