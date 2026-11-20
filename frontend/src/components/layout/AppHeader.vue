
<script setup>
defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits([
  "toggle-cart",
  "show-lessons",
  "open-admin"
]);
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <div class="logo">
        <h2>AfterSchool</h2>
      </div>

      
<nav class="navbar">
  <button
    type="button"
    class="nav-link"
    @click="emit('show-lessons')"
  >
    Home
  </button>

  <button
    type="button"
    class="nav-link"
    @click="emit('show-lessons')"
  >
    Lessons
  </button>

  <button
    type="button"
    class="nav-link"
    @click="emit('open-admin')"
  >
    Admin
  </button>
</nav>


      <button
        class="cart-btn"
        :disabled="cartCount === 0"
        @click="emit('toggle-cart')"
      >
        🛒 Cart ({{ cartCount }})
      </button>
    </div>
  </header>
</template>
