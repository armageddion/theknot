<script setup lang="ts">
import type { UseElementBoundingReturn } from '@vueuse/core'
import { clamp } from '@vueuse/core'

const bounding = inject('bounding') as ComputedRef<Record<string, UseElementBoundingReturn>>

const MIN = 25
const MAX = 65
const age = ref(MAX)
const range = ref<HTMLElement>()
const dragger = ref<HTMLElement>()
const rangeBound = useElementBounding(range)

useDraggable(dragger, {
  axis: 'y',
  onMove: (_, event) => {
    const currPos = event.y
    const rangeTop = rangeBound.top.value
    const rangeBot = rangeBound.bottom.value
    const agePos = MIN + (MAX - MIN) * (1 - clamp((currPos - rangeTop) / (rangeBot - rangeTop), 0, 1))
    age.value = agePos
  },
})

watchEffect(() => {
  const wh = window.innerHeight
  const el = bounding.value.when
  if (!el)
    return
  const modTop = -0.1
  const modBot = -0.1
  const elTop = el.top.value
  const elHeight = el.height.value
  const offsetTop = wh * modTop
  const offsetBottom = wh * modBot
  const progress = (elTop - offsetTop) / (wh - elHeight - offsetBottom * 2)
  const clamped = easeInOutQuad(clamp(progress, 0, 1))
  const value = MIN + (MAX - MIN) * clamped
  age.value = value
})
</script>

<template>
  <div ref="range" relative h-full w-8 flex justify-center>
    <div
      w-2 rounded bg-accent opacity-10
    />
    <div
      ref="dragger"
      absolute h-8 w-full flex-center cursor-pointer select-none rounded-xl bg-secondary will-change-top
      :style="{ top: `${(1 - ((age - MIN) / (MAX - MIN))) * 100}%` }"
    >
      <span text-primary font-bold>{{ Math.round(age) }}</span>
    </div>
  </div>
  <div max-w-80 w-full>
    <TheClock :age />
  </div>
</template>
