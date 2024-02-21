<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
</script>

<template>
  <div min-h-screen flex-center py-4>
    <h1 text-xl font-bold>
      {{ t('intro.title') }}
    </h1>
    <TheRing absolute-center top="[40%]" />
  </div>
  <div min-h-screen flex-center py-4>
    <h1 text-xl font-bold>
      {{ t('intro.where') }}
    </h1>
  </div>
  <div min-h-screen flex-center py-4>
    <h1 text-xl font-bold>
      {{ t('intro.when') }}
    </h1>
  </div>
  <div min-h-screen flex-center py-4>
    <h1 text-xl font-bold>
      {{ t('intro.give') }}
    </h1>
  </div>
  <footer flex-center py-12>
    <h1 text-xl font-bold>
      {{ t('intro.end') }}
    </h1>
  </footer>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
