<template>
  <div class="cards-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@use "@/assets/main.scss";

.cards-container {
  @extend %cards-container;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
