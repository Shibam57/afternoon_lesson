<script setup>
import { getImageUrl } from '../../utils/imageUrl.js'
import AppIcon from '../layout/AppIcon.vue'
defineProps({ lessons: { type: Array, default: () => [] } })
const emit = defineEmits(['edit'])
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
            Image
          </th>
          <th>
            Subject
          </th>
          <th>
            Location
          </th>
          <th>
            Price
          </th>
          <th>
            Spaces
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lesson in lessons" :key="lesson._id">
          <td>
            <div
              class="flex h-12 w-14 items-center justify-center overflow-hidden rounded-xl bg-violet-50 text-violet-600"
            >
              <img
                v-if="lesson.image"
                :src="getImageUrl(lesson.image)"
                :alt="lesson.topic"
                class="h-full w-full object-cover"
              />
              <AppIcon v-else name="image" :size="20" />
            </div>
          </td>
          <td class="font-bold! text-slate-900!">
            {{ lesson.topic }}
          </td>
          <td>
            {{ lesson.location }}
          </td>
          <td class="font-bold! text-slate-900!">
            £{{ Number(lesson.price).toFixed(2) }}
          </td>
          <td>
            <span
              class="rounded-lg px-2.5 py-1 text-xs font-extrabold"
              :class="Number(lesson.space) > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'"
            >
              {{ lesson.space }}
            </span>
          </td>
          <td>
            <button
              class="
                inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200
                bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50
                disabled:cursor-not-allowed disabled:opacity-50
              "
              type="button"
              @click="emit('edit', lesson)"
            >
              <AppIcon name="pencil" :size="15" />
              Edit
            </button>
          </td>
        </tr>
        <tr v-if="!lessons.length">
          <td colspan="6" class="text-center! py-12!">
            No lessons available yet.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
