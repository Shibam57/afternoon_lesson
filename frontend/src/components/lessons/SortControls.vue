
<script setup>
defineProps({
  sortBy: {
    type: String,
    default: "topic"
  },
  sortOrder: {
    type: String,
    default: "asc"
  }
});

const emit = defineEmits([
  "sort-change",
  "order-change"
]);
</script>

<template>
  <div class="sort-controls">
    <div class="sort-field">
      <label for="sortBy">Sort By:</label>

      <select
        id="sortBy"
        :value="sortBy"
        @change="emit('sort-change', $event.target.value)"
      >
        <option value="topic">Subject</option>
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="space">Available Spaces</option>
      </select>
    </div>

    <div class="sort-field">
      <label for="sortOrder">Order:</label>

      <select
        id="sortOrder"
        :value="sortOrder"
        @change="emit('order-change', $event.target.value)"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>
</template>
