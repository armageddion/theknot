<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <a
    fixed bottom-8 z-1 flex items-center justify-center gap-2 btn
    left="1/2" translate-x="-1/2"
    @click="goTo('#rsvp')"
  >
    {{ t('rsvp.title') }}
  </a>
</template>
