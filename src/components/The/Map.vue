<script setup lang="ts">
import { clamp } from '@vueuse/core'

const bounding: any = inject('bounding')
const path = ref<SVGPathElement>()
const strokeDasharray = ref(path.value?.getTotalLength())
const strokeDashoffset = ref(0)
const scale = ref(1)

watchEffect(() => {
  const len = path.value?.getTotalLength()
  if (!len)
    return
  if (len !== strokeDasharray.value)
    strokeDasharray.value = len
  const wh = window.innerHeight
  const el = bounding.value.where
  const offset = 1 - getBoundsOffset(el, wh) - 0.65
  const pathProgress = clamp(offset * 2, 0, 2)
  const zoomProgress = easeInOutQuad(clamp(offset, 0, 2))
  strokeDashoffset.value = len - len * pathProgress
  scale.value = 1 + zoomProgress
})
</script>

<template>
  <div
    relative
    :style="{ transform: `scale(${scale})` }"
    style="transform-origin: 33% 50%"
  >
    <img src="/map.png" alt="An old map">

    <svg absolute left-0 top-0 viewBox="0 0 756 525" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        ref="path"
        d="M261.022 206.787L263.835 214.932L271.24 223.373L275.978 225.742L282.642 227.667L286.345 230.777L287.973 229.444L290.343 230.777L297.747 220.855L301.745 218.19L307.225 225.742L314.333 236.7L319.368 239.81L323.366 244.253L339.507 253.434L342.913 255.063L349.159 262.944L353.575 272.625L356.685 284.088L355.951 289.312L354.649 292.768L355.367 295.103L358.06 296.898L359.991 299.996L359.677 304.799L361.517 309.423L361.023 316.471L350.923 319.793L347.376 320.242L341.81 322.936H338.847L331.889 326.662L336.198 329.669L333.903 330.845"
        stroke="#678202"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
      />
    </svg>
  </div>
</template>
