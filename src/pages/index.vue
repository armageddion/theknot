<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const isLargeScreen = useLargeScreen()
const { init } = useLenisScroll()

onMounted(async () => {
  init()
})

const refs = useTemplateRefsList<HTMLElement>()
const bounding = computed(() => Object.fromEntries(
  SECTIONS.map((label, i) => [
    label,
    refs.value[i]
      ? useElementBounding(refs.value[i])
      : undefined,
  ]),
))
provide('bounding', bounding)
</script>

<template>
  <TheHeader />
  <TheToc v-if="isLargeScreen" />
  <TheSticky />
  <TheHero id="top" p-4 />
  <div
    grid auto-rows-auto grid-cols-8 w-full gap-2 overflow-hidden
    style="grid-template-rows: repeat(auto-fill, minmax(200px, 1fr))"
  >
    <section style="--r: 1" my-24 flex-center p-4 sm:my-80>
      <PartWelcome id="welcome" :ref="refs.set" p-4 text-lg />
    </section>
    <template v-if="isLargeScreen">
      <AFigure :i="0" style="--s: 4; --c: 2; --r: 2" aspect-video />
      <AFigure :i="1" style="--s: 3; --c: 6; --r: 3" aspect="4/3" />
      <AFigure :i="2" style="--s: 2; --c: 4; --r: 4" aspect-video />
      <AFigure :i="3" style="--s: 2; --c: 2; --r: 5" aspect-video />
    </template>
    <TheScroller v-else style="--r: 2" />
    <section
      id="where" :ref="refs.set" style="--r: 10"
      my-24 flex-center p-4 sm:my-80 sm:pl-40
    >
      <PartWhere />
    </section>
    <template v-if="isLargeScreen">
      <AFigure :i="4" style="--s: 3; --c: 1; --r: 11" aspect-video />
      <AFigure :i="5" style="--s: 2; --c: 4; --r: 12" aspect-video />
      <AFigure :i="6" style="--s: 2; --c: 6; --r: 13" aspect-video />
    </template>
    <TheScroller v-else style="--r: 11" />
    <section
      id="when" :ref="refs.set" style="--r: 20"
      my-24 flex-center p-4 sm:my-80 sm:pl-40
    >
      <PartWhen />
    </section>
    <template v-if="isLargeScreen">
      <AFigure :i="7" style="--s: 4; --c: 5; --r: 21" aspect-video />
      <AFigure :i="8" style="--s: 3; --c: 2; --r: 22" aspect-video />
      <AFigure :i="9" style="--s: 2; --c: 5; --r: 23" aspect="4/3" />
    </template>
    <TheScroller v-else style="--r: 21" />
    <section
      id="what" :ref="refs.set" style="--r: 30"
      my-24 flex-center p-4 sm:my-80 sm:pl-40 xl:pl-0
    >
      <PartWhat />
    </section>
    <template v-if="isLargeScreen">
      <AFigure :i="10" style="--s: 2; --c: 1; --r: 31" aspect-video />
      <AFigure :i="11" style="--s: 3; --c: 3; --r: 32" aspect-video />
      <AFigure :i="12" style="--s: 2; --c: 6; --r: 33" aspect-video />
    </template>
    <TheScroller v-else style="--r: 31" />
    <section
      id="gift" :ref="refs.set" style="--r: 40"
      my-24 flex-center p-4 sm:my-80 sm:pl-40 xl:pl-0
    >
      <PartGift />
    </section>
    <template v-if="isLargeScreen">
      <AFigure :i="13" style="--s: 4; --c: 5; --r: 41" aspect-video />
      <AFigure :i="14" style="--s: 3; --c: 2; --r: 42" aspect-video />
      <AFigure :i="15" style="--s: 2; --c: 5; --r: 43" left aspect-video />
    </template>
    <TheScroller v-else style="--r: 41" />
    <section style="--r: 50" my-24 flex-center p-4 sm:my-80>
      <PartRespond id="rsvp" :ref="refs.set" p-4 text-lg />
    </section>
  </div>

  <TheHero footer p-4 />
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style>
section {
  grid-column: var(--c, 1) / span var(--s, 8);
  grid-row: var(--r);
  position: relative;

  h2 {
    position: relative;
  }

  h2::before {
    position: absolute;
    content: '';
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
    z-index: -1;
    background: var(--color-accent);
    opacity: 0.1;
    transform: rotate(-0.8deg);
  }
}

@media (min-width: 639.9px) {
  section {
    h2 {
      width: max-content;
    }
  }
}
</style>
