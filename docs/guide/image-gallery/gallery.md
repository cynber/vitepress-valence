---
prev:
  text: "VpvImage Usage"
  link: "/guide/image-gallery/image"
next:
  text: "Gallery Simple Grid Layout"
  link: "/guide/image-gallery/example-gallery-simple"

outline: [2, 4]
---

# VpvImageGallery Usage

This component creates interactive image galleries with lightbox functionality using PhotoSwipe. It supports multiple layout options and can filter images from your gallery data by folders, specific files, or direct URLs.

You can also see the following pages for detailed examples:

- [Gallery Simple Grid Layout](./example-gallery-simple.md): Displays the simple grid layout, along with a number of examples with that layout
- [Gallery Masonry Layout](./example-gallery-masonry.md): Displays the masonry layout.
- [Gallery Full Size Layout](./example-gallery-full.md): Displays the full-size layout.
- [Gallery Filtering](./example-gallery-filtering.md): Examples of filtering a large gallery

## Setup

::: warning Do initial installation first

Before you follow any of the guides below, you should [import and install this project](../install.md) in your VitePress site.
:::

You are free to create files and directories wherever you want. However, you will need to update the paths accordingly.

1. Create a directory in your project for gallery images, ideally in the `public` directory. For example, `docs/public/gallery`. 
    - You can organize your images in subdirectories, such as `docs/public/gallery/nature`, `docs/public/gallery/urban`, etc.
2. Create a `gallery.data.js` file, such as at `docs/.vitepress/theme/data/gallery.data.js`. 

::: details Copy the following code into your `gallery.data.js` file
<<< @/.vitepress/theme/data/gallery.data.js
:::

