<template>
  <div class="card">
    <component
      :is="disableLinks ? 'div' : 'a'"
      :href="disableLinks ? undefined : url"
      class="card-link"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
    >
      <div v-if="!hideImage && (image || image_dark)" class="card-image">
        <!-- Light mode image -->
        <img
          v-if="image"
          :src="image"
          :alt="title"
          loading="lazy"
          class="vpv-light-only"
        />

        <!-- Dark mode image (if provided) -->
        <img
          v-if="image_dark"
          :src="image_dark"
          :alt="title"
          loading="lazy"
          class="vpv-dark-only"
        />

        <!-- Fallback: use light mode image in dark mode if no dark image -->
        <img
          v-else-if="image"
          :src="image"
          :alt="title"
          loading="lazy"
          class="vpv-dark-only"
        />
      </div>
      <div class="card-info">
        <div
          class="card-title"
          :style="{ '--line-clamp-title': titleLines || 2 }"
        >
          {{ title }}
        </div>
        <div class="card-meta">
          <span v-if="!hideAuthor && author">{{ author }}</span>
          <span v-if="!hideDate && date && date !== 'Invalid Date'">{{
            date
          }}</span>
        </div>
        <p class="card-body" :style="{ '--line-clamp-excerpt': excerptLines }">
          {{ excerpt }}
        </p>
        <div
          v-if="
            (!hideCategory && category) ||
            (!hideTags && tags && tags.length > 0)
          "
          class="tags-container"
        >
          <div class="tags-content">
            <span v-if="!hideCategory && category" class="tag category-tag">
              {{ category }}
            </span>
            <span v-if="!hideTags" v-for="tag in tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="!hideDomain && isExternal" class="card-footer">
        <div class="footer-content">
          <Icon icon="mdi:external-link" class="external-icon" />
          <span>External Link</span>
        </div>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
interface CardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  image_dark?: string;
  category?: string;
  tags?: string[];
  url?: string;
  hideAuthor?: boolean;
  hideDate?: boolean;
  hideImage?: boolean;
  hideCategory?: boolean;
  hideTags?: boolean;
  hideDomain?: boolean;
  disableLinks?: boolean;
  isExternal?: boolean;
  titleLines?: number;
  excerptLines?: number;
}
const props = defineProps<CardProps>();
</script>

<style lang="scss" scoped>
@use "../../assets/main.scss" as main;
.card {
  @include main.vpv-card-base;
  &:hover {
    @include main.vpv-card-base-hover;
  }
  width: 100%;
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
  padding: 0.7rem;
  padding-bottom: 0;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
}
.card-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
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
.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
}
.tags-container {
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--vp-c-bg));
    pointer-events: none;
  }
}
.tags-content {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.tag {
  @include main.vpv-tag-card;
}
.category-tag {
  @include main.vpv-tag-card-branded;
}
.card-body {
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-excerpt, 3);
  line-clamp: var(--line-clamp-excerpt, 3);
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  margin: 0 auto 1rem;
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
@media screen and (max-width: 650px) {
  .card {
    flex: 1 1 100%;
    max-width: 100%;
    min-width: unset;
  }
}
</style>
