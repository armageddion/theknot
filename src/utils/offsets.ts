import type { UseElementBoundingReturn } from '@vueuse/core'

// 0 at the mid, +/-1 at top and bot
export function getBoundsOffset(el: UseElementBoundingReturn, height: number) {
  return (el.top.value + el.height.value / 2 - height / 2) / (el.height.value * 2)
}
