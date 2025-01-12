import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VitePressValence',
      formats: ['es', 'umd'],
      fileName: (format) => `vitepress-valence.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vitepress', '@iconify/vue'],
      output: {
        exports: 'named', // Prevent Rollup warning for named exports
        globals: {
          vue: 'Vue',
          vitepress: 'VitePress',
          '@iconify/vue': 'IconifyVue',
        },
      },
    },
    emptyOutDir: false, // Retain 'dist/types' for TypeScript declarations
    target: 'esnext',
    minify: true,
  }
})
