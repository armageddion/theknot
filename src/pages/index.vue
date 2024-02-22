<script setup lang="ts">
import TheSlide from '~/components/TheSlide.vue'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
const slide = ref<HTMLElement>()
const { style } = useDraggable(slide, {
  initialValue: { x: 80, y: 400 },
  preventDefault: true,
  stopPropagation: true,
  capture: false,
  containerElement: document.body,
})
</script>

<template>
  <section min-h-screen flex-center>
    <h1 text-xl font-bold>
      {{ t('intro.title') }}
    </h1>
    <div
      ref="slide"
      :style
      absolute
      select-none
    >
      <TheSlide w-xl />
    </div>
    <div absolute-center top="[30%]">
      <TheRing />
    </div>
  </section>
  <section min-h-screen flex-center>
    <h1 text-xl font-bold>
      {{ t('intro.where') }}
    </h1>
  </section>
  <section min-h-screen flex-center>
    <h1 text-xl font-bold>
      {{ t('intro.when') }}
    </h1>
  </section>
  <section min-h-screen flex-center>
    <h1 text-xl font-bold>
      {{ t('intro.give') }}
    </h1>
  </section>
  <footer flex-center py-12>
    <h1 text-xl font-bold>
      {{ t('intro.end') }}
    </h1>
  </footer>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
