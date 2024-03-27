<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const lg = markdownit()
</script>

<template>
  <div max-w-6xl w-full flex flex-col gap-6 lg:flex-row lg:gap-16>
    <div class="order-1 w-full lg:order-2 lg:w-1/2">
      <h2 my-3 text-4xl text-secondary>
        {{ t('where.title') }}
      </h2>
      <div max-w-lg prose v-html="lg.render(t('where.description'))" />
      <div flex gap-4>
        <a
          href="https://maps.app.goo.gl/zNwv3tVTgxPbF6UA8"
          target="_blank"
          rel="noopener noreferrer"
          flex items-center gap-2 btn
        >
          {{ t('where.links.gmaps') }}
          <span i-ph:arrow-up-right />
        </a>
        <a
          href="/gpx-track.xml"
          target="_blank"
          rel="noopener noreferrer"
          flex items-center gap-2 btn
        >
          {{ t('where.links.gpx') }}
          <span i-ph:download-simple />
        </a>
      </div>
    </div>
    <div class="order-2 w-full lg:order-1 lg:w-1/2" overflow-hidden>
      <TheMap />
    </div>
  </div>
</template>
