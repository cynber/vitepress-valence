<template>
  <div class="vpv-cards-container horizontal-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.horizontal-container {
  flex-direction: column;
  gap: 1rem;
}
</style>