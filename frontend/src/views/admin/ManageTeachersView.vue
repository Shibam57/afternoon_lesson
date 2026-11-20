
<script setup>
import { ref, onMounted } from "vue";

import {
  getLessons,
  getTeachers
} from "../../services/api.js";

import { createAdminTeacher } from "../../services/adminApi.js";
import { useAdminAuth } from "../../composables/useAdminAuth.js";

import TeacherForm from "../../components/admin/TeacherForm.vue";
import TeacherTable from "../../components/admin/TeacherTable.vue";

const { token } = useAdminAuth();

const teachers = ref([]);
const lessons = ref([]);

const loading = ref(false);
const saving = ref(false);
const showForm = ref(false);
const formKey = ref(0);

const message = ref("");
const error = ref("");


const loadTeachers = async () => {
  loading.value = true;
  error.value = "";

  try {
    const [teacherData, lessonData] = await Promise.all([
      getTeachers(),
      getLessons()
    ]);

    if (!Array.isArray(teacherData) || !Array.isArray(lessonData)) {
      throw new Error("Invalid API response");
    }

    teachers.value = teacherData;
    lessons.value = lessonData;

  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};


const openCreate = () => {
  showForm.value = true;
  formKey.value++;
  message.value = "";
  error.value = "";
};


const closeForm = () => {
  if (saving.value) return;
  showForm.value = false;
};


const handleSaveTeacher = async (teacherData) => {
  if (saving.value) return;

  saving.value = true;
  message.value = "";
  error.value = "";

  try {
    await createAdminTeacher(teacherData, token.value);

    message.value = "Teacher created successfully!";
    showForm.value = false;
    formKey.value++;

    
    try {
      const updatedTeachers = await getTeachers();

      if (!Array.isArray(updatedTeachers)) {
        throw new Error("Invalid teachers response");
      }

      teachers.value = updatedTeachers;
    } catch (refreshError) {
      error.value =
        "Teacher was created, but the list could not refresh: " +
        refreshError.message;
    }

  } catch (err) {
    error.value =
      "Could not confirm teacher creation. Check the teacher list " +
      "before trying again: " + err.message;

  } finally {
    saving.value = false;
  }
};

onMounted(loadTeachers);
</script>

<template>
  <section class="admin-manage-teachers">

    <div class="admin-lesson-toolbar">
      <h2>All Teachers ({{ teachers.length }})</h2>

      <button
        type="button"
        class="admin-save-btn"
        :disabled="loading || saving"
        @click="showForm ? closeForm() : openCreate()"
      >
        {{ showForm ? "Close Form" : "+ Add Teacher" }}
      </button>
    </div>

    <p v-if="message" class="admin-success" role="status">
      {{ message }}
    </p>

    <p v-if="error" class="admin-error" role="alert">
      {{ error }}
    </p>

    <TeacherForm
      v-if="showForm"
      :key="formKey"
      :lessons="lessons"
      :saving="saving"
      @save="handleSaveTeacher"
      @cancel="closeForm"
    />

    <p v-if="loading">Loading teachers...</p>

    <TeacherTable
      v-else
      :teachers="teachers"
      :lessons="lessons"
    />

  </section>
</template>
