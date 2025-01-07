<template>
  <div>
    <h3 v-if="title" class="title">{{ title }}</h3>
    <div class="table-container">
      <table v-if="sortedData.length && columns.length" class="styled-table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="sortTable(column.key)"
              :class="{ sortable: true, active: sortColumn === column.key }"
            >
              {{ column.title || column.key }}
              <span v-if="sortColumn === column.key">
                {{ sortAsc ? "↑" : "↓" }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex">
            <td v-for="column in columns" :key="column.key">
              <component
                :is="getCellComponent(column.format)"
                :value="getNestedValue(row, column.key)"
              ></component>
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

// Import cell components
import TextCell from "./cells/TextCell.vue";
import LinkCell from "./cells/LinkCell.vue";
import BooleanCell from "./cells/BooleanCell.vue";
import TagsCell from "./cells/TagsCell.vue";

export default {
  name: "JsonTable",
  components: {
    Icon,
    TextCell,
    LinkCell,
    BooleanCell,
    TagsCell,
  },
  props: {
    jsonPath: String,
    jsonDataProp: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    title: String,
    defaultSortField: String,
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
        const aValue = this.getNestedValue(a, this.sortColumn);
        const bValue = this.getNestedValue(b, this.sortColumn);
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        if (aValue < bValue) return this.sortAsc ? -1 : 1;
        if (aValue > bValue) return this.sortAsc ? 1 : -1;
        return 0;
      });
    },
  },
  watch: {
    jsonData(newData) {
      if (!this.columns.length && newData.length) {
        const sampleRow = newData[0];
        this.columns = Object.keys(sampleRow).map((key) => ({
          key: key,
          title: key,
          format: "text",
        }));
      }
    },
    jsonDataProp: {
      immediate: true,
      handler(newData) {
        if (newData.length) {
          this.jsonData = newData;
          if (this.columns.length === 0 && newData.length) {
            const sampleRow = newData[0];
            this.columns = Object.keys(sampleRow).map((key) => ({
              key: key,
              title: key,
              format: "text",
            }));
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
    getNestedValue(obj, path) {
      return path
        .split(".")
        .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
    },
    sortTable(columnKey) {
      if (this.sortColumn === columnKey) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortColumn = columnKey;
        this.sortAsc = true;
      }
    },
    getCellComponent(format) {
      switch (format) {
        case "link":
          return "LinkCell";
        case "boolean":
          return "BooleanCell";
        case "tags":
          return "TagsCell";
        default:
          return "TextCell";
      }
    },
  },
  mounted() {
    if (!this.jsonDataProp.length) {
      this.fetchJson();
    } else {
      this.jsonData = this.jsonDataProp;
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
