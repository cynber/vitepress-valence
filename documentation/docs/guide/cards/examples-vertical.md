---
prev:
  text: "Examples - Horizontal"
  link: "/guide/cards/examples-horizontal"
next: false

outline: [2, 4]
---

# Vertical Container & Card Examples

::: tip TIP: Try resizing the browser window

The cards in this demo will automatically adjust to the size of the browser window.
:::

## Vertical Container

### Basic Vertical Container

<VpvContainerVertical>
  <p>This is a basic vertical container with no header. Content inside will be arranged in a responsive grid layout.</p>
  <p>Here's another piece of content that will be placed in the grid.</p>
</VpvContainerVertical>

::: details View Code
```vue
<VpvContainerVertical>
  <p>This is a basic vertical container with no header. Content inside will be arranged in a responsive grid layout.</p>
  <p>Here's another piece of content that will be placed in the grid.</p>
</VpvContainerVertical>
```
:::

### Vertical Container with Header

<VpvContainerVertical
  headerTitle="Featured Resources"
  headerSubtitle="Curated collection of tools and tutorials for developers"
  headerDate="2025-01-14"
  headerDatePrefix="Last updated"
  headerDateFormat="iso"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
>
  <p>Grid item 1 - This content will be arranged in a responsive grid.</p>
  <p>Grid item 2 - The vertical container automatically handles responsive layout.</p>
  <p>Grid item 3 - Perfect for card collections and content galleries.</p>
</VpvContainerVertical>

::: details View Code
```vue
<VpvContainerVertical
  headerTitle="Featured Resources"
  headerSubtitle="Curated collection of tools and tutorials for developers"
  headerDate="2025-01-14"
  headerDatePrefix="Last updated"
  headerDateFormat="iso"
  :headerTitleLines="1"
  :headerSubtitleLines="1"
>
  <p>Grid item 1 - This content will be arranged in a responsive grid.</p>
  <p>Grid item 2 - The vertical container automatically handles responsive layout.</p>
  <p>Grid item 3 - Perfect for card collections and content galleries.</p>
</VpvContainerVertical>
```
:::

### Vertical Container with Custom Date Format

<VpvContainerVertical
  headerTitle="Project Portfolio"
  headerSubtitle="My latest work and experiments"
  headerDate="2025-01-16"
  headerDateFormat="yyyy-MMM-dd"
  headerLink="/demo-blog/portfolio"
>
  <p>Portfolio content would go here in a beautiful grid layout.</p>
</VpvContainerVertical>

::: details View Code
```vue
<VpvContainerVertical
  headerTitle="Project Portfolio"
  headerSubtitle="My latest work and experiments"
  headerDate="2025-01-16"
  headerDateFormat="yyyy-MMM-dd"
  headerLink="/demo-blog/portfolio"
>
  <p>Portfolio content would go here in a beautiful grid layout.</p>
</VpvContainerVertical>
```
:::

## Vertical Cards

### Basic Vertical Cards

<VpvContainerVertical
  headerTitle="Simple Card Grid"
  headerSubtitle="Basic vertical cards in a responsive grid"
>
  <VpvCardVertical
    title="Introduction to TypeScript"
    excerpt="Discover the benefits of TypeScript and how it can improve your JavaScript development workflow with static typing and better tooling."
    author="Emma Davis"
    date="2025-01-11"
    url="/demo-blog/typescript"
  />

  <VpvCardVertical
    title="Modern CSS Layouts"
    excerpt="Explore the latest CSS layout techniques including Grid, Flexbox, and Container Queries for creating responsive designs."
    author="Tom Rodriguez"
    date="2025-01-09"
    url="/demo-blog/css-layouts"
  />
</VpvContainerVertical>

::: details View Code
```vue
<VpvContainerVertical
  headerTitle="Simple Card Grid"
  headerSubtitle="Basic vertical cards in a responsive grid"
>
  <VpvCardVertical
    title="Introduction to TypeScript"
    excerpt="Discover the benefits of TypeScript and how it can improve your JavaScript development workflow with static typing and better tooling."
    author="Emma Davis"
    date="2025-01-11"
    url="/demo-blog/typescript"
  />

  <VpvCardVertical
    title="Modern CSS Layouts"
    excerpt="Explore the latest CSS layout techniques including Grid, Flexbox, and Container Queries for creating responsive designs."
    author="Tom Rodriguez"
    date="2025-01-09"
    url="/demo-blog/css-layouts"
  />
</VpvContainerVertical>
```
:::

