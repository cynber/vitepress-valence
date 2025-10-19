<template>
  <div 
    v-if="shouldShowImage" 
    class="vpv-image-container"
    :class="containerClasses"
    :style="containerStyles"
  >
    <!-- Light mode image -->
    <img
      v-if="imageConfig?.image"
      ref="lightImageRef"
      :src="imageConfig.image"
      :alt="lightAlt"
      class="vpv-image vpv-light-only"
      :class="imageClasses"
      :style="imageStyles"
    />
    
    <!-- Dark mode image (if provided) -->
    <img
      v-if="imageConfig?.image_dark"
      ref="darkImageRef"
      :src="imageConfig.image_dark"
      :alt="darkAlt"
      class="vpv-image vpv-dark-only"
      :class="imageClasses"
      :style="imageStyles"
    />
    
    <!-- Fallback: use light mode image in dark mode -->
    <img
      v-else-if="imageConfig?.image"
      ref="fallbackImageRef"
      :src="imageConfig.image"
      :alt="lightAlt"
      class="vpv-image vpv-dark-only"
      :class="imageClasses"
      :style="imageStyles"
    />
    
    <!-- Description -->
    <p
      v-if="!hideDescription && descriptionText"
      class="vpv-image-description"
    >
      {{ descriptionText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue';
import { useData } from 'vitepress';
import mediumZoom from 'medium-zoom';
import type { Zoom } from 'medium-zoom';

const { isDark } = useData();

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
  width?: string;
  height?: string;
  aspectRatio?: string;
  enableRadius?: boolean;
  enableBorder?: boolean;
  float?: 'none' | 'left' | 'right';
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultAlt: 'Image',
  defaultDescription: '',
  hideDescription: false,
  enableZoom: false,
  zoomMargin: 24,
  zoomBackground: 'rgba(0, 0, 0, 0.9)',
  width: '100%',
  height: 'auto',
  aspectRatio: 'auto',
  enableRadius: true,
  enableBorder: false, // Changed default to false to avoid conflicts
  float: 'none',
  maxWidth: '100%'
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
  return isDark.value 
    ? (props.imageConfig?.alt_dark || props.imageConfig?.alt || props.defaultAlt)
    : (props.imageConfig?.alt || props.defaultAlt);
});

const descriptionText = computed(() => {
  if (isDark.value && props.imageConfig?.description_dark) {
    return props.imageConfig.description_dark;
  }
  
  return props.imageConfig?.description || props.defaultDescription;
});

const containerClasses = computed(() => ({
  'vpv-float-left': props.float === 'left',
  'vpv-float-right': props.float === 'right',
}));

const imageClasses = computed(() => ({
  'zoomable': props.enableZoom,
  'vpv-image-bordered': props.enableBorder,
  'vpv-image-rounded': props.enableRadius
}));

const containerStyles = computed(() => ({
  width: props.width,
  maxWidth: props.maxWidth,
}));

const imageStyles = computed(() => ({
  width: '100%',
  height: props.height,
  aspectRatio: props.aspectRatio !== 'auto' ? props.aspectRatio : undefined
}));

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
        if (overlay && !overlay.querySelector('.zoom-caption') && descriptionText.value) {
          const caption = document.createElement('div');
          caption.className = 'zoom-caption';
          caption.textContent = descriptionText.value;
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
.vpv-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &.vpv-float-left {
    float: left;
    margin: 0 1rem 1rem 0;
  }
  
  &.vpv-float-right {
    float: right;
    margin: 0 0 1rem 1rem;
  }
}

.vpv-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  display: block;
  
  &.vpv-image-bordered {
    border: 2px solid var(--vp-c-divider);
  }
  
  &.vpv-image-rounded {
    border-radius: 8px;
  }
}

.vpv-image.zoomable {
  cursor: zoom-in;
  transition: transform 0.1s ease-in-out;
}

.vpv-image.zoomable:hover {
  transform: scale(1.01);
}

.vpv-image-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin: 0.5rem 0 0 0;
  max-width: 800px;
  text-align: center;
}
</style>