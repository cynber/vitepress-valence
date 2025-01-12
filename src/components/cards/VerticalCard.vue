<template>
  <div class="card">
    <component
      :is="disableLinks ? 'div' : 'a'"
      :href="!disableLinks ? url : null"
      class="card-link"
    >
      <div v-if="image && !hideImage" class="card-image">
        <img :src="image" alt="Banner Image" />
      </div>
      <div class="card-info">
        <h3 class="card-title" :style="{ '--line-clamp-title': titleLines || 2 }">
          {{ title }}
        </h3>
        <div class="card-meta">
          <span v-if="!hideAuthor && author" class="card-author">by {{ author }}</span>
          <span v-if="!hideDate" class="post-date">{{ date }}</span>
        </div>
        <p class="card-body" :style="{ '--line-clamp-excerpt': excerptLines || 3 }">
          {{ excerpt }}
        </p>
        <div v-if="!hideCategory && category" class="card-tags">
          <span class="tag">{{ category }}</span>
        </div>
      </div>
      <div v-if="isExternal && !hideDomain" class="card-footer">
        <!-- <hr class="card-footer-hr" /> -->
        <div class="footer-content">
          <Icon :icon="'gridicons:external'" class="external-icon" />
        </div>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { defineProps } from "vue";

interface CardProps {
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

const props = defineProps<CardProps>();
</script>

<style scoped>
.card {
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out,
    transform 0.2s ease-in-out;
  flex: 1 1 300px;
  min-width: 300px;
  max-width: calc(33.333% - 1rem);
}

.card:hover {
  border-color: var(--vp-c-border);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 1px solid var(--vp-c-border);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-title, 2);
  line-clamp: var(--line-clamp-title, 2);
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.card-tags {
  margin-bottom: 0.75rem;
}

.tag {
  display: inline-block;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  margin-right: 0.5rem;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.card:hover .tag {
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-border);
}

.card-body {
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-excerpt, 3);
  line-clamp: var(--line-clamp-excerpt, 3);
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.external-icon {
  width: 1.2em;
  height: 1.2em;
}

@media screen and (max-width: 1024px) {
  .card {
    max-width: calc(50% - 1rem);
  }
}

@media screen and (max-width: 650px) {
  .card {
    flex: 1 1 100%;
    max-width: 100%;
    min-width: unset;
  }

  .cards-wrapper {
    gap: 1rem;
  }
}
</style>
