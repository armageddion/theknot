<script setup lang="ts">
import { clamp } from '@vueuse/core'

const props = defineProps<{
  src: string
}>()

const { y } = useSharedScroll()
const figure = ref<HTMLElement>()

const outerScale = ref(1)
const innerScale = ref(5)

const isLeft = computed(() => {
  if (!figure.value)
    return false
  const previousElementSibling = figure.value!.previousElementSibling as HTMLElement
  const isRight = previousElementSibling && (figure.value!.offsetLeft + figure.value!.offsetWidth <= previousElementSibling.offsetLeft + 1)
  return !isRight
})

const outerStyle = computed(() => {
  return {
    transformOrigin: isLeft.value ? '0% 0%' : '100% 0%',
    transform: `scale(${outerScale.value})`,
  }
})

const innerStyle = computed(() => {
  return {
    backgroundImage: `url(${props.src})`,
    transformOrigin: isLeft.value ? '0% 0%' : '100% 0%',
    transform: `scale(${innerScale.value})`,
  }
})

watch(y, (y) => {
  const modTop = 0.2
  const modBot = -0.1
  const winHeight = window.innerHeight
  const elTop = figure.value!.offsetTop - y
  const elHeight = figure.value!.offsetHeight
  // const elBottom = elTop + elHeight
  const offsetTop = winHeight * modTop
  const offsetBottom = winHeight * modBot
  const progress = 1 - (elTop - offsetTop) / (winHeight - elHeight - offsetBottom * 2)
  const clamped = easeInOutQuad(clamp(progress, 0, 1))

  outerScale.value = clamped
  const innerStart = 5
  const innerEnd = 1
  innerScale.value = innerStart - (innerStart - innerEnd) * clamped
})

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
</script>

<template>
  <figure ref="figure">
    <a
      :href="`/gallery#${src.split('/').pop()?.split('.').shift()?.split('_').pop()}`" :style="outerStyle" block h-full
      w-full overflow-hidden rounded-xl
      will-change="transform"
    >
      <span
        :style="innerStyle"
        block h-full w-full bg-cover bg-center
        will-change="transform"
      />
    </a>
  </figure>
</template>

<style scoped>
figure {
  grid-column: var(--c) / span var(--s);
  grid-row: var(--r);
  position: relative;
}
</style>
