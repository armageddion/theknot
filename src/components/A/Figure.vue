<script setup lang="ts">
import { clamp } from '@vueuse/core'

const props = defineProps<{
  i: number
  left?: boolean
}>()

const figure = ref<HTMLElement>()
const { y } = useSharedScroll()
const isVisible = useElementVisibility(figure, { threshold: 0 })

const { feature, next } = useImages()
const src = computed(() => feature.value[props.i])
const isVideo = computed(() => src.value?.endsWith('.mp4'))

const outerScale = ref(1)
const innerScale = ref(5)

const isLeft = computed(() => {
  if (!figure.value)
    return false
  if (props.left)
    return true
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
    backgroundImage: `url(${src.value})`,
    transformOrigin: isLeft.value ? '0% 0%' : '100% 0%',
    transform: `scale(${innerScale.value})`,
  }
})

watch([y, isVisible], ([y, isVisible]) => {
  if (!isVisible || !figure.value)
    return
  const modTop = 0.2
  const modBot = -0.1
  const winHeight = window.innerHeight
  const elTop = figure.value!.offsetTop - y
  const elHeight = figure.value!.offsetHeight
  const offsetTop = winHeight * modTop
  const offsetBottom = winHeight * modBot
  const progress = 1 - (elTop - offsetTop) / (winHeight - elHeight - offsetBottom * 2)
  const clamped = easeOutQuad(clamp(progress, 0, 1))
  outerScale.value = clamped
  const innerStart = 5
  const innerEnd = 1
  innerScale.value = innerStart - (innerStart - innerEnd) * clamped
})
</script>

<template>
  <figure ref="figure">
    <a
      :style="outerStyle"
      block h-full w-full transform-gpu overflow-hidden rounded-xl
      will-change-transform
      @click="next(src)"
    >
      <span
        v-if="!isVideo"
        :style="innerStyle"
        block h-full w-full bg-cover bg-center
        will-change-transform
      />
      <video
        v-else
        :style="innerStyle"
        autoplay loop muted playsinline
        block h-full w-full object-cover
        will-change-transform
        :src="src"
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
