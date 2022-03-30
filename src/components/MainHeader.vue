<template>
  <section class="cover-header">
    <div
      :class="[!this.showSelect ? 'center-button' : 'cover-div']"
      class="left-section"
    >
      <Select
        title="Type d'invité"
        :selectItems="guestTypes"
        v-show="showSelect"
      />
      <router-link
        :to="{ name: route.name, params: { type: route.type, id: route.id } }"
      >
        <Button
          :roundedStyle="this.roundedStyle"
          :link="link"
          :text="text"
          mainColor="var(--colorPrimary)"
          hoverColor="var(--colorPrimaryDark)"
          :stateMenuNumber="stateMenuNumber"
          :stateMenuFilter="stateMenuFilter"
          :stateMenuMenu="stateMenuMenu"
        />
      </router-link>
    </div>
    <div class="right-section">
      <Language />
      <Select title="Programme" :selectItems="programs" />
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "./Button.vue";
import Select from "./Select.vue";
import Language from "./Language.vue";

@Options({
  components: {
    Button,
    Select,
    Language,
  },
  props: {
    guestTypes: Array,
    programs: Array,
    text: String,
    link: String,
    route: Object,
    showSelect: Boolean,
    stateMenuNumber: Number,
    stateMenuFilter: String,
    stateMenuMenu: Number,
  },
})
export default class MainHeader extends Vue {
  guestTypes!: string[];
  programs!: string[];
  text!: string;
  link!: string;
  route!: object;
  showSelect!: boolean;
  stateMenuNumber!: string;
  stateMenuFilter!: number;
  stateMenuMenu!: string;
}
</script>

<style scoped>
.cover-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.cover-header > div {
  display: flex;
  align-items: center;
}

.left-section > * {
  margin-right: 45px;
}

.right-section > * {
  margin-left: 20px;
}

@media (max-width: 670px) {
  .cover-header {
    flex-direction: column;
  }

  .cover-div,
  .center-button {
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;
  }

  .cover-header > div :first-child {
    width: fit-content;
  }

  .left-section > * {
    margin-right: 0;
  }

  .right-section {
    width: 100%;
  }

  .right-section :first-child {
    margin-left: 0;
  }

  .right-section > :nth-child(2) {
    width: 100%;
  }

  .center-button {
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    width: 100%;
  }
}
</style>
