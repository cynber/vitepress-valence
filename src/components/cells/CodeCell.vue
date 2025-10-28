<template>
  <div class="code-cell">
    <pre class="code-block"><code>{{ displayValue }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CodeCellProps {
  value: string | number | null;
}

const props = defineProps<CodeCellProps>();

const displayValue = computed(() => {
  if (props.value === null || props.value === undefined) {
    return '';
  }
  return String(props.value);
});
</script>

<style scoped>
.code-cell {
  margin: 8px 0;
}

.code-block {
  background-color: var(--vp-code-block-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.45;
}

.code-block code {
  background: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
}


</style>