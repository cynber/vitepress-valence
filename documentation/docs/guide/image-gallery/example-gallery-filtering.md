---
prev:
  text: "Gallery Full Size Layout"
  link: "/guide/image-gallery/example-gallery-full"
next: false

outline: [2, 4]
---


# Image Gallery: Filtering Examples

## Filter by File Type

<VpvImageGallery
    headerTitle="JPG Images Only"
    headerDate="2025-10-01"
    :folders="['/gallery/nature']"
    :include-extensions="['jpg']"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="JPG Images Only"
    headerDate="2025-10-01"
    :folders="['/gallery/nature']"
    :include-extensions="['jpg']"
/>
```
:::

<VpvImageGallery
    headerTitle="No JPGs Gallery"
    headerDate="2025-10-01"
    :folders="['/gallery/nature']"
    :exclude-extensions="['jpg']"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="No JPGs Gallery"
    headerDate="2025-10-01"
    :folders="['/gallery/nature']"
    :exclude-extensions="['jpg']"
/>
```
:::

## Select Specific Images

<VpvImageGallery
    headerTitle="Select Specific Images"
    headerDate="2025-10-01"
    :images="[
        '/gallery/nature/bernhard-oTBY78rZcEU-unsplash.jpg',
        '/gallery/urban/arturs-kipsts-p0AtyWl6Sf4-unsplash.jpg'
    ]"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="Select Specific Images"
    headerDate="2025-10-01"
    :images="[
        '/gallery/nature/bernhard-oTBY78rZcEU-unsplash.jpg',
        '/gallery/urban/arturs-kipsts-p0AtyWl6Sf4-unsplash.jpg'
    ]"
/>
```
:::

## Using `force-sort` to place the warm images first

<VpvImageGallery
    headerTitle="Nature Images, with warm images first"
    headerDate="2025-10-01"
    :folders="['/gallery/nature']"
    :force-sort="[
        '/gallery/nature/kristaps-ungurs-Tl_P1oW69HE-unsplash.jpg',
        '/gallery/nature/ingmar-1lXWi3blBmI-unsplash.jpg',
        '/gallery/nature/evgeni-tcherkasski-4I12DYcs0tc-unsplash.jpg',
        '/gallery/nature/gaelle-marcel-w_xwPUPvncA-unsplash.jpg'
    ]"
/>

::: details View Code
```vue
<VpvImageGallery
    headerTitle="Nature Images, with warm images first"
    headerDate="2025-10-01"
    :folders="['/gallery/nature']"
    :force-sort="[
        '/gallery/nature/kristaps-ungurs-Tl_P1oW69HE-unsplash.jpg',
        '/gallery/nature/ingmar-1lXWi3blBmI-unsplash.jpg',
        '/gallery/nature/evgeni-tcherkasski-4I12DYcs0tc-unsplash.jpg',
        '/gallery/nature/gaelle-marcel-w_xwPUPvncA-unsplash.jpg'
    ]"
/>
```
:::

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