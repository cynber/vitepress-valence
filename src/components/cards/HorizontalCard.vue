<template>
  <div class="horizontal-card">
    <component
      :is="disableLinks ? 'div' : 'a'"
      :href="disableLinks ? undefined : url"
      class="card-link"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
    >
      <div class="card-content">
        <div class="card-info">
          <div
            class="card-title"
            :style="{ '--line-clamp-title': titleLines || 2 }"
          >
            {{ title }}
          </div>

          <div class="card-meta">
            <span v-if="!hideAuthor && author">{{ author }}</span>
            <span v-if="!hideDate && date">{{ date }}</span>
          </div>

          <p
            class="card-excerpt"
            :style="{ '--line-clamp-excerpt': excerptLines }"
          >
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
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
interface HorizontalCardProps {
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

const props = defineProps<HorizontalCardProps>();
</script>

<style lang="scss" scoped>
@use "../../assets/main.scss" as main;

.horizontal-card {
  @include main.vpv-card-base;

  &:hover {
    @include main.vpv-card-base-hover;
  }
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
  border: 2px solid var(--vp-c-divider);
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

.tags-container {
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;

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

@media screen and (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }
  .card-image {
    flex: 0 0 auto;
    width: calc(100% - 20px);
    margin: 10px;
  }
}
</style>
