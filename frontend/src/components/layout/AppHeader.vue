<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  cartCount: { type: Number, default: 0 },
  activePage: { type: String, default: 'lessons' },
})
const emit = defineEmits(['toggle-cart', 'show-lessons', 'browse-lessons', 'open-admin'])
const mobileOpen = ref(false)
const navigate = (event) => {
  mobileOpen.value = false
  emit(event)
}
</script>

<template>
  <header
    class="
      sticky top-0 z-50 border-b border-slate-100/90 bg-white/95
      shadow-[0_4px_30px_-20px_rgba(33,40,84,.3)] backdrop-blur-xl
    "
  >
    <div
      class="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 flex h-[74px] items-center justify-between gap-3 lg:h-[84px]"
    >
      <button
        type="button"
        class="flex shrink-0 items-center gap-2.5 text-left"
        aria-label="AfterSchool home"
        @click="navigate('show-lessons')"
      >
        <span
          class="
            relative flex h-10 w-10 items-center justify-center rounded-[14px] bg-violet-600 text-white
            shadow-lg shadow-violet-200 sm:h-11 sm:w-11
          "
        >
          <AppIcon name="sparkles" :size="23" />
          <span
            class="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-orange-400"
          >
          </span>
        </span>
        <span
          class="font-sans tracking-tight text-[21px] font-extrabold tracking-[-.055em] text-slate-900 sm:text-[25px]"
        >
          after
          <span class="text-violet-600">
            school.
          </span>
        </span>
      </button>
      <nav
        class="hidden items-center gap-1 rounded-full bg-slate-50 p-1.5 md:flex"
        aria-label="Main navigation"
      >
        <button
          type="button"
          class="rounded-full px-5 py-2.5 text-sm font-bold transition"
          :class="props.activePage === 'lessons' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'"
          @click="navigate('show-lessons')"
        >
          Home
        </button>
        <button
          type="button"
          class="rounded-full px-5 py-2.5 text-sm font-bold text-slate-500 transition hover:text-violet-700"
          @click="navigate('browse-lessons')"
        >
          Explore lessons
        </button>
        <button
          type="button"
          class="rounded-full px-5 py-2.5 text-sm font-bold transition"
          :class="props.activePage === 'admin' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-violet-700'"
          @click="navigate('open-admin')"
        >
          Admin
        </button>
      </nav>
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          class="
            relative inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-violet-100
            bg-violet-50 px-3.5 text-violet-800 transition hover:bg-violet-100 sm:h-12 sm:px-4
          "
          :aria-label="`Open cart with ${cartCount} items`"
          @click="navigate('toggle-cart')"
        >
          <AppIcon name="shopping-bag" :size="19" />
          <span class="hidden text-sm font-extrabold sm:inline">
            My cart
          </span>
          <span
            class="
              flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-violet-600 px-1.5
              text-[11px] font-extrabold text-white
            "
            aria-live="polite"
          >
            {{ cartCount }}
          </span>
        </button>
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 md:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <AppIcon :name="mobileOpen ? 'x' : 'menu'" :size="23" />
        </button>
      </div>
    </div>
    <nav
      v-if="mobileOpen"
      id="mobile-navigation"
      class="border-t border-slate-100 bg-white px-4 pb-4 pt-2 shadow-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div class="mx-auto flex max-w-[1280px] flex-col gap-1">
        <button
          type="button"
          class="rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-violet-50"
          @click="navigate('show-lessons')"
        >
          Home
        </button>
        <button
          type="button"
          class="rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-violet-50"
          @click="navigate('browse-lessons')"
        >
          Explore lessons
        </button>
        <button
          type="button"
          class="rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-violet-50"
          @click="navigate('open-admin')"
        >
          Admin dashboard
        </button>
      </div>
    </nav>
  </header>
</template>
