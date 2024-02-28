<script setup lang="ts">
import type { CircleProps } from '../Circle.vue'

const props = defineProps<{
  circles: CircleProps[]
  i: number
}>()
defineEmits(['delete'])

const circle = toRef(props.circles, props.i)

interface Control {
  label: string
  prop: keyof CircleProps
  min?: number
  max?: number
  disabled?: (c: CircleProps) => boolean
}

const controls = computed<Control[]>(() => [
  { label: 'Circumference', prop: 'circ', min: 50, max: 440 },
  { label: 'Dash Count', prop: 'dashCount', min: 0, max: 12 },
  { label: 'Dash Length', prop: 'dashLength', min: 0, max: 360 / (circle.value.dashCount || 1) },
  { label: 'Stroke Width', prop: 'strokeWidth', min: 1, max: 24 },
  { label: 'Rotate', prop: 'rotate', min: -180, max: 180 },
  { label: 'Dash Center', prop: 'dashCenter' },
  { label: 'Dash Invert', prop: 'dashInvert', disabled: (c: CircleProps) => !c.dashLength },
])
const hiddenCircles = ref<number[]>([])

function toggleHide(i: number) {
  if (hiddenCircles.value.includes(i))
    hiddenCircles.value = hiddenCircles.value.filter(h => h !== i)
  else
    hiddenCircles.value.push(i)
}
</script>

<template>
  <fieldset w flex flex-col gap-1>
    <!-- label, controls -->
    <div flex items-center gap-2 py-2>
      <legend text-lg font-bold>
        Circle {{ i + 1 }}
      </legend>
      <span flex-auto />
      <button h-6 rounded bg-gray-600 px-2 @click="toggleHide(i)">
        <div v-if="hiddenCircles.includes(i)" i-ph-caret-down />
        <div v-else i-ph-caret-up />
      </button>
      <button h-6 rounded bg-gray-600 px-4 text-white @click="$emit('delete')">
        Remove
      </button>
    </div>

    <!-- form controls -->
    <template v-if="!hiddenCircles.includes(i)">
      <label v-for="control, j in controls" :key="[i, j].join('')" flex items-center gap-2>
        <span min-w="1/3">{{ control.label }}</span>
        <template v-if="typeof circle[control.prop] === 'boolean'">
          <input
            v-model="circle[control.prop]"
            type="checkbox"
            h-4 w-4 rounded bg-gray-600
            :disabled="control.disabled?.(circle)"
          >
        </template>
        <template v-else>
          <input
            v-model.number="circle[control.prop]"
            type="range" :min="control.min" :max="control.max"
            h-2 flex-auto cursor-pointer appearance-none rounded bg-gray-600
          >
          <input
            v-model.number="circle[control.prop]"
            type="number"
            w-16 rounded bg-gray-600 px-2 text-center
          >
        </template>
      </label>
    </template>
  </fieldset>
</template>
