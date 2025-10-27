---
layout: doc
prev:
    text: "Cell Type Examples"
    link: "./example-cell-types.md"
next:
    text: "Data Source Examples"
    link: "./example-data-source.md"

outline: [2, 4]
---

# VpvTableJSON: Sorting/Filtering Examples

## Base Data (for reference)

::: details View JSON Data
<<< @/public/sample-product.json
:::

## 1. No Specified Sort/Filter

<VpvTableJSON
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'code' },
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { 
        key: 'price', title: 'Price', format: 'number', 
        options: { 
            decimals: 2,
            formatter: (value) => `$${value}`
        }
    },
    { key: 'inStock', title: 'In Stock', format: 'boolean' },
    { 
        key: 'rating', title: 'Rating', format: 'number', 
        options: { 
            decimals: 1,
            monospace: true
        } 
    }
  ]"
/>

::: details View Code
```vue
<VpvTableJSON
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'code' },
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { 
        key: 'price', title: 'Price', format: 'number', 
        options: { 
            decimals: 2,
            formatter: (value) => `$${value}`
        }
    },
    { key: 'inStock', title: 'In Stock', format: 'boolean' },
    { 
        key: 'rating', title: 'Rating', format: 'number', 
        options: { 
            decimals: 1,
            monospace: true
        } 
    }
  ]"
/>
```
:::


## 2. Basic Sorting

<VpvTableJSON
  title="Products - Sorted by Price (High to Low)"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'code' },
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { 
        key: 'price', title: 'Price', format: 'number', 
        options: { 
            decimals: 2,
            formatter: (value) => `$${value}`
        }
    }
  ]"
  defaultSortField="price"
  defaultSortDirection="descending"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Products - Sorted by Price (High to Low)"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'id', title: 'Product ID', format: 'code' },
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { 
        key: 'price', title: 'Price', format: 'number', 
        options: { 
            decimals: 2,
            formatter: (value) => `$${value}`
        }
    }
  ]"
  defaultSortField="price"
  defaultSortDirection="descending"
/>
```
:::

## 3. Force Disable Sorting
<VpvTableJSON
  title="Products - No Sorting"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { 
        key: 'price', title: 'Price', format: 'number', 
        options: { 
            decimals: 2,
            formatter: (value) => `$${value}`
        }
    }
  ]"
  :sortable="false"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Products - No Sorting"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { 
        key: 'price', title: 'Price', format: 'number', 
        options: { 
            decimals: 2,
            formatter: (value) => `$${value}`
        }
    }
  ]"
  :sortable="false"
/>
```
:::

## 4. Simple AND Filter

This will display all products that are both Electronics and In Stock.

<VpvTableJSON
  title="Electronics in Stock"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' },
    { key: 'inStock', title: 'In Stock', format: 'boolean' }
  ]"
  :filters="{
    type: 'and',
    conditions: [
      { type: 'condition', key: 'category', operator: 'equals', value: 'Electronics' },
      { type: 'condition', key: 'inStock', operator: 'equals', value: true }
    ]
  }"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Electronics in Stock"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' },
    { key: 'inStock', title: 'In Stock', format: 'boolean' }
  ]"
  :filters="{
    type: 'and',
    conditions: [
      { type: 'condition', key: 'category', operator: 'equals', value: 'Electronics' },
      { type: 'condition', key: 'inStock', operator: 'equals', value: true }
    ]
  }"
/>
```
:::


## 5. Simple OR Filter

This will display all products that are either Electronics or Sports.

<VpvTableJSON
  title="Electronics or Sports Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'or',
    conditions: [
      { type: 'condition', key: 'category', operator: 'equals', value: 'Electronics' },
      { type: 'condition', key: 'category', operator: 'equals', value: 'Sports' }
    ]
  }"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Electronics or Sports Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'or',
    conditions: [
      { type: 'condition', key: 'category', operator: 'equals', value: 'Electronics' },
      { type: 'condition', key: 'category', operator: 'equals', value: 'Sports' }
    ]
  }"
/>
```
:::


