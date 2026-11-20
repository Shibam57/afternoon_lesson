
<script setup>
import { ref, onMounted } from "vue";

import { getLessons } from "../../services/api.js";
import { getAdminOrders } from "../../services/adminApi.js";
import { useAdminAuth } from "../../composables/useAdminAuth.js";

import OrderTable from "../../components/admin/OrderTable.vue";

const { token } = useAdminAuth();

const orders = ref([]);
const lessons = ref([]);

const loading = ref(false);
const error = ref("");

const loadOrders = async () => {
  loading.value = true;
  error.value = "";

  try {
    const [orderData, lessonData] = await Promise.all([
      getAdminOrders(token.value),
      getLessons()
    ]);

    if (
      !Array.isArray(orderData) ||
      !Array.isArray(lessonData)
    ) {
      throw new Error("Invalid orders API response");
    }

    orders.value = orderData;
    lessons.value = lessonData;

  } catch (err) {
    error.value = err.message;
    console.error("Load orders error:", err);

  } finally {
    loading.value = false;
  }
};

onMounted(loadOrders);
</script>

<template>
  <section class="admin-manage-orders">

    <div class="admin-lesson-toolbar">
      <h2>All Orders ({{ orders.length }})</h2>

      <button
        type="button"
        class="admin-refresh-btn"
        :disabled="loading"
        @click="loadOrders"
      >
        {{ loading ? "Loading..." : "Refresh Orders" }}
      </button>
    </div>

    <p
      v-if="error"
      class="admin-error"
      role="alert"
    >
      {{ error }}
    </p>

    <p v-if="loading">
      Loading orders...
    </p>

    <OrderTable
      v-else-if="!error"
      :orders="orders"
      :lessons="lessons"
    />

  </section>
</template>
