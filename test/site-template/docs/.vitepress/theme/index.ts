// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { JSONTable, BlogPostHeader } from '@cynber/vitepress-components'
import '@cynber/vitepress-components/style.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('JSONTable', JSONTable)
    app.component('BlogPostHeader', BlogPostHeader)
  }
} satisfies Theme
