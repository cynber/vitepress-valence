---
prev: false
next:
  text: Articles Overview
  link: /guide/article/
---

# Vitepress Valence

## Installation

1. Download the package from NPM:

::: code-group

```bash [npm]
npm i @cynber/vitepress-valence
```

```bash [pnpm]
pnpm add @cynber/vitepress-valence
```

```bash [yarn]
yarn add @cynber/vitepress-valence
```
:::

2. Add the styles to your project's `index.ts` file:

::: code-group
``` ts [docs/.vitepress/theme/index.ts]
// ...
import './style.css'
import "@cynber/vitepress-valence/vitepress-valence.css"; // [!code ++]
// ...
```
:::

3. Modify your Vite config to not externalize the package:

::: code-group
``` ts [docs/.vitepress/config.ts]
export default defineConfig({
  // ...
  vite: { // [!code ++]
    ssr: { noExternal: ['@cynber/vitepress-valence']} // [!code ++]
  }, // [!code ++]
  // ...
})
```
:::

## Usage

You can now import and use the components in your project. Please see the following pages for detailed information on how to use each component:

- [Article Components](/guide/article/): For blog posts, announcements, and similar content.
- [Table Components](/guide/table-json/): A highly customizable component for dynamically displaying data in a table format, with options for icons, images, links, tags, and more/projects
- [Image & Gallery Components](/guide/image-gallery/): A component for displaying images and galleries in your documentation
- Components for embedding content:
  - [Embed from Lemmy](/guide/embed/lemmy): Embed threadiverse posts from Lemmy instances.
  - [Embed from Mailchimp](/guide/embed/mailchimp): Embed a subscription form from Mailchimp.
- Miscellaneous:
  - [Card & Container Components](/guide/cards/usage): The cards from the article setup can also be used independently wherever you want.
