<template>
  <div class="image-gallery-container">
    <div v-if="format === 'debug'">
      <pre>{{ galleryData }}</pre>
    </div>
    <VerticalContainer 
      :title="title"
      :date="date"
      :date-format="dateFormat"
      :title-lines="titleLines"
      :header-link="link"
      :description="dateTimeDescription"
      class="gallery-container"
    >
      <div v-if="displayImages.length === 0" class="no-images">
        No images found for this gallery.
      </div>
      <div :class="galleryLayoutClass" :id="galleryId" v-else>
        <component
          :is="layoutComponent"
          v-for="(img, index) in displayImages"
          :key="index"
          :image="img"
        />
      </div>
    </VerticalContainer>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted, ref, nextTick, watch } from "vue";
import "photoswipe/style.css";
import VerticalContainer from "./containers/VerticalContainer.vue";
import ImageCardFull from "./cards/ImageCardFull.vue";
import ImageCardMasonry from "./cards/ImageCardMasonry.vue";
import ImageCardSquare from "./cards/ImageCardSquare.vue";

interface GalleryImage {
  path: string;
  folder: string;
  filename: string;
}

interface ImageGalleryProps {
  title: string;
  titleLines?: number;
  date?: string;
  dateFormat?: 'long' | 'iso';
  time?: string;
  dateTimeDescription?: string;
  link?: string;
  folders?: string[];
  images?: string[];
  excludeExtensions?: string[];
  includeExtensions?: string[];
  format?: "debug";
  galleryDataKey?: string;
  forceSort?: string[];
  layout?: "full" | "grid" | "masonry";
  directUrls?: string[];
}

const galleryId = ref(`gallery-${Math.random().toString(36).substr(2, 9)}`);
let lightbox: any = null;

const initPhotoSwipe = async () => {
  // Ensure any existing instance is destroyed
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }

  // Wait for next tick to ensure DOM is ready
  await nextTick();

  // Dynamically import PhotoSwipe
  const { default: PhotoSwipeLightbox } = await import("photoswipe/lightbox");

  // Initialize with a small delay to ensure everything is hydrated
  setTimeout(() => {
    try {
      lightbox = new PhotoSwipeLightbox({
        gallery: `#${galleryId.value}`,
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    } catch (error) {
      console.error("PhotoSwipe initialization error:", error);
    }
  }, 100);
};

const props = withDefaults(defineProps<ImageGalleryProps>(), {
  titleLines: 2,
  layout: "grid",
  date: "",
});

const galleryData = inject<GalleryImage[]>(props.galleryDataKey || "galleryData", []);

onMounted(() => {
  initPhotoSwipe();
});

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});

const layoutComponent = computed(() => {
  switch (props.layout) {
    case "grid": return ImageCardSquare;
    case "full": return ImageCardFull;
    case "masonry": return ImageCardMasonry;
    default: return ImageCardSquare;
  }
});
const galleryLayoutClass = computed(() => {
  return {
    "image-grid": props.layout === "grid",
    "image-full": props.layout === "full",
    "image-masonry": props.layout === "masonry",
  };
});

const filteredImages = computed(() => {
  // If neither folders nor images are specified, return all images
  if (!props.folders?.length && !props.images?.length) {
    return galleryData.filter((image) => {
      // Only apply extension filters
      const ext = image.filename.split(".").pop()?.toLowerCase();
      if (props.excludeExtensions?.length && ext && props.excludeExtensions.includes(ext))
        return false;
      if (
        props.includeExtensions?.length &&
        ext &&
        !props.includeExtensions.includes(ext)
      )
        return false;
      return true;
    });
  }

  return galleryData.filter((image) => {
    // Check extensions first
    const ext = image.filename.split(".").pop()?.toLowerCase();
    if (props.excludeExtensions?.length && ext && props.excludeExtensions.includes(ext))
      return false;
    if (props.includeExtensions?.length && ext && !props.includeExtensions.includes(ext))
      return false;

    // Include image if it's in specified folders OR it's in specified images
    const inFolder = props.folders?.includes(image.folder) || false;
    const inImages = props.images?.includes(image.path) || false;

    return inFolder || inImages;
  });
});

const displayImages = computed(() => {
  if (props.directUrls && props.directUrls.length > 0) {
    return props.directUrls;
  }

  if (props.forceSort && props.forceSort.length > 0) {
    const sorted = [...props.forceSort];
    filteredImages.value.forEach((img) => {
      if (!sorted.includes(img.path)) {
        sorted.push(img.path);
      }
    });
    return sorted;
  }

  return filteredImages.value.map((img) => img.path).sort();
});

watch(displayImages, () => {
  initPhotoSwipe();
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

.image-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
  gap: 1rem;
}

/* Or alternatively, reset the container's grid when it contains your gallery */
.gallery-container :deep(.container-content) {
  display: block;
}

.gallery-container :deep(.container-content) .image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.image-full {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  grid-template-columns: none !important;
}

.image-full .full-image-card img {
  max-height: 70vh;
  width: auto;
  max-width: 100%;
}

.image-masonry {
  columns: 3;
  column-gap: 1rem;
  break-inside: avoid;
}

.image-masonry > * {
  break-inside: avoid;
  margin-bottom: 1rem;
  display: inline-block;
  width: 100%;
}

@media (max-width: 768px) {
  .image-masonry {
    columns: 2;
  }
}

@media (max-width: 480px) {
  .image-masonry {
    columns: 1;
  }
}

.no-images {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
