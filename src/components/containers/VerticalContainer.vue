<template>
  <div class="cards-container">
    <slot></slot>
  </div>
</template>


<style lang="scss">
@use "@/assets/main.scss";

.cards-container {
  @extend %cards-container;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

@media screen and (max-width: 1024px) {
  .cards-wrapper {
    gap: 1rem;
  }
}
</style>
