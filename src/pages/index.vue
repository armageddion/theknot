<script setup lang="ts">
import Lenis from '@studio-freight/lenis'
import markdownit from 'markdown-it'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()

const md = markdownit()

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
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
</script>

<template>
  <div grid auto-rows-fr grid-cols-8 w-full>
    <!-- placeholder images -->
    <div bg-primary col-span-4 row-span-1 col-start-5 row-start-1 />
    <div bg-primary col-span-4 row-span-2 col-start-1 row-start-4 />
    <div bg-primary col-span-2 row-span-1 col-start-5 row-start-6 />
    <div bg-primary col-span-2 row-span-2 col-start-7 row-start-7 />
    <div bg-primary col-span-3 row-span-3 col-start-1 row-start-9 />
    <div bg-primary col-span-2 row-span-1 col-start-4 row-start-12 />
    <div bg-primary col-span-3 row-span-2 col-start-6 row-start-13 />
    <div bg-primary col-span-2 row-span-2 col-start-1 row-start-18 />
    <div bg-primary col-span-2 row-span-1 col-start-3 row-start-20 />
    <div bg-primary col-span-4 row-span-2 col-start-5 row-start-21 />
    <div bg-primary col-span-4 row-span-1 col-start-1 row-start-25 />

    <div col-span-4 row-span-4 col-start-3 row-start-1 h-screen flex-center flex-col>
      <h1 text-secondary text="[4rem]" font-bold>
        {{ t('meta.title') }}
      </h1>
      <p max-w-md>
        {{ t('meta.description') }}
      </p>
    </div>

    <div col-span-3 row-span-3 col-start-2 row-start-7>
      <a href="#where">
        <h2 id="where" text-secondary my-3 text-4xl font-bold>
          {{ t('where.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('where.description'))" />
    </div>

    <div col-span-3 row-span-3 col-start-5 row-start-10>
      <a href="#when">
        <h2 id="when" text-secondary my-3 text-4xl font-bold>
          {{ t('when.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('when.description'))" />
    </div>

    <div col-span-3 row-span-3 col-start-2 row-start-14>
      <a href="#what">
        <h2 id="what" text-secondary my-3 text-4xl font-bold>
          {{ t('what.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('what.description'))" />
    </div>

    <div col-span-3 row-span-3 col-start-4 row-start-18>
      <a href="#gift">
        <h2 id="gift" text-secondary my-3 text-4xl font-bold>
          {{ t('gift.title') }}
        </h2>
      </a>
      <div max-w-md prose v-html="md.render(t('gift.description'))" />
    </div>

    <div col-span-4 row-span-4 col-start-3 row-start-22 h-screen flex-center flex-col>
      <h1 text-secondary text="[4rem]" font-bold>
        {{ t('meta.title') }}
      </h1>
      <p max-w-md>
        {{ t('meta.description') }}
      </p>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
