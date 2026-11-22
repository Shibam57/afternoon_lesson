<script setup>
import { ref } from 'vue'
import AppIcon from '../layout/AppIcon.vue'

const props = defineProps({
  lesson: { type: Object, default: null },
  saving: { type: Boolean, default: false },
})
const emit = defineEmits(['save', 'cancel'])

const isEditing = Boolean(props.lesson)
const topic = ref(props.lesson?.topic ?? '')
const location = ref(props.lesson?.location ?? '')
const price = ref(props.lesson?.price ?? 0)
const space = ref(props.lesson?.space ?? 5)
const image = ref(null)
const fileError = ref('')

const handleFileChange = (event) => {
  const file = event.target.files?.[0]
  fileError.value = ''
  image.value = null

  if (!file) return
  if (file.size > 5 * 1024 * 1024) {
    fileError.value = 'Maximum image size is 5 MB'
    return
  }
  image.value = file
}

const submitLesson = () => {
  if (props.saving) return

  const lessonData = {
    topic: topic.value.trim(),
    location: location.value.trim(),
    price: Number(price.value),
    space: Number(space.value),
  }

  if (
    !lessonData.topic || !lessonData.location ||
    !Number.isFinite(lessonData.price) || lessonData.price < 0 ||
    !Number.isInteger(lessonData.space) || lessonData.space < 0
  ) return

  if (isEditing) {
    emit('save', lessonData)
    return
  }
  if (!image.value || fileError.value) return

  const formData = new FormData()
  Object.entries(lessonData).forEach(([key, value]) => formData.append(key, String(value)))
  formData.append('image', image.value)
  emit('save', formData)
}
</script>

<template>
  <form
    class="rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)] mb-7 p-5 sm:p-7"
    @submit.prevent="submitLesson"
  >
    <div class="mb-5 flex items-center gap-3">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
        <AppIcon :name="isEditing ? 'pencil' : 'plus'" :size="20" />
      </span>
      <div>
        <h2 class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
          {{ isEditing ? 'Edit lesson' : 'Add a new lesson' }}
        </h2>
        <p class="text-xs text-slate-500">
          Enter all required details below.
        </p>
      </div>
    </div>
    <div class="grid gap-5 sm:grid-cols-2">
      <label class="block text-sm font-bold text-slate-600" for="lessonTopic">
        Subject / topic
        <input
          id="lessonTopic"
          v-model="topic"
          class="
            mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4
            focus:ring-violet-100
          "
          placeholder="e.g. Creative Art"
          required
        />
      </label>
      <label class="block text-sm font-bold text-slate-600" for="lessonLocation">
        Location
        <input
          id="lessonLocation"
          v-model="location"
          class="
            mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4
            focus:ring-violet-100
          "
          placeholder="e.g. Studio A"
          required
        />
      </label>
      <label class="block text-sm font-bold text-slate-600" for="lessonPrice">
        Price (£)
        <input
          id="lessonPrice"
          v-model.number="price"
          class="
            mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4
            focus:ring-violet-100
          "
          type="number"
          min="0"
          step="0.01"
          required
        />
      </label>
      <label class="block text-sm font-bold text-slate-600" for="lessonSpace">
        Available spaces
        <input
          id="lessonSpace"
          v-model.number="space"
          class="
            mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4
            focus:ring-violet-100
          "
          type="number"
          min="0"
          step="1"
          required
        />
      </label>
      <div v-if="!isEditing" class="sm:col-span-2">
        <label for="lessonImage" class="block text-sm font-bold text-slate-600">
          Lesson image
        </label>
        <input
          id="lessonImage"
          type="file"
          class="
            mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4
            focus:ring-violet-100 cursor-pointer file:mr-4 file:rounded-lg file:border-0 file:bg-violet-100
            file:px-3 file:py-2 file:text-xs file:font-bold file:text-violet-800
          "
          accept=".jpg,.jpeg,.jfif,.png,.webp"
          required
          @change="handleFileChange"
        />
        <p class="mt-2 text-xs text-slate-400">
          JPG, PNG, WebP; up to 5 MB.
        </p>
        <p
          v-if="fileError"
          class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 mt-2"
          role="alert"
        >
          {{ fileError }}
        </p>
      </div>
      <p v-else class="flex items-center gap-2 text-xs font-medium text-slate-500 sm:col-span-2">
        <AppIcon name="image" :size="16" />
        The current lesson image will be kept.
      </p>
    </div>
    <div class="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
      <button
        type="submit"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4
          py-2.5 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed
          disabled:bg-slate-300
        "
        :disabled="saving || !!fileError || (!isEditing && !image)"
      >
        <AppIcon :name="isEditing ? 'check' : 'plus'" :size="17" />
        {{ saving ? 'Saving...' : isEditing ? 'Update lesson' : 'Save lesson' }}
      </button>
      <button
        type="button"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200
          bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50
          disabled:cursor-not-allowed disabled:opacity-50
        "
        :disabled="saving"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
