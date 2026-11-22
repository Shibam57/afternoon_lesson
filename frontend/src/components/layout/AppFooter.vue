<script setup>
import AppIcon from './AppIcon.vue'
</script>

<template>
  <footer class="mt-auto border-t border-slate-100 bg-white">
    <div
      class="
        mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 flex flex-col gap-7 py-9 sm:flex-row
        sm:items-center sm:justify-between
      "
    >
      <div class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
          <AppIcon name="sparkles" :size="21" />
        </span>
        <div>
          <p class="font-sans tracking-tight text-lg font-extrabold tracking-tight text-slate-900">
            afterschool
            <span class="text-violet-600">
              .
            </span>
          </p>
          <p class="text-xs text-slate-400">
            Little moments. Big discoveries.
          </p>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold text-slate-400 sm:justify-end"
      >
        <span>
          © {{ new Date().getFullYear() }} AfterSchool
        </span>
        <span class="hidden h-1 w-1 rounded-full bg-slate-300 sm:block">
        </span>
        <span>
          Made for curious minds
          <span aria-hidden="true">
            ✦
          </span>
        </span>
      </div>
    </div>
  </footer>
</template>
