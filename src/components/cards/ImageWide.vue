<template>
  <div v-if="shouldShowImage" class="image-wide-container">
    <!-- Light mode image -->
    <img
      v-if="imageConfig?.image"
      :src="imageConfig.image"
      :alt="lightAlt"
      class="image-wide vpv-light-only"
    />
    
    <!-- Dark mode image (if provided) -->
    <img
      v-if="imageConfig?.image_dark"
      :src="imageConfig.image_dark"
      :alt="darkAlt"
      class="image-wide vpv-dark-only"
    />
    
    <!-- Fallback: use light mode image in dark mode -->
    <img
      v-else-if="imageConfig?.image"
      :src="imageConfig.image"
      :alt="lightAlt"
      class="image-wide vpv-dark-only"
    />
    
    <!-- Description -->
    <p
      v-if="!hideDescription && descriptionText"
      class="image-wide-description"
    >
      {{ descriptionText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ImageConfig {
  image?: string;
  image_dark?: string;
  alt?: string;
  alt_dark?: string;
  description?: string;
  description_dark?: string;
}

interface Props {
  imageConfig?: ImageConfig;
  hideDescription?: boolean;
  defaultAlt?: string;
  defaultDescription?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultAlt: 'Image',
  defaultDescription: '',
  hideDescription: false
});

const shouldShowImage = computed(() => {
  return props.imageConfig?.image || props.imageConfig?.image_dark;
});

const lightAlt = computed(() => {
  return props.imageConfig?.alt || props.defaultAlt;
});

const darkAlt = computed(() => {
  return props.imageConfig?.alt_dark || props.imageConfig?.alt || props.defaultAlt;
});

const descriptionText = computed(() => {
  return props.imageConfig?.description || props.defaultDescription;
});
</script>

<style scoped>
.image-wide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.image-wide {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
  margin: 0 auto;
  display: block;
}

.image-wide-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin: 0.5rem 0 0 0;
  max-width: 800px;
  text-align: center;
}
</style>