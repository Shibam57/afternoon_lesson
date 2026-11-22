<script setup>
import { ref, computed } from 'vue'
import AppIcon from '../layout/AppIcon.vue'

const props = defineProps({
  lessons: { type: Array, default: () => [] },
  saving: { type: Boolean, default: false },
})
const emit = defineEmits(['save', 'cancel'])

const firstName = ref('')
const lastName = ref('')
const selectedLessonIDs = ref([])
const isValid = computed(() =>
  firstName.value.trim().length > 0 &&
  lastName.value.trim().length > 0 &&
  selectedLessonIDs.value.length > 0,
)

const submitTeacher = () => {
  if (!isValid.value || props.saving) return
  emit('save', {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    lessonIDs: [...selectedLessonIDs.value],
  })
}
</script>

<template>
  <form
    class="rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)] mb-7 p-5 sm:p-7"
    @submit.prevent="submitTeacher"
  >
    <h2 class="font-sans tracking-tight mb-5 flex items-center gap-2 text-xl font-extrabold text-slate-900">
      <AppIcon name="users" :size="22" class="text-violet-600" />
      Add new teacher
    </h2>
    <div class="grid gap-5 sm:grid-cols-2">
      <label for="teacherFirstName" class="block text-sm font-bold text-slate-600">
        First name
        <input
          id="teacherFirstName"
          v-model.trim="firstName"
          type="text"
          class="
            mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4
            focus:ring-violet-100
          "
          placeholder="First name"
          required
        />
      </label>
      <label for="teacherLastName" class="block text-sm font-bold text-slate-600">
        Last name
        <input
          id="teacherLastName"
          v-model.trim="lastName"
          type="text"
          class="
            mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4
            focus:ring-violet-100
          "
          placeholder="Last name"
          required
        />
      </label>
    </div>
    <fieldset class="mt-6">
      <legend class="mb-3 text-sm font-bold text-slate-600">
        Assign lessons
        <span class="text-xs font-medium text-slate-400">
          (choose at least one)
        </span>
      </legend>
      <div
        class="grid max-h-52 gap-2 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:grid-cols-2"
      >
        <label
          v-for="lesson in lessons"
          :key="lesson._id"
          class="
            flex cursor-pointer items-center gap-3 rounded-xl bg-white px-3 py-3 text-xs font-semibold
            text-slate-700 transition hover:bg-violet-50
          "
        >
          <input
            v-model="selectedLessonIDs"
            type="checkbox"
            :value="String(lesson._id)"
            class="h-4 w-4 accent-violet-600"
          />
          <span>
            {{ lesson.topic }}
            <span class="font-normal text-slate-400">
              — {{ lesson.location }}
            </span>
          </span>
        </label>
        <p v-if="!lessons.length" class="p-3 text-sm text-slate-500">
          No lessons available. Create a lesson first.
        </p>
      </div>
    </fieldset>
    <div class="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
      <button
        type="submit"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4
          py-2.5 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed
          disabled:bg-slate-300
        "
        :disabled="!isValid || saving"
      >
        <AppIcon name="check" :size="17" />
        {{ saving ? 'Saving...' : 'Save teacher' }}
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
