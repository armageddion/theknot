<script setup lang="ts">
const RAD = 50
const CIRC = radToCirc(RAD)
const duration = 800

// cycle random demo transitions
const transitionFns = [easeOutBounce, easeInOutCubic, easeInOutExpo, easeInOutBack]
const { state: transition, next: nextTransition } = useCycleList(transitionFns)

// set up reactive ring values
const base = {
  dash: shallowRef(6),
  circ: shallowRef(CIRC),
  rotate: shallowRef(-1 * rotatePx(CIRC, 6 / 2)),
}
const rotate = useTransition(base.rotate, { duration, transition })
const circ = useTransition(base.circ, { duration, transition })
const dash = useTransition(base.dash, { duration, transition })

// animate ring values
const { pause, resume, isActive } = useIntervalFn(tick, duration * 1.5)
function tick() {
  base.rotate.value = base.rotate.value + 90
  base.circ.value = randomCirc()
  base.dash.value = rand(12) + 4
  nextTransition()
}
function randomCirc() {
  const randNum = rand(16)
  const maybeNeg = randNum % 2 ? 1 : -1
  const randSize = randNum * maybeNeg + RAD
  return radToCirc(randSize)
}

defineRender(() => h('svg', {
  width: RAD * 2,
  height: RAD * 2,
  class: 'overflow-visible',
  fill: 'none',
  onClick: isActive.value ? pause : resume,
}, [
  // static solid ring
  h('circle', {
    'cx': RAD,
    'cy': RAD,
    'r': RAD,
    'stroke': isDark.value ? 'white' : 'black',
    'stroke-width': 2,
  }),
  // dynamic dashed ring
  h('circle', {
    'cx': RAD,
    'cy': RAD,
    'r': circToRad(unref(circ)),
    'stroke': isDark.value ? 'white' : 'black',
    'stroke-width': unref(dash),
    'stroke-dasharray': strokeDashArray(circ, 4, 6),
    'style': {
      'transform-origin': 'center',
      'transform': `rotate(${rotate.value}deg)`,
    },
  }),
]))
</script>
