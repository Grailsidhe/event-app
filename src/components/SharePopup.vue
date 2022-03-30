<template>
  <div class="wrapper">
    <div class="triangle">&nbsp;</div>
    <div class="body">
      <div>
        <svg
          @click="
            openPopup(
              `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
            )
          "
          xmlns="http://www.w3.org/2000/svg"
          class="facebook"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
          />
        </svg>
        <svg
          @click="
            openPopup(`https://twitter.com/intent/tweet?text=${this.url}`)
          "
          xmlns="http://www.w3.org/2000/svg"
          class="twitter"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  methods: {
    openPopup(url: string) {
      window.open(url, "Partager", "left=100,top=100,width=700,height=400");
    },
  },
})
export default class SharePopup extends Vue {
  url = window.location.href;
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.body {
  background-color: var(--colorMenuBackground);
  padding: 5px;
}

.round .body {
  border-radius: 20px;
}

.body > div {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  background: white;
}

.round .body > div {
  border-radius: 20px;
}

.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  width: 10px;
  height: 6px;
  margin-right: 10px;
  background-color: var(--colorMenuBackground);
}

.facebook,
.twitter {
  padding: 8px;
  height: 30px;
  width: 30px;
  fill: #4267b2;
  cursor: pointer;
}

.twitter {
  fill: #1da1f2;
}

.facebook:active,
.twitter:active {
  transform: translate(2px, 2px);
  transition: all 0.2s;
}

.facebook:hover,
.twitter:hover {
  fill: var(--colorAccent);
  transition: all 500ms ease;
}
</style>
