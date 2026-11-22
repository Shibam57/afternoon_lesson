<script setup>
import { computed } from 'vue'
import AppIcon from '../layout/AppIcon.vue'

const props = defineProps({
  lessons: { type: Array, default: () => [] },
  teachers: { type: Array, default: () => [] },
})

const stats = computed(() => [
  {
    label: 'Total lessons',
    value: props.lessons.length,
    icon: 'book-open',
    background: 'bg-violet-50',
    text: 'text-violet-700',
  },
  {
    label: 'Teachers',
    value: props.teachers.length,
    icon: 'users',
    background: 'bg-orange-50',
    text: 'text-orange-600',
  },
  {
    label: 'Open spaces',
    value: props.lessons.reduce((sum, lesson) => sum + Math.max(0, Number(lesson.space) || 0), 0),
    icon: 'sparkles',
    background: 'bg-teal-50',
    text: 'text-teal-600',
  },
  {
    label: 'Fully booked',
    value: props.lessons.filter((lesson) => Number(lesson.space) === 0).length,
    icon: 'check-circle',
    background: 'bg-rose-50',
    text: 'text-rose-500',
  },
])
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="stat in stats"
      :key="stat.label"
      class="
        rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
        p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
      "
    >
      <div
        class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
        :class="[stat.background, stat.text]"
      >
        <AppIcon :name="stat.icon" :size="23" />
      </div>
      <h3 class="font-sans text-[35px] font-extrabold tracking-tight text-slate-900">
        {{ stat.value }}
      </h3>
      <p class="mt-1 text-xs font-bold text-slate-500">
        {{ stat.label }}
      </p>
    </article>
  </div>
</template>