3. You will need to modify the three variables at the top of the file to match your project:
    - `SITE_DIR`: The location of the site (where is the .vitepress folder inside of, ex. 'docs')
    - `SRC_DIR`: The source directory (By default this is '', but if you configured an [srcDir value in your VitePress config](https://vitepress.dev/guide/routing#source-directory), you will need to set it here)
    - `GALLERY_DIR`: The location of the gallery folder (ex. 'public/gallery')

4. Import the component and your gallery data in `docs/.vitepress/theme/index.ts` (or equivalent)

::: code-group
```ts [index.ts]
import { data as galleryData } from './data/gallery.data.js';  // [!code ++]
// ...
import { VpvImageGallery } from '@cynber/vitepress-valence' // [!code ++]
// ...
export default {
    enhanceApp({ app, router, siteData }) {
    // ...
    app.component('VpvImageGallery', VpvImageGallery) // [!code ++]
    // ...
    app.provide('galleryData', galleryData)  // [!code ++]
    }
} satisfies Theme
```
:::

## Basic Usage

### Simple Gallery
Display all images from your gallery data:

```vue
<VpvImageGallery />
```

### Gallery with Specific Folders
Display images from specific folders:

```vue
<VpvImageGallery 
  :folders="['/gallery/nature', '/gallery/urban']"
/>
```

### Gallery with Direct URLs
Use direct image URLs instead of gallery data:

```vue
<VpvImageGallery
  :directUrls="['/images/photo1.jpg', '/images/photo2.jpg']"
/>
```

## Gallery Header
### Header Configuration
These props allow you to add a header section above the gallery.
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

::: details Kitchen Sink Example for Header Options

```vue
<VpvImageGallery 
  headerTitle="Wedding Photos"
  headerSubtitle="Captured by Professional Photography"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
  headerLink="/full-event-album"
  headerDate="2024-06-15"
  headerDateFormat="long"
  headerDatePrefix="Event Date: "
   :folders="['/no-images-here']"
/>
```

<VpvImageGallery 
  headerTitle="Wedding Photos"
  headerSubtitle="Captured by Professional Photography"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
  headerLink="/full-event-album"
  headerDate="2024-06-15"
  headerDateFormat="long"
  headerDatePrefix="Event Date: "
   :folders="['/no-images-here']"
/>
:::

::: warning Legacy Props (Deprecated)
The following props are deprecated but still supported for backwards compatibility. Please use the `header*` equivalents instead:
- `title` → use `headerTitle`
- `titleLines` → use `headerTitleLines`
- `date` → use `headerDate`
- `dateFormat` → use `headerDateFormat`
- `dateTimeDescription` → use `headerDatePrefix`
- `link` → use `headerLink`
- `time` → no longer used
:::

## Layout Options

### `layout`
Choose from three layout styles:
- `"grid"` (**default**) - Square thumbnails in a responsive grid ([see example](./example-gallery-simple.md))
- `"full"` - Full-width images stacked vertically ([see example](./example-gallery-full.md))
- `"masonry"` - Multi-column masonry layout ([see example](./example-gallery-masonry.md))



## Image Filtering

### Folder-Based Filtering
- `folders`: Include images from specific folders (array of strings)

```vue
<VpvImageGallery 
  headerTitle="Event Photos"
  :folders="['ceremony', 'reception', 'portraits']"
/>
```

### Specific Image Selection
- `images`: Include specific image paths (array of strings)

```vue
<VpvImageGallery 
  headerTitle="Featured Photos"
  :images="['events/photo1.jpg', 'gallery/highlight.png']"
/>
```

### Direct URL Override
- `directUrls`: Use direct URLs instead of gallery data (array of strings)

```vue
<VpvImageGallery 
  headerTitle="External Gallery"
  :directUrls="['https://example.com/image1.jpg', '/local/image2.png']"
/>
```

### Extension Filtering
- `includeExtensions`: Only include specific file types (array of strings)
- `excludeExtensions`: Exclude specific file types (array of strings)

```vue
<VpvImageGallery 
  headerTitle="Photos Only"
  :includeExtensions="['jpg', 'jpeg', 'png']"
  :excludeExtensions="['gif', 'webp']"
/>
```

## Sorting & Organization

### `forceSort`
Manually specify the order of images:

```vue
<VpvImageGallery 
  headerTitle="Ordered Gallery"
  :forceSort="['hero-image.jpg', 'second-image.jpg', 'third-image.jpg']"
/>
```
*Note: Images not in the forceSort array will appear after the sorted ones in alphabetical order.*

## Data Source Customization

### `galleryDataKey`

::: details Optional: Override the default export keys

---

**Warning:** This section will not be necessary for most users.

---

While this package has extensive support for filtering gallery folders, you may choose to have completely separate galleries and data loaders for each one.

This can also be helpful if your site is already using the `galleryData` export for other purposes.

**Steps:**

1. Create any additional gallery folders and data loaders as needed. For example:
    - `docs/public/other-gallery`
    - `docs/.vitepress/theme/data/other-gallery.data.js`

When creating a new gallery data loader, you will need to update the path accordingly:

```js
// ...
const GALLERY_DIR = 'public/other-gallery'; // [!code ++]
//...
```

2. In your `index.ts` file, import the additional data and/or gallery folders:
```ts [index.ts]
import { data as galleryData } from './data/gallery.data.js';
import { data as otherGalleryData } from './data/other-gallery.data.js'; // [!code ++]
// ...
import { VpvImageGallery } from '@cynber/vitepress-valence'
// ...
export default {
    enhanceApp({ app, router, siteData }) {
    // ...
    app.component('VpvImageGallery', VpvImageGallery)
    // ...
    app.provide('galleryData', galleryData)
    app.provide('otherGalleryData', otherGalleryData)  // [!code ++]
    }
} satisfies Theme
```

3. You will need to use the new key (ex. `otherGalleryData`) in the components that use the data.
:::


If you overrided the default export keys, you can use this prop to select the correct data. Note that most users will not need to use this prop:

```vue
<VpvImageGallery 
  headerTitle="Custom Gallery"
  galleryDataKey="otherGalleryData"
/>
```