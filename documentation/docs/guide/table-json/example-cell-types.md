---
layout: doc
prev:
  text: 'VpvTableJSON Usage'
  link: './usage.md'
next:
    text: "Sorting/Filtering Examples"
    link: "./example-data-sort-filter.md"

outline: [2, 4]
---

# VpvTableJSON: Cell Types

## 1. Basic Text

<VpvTableJSON
  title="Product Catalog"
  :jsonDataProp="[
    { id: 'P001', name: 'Wireless Headphones', category: 'Electronics' },
    { id: 'P002', name: 'Coffee Maker', category: 'Appliances' },
    { id: 'P003', name: 'Running Shoes', category: 'Sports' }
  ]"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'text' },
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' }
  ]"
  defaultSortField="id"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Product Catalog"
  :jsonDataProp="[
    { id: 'P001', name: 'Wireless Headphones', category: 'Electronics' },
    { id: 'P002', name: 'Coffee Maker', category: 'Appliances' },
    { id: 'P003', name: 'Running Shoes', category: 'Sports' }
  ]"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'text' },
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' }
  ]"
  defaultSortField="id"
/>
```
:::

## 2. Code Cell

<VpvTableJSON
  title="CLI Commands"
  :jsonDataProp="[
    { explanation: 'Generate a password', code: 'openssl rand -base64 32' },
    { explanation: 'Use scp to copy a file', code: 'scp user@host:/path/to/file.txt .' },
    { explanation: 'Use ssh to connect to a server', code: 'ssh user@host' }
  ]"
  :columns="[
    { key: 'explanation', title: 'Explanation', format: 'text' },
    { key: 'code', title: 'Command', format: 'code' }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  title="CLI Commands"
  :jsonDataProp="[
    { explanation: 'Generate a password', code: 'openssl rand -base64 32' },
    { explanation: 'Use scp to copy a file', code: 'scp user@host:/path/to/file.txt .' },
    { explanation: 'Use ssh to connect to a server', code: 'ssh user@host' }
  ]"
  :columns="[
    { key: 'explanation', title: 'Explanation', format: 'text' },
    { key: 'code', title: 'Command', format: 'code' }
  ]"
/>
```
:::

## 3. Numbers

<VpvTableJSON
  title="Financial Data"
  :jsonDataProp="[
    { item: 'Revenue', amount: 1234567.89, percentage: 15.75 },
    { item: 'Expenses', amount: 987654.32, percentage: 8.25 },
    { item: 'Profit', amount: 246913.57, percentage: 22.33 }
  ]"
  :columns="[
    { key: 'item', title: 'Category', format: 'text' },
    { 
      key: 'amount', 
      title: 'Amount ($)', 
      format: 'number',
      options: { decimals: 2, monospace: true }
    },
    { 
      key: 'percentage', 
      title: 'Growth (%)', 
      format: 'number',
      options: { 
        decimals: 1,
        formatter: (value) => `${value}%`
      }
    }
  ]"
  defaultSortField="amount"
  defaultSortDirection="descending"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Financial Data"
  :jsonDataProp="[
    { item: 'Revenue', amount: 1234567.89, percentage: 15.75 },
    { item: 'Expenses', amount: 987654.32, percentage: 8.25 },
    { item: 'Profit', amount: 246913.57, percentage: 22.33 }
  ]"
  :columns="[
    { key: 'item', title: 'Category', format: 'text' },
    { 
      key: 'amount', 
      title: 'Amount ($)', 
      format: 'number',
      options: { decimals: 2, monospace: true }
    },
    { 
      key: 'percentage', 
      title: 'Growth (%)', 
      format: 'number',
      options: { 
        decimals: 1,
        formatter: (value) => `${value}%`
      }
    }
  ]"
  defaultSortField="amount"
  defaultSortDirection="descending"
/>
```
:::


## 4. Boolean (true/false)

<VpvTableJSON
  title="Basic Usage"
  :jsonDataProp="[
    { feature: 'SSL Encryption', basic: true, premium: true },
    { feature: '24/7 Support', basic: false, premium: true },
    { feature: 'Advanced Analytics', basic: false, premium: false }
  ]"
  :columns="[
    { key: 'feature', title: 'Feature', format: 'text' },
    { 
      key: 'basic', 
      title: 'Basic Plan', 
      format: 'boolean',
      options: {
        displayAs: 'icon'
      }
    },
    { 
      key: 'premium', 
      title: 'Premium Plan', 
      format: 'boolean',
      options: {
        displayAs: 'text'
      }
    }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Basic Usage"
  :jsonDataProp="[
    { feature: 'SSL Encryption', basic: true, premium: true },
    { feature: '24/7 Support', basic: false, premium: true },
    { feature: 'Advanced Analytics', basic: false, premium: false }
  ]"
  :columns="[
    { key: 'feature', title: 'Feature', format: 'text' },
    { 
      key: 'basic', 
      title: 'Basic Plan', 
      format: 'boolean',
      options: {
        displayAs: 'icon'
      }
    },
    { 
      key: 'premium', 
      title: 'Premium Plan', 
      format: 'boolean',
      options: {
        displayAs: 'text'
      }
    }
  ]"
/>
```
:::

