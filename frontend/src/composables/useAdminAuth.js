
import { ref, computed } from "vue";
import { loginAdmin } from "../services/adminApi.js";

const token = ref("");

const isAuthenticated = computed(() => {
  return Boolean(token.value);
});

export function useAdminAuth() {
  const login = async (email, password) => {
    token.value = await loginAdmin({ email, password });
  };

  const logout = () => {
    token.value = "";
  };

  return {
    token,
    isAuthenticated,
    login,
    logout
  };
}
