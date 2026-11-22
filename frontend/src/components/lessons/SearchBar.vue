<script setup>
import { ref } from 'vue'
import AppIcon from '../layout/AppIcon.vue'
const emit = defineEmits(['search'])
const query = ref('')
const submitSearch = () => emit('search', query.value.trim())
const clearSearch = () => { query.value = ''; emit('search', '') }
</script>

<template>
  <form class="flex w-full flex-col gap-3 sm:flex-row" role="search" @submit.prevent="submitSearch">
    <div class="relative min-w-0 flex-1">
      <AppIcon
        name="search"
        :size="19"
        class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        v-model="query"
        type="search"
        class="
          block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
          text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
          focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
          disabled:bg-slate-100 h-[52px] pl-12 pr-4
        "
        placeholder="Search your next adventure..."
        aria-label="Search lessons"
      />
    </div>
    <div class="flex gap-2">
      <button
        type="submit"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3
          font-bold text-white shadow-lg shadow-violet-200/70 transition-all duration-300
          hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70
          active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300
          disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-violet-500 h-[52px] flex-1 px-6 sm:flex-initial
        "
      >
        <AppIcon name="search" :size="17" />
        Search
      </button>
      <button
        v-if="query"
        type="button"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200
          bg-white px-5 py-3 font-bold text-slate-700 transition-all duration-300 hover:border-violet-200
          hover:bg-violet-50 hover:text-violet-800 disabled:cursor-not-allowed disabled:opacity-50
          h-[52px] px-4
        "
        aria-label="Clear search"
        @click="clearSearch"
      >
        <AppIcon name="x" :size="17" />
      </button>
    </div>
  </form>
</template>
