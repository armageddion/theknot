<script setup lang="ts">
import type { UseElementBoundingReturn } from '@vueuse/core'
import { clamp } from '@vueuse/core'

const { t } = useI18n()

const links = ref([
  // { href: '#top', key: 'top', offset: 0 },
  { href: '#where', key: 'where', offset: 0 },
  { href: '#when', key: 'when', offset: 0 },
  { href: '#what', key: 'what', offset: 0 },
  { href: '#toaster', key: 'gift', offset: 0 },
])

const bounding = inject('bounding') as Record<string, UseElementBoundingReturn>

const onScroll = useThrottleFn(() => {
  // calculate offset of the where el from top and bottom in decimals, such that it is 1 in the middle and 0 at the top and bottom
  const getBoundsOffset = (el: UseElementBoundingReturn) => 1 - clamp(Math.abs((el.top.value + el.height.value / 2 - window.innerHeight / 2) / (el.height.value * 2)), 0, 1)

  Object.entries(bounding)
    .forEach(([key, el]) => {
      const offset = getBoundsOffset(el)
      const link = links.value.find(link => link.href.slice(1) === key)
      if (link)
        link.offset = offset
    })
}, 20)

window.addEventListener('scroll', onScroll)

function goTo(href: string) {
  const el = document.querySelector(href)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <aside
    fixed left-0
    class="top-1/2 translate-y--1/2 transform"
    z-1 select-none
  >
    <nav>
      <ul flex flex-col gap-2 p-4>
        <li
          v-for="link in links"
          :key="link.href"
        >
          <a
            block
            w-full
            rounded-lg
            bg-accent
            px-3
            py-1
            text-center
            text-secondary
            backdrop-blur
            transition-opacity
            transition-duration-300
            hover="opacity-100! bg-opacity-40!"
            :class="{
              'bg-opacity-20': link.offset === 0,
              'bg-opacity-40': link.offset > 0,
            }"
            :style="{
              // transform: `translateX(${link.offset * 2}rem)`,
              opacity: clamp(link.offset * 2, 0.5, 1),
            }"
            @click="goTo(link.href)"
            v-text="t(`${link.key}.toc`)"
          />
        </li>
      </ul>
    </nav>
  </aside>
</template>
