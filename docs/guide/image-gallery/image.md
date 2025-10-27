---
prev:
  text: "Image & Gallery Component Overview"
  link: "/guide/image-gallery"
next:
  text: "VpvImage Gallery Usage"
  link: "/guide/image-gallery/gallery"

outline: [2, 4]
---

# VpvImage Usage

This component provides advanced image handling with support for light/dark mode variations, zoom functionality, responsive sizing, and flexible layout options. It's designed to replace standard markdown images when you need more control and features.

## Setup

::: warning Do initial installation first

Before you follow any of the guides below, you should [import and install this project](../install.md) in your VitePress site.
:::

Import the component in `docs/.vitepress/theme/index.ts` (or equivalent)

::: code-group
```ts [index.ts]
import { VpvImage } from '@cynber/vitepress-valence' // [!code ++]

export default {
    enhanceApp({ app, router, siteData }) {
    app.component('VpvImage', VpvImage) // [!code ++]
    }
} satisfies Theme
```
:::

## Simple Image

::: details View Code

```vue
<VpvImage 
  :imageConfig="{ 
    image: '/demo-blog/june-dark.jpg'
  }" 
/>
```
:::

Which displays as:

<VpvImage 
  :imageConfig="{ 
    image: '/demo-blog/june-dark.jpg',
  }" 
/>

##  Simple Image + Description

::: details View Code
```vue
<VpvImage 
  :imageConfig="{ 
    image: '/demo-blog/june-dark.jpg'
    alt: 'My image',
    description: 'A couple standing by the water at dusk - Credits to Olegs Jonins on Unsplash'
  }" 
/>
```
:::

Which displays as:

<VpvImage 
  :imageConfig="{ 
    image: '/demo-blog/june-dark.jpg',
    alt: 'My image',
    description: 'A couple standing by the water at dusk - Credits to Olegs Jonins on Unsplash'
  }" 
/>

## Simple Light/Dark Mode Images

::: details View Code
```vue
<VpvImage 
  :imageConfig="{ 
    image: '/demo-blog/june-light.jpg',
    image_dark: '/demo-blog/june-dark.jpg'
    alt: 'Five birds flying on the sea - Credits to frank mckenna on Unsplash',
    alt_dark: 'A couple standing by the water at dusk - Credits to Olegs Jonins on Unsplash',
    description: 'Five birds flying on the sea - Credits to frank mckenna on Unsplash',
    description_dark: 'A couple standing by the water at dusk - Credits to Olegs Jonins on Unsplash'
  }" 
/>
```
:::

Which displays as:

<VpvImage 
  :imageConfig="{ 
    image: '/demo-blog/april-light.jpg',
    image_dark: '/demo-blog/april-dark.jpg',
    alt: 'A branch with cherry blossoms - Credits to Redd Francisco on Unsplash',
    alt_dark: 'A path at night with cherry blossoms - Credits to ayumi kubo on Unsplash',
    description: 'A branch with cherry blossoms - Credits to Redd Francisco on Unsplash',
    description_dark: 'A path at night with cherry blossoms - Credits to ayumi kubo on Unsplash'
  }" 
/>

::: tip TIP: Try toggling the theme

Press the sun/moon toggle in the top right corner of the site. The images in this demo will also change to reflect the theme.
:::

## `hideDescription`
Hide the image caption (default: `false`):

::: details View Code
```vue
<VpvImage :imageConfig="{image: '/demo-blog/june-dark.jpg'}" hideDescription />
```
:::

Which displays as:

<VpvImage :imageConfig="{image: '/demo-blog/june-dark.jpg'}" hideDescription />

## `enableZoom`
Enable click-to-zoom with medium-zoom (default: `false`):

::: details View Code
```vue
<VpvImage :imageConfig="{image: '/demo-blog/may-light.jpg'}" enableZoom />
```
:::

Which displays as:
<VpvImage :imageConfig="{image: '/demo-blog/may-light.jpg',}" enableZoom />

::: tip Click/Tap to Zoom

When zoom is enabled, clicking/tapping on the image will open the image in a larger view.
:::

### Zoom Customization

You can adjust what the zoomed-in view looks like by adjusting the margins and background color:

::: details View Code
```vue
<VpvImage 
  :imageConfig="{image: '/demo-blog/may-light.jpg'}"
  enableZoom
  :zoomMargin="50"
  zoomBackground="rgba(0, 0, 0, 0.8)"
/>
```
:::

Which displays as:

<VpvImage 
  :imageConfig="{image: '/demo-blog/may-light.jpg'}"
  enableZoom
  :zoomMargin="50"
  zoomBackground="rgba(0, 44, 44, 0.8)"
/>

## Sizing & Layout

### Basic Sizing

::: details View Code
```vue
<VpvImage 
  :imageConfig="{image: '/demo-blog/may-light.jpg'}"
  width="400px"
  height="300px"
  maxWidth="600px"
/>
```
:::

Which displays as:

<VpvImage 
  :imageConfig="{image: '/demo-blog/may-light.jpg'}"
  width="400px"
  height="300px"
  maxWidth="600px"
/>

### Aspect Ratio
::: details View Code
```vue
<VpvImage 
  :imageConfig="{image: '/demo-blog/may-light.jpg'}"
  aspectRatio="16/9"
/>
```
:::

Which displays as:

<VpvImage 
  :imageConfig="{image: '/demo-blog/may-light.jpg'}"
  aspectRatio="10/3"
/>

### Float Positioning

You can float the image to the left or right of the text:

::: details View Code
```vue
<!-- Float left with text wrapping -->
<VpvImage 
  :imageConfig="{
    image: '/demo-blog/may-dark.jpg'
  }"
  float="left" 
  width="400px"
  :enableZoom="true"
/>
Empty brown wooden bench - Credits to kychan on Unsplash. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis. Tortor at risus viverra adipiscing at in tellus integer feugiat.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis.

<!-- Float right with text wrapping -->
<VpvImage 
  :imageConfig="{image: '/demo-blog/july-dark.jpg'}"
  float="right" 
  width="400px" 
  :enableZoom="true"
/>

A couple of tents sitting in the middle of a forest - Credits to Fajar Magsyar on Unsplash. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis. Tortor at risus viverra adipiscing at in tellus integer feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```
:::

Which displays as:

<VpvImage 
  :imageConfig="{image: '/demo-blog/may-dark.jpg'}"
  float="left" 
  width="400px"
  :enableZoom="true"
/>
Empty brown wooden bench - Credits to kychan on Unsplash. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis. Tortor at risus viverra adipiscing at in tellus integer feugiat.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis.

<!-- Float right with text wrapping -->
<VpvImage 
  :imageConfig="{image: '/demo-blog/july-dark.jpg'}"
  float="right" 
  width="400px" 
  :enableZoom="true"
/>

A couple of tents sitting in the middle of a forest - Credits to Fajar Magsyar on Unsplash. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc astutis. Tortor at risus viverra adipiscing at in tellus integer feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<br>



## Border & Radius

::: details View Code
```vue
<!-- With border -->
<VpvImage :imageConfig="{image: '/demo-blog/october-dark.jpg'}" enableBorder />

<!-- Without rounded corners -->
<VpvImage :imageConfig="{image: '/demo-blog/october-dark.jpg'}" :enableRadius="false" />
```
:::

Example with border:

<!-- With border -->
<VpvImage :imageConfig="{image: '/demo-blog/october-dark.jpg'}" enableBorder />

Example without rounded corners:

<!-- Without rounded corners -->
<VpvImage :imageConfig="{image: '/demo-blog/october-dark.jpg'}" :enableRadius="false" />