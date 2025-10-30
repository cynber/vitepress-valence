---
layout: doc
prev:
    text: "Sorting/Filtering Examples"
    link: "./example-data-sort-filter.md"
next: false

outline: [2, 4]
---

# VpvTableJSON: Data Source Examples

## Data in the same file

<VpvTableJSON
    title="Inline Data with Customization"
    :jsonDataProp="inlineTimeTravel"
    :columns="[
        { key: 'modelName', title: 'Model', format: 'text' },
        { key: 'maxTimeJump', title: 'Range (years)', format: 'number' },
        { key: 'isAvailable', 
          title: 'Paradox Protection', 
          format: 'boolean',
          options: {
            displayAs: 'icon',
          }
        },
        { key: 'fuelType', title: 'Fuel Type', format: 'tags' },
        { key: 'productLink', title: 'Reserve', format: 'link' }
    ]"
    defaultSortField="modelName"
/>

<script>
export default {
  data() {
    return {
      inlineTimeTravel: [
        {
            "modelName": "Chrono Cruiser 3000",
            "maxTimeJump": 100,
            "isAvailable": true,
            "fuelType": [
                "Quantum",
                "Dark Matter"
            ],
            "productLink": "https://example.com/chrono-cruiser-3000"
        },
        {
            "modelName": "Temporal Trekker X5",
            "maxTimeJump": 500,
            "isAvailable": false,
            "fuelType": [
                "Neutrino Core",
                "Solar"
            ],
            "productLink": "https://example.com/temporal-trekker-x5"
        },
        {
            "modelName": "Era Explorer V2",
            "maxTimeJump": 200,
            "isAvailable": true,
            "fuelType": [
                "Quantum",
                "Dark Matter",
                "Solar"
            ],
            "productLink": "https://example.com/era-explorer-v2"
        }
    ],
    };
  }
};
</script>

::: details View Code
```vue
<VpvTableJSON
    title="Inline Data with Customization"
    :jsonDataProp="inlineTimeTravel"
    :columns="[
        { key: 'modelName', title: 'Model', format: 'text' },
        { key: 'maxTimeJump', title: 'Range (years)', format: 'number' },
        { key: 'isAvailable', 
          title: 'Paradox Protection', 
          format: 'boolean',
          options: {
            displayAs: 'icon',
          }
        },
        { key: 'fuelType', title: 'Fuel Type', format: 'tags' },
        { key: 'productLink', title: 'Reserve', format: 'link' }
    ]"
    defaultSortField="modelName"
/>

<script>
export default {
  data() {
    return {
      inlineTimeTravel: [
        {
            "modelName": "Chrono Cruiser 3000",
            "maxTimeJump": 100,
            "isAvailable": true,
            "fuelType": [
                "Quantum",
                "Dark Matter"
            ],
            "productLink": "https://example.com/chrono-cruiser-3000"
        },
        {
            "modelName": "Temporal Trekker X5",
            "maxTimeJump": 500,
            "isAvailable": false,
            "fuelType": [
                "Neutrino Core",
                "Solar"
            ],
            "productLink": "https://example.com/temporal-trekker-x5"
        },
        {
            "modelName": "Era Explorer V2",
            "maxTimeJump": 200,
            "isAvailable": true,
            "fuelType": [
                "Quantum",
                "Dark Matter",
                "Solar"
            ],
            "productLink": "https://example.com/era-explorer-v2"
        }
    ],
    };
  }
};
</script>
```
:::



## Local Data File

<VpvTableJSON
    title="Local Data File Example"
    jsonPath="/sample-time.json"
    :columns="
        [
            { key: 'modelName', title: 'Model', format: 'text' },
            { key: 'maxTimeJump', title: 'Range (years)', format: 'number' },
            { key: 'isAvailable', title: 'Paradox Protection', format: 'boolean' },
            { key: 'fuelType', title: 'Fuel Type', format: 'tags' },
            { key: 'productLink', title: 'Reserve', format: 'link' }
        ]
    "
    defaultSortField="modelName"
/>

::: details View Code
```vue
<VpvTableJSON
    title="Local Data File Example"
    jsonPath="/sample-time.json"
    :columns="
        [
            { key: 'modelName', title: 'Model', format: 'text' },
            { key: 'maxTimeJump', title: 'Range (years)', format: 'number' },
            { key: 'isAvailable', title: 'Paradox Protection', format: 'boolean' },
            { key: 'fuelType', title: 'Fuel Type', format: 'tags' },
            { key: 'productLink', title: 'Reserve', format: 'link' }
        ]
    "
    defaultSortField="modelName"
/>
```

The file is located in `docs/.vitepress/public/sample-time.json`:

<<< @/public/sample-time.json [public/sample-time.json]
:::



## Data from an external URL

Data is being loaded from a URL (view the data at [jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)).


<VpvTableJSON
    title="Loading JSON from URL with Filtering and Sorting"
    jsonPath="https://jsonplaceholder.typicode.com/users"
    :columns="[
        { key: 'name', title: 'Name', format: 'text' },
        { key: 'address.city', title: 'City', format: 'text' },
        { key: 'company.name', title: 'Company', format: 'text' },
        { key: 'address.geo.lat', title: 'Latitude', format: 'text' },
        { key: 'id', title: 'ID', format: 'number',
          options: { decimals: 0 }
        }
    ]"
    defaultSortField="name"
    :filters="{
        type: 'and',
        conditions: [
            {
                type: 'condition',
                key: 'id',
                operator: 'greaterThan',
                value: 4
            },
            {
                type: 'condition',
                key: 'address.geo.lat',
                operator: 'lessThan',
                value: '0'
            }
        ]
    }"
/>

::: details View Code
```vue
<VpvTableJSON
    title="Loading JSON from URL with Filtering and Sorting"
    jsonPath="https://jsonplaceholder.typicode.com/users"
    :columns="[
        { key: 'name', title: 'Name', format: 'text' },
        { key: 'address.city', title: 'City', format: 'text' },
        { key: 'company.name', title: 'Company', format: 'text' },
        { key: 'address.geo.lat', title: 'Latitude', format: 'text' },
        { key: 'id', title: 'ID', format: 'number',
          options: { decimals: 0 }
        }
    ]"
    defaultSortField="name"
    :filters="{
        type: 'and',
        conditions: [
            {
                type: 'condition',
                key: 'id',
                operator: 'greaterThan',
                value: 4
            },
            {
                type: 'condition',
                key: 'address.geo.lat',
                operator: 'lessThan',
                value: '0'
            }
        ]
    }"
/>
```
:::
