<script setup lang="ts">
const MIN = 18
const MAX = 65
const age = ref(MAX)
</script>

<template>
  <div h-full flex flex-col items-center gap-4>
    <input
      v-model.number="age"
      mr-4 w-8 flex-auto outline-none
      style="writing-mode: vertical-lr"
      type="range"
      :min="MIN"
      :max="MAX"
    >
    <input
      v-model.number="age"
      type="number"
      text-center
      :min="MIN"
      :max="MAX"
    >
  </div>
  <div max-w-80 w-full>
    <TheClock :age />
  </div>
</template>
