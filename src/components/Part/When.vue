<script setup lang="ts">
import markdownit from 'markdown-it'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const { t } = useI18n()
const md = markdownit()
const formula = ref<HTMLElement>()

const formulaHtml = computed(() => {
  const f = `e{-\\left(\\frac{2}{15}\\mathit{${t('when.age')}}+3\\right)}`
  return katex.renderToString(f, { throwOnError: false })
})
</script>

<template>
  <div max-w-6xl w-full flex flex-col gap-6 py-32 lg:flex-row lg:gap-16>
    <div w-full lg="w-1/2">
      <h2 my-3 text-4xl text-secondary>
        {{ t('when.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('when.descriptionA'))" />
      <div
        id="formula"
        ref="formula"
        relative my-2 inline-block p-4 text-3xl
        v-html="formulaHtml"
      />
      <div max-w-md prose v-html="md.render(t('when.descriptionB'))" />
    </div>
    <div lg="w-1/2" w-full flex items-center gap-4>
      <TheAge />
    </div>
  </div>
</template>

<style scoped>
#formula::before {
  position: absolute;
  content: '';
  width: 110%;
  height: 110%;
  top: -5%;
  left: -5%;
  z-index: -1;
  background: oklch(var(--color-primary));
  transform: rotate(0.4deg);
}
</style>
