<script setup>
import AppIcon from '../layout/AppIcon.vue'
defineProps({ orderId: { type: String, default: '' } })
</script>

<template>
  <div
    class="
      rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
      mx-auto flex max-w-2xl flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-16
    "
  >
    <div
      class="relative mb-7 flex h-24 w-24 items-center justify-center rounded-[30px] bg-emerald-50 text-emerald-600"
    >
      <AppIcon name="check-circle" :size="53" :stroke-width="1.6" />
      <span class="absolute -right-3 -top-2 text-3xl">
        ✨
      </span>
    </div>
    <span
      class="
        inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-extrabold
        uppercase tracking-[.12em] text-violet-700 bg-emerald-50 text-emerald-700
      "
    >
      You're all set
    </span>
    <h2
      class="font-sans tracking-tight mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
    >
      Your adventure is booked!
    </h2>
    <p class="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
      Thank you! Your after-school lessons have been booked successfully. Get ready to learn something wonderful.
    </p>
    <div
      v-if="orderId"
      class="mt-6 w-full max-w-md rounded-2xl border border-dashed border-violet-200 bg-violet-50 p-4"
    >
      <p class="text-[11px] font-extrabold uppercase tracking-widest text-violet-700">
        Order reference
      </p>
      <p class="mt-1 break-all font-mono text-sm font-bold text-slate-900">
        {{ orderId }}
      </p>
    </div>
  </div>
</template>
