---
prev:
  text: "Card & Container Usage"
  link: "/guide/cards"
next:
  text: "Examples - Vertical"
  link: "/guide/cards/examples-vertical"

outline: [2, 4]
---

# Horizontal Container & Card Examples

## Horizontal Container

### Basic Horizontal Container

<VpvContainerHorizontal>
  This is a basic horizontal container with no header and some simple content inside.
</VpvContainerHorizontal>

<VpvContainerHorizontal>
  <h3>This is a heading</h3>
  <p>This is a basic horizontal container with no header and some simple content inside, with HTML tags.</p>
  ## Markdown formatting will not work here
</VpvContainerHorizontal>

::: details View Code
```vue
<VpvContainerHorizontal>
  This is a basic horizontal container with no header and some simple content inside.
</VpvContainerHorizontal>

<VpvContainerHorizontal>
  <h3>This is a heading</h3>
  <p>This is a basic horizontal container with no header and some simple content inside, with HTML tags.</p>
  ## Markdown formatting will not work here
</VpvContainerHorizontal>
```
:::

### Horizontal Container with Header

<VpvContainerHorizontal
  headerTitle="Latest Blog Posts"
  headerSubtitle="Discover our newest articles and insights"
  headerDate="2025-01-15"
  headerDatePrefix="Updated on"
  headerDateFormat="long"
  :headerTitleLines="1"
  :headerSubtitleLines="2"
>
  <p>Container content goes here. This container has a full header with title, subtitle, and date.</p>
</VpvContainerHorizontal>

::: details View Code
```vue
<VpvContainerHorizontal
  headerTitle="Latest Blog Posts"
  headerSubtitle="Discover our newest articles and insights"
  headerDate="2025-01-15"
  headerDatePrefix="Updated on"
  headerDateFormat="long"
  :headerTitleLines="1"
  :headerSubtitleLines="2"
>
  <p>Container content goes here. This container has a full header with title, subtitle, and date.</p>
</VpvContainerHorizontal>
```
:::

### Horizontal Container with Clickable Header

<VpvContainerHorizontal
  headerTitle="Featured Articles"
  headerSubtitle="Click the header to view all articles"
  headerLink="/demo-blog/february"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
>
  <p>This container has a clickable header that links to another page.</p>
</VpvContainerHorizontal>

::: details View Code
```vue
<VpvContainerHorizontal
  headerTitle="Featured Articles"
  headerSubtitle="Click the header to view all articles"
  headerLink="/demo-blog/february"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
>
  <p>This container has a clickable header that links to another page.</p>
</VpvContainerHorizontal>
```
:::

## Horizontal Cards

### Basic Horizontal Card

<VpvContainerHorizontal
  headerTitle="Simple Card Example"
  headerSubtitle="A basic horizontal card with minimal content"
>
  <VpvCardHorizontal
    title="Getting Started with VitePress"
    excerpt="Learn how to set up and configure VitePress for your documentation needs. This comprehensive guide covers everything from installation to deployment."
    author="Jane Smith"
    date="2025-01-10"
    url="https://example.com/demo-blog/march"
  />
</VpvContainerHorizontal>

::: details View Code
```vue
<VpvContainerHorizontal
  headerTitle="Simple Card Example"
  headerSubtitle="A basic horizontal card with minimal content"
>
  <VpvCardHorizontal
    title="Getting Started with VitePress"
    excerpt="Learn how to set up and configure VitePress for your documentation needs. This comprehensive guide covers everything from installation to deployment."
    author="Jane Smith"
    date="2025-01-10"
    url="https://example.com/demo-blog/march"
  />
</VpvContainerHorizontal>
```
:::

### Horizontal Card with Image

<VpvContainerHorizontal
  headerTitle="Card with Images"
  headerSubtitle="Horizontal cards support both light and dark mode images"
>
  <VpvCardHorizontal
    title="Advanced Vue.js"
    excerpt="Explore advanced patterns and techniques in Vue.js development."
    author="Alex Johnson"
    date="2025-01-08"
    image="/demo-blog/april-light.jpg"
    image_dark="/demo-blog/april-dark.jpg"
    category="Web Development"
    :tags="['Vue.js', 'JavaScript', 'Frontend']"
    url="https://example.com/vue-techniques"
    :isExternal="true"
  />
</VpvContainerHorizontal>

::: details View Code
```vue
<VpvContainerHorizontal
  headerTitle="Card with Images"
  headerSubtitle="Horizontal cards support both light and dark mode images"
>
  <VpvCardHorizontal
    title="Advanced Vue.js"
    excerpt="Explore advanced patterns and techniques in Vue.js development."
    author="Alex Johnson"
    date="2025-01-08"
    image="/demo-blog/april-light.jpg"
    image_dark="/demo-blog/april-dark.jpg"
    category="Web Development"
    :tags="['Vue.js', 'JavaScript', 'Frontend']"
    url="https://example.com/vue-techniques"
    :isExternal="true"
  />
</VpvContainerHorizontal>
```
:::

### Multiple Horizontal Cards

<VpvContainerHorizontal
  headerTitle="Article Collection"
  headerSubtitle="A collection of our most popular articles"
  headerDate="2025-01-12"
  headerDateFormat="short"
