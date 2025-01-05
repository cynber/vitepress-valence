import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VitepressComponents',
      fileName: (format) => `vitepress-components.${format === 'es' ? 'js' : 'umd.cjs'}`
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
