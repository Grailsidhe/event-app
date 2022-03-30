<template>
  <section class="tag-container">
    <div :key="tag" v-for="tag in text">
      <button class="tag-chip" :id="tag">
        {{ tag }}
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    text: Array,
  },
})
export default class TagContainer extends Vue {
  text!: string[];
}
</script>

<style scoped>
.tag-container {
  display: flex;
  justify-content: space-between;
  width: fit-content;
}

.tag-chip {
  background: var(--colorAccent);
  color: white;
  border: 0;
  padding: 3px 9px;
  margin: 5px;
  font-size: 0.9em;
  font-weight: 400;
  border-radius: 5px;
}

.round .tag-chip {
  border-radius: 20px;
}
</style>
