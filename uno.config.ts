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
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['absolute-center', 'absolute top-1/2 left-1/2 transform translate-x--1/2 translate-y--1/2'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Oxanium',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    fontFamily: {
      h: 'Audimat',
    },
  },
  preflights: [
    {
      getCSS() {
        return `@font-face {
          font-family: 'Audimat';
          font-style: normal;
          font-weight: normal;
          src: url('/fonts/audimat.eot?#iefix') format('embedded-opentype'),
            url('/fonts/audimat.woff2') format('woff2'),
            url('/fonts/audimat.woff') format('woff'),
            url('/fonts/audimat.ttf') format('truetype'),
            url('/fonts/audimat.svg#audimat_monolight') format('svg');
        }`
      },
    },
  ],
})
