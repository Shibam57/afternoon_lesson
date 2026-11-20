
<script setup>
import { ref } from "vue";

import {
  getLessons,
  createOrder,
  updateLesson
} from "../../services/api.js";

import { useCart } from "../../composables/useCart.js";

import CartItem from "../../components/cart/CartItem.vue";
import CartSummary from "../../components/cart/CartSummary.vue";
import CheckoutForm from "../../components/checkout/CheckoutForm.vue";
import OrderSuccess from "../../components/checkout/OrderSuccess.vue";

defineEmits(["back-to-lessons"]);

// Shopping cart
const { cartItems, clearCart } = useCart();

// Checkout states
const checkoutMessage = ref("");
const submitting = ref(false);
const orderSaved = ref(false);
const checkoutComplete = ref(false);
const completedOrderId = ref("");


const handleCheckout = async (customer) => {
  if (
    submitting.value ||
    orderSaved.value ||
    cartItems.value.length === 0
  ) {
    return;
  }

  submitting.value = true;
  checkoutMessage.value = "";

  try {
    
    const latestLessons = await getLessons();

    
    const updates = cartItems.value.map((item) => {
      const latest = latestLessons.find(
        (lesson) =>
          String(lesson._id) === String(item.lesson._id)
      );

      if (
        !latest ||
        !Number.isInteger(Number(latest.space)) ||
        Number(latest.space) < item.quantity
      ) {
        throw new Error(
          `Not enough spaces for ${item.lesson.topic}`
        );
      }

      return {
        id: item.lesson._id,
        remainingSpaces: Number(latest.space) - item.quantity
      };
    });

    
    const orderData = {
      name: customer.name,
      phone: customer.phone,
      items: cartItems.value.map((item) => ({
        lessonId: item.lesson._id,
        quantity: item.quantity
      }))
    };

    
    const result = await createOrder(orderData);

    console.log("Saved order:", result);

    orderSaved.value = true;

    completedOrderId.value =
      result.order?._id || "";

    
    for (const item of updates) {
      await updateLesson(item.id, {
        space: item.remainingSpaces
      });
    }

    
    clearCart();

    
    checkoutComplete.value = true;

  } catch (error) {
    console.error("Checkout error:", error);

    if (orderSaved.value) {
      checkoutMessage.value =
        "Order saved, but lesson availability could not " +
        "be fully updated. Do not submit again. " +
        "Check MongoDB records.";
    } else {
      checkoutMessage.value =
        "Checkout could not be confirmed: " +
        error.message +
        ". Check MongoDB before retrying.";
    }

  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <section class="page-container cart-page">

    
    <OrderSuccess
      v-if="checkoutComplete"
      :order-id="completedOrderId"
    />

    
    <template v-else>

      <h1 class="page-title">Shopping Cart</h1>

      <div v-if="cartItems.length > 0">
        <div class="cart-items">
          <CartItem
            v-for="item in cartItems"
            :key="item.lesson._id"
            :item="item"
          />
        </div>

        <CartSummary />
      </div>

      <p v-else>
        Your shopping cart is empty.
      </p>

      <CheckoutForm
        :has-items="cartItems.length > 0"
        :is-submitting="submitting"
        :order-saved="orderSaved"
        @checkout="handleCheckout"
      />

      <p
        v-if="checkoutMessage"
        class="checkout-message"
        role="alert"
      >
        {{ checkoutMessage }}
      </p>

    </template>

    <button
      class="back-btn"
      @click="$emit('back-to-lessons')"
    >
      Back to Lessons
    </button>

  </section>
</template>
