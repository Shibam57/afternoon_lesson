<script setup>
import { ref, onMounted } from 'vue'
import { getLessons } from '../../services/api.js'
import { createAdminLesson, updateAdminLesson } from '../../services/adminApi.js'
import { useAdminAuth } from '../../composables/useAdminAuth.js'
import LessonTable from '../../components/admin/LessonTable.vue'
import LessonForm from '../../components/admin/LessonForm.vue'
import AppIcon from '../../components/layout/AppIcon.vue'

const { token } = useAdminAuth()
const lessons = ref([])
const loading = ref(false)
const saving = ref(false)
const showForm = ref(false)
const editingLesson = ref(null)
const formKey = ref(0)
const message = ref('')
const error = ref('')

const loadLessons = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getLessons()
    if (!Array.isArray(data)) throw new Error('Invalid lessons response')
    lessons.value = data
  } catch (err) {
    error.value = err.message
    console.error('Load lessons error:', err)
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  if (saving.value) return
  editingLesson.value = null
  showForm.value = true
  formKey.value++
  message.value = ''
  error.value = ''
}

const openEdit = (lesson) => {
  if (saving.value) return
  editingLesson.value = lesson
  showForm.value = true
  formKey.value++
  message.value = ''
  error.value = ''
}

const closeForm = () => {
  if (saving.value) return
  showForm.value = false
  editingLesson.value = null
}

const handleSaveLesson = async (data) => {
  if (saving.value) return
  saving.value = true
  message.value = ''
  error.value = ''
  try {
    if (editingLesson.value) {
      await updateAdminLesson(editingLesson.value._id, data, token.value)
      message.value = 'Lesson updated successfully!'
    } else {
      await createAdminLesson(data, token.value)
      message.value = 'Lesson created successfully!'
    }
    editingLesson.value = null
    showForm.value = false
    formKey.value++
    await loadLessons()
  } catch (err) {
    error.value = err.message
    console.error('Save lesson error:', err)
  } finally {
    saving.value = false
  }
}

onMounted(loadLessons)
</script>

<template>
  <section class="motion-safe:transition-all motion-safe:duration-700">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
          All lessons
          <span class="text-violet-600">
            ({{ lessons.length }})
          </span>
        </h2>
        <p class="mt-1 text-xs text-slate-500">
          Create and update learning activities.
        </p>
      </div>
      <button
        type="button"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4
          py-2.5 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed
          disabled:bg-slate-300
        "
        :disabled="saving"
        @click="showForm ? closeForm() : openCreate()"
      >
        <AppIcon :name="showForm ? 'x' : 'plus'" :size="17" />
        {{ showForm ? 'Close form' : 'Add lesson' }}
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
    <LessonForm
      v-if="showForm"
      :key="formKey"
      :lesson="editingLesson"
      :saving="saving"
      @save="handleSaveLesson"
      @cancel="closeForm"
    />
    <p
      v-if="loading"
      class="
        rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
        p-6 text-sm text-slate-500
      "
    >
      Loading lessons...
    </p>
    <LessonTable v-else :lessons="lessons" @edit="openEdit" />
  </section>
</template>
