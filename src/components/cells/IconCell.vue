<template>
  <div class="icon-cell">
    <Icon
      v-if="icon"
      :icon="icon"
      :style="{ color: iconColor, width: computedWidth, height: computedHeight }"
      class="icon"
    />
    <span v-else>{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Icon } from "@iconify/vue";

interface IconCellProps {
  value: string;
  iconMap?: Record<string, string>;
  defaultIcon?: string;
  iconColorMap?: Record<string, string>;
  defaultIconColor?: string;
  width?: string;
  height?: string;
}

const props = defineProps<IconCellProps>();

const icon = computed(() => props.iconMap?.[props.value] || props.defaultIcon);
const iconColor = computed(
  () => props.iconColorMap?.[props.value] || props.defaultIconColor || "var(--vp-c-brand)"
);
const computedWidth = computed(() => props.width || "1.5em");
const computedHeight = computed(() => props.height || "1.5em");
</script>

<style scoped>
.icon-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
