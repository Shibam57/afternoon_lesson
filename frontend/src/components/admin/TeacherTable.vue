<script setup>
const props = defineProps({
  teachers: { type: Array, default: () => [] },
  lessons: { type: Array, default: () => [] },
})

const getLessonNames = (lessonIDs = []) => {
  return lessonIDs.map((id) => {
    const lesson = props.lessons.find((item) => String(item._id) === String(id))
    return lesson ? lesson.topic : 'Unknown lesson'
  }).join(', ') || 'No lessons assigned'
}
</script>

<template>
  <div
    class="w-full overflow-x-auto rounded-[22px] border border-slate-100 bg-white shadow-[0_10px_35px_-25px_rgba(40,49,87,.25)]"
  >
    <table
      class="
        w-full min-w-[690px] border-collapse text-left text-sm [&_thead]:bg-slate-50 [&_thead]:text-xs
        [&_thead]:font-extrabold [&_thead]:uppercase [&_thead]:tracking-wide [&_th]:whitespace-nowrap
        [&_th]:px-5 [&_th]:py-4 [&_td]:border-t [&_td]:border-slate-100 [&_td]:px-5 [&_td]:py-4
        [&_td]:text-slate-600 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-violet-50/35
      "
    >
      <thead>
        <tr>
          <th>
            Teacher
          </th>
          <th>
            First name
          </th>
          <th>
            Last name
          </th>
          <th>
            Assigned lessons
          </th>
          <th>
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in teachers" :key="teacher._id">
          <td>
            <span
              class="
                flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-sans tracking-tight
                text-sm font-extrabold uppercase text-violet-800
              "
            >
              {{ (teacher.firstName || 'T').charAt(0) }}{{ (teacher.lastName || '').charAt(0) }}
            </span>
          </td>
          <td class="font-bold! text-slate-900!">
            {{ teacher.firstName }}
          </td>
          <td>
            {{ teacher.lastName }}
          </td>
          <td class="max-w-[370px]">
            {{ getLessonNames(teacher.lessonIDs) }}
          </td>
          <td>
            <span class="rounded-lg bg-violet-50 px-3 py-1 text-xs font-extrabold text-violet-800">
              {{ teacher.lessonIDs?.length || 0 }}
            </span>
          </td>
        </tr>
        <tr v-if="!teachers.length">
          <td colspan="5" class="py-12! text-center!">
            No teachers available yet.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
