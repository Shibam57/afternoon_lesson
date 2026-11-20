
<script setup>
const props = defineProps({
  teachers: {
    type: Array,
    default: () => []
  },
  lessons: {
    type: Array,
    default: () => []
  }
});

const getLessonNames = (lessonIDs = []) => {
  const names = lessonIDs.map((id) => {
    const lesson = props.lessons.find(
      (item) => String(item._id) === String(id)
    );

    return lesson ? lesson.topic : "Unknown Lesson";
  });

  return names.join(", ") || "No lessons assigned";
};
</script>

<template>
  <div class="admin-table-wrapper">
    <table class="admin-lesson-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Assigned Lessons</th>
          <th>Total Lessons</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="teacher in teachers"
          :key="teacher._id"
        >
          <td>{{ teacher.firstName }}</td>

          <td>{{ teacher.lastName }}</td>

          <td>
            {{ getLessonNames(teacher.lessonIDs) }}
          </td>

          <td>
            {{ teacher.lessonIDs?.length || 0 }}
          </td>
        </tr>

        <tr v-if="teachers.length === 0">
          <td colspan="4">
            No teachers available.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
