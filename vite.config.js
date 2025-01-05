import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VitepressComponents',
      fileName: 'vitepress-components'
    },
    rollupOptions: {
      external: ['vue', 'vitepress', '@iconify/vue'],
      output: {
        globals: {
          vue: 'Vue',
          vitepress: 'VitePress',
          '@iconify/vue': 'Iconify'
        }
      }
    }
  }
})
