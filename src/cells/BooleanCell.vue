<template>
  <div v-if="displayAs === 'icon'">
    <Icon
      :icon="value ? trueIcon || defaultTrueIcon : falseIcon || defaultFalseIcon"
      :style="{ color: value ? trueColor : falseColor }"
      class="icon"
    />
  </div>
  <div v-else-if="displayAs === 'text'">
    <span>{{ value ? trueText || defaultTrueText : falseText || defaultFalseText }}</span>
  </div>
  <div v-else>
    <span>{{ value }}</span>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "BooleanCell",
  components: { Icon },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    trueIcon: {
      type: String,
      default: "akar-icons:circle-check-fill",
    },
    falseIcon: {
      type: String,
      default: "akar-icons:circle-x-fill",
    },
    trueText: {
      type: String,
      default: "True",
    },
    falseText: {
      type: String,
      default: "False",
    },
    displayAs: {
      type: String,
      default: "icon",
      validator(value) {
        return ["icon", "text"].includes(value);
      },
    },
    trueColor: {
      type: String,
      default: "var(--vp-c-green-3)",
    },
    falseColor: {
      type: String,
      default: "var(--vp-c-red-3)",
    },
  },
};
</script>

<style scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
