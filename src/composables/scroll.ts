import Lenis from '@studio-freight/lenis'

export const useLenisScroll = createSharedComposable(() => {
  const scroll = useSharedScroll()
  const { promises } = useImages()

  if (typeof document === 'undefined') {
    return {
      lenis: ref<Lenis>(),
      init: () => {},
    }
  }

  const lenis = ref<Lenis>(new Lenis({
    wrapper: document.body,
    smoothWheel: true,
    syncTouch: true,
    infinite: true,
  }))

  function init() {
    const { locale } = useI18n()
    lenis.value.on('scroll', (e: any) => (scroll.y.value = e.scroll))
    watch(locale, () => lenis.value.resize())
    const restore = () => (window.history.scrollRestoration = 'manual')
    window.addEventListener('resize', restore)
    requestAnimationFrame(raf)
    restore()
    Promise.all(promises).then(() => lenis.value.resize())
  }

  function raf(time: number) {
    lenis.value.raf(time)
    requestAnimationFrame(raf)
  }

  return {
    lenis,
    init,
  }
})
