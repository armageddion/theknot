<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()
</script>

<template>
  <div min-h-80>
    <h2 my-3 text-4xl text-secondary>
      {{ t('rsvp.title') }}
    </h2>
    <div max-w-md prose v-html="md.render(t('rsvp.description'))" />
    <a
      href="https://forms.gle/78hXDDBZdCShWLVV9"
      target="_blank"
      rel="noopener noreferrer"
      flex items-center justify-center gap-2 btn
    >
      {{ t('rsvp.link') }}
      <span i-ph:arrow-up-right />
    </a>
  </div>
</template>
