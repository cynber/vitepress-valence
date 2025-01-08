<template>
  <div>
    <a :href="href" target="_blank" v-if="displayAs === 'icon'">
      <Icon :icon="icon" :style="{ color: iconColor }" class="icon" />
    </a>
    <a :href="href" target="_blank" v-else-if="displayAs === 'text'">
      {{ linkText }}
    </a>
    <span v-else>{{ href }}</span>
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
      required: true,
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
  },
  computed: {
    isInternal() {
      return this.value.startsWith("/");
    },
    href() {
      return this.value;
    },
    icon() {
      return this.isInternal ? this.internalIcon : this.externalIcon;
    },
    iconColor() {
      return this.isInternal ? "var(--vp-c-brand)" : "var(--vp-c-orange)";
    },
    displayAs() {
      return this.isInternal ? this.displayInternalAs : this.displayExternalAs;
    },
    linkText() {
      return this.isInternal ? this.internalText : this.externalText;
    },
  },
};
</script>

<style scoped>
a {
  color: var(--vp-c-brand);
  text-decoration: none;
  display: flex;
  align-items: center;
}
a:hover {
  text-decoration: underline;
}
.icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
