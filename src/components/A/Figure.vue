<script setup lang="ts">
import { clamp } from '@vueuse/core'

const IMAGES = Array.from({ length: 35 }, (_, i) => `/slide/${i + 1}.jpg`)
const VIDEOS = Array.from({ length: 7 }, (_, i) => `/slide/${99 - i}.mp4`)

const isVideo = ref(rand(4) === 0)
const videoSrc = ref(VIDEOS[rand(VIDEOS.length - 1)])

const { y } = useSharedScroll()
const figure = ref<HTMLElement>()
const isVisible = useElementVisibility(figure, { threshold: 0 })

const imgSrc = ref()
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
    backgroundImage: `url(${imgSrc.value})`,
    transformOrigin: isLeft.value ? '0% 0%' : '100% 0%',
    transform: `scale(${innerScale.value})`,
  }
})

onMounted(randomize)

watch([y, isVisible], ([y, isVisible], [_, wasVisible]) => {
  if (wasVisible && !isVisible)
    randomize()
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
  const clamped = easeInOutQuad(clamp(progress, 0, 1))
  outerScale.value = clamped
  const innerStart = 5
  const innerEnd = 1
  innerScale.value = innerStart - (innerStart - innerEnd) * clamped
})

function randomize() {
  isVideo.value = rand(4) === 0
  videoSrc.value = VIDEOS[rand(VIDEOS.length - 1)]
  imgSrc.value = IMAGES[rand(IMAGES.length - 1)]
}
</script>

<template>
  <figure ref="figure">
    <a
      :style="outerStyle"
      block h-full w-full transform-gpu overflow-hidden rounded-xl
      will-change-transform
      @click="randomize"
    >
      <span
        v-if="!isVideo"
        :style="innerStyle"
        block h-full w-full bg-cover bg-center
        will-change-transform
      />
      <video
        v-else
        autoplay loop muted playsinline
        block h-full w-full object-cover
        will-change-transform
        :src="videoSrc"
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
