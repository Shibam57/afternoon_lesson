
<script setup>
import { getImageUrl } from "../../utils/imageUrl.js";

defineProps({
  lessons: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["edit"]);
</script>

<template>
  <div class="admin-table-wrapper">
    <table class="admin-lesson-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Subject</th>
          <th>Location</th>
          <th>Price</th>
          <th>Spaces</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="lesson in lessons"
          :key="lesson._id"
        >
          <td>
            <img
              v-if="lesson.image"
              :src="getImageUrl(lesson.image)"
              :alt="lesson.topic"
              class="admin-lesson-thumb"
            />
            <span v-else>No Image</span>
          </td>

          <td>{{ lesson.topic }}</td>
          <td>{{ lesson.location }}</td>
          <td>£{{ Number(lesson.price).toFixed(2) }}</td>
          <td>{{ lesson.space }}</td>

          <td>
            <button
                class="admin-edit-btn"
                @click="$emit('edit', lesson)"
            >
                Edit
            </button>
          </td>
        </tr>

        <tr v-if="lessons.length === 0">
          <td colspan="6">No lessons available.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
