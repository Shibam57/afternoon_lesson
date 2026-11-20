
<script setup>
import { ref } from "vue";
import { getImageUrl } from "../../utils/imageUrl.js";
import { useCart } from "../../composables/useCart.js";
import EnrolmentInfo from "./EnrolmentInfo.vue";

defineProps({
  lesson: {
    type: Object,
    required: true
  }
});

const imageFailed = ref(false);

const { addToCart, getAvailableSpaces } = useCart();
</script>

<template>
  <article class="lesson-card">
    <img
      v-if="lesson.image && !imageFailed"
      :src="getImageUrl(lesson.image)"
      :alt="lesson.topic"
      class="lesson-image"
      @error="imageFailed = true"
    />

    <div v-else class="lesson-image-placeholder">
      No Image Available
    </div>

    <div class="lesson-details">
      <h3>{{ lesson.topic }}</h3>

      <p>Location: {{ lesson.location }}</p>
      <p>Price: £{{ lesson.price }}</p>

      <p>
        Available Spaces:
        {{ getAvailableSpaces(lesson) }}
      </p>

        <EnrolmentInfo
            :lesson-id="lesson._id"
        />


      <button
        class="add-cart-btn"
        :disabled="getAvailableSpaces(lesson) === 0"
        @click="addToCart(lesson)"
      >
        {{
          getAvailableSpaces(lesson) === 0
            ? "No Spaces Available"
            : "Add to Cart"
        }}
      </button>
    </div>
  </article>
</template>
