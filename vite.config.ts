import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve('./src/index.ts'),
      name: 'VitepressComponents',
      fileName: (format) => `index.${format}.js`
    },
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      external: ['vue', 'vitepress', '@iconify/vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vitepress: 'VitePress',
          '@iconify/vue': 'Iconify'
        }
      }
    }
  }
})
