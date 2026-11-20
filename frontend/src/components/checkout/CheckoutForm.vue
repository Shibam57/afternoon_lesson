
<script setup>
import { ref, computed } from "vue";
import { validateName, validatePhone } from "../../utils/validation.js";

defineProps({
  hasItems: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["checkout"]);

const name = ref("");
const phone = ref("");

const isValid = computed(() => {
  return validateName(name.value) &&
         validatePhone(phone.value);
});

const submitCheckout = () => {
  if (!isValid.value) return;

  emit("checkout", {
    name: name.value.trim(),
    phone: phone.value.trim()
  });
};
</script>

<template>
  <form class="checkout-form" @submit.prevent="submitCheckout">
    <h2>Checkout Details</h2>

    <div class="form-group">
      <label for="customerName">Full Name</label>

      <input
        id="customerName"
        v-model="name"
        type="text"
        placeholder="Enter your full name"
        required
      />

      <small v-if="name && !validateName(name)">
        Name must contain letters only.
      </small>
    </div>

    <div class="form-group">
      <label for="customerPhone">Phone Number</label>

      <input
        id="customerPhone"
        v-model="phone"
        type="tel"
        inputmode="numeric"
        placeholder="Enter your phone number"
        required
      />

      <small v-if="phone && !validatePhone(phone)">
        Phone must contain numbers only.
      </small>
    </div>

    
    <button
        type="submit"
        class="checkout-btn"
        :disabled="!isValid || !hasItems || isSubmitting || orderSaved"
    >
    {{
        isSubmitting
        ? "Submitting..."
        : orderSaved
            ? "Order Saved"
            : "Checkout"
    }}
</button>

  </form>
</template>
