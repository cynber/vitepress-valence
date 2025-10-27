---
prev:
  text: 'Create a new post'
  link: './create-post'
next:
  text: 'Set up an Article List'
  link: './component-VpvArticleList'

outline: [2, 4]
---

# Use the Header Card

This component is to be used in the body of a blog post. It displays information about the post, based on what is provided in the frontmatter.

To see this in action, select any of the posts in the [Demo Blog](/blog-demo).


The entire sample file for [March](/demo-blog/march) can be found here. The relevant section (lines `58-61`) has been highlighted:

::: details View Code

<<< @/demo-blog/april.md {58-61 md:line-numbers }
:::

## Article Setup

If you haven't done so already, please see the [Article Setup](/guide/article/setup) page for instructions on how to perform the initial setup.

Before you use this component, you will need to create a new post and [add the appropriate frontmatter](./create-post).


## Usage

You can simply add `<VpvArticleHeader />` to the body of your blog post.

If you something doesn't look right, check your frontmatter! You can compare it with the example above.

## Optional Functionality

### `returnLink` & `returnText`

These props allow you to specify the URL and text to display on the 'Back' button. 

- default `returnLink` is `/`
- default `returnText` is `Back Home`

### `dateFormat`

This prop allows you to specify the format of the date. It defaults to `long`.

You can set it to the following values:
- `dateFormat="long"` (**default**, example: "October 30, 2025")
- `dateFormat="short"` (example: "Oct 30, 2025")
- `dateFormat="iso"` (example: "2025-10-30")
- A custom format string, such as `:dateFormat="'yyyy-MM-dd HH:mm'"` (example: "2025-10-30 17:00")

### Banner Image Customizations

These props allow you to customize the banner image.

- `featImageWidth`: The width of the image, in pixels. (default: `100%`)
- `featImageHeight`: The height of the image, in pixels. (default: `auto`)
- `featImageAspectRatio`: The aspect ratio of the image. (default: `16/9`)
- `featImageMaxWidth`: The maximum width of the image, in pixels. (default: `800px`)
- `enableFeatImageZoom`: Whether to enable zooming on the image. (default: `false`)

### `hide*` Props

These props allow you to hide certain elements from the header card, while still keeping the information available in the frontmatter for other components.

- default `hideTitle` is `false`
- default `hideSubtitle` is `false`
- default `hideDate` is `false`
- default `hideReadingTime` is `false`
- default `hideAuthor` is `false`
- default `hideCategory` is `false`
- default `hideTags` is `false`
- default `hideFeatImage` is `false`
- default `hideFeatImageDescription` is `false`

### `authorsDataKey`

If you [overrided the default export keys](./setup#customizations), you can use the following prop to select the correct data. Note that most users will not need to use this prop:
  - `authorsDataKey`: The key of the authors data to use. (ex. `demoAuthors`)

