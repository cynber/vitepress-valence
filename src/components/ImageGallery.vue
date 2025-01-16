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
      <div class="image-grid" v-else>
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
import { defineProps, computed } from "vue";
import VerticalContainer from "./containers/VerticalContainer.vue";
import ImageCardSquare from "./cards/ImageCardSquare.vue";

interface ImageGalleryProps {
  title: string;
  date: string;
  inputImages?: string[];
  forceSort?: string[];
  excludeExtensions?: string[];
  includeExtensions?: string[];
  format?: "debug";
}

const props = defineProps<ImageGalleryProps>();

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateObj = new Date(props.date);
  return isNaN(dateObj.getTime())
    ? props.date
    : dateObj.toLocaleDateString(undefined, options);
});

const containerComponent = computed(() => {
  return VerticalContainer;
});

const galleryData = {
  inputImages: props.inputImages || [],
  forceSort: props.forceSort || [],
  excludeExtensions: props.excludeExtensions || [],
  includeExtensions: props.includeExtensions || [],
};

const combinedImages = computed(() => {
  let combined = [...(props.inputImages || [])];

  if (props.excludeExtensions && props.excludeExtensions.length > 0) {
    combined = combined.filter((img) => {
      const ext = img.split(".").pop()?.toLowerCase();
      return ext && !props.excludeExtensions!.includes(ext);
    });
  }

  if (props.includeExtensions && props.includeExtensions.length > 0) {
    combined = combined.filter((img) => {
      const ext = img.split(".").pop()?.toLowerCase();
      return ext && props.includeExtensions!.includes(ext);
    });
  }

  return combined;
});

const sortedImageUrls = computed(() => {
  if (props.forceSort && props.forceSort.length > 0) {
    const sorted = [...props.forceSort];
    combinedImages.value.forEach((img) => {
      if (!sorted.includes(img)) {
        sorted.push(img);
      }
    });
    return sorted;
  } else {
    // Default sort: alphabetical
    return [...combinedImages.value].sort();
  }
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
