<script setup lang="ts">
import RingCircle from './Circle.vue'

const RAD = 50
const CIRC = radToCirc(RAD)
const duration = 800

// cycle random demo transitions
const transitionFns = [easeOutBounce, easeInOutCubic, easeInOutExpo, easeInOutBack]
const { state: transition, next: nextTransition } = useCycleList(transitionFns)

// set up reactive ring values
const base = {
  circ: shallowRef(CIRC),
  rotate: shallowRef(0),
  strokeWidth: shallowRef(6),
}
const circ = useTransition(base.circ, { duration, transition })
const rotate = useTransition(base.rotate, { duration, transition })
const strokeWidth = useTransition(base.strokeWidth, { duration, transition })

// animate ring values
const { pause, resume, isActive } = useIntervalFn(tick, duration * 1.5)
function tick() {
  base.rotate.value = base.rotate.value + 90
  base.strokeWidth.value = rand(12) + 4
  base.circ.value = (() => {
    const randNum = rand(16)
    const maybeNeg = randNum % 2 ? 1 : -1
    const randSize = randNum * maybeNeg + RAD
    return radToCirc(randSize)
  })()
  nextTransition()
}

defineRender(() => h('svg', {
  width: RAD * 2,
  height: RAD * 2,
  class: 'overflow-visible',
  fill: 'none',
  onClick: isActive.value ? pause : resume,
}, [
  // static solid ring
  h(RingCircle, {
    rad: RAD,
    circ: CIRC,
  }),
  // dynamic dashed ring
  h(RingCircle, {
    rad: RAD,
    circ: circ.value,
    rotate: rotate.value,
    strokeWidth: strokeWidth.value,
    dashCount: 4,
    dashLength: 10,
    dashCenter: true,
  }),
]))
</script>
