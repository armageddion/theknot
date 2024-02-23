<script setup lang="ts">
import type { CircleProps } from '~/components/Ring/Circle.vue'

const circles = ref<CircleProps[]>([])
</script>

<template>
  <RingBuilder :circles />
</template>
