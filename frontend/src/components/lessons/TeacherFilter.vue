<script setup>
import AppIcon from '../layout/AppIcon.vue'
defineProps({
  teachers: { type: Array, default: () => [] },
  selectedTeacher: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['teacher-change'])
</script>

<template>
  <div class="min-w-0 flex-1">
    <label for="teacherSelect" class="mb-2 block text-xs font-bold tracking-wide text-slate-600">
      Filter by teacher
    </label>
    <div class="relative">
      <AppIcon
        name="users"
        :size="17"
        class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-600"
      />
      <select
        id="teacherSelect"
        class="
          block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
          text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
          focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
          disabled:bg-slate-100 h-[48px] appearance-none pl-10 pr-9
        "
        :value="selectedTeacher"
        :disabled="disabled"
        @change="emit('teacher-change', $event.target.value)"
      >
        <option value="">
          All teachers
        </option>
        <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
          {{ teacher.firstName }} {{ teacher.lastName }}
        </option>
      </select>
      <AppIcon
        name="chevron-down"
        :size="16"
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  </div>
</template>
