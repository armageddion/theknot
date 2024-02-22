<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  router.replace('/')
})
</script>

<template>
  <div h-screen w-screen flex-center>
    <span text-4xl font-bold>
      {{ t('not-found') }}
    </span>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
