<template>
  <section class="social-media" :style="styleLeft1()">
    <div
      :class="[facebook ? 'social-media-button-wrapper' : 'no-display']"
      :style="styleLeft2()"
    >
      <a :href="facebook" target="_new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="button"
          :style="styleLeft3('#4267B2')"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
          />
        </svg>
      </a>
    </div>
    <div
      :class="[twitter ? 'social-media-button-wrapper' : 'no-display']"
      :style="styleLeft2()"
    >
      <a :href="twitter" target="_new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="button"
          :style="styleLeft3('#1DA1F2')"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
          />
        </svg>
      </a>
    </div>
    <div
      :class="[instagram ? 'social-media-button-wrapper' : 'no-display']"
      :style="styleLeft2()"
    >
      <a :href="instagram" target="_new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="button"
          :style="styleLeft3('#000000')"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
          />
        </svg>
      </a>
    </div>
    <div
      :class="[spotify ? 'social-media-button-wrapper' : 'no-display']"
      :style="styleLeft2()"
    >
      <a :href="spotify" target="_new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="button"
          :style="styleLeft3('#1DB954')"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"
          />
        </svg>
      </a>
    </div>
    <div
      :class="[soundcloud ? 'social-media-button-wrapper' : 'no-display']"
      :style="styleLeft2()"
    >
      <a :href="soundcloud" target="_new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="button"
          :style="styleLeft3('#ff7700')"
          viewBox="0 208.952 1048.713 581.696"
        >
          <path
            d="M0 686.216c0 13.014 4.718 22.854 14.152 29.524 9.435 6.669 19.52 9.027 30.256 7.076 10.085-1.952 17.161-5.531 21.229-10.736 4.066-5.205 6.1-13.827 6.1-25.864v-141.52c0-10.086-3.497-18.626-10.492-25.62-6.994-6.995-15.534-10.492-25.62-10.492-9.76 0-18.137 3.497-25.132 10.492C3.498 526.07 0 534.61 0 544.696v141.52zm112.24 60.512c0 9.436 3.335 16.511 10.004 21.229 6.67 4.718 15.21 7.076 25.62 7.076 10.736 0 19.438-2.359 26.108-7.076 6.669-4.717 10.004-11.793 10.004-21.229V416.84c0-9.76-3.498-18.138-10.492-25.132-6.995-6.994-15.535-10.492-25.62-10.492-9.76 0-18.138 3.498-25.132 10.492-6.995 6.995-10.492 15.372-10.492 25.132v329.888zm111.752 15.616c0 9.435 3.416 16.511 10.248 21.229 6.832 4.717 15.616 7.076 26.353 7.076 10.41 0 18.95-2.359 25.619-7.076 6.67-4.718 10.005-11.794 10.005-21.229V461.248c0-10.085-3.498-18.707-10.492-25.864-6.995-7.157-15.372-10.735-25.132-10.735-10.086 0-18.707 3.578-25.864 10.735s-10.736 15.779-10.736 25.864v301.096zm112.24 1.464c0 17.894 12.037 26.841 36.112 26.841 24.074 0 36.111-8.947 36.111-26.841v-488c0-27.328-8.296-42.781-24.888-46.36-10.736-2.603-21.31.488-31.72 9.272-10.411 8.784-15.616 21.146-15.616 37.088v488zm114.193 14.152V247.016c0-16.917 5.042-27.002 15.128-30.256 21.797-5.205 43.432-7.808 64.904-7.808 49.775 0 96.136 11.712 139.079 35.136 42.944 23.424 77.674 55.388 104.188 95.892 26.515 40.505 41.887 85.156 46.116 133.957 19.845-8.459 40.991-12.688 63.439-12.688 45.547 0 84.506 16.104 116.876 48.312 32.371 32.209 48.557 70.923 48.557 116.145 0 45.547-16.186 84.424-48.557 116.632-32.37 32.208-71.166 48.312-116.388 48.312l-424.56-.488c-2.929-.976-5.125-2.766-6.589-5.368s-2.193-4.882-2.193-6.834z"
          />
        </svg>
      </a>
    </div>
    <div
      :class="[deezer ? 'social-media-button-wrapper' : 'no-display']"
      :style="styleLeft2()"
    >
      <a :href="deezer" target="_new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="button"
          :style="styleLeft3('#ff0000')"
          viewBox="0 0 46.9 24.5"
        >
          <path
            d="M38.3 13.9v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.3v-1h8.6v2.1h-8.6V4.2zm0-3.1V0h8.6v2.2h-8.6V1.1z"
          />
          <path
            d="M19.1 13.9v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.3v-1h8.6v2.1h-8.6V4.2z"
          />
          <path
            id="path55"
            class="st2"
            d="M28.7 13.9v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1z"
          />
          <path
            d="M9.6 23.5v-1H18v2H9.6v-1zm0-3.3v-1H18v2H9.6v-1zm0-3.2v-1H18v2H9.6v-1z"
          />
          <path d="M0 13.9v-1h8.4v2H0v-1zm0-3.2v-1h8.4v2H0v-1z" />
          <path
            d="M38.4 23.5v-1h8.4v2h-8.4v-1zm0-3.3v-1h8.4v2h-8.4v-1zm0-3.2v-1h8.4v2h-8.4v-1z"
          />
          <path
            d="M28.8 23.5v-1h8.4v2h-8.4v-1zm0-3.3v-1h8.4v2h-8.4v-1zm0-3.2v-1h8.4v2h-8.4v-1z"
          />
          <path
            d="M19.2 23.5v-1h8.4v2h-8.4v-1zm0-3.3v-1h8.4v2h-8.4v-1zm0-3.2v-1h8.4v2h-8.4v-1z"
          />
          <path
            d="M0 23.5v-1h8.4v2H0v-1zm0-3.3v-1h8.4v2H0v-1zM0 17v-1h8.4v2H0v-1z"
          />
        </svg>
      </a>
    </div>
    <div
      :class="[youtube ? 'social-media-button-wrapper' : 'no-display']"
      :style="styleLeft2()"
    >
      <a :href="youtube" target="_new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="button"
          :style="styleLeft3('#c4302b')"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
          />
        </svg>
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useRoute } from "vue-router";

@Options({
  props: {
    facebook: String,
    twitter: String,
    instagram: String,
    deezer: String,
    youtube: String,
    soundcloud: String,
    spotify: String,
  },
  methods: {
    styleLeft1() {
      if (this.$route.path.includes("no_media")) {
        return { "justify-content": "flex-start" };
      }
      if (
        this.facebook ||
        this.deezer ||
        this.twitter ||
        this.youtube ||
        this.spotify ||
        this.instagram ||
        this.soundcloud
      ) {
        return { display: "flex" };
      } else {
        return { display: "none" };
      }
    },
    styleLeft2() {
      return { "margin-left": "-10px" };
    },
    styleLeft3(color: string) {
      return { fill: color };
    },
  },
})
export default class SocialMediaButtons extends Vue {
  facebook!: string;
  twitter!: string;
  instagram!: string;
  deezer!: string;
  youtube!: string;
  soundcloud!: string;
  spotify!: string;
  route = useRoute();
}
</script>

<style scoped>
.social-media {
  margin: 0 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
}

.button {
  height: 30px;
  width: 30px;
  margin: 0 10px;
  background: rgba(0, 0, 0, 0);
}

.button:active {
  transform: translate(2px, 2px);
  transition: all 0.2s;
}

.button:hover {
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.411));
}

.no-display {
  display: none;
}
</style>
