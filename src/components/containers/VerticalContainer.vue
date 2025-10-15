<template>
  <div class="vpv-cards-container vertical-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.vertical-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: stretch;
}

@media screen and (max-width: 1024px) {
  .vertical-container {
    gap: 1rem;
  }
}
</style>