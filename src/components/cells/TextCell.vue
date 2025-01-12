<template>
  <span>{{ value }}</span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface TextCellProps {
  value: string | number | null;
}

const props = defineProps<TextCellProps>();
</script>
