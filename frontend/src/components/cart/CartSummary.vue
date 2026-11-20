
<script setup>
import { useCart } from "../../composables/useCart.js";

const { cartCount, cartTotal } = useCart();
</script>

<template>
  <div class="cart-summary">
    <h3>Order Summary</h3>

    <p>Total Spaces: {{ cartCount }}</p>

    <h3>Total Price: £{{ cartTotal.toFixed(2) }}</h3>
  </div>
</template>
