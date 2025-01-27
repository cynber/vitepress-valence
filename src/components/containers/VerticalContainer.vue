<template>
  <div class="cards-container">
    <slot></slot>
  </div>
</template>


<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 16px;
  margin: 16px auto;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
}
@media screen and (max-width: 1024px) {
  .cards-wrapper {
    gap: 1rem;
  }
}
</style>
