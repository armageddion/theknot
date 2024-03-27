<script setup lang="ts">
import { clamp } from '@vueuse/core'

export interface ClockProps {
  age?: number
}

const props = withDefaults(defineProps<ClockProps>(), { age: 65 })
const age = toRef(props, 'age')

const RAD = 50
const CIRC = radToCirc(RAD)
const MID = 45
const TICK = 3
const HOUR = 360 / 12
const rotate = ref(HOUR * 4)
const dashLength = ref(HOUR * 4)
const strokeWidth = ref(RAD)

watch(age, (age) => {
  const arrive = age < MID ? 2 : 4
  const depart = 24 + Math.E - 2 / 15 * age + 3 - 12
  const _rotate = HOUR * arrive
  const _dashLength = HOUR * depart - _rotate
  rotate.value = _rotate
  dashLength.value = clamp(_dashLength, HOUR * 4, 355)
}, { immediate: true })
</script>

<template>
  <svg
    version="1.1"
    class="overflow-visible"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    fill="none"
  >
    <circle
      cx="50"
      cy="50"
      r="50"
      fill="var(--color-accent)"
      opacity-10
    />
    <ACircle
      :rad="RAD"
      :circ="CIRC / 2"
      :rotate
      :stroke-width="strokeWidth"
      :dash-length="dashLength"
      :dash-center="false"
      stroke="var(--color-secondary)"
      opacity-25
    />
    <ACircle
      :rad="RAD"
      :circ="CIRC + 20"
      :rotate
      :stroke-width="TICK"
      :dash-length="2"
      stroke="var(--color-accent)"
      opacity-25
    />
    <ACircle
      :rad="RAD"
      :circ="CIRC + 20"
      :rotate="rotate + dashLength"
      :stroke-width="TICK"
      :dash-length="2"
      stroke="var(--color-accent)"
      opacity-25
    />
  </svg>
</template>
