<script setup lang="ts">
const props = defineProps<{
  footer?: boolean
}>()

const { t } = useI18n()

const tag = computed(() => (props.footer ? 'footer' : 'header'))
</script>

<template>
  <component
    :is="tag"
    relative h-screen w-full flex-center flex-col overflow-hidden
  >
    <div
      absolute left-0 top-0 z--1 h-full w-full
      bg-cover bg-center
      :class="isDark ? 'opacity-25' : 'opacity-10'"
      mix-blend-multiply
      style="background-image: url('/slide/slide_4.jpg')"
    >
      <div absolute left-0 top-0 h-40 w-full from-white to-transparent bg-gradient-to-b />
      <div absolute bottom-0 left-0 h-40 w-full from-white to-transparent bg-gradient-to-t />
    </div>
    <h1 text-secondary text="[4rem]" font-bold>
      {{ t('meta.title') }}
    </h1>
    <p max-w-md>
      {{ t('meta.description') }}
    </p>
  </component>
</template>
