---
prev:
  text: 'Use the Header Card'
  link: './component-VpvArticleHeader'
next: false

outline: [2, 4]
---

# Set up an Article List

This component will automatically list the available articles from your data loader, with options for sorting and filtering.

There are three formats available, and you can preview them at the [bottom of this page](#demo). 



## Article Setup

If you haven't done so already, please see the [Article Setup](/guide/article/setup) page for instructions on how to perform the initial setup.

Before you use this component, you will need to create a new post and [add the appropriate frontmatter](./create-post).


## Usage

You can simply add `<VpvArticleList />` to the body of your blog post.

If you something doesn't look right, check your frontmatter! You can compare it with the example in [Article Header](./component-VpvArticleHeader).

I recommend the following customizations for some common use cases:

::: details Recommended Customizations

**On a blog post, such as for a 'read more' section:**

Use the `vertical` format, and set the `maxCards` prop to `2`. This will display the first two posts in the list. You can also set it to match the category of the current post, as well as exclude the current post from the list.

**On a blog home page:**

Use the `horizontal` format. Additionally, set the frontmatter VitePress layout to `home`. ([see here](https://vitepress.dev/reference/default-theme-layout#home-layout))
:::

## Optional Functionality

### Display Formats
There are three formats available, and you can preview them at the [bottom of this page](#demo).

- `format="vertical"` (**default**) - Cards are displayed in a vertical grid layout
- `format="horizontal"` - Cards are displayed in a horizontal scrolling layout  
- `format="debug"` - Displays the raw JSON data of the filtered articles for debugging purposes

### Card Display Options

#### `hide*` Props
These props allow you to hide certain elements from the article cards, while still keeping the information available in the frontmatter for other components.
- default `hideAuthor` is `false`
- default `hideDate` is `false`
- default `hideImage` is `false`
- default `hideCategory` is `false`
- default `hideTags` is `false`
- default `hideDomain` is `false`

#### `dateFormat`
This prop allows you to specify the format of the date. It defaults to `long`.
You can set it to the following values:
- `dateFormat="long"` (**default**, example: "October 30, 2025")
- `dateFormat="short"` (example: "Oct 30, 2025")
- `dateFormat="iso"` (example: "2025-10-30")
- A custom format string, such as `:dateFormat="'yyyy-MM-dd HH:mm'"` (example: "2025-10-30 17:00")

#### Other Display Options
- `disableLinks`: Prevents the cards from being clickable links (default: `false`)
- `titleLines`: Limits the number of lines for the title display
- `excerptLines`: Limits the number of lines for the excerpt display
- `maxCards`: Limits the total number of cards displayed

### Filtering & Sorting

#### Basic Filtering
- `featuredOnly`: Only display articles marked as featured (default: `false`)
- `renderDrafts`: Include articles with `status: draft` (default: `false`)

#### Author Filtering
- `filterAuthors`: Only show articles by specific authors. Can be a single author string or array of author strings
- `excludeAuthors`: Exclude articles by specific authors (array of strings)

#### Category Filtering  
- `filterCategories`: Only show articles from specific categories (array of strings)
- `excludeCategories`: Exclude articles from specific categories (array of strings)

#### Tag Filtering
- `filterTags`: Only show articles that have ANY of the specified tags (array of strings)
- `excludeTags`: Exclude articles that have ANY of the specified tags (array of strings)

#### URL Filtering
- `excludeURLs`: Exclude specific article URLs from the list (array of strings)

#### Date Range Filtering
- `startDate`: Only show articles published on or after this date (Date, string, or null)
- `endDate`: Only show articles published on or before this date (Date, string, or null)

#### Sorting
- `sortOrder`: Sort articles by date
  - `"descending"` (**default**) - Newest articles first
  - `"ascending"` - Oldest articles first

### Data Source Customization

#### `articlesDataKey` & `postsDataKey`
If you [overrided the default export keys](./setup#customizations), you can use the following props to select the correct data. Note that most users will not need to use these props:
- `articlesDataKey`: The key of the articles data to use (ex. `demoArticles`)
- `postsDataKey`: Legacy prop for backward compatibility (ex. `demoPosts`)

#### `authorsDataKey`
If you [overrided the default export keys](./setup#customizations), you can use the following prop to select the correct data. Note that most users will not need to use this prop:
- `authorsDataKey`: The key of the authors data to use (ex. `demoAuthors`)

### Kitchen Sink Example
Here's a silly example that uses every single prop available (don't actually do this):

```vue
<VpvArticleList
  :articles="customArticleArray"
  articlesDataKey="myCustomArticles"
  authorsDataKey="myCustomAuthors"
  format="horizontal"
  hideAuthor
  hideDate
  dateFormat="iso"
  hideImage
  hideCategory
  hideTags
  hideDomain
  disableLinks
  :titleLines="2"
  :excerptLines="3"
  :maxCards="5"
  sortOrder="ascending"
  :filterAuthors="['john', 'jane']"
  :excludeAuthors="['bob']"
  :filterCategories="['tech', 'news']"
  :excludeCategories="['draft']"
  :filterTags="['vue', 'javascript']"
  :excludeTags="['deprecated']"
  :excludeURLs="['/old-post', '/another-old-post']"
  featuredOnly
  renderDrafts
  startDate="2024-01-01"
  endDate="2024-12-31"
/>
```


## Demo

### Horizontal Card Format

<VpvArticleList
    format="horizontal"
    postsDataKey="demoBlogData"
    :excludeURLs="[
        '/demo-blog/december',
        '/demo-blog/november',
    ]"
  />

The following code was used:

```vue
<VpvArticleList
    format="horizontal"
    postsDataKey="demoBlogData"
    :excludeURLs="[
        '/demo-blog/december',
        '/demo-blog/november',
    ]"
  />
```

### Vertical Card Format

<VpvArticleList
    format="vertical"
    postsDataKey="demoBlogData"
    :excludeURLs="[
        '/demo-blog/december',
        '/demo-blog/november',
    ]"
  />

The following code was used:

```vue
<VpvArticleList
    format="vertical"
    postsDataKey="demoBlogData"
    :excludeURLs="[
        '/demo-blog/december',
        '/demo-blog/november',
    ]"
  />
```

### Debug Format

The output for this format is messy and so it has been hidden in the dropdown:

::: details Debug Format

<VpvArticleList
    format="debug"
    postsDataKey="demoBlogData"
    :excludeURLs="[
        '/demo-blog/december',
        '/demo-blog/november',
    ]"
  />
:::

The following code was used:

```vue
<VpvArticleList
    format="debug"
    postsDataKey="demoBlogData"
    :excludeURLs="[
        '/demo-blog/december',
        '/demo-blog/november',
    ]"
  />
```
