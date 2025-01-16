<template>
  <div class="image-gallery-container">
    <div v-if="format === 'debug'">
      <pre>{{ JSON.stringify(galleryData, null, 2) }}</pre>
    </div>

    <component :is="containerComponent" class="gallery-container">
      <div class="top-bar">
        <span class="gallery-title">{{ title }}</span>
        <span class="gallery-date">{{ formattedDate }}</span>
      </div>
      <slot></slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import VerticalContainer from "./containers/VerticalContainer.vue";

interface ImageGalleryProps {
  title: string;
  date: string;
  inputImages?: string[];
  inputFolders?: string[];
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
  inputFolders: props.inputFolders || [],
  forceSort: props.forceSort || [],
  excludeExtensions: props.excludeExtensions || [],
  includeExtensions: props.includeExtensions || [],
};
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
  font-size: 1rem;
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
</style>
