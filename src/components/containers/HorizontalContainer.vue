<template>
  <div class="vpv-cards-container horizontal-container">
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
    />
    <div class="container-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContainerHeader from './ContainerHeader.vue';

interface HorizontalContainerProps {
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
  dateFormat?: "long" | "iso";
}

const props = defineProps<HorizontalContainerProps>();
</script>

<style scoped>
.horizontal-container {
  flex-direction: column;
}

.container-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>