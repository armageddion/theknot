<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()
const isLargeScreen = useLargeScreen()
</script>

<template>
  <div max-w-6xl min-w-0 w-full flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16>
    <div order-1 lg:order-2>
      <h2 my-3 text-4xl text-secondary>
        {{ t('gift.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('gift.description', { venmo, paypal }))" />
    </div>
    <template v-if="isLargeScreen">
      <img
        src="/venmo.png"
        alt="Gift_v"
        :class="isDark ? 'filter-invert mix-blend-screen' : 'mix-blend-multiply'"
        order-2 h-40 w-40 cursor-none p6 transition-transform lg:order-1 hover:scale-175
      >
      <img
        src="/paypal.png"
        alt="Gift_p"
        :class="isDark ? 'filter-invert mix-blend-screen' : 'mix-blend-multiply'"
        order-3 h-40 w-40 cursor-none p6 transition-transform lg:order-3 hover:scale-175
      >
    </template>
    <div v-else order-2 flex flex-nowrap items-center>
      <img
        src="/venmo.png"
        alt="Gift_v"
        :class="isDark ? 'filter-invert mix-blend-screen' : 'mix-blend-multiply'"
        w="1/2" cursor-none p6 transition-transform hover:scale-175
      >
      <img
        src="/paypal.png"
        alt="Gift_p"
        :class="isDark ? 'filter-invert mix-blend-screen' : 'mix-blend-multiply'"
        w="1/2" cursor-none p6 transition-transform hover:scale-175
      >
    </div>
  </div>
</template>
