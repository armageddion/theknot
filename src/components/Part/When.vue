<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()

onMounted(() => {
  console.log(departTime(25))
})

function departTime(age: number) {
  let result = 24 + Math.E - (2 / 15 * age) + 3
  if (result > 24)
    result = result - 24
  return Math.round(result)
}
</script>

<template>
  <h2 my-3 text-4xl text-secondary>
    {{ t('when.title') }}
  </h2>
  <div max-w-md prose v-html="md.render(t('when.description'))" />
</template>
