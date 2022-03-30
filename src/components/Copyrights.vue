<template>
  <section
    class="copyright"
    :style="[text ? { display: 'flex' } : { display: 'none' }]"
  >
    <hr v-show="this.description" />
    <h6>{{ label }}</h6>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    text: String,
    description: String,
  },
})
export default class Copyrights extends Vue {
  text!: string;
  description!: string;
  label = `© ${new Date().getFullYear()} ${this.text}`;
}
</script>

<style scoped>
.copyright {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.copyright > hr {
  width: 100%;
}

h6 {
  font-weight: normal;
  margin: 10px 0;
}
</style>
