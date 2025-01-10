<template>
  <div class="image-cell">
    <img
      :src="image"
      :alt="altText"
      :width="computedWidth"
      :height="computedHeight"
      v-if="image"
    />
    <span v-else>{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: "ImageCell",
  props: {
    value: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "50px",
    },
    height: {
      type: String,
      default: "50px",
    },
    altText: {
      type: String,
      default: "Image",
    },
  },
  computed: {
    computedWidth() {
      return this.width;
    },
    computedHeight() {
      return this.height;
    },
  },
};
</script>

<style scoped>
.image-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  object-fit: cover;
  border-radius: 4px;
}
</style>
