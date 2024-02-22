<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('meta.title'),
  meta: [
    {
      name: 'description',
      content: () => t('meta.description'),
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#121212' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
