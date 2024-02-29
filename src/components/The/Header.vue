<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <nav
    flex="~ gap-4"
    fixed left-0 right-0 top-0 z-1 mb-8 px-8 py-4 text-xl
  >
    <span flex-auto />

    <button
      icon-btn
      :title="isDark ? t('button.toggle_dark_off') : t('button.toggle_dark_on')"
      @click="toggleDark()"
    >
      <div i="ph-moon dark:ph-sun" />
    </button>

    <button icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-ph-translate />
    </button>
  </nav>
</template>
