import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.*', 'src/**/*.test.*']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
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
      external: ['vue', 'vitepress'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vitepress: 'VitePress'
        },
      },
    },
    emptyOutDir: false,
    target: 'esnext',
    minify: true,
  }
})