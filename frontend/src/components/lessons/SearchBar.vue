
<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);

const query = ref("");

const submitSearch = () => {
  emit("search", query.value.trim());
};

const clearSearch = () => {
  query.value = "";
  emit("search", "");
};
</script>

<template>
  <form class="search-bar" @submit.prevent="submitSearch">
    <input
      v-model="query"
      type="search"
      class="search-input"
      placeholder="Search lessons..."
      aria-label="Search lessons"
    />

    <button type="submit" class="search-btn">
      Search
    </button>

    <button
      type="button"
      class="clear-btn"
      @click="clearSearch"
    >
      Clear
    </button>
  </form>
</template>
