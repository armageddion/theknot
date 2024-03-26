<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()
</script>

<template>
  <h2 my-3 text-4xl text-secondary>
    {{ t('what.title') }}
  </h2>
  <div max-w-md prose v-html="md.render(t('what.description'))" />
</template>
