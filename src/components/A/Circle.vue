<script setup lang="ts">
export interface CircleProps {
  rad?: number
  circ?: number
  rotate?: number
  strokeWidth?: number
  dashCount?: number
  dashLength?: number
  dashCenter?: boolean
  dashInvert?: boolean
}

const props = withDefaults(defineProps<CircleProps>(), circleDefaults)

const offset = computed(() => {
  const resetOffset = -90 // reset to top (default starts at 3 o'clock...)
  const len = degToCirc(props.dashLength, props.circ)
  const rotate = rotatePx(len / 2, props.circ) * (props.dashInvert ? 1 : -1)
  const centerOffset = !props.dashCenter ? 0 : rotate
  return resetOffset + centerOffset + props.rotate
})

const strokeDash = computed(() => {
  if (props.dashCount > 0) {
    return {
      'stroke-dasharray': strokeDashArray(
        props.circ,
        props.dashCount,
        props.dashLength,
        props.dashInvert,
      ),
    }
  }
  if (props.dashLength > 0) {
    const len = degToCirc(props.dashLength, props.circ)
    return {
      'stroke-dasharray': `${len} ${props.circ - len}`,
    }
  }
})

defineRender(() => h('circle', {
  'cx': props.rad,
  'cy': props.rad,
  'r': circToRad(props.circ),
  // 'stroke': isDark.value ? 'white' : 'black',
  'stroke-width': props.strokeWidth,
  ...strokeDash.value,
  'style': {
    'transform-origin': 'center',
    'transform': `rotate(${offset.value}deg)`,
  },
}))
</script>
