<script setup lang="ts">
import Lenis from '@studio-freight/lenis'
import markdownit from 'markdown-it'

defineOptions({
  name: 'IndexPage',
})

const md = markdownit()
const { t } = useI18n()
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

  <div grid auto-rows-auto grid-cols-8 w-full gap-2 style="grid-template-rows: repeat(auto-fill, minmax(200px, 1fr))">
    <section style="--s: 8; --c: 1; --r: 1" min-h-screen flex-center p-4>
      <div id="welcome" :ref="refs.set">
        <h2 my-3 text-4xl text-secondary>
          {{ t('welcome.title') }}
        </h2>
        <div max-w-md prose v-html="md.render(t('welcome.description'))" />
      </div>
    </section>

    <TheFigure src="/slide/slide_1.jpg" style="--c: 1; --r: 4; --s: 4" aspect-video />
    <TheFigure src="/slide/slide_3.jpg" style="--c: 5; --r: 5; --s: 3" aspect="4/3" />
    <TheFigure src="/slide/slide_2.jpg" style="--c: 3; --r: 6; --s: 2" aspect-video />
    <TheFigure src="/slide/slide_5.jpg" style="--c: 1; --r: 7; --s: 2" aspect-video />

    <section id="where" :ref="refs.set" p-4 style="--s: 3; --c: 5; --r: 8">
      <h2 my-3 text-4xl text-secondary>
        {{ t('where.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('where.description'))" />
    </section>

    <TheFigure src="/slide/slide_6.jpg" style="--c: 1; --r: 9; --s: 3" aspect-video />
    <TheFigure src="/slide/slide_7.jpg" style="--c: 4; --r: 10; --s: 2" aspect-video />
    <TheFigure src="/slide/slide_8.jpg" style="--c: 6; --r: 11; --s: 2" aspect-video />

      <h2 my-3 text-4xl text-secondary>
        {{ t('when.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('when.description'))" />
    <section id="when" :ref="refs.set" p-4 style="--s: 4; --c: 2; --r: 12">
    </section>

    <section h-24 style="--s: 8; --c: 1; --r: 13" />
    <TheFigure src="/slide/slide_9.jpg" style="--c: 5; --r: 14; --s: 4" aspect-video />
    <TheFigure src="/slide/slide_10.jpg" style="--c: 2; --r: 15; --s: 3" aspect-video />
    <TheFigure src="/slide/slide_11.jpg" style="--c: 5; --r: 16; --s: 2" aspect="4/3" />
    <TheFigure src="/slide/slide_12.jpg" style="--c: 7; --r: 17; --s: 2" aspect-video />

    <section id="what" :ref="refs.set" p-4 style="--s: 4; --c: 3; --r: 19">
      <h2 my-3 text-4xl text-secondary>
        {{ t('what.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('what.description'))" />
    </section>

    <section h-24 style="--s: 8; --c: 1; --r: 20" />
    <TheFigure src="/slide/slide_13.jpg" style="--c: 1; --r: 21; --s: 2" aspect-video />
    <TheFigure src="/slide/slide_14.jpg" style="--c: 3; --r: 22; --s: 3" aspect-video />
    <section h-24 style="--s: 8; --c: 1; --r: 23" />

    <section id="gift" :ref="refs.set" p-4 style="--s: 4; --c: 3; --r: 27">
      <h2 my-3 text-4xl text-secondary>
        {{ t('gift.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('gift.description'))" />
    </section>

    <section h-24 style="--s: 8; --c: 1; --r: 28" />

    <TheFigure src="/slide/slide_9.jpg" style="--c: 5; --r: 29; --s: 4" aspect-video />
    <TheFigure src="/slide/slide_10.jpg" style="--c: 2; --r: 30; --s: 3" aspect-video />

    <section style="--s: 8; --c: 1; --r: 31" min-h-screen flex-center p-4>
      <div id="rsvp" :ref="refs.set" min-h-80>
        <h2 my-3 text-4xl text-secondary>
          {{ t('rsvp.title') }}
        </h2>
        <div max-w-md prose v-html="md.render(t('rsvp.description'))" />
      </div>
    </section>
  </div>

  <TheHero footer />
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style scoped>
section {
  grid-column: var(--c) / span var(--s);
  grid-row: var(--r);
  position: relative;
}

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
  background: oklch(var(--color-accent));
  opacity: 0.1;
  transform: rotate(-0.8deg);
}
</style>
