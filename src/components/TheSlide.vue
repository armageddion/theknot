<script setup lang="ts">
const images = Array
  .from({ length: 14 }, (_, i) => i + 1)
  .map(i => `/slide/slide_${i.toString().padStart(2, '0')}.jpg`)

const { next, index } = useCycleList(images)
const offset = useTransition(
  computed(() => index.value * 100),
  { duration: 1000, transition: easeInOutExpo },
)
useIntervalFn(next, 4000)
</script>

<template>
  <section aspect-video flex flex-col overflow-hidden>
    <div h-full flex flex-nowrap :style="{ transform: `translateX(-${offset}%)` }">
      <div
        v-for="(src, i) in images" :key="i"
        aspect-video bg-cover bg-center
        :style="{ backgroundImage: `url(${src})` }"
      />
    </div>
  </section>
</template>
