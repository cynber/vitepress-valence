<template>
  <div class="image-gallery-container">
    <div v-if="format === 'debug'">
      <pre>{{ galleryData }}</pre>
    </div>

    <component :is="containerComponent" class="gallery-container">
      <div class="top-bar">
        <span class="gallery-title">{{ title }}</span>
        <span class="gallery-date">{{ formattedDate }}</span>
      </div>
      <div v-if="sortedImageUrls.length === 0" class="no-images">
        No images found for this gallery.
      </div>
      <div class="image-grid" :id="galleryId" v-else>
        <ImageCardSquare
          v-for="(img, index) in sortedImageUrls"
          :key="index"
          :image="img"
        />
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted, ref } from "vue";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import VerticalContainer from "./containers/VerticalContainer.vue";
import ImageCardSquare from "./cards/ImageCardSquare.vue";

interface GalleryImage {
  path: string;
  folder: string;
  filename: string;
}

interface ImageGalleryProps {
  title: string;
  date: string;
  folders?: string[];
  images?: string[];
  excludeExtensions?: string[];
  includeExtensions?: string[];
  format?: "debug";
  galleryDataKey?: string;
  forceSort?: string[];
}

const galleryId = ref(`gallery-${Math.random().toString(36).substr(2, 9)}`);
let lightbox: any = null;

onMounted(() => {
  lightbox = new PhotoSwipeLightbox({
    gallery: `#${galleryId.value}`,
    children: 'a',
    pswpModule: () => import('photoswipe')
  });
  lightbox.init();
});

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});

const props = defineProps<ImageGalleryProps>();

const galleryData = inject<GalleryImage[]>(props.galleryDataKey || 'galleryData', []);

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", 
    day: "numeric"
  };
  const dateObj = new Date(props.date);
  return isNaN(dateObj.getTime()) 
    ? props.date
    : dateObj.toLocaleDateString(undefined, options);
});

const containerComponent = computed(() => {
  return VerticalContainer;
});

const filteredImages = computed(() => {
  // If neither folders nor images are specified, return all images
  if (!props.folders?.length && !props.images?.length) {
    return galleryData.filter(image => {
      // Only apply extension filters
      const ext = image.filename.split('.').pop()?.toLowerCase();
      if (props.excludeExtensions?.length && ext && props.excludeExtensions.includes(ext)) return false;
      if (props.includeExtensions?.length && ext && !props.includeExtensions.includes(ext)) return false;
      return true;
    });
  }

  return galleryData.filter(image => {
    // Check extensions first
    const ext = image.filename.split('.').pop()?.toLowerCase();
    if (props.excludeExtensions?.length && ext && props.excludeExtensions.includes(ext)) return false;
    if (props.includeExtensions?.length && ext && !props.includeExtensions.includes(ext)) return false;

    // Include image if it's in specified folders OR it's in specified images
    const inFolder = props.folders?.includes(image.folder) || false;
    const inImages = props.images?.includes(image.path) || false;
    
    return inFolder || inImages;
  });
});

const sortedImageUrls = computed(() => {
  if (props.forceSort && props.forceSort.length > 0) {
    const sorted = [...props.forceSort];
    filteredImages.value.forEach(img => {
      if (!sorted.includes(img.path)) {
        sorted.push(img.path);
      }
    });
    return sorted;
  }
  
  return filteredImages.value.map(img => img.path).sort();
});
</script>

<style scoped>
.image-gallery-container {
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
}

.gallery-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  margin: -8px -16px 0px -8px;
  width: calc(100% + 16px);
  box-sizing: border-box;
}

.gallery-title {
  font-weight: 500;
  flex: 1;
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--vp-c-text-2);
  transition: color 0.3s ease-in-out;
}

.image-gallery-container:hover .gallery-title {
  color: var(--vp-c-text-1);
}

.gallery-date {
  font-size: 1rem;
  font-weight: normal;
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: color 0.3s ease-in-out;
}

.image-gallery-container:hover .gallery-date {
  color: var(--vp-c-text-2);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.no-images {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
