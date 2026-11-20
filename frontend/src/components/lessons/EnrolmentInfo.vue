
<script setup>
import { ref, watch } from "vue";
import { getEnrolment } from "../../services/api.js";

const props = defineProps({
  lessonId: {
    type: String,
    required: true
  }
});

const enrolment = ref(null);
const loading = ref(true);
const error = ref("");

let requestVersion = 0;

watch(
  () => props.lessonId,
  async (lessonId) => {
    const version = ++requestVersion;

    loading.value = true;
    error.value = "";
    enrolment.value = null;

    try {
      const result = await getEnrolment(lessonId);

      if (version !== requestVersion) return;

      enrolment.value = result;
    } catch (err) {
      if (version === requestVersion) {
        error.value = err.message;
      }
    } finally {
      if (version === requestVersion) {
        loading.value = false;
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="enrolment-info">
    <p v-if="loading">
      Loading enrolment...
    </p>

    <p v-else-if="error" class="error-message">
      Enrolment unavailable
    </p>

    <p v-else>
      Spaces Purchased:
      <strong>{{ enrolment }}</strong>
    </p>
  </div>
</template>
