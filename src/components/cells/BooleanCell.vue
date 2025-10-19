<template>
  <div class="boolean-cell">
    <div
      v-if="displayAs === 'icon'"
      class="icon-container"
      :title="value ? trueHoverText : falseHoverText"
    >
      <Icon
        :icon="value ? trueIcon : falseIcon"
        :style="{
          color: value ? trueColor : falseColor,
          width: iconWidth,
          height: iconHeight,
        }"
        class="icon"
      />
    </div>
    <div v-else-if="displayAs === 'text'" class="text-container">
      <span :style="{ color: value ? trueColor : falseColor }">
        {{ value ? trueText : falseText }}
      </span>
    </div>
    <div v-else class="default-container">
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface BooleanCellProps {
  value: boolean;
  trueColor?: string;
  falseColor?: string;
  displayAs?: "icon" | "text";
  trueIcon?: string;
  falseIcon?: string;
  trueText?: string;
  falseText?: string;
  iconWidth?: string;
  iconHeight?: string;
  trueHoverText?: string;
  falseHoverText?: string;
}

const props = defineProps<BooleanCellProps>();

const defaultTrueIcon = "ic:twotone-check-box";
const defaultFalseIcon = "material-symbols:close-rounded";
const defaultTrueText = "True";
const defaultFalseText = "False";

const trueIcon = props.trueIcon || defaultTrueIcon;
const falseIcon = props.falseIcon || defaultFalseIcon;
const trueText = props.trueText || defaultTrueText;
const falseText = props.falseText || defaultFalseText;
const trueColor = props.trueColor || "var(--vp-c-green-3)";
const falseColor = props.falseColor || "var(--vp-c-red-3)";
const iconWidth = props.iconWidth || "1.5em";
const iconHeight = props.iconHeight || "1.5em";
const displayAs = props.displayAs || "icon";
const trueHoverText = props.trueHoverText || undefined;
const falseHoverText = props.falseHoverText || undefined;
</script>

<style scoped>
.boolean-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-container,
.text-container,
.default-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
