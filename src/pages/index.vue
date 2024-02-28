<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import markdownit from 'markdown-it'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()

gsap.registerPlugin(ScrollTrigger)
const md = markdownit()

const lenis = new Lenis({
  wrapper: document.body,
  smoothWheel: true,
  infinite: true,
})

onMounted(() => {
  requestAnimationFrame(raf)

  const refresh = () => {
    ScrollTrigger.clearScrollMemory()
    window.history.scrollRestoration = 'manual'
    ScrollTrigger.refresh(true)
  }

  refresh()
  window.addEventListener('resize', refresh)
})

lenis.on('scroll', () => {
  ScrollTrigger.update()
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
</script>

<template>
  <section min-h-screen flex-center>
    <div>
      <h1 text="[4rem]" font-bold>
        {{ t('meta.title') }}
      </h1>
      <p max-w-md>
        {{ t('meta.description') }}
      </p>
    </div>
  </section>

  <section min-h-screen flex-center>
    <div>
      <a href="#where">
        <h2 id="where" my-3 text-4xl font-bold>
          {{ t('where.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('where.description'))" />
    </div>
  </section>

  <section min-h-screen flex-center>
    <div>
      <a href="#when">
        <h2 id="when" my-3 text-4xl font-bold>
          {{ t('when.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('when.description'))" />
    </div>
  </section>

  <section min-h-screen flex-center>
    <div>
      <a href="#what">
        <h2 id="what" my-3 text-4xl font-bold>
          {{ t('what.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('what.description'))" />
    </div>
  </section>

  <section min-h-screen flex-center>
    <div>
      <a href="#gift">
        <h2 id="gift" my-3 text-4xl font-bold>
          {{ t('gift.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('gift.description'))" />
    </div>
  </section>

  <section min-h-screen flex-center>
    <div>
      <h1 text="[4rem]" font-bold>
        {{ t('meta.title') }}
      </h1>
      <p max-w-md>
        {{ t('meta.description') }}
      </p>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
