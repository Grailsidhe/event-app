<template>
  <section class="language-container">
    <div @click="setLanguage('fr')" v-show="this.store.state.language === 'en'">
      🇫🇷
    </div>
    <div @click="setLanguage('en')" v-show="this.store.state.language === 'fr'">
      🇬🇧
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "../store/mutation-types";
import { useStore } from "../store";

@Options({
  props: {},
  methods: {
    setLanguage(language: string) {
      this.store.commit(MutationTypes.SET_LANGUAGE, language);
    },
  },
})
export default class Language extends Vue {
  store = useStore();
}
</script>

<style scoped>
.language-container {
  display: flex;
}

.language-container > * {
  font-size: 1.6em;
  cursor: pointer;
  margin: auto;
}
</style>
