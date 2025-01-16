<template>
  <div class="image-card-square">
    <img :src="image" alt="Gallery Image" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
}>();
</script>

<style scoped>
.image-card-square {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
