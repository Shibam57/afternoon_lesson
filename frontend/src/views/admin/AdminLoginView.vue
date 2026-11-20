
<script setup>
import { ref } from "vue";
import { useAdminAuth } from "../../composables/useAdminAuth.js";

const emit = defineEmits(["login-success", "back"]);

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const { login } = useAdminAuth();

const handleLogin = async () => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";

  try {
    await login(email.value.trim(), password.value);

    emit("login-success");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="admin-login-page">
    <form class="admin-login-form" @submit.prevent="handleLogin">
      <h1>Admin Login</h1>

      <p>Sign in to manage after-school classes.</p>

      <div class="admin-form-field">
        <label for="adminEmail">Email Address</label>

        <input
          id="adminEmail"
          v-model.trim="email"
          type="email"
          autocomplete="username"
          placeholder="Enter admin email"
          required
        />
      </div>

      <div class="admin-form-field">
        <label for="adminPassword">Password</label>

        <input
          id="adminPassword"
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="Enter password"
          required
        />
      </div>

      <p v-if="error" class="admin-error" role="alert">
        {{ error }}
      </p>

      <button
        type="submit"
        class="admin-login-btn"
        :disabled="loading"
      >
        {{ loading ? "Logging in..." : "Login to Dashboard" }}
      </button>

      <button
        type="button"
        class="admin-back-btn"
        @click="emit('back')"
      >
        Back to Lessons
      </button>
    </form>
  </section>
</template>
