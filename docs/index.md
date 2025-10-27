---
prev: false
layout: home

hero:
  text: "VitePress Valence"
  tagline: A comprehensive suite of components that add additional functionality, style, and customization to your VitePress projects.
  actions:
    - theme: brand
      text: Get Started with VitePress Valence
      link: /guide/install
    - theme: alt
      text: ❤️ Donate
      link: https://ko-fi.com/cynber
    - theme: alt
      text: GitHub
      link: https://github.com/cynber/vitepress-valence
    - theme: alt
      text: NPM
      link: https://npmjs.com/package/@cynber/vitepress-valence

  image:
    light: /vitepress-valence/icon-light.png
    dark: /vitepress-valence/icon-dark.png
    alt: Logo

---

See below for information and demonstrations of the components in this package.

<br><br><br>

# Article / Blog Components

You can easily add blog, announcements, and similar sections to your VitePress site. After you add the data loader script to your site, adding new posts will be as simple as adding a new markdown file to a folder of your choice. This package includes beautiful and cohesive components that will make your blog look and feel great.

Below you can see the component in action, displaying 3 of the articles from the [Demo Blog](/blog-demo):

<VpvArticleList
    format="vertical"
    sortOrder="ascending"
    filterCategories="Spring"
    maxCards="3"
    articlesDataKey="demoBlogData"
  />

[Get started with the Article / Blog Components -->](/guide/article/)

<br><br><br>

# Display engaging tables from JSON data

This component is very flexible and it supports various cell formats, filtering, and customization options, making it perfect for displaying structured data in your documentation. You can see the full list of options on this page: [examples](/guide/table-json/example-cell-types).

<VpvTableJSON
  :jsonDataProp="[
    { service: 'Authentication API', operational: true, monitored: true },
    { service: 'Payment Gateway', operational: false, monitored: true },
    { service: 'Email Service', operational: true, monitored: false }
  ]"
  :columns="[
    { key: 'service', title: 'Service', format: 'text' },
    { 
      key: 'operational', 
      title: 'Status', 
      format: 'boolean',
      options: {
        displayAs: 'icon',
        trueIcon: 'mdi:server-network',
        falseIcon: 'mdi:server-network-off',
        trueColor: '#00C851',
        falseColor: '#FF4444',
        trueHoverText: 'Online',
        falseHoverText: 'Offline',
        iconWidth: '2em',
        iconHeight: '2em'
      }
    },
    { 
      key: 'monitored', 
      title: 'Monitoring', 
      format: 'boolean',
      options: {
        displayAs: 'icon',
        trueIcon: 'mdi:eye',
        falseIcon: 'mdi:eye-off',
        trueColor: '#2196F3',
        falseColor: '#9E9E9E',
        trueHoverText: 'Monitoring',
        falseHoverText: 'Not Monitoring',
        iconWidth: '1.8em',
        iconHeight: '1.8em'
      }
    }
  ]"
/>

<VpvTableJSON
  :jsonDataProp="[
    { name: 'Alice Johnson', skills: ['JavaScript', 'Vue.js', 'Node.js'] },
    { name: 'Bob Smith', skills: ['Python', 'Django', 'PostgreSQL'] },
    { name: 'Carol Chen', skills: ['React', 'TypeScript', 'GraphQL', 'AWS'] }
  ]"
  :columns="[
    { key: 'name', title: 'Developer', format: 'text' },
    { 
      key: 'skills', 
      title: 'Technologies', 
      format: 'tags',
      options: {
        tagColors: {
          'Vue.js': '#4FC08D',
          'React': '#4FC08D',
          'JavaScript': '#3178C6',
          'TypeScript': '#3178C6',
          'Python': '#3776AB',
          'Node.js': '#8e5cd9',
          'Django': '#8e5cd9',
          'PostgreSQL': '#f9b44e',
          'AWS': '#f9b44e',
          'GraphQL': '#f9b44e'
        }
      }
    }
  ]"
/>

[Get started with the Table Components -->](/guide/table-json/)

<br><br><br>

# Image & Gallery Components

This package includes two components that improve the display of images and galleries in your documentation. `VpvImage` provides advanced image handling and is designed to replace standard markdown images when you need more control and features. `VpvImageGallery` creates interactive image galleries with lightbox functionality using PhotoSwipe. You can see an example of the gallery below:

<VpvImageGallery
    headerTitle="Demo of VpvImageGallery"
    headerSubtitle="This is a demo of the VpvImageGallery component"
    headerDate="2025-10-01"
    :folders="['/gallery/nature', '/gallery/urban']"
/>

[Get started with the Image & Gallery Components -->](/guide/image-gallery/)

<br><br><br>

# Embed Components

This package includes two components that allow you to embed content from other sites into your documentation. More components can be added by requesting them on the [GitHub Issues](https://github.com/cynber/vitepress-valence/issues) page.

Here is non-functional example of the Mailchimp component:

<VpvEmbedMailchimp
  title="Newsletter"
  description="Want to stay up to date with new blog posts? Sign up to my newsletter below to receive emails when I share something new!"
  :actionUrl="'https://gmail.us10.list-manage.com/subscribe/post?u=d812cf8031f0347333497b1eb&amp;id=5afacc8f7b&amp;f_id=0027dae5f0'"
  :hiddenFieldName="'b_8f82b157356cafd78afb9a994_adca4c029c'"
  :show-referral="true"
  :referralLink="'http://eepurl.com/i6OAK-'"
/>

[Get started with the Embed Components -->](/guide/embed/mailchimp)

<br><br><br>

# Card & Container Components

The cards and containers used throughout this package can also be used independently. This will let you create cards linking to custom content, in whatever order you prefer!

[Get started with the Card & Container Components -->](/guide/cards/usage)

<br><br><br>

## Other projects using VitePress Valence:

If you would like to have your site listed here, please let me know! You can use [this form to submit your site](https://forms.gle/XwV1BbD7NHcUE5MNA).

<VpvContainerVertical>
    <VpvCardVertical
      title="guides.techcareernorth.ca"
      excerpt="A collection of guides and resources created by Tech Career North."
      image="/other-sites/TechCareerNorth.png"
      url="https://guides.techcareernorth.ca/"
      :hideCategory="true"
      :hideAuthor="true"
      isExternal="true"
    />
    <VpvCardVertical
      title="fedecan.ca"
      excerpt="Discover a new way to connect online. We can help you join a growing network of federated social media that prioritizes community over profit"
      image="/other-sites/Fedecan.png"
      url="https://fedecan.ca/"
      :hideCategory="true"
      :hideAuthor="true"
      isExternal="true"
    />
    <VpvCardVertical
      title="narratives.blog"
      excerpt="What do the narratives in the media we consume really imply?  Follow along for some unsolicited takes on the matter."
      image="/other-sites/Narratives-blog.png"
      url="https://narratives.blog/"
      :hideCategory="true"
      :hideAuthor="true"
      isExternal="true"
    />
  </VpvContainerVertical>
