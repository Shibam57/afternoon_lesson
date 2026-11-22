<script setup>
import { ref, onMounted } from 'vue'
import { getLessons, getTeachers } from '../../services/api.js'
import AdminSidebar from '../../components/admin/AdminSidebar.vue'
import AdminHeader from '../../components/admin/AdminHeader.vue'
import AdminStats from '../../components/admin/AdminStats.vue'
import ManageLessonsView from './ManageLessonsView.vue'
import ManageOrdersView from './ManageOrdersView.vue'
import ManageTeachersView from './ManageTeachersView.vue'
import AppIcon from '../../components/layout/AppIcon.vue'

const emit = defineEmits(['logout'])
const lessons = ref([])
const teachers = ref([])
const activeSection = ref('dashboard')
const loading = ref(true)
const error = ref('')

const loadDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    const [lessonData, teacherData] = await Promise.all([getLessons(), getTeachers()])
    if (!Array.isArray(lessonData) || !Array.isArray(teacherData)) {
      throw new Error('Invalid dashboard API response')
    }
    lessons.value = lessonData
    teachers.value = teacherData
  } catch (err) {
    error.value = err.message
    console.error('Dashboard error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <section class="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 py-6 sm:py-9">
    <div class="mb-7 flex items-center gap-2 text-xs font-bold text-slate-400">
      <AppIcon name="layout-dashboard" :size="16" class="text-violet-600" />
      Management workspace
      <span class="text-slate-300">
        /
      </span>
      {{ activeSection }}
    </div>
    <div class="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:gap-7">
      <AdminSidebar :active-section="activeSection" @navigate="activeSection = $event" />
      <div class="min-w-0 flex-1">
        <AdminHeader :active-section="activeSection" @logout="emit('logout')" />
        <div v-if="activeSection === 'dashboard'" class="motion-safe:transition-all motion-safe:duration-700">
          <div
            class="mb-6 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#2e286a] to-violet-700 p-6 text-white sm:p-8"
          >
            <p class="mb-2 text-xs font-extrabold uppercase tracking-[.15em] text-white/70">
              Your learning hub
            </p>
            <h2 class="font-sans tracking-tight text-2xl font-extrabold sm:text-3xl">
              Welcome to your workspace ✨
            </h2>
            <p class="mt-2 text-sm leading-6 text-indigo-100">
              Manage everything in one place and keep the magic going.
            </p>
          </div>
          <p
            v-if="loading"
            class="
              rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
              p-6 text-sm font-medium text-slate-500
            "
            role="status"
          >
            Loading dashboard...
          </p>
          <p
            v-else-if="error"
            class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {{ error }}
          </p>
          <AdminStats v-else :lessons="lessons" :teachers="teachers" />
          <div
            class="
              rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
              mt-6 flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center
            "
          >
            <div>
              <h3 class="font-sans tracking-tight text-lg font-extrabold text-slate-900">
                Keep your data fresh
              </h3>
              <p class="mt-1 text-xs leading-5 text-slate-500">
                Update the dashboard with the latest lesson and teacher numbers.
              </p>
            </div>
            <button
              type="button"
              class="
                inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200
                bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50
                disabled:cursor-not-allowed disabled:opacity-50 shrink-0 self-start sm:self-auto
              "
              :disabled="loading"
              @click="loadDashboard"
            >
              <AppIcon name="refresh-cw" :size="17" />
              {{ loading ? 'Refreshing...' : 'Refresh dashboard' }}
            </button>
          </div>
        </div>
        <ManageLessonsView v-else-if="activeSection === 'lessons'" />
        <ManageTeachersView v-else-if="activeSection === 'teachers'" />
        <ManageOrdersView v-else-if="activeSection === 'orders'" />
      </div>
    </div>
  </section>
</template>
