---
aside: false

prev:
  text: "Installation & Setup"
  link: "/guide/install"
next: false
---

# Embed Components: Lemmy

This component allows you to embed Fediverse posts from Lemmy websites. It supports light and dark themes and you can select which elements of the posts to display.

::: tip TIP: Try toggling the theme

Press the sun/moon toggle in the top right corner of the site. The images in this demo will also change to reflect the theme.
:::

## Demo

<VpvEmbedLemmy
  headerTitle="Demonstration of the Lemmy Embed Component"
  headerSubtitle="Two link posts and an image post"
  :links="[
    'https://lemmy.ca/post/38473938',
    'https://lemmy.ca/post/6890347',
    'https://lemmy.ca/post/51836760'
  ]"
  :titleLines="2"
  :excerptLines="3"
/>

::: details View Code

```vue
<VpvEmbedLemmy
  headerTitle="Demonstration of the Lemmy Embed Component"
  headerSubtitle="Two link posts and an image post"
  headerDate="2025-01-27"
  headerLink="https://example.com"
  :links="[
    'https://lemmy.ca/post/38473938',
    'https://lemmy.ca/post/6890347',
    'https://lemmy.ca/post/51836760'
  ]"
  :titleLines="2"
  :excerptLines="3"
/>
```
:::

If a post is deleted or removed, or otherwise inaccessible, the component will display the following message:

<VpvEmbedLemmy
  headerTitle="Demonstration of a deleted post"
  :links="[
    'https://lemmy.ca/post/38144867'
  ]"
  :titleLines="2"
  :excerptLines="3"
/>

::: details View Code

```vue
<VpvEmbedLemmy
  headerTitle="Demonstration of a deleted post"
  :links="[
    'https://lemmy.ca/post/38144867'
  ]"
  :titleLines="2"
  :excerptLines="3"
/>
```
:::

## Setup

::: warning Do initial installation first

Before you follow any of the guides below, you should [import and install this project](../install.md) in your VitePress site.
:::

Import the component in `docs/.vitepress/theme/index.ts` (or equivalent)

::: code-group
```ts [index.ts]
import { VpvEmbedLemmy } from '@cynber/vitepress-valence' // [!code ++]

export default {
    enhanceApp({ app, router, siteData }) {
    app.component('VpvEmbedLemmy', VpvEmbedLemmy) // [!code ++]
    }
} satisfies Theme
```
:::

## Usage

You can add `<VpvEmbedLemmy />` to any page in your VitePress site. The component requires at minimum the `links` prop with an array of Lemmy post URLs.

The basic syntax is:
```vue
<VpvEmbedLemmy :links="['https://lemmy.instance/post/123456']" />
```

## Optional Functionality

### Header Configuration

These props allow you to add a header section above the embedded posts.

- `headerTitle`: The title to display in the header section
- `headerSubtitle`: The subtitle to display in the header section
- `headerDate`: The date to display in the header section  
- `headerLink`: A URL to make the header title clickable
- `headerTitleLines`: Limits the number of lines for the header title display (default: 2)
- `headerSubtitleLines`: Limits the number of lines for the header subtitle display (default: 1)
### Header Date Format
- `headerDateFormat`: Specifies the format of the header date. Can be:
  - `"long"` (**default**, example: "October 30, 2025")
  - `"short"` (example: "Oct 30, 2025")
  - `"iso"` (example: "2025-10-30")
  - A custom format string, such as `"yyyy-MM-dd HH:mm"` (example: "2025-10-30 17:00")
- `headerDatePrefix`: Text to display before the header date
### Post Date Format
- `dateFormat`: Specifies the format of dates displayed on individual posts. Same options as `headerDateFormat`
### Content Display Options

These props allow you to control how much content is displayed from each post.

- `titleLines`: Limits the number of lines for the post title display
- `excerptLines`: Limits the number of lines for the post excerpt display

### `hide*` Props

These props allow you to hide certain elements from the embedded posts.

- default `hideUser` is `false`
- default `hideCommunity` is `false`
- default `hideTitle` is `false`
- default `hideBanner` is `false`
- default `hideExcerpt` is `false`
- default `hideScore` is `false`
- default `hideComments` is `false`
- default `hideDate` is `false`

### Kitchen Sink Example

Here are two silly examples using all the props. 

::: details View Example with all content hidden
<VpvEmbedLemmy
  headerTitle="All Content Hidden"
  headerSubtitle="This is a demonstration"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
  headerLink="https://example.com"
  headerDate="2025-01-27"
  headerDateFormat="iso"
  headerDatePrefix="Published on: "
  :links="[
    'https://lemmy.ca/post/38473938',
    'https://lemmy.ca/post/6890347'
  ]"
  hideUser
  hideCommunity
  hideTitle
  hideBanner
  hideExcerpt
  hideScore
  hideComments
  hideDate
  :titleLines="1"
  :excerptLines="1"
  dateFormat="iso"
/>

```vue
<VpvEmbedLemmy
  headerTitle="All Content Hidden"
  headerSubtitle="This is a demonstration"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
  headerLink="https://example.com"
  headerDate="2025-01-27"
  headerDateFormat="iso"
  headerDatePrefix="Published on: "
  :links="[
    'https://lemmy.ca/post/38473938',
    'https://lemmy.ca/post/6890347'
  ]"
  hideUser
  hideCommunity
  hideTitle
  hideBanner
  hideExcerpt
  hideScore
  hideComments
  hideDate
  :titleLines="1"
  :excerptLines="1"
  dateFormat="iso"
/>
```
:::

::: details View Example with all content displayed
<VpvEmbedLemmy
  headerTitle="All Content Displayed"
  headerSubtitle="This shows everything"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
  headerLink="https://example.com"
  headerDate="2025-01-27"
  headerDateFormat="short"
  headerDatePrefix="Created: "
  :links="[
    'https://lemmy.ca/post/38473938',
    'https://lemmy.ca/post/6890347'
  ]"
  :hideUser="false"
  :hideCommunity="false"
  :hideTitle="false"
  :hideBanner="false"
  :hideExcerpt="false"
  :hideScore="false"
  :hideComments="false"
  :hideDate="false"
  :titleLines="1"
  :excerptLines="1"
  dateFormat="short"
/>

```vue
<VpvEmbedLemmy
  headerTitle="All Content Displayed"
  headerSubtitle="This shows everything"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
  headerLink="https://example.com"
  headerDate="2025-01-27"
  headerDateFormat="short"
  headerDatePrefix="Created: "
  :links="[
    'https://lemmy.ca/post/38473938',
    'https://lemmy.ca/post/6890347'
  ]"
  :hideUser="false"
  :hideCommunity="false"
  :hideTitle="false"
  :hideBanner="false"
  :hideExcerpt="false"
  :hideScore="false"
  :hideComments="false"
  :hideDate="false"
  :titleLines="1"
  :excerptLines="1"
  dateFormat="short"
/>
```
:::
