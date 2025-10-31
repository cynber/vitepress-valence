// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import "@cynber/vitepress-valence/vitepress-valence.css";
import {
  VpvCardHorizontal,
  VpvCardVertical,
  VpvContainerHorizontal,
  VpvContainerVertical,
  VpvArticleHeader,
  VpvArticleList,
  VpvTableJSON,
  VpvImageGallery,
  VpvImage,
  VpvEmbedLemmy,
  VpvEmbedMailchimp
} from '@cynber/vitepress-valence'
import authors from './data/authors.js'
import { data as demoBlogData } from './data/demo-blog.data.js'
import { data as galleryData } from './data/gallery.data.js'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('VpvCardHorizontal', VpvCardHorizontal)
    app.component('VpvCardVertical', VpvCardVertical)
    app.component('VpvContainerHorizontal', VpvContainerHorizontal)
    app.component('VpvContainerVertical', VpvContainerVertical)
    app.component('VpvArticleHeader', VpvArticleHeader)
    app.component('VpvArticleList', VpvArticleList)
    app.component('VpvTableJSON', VpvTableJSON)
    app.component('VpvImageGallery', VpvImageGallery)
    app.component('VpvImage', VpvImage)
    app.component('VpvEmbedLemmy', VpvEmbedLemmy)
    app.component('VpvEmbedMailchimp', VpvEmbedMailchimp)
    app.provide('authors', authors)
    app.provide('demoBlogData', demoBlogData)
    app.provide('galleryData', galleryData)
  }
} satisfies Theme
