<script setup>
import { ref, onMounted } from 'vue'
import { getLessons } from '../../services/api.js'
import { getAdminOrders } from '../../services/adminApi.js'
import { useAdminAuth } from '../../composables/useAdminAuth.js'
import OrderTable from '../../components/admin/OrderTable.vue'
import AppIcon from '../../components/layout/AppIcon.vue'

const { token } = useAdminAuth()
const orders = ref([])
const lessons = ref([])
const loading = ref(false)
const error = ref('')

const loadOrders = async () => {
  loading.value = true
  error.value = ''
  try {
    const [orderData, lessonData] = await Promise.all([
      getAdminOrders(token.value),
      getLessons(),
    ])
    if (!Array.isArray(orderData) || !Array.isArray(lessonData)) {
      throw new Error('Invalid orders API response')
    }
    orders.value = orderData
    lessons.value = lessonData
  } catch (err) {
    error.value = err.message
    console.error('Load orders error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadOrders)
</script>

<template>
  <section class="motion-safe:transition-all motion-safe:duration-700">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
          All orders
          <span class="text-violet-600">
            ({{ orders.length }})
          </span>
        </h2>
        <p class="mt-1 text-xs text-slate-500">
          Review bookings and customer details.
        </p>
      </div>
      <button
        type="button"
        class="
          inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200
          bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50
          disabled:cursor-not-allowed disabled:opacity-50
        "
        :disabled="loading"
        @click="loadOrders"
      >
        <AppIcon name="refresh-cw" :size="17" />
        {{ loading ? 'Loading...' : 'Refresh orders' }}
      </button>
    </div>
    <p
      v-if="error"
      class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 mb-5"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-if="loading"
      class="
        rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
        p-6 text-sm text-slate-500
      "
    >
      Loading orders...
    </p>
    <OrderTable v-else-if="!error" :orders="orders" :lessons="lessons" />
  </section>
</template>
