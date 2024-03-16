<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import markdownit from 'markdown-it'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()

const md = markdownit()

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  wrapper: document.body,
  smoothWheel: true,
  infinite: true,
})

onMounted(() => {
  requestAnimationFrame(raf)

  const refresh = () => {
    window.history.scrollRestoration = 'manual'
  }

  refresh()
  window.addEventListener('resize', refresh)
  initGsapScroll()
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

function initGsapScroll() {
  const gridItems = document.querySelectorAll('figure')

  // Loop through each grid item to add animations
  gridItems.forEach((item) => {
    // Get the previous element sibling for the current item
    const previousElementSibling = item.previousElementSibling
    // Determine if the current item is on the left side based on its position relative to the previous item
    const isLeftSide = previousElementSibling && (item.offsetLeft + item.offsetWidth <= previousElementSibling.offsetLeft + 1)
    // Determine the origin for transformations (either 100 or 0 depending on position)
    const originX = isLeftSide ? 100 : 0

    gsap
      .timeline({
        defaults: {
          // duration: 1,
          ease: 'power4',
        },
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=15%',
          end: '+=100%',
          scrub: true,
        },
      })
      .fromTo(item.querySelector('a'), {
        scale: 0,
        transformOrigin: `${originX}% 0%`,
      }, {
        scale: 1,
      })
      .fromTo(item.querySelector('span'), {
        scale: 5,
        transformOrigin: `${originX}% 0%`,
      }, {
        scale: 1,
      }, 0)
  })
}
</script>

<template>
  <header h-screen w-full flex-center flex-col>
    <h1 text-secondary text="[4rem]" font-bold>
      {{ t('meta.title') }}
    </h1>
    <p max-w-md>
      {{ t('meta.description') }}
    </p>
  </header>

  <div
    grid auto-rows-auto grid-cols-8 w-full
    style="grid-template-rows: repeat(auto-fill, minmax(200px, 1fr))"
  >

  <section p-4 style="--s: 4; --c: 2; --r: 2">
      <a href="#welcome">
        <h2 id="welcome" my-3 text-4xl text-secondary font-bold>
          {{ t('welcome.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('welcome.description'))" />
    </section>

    <TheFigure src="/slide/slide_2.jpg" style="--c: 1; --r: 4; --s: 4" aspect-video />
    <TheFigure src="/slide/slide_3.jpg" style="--c: 5; --r: 5; --s: 3" aspect="4/3" />
    <TheFigure src="/slide/slide_4.jpg" style="--c: 3; --r: 6; --s: 2" aspect-video />
    <TheFigure src="/slide/slide_5.jpg" style="--c: 1; --r: 7; --s: 2" aspect-video />

    <section p-4 style="--s: 3; --c: 5; --r: 8">
      <a href="#where">
        <h2 id="where" my-3 text-4xl text-secondary font-bold>
          {{ t('where.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('where.description'))" />
    </section>

    <TheFigure src="/slide/slide_6.jpg" style="--c: 1; --r: 9; --s: 3" aspect-video />
    <TheFigure src="/slide/slide_7.jpg" style="--c: 4; --r: 10; --s: 2" aspect-video />
    <TheFigure src="/slide/slide_8.jpg" style="--c: 6; --r: 11; --s: 2" aspect-video />

    <section p-4 style="--s: 4; --c: 2; --r: 12">
      <a href="#when">
        <h2 id="when" my-3 text-4xl text-secondary font-bold>
          {{ t('when.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('when.description'))" />
    </section>

    <section h-24 style="--s: 8; --c: 1; --r: 13" />
    <TheFigure src="/slide/slide_9.jpg" style="--c: 5; --r: 14; --s: 4" aspect-video />
    <TheFigure src="/slide/slide_10.jpg" style="--c: 2; --r: 15; --s: 3" aspect-video />
    <TheFigure src="/slide/slide_11.jpg" style="--c: 5; --r: 16; --s: 2" aspect="4/3" />
    <TheFigure src="/slide/slide_12.jpg" style="--c: 7; --r: 17; --s: 2" aspect-video />

    <section p-4 style="--s: 4; --c: 3; --r: 19">
      <a href="#what">
        <h2 id="what" my-3 text-4xl text-secondary font-bold>
          {{ t('what.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('what.description'))" />
    </section>

    <section h-24 style="--s: 8; --c: 1; --r: 20" />
    <TheFigure src="/slide/slide_13.jpg" style="--c: 1; --r: 21; --s: 2" aspect-video />
    <TheFigure src="/slide/slide_14.jpg" style="--c: 3; --r: 22; --s: 3" aspect-video />
    <section h-24 style="--s: 8; --c: 1; --r: 23" />

    <section p-4 style="--s: 4; --c: 5; --r: 27">
      <a href="#gift">
        <h2 id="gift" my-3 text-4xl text-secondary font-bold>
          {{ t('gift.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('gift.description'))" />
    </section>
  </div>

  <footer h-screen w-full flex-center flex-col>
    <h1 text-secondary text="[4rem]" font-bold>
      {{ t('meta.title') }}
    </h1>
    <p max-w-md>
      {{ t('meta.description') }}
    </p>
  </footer>
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
</style>
