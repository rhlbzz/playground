import { defineConfig } from 'unocss'
import { presetAttributify, presetUno } from 'unocss' // Presets

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
  ],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',  // You can modify this value
      xl: '1280px',
      '2xl': '1536px',
    },
  },
})