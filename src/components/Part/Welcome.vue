<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()
</script>

<template>
  <div>
    <h2 my-3 text-4xl text-secondary>
      {{ t('welcome.title') }}
    </h2>
    <div max-w-md prose v-html="md.render(t('welcome.description'))" />
  </div>
</template>
