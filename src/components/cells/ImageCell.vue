<template>
  <div class="image-cell">
    <img
      :src="image"
      :alt="altText"
      :width="computedWidth"
      :height="computedHeight"
      v-if="image"
    />
    <span v-else>{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface ImageCellProps {
  value: string;
  image: string;
  width?: string;
  height?: string;
  altText?: string;
}

const props = defineProps<ImageCellProps>();

const computedWidth = computed(() => props.width || "50px");
const computedHeight = computed(() => props.height || "50px");
const altText = computed(() => props.altText || "Image");
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
</style>
