
<script setup>
defineProps({
  activeSection: {
    type: String,
    default: "dashboard"
  }
});

const emit = defineEmits(["navigate"]);
</script>

<template>
  <aside class="admin-sidebar">
    <h2 class="admin-sidebar-brand">Admin Panel</h2>

    <nav class="admin-nav" aria-label="Admin navigation">

      <button
        class="admin-nav-item"
        :class="{ 'admin-nav-active': activeSection === 'dashboard' }"
        @click="emit('navigate', 'dashboard')"
      >
        Dashboard
      </button>

      <button
        class="admin-nav-item"
        :class="{ 'admin-nav-active': activeSection === 'lessons' }"
        @click="emit('navigate', 'lessons')"
      >
        Manage Lessons
      </button>

      
        <button
        type="button"
        class="admin-nav-item"
        :class="{ 'admin-nav-active': activeSection === 'teachers' }"
        @click="emit('navigate', 'teachers')"
        >
            Manage Teachers
        </button>


      
        <button
        type="button"
        class="admin-nav-item"
        :class="{ 'admin-nav-active': activeSection === 'orders' }"
        @click="emit('navigate', 'orders')"
        >
            Manage Orders
        </button>


    </nav>
  </aside>
</template>
