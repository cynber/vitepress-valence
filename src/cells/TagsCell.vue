<template>
  <div class="badge-container">
    <span v-for="tag in value" :key="tag" class="badge">{{ tag }}</span>
  </div>
</template>

<script>
export default {
  name: "TagsCell",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
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