<VpvTableJSON
  title="Fully Custom Icon Usage (with hover text)"
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

::: details View Code
```vue
<VpvTableJSON
  title="Fully Custom Icon Usage (with hover text)"
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
```
:::



<VpvTableJSON
  title="Fully Custom Text Usage"
  :jsonDataProp="[
    { requirement: 'Database Design', completed: true, approved: true },
    { requirement: 'API Development', completed: false, approved: true },
    { requirement: 'UI Implementation', completed: true, approved: false }
  ]"
  :columns="[
    { key: 'requirement', title: 'Requirement', format: 'text' },
    { 
      key: 'completed', 
      title: 'Progress', 
      format: 'boolean',
      options: {
        displayAs: 'text',
        trueText: 'Finished',
        falseText: 'In Progress',
        trueColor: '#1976D2',
        falseColor: '#FFC107'
      }
    },
    { 
      key: 'approved', 
      title: 'Review Status', 
      format: 'boolean',
      options: {
        displayAs: 'text',
        trueText: 'Approved ✓',
        falseText: 'Pending Review',
        trueColor: '#388E3C',
        falseColor: '#FF6F00'
      }
    }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Fully Custom Text Usage"
  :jsonDataProp="[
    { requirement: 'Database Design', completed: true, approved: true },
    { requirement: 'API Development', completed: false, approved: true },
    { requirement: 'UI Implementation', completed: true, approved: false }
  ]"
  :columns="[
    { key: 'requirement', title: 'Requirement', format: 'text' },
    { 
      key: 'completed', 
      title: 'Progress', 
      format: 'boolean',
      options: {
        displayAs: 'text',
        trueText: 'Finished',
        falseText: 'In Progress',
        trueColor: '#1976D2',
        falseColor: '#FFC107'
      }
    },
    { 
      key: 'approved', 
      title: 'Review Status', 
      format: 'boolean',
      options: {
        displayAs: 'text',
        trueText: 'Approved ✓',
        falseText: 'Pending Review',
        trueColor: '#388E3C',
        falseColor: '#FF6F00'
      }
    }
  ]"
/>
```
:::

## 5. Tags

Note: The `brand` color will depend on your site's theme color.

<VpvTableJSON
  title="Built-in Color Schemes"
  :jsonDataProp="[
    { name: 'Color Demo', schemes: ['brand', 'simple', 'gray', 'indigo', 'purple', 'green', 'yellow', 'red'] },
  ]"
  :columns="[
    { key: 'name', title: 'Demo', format: 'text' },
    { 
      key: 'schemes', 
      title: 'Color Schemes', 
      format: 'tags',
      options: {
        tagColors: {
          'brand': 'brand',
          'simple': 'simple',
          'gray': 'gray',
          'indigo': 'indigo',
          'purple': 'purple',
          'green': 'green',
          'yellow': 'yellow',
          'red': 'red'
        }
      }
    }
  ]"
/>

::: details View Code
```vue

<VpvTableJSON
  title="Built-in Color Schemes"
  :jsonDataProp="[
    { name: 'Color Demo', schemes: ['brand', 'simple', 'gray', 'indigo', 'purple', 'green', 'yellow', 'red'] },
  ]"
  :columns="[
    { key: 'name', title: 'Demo', format: 'text' },
    { 
      key: 'schemes', 
      title: 'Color Schemes', 
      format: 'tags',
      options: {
        tagColors: {
          'brand': 'brand',
          'simple': 'simple',
          'gray': 'gray',
          'indigo': 'indigo',
          'purple': 'purple',
          'green': 'green',
          'yellow': 'yellow',
          'red': 'red'
        }
      }
    }
  ]"
