<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
</script>

<template>
  <div flex-center min-h-screen py-4>
    <h1 text-xl font-bold>
      {{ t('intro.title') }}
    </h1>
  </div>
  <div flex-center min-h-screen py-4>
    <h1 text-xl font-bold>
      {{ t('intro.where') }}
    </h1>
  </div>
  <div flex-center min-h-screen py-4>
    <h1 text-xl font-bold>
      {{ t('intro.when') }}
    </h1>
  </div>
  <div flex-center min-h-screen py-4>
    <h1 text-xl font-bold>
      {{ t('intro.give') }}
    </h1>
  </div>
  <footer py-12>
    <h1 text-xl font-bold>
      {{ t('intro.end') }}
    </h1>
  </footer>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
