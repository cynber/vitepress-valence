<template>
  <div class="cards-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.cards-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 16px;
  margin: 16px auto;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
}
</style>