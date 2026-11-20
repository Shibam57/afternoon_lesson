
<script setup>
defineProps({
  teachers: {
    type: Array,
    default: () => []
  },
  selectedTeacher: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["teacher-change"]);
</script>

<template>
  <div class="teacher-filter">
    <label for="teacherSelect">Select Teacher:</label>

    <select
      id="teacherSelect"
      :value="selectedTeacher"
      :disabled="disabled"
      @change="emit('teacher-change', $event.target.value)"
    >
      <option value="">All Teachers</option>

      <option
        v-for="teacher in teachers"
        :key="teacher._id"
        :value="teacher._id"
      >
        {{ teacher.firstName }} {{ teacher.lastName }}
      </option>
    </select>
  </div>
</template>
