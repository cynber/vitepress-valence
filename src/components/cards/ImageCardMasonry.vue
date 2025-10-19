<template>
  <a
    :href="image"
    :data-pswp-width="imageDetails.width"
    :data-pswp-height="imageDetails.height"
    target="_blank"
    class="masonry-image-card"
  >
    <img :src="image" :alt="image" @load="onImageLoad" />
  </a>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  image: string;
}>();

const imageDetails = ref({
  width: 0,
  height: 0,
});

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement;
  imageDetails.value = {
    width: img.naturalWidth,
    height: img.naturalHeight,
  };
};
</script>

<style scoped>
.masonry-image-card {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  break-inside: avoid;
}

.masonry-image-card img {
  width: 100%;
  height: auto;
  display: block;
}

.masonry-image-card:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease-in-out;
}
</style>