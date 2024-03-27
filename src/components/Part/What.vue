<script setup lang="ts">
import markdownit from 'markdown-it'
import wordcloud from 'wordcloud'

const { t } = useI18n()
const md = markdownit()
const canvas = ref<HTMLCanvasElement>()

watchEffect(() => {
  const el = canvas.value
  if (!el)
    return
  const list: [string, number][] = t('what.list')
    .split('\n')
    .map(line => line.replace('- ', ''))
    .map(line => [line, rand(16) + 18])
  wordcloud(el, {
    list,
    backgroundColor: 'transparent',
    color: 'var(--color-secondary)',
    fontFamily: 'Rubik',
  })
})
</script>

<template>
  <div max-w-6xl w-full flex flex-col gap-6 py-32 lg:flex-row lg:gap-16>
    <div w-full lg="w-1/2 order-2">
      <h2 my-3 text-4xl text-secondary>
        {{ t('what.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('what.description'))" />
    </div>
    <div lg="w-1/2 order-1" w-full flex items-center gap-8>
      <div ref="canvas" h-full w-full />
    </div>
  </div>
</template>
