import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: 'oklch(var(--color-primary) / <alpha-value>)',
      secondary: 'oklch(var(--color-secondary) / <alpha-value>)',
      accent: 'oklch(var(--color-accent) / <alpha-value>)',
    },
  },
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['absolute-center', 'absolute top-1/2 left-1/2 transform translate-x--1/2 translate-y--1/2'],
    ['btn', 'px-4 py-1 rounded inline-block bg-primary text-white cursor-pointer !outline-none hover:bg-secondary disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition outline-none duration-200 ease-in-out hover:opacity-100 hover:text-accent'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        head: 'Rubik',
        sans: 'Exo 2',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
