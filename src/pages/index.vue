<script setup lang="ts">
import Lenis from '@studio-freight/lenis'

defineOptions({
  name: 'IndexPage',
})

const { locale } = useI18n()
const scroll = useSharedScroll()
const { refresh } = useImages()

onMounted(async () => {
  if (typeof document === 'undefined')
    return

  requestAnimationFrame(raf)

  const lenis = new Lenis({
    wrapper: document.body,
    smoothWheel: true,
    infinite: true,
  })
  lenis.on('scroll', (e: any) => {
    scroll.y.value = e.scroll
  })
  watch(locale, () => lenis.resize())

  const restore = () => {
    window.history.scrollRestoration = 'manual'
  }
  restore()
  window.addEventListener('resize', restore)

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
})

watch(scroll.y, (ny, oy) => {
  if (ny < 1000 && oy >= 1000)
    refresh()
})

const sections = ['welcome', 'where', 'when', 'what', 'gift', 'rsvp']
const refs = useTemplateRefsList<HTMLElement>()
const bounding = computed(() => Object.fromEntries(
  sections.map((label, i) => [
    label,
    useElementBounding(refs.value[i]),
  ]),
))

provide('sections', sections)
provide('bounding', bounding)
</script>

<template>
  <TheToc />

  <TheHero id="top" />

  <div grid auto-rows-auto grid-cols-8 w-full gap-2 overflow-hidden style="grid-template-rows: repeat(auto-fill, minmax(200px, 1fr))">
    <section style="--s: 8; --c: 1; --r: 1" my-80 flex-center p-4>
      <PartWelcome id="welcome" :ref="refs.set" text-lg />
    </section>

    <AFigure :i="0" style="--s: 4; --c: 2; --r: 2" aspect-video />
    <AFigure :i="1" style="--s: 3; --c: 6; --r: 3" aspect="4/3" />
    <AFigure :i="2" style="--s: 2; --c: 4; --r: 4" aspect-video />
    <AFigure :i="3" style="--s: 2; --c: 2; --r: 5" aspect-video />

    <section
      id="where" :ref="refs.set"
      style="--s: 8; --c: 1; --r: 10"
      my-80 flex-center p-4 sm:pl-40
    >
      <PartWhere />
    </section>

    <AFigure :i="4" style="--s: 3; --c: 1; --r: 11" aspect-video />
    <AFigure :i="5" style="--s: 2; --c: 4; --r: 12" aspect-video />
    <AFigure :i="6" style="--s: 2; --c: 6; --r: 13" aspect-video />

    <section
      id="when" :ref="refs.set"
      style="--s: 8; --c: 1; --r: 20"
      my-80 flex-center p-4 sm:pl-40
    >
      <PartWhen />
    </section>

    <AFigure :i="7" style="--s: 4; --c: 5; --r: 21" aspect-video />
    <AFigure :i="8" style="--s: 3; --c: 2; --r: 22" aspect-video />
    <AFigure :i="9" style="--s: 2; --c: 5; --r: 23" aspect="4/3" />
    <!-- <AFigure style="--s: 2; --c: 7; --r: 24" aspect-video /> -->

    <section
      id="what" :ref="refs.set"
      style="--s: 8; --c: 1; --r: 30"
      my-80 flex-center p-4 sm:pl-40 xl:pl-0
    >
      <PartWhat />
    </section>

    <AFigure :i="10" style="--s: 2; --c: 1; --r: 31" aspect-video />
    <AFigure :i="11" style="--s: 3; --c: 3; --r: 32" aspect-video />
    <AFigure :i="12" style="--s: 2; --c: 6; --r: 33" aspect-video />

    <section
      id="gift" :ref="refs.set"
      style="--s: 8; --c: 1; --r: 40"
      my-80 flex-center p-4 sm:pl-40 xl:pl-0
    >
      <PartGift />
    </section>

    <AFigure :i="13" style="--s: 4; --c: 5; --r: 41" aspect-video />
    <AFigure :i="14" style="--s: 3; --c: 2; --r: 42" aspect-video />
    <AFigure :i="15" style="--s: 2; --c: 5; --r: 43" left aspect-video />

    <section style="--s: 8; --c: 1; --r: 50" my-80 flex-center p-4>
      <PartRespond id="rsvp" :ref="refs.set" text-lg />
    </section>
  </div>

  <TheHero footer />
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style>
section {
  grid-column: var(--c) / span var(--s);
  grid-row: var(--r);
  position: relative;

  h2 {
    position: relative;
    width: max-content;
  }

  h2::before {
    position: absolute;
    content: '';
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
    z-index: -1;
    background: var(--color-accent);
    opacity: 0.1;
    transform: rotate(-0.8deg);
  }
}

[grid] > section:not(:first-child, :last-child) {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: 120%;
    z-index: -1;
    transform: rotate(0.4deg);
    background: var(--color-secondary);
    opacity: 0.04;
  }
}
.dark {
  [grid] > section::before {
    opacity: 0.0125;
  }
}
</style>
