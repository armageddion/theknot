<script setup lang="ts">
import type { CircleProps } from '~/components/Ring/Circle.vue'

const circles = ref<CircleProps[]>([
  {
    strokeWidth: 2,
  },
  {
    strokeWidth: 6,
    dashCount: 4,
    dashLength: 10,
    dashInvert: false,
  },
])
</script>

<template>
  <RingBuilder :circles />
</template>