## 6. Price Range Filter

This will display all products that are between $50 and $200.

<VpvTableJSON
  title="Products $50-$200"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' },
    { key: 'category', title: 'Category', format: 'text' }
  ]"
  :filters="{
    type: 'and',
    conditions: [
      { type: 'condition', key: 'price', operator: 'greaterThanOrEqual', value: 50 },
      { type: 'condition', key: 'price', operator: 'lessThanOrEqual', value: 200 }
    ]
  }"
  defaultSortField="price"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Products $50-$200"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' },
    { key: 'category', title: 'Category', format: 'text' }
  ]"
  :filters="{
    type: 'and',
    conditions: [
      { type: 'condition', key: 'price', operator: 'greaterThanOrEqual', value: 50 },
      { type: 'condition', key: 'price', operator: 'lessThanOrEqual', value: 200 }
    ]
  }"
  defaultSortField="price"
/>
```
:::


## 7. Complex Nested Filter

This will display all products that are high-rated and either Electronics or Sports.

<VpvTableJSON
  title="High-rated Electronics or Sports (4.3+ stars)"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'rating', title: 'Rating', format: 'number' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'and',
    conditions: [
      { type: 'condition', key: 'rating', operator: 'greaterThanOrEqual', value: 4.3 },
      {
        type: 'or',
        conditions: [
          { type: 'condition', key: 'category', operator: 'equals', value: 'Electronics' },
          { type: 'condition', key: 'category', operator: 'equals', value: 'Sports' }
        ]
      }
    ]
  }"
  defaultSortField="rating"
  defaultSortDirection="descending"
/>

::: details View Code
```vue
<VpvTableJSON
  title="High-rated Electronics or Sports (4.3+ stars)"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'rating', title: 'Rating', format: 'number' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'and',
    conditions: [
      { type: 'condition', key: 'rating', operator: 'greaterThanOrEqual', value: 4.3 },
      {
        type: 'or',
        conditions: [
          { type: 'condition', key: 'category', operator: 'equals', value: 'Electronics' },
          { type: 'condition', key: 'category', operator: 'equals', value: 'Sports' }
        ]
      }
    ]
  }"
  defaultSortField="rating"
  defaultSortDirection="descending"
/>
```
:::


## 8. Array Filter

<VpvTableJSON
  title="Kitchen Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'tags', title: 'Tags', format: 'tags' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'condition',
    key: 'tags',
    operator: 'includes',
    value: 'kitchen'
  }"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Kitchen Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'tags', title: 'Tags', format: 'tags' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'condition',
    key: 'tags',
    operator: 'includes',
    value: 'kitchen'
  }"
/>
```
:::


## 9. String Contains Filter

This will display all products that have 'phone' in the name.

<VpvTableJSON
  title="Phone Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'condition',
    key: 'name',
    operator: 'contains',
    value: 'phone'
  }"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Phone Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'condition',
    key: 'name',
    operator: 'contains',
    value: 'phone'
  }"
/>
```
:::


## 10. Not Equals Filter

<VpvTableJSON
  title="Out of Stock Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'inStock', title: 'In Stock', format: 'boolean' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'condition',
    key: 'inStock',
    operator: 'equals',
    value: false
  }"
/>

::: details View Code
```vue
<VpvTableJSON
  title="Out of Stock Products"
  jsonPath="/sample-product.json"
  :columns="[
    { key: 'name', title: 'Product Name', format: 'text' },
    { key: 'category', title: 'Category', format: 'text' },
    { key: 'inStock', title: 'In Stock', format: 'boolean' },
    { key: 'price', title: 'Price', format: 'number' }
  ]"
  :filters="{
    type: 'condition',
    key: 'inStock',
    operator: 'equals',
    value: false
  }"
/>
```
:::