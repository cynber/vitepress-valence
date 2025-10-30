---
layout: doc

next:
    text: "VpvTableJSON Usage"
    link: "./usage.md"
---

# Display engaging tables from JSON data

As long as you can format your data as a JSON array, you can use this component to display it in dynamic and engaging tables. The cell types include `text`, `code`, `number`, `boolean` (example 1 below), `tags` (example 2 below), `links`, `icons`, and `images`.

This component is very flexible and it supports various cell formats, filtering, and customization options, making it perfect for displaying structured data in your documentation. You can see the full list of options on this page: [examples](./example-cell-types.md).

<VpvTableJSON
  title="Example 1: Custom Icons with Hover Text"
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
  title="Example 2: Tags with custom color schemes"
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

## Setup

::: warning Do initial installation first

Before you follow any of the guides below, you should [import and install this project](../install.md) in your VitePress site.
:::

Import the component in `docs/.vitepress/theme/index.ts` (or equivalent)

::: code-group
```ts [index.ts]
import { JSONTable } from '@cynber/vitepress-valence' // [!code ++]

export default {
    enhanceApp({ app, router, siteData }) {
    app.component('JSONTable', JSONTable) // [!code ++]
    }
} satisfies Theme
```
:::