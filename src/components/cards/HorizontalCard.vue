<template>
  <div class="horizontal-card">
    <component
      :is="disableLinks ? 'div' : 'a'"
      :href="!disableLinks ? url : null"
      class="card-link"
    >
      <div class="card-content">
        <div class="card-info">
          <div class="card-title" :style="{ '--line-clamp-title': titleLines || 2 }">
            {{ title }}
          </div>
          <div class="card-meta">
            <span v-if="!hideAuthor" class="card-author">By {{ author }}</span>
            <span v-if="!hideDate" class="card-date">{{ date }}</span>
          </div>
          <div
            class="card-excerpt"
            :style="{ '--line-clamp-excerpt': excerptLines || 5 }"
          >
            {{ excerpt }}
          </div>
          <div v-if="!hideCategory" class="card-tags">
            <span class="tag">{{ category }}</span>
          </div>
        </div>
        <div v-if="image && !hideImage" class="card-image">
          <img :src="image" alt="Banner" />
        </div>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

interface HorizontalCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  category?: string;
  url?: string;
  hideAuthor?: boolean;
  hideDate?: boolean;
  hideImage?: boolean;
  hideCategory?: boolean;
  hideDomain?: boolean;
  disableLinks?: boolean;
  isExternal?: boolean;
  titleLines?: number;
  excerptLines?: number;
}

const props = defineProps<HorizontalCardProps>();
</script>

<style scoped>
.horizontal-card {
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out,
    transform 0.2s ease-in-out;
  margin-bottom: 1rem;
}

.horizontal-card:hover {
  border-color: var(--vp-c-border);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 10px;
}

.card-info {
  flex: 1;
  min-width: 0;
  padding: 10px;
}

.card-image {
  flex: 0 0 45%;
  aspect-ratio: 16 / 9;
  margin: 10px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-title, 2);
  line-clamp: var(--line-clamp-title, 2);
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.card-excerpt {
  font-size: 1rem;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-excerpt, 5);
  line-clamp: var(--line-clamp-excerpt, 5);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.card-tags {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.horizontal-card:hover .tag {
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-border);
}

/* .horizontal-card:hover  .card-image {
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
} */

@media screen and (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }

  .card-image {
    flex: 0 0 auto;
    width: calc(100% - 20px);
    margin: 10px;
  }

  .card-meta {
    justify-content: flex-start;
    align-items: flex-start;
  }

  .card-meta .card-date {
    margin-left: auto;
  }
}
</style>
