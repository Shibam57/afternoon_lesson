
<script setup>
import { ref, onMounted } from "vue";

import { getLessons, getTeachers } from "../../services/api.js";

import AdminSidebar from "../../components/admin/AdminSidebar.vue";
import AdminHeader from "../../components/admin/AdminHeader.vue";
import AdminStats from "../../components/admin/AdminStats.vue";
import ManageLessonsView from "./ManageLessonsView.vue";
import ManageOrdersView from "./ManageOrdersView.vue";

import ManageTeachersView from "./ManageTeachersView.vue";

const emit = defineEmits(["logout"]);

const lessons = ref([]);
const teachers = ref([]);

const activeSection = ref("dashboard");

const loading = ref(true);
const error = ref("");

const loadDashboard = async () => {
  loading.value = true;
  error.value = "";

  try {
    const [lessonData, teacherData] = await Promise.all([
      getLessons(),
      getTeachers()
    ]);

    if (
      !Array.isArray(lessonData) ||
      !Array.isArray(teacherData)
    ) {
      throw new Error("Invalid dashboard API response");
    }

    lessons.value = lessonData;
    teachers.value = teacherData;

  } catch (err) {
    error.value = err.message;
    console.error("Dashboard error:", err);

  } finally {
    loading.value = false;
  }
};

onMounted(loadDashboard);
</script>

<template>
  <div class="admin-shell">
    <AdminSidebar
        :active-section="activeSection"
        @navigate="activeSection = $event"
    />

    <div class="admin-main">
      
        <AdminHeader @logout="emit('logout')" />

        <div
        v-if="activeSection === 'dashboard'"
        class="admin-dashboard-content"
        >
        <p v-if="loading">Loading dashboard...</p>

        <p v-else-if="error" class="admin-error">
            {{ error }}
        </p>

        <AdminStats
            v-else
            :lessons="lessons"
            :teachers="teachers"
        />

        <button
            type="button"
            class="admin-refresh-btn"
            :disabled="loading"
            @click="loadDashboard"
        >
            Refresh Dashboard
        </button>
        </div>

        <ManageLessonsView
        v-else-if="activeSection === 'lessons'"
        />
        
        <ManageTeachersView
        v-else-if="activeSection === 'teachers'"
        />

        <ManageOrdersView
        v-else-if="activeSection === 'orders'"
        />



    </div>
  </div>
</template>
