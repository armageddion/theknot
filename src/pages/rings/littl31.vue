<script setup lang="ts">
import type { CircleProps } from '~/components/Ring/Circle.vue'

const circles = ref<CircleProps[]>([
  {
    strokeWidth: 36,
    dashLength: 10,
    dashCenter: false,
    rotate: -24,
  },
  {
    circ: 312,
    strokeWidth: 32,
    dashLength: 8,
    dashCenter: false,
    rotate: -8,
  },
  {
    strokeWidth: 20,
    dashLength: 125,
    dashCenter: false,
    rotate: 90,
  },
  {
    circ: 264,
    strokeWidth: 32,
    dashLength: 12,
    dashCenter: false,
    rotate: 220,
  },
  {
    circ: 264,
    strokeWidth: 32,
    dashLength: 12,
    dashCenter: false,
    rotate: 240,
  },
])
</script>

<template>
  <RingBuilder :circles />
</template>
