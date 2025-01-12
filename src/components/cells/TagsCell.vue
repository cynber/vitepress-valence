<template>
  <div class="badge-container">
    <span
      v-for="tag in value"
      :key="tag"
      class="badge"
      :style="{ backgroundColor: tagColors[tag] || defaultTagColor }"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface TagsCellProps {
  value: string[];
  tagColors?: Record<string, string>;
  defaultTagColor?: string;
}

const props = defineProps<TagsCellProps>();

const defaultTagColor = props.defaultTagColor || "var(--vp-c-brand-soft)";
const tagColors = props.tagColors || {};
</script>

<style scoped>
.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

.badge {
  border-radius: 12px;
  padding: 0.2em 0.6em;
  color: var(--vp-c-text-soft);
  font-size: 14px;
  cursor: default;
  transition: background-color 0.3s ease;
}

.badge:hover {
  opacity: 0.8;
}
</style>
