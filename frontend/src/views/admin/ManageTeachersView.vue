<script setup>
import { ref, onMounted } from 'vue'
import { getLessons, getTeachers } from '../../services/api.js'
import { createAdminTeacher } from '../../services/adminApi.js'
import { useAdminAuth } from '../../composables/useAdminAuth.js'
import TeacherForm from '../../components/admin/TeacherForm.vue'
import TeacherTable from '../../components/admin/TeacherTable.vue'
import AppIcon from '../../components/layout/AppIcon.vue'

const { token } = useAdminAuth()
const teachers = ref([])
const lessons = ref([])
const loading = ref(false)
const saving = ref(false)
const showForm = ref(false)
const formKey = ref(0)
const message = ref('')
const error = ref('')

const loadTeachers = async () => {
  loading.value = true
  error.value = ''
  try {
    const [teacherData, lessonData] = await Promise.all([getTeachers(), getLessons()])
    if (!Array.isArray(teacherData) || !Array.isArray(lessonData)) {
      throw new Error('Invalid API response')
    }
    teachers.value = teacherData
    lessons.value = lessonData
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  showForm.value = true
  formKey.value++
  message.value = ''
  error.value = ''
}

const closeForm = () => {
  if (saving.value) return
  showForm.value = false
}

const handleSaveTeacher = async (teacherData) => {
  if (saving.value) return
  saving.value = true
  message.value = ''
  error.value = ''
  try {
    await createAdminTeacher(teacherData, token.value)
    message.value = 'Teacher created successfully!'
    showForm.value = false
    formKey.value++
    try {
      const updated = await getTeachers()
      if (!Array.isArray(updated)) throw new Error('Invalid teachers response')
      teachers.value = updated
    } catch (refreshError) {
      error.value = `Teacher created, but the list could not refresh: ${refreshError.message}`
    }
  } catch (err) {
    error.value = `Could not confirm teacher creation. Check the teacher list before trying again: ${err.message}`
  } finally {
    saving.value = false
  }
}

onMounted(loadTeachers)
</script>

<template>
  <section class="motion-safe:transition-all motion-safe:duration-700">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
          All teachers
          <span class="text-violet-600">
            ({{ teachers.length }})
          </span>
        </h2>
        <p class="mt-1 text-xs text-slate-500">
          Organize teachers and their assigned lessons.
        </p>
      </div>
      <button
        type="button"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4
          py-2.5 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed
          disabled:bg-slate-300
        "
        :disabled="loading || saving"
        @click="showForm ? closeForm() : openCreate()"
      >
        <AppIcon :name="showForm ? 'x' : 'plus'" :size="17" />
        {{ showForm ? 'Close form' : 'Add teacher' }}
      </button>
    </div>
    <p
      v-if="message"
      class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 mb-5"
      role="status"
    >
      {{ message }}
    </p>
    <p
      v-if="error"
      class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 mb-5"
      role="alert"
    >
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
    <p
      v-if="loading"
      class="
        rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
        p-6 text-sm text-slate-500
      "
    >
      Loading teachers...
    </p>
    <TeacherTable v-else :teachers="teachers" :lessons="lessons" />
  </section>
</template>
