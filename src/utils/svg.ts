import type { MaybeRef } from 'vue'

export function rand(max: number) {
  return Math.floor(Math.random() * max)
}

export function circToRad(circ: number) {
  return circ / (2 * Math.PI)
}

export function radToCirc(rad: number) {
  return rad * (2 * Math.PI)
}

export function rotatePx(circ: number, px: number) {
  return (px / circ) * 360
}

export function strokeDashArray(
  circ: MaybeRef<number>,
  count: MaybeRef<number>,
  width: number,
  invert?: boolean,
) {
  const gap = (unref(circ) / unref(count)) - width
  return !invert ? [width, gap] : [gap, width]
}
