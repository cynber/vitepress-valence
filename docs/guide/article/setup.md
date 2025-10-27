---
prev:
  text: 'Articles Overview'
  link: '/guide/article/'
next:
  text: 'Create a new post'
  link: './create-post'

outline: [2, 4]
---

# Article Component Setup

::: warning Do initial installation first

You need to [import and install this project](../install.md) to your VitePress site, if you haven't done so already.
:::

You are free to create your author file and data loader wherever you want. However, you will need to update the paths accordingly.

## **Author Information**
1. Create the `authors.js` file (`docs/.vitepress/theme/data/authors.js`)

::: code-group
```js [docs/.vitepress/theme/data/authors.js]
const authors = {};
export default authors;
```
:::

2. You can add authors by updating the file as follows:

::: code-group
```js [authors.js]
const authors = {
    sherlock: {  // [!code ++]
        name: 'Sherlock Holmes',  // [!code ++]
        avatar: '/authors/sherlock.jpg',  // Optional  // [!code ++]
        description: 'Detective',         // Optional  // [!code ++]
        url: 'https://example.com/external-URL-of-author' // Optional  // [!code ++]
    }  // [!code ++]
};

export default authors;
```
:::

3. Import this data in your site's `index.ts` file:

::: code-group
```ts [docs/.vitepress/theme/index.ts]
import authors from './data/authors.js'  // [!code ++]
// ...
export default {
    // ...
    enhanceApp({ app, router, siteData }) {
        // ...
        app.provide('authors', authors)  // [!code ++]
    }
    } satisfies Theme
```
:::

## **Data Loader Setup**

1. Create a new directory for your articles (`docs/articles`).
2. Create the data loader file `articles.data.js` (`docs/.vitepress/theme/data/articles.data.js`). If you didn't use `docs/articles` as the directory for your articles, you will need to adjust the `blog/**/*.md` pattern accordingly:

::: code-group
```js [docs/.vitepress/theme/data/articles.data.js]
import { createContentLoader } from 'vitepress';

const data = createContentLoader('articles/**/*.md', {
    transform(rawData) {
        return rawData
            .sort((a, b) => {
                const dateA = new Date(a.frontmatter.date);
                const dateB = new Date(b.frontmatter.date);
                return dateB.getTime() - dateA.getTime();
            });
    }
});

export default data;
```
:::

3. Import the data loader in your site's `index.ts` file:

::: code-group
```ts [docs/.vitepress/theme/index.ts]
import { data as postsData } from './data/posts.data.js';  // [!code ++]
// ...
export default {
    // ...
    enhanceApp({ app, router, siteData }) {
        // ...
        app.provide('postsData', postsData)  // [!code ++]
    }
    } satisfies Theme
```
:::

## Customizations

<br>

::: details Optional: Override the default export keys

---

**Warning:** This section will not be necessary for most users.

---

While this package has extensive support for filtering posts, you may choose to have completely separate authors and/or post data sections.

- If you have multiple blog/announcement sections, you can specify the data for each section separately instead of remembering what to filter out.
- This can also be helpful if your site is already using the `authors` or `postsData` keys for other purposes.

**Steps:**

1. Create any additional data and authors files as needed. For example:
    - `docs/.vitepress/theme/data/demo-blog.data.js`
    - `docs/.vitepress/theme/data/demo-authors.js`
2. When creating a new authors data file, you will need to update object's name. For example:
```js
const demoAuthors = { // [!code ++]
    sherlock: {
        name: 'Sherlock Holmes',
        avatar: '/authors/sherlock.jpg',
        description: 'Detective', // Optional
        url: 'https://example.com/external-URL-of-author' // Optional
    }
};

export default demoAuthors; // [!code ++]
```
3. In your `index.ts` file, import the additional data and/or authors files:

::: code-group
```ts [index.ts]
import authors from './data/authors.js'
import { data as postsData } from './data/posts.data.js';
import { data as demoBlogData } from './data/demo-blog.data.js';  // [!code ++]
import demoAuthors from './data/demo-authors.js';  // [!code ++]
// ...
export default {
    // ...
    enhanceApp({ app, router, siteData }) {
        // ...
        app.provide('authors', authors)
        app.provide('postsData', postsData)
        app.provide('demoAuthors', demoAuthors)  // [!code ++]
        app.provide('demoBlogData', demoBlogData)  // [!code ++]
    }
}
```

4. You will need to use the `postsDataKey` and/or `authorsDataKey` props in the components that use the data. See the documentation for each component for more information.
:::