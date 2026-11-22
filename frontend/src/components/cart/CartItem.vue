<script setup>
import { computed, ref } from 'vue'
import { useCart } from '../../composables/useCart.js'
import { getImageUrl } from '../../utils/imageUrl.js'
import AppIcon from '../layout/AppIcon.vue'
const props = defineProps({ item: { type: Object, required: true }, disabled: { type: Boolean, default: false } })
const { addToCart, removeFromCart, getAvailableSpaces } = useCart()
const imageFailed = ref(false)
const canAdd = computed(() => getAvailableSpaces(props.item.lesson) > 0)
</script>

<template>
  <article
    class="
      rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
      flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5
    "
  >
    <div class="flex min-w-0 items-start gap-4 sm:flex-1 sm:items-center">
      <div
        class="
          flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl
          bg-gradient-to-br from-violet-100 to-orange-100 sm:h-28 sm:w-28
        "
      >
        <img
          v-if="item.lesson.image && !imageFailed"
          :src="getImageUrl(item.lesson.image)"
          :alt="item.lesson.topic"
          class="h-full w-full object-cover"
          @error="imageFailed = true"
        />
        <span v-else aria-hidden="true" class="text-4xl">
          📚
        </span>
      </div>
      <div class="min-w-0 flex-1">
        <p class="mb-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-violet-600">
          After-school lesson
        </p>
        <h3 class="font-sans tracking-tight break-words text-lg font-extrabold text-slate-900 sm:text-xl">
          {{ item.lesson.topic }}
        </h3>
        <p class="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <AppIcon name="map-pin" :size="15" class="shrink-0" />
          {{ item.lesson.location }}
        </p>
        <p class="mt-2 text-sm font-extrabold text-violet-700">
          £{{ Number(item.lesson.price || 0).toFixed(2) }}
          <span class="text-xs font-medium text-slate-400">
            / place
          </span>
        </p>
      </div>
    </div>
    <div
      class="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-0"
    >
      <div
        class="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1"
        :aria-label="`Quantity: ${item.quantity}`"
      >
        <button
          class="
            flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-slate-600 transition
            hover:bg-white disabled:opacity-50
          "
          type="button"
          :disabled="disabled"
          :aria-label="`Remove one ${item.lesson.topic}`"
          @click="removeFromCart(item.lesson._id)"
        >
          −
        </button>
        <span class="min-w-7 text-center text-sm font-extrabold text-slate-900">
          {{ item.quantity }}
        </span>
        <button
          class="
            flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-slate-600 transition
            hover:bg-white disabled:opacity-30
          "
          type="button"
          :disabled="disabled || !canAdd"
          :aria-label="`Add one ${item.lesson.topic}`"
          @click="addToCart(item.lesson)"
        >
          +
        </button>
      </div>
      <span class="font-sans tracking-tight text-lg font-extrabold text-slate-900">
        £{{ (Number(item.lesson.price || 0) * item.quantity).toFixed(2) }}
      </span>
    </div>
  </article>
</template>
