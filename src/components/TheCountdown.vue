<script setup lang="ts">
const THE_BIG_DATE = '2024-08-17T18:00:00+01:00'
const S = 1000
const M = S * 60
const H = M * 60
const D = H * 24

const { t } = useI18n()
const countdown = ref('')

useRafFn(update)

function update() {
  const then = new Date(THE_BIG_DATE)
  const now = new Date()
  const diff = then.getTime() - now.getTime()
  const days = Math.floor(diff / D)
  const hours = Math.floor((diff % D) / H)
  const minutes = Math.floor((diff % H) / M)
  const seconds = Math.floor((diff % M) / S)

  const pad = (n: number) => n.toString().padStart(2, '0')
  const daysLabel = `${days} ${t('count.days')}`
  const hoursLabel = `${pad(hours)}${t('count.h')}`
  const minutesLabel = `${pad(minutes)}m`
  const secondsLabel = `${pad(seconds)}s`

  countdown.value = `${daysLabel} ${hoursLabel} ${minutesLabel} ${secondsLabel}`
}
</script>

<template>
  <span>{{ t('count.pre') }} {{ countdown }}</span>
</template>
