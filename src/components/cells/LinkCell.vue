<template>
  <div class="link-cell">
    <a
      v-if="isValidLink && displayAs === 'icon'"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="icon-link"
      :title="hoverText"
    >
      <Icon
        :icon="icon"
        :style="{ color: iconColor, width: computedWidth, height: computedHeight }"
        class="icon"
      />
    </a>
    <a
      v-else-if="isValidLink && displayAs === 'text'"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="text-link"
      :style="{ color: iconColor }"
      :title="hoverText"
    >
      {{ linkText }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

interface LinkCellProps {
  value?: string;
  internalIcon?: string;
  externalIcon?: string;
  internalText?: string;
  externalText?: string;
  displayInternalAs?: "icon" | "text";
  displayExternalAs?: "icon" | "text";
  width?: string;
  height?: string;
  iconColorMap?: Record<string, string>;
  defaultIconColor?: string;
  internalHoverText?: string;
  externalHoverText?: string;
}

const props = defineProps<LinkCellProps>();

const isInternal = computed(() => props.value?.startsWith("/") || false);
const isValidLink = computed(() => !!props.value);
const href = computed(() => props.value);

const icon = computed(() =>
  isInternal.value
    ? props.internalIcon || "material-symbols:link-rounded"
    : props.externalIcon || "majesticons:open"
);
const iconColor = computed(() =>
  isInternal.value
    ? props.iconColorMap?.internal || props.defaultIconColor || "var(--vp-c-brand)"
    : props.iconColorMap?.external || props.defaultIconColor || "var(--vp-c-orange)"
);
const displayAs = computed(() =>
  isInternal.value ? props.displayInternalAs || "icon" : props.displayExternalAs || "icon"
);
const linkText = computed(() =>
  isInternal.value ? props.internalText || "Open Page" : props.externalText || "Open Link"
);
const hoverText = computed(() =>
  isInternal.value ? props.internalHoverText : props.externalHoverText
);
const computedWidth = computed(() => props.width || "1.5em");
const computedHeight = computed(() => props.height || "1.5em");
</script>

<style scoped>
.link-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-link,
.text-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.icon-link:hover,
.text-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}
</style>