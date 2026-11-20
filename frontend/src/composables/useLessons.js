
import { ref, onMounted } from "vue";

import {
  getLessons,
  searchLessons
} from "../services/api.js";

export function useLessons() {
  const lessons = ref([]);
  const loading = ref(true);
  const error = ref("");

  let requestVersion = 0;

  const runRequest = async (request) => {
    const version = ++requestVersion;

    loading.value = true;
    error.value = "";

    try {
      const data = await request();

      if (version !== requestVersion) return;

      if (!Array.isArray(data)) {
        throw new Error("Invalid lessons response");
      }

      lessons.value = data;
    } catch (err) {
      if (version === requestVersion) {
        error.value = err.message;
      }
    } finally {
      if (version === requestVersion) {
        loading.value = false;
      }
    }
  };

  const loadLessons = () => {
    return runRequest(getLessons);
  };

  const findLessons = (query) => {
    const searchText = query.trim();

    if (!searchText) {
      return loadLessons();
    }

    return runRequest(() => searchLessons(searchText));
  };

  onMounted(loadLessons);

  return {
    lessons,
    loading,
    error,
    loadLessons,
    findLessons
  };
}
