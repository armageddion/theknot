<script setup lang="ts">
const { t } = useI18n()

const links = [
  { href: '#top', key: 'top' },
  { href: '#where', key: 'where' },
  { href: '#when', key: 'when' },
  { href: '#what', key: 'what' },
  { href: '#toaster', key: 'gift' },
]

function goTo(href: string) {
  const el = document.querySelector(href)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <aside
    fixed left-0 top-0 z-1 select-none
  >
    <nav>
      <ul flex flex-col gap-2 p-2>
        <li
          v-for="link in links"
          :key="link.href"
          rounded-xl
          bg-primary bg-opacity-50
          opacity-75
          backdrop-blur
        >
          <a
            block
            w-full
            px-3 py-1
            text-secondary
            text-shadow
            shadow-primary
            shadow-opacity-50
            @click="goTo(link.href)"
            v-text="t(`${link.key}.toc`)"
          />
        </li>
      </ul>
    </nav>
  </aside>
</template>
