
<script setup>
import { ref } from "vue";

const props = defineProps({
  lesson: {
    type: Object,
    default: null
  },
  saving: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["save", "cancel"]);

const isEditing = Boolean(props.lesson);


const topic = ref(props.lesson?.topic ?? "");
const location = ref(props.lesson?.location ?? "");
const price = ref(props.lesson?.price ?? 0);
const space = ref(props.lesson?.space ?? 5);

const image = ref(null);
const fileError = ref("");

const handleFileChange = (event) => {
  const file = event.target.files?.[0];

  fileError.value = "";
  image.value = null;

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    fileError.value = "Maximum image size is 5 MB";
    return;
  }

  image.value = file;
};

const submitLesson = () => {
  if (props.saving) return;

  const lessonData = {
    topic: topic.value.trim(),
    location: location.value.trim(),
    price: Number(price.value),
    space: Number(space.value)
  };

  if (
    !lessonData.topic ||
    !lessonData.location ||
    !Number.isFinite(lessonData.price) ||
    lessonData.price < 0 ||
    !Number.isInteger(lessonData.space) ||
    lessonData.space < 0
  ) {
    return;
  }

  // Editing: send JSON data
  if (isEditing) {
    emit("save", lessonData);
    return;
  }


  if (!image.value || fileError.value) return;

  const formData = new FormData();

  Object.entries(lessonData).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  formData.append("image", image.value);

  emit("save", formData);
};
</script>

<template>
  <form
    class="admin-lesson-form"
    @submit.prevent="submitLesson"
  >
    <h2>
      {{ isEditing ? "Edit Lesson" : "Add New Lesson" }}
    </h2>

    <div class="admin-form-field">
      <label for="lessonTopic">Subject</label>
      <input id="lessonTopic" v-model="topic" required />
    </div>

    <div class="admin-form-field">
      <label for="lessonLocation">Location</label>
      <input id="lessonLocation" v-model="location" required />
    </div>

    <div class="admin-form-field">
      <label for="lessonPrice">Price (£)</label>
      <input
        id="lessonPrice"
        v-model.number="price"
        type="number"
        min="0"
        step="0.01"
        required
      />
    </div>

    <div class="admin-form-field">
      <label for="lessonSpace">Available Spaces</label>
      <input
        id="lessonSpace"
        v-model.number="space"
        type="number"
        min="0"
        step="1"
        required
      />
    </div>

    <div v-if="!isEditing" class="admin-form-field">
      <label for="lessonImage">Lesson Image</label>
      <input
        id="lessonImage"
        type="file"
        accept=".jpg,.jpeg,.jfif,.png,.webp"
        @change="handleFileChange"
        required
      />

      <p v-if="fileError" class="admin-error">
        {{ fileError }}
      </p>
    </div>

    <p v-else>
      Existing lesson image will be kept.
    </p>

    <div class="admin-form-actions">
      <button
        type="submit"
        class="admin-save-btn"
        :disabled="saving || !!fileError || (!isEditing && !image)"
      >
        {{
          saving
            ? "Saving..."
            : isEditing
              ? "Update Lesson"
              : "Save Lesson"
        }}
      </button>

      <button
        type="button"
        class="admin-cancel-btn"
        :disabled="saving"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
