<template>
  <div class="boolean-cell">
    <div v-if="displayAs === 'icon'" class="icon-container">
      <Icon
        :icon="value ? trueIcon || defaultTrueIcon : falseIcon || defaultFalseIcon"
        :style="{ color: value ? trueColor : falseColor }"
        class="icon"
      />
    </div>
    <div v-else-if="displayAs === 'text'" class="text-container">
      <span>{{
        value ? trueText || defaultTrueText : falseText || defaultFalseText
      }}</span>
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

.icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
