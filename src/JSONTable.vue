<template>
  <div>
    <h3 v-if="title" class="title">{{ title }}</h3>
    <div class="table-container">
      <table v-if="jsonData.length && headers.length" class="styled-table">
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header"
              @click="sortTable(header)"
              :class="{ sortable: true, active: sortColumn === header }"
            >
              {{ headerTitles[header] || header }}
              <span v-if="sortColumn === header">
                {{ sortAsc ? "↑" : "↓" }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex">
            <td v-for="header in headers" :key="header">
              <template v-if="isLink(row[header])">
                <a :href="row[header]" :target="getLinkTarget(row[header])">
                  <Icon :icon="getLinkIcon(row[header])" class="icon" />
                </a>
              </template>
              <template v-else-if="typeof row[header] === 'boolean'">
                <Icon
                  :icon="row[header] ? 'lets-icons:check-fill' : 'healthicons:no-outline'"
                  :style="{
                    color: row[header] ? 'var(--vp-c-green-3)' : 'var(--vp-c-red-3)',
                  }"
                  class="icon"
                />
              </template>
              <template v-else-if="header === badgeFields && Array.isArray(row[header])">
                <div class="badge-container">
                  <span v-for="tag in row[header]" :key="tag" class="badge">{{
                    tag
                  }}</span>
                </div>
              </template>
              <template v-else>
                {{ row[header] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No data available</div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "JsonTable",
  props: {
    jsonPath: {
      type: String,
      default: null,
    },
    jsonDataProp: {
      type: Array,
      default() {
        return [];
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    headerTitles: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "",
    },
    badgeFields: {
      type: String,
      default: "",
    },
    defaultSortField: {
      type: String,
      default: "",
    },
    defaultSortDirection: {
      type: String,
      default: "ascending",
      validator(value) {
        return ["ascending", "descending"].includes(value);
      },
    },
  },
  data() {
    return {
      jsonData: [],
      sortColumn: this.defaultSortField || null,
      sortAsc: this.defaultSortDirection === "ascending",
    };
  },
  computed: {
    sortedData() {
      if (!this.sortColumn) {
        return this.jsonData;
      }
      return [...this.jsonData].sort((a, b) => {
        if (a[this.sortColumn] < b[this.sortColumn]) return this.sortAsc ? 1 : -1;
        if (a[this.sortColumn] > b[this.sortColumn]) return this.sortAsc ? -1 : 1;
        return 0;
      });
    },
  },
  watch: {
    jsonData(newData) {
      if (!this.headers.length && newData.length) {
        this.headers = Object.keys(newData[0]);
      }
    },
    jsonDataProp: {
      immediate: true,
      handler(newData) {
        if (newData.length) {
          this.jsonData = newData;
          if (this.headers.length === 0 && newData.length) {
            this.headers = Object.keys(newData[0]);
          }
          if (this.defaultSortField) {
            this.sortTable(this.defaultSortField);
          }
        } else if (this.jsonPath) {
          this.fetchJson();
        }
      },
    },
  },
  methods: {
    async fetchJson() {
      if (this.jsonPath) {
        try {
          const response = await fetch(this.jsonPath);
          this.jsonData = await response.json();
          if (this.defaultSortField) {
            this.sortTable(this.defaultSortField);
          }
        } catch (error) {
          console.error("Error fetching JSON:", error);
        }
      }
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortColumn = column;
        this.sortAsc = true;
      }
    },
    getLinkIcon(url) {
      return url.startsWith("http") ? "octicon:link-external-16" : "carbon:link";
    },
    getLinkTarget(url) {
      return url.startsWith("http") ? "_blank" : "_self";
    },
    isLink(value) {
      return (
        typeof value === "string" && (value.startsWith("http") || value.startsWith("/"))
      );
    },
  },
  mounted() {
    if (!this.jsonDataProp.length) {
      this.fetchJson();
    }
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 100%;
}

.styled-table {
  border-collapse: collapse;
  border-radius: 12px;
  border: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  width: max-content;
  margin: 1rem auto;
}

th,
td {
  border: 1px solid var(--vp-c-bg-soft);
  padding: 12px 24px;
  font-family: var(--vp-font-family-base);
  font-size: 16px;
  color: var(--vp-c-text-1);
}

th {
  background-color: var(--vp-c-bg-soft);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

th.sortable:hover,
th.active {
  background-color: var(--vp-c-brand-soft);
}

.icon {
  display: block;
  margin: 0 auto;
  width: 1.5em;
  height: 1.5em;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

.badge {
  background-color: var(--vp-c-brand-soft);
  border-radius: 12px;
  padding: 0.2em 0.6em;
  color: var(--vp-c-text-soft);
  font-size: 14px;
  cursor: default;
  transition: background-color 0.3s ease;
}

.badge:hover {
  background-color: var(--vp-c-brand-strong);
}
</style>
