<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: 'sparkles' },
  size: { type: [String, Number], default: 20 },
  strokeWidth: { type: [String, Number], default: 1.9 },
})

// Small, local icon set so the frontend does not need an additional icon package.
const paths = {
  'sparkles': ['m12 3 1.9 5.7L20 10.6l-6.1 1.9L12 18.2l-1.9-5.7L4 10.6l6.1-1.9L12 3Z', 'm19 17 .8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z'],
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  'arrow-left': ['M19 12H5', 'm12 19-7-7 7-7'],
  'chevron-down': ['m6 9 6 6 6-6'],
  'shopping-bag': ['M5 8h14l1 13H4L5 8Z', 'M9 9V6a3 3 0 0 1 6 0v3'],
  'shopping-cart': ['M2 3h2l2.4 11.4a2 2 0 0 0 2 1.6H19', 'M6 6h16l-2.2 8H7.5', 'M10 21h.01', 'M18 21h.01'],
  'search': ['m21 21-4.4-4.4', 'M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z'],
  'x': ['M18 6 6 18', 'M6 6l12 12'],
  'menu': ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  'map-pin': ['M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z', 'M12 10a2.5 2.5 0 1 0 0 .01Z'],
  'users': ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  'book-open': ['M12 7a8 8 0 0 0-9-2v14a8 8 0 0 1 9 2', 'M12 7a8 8 0 0 1 9-2v14a8 8 0 0 0-9 2', 'M12 7v14'],
  'check': ['m5 12 4 4L19 6'],
  'check-circle': ['M20 11.1V12a8 8 0 1 1-5-7.4', 'm8 11 4 4 9-9'],
  'shield-check': ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z', 'm9 12 2 2 4-4'],
  'clock': ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  'graduation-cap': ['m2 10 10-5 10 5-10 5-10-5Z', 'M6 12v5c3 3 9 3 12 0v-5', 'M22 10v7'],
  'log-out': ['M10 17l5-5-5-5', 'M15 12H3', 'M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6'],
  'layout-dashboard': ['M3 3h8v8H3z', 'M15 3h6v5h-6z', 'M15 12h6v9h-6z', 'M3 15h8v6H3z'],
  'clipboard-list': ['M9 4h6', 'M9 2h6v4H9z', 'M6 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1', 'M8 12h8', 'M8 16h8'],
  'receipt': ['M4 3h16v19l-4-2-4 2-4-2-4 2V3Z', 'M8 8h8', 'M8 12h8'],
  'refresh-cw': ['M20 7v5h-5', 'M4 17v-5h5', 'M5.5 9A7 7 0 0 1 18 6l2 6', 'M4 12l2 6a7 7 0 0 0 12.5-3'],
  'plus': ['M12 5v14', 'M5 12h14'],
  'pencil': ['m14 5 5 5', 'M4 20l5-.9L20 8a2.1 2.1 0 0 0-4-4L5 15l-1 5Z'],
  'phone': ['M22 16.9v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7 10a16 16 0 0 0 7 7l1.5-1.9a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 1.9Z'],
  'user': ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M4 21a8 8 0 0 1 16 0'],
  'mail': ['M3 5h18v14H3z', 'm3 7 9 6 9-6'],
  'lock': ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3'],
  'alert-circle': ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 7v6', 'M12 17h.01'],
  'sliders-horizontal': ['M4 7h8', 'M16 7h4', 'M4 17h4', 'M12 17h8', 'M12 4v6', 'M8 14v6'],
  'compass': ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16 8-2 6-6 2 2-6 6-2Z'],
  'heart': ['M20.5 4.6a5.5 5.5 0 0 0-7.8 0l-.7.8-.7-.8a5.5 5.5 0 1 0-7.8 7.8L12 21l8.5-8.6a5.5 5.5 0 0 0 0-7.8Z'],
  'calendar': ['M4 5h16v16H4z', 'M8 2v6', 'M16 2v6', 'M4 11h16'],
  'image': ['M3 3h18v18H3z', 'M8 10a2 2 0 1 0 0-.01Z', 'm21 16-5-5L5 21'],
}
const iconPaths = computed(() => paths[props.name] ?? paths.sparkles)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(path, index) in iconPaths" :key="index" :d="path" />
  </svg>
</template>
