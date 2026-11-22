<script setup>
import { ref } from 'vue'
import { getLessons, createOrder, updateLesson } from '../../services/api.js'
import { useCart } from '../../composables/useCart.js'
import CartItem from '../../components/cart/CartItem.vue'
import CartSummary from '../../components/cart/CartSummary.vue'
import CheckoutForm from '../../components/checkout/CheckoutForm.vue'
import OrderSuccess from '../../components/checkout/OrderSuccess.vue'
import AppIcon from '../../components/layout/AppIcon.vue'

const emit = defineEmits(['back-to-lessons'])
const { cartItems, clearCart } = useCart()
const checkoutMessage = ref('')
const submitting = ref(false)
const orderSaved = ref(false)
const checkoutComplete = ref(false)
const completedOrderId = ref('')

// Keep the original backend order format and post-order lesson update behavior.
const handleCheckout = async (customer) => {
  if (submitting.value || orderSaved.value || cartItems.value.length === 0) return
  submitting.value = true
  checkoutMessage.value = ''
  try {
    const latestLessons = await getLessons()
    const updates = cartItems.value.map((item) => {
      const latest = latestLessons.find((lesson) => String(lesson._id) === String(item.lesson._id))
      if (!latest || !Number.isInteger(Number(latest.space)) || Number(latest.space) < item.quantity) {
        throw new Error(`Not enough spaces for ${item.lesson.topic}`)
      }
      return { id: item.lesson._id, remainingSpaces: Number(latest.space) - item.quantity }
    })
    const orderData = {
      name: customer.name,
      phone: customer.phone,
      items: cartItems.value.map((item) => ({ lessonId: item.lesson._id, quantity: item.quantity })),
    }
    const result = await createOrder(orderData)
    orderSaved.value = true
    completedOrderId.value = result.order?._id || ''
    for (const item of updates) await updateLesson(item.id, { space: item.remainingSpaces })
    clearCart()
    checkoutComplete.value = true
  } catch (error) {
    console.error('Checkout error:', error)
    checkoutMessage.value = orderSaved.value
      ? 'Order saved, but availability could not be fully updated. Do not submit again. Check MongoDB records.'
      : `Checkout could not be confirmed: ${error.message}. Check MongoDB before retrying.`
  } finally { submitting.value = false }
}
</script>

<template>
  <section class="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 pb-16 pt-9 sm:pt-12">
    <button
      type="button"
      class="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-violet-700"
      @click="emit('back-to-lessons')"
    >
      <AppIcon name="arrow-left" :size="18" />
      Continue exploring
    </button>
    <div v-if="checkoutComplete">
      <OrderSuccess :order-id="completedOrderId" />
      <div class="mt-6 text-center">
        <button
          type="button"
          class="
            inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3
            font-bold text-white shadow-lg shadow-violet-200/70 transition-all duration-300
            hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70
            active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300
            disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-violet-500
          "
          @click="emit('back-to-lessons')"
        >
          Discover more lessons
          <AppIcon name="arrow-right" :size="17" />
        </button>
      </div>
    </div>
    <template v-else>
      <div class="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            class="
              inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-extrabold
              uppercase tracking-[.12em] text-violet-700
            "
          >
            <AppIcon name="shopping-bag" :size="15" />
            Almost there
          </span>
          <h1
            class="font-sans tracking-tight mt-3 text-[33px] font-extrabold tracking-tight text-slate-900 sm:text-[43px]"
          >
            Your shopping
            <span class="text-violet-600">
              cart
            </span>
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            Review your lessons before making them yours.
          </p>
        </div>
        <div class="hidden items-center gap-2 text-xs font-extrabold text-slate-500 sm:flex">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white">
            1
          </span>
          Your cart
          <span class="mx-2 h-px w-6 bg-slate-200">
          </span>
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-800">
            2
          </span>
          Checkout
        </div>
      </div>
      <div v-if="cartItems.length" class="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_370px]">
        <div class="space-y-4">
          <p class="mb-3 text-xs font-extrabold uppercase tracking-[.14em] text-slate-500">
            Selected lessons ({{ cartItems.length }})
          </p>
          <CartItem
            v-for="item in cartItems"
            :key="item.lesson._id"
            :item="item"
            :disabled="submitting || orderSaved"
          />
        </div>
        <aside
          class="
            rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
            p-5 sm:p-7 lg:sticky lg:top-28
          "
        >
          <CartSummary />
          <CheckoutForm
            :has-items="cartItems.length > 0"
            :is-submitting="submitting"
            :order-saved="orderSaved"
            @checkout="handleCheckout"
          />
          <p
            v-if="checkoutMessage"
            class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 mt-5"
            role="alert"
          >
            {{ checkoutMessage }}
          </p>
        </aside>
      </div>
      <div
        v-else
        class="
          rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
          mx-auto flex max-w-2xl flex-col items-center px-6 py-16 text-center
        "
      >
        <span
          class="mb-6 flex h-24 w-24 items-center justify-center rounded-[30px] bg-violet-50 text-violet-600"
        >
          <AppIcon name="shopping-bag" :size="46" />
        </span>
        <h2 class="font-sans tracking-tight text-2xl font-extrabold text-slate-900">
          Your cart is waiting for an adventure.
        </h2>
        <p class="mt-3 max-w-md text-sm leading-6 text-slate-500">
          Looks like you haven't chosen any lessons yet. Browse our activities and find something you'll love.
        </p>
        <button
          type="button"
          class="
            inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3
            font-bold text-white shadow-lg shadow-violet-200/70 transition-all duration-300
            hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70
            active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300
            disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-violet-500 mt-7
          "
          @click="emit('back-to-lessons')"
        >
          Explore lessons
          <AppIcon name="arrow-right" :size="17" />
        </button>
      </div>
    </template>
  </section>
</template>
