<template>
  <a
    :href="image"
    :data-pswp-width="imageDetails.width"
    :data-pswp-height="imageDetails.height"
    target="_blank"
    class="full-image-card"
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
.full-image-card {
  display: flex;
  justify-content: center;
  max-width: 100%;
  margin: 0;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  padding: 0 0 1rem 0;
}

.full-image-card img {
  max-width: 100%;
  margin: 0;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.full-image-card:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease-in-out;
}
</style>
