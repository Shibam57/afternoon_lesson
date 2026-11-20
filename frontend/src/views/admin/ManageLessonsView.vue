
<script setup>
import { ref, onMounted } from "vue";

import { getLessons } from "../../services/api.js";

import {
  createAdminLesson,
  updateAdminLesson
} from "../../services/adminApi.js";

import { useAdminAuth } from "../../composables/useAdminAuth.js";

import LessonTable from "../../components/admin/LessonTable.vue";
import LessonForm from "../../components/admin/LessonForm.vue";


const { token } = useAdminAuth();


const lessons = ref([]);


const loading = ref(false);
const saving = ref(false);


const showForm = ref(false);
const editingLesson = ref(null);
const formKey = ref(0);


const message = ref("");
const error = ref("");


const loadLessons = async () => {
  loading.value = true;
  error.value = "";

  try {
    const data = await getLessons();

    if (!Array.isArray(data)) {
      throw new Error("Invalid lessons response");
    }

    lessons.value = data;

  } catch (err) {
    error.value = err.message;
    console.error("Load lessons error:", err);

  } finally {
    loading.value = false;
  }
};


const openCreate = () => {
  if (saving.value) return;

  editingLesson.value = null;
  showForm.value = true;
  formKey.value++;

  message.value = "";
  error.value = "";
};


const openEdit = (lesson) => {
  if (saving.value) return;

  editingLesson.value = lesson;
  showForm.value = true;
  formKey.value++;

  message.value = "";
  error.value = "";
};


const closeForm = () => {
  if (saving.value) return;

  showForm.value = false;
  editingLesson.value = null;
};


const handleSaveLesson = async (data) => {
  if (saving.value) return;

  saving.value = true;
  message.value = "";
  error.value = "";

  const isEditing = Boolean(editingLesson.value);

  try {
    if (isEditing) {
      
      await updateAdminLesson(
        editingLesson.value._id,
        data,
        token.value
      );

      message.value = "Lesson updated successfully!";

    } else {
      
      await createAdminLesson(
        data,
        token.value
      );

      message.value = "Lesson created successfully!";
    }

    
    editingLesson.value = null;
    showForm.value = false;
    formKey.value++;

    await loadLessons();

  } catch (err) {
    error.value = err.message;
    console.error("Save lesson error:", err);

  } finally {
    saving.value = false;
  }
};


onMounted(loadLessons);
</script>

<template>
  <section class="admin-manage-lessons">

    
    <div class="admin-lesson-toolbar">
      <h2>All Lessons ({{ lessons.length }})</h2>

      <button
        type="button"
        class="admin-save-btn"
        :disabled="saving"
        @click="showForm ? closeForm() : openCreate()"
      >
        {{ showForm ? "Close Form" : "+ Add Lesson" }}
      </button>
    </div>

    
    <p
      v-if="message"
      class="admin-success"
      role="status"
    >
      {{ message }}
    </p>

  
    <p
      v-if="error"
      class="admin-error"
      role="alert"
    >
      {{ error }}
    </p>

    
    <LessonForm
      v-if="showForm"
      :key="formKey"
      :lesson="editingLesson"
      :saving="saving"
      @save="handleSaveLesson"
      @cancel="closeForm"
    />

    
    <p v-if="loading">
      Loading lessons...
    </p>

    
    <LessonTable
        v-if="!loading"
        :lessons="lessons"
        @edit="openEdit"
    />

  </section>
</template>
