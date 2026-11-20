
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  lessons: {
    type: Array,
    default: () => []
  },
  saving: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["save", "cancel"]);

const firstName = ref("");
const lastName = ref("");
const selectedLessonIDs = ref([]);

const isValid = computed(() => {
  return (
    firstName.value.trim().length > 0 &&
    lastName.value.trim().length > 0 &&
    selectedLessonIDs.value.length > 0
  );
});

const submitTeacher = () => {
  if (!isValid.value || props.saving) return;

  emit("save", {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    lessonIDs: [...selectedLessonIDs.value]
  });
};
</script>

<template>
  <form class="admin-teacher-form" @submit.prevent="submitTeacher">
    <h2>Add New Teacher</h2>

    <div class="admin-form-field">
      <label for="teacherFirstName">First Name</label>
      <input
        id="teacherFirstName"
        v-model.trim="firstName"
        type="text"
        required
      />
    </div>

    <div class="admin-form-field">
      <label for="teacherLastName">Last Name</label>
      <input
        id="teacherLastName"
        v-model.trim="lastName"
        type="text"
        required
      />
    </div>

    <fieldset class="teacher-lesson-select">
      <legend>Assign Lessons</legend>

      <label
        v-for="lesson in lessons"
        :key="lesson._id"
        class="teacher-lesson-checkbox"
      >
        <input
          v-model="selectedLessonIDs"
          type="checkbox"
          :value="String(lesson._id)"
        />

        <span>
          {{ lesson.topic }} — {{ lesson.location }}
        </span>
      </label>

      <p v-if="lessons.length === 0">
        No lessons available. Create a lesson first.
      </p>
    </fieldset>

    <div class="admin-form-actions">
      <button
        type="submit"
        class="admin-save-btn"
        :disabled="!isValid || saving"
      >
        {{ saving ? "Saving..." : "Save Teacher" }}
      </button>

      <button
        type="button"
        class="admin-cancel-btn"
        :disabled="saving"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
