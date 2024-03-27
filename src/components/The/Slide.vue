<script setup lang="ts">
const images = Array
  .from({ length: 35 }, (_, i) => i + 1)
  .map(i => `/slide/slide_${i}.jpg`)

const route = useRoute()
const { next, prev, index } = useCycleList(images)
// const { pause, resume, isActive } = useIntervalFn(next, 4000)
const offset = useTransition(
  computed(() => index.value * 100),
  { duration: 1000, transition: easeInOutExpo },
)

onMounted(() => {
  if (route.hash) {
    const i = Number.parseInt(route.hash.slice(1), 10)
    if (!Number.isNaN(i))
      index.value = i - 1
  }
})
</script>

<template>
  <section relative aspect-video flex flex-col overflow-hidden>
    <!-- the images -->
    <div h-full flex flex-nowrap :style="{ transform: `translateX(-${offset}%)` }">
      <div
        v-for="(src, i) in images" :key="i"
        aspect-video bg-cover bg-center
        :style="{ backgroundImage: `url(${src})` }"
      />
    </div>

    <!-- the play/pause -->
    <!-- <div absolute-center top-4 z-1 w-full flex-center>
      <button h-8 w-8 flex-center @click="isActive ? pause() : resume()">
        <span text-lg :class="isActive ? 'i-ph-pause-circle' : 'i-ph-play-circle'" />
      </button>
    </div> -->

    <!-- side controls -->
    <div absolute left-0 top-0 h-full w-full flex flex-auto>
      <a w="1/3" hover="from-white/20 to-transparent bg-gradient-to-r" @click="prev()" />
      <span flex-auto />
      <a w="1/3" hover="from-white/20 to-transparent bg-gradient-to-l" @click="next()" />
    </div>

    <!-- bottom controls -->
    <div absolute bottom-0 left-0 w-full flex-center gap-1 p-2>
      <a
        v-for="(_, i) in images" :key="i"
        aspect-square w-3 flex-center rounded-full class="group"
        @click="index = i"
      >
        <div
          :class="{
            'w-2': i === index,
            'bg-opacity-25': i !== index,
          }"
          aspect-square w-1 rounded-full bg-white
          will-change="width height background-color"
          transition="width height background-color duration-300 ease-in-out"
          group-hover="w-3 bg-opacity-80"
        />
      </a>
    </div>
  </section>
</template>
