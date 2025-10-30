---
# prev:
#   text: 'Placeholder'
#   link: '/'
next:
  text: 'Article Component Setup'
  link: './setup'
---

# Easily add blog, announcements, and similar sections to your VitePress site:

<br>

<VpvContainerHorizontal>
    <VpvCardHorizontal
        title="Check out the Demo Blog"
        excerpt="With a simple setup and two custom components, you can create a beautiful and modern blog within VitePress!"
        url="/blog-demo"
        image="/demo-blog/june-dark.jpg"
    />
</VpvContainerHorizontal>

Regardless of what type of section you want to add, we will be using the term 'article' to refer to the content you want to display.

Adding new posts will be as simple as creating a new markdown file in your blog directory.

## How it works

We will create a data loader file in your project. If you are using the usual setup, you can simply paste in template code. 

Afterwards you can add new authors by updating the `authors.js` file, and create new  posts by creating files in the `articles` directory.

::: code-group
``` js [Project Structure]
.
├─ docs
│  ├─ articles                   // <-- Create posts by adding files here
│  │  └─ new_post.md
│  └─ .vitepress
│     ├─ theme
│     │  ├─ data
│     │  │  ├─ authors.js        // <-- Update author information
│     │  │  └─ articles.data.js  // <-- Data loader
│     │  └─ ...
│     └─ ...
└─ ...
```
:::


See the next page for detailed setup instructions. You can also jump to:
- [Creating a New Post](./create-post.md)
- Using the [Article Header](./component-VpvArticleHeader.md) component
- Using the [Article List](./component-VpvArticleList.md) component