### Vertical Cards with Images and External Links

<VpvContainerVertical
  headerTitle="External Resources"
  headerSubtitle="Useful tools and articles from around the web"
>
  <VpvCardVertical
    title="Vue.js Official Documentation"
    excerpt="The comprehensive guide to Vue.js 3, including the Composition API, reactivity system, and all the latest features."
    author="Vue.js Team"
    date="2025-01-13"
    image="/demo-blog/september-light.jpg"
    image_dark="/demo-blog/september-dark.jpg"
    category="Documentation"
    :tags="['Vue.js', 'Official', 'Reference']"
    url="https://example.com/vue-docs"
    :isExternal="true"
  />

  <VpvCardVertical
    title="Design Systems Guide"
    excerpt="Learn how to build and maintain effective design systems that scale across teams and products."
    author="Design Team"
    date="2025-01-12"
    image="/demo-blog/october-light.jpg"
    category="Design"
    :tags="['Design Systems', 'UI/UX', 'Guidelines']"
    url="https://example.com/design-systems"
    :isExternal="true"
  />

  <VpvCardVertical
    title="Internal Best Practices"
    excerpt="Our team's collection of coding standards and best practices for maintaining high-quality code."
    author="Development Team"
    date="2025-01-10"
    image="/demo-blog/november-light.jpg"
    image_dark="/demo-blog/november-dark.jpg"
    category="Standards"
    :tags="['Best Practices', 'Code Quality', 'Guidelines']"
    url="/demo-blog/best-practices"
  />
</VpvContainerVertical>

::: details View Code
```vue
<VpvContainerVertical
  headerTitle="External Resources"
  headerSubtitle="Useful tools and articles from around the web"
>
  <VpvCardVertical
    title="Vue.js Official Documentation"
    excerpt="The comprehensive guide to Vue.js 3, including the Composition API, reactivity system, and all the latest features."
    author="Vue.js Team"
    date="2025-01-13"
    image="/demo-blog/september-light.jpg"
    image_dark="/demo-blog/september-dark.jpg"
    category="Documentation"
    :tags="['Vue.js', 'Official', 'Reference']"
    url="https://example.com/vue-docs"
    :isExternal="true"
  />

  <VpvCardVertical
    title="Design Systems Guide"
    excerpt="Learn how to build and maintain effective design systems that scale across teams and products."
    author="Design Team"
    date="2025-01-12"
    image="/demo-blog/october-light.jpg"
    category="Design"
    :tags="['Design Systems', 'UI/UX', 'Guidelines']"
    url="https://example.com/design-systems"
    :isExternal="true"
  />

  <VpvCardVertical
    title="Internal Best Practices"
    excerpt="Our team's collection of coding standards and best practices for maintaining high-quality code."
    author="Development Team"
    date="2025-01-10"
    image="/demo-blog/november-light.jpg"
    image_dark="/demo-blog/november-dark.jpg"
    category="Standards"
    :tags="['Best Practices', 'Code Quality', 'Guidelines']"
    url="/demo-blog/best-practices"
  />
</VpvContainerVertical>
```
:::

### Large Grid with Mixed Content

<VpvContainerVertical
  headerTitle="Complete Resource Library"
  headerSubtitle="Everything you need to know about modern web development"
  headerDate="2025-01-15"
  headerDateFormat="long"
