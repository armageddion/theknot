<script setup lang="ts">
import type { CircleProps } from '~/components/Ring/Circle.vue'

const circles = ref<CircleProps[]>([
  {
    circ: 392,
    strokeWidth: 24,
    dashCount: 6,
    dashLength: 12,
  },
  {
    circ: 386,
    strokeWidth: 4,
    dashCount: 6,
    dashLength: 24,
    dashInvert: true,
  },
  {
    circ: 504,
    strokeWidth: 24,
    dashCount: 6,
    dashLength: 4,
    rotate: 30,
  },
  {
    circ: 236,
    strokeWidth: 34,
    dashCount: 6,
    dashLength: 4,
    rotate: 30,
  },
  {
    circ: 96,
  },
])
</script>

<template>
  <RingBuilder :circles />
</template>
