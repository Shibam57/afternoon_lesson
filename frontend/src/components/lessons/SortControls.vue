<script setup>
import AppIcon from '../layout/AppIcon.vue'
defineProps({
  sortBy: { type: String, default: 'topic' },
  sortOrder: { type: String, default: 'asc' },
})
const emit = defineEmits(['sort-change', 'order-change'])
</script>

<template>
  <div class="flex min-w-0 flex-[1.4] flex-col gap-3 sm:flex-row">
    <div class="min-w-0 flex-1">
      <label for="sortBy" class="mb-2 block text-xs font-bold tracking-wide text-slate-600">
        Sort by
      </label>
      <div class="relative">
        <AppIcon
          name="sliders-horizontal"
          :size="17"
          class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-600"
        />
        <select
          id="sortBy"
          class="
            block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
            focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
            disabled:bg-slate-100 h-[48px] appearance-none pl-10 pr-9
          "
          :value="sortBy"
          @change="emit('sort-change', $event.target.value)"
        >
          <option value="topic">
            Subject
          </option>
          <option value="location">
            Location
          </option>
          <option value="price">
            Price
          </option>
          <option value="space">
            Available spaces
          </option>
        </select>
        <AppIcon
          name="chevron-down"
          :size="16"
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
    <div class="min-w-0 flex-1">
      <label for="sortOrder" class="mb-2 block text-xs font-bold tracking-wide text-slate-600">
        Order
      </label>
      <div class="relative">
        <select
          id="sortOrder"
          class="
            block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
            focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
            disabled:bg-slate-100 h-[48px] appearance-none pr-9
          "
          :value="sortOrder"
          @change="emit('order-change', $event.target.value)"
        >
          <option value="asc">
            Ascending
          </option>
          <option value="desc">
            Descending
          </option>
        </select>
        <AppIcon
          name="chevron-down"
          :size="16"
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  </div>
</template>
