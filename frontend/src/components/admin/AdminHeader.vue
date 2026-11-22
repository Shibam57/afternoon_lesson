<script setup>
import AppIcon from '../layout/AppIcon.vue'
defineProps({ activeSection: { type: String, default: 'dashboard' } })
const emit = defineEmits(['logout'])
const sectionTitles = { dashboard: 'Dashboard overview', lessons: 'Manage lessons', teachers: 'Manage teachers', orders: 'Manage orders' }
</script>

<template>
  <header
    class="
      mb-7 flex flex-col justify-between gap-4 rounded-[22px] bg-white p-5
      shadow-[0_10px_30px_-25px_rgba(34,45,84,.25)] sm:flex-row sm:items-center sm:p-6
    "
  >
    <div>
      <p class="mb-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-violet-600">
        AfterSchool / Admin
      </p>
      <h1
        class="font-sans tracking-tight text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[29px]"
      >
        {{ sectionTitles[activeSection] || 'Admin' }}
      </h1>
      <p class="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
        Everything you need to manage your classes.
      </p>
    </div>
    <button
      type="button"
      class="
        inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200
        bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50
        disabled:cursor-not-allowed disabled:opacity-50 self-start whitespace-nowrap sm:self-auto
      "
      @click="emit('logout')"
    >
      <AppIcon name="log-out" :size="17" />
      Log out
    </button>
  </header>
</template>
