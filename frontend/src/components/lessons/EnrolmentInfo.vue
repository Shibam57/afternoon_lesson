<script setup>
import { ref, watch } from 'vue'
import { getEnrolment } from '../../services/api.js'
const props = defineProps({ lessonId: { type: String, required: true } })
const enrolment = ref(null)
const loading = ref(true)
const error = ref('')
let requestVersion = 0
watch(() => props.lessonId, async (lessonId) => {
  const version = ++requestVersion
  loading.value = true
  error.value = ''
  enrolment.value = null
  try {
    const result = await getEnrolment(lessonId)
    if (version !== requestVersion) return
    enrolment.value = result
  } catch (err) {
    if (version === requestVersion) error.value = err.message
  } finally {
    if (version === requestVersion) loading.value = false
  }
}, { immediate: true })
</script>

<template>
  <div
    class="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500"
    aria-live="polite"
  >
    <span>
      Spaces purchased
    </span>
    <span v-if="loading" class="animate-pulse h-4 w-7 rounded bg-slate-200" aria-label="Loading enrolment">
    </span>
    <span v-else-if="error" class="text-slate-400" title="Enrolment currently unavailable">
      —
    </span>
    <span v-else class="font-extrabold text-slate-700">
      {{ enrolment }}
    </span>
  </div>
</template>
