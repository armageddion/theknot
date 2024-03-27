import type { MaybeRef } from 'vue'
import type { CircleProps } from '~/components/The/Circle.vue'

export const circleDefaults: CircleProps = {
  rad: 50,
  circ: radToCirc(50),
  rotate: 0,
  strokeWidth: 2,
  dashCount: 0,
  dashLength: 0,
  dashCenter: true,
  dashInvert: false,
}

export function rand(max: number) {
  return Math.floor(Math.random() * max)
}

export function circToRad(circ: number) {
  return circ / (2 * Math.PI)
}

export function radToCirc(rad: number) {
  return rad * (2 * Math.PI)
}

export function rotatePx(px: number, circ: number) {
  return (px / circ) * 360
}

export function degToCirc(deg: number, circ: number) {
  return (circ / 360) * deg
}

export function strokeDashArray(
  circ: MaybeRef<number>,
  count: MaybeRef<number>,
  width: MaybeRef<number>,
  invert?: MaybeRef<boolean>,
) {
  const w = degToCirc(unref(width), unref(circ))
  const gap = (unref(circ) / unref(count)) - w
  return !unref(invert) ? [w, gap] : [gap, w]
}
