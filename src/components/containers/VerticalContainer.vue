<template>
  <div class="vpv-cards-container vertical-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.vertical-container {
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

@media screen and (max-width: 1024px) {
  .vertical-container {
    gap: 1rem;
  }
}
</style>