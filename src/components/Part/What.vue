<script setup lang="ts">
import markdownit from 'markdown-it'

let wordcloud: Function
const MIN = 18
const RANGE = 16
const md = markdownit()
const { t, locale } = useI18n()
const { y } = useSharedScroll()
const canvas = ref<HTMLElement>()
const root = ref<HTMLElement>()
const isVisible = useElementVisibility(root, { threshold: 0.9 })
const cloudItems = ref<any>([])

onMounted(async () => {
  if (typeof window === 'undefined')
    return
  wordcloud = (await import('wordcloud')).default
  refresh()
  canvas.value?.addEventListener('wordclouddrawn', (event) => {
    // @ts-expect-error hush
    ;[...event.target?.children || []].forEach((child, i) => {
      const style = child.style.cssText
      cloudItems.value[i] = { style, text: child.textContent }
    })
  })
})
watchThrottled([y, locale], () =>
  isVisible.value && refresh(), { throttle: 800 })

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
  <div ref="root" max-w-6xl w-full flex flex-col items-center gap-6 lg:flex-row lg:gap-16>
    <div lg="w-1/2" w-full sm:w-max>
      <h2 my-3 text-4xl text-secondary>
        {{ t('what.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('what.description'))" />
    </div>
    <div lg="w-1/2 " relative min-h-56 w-full flex select-none items-center gap-8>
      <div ref="canvas" class="absolute!" invisible h-full min-h-56 w-full @click="refresh" />
      <div relative h-full min-h-56 w-full cursor-pointer @click="refresh">
        <span
          v-for="{ style, text }, i in cloudItems"
          :key="i"
          transition-all
          transition-duration-400
          :style
          v-text="text"
        />
      </div>
    </div>
  </div>
</template>
