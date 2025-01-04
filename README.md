# vitepress-components

Collection of reusable Vue components tailored for use in VitePress projects.

This is a work in progress, and a learning experience for me. I'm open to feedback and suggestions. A proper VitePress site with documentation, usage information, and examples is coming soon.

## Usage

After installing the package, you can import the components you need in your VitePress project.

### JSONTable

In `docs/.vitepress/theme/index.ts`:

```ts
import { JSONTable } from '@cynber/vitepress-components';
// ...

export default {
  // ...
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('JSONTable', JSONTable);
// ...
```

### BlogPostHeader

Create `docs/.vitepress/theme/data/authors.js`:

```js
const authors = {
    john_s: {
        name: 'John Smith',
        description: 'Author',
        avatar: '/authors/john_s.jpg',
        url: 'https://example.com/external-URL-of-john-smith',
    }
};

export default authors;
```

In `docs/.vitepress/theme/index.ts`:

```ts
import authors from './data/authors.js';
import { BlogPostHeader } from '@cynber/vitepress-components';
// ...
export default {
  // ...
  enhanceApp({ app, router, siteData }) {
    // ...
    app.provide('authors', authors);
    app.component('BlogPostHeader', BlogPostHeader);
// ...
```