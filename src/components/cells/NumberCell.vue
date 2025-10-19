<template>
  <div class="number-cell">
    <code v-if="monospace" class="code-format">{{ formattedValue }}</code>
    <span v-else>{{ formattedValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface NumberCellProps {
  value: number;
  decimals?: number;
  formatter?: (value: number) => string;
  monospace?: boolean;
}

const props = defineProps<NumberCellProps>();

const formattedValue = computed(() => {
  if (props.formatter && typeof props.formatter === "function") {
    return props.formatter(props.value);
  }
  const hasFractionalPart = props.value % 1 !== 0;
  const fractionDigits = hasFractionalPart ? props.decimals ?? 2 : 0;
  return props.value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
});
</script>

<style scoped>
.number-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  width: 100%;
  height: 100%;
}

span,
.code-format {
  width: 100%;
}

.code-format {
  background-color: inherit;
  /* border: 1px solid var(--vp-c-divider); */
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  color: var(--vp-c-brand);
}
</style>
