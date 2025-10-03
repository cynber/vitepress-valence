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
  gap: 0.2rem;
  margin: 16px auto;
  border-radius: 18px;
  border: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
}
</style>