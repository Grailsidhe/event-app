<template>
  <section class="search-bar">
    <input
      type="text"
      :placeholder="
        this.$store.state.language === 'fr' ? 'recherche...' : 'search...'
      "
      @input="handleSearch($event.target.value)"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="search-icon"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
      />
    </svg>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { filterData } from "../data/functions";
import { MutationTypes } from "../store/mutation-types";
import { useStore } from "../store";

@Options({
  props: {
    route: String,
  },
  methods: {
    //pushes to the state the guests/events that match the search
    handleSearch(value: string) {
      return this.store.commit(MutationTypes.SET_SEARCH, value);
    },
  },
})
export default class SearchBar extends Vue {
  route!: string;
  filterData = filterData;
  store = useStore();
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  width: 200px;
  color: var(--colorAccent);
  border: 2px solid var(--colorAccent);
  box-shadow: 4px 4px 0px 1px var(--colorAccent);
  justify-content: space-between;
  height: 35px;
}

.round .search-bar {
  box-shadow: 0 0 0 0;
  border-radius: 30px;
}

input {
  width: 140px;
  background: rgba(255, 255, 255, 0);
  border: 0;
  padding-left: 20px;
  padding-right: 20px;
  text-transform: uppercase;
  font-size: 1em;
}

.search-bar:hover,
.round .search-bar:hover,
input:hover {
  transition: width 0.55s ease;
  width: 230px;
}

input:hover {
  width: 190px;
}

.search-icon {
  width: 15px;
  height: 15px;
  fill: var(--colorPrimary);
  position: absolute;
  position: relative;
  right: 15px;
}

.search-icon:hover {
  fill: var(--colorPrimaryDark);
}

@media (max-width: 670px) {
  .search-bar,
  .round .search-bar {
    width: 100%;
  }

  .search-bar:hover,
  .round .search-bar:hover,
  input:hover {
    width: 100%;
  }
}
</style>
