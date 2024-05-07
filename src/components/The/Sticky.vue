<script setup lang="ts">
import type { UseElementBoundingReturn } from '@vueuse/core'

const { t } = useI18n()
const bounding = inject('bounding') as ComputedRef<Record<string, UseElementBoundingReturn>>

const isActive = computed(() => {
  const key = 'rsvp'
  if (bounding && (!(key in bounding.value) || typeof bounding.value[key] !== 'object'))
    return false
  const { top, bottom, height } = bounding.value[key]
  const isVisible = top.value < window.innerHeight - 200
    && bottom.value > height.value / 4
  return !isVisible
})
</script>

<template>
  <aside
    fixed bottom-4 z-1
    transform transition-transform duration-800
    right="4 sm:1/2" translate-x="sm:1/2"
    :style="{ '--un-translate-y': (isActive ? 0 : '200%') }"
    class="group"
  >
    <div
      class="glow"
      hidden sm:block
      group-hover="opacity-80 -translate-y-1/2 -translate-x-1/2"
    />
    <a
      shadow-lg shadow-primary outline-none btn
      @click="goTo('#rsvp')"
    >
      {{ t('rsvp.toc') }}
    </a>
  </aside>
</template>

<style scoped>
.glow {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -25%);
  width: 120px;
  height: 120px;
  opacity: 0;
  transition: all 1s ease;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  background-image: linear-gradient(
    45deg,
    var(--color-secondary),
    var(--color-accent),
    var(--color-secondary)
  );
  filter: blur(60px);
}
</style>
