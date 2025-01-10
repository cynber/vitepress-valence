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

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "IconCell",
  components: { Icon },
  props: {
    value: {
      type: String,
      required: true,
    },
    iconMap: {
      type: Object,
      default: () => ({}),
    },
    defaultIcon: {
      type: String,
      default: null,
    },
    iconColorMap: {
      type: Object,
      default: () => ({}),
    },
    defaultIconColor: {
      type: String,
      default: "var(--vp-c-brand)",
    },
    width: {
      type: String,
      default: "1.5em",
    },
    height: {
      type: String,
      default: "1.5em",
    },
  },
  computed: {
    icon() {
      return this.iconMap[this.value] || this.defaultIcon;
    },
    iconColor() {
      return this.iconColorMap[this.value] || this.defaultIconColor;
    },
    computedWidth() {
      return this.width;
    },
    computedHeight() {
      return this.height;
    },
  },
};
</script>

<style scoped>
.icon-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
