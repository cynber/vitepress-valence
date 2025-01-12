<template>
  <div class="number-cell">
    <span>{{ formattedValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface NumberCellProps {
  value: number;
  decimals?: number;
  formatter?: (value: number) => string;
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

span {
  width: 100%;
}
</style>
