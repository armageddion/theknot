<script setup lang="ts">
import RingCircle, { type CircleProps } from '../Circle.vue'

const props = withDefaults(defineProps<{
  circles: CircleProps[]
}>(), {
  circles: () => [],
})

const RAD = 50
const CIRC = 300

const scale = ref(2)
const circles = ref<CircleProps[]>([])
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
  props.circles.forEach(addCircle)
})

const source = computed(() => stringify(circles.value))
const { copy } = useClipboard({ source })

function addCircle(props?: Partial<CircleProps>) {
  const defaults = {
    rad: RAD,
    circ: CIRC,
    rotate: 0,
    strokeWidth: 2,
    dashCount: 0,
    dashLength: 0,
    dashCenter: true,
    dashInvert: false,
  }
  circles.value.push({ ...defaults, ...props })
}

function stringify(circles: CircleProps[]) {
  const withoutNullValues = circles.map(circle =>
    Object.fromEntries(Object.entries(circle).filter(([k, v]) => v !== circleDefaults[k as keyof CircleProps])),
  )
  return JSON.stringify(withoutNullValues, null, 2)
}
</script>

<template>
  <div min-h-0 w-full flex flex-auto flex-col>
    <div w-sm self-center px-4>
      <input
        v-model.number="scale" type="range" min="1" max="5" step="0.1"
        h-2 w-full flex-auto cursor-pointer appearance-none rounded bg-gray-600
      >
      <div w-full h="[40vh]" flex-center>
        <component :is="theRing" :style="`transform: scale(${scale})`" />
      </div>
    </div>

    <div w-full flex justify-center gap-4 overflow-auto>
      <div w-full w-sm flex flex-col gap-4 overflow-auto px-4>
        <button v-if="circles.length" mb-8 btn @click="copy(source)">
          Copy Config
        </button>

        <RingBuilderFieldset
          v-for="_, i in circles" :key="`${i}${circles.length}`"
          :circles
          :i
          @delete="circles.splice(i, 1)"
        />

        <button mb-8 btn @click="addCircle({ circ: 300 })">
          Add Circle
        </button>
      </div>
    </div>
  </div>
</template>
