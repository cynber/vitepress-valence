---
layout: doc
prev:
  text: 'Table Component Overview'
  link: './'
next:
    text: "Cell Type Examples"
    link: "./example-cell-types.md"

outline: [2, 4]
---

# VpvTableJSON Usage

## Examples

As this is a complex component, we have included three pages with examples that are specific to one aspect of the component:

- [Cell Type Examples](./example-cell-types.md): Shows examples of each cell type, and how to customize them.
- [Sorting/Filtering Examples](./example-data-sort-filter.md): Shows examples of sorting and filtering data.
- [Data Source Examples](./example-data-source.md): Shows examples of loading data from different sources.

You can find the rest of the documentation below.


## Basic Usage

### From JSON File
You can load data from a JSON file by providing the path:

```vue
<VpvJsonTable jsonPath="/data/my-data.json" />
```

### From Prop Data
You can pass data directly as a prop:

```vue
<VpvJsonTable :jsonDataProp="myDataArray" />
```

### With Custom Columns
Define specific columns and their formatting:

```vue
<VpvJsonTable 
  :jsonDataProp="myData"
  :columns="[
    { key: 'name', title: 'Full Name', format: 'text' },
    { key: 'email', title: 'Email Address', format: 'link' },
    { key: 'active', title: 'Status', format: 'boolean' }
  ]"
/>
```

## Optional Functionality

### Display Options

#### `title`
Add a heading above your table:
```vue
<VpvJsonTable title="User Directory" :jsonDataProp="users" />
```

#### `sortable`
Control whether columns can be sorted by clicking headers (default: `true`):
```vue
<VpvJsonTable :sortable="false" :jsonDataProp="myData" />
```

### Data Sources

#### `jsonPath`
Load data from a JSON file:
```vue
<VpvJsonTable jsonPath="/data/products.json" />
```

#### `jsonDataProp`
Pass data directly as an array:
```vue
<VpvJsonTable :jsonDataProp="myDataArray" />
```

### Column Configuration

#### `columns`
Define custom column configuration with formatting options:

```vue
<VpvJsonTable 
  :columns="[
    { key: 'id', title: 'ID', format: 'number' },
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'website', title: 'Website', format: 'link', options: { target: '_blank' } },
    { key: 'logo', title: 'Logo', format: 'image', options: { width: 50, height: 50 } },
    { key: 'verified', title: 'Verified', format: 'boolean' },
    { key: 'tags', title: 'Categories', format: 'tags' },
    { key: 'code', title: 'Config', format: 'code', options: { language: 'json' } },
    { key: 'rating', title: 'Rating', format: 'icon', options: { icon: 'mdi:star', color: 'gold' } }
  ]"
  :jsonDataProp="products"
/>
```

Available cell formats:
- `text` - Plain text display (**default**)
- `number` - Formatted numbers
- `boolean` - True/false with visual indicators
- `link` - Clickable links
- `image` - Display images with optional sizing
- `tags` - Array of items displayed as badges
- `code` - Syntax-highlighted code blocks
- `icon` - Display icons from Iconify

### Sorting Options

#### `defaultSortField`
Set which column should be sorted by default:
```vue
<VpvJsonTable defaultSortField="name" :jsonDataProp="myData" />
```

#### `defaultSortDirection`
Set the default sort direction (default: `"ascending"`):
```vue
<VpvJsonTable 
  defaultSortField="date"
  defaultSortDirection="descending"
  :jsonDataProp="myData" 
/>
```

### Advanced Filtering

#### `filters`
Apply complex filtering logic using conditions and groups:

```vue
<VpvJsonTable 
  :filters="{
    type: 'and',
    conditions: [
      { type: 'condition', key: 'active', operator: 'equals', value: true },
      { type: 'condition', key: 'role', operator: 'contains', value: 'admin' }
    ]
  }"
  :jsonDataProp="users"
/>
```

Available operators:
- `equals` / `notEquals` - Exact value comparison
- `greaterThan` / `greaterThanOrEqual` - Numeric comparison
- `lessThan` / `lessThanOrEqual` - Numeric comparison  
- `includes` / `notIncludes` - Array contains value
- `contains` / `notContains` - String contains substring

Filter groups can use `and` or `or` logic and can be nested for complex conditions.

### Nested Data Access

You can access nested object properties using dot notation:

```vue
<VpvJsonTable 
  :columns="[
    { key: 'user.name', title: 'Name' },
    { key: 'user.profile.email', title: 'Email' },
    { key: 'metadata.created', title: 'Created Date' }
  ]"
  :jsonDataProp="complexData"
/>
```