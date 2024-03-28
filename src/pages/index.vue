<script setup lang="ts">
import Lenis from '@studio-freight/lenis'

defineOptions({
  name: 'IndexPage',
})

const { locale } = useI18n()
const scroll = useSharedScroll()

onMounted(() => {
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

  const refresh = () => {
    window.history.scrollRestoration = 'manual'
  }

  refresh()
  window.addEventListener('resize', refresh)

  watch(locale, () => lenis.resize())

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
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

    <AFigure style="--c: 1; --r: 4; --s: 4" aspect-video />
    <AFigure style="--c: 5; --r: 5; --s: 3" aspect="4/3" />
    <AFigure style="--c: 3; --r: 6; --s: 2" aspect-video />
    <AFigure style="--c: 1; --r: 7; --s: 2" aspect-video />

    <section id="where" :ref="refs.set" style="--s: 8; --c: 1; --r: 8" my-80 flex-center p-4 sm:pl-40>
      <PartWhere />
    </section>

    <AFigure style="--c: 1; --r: 9; --s: 3" aspect-video />
    <AFigure style="--c: 4; --r: 10; --s: 2" aspect-video />
    <AFigure style="--c: 6; --r: 11; --s: 2" aspect-video />

    <section id="when" :ref="refs.set" style="--s: 8; --c: 1; --r: 12" my-80 flex-center p-4 sm:pl-40>
      <PartWhen />
    </section>

    <div h-24 style="--s: 8; --c: 1; --r: 13" />
    <AFigure style="--c: 5; --r: 14; --s: 4" aspect-video />
    <AFigure style="--c: 2; --r: 15; --s: 3" aspect-video />
    <AFigure style="--c: 5; --r: 16; --s: 2" aspect="4/3" />
    <AFigure style="--c: 7; --r: 17; --s: 2" aspect-video />

    <section id="what" :ref="refs.set" style="--s: 8; --c: 1; --r: 19" my-80 flex-center p-4 sm:pl-40 xl:pl-0>
      <PartWhat />
    </section>

    <div h-24 style="--s: 8; --c: 1; --r: 20" />
    <AFigure style="--c: 1; --r: 21; --s: 2" aspect-video />
    <AFigure style="--c: 3; --r: 22; --s: 3" aspect-video />
    <div h-24 style="--s: 8; --c: 1; --r: 23" />

    <section id="gift" :ref="refs.set" style="--s: 8; --c: 1; --r: 27" my-80 flex-center p-4 sm:pl-40 xl:pl-0>
      <PartGift />
    </section>

    <div h-24 style="--s: 8; --c: 1; --r: 28" />

    <AFigure style="--c: 5; --r: 29; --s: 4" aspect-video />
    <AFigure style="--c: 2; --r: 30; --s: 3" aspect-video />

    <section style="--s: 8; --c: 1; --r: 31" my-80 flex-center p-4>
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
