<template>
  <section class="eg-container">
    <div class="buttons">
      <router-link :to="{ name: 'main' }">
        <Button
          :link="link"
          :text="this.$store.state.language === 'fr' ? 'accueil' : 'home'"
          mainColor="var(--colorPrimary)"
          hoverColor="var(--colorPrimaryDark)"
        />
      </router-link>

      <router-link
        :to="{ name: 'schedule', params: { type: 'type', id: 'id' } }"
      >
        <Button
          :link="link"
          :text="
            this.$store.state.language === 'fr' ? 'Programmation' : 'Schedule'
          "
          mainColor="var(--colorPrimary)"
          hoverColor="var(--colorPrimaryDark)"
          :stateMenuNumber="stateMenuNumber"
          :stateMenuFilter="stateMenuFilter"
          :stateMenuMenu="stateMenuMenu"
        />
      </router-link>
    </div>
    <Language />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "./Button.vue";
import Language from "./Language.vue";

@Options({
  components: {
    Button,
    Language,
  },
  props: {
    link: String,
    stateMenuNumber: Number,
    stateMenuFilter: String,
    stateMenuMenu: Number,
  },
})
export default class EventGuestHeader extends Vue {
  link!: string;
  stateMenuNumber!: string;
  stateMenuFilter!: number;
  stateMenuMenu!: string;
}
</script>

<style scoped>
.eg-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  justify-content: flex-start;
}

.buttons > * {
  margin-right: 20px;
}

@media (max-width: 670px) {
  .eg-container {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .eg-container > :nth-child(2) {
    margin-top: 10px;
  }
}
</style>
