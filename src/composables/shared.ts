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

export function goTo(href: string) {
  const { lenis } = useLenisScroll()
  const el = document.querySelector(href) as HTMLElement
  if (el && lenis.value) {
    const bounds = el.getBoundingClientRect()
    const elCenter = bounds.top + bounds.height / 2 + window.scrollY - window.innerHeight / 2
    // const elCenter = el.offsetTop + el.offsetHeight / 2 - window.innerHeight / 2
    lenis.value.scrollTo(elCenter, {
      duration: 4,
      easing: easeInOutCubic,
    })
  }
}
