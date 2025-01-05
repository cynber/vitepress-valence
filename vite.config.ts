import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'index.js'),
            name: 'VitepressComponents',
            formats: ['es', 'cjs'],
            fileName: (format) => `vitepress-components.${format}.js`,
        },
        rollupOptions: {
            external: ['vue', 'vitepress', '@iconify/vue'],
            output: {
                globals: {
                    vue: 'Vue',
                    vitepress: 'VitePress',
                    '@iconify/vue': 'IconifyVue',
                },
            },
        },
    },
});
