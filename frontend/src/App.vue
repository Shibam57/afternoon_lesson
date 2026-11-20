
<script setup>
import { ref } from "vue";

import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";

import LessonsView from "./views/user/LessonsView.vue";
import CartView from "./views/user/CartView.vue";

import AdminLoginView from "./views/admin/AdminLoginView.vue";
import AdminDashboardView from "./views/admin/AdminDashboardView.vue";

import { useCart } from "./composables/useCart.js";
import { useAdminAuth } from "./composables/useAdminAuth.js";

const { cartCount } = useCart();
const { isAuthenticated, logout } = useAdminAuth();

const currentPage = ref("lessons");

const toggleCart = () => {
  if (currentPage.value === "cart") {
    currentPage.value = "lessons";
  } else if (cartCount.value > 0) {
    currentPage.value = "cart";
  }
};

const handleLogout = () => {
  logout();
  currentPage.value = "admin";
};
</script>

<template>
  <AppHeader
    :cart-count="cartCount"
    @toggle-cart="toggleCart"
    @show-lessons="currentPage = 'lessons'"
    @open-admin="currentPage = 'admin'"
  />

  <main class="main-content">

    <template v-if="currentPage === 'admin'">
      <AdminDashboardView
        v-if="isAuthenticated"
        @logout="handleLogout"
      />

      <AdminLoginView
        v-else
        @login-success="currentPage = 'admin'"
        @back="currentPage = 'lessons'"
      />
    </template>

    <CartView
      v-else-if="currentPage === 'cart'"
      @back-to-lessons="currentPage = 'lessons'"
    />

    <LessonsView v-else />

  </main>

  <AppFooter />
</template>
