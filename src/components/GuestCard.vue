<template>
  <div class="artist-card-container">
    <article class="artist-card">
      <div>{{ label }}</div>
    </article>
    <div
      class="artist-card-hover-menu"
      :style="[!date || !hour ? { display: 'none' } : { display: 'flex' }]"
    >
      <p>{{ date }}</p>
      <p>{{ hour }}</p>
      <p>{{ place }}</p>
    </div>
    <img :src="image" :alt="name" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: String,
    date: String,
    hour: String,
    place: String,
    image: String,
    title: String,
  },
})
export default class GuestCard extends Vue {
  name!: string;
  title!: string;
  label: string = !this.name ? this.title : this.name;
  date!: string;
  hour!: string;
  place!: string;
  image!: string;
}
</script>

<style scoped>
.artist-card-container {
  background-color: black;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.artist-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.round .artist-card {
  opacity: 1;
  filter: grayscale(100%) contrast(1);
}

.artist-card div,
.round .artist-card div {
  padding: 10px 15px;
  margin: auto;
  border: 2px solid white;
  font-weight: bold;
  font-size: clamp(24px, 3vw, 24px);
  text-transform: uppercase;
  color: white;
  filter: drop-shadow(0 0 3px #000000);
  background: rgba(0, 0, 0, 0.103);
  text-align: center;
}

.artist-card-hover-menu > p:nth-child(1),
.round .artist-card-hover-menu > p:nth-child(1) {
  font-size: clamp(24px, 2.8vw, 23px);
  font-weight: 800;
  text-transform: uppercase;
  margin: 7% 10% 0px;
}

.artist-card-hover-menu > p:nth-child(2),
.round .artist-card-hover-menu > p:nth-child(2) {
  font-size: clamp(16px, 2.2vw, 15px);
  font-weight: 200;
  margin: 5px 10%;
}

.artist-card-hover-menu > p:nth-child(3),
.round .artist-card-hover-menu > p:nth-child(3) {
  font-size: clamp(19px, 2.5vw, 18px);
  font-weight: 400;
  margin: 0 10%;
}

.artist-card-hover-menu > p,
.round .artist-card-hover-menu > p {
  margin: auto 3px;
  font-size: 1em;
}

.artist-card-container img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  opacity: 0.7;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.round .artist-card-container img {
  filter: grayscale(100%) contrast(1);
}

.artist-card-hover-menu {
  display: flex;
  flex-direction: column;
  color: var(--colorMenuForeground);
  background-color: var(--colorMenuBackground);
  position: absolute;
  padding: 10px;
  width: 100%;
  height: 40%;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  transform: translate(0px, 70px);
  -webkit-transform: translate(0px, 70px);
  -moz-transform: translate(0px, 70px);
  -o-transform: translate(0px, 70px);
  -ms-transform: translate(0px, 70px);
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

/*hovers*/

.artist-card-container:hover,
.round .artist-card-container:hover {
  cursor: pointer;
}

.artist-card-container:hover img,
.round .artist-card-container:hover img {
  opacity: 1;
  filter: grayscale(0%);
  transform: scale(1.2);
}

.artist-card-container:hover .artist-card,
.round .artist-card-container:hover .artist-card {
  opacity: 0;
  transform: translate(-50%, -100%);
  -webkit-transform: translate(-50%, -100%);
  -moz-transform: translate(-50%, -100%);
  -o-transform: translate(-50%, -100%);
  -ms-transform: translate(-50%, -100%);
}

.artist-card-container:hover .artist-card-hover-menu,
.round .artist-card-container:hover .artist-card-hover-menu {
  transform: translate(0px, 0px);
  -webkit-transform: translate(0px, 0px);
  -moz-transform: translate(0px, 0px);
  -o-transform: translate(0px, 0px);
  -ms-transform: translate(0px, 0px);
  opacity: 1;
}

@media (min-width: 700px) {
  .artist-card div,
  .round .artist-card div {
    font-size: clamp(18px, 2vw, 18px);
  }
  .artist-card-hover-menu > p:nth-child(1),
  .round .artist-card-hover-menu > p:nth-child(1) {
    font-size: clamp(18px, 1vw, 18px);
  }
  .artist-card-hover-menu > p:nth-child(2),
  .round .artist-card-hover-menu > p:nth-child(2) {
    font-size: clamp(13px, 1.2vw, 13px);
  }
  .artist-card-hover-menu > p:nth-child(3),
  .round .artist-card-hover-menu > p:nth-child(3) {
    font-size: clamp(15px, 1.5vw, 15px);
  }
}
</style>
