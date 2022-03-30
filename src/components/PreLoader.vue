<template>
  <div class="preloader">
    <div class="dot-flashing"></div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class PreLoader extends Vue {}
</script>

<style scoped>
.preloader {
  position: relative;
  left: 50%;
  right: 50%;
  margin: auto;
}

.dot-flashing {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--colorPrimaryDark);
  color: var(--colorPrimaryDark);
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--colorPrimaryDark);
  color: var(--colorPrimaryDark);
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--colorPrimaryDark);
  color: var(--colorPrimaryDark);
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: var(--colorPrimaryDark);
  }
  50%,
  100% {
    background-color: var(--colorPrimaryLight);
  }
}
</style>
