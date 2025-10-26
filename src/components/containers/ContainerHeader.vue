<template>
  <div class="container-header">
    <div class="title-content">
      <component
        :is="headerLink ? 'a' : 'span'"
        class="header-title"
        :href="headerLink || undefined"
        :style="{ '--line-clamp-header-title': headerTitleLines || 2 }"
      >
        {{ headerTitle }}
      </component>
      <span
        v-if="headerSubtitle"
        class="header-subtitle"
        :style="{ '--line-clamp-header-subtitle': headerSubtitleLines || 1 }"
      >
        {{ headerSubtitle }}
      </span>
      <span
        v-if="formattedHeaderDateTime"
        class="header-date"
        v-html="formattedHeaderDateTime"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatDate } from "../../utils";

interface ContainerHeaderProps {
  headerTitle: string;
  headerSubtitle?: string;
  headerDate?: string;
  headerDateFormat?: "long" | "short" | "iso" | string;
  headerDatePrefix?: string;
  headerLink?: string;
  headerTitleLines?: number;
  headerSubtitleLines?: number;
}

const props = withDefaults(defineProps<ContainerHeaderProps>(), {
  headerTitleLines: 2,
  headerSubtitleLines: 1,
  headerDateFormat: "long",
});

const formattedHeaderDateTime = computed(() => {
  if (!props.headerDate) return "";
  
  const datetime = formatDate(props.headerDate, { format: props.headerDateFormat });
  
  if (props.headerDatePrefix && datetime) {
    return `${props.headerDatePrefix} ${datetime}`;
  }
  
  return datetime;
});
</script>

<style scoped>
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--vp-c-bg);
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin: 0 0 0.25rem 0;
  width: 100%;
  box-sizing: border-box;
}

.title-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}

.header-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-header-title);
  line-clamp: var(--line-clamp-header-title);
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  text-decoration: none;
}

.header-subtitle {
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-header-subtitle);
  line-clamp: var(--line-clamp-header-subtitle);
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.header-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

a.header-title {
  cursor: pointer;
}

a.header-title:hover {
  color: var(--vp-c-brand);
  text-decoration: underline;
}
</style>