<template>
  <div class="link-cell">
    <a
      v-if="isValidLink && displayAs === 'icon'"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="icon-link"
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
    >
      {{ linkText }}
    </a>
    <!-- Display nothing if the link is invalid or null -->
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "LinkCell",
  components: { Icon },
  props: {
    value: {
      type: String,
      default: null,
    },
    internalIcon: {
      type: String,
      default: "material-symbols:link-rounded",
    },
    externalIcon: {
      type: String,
      default: "majesticons:open",
    },
    internalText: {
      type: String,
      default: "Open Page",
    },
    externalText: {
      type: String,
      default: "Open Link",
    },
    displayInternalAs: {
      type: String,
      default: "icon",
      validator(value) {
        return ["icon", "text"].includes(value);
      },
    },
    displayExternalAs: {
      type: String,
      default: "icon",
      validator(value) {
        return ["icon", "text"].includes(value);
      },
    },
    width: {
      type: String,
      default: "1.5em",
    },
    height: {
      type: String,
      default: "1.5em",
    },
    iconColorMap: {
      type: Object,
      default: () => ({
        internal: "var(--vp-c-brand)",
        external: "var(--vp-c-orange)",
      }),
    },
    defaultIconColor: {
      type: String,
      default: "var(--vp-c-brand)",
    },
  },
  computed: {
    isInternal() {
      return this.value && this.value.startsWith("/");
    },
    isValidLink() {
      if (!this.value) return false;
      // Optionally, add more sophisticated URL validation here
      return true;
    },
    href() {
      return this.value;
    },
    icon() {
      return this.isInternal ? this.internalIcon : this.externalIcon;
    },
    iconColor() {
      return this.isInternal
        ? this.iconColorMap.internal || this.defaultIconColor
        : this.iconColorMap.external || this.defaultIconColor;
    },
    displayAs() {
      return this.isInternal ? this.displayInternalAs : this.displayExternalAs;
    },
    linkText() {
      return this.isInternal ? this.internalText : this.externalText;
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
.link-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-link,
.text-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  display: flex;
  align-items: center;
}

.icon-link:hover,
.text-link:hover {
  text-decoration: underline;
}
</style>
