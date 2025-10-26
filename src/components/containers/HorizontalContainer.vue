<template>
  <div class="vpv-cards-container horizontal-container">
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
  headerTitle?: string;
  headerSubtitle?: string;
  headerDate?: string;
  headerDateFormat?: "long" | "short" | "iso" | string;
  headerDatePrefix?: string;
  headerLink?: string;
  headerTitleLines?: number;
  headerSubtitleLines?: number;
}

const props = defineProps<HorizontalContainerProps>();
</script>

<style scoped>
.horizontal-container {
  flex-direction: column;
  gap: 1rem;
}

.container-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>