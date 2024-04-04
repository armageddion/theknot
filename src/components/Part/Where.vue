<script setup lang="ts">
import markdownit from 'markdown-it'

const md = markdownit()
const { t } = useI18n()
const isLargeScreen = useLargeScreen()
const desc = computed(() => isLargeScreen.value ? md.render(t('where.description')) : md.render(t('where.description').split('\n\n')[0]))
const tail = computed(() => md.render(t('where.description').split('\n\n').pop() as string))
</script>

<template>
  <div max-w-6xl w-full flex flex-col items-center gap-6 lg:flex-row lg:gap-16>
    <div class="lg:w-1/2" w-full sm:w-max>
      <h2 my-3 text-4xl text-secondary>
        {{ t('where.title') }}
      </h2>
      <div max-w-lg prose v-html="desc" />
      <template v-if="isLargeScreen">
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
      </template>
    </div>
    <div class="w-full lg:w-1/2" max-w-lg overflow-hidden>
      <TheMap />
    </div>
    <div v-if="!isLargeScreen" w-full>
      <div max-w-lg prose v-html="tail" />
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
  </div>
</template>
