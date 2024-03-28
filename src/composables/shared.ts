import type { UseElementBoundingReturn } from '@vueuse/core'
import { theme } from '@unocss/preset-mini'

export const useSharedScroll = createGlobalState(() => {
  const y = ref(0)
  return { y }
})

export const useLargeScreen = createGlobalState(() => useMediaQuery(`(min-width: ${theme.breakpoints.sm})`))

export function getBoundsOffset(el: UseElementBoundingReturn, height: number) {
  // 0 at the mid, +/-1 at top and bot
  return (el.top.value + el.height.value / 2 - height / 2) / (el.height.value * 2)
}

export function goTo(href: string, block: ScrollLogicalPosition = 'center') {
  const el = document.querySelector(href)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block })
}
