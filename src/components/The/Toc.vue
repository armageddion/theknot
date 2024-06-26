<script setup lang="ts">
import type { UseElementBoundingReturn } from '@vueuse/core'
import { clamp } from '@vueuse/core'

const { t } = useI18n()

const bounding = inject('bounding') as ComputedRef<Record<string, UseElementBoundingReturn>>

const links = ref(SECTIONS.map(key => ({
  key,
  href: `#${key}`,
  offset: 0,
  swipe: -100,
})))

watchEffect(() => {
  const wh = window.innerHeight
  Object.entries(bounding.value)
    .forEach(([key, el]) => {
      if (!el)
        return
      const bounds = getBoundsOffset(el, wh)
      const offset = 1 - clamp(Math.abs(bounds), 0, 1)
      const swipe = (1 - bounds - 1) * 100
      const link = links.value.find(link => link.key === key)
      if (!link)
        throw new Error(`Link not found for ${key}`)
      link.offset = offset
      link.swipe = swipe
    })
})
</script>

<template>
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
            relative block w-full py-1
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
              relative z-1 px-3
              v-text="t(`${link.key}.toc`)"
            />
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
