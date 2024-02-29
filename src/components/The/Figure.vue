<script setup lang="ts">
const props = defineProps<{
  src: string
}>()

// scale from small to original size
const outerStyle = computed(() => {
  const isLeft = Math.random() > 0.5
  const scale = ref(1)
  return {
    transformOrigin: isLeft ? '0% 0%' : '100% 0%',
    transform: `scale(${scale.value})`,
  }
})

// scale from small to original size
const innerStyle = computed(() => {
  const isLeft = Math.random() > 0.5
  const scale = ref(1)
  return {
    backgroundImage: `url(${props.src})`,
    transformOrigin: isLeft ? '0% 0%' : '100% 0%',
    transform: `scale(${scale.value})`,
  }
})
</script>

<template>
  <figure overflow-hidden>
    <div :style="outerStyle" h-full w-full overflow-hidden>
      <span :style="innerStyle" block h-full w-full bg-cover bg-center />
    </div>
  </figure>
</template>

<style scoped>
figure {
  grid-column: var(--c) / span var(--s);
  grid-row: var(--r);
  position: relative;
}
</style>
