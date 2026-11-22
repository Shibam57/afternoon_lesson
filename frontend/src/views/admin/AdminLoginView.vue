<script setup>
import { ref } from 'vue'
import { useAdminAuth } from '../../composables/useAdminAuth.js'
import AppIcon from '../../components/layout/AppIcon.vue'
const emit = defineEmits(['login-success', 'back'])
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const { login } = useAdminAuth()
const handleLogin = async () => {
  if (loading.value) return
  loading.value = true
  error.value = ''
  try { await login(email.value.trim(), password.value); emit('login-success') }
  catch (err) { error.value = err.message }
  finally { loading.value = false }
}
</script>

<template>
  <section
    class="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 flex min-h-[650px] items-center justify-center py-12 sm:py-16"
  >
    <div
      class="
        grid w-full max-w-[980px] overflow-hidden rounded-[30px] bg-white
        shadow-[0_24px_80px_-34px_rgba(36,34,92,.25)] lg:grid-cols-2
      "
    >
      <div
        class="
          relative hidden min-h-[540px] overflow-hidden bg-gradient-to-br from-[#2b2465] via-violet-700
          to-[#9476ff] p-12 text-white lg:flex lg:flex-col lg:justify-between
        "
      >
        <div class="absolute -right-32 -top-20 h-96 w-96 rounded-full border-[70px] border-white/10">
        </div>
        <div class="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-orange-400/30 blur-[70px]">
        </div>
        <div class="relative">
          <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <AppIcon name="sparkles" :size="27" />
          </div>
          <p class="text-xs font-extrabold uppercase tracking-[.2em] text-white/70">
            AfterSchool workspace
          </p>
          <h2 class="font-sans tracking-tight mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight">
            Build brighter
            <br />
            tomorrows.
          </h2>
          <p class="mt-4 max-w-[300px] text-sm leading-7 text-indigo-100">
            A thoughtful space to manage inspiring classes, teachers and bookings.
          </p>
        </div>
        <div
          class="
            motion-safe:animate-[bounce_5s_ease-in-out_infinite] relative self-center rounded-[28px]
            border-4 border-white/80 bg-[#ffe3b5] p-8 text-center shadow-xl
          "
        >
          <span class="text-7xl">
            🚀
          </span>
          <p class="font-sans tracking-tight mt-2 text-lg font-extrabold text-[#724c3d]">
            Keep growing!
          </p>
        </div>
      </div>
      <form class="flex flex-col justify-center p-6 sm:p-10 lg:px-12" @submit.prevent="handleLogin">
        <button
          type="button"
          class="mb-10 flex items-center gap-2 self-start text-xs font-bold text-slate-400 transition hover:text-violet-700"
          @click="emit('back')"
        >
          <AppIcon name="arrow-left" :size="17" />
          Back to lessons
        </button>
        <span
          class="
            inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-extrabold
            uppercase tracking-[.12em] text-violet-700 self-start
          "
        >
          <AppIcon name="lock" :size="14" />
          Admin access
        </span>
        <h1
          class="font-sans tracking-tight mt-5 text-[32px] font-extrabold tracking-tight text-slate-900 sm:text-[40px]"
        >
          Welcome back
          <span class="text-violet-600">
            .
          </span>
        </h1>
        <p class="mb-8 mt-2 text-sm leading-6 text-slate-500">
          Sign in to your AfterSchool management dashboard.
        </p>
        <div class="mb-5">
          <label for="adminEmail" class="mb-2 block text-xs font-bold tracking-wide text-slate-600">
            Email address
          </label>
          <div class="relative">
            <AppIcon name="mail" :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="adminEmail"
              v-model.trim="email"
              type="email"
              autocomplete="username"
              class="
                block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
                text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
                focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
                disabled:bg-slate-100 h-12 pl-11
              "
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        <div class="mb-6">
          <label for="adminPassword" class="mb-2 block text-xs font-bold tracking-wide text-slate-600">
            Password
          </label>
          <div class="relative">
            <AppIcon name="lock" :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="adminPassword"
              v-model="password"
              type="password"
              autocomplete="current-password"
              class="
                block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium
                text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400
                focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed
                disabled:bg-slate-100 h-12 pl-11
              "
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <p
          v-if="error"
          class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 mb-5"
          role="alert"
        >
          {{ error }}
        </p>
        <button
          type="submit"
          class="
            inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3
            font-bold text-white shadow-lg shadow-violet-200/70 transition-all duration-300
            hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70
            active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300
            disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-violet-500 w-full py-3.5
          "
          :disabled="loading"
        >
          {{ loading ? 'Signing in...' : 'Sign in to dashboard' }}
          <AppIcon name="arrow-right" :size="18" />
        </button>
        <p class="mt-6 flex justify-center gap-1.5 text-center text-xs text-slate-400">
          <AppIcon name="shield-check" :size="16" />
          Authorized staff access only
        </p>
      </form>
    </div>
  </section>
</template>
