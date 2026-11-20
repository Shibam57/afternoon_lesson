
<script setup>
const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  },
  lessons: {
    type: Array,
    default: () => []
  }
});

const getLessonName = (lessonId) => {
  const lesson = props.lessons.find(
    (item) => String(item._id) === String(lessonId)
  );

  return lesson ? lesson.topic : "Lesson unavailable";
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const value = new Date(date);

  return Number.isNaN(value.getTime())
    ? "Invalid date"
    : value.toLocaleString();
};

const getTotalQuantity = (items = []) => {
  return items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );
};
</script>

<template>
  <div class="admin-table-wrapper">
    <table class="admin-lesson-table admin-order-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Phone</th>
          <th>Purchased Lessons</th>
          <th>Total Spaces</th>
          <th>Order Date</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="order in orders"
          :key="order._id"
        >
          <td>{{ order.name }}</td>

          <td>{{ order.phone }}</td>

          <td>
            <ul class="admin-order-items">
              <li
                v-for="item in order.items"
                :key="item.lessonId"
              >
                {{ getLessonName(item.lessonId) }}
                — Qty: {{ item.quantity }}
              </li>
            </ul>
          </td>

          <td>{{ getTotalQuantity(order.items) }}</td>

          <td>{{ formatDate(order.createdAt) }}</td>
        </tr>

        <tr v-if="orders.length === 0">
          <td colspan="5">
            No orders available.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
