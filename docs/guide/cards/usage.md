---
prev: false
next:
  text: "Examples - Horizontal"
  link: "/guide/cards/examples-horizontal"

outline: [2, 4]
---


# Cards & Containers

The cards and containers used throughout this package can also be used independently. This will let you create cards linking to custom content, in whatever order you prefer.

## Setup

::: warning Do initial installation first

Before you follow any of the guides below, you should [import and install this project](../install.md) in your VitePress site.
:::

You are free to pick and choose which components to import, and whether you want to pair containers with cards. We recommend using cards with containers, and to use the same layout (`horizontal` or `vertical`) for all components with a particular set of cards.

1. Import the component in `docs/.vitepress/theme/index.ts` (or equivalent)

::: code-group
```ts [index.ts]
import {
    VpvCardHorizontal,             // [!code ++]
    VpvCardVertical,               // [!code ++]
    VpvContainerHorizontal,        // [!code ++]
    VpvContainerVertical           // [!code ++]
} from '@cynber/vitepress-valence'
// ...
export default {
    // ...
    enhanceApp({ app, router, siteData }) {
    // ...
    app.component('VpvCardHorizontal', VpvCardHorizontal)       // [!code ++]
    app.component('VpvCardVertical', VpvCardVertical)           // [!code ++]
    app.component('VpvContainerHorizontal', VpvContainerHorizontal) // [!code ++]
    app.component('VpvContainerVertical', VpvContainerVertical) // [!code ++]
    }
}
```
:::

## Usage

### Container Components

Both `VpvContainerHorizontal` and `VpvContainerVertical` serve as wrapper components that provide structure and optional header functionality for organizing cards or other content. They share identical props.

#### Basic Usage

Containers can be used as simple wrappers around your content:

```vue
<VpvContainerHorizontal>
  <!-- Your cards or other content here -->
</VpvContainerHorizontal>

```
```vue
<VpvContainerVertical>
  <!-- Your cards or other content here -->
</VpvContainerVertical>
```

#### Optional Header Functionality

Both container types support an optional header section with the following props:

**Content Props:**
- `headerTitle`: Main title text for the container header
- `headerSubtitle`: Subtitle text displayed below the title  
- `headerDate`: Date to display in the header
- `headerLink`: URL for making the header clickable

**Display Options:**
- `headerTitleLines`: Number of lines to display for the title before truncating
- `headerSubtitleLines`: Number of lines to display for the subtitle before truncating
- `headerDateFormat`: Date format - accepts `"long"`, `"short"`, `"iso"`, or custom format strings (ex. `"yyyy-MMM-dd"`)
- `headerDatePrefix`: Text to display before the date

The header will only appear when `headerTitle` is provided.

### Card Components

Both `VpvCardHorizontal` and `VpvCardVertical` are content display components that can function as clickable links or static content blocks.

#### Required Props

Both card types require basic content props:
- `title`: The main heading for the card
- `excerpt`: Descriptive text content for the card

#### Optional Content Props

**Metadata:**
- `author`: Author name to display
- `date`: Date to display (enter a date in the format `YYYY-MM-DD`)
- `image`: the URL or relative path to an image to display
- `image_dark`: the URL or relative path to an image to display in dark mode (if not provided, the `image` prop will be used in both light and dark modes)
- `category`: A single category name to display
- `tags`: Array of tag names to display
- `url`: the URL or relative path to navigate to when the card is selected

**Display Control:**
- `titleLines`: Number of lines for title before truncation (default: 2)
- `excerptLines`: Number of lines for excerpt before truncation
- `disableLinks`: If set to `true`, the card will not be clickable
- `isExternal`: If set to `true`, the card will display additional formatting to indicate that the link will take you to an external site (currently affects the `Vertical` card type only, as of `v0.2.0`)

**`hide*` Props:**
- `hideAuthor`: Hide the author name
- `hideDate`: Hide the date
- `hideImage`: Hide the image
- `hideCategory`: Hide the category
- `hideTags`: Hide the tags
- `hideDomain`: Hide the domain from the external link formatting (currently affects the `Vertical` card type only, as of `v0.2.0`)


When a `url` is provided and `disableLinks` is not set to `true`, cards will automatically detect external links and apply appropriate attributes (`target="_blank"` and `rel="noopener noreferrer"`).
