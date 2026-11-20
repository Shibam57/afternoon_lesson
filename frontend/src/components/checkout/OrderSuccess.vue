
<script setup>
defineProps({
  orderId: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div class="order-success">
    <h2>Order Placed Successfully!</h2>

    <p>
      Thank you! Your after-school classes
      have been booked successfully.
    </p>

    <p v-if="orderId">
      Order ID: {{ orderId }}
    </p>
  </div>
</template>
