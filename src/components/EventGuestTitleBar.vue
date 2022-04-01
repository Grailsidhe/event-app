<template>
  <article class="title-container">
    <h1 class="title">{{ eventTitle }}</h1>

    <section class="title-info">
      <div>
        <ButtonShare
          :text="this.$store.state.language === 'fr' ? 'partager' : 'share'"
          @click="togglePopup()"
        />
        <TagContainer :text="tagText" />
      </div>

      <div
        class="country"
        :style="[country ? { display: 'flex' } : { display: 'none' }]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="origin"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
        {{ country }}
      </div>
    </section>
    <div ref="sharepopup" @focusout="closePopup()" tabindex="0">
      <SharePopup
        v-show="this.popup"
        class="popup"
        :style="this.origin === 'anEvent' ? { top: '100px' } : { top: '40px' }"
      />
    </div>
  </article>
  <hr />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TagContainer from "./TagContainer.vue";
import ButtonShare from "./ButtonShare.vue";
import SharePopup from "./SharePopup.vue";

@Options({
  components: {
    TagContainer,
    ButtonShare,
    SharePopup,
  },
  props: {
    tagText: Array,
    eventTitle: String,
    country: String,
    origin: String,
  },
  data() {
    return {
      popup: false,
    };
  },
  methods: {
    togglePopup() {
      return !this.popup
        ? ((this.popup = true), this.$refs.sharepopup.focus())
        : (this.popup = false);
    },
    closePopup() {
      return (this.popup = false);
    },
  },
})
export default class EventGuestTitleBar extends Vue {
  eventTitle!: string;
  country!: string;
  origin!: string;
  tagText!: string[];
}
</script>

<style scoped>
.title-container {
  position: relative;
}

h1 {
  font-size: 1.7em;
  font-weight: 600;
}

.title {
  margin: 20px 0;
  color: var(--colorPrimary);
}

.title-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-weight: 200;
  font-size: 0.9em;
}

.title-info :first-child {
  display: flex;
  align-items: center;
}

.title-info :first-child > * {
  margin-right: 40px;
  width: fit-content;
}

.country {
  display: flex;
  align-items: center;
}

.origin {
  padding: 5px;
  height: 15px;
  width: 15px;
  background-color: var(--colorAccent);
  border-radius: 100%;
  margin: 0 7px;
  fill: white;
}

.popup {
  position: absolute;
}

@media (max-width: 670px) {
  .title-info {
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
  }

  .title-info > :first-child {
    flex-direction: column;
    align-items: flex-start;
  }

  .title-info > :first-child > :last-child {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px 0;
  }

  .country {
    margin-bottom: 10px;
  }
}
</style>
