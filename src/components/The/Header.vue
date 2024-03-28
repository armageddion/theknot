<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()
const isLargeScreen = useLargeScreen()

const links = ref(SECTIONS.map(key => ({ key, href: `#${key}` })))

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <nav
    fixed right-0 top-0 z-1 min-w-0 flex justify-between gap-4 p-2 text-xl backdrop-blur sm:rounded-bl-2xl sm:px-8 sm:py-4
    left="<sm:0"
  >
    <template v-if="!isLargeScreen">
      <nav max-w-full flex items-center overflow-auto>
        <ul flex>
          <li v-for="link in links" :key="link.href">
            <a
              relative block w-full rounded-lg py-1
              @click="goTo(link.href)"
            >
              <h3
                min-content relative z-1 px-3 text-nowrap text-sm opacity-75
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
  </nav>
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
