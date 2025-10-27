---
aside: false

# Core Content Fields
title: "Testing"
subtitle: "This is just a test article"
summary: "This is a draft article used for testing purposes. It should not appear in normal article listings unless specifically requested."

# Publication Fields
date: 2025-12-15
author: alex
status: draft
featured: false

# Organization Fields
category: Summer
tags:
  - Testing
  - Draft
  - Development

# Featured Image
featured_image:
  image: "/gallery/nature/evgeni-tcherkasski-4I12DYcs0tc-unsplash.jpg"
  image_dark: "/gallery/urban/arturs-kipsts-p0AtyWl6Sf4-unsplash.jpg"
  alt: "Testing placeholder image"
  description: "This is a test image for development purposes"

# Content Options
reading_time: 2

# Built in Social Media Sharing Fields
head:
  - - meta
    - property: og:type
      content: blog
  - - meta
    - property: og:locale
      content: en_CA
  - - meta
    - property: og:title
      content: Testing - Draft Article
  - - meta
    - property: og:url
      content: https://example.com/demo-blog/testing
  - - meta
    - property: og:description
      content: This is a draft article for testing purposes only.
  - - meta
    - property: article:section
      content: Testing
---

<VpvArticleHeader 
    returnLink="/blog-demo"
    returnText="Back to Seasonal Blog"
    :hideFeatImageDescription="true"
/>

This is just a test article. Nothing important here.

## Read other articles

<VpvArticleList
    format="vertical"
    sortOrder="ascending"
    maxCards="2"
    :excludeURLs="[
        '/demo-blog/testing'
    ]"
  />