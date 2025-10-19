<template>
  <div class="image-cell">
    <img
      :src="value"
      :alt="computedAltText"
      :width="computedWidth"
      :height="computedHeight"
      @error="handleImageError"
      v-if="value"
    />
    <span v-else class="no-image">No image</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ImageCellProps {
  value: string;
  width?: string;
  height?: string;
  altText?: string;
}

const props = defineProps<ImageCellProps>();

const computedWidth = computed(() => props.width || "50px");
const computedHeight = computed(() => props.height || "50px");
const computedAltText = computed(() => props.altText || "Image");

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
  // Optionally show a placeholder or error message
};
</script>

<style scoped>
.image-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  object-fit: cover;
  border-radius: 4px;
}

.no-image {
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>