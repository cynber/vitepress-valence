<template>
  <a class="return-text" :href="returnLinkValue">{{ returnTextValue }}</a>
  <header>
    <h1 v-if="!props.hideTitle" class="article-title">
      {{ frontmatter.title }}
    </h1>
    <p v-if="!props.hideSubtitle" class="article-subtitle">
      {{ frontmatter.subtitle }}
    </p>

    <ImageWide
      v-if="!props.hideFeatImage"
      :imageConfig="frontmatter.featured_image"
      :hideDescription="props.hideFeatImageDescription"
      defaultAlt="Featured Image"
    />

    <div class="article-info">
      <!-- First Row: Two Cards -->
      <div class="info-cards">
        <a
          v-if="!props.hideAuthor && author.name"
          class="author-section-link"
          :href="author.url"
        >
          <div class="author-section">
            <img
              :src="author.avatar"
              alt="Author's Avatar"
              class="author-avatar"
            />
            <div class="author-details">
              <span class="author-name">{{ author.name }}</span>
              <p class="author-description">{{ author.description }}</p>
            </div>
          </div>
        </a>

        <div class="meta-data-card">
          <div class="meta-data">
            <p v-if="!props.hideDate && frontmatter.date">
              {{
                new Date(frontmatter.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Second Row: Pills -->
      <div class="pills-row">
        <span
          v-if="!props.hideCategory && frontmatter.category"
          class="pill category-pill"
        >
          {{ frontmatter.category }}
        </span>
        <span
          v-for="tag in visibleTags"
          :key="tag"
          class="pill"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import { useData } from "vitepress";
import ImageWide from "./cards/ImageWide.vue";

interface Props {
  returnLink?: string;
  returnText?: string;
  hideTitle?: boolean;
  hideSubtitle?: boolean;
  hideDate?: boolean;
  hideAuthor?: boolean;
  hideCategory?: boolean;
  hideFeatImage?: boolean;
  hideFeatImageDescription?: boolean;
  authorsDataKey?: string;
}

interface FeaturedImageConfig {
  image?: string;
  image_dark?: string;
  alt?: string;
  description?: string;
}

interface Frontmatter {
  title: string;
  subtitle?: string;
  featured_image?: FeaturedImageConfig;
  date?: string;
  category?: string;
  tags?: string[];
  author?: string;
  returnLinkValue?: string;
  returnTextValue?: string;
}

interface Author {
  name: string;
  avatar?: string;
  url?: string;
  description?: string;
}

const props = defineProps<Props>();
const authorsInjectKey = props.authorsDataKey || "authors";
const authors = inject<Record<string, Author>>(authorsInjectKey) || {};
const { page } = useData();
const frontmatter = page.value.frontmatter as Frontmatter;
const author = ref<Author>(authors[frontmatter.author || ""] || { name: "" });

const returnLinkValue = ref<string>(
  props.returnLink || frontmatter.returnLinkValue || "/"
);
const returnTextValue = ref<string>(
  "← " + (props.returnText || frontmatter.returnTextValue || "Back Home")
);

// Simple implementation - you can make this more sophisticated later
const visibleTags = computed(() => {
  const tags = frontmatter.tags || [];
  // For now, just show first 5 tags to prevent overflow
  // You can implement proper overflow detection later
  return tags.slice(0, 5);
});
</script>

<style scoped>
.return-text {
  display: block;
  margin-bottom: 2rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
}

.article-title {
  font-size: 2em;
  margin-bottom: 1rem;
  text-align: center;
}

.article-subtitle {
  font-size: 1.2em;
  margin-bottom: 1rem;
  text-align: center;
}

.article-info {
  display: flex;
  flex-direction: column;
  margin: 1rem auto 2rem;
  max-width: 800px;
  gap: 1rem;
  border-radius: 18px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 10px;
}

.info-cards {
  display: flex;
  gap: 1rem;
}

.author-section-link {
  text-decoration: none;
  color: inherit;
  display: block;
  flex: 1;
}

.author-section {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  transition: box-shadow 0.1s ease-in-out;
  height: 100%;
}

.author-section:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.meta-data-card {
  flex: 1;
  padding: 10px;
  background-color: var(--vp-c-bg);
  border-radius: 16px;
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.author-details {
  text-align: left;
}

.author-name {
  font-weight: bold;
  font-size: 1.2em;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.author-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.meta-data {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

.meta-data p {
  margin: 0;
}

.pills-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pill {
  padding: 0.25rem 0.75rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 1rem;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.category-pill {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
  font-weight: 500;
}
</style>
