<script setup lang="ts">
import markdownit from 'markdown-it'

const { t } = useI18n()
const md = markdownit()

function departTime(age: number) {
  let result = 24 + Math.E - (2 / 15 * age) + 3
  if (result > 24)
    result = result - 24
  return Math.round(result)
}
</script>

<template>
  <div max-w-6xl w-full flex flex-col gap-6 py-32 lg:flex-row lg:gap-16>
    <div w-full lg="w-1/2">
      <h2 my-3 text-4xl text-secondary>
        {{ t('when.title') }}
      </h2>
      <div max-w-md prose v-html="md.render(t('when.description'))" />
    </div>
    <div lg="w-1/2" inline-block aspect-square max-w-80>
      <TheClock />
    </div>
  </div>
</template>
