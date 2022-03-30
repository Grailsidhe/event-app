<template>
  <section class="schedule-menu">
    <div>
      <SortByMenu :category="category" />
      <TagSelect title="Tag" :selectItems="selectItems" />
    </div>
    <SearchBar :route="this.route" />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SortByMenu from "./SortByMenu.vue";
import SearchBar from "./SearchBar.vue";
import TagSelect from "./TagSelect.vue";

@Options({
  components: {
    SortByMenu,
    SearchBar,
    TagSelect,
  },
  props: {
    navText: Array,
    category: Array,
    selectItems: Array,
    route: String,
  },
})
export default class MainHeaderSortMenu extends Vue {
  category!: string[];
  selectItems!: string[];
  route!: string;
}
</script>

<style scoped>
.schedule-menu {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 25px 0;
  height: 45px;
}

.schedule-menu > div {
  display: flex;
  align-items: center;
  width: fit-content;
}

.schedule-menu > div > * {
  margin-right: 30px;
  width: fit-content;
}

@media (max-width: 670px) {
  .schedule-menu {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    margin: 20px 0;
    height: 200px;
  }

  .schedule-menu > :last-child {
    margin: auto;
  }

  .schedule-menu > div {
    flex-direction: column;
    align-items: space-between;
    margin: 20px auto 0;
    width: 100%;
  }

  .schedule-menu > div > * {
    margin: auto;
    width: 100%;
  }

  .schedule-menu > div > :last-child {
    margin: 20px auto;
  }
}
</style>
