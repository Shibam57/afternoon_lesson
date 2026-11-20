
<script setup>
import { computed } from "vue";

const props = defineProps({
  lessons: {
    type: Array,
    default: () => []
  },
  teachers: {
    type: Array,
    default: () => []
  }
});

const stats = computed(() => {
  const availableSpaces = props.lessons.reduce(
    (total, lesson) => total + Math.max(0, Number(lesson.space) || 0),
    0
  );

  const fullLessons = props.lessons.filter(
    (lesson) => Number(lesson.space) === 0
  ).length;

  return [
    {
      label: "Total Lessons",
      value: props.lessons.length
    },
    {
      label: "Total Teachers",
      value: props.teachers.length
    },
    {
      label: "Available Spaces",
      value: availableSpaces
    },
    {
      label: "Full Lessons",
      value: fullLessons
    }
  ];
});
</script>

<template>
  <div class="admin-stats-grid">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="admin-stat-card"
    >
      <h3>{{ stat.value }}</h3>
      <p>{{ stat.label }}</p>
    </div>
  </div>
</template>
