<template>
  <div>
    <h3 v-if="title" class="title">{{ title }}</h3>
    <div class="table-container">
      <table v-if="displayedData.length && columns.length" class="styled-table">
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
          <tr v-for="(row, rowIndex) in displayedData" :key="rowIndex">
            <td v-for="column in columns" :key="column.key">
              <component
                :is="getCellComponent(column.format || 'text')"
                :value="getNestedValue(row, column.key)"
                v-bind="column.options"
              ></component>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No data available</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, defineProps } from "vue";
import { Icon } from "@iconify/vue";

// Import cell components
import TextCell from "./cells/TextCell.vue";
import LinkCell from "./cells/LinkCell.vue";
import BooleanCell from "./cells/BooleanCell.vue";
import TagsCell from "./cells/TagsCell.vue";
import NumberCell from "./cells/NumberCell.vue";
import IconCell from "./cells/IconCell.vue";

interface Column {
  key: string;
  title?: string;
  format?: string;
  options?: Record<string, any>;
}

interface FilterCondition {
  type: "condition";
  key: string;
  operator: string;
  value: any;
}

interface FilterGroup {
  type: "and" | "or";
  conditions: (FilterCondition | FilterGroup)[];
}

type Filter = FilterCondition | FilterGroup;

interface Props {
  jsonPath?: string;
  jsonDataProp?: any[];
  columns?: Column[];
  filters?: Filter | null;
  title?: string;
  defaultSortField?: string;
  defaultSortDirection?: "ascending" | "descending";
}

const props = defineProps<Props>();

const jsonData = ref<any[]>([]);
const sortColumn = ref<string | null>(props.defaultSortField || null);
const sortAsc = ref<boolean>(props.defaultSortDirection === "ascending");

const columns = ref<Column[]>(props.columns || []);
const filters = ref<Filter | null>(props.filters || null);

const title = props.title;

function getNestedValue(obj: any, path: string): any {
  return path
    .split(".")
    .reduce(
      (acc: any, part: string) => (acc && acc[part] !== undefined ? acc[part] : null),
      obj
    );
}

function getCellComponent(format: string): any {
  switch (format) {
    case "link":
      return LinkCell;
    case "boolean":
      return BooleanCell;
    case "tags":
      return TagsCell;
    case "number":
      return NumberCell;
    case "icon":
      return IconCell;
    default:
      return TextCell;
  }
}

function sortTable(columnKey: string): void {
  if (sortColumn.value === columnKey) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortColumn.value = columnKey;
    sortAsc.value = true;
  }
}

const displayedData = computed(() => {
  let data = filteredData.value;
  if (!sortColumn.value) {
    return data;
  }
  return data.slice().sort((a, b) => {
    const aValue = getNestedValue(a, sortColumn.value!);
    const bValue = getNestedValue(b, sortColumn.value!);
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    if (aValue < bValue) return sortAsc.value ? -1 : 1;
    if (aValue > bValue) return sortAsc.value ? 1 : -1;
    return 0;
  });
});

const filteredData = computed(() => {
  if (!filters.value) {
    return jsonData.value;
  }
  return jsonData.value.filter((item) => evaluateFilter(filters.value!, item));
});

function evaluateFilter(filter: Filter, item: any): boolean {
  if (filter.type === "and" || filter.type === "or") {
    const group = filter as FilterGroup;
    const evaluator = filter.type === "and" ? "every" : "some";
    return group.conditions[evaluator]((subFilter) => evaluateFilter(subFilter, item));
  } else if (filter.type === "condition") {
    const condition = filter as FilterCondition;
    const itemValue = getNestedValue(item, condition.key);
    return applyOperator(itemValue, condition.operator, condition.value);
  } else {
    console.warn("Unknown filter type:", filter.type);
    return true;
  }
}

function applyOperator(a: any, operator: string, b: any): boolean {
  switch (operator) {
    case "equals":
      return a === b;
    case "notEquals":
      return a !== b;
    case "greaterThan":
      return a > b;
    case "greaterThanOrEqual":
      return a >= b;
    case "lessThan":
      return a < b;
    case "lessThanOrEqual":
      return a <= b;
    case "includes":
      return Array.isArray(a) && a.includes(b);
    case "notIncludes":
      return Array.isArray(a) && !a.includes(b);
    case "contains":
      return typeof a === "string" && a.includes(b);
    case "notContains":
      return typeof a === "string" && !a.includes(b);
    default:
      console.warn("Unknown operator:", operator);
      return false;
  }
}

async function fetchJson() {
  if (props.jsonPath) {
    try {
      const response = await fetch(props.jsonPath);
      jsonData.value = await response.json();
      if (props.defaultSortField) {
        sortColumn.value = props.defaultSortField;
        sortAsc.value = props.defaultSortDirection === "ascending";
      }
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }
}

watch(
  () => props.jsonDataProp,
  (newData) => {
    if (newData && newData.length) {
      jsonData.value = newData;
      if (columns.value.length === 0 && newData.length) {
        const sampleRow = newData[0];
        columns.value = Object.keys(sampleRow).map((key) => ({
          key: key,
          title: key,
          format: "text",
        }));
      }
      if (props.defaultSortField) {
        sortColumn.value = props.defaultSortField;
        sortAsc.value = props.defaultSortDirection === "ascending";
      }
    } else if (props.jsonPath) {
      fetchJson();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (!props.jsonDataProp || !props.jsonDataProp.length) {
    fetchJson();
  } else {
    jsonData.value = props.jsonDataProp;
    if (props.defaultSortField) {
      sortColumn.value = props.defaultSortField;
      sortAsc.value = props.defaultSortDirection === "ascending";
    }
  }
});
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
