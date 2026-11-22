<script setup>
import { nextTick, ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import LessonsView from './views/user/LessonsView.vue'
import CartView from './views/user/CartView.vue'
import AdminLoginView from './views/admin/AdminLoginView.vue'
import AdminDashboardView from './views/admin/AdminDashboardView.vue'
import { useCart } from './composables/useCart.js'
import { useAdminAuth } from './composables/useAdminAuth.js'

const { cartCount } = useCart()
const { isAuthenticated, logout } = useAdminAuth()
const currentPage = ref('lessons')

const openLessons = async (scrollToCatalog = false) => {
  currentPage.value = 'lessons'
  if (scrollToCatalog) {
    await nextTick()
    document.getElementById('lesson-catalog')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
const openPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const handleLogout = () => {
  logout()
  openPage('admin')
}
</script>

<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden bg-slate-50">
    <AppHeader
      :cart-count="cartCount"
      :active-page="currentPage"
      @toggle-cart="openPage('cart')"
      @show-lessons="openLessons(false)"
      @browse-lessons="openLessons(true)"
      @open-admin="openPage('admin')"
    />
    <main id="main-content" class="min-w-0 flex-1">
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
        mode="out-in"
      >
        <div :key="currentPage">
          <template v-if="currentPage === 'admin'">
            <AdminDashboardView v-if="isAuthenticated" @logout="handleLogout" />
            <AdminLoginView v-else @login-success="openPage('admin')" @back="openLessons(false)" />
          </template>
          <CartView v-else-if="currentPage === 'cart'" @back-to-lessons="openLessons(false)" />
          <LessonsView v-else />
        </div>
      </Transition>
    </main>
    <AppFooter />
  </div>
</template>
