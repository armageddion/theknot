<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main
    p="x4 y10"
    text="center teal-700 dark:gray-200"
    h-screen w-screen
    flex flex-col items-center justify-center
    gap-4
  >
    <div i-carbon-warning inline-block text-4xl />

    <RouterView />

    <button text-sm btn @click="router.back()">
      {{ t('button.back') }}
    </button>
  </main>
</template>
