import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@cynber/vitepress-components",
  description: "Test site for components",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Test Page 1', link: '/test-page-1' },
    ],

    sidebar: [
      {
        text: 'Sidebar Group Title',
        items: [
          { text: 'Test Page 1', link: '/test-page' },
          { text: 'Test Page 2', link: '/test-page-2' }
        ]
      }
    ]
  }
})
