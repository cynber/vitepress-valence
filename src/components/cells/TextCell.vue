<template>
  <span>{{ value }}</span>
</template>

<script setup lang="ts">

interface TextCellProps {
  value: string | number | null;
}

const props = defineProps<TextCellProps>();
</script>
