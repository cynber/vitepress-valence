<template>
  <div class="vpv-pills-container">
    <span
      v-for="tag in value"
      :key="tag"
      :class="getTagClasses(tag)"
      :style="getCustomTagStyle(tag)"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface TagsCellProps {
  value: string[];
  tagColors?: Record<string, string>;
  style?: "card" | "header";
  colorScheme?: "brand" | "gray" | "indigo" | "purple" | "green" | "yellow" | "red";
}

const props = withDefaults(defineProps<TagsCellProps>(), {
  style: "card",
  colorScheme: "brand" // Default to brand colors
});

// Built-in VitePress color schemes (added brand as default)
const colorSchemes = {
  brand: { border: "var(--vp-c-brand-1)", background: "var(--vp-c-brand-soft)" },
  simple: { border: "var(--vp-c-border)", background: "transparent" },
  gray: { border: "var(--vp-c-gray-1)", background: "var(--vp-c-gray-soft)" },
  indigo: { border: "var(--vp-c-indigo-1)", background: "var(--vp-c-indigo-soft)" },
  purple: { border: "var(--vp-c-purple-1)", background: "var(--vp-c-purple-soft)" },
  green: { border: "var(--vp-c-green-1)", background: "var(--vp-c-green-soft)" },
  yellow: { border: "var(--vp-c-yellow-1)", background: "var(--vp-c-yellow-soft)" },
  red: { border: "var(--vp-c-red-1)", background: "var(--vp-c-red-soft)" }
};

const getTagClasses = (tag: string) => {
  // Always use base classes, styling handled by getCustomTagStyle
  return props.style === "card" ? "vpv-tag-card" : "vpv-pill-header";
};

const getCustomTagStyle = (tag: string) => {
  const customColor = props.tagColors?.[tag];
  
  if (customColor) {
    if (colorSchemes[customColor as keyof typeof colorSchemes]) {
      const scheme = colorSchemes[customColor as keyof typeof colorSchemes];
      return {
        borderColor: scheme.border,
        backgroundColor: scheme.background,
        color: "var(--vp-c-text-1)"
      };
    }
    
    return {
      borderColor: customColor,
      backgroundColor: `color-mix(in srgb, ${customColor} 14%, transparent)`,
      color: "var(--vp-c-text-1)"
    };
  }
  
  const scheme = colorSchemes[props.colorScheme];
  return {
    borderColor: scheme.border,
    backgroundColor: scheme.background,
    color: "var(--vp-c-text-1)"
  };
};
</script>

<style lang="scss" scoped>
@use "../../assets/main.scss" as main;

.vpv-pills-container {
  @extend .vpv-pills-container;
}

.vpv-tag-card {
  @include main.vpv-tag-card;
}

.vpv-pill-header {
  @include main.vpv-pill-header;
}
</style>