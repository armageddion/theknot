<script setup lang="ts">
import type { UseElementBoundingReturn } from '@vueuse/core'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()
const isLargeScreen = useLargeScreen()
const { y } = useSharedScroll()
const { lenis } = useLenisScroll()
const bounding = inject('bounding') as ComputedRef<Record<string, UseElementBoundingReturn>>

const nav = ref<HTMLElement>()
const aside = ref<HTMLElement>()
const links = ref(SECTIONS.map(key => ({ key, href: `#${key}` })))
const isLocked = ref(false)

// scroll nav to match body scroll
watchEffect(() => {
  if (!nav.value || isLocked.value)
    return
  const { scrollWidth, offsetWidth } = nav.value
  const yProgress = y.value / (document.body.scrollHeight - window.innerHeight)
  nav.value.scrollTo({
    left: yProgress * (scrollWidth - offsetWidth),
  })
})

// enable disable body scroll when interacting with nav
onClickOutside(aside, () => toggleLenis(true))
function onMousedown() {
  if (!isLargeScreen.value)
    toggleLenis(false)
}
function scrollTo(href: string) {
  toggleLenis(true)
  goTo(href)
}
function toggleLenis(enabled: boolean) {
  isLocked.value = !enabled
  if (enabled)
    lenis.value?.isStopped && lenis.value.start()
  else
    lenis.value?.stop()
}

function isActive(key: string) {
  if (bounding && (!(key in bounding.value) || typeof bounding.value[key] !== 'object'))
    return false
  const { top, bottom, height } = bounding.value[key]
  return top.value < window.innerHeight - 200
    && bottom.value > height.value / 4
}

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
}
</script>

<template>
  <aside
    ref="aside"
    fixed right-0 top-0 z-1 min-w-0 flex justify-between gap-4 p-2 text-xl backdrop-blur sm:rounded-bl-2xl sm:px-8 sm:py-4
    left="<sm:0"
    @touchstart.passive="onMousedown"
    @mousedown="onMousedown"
  >
    <template v-if="!isLargeScreen">
      <nav ref="nav" w-full flex items-center overflow-auto>
        <ul w-max flex pl-5 pr-12>
          <li v-for="link in links" :key="link.href">
            <a relative block py-1 @click="scrollTo(link.href)">
              <h3
                min-content relative z-1 px-3 text-nowrap text-sm opacity-75
                :class="{ 'text-secondary': isActive(link.key) }"
                v-text="t(`${link.key}.toc`)"
              />
            </a>
          </li>
        </ul>
      </nav>
    </template>
    <div flex gap-2>
      <button
        h-8 w-8 icon-btn
        :title="isDark ? t('button.toggle_dark_off') : t('button.toggle_dark_on')"
        @click="toggleDark()"
      >
        <div i="ph-moon dark:ph-sun" />
      </button>
      <button
        relative h-8 w-8 icon-btn
        class="parent"
        :title="t('button.toggle_langs')"
        @click="toggleLocales()"
      >
        <div i-ph:translate transition-opacity duration-200 parent-hover:opacity-50 />
        <span
          absolute left-0 top-0 w-full text-center opacity-0 transition-opacity duration-200
          parent-active:opacity-100 parent-hover:opacity-100
        >{{ t('lang') }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
nav {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

nav::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
}
</style>
