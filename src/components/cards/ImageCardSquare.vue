<template>
  <div class="image-card-square">
    <a
      :href="image"
      :data-pswp-width="imageWidth"
      :data-pswp-height="imageHeight"
      target="_blank"
      class="image-card-square"
    >
      <img :src="image" alt="Gallery Image" @load="onImageLoad" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  image: string;
}>();

const imageWidth = ref(0);
const imageHeight = ref(0);

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement;
  imageWidth.value = img.naturalWidth;
  imageHeight.value = img.naturalHeight;
};
</script>

<style scoped>
.image-card-square {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: block;
  text-decoration: none;
}

.image-card-square img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: scale 0.8s ease-in-out;
}

.image-card-square:hover {
  transform: scale(1.03);
}
</style>
