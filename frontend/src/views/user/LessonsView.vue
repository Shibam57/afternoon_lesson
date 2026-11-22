<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLessons } from '../../composables/useLessons.js'
import { getTeachers, getTeacherLessons } from '../../services/api.js'
import LessonList from '../../components/lessons/LessonList.vue'
import SortControls from '../../components/lessons/SortControls.vue'
import SearchBar from '../../components/lessons/SearchBar.vue'
import TeacherFilter from '../../components/lessons/TeacherFilter.vue'
import AppIcon from '../../components/layout/AppIcon.vue'

const { lessons, loading, error, findLessons, loadLessons } = useLessons()
const sortBy = ref('topic')
const sortOrder = ref('asc')
const teachers = ref([])
const selectedTeacher = ref('')
const teacherLessonIds = ref(null)
const teachersLoading = ref(true)
const teacherLessonsLoading = ref(false)
const teacherError = ref('')
let teacherRequestVersion = 0

onMounted(async () => {
  try { teachers.value = await getTeachers() }
  catch (err) { teacherError.value = `Teachers could not be loaded: ${err.message}` }
  finally { teachersLoading.value = false }
})

const handleTeacherChange = async (teacherId) => {
  const version = ++teacherRequestVersion
  selectedTeacher.value = teacherId
  teacherError.value = ''
  teacherLessonIds.value = null
  if (!teacherId) { teacherLessonsLoading.value = false; return }
  teacherLessonsLoading.value = true
  try {
    const teacherLessons = await getTeacherLessons(teacherId)
    if (version !== teacherRequestVersion) return
    teacherLessonIds.value = new Set(teacherLessons.map((lesson) => String(lesson._id)))
  } catch (err) {
    if (version === teacherRequestVersion) teacherError.value = err.message
  } finally {
    if (version === teacherRequestVersion) teacherLessonsLoading.value = false
  }
}

