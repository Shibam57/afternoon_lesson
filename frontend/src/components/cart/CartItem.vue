
<script setup>
import { useCart } from "../../composables/useCart.js";

defineProps({
  item: {
    type: Object,
    required: true
  }
});

const { removeFromCart } = useCart();
</script>

<template>
  <div class="cart-item">
    <div class="cart-item-info">
      <h3>{{ item.lesson.topic }}</h3>

      <p>Location: {{ item.lesson.location }}</p>
      <p>Price: £{{ item.lesson.price }}</p>
      <p>Quantity: {{ item.quantity }}</p>
    </div>

    <button
      class="remove-btn"
      @click="removeFromCart(item.lesson._id)"
    >
      Remove One
    </button>
  </div>
</template>
