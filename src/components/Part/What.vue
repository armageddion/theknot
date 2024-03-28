<script setup lang="ts">
import markdownit from 'markdown-it'
import wordcloud from 'wordcloud'

const MIN = 18
const RANGE = 16
const { t, locale } = useI18n()
const md = markdownit()
const canvas = ref<HTMLCanvasElement>()
const { y } = useSharedScroll()
const root = ref<HTMLElement>()
const isVisible = useElementVisibility(root, { threshold: 0.9 })

onMounted(refresh)
watchThrottled([y, locale], () => isVisible.value && refresh(), { throttle: 300 })

function refresh() {
  const el = canvas.value
  if (!el)
    return
  const list = t('what.list')
    .split('\n')
    .map(line => [line.replace('- ', ''), rand(RANGE) + MIN])
  wordcloud(el, {
    list,
    backgroundColor: 'transparent',
    color: (_: any, weight: number) => {
      const alpha = 100 - (weight / (MIN + RANGE)) * 100
      return `color-mix(in oklab, var(--color-secondary), var(--color-primary) ${alpha}%)`
    },
    fontFamily: 'Rubik',
    fontWeight: 700,
  })
}
</script>

<template>
  <div ref="root" max-w-6xl w-full flex flex-col gap-6 lg:flex-row lg:gap-16>
    <div w-full lg="w-1/2 order-2">
      <h2 my-3 text-4xl text-secondary>
        {{ t('what.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('what.description'))" />
    </div>
    <div lg="w-1/2 order-1" w-full flex select-none items-center gap-8>
      <div ref="canvas" h-full w-full @click="refresh" />
    </div>
  </div>
</template>