/>
```
:::

<VpvTableJSON
  title="Custom Colors Demo"
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

::: details View Code
```vue
<VpvTableJSON
  title="Custom Colors Demo"
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
```
:::


## 6. Links

<VpvTableJSON
  title="Navigation Links - Default Styling"
  :jsonDataProp="[
    { 
      type: 'Internal Page', 
      iconLink: '/', 
      textLink: '/' 
    },
    { 
      type: 'External Site', 
      iconLink: 'https://example.com', 
      textLink: 'https://example.com' 
    }
  ]"
  :columns="[
    { key: 'type', title: 'Link Type', format: 'text' },
    { 
      key: 'iconLink', 
      title: 'Icon Display', 
      format: 'link'
    },
    { 
      key: 'textLink', 
      title: 'Text Display', 
      format: 'link',
      options: {
        displayInternalAs: 'text',
        displayExternalAs: 'text'
      }
    }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Navigation Links - Default Styling"
  :jsonDataProp="[
    { 
      type: 'Internal Page', 
      iconLink: '/', 
      textLink: '/' 
    },
    { 
      type: 'External Site', 
      iconLink: 'https://example.com', 
      textLink: 'https://example.com' 
    }
  ]"
  :columns="[
    { key: 'type', title: 'Link Type', format: 'text' },
    { 
      key: 'iconLink', 
      title: 'Icon Display', 
      format: 'link'
    },
    { 
      key: 'textLink', 
      title: 'Text Display', 
      format: 'link',
      options: {
        displayInternalAs: 'text',
        displayExternalAs: 'text'
      }
    }
  ]"
/>
```
:::

<VpvTableJSON
  title="Navigation Links - Custom Styling"
  :jsonDataProp="[
    { 
      type: 'Internal Page', 
      iconLink: '/', 
      textLink: '/' 
    },
    { 
      type: 'External Site', 
      iconLink: 'https://example.com', 
      textLink: 'https://example.com' 
    }
  ]"
  :columns="[
    { key: 'type', title: 'Link Type', format: 'text' },
    { 
      key: 'iconLink', 
      title: 'Custom Icons', 
      format: 'link',
      options: {
        displayInternalAs: 'icon',
        displayExternalAs: 'icon',
        internalIcon: 'mdi:home-circle',
        externalIcon: 'iconamoon:link-external-duotone',
        internalHoverText: 'Internal Link',
        externalHoverText: 'External Link',
        width: '2em',
        height: '2em',
        iconColorMap: {
          internal: '#4CAF50',
          external: '#FF5722'
        }
      }
    },
    { 
      key: 'textLink', 
      title: 'Custom Text', 
      format: 'link',
      options: {
        displayInternalAs: 'text',
        displayExternalAs: 'text',
        internalText: 'Go Home',
        externalText: 'Visit External',
        iconColorMap: {
          internal: '#45990dff',
          external: '#b05227ff'
        }
      }
    }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Navigation Links - Custom Styling"
  :jsonDataProp="[
    { 
      type: 'Internal Page', 
      iconLink: '/', 
      textLink: '/' 
    },
    { 
      type: 'External Site', 
      iconLink: 'https://example.com', 
      textLink: 'https://example.com' 
    }
  ]"
  :columns="[
    { key: 'type', title: 'Link Type', format: 'text' },
    { 
      key: 'iconLink', 
      title: 'Custom Icons', 
      format: 'link',
      options: {
        displayInternalAs: 'icon',
        displayExternalAs: 'icon',
        internalIcon: 'mdi:home-circle',
        externalIcon: 'iconamoon:link-external-duotone',
        internalHoverText: 'Internal Link',
        externalHoverText: 'External Link',
        width: '2em',
        height: '2em',
        iconColorMap: {
          internal: '#4CAF50',
          external: '#FF5722'
        }
      }
    },
    { 
      key: 'textLink', 
      title: 'Custom Text', 
      format: 'link',
      options: {
        displayInternalAs: 'text',
        displayExternalAs: 'text',
        internalText: 'Go Home',
        externalText: 'Visit External',
        iconColorMap: {
          internal: '#45990dff',
          external: '#b05227ff'
        }
      }
    }
  ]"
