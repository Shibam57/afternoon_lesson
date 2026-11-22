<script setup>
import AppIcon from '../layout/AppIcon.vue'
defineProps({ activeSection: { type: String, default: 'dashboard' } })
const emit = defineEmits(['navigate'])
const links = [
  { id: 'dashboard', label: 'Overview', icon: 'layout-dashboard' },
  { id: 'lessons', label: 'Lessons', icon: 'book-open' },
  { id: 'teachers', label: 'Teachers', icon: 'users' },
  { id: 'orders', label: 'Orders', icon: 'receipt' },
]
</script>

<template>
  <aside
    class="
      w-full shrink-0 border-b border-slate-100 bg-white p-4 lg:min-h-[720px] lg:w-[245px]
      lg:rounded-[26px] lg:border lg:p-5 lg:shadow-[0_15px_50px_-30px_rgba(34,45,84,.2)]
    "
  >
    <div class="mb-7 hidden items-center gap-3 border-b border-slate-100 pb-6 lg:flex">
      <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white">
        <AppIcon name="layout-dashboard" :size="22" />
      </div>
      <div>
        <h2 class="font-sans tracking-tight text-lg font-extrabold text-slate-900">
          Admin panel
        </h2>
        <p class="text-xs font-semibold text-slate-400">
          Workspace
        </p>
      </div>
    </div>
    <p class="mb-3 hidden px-3 text-[10px] font-extrabold uppercase tracking-[.17em] text-slate-400 lg:block">
      Management
    </p>
    <nav class="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin navigation">
      <button
        v-for="link in links"
        :key="link.id"
        type="button"
        class="
          flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-extrabold
          transition-all sm:text-sm lg:w-full
        "
        :class="activeSection === link.id ? 'bg-violet-600 text-white shadow-md shadow-violet-100' : 'text-slate-500 hover:bg-violet-50 hover:text-violet-800'"
        :aria-current="activeSection === link.id ? 'page' : undefined"
        @click="emit('navigate', link.id)"
      >
        <AppIcon :name="link.icon" :size="18" />
        <span>
          {{ link.label }}
        </span>
      </button>
    </nav>
    <div class="mt-12 hidden rounded-2xl bg-gradient-to-br from-[#edebff] to-[#faf0ff] px-4 py-6 lg:block">
      <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-700">
        <AppIcon name="sparkles" :size="18" />
      </span>
      <p class="font-sans tracking-tight text-sm font-extrabold text-slate-900">
        Make learning magical
      </p>
      <p class="mt-1 text-xs leading-5 text-slate-500">
        Help every learner find their spark.
      </p>
    </div>
  </aside>
</template>