>
  <VpvCardVertical
    title="Getting Started with React Hooks"
    excerpt="Master React Hooks with practical examples and common patterns that will make your components more efficient and easier to understand."
    author="Lisa Park"
    date="2025-01-08"
    image="/demo-blog/december-light.jpg"
    category="React"
    :tags="['React', 'Hooks', 'Frontend']"
    url="https://example.com/react-hooks"
    :isExternal="true"
    :titleLines="1"
    :excerptLines="3"
  />

  <VpvCardVertical
    title="Static Analysis Tools"
    excerpt="Essential tools for code quality and consistency in JavaScript projects."
    author="Code Quality Team"
    date="2025-01-07"
    category="Tools"
    :tags="['ESLint', 'Prettier', 'Static Analysis']"
    url="/demo-blog/static-analysis"
    :disableLinks="true"
  />

  <VpvCardVertical
    title="API Design Principles"
    excerpt="Learn the fundamental principles of designing RESTful APIs that are intuitive, scalable, and maintainable for long-term projects."
    author="Backend Team"
    date="2025-01-06"
    image="/demo-blog/january-light.jpg"
    image_dark="/demo-blog/january-dark.jpg"
    category="Backend"
    :tags="['API', 'REST', 'Design']"
    url="https://example.com/api-design"
    :isExternal="true"
  />

  <VpvCardVertical
    title="Testing Strategies"
    excerpt="Comprehensive guide to testing methodologies for modern web applications."
    author="QA Team"
    date="2025-01-05"
    category="Testing"
    :tags="['Testing', 'Quality Assurance', 'Automation']"
    url="/demo-blog/testing"
    :hideAuthor="true"
  />

  <VpvCardVertical
    title="Performance Monitoring"
    excerpt="Tools and techniques for monitoring and optimizing web application performance in production environments."
    author="DevOps Team"
    date="2025-01-04"
    image="/demo-blog/february-light.jpg"
    category="Performance"
    :tags="['Monitoring', 'Optimization', 'DevOps']"
    url="https://example.com/performance"
    :isExternal="true"
    :hideImage="true"
  />

  <VpvCardVertical
    title="Accessibility Guidelines"
    excerpt="Make your web applications accessible to everyone with these practical guidelines and implementation strategies."
    author="UX Team"
    date="2025-01-03"
    image="/demo-blog/march-light.jpg"
    image_dark="/demo-blog/march-dark.jpg"
    category="Accessibility"
    :tags="['A11y', 'Accessibility', 'Inclusive Design']"
    url="/demo-blog/accessibility"
    :hideTags="true"
  />
</VpvContainerVertical>

::: details View Code
```vue
<VpvContainerVertical
  headerTitle="Complete Resource Library"
  headerSubtitle="Everything you need to know about modern web development"
  headerDate="2025-01-15"
  headerDateFormat="long"
>
  <VpvCardVertical
    title="Getting Started with React Hooks"
    excerpt="Master React Hooks with practical examples and common patterns that will make your components more efficient and easier to understand."
    author="Lisa Park"
    date="2025-01-08"
    image="/demo-blog/december-light.jpg"
    category="React"
    :tags="['React', 'Hooks', 'Frontend']"
    url="https://example.com/react-hooks"
    :isExternal="true"
    :titleLines="1"
    :excerptLines="3"
  />

  <VpvCardVertical
    title="Static Analysis Tools"
    excerpt="Essential tools for code quality and consistency in JavaScript projects."
    author="Code Quality Team"
    date="2025-01-07"
    category="Tools"
    :tags="['ESLint', 'Prettier', 'Static Analysis']"
    url="/demo-blog/static-analysis"
    :disableLinks="true"
  />

  <VpvCardVertical
    title="API Design Principles"
    excerpt="Learn the fundamental principles of designing RESTful APIs that are intuitive, scalable, and maintainable for long-term projects."
    author="Backend Team"
    date="2025-01-06"
    image="/demo-blog/january-light.jpg"
    image_dark="/demo-blog/january-dark.jpg"
    category="Backend"
    :tags="['API', 'REST', 'Design']"
    url="https://example.com/api-design"
    :isExternal="true"
  />

  <VpvCardVertical
    title="Testing Strategies"
    excerpt="Comprehensive guide to testing methodologies for modern web applications."
    author="QA Team"
    date="2025-01-05"
    category="Testing"
    :tags="['Testing', 'Quality Assurance', 'Automation']"
    url="/demo-blog/testing"
    :hideAuthor="true"
  />

  <VpvCardVertical
    title="Performance Monitoring"
    excerpt="Tools and techniques for monitoring and optimizing web application performance in production environments."
    author="DevOps Team"
    date="2025-01-04"
    image="/demo-blog/february-light.jpg"
    category="Performance"
    :tags="['Monitoring', 'Optimization', 'DevOps']"
    url="https://example.com/performance"
    :isExternal="true"
    :hideImage="true"
  />

  <VpvCardVertical
    title="Accessibility Guidelines"
    excerpt="Make your web applications accessible to everyone with these practical guidelines and implementation strategies."
    author="UX Team"
    date="2025-01-03"
    image="/demo-blog/march-light.jpg"
    image_dark="/demo-blog/march-dark.jpg"
    category="Accessibility"
    :tags="['A11y', 'Accessibility', 'Inclusive Design']"
    url="/demo-blog/accessibility"
    :hideTags="true"
  />
</VpvContainerVertical>
```
:::