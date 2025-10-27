---
prev:
  text: "VpvImage Gallery Usage"
  link: "/guide/image-gallery/gallery"
next:
  text: "Gallery Masonry Layout"
  link: "/guide/image-gallery/example-gallery-masonry"

outline: [2, 4]
---

# Image Gallery: Simple Grid Layout

## Simplest Example

This example has no title or date set, and so it will not display a header.

<VpvImageGallery
    :folders="[
        '/gallery/nature',
    ]"
/>

::: details View Code
```vue
<VpvImageGallery
    :folders="[
        '/gallery/nature',
    ]"
/>
```
:::

## Example

These examples are all the same, except they reference different subdirectories in the main gallery folder.


<VpvImageGallery
    headerTitle="Sample Gallery - Nature"
    headerDate="2025-10-01"
    :folders="[
        '/gallery/nature',
    ]"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="Sample Gallery - Nature"
    headerDate="2025-10-01"
    :folders="[
        '/gallery/nature',
    ]"
/>
```
:::

<VpvImageGallery
    headerTitle="Sample Gallery - Urban"
    headerDate="2025-10-01"
    :folders="[
        '/gallery/urban',
    ]"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="Sample Gallery - Urban"
    headerDate="2025-10-01"
    :folders="[
        '/gallery/urban',
    ]"
/>
```
:::

<VpvImageGallery
    headerTitle="Combine Multiple Folders"
    headerDate="2025-10-01"
    :folders="['/gallery/nature', '/gallery/urban']"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="Combine Multiple Folders"
    headerDate="2025-10-01"
    :folders="[
        '/gallery/nature', 
        '/gallery/urban'
    ]"
/>
```
:::

## External Images

This example shows how to use direct image URLs instead of gallery data.

<VpvImageGallery
    headerTitle="External Images"
    headerDate="2025-10-01"
    :direct-urls="[
        'https://picsum.photos/id/11/2500/1667',
        'https://picsum.photos/id/27/3264/1836'
    ]"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="External Images"
    headerDate="2025-10-01"
    :direct-urls="[
        'https://picsum.photos/id/11/2500/1667',
        'https://picsum.photos/id/27/3264/1836'
    ]"
/>
```
:::

## A Gallery with Errors

If the component can not find any images in a folder, it will display an error message.

<VpvImageGallery
    headerTitle="Sample Gallery with Errors"
    headerDate="2025-10-01"
    :folders="[
        '/gallery/error',
    ]"
/>

If some directories are valid, while others are not, only the valid ones will be displayed.

<VpvImageGallery
    headerTitle="Combine Multiple Folders, with an error"
    headerDate="2025-10-01"
    :folders="['/gallery/error', '/gallery/urban']"
/>

If you set direct links, for either local images or external URLs, the component will try to load them even if there are errors.

<VpvImageGallery
    headerTitle="Direct links with errors"
    headerDate="2025-10-01"
    :direct-urls="[
        'https://picsum.photos/id/11/2500/1667',
        'https://example.com/error',
        '/demo-blog/june-light.jpg',
        '/demo-blog/error.jpg',
    ]"
/>


## Credits

::: details Nature Images

- Photo by <a href="https://unsplash.com/@foggyscenery?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ingmar</a> on <a href="https://unsplash.com/photos/a-red-mushroom-with-white-spots-in-a-forest-1lXWi3blBmI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@evgenit?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Evgeni Tcherkasski</a> on <a href="https://unsplash.com/photos/waterfall-cascading-down-mossy-rocks-in-a-lush-forest-4I12DYcs0tc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@thapapawan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bobby</a> on <a href="https://unsplash.com/photos/abstract-pattern-of-blue-and-white-textures-oeMBcVDmCY8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@kristapsungurs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kristaps Ungurs</a> on <a href="https://unsplash.com/photos/autumn-trees-line-a-winding-country-road-from-above-Tl_P1oW69HE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@bernhardbar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bernhard</a> on <a href="https://unsplash.com/photos/a-river-surrounded-by-snow-covered-trees-and-mountains-oTBY78rZcEU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@filipkvasnak?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Filip Kvasnak</a> on <a href="https://unsplash.com/photos/a-black-and-white-photo-of-a-mountain-range-2914e-Ia138?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@gaellemarcel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Gaelle Marcel</a> on <a href="https://unsplash.com/photos/purple-asters-bloom-in-warm-hazy-sunlight-w_xwPUPvncA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
:::

::: details Urban Images

- Photo by <a href="https://unsplash.com/@skvaad?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Artūrs Ķipsts</a> on <a href="https://unsplash.com/photos/cars-parked-on-side-of-the-road-during-night-time-p0AtyWl6Sf4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@robpotter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rob Potter</a> on <a href="https://unsplash.com/photos/a-city-street-with-tall-buildings-in-the-background-og1vv4QUEXs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@liobell?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Liobell Liu</a> on <a href="https://unsplash.com/photos/a-city-street-at-dusk-with-a-large-building-in-the-background-CzFB72NuKP8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@hinbong?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hin Bong Yeung</a> on <a href="https://unsplash.com/photos/empty-tunnel-pathway-with-graffiti-walls-jF946mh5QrA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@rylo444?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ryan Loughlin</a> on <a href="https://unsplash.com/photos/low-light-photo-of-group-people-in-restaurant-8cLxPIIEYzo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
:::