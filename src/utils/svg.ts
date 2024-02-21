export function circToRad(circ: number) {
  return circ / (2 * Math.PI)
}

export function radToCirc(rad: number) {
  return rad * (2 * Math.PI)
}

export function rotatePx(circ: number, px: number) {
  return (px / circ) * 360
}

export function strokeDashArray(circ: number, count: number, width: number, invert?: boolean) {
  const gap = (circ / count) - width
  return !invert ? [width, gap] : [gap, width]
}

export function basicAttrs(circ: number, stroke: number) {
  return {
    'cx': 50,
    'cy': 50,
    'r': circToRad(circ),
    'stroke': isDark.value ? 'white' : 'black',
    'stroke-width': stroke,
  }
}

export function easeOutElastic(n: number) {
  if (n === 0)
    return 0
  if (n === 1)
    return 1
  const p = 0.3
  const s = p / 4
  return 2 ** (-10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1
}

export function easeOutBounce(n: number) {
  if (n < (1 / 2.75))
    return 7.5625 * n * n
  else if (n < (2 / 2.75))
    return 7.5625 * (n -= (1.5 / 2.75)) * n + 0.75
  else if (n < (2.5 / 2.75))
    return 7.5625 * (n -= (2.25 / 2.75)) * n + 0.9375
  else
    return 7.5625 * (n -= (2.625 / 2.75)) * n + 0.984375
}
