<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()
</script>

<template>
  <div max-w-6xl w-full flex flex-col gap-6 py-32 lg:flex-row lg:gap-16>
    <div w-full lg="w-1/2">
      <h2 my-3 text-4xl text-secondary>
        {{ t('when.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('when.description'))" />
    </div>
    <div lg="w-1/2" w-full flex gap-4>
      <TheAge />
    </div>
  </div>
</template>
