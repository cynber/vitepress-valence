<template>
  <div v-if="shouldShowImage" class="image-wide-container">
    <!-- Light mode image -->
    <img
      v-if="imageConfig?.image"
      ref="lightImageRef"
      :src="imageConfig.image"
      :alt="lightAlt"
      class="image-wide vpv-light-only"
      :class="{ 'zoomable': enableZoom }"
    />
    
    <!-- Dark mode image (if provided) -->
    <img
      v-if="imageConfig?.image_dark"
      ref="darkImageRef"
      :src="imageConfig.image_dark"
      :alt="darkAlt"
      class="image-wide vpv-dark-only"
      :class="{ 'zoomable': enableZoom }"
    />
    
    <!-- Fallback: use light mode image in dark mode -->
    <img
      v-else-if="imageConfig?.image"
      ref="fallbackImageRef"
      :src="imageConfig.image"
      :alt="lightAlt"
      class="image-wide vpv-dark-only"
      :class="{ 'zoomable': enableZoom }"
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
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue';
import mediumZoom from 'medium-zoom';
import type { Zoom } from 'medium-zoom';

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
  enableZoom?: boolean;
  zoomMargin?: number;
  zoomBackground?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultAlt: 'Image',
  defaultDescription: '',
  hideDescription: false,
  enableZoom: false,
  zoomMargin: 24,
  zoomBackground: 'rgba(0, 0, 0, 0.9)'
});

// Template refs
const lightImageRef = ref<HTMLImageElement>();
const darkImageRef = ref<HTMLImageElement>();
const fallbackImageRef = ref<HTMLImageElement>();

// Zoom instance
let zoomInstance: Zoom | null = null;

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

const initializeZoom = async () => {
  if (!props.enableZoom) return;
  
  await nextTick();
  
  const images: HTMLImageElement[] = [];
  
  if (lightImageRef.value) images.push(lightImageRef.value);
  if (darkImageRef.value) images.push(darkImageRef.value);
  if (fallbackImageRef.value) images.push(fallbackImageRef.value);
  
  if (images.length > 0) {
    zoomInstance = mediumZoom(images, {
      margin: props.zoomMargin,
      background: props.zoomBackground,
    });

    // Add caption when zoom opens
    zoomInstance.on('open', () => {
      setTimeout(() => {
        const overlay = document.querySelector('.medium-zoom-overlay');
        if (overlay && !overlay.querySelector('.zoom-caption')) {
          const caption = document.createElement('div');
          caption.className = 'zoom-caption';
          caption.textContent = descriptionText.value || '';
          caption.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 16px;
            text-align: center;
            padding: 8px 16px;
            border-radius: 4px;
            max-width: 80%;
            word-wrap: break-word;
          `;
          overlay.appendChild(caption);
        }
      }, 50);
    });

    // Clean up caption when zoom closes
    zoomInstance.on('close', () => {
      const caption = document.querySelector('.zoom-caption');
      if (caption) {
        caption.remove();
      }
    });
  }
};

const destroyZoom = () => {
  if (zoomInstance) {
    zoomInstance.detach();
    zoomInstance = null;
  }
};

onMounted(() => {
  initializeZoom();
});

onUnmounted(() => {
  destroyZoom();
});
</script>

<style scoped>
.image-wide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-wide {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
  border: 1px solid var(--vp-c-brand-soft);
  margin: 0 auto;
  display: block;
}

.image-wide.zoomable {
  cursor: zoom-in;
  transition: box-shadow 0.1s ease-in-out, scale 0.1s ease-in-out;
}

.image-wide.zoomable:hover {
  transform: scale(1.01);
}

.image-wide-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin: 0.5rem 0 0 0;
  max-width: 800px;
  text-align: center;
}
</style>