<script setup lang="ts">
const props = defineProps<{ footer?: boolean }>()

const { t } = useI18n()
const tag = computed(() => (props.footer ? 'footer' : 'header'))
const el = ref<HTMLElement | null>(null)
const bounds = useElementBounding(el)
const isLargeScreen = useLargeScreen()
const scaleBase = computed(() => (isLargeScreen.value ? 1.25 : 2.25))
const scale = ref(scaleBase.value)
const titleHtml = computed(() => isLargeScreen.value ? t('meta.title') : t('meta.title').replace(/\s/g, '<br>'))

function onScroll() {
  const offset = (bounds.top.value + bounds.height.value / 2 - window.innerHeight / 2) / (window.innerHeight)
  if (Math.abs(offset) < 1)
    scale.value = scaleBase.value + offset * -0.35
}

onMounted(() => {
  if (typeof window !== 'undefined')
    window.addEventListener('scroll', onScroll)
})
</script>

<template>
  <component
    :is="tag"
    ref="el"
    relative h-screen w-full flex-center flex-col overflow-hidden
  >
    <div
      absolute left-0 top-0 z--1 h-full w-full
      bg-cover bg-center bg-no-repeat
      :class="isDark ? 'opacity-25' : 'opacity-10'"
      mix-blend-multiply
      will-change="background-size"
      style="background-image: url('/media/lg/4.jpg')"
      :style="{
        backgroundSize: `${scale * 100}%`,
      }"
    >
      <div absolute left-0 top-0 h-40 w-full from-white to-transparent bg-gradient-to-b />
      <div absolute bottom-0 left-0 h-40 w-full from-white to-transparent bg-gradient-to-t />
    </div>
    <div max-w-md>
      <h1
        text-nowrap text-secondary font-bold
        text="[4rem]"
        v-html="titleHtml"
      />
      <p max-w-md>
        {{ t('meta.description') }}
      </p>
    </div>
  </component>
</template>
