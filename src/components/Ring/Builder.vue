<script setup lang="ts">
import RingCircle, { type CircleProps } from './Circle.vue'

const RAD = 50
const CIRC = 300

interface Control {
  label: string
  prop: keyof CircleProps
  min?: number
  max?: number
  disabled?: (c: CircleProps) => boolean
}

const controls: Control[] = [
  { label: 'Circumference', prop: 'circ', min: 50, max: 600 },
  { label: 'Dash Count', prop: 'dashCount', min: 0, max: 12 },
  { label: 'Dash Length', prop: 'dashLength', min: 0, max: 360 },
  { label: 'Stroke Width', prop: 'strokeWidth', min: 1, max: 100 },
  { label: 'Rotate', prop: 'rotate', min: 0, max: 360 },
  { label: 'Dash Center', prop: 'dashCenter' },
  { label: 'Dash Invert', prop: 'dashInvert', disabled: (c: CircleProps) => !c.dashLength },
]
const circles = ref<CircleProps[]>([])
const hiddenCircles = ref<number[]>([])
const theRing = computed(() => h('svg', {
  width: RAD * 2,
  height: RAD * 2,
  class: 'overflow-visible',
  fill: 'none',
}, [
  ...circles.value.map(props =>
    h(RingCircle, { ...props, class: 'opacity-50' }),
  ),
]))

onMounted(() => {
  addCircle({
    strokeWidth: 6,
    dashCount: 4,
    dashLength: 10,
    dashInvert: false,
  })
})

function toggleHide(i: number) {
  if (hiddenCircles.value.includes(i))
    hiddenCircles.value = hiddenCircles.value.filter(h => h !== i)
  else
    hiddenCircles.value.push(i)
}

function addCircle(props?: Partial<CircleProps>) {
  const defaults = {
    rad: RAD,
    circ: CIRC,
    rotate: 0,
    strokeWidth: 2,
    dashCount: 0,
    dashLength: 90,
    dashOffset: 0,
    dashCenter: true,
    dashInvert: false,
  }
  circles.value.push({ ...defaults, ...props })
}
</script>

<template>
  <div max-w-xl min-h-0 w-full flex flex-auto>
    <div min-w-80 flex justify-center>
      <component :is="theRing" />
    </div>
    <div min-w-sm w-full flex flex-col gap-4 overflow-auto>
      <fieldset v-for="circle, i in circles" :key="i" w-full flex flex-col gap-1>
        <!-- label, controls -->
        <div flex items-center gap-2 py-2>
          <legend text-lg font-bold>
            Circle {{ i + 1 }}
          </legend>
          <span flex-auto />
          <button h-6 rounded bg-gray-500 px-2 @click="toggleHide(i)">
            <div v-if="hiddenCircles.includes(i)" i-carbon-chevron-down />
            <div v-else i-carbon-chevron-up />
          </button>
          <button h-6 rounded bg-gray-500 px-4 text-white @click="circles.splice(i, 1)">
            Remove
          </button>
        </div>

        <!-- form controls -->
        <template v-if="!hiddenCircles.includes(i)">
          <label v-for="control, j in controls" :key="[i, j].join('')" flex items-center gap-2>
            <span min-w="1/3">{{ control.label }}</span>
            <template v-if="typeof circle[control.prop] === 'boolean'">
              <input v-model="circle[control.prop]" type="checkbox" class="h-4 w-4 rounded-lg bg-gray-200 dark:bg-gray-700" :disabled="control.disabled?.(circle)">
            </template>
            <template v-else>
              <input v-model.number="circle[control.prop]" type="range" :min="control.min" :max="control.max" h-2 flex-auto cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700>
              <input v-model.number="circle[control.prop]" type="number" w-16 rounded bg-gray-200 px-2 text-center dark:bg-gray-700>
            </template>
          </label>
        </template>
      </fieldset>

      <button mb-8 btn @click="addCircle({ circ: 50 })">
        Add Circle
      </button>
    </div>
  </div>
</template>