/>
```
:::


## 7. Icons

<VpvTableJSON
  title="System Status"
  :jsonDataProp="[
    { service: 'Database', status: 'online', priority: 'low' },
    { service: 'API Gateway', status: 'maintenance', priority: 'medium' },
    { service: 'Cache Server', status: 'offline', priority: 'high' }
  ]"
  :columns="[
    { key: 'service', title: 'Service', format: 'text' },
    { 
      key: 'status', 
      title: 'Status', 
      format: 'icon',
      options: {
        iconMap: {
          'online': 'mdi:check-circle',
          'offline': 'mdi:close-circle',
          'maintenance': 'mdi:wrench'
        },
        iconColorMap: {
          'online': '#4CAF50',
          'offline': '#F44336',
          'maintenance': '#FF9800'
        },
        hoverTextMap: {
          'online': 'Service is running normally',
          'offline': 'Service is currently down',
          'maintenance': 'Service is under maintenance'
        },
        width: '2em',
        height: '2em'
      }
    },
    { 
      key: 'priority', 
      title: 'Priority', 
      format: 'icon',
      options: {
        iconMap: {
          'high': 'mdi:alert',
          'medium': 'mdi:alert-outline',
          'low': 'mdi:information'
        },
        hoverTextMap: {
          'high': 'High priority - immediate attention required',
          'medium': 'Medium priority - should be addressed soon',
          'low': 'Low priority - can be addressed when convenient'
        },
        defaultIcon: 'mdi:help',
        defaultIconColor: '#757575',
        defaultHoverText: 'Unknown priority level'
      }
    }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  title="System Status"
  :jsonDataProp="[
    { service: 'Database', status: 'online', priority: 'low' },
    { service: 'API Gateway', status: 'maintenance', priority: 'medium' },
    { service: 'Cache Server', status: 'offline', priority: 'high' }
  ]"
  :columns="[
    { key: 'service', title: 'Service', format: 'text' },
    { 
      key: 'status', 
      title: 'Status', 
      format: 'icon',
      options: {
        iconMap: {
          'online': 'mdi:check-circle',
          'offline': 'mdi:close-circle',
          'maintenance': 'mdi:wrench'
        },
        iconColorMap: {
          'online': '#4CAF50',
          'offline': '#F44336',
          'maintenance': '#FF9800'
        },
        hoverTextMap: {
          'online': 'Service is running normally',
          'offline': 'Service is currently down',
          'maintenance': 'Service is under maintenance'
        },
        width: '2em',
        height: '2em'
      }
    },
    { 
      key: 'priority', 
      title: 'Priority', 
      format: 'icon',
      options: {
        iconMap: {
          'high': 'mdi:alert',
          'medium': 'mdi:alert-outline',
          'low': 'mdi:information'
        },
        hoverTextMap: {
          'high': 'High priority - immediate attention required',
          'medium': 'Medium priority - should be addressed soon',
          'low': 'Low priority - can be addressed when convenient'
        },
        defaultIcon: 'mdi:help',
        defaultIconColor: '#757575',
        defaultHoverText: 'Unknown priority level'
      }
    }
  ]"
/>
```
:::

## 8. Images

<VpvTableJSON
  title="Characters"
  :jsonDataProp="[
    { 
      name: 'Sherlock Holmes', 
      avatar: '/authors/sherlock.png', 
      role: 'Consulting Detective',
      location: 'London'
    },
    { 
      name: 'Maya',
      avatar: '/authors/maya.jpg',
      role: 'Demo Blog Author',
      location: 'Vancouver, Canada'
    },
    { 
      name: 'Alex',
      avatar: '/authors/alex.jpg',
      role: 'Demo Blog Author',
      location: 'Toronto, Canada'
    }
  ]"
  :columns="[
    { 
      key: 'avatar', 
      title: 'Portrait', 
      format: 'image',
      options: {
        width: '60px',
        height: '60px',
        altText: 'Character Portrait'
      }
    },
    { key: 'name', title: 'Name', format: 'text' },
    { key: 'role', title: 'Role', format: 'text' },
    { key: 'location', title: 'Location', format: 'text' }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Characters"
  :jsonDataProp="[
    { 
      name: 'Sherlock Holmes', 
      avatar: '/authors/sherlock.png', 
      role: 'Consulting Detective',
      location: 'London'
    },
    { 
      name: 'Maya',
      avatar: '/authors/maya.jpg',
      role: 'Demo Blog Author',
      location: 'Vancouver, Canada'
    },
    { 
      name: 'Alex',
      avatar: '/authors/alex.jpg',
      role: 'Demo Blog Author',
      location: 'Toronto, Canada'
    }
  ]"
  :columns="[
    { 
      key: 'avatar', 
      title: 'Portrait', 
      format: 'image',
      options: {
        width: '60px',
        height: '60px',
        altText: 'Character Portrait'
      }
    },
    { key: 'name', title: 'Name', format: 'text' },
    { key: 'role', title: 'Role', format: 'text' },
    { key: 'location', title: 'Location', format: 'text' }
  ]"
/>
```
:::

<VpvTableJSON
  title="Photo Print Catalog"
  :jsonDataProp="[
    { 
        id: 1, 
        photo: 'https://picsum.photos/400/300',
        price: '$100'
    },
    { 
        id: 2, 
        photo: 'https://picsum.photos/500/300',
        price: '$200'
    }
    ]"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'number' },
    { key: 'photo', title: 'Photo', format: 'image',
      options: {
        width: '300px',
        height: '300px',
        altText: 'Product Photo'
      }
    },
    { key: 'price', title: 'Price', format: 'text' }
  ]"
  defaultSortField="id"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Photo Print Catalog"
  :jsonDataProp="[
    { 
        id: 1, 
        photo: 'https://picsum.photos/400/300',
        price: '$100'
    },
    { 
        id: 2, 
        photo: 'https://picsum.photos/500/300',
        price: '$200'
    }
    ]"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'number' },
    { key: 'photo', title: 'Photo', format: 'image',
      options: {
        width: '300px',
        height: '300px',
        altText: 'Product Photo'
      }
    },
    { key: 'price', title: 'Price', format: 'text' }
  ]"
  defaultSortField="id"
/>
```
:::
