<script setup>
const props = defineProps({
  orders: { type: Array, default: () => [] },
  lessons: { type: Array, default: () => [] },
})

const getLessonName = (lessonId) => {
  const lesson = props.lessons.find((item) => String(item._id) === String(lessonId))
  return lesson ? lesson.topic : 'Lesson unavailable'
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  const value = new Date(date)
  return Number.isNaN(value.getTime()) ? 'Invalid date' : value.toLocaleString()
}

const getTotalQuantity = (items = []) => {
  return items.reduce((total, item) => total + Number(item.quantity || 0), 0)
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
            Customer
          </th>
          <th>
            Phone
          </th>
          <th>
            Purchased lessons
          </th>
          <th>
            Spaces
          </th>
          <th>
            Order date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td class="font-bold! text-slate-900!">
            {{ order.name }}
          </td>
          <td class="whitespace-nowrap">
            {{ order.phone }}
          </td>
          <td>
            <ul class="space-y-1">
              <li v-for="item in order.items" :key="item.lessonId" class="whitespace-nowrap">
                {{ getLessonName(item.lessonId) }}
                <span class="text-xs font-bold text-violet-700">
                  × {{ item.quantity }}
                </span>
              </li>
            </ul>
          </td>
          <td>
            <span class="rounded-lg bg-violet-50 px-3 py-1 font-extrabold text-violet-800">
              {{ getTotalQuantity(order.items) }}
            </span>
          </td>
          <td class="whitespace-nowrap">
            {{ formatDate(order.createdAt) }}
          </td>
        </tr>
        <tr v-if="!orders.length">
          <td colspan="5" class="py-12! text-center!">
            No orders available yet.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
