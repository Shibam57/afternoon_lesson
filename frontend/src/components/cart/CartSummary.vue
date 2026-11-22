<script setup>
import { useCart } from '../../composables/useCart.js'
import AppIcon from '../layout/AppIcon.vue'
const { cartCount, cartTotal } = useCart()
</script>

<template>
  <div class="border-b border-slate-100 pb-5">
    <div class="mb-5 flex items-center gap-2">
      <AppIcon name="receipt" :size="21" class="text-violet-600" />
      <h3 class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
        Order summary
      </h3>
    </div>
    <div class="space-y-3 text-sm">
      <div class="flex items-center justify-between text-slate-500">
        <span>
          Selected spaces
        </span>
        <strong class="text-slate-900">
          {{ cartCount }}
        </strong>
      </div>
      <div class="flex items-center justify-between text-slate-500">
        <span>
          Booking fee
        </span>
        <span class="font-bold text-emerald-600">
          Free
        </span>
      </div>
    </div>
    <div class="mt-5 flex items-end justify-between border-t border-dashed border-slate-200 pt-5">
      <span class="text-sm font-bold text-slate-600">
        Total
      </span>
      <span class="font-sans tracking-tight text-[29px] font-extrabold leading-none text-slate-900">
        £{{ cartTotal.toFixed(2) }}
      </span>
    </div>
  </div>
</template>
