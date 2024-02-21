<script setup lang="ts">
import { TransitionPresets } from '@vueuse/core'

const SIZE = 100
const CIRC = radToCirc(SIZE / 2)

const transitionFns = [easeOutElastic, easeOutBounce, TransitionPresets.easeInOutCubic]
const { state: transitionFn, next: nextTransition } = useCycleList(transitionFns)
const rotateBase = ref(-1 * rotatePx(CIRC, 6 / 2))
const rotate = useTransition(rotateBase, { duration: 1000, transition: transitionFn })

const ringA = computed(() => h('svg', {
  width: SIZE,
  height: SIZE,
  class: 'overflow-visible',
  fill: 'none',
  onClick: () => {
    rotateBase.value = rotateBase.value + 90
    nextTransition()
  },
}, [
  h('circle', { ...basicAttrs(CIRC, 2) }),
  h('circle', {
    ...basicAttrs(CIRC, 6),
    'stroke-dasharray': strokeDashArray(CIRC, 4, 6),
    'style': {
      'transform-origin': 'center',
      'transform': `rotate(${rotate.value}deg)`,
    },
  }),
]))

defineRender(() => ringA.value)
</script>