>
  <VpvCardHorizontal
    title="Building Responsive Layouts"
    excerpt="Master the art of creating responsive web layouts that work seamlessly across all device sizes using modern CSS techniques."
    author="Sarah Wilson"
    date="2025-01-05"
    image="/demo-blog/may-light.jpg"
    category="CSS"
    :tags="['Responsive Design', 'CSS Grid', 'Flexbox']"
    url="https://example.com/demo-blog/may"
    :titleLines="1"
    :excerptLines="1"
  />

  <VpvCardHorizontal
    title="JavaScript Performance Optimization"
    excerpt="Learn essential techniques to optimize your JavaScript code for better performance and user experience."
    author="Mike Chen"
    date="2025-01-03"
    image="/demo-blog/june-light.jpg"
    image_dark="/demo-blog/june-dark.jpg"
    category="Performance"
    :tags="['JavaScript', 'Optimization', 'Web Performance']"
    url="https://example.com/js-optimization"
    :isExternal="true"
  />

  <VpvCardHorizontal
    title="Static Content Card"
    excerpt="This card demonstrates a non-clickable card that can be used for displaying static information without navigation."
    author="Demo Author"
    date="2025-01-01"
    category="Demo"
    :tags="['Static', 'Example']"
    :disableLinks="true"
  />
</VpvContainerHorizontal>

::: details View Code
```vue
<VpvContainerHorizontal
  headerTitle="Article Collection"
  headerSubtitle="A collection of our most popular articles"
  headerDate="2025-01-12"
  headerDateFormat="short"
>
  <VpvCardHorizontal
    title="Building Responsive Layouts"
    excerpt="Master the art of creating responsive web layouts that work seamlessly across all device sizes using modern CSS techniques."
    author="Sarah Wilson"
    date="2025-01-05"
    image="/demo-blog/may-light.jpg"
    category="CSS"
    :tags="['Responsive Design', 'CSS Grid', 'Flexbox']"
    url="https://example.com/demo-blog/may"
    :titleLines="1"
    :excerptLines="1"
  />

  <VpvCardHorizontal
    title="JavaScript Performance Optimization"
    excerpt="Learn essential techniques to optimize your JavaScript code for better performance and user experience."
    author="Mike Chen"
    date="2025-01-03"
    image="/demo-blog/june-light.jpg"
    image_dark="/demo-blog/june-dark.jpg"
    category="Performance"
    :tags="['JavaScript', 'Optimization', 'Web Performance']"
    url="https://example.com/js-optimization"
    :isExternal="true"
  />

  <VpvCardHorizontal
    title="Static Content Card"
    excerpt="This card demonstrates a non-clickable card that can be used for displaying static information without navigation."
    author="Demo Author"
    date="2025-01-01"
    category="Demo"
    :tags="['Static', 'Example']"
    :disableLinks="true"
  />
</VpvContainerHorizontal>
```
:::

### Horizontal Card with Hidden Elements

<VpvContainerHorizontal
  headerTitle="Customized Display"
  headerSubtitle="Cards with selectively hidden elements"
>
  <VpvCardHorizontal
    title="Card with Hidden Author and Date"
    excerpt="This card demonstrates how to hide specific metadata elements while keeping the overall card structure intact."
    author="Hidden Author"
    date="2025-01-07"
    image="/demo-blog/july-light.jpg"
    category="Tutorial"
    :tags="['Customization', 'UI/UX']"
    url="https://example.com/demo-blog/july"
    :hideAuthor="true"
    :hideDate="true"
  />

  <VpvCardHorizontal
    title="Text-Only Card"
    excerpt="Sometimes you want a clean, text-only appearance without images or category tags for a minimalist design approach."
    author="Content Creator"
    date="2025-01-06"
    image="/demo-blog/august-light.jpg"
    category="Design"
    :tags="['Minimalism', 'Clean Design']"
    url="https://example.com/text-only"
    :hideImage="true"
    :hideCategory="true"
    :hideTags="true"
  />
</VpvContainerHorizontal>

::: details View Code
```vue
<VpvContainerHorizontal
  headerTitle="Customized Display"
  headerSubtitle="Cards with selectively hidden elements"
>
  <VpvCardHorizontal
    title="Card with Hidden Author and Date"
    excerpt="This card demonstrates how to hide specific metadata elements while keeping the overall card structure intact."
    author="Hidden Author"
    date="2025-01-07"
    image="/demo-blog/july-light.jpg"
    category="Tutorial"
    :tags="['Customization', 'UI/UX']"
    url="https://example.com/demo-blog/july"
    :hideAuthor="true"
    :hideDate="true"
  />

  <VpvCardHorizontal
    title="Text-Only Card"
    excerpt="Sometimes you want a clean, text-only appearance without images or category tags for a minimalist design approach."
    author="Content Creator"
    date="2025-01-06"
    image="/demo-blog/august-light.jpg"
    category="Design"
    :tags="['Minimalism', 'Clean Design']"
    url="https://example.com/text-only"
    :hideImage="true"
    :hideCategory="true"
    :hideTags="true"
  />
</VpvContainerHorizontal>
```
:::
