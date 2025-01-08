<template>
  <div class="icon-cell">
    <Icon v-if="icon" :icon="icon" :style="{ color: iconColor }" class="icon" />
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
  },
  computed: {
    icon() {
      return this.iconMap[this.value] || this.defaultIcon;
    },
    iconColor() {
      return this.iconColorMap[this.value] || this.defaultIconColor;
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

.icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
