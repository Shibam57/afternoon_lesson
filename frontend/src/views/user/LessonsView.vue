
<script setup>
import { ref, computed, onMounted } from "vue";

import { useLessons } from "../../composables/useLessons.js";
import {
  getTeachers,
  getTeacherLessons
} from "../../services/api.js";

import LessonList from "../../components/lessons/LessonList.vue";
import SortControls from "../../components/lessons/SortControls.vue";
import SearchBar from "../../components/lessons/SearchBar.vue";
import TeacherFilter from "../../components/lessons/TeacherFilter.vue";

// Lesson search
const {
  lessons,
  loading,
  error,
  findLessons
} = useLessons();

// Sorting
const sortBy = ref("topic");
const sortOrder = ref("asc");

// Teacher filtering
const teachers = ref([]);
const selectedTeacher = ref("");
const teacherLessonIds = ref(null);

const teachersLoading = ref(true);
const teacherLessonsLoading = ref(false);
const teacherError = ref("");

let teacherRequestVersion = 0;

// Load teachers 
onMounted(async () => {
  try {
    teachers.value = await getTeachers();
  } catch (err) {
    teacherError.value = err.message;
  } finally {
    teachersLoading.value = false;
  }
});

// Select a teacher and retrieve 
const handleTeacherChange = async (teacherId) => {
  const version = ++teacherRequestVersion;

  selectedTeacher.value = teacherId;
  teacherError.value = "";
  teacherLessonIds.value = null;

  if (!teacherId) {
    teacherLessonsLoading.value = false;
    return;
  }

  teacherLessonsLoading.value = true;

  try {
    const teacherLessons = await getTeacherLessons(teacherId);

    if (version !== teacherRequestVersion) return;

    teacherLessonIds.value = new Set(
      teacherLessons.map((lesson) => String(lesson._id))
    );
  } catch (err) {
    if (version === teacherRequestVersion) {
      teacherError.value = err.message;
    }
  } finally {
    if (version === teacherRequestVersion) {
      teacherLessonsLoading.value = false;
    }
  }
};

// Apply teacher filter and sorting
const sortedLessons = computed(() => {
  const filteredLessons = selectedTeacher.value
    ? lessons.value.filter((lesson) =>
        teacherLessonIds.value?.has(String(lesson._id))
      )
    : lessons.value;

  return [...filteredLessons].sort((a, b) => {
    let comparison = 0;

    if (sortBy.value === "price" || sortBy.value === "space") {
      comparison =
        Number(a[sortBy.value]) - Number(b[sortBy.value]);
    } else {
      comparison = String(a[sortBy.value] ?? "").localeCompare(
        String(b[sortBy.value] ?? ""),
        undefined,
        { sensitivity: "base" }
      );
    }

    return sortOrder.value === "asc"
      ? comparison
      : -comparison;
  });
});
</script>


<template>
  <section id="lessons" class="page-container">

    <h1 class="page-title">Explore Our Lessons</h1>

    <p class="page-description">
      Discover exciting after-school activities.
    </p>

    
    <SearchBar @search="findLessons" />

    
    <TeacherFilter
      :teachers="teachers"
      :selected-teacher="selectedTeacher"
      :disabled="teachersLoading"
      @teacher-change="handleTeacherChange"
    />

    
    <SortControls
      :sort-by="sortBy"
      :sort-order="sortOrder"
      @sort-change="sortBy = $event"
      @order-change="sortOrder = $event"
    />

    
    <p v-if="loading || teacherLessonsLoading">
      Loading lessons...
    </p>

    <p v-else-if="error" class="error-message">
      {{ error }}
    </p>

    <p
      v-else-if="teacherError"
      class="error-message"
    >
      {{ teacherError }}
    </p>

    
    <LessonList
      v-else
      :lessons="sortedLessons"
    />

  </section>
</template>
