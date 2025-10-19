<template>
  <code>{{ value }}</code>
</template>

<script setup lang="ts">

interface CodeCellProps {
  value: string | number | null;
}

const props = defineProps<CodeCellProps>();
</script>

<style scoped>
</style>