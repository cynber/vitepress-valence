<template>
  <div class="vpv-cards-container vertical-container">
    <ContainerHeader
      v-if="title && !hideHeader"
      :title="title"
      :subtitle="subtitle"
      :date="date"
      :link="headerLink"
      :title-lines="titleLines"
      :subtitle-lines="subtitleLines"
      :date-format="dateFormat"
      :description="description"
      class="container-header-full-width"
    />
    <div class="container-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContainerHeader from './ContainerHeader.vue';

interface VerticalContainerProps {
  // Header props (optional)
  title?: string;
  subtitle?: string;
  date?: string;
  headerLink?: string;
  hideHeader?: boolean;
  description?: string;
  
  // Header display options
  titleLines?: number;
  subtitleLines?: number;
  dateFormat?: "long" | "short" | "iso" | string;
}

const props = defineProps<VerticalContainerProps>();
</script>

<style scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container-header-full-width {
  grid-column: 1 / -1;
}

.container-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-content: stretch;
}

@media screen and (max-width: 1024px) {
  .container-content {
    gap: 1rem;
  }
}
</style>