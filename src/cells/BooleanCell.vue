<template>
  <div class="boolean-cell">
    <div v-if="displayAs === 'icon'" class="icon-container">
      <Icon
        :icon="value ? trueIcon || defaultTrueIcon : falseIcon || defaultFalseIcon"
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
        {{ value ? trueText || defaultTrueText : falseText || defaultFalseText }}
      </span>
    </div>
    <div v-else class="default-container">
      <span>{{ value }}</span>
    </div>
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
    trueColor: {
      type: String,
      default: "var(--vp-c-green-3)",
    },
    falseColor: {
      type: String,
      default: "var(--vp-c-red-3)",
    },
    displayAs: {
      type: String,
      default: "icon",
      validator(value) {
        return ["icon", "text"].includes(value);
      },
    },
    trueIcon: {
      type: String,
      default: "ic:twotone-check-box",
    },
    falseIcon: {
      type: String,
      default: "material-symbols:close-rounded",
    },
    trueText: {
      type: String,
      default: "True",
    },
    falseText: {
      type: String,
      default: "False",
    },
    iconWidth: {
      type: String,
      default: "1.5em",
    },
    iconHeight: {
      type: String,
      default: "1.5em",
    },
  },
};
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