const sortedLessons = computed(() => {
  const filtered = selectedTeacher.value
    ? lessons.value.filter((lesson) => teacherLessonIds.value?.has(String(lesson._id)))
    : lessons.value
  return [...filtered].sort((a, b) => {
    const comparison = ['price', 'space'].includes(sortBy.value)
      ? Number(a[sortBy.value]) - Number(b[sortBy.value])
      : String(a[sortBy.value] ?? '').localeCompare(String(b[sortBy.value] ?? ''), undefined, { sensitivity: 'base' })
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})
const availableSpaces = computed(() => lessons.value.reduce((total, lesson) => total + Math.max(0, Number(lesson.space) || 0), 0))
</script>

<template>
  <section class="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 pb-10 pt-5 sm:pb-16 sm:pt-7">
    <div
      class="
        relative isolate overflow-hidden rounded-[28px] bg-[#1d1a4e] px-6 pb-9 pt-11 text-white
        sm:rounded-[36px] sm:px-10 sm:pb-12 sm:pt-14 lg:min-h-[430px] lg:px-16 lg:py-16
      "
    >
      <div
        class="pointer-events-none absolute -right-16 -top-24 h-[350px] w-[350px] rounded-full bg-[#7957ff]/50 blur-[90px]"
      >
      </div>
      <div
        class="pointer-events-none absolute -bottom-48 left-1/3 h-[350px] w-[400px] rounded-full bg-[#f27e9c]/25 blur-[90px]"
      >
      </div>
      <div
        class="pointer-events-none absolute left-[53%] top-[-35px] h-32 w-32 rounded-full border-[22px] border-white/5"
      >
      </div>
      <div class="relative grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr]">
        <div class="motion-safe:transition-all motion-safe:duration-700 relative z-10 max-w-[620px]">
          <div
            class="
              mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2
              text-xs font-extrabold tracking-[.11em] text-[#f5d3ff] uppercase backdrop-blur
            "
          >
            <AppIcon name="sparkles" :size="15" />
            A world of possibilities
          </div>
          <h1
            class="font-sans tracking-tight text-[39px] font-extrabold leading-[1.08] tracking-[-.04em] sm:text-[54px] lg:text-[61px]"
          >
            Big adventures
            <br />
            start
            <span class="text-[#ffbf87]">
              after the bell.
            </span>
          </h1>
          <p class="mt-5 max-w-[490px] text-[15px] leading-7 text-indigo-100/80 sm:text-base">
            Fun, creativity and new discoveries are just around the corner. Find inspiring after-school lessons made for curious young minds.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#lesson-catalog"
              class="
                inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ffbf87] px-6 py-3.5 text-sm
                font-extrabold text-[#28204e] shadow-xl shadow-black/10 transition hover:-translate-y-1
                hover:bg-[#ffd0a8]
              "
            >
              <AppIcon name="compass" :size="18" />
              Explore lessons
              <AppIcon name="arrow-right" :size="17" />
            </a>
            <span
              class="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-3 text-xs font-bold text-white/85"
            >
              <AppIcon name="heart" :size="17" class="text-[#ffc3cb]" />
              Learn something new
            </span>
          </div>
        </div>
        <div
          class="motion-safe:transition-all motion-safe:duration-1000 relative hidden h-[304px] sm:block lg:h-[340px]"
          aria-hidden="true"
        >
          <div
            class="
              absolute left-1/2 top-1/2 h-[268px] w-[268px] -translate-x-1/2 -translate-y-1/2 rounded-full
              bg-white/10 ring-[32px] ring-white/[.035] lg:h-[330px] lg:w-[330px]
            "
          >
          </div>
          <div
            class="
              motion-safe:animate-bounce motion-safe:[animation-duration:5s] absolute left-[20%] top-[5%] flex h-[145px]
              w-[145px] -rotate-12 flex-col items-center justify-center rounded-[30px] border-[5px]
              border-white/90 bg-[#ffdb9c] text-[#765330] shadow-[0_25px_65px_rgba(0,0,0,.2)] lg:left-[16%]
              lg:top-[5%]
            "
          >
            <span class="text-6xl">
              🎨
            </span>
            <span class="mt-2 font-sans tracking-tight text-sm font-extrabold">
              Imagine
            </span>
          </div>
          <div
            class="
              motion-safe:animate-bounce motion-safe:[animation-duration:6s] motion-safe:[animation-delay:800ms]
              absolute right-[9%] top-[2%] flex h-[154px] w-[154px] rotate-12 flex-col items-center
              justify-center rounded-[30px] border-[5px] border-white/90 bg-[#bdf0e9] text-[#227e75]
              shadow-[0_25px_65px_rgba(0,0,0,.2)] lg:right-[8%]
            "
          >
            <span class="text-6xl">
              🧪
            </span>
            <span class="mt-2 font-sans tracking-tight text-sm font-extrabold">
              Explore
            </span>
          </div>
          <div
            class="
              motion-safe:animate-bounce motion-safe:[animation-duration:5s] absolute bottom-[-2%] left-[35%] flex
              h-[160px] w-[160px] rotate-6 flex-col items-center justify-center rounded-[30px] border-[5px]
              border-white/90 bg-[#e3d0ff] text-[#7e55b4] shadow-[0_25px_65px_rgba(0,0,0,.2)]
            "
          >
            <span class="text-6xl">
              🚀
            </span>
            <span class="mt-2 font-sans tracking-tight text-sm font-extrabold">
              Grow
            </span>
          </div>
          <div class="absolute right-[1%] top-[57%] rounded-2xl bg-white px-4 py-3 text-[#342766] shadow-xl">
            <div class="flex items-center gap-2">
              <span class="text-lg">
                ✨
              </span>
              <span class="font-sans tracking-tight text-xs font-extrabold">
                Curiosity lives here!
              </span>
            </div>
          </div>
          <span class="absolute left-[2%] top-[57%] text-5xl text-[#ffd99c]">
            ✳
          </span>
        </div>
      </div>
    </div>
    <div
      class="relative z-10 mx-auto -mt-5 grid max-w-[1120px] grid-cols-1 gap-3 px-3 sm:-mt-7 sm:grid-cols-3 sm:gap-4 sm:px-6"
    >
      <div
        class="
          flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4
          shadow-[0_12px_30px_-20px_rgba(32,38,88,.3)]
        "
      >
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700"
        >
          <AppIcon name="book-open" :size="22" />
        </span>
        <div>
          <p class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
            {{ loading ? '—' : lessons.length }}
          </p>
          <p class="text-xs font-semibold text-slate-500">
            Lessons to discover
          </p>
        </div>
      </div>
      <div
        class="
          flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4
          shadow-[0_12px_30px_-20px_rgba(32,38,88,.3)]
        "
      >
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500"
        >
          <AppIcon name="users" :size="22" />
        </span>
        <div>
          <p class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
            {{ teachersLoading ? '—' : teachers.length }}
          </p>
          <p class="text-xs font-semibold text-slate-500">
            Dedicated teachers
          </p>
        </div>
      </div>
      <div
        class="
          flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4
          shadow-[0_12px_30px_-20px_rgba(32,38,88,.3)]
        "
      >
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600"
        >
          <AppIcon name="sparkles" :size="22" />
        </span>
        <div>
          <p class="font-sans tracking-tight text-xl font-extrabold text-slate-900">
            {{ loading ? '—' : availableSpaces }}
          </p>
          <p class="text-xs font-semibold text-slate-500">
            Spaces available
          </p>
        </div>
      </div>
    </div>
    <div id="lesson-catalog" class="scroll-mt-28 pt-16 sm:pt-20">
      <div class="mb-7 flex flex-col justify-between gap-5 sm:mb-9 sm:flex-row sm:items-end">
        <div>
          <span
            class="
              inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-extrabold
              uppercase tracking-[.12em] text-violet-700
            "
          >
            <AppIcon name="sparkles" :size="14" />
            Find your spark
          </span>
          <h2
            class="font-sans tracking-tight mt-4 text-[31px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[39px]"
          >
            Explore our
            <span class="text-violet-600">
              lessons
            </span>
          </h2>
          <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Something wonderful is waiting to be discovered. Pick a subject and start exploring.
          </p>
        </div>
        <div
          class="
            inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2.5 text-xs
            font-extrabold text-slate-600 shadow-sm sm:self-auto
          "
        >
          <AppIcon name="book-open" :size="16" class="text-violet-600" />
          {{ sortedLessons.length }} {{ sortedLessons.length === 1 ? 'lesson' : 'lessons' }}
        </div>
      </div>
      <div
        class="rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)] mb-8 p-4 sm:p-6"
      >
        <div
          class="mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] text-slate-500"
        >
          <AppIcon name="sliders-horizontal" :size="15" class="text-violet-600" />
          Find the perfect fit
        </div>
        <SearchBar @search="findLessons" />
        <div class="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:gap-5">
          <TeacherFilter
            :teachers="teachers"
            :selected-teacher="selectedTeacher"
            :disabled="teachersLoading"
            @teacher-change="handleTeacherChange"
          />
          <SortControls
            :sort-by="sortBy"
            :sort-order="sortOrder"
            @sort-change="sortBy = $event"
            @order-change="sortOrder = $event"
          />
        </div>
      </div>
      <p
        v-if="teacherError"
        class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 mb-6"
        role="status"
      >
        {{ teacherError }}
      </p>
      <div
        v-if="loading || teacherLessonsLoading"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        role="status"
        aria-label="Loading lessons"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)] overflow-hidden"
        >
          <div class="animate-pulse h-48 bg-slate-200">
          </div>
          <div class="space-y-3 p-6">
            <div class="animate-pulse h-4 w-1/3 rounded bg-slate-200">
            </div>
            <div class="animate-pulse h-6 w-4/5 rounded bg-slate-200">
            </div>
            <div class="animate-pulse h-4 w-2/3 rounded bg-slate-100">
            </div>
            <div class="animate-pulse mt-6 h-12 rounded-xl bg-slate-200">
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="error"
        class="
          rounded-[24px] border border-slate-100 bg-white shadow-[0_14px_45px_-26px_rgba(40,49,87,.20)]
          flex flex-col items-center px-6 py-14 text-center
        "
        role="alert"
      >
        <AppIcon name="alert-circle" :size="35" class="text-rose-500" />
        <h3 class="font-sans tracking-tight mt-4 text-xl font-extrabold">
          Couldn't load lessons
        </h3>
        <p class="mt-2 max-w-md text-sm text-slate-500">
          {{ error }}
        </p>
        <button
          class="
            inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3
            font-bold text-white shadow-lg shadow-violet-200/70 transition-all duration-300
            hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200/70
            active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300
            disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-violet-500 mt-5
          "
          type="button"
          @click="loadLessons"
        >
          <AppIcon name="refresh-cw" :size="17" />
          Try again
        </button>
      </div>
      <LessonList v-else :lessons="sortedLessons" />
    </div>
    <div
      class="
        mt-16 overflow-hidden rounded-[26px] bg-gradient-to-r from-violet-700 to-[#a16cf7] px-6 py-9
        text-white sm:mt-20 sm:px-10 sm:py-10
      "
    >
      <div class="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p class="mb-2 text-xs font-extrabold uppercase tracking-[.14em] text-white/75">
            Make room for wonder
          </p>
          <h2 class="font-sans tracking-tight text-2xl font-extrabold leading-tight sm:text-3xl">
            Every great journey begins with curiosity.
          </h2>
          <p class="mt-2 text-sm text-white/75">
            Explore something new, one lesson at a time.
          </p>
        </div>
        <a
          href="#lesson-catalog"
          class="
            inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold
            text-violet-800 transition hover:-translate-y-1
          "
        >
          Browse classes
          <AppIcon name="arrow-right" :size="17" />
        </a>
      </div>
    </div>
  </section>
</template>
