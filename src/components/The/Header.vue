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

    fixed right-0 top-0 z-1 flex gap-4 rounded-bl-2xl px-8 py-4 text-xl backdrop-blur
  >
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
