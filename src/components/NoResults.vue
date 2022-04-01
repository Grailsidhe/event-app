<template>
  <section class="try-again-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"
      />
    </svg>

    <h1 v-show="this.$store.state.language === 'en'">
      No results available for this search.
      <br />
      Please reset your criteria.
    </h1>

    <h1 v-show="this.$store.state.language === 'fr'">
      Aucun résultat pour cette recherche.
      <br />
      Veuillez réinitialiser le filtrage.
    </h1>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class NoResults extends Vue {}
</script>

<style scoped>
.try-again-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7vh;
}

.try-again-container > h1 {
  font-size: clamp(15px 1.5em 20px);
  margin-top: 10px;
  font-weight: 400;
  text-align: center;
}

.try-again-container > svg {
  height: 30px;
  width: 30px;
  fill: var(--colorAccent);
}
</style>
