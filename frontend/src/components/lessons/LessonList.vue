<script setup>
import LessonCard from './LessonCard.vue'
import AppIcon from '../layout/AppIcon.vue'
defineProps({ lessons: { type: Array, required: true } })
</script>

<template>
  <div
    v-if="lessons.length"
    class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
    aria-live="polite"
  >
    <LessonCard v-for="lesson in lessons" :key="lesson._id" :lesson="lesson" />
  </div>
  <div
    v-else
    class="
      rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
      flex flex-col items-center px-6 py-16 text-center
    "
  >
    <span class="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-50 text-violet-600">
      <AppIcon name="search" :size="28" />
    </span>
    <h3 class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
      No lessons found
    </h3>
    <p class="mt-2 max-w-sm text-sm leading-6 text-slate-500">
      Try another search or change your filters to find your next adventure.
    </p>
  </div>
</template>
