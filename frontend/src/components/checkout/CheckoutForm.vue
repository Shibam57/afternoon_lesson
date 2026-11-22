<script setup>
import { ref, computed } from 'vue'
import { validateName, validatePhone } from '../../utils/validation.js'
import AppIcon from '../layout/AppIcon.vue'

const props = defineProps({
  hasItems: { type: Boolean, default: false },
  isSubmitting: { type: Boolean, default: false },
  orderSaved: { type: Boolean, default: false },
})
const emit = defineEmits(['checkout'])
const name = ref('')
const phone = ref('')
const isValid = computed(() => validateName(name.value) && validatePhone(phone.value))
const submitCheckout = () => {
  if (!isValid.value || !props.hasItems || props.isSubmitting || props.orderSaved) return
  emit('checkout', { name: name.value.trim(), phone: phone.value.trim() })
}
</script>

<template>
  <form class="mt-6" @submit.prevent="submitCheckout">
    <h2 class="font-sans tracking-tight mb-1 text-xl font-extrabold text-slate-900">
      Your details
    </h2>
    <p class="mb-5 text-xs leading-5 text-slate-500">
      Enter your details to complete your booking.
    </p>
    <div class="mb-4">
      <label for="customerName" class="mb-2 block text-xs font-bold tracking-wide text-slate-600">
        Full name
      </label>
      <div class="relative">
        <AppIcon
          name="user"
          :size="17"
          class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          id="customerName"
          v-model="name"
          class="
            block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
            focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
            disabled:bg-slate-100 pl-10
          "
          type="text"
          autocomplete="name"
          placeholder="Your full name"
          :disabled="isSubmitting || orderSaved"
          :aria-invalid="Boolean(name && !validateName(name))"
          required
        />
      </div>
      <small v-if="name && !validateName(name)" class="mt-1.5 block text-xs text-rose-600">
        Use letters and spaces only.
      </small>
    </div>
    <div class="mb-5">
      <label for="customerPhone" class="mb-2 block text-xs font-bold tracking-wide text-slate-600">
        Phone number
      </label>
      <div class="relative">
        <AppIcon
          name="phone"
          :size="17"
          class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          id="customerPhone"
          v-model="phone"
          class="
            block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
            text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
            focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
            disabled:bg-slate-100 pl-10
          "
          type="tel"
          autocomplete="tel"
          inputmode="numeric"
          placeholder="10–15 digit phone number"
          :disabled="isSubmitting || orderSaved"
          :aria-invalid="Boolean(phone && !validatePhone(phone))"
          required
        />
      </div>
      <small v-if="phone && !validatePhone(phone)" class="mt-1.5 block text-xs text-rose-600">
        Enter 10–15 digits, not all zeros.
      </small>
    </div>
    <button
      type="submit"
      class="
        inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3
        font-bold text-white shadow-lg shadow-violet-200/70 transition-all duration-300
        hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70
        active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300
        disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-violet-500 w-full py-3.5
      "
      :disabled="!isValid || !hasItems || isSubmitting || orderSaved"
    >
      <AppIcon :name="orderSaved ? 'check' : 'shopping-bag'" :size="18" />
      {{ isSubmitting ? 'Processing your booking...' : orderSaved ? 'Order saved' : 'Complete booking' }}
      <AppIcon v-if="!isSubmitting && !orderSaved" name="arrow-right" :size="18" />
    </button>
    <p
      class="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-400"
    >
      <AppIcon name="shield-check" :size="15" />
      Booking details sent securely to the server
    </p>
  </form>
</template>
