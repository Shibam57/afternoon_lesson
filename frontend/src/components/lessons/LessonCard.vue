<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { getImageUrl } from '../../utils/imageUrl.js'
import { useCart } from '../../composables/useCart.js'
import EnrolmentInfo from './EnrolmentInfo.vue'
import AppIcon from '../layout/AppIcon.vue'

const props = defineProps({ lesson: { type: Object, required: true } })
const imageFailed = ref(false)
const justAdded = ref(false)
let resetTimer
const { addToCart, getAvailableSpaces } = useCart()
const available = computed(() => getAvailableSpaces(props.lesson))
const palette = computed(() => {
  const colors = [
    'from-violet-200 via-purple-100 to-indigo-100',
    'from-sky-200 via-cyan-100 to-teal-100',
    'from-orange-200 via-amber-100 to-yellow-100',
    'from-pink-200 via-rose-100 to-purple-100',
    'from-emerald-200 via-green-100 to-lime-100',
  ]
  const seed = String(props.lesson._id ?? props.lesson.topic ?? '')
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
})
const emoji = computed(() => {
  const subject = String(props.lesson.topic || '').toLowerCase()
  if (/math|number|algebra/.test(subject)) return '📐'
  if (/science|chemistry|physics/.test(subject)) return '🧪'
  if (/art|draw|paint|craft/.test(subject)) return '🎨'
  if (/music|sing|dance/.test(subject)) return '🎵'
  if (/sport|football|basket|swim/.test(subject)) return '🏀'
  if (/code|comput|robot|tech/.test(subject)) return '🤖'
  if (/language|english|read|book/.test(subject)) return '📚'
  return '🌟'
})
const handleAdd = () => {
  if (available.value <= 0) return
  addToCart(props.lesson)
  justAdded.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { justAdded.value = false }, 1700)
}
watch(() => props.lesson.image, () => { imageFailed.value = false })
onUnmounted(() => clearTimeout(resetTimer))
</script>

<template>
  <article
    class="
      group flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-slate-100
      bg-white shadow-[0_12px_32px_-24px_rgba(34,45,84,.55)] transition-all duration-300
      hover:-translate-y-1.5 hover:border-violet-100
      hover:shadow-[0_25px_55px_-28px_rgba(82,62,166,.38)]
    "
  >
    <div class="relative h-48 overflow-hidden sm:h-52">
      <img
        v-if="lesson.image && !imageFailed"
        :src="getImageUrl(lesson.image)"
        :alt="lesson.topic"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imageFailed = true"
      />
      <div
        v-else
        class="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br"
        :class="palette"
        role="img"
        :aria-label="`${lesson.topic} illustration`"
      >
        <div class="absolute -left-7 -top-10 h-32 w-32 rounded-full bg-white/30">
        </div>
        <div class="absolute -bottom-16 -right-4 h-44 w-44 rounded-full border-[20px] border-white/25">
        </div>
        <span
          class="relative text-[75px] drop-shadow-xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
          aria-hidden="true"
        >
          {{ emoji }}
        </span>
      </div>
      <div
        class="
          absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5
          text-[11px] font-extrabold text-violet-800 shadow-sm backdrop-blur
        "
      >
        <span class="h-1.5 w-1.5 rounded-full" :class="available > 0 ? 'bg-emerald-500' : 'bg-rose-400'">
        </span>
        {{ available > 0 ? 'Enrolment open' : 'Fully booked' }}
      </div>
      <span
        class="
          absolute bottom-4 right-4 rounded-xl bg-white/95 px-3 py-2 font-sans tracking-tight text-lg
          font-extrabold text-slate-900 shadow-lg backdrop-blur
        "
      >
        £{{ Number(lesson.price || 0).toFixed(2) }}
      </span>
    </div>
    <div class="flex flex-1 flex-col p-5 sm:p-6">
      <div
        class="
          mb-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1 text-[10px]
          font-extrabold uppercase tracking-[.13em] text-violet-800
        "
      >
        <AppIcon name="sparkles" :size="13" />
        Discover & learn
      </div>
      <h3
        class="font-sans tracking-tight line-clamp-2 text-[21px] font-extrabold leading-[1.2] tracking-tight text-slate-900"
      >
        {{ lesson.topic }}
      </h3>
      <div class="mt-3 flex items-center gap-2 text-sm font-medium text-slate-500">
        <AppIcon name="map-pin" :size="17" class="shrink-0 text-violet-400" />
        <span class="truncate">
          {{ lesson.location }}
        </span>
      </div>
      <div class="mt-5 space-y-2.5 rounded-2xl bg-slate-50 px-4 py-3.5">
        <div class="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>
            Available spaces
          </span>
          <span class="font-extrabold" :class="available > 0 ? 'text-emerald-600' : 'text-rose-500'">
            {{ available }} left
          </span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            class="h-full rounded-full bg-violet-400 transition-all duration-500"
            :style="{ width: `${Math.min(100, Math.max(0, (available / Math.max(1, Number(lesson.space))) * 100))}%` }"
          >
          </div>
        </div>
        <EnrolmentInfo :lesson-id="String(lesson._id)" />
      </div>
      <button
        type="button"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3
          font-bold text-white shadow-lg shadow-violet-200/70 transition-all duration-300
          hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70
          active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300
          disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-violet-500 mt-5 w-full text-sm
        "
        :disabled="available === 0"
        :aria-label="`Add ${lesson.topic} to cart`"
        @click="handleAdd"
      >
        <AppIcon :name="justAdded ? 'check' : 'plus'" :size="18" />
        {{ available === 0 ? 'No spaces available' : justAdded ? 'Added to cart!' : 'Add to cart' }}
      </button>
    </div>
  </article>
</template>
