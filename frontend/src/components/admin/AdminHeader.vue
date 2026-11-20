
<script setup>
const emit = defineEmits(["logout"]);
</script>

<template>
  <header class="admin-page-header">
    <div>
      <h1>Dashboard Overview</h1>
      <p>Welcome to AfterSchool Management.</p>
    </div>

    <button
      type="button"
      class="admin-logout-btn"
      @click="emit('logout')"
    >
      Logout
    </button>
  </header>
</template>
