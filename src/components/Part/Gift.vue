<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()
</script>

<template>
  <h2 my-3 text-4xl text-secondary>
    {{ t('gift.title') }}
  </h2>
  <div max-w-md prose v-html="md.render(t('gift.description'))" />
  <img src="/venmo.png" alt="Gift">
</template>
