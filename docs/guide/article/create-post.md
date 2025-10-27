---
prev:
  text: 'Article Component Setup'
  link: './setup'
next:
  text: 'Use the Header Card'
  link: './component-VpvArticleHeader'

outline: [2, 4]
---

# Create a New Post

Create a new markdown file in your articles directory, and fill in the frontmatter. 

The entire sample file for [March](/demo-blog/march) can be found here.

::: details View Code

<<< @/demo-blog/april.md {1-56 md:line-numbers }
:::

In particular, note the frontmatter at the top of the file:


::: code-group
```yaml [docs/articles/my-summer.md]
aside: false

# Core Content Fields
title: "March"
subtitle: "First Garden Planning and Seed Starting"
summary: "March awakens the gardener's spirit as winter loosens its grip. It's time to plan your garden, start seeds indoors, and prepare for the growing season ahead. Feel the excitement of new growth and fresh possibilities."

# Publication Fields
date: 2025-03-20
author: maya
status: published
featured: true

# Organization Fields
category: Spring
tags:
  - Gardening
  - Seeds
  - Planning
  - Growth
  - Outdoors

# Featured Image
featured_image:
  image: "/demo-blog/march-light.jpg"
  image_dark: "/demo-blog/march-dark.jpg"
  alt: "A close-up of some plants"
  alt_dark: "Purple flowers along a stone path, illuminated by small lights"
  description: "A close-up of some plants - Credits to Tebogo Sweatz on Unsplash"
  description_dark: "Purple flowers along a stone path, illuminated by small lights - Credits to Cee on Unsplash"

# Content Options
reading_time: 7

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
      content: March - First Garden Planning and Seed Starting
  - - meta
    - property: og:url
      content: https://example.com/demo-blog/march
  - - meta
    - property: og:description
      content: March awakens the gardener's spirit with garden planning and seed starting for the season ahead.
  - - meta
    - property: article:section
      content: Seasonal
```
:::

In order to use the components in this package, the `title` field is required and the `summary` field is highly recommended. An explanation of the fields is provided below.

## Details

::: tip Aside

The `aside=false` field is a built-in VitePress field, which I've often used on my blog posts as it gives me a nicer layout. You're welcome to skip this line if you prefer the default layout on your article pages.
:::

### `title`

The field is the title of the post. We recommend a max of 60 characters for the title, but there is no strict limit.

### `subtitle`

The field is the subtitle of the post, and it appears in the header card, for example.

### `summary`

The field will appear in various cards when you link to this post. There is no strict limit on the length of the summary.

### `date`

Please use the format `YYYY-MM-DD`. You will be able to specify other formats when displaying the post information later on.

### `author`

This field is used to specify the author of the post. It should match the key of the author in the `authors.js` file.

::: details Example

If your `authors.js` file looks like this:

```js [authors.js]
const authors = {
    sherlock: { // This is the key used in the post frontmatter
        name: 'Sherlock Holmes',
        avatar: '/authors/sherlock.jpg',
    },
    // ...
```

You would use `author: sherlock`.
:::

### `category`

This field can only hold one value. It is intended to communicate the high level category of the post.

### `tags`

This field can hold multiple values, and you can include as many tags as you want. However, only the first few tags will be displayed on most components.

### `featured_image`

The featured image will appear as a large banner in the header card, or as the image in article list cards. By default, many components will use the `16/9` aspect ratio for the featured image, but you can use any size image, as well as specify custom aspect ratios later on.

The `image` field is required, and it can contain a URL or path to an image file. If you would like to use a different image when viewing the site in dark mode, you can additionally specify the `image_dark` field.

::: details Example

If your image is located in `docs/public/articles/my-first-book.jpg`, you would use `banner: "/articles/my-first-book.jpg"` in the frontmatter.
:::

The `alt` field will be used as the alt text for the image. The `description` field can appear as a caption alongside the image. If you are using a dark mode image, you can also set different `alt_dark` and `description_dark` fields.

### `reading_time`

You can specify the estimated reading time for the post. Please enter a number representing the number of minutes it will take to read the post.

::: details How to calculate reading time

You can estimate the reading time by dividing the number of words in the post by ~200.

For example, if the post has 1000 words, you can set `reading_time: 5`.
:::

### `draft` & `featured`

If you set the `draft` field to `true`, the post will not be displayed in lists. This will allow you to upload future posts without them appearing in the list.

You can set the `featured` field to `true` in order to highlight specific posts in other parts of your site.

### `head`

This is a built-in field that allows you to add custom meta tags. The examples listed above will give your post a nice preview when shared on social media, and improve your SEO. You can read more about the Open Graph protocol [here](https://ogp.me/).