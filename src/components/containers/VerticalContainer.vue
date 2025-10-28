<template>
  <div class="vpv-cards-container vertical-container">
    <ContainerHeader
      v-if="headerTitle"
      :header-title="headerTitle"
      :header-subtitle="headerSubtitle"
      :header-date="headerDate"
      :header-link="headerLink"
      :header-title-lines="headerTitleLines"
      :header-subtitle-lines="headerSubtitleLines"
      :header-date-format="headerDateFormat"
      :header-date-prefix="headerDatePrefix"
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
  headerTitle?: string;
  headerSubtitle?: string;
  headerDate?: string;
  headerLink?: string;
  headerDatePrefix?: string;
  
  // Header display options
  headerTitleLines?: number;
  headerSubtitleLines?: number;
  headerDateFormat?: "long" | "short" | "iso" | string;
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

</style>