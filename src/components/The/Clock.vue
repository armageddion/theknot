<script setup lang="ts">
const RAD = 50
const CIRC = radToCirc(RAD)
const duration = 800
const transition = easeInOutCubic
const _rotate = ref((360 / 12) * 4)
const _dashLength = ref(150)
const _strokeWidth = ref(RAD)
const rotate = useTransition(_rotate, { duration, transition })
const dashLength = useTransition(_dashLength, { duration, transition })
const strokeWidth = useTransition(_strokeWidth, { duration, transition })
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
      :fill="isDark ? 'black' : 'white'"
    />
    <ACircle
      :rad="RAD"
      :circ="CIRC / 2"
      :rotate
      :stroke-width="strokeWidth"
      :dash-length="dashLength"
      :dash-center="false"
    />
    <ACircle
      :rad="RAD"
      :circ="CIRC * 1.25"
      :rotate
      :stroke-width="10"
      :dash-length="1"
    />
    <ACircle
      :rad="RAD"
      :circ="CIRC * 1.25"
      :rotate="rotate + dashLength"
      :stroke-width="10"
      :dash-length="1"
    />
  </svg>
  <input
    v-model.number="_rotate"
    mt-16
    type="range"
    :min="360 / 12 * 2"
    :max="360 / 12 * 4"
  >
  <input
    v-model.number="_dashLength"
    mt-16
    type="range"
    min="150"
    max="350"
  >
</template>
