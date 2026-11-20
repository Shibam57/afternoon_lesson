
<script setup>
import LessonCard from "./LessonCard.vue";

defineProps({
  lessons: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div v-if="lessons.length" class="lesson-grid">
    <LessonCard
      v-for="lesson in lessons"
      :key="lesson._id"
      :lesson="lesson"
    />
  </div>

  <p v-else>No lessons available.</p>
</template>
