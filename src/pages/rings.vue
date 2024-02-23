<script setup lang="ts">
const demos = [
  { name: 'blank', path: '/rings' },
  { name: 'one', path: '/rings/one' },
  { name: 'tie', path: '/rings/tie' },
  { name: 'litt31', path: '/rings/littl31' },
]
</script>

<template>
  <section max-h-screen flex flex-col items-center>
    <nav grid grid-cols-4 min-h-10 divide-x>
      <RouterLink
        v-for="demo in demos" :key="demo.path" :to="demo.path"
        flex-center px-4 font-mono
      >
        {{ demo.name }}
      </RouterLink>
    </nav>
    <span min-h-12 />
    <RouterView />
  </section>
</template>

<route lang="yaml">
meta:
  layout: plain
</route>
