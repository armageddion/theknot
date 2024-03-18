<script setup lang="ts">
import type { UseElementBoundingReturn } from '@vueuse/core'
import { clamp } from '@vueuse/core'

const { t } = useI18n()

const bounding = inject('bounding') as Record<string, UseElementBoundingReturn>

const isWide = ref(true)
const toggleDisplay = useToggle(isWide)
const links = ref([
  { href: '#welcome', key: 'welcome', icon: 'i-ph-map-pin-line' },
  { href: '#where', key: 'where', icon: 'i-ph-map-pin-line' },
  { href: '#when', key: 'when', icon: 'i-ph-clock' },
  { href: '#what', key: 'what', icon: 'i-ph-tree' },
  { href: '#toaster', key: 'gift', icon: 'i-ph-gift' },
  { href: '#rsvp', key: 'rsvp', icon: 'i-ph-gift' },
].map(link => ({ ...link, offset: 0, swipe: -100 })))

onMounted(() => {
  if (typeof window !== 'undefined')
    window.addEventListener('scroll', onScroll)
})

function onScroll() {
  // 0 at the mid, +/-1 at top and bot
  const winHeight = window.innerHeight
  const getBoundsOffset = (el: UseElementBoundingReturn) => (el.top.value + el.height.value / 2 - winHeight / 2) / (el.height.value * 2)

  Object.entries(bounding)
    .forEach(([key, el]) => {
      const bounds = getBoundsOffset(el)
      const offset = 1 - clamp(Math.abs(bounds), 0, 1)
      const swipe = (1 - bounds - 1) * 100
      const link = links.value.find(link => link.href.slice(1) === key)
      if (link) {
        link.offset = offset
        link.swipe = swipe
      }
    })
}

function goTo(href: string) {
  const el = document.querySelector(href)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <button fixed left-0 top-0 z-1 p-1 opacity-20 @click="toggleDisplay()">
    <div v-if="isWide" i-ph-arrow-line-left />
    <div v-else i-ph-arrow-right />
  </button>
  <aside
    top="1/2"
    translate-y="-1/2"
    fixed left-0 z-1 select-none
  >
    <nav overflow-hidden rounded-r-2xl py-4 backdrop-blur>
      <ul flex flex-col gap-2>
        <li
          v-for="link in links"
          :key="link.href"
        >
          <a
            relative block w-full rounded-lg py-1
            hover="opacity-100! bg-opacity-40!"
            transition="opacity bg-opacity"
            transition-duration-300
            will-change="opacity bg-opacity"
            :class="{
              'bg-opacity-20': link.offset === 0,
              'bg-opacity-40': link.offset > 0,
            }"
            :style="{
              opacity: clamp(link.offset * 2, 0.5, 1),
            }"
            @click="goTo(link.href)"
          >
            <span
              absolute left-0 top-0 h-full w-full bg-secondary
              will-change="transform opacity"
              :style="{
                opacity: clamp(link.offset * 2, 0, 0.5),
                transform: `translateX(${link.swipe}%)`,
              }"
            />
            <h3
              v-if="isWide"
              relative z-1 px-3
              v-text="t(`${link.key}.toc`)"
            />
            <div
              v-else
              w-8
              :class="link.icon"
            />
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
