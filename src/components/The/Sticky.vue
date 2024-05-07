<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <aside
    fixed bottom-4 z-1
    right="4 sm:1/2" translate-x="sm:1/2"
    class="group"
  >
    <div class="glow" group-hover:opacity-100 />
    <a
      btn
      @click="goTo('#rsvp')"
    >
      {{ t('rsvp.title') }}
    </a>
  </aside>
</template>

<style scoped>
.glow {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  opacity: 0;
  transition: all 1s ease;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  background-image: linear-gradient(
    45deg,
    var(--color-secondary),
    var(--color-secondary),
    var(--color-accent)
  );
  filter: blur(60px);
}
</style>
