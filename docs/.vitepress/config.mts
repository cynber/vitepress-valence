import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VP-Valence",
  titleTemplate: ':title | VP-Valence',
  description: "Documentation for the VitePress-Valence component library",
  head: [
    ["link", { rel: "icon", href: "/icon/diam_dark-512.png" }],
    [
      "meta",
      { 
        property: "og:image", 
        content: "https://vitepress-valence.cynber.dev/og_image-dark.png" 
      },

    ],
  ],
  cleanUrls: true,
  vite: {
    ssr: {
      noExternal: ["@cynber/vitepress-valence"],
    },
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/cynber/" },
      { icon: "npm", link: "https://www.npmjs.com/~cynber" },
      { icon: "kofi", link: "https://ko-fi.com/cynber" },
    ],
    nav: [
      { text: "Fund Development", link: "https://github.com/sponsors/cynber" }
    ],
    footer: {
      message: 'If this project has helped you, would you consider funding future development by <a href="https://ko-fi.com/cynber">buying me a cookie</a>? Thank you! 🍪 ❤️ <br><br> Created and maintained by <a href="https://github.com/cynber">@cynber</a>. Find my other projects at <a href="https://cynber.dev">cynber.dev</a>.',
    },
    sidebar: {
      "/guide/": [
        {
          text: "VitePress Valence",
          items: [
            {
              text: "Installation & Setup",
              link: "/guide/install",
            },
          ],
        },
        {
          text: "Articles / Blog Components:",
          items: [
            {
              text: "Overview",
              link: "/guide/article",
            },
            {
              text: "Demo",
              link: "/blog-demo",
            },
            {
              text: "Setup",
              link: "/guide/article/setup",
            },
            {
              text: "Creating a New Post",
              link: "/guide/article/create-post",
            },
            {
              text: "Components",
              items: [
                {
                  text: "Article Header",
                  link: "/guide/article/component-VpvArticleHeader",
                },
                {
                  text: "Article List",
                  link: "/guide/article/component-VpvArticleList",
                },
              ],
            },
          ],
        },
        {
          text: "Table Components (JSON)",
          items: [
            {
              text: "Overview",
              link: "/guide/table-json",
            },
            {
              text: "Usage",
              link: "/guide/table-json/usage",
            },
            {
              text: "Examples",
              items: [
                {
                  text: "Cell Type Examples",
                  link: "/guide/table-json/example-cell-types",
                },
                {
                  text: "Sorting/Filtering Examples",
                  link: "/guide/table-json/example-data-sort-filter",
                },
                {
                  text: "Data Source Examples",
                  link: "/guide/table-json/example-data-source",
                },
              ],
            },
          ],
        },
        {
          text: "Image & Gallery Components",
          items: [
            {
              text: "Overview",
              link: "/guide/image-gallery"
            },
                {
                  text: "VpvImage Usage",
                  link: "/guide/image-gallery/image",
                },
                {
                  text: "VpvImageGallery Usage",
                  link: "/guide/image-gallery/gallery",
            },
            {
              text: "Examples",
              items: [
                {
                  text: "Gallery Simple Grid Layout",
                  link: "/guide/image-gallery/example-gallery-simple",
                },
                {
                  text: "Gallery Masonry Layout",
                  link: "/guide/image-gallery/example-gallery-masonry",
                },
                {
                  text: "Gallery Full Size Layout",
                  link: "/guide/image-gallery/example-gallery-full",
                },
                {
                  text: "Gallery Filtering",
                  link: "/guide/image-gallery/example-gallery-filtering",
                }
              ],
            },
          ],
        },
        {
          text: "Embed Components",
          items: [
            {
              text: "Lemmy Posts",
              link: "/guide/embed/lemmy",
            },
            {
              text: "Mailchimp Subscribe Form",
              link: "/guide/embed/mailchimp",
            },
          ],
        },
        {
          text: "Card & Container Components",
          items: [
            {
              text: "Usage",
              link: "/guide/cards/usage",
            },
            {
              text: "Examples",
              items: [
                {
                  text: "Examples - Horizontal",
                  link: "/guide/cards/examples-horizontal",
                },
                {
                  text: "Examples - Vertical",
                  link: "/guide/cards/examples-vertical",
                },
              ],
            },
          ],
        },
      ],
    },
  },
});
